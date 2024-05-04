const { Doctor } = require("../Models/Doctor.model");
exports.CreateDoctors = async (req, res) => {
  try {
    let existingDoctor = await Doctor.findOne({ email: req.body.email });
    if (existingDoctor) {
      return res
        .status(400)
        .send({ message: "Doctor with this email already exists." });
    }
    let newDoctor = new Doctor(req.body);
    await newDoctor.save();
    return res.status(201).send(newDoctor);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.LoginDoctors = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "Input fields must be Required" });
    }

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res
        .status(400)
        .send({ message: "Users With these email doesn't exist !" });
    }

    const ispasswordValid = await doctor.comparePassword(password);
    if (!ispasswordValid) {
      return res.status(400).send({ message: "Invalid Credentials !!" });
    }
    const loginedDoctor = await Doctor.findById(doctor._id).select("-password");

    return res.status(200).send(loginedDoctor);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// TODO:Seprate These routes
// Get Doctors with _id;
exports.getDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById({ _id: id });
    return res.status(200).send(doctor);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// GetallDoctors
exports.getallDoctors = async (req, res) => {
  try {
    const doctor = await Doctor.find().exec();
    if (!doctor) {
      return res.status(400).send({ message: "Doctor Not Avilabel" });
    }
    return res.status(200).send(doctor);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
