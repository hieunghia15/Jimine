import React, { useContext, useState, useEffect } from 'react';
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import Sidebar from '../Layouts/Sidebar'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Update() {
  const [Name,setName]=useState('');
  const [Description,setDescription]=useState('');
  const [id, setID]=useState(null);
  const [isType, setIsType]=useState('Projects');
  let navigate = useNavigate();
  console.log(Name);
  console.log(Description);

  useEffect(() => {
      setName(localStorage.getItem('Name'));
      setDescription(localStorage.getItem('Description'));
      setID(localStorage.getItem('ID'));
      setIsType(localStorage.getItem('isType'));

  },[])

  const updateProjectTypeAPI= ()=>{
      axios.put(` http://localhost:5000/api/type/update/${id}`,
      {Name, Description, isType})
        navigate("/project-categories/index")
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
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active"><Link to="#">Dashboard</Link></div>
                  <div className="breadcrumb-item"><Link to="#">Loại dự án</Link></div>
                  <div className="breadcrumb-item">Cập nhật loại dự án</div>
                </div>
              </div>
              <div className="section-body">
                <h2 className="section-title">Cập nhật loại dự án</h2>
                <p className="section-lead">Thêm tên và mô tả vào bên dưới
                </p>
                <form method="PUT">
                <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="form-group row mb-4">
                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tên</label>
                            <div className="col-sm-12 col-md-7">
                              <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} name="Name" className="form-control" required />
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Mô tả</label>
                            <div className="col-sm-12 col-md-7">
                              <input type="text" value={Description} onChange={(e)=>setDescription(e.target.value)} name="Description" className="form-control" />
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Loại</label>
                            <div className="col-sm-12 col-md-7">
                            <input type="text" value={isType} name="isType" className="form-control" style={{cursor:"not-allowed"}} />
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                            <div className="col-sm-12 col-md-7">
                              <button className="btn btn-primary" type="submit" onClick={updateProjectTypeAPI}>Cập nhật</button>
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
