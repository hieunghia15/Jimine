import React, { useState, useEffect ,useContext} from 'react';
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { Link} from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import {GlobalState} from "../../GlobalState";

export default function Profile() {
    const state = useContext(GlobalState);
    const [user] = state.UserAPI.user;
    const avatar = user && user.Avatar ? `http://localhost:5000/asset/avatar/${user.Avatar}`:process.env.PUBLIC_URL + "/img/DefaultAvatarProfile.jpg"
    // localStorage.setItem('UserID', '62c3e94f292c8f213d7e7450');
    const id = localStorage.getItem('UserID');
    const [accountUser, setAccount] = useState([]);

    const fetchAccount = async () => {
        try {
          await axios.get(`http://localhost:5000/api/user/id/${id}`)
            .then((response) => {
                setAccount(response.data[0]);
            //   console.log(response.data[0]);
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
    const setData = (data) => {
    // console.log(data);
    let { _id, Fullname, Address, Birthday, Company, Department, Gender, Phone, Position } = data;
    if(_id)localStorage.setItem('ID', _id);
    if(Fullname)localStorage.setItem('Fullname', Fullname);
    if(Address)localStorage.setItem('Address', Address);
    if(Birthday)localStorage.setItem('Birthday', Birthday);
    if(Company)localStorage.setItem('Company', Company);
    if(Department)localStorage.setItem('Department', Department);
    if(Gender)localStorage.setItem('Gender', Gender);
    if(Phone)localStorage.setItem('Phone', Phone);
    if(Position)localStorage.setItem('Position', Position);    
    }
    useEffect(() => {
    fetchAccount();
    },[])

    return (
        <div>
            <Navbar />
           
            <div className="container mt-4">
                <div className="main-body">
             
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={avatar} alt="Admin" style={{ width: "40%" }}
                                            className="rounded-circle" width="150" />
                                        <div className="mt-3">
                                            <h4>{accountUser.Fullname}</h4>
                                            <button className="btn btn-outline-primary" style={{ width: "100%" }}><Link to="/edit-profile" state={accountUser}  onClick={() => setData(accountUser)}>Thay đổi thông tin</Link></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>
                        <div className="col-md-8">
                            <h5>GIỚI THIỆU</h5>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">
                                                <i className="fa fa-briefcase"></i>
                                            </h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{accountUser.Position ? accountUser.Position :"Chưa cập nhật"}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">
                                                <i className="fa fa-user"></i>
                                            </h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{accountUser.Department ? accountUser.Department : "Chưa cập nhật"}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">
                                                <i className="fa fa-building"></i>
                                            </h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{accountUser.Company?accountUser.Company:"Chưa cập nhật"}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">
                                                <i className="fa fa-map-marker"></i>
                                            </h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{accountUser.Address?accountUser.Address:"Chưa cập nhật"}</div>
                                    </div>
                                </div>
                            </div>
                            <h5>THÔNG TIN CÁ NHÂN</h5>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">
                                                <i className="fa fa-calendar"></i>
                                            </h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                        {accountUser.Birthday?moment(new Date(accountUser.Birthday)).format("DD-MM-YYYY"):"Chưa cập nhật"}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">
                                                <i className="fa fa-user"></i>
                                            </h6>
                                        </div>
                                        {accountUser.Gender ? accountUser.Gender === "Male" ? <div className="col-sm-9 text-secondary">Nam</div>:<div className="col-sm-9 text-secondary">Nữ</div> :"Chưa cập nhật"}                                      
                                    </div>
                                </div>
                            </div>
                            <h5>LIÊN HỆ</h5>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">
                                                <i className="fa fa-envelope"></i>
                                            </h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{accountUser.Email?accountUser.Email:"Chưa cập nhật"}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">
                                                <i className="fa fa-phone"></i>
                                            </h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{accountUser.Phone?accountUser.Phone:"Chưa cập nhật"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
             
            <Footer />
        </div>
    );
}
