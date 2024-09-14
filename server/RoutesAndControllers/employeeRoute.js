const express = require("express");
const Employee = require("../Schema/memberSchema");

const cloudinary = require('../utils/cloudinary');
const { upload } = require('../middleware/multerMiddleware');

const route = express.Router();


route.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, email, mobile, dob } = req.body;
     // Get the uploaded file
    const photoFile = req.file;

    if (!photoFile) {
      return res.status(400).json({ err: { mssg: 'No file uploaded' } });
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploadOnCloudinary(photoFile.path);

    if (!cloudinaryResponse) {
      return res.status(500).json({ err: { mssg: 'Failed to upload image to Cloudinary' } });
    }

    // image URL from Cloudinary
    const newEmployee = new Employee({
      photo: cloudinaryResponse.url,
      name,
      email,
      mobile,
      dob,
    });

    await newEmployee.save();
    res.status(200).json(newEmployee);
  } catch (error) {
    res.status(400).json({ err: error.message });
  } 
});

// route.post("/", async (req, res) => {
//   try {
//     const { photo, name, email, mobile, dob } = req.body;
//     const existingEmployee = await Employee.findOne({ email });
//     if (existingEmployee) {
//       res.status(400).json({ err: { mssg: "User Already Exist" } });
//     } else {
//       const newEmployee = await new Employee({
//         photo,
//         name,
//         email,
//         mobile,
//         dob,
//       });
//       newEmployee.save();
//       res.status(200).json(newEmployee);
//     }
//   } catch (error) {
//     res.status(400).json({ err: error.message });
//   }
// });

// route.get("/", async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 0;
//     const limit = parseInt(req.query.limit) || 5;
//     const skip = page * limit;
//     const totalEmployeeCount = await Employee.countDocuments({});
//     const allEmployee = await Employee.find().skip(skip).limit(limit);
//     res.status(200).json({allEmployee, totalEmployeeCount});
//   } catch (error) {
//     res.status(400).json({ err: error.message });
//   }
// });

route.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "desc" ? -1 : 1;
    const nameKey = req.query.nameKey || "";
    const emailKey = req.query.emailKey || "";
    const mobileKey = req.query.mobileKey || "";

    const searchQuery = {
      name: { $regex: `^${nameKey}`, $options: "i" },
      email: { $regex: `^${emailKey}`, $options: "i" },
      mobile: { $regex: `^${mobileKey}`, $options: "i" },
    };

    const skip = page * limit;
    const totalEmployeeCount = await Employee.countDocuments(searchQuery);

    const allEmployee = await Employee.find(searchQuery)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    res.status(200).json({ allEmployee, totalEmployeeCount });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});




route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, dob } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { $set: { name, email, mobile, dob } },
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ err: { mssg: "Employee Not Found" } });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ err: { mssg: "Employee Not Found" } });
    }
    res.status(200).json(deletedEmployee);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

module.exports = route;
