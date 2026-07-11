import express from "express";
import { doLike, getblogLike } from "../Controllers/BlogLike.Controllers.js";
const BlogLikeRoute = express.Router();

BlogLikeRoute.post("/like", doLike);
BlogLikeRoute.get("/get-like/:blogid", getblogLike);
BlogLikeRoute.get("/get-like/:blogid/:userid", getblogLike);



export default BlogLikeRoute;
