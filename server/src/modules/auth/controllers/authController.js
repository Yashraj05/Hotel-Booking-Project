let bcrypt = require('bcrypt');
// let User = require('../models/usermodel');
let jwt = require('jsonwebtoken');

exports.signup= async(req,res)=>{
    // if(!req.body.email || !req.body.password){
    //     return res.status(400).send( `Please enter email and password`);
    // }

    // let alreadyUser = await User.findOne({email : req.body.email});
    // if(alreadyUser ){
    //     return res.status(500).send(`User Already Exists`);
    // }

    // let hashPassword = await bcrypt.hash(req.body.password , 10).catch(err => console.log(err));
    // const user = new User({
    //     email : req.body.email,
    //     password : hashPassword
    // })
    // user.save().then((result)=>{
    //     return res.status(201).send(`User Registed`);
    // }).catch((err)=>{
    //     return res.status(400).send(err);
    // })
    console.log("I am Called");
}