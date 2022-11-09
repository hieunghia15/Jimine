import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
import "./Home.css";
import axios from "axios";
import moment from "moment";

export default function Home() {
  // localStorage.setItem('UserID', '62c3e8f7292c8f213d7e7443');
  const id = localStorage.getItem("UserID");
  const [listProject, setListProject] = useState([]);
  const [listTask, setListTask] = useState([]);
  const fetchListProject = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/project/find/join/id/${id}`)
        .then((response) => {
          let data = response.data.projects;
          setListProject(data)
        }).catch((err)=>{
          console.log(err)
        });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  const fetchListTask = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/issue/get-task/${id}`)
        .then((response) => {
          setListTask(response.data.issues);
          // console.log(response.data.issues);
        });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const fetchTaskCount = async () => {
    listProject.map(async(element,index)=>{
      let Done;
      await axios
        .get(
          `http://localhost:5000/api/issue/${element._id}/counttask/62c03ed1683d30adc75ba40d`
        )
        .then(function (response) {
          Done  = response.data;
          document.getElementById(`taskCountDone_${index}`).innerHTML  = response.data ;
        }).catch(function (err) {;
          console.log(err)
        });
      await axios
      .get(
        `http://localhost:5000/api/issue/${element._id}/alltask`
      )
      .then(function (response) {
        document.getElementById(`taskCountdiffDone_${index}`).innerHTML  = response.data - Done ;
      }).catch(function (err) {;
        console.log(err)
      });
    })
  };
  
  useEffect(() => {
    fetchListProject();
    fetchListTask();
    fetchTaskCount();
  }, [listProject]);
  const navigate = useNavigate();
  console.log("ListProject",listProject);
  return (
    <div>
      <Navbar />
      <main>
        <div>
          <div className="divTitle">
            <h1 className="title">Dự án</h1>
          </div>

          <div className="row divProject">
            {listProject.length > 0 ? (
              <>
                <div>
                  <h4 className="titleProject">Dự án gần đây</h4>
                  <Link to="/list-project" className="watchProject btn btn-outline-primary btn-sm">
                    Xem tất cả dự án
                  </Link>
                </div>
                <div className="flex-container">
                  {listProject.map((project,index) => (
                    <div className="divCard">
                      <Link 
                        to="/board-tasks" 
                        onClick={() => {
                          localStorage.setItem("IdProject", project._id);
                          localStorage.setItem('NameProject', project.Name);
                        }} 
                        style={{ color: "black" }}
                      >
                        <div>
                          <div className="cardIcon">
                            <i
                              className="fa fa-square fa-3x fa-fw iconCard"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <div className="nameCard">{project.Name}</div>
                          <div className="noteCard">{project.Category.Name}</div>
                        </div>
                        <div>
                          <div className="notification" >
                            <i className="fa fa-briefcase" aria-hidden="true" ></i>
                            &nbsp;&nbsp; Công việc
                            <div className="badge" >
                              <p id={`taskCountdiffDone_${index}`}></p>
                            </div>
                          </div>

                          <div className="notification">
                            <i
                              className="fa fa-check-square"
                              aria-hidden="true"
                            ></i>
                            &nbsp;&nbsp; Công việc hoàn thành
                            <div
                              className="badge"
                              style={{ backgroundColor: "#00875A" }}
                            >
                              <p id={`taskCountDone_${index}`}></p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <h4 style={{ marginLeft: "45%" }}>Chưa có dự án</h4>
            )}
          </div>

          <div className="divTitle">
            <h1 className="title">Công việc</h1>
          </div>
          {listTask.length > 0 ? (
            <>
              <div className="row">
                <table className="table">
                  <tbody>
                    {listTask.map((task) => (
                      <tr>
                        <td className="td-name" width="45%">
                          <span>
                            <i
                              class="fa fa-square fa-3x fa-fw span-icon"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <span className="span-name">{task.Summary}</span>
                          <span>{task.Project_ID.Name}</span>
                        </td>
                        <td className="td-value" width="20%">
                          Đã tạo
                        </td>
                        <td className="td-value" width="35%">
                          {task.User_ID.Fullname}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <h4 style={{ marginLeft: "45%" }}>Chưa có công việc</h4>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
