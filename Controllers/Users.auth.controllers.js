const { User } = require("../Models/Users.model");
const jwt = require("jsonwebtoken");
const { Sanetizer, MailSend } = require("../common/Common");
exports.CreateUsers = async (req, res) => {
  try {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }
    const newUser = new User(req.body);
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.SECRETE, {
      expiresIn: "2h",
    });
    newUser.token = token;
    await newUser.save();
    return res
      .cookie("jwt", token, {
        expiresIn: "2h",
        httpOnly: true,
        sameSite: "none",
      })
      .status(201)
      .json(Sanetizer(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user." });
  }
};

exports.LoginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password is Needed." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist!" });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Credentials!!" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRETE, {
      expiresIn: "2h",
    });
    return res
      .cookie("jwt", token, {
        expiresIn: "2h",
        httpOnly: true,
        sameSite: "none",
      })
      .status(200)
      .json({ token:token,role:user.role });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Passport-ResetRequest
exports.PasswordResetRequest = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRETE, {
        expiresIn: "2h",
      });
      user.resetPassword = token;
      await user.save();
      const link =
        "http://localhost:3000/api/reset-password?token=" +
        token +
        "&email=" +
        email;
      const subject = "Reset Password";
      const html = `<p>Click <a href="${link}">here</a> to reset Your password</p>`;
      const response = await MailSend({ to: email, html, subject });
      return res.status(200).json(response);
    }
    return res.status(400).json({ message: "Invalid email" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// set New Password
exports.setPassword = async (req, res) => {
  console.log(req.body)
  try {
    const { resetToken, email, newPassword } = req.body;
    const user = await User.findOne({ email: email, resetPassword: resetToken });
    if (user) {
      user.password = newPassword;
      await user.save();
      if (email) {
        const subject = " Password SuccessFully reset ";
        const html = `<p>SuccessFully reset your Password</p>`;
        const response = await MailSend({ to: email, subject, html });
        return res.json(response);
      }
    }
    return res.status(400).json({ message: "invalid Credentials" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
