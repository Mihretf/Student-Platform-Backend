// To connect with our database
const mongoose= require("mongoose"); // this is ODN, Object data modelling, library in MongoDB in Node.js. It makes it easier to define schemas and use them as objects in JavaScirpt. 
const connectDB = async () =>{
    try {
        const connect = await mongoose.connect("mongodb://localhost/student_platform_db");// tells to connect to a MongoDB instance running on our local machine, which is the local host, with the database name student_platform_db. If a db doesn't exist, then it will automatically create when we first add our data
        console.log(`Mongodb Connected`);
    } catch (error) {
        console.log(`Could not connect to MongoDB ${error}`);
        
    }
}

module.exports = connectDB; // will make our connectDB aviailable in other files. 



