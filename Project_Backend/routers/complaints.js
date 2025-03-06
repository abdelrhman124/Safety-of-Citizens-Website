const Complaint = require('../models/complaints');
const Citizen = require("../models/Citizen");
const verifyToken = require('./verifytoken');
const router = require("express").Router();

// Create a complaint
router.post("/", verifyToken.verifytoken, async (req, res) => {
    // req.user._id  -> token
    const user = await Citizen.findById(req.user._id);
    if (!user) return res.status(400).json("Citizen does not exist");

    const last = await Complaint.findOne().sort({code: -1});
    let lastNumber = 1;
    if (last) {
        // get max number and add 1
        lastNumber = last.code + 1;
    }
    
    // Create a new complaint
    const newComplaint = new Complaint({
        complaint: req.body.complaint,
        Citizen: req.user._id,
        code:lastNumber

});
    try {
        const savedComplaint = await newComplaint.save();
        // return the Complaint and the citizen who created it without the password
        const {password, ...others} = user._doc;
        res.status(201).json({savedComplaint, others});
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;