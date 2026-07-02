import Category from "../Models/category.model.js";
import { ErrorHandler } from "../Utils/HandleError.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    const existingCategory = await Category.findOne({
      $or: [{ name: name }, { slug: slug }],
    });

    if (existingCategory) {
      return res.status(400).json({
        status: false,
        message: "Category with this name or slug already exists!",
      });
    }

    const category = new Category({
      name,
      slug,
    });
    await category.save();

    res.status(200).json({
      status: true,
      message: "Category added successfully",
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const showCategory = async (req, res, next) => {
  try {
    const { categoryid } = req.params;

    const category = await Category.findById({ _id: categoryid });
    if (!category) {
      next(new ErrorHandler(404, "Data Not Found"));
    }

    res.status(200).json({
      status: true,
      category,
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { categoryid } = req.params;
    const { name, slug } = req.body;

    const category = await Category.findById({ _id: categoryid });

    if (category) {
      ((category.name = name), (category.slug = slug));

      await category.save();
    } else {
      next(new ErrorHandler(404, "Data Not Found"));
    }

    res.status(200).json({
      status: true,
      message: "Category Updated",
      category,
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryid } = req.params;
    const categoryDelete = await Category.deleteOne({ _id: categoryid });

    if (!categoryDelete) {
      next(new ErrorHandler(404, "Not Delete"));
    }
    res.status(200).json({
      status: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 }).lean();

    res.status(200).json({
      status: true,
      categories,
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};
