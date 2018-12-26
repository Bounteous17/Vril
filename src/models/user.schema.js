const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateEmail = email => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema(
  {
    full_name: { type: String, required: [true, "Full name must be provided"] },
    username: { type: String, unique: true, required: [true, "Username must be provided"] },
    email: {
      type: String,
      Required: "Email address cannot be left blank.",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address"
      ],
      index: { unique: true, dropDups: true }
    },
    password: {
      type: String,
      required: [true, "Password cannot be left blank"]
    }
  },
  { timestamps: {} }
);

module.exports = mongoose.model("Users", userSchema);
