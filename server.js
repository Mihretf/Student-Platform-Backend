require("dotenv").config();
const express = require("express"); // this is a node framework that is used to create webservers and APIs

const connectDB= require("./config/db_connection")
const app = express() // creating an instnce tht will handle the incoming Http requests
require('dotenv').config()
app.use(express.json());

const PORT = 5000 // port number my variable will listen to
const authRoutes = require("./routes/authRoutes")
app.use("/api/v1/auth", authRoutes);
const courseRoutes = require("./routes/courseRoutes")
app.use("/api/v1/courses", courseRoutes);
const assignmentRoutes = require("./routes/assignmentRoutes"); // Assignment routes
app.use("/api/v1/assignments", assignmentRoutes); // Mount assignment routes at /api/v1/assignments
app.use("/api/v1/ai", require("./routes/aiRoutes"));



connectDB().then (()=>{
    app.listen(PORT, () => console.log(`Server is connected to port ${PORT}`)) // will start the server and tells to listen for incoming requests on the specified PORT, and the second argument runs when teh server successfully starts

}) 


process.on("unhandledRejection", err =>{
    console.log(`An error occured: ${err.message}`);
    server.close(() =>process.exit(1))
})