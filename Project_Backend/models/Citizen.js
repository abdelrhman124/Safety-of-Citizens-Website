const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// 1 for Engineering manager , 2 for Roads and Bridges manager , 3 for Sewerage manager , 4 for Traffic Authority manager
const CitizenSchema = new Schema(
  {
    // 3010889741567
    nationalId: {
      type: Number,
      required: true,
      unique: true
    },
    // mohamed@gmail.com
    emailAddress: {
      type: String,
      required: true,
      unique: true
    },
    // MohamedReda123
    password: {
      type: String,
      required: true
    },
    // Mohamed
    firstName: {
      type: String,
      required: true,
    },
    // Reda
    lastName: {
      type: String,
      required: true,
    },
    // Male or Female
    gender: {
      type: String,
      required: true
    },
    // phone number
    phoneNumber: {
      type: Number,
      required: true
    }
  }, {
  timestamps: true
}
);

module.exports = mongoose.model('Citizen', CitizenSchema);