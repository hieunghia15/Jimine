import React from 'react'
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <div className="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <Link to="/">JIMINE</Link>
          </div>
          <div className="sidebar-brand sidebar-brand-sm">
            <Link to="/">JM</Link>
          </div>
          <ul className="sidebar-menu">
            <li className="menu-header">Dashboard</li>
            <li><Link className="nav-link" to="/"><i className="fas fa-fire"></i> <span>Trang chủ</span></Link></li>
            <li className="menu-header">Danh mục</li>
            <li><Link className="nav-link" to="/project-categories/index"><i className="fas fa-th"></i> <span>Loại dự án</span></Link></li>
            <li><Link className="nav-link" to="/task-categories/index"><i className="fa fa-file"></i> <span>Loại công việc</span></Link></li>
            <li><Link className="nav-link" to="/status-categories/index"><i className="fa fa-bars"></i> <span>Trạng thái công việc</span></Link></li>
            <li><Link className="nav-link" to="/"><i className="far fa-file-alt"></i> <span>Thống kê</span></Link></li>
          </ul>
          <div className="mt-4 mb-4 p-3 hide-sidebar-mini">
            <Link to="/" className="btn btn-primary btn-lg btn-block btn-icon-split">
              <i className="fas fa-rocket"></i> JIMINE
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
