import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Toast from '../../Toast';

export default function AddTaskModal() {
  // localStorage.setItem('UserID', '62c3e95b292c8f213d7e7453');
  const id = localStorage.getItem('UserID');
  const [listProject, setListProject] = useState([]);
  const [listType, setListType] = useState([]);
  const [listMember, setListMember] = useState([]);
  const [fileList,setFileList]= useState([]);
  const [chooseFile, setChooseFile] = useState();

  const navigate = useNavigate();

  const fetchListProject = async () => {
    try {
      await axios.get(`http://localhost:5000/api/project/find/member/id/${id}`)
          .then((response) => {
          setListProject(response.data.projects.map(project => {
            return {id: project._id, name: project.Name, key: project.Key, taskCounter: project.TaskCounter} 
          }));
          // console.log(response.data.projects);
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
  };

  // Lay danh sach type
  const fetchListType = async () => {
    try {
      await axios.get(`http://localhost:5000/api/type/istype?type=Tasks`)
      .then((response) => {
        setListType(response.data);
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
  };

  // Lay danh sach member
  const fetchListMember = async (idProject) => {
    try {
      await axios.get(`http://localhost:5000/api/project/find/id/${idProject}`)
          .then((response) => {
          setListMember([response.data.project.User_ID, ...response.data.project.Member]);
          console.log([response.data.project.User_ID, ...response.data.project.Member]);
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
  };

  // Lay id trang thai khoi tao task
  const fetchFirtState = async () => {
    try {
      const abc = await axios.get(`http://localhost:5000/api/status/getMinNo`);
      console.log(abc.data.stat[0]._id);
      return abc.data.stat[0]._id;
    } catch (err) {
      if (err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
      } else {
          console.log(`Error: ${err.message}`)
      }
      return undefined;
    }
  };

  // Bat su kien change pro de lay ds members
  const handleChangeProject = async (e) => {
    await fetchListMember(e.target.value);
  }

  // Bat su kien submit taoj project
  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectProject = document.getElementById("select-project");
    if(selectProject.value === "Chon du an") {
      alert("Hãy chọn một dự án!");
    }
    else {
      try {
        const Project_ID = document.getElementById("select-project").value;
        const Type_ID = document.getElementById("select_typeTask").value;
        var Status_ID = await fetchFirtState();
        const Summary = document.getElementById("input_summary").value;
        const Description = document.getElementById("textarea_desc").value;
        const Deadline = document.getElementById('input_deadline').value;
        const Attachment = [];
        // 
        var Key = 0;
        for(var i = 0; i < listProject.length; i++){
          var project = listProject[i];
          if(project.id === Project_ID) {
            Key = project.key + "-" + project.taskCounter;
            break;
          }
        };

        const User_ID = document.getElementById("select_members").value;
        
        const dataS =  {
          Project_ID: Project_ID,
          Type_ID: Type_ID,
          Status_ID: Status_ID,
          Summary: Summary,
          Description: Description,
          Attachment: Attachment,
          Deadline,
          Key: Key,
          User_ID: User_ID
        };
        
        let newTask = await axios.post(`http://localhost:5000/api/issue/create`, dataS);
        console.log("New Task:",newTask)
        const files = document.getElementById("input_attachment").files;
        // console.log("File list:",files)
        if (files.length === 1) {
          let formData = new FormData();
          formData.append("attachment", files[0]);
          formData.append("task_id", newTask.data.newIssue._id);
          console.log("Form Data:", formData);
          await axios.post(
            "http://localhost:5000/api/issue/upload/file",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              params: {
                key: newTask.data.newIssue.Key,
              },
            }
          );
        } else if (files.length > 1) {
          let formData = new FormData();
          for (let i = 0; i <= files.length; i++) {
            formData.append("attachments", files[i]);
          }
          formData.append("task_id", newTask.data.newIssue._id);
          console.log("Form Data:", formData);
          await axios.post(
            "http://localhost:5000/api/issue/upload/multiplefiles",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              params: {
                key: newTask.data.newIssue.Key,
              },
            }
          );
        }
        else {console.log("Khong có upload file!")}
        await axios.put(`http://localhost:5000/api/project/updateTaskCounter/id/${Project_ID}`);
        window.location.reload();
        return Toast.fire({
          icon: "success",
          title: "Đã tạo công việc thành công!",
        });
        // window.location.reload();
      } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else {
            console.log(`Error: ${err.message}`)
        }
        // window.location.reload();
      }
    }
  };
  
  // Xu ly upload file
  const handleSelectFile = (e)=>{
    const files = e.target.files;
    if(files.length === 1)
    {
      let url = URL.createObjectURL(files[0])
      setFileList([url])
    }
    else if(files.length > 1){
      let temp_list = []
      for(let i = 0 ;i< files.length ;i++){
        let url = URL.createObjectURL(files[i])
        temp_list[i] = url
      }
      setFileList(temp_list)
    }
    // console.log(fileList)
  }

  useEffect(() => {
      fetchListProject();
      fetchListType();
      //fetchListMember();
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="AddTaskModal"
        tabindex="-1"
        aria-labelledby="AddTaskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddTaskModalLabel">
                Thêm công việc
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="row">
              <div className="col-6">
                <label className="small mb-1">
                  Dự án: <span className="text-danger">(*)</span>
                </label>
                <select
                  id="select-project"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={e => handleChangeProject(e)}
                >
                  <option value="Chon du an" selected disabled>
                    Chọn dự án
                  </option>
                  {
                    listProject.map((data) => (
                      <option value={data.id}>{data.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="col-6">
                <label className="small mb-1">
                  Loại công việc: <span className="text-danger">(*)</span>
                </label>
                <select
                  id="select_typeTask"
                  className="form-select"
                  aria-label="Default select example"
                >
                  {
                    listType.map((data) => (
                      <option value={data._id}>{data.Name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="modal-body">
              <label className="small mb-1">
                Tóm tắt: <span className="text-danger">(*)</span>
              </label>
              <input id="input_summary" className="form-control" type="text" />

              <label className="small mb-1">Mô tả chi tiết:</label>
              <textarea id="textarea_desc"
                class="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
            <div className="row">
              <div className="col-6">
                <label className="small mb-1">
                  Dealine: <span className="text-danger">(*)</span>
                </label>
                <input id="input_deadline" className="form-control" type="date" />
              </div>
              <div className="col-6">
                <label className="small mb-1">
                  Thực hiện: <span className="text-danger">(*)</span>
                </label>
                <select
                  id="select_members"
                  className="form-select"
                  aria-label="Default select example"
                >
                  {listMember.map((data, i) => {
                    if(i === 0) {
                      return <option value={data._id} selected>{data.Fullname}</option>
                    } else {
                      return <option value={data._id}>{data.Fullname}</option>
                    }
                  }
                    
                  )}
                </select>
              </div>

              <label className="small mb-1">Đính kèm:</label>
              <input id="input_attachment" className="form-control" type="file" onChange={(e)=>{handleSelectFile(e)}} multiple/>
              <div className="d-flex flex-wrap justify-content-start">
                {fileList
                  ? fileList.map((element) => {
                      return (
                        <div className="card-image">
                          <div className="w-100 preview-card-image">
                            <img
                              onClick={(e) => {setChooseFile(e.target.src)}}
                              className="w-100 img-file"
                              src={element}
                              data-bs-dismiss="modal"
                              data-bs-toggle="modal"
                              data-bs-target="#add_task_view_file"
                              data-id={element}
                            />
                          </div>
                          <div className="file-name">
                            <span>{element.slice(0, 18) + "..."}</span>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button onClick={(e) => {handleSubmit(e)}} type="button" className="btn btn-primary">
                Tạo công việc
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal show full image */}
      <div
        class="modal fade"
        id="add_task_view_file"
        tabindex="-1"
        aria-labelledby="add_task_view_fileLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-fullscreen"
          style={
            {
              // width: "100%",
              // maxWidth: "none",
              // height: "100%",
              // margin: "0",
            }
          }
        >
          <div className="modal-content ">
            <div className="modal-header border-0">
              <button
                style={{ position: "absolute", right: "10px", padding: "5px" }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#AddTaskModal"
              ></button>
            </div>
            <div className="modal-body p-0 d-flex justify-content-center">
              <img style={{ width: "auto", height: "100%" }} src={chooseFile} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
