// config/db.js

const mysql = require('mysql');

// MongoDB connection URL
//const mongoURL = 'mongodb://127.0.0.1:27017/local';

// Function to connect to MongoDB
// const connectDB = async () => {
    let conn =  mysql.createConnection( {
      host: "localhost",
      user: "root",
      password: "12345"
    });

conn.connect(function (err){
    if(err)
        throw err;
    console.log("connect to db successfully")
    
})
// };

//module.exports = connectDB;
