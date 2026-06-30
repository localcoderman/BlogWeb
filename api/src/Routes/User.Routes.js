import express from "express"
import { getUser, updateUser } from "../Controllers/User.Controllers.js"
import upload from "../../config/multer.js"

const userRoutes = express.Router()

userRoutes.get("/get-user/:userid",getUser)
userRoutes.put("/update-user/:userid", upload.single("file"),updateUser)


export default userRoutes



