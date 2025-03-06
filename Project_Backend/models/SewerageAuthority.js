const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Sewerage authority
const SewerageauthoritySchema = new Schema(
  {
    Id: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    // geolocation
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    // photo
    photo: {
      type: String,
      required: true,
    },
    // Citizen
    Citizen: {
      type: Schema.Types.ObjectId,
      ref: 'Citizen',
    },
    code: {
      type: Number,
    },
  }, {
  timestamps: true
}
);

module.exports = mongoose.model('SewerageAuthority', SewerageauthoritySchema);
