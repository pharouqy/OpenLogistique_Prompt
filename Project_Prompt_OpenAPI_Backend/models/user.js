const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userShcema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthDate: { type: String, required: true },
  ocupation: { type: String, required: true },
  email: { type: String, required: true, unqiue: true },
  password: { type: String, required: true },
});

userShcema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userShcema);
