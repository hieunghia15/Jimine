const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const  verify = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
      req.user  = await Users.findById(authHeader).populate({path:"Partners" , select:"Fullname Avatar Email"});
      next();
  } else {
    return res.status(401).json("Thông tin không xác thực!");
  }
}

module.exports = verify;
