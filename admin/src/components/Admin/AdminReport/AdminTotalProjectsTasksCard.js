import axios from 'axios';
import { useState } from 'react'

export default function AdminTotalProjectsTasksCard() {
    var [totalProjects, setTotalProjects] = useState("...");
    var [totalTasks, setTotalTasks] = useState("...");

    async function updateTotal() {
        var totalProjects = await axios.get("http://localhost:5000/api/project/count");
        setTotalProjects(totalProjects.data);

        var totalTasks = await axios.get("http://localhost:5000/api/issue/count");
        setTotalTasks(totalTasks.data);
    } 

    updateTotal();
    
    const cardStyle = {
        minWidth: "450px",
        textAlign: "center",
        padding: "25px 0",
        color: "white",
        borderRadius: "5px"
    };

    const totalProjectsCardStyle = {
        backgroundColor: "#A1C9F1"
    };

    const totalTasksCardStyle = {
        backgroundColor: "#42B5A6"
    };

    const numberStyle = {
        fontSize: "80px", 
        fontWeight: "none",
        padding: "30px 0 45px"
    };

    const subjectStyle = {
        fontSize: "30px", 
        paddingBottom: "10px",
        fontWeight: "bold"
    };

  return (
    <div className="container">
        <div className="d-flex justify-content-around">
            <div style={{...cardStyle, ...totalProjectsCardStyle}}>
                <p style={numberStyle}>{totalProjects.toLocaleString()}</p>
                <p style={subjectStyle}>dự án đã được tạo</p>
            </div>
            <div style={{...cardStyle, ...totalTasksCardStyle}}>
                <p style={numberStyle}>{totalTasks.toLocaleString()}</p>
                <p style={subjectStyle}>công việc đã được tạo</p>
            </div>
        </div>
    </div>
  )
}
