const express = require('express');
let router = express();
const { admin } = require('../Middlware/admin');
const { ApplicationController } = require('../Controller/Application_controller');
const { authorized } = require('../Middlware/authorized');

router.get('/job_appications/:id', admin, ApplicationController.JobApplications)  // get all applications in one job by job id



// router.delete('/delete/:id', authorized, ApplicationController.deleteApplication); // delete Application 
// router.post('/add/:id' , authorized , ApplicationController.addNewApplication);
// router.get('/usera_pplications', authorized, ApplicationController.userApplications)  // get your applications in all jobs by job id
// router.get('/user_application/:id', authorized, ApplicationController.userApplication)  // get your application in one job by job id
// router.put('/update/:id', authorized, ApplicationController.updateApplication); // update Application 


module.exports = router;

