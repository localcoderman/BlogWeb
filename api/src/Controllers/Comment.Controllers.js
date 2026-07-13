import Comment from "../Models/comment.model.js";
import { ErrorHandler } from "../Utils/HandleError.js";

export const addComment = async (req, res, next) => {
  try {
    const { user, blogid, comment } = req.body;


    const newComment = new Comment({
      user: user,
      blogid: blogid,
      comment: comment,
    });

    await newComment.save();

    res.status(200).json({
      status: true,
      message: "comment Submitted",
      comment: newComment,
    });
  } catch (error) {
    next(new ErrorHandler(401, error.message));
  }
};
export const getComments = async (req, res, next) => {
  try {
    const { blogid} = req.params;

    const comments = await Comment.find({blogid}).populate("user","name avatar").sort({createAt:-1}).lean()

    res.status(200).json({
      status: true,
      comments
    });
  } catch (error) {
    next(new ErrorHandler(401, error.message));
  }
};
export const commentCount = async (req, res, next) => {
  try {
    const { blogid} = req.params;

    const commentCount = await Comment.countDocuments({blogid})

    res.status(200).json({
      status: true,
      commentCount
    });
  } catch (error) {
    next(new ErrorHandler(401, error.message));
  }
};


export const getAllComments = async (req, res, next) => {
  try {

    const user = req.user
    let comments
    if(user.role === "admin"){
      
      comments = await Comment.find().populate("user","name").populate("blogid", "tittle" ).lean()
    }else{
      
      comments = await Comment.find({user : user._id}).populate("user","name").populate("blogid", "tittle" ).lean()
    }


    res.status(200).json({
      status: true,
      comments
    });
  } catch (error) {
    next(new ErrorHandler(401, error.message));
  }
};
export const deleteComment = async (req, res, next) => {
  try {
const {commentId} = req.params
    const comments = await Comment.findByIdAndDelete(commentId)
    res.status(200).json({
      status: true,
      message : "Comment Deleted"
    });
  } catch (error) {
    next(new ErrorHandler(401, error.message));
  }
};