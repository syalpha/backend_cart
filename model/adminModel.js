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

<<<<<<< HEAD
      },
    isAdmin: {
      type: Boolean,
      default: true,
=======
>>>>>>> f674e88bac075b444a1f3204b6ec390fddbda007
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);