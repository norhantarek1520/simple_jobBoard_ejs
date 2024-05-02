const mysql = require('mysql');

const connectDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null , 
  database : 'wuzzf'
});

connectDb.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});


// module.exports= {connectDb} ;
module.exports= {connectDb} ;