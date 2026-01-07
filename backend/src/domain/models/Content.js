const mongoose = require('mongoose');
const { Schema } = mongoose;

const contentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pdf: { type: String, required: true },
  assetBundle: { type: String, required: true },
  subModule: { type: Number, required: true },
  scenario: { type: Schema.Types.Mixed, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
