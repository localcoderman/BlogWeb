import { User } from "../Models/user.model.js";
import { ErrorHandler } from "../Utils/HandleError.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      // return next(new ErrorHandler(401, "User Already Exist"))
      return res.status(401).json({
        success: false,
        message: "User Already Exist",
      });
    }

    const HashPassword = bcrypt.hashSync(password, 10);
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
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email }).select("+password");
    if (!userExist) {
      return res.status(401).json({
        success: false,
        message: "User Already Exist",
      });
    }

    console.log(userExist.password);

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
      },
      process.env.JWT_SECRET,
    );

    res.cookie("AccessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const user = await User.findOne({ email });

    res.status(200).json({
      success: true,
      user,
      message: "user Login successfully",
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};


