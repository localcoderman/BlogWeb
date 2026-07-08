import express from "express";
import { addComment, getComments } from "../Controllers/Comment.Controllers.js";
const commentRoute = express.Router();

commentRoute.post("/add", addComment);
commentRoute.get("/get/:blogid", getComments);

export default commentRoute;
