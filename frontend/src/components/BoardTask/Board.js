import { useEffect, useState } from "react";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
import AddMemberModal from "../Modals/AddMember/AddMemberModal";
import AddTaskModal from "../Modals/Task/AddTaskModal";
import "./Board.css";
import { getProjectData } from "./ProjectData";
import TaskArea from "./TaskArea";
import axios from 'axios';
import TaskDetailModal from "../Modals/DetailTask/TaskDetailModal";

export default function Board() {
  var [projectData, setProjectData] = useState({})
  const [task, setTask] = useState(''); // Gửi Task cho Modal TaskDetail

  const getData = async () => {
    projectData = await getProjectData();
    setProjectData(projectData);
    console.log(projectData);
  }

  useEffect(() => {
    getData();
  }, []);

  var cardColors = ["rgb(211, 211, 211)", "rgb(102, 178, 255)",
    "rgb(166, 241, 166)", "rgb(100, 229, 207)", "rgb(255, 215, 0)"];
  var colorCounter = 0;

  async function deleteMemberInProject(memberID) {
    await axios.delete(
      "http://localhost:5000/api/project/member/delete/idProject/"
      + projectData.id + "/idMember/" + memberID
    );
    window.location.reload(false);
  }

  function getSmallMembersList() {
    var listOfHTML = [];
    if (projectData.members?.length <= 2) {
      listOfHTML = projectData.members?.map((member) => {
        return (
          <tr key={member._id}>
            <td></td>
            <td>
              <img src={member?.Avatar ? `http://localhost:5000/asset/avatar/${member.Avatar}` : "img/DefaultAvatarProfile.jpg"} /> {member.Fullname}
            </td>
            <td>{member.Email}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (window.confirm("Bạn muốn xóa " + member.Fullname
                    + " khỏi dự án " + projectData.name + "?")) {
                    deleteMemberInProject(member._id);
                  }
                }}>
                X</button>
            </td>
          </tr>
        );
      });

      listOfHTML.push(
        <tr key="btnThemThanhVien">
          <td colSpan={4} className="text-center">
            <button
              className="btn btn-warning mb-2 text-white"
              data-bs-toggle="modal"
              data-bs-target="#addmemberModal"
            >
              Thêm thành viên
            </button>
          </td>
        </tr>
      );
    } else {
      listOfHTML = projectData.members?.slice(0, 2).map((member) => {
        return (
          <tr key={member._id}>
            <td></td>
            <td>
              <img src={member?.Avatar ? `http://localhost:5000/asset/avatar/${member.Avatar}` : "img/DefaultAvatarProfile.jpg"} /> {member.Fullname}
            </td>
            <td>{member.Email}</td>
          </tr>
        );
      });

      listOfHTML?.push(
        <tr key="btnXemAll">
          <td colSpan={3} className="text-center p-0">
            <i
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#seeAllMembersModal"
            >
              Xem tất cả
            </i>
          </td>
        </tr>
      );
    }

    return listOfHTML;
  }

  function getModalSeeAllMembers() {
    return (
      <>
        <div
          className="modal fade"
          id="seeAllMembersModal"
          tabIndex="-1"
          aria-labelledby="seeAllMembersModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Danh sách thành viên trong dự án
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <button
                  className="btn btn-warning mb-2 text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#addmemberModal"
                >
                  Thêm thành viên
                </button>
                <table className="table" id="board_modalDanhSachThanhVien">
                  <thead>
                    <tr>
                      <th>Vai trò</th>
                      <th>Tên thành viên</th>
                      <th>Email</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-light">
                      <td>Leader</td>
                      <td>
                        <img src={projectData.leader?.Avatar ? `http://localhost:5000/asset/avatar/${projectData.leader.Avatar}` : "img/DefaultAvatarProfile.jpg"} />&nbsp;
                        {projectData.leader?.Fullname}
                      </td>
                      <td>{projectData.leader?.Email}</td>
                      <td></td>
                    </tr>

                    {projectData.members?.map((member) => {
                      return (
                        <tr key={member._id}>
                          <td>Member</td>
                          <td>
                            <img src={member?.Avatar ? `http://localhost:5000/asset/avatar/${member.Avatar}` : "img/DefaultAvatarProfile.jpg"} /> {member.Fullname}
                          </td>
                          <td>{member.Email}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                if (window.confirm("Bạn muốn xóa " + member.Fullname
                                  + " khỏi dự án " + projectData.name + "?")) {
                                  deleteMemberInProject(member._id);
                                }
                              }}>
                              X</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
 
  function handleUpdateTask(data){

  }
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="container mt-3 breadcrumb">
          <a>Dự án</a>
          <div class="breadcrumb__separator">/</div>
          { localStorage.getItem("NameProject") }
        </div>
        <table id="board_tableThongTinDuAn">
          <tbody>
            <tr>
              <th>Tên dự án:</th>
              <td id="board_tenDuAn">{projectData.name}</td>
            </tr>
            <tr>
              <th>Thành viên:</th>
              <td>
                <table id="board_danhSachThanhVien">
                  <tbody>
                    <tr>
                      <td>
                        <img src="./img/Board/leaderIcon.png" />
                      </td>
                      <td>
                        <img src={projectData.leader?.Avatar ? `http://localhost:5000/asset/avatar/${projectData.leader.Avatar}` : "img/DefaultAvatarProfile.jpg"} />&nbsp;
                        {projectData.leader?.Fullname}
                      </td>
                      <td>{projectData.leader?.Email}</td>
                    </tr>

                    {getSmallMembersList()}

                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        {projectData.members?.length <= 2 ? <></> : getModalSeeAllMembers()}

        <button
          id="board_btnTaoCongViec"
          data-bs-toggle="modal"
          data-bs-target="#AddTaskModal"
        >
          + Tạo công việc
        </button>

        <div className="d-flex">
          {projectData.taskAreas?.map((area) => (
            <TaskArea
              key={area.id}
              data={area}
              cardColor={colorCounter < cardColors.length
                ? cardColors[colorCounter++] : "rgb(220, 220, 220)"}
                func={setTask}
            />
          ))}
        </div>

        <AddTaskModal />
        <AddMemberModal id={projectData.id} isUser={false}/>
      </div>
      <TaskDetailModal Task={task} Status_List={projectData.statuses} Type_List={projectData.types} List_Member={projectData.members} handleUpdateTask={handleUpdateTask}/>
      <Footer />
    </>
  );
}
