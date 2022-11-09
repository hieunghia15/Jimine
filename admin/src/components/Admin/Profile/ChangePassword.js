import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";

export default function ChangePassword() {
  const [Old, setOld] = useState('');
  const [New, setNew] = useState('');
  const [Reconfirm, setReconfirm] = useState('');
  // localStorage.setItem('UserID', '62c3e94f292c8f213d7e7450');
  const id = localStorage.getItem('UserID');
  let navigate = useNavigate();
  const changePassword = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/user/change-password/${id}`,
      { Old, New, Reconfirm }) 
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
                    <Link to="/change-password">Đổi mật khẩu</Link>
                  </div>
                </div>
              </div>
              <div className="section-body">
                <h2 className="section-title">Cập nhật nhật khẩu</h2>
                <p className="section-lead">Nhập mật khẩu mới bên dưới</p>
                <form>
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                            Mật khẩu hiện tại
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="password"
                              className="form-control"
                              required
                              name="Old"
                              onChange={(e)=>setOld(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                            Mật khẩu mới:
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <input type="password" className="form-control" name="New"  onChange={(e)=>setNew(e.target.value)}   />
                          </div>
                        </div>

                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                            Nhập lại mật khẩu mới
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <input type="password" className="form-control" name="Reconfirm" onChange={(e)=>setReconfirm(e.target.value)}/>
                          </div>
                        </div>

                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                          <div className="col-sm-12 col-md-7">
                            <button className="btn btn-primary" type="submit" onClick={e=>changePassword(e)}>
                              Cập nhật
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </form>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
