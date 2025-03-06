const router = require("express").Router();
const Citizen = require("../models/Citizen");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req,res)=>{

    // Check if the username is already exist
    let user = await Citizen.findOne({nationalId: req.body.nationalId});
    if (user) {
        return res.status(400).send("nationalId already exist");
    }
    // Check if the email is already exist
    user = await Citizen.findOne({emailAddress: req.body.emailAddress});
    if (user) {
        return res.status(400).send("Email already exist");
    }
    // Check if the phone number is already exist
    user = await Citizen.findOne({phoneNumber: req.body.phoneNumber});
    if (user) {
        return res.status(400).send("Phone number already exist");
    }
    // min length of nationalId is 14
    if (req.body.nationalId.length != 14) {
        return res.status(400).send("nationalId is not valid, Enter Valid one");
    }
    // phone number must be 11 digits
    if (req.body.phoneNumber.length != 11) {
        return res.status(400).send("Phone number is not valid, Enter Valid one");
    }
    // hash the password (encryption)
    // bcrypt -> library for passwords 
    const hashPassword = await bcrypt.hash(req.body.password, parseInt(process.env.PASS_SEC));
    const newUser = new Citizen({
        nationalId:req.body.nationalId,
        emailAddress:req.body.emailAddress,
        password:hashPassword,
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
    });

try {
    await newUser.save();
    const {password, ...others} = newUser._doc;

    res.status(201).json(others);
} catch (err) {
    res.status(500).json(err);
}
    
});


// Login
router.post("/login", async(req,res)=>{

    const user = await Citizen.findOne({nationalId: req.body.nationalId});
    if (!user) return res.status(400).json("Incorrect nationalId");
    
    // Check Valid password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json("Incorrect Password");
    //console.log(process.env.TOKEN_SECRET)
    const acessToken = jwt.sign({
        _id : user._id,
    }, 'my',{expiresIn:"7d"});

    const {password, ...others} = user._doc;

    res.status(201).json({...others, acessToken})

});

module.exports = router;