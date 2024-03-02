const mongoose = require("mongoose");
const validator = require("validator");

const StudentsSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id already used"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  gender: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    required: true,
  },
  approve:{
    type: Boolean
  },
  password: {
    type: String,
    min: 10,
    required: true,
  }
});

//create model
const Students = new mongoose.model("Students", StudentsSchema);

module.exports = Students;
