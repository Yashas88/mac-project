import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// @description  Fetch all products
// @route GET/api/produccts
//@access to public

router.get('/',asyncHandler(async(req, res) => {
    const products = await Product.find({})
    // res.status(401)
    // throw new Error('Not Authrized')
    res.json(products)
}))

// @description  Fetch single products
// @route GET/api/produccts/:id
//@access to public

router.get('/:id',asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

      if(product) {
          res.json(product)
      } else {
        //   res.status(404).json({message : 'Product not found'})
        res.status(404)
        throw new Error('Product not found')
      }
    res.json(product)
}))


export default router