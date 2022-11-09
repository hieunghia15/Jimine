
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate 
} from "react-router-dom";


import Footer from "./components/Admin/Layouts/Footer";
import Navbar from "./components/Admin/Layouts/Navbar";
import Sidebar from "./components/Admin/Layouts/Sidebar";
import Index from "./components/Admin/Index/Index";
import CreateProjectCategories from "./components/Admin/ProjectCategories/Create";
import IndexProjectCategories from "./components/Admin/ProjectCategories/Index";
import UpdateProjectCategories from "./components/Admin/ProjectCategories/Update";
import Profile from './components/Admin/Profile/Profile';
import EditProfile from './components/Admin/Profile/EditProfile';
import ChangePassword from './components/Admin/Profile/ChangePassword';
import AdminReport from './components/Admin/AdminReport/AdminReport';
import CreateTaskCategories from "./components/Admin/TaskCategories/Create";
import IndexTaskCategories from "./components/Admin/TaskCategories/Index";
import UpdateTaskCategories from "./components/Admin/TaskCategories/Update";
import CreateStatusCategories from "./components/Admin/StatusCategories/Create";
import IndexStatusCategories from "./components/Admin/StatusCategories/Index";
import UpdateStatusCategories from "./components/Admin/StatusCategories/Update";
import Login from './components/Admin/Login/Login';
import { DataProvider } from './GlobalState';
import { useState } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('UserID'));
  return (
    <DataProvider>
      <Router> 
      <Routes>
        <Route path="/login" exact element={isLogin ? <AdminReport /> : <Login /> } />
        <Route path="/" exact element={isLogin ? <AdminReport /> : <Login/>} />
      </Routes>

      <Routes>
        <Route path="/project-categories/create" exact element={isLogin ? <CreateProjectCategories /> : <Login/>} />
        <Route path="/project-categories/index" exact element={isLogin? <IndexProjectCategories />: <Login/>} />
        <Route path="/project-categories/update" exact element={isLogin ? <UpdateProjectCategories />: <Login/>} />
      </Routes>

      <Routes>
        <Route path="/profile" exact element={isLogin ? <Profile /> : <Login/>} />
        <Route path="/change-password" exact element={isLogin ? <ChangePassword />:<Login/>} />
        <Route path="/edit-profile" exact element={isLogin ? <EditProfile />: <Login/>} />

      </Routes>

      <Routes>
        <Route path="/task-categories/create" exact element={isLogin ? <CreateTaskCategories />: <Login/>} />
        <Route path="/task-categories/index" exact element={isLogin ? <IndexTaskCategories /> : <Login/>} />
        <Route path="/task-categories/update" exact element={isLogin ? <UpdateTaskCategories /> : <Login/> } />
      </Routes>

      <Routes>
        <Route path="/status-categories/create" exact element={isLogin ? <CreateStatusCategories /> : <Login/>} />
        <Route path="/status-categories/index" exact element={isLogin? <IndexStatusCategories />: <Login/>} />
        <Route path="/status-categories/update" exact element={isLogin ? <UpdateStatusCategories />: <Login/>} />
      </Routes>

    </Router> 
    </DataProvider>
  );
}

export default App;
