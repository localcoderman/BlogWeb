import express from 'express'
const authRoutes = express.Router()
import {Register,Login} from "../Controllers/Auth.Controllers.js"


authRoutes.post('/register', Register)
authRoutes.post('/login', Login)


export default authRoutes