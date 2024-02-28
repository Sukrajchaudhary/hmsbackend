const { Appointment } = require("../Models/Appoinments.model");
const { Blog } = require("../Models/Blog.model");
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

// Posting Blog
exports.CreateBlogs = async (req, res) => {
  try {
    const file = req.file;
    const title = req.body.title;
    const description = req.body.description;
    if (!file) {
      return res
        .status(400)
        .send({ message: "Please Select Your Profile Picture !" });
    }
    const blog = new Blog({
      title: title,
      descriptions: description,
    });
    await blog.save();
    // Upload the file to Cloudinary
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
        },
        async (error, result) => {
          try {
            blog.image = result.url;
            await blog.save();
          } catch (error) {
            return res.status(500).send(error.message);
          }
        }
      )
      .end(file.buffer);

    return res.status(200).send({ message: "Blos Post SuccessFully !!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
// getBlogBy _id
exports.GetblogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById({ _id: id });
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// delete blog by id

exports.deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: "Blog Delete SuccessFully", blog });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// Update BlogBy id
exports.UpdateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.status(200).json({ message: "Blog Update SuccessFully", blog });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// GetsAllBlogs
exports.getAllblog=async(req,res)=>{
  try {
    const blog=await Blog.find().exec();
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).send(error.message)
  }

}
