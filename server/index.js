const express = require('express');
const multer = require('multer');
const path =  require('path');
const morgan = require('morgan')

const app = express();
// const upload = multer({ dest: 'uploads/' });
  //const upload = multer({ dest: 'uploads/posts' });

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

 const  multerStorage =  multer.diskStorage({
     destination :  (req,file,cb) => {
         cb(null, './uploads/posts');
     },
     filename : (req,file,cb) => {
         console.log(file)
         const ext =  file.mimetype.split('/')[1];
         const rand =  Math.floor(Math.random() * 1E9);
         cb(null, `laundry-${rand}-${Date.now()}.${ext}`)
     }
 })

 const multerFilter =  (req,file, cb) =>  {
     console.log(file)
     if(file.mimetype.startsWith('image')){
         cb(null,true)
     }
    else{
        cb(new AppError('The  file  you  uploaded is not supported', 400))
    }
 }

 const  upload =  multer({
    storage : multerStorage,
    fileFilter : multerFilter
 })

app.post('/api/v1/posts/upload_photo', upload.single('photo'), (req, res) => {

    const path =  req.file.path;
    if(!path || path === undefined){
       console.log("something went wrong")
    }

    res.status(201).json({
         status : "successfull",
        message : "photo uploaded succesfully",
        data : path
     })
   });

 app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 6002;

app.get('/', (req,res)=> res.send(`App is running from port : ${port}`  ))


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
