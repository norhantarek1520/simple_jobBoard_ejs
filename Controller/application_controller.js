
const { Application } = require('../Models/Application')
const { User } = require('../Models/User')
const { Job } = require('../Models/Job');
const { application } = require('express');
class ApplicationController {

  static addNewApplication = async (req, res, next) => {
    try {

      const token =  req.cookies.token ;
      const userId = await User.getUserByToken(token)
      const isUserExists = await User.isExist(token)
      const isJobExists = await Job.isExist(req.params.id)

      if (isJobExists == true & isUserExists == true) {
        const appliedBefore = await Application.appliedBefore(userId, req.params.id)
        if (appliedBefore == true) { res.status(404).json('You applay for this job before') }
        else {
          const applicationObj = new Application()
          const now = new Date();
          applicationObj.setApplaiedOn(now.toISOString().split('T')[0])
          applicationObj.setProtfolio(req.body.protfolio)
          applicationObj.setJobId(req.params.id)
          applicationObj.setUserId(userId)
          const result = await Application.addNew(applicationObj);
          if (result === true) res.status(200).json("You Apply for this job successfully ")
          else res.status(404).json('Fail to Apply , try again later..')
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
  static deleteApplication = async (req, res, next) => {
    try {
      const token =  req.cookies.token ;
      const userId = await User.getUserByToken(token)
      const result = await Application.delete(userId, req.params.id)
      if (result === true) {
        res.status(200).json(" Application deleted  successfully ")
      }
      else res.status(404).json(' This Application is is not exsist')


    } catch (error) {
      res.status(404).json(error)

    }
  }
  static userApplications = async (req, res, next) => {
    // get all applications for this user
    try {
      const token =  req.cookies.token ;
      const userId = await User.getUserByToken(token);

      const result = await Application.getUserApplications(userId)
      if (result.length != 0) res.status(200).json(result)
      else res.status(404).json("You have not applied for any job ")

    } catch (error) {
      res.status(404).json(error)

    }

  }
  static userApplication = async (req, res, next) => {
    try {
      const token =  req.cookies.token ;
      const userId = await User.getUserByToken(token);

      const result = await Application.getUserApplication(userId, req.params.id)
      if (result.length != 0) res.status(200).json(result)
      else res.status(404).json("You have not applied for this job ")

    } catch (error) {
      res.status(404).json(error)

    }
  }
  static JobApplications = async (req, res, next) => {
    try {

      const result = await Application.getJobApplications(req.params.id)
      if (result.length != 0) {
        const context = {"jobApplications" : result}
        res.render('job_appications' ,context )}
      else res.status(404).json("No one has applied for this job")

    } catch (error) {
      res.status(404).json(error)

    }
  }

  static updateApplication = async (req, res, next) => {
    // by application id from getApplicationId  
    //or job+user id
    try {
      const oldData = await Application.getApplicationById(req.params.id);
      const newData = new application()

      if (req.body.protfolio != null) { newData.setProtfolio(req.body.protfolio); }
      else { newData.setProtfolio(oldData[0].protfolio); }
      // if(req.file.cv != null){newData.setCv(req.file.cv)}
      // else{newData.setCv(oldData[0].cv)}
      Application.setId(req.params.id)

      const result = await Application.update(newData);
      if (result.length != 0) { res.status(201).json("done") }
      else res.status(404).json("fail")

    } catch (error) {
      res.status(404).json(error)
    }
  }
  static userApplications = async (req, res, next) => {

    const token = req.cookies.token;
    const users = await User.get(token);
   
    if (users.length === 0) {
       return res.status(404).json({ msg: "User not found!" });
    }
    else{
       const context = {
          "users" : users
       }
       res.render('edit_user_profile' , context)
    }
   

 }


}
module.exports = { ApplicationController }