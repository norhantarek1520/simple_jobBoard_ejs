const {User} = require('../Models/User');
const {Category} = require('../Models/Category ')
const nodemailer = require('nodemailer')

const homePage = async(req, res) => {
    const categories = await Category.getAll();
    const admins = await User.getAdmins()
    res.render('index' , {"categories" : categories , "admins" : admins}); 
};
const contact = async(req, res) => {
    res.render('contact'); 
};
const sendEmail = async(req, res) => {
    console.log("jjjjjjjjjjjjjjjjjjjjjjj")
    //gkcn dmpj xvbs akf
// Gmail configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'norhantarek1520@gmail.com', // Replace with your Gmail address
    pass: 'gkcn dmpj xvbs akf' // Replace with your Gmail app password
  }
});

// Email options
const mailOptions = {
  from: req.body.email , // Sender address
  to: 'norhantarek1520@gmail.com', // Recipient email
  subject: req.body.subject,
      text: req.body.message
};
console.log(req.body.email  )
// Send the email
 transporter.sendMail(mailOptions, (error, info) => {
    console.log("lastjjjjjjjjjjjjj")
  if (error) {
    console.error(error);
    res.redirect('/about')
  } else {
    console.log('Email sent:', info.response);
    res.redirect('/')
  }
});
res.redirect('/login')

};
const about = async(req, res) => {
    res.render('about'); 
};
const errorPage =async(req,res) =>{
//   const errorData = {
//     message: error.message,
//     stack: error.stack, // Include stack trace for debugging (optional)
//     token: req.cookies.token, // Add token for easier tracking
//     timestamp: new Date().toLocaleString() // Add timestamp for audit purposes
//  };
// res.render('error_page', errorData)
res.render('error_page')
}
module.exports ={homePage , contact , sendEmail,about , errorPage}