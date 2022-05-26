import Order from '../models/orderModel.js'


// @description  create new order
// @route POST/api/orders
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
   
  
     if(!orderItems){
         res.status(400)
         throw new Error('No orderItems')
     }
         let order = new Order({
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

// description : get order by id
// route : get request to /api/orders/:id
//access : private
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email')

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error ('Order not found')
    }
}


export { addOrderItems, getOrderById }