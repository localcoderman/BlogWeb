import { User } from "../Models/user.model.js";
import { ErrorHandler } from "../Utils/HandleError.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await User.findOne({ email }).lean().exec();
    if (findUser) {
      // return next(new ErrorHandler(401, "User Already Exist"))
      return res.status(401).json({
        success: false,
        message: "User Already Exist",
      });
    }

    const HashPassword = await bcrypt.hashSync(password, 10);
    const user = new User({
      name,
      email,
      password: HashPassword,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Registration Successfully",
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email }).select("+password");
    if (!userExist) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const hashpass = userExist.password;

    const DecryptPassword = await bcrypt.compare(password, hashpass);

    if (!DecryptPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Login credentials",
      });
    }

    const token = jwt.sign(
      {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        avatar: userExist.avatar,
        role: userExist.role,
      },
      process.env.JWT_SECRET,
      { 
    expiresIn: process.env.JWT_EXPIRE 
  }
    );

    res.cookie("AccessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const userData = userExist.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      user: userData,
      message: "user Login successfully",
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};
export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    let userExist;
    userExist = await User.findOne({ email }).select("+password");

    if (!userExist) {
      const password = "Google@" + Math.round(Math.random() * 100000000);
      const hashpass = bcrypt.hashSync(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashpass,
        avatar: avatar || "",
      });

      userExist = await newUser.save();
    }

    const token = jwt.sign(
      {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        avatar: userExist.avatar,
        role: userExist.role,
      },
      process.env.JWT_SECRET,
      { 
    expiresIn: process.env.JWT_EXPIRE 
  }
    );


    res.cookie("AccessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const userData = userExist.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      user: userData,
      message: "user Login successfully",
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};


export const Logout = async (req, res, next) => {
  try {
    res.clearCookie("AccessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};
