import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'context/AuthContext';
import { firestore } from 'config/firebase';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import dayjs  from 'dayjs';

import { FaPlus } from 'react-icons/fa';
import { Col, DatePicker, Form, Input, Modal, Row, message, ColorPicker, Select, Tooltip,   } from 'antd'
import { DeleteFilled, EditFilled, } from '@ant-design/icons'

const initialValue = {
  title: "",
  date: "",
  description: "",
  list: ""
}

export default function Hero() {
  const { user } = useContext(AuthContext)
  const [state, setState] = useState(initialValue)
  const [openModal, setOpenModal] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const [documents, setDocuments] = useState([])
  const [allDocuments, setAllDocuments] = useState([])
  const [selectedColor, setSelectedColor] = useState({});

// Function HandleChange

const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

// Function HandleDate
 
const handleDate = (_, date) => setState(s => ({ ...s, date }))
 
  // Add Todo Function  //

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, date, description, list } = state
    if (!title) { return message.error("Please enter title") }
    if (!date) { return message.error("Please enter date") }
    if (!description) { return message.error("Please enter description") }
    if (!list) { return message.error("Please enter list") }

    const todo = {
      title, date, description, list,
      status: "active",
      dateCreated: new Date().getTime(),
      id: Math.random().toString(36).slice(2),
      bgColor: selectedColor,
      createdBy: {
        email: user.createdBy.email,
        uid: user.createdBy.uid,
      },
    }
    creatDocument(todo);
  };
// In This Case we Add Todo in FireBase
  const creatDocument = async (todo) => {
    try {
      await setDoc(doc(firestore, "todos", todo.id), todo);
      message.success("Add Todo Successfully.");
    } catch (error) {
      message.error("Something Went Wrong While Adding Todo");
      console.error("Error", error);
    }
    setOpenModal(false);
  };
  // Read Todo
  const getTodo = async () => {
    const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.createdBy.uid))
    const querySnapshot = await getDocs(q);
    // const querySnapshot = await getDocs(collection(firestore, "todos"));
    const array = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    }); setDocuments(array)
    setAllDocuments(array)
  }

  useEffect(() => {
    getTodo()
  }, [getTodo])
  // Delete Todo
  const handleDelete = async (todo) => {
    try {
      await deleteDoc(doc(firestore, "todos", todo.id));
      let deleteDocuments = documents.filter(doc => doc.id !== todo.id)
      setDocuments(deleteDocuments)
      setAllDocuments(deleteDocuments)
      message.success("Todo Delete Successfully.")
    } catch (error) {
      message.error("Someting worng while delete Todo")
      console.log("error", error)
    }
  }

  const handleEditOpen = (todo) => {
    setState({ ...todo });
    setSelectedColor(todo.bgColor);
    setOpenModal2(true);
  };
  const handleUpdate = async () => {
    const updatedTodo = {
      ...state,
      bgColor: selectedColor,
    };

    try {
      await setDoc(doc(firestore, "todos", updatedTodo.id), updatedTodo);
      message.success("Todo Updated Successfully.");

      const updatedDocuments = documents.map((doc) =>
        doc.id === updatedTodo.id ? updatedTodo : doc
      );
      setDocuments(updatedDocuments);
      setAllDocuments(updatedDocuments);
    } catch (error) {
      message.error("Something Went Wrong While Updating Todo");
      console.error("Error", error);
    }
    setOpenModal2(false)
  };
  return (
    < >

      <Row>
        {documents.map((todo, i) => {
          return (
            <Col key={i} className='m-2'>
              <div className='card p-3 ' style={{ width: 200, height: 200, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: `${todo.bgColor}`, border: "1 solid dark", borderRadius: 5, color: "white" }}>
                <div className="carFirtDiv">
                  <h3 style={{ fontSize: "large" }} >{todo.title}</h3>
                  <span className='p-2' id='deleteIcon'>
                    <Tooltip className='m-1' placement="top" title="Delete" color='red'>
                      <i>
                        <DeleteFilled onClick={() => handleDelete(todo)} />
                      </i>
                    </Tooltip>
                    <Tooltip placement="top" title="Edit" color='blue'>
                      <i>
                        <EditFilled onClick={() => handleEditOpen(todo)} />
                      </i>
                    </Tooltip>

                  </span><br />
                  <span className='fw-bold'><u><em>{todo.list}</em></u></span>
                  <p>{todo.description}</p>

                </div>
                <div>

                  <p>{todo.date ? dayjs(todo.date).format("dddd, DD/MM/YYYY") : ""}
                  </p>
                  <span>

                  </span>
                </div>
              </div>
            </Col>
          )
        })}
        <Col className='m-2'>
          <div className='card p-5 ' style={{ width: 200, height: 200, backgroundColor: "#adb5bd" }} >
            <span id='pluseCard' style={{ display: 'flex', justifyContent: "center", paddingTop: "30px" }} onClick={() => setOpenModal(true)}>
              <FaPlus size={50} opacity={1} />
            </span>
          </div>
        </Col>
      </Row >

      <Modal
        title="Add Todo"
        style={{
          top: 20,
        }}
        open={openModal}
        onOk={handleSubmit}
        onCancel={() => setOpenModal(false)}
      >
        <Form layout="vertical" className='py-4'>
          <Row gutter={16}>
            <Col xs={24} lg={8}>
              <Form.Item label="Title">
                <Input placeholder='Input your title' name='title' onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Date">
                <DatePicker className='w-100' name='date' onChange={handleDate} />
              </Form.Item>

            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="list">
                <Select value={state.list} onChange={list => setState(s => ({ ...s, list }))}>
                  {["Work", "Personal"].map((list, i) => {
                    return <Select.Option key={i} value={list}>{list}</Select.Option>
                  })}
                </Select>
              </Form.Item>

            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Color">
                <ColorPicker value={selectedColor} onChange={(e, color) => setSelectedColor(color)} />
              </Form.Item>

            </Col>
            <Col span={24}>
              <Form.Item label="Description" className='mb-0'>
                <Input.TextArea placeholder='Input your description' name='description' onChange={handleChange} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal >

      <Modal
        title="Add Todo"
        style={{
          top: 20,
        }}
        open={openModal2}
        onOk={() => { handleUpdate() }}
        onCancel={() => setOpenModal2(false)}
      >
        <Form layout="vertical" className='py-4'>
          <Row gutter={16}>
            <Col xs={24} lg={8}>
              <Form.Item label="Title">
                <Input placeholder='Input your title' name='title' value={state.title} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Date">
                <DatePicker className='w-100' name='date' value={state.date ? dayjs(state.date) : ""} onChange={handleDate} />
              </Form.Item>

            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="list">
                <Select value={state.list} onChange={list => setState(s => ({ ...s, list }))}>
                  {["Work", "Personal"].map((list, i) => {
                    return <Select.Option key={i} value={list}>{list}</Select.Option>
                  })}
                </Select>
              </Form.Item>

            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Color">
                <ColorPicker value={selectedColor} onChange={(e, color) => setSelectedColor(color)} />
              </Form.Item>

            </Col>
            <Col span={24}>
              <Form.Item label="Description" className='mb-0'>
                <Input.TextArea placeholder='Input your description' value={state.description} name='description' onChange={handleChange} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal >

    </>
  )
}
