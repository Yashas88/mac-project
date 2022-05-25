import React , {useState, useEffect}from 'react'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({history}) => {
    const cart = useSelector(state => state.cart)

  const dispatch = useDispatch();


    
 
// calculate price
    cart.itemsPrice = cart.cartItems.reduce((acc, item)=> acc + item.price * item.qty , 0) 

     // shipping price  if total picce is greater than 500 then take zero rupies  else take 100 rs
  cart.shippingPrice = cart.itemsPrice > 500 ? 0 : 100

  // calculate tax
  cart.taxPrice = Number((0.05 * cart.itemsPrice).toFixed(2))

  // total price
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


  const orderCreate = useSelector((state) => state.orderCreate)

  // console.log(orderCreate)
  const {order , success , error } = orderCreate


  useEffect(()=>{
    if(success){
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line 
  }, [history, success])
  
  const placeOrderHandler = () => {

    dispatch(createOrder({
        orderItems : cart.cartItems, 
        shippingAddress : cart.shippingAddress,
        paymentMethod : cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice : cart.shippingPrice,
        taxPrice : cart.taxPrice,
        totalPrice : cart.totalPrice
  
      }))
  
      console.log("placeorder")
  }


    
  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
        <Col  md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
              <h2>Shipping</h2>
                <p>
                  Name : {cart.shippingAddress.name} ,
                  Phone : {cart.shippingAddress.phone}
                </p> 
                
                <p>
                  <strong> Address: </strong>

                    {cart.shippingAddress.address},
                    {cart.shippingAddress.city}
                    {""},{cart.shippingAddress.postalCode}
                    {""},{cart.shippingAddress.country}{" "}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
               <h2>Payment Method</h2>
               <strong>Method : {cart.paymentMethod}</strong>
              </ListGroup.Item>

              <ListGroup.Item>
                  <h2>Order Items</h2>
                  {
                      cart.cartItems.length === 0 ? <Message>Your cart is empty</Message>
                      : (
                          <ListGroup variant='flush' >
                              {cart.cartItems.map((item , index) => (
                                  <ListGroup.Item key={index} >
                                      <Row>
                                          <Col md={1}>
                                              <Image src={item.image} alt={item.name} fluid rounded></Image>
                                          </Col>

                                          <Col>
                                            <Link to = {`/product/${item.product}`} >{item.name} : </Link>
                                          </Col>
                                          <Col md={4} style={{width:"50%"}}>
                                              {item.qty}  x ₹{item.price} = ₹{item.qty * item.price}
                                          </Col>
                                      </Row>
                                  </ListGroup.Item>
                              ))}

                          </ListGroup>
                      )
                  }
              </ListGroup.Item>
              </ListGroup>
              </Col>


              <Col ma={4}>
            <Card>
                <ListGroup variant="flush" >
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Items:</Col>
                            <Col>₹{cart.itemsPrice}</Col>
                        </Row>
                        
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>₹{cart.shippingPrice}</Col>
                        </Row>
                        
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>₹{cart.taxPrice}</Col>
                        </Row>
                        
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>₹{cart.totalPrice}</Col>
                        </Row>
                        
                    </ListGroup.Item>
                     <ListGroup.Item>
                      {
                        error && <Message variant='danger'>{error}</Message>
                      }

                    </ListGroup.Item>

                    <ListGroup.Item>
                    <Button type="button" className ='btn-block'
                         disabled={cart.cartItems === 0} 
                         onClick = {placeOrderHandler}
                         > Place Order </Button>
                        
                    </ListGroup.Item>


                </ListGroup>
                
            </Card>
          </Col>
        </Row>

    </div>
  )
}

export default PlaceOrderScreen