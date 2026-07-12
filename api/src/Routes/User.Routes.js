import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../Controllers/User.Controllers.js"
import upload from "../config/multer.js"

const userRoutes = express.Router()

userRoutes.get("/get-user/:userid",getUser)
userRoutes.get("/get-all-users",getAllUsers)
userRoutes.delete("/delete-user/:userId",deleteUser)
userRoutes.put("/update-user/:userid", upload.single("file"),updateUser)


export default userRoutes



