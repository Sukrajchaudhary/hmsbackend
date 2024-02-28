const jwt = require("jsonwebtoken"); // Import jsonwebtoken package
const nodemailer = require("nodemailer");
exports.isAuth = (req, res, next) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.SECRETE);
    req.user = data;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid Token" });
  }
};

exports.Sanetizer = (user) => {
  return {
    id: user._id,
    email: user.email,
    token: user.token,
    role: user.role,
  };
};
// send mail
("use strict");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "kaalidash208@gmail.com",
    pass:process.env.pass,
  },
});

exports.MailSend = async function ({ to, html, subject }) {
  try {
    const info = await transporter.sendMail({
      from: '"Dentish 👻" <foo@example.com>',
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    // Instead of sending a response here, you can throw the error
    throw new Error(error.message);
  }
};

// mail templates

exports.mailTemplates = (appoiments) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appointment Confirmation</title>
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  .container {
    max-width: 600px;
    margin: 20px auto;
    padding: 25px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h1, p {
    margin: 0 0 20px;

  }
  .details {
    margin-bottom: 20px;
  }
  .details p {
    margin: 15px 0;
  }
  .contact-info {
    margin-top: 20px;
    font-size: 14px;
  }
  .head{
    background: green;
    padding: 12px;
    border-radius: 3px;
    color: white;
    font: bold;
  }
  .cancled{
    background: red;
    padding: 2px;
    border-radius: 3px;
    color: white;
    font: bold;
  }
  .approved{
    background: green;
    padding: 2px;
    border-radius: 3px;
    color: white;
    font: bold;
  }
</style>
</head>
<body>
<div class="container">
  <p class="head">Dear: ${appoiments.userID.username}</p>
  ${
    appoiments.status === "cancled"
      ? `<p>We are thrilled to <span class="cancled"> ${appoiments.status} </span> your upcoming dental appointment at Sukraj Dentistry! Get ready to maintain your healthy smile because we can’t wait to provide you with exceptional dental care.</p>
  <div class="details">
    <p><strong>Date:</strong> ${appoiments.appointmentDate}</p>
    <p><strong>Time:</strong> ${appoiments.appointmentTime}</p>
    <p><strong>Dentist:</strong> ${appoiments.doctorID.username}</p>
    <p>Warmest regards,</p>
        <p>Sukraj Dentistry</p>
  </div>`
      : ` <p>We are thrilled to <span class="approved">${appoiments.status} </span> your upcoming dental appointment at Sukraj Dentistry! Get ready to maintain your healthy smile because we can’t wait to provide you with exceptional dental care.</p>
      <div class="details">
        <p><strong>Date:</strong> ${appoiments.appointmentDate}</p>
        <p><strong>Time:</strong> ${appoiments.appointmentTime}</p>
        <p><strong>Dentist:</strong> ${appoiments.doctorID.username}</p>
      </div>
      <p>At Sukraj Dentistry, we are committed to providing comprehensive dental services to ensure your oral health and well-being.</p>
      <p>If you have any questions or need to reschedule your appointment, please don’t hesitate to contact us. We’ll do our best to accommodate your needs.</p>
      <p>We look forward to seeing you soon!</p>
      <div class="contact-info">
        <p>For any inquiries, please contact:</p>
        <p><strong>Dentist:</strong> ${appoiments.doctorID.username}</p>
        <p><strong>Email:</strong>${appoiments.doctorID.email}</p>
        <p><strong>Phone:</strong>${appoiments.doctorID.phone}</p>
        <p>Warmest regards,</p>
        <p>Sukraj Dentistry</p>
      </div>`
  }
 
</div>
</body>
</html>
`;
};
