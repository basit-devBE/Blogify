//for jsonwebtoken

import jwt from "jsonwebtoken"

export const jwtToken = (userId, email) => {
    try{
        const token = jwt.sign({userId, email}, process.env.JWT_SECRET, {
            expiresIn: "30d"
        })
        return token
    }catch(error){
        console.error(error)
    }
};