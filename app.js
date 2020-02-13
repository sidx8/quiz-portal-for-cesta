var express= require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const {Register,validate}= require('./register');
const {Team,validateTeam}= require('./team');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect('mongodb://localhost:27017/glitch', {useNewUrlParser: true});


//adding css files to the node server.
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.json());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index");
});

app.get("/register", function(req, res){
	res.render("register");
});

app.post('/register',async (req,res)=>{
    const {error}= validate(req.body);//result.error(joi package)
    if(error)
        return res.status(400).send(error.details[0].message);
    
    const register= new Register({
        name: req.body.name,
		member1: req.body.member1,
		member2: req.body.member2,
    });
    
    await register.save();
    
    res.redirect("/");
});

app.get("/quiz", function(req, res){
	res.render("questions_round1");
});

app.get("/quiz/final", function(req, res){
	res.render("questions_round2");
});

app.post('/submit',async (req,res)=>{
    const {error}= validateTeam(req.body);//result.error(joi package)
    if(error)
        return res.status(400).send(error.details[0].message);
    
    const team= new Team({
        teamName: req.body.teamName,
        points: req.body.points
    });
    
    await team.save();
    
    res.send({link:'/'});
});

app.get("/:randomText", function(req, res){
	res.render("other");
});

//LISTNING PORT INFORMATION
 app.listen(3000, "0.0.0.0", function(){
	console.log("Server is live at port 3000");
 });
