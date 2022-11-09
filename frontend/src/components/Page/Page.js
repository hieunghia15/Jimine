import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Layout/Footer";
import "./Page.css";

export default function Page() {
  const navigate = useNavigate();
  return (
    <>
      <div id="page_header">
        <div className="container d-flex justify-content-between align-items-center">
          <img
            src={process.env.PUBLIC_URL + "/img/Page/logo.PNG"}
            className="page_logo"
          />
          <button
            className="btn btn-success"
            onClick={() => navigate("/login")}
          >
            <i className="fa-solid fa-arrow-right-to-bracket"></i> &nbsp; Đăng
            nhập
          </button>
        </div>
      </div>

      <div id="page_main">
        <div id="divTaoDuAnNgay" className="row">
          <div className="noiDung col-lg-5 mt-auto mb-auto">
            <h2 className="title">
              Quản lý dự án một cách hiệu quả với Jimine
            </h2>
            <p>
              Jimine là một ứng dụng phần mềm được sử dụng để theo dõi và quản
              lý lỗi hay các vấn đề phát sinh trong mỗi dự án của tổ chức
            </p>
            <p>
              <button id="btnTaoDuAn" onClick={() => navigate("/login")}>
                Tạo dự án
              </button>
            </p>
          </div>
          <div className="hinhAnh col-lg-7">
            <img src={process.env.PUBLIC_URL + "/img/Page/QuanLyDuAn.jpg"} />
          </div>
        </div>

        <div id="divDacDiemCuaJimine" className="container">
          <h1 className="title">Những đặc điểm của Jimine</h1>
          <div
            id="danhSachDacDiem"
            className="row gy-4 justify-content-between"
          >
            <div className="col-sm-6 col-lg-3 dacDiem">
              <img
                src={process.env.PUBLIC_URL + "/img/Page/DeDangSuDung.png"}
              />
              <br />
              <p>Dễ dàng sử dụng</p>
            </div>
            <div className="col-sm-6 col-lg-3 dacDiem">
              <img
                src={process.env.PUBLIC_URL + "/img/Page/LenKeHoachDeDang.png"}
              />
              <br />
              <p>Lập kế hoạch thực hiện dự án dễ dàng </p>
            </div>
            <div className="col-sm-6 col-lg-3 dacDiem">
              <img
                src={
                  process.env.PUBLIC_URL + "/img/Page/TheoDoiTienDoTrucQuan.png"
                }
              />
              <br />
              <p>Theo dõi tiến độ trực quan</p>
            </div>
            <div className="col-sm-6 col-lg-3 dacDiem">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/img/Page/DeDangPhanCongCongViec.png"
                }
              />
              <br />
              <p>Dễ dàng phân công công việc</p>
            </div>
          </div>
        </div>

        <div id="divDangKyNgay" className="row">
          <div className="hinhAnh col-md-7">
            <img src={process.env.PUBLIC_URL + "/img/Page/DangKyNgay.jpg"} />
          </div>
          <div className="noiDung col-md-5 mt-auto mb-auto">
            <h2 className="title">Hơn 1.000.000 người dùng đang sử dụng</h2>
            <h4 className="title">Còn bạn thì sao?</h4>
            <p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/register")}
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
