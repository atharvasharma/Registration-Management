const express=require('express');
const app=express();
const cors = require('cors');
const multer = require("multer");
const morgan = require('morgan');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
const Entry = require('./models/Entry');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate=require('./authenticate');
var User=require('./models/User');

/* Middlewares */
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));
app.use(morgan('dev'));
app.use(session({
    name:'session-id',
    secret:'registrationApp',
    saveUninitialized:false,
    resave:false,
    store:new FileStore()
}));
app.use(passport.initialize());
app.use(passport.session());



/* Connecting to Database */
const urlDB='mongodb+srv://atharva:registration@cluster0.syfmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const connect=mongoose.connect(urlDB,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
connect.then((db)=>{
    console.log("Connected to DB successfully")
},(err)=>{console.log(err);});



/* Setting up Multer */
const fileFilter = (req,file,cb) =>{
    if(file.mimetype ==='image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null,true);
    }else{
        cb(new Error("File format is incorrect"),false);
    }
}

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
    }
});
const upload=multer({storage:storage,fileFilter:fileFilter});

/* Auth Routes */

app.post("/signup",(req,res,next)=>{
    
    User.register(new User ({username:req.body.username}),req.body.password,(err,user)=>{
        if(err){
            res.statusCode=500;
            res.setHeader('Content-Type','application/json');
            res.json({err:err});
        }
        else{
            passport.authenticate('local')(req,res,()=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json({success:true,status:'Sign Up Successful'});
            })
        }
    })
})

app.post("/login",passport.authenticate('local'),(req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({success:true,status:'You have logged in'})
})

app.get("/logout",(req,res)=>{
    if(req.session){
        req.session.destroy();
        res.clearCookie('session-id');
        res.statusCode=200;
        res.json({success:true,status:"Logout Successful"});
       /// res.redirect("/");
    }else{
       // console.log("ran");
        var err = new Error("You are not logged in");
        err.status=403;
        res.json({err:err});
    }
})

/* Routes */
app.post("/register",upload.single('id'),function(req,res){
    console.error("ram");
    const entry={
        fullName:req.body.fullName,
        mobile:req.body.mobile,
        email:req.body.email,
        registrationType:req.body.registrationType,
        numberOfTickets:req.body.numberOfTickets,
        idImage:req.file.path
    }
    console.log(entry);
    Entry.create(entry)
        .then((createdEntry)=>{
           // console.log(createdEntry);
            res.statusCode=201;
            res.setHeader('Content-Type','application/json');
            res.json(createdEntry);
        },(err)=>{
           // console.error(err);
            res.status(409).send({error:err});
        })
        .catch((err)=>{
           // console.error(err);
            res.status(422).send({error:err});
        })
})






app.get("/",function(req,res){

    Entry.find({})
        .then((entries) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(entries);
        },(err)=>{
            res.status(404).send({error:err});
        })
        .catch(()=>{
            res.status(404).send({error:err});
        })
})





const PORT=process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log("Server started on PORT: "+PORT);
})
    
