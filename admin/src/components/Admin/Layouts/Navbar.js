import React ,{ useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
export default function Navbar() {
  const state = useContext(GlobalState);
  const [user] = state.user;
  const handleLogout = () => {
    if(window.confirm("Có phải bạn muốn đăng xuất?")){
    localStorage.removeItem('UserID');
    window.location.href = "/login";
    }
  }
  return (
    <div>
      <div className="navbar-bg"></div>
      <nav className="navbar navbar-expand-lg main-navbar">
        <form className="form-inline mr-auto">
          <ul className="navbar-nav mr-3">
            <li>
              <Link
                to="#"
                data-toggle="sidebar"
                className="nav-link nav-link-lg"
              >
                <i className="fas fa-bars"></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                data-toggle="search"
                className="nav-link nav-link-lg d-sm-none"
              >
                <i className="fas fa-search"></i>
              </Link>
            </li>
          </ul>
        </form>
        <ul className="navbar-nav navbar-right">
          <li className="dropdown">
            <Link
              to="#"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-lg nav-link-user"
            >
              <img
                alt="image"
                src={process.env.PUBLIC_URL + "/assets/img/avatar/avatar-1.png"}
                className="rounded-circle mr-1"
              />

              <div className="d-sm-none d-lg-inline-block">{user?.Fullname}</div>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to="/profile" className="dropdown-item has-icon">
                <i className="far fa-user"></i> Thông tin cá nhân
              </Link>
              <Link
                to="/change-password"
                className="dropdown-item has-icon"
              >
                <i className="fa fa-key"></i> Thay đổi mật khẩu
              </Link>
              <Link
                to="/edit-profile"
                className="dropdown-item has-icon"
              >
                <i className="fas fa-cog"></i> Cài đặt tài khoản
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="#" className="dropdown-item has-icon text-danger" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Đăng xuất
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
