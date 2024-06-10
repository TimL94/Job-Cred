import PropTypes from 'prop-types';
import React from 'react';
import {
  Box,
  Button,
  ToggleButtonGroup } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_WORKER, GET_EMPLOYER } from '../utils/queries';
import Auth from '../utils/auth';


// populates the badge at the bottom with the username of the signed in user, if no user is signed in Job Cred is dosplayed
function usernameFooter({ showCustomTheme, toggleCustomTheme }) {
  let user = {};
 try{
  const userId = Auth.getProfile();
  const userType = Auth.userType();
  var userTypeString;
  if (userType) {
    const {loading, error, data} = useQuery(GET_WORKER, {
      variables: {workerId: userId.data._id}
      });
      user = data?.worker || {};
      userTypeString = `Worker: ${user.username}`;
  } else if (!userType) {
    const {loading, error, data} = useQuery(GET_EMPLOYER, {
      variables: {employerId: userId.data._id}
      });
      user = data?.employer || {};
      userTypeString = `Employer: ${user.username}`;
  }
 } catch (e){
  console.error(e)
 }
 
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <Button value={true} href={Auth.loggedIn() ? Auth.userType() ? "/portfolio" : "/empprofile" : "/"} variant='outlined'>
          {user.username ? userTypeString : "Job Cred"}
        </Button>
      </ToggleButtonGroup>
    </Box>
  );
}

usernameFooter.propTypes = {
  showCustomTheme: PropTypes.bool.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default usernameFooter;