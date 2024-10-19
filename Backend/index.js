// first step for create any websites
// the basic requirements for any create website 
// backend -> frontend -> database
// the command for run vite website -> npm run dev

// import all packages 
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer  = require('multer')
const mongoose= require('mongoose');
const path=require('path')

 
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
app.use(cors({origin: '*'}))
//app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.use('/uploads',express.static('uploads'));

const { Schema } = mongoose;
//connect
mongoose.connect('mongodb://127.0.0.1:27017/empdb1');

// mongodb ke adar schema 
//schema
const empSchema = new Schema({
    name: { type: String, required: [true,'Name is Required'] },
    dept: { type: String, required: [true,'Dept is Required'] },
    salary: { type: Number, required: [true,'Salary is Required'] ,    
      min: [10000, 'Min Values is 10000'],
      max: [40000, 'Max Values is 40000'],
  },
doj: { type: Date, required: [true,'Date of Joining is Required'] },
  email: { type: String, required: [true,'Email is Required'] },
  phone: { type: String, required: [true,'Phone is Required'] },
  image: { type: String, default: null },
  addeddate: { type: Date, default: Date.now },
  active:{ type: Boolean, default: true } ,
  });


//model
const Emp = mongoose.model('Emp', empSchema);

//multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
    }
  })

  const upload = multer({
    storage: storage,
    limits: {    fileSize: 1024 * 1024 * 5     },
    fileFilter: (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {                                
        cb(null, true);        
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  })

  //  routes 
  // post get get :id delete :id put:id patch : id 

  app.post('/',(req, res) => {
    r=req.body;
    console.log(r)
    let data  = new Emp({
        name:r.name,
        dept:r.dept,
        salary:parseInt(r.salary),
        doj:r.doj,
        email:r.email,
        phone:r.phone});
    data.save().then(() => res.send('Record Save'));
})

app.get('/:id',(req,res)=>{
  let id=req.params.id;
  Emp.findOne({_id:id}).then((result)=>res.send(result));
  })
  
app.get('/', (req, res) => {
    Emp.find().then((result)=>res.send(result));
    })
    
    
   
    app.delete('/:id', (req, res) => {
        let id=req.params.id;
        Emp.deleteOne({_id:id}).then((result)=>{
            res.send(result)
        })
        })
        
        app.put('/:id', (req, res) => {
            let id=req.params.id;
            let r=req.body;
            console.log(r)
            let data  = {
                name:r.name,
                dept:r.dept,
                salary:parseInt(r.salary),
                doj:r.doj,
                email:r.email,
                phone:r.phone};
            Emp.updateOne({_id:id},data)
            .then((result)=>{res.send(result)})
            })
        
            app.patch('/status/:id', (req, res) => {
                let id=req.params.id;
                Emp.updateOne({_id:id},{$set:{active:req.body.active}}).then((result)=>{
                    res.send(result);  
                    })
                })
            
                app.patch('/image/:id',upload.single('image'), (req, res) => {
                    let id=req.params.id;
                    let img="http://localhost:3000/uploads/"+req.file.filename;
                    Emp.updateOne({_id:id},{$set:{image:img}})
                    .then((result)=>{ res.send(result); })
                })
                
              // http://localhost:3000/  
                app.listen(port, () => console.log(`Ready`))    


       // first steps
// initial steps for backend
// backend
// mkdir employee
// cd employee
// mkdir backend 
// cd backend 
// npm init
// npm i express mongoose body-parser cors multer
// mkdir uploads
// cls
      
       // second steps -> components -> routing works in main.jsx 
//  the steps for frontend -> 
// axios -> nodejs pe  kisi pe request ko bhejna hai uske ke use kerte  kerte hai like (post,patch)
// bootstrap -> desiging purpose , react-router-dom -> routing purpose
// npm create vite@latest [Choose name, React & Javascript]
// cd emp_curd
// npm install
// npm run dev
// ctrl + c
// npm i axios bootstrap
// npm i react-router-dom
// npm run dev
