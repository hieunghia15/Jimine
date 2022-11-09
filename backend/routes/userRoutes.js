const router = require("express").Router();
const Users = require("../models/userModel");
const Projects = require("../models/projectModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/verify");
//GET ONE USER localhost:5000/api/user/find
const { upload_avatar } = require("../middleware/upload");
const fs = require("fs");
const path = require("path")
router.get("/find", verify, async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
// RIGISTER localhost:5000/api/user/register
router.post("/register", async (req, res) => {
  try {
    const { Fullname, Email, Password } = req.body;
    const isEmail = await Users.findOne({ Email });
    if (isEmail)
      return res
        .status(400)
        .json({ msg: "Email đã được đăng ký trước đó !!!" });
    if (Password == "")
      return res.status(400).json({ msg: "Email không hợp lệ" });
    const PasswordHash = await bcrypt.hash(Password, 10);
    const newUser = new Users({
      Fullname,
      Email,
      Password: PasswordHash,
    });
    await newUser.save();
    res.status(200).json({ msg: "Đăng ký thành công." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// LOGIN localhost:5000/api/user/login
router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ Email: req.body.Email });
    if (!user)
      return res
        .status(401)
        .json({ msg: "Email không được đăng ký trước đó." });

    const isPassword = await bcrypt.compare(req.body.Password, user.Password);
    if (!isPassword) return res.status(400).json({ msg: "Sai mật khẩu!" });
    const accessToken = user._id;
    res.json({ accessToken });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

//REFRESH TOKEN localhost:5000/api/user/refreshToken
// router.get("/refreshToken", async (req, res) => {
//   try {
//     const rf_token = req.cookies.refreshToken;
//     console.log(rf_token);
//     if (!rf_token)
//       return res
//         .status(400)
//         .json({ msg: "Vui lòng đăng nhập hoặc đăng ký!!!" });

//     jwt.verify(rf_token, process.env.SECRET_KEY, (err, user) => {
//       if (err)
//         return res
//           .status(401)
//           .json({ msg: "Vui lòng đăng nhập hoặc đăng ký!!!" });
//       const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
//         expiresIn: "11m",
//       });
//       res.json({ accessToken });
//     });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

//LOGOUT localhost:5000/api/user/logout
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("refreshToken", { path: "/api/user/refreshToken" });
    return res.json({ msg: "Đăng xuất thành công" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Lay partners
router.get("/get-partners/id/:id", async (req, res) => {
  const User = await Users.findById(req.params.id).populate({
    path: "Partners",
    select: "Fullname Email Avatar",
  });
  // console.log(User);
  return res.json({
    msg: "Lấy danh sách Partners thành công!",
    partner: User.Partners,
  });
});

// //UPDATE PASSWORD localhost:5000/api/user/changepassword/:id
// router.put("/changepassword/:id", async (req, res) => {
//   try {
//     const { Old, New, Reconfirm } = req.body;
//     const user = await Users.findById(req.params.id);
//     const isPassword = await bcrypt.compare(Old, user.Password);
//     if (!isPassword) return res.status(400).json({ msg: "Sai mật khẩu !" });
//     if (New !== Reconfirm)
//       return res.status(400).json({ msg: "Mật khẩu mới không khớp !" });
//     if (Reconfirm == "") return res.status(400).json({ msg: "Lỗi cập nhật !" });

//     const PasswordHash = await bcrypt.hash(Reconfirm, 10);

//     await Users.findByIdAndUpdate(req.params.id, { Password: PasswordHash });
//     res.status(200).json({ msg: "Đổi mật khẩu thành công." });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

//UPDATE PASSWORD localhost:5000/api/user/change-password/:id
router.put("/change-password/:id", async (req, res) => {
  try {
    const { Old, New, Reconfirm } = req.body;
    const user = await Users.findById(req.params.id);
    const isPassword = await bcrypt.compare(Old, user.Password);
    if (!isPassword) return res.status(400).json({ msg: "Sai mật khẩu !" });
    if (New !== Reconfirm)
      return res.status(400).json({ msg: "Mật khẩu mới không khớp !" });
    if (Reconfirm == "") return res.status(400).json({ msg: "Lỗi cập nhật !" });

    const PasswordHash = await bcrypt.hash(Reconfirm, 10);

    await Users.findByIdAndUpdate(req.params.id, { Password: PasswordHash });
    res.status(200).json({ msg: "Đổi mật khẩu thành công." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// UPDATE INFOMATION
router.put("/update/:id", async (req, res) => {
  try {
    const {
      Fullname,
      Birthday,
      Gender,
      Address,
      Phone,
      Position,
      Company,
      Department,
    } = req.body;
    await Users.findOneAndUpdate(
      { _id: req.params.id },
      {
        Fullname,
        Birthday,
        Gender,
        Address,
        Phone,
        Position,
        Company,
        Department,
      }
    );
    return res.status(200).json({ msg: "Cập nhật thành công" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// //GET ALL USER localhost:5000/api/user
router.get("/", async (req, res) => {
  try {
    const user = await Users.find({}).sort({ _id: -1 });
    res.status(200).json({ msg: "Lấy danh sách thành công!", user });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// //
// router.get("/get-all-same-project/:id", async (req, res) => {
//   const User_ID = req.params.id;
//   const uSers = await Users.find();
//   const ProjectS = await Projects.find();
//   const user1 = User_ID;

//   var arr = new Array(uSers.length);
//   // [{userid: 123, count: 0}, {userid: 456, count: 0}]
//   uSers.forEach(user => {
//     var count_User = 0;
//     ProjectS.forEach(project => {
//       const mem = project.Member.map(member => member.toString())
//       if((user1 === project.User_ID.toString() || mem.includes(user1)) && (user === project.User_ID.toString() || mem.includes(user))) {
//         count_User++;
//       }
//     })
//     arr[i]
//   })
//   return res.status(200).json({ msg: "Lấy danh sách thành công!", count_User });

// })



// //DELETE USER localhost:5000/api/user/:id
router.delete("/delete/user/:id1/partner/:id2", async (req, res) => {
  try {
    console.log("ID1:",req.params.id1)
    await Users.findByIdAndUpdate(req.params.id1, {
      $pull: { Partners: req.params.id2 },
    });
    res.status(200).json({ msg: "Thanh cong!" });
  } catch (error) {
    
  }
  
});

router.get("/getByEmail", async (req, res) => {
  try {
    let char_search = req.query.s;
    const getUsers = await Users.find({
      Email: { $regex: !char_search ? "" : char_search, $options: "$si" },
    }).select("Fullname Avatar Email");
    if (getUsers) res.status(200).json({ msg: "Thanh cong!", data: getUsers });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Tim Partner theo key
router.get("/search/user/:id/key/:key", async (req, res) => {
  const Partner = (
    await Users.findById(req.params.id).populate({
      path: "Partners",
      select: "Fullname Email",
    })
  ).Partners;
  if (req.params.key === "") {
    res.status(200).json({ msg: "Lay PN thanh cong!", newPartner: Partner });
  } else {
    var myRe = new RegExp(".*" + req.params.key + ".*", "i");
    const newPartner = Partner.filter((part) => myRe.test(part.Fullname));
    res.status(200).json({ msg: "Lay PN thanh cong!", newPartner });
  }
});

// Get user by id
router.get("/id/:id", async (req, res) => {
  try {
    const user = await Users.find({ _id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
// Update avatar user
router.post("/upload/avatar", upload_avatar.single("avatar"), async (req, res) => {
  try {
    // Xóa ảnh trước đó
    const user = await Users.findById(req.body.user_id)
    if(user.Avatar) {
      // avatar tim thay
      fs.unlinkSync(path.join(__dirname, `../asset/avatar/${user.Avatar}`));
    }
    // update avatar mới vào db
    const update = await Users.findByIdAndUpdate(
      req.body.user_id,
      {
        $set: { Avatar: req.file.filename },
      },
      {
        new: true,
      }
    );
    res.status(200).json(update);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

// Cap nhat danh sach Partners cua user
router.patch('/partners/:id',async (req,res)=>{
  try {
      const update = await Users.findByIdAndUpdate(
          req.params.id,
        {
          $addToSet: { Partners: { $each: req.body.Partners } },
        },
        {
          new: true,
        }
      );
      res.status(200).json({ msg:"Update successfully!",user:update });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
})
module.exports = router;
