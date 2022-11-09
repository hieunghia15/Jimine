import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
export default function Login() {
  const [user, setUser] = useState({ Email: "", Password: "" });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // console.log({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { ...user });
      await localStorage.setItem("UserID", res.data.accessToken);
      window.location.href = "/home";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const handleKeyDown = (e) =>{
    if(e.key === "Enter"){
      handleSubmit(e)
    }
  }
  return (
    <>
      <div
        style={{ height: "100vh", width: "100vw" }}
        className="container-fluid px-0 my-auto py-auto d-flex justify-content-around align-items-center  "
      >
        <div style={{ width: "100%" }} className="row ">
          <div className="col-md-6">
            <div className="m-2">
              <img
                className=""
                src={process.env.PUBLIC_URL + "/img/Login/background_login.png"}
              />
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center col">
            <div
              className="form-group  overlay center d-flex flex-column justify-content-center"
              // onKeyDown={handleKeyDown}
            >
              <p className="title_login">Đăng nhập</p>
              <div className="my-2 ">
                <input
                  name="Email"
                  type="text"
                  placeholder="Vui lòng nhập email"
                  className="form-control input  "
                  onChange={onChangeInput}
                />
              </div>
              <div className=" my-2">
                <input
                  name="Password"
                  type="password"
                  placeholder="Vui lòng nhập mật khẩu"
                  className="form-control input"
                  onChange={onChangeInput}
                  onKeyDown={(e)=>{handleKeyDown(e)}}
                />
              </div>
              <div className="">
                <a className="text-primary link" href="#">
                  Quên mật khẩu ?
                </a>
              </div>
              <div className="my-2">
                <button
                  type="submit"
                  className="btn btn-primary button  center"
                  onClick={handleSubmit}
                >
                  Đăng nhập
                </button>
              </div>
              <div>
                <Link className="bnt text-primary link" to="/register">
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
