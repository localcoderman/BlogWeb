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
      blogContent: blogContent,
    });

    await blog.save();

    res.status(200).json({
      status: true,
      message: "Blog added Successfully",
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const editBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;

    const blog = await Blog.findById({ _id: blogid }).populate(
      "category",
      "name",
    );
    if (!blog) {
      next(new ErrorHandler(404, "Data Not Found"));
    }

    res.status(200).json({
      status: true,
      blog,
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const { tittle, blogContent, category, slug } = req.body;

    const blogdata = await Blog.findById(blogid);

    if (!blogdata) {
      return next(new ErrorHandler(404, "Blog not found"));
    }

    blogdata.tittle = tittle || blogdata.tittle;
    blogdata.blogContent = blogContent || blogdata.blogContent;
    blogdata.category = category || blogdata.category;
    blogdata.slug = slug || blogdata.slug;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "user_profiles",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      blogdata.featureImage = result.secure_url;
    }

    await blogdata.save();

    res.status(200).json({
      status: true,
      message: "Blog updated Successfully",
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const blogDelete = await Blog.deleteOne({ _id: blogid });

    if (!blogDelete) {
      next(new ErrorHandler(404, "Not Delete"));
    }
    res.status(200).json({
      status: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const showAllBlog = async (req, res, next) => {
  try {
    const blog = await Blog.find()
      .populate("author", "name avatar role")
      .populate("category", "name slug") 
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({
      status: true,
      blog,
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};


export const getBlog = async (req,res,next)=>{
 try {
  const {slug} = req.params;

    const blog = await Blog.findOne({slug})
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean();
    res.status(200).json({
      status: true,
      blog,
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
}