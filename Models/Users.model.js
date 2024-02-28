const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    pic: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
    },
    resetPassword:{
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (Password) {
  try {
    return await bcrypt.compare(Password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

exports.User = mongoose.model("User", userSchema);
