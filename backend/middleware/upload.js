const path = require('path');

const multer  = require('multer')

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null,  path.join(__dirname, '../asset/image/'));    
    }, 
    filename: function (req, file, cb) { 
      // console.log("Key:",req.query.key)
       cb(null ,req.query.key+"-image" +"-" +file.originalname);   
    }
 });
 var storage_avatar = multer.diskStorage({   
   destination: function(req, file, cb) { 
      cb(null,  path.join(__dirname, '../asset/avatar/'));    
   }, 
   filename: function (req, file, cb) { 
     // console.log("Key:",req.query.key)
      cb(null ,"Avatar-"+req.query.email+"-"+Date.now()+path.extname(file.originalname));   
   }
});
 const upload = multer({
    storage: storage,
    limits : {fileSize : 1000000}
});
const upload_avatar = multer({
   storage: storage_avatar,
   limits : {fileSize : 1000000}
});

module.exports = {
    upload,
    upload_avatar
}