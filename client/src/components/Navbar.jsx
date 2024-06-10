import * as React from 'react';
import PropTypes from 'prop-types';
import { 
  AppBar,
  Box,
  Toolbar,
  Button,
  Container,
  Divider,
  Typography,
  MenuItem,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import smallLogo from '../assets/smalllogo.svg'
import Auth from '../utils/auth'
import { Link } from '@mui/material';


const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};


// creates the nav bar, dynamically changes the links based on if the user is logged in or not and only displays user-type specific content
// when in mobile the navbar is condensed into a drawer component
function Navbar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
}

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-10px',
                px: 0,
              }}
            >
              <img
                src={
                  smallLogo
                }
                //style={logoStyle}
                alt="logo of Job Cred"
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MenuItem
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="h5" color="text.primary">
                   Job Cred
                  </Typography>
                </MenuItem>
              </Box>
            </Box>


            
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              
              {Auth.loggedIn() ? 
                Auth.userType() 
                ? <div>
                  <Button 
                    underline='hover' 
                    color="inherit" 
                    href='/findjobs'>
                      {"Find Jobs"}
                  </Button>
                  <Button 
                    underline='hover' 
                    color="inherit" 
                    href='/portfolio'>
                      {"Portfolio"}
                  </Button>
                  <Button 
                  underline='hover' 
                  color="inherit" 
                  onClick={logout} 
                  href='/home'>
                    {"Logout"}
                </Button>
                  </div>
                  : <div>
                    <Button 
                      underline='hover' 
                      color="inherit" 
                      href='/createjob'>
                        {"Post Jobs"}
                    </Button>
                    <Button 
                      underline='hover' 
                      color="inherit" 
                      href='/empprofile'>
                        {"Active Jobs"}
                    </Button>
                    <Button 
                      underline='hover' 
                      color="inherit" 
                      onClick={logout} 
                      href='/home'>
                        {"Logout"}
                    </Button>
                    </div> 
                    : <div>
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        component="a"
                        href="/signIn">
                          Sign in
                      </Button>
                      </div>}

              
              <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
                href="/"
              >
                Home
              </Button>
            </Box>



            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => scrollToSection('pricing')}>
                    Available Jobs
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                  <Divider />
                  <Box sx={{ml: -2}}>
                  {Auth.loggedIn() ? 
                        Auth.userType() 
                        ? <div>
                          <MenuItem>
                            <Button 
                              underline='hover' 
                              color="inherit" 
                              onClick={logout} 
                              href='/home'>
                                {"Logout"}
                            </Button>
                          </MenuItem>
                          <MenuItem>
                            <Button 
                              underline='hover' 
                              color="inherit" 
                              href='/findjobs'>
                                {"Find Jobs"}
                            </Button>
                          </MenuItem>
                          <MenuItem>
                            <Button 
                              underline='hover' 
                              color="inherit" 
                              href='/portfolio'>
                                {"Portfolio"}
                            </Button>
                          </MenuItem>
                          </div> 
                          : <div>
                            <MenuItem>
                              <Button 
                                underline='hover' 
                                color="inherit" 
                                onClick={logout} 
                                href='/home'>
                                  {"Logout"}
                              </Button>
                            </MenuItem>
                            <MenuItem>
                              <Button 
                                underline='hover' 
                                color="inherit" 
                                href='/createjob'>
                                  {"Post Jobs"}
                              </Button>
                            </MenuItem>
                            <MenuItem>
                              <Button 
                                underline='hover' 
                                color="inherit" 
                                href='/empprofile'>
                                  {"Active Jobs"}
                              </Button>
                            </MenuItem>
                            </div>
                            : <MenuItem>
                              <Button
                                color="primary"
                                variant="text"
                                size="small"
                                component="a"
                                href="/signIn">
                                  Sign in
                              </Button>
                              </MenuItem>}
                      
                      <MenuItem>
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        component="a"
                        href="/"
                      >
                        Home
                      </Button>
                      </MenuItem>
                  </Box>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;