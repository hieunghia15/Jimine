import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import "./AddMemberModal.css";
export default function AddMemberModal(props) {
  const id = props.id
    ? props.id
    : localStorage.getItem("IdProject")
    ? localStorage.getItem("IdProject")
    : "";
  // const id = "62c4f8de1e3bd341271f240e";
  console.log("ID cap nhat member:", id);
  const [email, setEmail] = useState();
  const [member, setMember] = useState([]);
  const [hintSearch, setHintSearch] = useState([]);
  const state = useContext(GlobalState);
  const [dataUser] = state.UserAPI.user;
  const Partners = dataUser?.Partners;
  const handleOnChange = async (e) => {
    try {
      const findUser = await axios.get(
        `http://localhost:5000/api/user/getByEmail`,
        { params: { s: e.target.value } }
      );
      let data = findUser.data.data;
      data.filter((element, index) => {
        let isUser = member.find(({ Email }) => Email === element.Email);
        if (isUser) {
          data.splice(index, 1);
        }
      });
      setHintSearch(data);
    } catch (error) {
      console.log(error);
    }
    document.getElementById("result_search").style.display = "block";
    if (e.target.value === "") {
      document.getElementById("result_search").style.display = "none";
    }
  };
  const handleOnClick = (user) => {
    let isUser = member.find(({ Email }) => Email === user.Email);
    if (!isUser) {
      let isPartners = Partners.find(({ Email }) => Email === user.Email);
      if (isPartners && !props.isUser) {
        addMemberFormPartners(user);
        document.getElementById("result_search").style.display = "none";
      } 
      else if(isPartners && props.isUser){
        alert("Đã thêm liên kết ròi.")
      }
      else {
        setMember([...member, user]);
        document.getElementById("result_search").style.display = "none";
      }
    }
  };
  // console.log(member)
  const removeMember = (index) => {
    // console.log(index)
    if (member[index]?.isPartners) {
      Partners.push(member[index]);
    }
    const temp = [...member];
    temp.splice(index, 1);
    setMember(temp);
  };
  // console.log(member);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let new_member = [];
    member.map((element, index) => {
      new_member[index] = element?._id;
    });
    console.log("Data submit:", new_member);
    if (props.isUser) {
      // console.log("Cap nhat partners");
      const res = await axios
        .patch(`http://localhost:5000/api/user/partners/${id}`, {
          Partners: new_member,
        })
        .then(function (response) {
          props?.updateData(response.data.user.Partners)
          // console.log(response.data.msg);
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      const res = await axios
        .patch(`http://localhost:5000/api/project/listmember/${id}`, {
          Member: new_member,
        })
        .then(function (response) {
          console.log(response.data.msg);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    window.location.reload()
  };

  const addMemberFormPartners = (user) => {
    Partners.filter((element, index) => {
      if (element?._id === user?._id) {
        Partners.splice(index, 1);
        element["isPartners"] = true;
        setMember([...member, element]);
      }
    });
  };

  return (
    <>
      <div
        className="modal fade"
        id="addmemberModal"
        tabindex="-1"
        aria-labelledby="addmemberModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: "80%" }}>
          <div className="modal-content w-80">
            <div className="modal-header">
              <h5 className="modal-title" id="addmemberModalLabel">
                Thêm thành viên
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body container">
              <div className="row">
                <div className="col-md-6 py-1">
                  <h5>Danh sách thành viên liên kết</h5>
                  {Partners
                    ? Partners.map((element) => {
                        return (
                          <div
                            className="d-flex align-items-center"
                            onClick={() => {
                              console.log("Check:", props.isUser);
                            }}
                          >
                            {" "}
                            <img
                              src={
                                element?.Avatar
                                  ? `http://localhost:5000/asset/avatar/${element.Avatar}`
                                  : process.env.PUBLIC_URL +
                                    "/img/DefaultAvatarProfile.jpg"
                              }
                              style={{
                                width: "40px",
                                height: "40px",
                                backgroundSize: "cover",
                                borderRadius: "50%",
                              }}
                            />{" "}
                            &nbsp;{element.Fullname}{" "}
                            {props.isUser ? (
                              <div
                                style={{ marginLeft: "auto" }}
                              >
                              </div>
                            ) : (
                              <div
                                style={{ marginLeft: "auto" }}
                                onClick={(e) => {
                                  addMemberFormPartners(element);
                                }}
                              >
                                <i class="fa-solid fa-user-plus justify-content-end"></i>
                              </div>
                            )}
                          </div>
                        );
                      })
                    : " Rỗng"}
                </div>
                <div className="col-md-6 py-1">
                  <div className="inner-addon right-addon">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Vui lòng nhập email"
                      onChange={handleOnChange}
                    />
                    <i className="fa-solid fa-magnifying-glass glyphicon glyphicon-user "></i>

                    <div className=" w-100" id="result_search">
                      <ul className="list-group ">
                        {hintSearch.map((user, index) => {
                          return (
                            <li
                              class="list-group-item"
                              onClick={() => handleOnClick(user)}
                            >
                              <img
                                src={
                                  user?.Avatar
                                    ? `http://localhost:5000/asset/avatar/${user.Avatar}`
                                    : process.env.PUBLIC_URL +
                                      "/img/DefaultAvatarProfile.jpg"
                                }
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  backgroundSize: "cover",
                                  borderRadius: "50%",
                                }}
                              />{" "}
                              &nbsp;{user.Fullname}{" "}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <ul className="list-group" id="list_member">
                      {member.map((user, index) => {
                        return (
                          <div className="">
                            <li className="list-group-item  mt-1 d-flex px-0 justify-content-between align-items-center mr-1">
                              <div>
                                <img
                                  src={
                                    user?.Avatar
                                      ? `http://localhost:5000/asset/avatar/${user.Avatar}`
                                      : process.env.PUBLIC_URL +
                                        "/img/DefaultAvatarProfile.jpg"
                                  }
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundSize: "cover",
                                    borderRadius: "50%",
                                  }}
                                />
                                <span className="ms-1 ">{user?.Fullname}</span>
                                &nbsp;
                                {user?.isPartners ? (
                                  <i class="fa-solid fa-user-group"></i>
                                ) : (
                                  ""
                                )}
                              </div>
                              <i
                                className="fa-solid fa-user-minus"
                                onClick={() => removeMember(index)}
                              ></i>
                            </li>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
