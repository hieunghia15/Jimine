import React, { useState, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./TaskDetailModal.css";
import moment from "moment";

export default function DetailModal(props) {
  const [taskData, setTaskData] = useState({});
  const [statusChange, setStatusChange] = useState({
    isTitle: false,
    isDescription: false,
    isDeadline: false,
    isModify: false,
    isAssingee: false,
  });
  const [dataChange,setDataChange] = useState({});
  const [filelist, setFileList] = useState();
  const [chooseFile, setChooseFile] = useState();
  useEffect(() => {
    setTaskData(props.Task);
    // console.log(props.Task)
  }, [props.Task , props.callback]);

  // console.log("Task Data:", taskData);
  // console.log(props.isChoose);
  // console.log("Description:",description)
  // console.log("Type Data:", typeTask);
  // console.log("Status Data:", status);

  useEffect(() => {
    if (
      statusChange.isTitle ||
      statusChange.isDeadline ||
      statusChange.isDescription ||
      statusChange.isAssingee ||
      dataChange.Status_ID && dataChange.Status_ID !== taskData.Status_ID._id ||
      dataChange.Type_ID && dataChange.Type_ID !== taskData.Type_ID._id
    ) {
      setStatusChange({ ...statusChange, isModify: true });
    } else {
      setStatusChange({ ...statusChange, isModify: false });
    }
  }, [
    statusChange.isTitle,
    statusChange.isDescription,
    statusChange.isDeadline,
    statusChange.isAssingee,
    dataChange.Status_ID,
    dataChange.Type_ID,
  ]);

  function handleClickModify(name) {
    setStatusChange({ ...statusChange, [name]: true });
  }
  // console.log("Change Status:",statusChange)
  // useEffect(() => {
  //   Data_Modify['Status_ID']=status;
  // }, [status]);

  // useEffect(() => {
  //   setTypeTask(taskData.Type_ID.Name);
  // }, [!taskData.Type_ID ? null :taskData.Type_ID.Name]);

  const handleChangeAssingee = (e) => {
    setDataChange({...dataChange,['User_ID']:e.target.value});
  };
  // useEffect(() => {
  //   setAssingee(mongoDB.data.assingee);
  // }, [mongoDB.data.assingee]);

  const handleChangeStatus = (e) => {
    setDataChange({...dataChange,['Status_ID']:e.target.value});
  };
  const handleChangeTypeTask = (e) => {
    setDataChange({...dataChange,['Type_ID']:e.target.value});
  };
  const handleUpdateTitle = (e) => {
    setDataChange({...dataChange,['Summary']:e.target.value});
  };
  // const handleUpdateDescription = (e) => {
  //   setDescription(e.target.value);
  // };
  const handelChangeDeadline = (e) => {
    setDataChange({...dataChange,['Deadline']:e.target.value});
  };
  function clearModify() {
    setStatusChange({
      isTitle: false,
      isDescription: false,
      isDeadline: false,
      isModify: false,
      isAssingee: false,
    });
    setDataChange({});
  }
  // console.log("Data Change:",dataChange)

  function handleUpdate(e) {
    
    const update = axios
      .patch(
        `http://localhost:5000/api/issue/update/id/${
          taskData ? taskData._id : ""
        }`,
        dataChange
      )
      .then(function (response) {
        setTaskData(response.data.newIssue);
        props.handleUpdateTask(response.data.newIssue,taskData.index)
      }).catch(function(error){
        console.log("Error update:",error)
      })
    clearModify();
    window.location.reload();
  }
  // console.log("Data Task:", taskData);
  async function handleSelectedFile(e) {
    const files = e.target.files;
    console.log("Files :", files[0]);
    const numFiles = files.length;
    if (files.length === 1) {
      // console.log("NumFiles:", numFiles);
      let formData = new FormData();
      formData.append("attachment", files[0]);
      formData.append("task_id", taskData._id ? taskData._id : null);
      console.log("Form Data:", formData);
      const upload = await axios.post(
        "http://localhost:5000/api/issue/upload/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            key: taskData ? taskData.Key : "",
          },
        }
      );
      // console.log("Filename upload:", upload.data.listFile);
      setFileList(upload.data.fileList);
    } else if (files.length > 1) {
      let formData = new FormData();
      for (let i = 0; i <= numFiles; i++) {
        formData.append("attachments", files[i]);
      }
      formData.append("task_id", taskData._id ? taskData._id : null);
      console.log("Form Data:", formData);
      const upload = await axios.post(
        "http://localhost:5000/api/issue/upload/multiplefiles",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            key: taskData ? taskData.Key : "",
          },
        }
      );
      // console.log("Filename upload:", upload.data);
      setFileList(upload.data.fileList);
    }
  
  }
  // console.log("File List:",filelist)
  function chooseFileView(e) {
    setChooseFile(e.target.src);
  }
  async function deleteFileUpload(e) {
    // console.log(e.target.getAttribute('data-id'))
    console.log("Task ID:", taskData._id);
    const deleteFile = await axios
      .delete(`http://localhost:5000/api/issue/file`, {
        params: {
          task_id:  taskData._id ,
          filename: e.target.getAttribute("data-id"),
        },
      })
      .then(function (response) {
        setFileList(response.data.fileList);
      })
      .catch(function (error) {
        console.log("Delete error:", error);
      });
  }
  return (
    <>
      <div
        className="modal fade"
        id="task_detail_modal"
        tabindex="-1"
        aria-labelledby="task_detail_modal_Label"
        aria-hidden="true"
      >
        <div style={{ maxWidth: "90%" }} className="modal-dialog">
          <div style={{ height: "90vh" }} className="modal-content">
            <div className="modal-header">
              <h6
                style={{ fontSize: "x-large" }}
                className="modal-title"
                id="exampleModalLabel"
              >
                {taskData.Key ? taskData.Key : "None"}
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              style={{ maxWidth: "100%" }}
              className="modal-body container overflow-auto p-0 m-0 d-flex flex-column mw-100"
            >
              <div className="row p-0 m-0 mw-100">
                <div className="col-md-6 py-1">
                  <div
                    style={{ fontSize: "x-large", fontWeight: "700" }}
                    id="title_task"
                    className="title-task-detail my-1"
                    onClick={() => handleClickModify("isTitle")}
                  >
                    {!statusChange.isTitle ? (
                      taskData.Summary ? (
                        taskData.Summary
                      ) : (
                        "None"
                      )
                    ) : (
                      <input
                        value={dataChange.Summary ? dataChange.Summary : taskData.Summary}
                        class="form-control element-update"
                        onChange={(e) => {
                          handleUpdateTitle(e);
                        }}
                      ></input>
                    )}
                  </div>
                  <label className="label_detail_task">Mô tả</label>
                  <div
                    id="description_task"
                    className="title-task-detail my-1"
                    onClick={() => handleClickModify("isDescription")}
                  >
                    {!statusChange.isDescription ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: taskData.Description
                            ? taskData.Description
                            : "None",
                        }}
                      ></div>
                    ) : (
                      <CKEditor
                        editor={ClassicEditor}
                        // data="<p>Hello from CKEditor 5!</p>"
                        data={taskData.Description}
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          // console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDataChange({...dataChange,['Description']:data})
                          // console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                          // console.log("Blur.", editor);
                        }}
                        onFocus={(event, editor) => {
                          // console.log("Focus.", editor);
                        }}
                      />
                    )}
                  </div>

                  <label className="label_detail_task">Thời hạn</label>
                  <div
                    id="deadline_task"
                    className="title-task-detail my-1"
                    onClick={() => handleClickModify("isDeadline")}
                  >
                    
                    {!statusChange.isDeadline ? (
                      taskData.Deadline ? (
                        moment(new Date(taskData.Deadline)).format("DD-MM-YYYY")
                      ) : (
                        "None"
                      )
                    ) : (
                      <input
                        class="form-control element-update"
                        placeholder={dataChange.Deadline}
                        type="date"
                        value={dataChange.Deadline}
                        onChange={(e) => handelChangeDeadline(e)}
                      />
                    )}
                  </div>
                  <label className="label_detail_task">Người thực hiện</label>
                  <div
                    className="title-task-detail my-1"
                    onClick={() => handleClickModify("isAssingee")}
                  >
                    {!statusChange.isAssingee ? (
                      <div>
                        <img
                          src={taskData.User_ID?.Avatar ? `http://localhost:5000/asset/avatar/${taskData.User_ID?.Avatar}`:
                            process.env.PUBLIC_URL +
                            "/img/DefaultAvatarProfile.jpg"
                          }
                          class="avatar-member "
                        ></img>
                        <span className="ms-1 ">
                          {taskData.User_ID
                            ? taskData.User_ID.Fullname
                            : "None"}
                        </span>
                      </div>
                    ) : (
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        value={
                          dataChange.User_ID
                            ? dataChange.User_ID
                            : taskData.User_ID
                            ? taskData.User_ID._id
                            : "None"
                        }
                        onChange={(e) => {
                          handleChangeAssingee(e);
                        }}
                      >
                        {!props.List_Member
                          ? "None"
                          : props.List_Member.map((value, index) => {
                              return (
                                <option value={value._id}>
                                  <span className="ms-1 ">
                                    {value.Fullname}
                                  </span>
                                </option>
                              );
                            })}
                      </select>
                    )}
                  </div>
                </div>
                <div className="col-md-6 py-1 ">
                  <label className="label_detail_task">Trạng thái</label>
                  <div className="my-1">
                    {
                      <select
                        className="form-select outline-secondary"
                        aria-label="Default select example"
                        value={
                          dataChange.Status_ID
                            ? dataChange.Status_ID
                            : taskData.Status_ID
                            ? taskData.Status_ID._id
                            : "None"
                        }
                        onChange={(e) => {
                          handleChangeStatus(e);
                        }}
                      >
                        {!props.Status_List
                          ? null
                          : props.Status_List.map((value, index) => {
                              return (
                                <option
                                  style={{ backgroundColor: "white" }}
                                  value={value._id}
                                  index={index}
                                >
                                  {value.Name}
                                </option>
                              );
                            })}
                      </select>
                    }
                  </div>
                  <label className="label_detail_task">Loại công việc</label>
                  <div className="my-1">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      value={
                        dataChange.Type_ID
                          ? dataChange.Type_ID
                          : taskData.Type_ID
                          ? taskData.Type_ID._id
                          : "None"
                      }
                      onChange={(e) => {
                        handleChangeTypeTask(e);
                      }}
                    >
                      {!props.Type_List
                        ? null
                        : props.Type_List.map((value, index) => {
                            return (
                              <option
                                style={{ backgroundColor: "white" }}
                                value={value._id}
                                index={index}
                              >
                                {value.Name}
                              </option>
                            );
                          })}
                    </select>
                  </div>
                </div>
                <div className="col-12 py-1">
                  <label className="label_detail_task ">Tệp tin đính kèm</label>{" "}
                  <br />
                  <div className="upload-btn-wrapper">
                    <button className="btn btn-primary">Upload a file</button>
                    <input
                      type="file"
                      name="myfile"
                      onChange={(e) => handleSelectedFile(e)}
                      multiple={true}
                    />
                  </div>
                  <div className="list-file">
                    {filelist
                      ? filelist.map((element) => {
                          return (
                            <div className="card-image">
                              {/* <div className="show-delete-img"></div> */}
                              <div className="w-100 preview-card-image">
                                <button
                                  data-id={element}
                                  type="button"
                                  className="btn-close btn-delete-file"
                                  aria-label="Close"
                                  onClick={(e) => deleteFileUpload(e)}
                                ></button>
                                <img
                                  onClick={(e) => chooseFileView(e)}
                                  className="w-100 img-file"
                                  src={`http://localhost:5000/asset/image/${element}`}
                                  data-bs-dismiss="modal"
                                  data-bs-toggle="modal"
                                  data-bs-target="#task_detail_view_file"
                                  data-id={element}
                                />
                              </div>
                              <div className="file-name">
                                <span>{element.slice(0, 18) + "..."}</span>
                              </div>
                            </div>
                          );
                        })
                      : taskData.Attachment
                      ? taskData.Attachment.map((element) => {
                          return (
                            <div className="card-image">
                              {/* <div className="show-delete-img"></div> */}
                              <div className="w-100 preview-card-image">
                                <button
                                  data-id={element}
                                  type="button"
                                  className="btn-close btn-delete-file"
                                  aria-label="Close"
                                  onClick={(e) => deleteFileUpload(e)}
                                ></button>
                                <img
                                  onClick={(e) => chooseFileView(e)}
                                  className="w-100 img-file"
                                  src={`http://localhost:5000/asset/image/${element}`}
                                  data-bs-dismiss="modal"
                                  data-bs-toggle="modal"
                                  data-bs-target="#task_detail_view_file"
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
              </div>
            </div>
            <div className="modal-footer">
              {!statusChange.isModify ? (
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Trở Lại
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      clearModify();
                    }}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => handleUpdate(e)}
                  >
                    Cập nhật
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modal show full image */}
      <div
        class="modal fade"
        id="task_detail_view_file"
        tabindex="-1"
        aria-labelledby="task_detail_view_fileLabel"
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
                data-bs-target="#task_detail_modal"
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
