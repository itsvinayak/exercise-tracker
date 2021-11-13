const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true, min: 1 },
  date: { type: Date, default: new Date() },
});


LogSchema.virtual('dateString').get(function () {
  const date = this.date.toDateString();
  return date;
});

module.exports = mongoose.model('Log', LogSchema);