require('dotenv').config()
var bodyParser = require("body-parser")
let express = require('express');
let app = express();
static_path = __dirname + "/public"

app.use(middlewareFunc)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/public", express.static(static_path));
app.get("/", hiExpress);
function hiExpress(req, res) {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath)
}

msg = {
    "message": "Hello json"
}

app.get("/json", (req, res)=>{
    msg.message = process.env.MESSAGE_STYLE === "uppercase" ? msg.message.toUpperCase() : msg.message;
    res.json(msg);
})

function middlewareFunc(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
}

app.get("/now", function(req, res, next){
    req.time = {"time": new Date().toString()};
    next();
}, function(req, res){
    res.json(req.time);
})

app.get("/:word/echo", (req, res)=>{
    res.json({"echo": req.params.word});
})

app.route("/name")
    .get((req, res)=>{
        res.json({"name": req.query.first + " " + req.query.last})
    })
    .post((req, res)=>{
        res.json({"name": req.body.first + " " + req.body.last})
    })


































 module.exports = app;
