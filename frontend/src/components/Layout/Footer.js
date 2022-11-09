import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <div style={{ backgroundColor: "#deded5", height: "100%" , position:"relative" }}>
        <div className="container p-4">
          <div className="row">
            <div className="col-md-12 mb-4 text-center">
              <Link
                className="navbar-brand logo"
                to="#"
                style={{ color: "#0d6efd" , marginRight:"10%"}}
              >
                JIMINE
              </Link>
              <p>
                Jimine là một ứng dụng phần mềm được sử dụng để theo dõi và quản
                lý lỗi hay các vấn đề phát sinh trong mỗi dự án của tổ chức.
              </p>
            </div>
          </div>
        </div>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright by JIMINE
        </div>
      </div>
    </div>
  );
}
