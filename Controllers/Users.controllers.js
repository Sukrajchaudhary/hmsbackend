const { User } = require("../Models/Users.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dfzg6gkoh",
  api_key: "741581989754927",
  api_secret: "L-sHvL9R5__8OP-IdjX6fsSRGF8",
});

exports.UpdateProfile = async (req, res) => {
  try {
    const file = req.file;
    const { id } = req.user;
    const isexistingUser = await User.findById(id);
    if (!isexistingUser) {
      return res.status(400).send({ message: "User cannot find!!" });
    }
    if (!file) {
      return res
        .status(400)
        .send({ message: "Please Select Your Profile Picture !" });
    }

    // Upload the file to Cloudinary
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
        },
        async (error, result) => {
          try {
            isexistingUser.pic = result.url;
            await isexistingUser.save();
          } catch (error) {
            return res.status(500).send(error.message);
          }
        }
      )
      .end(file.buffer);

    return res
      .status(200)
      .send({ message: "Profile picture updated successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// 
exports.getUserInfo = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ error: 'User ID not provided in request' });
    }

    const { id } = req.user;
    console.log("ide from get user",id)
    const user = await User.findById({_id:id});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserInfo:', error); // Log the error for debugging
    return res.status(500).json({ error: 'Internal server error' });
  }
};