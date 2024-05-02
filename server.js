// ================== all requierd packages ====================
const cors = require("cors");
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
// ================== all requierd modules ==================== 
const job = require('./Routers/Job_router');
const auth = require('./Routers/auth_router');
const general_pages = require('./Routers/general_pages_router')
const user = require('./Routers/user_router')
const application = require('./Routers/application_router')
const category = require('./Routers/category_router')

//========================= INITIALIZE EXPRESS APP ================
const express = require('express');
let app = express();
let  port = 5000;
// ====================  GLOBAL MIDDLEWARE ====================
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 
app.use(cookieParser())

// to serve the dynamic fiels and run js code into html 
app.set('view engine', 'ejs');
app.set('views', 'Views');
// to serve the static files images folder , resumes folder  and all html and css files from views folder  
app.use(express.static("Views"));


// ====================  API ROUTES [ ENDPOINTS ]  ====================
app.use('/' , job);
app.use( '/',auth);
app.use('/' , user);
app.use('/' , general_pages)
app.use('/', application)
app.use('/category' , category)

// ============================ test my code  ======================
// app.get('/set_test',async(req,res,next)=>{
//     res.cookie('token' , 'cookiesnumber1') ;
//     res.send(req.cookies.token)

    
// })
// app.get('/get_test',async(req,res,next)=>{

//     console.log("the token in get is :" + req.cookies.token  )
//     res.send(req.cookies)// get all cookies
    

// })
// app.get('/logout_test', async(req,res,next)=>{
    
//     res.clearCookie('token')
//     if(req.cookies.token  == null){
//         res.send("<h1>hi there is no token </h1>") 
//     }
//     else{
//         console.log("the token in get is :" + req.cookies.token )
//         res.send(req.cookies)// get all cookies
    
//     }
    
    
// }) 


//======================= run the app ================================

app.listen(port , ()=>{console.log(`this server running in port number :  ${port}` )})


