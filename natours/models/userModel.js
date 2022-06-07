import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must confirm their password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  /*if password hasn't been modified, return early*/
  if (!this.isModified("password")) return next();

  /*hash password*/
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

export const User = mongoose.model("user", userSchema);
