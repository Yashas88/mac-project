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

// get user profile
//route: GET/api/users/profile
// Private access


const getUserProfile = asyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id)

      if(user) {
          res.json({ 
            _id: user.id,
            name: user.name,
            email : user.email ,
            isAdmin : user.isAdmin,
          })
      } else {
          res.status(404)
          throw new Error('User not found')
      }
})


//register new user, POST/api/users, public access

const registerUser = asyncHandler(async (req, res) => {
    const {name , email, password} =  req.body

    const userExists = await User.findOne({email})
   
  if(userExists){
      res.status(400)
      throw new Error('User Already Exists')
  }

  const user = await User.create({
      name ,
      email,
       password
  })

  if(user){
      res.status(201).json({
          _id : user._id, 
          name : user.name, 
          email : user.email,
          isAdmin : user.isAdmin,
          token : generateToken(user._id)
      })
  }else{
      res.status(400)
      throw new Error('User not found')
  }
})

export {authUser ,registerUser,  getUserProfile}
