import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

export default function UpdateProject() {
    const [typeProject, setTypeProject] = useState([]);
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [id, setID] = useState(null);
    const [Category, setCategory] = useState(null);
    const [Key, setKey] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/type/istype?type=Projects`)
            .then((response) => {
                setTypeProject(response.data);
                console.log(typeProject)
            })
        
        setName(localStorage.getItem('NameProject'));
        setDescription(localStorage.getItem('Description'));
        setID(localStorage.getItem('IdProject'));
        setCategory(localStorage.getItem('Category'));
        setKey(localStorage.getItem('Key'));
        console.log(Name);
    }, [])
    const updateProject = () => {
        axios.put(`http://localhost:5000/api/project/update/id/${id}`,
            { Name, Description, Category, Key })
        navigate("/list-project")
    }
    return (
        <div>
            <Navbar />

            <form>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tên dự án</label>
                                    <div className="col-sm-12 col-md-7">
                                        <input type="text" value={Name} onChange={(e) => setName(e.target.value)} name="Name" className="form-control" required />
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Mô tả</label>
                                    <div className="col-sm-12 col-md-7">
                                        <input type="text" value={Description} onChange={(e) => setDescription(e.target.value)} name="Description" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Loại dự án</label>
                                    <div className="col-sm-12 col-md-7">
                                        <select className="form-control" onChange={(e) => setCategory(e.target.value)} name="Category">
                                            {typeProject.map((data) => {
                                                if (data._id === Category) {
                                                    return <option value={data._id} selected>{data.Name}</option>
                                                } else {
                                                    return <option value={data._id}>{data.Name}</option>
                                                }
                                            }
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Key</label>
                                    <div className="col-sm-12 col-md-7">
                                        <input type="text" value={Key} name="Key" className="form-control" onChange={(e) => setKey(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                                    <div className="col-sm-12 col-md-7">
                                        <button className="btn btn-primary" type="submit" onClick={updateProject}>Cập nhật</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </form>
            <Footer />

        </div>
    );
}
