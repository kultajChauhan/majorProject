const express =require('express');
const router = express.Router();
const User = require("../model/user.js");
const wrapAsync = require('../utils/wrapAsync.js');

router.get("/sign",(req,res)=>{
    res.render("/user/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let {username, email, password}= req.body;
const newUser =new User({email,username});
const registeredUser = await User.register(newUser,password);
console.log(registeredUser);
req.flash("success","welcome to Wanderlust");
res.redirect("/listings");
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

}));

module.exports = router;