import { React, useState, useEffect ,useContext} from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import {GlobalState} from "../../GlobalState";

export default function EditProfile() {
    const state = useContext(GlobalState);
    const [dataUser] = state.UserAPI.user;
    const [callback,setCallback] = state.UserAPI.callback;
    const [Fullname, setFullname] = useState('');
    const [Birthday, setBirthday] = useState('');
    const [id, setID] = useState(null);
    const [Gender, setGender] = useState('');
    const [Address, setAddress] = useState('');
    const [Phone, setPhone] = useState('');
    const [Position, setPosition] = useState();
    const [Company, setCompany] = useState('');
    const [Department, setDepartment] = useState('');
    const [Avatar, setAvatar] = useState();
    const [chooseFile,setChooseFile] = useState();
    let navigate = useNavigate();
    useEffect(() => {
        setFullname(localStorage.getItem('Fullname'));
        setBirthday(localStorage.getItem('Birthday'));
        setID(localStorage.getItem('ID'));
        setGender(localStorage.getItem('Gender'));
        setAddress(localStorage.getItem('Address'));
        setPhone(localStorage.getItem('Phone'));
        setPosition(localStorage.getItem('Position'));
        setCompany(localStorage.getItem('Company'));
        setDepartment(localStorage.getItem('Department'));
    }, [])
    const updateInfo = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/user/update/${id}`,
            { Fullname, Birthday, Gender, Address, Phone, Position, Company, Department })

        const files = document.getElementById("avatar").files;
        console.log("File list:",files)
        if(files.length === 1)
        {
            let formData = new FormData();
            formData.append("avatar", files[0]);
            formData.append("user_id", id);
            console.log("Form Data:", formData);
            await axios.post(
                "http://localhost:5000/api/user/upload/avatar",
                formData,
                {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                    params: {
                        email: dataUser.Email,
                    },
                }
            );
        }
        setCallback(!callback)
        navigate("/profile",{ state: { reload:true} })
    }

    // Xữ lý chọn avatar
    const handleSelectFile = (e)=>{
        const files = e.target.files;
        let url = URL.createObjectURL(files[0])
        setAvatar(url)
    }
    return (
        <div>
            <Navbar />
            <div className="container-xl px-4 mt-4">
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <div className="card mb-4">
                            <div className="card-header">THAY ĐỔI THÔNG TIN CÁ NHÂN</div>
                            <div className="card-body">
                                <form>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1">Họ tên <span
                                                class="text-danger">(*)</span></label>
                                            <input className="form-control" type="text"
                                            onChange={(e)=>setFullname(e.target.value)}
                                                placeholder="" name="Fullname" value={Fullname} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1">Ngày sinh <span
                                                class="text-danger">(*)</span></label>
                                            <input className="form-control" type="date" name="Birthday" value={moment(new Date(Birthday)).format("YYYY-MM-DD")} onChange={(e)=>setBirthday(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1">Số điện thoại <span
                                                class="text-danger">(*)</span></label>
                                            <input className="form-control" type="text" name="Phone" value={Phone}  onChange={(e)=>setPhone(e.target.value)} required />

                                        </div>

                                        <div className="col-md-6">
                                            <label className="small mb-1">Giới tính <span
                                                class="text-danger">(*)</span></label>
                                            <select id="gender" name="Gender" onChange={(e)=>setGender(e.target.value)} class="form-control" value={Gender?Gender:""}>
                                                {/* {Gender=="Male"? <option value="Male" selected>Nam</option>:<option value="Female" selected>Nữ</option>}  */}
                                                <option value="Male">Nam</option>
                                                <option value="Female">Nữ</option>                                                                                                                        
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1">Vị trí</label>
                                            <input className="form-control" name="Position" value={Position?Position:""} onChange={(e)=>setPosition(e.target.value)} type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" >Phòng ban</label>
                                            <input className="form-control" name="Department" value={Department?Department:""}  onChange={(e)=>setDepartment(e.target.value)} type="text"/>
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1">Công ty</label>
                                            <input className="form-control" name="Company" value={Company?Company:""}  onChange={(e)=>setCompany(e.target.value)} type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" >Địa chỉ</label>
                                            <input className="form-control" name="Address" value={Address}  onChange={(e)=>setAddress(e.target.value)} type="text" required />
                                        </div>
                                    </div >   
                                    <div  className="row gx-3 mb-3">
                                        <label className="small mb-1">Ảnh đại diện:</label>
                                        <input id="avatar" className="form-control" type="file" onChange={(e)=>{handleSelectFile(e)}}/>
                                        <div className="d-flex flex-wrap justify-content-start">
                                            { Avatar ? 
                                                (<div className="card-image">
                                                    <div className="w-100 h-100">
                                                        <img
                                                        onClick={(e) => {setChooseFile(e.target.src)}}
                                                        className="w-100 h-100"
                                                        src={Avatar}
                                                        data-bs-dismiss="modal"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-profile_view_image"
                                                        />
                                                    </div>
                                                </div>):
                                                dataUser && dataUser.Avatar? (<div className="card-image">
                                                <div className="w-100 h-100">
                                                    <img
                                                    onClick={(e) => {setChooseFile(e.target.src)}}
                                                    className="w-100 h-100"
                                                    src={`http://localhost:5000/asset/avatar/${dataUser.Avatar}`}
                                                    data-bs-dismiss="modal"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#edit-profile_view_image"
                                                    />
                                                </div>
                                            </div>) :"Không có ảnh đại diện"
                                            }                  
                                        </div>
                                    </div>                             
                                    <button className="btn btn-primary" type="submit" onClick={(e)=>{updateInfo(e)}}>
                                        Lưu thay đổi
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2"></div>
                </div>
            </div>
            {/* Modal show full image */}
            <div
                class="modal fade"
                id="edit-profile_view_image"
                tabindex="-1"
                aria-labelledby="edit-profile_view_imageLabel"
                aria-hidden="true"
            >
                <div
                className="modal-dialog modal-fullscreen"
                >
                <div className="modal-content ">
                    <div className="modal-header border-0">
                    <button
                        style={{ position: "absolute", right: "10px", padding: "5px" }}
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        // data-bs-toggle="modal"
                    ></button>
                    </div>
                    <div className="modal-body p-0 d-flex justify-content-center">
                    <img style={{ width: "auto", height: "100%" }} src={chooseFile} />
                    </div>
                </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
