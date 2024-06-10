import React from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  CardActionArea,
  CardContent,
  Card,
  Avatar,
  Link,
  Button,
  CardActions

} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYER } from "../utils/queries";
import { MARK_JOB_COMPLETED } from "../utils/mutations";
import Auth from '../utils/auth'

const empProfile = () => {
  const user = Auth.getProfile();
  const {loading, error, data} = useQuery(GET_EMPLOYER, {
    variables: {employerId: user.data._id}
  });

  const [ markJobCompleted, {e, completedData} ] = useMutation(MARK_JOB_COMPLETED);

  const employer = data?.employer || {};
  const employerJobs = employer?.jobs || [];
  const activeJobs = employerJobs.filter((job) => !job.completed) // adds all jobs that are not completed to a new list

  // checks to see if there are any active jobs, if not a message is displayed below
  const populateJobs = () => {
    if (activeJobs != 0) {
      return true
    } else {
      return false
    }
  }

  const completedJob = async (key) => {
    try{
      await markJobCompleted({variables: { markJobCompleteId: key }})
      window.location.reload();
    }catch (e) {
      console.error(e)
    }
  }
  return (
    <>
      <Grid
        sx={{ p: 5, mt: 10 }}
        container
        direction="row"
        justifyContent="center"
        maxWidth="xs"
      >
        <Box
          sx={{ p: 6, bgcolor: "#e1f5fe" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          border="1px solid"
        >
          <Paper align="center" elevation={2} sx={{ p: 2, m: -5, mb:1, mt:2}}>
            <Typography variant="h5">Welcome {employer.username}, here are your active jobs</Typography>
          </Paper>
          
          <Paper
            elevation={2}
            align="center"
            sx={{
              m: -5,
              mt: 2,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            {populateJobs() ? 
              activeJobs.map((job) => { 
                return(
                  <Card sx={{ maxWidth: "350px", minWidth: "350px" }} key={job._id}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {job.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary"sx={{maxHeight:"70px", minHeight:'70px', overflow:'auto'}}>
                          {job.description}
                        </Typography>
                        
                      </CardContent>
                    </CardActionArea>
                    <CardActions sx={{display:"flex", justifyContent:"center", alignItems:"flex-end"}}>
                      {job.worker ? 
                            <Button
                            type="submit"
                            variant="outlined"
                            color="error"
                            size="large"
                            onClick={() => completedJob(job._id)}
                          >
                            Mark Job Complete
                          </Button> :
                          <Button
                          variant="outlined"
                          color="error"
                          size="medium"
                          >
                            No Worker
                          </ Button>}
                    </CardActions>
                  </Card>
                )
              }) : (
                <Card sx={{ maxWidth: "350px", minWidth: "350px" , m: 2 }}>
                  <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          OH NO! You don't appear to have any jobs...
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          
                          <Link color="#000" variant="h5" href="/createjob" underline="hover">
                            ---Click this link to post one now!!---
                          </Link>
                        </Typography>
                      </CardContent>
                  </CardActionArea>
                </Card>)}
          </Paper>
        </Box>
      </Grid>
    </>
  );
};

export default empProfile;
