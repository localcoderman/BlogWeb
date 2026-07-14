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


    if (password && password.trim() !== "") {
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
    }

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

     
      user.avatar = result.secure_url; 
    }
  
   
    if (result) console.log("Cloudinary Result:", result);

   
    await user.save();

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


export const getAllUsers = async(req,res,next)=>{

  try {
    const users = await User.find().sort({createdAt: -1})

    res.status(200).json({
      status : true,
      users
    })
    
  } catch (error) {
    next(new ErrorHandler(401, error.message));
    
  }
}

export const deleteUser = async(req,res,next)=>{

  try {
   
    const{userId} = req.params
    const users = await User.findByIdAndDelete(userId)

    res.status(200).json({
      status : true,
      message : "user Deleted"
    })
    
  } catch (error) {
    next(new ErrorHandler(401, error.message));
    
  }
}


export const autoget = async (req, res, next) => {
  try {
    const user = req.user
    
   res.status(200).json({
    success: true,
    message: `Welcome Back ${user.name}`,
    user
  });
  } catch (error) {
    next(new ErrorHandler(501, "User Login Expire"));
  }
};