const express = require('express');
const router=express.Router();
require('../db/conn');
const bcrypt=require('bcryptjs');
const User =require("../model/userSchema")
const jwt=require('jsonwebtoken');
const authenticate =require('../middleware/authenticate')

router.get('/',(req,res) =>{
    res.send("hlo from router");
});
//using promises
// router.post('/register', async (req, res) =>{
//     const{name,email, phone, work, password, cpassword}=req.body;
//  if(!name || !email || !phone || !work || !password || !cpassword){
//  return res.status(422).json({error: "field is empty"});
//  }
//  User.findOne({email:email})
//  .then((userExist) =>{
//      if(userExist){
//         return res.status(422).json({error: "email already exist"});
//      }
//      const user=new User({name,email, phone, work, password, cpassword})

//      user.save().then(()=>{
//          res.status(201).json({message:"user registered successfully"});
//      }).catch((err) =>res.status(500).json({error:"failed to registered"}));
//  }).catch(err =>{console.log(err);})
// });

//using async-await
router.post('/register', async (req, res) =>{
    const {name,email, phone, work, password, cpassword}=req.body;
 if(!name || !email || !phone || !work || !password || !cpassword){
 return res.status(422).json({error: "field is empty"});
 }
 try{
    const userExist = await User.findOne({email:email})
    if(userExist){
        return res.status(422).json({error: "email already exist"});
     }
     else if(password != cpassword){
        return res.status(422).json({error: "password are not matching"});  
     }else {
        const user=new User({name,email, phone, work, password, cpassword});
      

        await user.save();
    
        res.status(201).json({message:"user registered successfully"});   
     
        }
     }
     catch(err){
    console.log(err);
 }
});

// login route
router.post('/signin',async (req,res) =>{
    try{
     let token
        const{email,password} =req.body;
        
        if(!email || !password){
            res.status(400).json({error:"Pls fill the data"})
        }
        const userLogin = await User.findOne({email:email});
        // console.log(userLogin)
        if(userLogin){
            const isMatch= await bcrypt.compare(password,userLogin.password)
             
            token=await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if(!isMatch)
            res.status(400).json({error:"Invalid credential"});
            else
            res.json({message:"user logged in successfully"})
            
        }
        else{
            res.status(400).json({error:"Invalid credential"});
        }
        

    }catch(err){
 console.log(err);
    }
})


router.get('/about', authenticate ,(req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});

// Logout  ka page 
router.get('/logout', (req, res) => {
    console.log(`Hello my Logout Page`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User lOgout');
});

module.exports = router;
