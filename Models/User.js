const {connectDb}  = require('../DB_conection/connect_db')
const util = require('util');
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class User
{
    constructor(id,name,email,password,age,address,image,is_admin,phone_number ,token ,gender , job_title , education){
        // id,name,email,password,age,address,image,is_admin,phone_number ,token
        this.id =id, 
        this.name =  name,
        this.email  = email, 
        this.password = password , 
        this.age = age ,
        this.address = address,
        this.image =image ,
        this.is_admin = is_admin ,
        this.phone_number =phone_number ,
        this.token =token , 
        this.gender =gender,
        this.education = education ,
        this.job_title = job_title

   }
   //========================= Getters ==================================
    getId() {  return this.id;}
    getName () { return this.name ;}
    getEmail() {  return this.email ;}
    getPassword() {  return this.password ;}
    getAge() {  return this.age ;}
    getAddress() {  return this.address ;}
    getImage() { return this.image ;}
    getIsAdmin() {  return this.is_admin;}
    getPhoneNumber() { return this.phone_number ;}
    getToken() { return this.token ;}
    getGender(){ return this.gender}
    getEducation(){ return this.education}
    getJobTitle(){ return this.job_title }

//=================================================== all setters ================================================
    setId (value)  {this.id= value  ; } 
    setName (value) {this.name= value  ;}
    setEmail(value) {this.email= value  ;}
    setPassword(value){this.password= value  ;}
    setAge(value) {this.age= value  ;}
    setAddress(value) {this.address= value  ;}
    setImage(value) {this.image= value  ;}
    setIsAdmin(value) {this.is_admin= value ;}
    setPhoneNumber(value) {this.phone_number= value  ;}
    setToken(value){this.token= value}
    setGender(value) {this.gender= value  ;}
    setEducation(value){ this.education = value}
    setJobTitle(value){ this.job_title = value}


//=====================================CRUDS Operations ==============================================
    static query = util.promisify(connectDb.query).bind(connectDb);


    static async getAll() {
        // name ,email ,gender , address , education , job_title , image , phone_number , age

        try {
            const result = await this.query("select  name ,email ,gender, phone_number , age from users")
            // console.log(result)
            return result
        } catch (error) {
            console.log("Can not get data from DB  :  " + error)
        }


    }
    static async get(token) {
        try {

            const result = await this.query(`select  name ,email ,gender , address , education , job_title , image , phone_number , age , token from users where token = \"${token}"`)
            if (result.length == 0) {
                return []
            }
            else return result
        } catch (error) {
            console.log("Can not get data from DB get(token) :  " + error)
        }

    }
    static async addNew(user) {
        try {
            // id,name,email,password,age,address,image,is_admin,phone_number ,token
            const result = await this.query("INSERT INTO users set ?", user)

            // Check if the job was inserted successfully
            if (result.affectedRows === 1) {
                console.log('user inserted successfully!');
                return true;
            } else {
                console.error('Error inserting users!');
                return false;
            }
        } catch (error) {
            console.log("Can not get data from DB in addNew   :  " + error)

        }

    }
    static async update(user) {
        try {
            //name ,email , age ,gender  address , phone_number  , job_title , education
            const result = await this.query(`UPDATE users SET name=?,email=?,gender=?,address=?,education=?,job_title=?,image=?,phone_number=?,age=? WHERE token=?`,
                [user.name, user.email, user.gender, user.address, user.education, user.job_title, user.image, user.phone_number, user.age, user.token])

            if (result.affectedRows == 1) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error)
        }
    }
    static async delete(token) {
        try {
            const result = await this.query(`DELETE FROM users WHERE  token = \"${token}"`)
            if (result.affectedRows === 1) {
                console.log('user deleted successfully!');
                return true;
            } else {
                console.error('Error deleting  user!');
                return false;
            }
        } catch (error) {
            console.log(error)

        }


    }
    //----------------------------------------------------------------------------------
    static async isEmailExists(email) {
        try {
            const checkEmailExists = await this.query(`select * from users where email = \"${email}"`);
            //const checkEmailExists = await this.query(`select * from users where email = ${email}`);
            if (checkEmailExists.length > 0) {
                return true
            }
            else {
                return false;

            }
        } catch (error) {
            console.log("error in is Email Exists :" + error)
        }



    }
    static async getIdByEmail(email) {
        try {
            const result = await this.query(`select id from users where email = \"${email}"`);
            return result[0].id;

        } catch (error) {
            console.log("Can not get data from DB in getIdByEmail   :  " + error)
        }



    }
    static async comparePasswprd(email, password) {
        try {

            const userPassword = await this.query(`select password from users where email = \"${email}"`);
            const checkPassword = await bcrypt.compare(password, userPassword[0].password);
            console.log(checkPassword)
            return checkPassword;
        } catch (error) {
            console.log(error)
        }


    }
    static async isExist(token) {

        const user = await this.query(`select id from users where token = \"${token}"`);
        if (user[0]) {
            return true;
        }
        return false;
    }
    static async isValid(token) {

        const user = await this.query(`select * from users where token =\"${token}"`);
        if (user[0]) {
            return true;
        }
        return false;
    }
    static async isAdmin(email) {
        try {

            const user = await this.query("select is_admin from users where email = ? ", [email]);
            if (user[0].is_admin) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }
    static async getUserByEmail(email) {
        try {
            const result = await this.query(`select  name ,email ,gender , address , education , job_title , image , phone_number , age from users where email = \"${email}"`)
            // console.log(result)
            return result
        } catch (error) {
            console.log("Can not get data from DB getUserByEmail(email) :  " + error)
        }

    }
    static async getTokenByEmail(email) {
        try {
            const result = await this.query(`select token from users where email = \"${email}"`)
            // console.log(result)
            return result[0].token;
        } catch (error) {
            console.log("Can not get data from DB getUserByEmail(email) :  " + error)
        }

    }
    static async getIdByToken(token) {
        try {
            const result = await this.query(`select id from users where token = \"${token}"`)
            return result[0].id
        } catch (error) {
            console.log("Can not get data from DB getUserByEmail(email) :  " + error)
        }

    }
///---------------------------
static async getAdmins() {
    try {

        const result = await this.query(`select  name ,email ,gender , address , education , job_title , image , phone_number , age , token from users where is_admin = 1`)
        if (result.length == 0) {
            return []
        }
        else return result
    } catch (error) {
        console.log("Can not get data from DB get(token) :  " + error)
    }

}


}


module.exports = {User}