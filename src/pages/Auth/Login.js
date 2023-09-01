import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button,  Col, Divider, Form, Input, Row,  message } from 'antd'
import { AuthContext  } from 'context/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'config/firebase'


export default function Login() {

  const {  readUserProfile } = useContext(AuthContext)
  const [state, setState] = useState({ email: "", password: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleLogin = e => {
    e.preventDefault()

    const { email, password } = state

    setIsProcessing(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        readUserProfile(user)
        
      })
      .catch(err => {
        message.error("Something went wrong while signing user")
        console.error(err)
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <main >
      <div className="container" id='mainContainer' >
        <div className="row">
          <div className="col">
            <div className="loginContainer">
              <Form layout='vertical'>
              <h2 className='text-center'>Login</h2>
              <Divider />
                <Row>
                  <Col span={24}>
                    <Form.Item label="Email :">
                      <Input type='email' placeholder='Email' name='email' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Password  :">
                      <Input.Password type='password' placeholder='Password' name='password' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} offset={6}>
                    <Form.Item >
                      <Button type='primary' htmlType='submit' className='w-50 ' loading={isProcessing} onClick={handleLogin}>Login</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
                <Link to="/auth/register" >I don't have an account  SIGN UP</Link>
            </div>
            </div>
            </div>
        </div>  
    </main>
  )
}
