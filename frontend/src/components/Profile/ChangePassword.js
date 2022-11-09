import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

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
      <Navbar />
      <div className="container-xl px-4 mt-4 mb-4">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <div className="card card-outline-secondary">
              <div className="card-header">
                <h3 className="mb-0">THAY ĐỔI MẬT KHẨU</h3>
              </div>
              <div className="card-body">
                <form className="form">
                  <div className="form-group">
                    <label for="inputPasswordOld">
                      Mật khẩu hiện tại <span className="text-danger">(*)</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="Old"
                      required
                      onChange={(e)=>setOld(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label for="inputPasswordNew">
                      Mật khẩu mới <span class="text-danger">(*)</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPasswordNew"
                      required
                      name="New"
                      onChange={(e)=>setNew(e.target.value)}                                 
                    />
                  </div>
                  <span className="text-danger"></span>
                  <div className="form-group">
                    <label for="inputPasswordNewVerify">
                      Xác nhận mật khẩu mới <span class="text-danger">(*)</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPasswordNewVerify"
                      required
                      name="Reconfirm"
                      onChange={(e)=>setReconfirm(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary" onClick={e=>changePassword(e)}>
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-sm-"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
