import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import "../Login/Login.css";
import Toast from "../Toast.js";
export default function Register() {
  const [user, setUser] = useState({
    Fullname: "",
    Email: "",
    Password: "",
    PasswordConfirm: "",
  });

  const OnChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (user.Password != user.PasswordConfirm)
      return Toast.fire({
        icon: "warning",
        title: "Mật khẩu không khớp.",
      });
    else {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/user/register",
          { ...user }
        );
        Toast.fire({
          icon: "success",
          title: res.data.msg,
        });
        window.location.href = "/login";
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: err.response.data.msg,
        });
      }
    }
  };
  return (
    <>
      <div
        style={{ height: "100vh", width: "100vw" }}
        className="container-fluid px-0 my-auto py-auto d-flex justify-content-around align-items-center"
      >
        <div
          style={{ width: "100%" }}
          className="row d-flex justify-content-center"
        >
          <div className="col-md-6">
            <div className="m-2">
              <img
                className=""
                src={process.env.PUBLIC_URL + "/img/Login/background_login.png"}
              />
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center col">
            <form className="form-group  overlay center d-flex flex-column d-flex flex-column justify-content-center">
              <p className="title_login">Đăng ký</p>
              <div className="my-1 ">
                <input
                  name="Fullname"
                  type="text"
                  placeholder="Vui lòng nhập họ tên"
                  className="form-control input"
                  onChange={OnChangeInput}
                  required
                />
              </div>
              <div className="my-1 ">
                <input
                  name="Email"
                  type="text"
                  placeholder="Vui lòng nhập email"
                  className="form-control input"
                  onChange={OnChangeInput}
                  required
                />
              </div>
              <div className=" my-1">
                <input
                  name="Password"
                  type="password"
                  placeholder="Vui lòng nhập mật khẩu"
                  className="form-control input"
                  onChange={OnChangeInput}
                  required
                />
              </div>
              <div className="my-1">
                <input
                  name="PasswordConfirm"
                  type="password"
                  placeholder="Vui lòng nhập lại mật khẩu"
                  className="form-control input"
                  onChange={OnChangeInput}
                  required
                />
              </div>
              <div className="policy mb-0">
                <p style={{ color: "black", fontSize: "13px" }}>
                  Bằng cách đăng ký bạn chấp nhận Điều khoản của JIMINE về{" "}
                  <Link to="#">Dịch vụ</Link> và{" "}
                  <Link to="#">Chính sách bảo mật</Link> của chúng tôi
                </p>
              </div>
              <div className="">
                <button
                  className="btn btn-primary button center"
                  onClick={HandleSubmit}
                  type="submit"
                >
                  Đăng ký
                </button>
              </div>
              <div className="mb-2">
                <Link className="bnt text-primary link" to="/login">
                  Đăng Nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
