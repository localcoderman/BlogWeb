import express from 'express'
import { createCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from '../Controllers/Category.Controllers.js'
const CategoryRoute =  express.Router()

CategoryRoute.post("/create",createCategory)
CategoryRoute.put("/update/:categoryid",updateCategory)
CategoryRoute.get("/show/:categoryid",showCategory)
CategoryRoute.delete("/delete/:categoryid",deleteCategory)
CategoryRoute.get("/all-category",getAllCategory)




export default CategoryRoute