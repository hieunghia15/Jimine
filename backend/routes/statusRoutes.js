// HIẾU NGHĨA

// Tạo Find, FindOnd, Create, Update, Delete

const router = require("express").Router();
const Statuses = require("../models/statusModel");

router.get("/", async (req, res) => {
    try {
        const status = await Statuses.find();
        res.status(200).json(status);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

router.get("/id/:id", async (req, res) => {
    try {
        const status = await Statuses.findById(req.params.id);
        res.status(200).json(status);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

router.get("/sort/stt", async (req, res) => {
    try {
        const status = await Statuses.find().sort( { Stt: 1 } );
        res.status(200).json(status);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

router.get("/find/:name", async (req, res) => {
    try {
        const status = await Statuses.find({ Name : { $regex: ".*" + req.params.name + ".*", $options: "i" } });
        return res.status(200).json(status);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

router.post("/create", async(req, res) => {
    try {
        const {Name, Description, Stt} = req.body;
        const status = await Statuses.findOne({Name});
        if(status) return res.status(400).json({msg: "Trạng thái đã có, vui long thử lại !!!"});
        const newStatuses = new Statuses({Name, Description, Stt});
        newStatuses.save();
        res.status(200).json({msg:"Thêm thành công"});
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

router.put("/update/:id", async(req, res) => {
    try {
        const {Name, Description, Stt} = req.body;
        await Statuses.findOneAndUpdate({_id: req.params.id},{Name, Description, Stt});
        res.status(200).json({msg:"Cập nhật thành công!!!"});
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

router.get("/detail/:id", async (req, res) => {
    try {
        const status = await Statuses.findById(req.params.id).select('-createdAt -updatedAt -__v');
        if (!status) return res.status(400).json({ msg: "Trạng thái này không tồn tại!" })
        res.json(status);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Xoa status theo id
router.delete("/delete/:id", async(req, res) => {
    try {
        await Statuses.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Xóa thành công!" });
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
});

// Lay status Todo cua task
router.get("/getMinNo", async(req, res) => {
    try {
        const stat = await Statuses.find().sort({"Stt":1}).limit(1);
        res.status(200).json({ msg: "Lấy thành công!", stat });
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

module.exports = router;