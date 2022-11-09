import React, { useState, useEffect } from 'react';
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import Sidebar from '../Layouts/Sidebar'
import { Link } from "react-router-dom";
import Delete from '../ProjectCategories/Delete';
import axios from 'axios';

export default function Index() {
  const [typeProject, setTypeProject] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/type/istype?type=Projects`)
      .then((response) => {
        setTypeProject(response.data);
      })
  })
  const setData = (data) => {
    console.log(data);
    let { _id, Name, Description, isType } = data;
    localStorage.setItem('ID', _id);
    localStorage.setItem('Name', Name);
    localStorage.setItem('Description', Description);
    localStorage.setItem('isType', isType);
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
                <h1>Loại dự án</h1>
                <div className="section-header-button">
                  <Link to="/project-categories/create" className="btn btn-primary">Thêm</Link>
                </div>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active"><Link to="#">Dashboard</Link></div>
                  <div className="breadcrumb-item"><Link to="#">Loại dự án</Link></div>
                  <div className="breadcrumb-item">Danh sách loại dự án</div>
                </div>
              </div>
              <div className="section-body">
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h4>Danh sách loại dự án</h4>
                      </div>
                      <div className="card-body">
                        <div className="float-right">
                          <form>
                            <div className="input-group">
                              <input type="text" className="form-control" placeholder="Tìm kiếm" onChange={e => { setSearch(e.target.value) }}/>
                              <div className="input-group-append">
                                <button className="btn btn-primary"><i className="fas fa-search"></i></button>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="clearfix mb-3"></div>
                        <div className="">
                          <table className="table table-striped">
                            <tr className="row">
                              <th className="col-md-4">Tên</th>
                              <th className="col-md-4">Mô tả</th>
                              <th className="col-md-4">Loại</th>
                            </tr>
                            {typeProject.filter((val) => {
                              if (search == "") {
                                return val
                              } else if (val.Name.toLowerCase().includes(search.toLowerCase())
                                || val.Description.toLowerCase().includes(search.toLowerCase())
                                || val.isType.toLowerCase().includes(search.toLowerCase())) {
                                return val
                              }
                            }).map((data) => (
                              <tr className="row">
                                <td className="col-md-4">{data.Name}
                                  <div className="table-links">
                                    <div className="bullet"></div>
                                    <Link to="/project-categories/update" onClick={() => setData(data)}>Cập nhật</Link>
                                    <div className="bullet"></div>
                                    <Link to="#" className="text-danger" onClick={() => setData(data)} data-toggle="modal" data-target="#Delete">Xóa</Link>
                                  </div>
                                </td>
                                <td className="col-md-4">
                                  <span>{data.Description}</span>
                                </td>
                                <td className="col-md-4">
                                  <span>{data.isType}</span>
                                </td>
                              </tr>
                            ))}
                          </table>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
          <Delete />
        </div>
      </div>
    </div>
  )
}
