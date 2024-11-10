const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  dob: { type: Date, required: true },
  address1: String,
  address2: String,
  city: String,
  postalCode: String,
  country: String,
  phoneNumber: String,
  email: { type: String, required: true, unique: true },
  userNotes: String,
});

module.exports = mongoose.model('User', userSchema);
