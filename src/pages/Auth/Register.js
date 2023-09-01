import React, { useContext, useState } from 'react'
import { Button, Col,  Divider, Form, Input, Row, message } from 'antd'
import { AuthContext } from 'context/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from 'config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'


export default function Register() {

  const { dispatch } = useContext(AuthContext)
  const [state, setState] = useState({ fullName: "", email: "", password: "", phone: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSignUp = async (e) => {
    e.preventDefault()

    const { fullName, email, password, phone } = state

    setIsProcessing(true)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        createUserProfile(user, fullName, email,phone)
        console.log("user", user)
      })
      .catch(err => {
        message.error("Something went wrong while creating user")
        console.error(err)
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  const createUserProfile = async (user) => {
    const { fullName, phone } = state
    const { email, uid } = user

    const userData = {
      fullName, phone,
      createdBy: {
        email: email,
        uid: uid
      },
      dateCreated: serverTimestamp(),
      status: "active",
      roles: ["superAdmin"]

    }
    console.log(" user add at register", userData)

    try {
      await setDoc(doc(firestore, "users", uid), userData);
      message.success("A new user has been created successfully")
      dispatch({ type: "SET_LOGGED_IN", payload: { user: userData } })
    } catch (e) {
      message.error("Something went wrong while creating user profile")
      console.error("Error adding document: ", e);
    }
  }

  return (
    <main >
    <div className="container" id='mainRegister'>
      <div className="row">
        <div className="col ">
          <div className="registerContainer">
            <Form layout='vertical'>
            <h2 className='text-center'>Register</h2>
            <Divider />
              <Row>
                <Col span={24}>
                  <Form.Item label="Full Name :">
                    <Input type='text' placeholder='Full Name' name='fullName' onChange={handleChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label="Phone No:">
                    <Input type='number' placeholder='Phone No' name='phone' onChange={handleChange} />
                  </Form.Item>
                </Col>
              </Row>
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
                    <Button type='primary' htmlType='submit' className='w-50 ' loading={isProcessing} onClick={handleSignUp}>Sign Up</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
              <Link to="/auth/login"> Login</Link>
          </div>
          </div>
          </div>
      </div>  
  </main>
  )
}
