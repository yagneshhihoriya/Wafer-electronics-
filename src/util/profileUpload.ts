import multer from "multer";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null,'src/public/images')
    },
    filename(req, file, callback) {
        const fileName = Date.now()+'-'+Math.round((Math.random() * 1000000) + 1)
        callback(null,file.fieldname+'-'+fileName+'.'+file.mimetype.split('/')[1])
    },
})

const upload = multer({
    storage:storage,
    fileFilter(req, file, callback) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            callback(null, true);
          } else {
            callback(null, false);
            return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
          }
    },
    limits:{
        fileSize:5e+6
    },
})


export = upload;