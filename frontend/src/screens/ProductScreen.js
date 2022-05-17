import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

// import products from '../products'
// import axios from 'axios'

const ProductScreen = ({match}) => {
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails


  useEffect(() => {

    dispatch(listProductDetails(match.params.id))
    // const fetchProduct = async () => {
    //      const {data} = await axios.get(`/api/products/${match.params.id}`)
       
    //      setProduct(data)
    // }
    // fetchProduct()
  }, [dispatch, match])

  
  return (
    <>
        <a className='btn btn-dark my-3' href = '/'>
          Go Back
        </a>
        {loading ? <Loader /> : error ? <Message varient = 'danger'>{error}</Message> :
        (
          <Row>
           <Col md = {6}>
                <Image src = {product.image} alt = {product.name} fluid/>
           </Col>
           <Col md = {3}>
               <ListGroup varient = 'flash'>
                  <ListGroup.Item>
                     <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Rating value = {product.rating} text = {`${product.numReviews} reviews`} />
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                      Price : ${product.price}
                  </ListGroup.Item>

                  <ListGroup.Item>
                      Description : ${product.description}
                  </ListGroup.Item>
                   
               </ListGroup>
             </Col>

             <Col md = {3}>
               <Card>
                <ListGroup varient = 'flash'>
                <ListGroup.Item>
                         <Row>
                           <Col>Price:</Col>
                           <Col>
                           <strong>${product.price}</strong>
                           </Col>
                         </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                         <Button className='btn-block' type = 'button'>
                            Add To Cart
                         </Button>
                  </ListGroup.Item>
                </ListGroup>
                </Card>
             </Col>
        </Row>
        )} 
        
    </>
  )
}

export default ProductScreen