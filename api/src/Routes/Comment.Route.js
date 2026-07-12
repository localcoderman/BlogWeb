import express from "express";
import { addComment, commentCount, deleteComment, getAllComments, getComments } from "../Controllers/Comment.Controllers.js";
const commentRoute = express.Router();

commentRoute.post("/add", addComment);
commentRoute.get("/get/:blogid", getComments);
commentRoute.get("/get-count/:blogid", commentCount);
commentRoute.get("/get-all-comments", getAllComments);
commentRoute.delete("/delete-comment/:commentId", deleteComment);

export default commentRoute;
