import { User } from "../Models/user.model.js";
import { ErrorHandler } from "../Utils/HandleError.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";


export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await User.findById({ _id: userid }).lean().exec();
    if (!user) {
      next(new ErrorHandler(401, "user.found"));
    }
    res.status(200).json({
      success: true,
      message: "User data found",
      user,
    });
  } catch (error) {
    next(new ErrorHandler(401, error.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email, bio, password } = req.body;
    const { userid } = req.params;
    
    const user = await User.findById(userid).select("+password");
    if (!user) return next(new ErrorHandler(404, "User nahi mila"));

    user.name = name;
    user.email = email;
    user.bio = bio;

    // 1. Password hashing logic
    if (password && password.trim() !== "") {
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
    }

    // 2. Image upload logic (Variable ko pehle bahar declare kiya)
    let result; 

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      result = await cloudinary.uploader.upload(dataURI, {
        folder: "user_profiles",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      // 🔥 Zaroori Step: Cloudinary ka URL user ke database profile field mian save karein
      // (Farz karein aapke schema mian field ka naam 'avatar' ya 'profilePic' hai)
      user.avatar = result.secure_url; 
    }
  
    // Ab console.log crash nahi karega, agar file hogi to result print hoga warna undefined
    if (result) console.log("Cloudinary Result:", result);

    // 3. Database mian save karein
    await user.save();

    // 4. Response tayar karein
    const updateData = user.toObject({ getters: true });
    delete updateData.password;

    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
      user: updateData,
    });

  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};