var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var ejs = require('ejs');


const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

app.set('view engine','ejs');

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    
    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }
    
    
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    
    return res.redirect('home_page.html')
    
})

app.post("/update",(req,res)=>{
    var category = req.body.im;
    var name = req.body.iname;
    var id = req.body.iid;
    var quantity = req.body.quan;
    var date = req.body.ddate;
    var quality = req.body.qua;
    var status = req.body.status;
    
    var des = {
        "category" : category,
        "name" : name,
        "iD" : id,
        "quantity" : quantity,
        "date" : date,
        "quality": quality,
        "status" : status
    }
    db.collection('stocks').insertOne(des,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Updated");
    });
    
    return res.redirect('last.html')
})
var userSchema = {
    name: String,
    email : String,
    phno : String,
    password : String
    
}
var stockSchema = {
    category: String,
    name: String,
    iD: String,
    quantity: String,
    date: String,
    quality: String,
    status: String
}

var User = mongoose.model('User',userSchema);

app.get('/user1',(req,res)=>{
    User.find({}, function(err, users) {
        res.render('userL',{
            usersList: users
        })
    })
})

var Stock = mongoose.model('Stock',stockSchema);

app.get('/stocks1',(req,res)=>{
    Stock.find({}, function(err, stocks) {
        res.render('stockL',{
            stocksList: stocks
        })
    })
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Omonrigin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on PORT 3000");


//npx nodemon index.js to run the server/
/*
Then after that search localhost 3000 in any browser

then from the c drive open the mongodb bin folder and use cmd
use mongod in one 
and mongo in other
in the 2nd one :
show dbs
use mybd
db.users.find().pretty()




var userSchema = {
    name: String,
    email : String,
    phno : String,
    password : String
    
}

var User = mongoose.model('User',userSchema);

app.get('/user1',(req,res)=>{
    User.find({}, function(err, users) {
        res.render('userL',{
            usersList: users
        })
    })
})
 */