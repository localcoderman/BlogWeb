import { ErrorHandler } from "../Utils/HandleError.js";
import BlogLike from "../Models/bloglike.model.js";

export const doLike = async (req, res, next) => {
  try {
    const { user, blogid } = req.body;

    let like;
    let isuserLiked = false;

    like = await BlogLike.findOne({ user, blogid });

    if (!like) {
      const saveLike = new BlogLike({
        user,
        blogid,
      });

      await saveLike.save();
      isuserLiked = true;
    } else {
      await BlogLike.findByIdAndDelete(like._id);
      isuserLiked = false;
    }

    const likeCount = await BlogLike.countDocuments({ blogid });

    res.status(200).json({
      status: true,
      likeCount,
      isuserLiked,
    });
  } catch (error) {
    next(new ErrorHandler(401, error.message));
  }
};

export const getblogLike = async (req, res, next) => {
  try {
    const { blogid, userid } = req.params;
    const likeCount = await BlogLike.countDocuments({ blogid });

    let isuserLiked = false;

    if (userid) {
      const getUserLike = await BlogLike.countDocuments({ blogid, user: userid });

      if (getUserLike > 0) {
        isuserLiked = true;
      }
    }

    res.status(200).json({
      status: true,
      likeCount,
      isuserLiked,
    });
  } catch (error) {
    next(new ErrorHandler(401, error.message));
  }
};
