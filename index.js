const express = require('express');
const multer = require('multer');

const app = express();
// const upload = multer({ dest: 'uploads/' });
  //const upload = multer({ dest: 'uploads/posts' });

 const  multerStorage =  multer.diskStorage({
     destination :  (req,file,cb) => {
         cb(null, './uploads');
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

app.post('/upload', upload.single('photo'), (req, res) => {
  // Process the uploaded file
  console.log(req.file); // Access the uploaded file information
  res.send('File uploaded successfully!');
});

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});