const router = require("express").Router();
const Projects = require("../models/projectModel");
const Issues = require("../models/issueModel");

// Lấy danh sách dự án
router.get("/", async (req, res) => {
    try {
        const projects = await Projects.find();
        return res.status(200).json({ msg: "Lấy danh sách dự án thành công!", projects });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Tìm dự án theo id
router.get("/find/id/:id", async (req, res) => {
    try {
        const project = await Projects.findById(req.params.id).populate({path: "User_ID", select: "_id Fullname Email Avatar"}).populate({path: "Member", select: "_id Fullname Email Avatar"});
        if (project) {
            return res.status(200).json({ msg: "Tìm dự án thành công!", project });
        } else {
            return res.status(400).json({ msg: "Không tìm thấy dự án!"});
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Tìm dự án theo tên dự án
router.get("/find/name/:name", async (req, res) => {
    try {
        const projects = await Projects.find({ Name : { $regex: ".*" + req.params.name + ".*", $options: "i" } });
        return res.status(200).json({ msg: "Tìm dự án thành công!", projects });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Tìm dự án đã tạo của 1 người dùng
router.get("/find/user/id/:id", async (req, res) => {
    try {
        const projects = await Projects.find({ User_ID: req.params.id });
        return res.status(200).json({ msg: "Tìm dự án thành công!", projects });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Tìm dự án có tham gia của 1 người dùng
router.get("/find/member/id/:id", async (req, res) => {
    try {
        const projects = await Projects.find({ $or: [
            { User_ID: req.params.id }, { Member: req.params.id }
        ] }).populate({path:'User_ID',select:"_id Fullname Email"}).populate({path:'Category',select:"Name"}).populate({path:'Member',select:"Email Fullname Avatar"});
        return res.status(200).json({ msg: "Tìm dự án thành công!", projects });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
// Tìm dự án có tham gia của 1 người dùng limit 6
router.get("/find/join/id/:id", async (req, res) => {
    try {
        const projects = await Projects.find({ $or: [
            { User_ID: req.params.id }, { Member: req.params.id }
        ] }).limit(6).populate({path:'User_ID',select:"_id Fullname Email"}).populate({path:'Category',select:"Name"}).populate({path:'Member',select:"Email"});
        if(projects.length > 0) return res.status(200).json({ msg: "Tìm dự án thành công!", projects });
        else return res.status(404).json({msg:"Không tìm thấy!"})
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Tính tổng số dự án đã tạo tính tới hiện tại
router.get("/count", async (req, res) => {
    try {
        const totalProjects = await Projects.count();
        return res.status(200).json(totalProjects);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Tính tổng số dự án đã tạo trong 1 ngày
router.get("/count/createAt/:date", async (req, res) => {
    try {
        const myDate = new Date(req.params.date);
        const nextDate = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate() + 1);
        const projects = await Projects.find({ createdAt: { $gte: myDate, $lt: nextDate } });
        return res.status(200).json({ msg: "Tính tổng số dự án thành công!", soLuong: projects.length  });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Tạo 1 dự án
router.post("/create", async (req, res) => {
    try {
        const { Name, Key, Category, Description, User_ID } = req.body;
        const newPorject = new Projects({ Name, Key, Category, Description, User_ID, TaskCounter:1});
        await newPorject.save();
        return res.status(200).json({ msg: "Tạo dự án thành công!", newPorject });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Cập nhật 1 dự án
router.put("/update/id/:id", async (req, res) => {
    try {
        const newProject = await Projects.findOneAndUpdate({ _id: req.params.id }, 
                                                { $set: req.body }, { new: true });  
        if(newProject) {
            return res.status(200).json({ msg: "Cập nhật dự án thành công!", newProject });
        } else {
            return res.status(400).json({ msg: "Không tìm thấy dự án!" });
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Thêm 1 thành viên vào dự án dự án
router.put("/member/update/idProject/:idProject/idMember/:idMember", async (req, res) => {
    try {
        var project = await Projects.findById(req.params.idProject);
        if(project) {
            if(project.Member.includes(req.params.idMember)) {
                return res.status(400).json({ msg: "Thành viên đã thuộc dự án!" });
            } else {
                await Projects.findOneAndUpdate({ _id: req.params.idProject }, 
                            { $push: { "Member": req.params.idMember } } );
                return res.status(200).json({ msg: "Thêm thành viên thành công!" });
            }
        } else {
            return res.status(400).json({ msg: "Không tìm thấy dự án!" });
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Xóa 1 dự án
router.delete("/delete/id/:id", async (req, res) => {
    try {
        const project = await Projects.findOneAndDelete({ _id: req.params.id });
        if(project) {
            return res.status(200).json({ msg: "Xóa dự án thành công!" });
        } else {
            return res.status(400).json({ msg: "Không tìm thấy dự án!" });
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Xóa 1 thành viên (không phải leader) trong dự án
router.delete("/member/delete/idProject/:idProject/idMember/:idMember", async (req, res) => {
    try {
        await Projects.findOneAndUpdate({ _id: req.params.idProject }, 
            { $pull: { "Member": req.params.idMember } } );
        
        await Issues.updateMany({ Project_ID: req.params.idProject, User_ID: req.params.idMember }, 
            { $set: { User_ID: null } })
        
        return res.status(200).json({ msg: "Xóa thành viên thành công!" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Cap nhat bien dem task
router.put("/updateTaskCounter/id/:id", async (req, res) => {
    try {
        const newProject = await Projects.findOneAndUpdate({ _id: req.params.id }, 
                                                { $inc: {TaskCounter: 1} }, { new: true });  
        if(newProject) {
            return res.status(200).json({ msg: "Cập nhật dự án thành công!", newProject });
        } else {
            return res.status(400).json({ msg: "Không tìm thấy dự án!" });
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Lay danh sach thanh vien cua du an
router.get("/listmember/id", async (req, res) => {
    try {
        // console.log(req.query.id)
        const listMember = await Projects.findById(req.query.id).select("Member").populate({path:"Member", select:"Fullname Avatar"})
        // console.log("List member:",listMember.Member)
        return res.status(200).json(listMember.Member);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Cap nhat danh sach member cua du an
router.patch('/listmember/:id',async (req,res)=>{
    try {
        const update = await Projects.findByIdAndUpdate(
            req.params.id,
          {
            $addToSet: { Member: { $each: req.body.Member } },
          },
          {
            new: true,
          }
        );
        res.status(200).json({ msg:"Update successfully!",project:update });
      } catch (error) {
        return res.status(500).json({ msg: error });
      }
})


module.exports = router;