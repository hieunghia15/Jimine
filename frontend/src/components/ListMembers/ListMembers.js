import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';
import AddMemberModal from '../Modals/AddMember/AddMemberModal';
import "./ListMembers.css";
import axios from 'axios';
import moment from "moment";

export default function ListMembers() {
    // localStorage.setItem('UserID', '62c3e95b292c8f213d7e7453');
    const id = localStorage.getItem('UserID');
    const [listMember, setListMember] = useState([]);
    
    const fetchListMember = async () => {
        try {
        await axios.get(`http://localhost:5000/api/user/get-partners/id/${id}`)
            .then((response) => {
            setListMember(response.data.partner);
            console.log(response.data);
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
    useEffect(() => {
        fetchListMember();
    }, []);

    // Xoa member
    const deletePartner = async (id_part) => {
        try {
            await axios.delete(`http://localhost:5000/api/user/delete/user/${id}/partner/${id_part}`)
            alert("Xoa thanh cong!");
            window.location.reload(false);
            
        } catch (err) {
            if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    };
    
    // Tim kiem member
    const searchPartner = async () => {
        let key = document.getElementById("search-partner");
        // console.log(key.value + "1");
        try {
            if(key.value !== "") {
                const results = await axios.get(`http://localhost:5000/api/user/search/user/${id}/key/${key.value}`)
                // console.log(results.data.newPartner + "2");
                setListMember(results.data.newPartner);
            }
            else {
                const results = await axios.get(`http://localhost:5000/api/user/get-partners/id/${id}`)
                // console.log(results.data + "3");
                setListMember(results.data.partner);
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    };

    // Cap nhat khi them member
    const updateData = (data)=>{
        setListMember(data)
    }
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <main>
                <div>
                    <div className="lm-divTitle">
                        <h1 className="lm-title">People</h1>
                    </div>
                    <div className="row lm-divMembers">
                        <div className="lm-titleMembers">
                            <h4 className="lm-titleMembers_h4">Danh sách thành viên có liên kết</h4>
                        </div>
                        <div className="searchbox-add">
                            <div className="container-search">
                                <div className="row height d-flex justify-content-center align-items-center">
                                    <div className="col-md-8">
                                        <div className="search">
                                            <i className="fa fa-search"></i>
                                            <input type="text" className="form-control" id="search-partner" placeholder="Nhập Username tìm kiếm..." />
                                            <button className="btn btn-primary" onClick={() => {searchPartner();}}>Search</button>
                                        </div>
                                    </div>
                                    <div className='col-md-2'>
                                        <div>
                                            <button class="btn btn-success lm-button-search" data-bs-toggle="modal"
                                            data-bs-target="#addmemberModal">Thêm thành viên</button>
                                        </div>
                                    </div>
                                </div>
                            </div>                          
                        </div>
                        <div className="lm-flex-container">
                        {listMember.map((data) => (    
                            <div className="lm-divCard">
                                <div>
                                    <Link to="#" onClick={() => {
                                        if(window.confirm("Bạn muốn xóa " + data.Fullname + "?")) {deletePartner(data._id);} }} class="delete_partner" />
                                    <img className="lm-avatar" src={data?.Avatar ? `http://localhost:5000/asset/avatar/${data.Avatar}`:process.env.PUBLIC_URL + "/img/ListMembers/messi.jfif"} />
                                    <div className="lm-nameCard">{data.Fullname}</div>
                                    <div className="lm-noteCard">{ "@" + data.Email.substring(0, data.Email.indexOf('@'))}</div>
                                </div>
                            </div>
                        ))}    
                        </div>
                    </div>
                </div>
            </main>
        <AddMemberModal id={id} isUser={true} updateData/>
            <Footer />
        </>
    )
}