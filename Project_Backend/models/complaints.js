const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// الشكاوي
  const complaintsSchema = new Schema(
  {
    complaint : {
      type: String,
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

module.exports = mongoose.model('Complaints', complaintsSchema);