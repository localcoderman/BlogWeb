import cloudinary from "../config/cloudinary.js";
import Blog from "../Models/blog.model.js";
import { ErrorHandler } from "../Utils/HandleError.js";



export const addBlog = async (req, res, next) => {
  try {
    const { tittle, blogContent, category, slug, author } = req.body;
    
    let featureImage = "";
    let result = null; 

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      
      result = await cloudinary.uploader.upload(dataURI, {
        folder: "user_profiles",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      featureImage = result.secure_url;
    }

    
    // if (featureImage && result) {
    //   console.log("Cloudinary Result:", result);
    // }

    const blog = new Blog({
      author: author,
      tittle: tittle,
      slug: slug,
      category: category,
      featureImage: featureImage,
      blogContent: blogContent
    });

    await blog.save();
    
    res.status(200).json({
      status: true,
      message: "Blog added Successfully"
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const editBlog = async (req, res, next) => {
  try {
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const showAllBlog = async (req, res, next) => {
  try {
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};
