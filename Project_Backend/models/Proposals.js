const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// المقترحات
  const proposalsSchema = new Schema(
  {
    proposal : {
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

module.exports = mongoose.model('Proposals', proposalsSchema);