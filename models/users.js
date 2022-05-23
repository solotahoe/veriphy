const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true, unique: false },
  LastName: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: false },
  PhoneNumber: { type: Number, required: true, unique: false },
  OTP: { type: Number, required: true, unique: false },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Registration_data_from_Client", userSchema);
