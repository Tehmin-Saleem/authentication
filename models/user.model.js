const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'username can not be blanked'],
    unique: false
  },
  password:{
    type:String,
    required: [true, 'password can not be blanked'],
  }
  
});

module.exports = mongoose.model("User", userSchema);
