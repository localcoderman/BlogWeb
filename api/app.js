import express from "express"
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors"
import DB_connection from "./src/DB/DB_Connection.js";
DB_connection()
import AuthRoutes from "./src/Routes/Auth.Routes.js";
import userRoutes from "./src/Routes/User.Routes.js";
import CategoryRoute from "./src/Routes/Category.Routes.js";
import BlogRoute from "./src/Routes/Blog.Routes.js";
import commentRoute from "./src/Routes/Comment.Route.js";





app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

//Routes Setup

app.use("/api/auth", AuthRoutes)
app.use("/api/user" , userRoutes)
app.use("/api/category", CategoryRoute )
app.use("/api/blog" , BlogRoute )
app.use('/api/comment' , commentRoute)


export default app