import Order from '../models/productModel.js'


// @description  create new order
// @route POST/api/order
//@access to private

const addOrderItems = async (req, res) => {
    const { orderItems , 
        shippingAddress ,
         paymentMethod ,
          itemsPrice , 
          taxPrice , 
         shippingPrice ,
          totalPrice
     } = req.body
   
  
     if(!orderItems && orderItems.length == 0){
         res.status(400)
         throw new Error('No Order Items')
         return;
     } else {
        const order = new Order({
            orderItems ,
            user : req.user._id,
            shippingAddress ,
            paymentMethod ,
            itemsPrice ,
            taxPrice ,
            shippingPrice ,
            totalPrice  
     })

     const createOrder = await order.save()

     res.status(201).json(createOrder)
    }
}

export { addOrderItems }