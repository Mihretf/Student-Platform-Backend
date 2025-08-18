const express = require('express')//Imports Express so we can create a router.
const router = express.Router() // Creates a new router instance. Think of this as a mini-app for auth routes.
const authController = require("../controllers/authController"); // Imports your controller so the route can call the register function.

router.post("/register", authController.register); // When a request hits this URL, it executes the register function in authController.
router.post("/login" , authController.login );
router.post("/refresh-token" , authController.refresh);
router.post("/logout" , authController.logout);


module.exports = router; //Exports the router so it can be mounted in your server.js (or main app file).