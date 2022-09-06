const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true

    },
    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,

},

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
   {timestamps: true, }
  
);

module.exports = mongoose.model("Admin", AdminSchema);