import React, {useEffect} from 'react'
import {
    Row,
    Col,
    ListGroup,
    Image,
    Card,
    Button
  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails} from '../actions/orderActions'


const OrderScreen = ({match, history}) => {

    const orderId = match.params.id

    const dispatch = useDispatch();

    const  orderDetails = useSelector((state) => state.orderDetails)
    const {order ,loading , error } =  orderDetails

    const  userLogin  = useSelector((state) => state.userLogin )
    const {userInfo} =  userLogin

    console.log(order)

    useEffect(()=>{
        
        if(!userInfo){
            history.push('/login')
        }
        dispatch(getOrderDetails(orderId))
      }, [dispatch, orderId, order, userInfo, history])
      


  return 
  loading ? <Loader/> : error ? <Message variant="danger" >{error} </Message> :
  <>
       <h1>Order </h1>
       <hr></hr>
       <Row>
       <Col  md={8}>
           <ListGroup.Item>
                  <h2>Oder Items</h2>
                  {
                      order.orderItems.length === 0 ? <Message>Your order is empty</Message>
                      : (
                          <ListGroup variant='flush' >
                              {order.orderItems.map((item , index) => (
                                  <ListGroup.Item key={index} >
                                      <Row>
                                          <Col md={1}>
                                              <Image src={item.image} alt={item.name} fluid rounded></Image>
                                          </Col>

                                          <Col>
                                            <p >{item.name} : </p>
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
              <hr></hr>
            <ListGroup variant="flush">
              <ListGroup.Item>
              <h2>User Details</h2>
               <p> <strong>User Name : {order.user.name} </strong></p>
               <p> <strong>User Email : {order.user.email} </strong></p>
                
              
            </ListGroup.Item>

             <ListGroup.Item>
                <h2>Shipping </h2>
                <p> Name : {order.shippingAddress.name} ,</p>
                <p>  Phone : {order.shippingAddress.phone}</p>
                
                  <strong>
                    Address: {order.shippingAddress.address},
                    {order.shippingAddress.city}
                    {""},{order.shippingAddress.postalCode}
                    {""},{order.shippingAddress.country}{" "}
                  </strong>
             
                  {order.isDelivered ? 
                  <Message variant='success' >Delivered On {order.deliveredAt.substring(0,10)} </Message> :
                   <Message variant='danger' >Not Delivered </Message>}
              </ListGroup.Item>

              <ListGroup.Item>
               <h2>Payment Method</h2>
               <p>
               <strong>Method : {order.paymentMethod}</strong>
               </p>
               {order.isPaid ? <Message variant='success' >Paid On {order.paidAt.substring(0,10)} </Message> : <Message variant='danger' >Not Paid </Message>}
              </ListGroup.Item>

             
            </ListGroup>
          </Col>
       </Row>

  </>

   
}

export default OrderScreen