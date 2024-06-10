const db = require('../config/connection');
const { Worker, Employer, Job } = require('../models');
const cleanDB = require('./cleanDB');

// imports json data for each model before seeding
const workerData = require('./workerData.json');
const employerData = require('./employerData.json');
const jobData = require('./jobData.json')

db.once('open', async () => {
    // calls the cleanDB function to remove any data and tables ensuring that the database is empty before data is added
    await cleanDB('Worker', 'workers');
    await cleanDB('Employer', 'employers');
    await cleanDB('Job', 'jobs');

    // asynchronusly seeds data for each model logging a message after each action to verify its completion
    await Worker.insertMany(workerData);
    console.log('--Workers seeded--')
    await Employer.insertMany(employerData);
    console.log('--Employers seeded--')
    await Job.insertMany(jobData);
    console.log('--Jobs Seeded--')


    console.log('---All Done---')
    process.exit(0);
})