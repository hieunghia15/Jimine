import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AddProjectModal() {
  // localStorage.setItem('UserID', '62c3e95b292c8f213d7e7453');
  const id = localStorage.getItem('UserID');

  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Category, setCategory] = useState('');
  const [User_ID, setUserId] = useState(id);
  const [Key, setKey] = useState('');


  // console.log(Name);
  // console.log(Description);
  // console.log(Category);
  let navigate = useNavigate();

  const createProjectAPI = (e) => {
    e.preventDefault();
    console.log(Name, Key, Category, Description, User_ID);
    axios.post(`http://localhost:5000/api/project/create`,
      { Name, Key, Category, Description, User_ID })
      .then(() => {
        document.getElementById("Close-data").click();
        window.location.reload();
      })
  }
  const [typeProject, setTypeProject] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/type/istype?type=Projects`)
      .then((response) => {
        setTypeProject(response.data);
      })
  }, [])
  return (
    <div
      className="modal fade"
      id="AddProjectModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <form>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Thêm dự án
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="Close-data"
              ></button>
            </div>
            <div className="modal-body">
              <input className="form-control" type="hidden" name="User_ID" value={User_ID} />
              <label className="small mb-1">
                Tên dự án: <span className="text-danger">(*)</span>
              </label>
              <input className="form-control" type="text" name="Name" onChange={(e) => setName(e.target.value)} />
              <label className="small mb-1">
                Loại dự án: <span className="text-danger">(*)</span>
              </label>
              <select className="form-select" aria-label="Default select example" name="Category" onChange={(e) => setCategory(e.target.value)}>
                <option selected>Chọn loại dự án</option>
                {typeProject.map((data) => (
                  <option value={data._id}>{data.Name}</option>
                ))}
              </select>
              <label className="small mb-1">
                Mô tả:
              </label>
              <input className="form-control" type="text" name="Description" onChange={(e) => setDescription(e.target.value)} />
              <label className="small mb-1">
                Key:
              </label>
              <input className="form-control" type="text" name="Key" onChange={(e) => setKey(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button type="submit" className="btn btn-primary" onClick={e => createProjectAPI(e)}>
                Tạo dự án
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
