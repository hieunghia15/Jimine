import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import "./ListTask.css";
import DeleteTaskModal from "../Modals/DeleteTask/DeleteTaskModal";
import TaskDetailModal from "../Modals/DetailTask/TaskDetailModal";
import axios from 'axios';

export default function ListTask() {
  const id = localStorage.getItem('IdProject');
  const [listTaskProject, setListTaskProject] = useState([]);
  const [fullListTask, setFullListTask] = useState([]);
  const [statusTask, setStatusTask] = useState([]);
  const [typeTask, setTypeTask] = useState([]);
  const [member,setMember] = useState([]);
  const [task, setTask] = useState(''); // Gửi Task cho Modal TaskDetail
  var Stt = 1;
  const fetchListTask = async () => {
    try {
      await axios.get(`http://localhost:5000/api/issue/find/project/id/${id}/sort/UpdateStatusAt`)
        .then((response) => {
          setListTaskProject(response.data.issues);
          // console.log("List-Task:",response.data.issues);
          setFullListTask(response.data.issues);
          // console.log(response.data.issues);
        })
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(`Error: ${err.message}`)
      }
    }
  }
  const fetchStatusTask = async () => {
    try {
      await axios.get(`http://localhost:5000/api/status/sort/stt`)
        .then((response) => {
          setStatusTask(response.data);
          // console.log(response.data);
        })
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(`Error: ${err.message}`)
      }
    }
  }
  const fetchTypeTask = async () => {
    try {
      await axios.get(`http://localhost:5000/api/type/istype?type=Tasks`)
        .then((response) => {
          setTypeTask(response.data);
          // console.log(response.data);
        })
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(`Error: ${err.message}`)
      }
    }
  }
  const fetchListMember = async () => {
    try {
      await axios.get(`http://localhost:5000/api/project/listmember/id?id=${id}`)
        .then((response) => {
          setMember([...response.data]);
          // console.log('List member:',member);
        })
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(`Error: ${err.message}`)
      }
    }
  }
  function handleUpdateTask(data,index){
    let temp_listTaskProject = [...listTaskProject]
    temp_listTaskProject[index] = data
    setListTaskProject(temp_listTaskProject)
  }
  const handleDelete = async()=>{
    try {
      await axios.delete(`http://localhost:5000/api/issue/delete/id/${task._id}`)
        .then((response) => {
          // console.log('List member:',member);
          setListTaskProject(current => current.filter(element =>{
            return element._id !== task._id
          }))
        })
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(`Error: ${err.message}`)
      }
    }
  }
  console.log('Task Choose:',task)
// console.log(listTaskProject)
  const handleSearchTask = () => {
    const searchValue = document.getElementById("searchTaskInput").value;
    
    setListTaskProject(fullListTask.filter(task => (
        searchValue === "" ? true : new RegExp(`.*${searchValue}.*`, "i").test(task.Summary)
      )
    ));
  }
  const handleAddTask = (taskData) =>{
    setListTaskProject([...listTaskProject,taskData])
  }
  useEffect(() => {
    fetchListTask();
    fetchStatusTask();
    fetchTypeTask();
    fetchListMember();
  }, [])
  return (
    <div>
      <Navbar handleAddTask={handleAddTask}/>
      <div className="container">
        <div className="row mt-3">
          <div class="breadcrumb">
            <a>Dự án</a>
            <div class="breadcrumb__separator">/</div>
            { localStorage.getItem("NameProject") }
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-4">
            <h4>DANH SÁCH CÔNG VIỆC</h4>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-3">
            <form>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Tìm kiếm công việc"
                  id="searchTaskInput"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button" onClick={handleSearchTask}>
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-2">
          <Link
                    data-bs-toggle="modal"
                    data-bs-target="#AddTaskModal"
                    to="#"
                  >
                    <button className="btn btn-primary">Thêm công việc</button>
                  </Link>
          </div>
        </div>
        <div className="row mt-4 text-center">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên</th>
                <th scope="col">Người chịu trách nhiệm</th>
                <th scope="col">Trạng thái</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {/* if dùng toán tử 3 ngôi */}
              {listTaskProject.map((data,index) => (
                <tr>
                  <th scope="row">{Stt++}</th>
                  <td>{data.Summary}</td>
                  <td>
                    <div class="avatar">
                      {/* <img
                      class="avatar__image"
                      src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                      style={{ width: "100%" }}
                    /> */}
                      <p>{data.User_ID ? data.User_ID.Fullname : ""}</p>
                    </div>
                  </td>
                  <td>
                  {data.Status_ID.Name =="To Do" ? <button className="btn btn-outline-secondary">To Do</button>
                  :data.Status_ID.Name =="In Progress" ? <button className="btn btn-outline-primary">In Progress</button>
                  :<button className="btn btn-outline-success">Done</button>}
                  </td>
                  <td>
                    <div class="dropdown">
                      <button
                        class="btn btn-primary btn-sm btn-light"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fas fa-ellipsis-h"></i>
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link 
                            class="dropdown-item" to="#" data-bs-toggle="modal"
                            data-bs-target="#task_detail_modal"
                            onClick={(e)=>{setTask({...data,index})}}
                            >
                            Cập nhật
                          </Link>
                        </li>
                        <li>
                          <Link
                            class="dropdown-item"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_task_modal"
                            onClick={(e)=>{setTask({...data,index})}}
                          >
                            Xóa
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteTaskModal handleDelete={handleDelete}/>
      <TaskDetailModal Task={task} Status_List={statusTask} Type_List={typeTask} List_Member={member} handleUpdateTask={handleUpdateTask}/>
      <Footer />
    </div>
  );
}
