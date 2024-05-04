const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const doctorSchemas = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    specialization: {
      type:Schema.Types.Mixed,
      require: true,
    },
    pic:{
        type:String,
        default:null
    }
  },
  { timestamps: true }
);

doctorSchemas.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
doctorSchemas.methods.comparePassword = async function (Password) {
  try {
    return await bcrypt.compare(Password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
exports.Doctor = mongoose.model("Doctor", doctorSchemas);
