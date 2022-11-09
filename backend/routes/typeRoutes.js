const router = require("express").Router();
const Types = require("../models/typeModels");


// API lấy toàn bộ dữ liệu của TypeModel
router.get("/", async (req, res) => {
  try {
    const getAllType = await Types.find();
    if (getAllType) return res.status(200).json(getAllType);
    else return res.status(404).json({ msg: "Không tìm thấy !" });
  } catch (error) {
    res.status(500).json(error);
  }
});
// API lấy dữ liệu theo isType
router.get("/istype",async (req, res)=>{
    try {    
        const findType = await Types.find({isType:req.query.type})
        if(!findType[0]) res.status(404).json({msg:"That bai"})
        else  res.status(200).json(findType)
    } catch (error) {
        res.status(400).json(error)
    }
})
// API lấy một document bằng id
router.get("/get/:id", async (req, res) => {
    try {
      
      const type = await Types.findOne({_id:req.params.id})
      console.log(type)
      res.status(200).json({ msg: "Thành công!", data: type });
    } catch (error) {
      res.status(400).json(error);
    }
  });
// API tạo type document
router.post("/create", async (req, res) => {
  try {
    const { Name, Description, isType, Color } = req.body;
    const type = new Types({ Name, Description, isType, Color });
    // console.log(type)
    await type.save();
    res.status(200).json({ msg: "Thành công!", data: type });
  } catch (error) {
    res.status(400).json(error);
  }
});
// API cập nhật dữ liệu của document type
router.put("/update/:id", async (req, res) => {
    try {
      let typeUpdate = req.body;
      const update = Types.findByIdAndUpdate(
        { _id: req.params.id },
        typeUpdate,
        { new: true },
        (error, docs) => {
          if (!error && docs)
            return res.status(200).json({ msg: "Thành công!", data: docs });
          else return res.status(400).json({ msg: "Thất bại", error });
        }
      );
    } catch (error) {
      res.status(400).json(error);
  }
});
// API xóa dữ liệu document type
router.delete("/delete/:id", async (req, res) => {
  try {
    Types.findByIdAndDelete({ _id: req.params.id }, (error, docs) => {
      if (!error && docs) return res.status(200).json({ msg: "Xóa thành công." });
      else return res.status(400).json({ msg: "Xóa thất bại." });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
