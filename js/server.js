const sqlite = require("sqlite3").verbose();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

const db = new sqlite.Database("database");

let table = "";
let limit = 0;

app.use(cors());


app.post("/register", (req, res) => {
    //console.log(req.body);
    let data = req.body;
    table = data["table"];
    limit = data["amount"]
    db.run("CREATE TABLE IF NOT EXISTS " + table + "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, score INTEGER NOT NULL);");
});

app.post("/", (req, res) => {
    let data = req.body;
    let name = data["name"];
    let score = data["score"];
    db.run("INSERT INTO " + table + "(name, score) VALUES('" + name + "', " + score + ");");
});

app.get("/", (req, res) => {
    let result = "";
    db.all("SELECT * FROM " + table + " ORDER BY score DESC LIMIT " + limit, [], (err, rows) => {
        if(err)
            console.log(err);
        if(rows) {
            console.log(JSON.stringify(rows));
            res.writeHead(200, {"Content-Type": "application.json"});
            res.end(JSON.stringify(rows));
        }
    });
    
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});