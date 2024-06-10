import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useQuery, useMutation } from "@apollo/client";
import { GET_JOBS } from "../utils/queries";
import { UPDATE_JOB } from "../utils/mutations";
import Auth from '../utils/auth';

// populates a page with all jobs that are not currently assigned to a worker
const FindJob = () => {
  const { loading, data } = useQuery(GET_JOBS);
  const [ updateJob, { error, updateData } ] = useMutation(UPDATE_JOB);
  const workerId = Auth.getProfile();

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  const jobs = data?.jobs || [];

  const availableJobs = [];
  jobs.map((job) => {
    if (!job.worker){
      availableJobs.push(job);
    }
  })
  
  // allows a worker to pick up a job that is than added to their portfolio page
  const handleSubmit = async (job) => { 
    try {
      const { data } = await updateJob({
        variables: {updateJobId: job._id, worker: workerId.data._id }
      })
    } catch (e) {
      console.error(e)
    }
    window.location.assign('/findjobs');
  };

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ mt: 10 }}>
          Find a Job
        </Typography>
        <Grid container spacing={5} align="center" sx={{ mt: 5 }}>
          {availableJobs.map((job) => (
            <Grid item xs={12} sm={4} md={4} key={job._id}>
              <Card variant="outlined" sx={{ maxWidth: "350px", minWidth: "350px" , p: 2, mb: 4 }}>
                <CardActionArea>
                  {/* Uncomment and use if there is an image URL in job.img */}
                  {/* <CardMedia
                    component="img"
                    height="140"
                    image={job.img}
                    alt="project card"
                    sx={{ borderRadius: 2 }}
                  /> */}
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      color="primary"
                    >
                      {job.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{maxHeight:"70px", minHeight:'70px', overflow:'auto'}}>
                      {job.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActionArea>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="error"
                      size="large"
                      startIcon={<AttachMoneyIcon />}
                      endIcon={<AttachMoneyIcon />}
                      onClick={() => handleSubmit(job)}
                    >
                      Pick Up Project
                    </Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default FindJob;
