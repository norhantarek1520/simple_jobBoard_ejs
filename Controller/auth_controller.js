const { User } = require('../Models/User')
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


class AuthorizeController {

  static login = async (req, res, next) => {

    try {
      const { email, password } = req.body;
      const emailExists = await User.isEmailExists(email);
      const isPasswordValid = await User.comparePasswprd(email, password);

      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
      }
      else if (emailExists == false) {
        return res.status(404).json({ error: 'User not found' });
      }
      else if (isPasswordValid == false) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      else {
        const token = await User.getTokenByEmail(email);
        res.cookie('token' , token) ;
        res.redirect('/profile') 
      }
    } catch (err) {
      res.status(500).send(err)
    }


  }
  static logout = async (req, res) => {
    // // Invalidate the user's session
    // req.session.destroy(() => {
    //   // Clear any authentication-related cookies
    //   res.clearCookie('authentication_cookie');

    //   // Redirect to the login page or homepage
    //   // res.redirect('/login');
    // });
    res.clearCookie('token')
    if(req.cookies.token){ res.redirect('/');}
    else{ res.send("Fail in loging out ")}
  }
  static registre = async (req, res, next) => {
    try {

      const { name, email, password } = req.body;
      const emailExists = await User.isEmailExists(email);

      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Missing username or email or password' });
      }
      else if (emailExists == true) {
        return res.status(404).json({ msg: "this email is already exists " });
      }
      else {
        // 3- PREPARE OBJECT USER TO -> SAVE

        const user = new User()
        user.setName(req.body.name);
        user.setEmail(req.body.email);
        user.setPassword(await bcrypt.hash(req.body.password, 10));
        user.setToken(crypto.randomBytes(16).toString("hex"));

        // 4- INSERT USER OBJECT INTO DB
        const result = await User.addNew(user);
        if (result === true) {
          delete user.getPassword();
          res.redirect('login')
        }
        else {
          res.status(404).json({ msg: "Registered fail , can not insert this user" });
        }

      }

    } catch (err) {
      res.status(500).send("errrrrr++rrrrrror " + err);
    }

  }
  static getLogin = async(req, res) => {
    res.render('login'); 
 }
 static getRegister = async(req, res) => {
  res.render('registre'); 
 }


}
module.exports = { AuthorizeController }