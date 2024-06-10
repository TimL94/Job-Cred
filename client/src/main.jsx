import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import SignIn from './pages/SignIn.jsx'
import Register from './pages/WorkerReg.jsx'
import Registration from './pages/employerReg.jsx'
import Home from './pages/Homepage'
import CreateJob from './pages/CreateJobPage.jsx'
import FindJob from './pages/FindJobs.jsx';
import UserProfile from './pages/WorkerProfile.jsx';
import EmpProfile from './pages/EmployerProfile.jsx';
import { createTheme } from '@mui/material';
import './index.css'
import Auth from '../src/utils/auth.js'


const theme = createTheme({
  palette: {
    primary: {
      main: '#013e87',
    },
    secondary: {
      main: "#2e74c9",
    },
  },
});

// sets up the router for loading different components and pages
//the logged in function from Auth is used to determine if the user is logged in and loads relevant components based on login status
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: '',
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/signIn',
        element: Auth.loggedIn() ? <Home /> : <SignIn/>
      },
      {
        path: '/register',
        element: Auth.loggedIn() ? <Home /> : <Register />
      },
      {
        path: '/registration',
        element: Auth.loggedIn() ? <Home /> : <Registration />
      },
      {
        path: '/createjob',
        element: Auth.loggedIn() ? !Auth.userType() ? <CreateJob /> : <Home /> : <SignIn />
      },
      {
        path: '/findjobs',
        element: Auth.loggedIn() ? Auth.userType() ? <FindJob /> : <Home /> : <SignIn />
      },
      {
        path: '/portfolio',
        element: Auth.loggedIn() ? Auth.userType() ? <UserProfile /> : <Home /> : <SignIn />
      },
      {
        path: '/empprofile',
        element: Auth.loggedIn() ? !Auth.userType() ? <EmpProfile /> : <Home /> : <SignIn />
      }    
      

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
