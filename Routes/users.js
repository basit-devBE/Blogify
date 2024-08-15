import express from 'express';
import { LoginUser, registerUser } from '../Controllers/users.controllers.js';


const userRoutes = express.Router();
userRoutes.post("/Blogify/users/register", registerUser)
userRoutes.post("/Blogify/users/login", LoginUser)
export default userRoutes;