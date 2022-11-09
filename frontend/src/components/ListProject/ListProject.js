import React, { useState, useEffect } from 'react';
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { Link } from 'react-router-dom'
import axios from 'axios';
import moment from "moment";
import DeleteTaskModal from "../Modals/DeleteTask/DeleteTaskModal";
import AddProjectModal from "../Modals/AddProject/AddProjectModal";

export default function ListProject() {
  var Stt = 1;
  // localStorage.setItem('UserID', '62c3e95b292c8f213d7e7453');
  const id = localStorage.getItem('UserID');
  const [listProject, setListProject] = useState([]);
  const [fullListProject, setFullListProject] = useState([]);
  const [listProjectType, setListProjectType] = useState([]);
  const [project, setProject] = useState({}) // gui project dc chon cho child
  const fetchListProject = async () => {
    try {
      await axios.get(`http://localhost:5000/api/project/find/member/id/${id}`)
        .then((response) => {
          setListProject(response.data.projects);
          setFullListProject(response.data.projects);
          setListProjectType([ ... new Set(response.data.projects.map(project => project.Category.Name)) ]);
          console.log(response.data.projects);
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
  const setData = (data) => {
    console.log("Data" + data);
    let { _id, Name, Key, Category, Description} = data;
    localStorage.setItem('IdProject', _id);
    localStorage.setItem('NameProject', Name);
    localStorage.setItem('Key', Key);
    localStorage.setItem('Category', Category._id);
    localStorage.setItem('Description', Description);
  }
  useEffect(() => {
    fetchListProject();
  }, [])

  const handleChangeListProject = () => {
    const searchValue = document.getElementById("searchProjectInput").value;
    const typeSelected = document.getElementById("projectTypeSelect").value;

    setListProject(fullListProject.filter(project => {
      return (searchValue === "" ? true : new RegExp(`.*${searchValue}.*`, "i").test(project.Name))
        && (typeSelected === "Tất cả" ? true : project.Category.Name === typeSelected);
    }));
  }
  const handleDelete = async () => {
    try {
      // xoa tat ca cac task cua project can xoa
      await axios.delete(`http://localhost:5000/api/issue/delete/project/${project._id}`)
        .then((response) => {
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
        })
      // xoa project
      await axios.delete(`http://localhost:5000/api/project/delete/id/${project._id}`)
        .then((response) => {
          setListProject(current => current.filter(element => {
            return element._id !== project._id
          }))
        }).catch((error) => {
          console.log(error)
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
  console.log("Project Choose:", project)
  return (

    <div>
      <Navbar />
      <div className="container" style={{position: "relative"}}>
        <div className="row mt-4">
          <div className="col-3">
            <h4>DỰ ÁN</h4>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-3">
            <form>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Tìm kiếm dự án" id="searchProjectInput" />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button" onClick={handleChangeListProject}>
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-2">
            <select class="form-select" id="projectTypeSelect" onChange={handleChangeListProject}>
              <option value="Tất cả" key="Tất cả">Tất cả</option>
              {listProjectType.map(type => <option value={type} key={type}>{type}</option>)}
            </select>
          </div>
          <div className="col-2">
            <button className="btn btn-primary" data-bs-toggle="modal"
              data-bs-target="#AddProjectModal">Tạo dự án</button>
          </div>
        </div>
        <div className="row mt-4 text-center">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên</th>
                <th scope="col">Thành viên quản lý</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Loại dự án</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {listProject.map((data) => (
                <tr>
                  <td>{Stt++}</td>
                  <td>{data.Name}</td>
                  <td>
                    {data.User_ID.Fullname}
                  </td>
                  <td>{moment(new Date(data.createdAt)).format("DD-MM-YYYY")}</td>
                  <td>{data.Category.Name}</td>
                  <td>
                    <div class="dropdown">
                      <button class="btn btn-primary btn-sm btn-light" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-ellipsis-h"></i>
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link class="dropdown-item" to="/list-tasks" onClick={() => setData(data)}>Danh sách công việc</Link></li>
                        <li><Link class="dropdown-item" to="/board-tasks" onClick={() => setData(data)}>Bảng công việc</Link></li>
                        {/* ------------------------------------ */}
                        <li><Link 
                            class="dropdown-item" 
                            to="/update-project" 
                            onClick={() => setData(data)}>
                              Cập nhật dự án
                            </Link>
                        </li>
                        <li><Link class="dropdown-item" to="/user-report" onClick={() => setData(data)}>Báo cáo</Link></li>
                        <li><Link class="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_task_modal" onClick={() => { setProject(data) }}>Xóa</Link></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddProjectModal />
      <DeleteTaskModal handleDelete={handleDelete} />
      <Footer />
    </div>
  )
}
