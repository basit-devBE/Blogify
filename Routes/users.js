import express from 'express';
import { fetchUser, LoginUser, registerUser, UpdateUser } from '../Controllers/users.controllers.js';


const userRoutes = express.Router();
userRoutes.post("/Blogify/users/register", registerUser)
userRoutes.post("/Blogify/users/login", LoginUser)
userRoutes.get("/Blogify/users/:id", fetchUser)
userRoutes.put("/Blogify/users/update/:id", UpdateUser)

export default userRoutes;