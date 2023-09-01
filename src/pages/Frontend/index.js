import React, { useContext, useState } from 'react'
import { AuthContext } from 'context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from 'config/firebase';
import { Layout, Menu, Button, message } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HiMiniChevronDoubleRight } from "react-icons/hi2"
import { FcTodoList } from "react-icons/fc"
import { BsFillStickyFill } from "react-icons/bs"
import { FaCalendarDays } from "react-icons/fa6"
import { VscSignOut } from "react-icons/vsc"


import Home from '../Frontend/Home'
import Today from './Today';
import Upcoming from './Upcoming';
import Calendar from './Calendar';
import Personal from './List/Personal';
import Work from './List/Work';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';


export default function Index() {
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "SET_LOGGED_OUT" })
        message.success("Signout successful")
      })
      .catch(err => {
        console.log("err", err)
        message.error("Signout not successful")
      })
  }
 

  return (
    <main>
      <div className="container  ">
        <div className="row">
          <div className="col">
            <div className='box'>
              <Layout style={{ borderRadius: 30, height: "80vh", }} id='mainLayout'>
                <Sider
                id='mainSider'
                  breakpoint="lg"
                  collapsedWidth="70px"
                  style={{ border: "1px solid #edede9", borderRadius: 30, backgroundColor: "#edede9", 
                  }}
                >
                  <div className="demo-logo-vertical" />
                  <Menu
                    onClick={({ key }) => {
                      if (key === "signout") {
                        handleLogout()
                      } else {
                        navigate(key)
                      }
                    }}
                    theme="lihgt"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ border: "1px solid #edede9", backgroundColor: "#edede9", borderRadius: "30px", paddingTop: "10px", color: "black" }}
                    items={[
                     
                      {
                        label:"Menu"    ,
                        className: "fs-3",
                       },
                      {
                        label: "Task",
                        className: "fs-5"
                      },
                      {
                        // key: '1',
                        label: 'UpComing',
                        key: "/upcoming",
                        icon: <i>< HiMiniChevronDoubleRight /></i>
                      },
                      {
                        key: '/today',
                        label: 'Today',
                        icon: <i><FcTodoList /></i>
                      },
                      {
                        key: '/calendar',
                        label: 'Calendar',
                        icon: <i><FaCalendarDays /></i>
                      },
                      {
                        key: '/',
                        label: 'Sticky Wall',
                        icon: <i><BsFillStickyFill /></i>

                      },
                      {
                        label: "List",
                        className: "fs-5"
                      },

                      {
                        key: '/personal',
                        label: 'Personal  ',
                        icon: <i style={{ border: "1px solid #66D9E8", borderRadius: "5px", padding: "8px 8px", backgroundColor: "#66D9E8" }}></i>
                      },
                      {
                        key: '/work',
                        label: 'Work  ',
                        icon: <i style={{ border: "1px solid #FF6B6B", borderRadius: "5px", padding: "8px 8px", backgroundColor: "#FF6B6B" }}></i>
                      },
                      {
                        key: 'signout',
                        label: 'Sign Out  ',
                        icon:<VscSignOut size={20} style={{margin:0,padding:0}}/>
                      },

                    ]}

                  />
                </Sider>
                <Layout style={{ border: "1px solid white", borderRadius: "50px" }}>
                  <Header
                    style={{
                      marginTop: "10px",
                      padding: 0,
                      background: "#fafafa",
                      border: "1px solid #fafafa ", borderRadius: "50px"
                    }}
                  >
                    <h1 className='px-3'>Sticky Wall</h1>
                  </Header>
                  <Content
                    style={{
                      margin: '24px 16px',
                      padding: 24,
                      minHeight: 280,
                      background: "#fafafa",
                      overflow: "scroll"
                    }}
                  >
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/today' element={<Today />} />
                      <Route path='/calendar' element={<Calendar />} />
                      <Route path='/upcoming' element={<Upcoming />} />
                      <Route path="/personal" element={<Personal />} />
                      <Route path="/work" element={<Work />} />
                    </Routes>
                  </Content>
                </Layout>
              </Layout>
            </div>
          </div>
        </div>
      </div >
    </main>


  )
}













