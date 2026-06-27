import express from 'express'
const authRoutes = express.Router()
import {Register,Login, GoogleLogin} from "../Controllers/Auth.Controllers.js"


authRoutes.post('/register', Register)
authRoutes.post('/login', Login)
authRoutes.post('/google-login', GoogleLogin)


export default authRoutes