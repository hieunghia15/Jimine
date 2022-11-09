import React, { useState, useEffect } from 'react';
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import Sidebar from '../Layouts/Sidebar'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Create() {
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [Stt, setStt] = useState('');
    console.log(Name);
    console.log(Description);
    console.log(Stt);
    let navigate = useNavigate();

    const createStatusAPI = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/status/create`,
            { Name, Description, Stt })
            .then(() => {
                navigate("/status-categories/index")
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
                                <h1>Tạo trạng thái công việc</h1>
                                <div className="section-header-breadcrumb">
                                    <div className="breadcrumb-item active"><Link to="#">Dashboard</Link></div>
                                    <div className="breadcrumb-item"><Link to="/status-categories/index">Trạng thái công việc</Link></div>
                                    <div className="breadcrumb-item">Tạo trạng thái công việc</div>
                                </div>
                            </div>
                            <div className="section-body">
                                <h2 className="section-title">Tạo trạng thái công việc</h2>
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
                                                            <input name="Name"
                                                                onChange={(e) => setName(e.target.value)}
                                                                type="text"
                                                                className="form-control"
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Mô tả</label>
                                                        <div className="col-sm-12 col-md-7">
                                                            <input name="Description"
                                                                onChange={(e) => setDescription(e.target.value)}
                                                                type="text"
                                                                className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Vị trí</label>
                                                        <div className="col-sm-12 col-md-7">
                                                            <input name="Stt"
                                                                onChange={(e) => setStt(e.target.value)}
                                                                type="number"
                                                                className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                                                        <div className="col-sm-12 col-md-7">
                                                            <button className="btn btn-primary"
                                                                type="submit"
                                                                onClick={e => createStatusAPI(e)}
                                                            >Tạo</button>
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
