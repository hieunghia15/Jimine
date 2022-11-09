import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import moment from "moment";

export default function Profile() {
  // localStorage.setItem('UserID', '62c3e94f292c8f213d7e7450');
  const id = localStorage.getItem('UserID');
  let navigate = useNavigate();

  const [profile, setProfile] = useState([]);
  const fetchProfile = async () => {
    try {
      await axios.get(`http://localhost:5000/api/user/id/${id}`)
        .then((response) => {
          setProfile(response.data[0]);
          console.log(response.data[0]);
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
  useEffect(() => {
    fetchProfile();
  },[])
  const setData = (data) => {
    console.log(data);
    let { _id, Fullname, Address, Birthday, Company, Department, Gender, Phone, Position } = data;
    localStorage.setItem('ID', _id);
    localStorage.setItem('Fullname', Fullname);
    localStorage.setItem('Address', Address);
    localStorage.setItem('Birthday', Birthday);
    localStorage.setItem('Company', Company);
    localStorage.setItem('Department', Department);
    localStorage.setItem('Gender', Gender);
    localStorage.setItem('Phone', Phone);
    localStorage.setItem('Position', Position);    
  }
  return (
    <div>
      <div id="app">
        <div className="main-wrapper main-wrapper-1">
          <Navbar />
          <Sidebar />
          <div className="main-content">
            <section className="section">
              <div className="section-header">
                <div className="section-header-back">
                  <Link to="features-posts.html" className="btn btn-icon">
                    <i className="fas fa-arrow-left"></i>
                  </Link>
                </div>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active">
                    <Link to="#">Dashboard</Link>
                  </div>
                  <div className="breadcrumb-item">
                    <Link to="#">Thông tin cá nhân</Link>
                  </div>
                </div>
              </div>
              <div className="section-body">
                <h2 className="section-title">Thông tin cá nhân</h2>
                <p className="section-lead">
                  Bạn có thể sửa đổi thông tin bên dưới
                </p>
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="form-group mb-4 d-flex flex-column justify-content-center align-items-center text-center">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                            alt="Admin"
                            className="rounded-circle"
                            width="150"
                          />
                          <div className="mt-3">
                            <h4>{profile.Fullname}</h4>
                          <Link to="/edit-profile" className="btn btn-outline-primary" onClick={() => setData(profile)}>Cập nhật thông tin cá nhân</Link>
                          </div>
                        </div>

                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                            Họ và tên
                          </label>
                          <div className="col-sm-12 col-md-7">
                         <p>{profile.Fullname}</p> 
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                            Email
                          </label>
                          <div className="col-sm-12 col-md-7">
                          <p>{profile.Email}</p> 
                          </div>
                        </div>

                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                            Ngày sinh
                          </label>
                          <div className="col-sm-12 col-md-7">
                          <p>{moment(new Date(profile.Birthday)).format("DD-MM-YYYY")}</p> 
                          </div>
                        </div>

                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                            Số điện thoại
                          </label>
                          <div className="col-sm-12 col-md-7">
                          <p>{profile.Phone}</p> 
                          </div>
                        </div>

                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                            Giới tính
                          </label>
                          <div className="col-sm-12 col-md-7">
                          {profile.Gender=="Male"?<p>Nam</p>:<p>Nữ</p>}
                          </div>
                        </div>
                        <div className="row mb-4 d-flex justify-content-center">
                          <div className="col-sm-12 col-md-4">
                            <div className=" form-group row">
                              <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                                Vị trí
                              </label>
                              <div className="col-sm-12 col-md-9">
                                <p>{profile.Position}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-4">
                            <div className=" form-group row">
                              <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                                Phòng ban
                              </label>
                              <div className="col-sm-12 col-md-9">
                              <p>{profile.Department}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-4 d-flex justify-content-center">
                          <div className="col-sm-12 col-md-4">
                            <div className=" form-group row">
                              <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                                Công ty
                              </label>
                              <div className="col-sm-12 col-md-9">
                              <p>{profile.Company}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-4">
                            <div className=" form-group row">
                              <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                                Địa chỉ
                              </label>
                              <div className="col-sm-12 col-md-9">
                              <p>{profile.Address}</p>
                              </div>
                            </div>
                          </div>
                        </div>                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
