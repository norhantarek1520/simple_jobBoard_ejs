const {connectDb} = require("../DB_conection/connect_db");
const util = require("util");

 
const authorized = async(req , res , next )=>{
    // 1. connect db
    const query = util.promisify(connectDb.query).bind(connectDb);
    // 2. get the token from the header 
    //const {token} = req.headers ;
    const token =  req.cookies.token ;
    // 3. get data from db  
    const user = await query("select * from users where token = ?" , [token] );
    // 4. show the result 
    if (user[0]) {
        res.locals.user = user[0];
        next();
      } else {
        res.status(401 ).json({
          msg: "you are not authorized to access this route !",
        });
      }

}



module.exports = {authorized};