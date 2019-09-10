const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");
var app = express();

const SELECT_ALL_QUERY = "SELECT * FROM covek";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "infiniteminds123",
  database: "covek"
});

db.connect(err => {
  if (err) {
    console.log("DB connection failed ");
  } else {
    console.log("DB connection succeded!");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/vratisve", (req, res) => {
  db.query(SELECT_ALL_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: result
      });
    }
  });
});

app.delete("/brisi/:id", (req, res) => {
  var id = req.params.id;
  console.log(id);
  db.query("DELETE FROM covek WHERE id = ?", [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Uspeh!");
    }
  });
});

app.post("/novicovek", (req, res) => {
  let covek = { ime: req.body.ime, prezime: req.body.prezime };
  let sql = "INSERT INTO covek SET ?";
  db.query(sql, covek, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      console.log("Uspeh!");
    }
  });
});

app.put("/update/:id", (req, res) => {
  let ime = req.body.ime;
  let prezime = req.body.prezime;
  console.log(ime);
  console.log(prezime);
  let sql = `UPDATE covek SET ime='${ime}', prezime='${prezime}' WHERE id=?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Uspeh bre!");
    }
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
