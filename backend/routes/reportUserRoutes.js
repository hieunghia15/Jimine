const router = require("express").Router();
const TotalTasksByStatuses = require("../models/totalTasksByStatusModel");
const Projects = require("../models/projectModel");
const Statuses = require("../models/statusModel");
const Issues = require("../models/issueModel");

// Lấy tổng số công việc theo từng trạng thái của 1 dự án trong 1 ngày
router.get("/count/task/by/status/idProject/:id/date/:date", async (req, res) => {
    try {
        const myDate = new Date(req.params.date);
        const date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
        const nextDate = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate() + 1);
        
        const status = await TotalTasksByStatuses.findOne({
            Project_ID: req.params.id ,
            createdAt: {$gte: date, $lt: nextDate} 
        });

        res.status(200).json({ msg: "Lấy report thành công", status });
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

// Tính tổng số công việc theo từng trạng thái của ngày hôm qua và lưu vào database
router.post("/project/status/issue/count", async (req, res) => {
    try {
        var currentDate = new Date();
        var reportDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
       
        var reports = [];
        var report = await TotalTasksByStatuses.findOne({
            createdAt: {$gte: reportDate, $lt: currentDate} 
        });
        
        if(!report) {
            const projects = await Projects.find();
        
            const statuses = await Statuses.find().sort({ Stt: 1 });
            var statusIDs = [];
            statuses.forEach(status => {
                statusIDs.push(status._id.toString());
            });

            for(var i = 0; i < projects.length; i++) {
                var project = projects[i];
                const memberIDs = [project.User_ID, ...project.Member];

                var totalTasksByStatus = [];
                memberIDs.forEach(memberID => {
                    var totalTaskOfMember = { userID: memberID }
                    statusIDs.forEach(statusID => totalTaskOfMember[statusID] = 0);
                    totalTasksByStatus.push(totalTaskOfMember);
                });
                var totalTaskDontHaveMember = { userID: undefined }
                statusIDs.forEach(statusID => totalTaskDontHaveMember[statusID] = 0);
                totalTasksByStatus.push(totalTaskDontHaveMember);
                
                const tasks = await Issues.find({ 
                    Project_ID: project._id
                });
                
                tasks.forEach(task => {
                    for(var i = 0; i < totalTasksByStatus.length; i++) {
                        var totalTaskOfMember = totalTasksByStatus[i];
                        if(totalTaskOfMember.userID?.toString() == task.User_ID?.toString()
                                && statusIDs.includes(task.Status_ID.toString())) {
                            totalTaskOfMember[task.Status_ID]++;
                        }  
                    }
                })
            
                var report = new TotalTasksByStatuses({ 
                    Project_ID: project._id,
                    Total_Tasks: totalTasksByStatus,
                    createdAt: reportDate
                });
                report.save();
                reports.push(report);
            }
        }

        return res.status(200).json({ msg: "Lưu report tổng số công việc theo trạng thái thành công!", reports });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

module.exports = router;