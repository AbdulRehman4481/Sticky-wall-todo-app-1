import React, { useEffect, useState } from 'react'
import { Col, Row, Spin, message, } from 'antd'
import { CiMenuKebab } from 'react-icons/ci';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { DeleteFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';



export default function Upcoming() {


  const [allDocuments, setAllDocuments] = useState([])
  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const today = dayjs().format("YYYY-MM-DD");

  // Read Todo
  const getTodo = async () => {

    const q = query(collection(firestore, "todos"), where("date", ">", today));

    const querySnapshot = await getDocs(q);
    const array = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    }); setDocuments(array)
    setAllDocuments(array)
    setIsLoading(false)
  }

  useEffect(() => {
    getTodo()
  })

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


  return (
    <>
       <Row>
          {documents.map((todo, i) => {
            return (
              <Col className='m-2'>
                <div className='card p-3 ' style={{ width: 200, height: 200, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: `${todo.bgColor}`, border: "1 solid dark", borderRadius: 5, color: "white" }}>
                  <div className="carFirtDiv">
                    <span style={{ fontSize: "large" }} >{todo.title}</span>
                    <span className='p-2' id='deleteIcon'>
                      <DeleteFilled onClick={() => handleDelete(todo)} />
                    </span><br />
                    <span className='fw-bold'><u><em>{todo.list}</em></u></span>
                    <p>{todo.description}</p>

                  </div>
                  <div>

                    <p>{todo.date ? dayjs(todo.date).format("dddd, DD/MM/YYYY") : ""}</p>
                  </div>
                </div>
              </Col>
            )
          })}

        </Row ></>
  )
}
