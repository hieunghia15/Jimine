require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const axios = require("axios");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/type", require("./routes/typeRoutes"));
app.use("/api/issue", require("./routes/issueRoutes"));
app.use("/api/status", require("./routes/statusRoutes"));
app.use("/api/project", require("./routes/projectRoutes"));
app.use("/asset/image", express.static("./asset/image"));
app.use("/asset/avatar", express.static("./asset/avatar"));
app.use("/api/report/user", require("./routes/reportUserRoutes"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  // Tự động thống kê dữ liệu mỗi ngày mỗi khi server khởi động
  try {
     axios.post(
      "http://localhost:5000/api/report/user/project/status/issue/count"
    );
  } catch(e) {
    console.log(e);
  }
});

const URI = process.env.MONGOBD_URL;
mongoose.connect(
  URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connect Successful !!!");
  }
);
