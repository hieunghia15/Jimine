import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import Sidebar from '../Layouts/Sidebar'
import axios from 'axios';

export default function Create() {
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Color, setColor] = useState('');
  const [isType, setIsType] = useState('Tasks');

  console.log(Name);
  console.log(Description);
  console.log(isType);
  let navigate = useNavigate();

  const createTaskTypeAPI = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/type/create`,
      { Name, Description, isType })
      .then(() => {
        navigate("/task-categories/index")
      })
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
                <h1>Tạo loại công việc</h1>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active"><Link to="#">Dashboard</Link></div>
                  <div className="breadcrumb-item"><Link to="#">Loại công việc</Link></div>
                  <div className="breadcrumb-item">Tạo loại công việc</div>
                </div>
              </div>
              <div className="section-body">
                <h2 className="section-title">Tạo loại công việc</h2>
                <p className="section-lead">Thêm tên và mô tả vào bên dưới
                </p>
                <form>
                  <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="form-group row mb-4">
                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tên</label>
                            <div className="col-sm-12 col-md-7">
                              <input type="text" onChange={(e) => setName(e.target.value)} name="Name" className="form-control" required />
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Mô tả</label>
                            <div className="col-sm-12 col-md-7">
                              <input type="text" onChange={(e) => setDescription(e.target.value)} name="Description" className="form-control" />
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Màu sắc</label>
                            <div className="col-sm-12 col-md-7">                          
                              <select className="form-control" onChange={(e) => setColor(e.target.value)} name="Color">
                              <option value="" selected>- Chọn màu sắc -</option>
                                <option value="primary" className="bg-primary">Primary</option>
                                <option value="secondary" className="bg-secondary">Secondary</option>
                                <option value="success" className="bg-success">Success</option>
                                <option value="danger" className="bg-danger">Danger</option>
                                <option value="warning" className="bg-warning">Warning</option>
                                <option value="info" className="bg-info">Info</option>
                                <option value="light" className="bg-light">Light</option>
                                <option value="dark" className="bg-dark">Dark</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Loại</label>
                            <div className="col-sm-12 col-md-7">
                              <input type="text" value={isType} style={{cursor:"not-allowed"}} name="isType" className="form-control" />
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                            <div className="col-sm-12 col-md-7">
                              <button className="btn btn-primary" type="submit" onClick={e => createTaskTypeAPI(e)}>Tạo</button>
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
  )
}
