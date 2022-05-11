const express=require("express")
const router=express.Router()
const User=require("../models/userModel")
const bcrypt=require("bcrypt")

//register user
router.post("/register",async(req,res)=>{

    try {
        const body=req.body;
        if(!(body.email && body.password)){
            return res.status(404).send({message:"something is wrong"})
        }
        console.log(req.body)
        const user=new User(req.body)
        //generate salt to hash password
        const salt =await bcrypt.genSalt(10)
        //now we set user password to hashed password
        user.password=await bcrypt.hash(user.password,salt);
        const newUser=await user.save()
        res.status(202).send(newUser)
        
    } catch (error) {
        res.status(404).send(error)
        
    }
 })

 //getUsers
 router.get("/home",async(req,res)=>{
    try {
        console.log(req.body)
        const user= await  User.find()
        res.status(202).send(user)
    } catch (error) {
       res.status(404).json({message:"something is wrong"}).send(error)
    }
})

//login user
router.post("/login",async(req,res)=>{
    const body=req.body;
    const user= await User.findOne({email:body.email})
    if(user){
        //check user password with hashed password stored in the database
        const validPassword=await bcrypt.compare(user.password,body.password);
        if(validPassword){
            res.status(202).send({message:"login successfully"})
        }else{
            res.status(404).send({message:"password is not valid"})
        }
    }else{
        res.status(404).send({message:"user does not exist"})
    }
});

//exports routes
module.exports=router