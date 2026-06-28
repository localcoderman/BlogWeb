import express from 'express'
const authRoutes = express.Router()
import {Register,Login, GoogleLogin, Logout} from "../Controllers/Auth.Controllers.js"


authRoutes.post('/register', Register)
authRoutes.post('/login', Login)
authRoutes.post('/google-login', GoogleLogin)
authRoutes.get('/logout', Logout)


export default authRoutes