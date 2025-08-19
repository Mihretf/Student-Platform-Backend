// // To connect with our database
// const mongoose= require("mongoose"); // this is ODN, Object data modelling, library in MongoDB in Node.js. It makes it easier to define schemas and use them as objects in JavaScirpt. 
// const connectDB = async () =>{
//     try {
//         console.log("MONGO_URI from env:", process.env.MONGO_URI);

//         await mongoose.connect("MONGO_URI from env:", process.env.MONGO_URI
  
// );// tells to connect to a MongoDB instance running on our local machine, which is the local host, with the database name student_platform_db. If a db doesn't exist, then it will automatically create when we first add our data
//         console.log(`Mongodb Connected`);
//     } catch (error) {
//         console.log(`Could not connect to MongoDB ${error}`);
        
//     }
// }

// module.exports = connectDB; // will make our connectDB aviailable in other files. 




const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log("Connecting to MongoDB at:", uri);

    // Mongoose 6+ only needs the URI string
    await mongoose.connect(uri);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Could not connect to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

