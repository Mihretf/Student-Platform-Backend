require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db")

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "http://localhost:3000", credentials: true}));

app.get("/", (req, res) =>{
    res.json({success: true, message: "API is up and running"});
});

const PORT= process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port${PORT}`));