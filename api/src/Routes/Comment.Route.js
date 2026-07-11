import express from "express";
import { addComment, commentCount, getComments } from "../Controllers/Comment.Controllers.js";
const commentRoute = express.Router();

commentRoute.post("/add", addComment);
commentRoute.get("/get/:blogid", getComments);
commentRoute.get("/get-count/:blogid", commentCount);

export default commentRoute;
