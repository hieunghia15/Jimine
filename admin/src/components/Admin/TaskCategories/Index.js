import React, { useState, useEffect } from 'react';
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import Sidebar from '../Layouts/Sidebar'
import { Link } from "react-router-dom";
import Delete from '../TaskCategories/Delete';
import axios from 'axios';

export default function Index() {
  const [typeTask, setTypeTask] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const fetchTaskType = async () => {
      try {
        await axios.get(`http://localhost:5000/api/type/istype?type=Tasks`)
          .then((response) => {
            setTypeTask(response.data);
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
    fetchTaskType();
  })
  const setData = (data) => {
    console.log("Data" + data);
    let { _id, Name, Description, isType, Color } = data;
    localStorage.setItem('ID', _id);
    localStorage.setItem('Name', Name);
    localStorage.setItem('Description', Description);
    localStorage.setItem('isType', isType);
    localStorage.setItem('Color', Color);

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
                <h1>Loại công việc</h1>
                <div className="section-header-button">
                  <Link to="/task-categories/create" className="btn btn-primary">Thêm</Link>
                </div>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active"><Link to="#">Dashboard</Link></div>
                  <div className="breadcrumb-item"><Link to="#">Loại công việc</Link></div>
                  <div className="breadcrumb-item">Danh sách loại công việc</div>
                </div>
              </div>
              <div className="section-body">
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h4>Danh sách loại công việc</h4>
                      </div>
                      <div className="card-body">
                        <div className="float-right">
                          <form>
                            <div className="input-group">
                              <input type="text" className="form-control" placeholder="Tìm kiếm" onChange={e => { setSearch(e.target.value) }} />
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
                              <th className="col-md-3">Tên</th>
                              <th className="col-md-3">Mô tả</th>
                              <th className="col-md-3">Loại</th>
                              <th className="col-md-3">Màu sắc</th>
                            </tr>
                            {typeTask.filter((val) => {
                              if (search == "") {
                                return val
                              } else if (val.Name.toLowerCase().includes(search.toLowerCase())
                                || val.Description.toLowerCase().includes(search.toLowerCase())
                                || val.isType.toLowerCase().includes(search.toLowerCase())) {
                                return val
                              }
                            }).map((data) => (
                              <tr className="row">
                                <td className="col-md-3">{data.Name}
                                  <div className="table-links">
                                    <div className="bullet"></div>
                                    <Link to="/task-categories/update" onClick={() => setData(data)} >Cập nhật</Link>
                                    <div className="bullet"></div>
                                    <Link to="#" className="text-danger" onClick={() => setData(data)} data-toggle="modal" data-target="#DeleteTask">Xóa</Link>
                                  </div>
                                </td>
                                <td className="col-md-3">
                                  <span>{data.Description}</span>
                                </td>
                                <td className="col-md-3">
                                  <span>{data.isType}</span>
                                </td>
                                <td className="col-md-3">
                                  <span>{data.Color}</span>
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