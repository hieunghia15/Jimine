const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const Issues = require("../models/issueModel");
const { upload } = require("../middleware/upload");
const Projects = require("../models/projectModel");

// Find
router.get("/", async (req, res) => {
  try {
    const issues = await Issues.find({})
      .populate({ path: "Project_ID", select: "_id Name" })
      .populate({ path: "Type_ID", select: "_id Name Color" })
      .populate({ path: "Status_ID" });
    res.status(200).json({ msg: "Lấy danh sách thành công!", issues });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Find 6 issue updated
router.get("/get-task/:id", async (req, res) => {
  try {
    const issues = await Issues.find({ User_ID: req.params.id })
      .limit(6)
      .sort({ updatedAt: -1 })
      .populate({ path: "Project_ID", select: "_id Name" })
      .populate({ path: "Type_ID", select: "_id Name Color" })
      .populate({ path: "User_ID", select: "_id Fullname" })
      .populate({ path: "Status_ID" });
    res.status(200).json({ msg: "Lấy danh sách thành công!", issues });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// FindOne
router.get("/find/id/:id", async (req, res) => {
  try {
    const issue = await Issues.findOne({ _id: req.params.id });
    if (issue) {
      return res.status(200).json({ msg: "Tìm thành công!", issue });
    } else {
      return res.status(400).json({ msg: "Không tìm thấy!" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Find All Issues In A Project Order By Update Status Time
router.get("/find/project/id/:id/sort/UpdateStatusAt", async (req, res) => {
  try {
    const issues = await Issues.find({ Project_ID: req.params.id })
      .sort({ UpdateStatusAt: -1 })
      .populate({ path: "Project_ID", select: "Name" })
      .populate({ path: "Type_ID", select: "Name Color" })
      .populate({ path: "User_ID", select: "Fullname Avatar" })
      .populate({ path: "Status_ID", select: "Name" });
    return res.status(200).json({ msg: "Tìm thành công!", issues });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Find Total Issues Created Until Now
router.get("/count", async (req, res) => {
  try {
    const totalIssues = await Issues.count();
    return res.status(200).json(totalIssues);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Find Total Issues Created In A Date
router.get("/count/createAt/:date", async (req, res) => {
  try {
    const myDate = new Date(req.params.date);
    const nextDate = new Date(
      myDate.getFullYear(),
      myDate.getMonth(),
      myDate.getDate() + 1
    );
    const issues = await Issues.find({
      createdAt: { $gte: myDate, $lt: nextDate },
    });
    return res
      .status(200)
      .json({ msg: "Tính tổng số dự án thành công!", soLuong: issues.length });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Find Total Issues Created In A Project By Month In A Year
router.get("/count/idProject/:id/year/:year", async (req, res) => {
  try {
    var totalTasksInYear = new Array(12).fill(0);

    const project = await Projects.findById(req.params.id);
    if (!project) {
      return res.status(400).json({ msg: "Không tìm thấy dự án!" });
    }

    const firstDate = new Date(req.params.year, 0, 1);
    const lastDate = new Date(req.params.year, 11, 31);
    const issues = await Issues.find({
      Project_ID: req.params.id,
      createdAt: { $gte: firstDate, $lte: lastDate },
    });
    issues.forEach((issue) => {
      var monthOfIssue = new Date(issue.createdAt).getMonth();
      totalTasksInYear[monthOfIssue]++;
    });

    return res.status(200).json({
      msg: "Tính tổng số công việc đã tạo thành công!",
      totalTasksInYear,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Find task by key
router.get("/find/key/:key", async (req, res) => {
  try {
    const issue = await Issues.findOne(
      { Key: req.params.key },
      { _id: 1, Status_ID: 1 }
    ).populate({ path: "Status_ID", select: "-_id Name" });
    if (issue) {
      return res.status(200).json({ msg: "Tìm dự án thành công!", issue });
    } else {
      return res.status(400).json({ msg: "Không tìm thấy dự án!" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Create
router.post("/create", async (req, res) => {
  try {
    const {
      Project_ID,
      Type_ID,
      Status_ID,
      Summary,
      Description,
      Attachment,
      Key,
      User_ID,
      Deadline,
    } = req.body;
    const newIssue = new Issues({
      Project_ID,
      Type_ID,
      Status_ID,
      UpdateStatusAt: new Date(),
      Summary,
      Description,
      Attachment,
      Key,
      User_ID,
      Deadline,
    });
    await newIssue.save();
    return res.status(200).json({ msg: "Tạo thành công!", newIssue });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
// Update with put
router.put("/update/id/:id", async (req, res) => {
  try {
    const newIssue = await Issues.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (newIssue) {
      return res.status(200).json({ msg: "Cập nhật thành công!", newIssue });
    } else {
      return res.status(400).json({ msg: "Không tìm thấy!" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Update Update with patch
router.patch("/update/id/:id", async (req, res) => {
  try {
    // console.log(req.body);
    const newIssue = await Issues.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .populate({ path: "Project_ID", select: "Name" })
      .populate({ path: "Type_ID", select: "Name" })
      .populate({ path: "User_ID", select: "Fullname Email Avatar" })
      .populate({ path: "Status_ID", select: "Name" });
    if (newIssue) {
      // console.log("New Issue:", newIssue);
      return res.status(200).json({ msg: "Cập nhật thành công!", newIssue });
    } else {
      return res.status(400).json({ msg: "Không tìm thấy!" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Delete
router.delete("/delete/id/:id", async (req, res) => {
  try {
    // xoa file
    const delete_file = await Issues.findById(req.params.id);
    delete_file?.Attachment.map((element) => {
      if (element) {
        fs.unlinkSync(path.join(__dirname, `../asset/image/${element}`));
      }
    });
    const issue = await Issues.findOneAndDelete({ _id: req.params.id });
    if (issue) {
      return res.status(200).json({ msg: "Xóa thành công!" });
    } else {
      return res.status(400).json({ msg: "Không tìm thấy!" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// Upload file
router.post("/upload/file", upload.single("attachment"), async (req, res) => {
  try {
    // console.log(req.body.task_id);
    const update = await Issues.findByIdAndUpdate(
      req.body.task_id,
      {
        $addToSet: { Attachment: req.file.filename },
      },
      {
        new: true,
      }
    );
    // console.log("Add file to db:", update.Attachment);
    res.status(200).json({ fileList: update.Attachment });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});
// Upload multiple file
router.post(
  "/upload/multiplefiles",
  upload.fields([{ name: "attachments", maxCount: 100 }]),
  async (req, res) => {
    try {
      let filenames = [];
      // console.log(req.body.task_id);
      req.files.attachments.map((element) => {
        filenames.push(element.filename);
      });

      const update = await Issues.findByIdAndUpdate(
        req.body.task_id,
        {
          $addToSet: { Attachment: { $each: filenames } },
        },
        {
          new: true,
        }
      );
      // console.log("Add file to db:", update.Attachment);
      res.status(200).json({ fileList: update.Attachment });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  }
);
//Delete file
router.delete("/file", async (req, res) => {
  try {
    let filename = req.query.filename;
    // console.log(req.query.task_id);
    // console.log(filename)
    const issue = await Issues.findByIdAndUpdate(
      req.query.task_id,
      {
        $pullAll: { Attachment: [filename] },
      },
      {
        new: true,
      }
      // , (err,issue)=>{
      //   if(err) {console.log(err)}
      //   else console.log(issue)
      // }
    );
    fs.unlinkSync(path.join(__dirname, `../asset/image/${filename}`));
    res.status(200).json({ fileList: issue.Attachment });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});
// lay so luong task hoan thanh cua mot du an
router.get("/:id/counttask/:status", async (req, res) => {
  try {
    const count = await Issues.find({
      Project_ID: req.params.id,
      Status_ID: req.params.status,
    }).count();
    res.status(200).json(count);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});
// lay so luong task hoan thanh cua mot du an
router.get("/:id/alltask", async (req, res) => {
  try {
    const count = await Issues.find({ Project_ID: req.params.id }).count();
    res.status(200).json(count);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});
// Delete tat cac cac task cua 1 project
router.delete("/delete/project/:id", async (req, res) => {
  try {
    // xoa file
    const all_Task = await Issues.find({ Project_ID:req.params.id }).select('Attachment');
    if(all_Task.length >0)
    {
      all_Task.map(async (element) => {
        if(element?.Attachment.length > 0){
          element?.Attachment.map((item) => {
            fs.unlinkSync(path.join(__dirname, `../asset/image/${item}`));
          });
        }

        const issue = await Issues.findOneAndDelete({ _id: element._id });
      });
      return res.status(200).json({ msg: "Xóa thành công!" });
    } else {
      return res.json({ msg: "Không co task." });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});
module.exports = router;
