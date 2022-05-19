import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'



// user authentication and get token
//route: POST/api/users/login
// Public access

const authUser = asyncHandler(async (req, res) => {
    const {email, password} =  req.body
    const user = await User.findOne({email : email})
    if(user && (await user.matchPassword(password))) {
      res.json({
          _id: user.id,
          name: user.name,
          email : user.email ,
          isAdmin : user.isAdmin,
          token : generateToken(user._id)
      })
    }else{
        res.status(401)
        throw new Error('invalid email or password' )
    }
})


export {authUser}
