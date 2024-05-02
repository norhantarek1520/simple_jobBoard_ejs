const { User } = require('../Models/User')

class UserController {

   static userProfile = async (req, res, next) => {
      try {
        // Extract token from cookies, handle potential errors:
      //   const cookies = parse(req.headers.cookie || '');
        const token = req.cookies.token;
        if (!token) { throw new Error('Missing token in cookie');}
        else{
          const user = await User.get(token);   
          if (user.length !== 0) {res.render('user_profile', { users: user });} 
          else {
            const errorData = {
               message: error.message,
               stack: error.stack, // Include stack trace for debugging (optional)
               token: req.cookies.token, // Add token for easier tracking
               timestamp: new Date().toLocaleString() // Add timestamp for audit purposes
            };
            res.redirect('/errorPage', errorData);
           }
        }   
       
      } catch (error) {console.error('Error:', error.message); }
    };   
   static editProfile = async (req, res, next) => {

      const token = req.cookies.token;
      const oldData = await User.get(token);
      if (oldData.length === 0) {
         return res.status(404).json({ msg: "User not found!" });
      }
      else {
         const newData = new User();
         //name ,email ,gender , address , education , job_title , image , phone_number , age 
         if (req.body.name != null) { newData.setName(req.body.name); }
         else { newData.setName(oldData[0].name); }

         if (req.body.email != null) { newData.setEmail(req.body.email); }
         else { newData.setEmail(oldData[0].email); }

         if (req.body.age != null) { newData.setAge(req.body.age); }
         else { newData.setAge(oldData[0].age) }

         if (req.body.gender != null) { newData.setGender(req.body.gender); }
         else { newData.setGender(oldData[0].gender) }

         if (req.body.address != null) { newData.setAddress(req.body.address); }
         else { newData.setAddress(oldData[0].address) }

         if (req.body.education != null) { newData.setEducation(req.body.education); }
         else { newData.setEducation(oldData[0].education) }

         if (req.body.job_title != null) { newData.setJobTitle(req.body.job_title); }
         else { newData.setJobTitle(oldData[0].job_title) }

         if (req.body.phone_number != null) { newData.setPhoneNumber(req.body.phone_number); }
         else { newData.setPhoneNumber(oldData[0].phone_number) }

         newData.setToken(token)
         //   // Handle image upload and update user's image field
         //    if (req.file) {
         //       const image = req.file.path; // Get the stored image path
         //       newData.setImage(image);
         //      // Delete old image if a new one was uploaded
         //       if (oldData.image) {
         //       fs.unlinkSync('./uploads/' + oldData.image);
         //       }
         //    } else {
         //       newData.setImage(oldData.image);
         //    }
         const result = await User.update(newData);
         if (result == true) {
            res.redirect('/Profile')
           console.log("User updated successfully" )
         } else {
            res.status(404).json({ msg: "Failed to update user" });
         }
      }

   }
   static getEditProfile = async (req, res, next) => {

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
module.exports = { UserController }