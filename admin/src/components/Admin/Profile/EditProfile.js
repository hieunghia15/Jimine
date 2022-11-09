import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";

export default function Profile() {
  const [Fullname, setFullname] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [id, setID] = useState(null);
  const [Gender, setGender] = useState('');
  const [Address, setAddress] = useState('');
  const [Phone, setPhone] = useState('');
  const [Position, setPosition] = useState('');
  const [Company, setCompany] = useState('');
  const [Department, setDepartment] = useState('');
  let navigate = useNavigate();
  useEffect(() => {
    setFullname(localStorage.getItem('Fullname'));
    setBirthday(localStorage.getItem('Birthday'));
    setID(localStorage.getItem('ID'));
    setGender(localStorage.getItem('Gender'));
    setAddress(localStorage.getItem('Address'));
    setPhone(localStorage.getItem('Phone'));
    setPosition(localStorage.getItem('Position'));
    setCompany(localStorage.getItem('Company'));
    setDepartment(localStorage.getItem('Department'));
  }, [])

  const updateInfo = () => {
    axios.put(`http://localhost:5000/api/user/update/${id}`,
      { Fullname, Birthday, Gender, Address, Phone, Position, Company, Department })
    navigate("/profile")
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
                    <Link to="#">Cập nhật thông tin cá nhân</Link>
                  </div>
                </div>
              </div>
              <div className="section-body">
                <h2 className="section-title">Cập nhật thông tin cá nhân</h2>
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
                            <h4>{Fullname}</h4>
                            <button
                              className="btn btn-outline-primary"
                              style={{ width: "100%" }}
                            >
                              <input type="file" />
                              Thay đổi hình ảnh
                            </button>
                          </div>
                        </div>

                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                            Họ và tên <span class="text-danger">(*)</span>
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className="form-control"
                              required
                              value={Fullname}
                              onChange={(e) => setFullname(e.target.value)}
                            />
                          </div>
                        </div>


                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                            Ngày sinh <span class="text-danger">(*)</span>
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <input type="date" className="form-control" value={Birthday} onChange={(e) => setBirthday(e.target.value)} />
                          </div>
                        </div>

                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                            Số điện thoại <span class="text-danger">(*)</span>
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className="form-control"
                              value={Phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                            Giới tính <span class="text-danger">(*)</span>
                          </label>
                          <div className="col-sm-3">
                            <select id="gender" name="Gender" onChange={(e) => setGender(e.target.value)} class="form-control">
                              {Gender == "Male" ? <option value="Male" selected>Nam</option> : <option value="Female" selected>Nữ</option>}
                              <option value="Male">Nam</option>
                              <option value="Female">Nữ</option>
                            </select>
                          </div>
                        </div>

                        <div className="row mb-4 d-flex justify-content-center">
                          <div className="col-sm-12 col-md-4">
                            <div className=" form-group row">
                              <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                                Vị trí
                              </label>
                              <div className="col-sm-12 col-md-9">
                                <input className="form-control" type="text" value={Position} onChange={(e) => setPosition(e.target.value)} />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-4">
                            <div className=" form-group row">
                              <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                                Phòng ban
                              </label>
                              <div className="col-sm-12 col-md-9">
                                <input className="form-control" type="text" value={Department} onChange={(e) => setDepartment(e.target.value)} />
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
                                <input className="form-control" type="text" value={Company} onChange={(e) => setCompany(e.target.value)} />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-4">
                            <div className=" form-group row">
                              <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                                Địa chỉ
                              </label>
                              <div className="col-sm-12 col-md-9">
                                <textarea
                                  className="form-control"
                                  type="text"
                                  value={Address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group row mb-4">
                          <div className="col-sm-12 col-md-12 d-flex justify-content-center">
                            <button className="btn btn-primary" type="submit" onClick={updateInfo}>
                              Cập nhật
                            </button>
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
