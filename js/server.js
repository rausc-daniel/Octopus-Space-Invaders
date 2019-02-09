const sqlite = require("sqlite3").verbose();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

const db = new sqlite.Database("database");

app.use(cors());

app.post("/setHighscore", (req, res) => {
    console.log(req.body);
    let data = req.body;
    let table = data["table"];
    let name = data["name"];
    let score = data["score"];
    db.run("CREATE TABLE IF NOT EXISTS " + table + "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, score INTEGER NOT NULL)");
    db.run("INSERT INTO " + table + "(name, score) VALUES('" + name + "', " + score + ");");
});

app.post("/getHighscores", (req, res) => {
    let data = req.body;
    let table = data["table"];
    let limit = data["limit"];
    res.writeHead(200, {"Content-Type": "application.json"});
    db.all("SELECT * FROM " + table + " ORDER BY score DESC LIMIT " + limit, [], (err, rows) => {
        if(err) {
            console.log(err);
            res.end(JSON.stringify({}));
        }
        if(rows) {
            console.log(rows);
            res.end(JSON.stringify(rows));
        }
    });
    
});

app.get("/test", (req, res) => {
res.writeHead(200, {"Content-Type": "application/json"});
res.end(JSON.stringify({name: "daniel"}));
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});
