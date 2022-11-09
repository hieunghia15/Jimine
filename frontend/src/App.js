import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page from "./components/Page/Page";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import ChangePassword from "./components/Profile/ChangePassword";
import Register from "./components/Register/Register";
import ListProject from "./components/ListProject/ListProject";
import UpdateProject from "./components/ListProject/UpdateProject";
import ListMembers from "./components/ListMembers/ListMembers";
import ListTask from "./components/ListTask/ListTask";
import Board from "./components/BoardTask/Board";
import UserReport from "./components/UserReport/UserReport";
import { DataProvider } from "./GlobalState";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<Page />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/edit-profile" exact element={<EditProfile />} />
          <Route path="/change-password" exact element={<ChangePassword />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/list-project" exact element={<ListProject />} />
          <Route path="/update-project" exact element={<UpdateProject />} />
          <Route path="/list-members" exact element={<ListMembers />} />
          <Route path="/list-tasks" exact element={<ListTask />} />
          <Route path="/board-tasks" exact element={<Board />} />
          <Route path="/user-report" exact element={<UserReport />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
