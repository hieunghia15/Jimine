import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../Layout/Layout.css";
import AddMemberModal from "../Modals/AddMember/AddMemberModal";
import AddProjectModal from "../Modals/AddProject/AddProjectModal";
import AddTaskModal from "../Modals/Task/AddTaskModal";
import { GlobalState } from "../../GlobalState";
export default function Navbar(props) {

  const state = useContext(GlobalState);
  const [user] = state.UserAPI.user;
  const avatar = user && user.Avatar ? `http://localhost:5000/asset/avatar/${user.Avatar}` : process.env.PUBLIC_URL + "/img/DefaultAvatarProfile.jpg"
  const handleLogout = () => {
    if (window.confirm("Có phải bạn muốn đăng xuất?")) {
      localStorage.clear();
      window.location.href = "/";
    }
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#deded5" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand logo" to="/home" style={{ color: "#0d6efd" }}>
          JIMINE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link
                className="nav-link mx-2 dropdown-toggle"
                to="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                DỰ ÁN
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/list-project">
                    <i className="fas fa-project-diagram"></i> Tất cả dự án
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#AddProjectModal"
                    to="#"
                  >
                    <i className="fa-solid fa-plus"></i> Tạo dự án
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link mx-2 dropdown-toggle"
                to="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                THÀNH VIÊN
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <h5 className="dropdown-header">Nhóm của bạn</h5>

                <li>
                  <Link className="dropdown-item" to="/list-members">
                    <i className="fa-solid fa-plus"></i> Danh sách
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <button
                data-bs-toggle="modal"
                data-bs-target="#AddProjectModal"
                className="btn btn-outline-primary "
              >
                Tạo dự án
              </button>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto d-none d-lg-inline-flex">
            <li className="m-auto">{user?.Fullname}</li>
            <li className="nav-item dropdown mx-2">
              <Link
                className="nav-link dropdown-toggle h4"
                to="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-haspopup="true"
              >
                {
                  <img src={avatar} style={{ width: "50px", height: "50px", backgroundSize: "cover", borderRadius: "50%" }} />
                  // `http://localhost:5000/asset/avatar/${user.Avatar}`
                }
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Thông tin cá nhân
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/change-password">
                    Đổi mật khẩu
                  </Link>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#" onClick={handleLogout}>
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <AddProjectModal />
      <AddTaskModal handleAddTask={props.handleAddTask} />
    </nav>
  );
}
