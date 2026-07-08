import Comment from "../Models/comment.model.js";
import { ErrorHandler } from "../Utils/HandleError.js";

export const addComment = async (req, res, next) => {
  try {
    const { author, blogid, comment } = req.body;

    console.log(author, blogid, comment);

    const newComment = new Comment({
      author: author,
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

    const comments = await Comment.find({blogid}).populate("author","name avatar").sort({createAt:-1}).lean()

    res.status(200).json({
      status: true,
      comments
    });
  } catch (error) {
    next(new ErrorHandler(401, error.message));
  }
};
