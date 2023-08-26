const multer = require('multer')
const path = require('path')

module.exports = multer({
    storage:multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploaded_videos')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix+'.mp4')
        }
      }),
    fileFilter:(req,file,cb)=>{
        let ext = path.extname(file.originalname)
        if(ext!='.mp4'){
            cb(new Error('File type is not supported') , false)  //first argument is the error and the next argument is the boolean to say to pass on the file or not
            return ;
        }
        cb(null,true)   //return the file for  no error
    }
})