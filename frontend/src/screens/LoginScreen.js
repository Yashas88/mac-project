import React , {useState , useEffect} from 'react'
import {Link } from 'react-router-dom'
import {Form , Button , Row , Col} from "react-bootstrap";
import {useDispatch , useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {login} from '../actions/userActions'
import FormContainer  from '../components/FormContainer';

const LoginScreen = ({location , history}) => {
    const [email ,setEmail] = useState('')
    const [password , setPassword] = useState('')

    const dispatch = useDispatch()
 

    const userLogin = useSelector(state => state.userLogin)
    const { loading , error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=> {
        if(userInfo) {
            history.push(redirect)
        }
    },[history , userInfo , redirect])



    const submitHandler = (e) => {
        e.preventDefault()
        //Dispatch Login

        dispatch(login(email, password))
    
    }


    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger' >{error}</Message> }
            {loading && <Loader/>}
            <br></br>
            <Form onSubmit={submitHandler} >

                <Form.Group controlId='email'>
                    <Form.Label> Email Address </Form.Label>
                    <Form.Control type='email' placeholder='Enter Your Email' 
                    value ={email} 
                    onChange= {(e)=> setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group> <br></br>

                <Form.Group controlId='password' >
                    <Form.Label> Password </Form.Label>
                    <Form.Control type='password' placeholder='Enter your Password' 
                    value ={password} 
                    onChange= {(e)=>{setPassword(e.target.value)}}
                    ></Form.Control>
                </Form.Group>   <br></br>

                <Button  type='submit' variant='primary'> Log in</Button>


            </Form>

            <Row className='py-3' >
                <Col>
                New Customer?{' '} 
                <Link to={ redirect ? `/register?redirect=${redirect}` : '/register' } >
                    Register Here</Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default LoginScreen
