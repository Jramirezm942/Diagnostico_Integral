const express = require("express");
const router = express.Router();


const  {loginProcess, 
    signupProcess, 
    logoutProcess, 
    checkSession,
    googleInit,
    googleCallback
} = require ("../controllers/auth")



router.post("/login", loginProcess);


router.post("/signup", signupProcess);

router.get("/logout", logoutProcess);

router.get("/session", checkSession);

router.get("/google",googleInit)
router.get("/google/callback",googleCallback)
  



module.exports = router
