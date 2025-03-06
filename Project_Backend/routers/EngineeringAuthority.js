const Citizen = require("../models/Citizen");
const verifyToken = require('./verifytoken');
const router = require("express").Router();
const EngineeringAuthority = require('../models/EngineeringAuthority');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage }).single('photo');

// make a complaint
router.post("/", verifyToken.verifytoken, upload, async (req, res) => {
  const user = await Citizen.findById(req.user._id);
  if (!user) return res.status(400).json("Citizen does not exist");

  // get last complaint number
  let lastComplaintNumber = 1;
  const lastComplaint = await EngineeringAuthority.findOne().sort({ code: -1 });
  if (lastComplaint) {
    // get max complaint number and add 1
    lastComplaintNumber = lastComplaint.code + 1;
  }
  const temp = 1;
  const newComplaint = new EngineeringAuthority({
    Citizen: req.user._id,
    description: req.body.description,
    location: {
      type: "Point",
      coordinates: [req.body.longitude, req.body.latitude],
    },
    code: lastComplaintNumber,
    Id:temp
  });

  // check if a photo was uploaded
  if (req.file) {
    // set the photo field with the path of the uploaded file
    newComplaint.photo = req.file.path;
  }

  try {
    const savedComplaint = await newComplaint.save();
    // return the complaint and the citizen who created it without the password
    const { password, ...others } = user._doc;
    res.status(201).json({ savedComplaint, others });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;