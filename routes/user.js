const express =require('express');
const router = express.Router();

router.get("/sign",(req,res)=>{
    res.render("/user/signup.ejs");
});

module.exports = router;