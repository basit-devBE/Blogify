//ensure user is logged in
import jwt from "jsonwebtoken"
const getToken = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        return authHeader.split(" ")[1];
    }
    return null;
}

const verifyToken = (token) => {
    return jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return false;
        }else {
            return decoded;
        }
    })
}


export const LoggedIn = (req,res,next) => {
    const token = getToken(req);
    const decodedUser = verifyToken(token);
    if (!decodedUser) {
        return res.status(401).json({ message: "You are not logged in" });
    }
    req.user = decodedUser;
    next();
}