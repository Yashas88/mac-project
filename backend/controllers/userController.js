import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'



// user authentication and get token
//route: POST/api/users/login
// Public access

const authUser = async (req, res) => {

    
    
    const {email, password} =  req.body
    const user = await User.findOne({email : email})
    if(user && (await user.matchPassword(password))) {
      res.json({
        message:"User Logged Successfully",
          _id: user.id,
          name: user.name,
          email : user.email ,
          isAdmin : user.isAdmin,
          token : generateToken(user._id)
          
      })
    }else{
       return res.status(401).json({message:'invalid email or password'})
    }
}

// get user profile
//route: GET/api/users/profile
// Private access


const getUserProfile = async (req, res) => {

    try {
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
    } catch (error) {
        res.status(500).json({message:error.message})
    }

      
}


//register new user, POST/api/users, public access

const registerUser = async (req, res) => {
    try {
        const {name , email, password} =  req.body

        const userExists = await User.findOne({email})
       
      if(userExists){
         return res.status(400).json({message:'User Already Exists'})
      }
    
      const user = await User.create({
          name ,
          email,
        password
      })
    
    
        res.status(201).json({ message:"User Register Successfully", _id : user._id,  name : user.name,  email : user.email, isAdmin : user.isAdmin, token : generateToken(user._id) })
    
    } catch (error) {
        res.status(500).json({message:error.message})
    }
  
}



// update user profile
//route: PUT/api/users/profile
// Private access


const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
       user.name = req.body.name || user.name
       user.email = req.body.email || user.email
       if(req.body.password) {
       user.password = req.body.password 
       }

       const updatedUser = await user.save()

       res.json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email : updatedUser.email ,
        isAdmin : updatedUser.isAdmin,
        token : generateToken(updatedUser._id)
    })


    } else {
        res.status(404)
        throw new Error('User not found')
    }
}

export {authUser ,registerUser,  getUserProfile, updateUserProfile}
