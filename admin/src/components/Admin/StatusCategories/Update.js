import React, { useContext, useState, useEffect } from 'react';
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import Sidebar from '../Layouts/Sidebar'
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Update() {
    const [Name,setName]=useState('');
    const [Description,setDescription]=useState('');
    const [id, setID]=useState(null);
    const [Stt, setStt]=useState('');
    let navigate = useNavigate();

    console.log(Name);
    console.log(Description);

    useEffect(() => {
        setName(localStorage.getItem('Name'));
        setDescription(localStorage.getItem('Description'));
        setID(localStorage.getItem('ID'));
        setStt(localStorage.getItem('Stt'));

    },[])

    const updateStatusAPI= ()=>{
        axios.put(`http://localhost:5000/api/status/update/${id}`,
        {Name, Description, Stt})
        navigate("/status-categories/index")
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
                                    <div className="breadcrumb-item"><Link to="/status-categories/index">Trạng thái công việc</Link></div>
                                    <div className="breadcrumb-item">Cập nhật trạng thái công việc</div>
                                </div>
                            </div>
                            <div className="section-body">
                                <h2 className="section-title">Cập nhật trạng thái công việc</h2>
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
                                                            onChange={(e)=>setName(e.target.value)}
                                                            value={Name}
                                                            type="text"
                                                            className="form-control"
                                                            required />
                                                        </div>
                                                    </div>                                                 
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Mô tả</label>
                                                        <div className="col-sm-12 col-md-7">
                                                            <input name="Description"
                                                            onChange={(e)=>setDescription(e.target.value)}
                                                            value={Description}
                                                            type="text"
                                                            className="form-control"/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Vị trí</label>
                                                        <div className="col-sm-12 col-md-7">
                                                            <input name="Stt"
                                                            onChange={(e)=>setStt(e.target.value)}
                                                            value={Stt}
                                                            type="number"
                                                            className="form-control"/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                                                        <div className="col-sm-12 col-md-7">
                                                            <button className="btn btn-primary"
                                                            type="submit"
                                                            onClick={updateStatusAPI}
                                                            >Cập nhật</button>
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
