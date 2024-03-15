const { Appointment } = require("../Models/Appoinments.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dfzg6gkoh",
  api_key: "741581989754927",
  api_secret: "L-sHvL9R5__8OP-IdjX6fsSRGF8",
});

exports.GetAllUsersAppoinments = async (req, res) => {
  try {
    let UsersAppoinments = await Appointment.find()
      .populate("userID")
      .populate("doctorID")
      .exec();

    let totalAppoinments = await Appointment.countDocuments();
    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit, 5);
      const page = parseInt(req.query._page, 5);
      console.log(pageSize,page)
      UsersAppoinments = await Appointment.find()
        .populate("userID")
        .populate("doctorID").sort({
          createdAt
          :-1})
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .exec();
    }

    res.set('X-Total-Count', totalAppoinments);
    return res.status(200).json(UsersAppoinments);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

