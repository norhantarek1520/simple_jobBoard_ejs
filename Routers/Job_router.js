
const express = require('express');
let router = express();
const { JobController } = require('../Controller/Job_controller');
const { authorized } = require('../Middlware/authorized');
const {admin} = require('../Middlware/admin')
// geters 
router.get('/jobs', JobController.browseJobs); 
router.get('/job_details/:id',JobController.getJobDetails);
router.get('/apply/:id',authorized,JobController.getApplyForJob);

router.get('/post_job', admin ,JobController.getPostJob );
router.get('/update_job/:id' , admin , JobController.getUpdateJob)
router.get('/admin_dashboard', admin ,JobController.AdminDashboard );

router.post('/apply/:id',authorized,JobController.applyForJob);
router.post('/post_job', admin ,JobController.addNewteJob );
router.post('/update_job/:id' , admin , JobController.updateJob)
router.delete('/delete_job/:id' , admin , JobController.deleteJob)






module.exports = router;