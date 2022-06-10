import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv'
dotenv.config()
const protect =  async (req, res, next) => {
    let token;
    // const JWT_SECRET = "abc123";
    // console.log(req.headers.authorization)

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
               token = req.headers.authorization.split(" ")[1]
               const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //    console.log(decoded).

                req.user = await User.findById(decoded.id).select('-password')
                next()

        } catch (error){
             console.error(error)
             res.status(401)
             throw new Error("not authorized, token failed")
        }
    }  

    if(!token) {
        res.status(401)
        throw new Error("Not Authorized or No token found")

    }

} 

export {protect}