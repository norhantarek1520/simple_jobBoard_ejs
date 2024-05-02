const { Application } = require('../Models/Application')
const { Job } = require('../Models/Job')
const {Category} = require('../Models/Category ')
const { User } = require('../Models/User')
class JobController {


  static deleteJob = async (req, res, next) => {
    try {
    
      const result = await Job.delete(req.params.id);
      if (result === true) {
        res.redirect('/admin_dashboard')
      }
      else res.send("<h1> Can not delete this job </h1>")

    } catch (error) {
      res.status(404).json('Error !' + error)
    }

  }
  static addNewteJob = async (req, res, next) => {

    try {
      //const JobObj = req.body ;
      const JobObj = new Job(req.body);
      JobObj.setTitle(req.body.title)
      JobObj.setJobType(req.body.job_type)
      JobObj.setOwner(req.body.owner)
      JobObj.setSalary(req.body.salary)
      JobObj.setVacancy(req.body.vacancy)
      JobObj.setLocation(req.body.location)
      JobObj.setCategory(req.body.category)
      JobObj.setExperience(req.body.experience)
      JobObj.setImage(req.body.image)
      JobObj.setDeadline(req.body.deadline)
      JobObj.setQualifications(req.body.qualifications)
      JobObj.setResponsibility(req.body.responsibility)

      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        day: '3-letter',
        month: 'short',
        year: 'numeric'
      }); // Output: "Tue Oct 31 2023"
      
      JobObj.setPublishedOn(formattedDate);

      const result = await Job.addNew(JobObj);
      if (result === true) res.redirect('/admin_dashboard')
      else res.send("<h1> Error in adding this job </h1>")

    } catch (error) {

      res.status(404).json('Error !' + error)

    }

  }
  static updateJob = async (req, res, next) => {
    try {
      const id = req.params.id;
      const oldData = await Job.get(id)
      if (oldData.length == null) {
        res.status(201).json("No Job with this id")
      }
      else {
        const JobObj = new Job(req.body);
        if (req.body.title == null) JobObj.setTitle(oldData[0].title)
        else JobObj.setTitle(req.body.title)

        if (req.body.job_type == null) { JobObj.setJobType(oldData[0].job_type) }
        else { JobObj.setJobType(req.body.job_type) }

        if (req.body.owner == null) { JobObj.setOwner(oldData[0].owner) }
        else { JobObj.setOwner(req.body.owner) }

        if (req.body.salary == null) { JobObj.setSalary(oldData[0].salary) }
        else { JobObj.setSalary(req.body.salary) }

        if (req.body.vacancy == null) { JobObj.setVacancy(oldData[0].vacancy) }
        else { JobObj.setVacancy(req.body.vacancy) }

        if (req.body.location == null) { JobObj.setLocation(oldData[0].location) }
        else { JobObj.setLocation(req.body.location) }

        if (req.body.category == null) { JobObj.setCategory(oldData[0].category) }
        else { JobObj.setCategory(req.body.category) }

        if (req.body.experience == null) { JobObj.setExperience(oldData[0].experience) }
        else { JobObj.setExperience(req.body.experience) }


        if (req.body.deadline == null) { JobObj.setDeadline(oldData[0].deadline) }
        else { JobObj.setDeadline(req.body.deadline) }

        if (req.body.qualifications == null) { JobObj.setQualifications(oldData[0].qualifications) }
        else { JobObj.setQualifications(req.body.qualifications) }

        if (req.body.responsibility == null) { JobObj.setResponsibility(oldData[0].responsibility) }
        else { JobObj.setResponsibility(req.body.responsibility) }

        if (req.body.published_on == null) { JobObj.setPublishedOn(oldData[0].published_on) }
        else { JobObj.setPublishedOn(req.body.published_on) }

        const result = await Job.update(id, JobObj);
        if (result === true)  res.redirect('/admin_dashboard')
        else res.send("<h1> Error in updating this job </h1>")

      }


    } catch (error) {
      res.status(404).json('Error in updateJob :!' + error)
    }

  }
  static applyForJob = async (req, res, next) => {
    try {
      // name email Portfolio uploadcv 
      
      const isJobExists = await Job.isExist(req.params.id)
      const userData = await User.get(req.cookies.token)

      if (isJobExists == true & userData.length != 0 ) {
        const appliedBefore = await Application.appliedBefore(userData[0].id, req.params.id)
        if (appliedBefore == true) { res.status(404).json('You applay for this job before') }
        else {
          const applicationObj = new Application()
          const now = new Date();
          applicationObj.setApplaiedOn(now.toISOString().split('T')[0])
          applicationObj.setProtfolio(req.body.protfolio)
          applicationObj.setJobId(req.params.id)
          applicationObj.setUserId(userData[0].id)
          const result = await Application.addNew(applicationObj);
          if (result === true)  res.redirect('/')
          else res.send("<h1> Error ........ try again later </h1>")
        }

      }
      else {
        res.status(404).json("userID or jobID is not exists" + ` userID = ${isUserExists} ,  jobID = ${isJobExists}  `)
      }

    } catch (error) {
      res.status(404).json(error)
      console.log(error)
    }

  }
  // render all pages 


static browseJobs = async (req, res, next) => {// browseJob job
  try {
    const jobs = await Job.getAll()
    const category = await Category.getAll()
    const context = {
      "jobs": jobs,
      "category": category
    }
    res.render('jobs', context);

    
  }catch (error) { res.status(404).json('Error :' + error)}
}
static getApplyForJob = async (req, res, next) => {
  try { res.render('apply_for_job'); }
  catch (error) { res.status(404).json('Error :' + error)}

}
static getJobDetails = async (req, res, next) => {
  try {
    const job = await Job.get(req.params.id);
    const context = {
      "job": job,
    }
    res.render('job_details' , context ); 
  }catch (error) { res.status(404).json('Error :' + error)}

}
static AdminDashboard = async (req, res, next) => {
  try {
    const jobs = await Job.getAll()
    const context = {
      "jobs": jobs,
    }
    res.render('admin_dashboard', context);}
  catch (error) { res.status(404).json('Error :' + error)}

}
static getPostJob = async (req, res, next) => {
  try {
    const jobs = await Job.getAll()
    const context = {
      "jobs": jobs,
    }
    res.render('post_job', context);  
  } catch (error) {res.status(404).json('Error :' + error)}

}
static getUpdateJob = async (req, res, next) => {
  try {
    const jobs = await Job.get(req.params.id)
    if (jobs.length == 0) {
      res.status(201).send("<h1> No Job with this id</h1>")
    }
    else {
      const context = {
        "jobs":jobs
      }
      res.render('edit_job' , context)
    }


  } catch (error) {
    res.status(404).json('Error in updateJob :!' + error)
  }

}
}
module.exports = { JobController }