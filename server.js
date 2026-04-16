const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;
const DB_PATH = path.join(__dirname, 'Students.db');
const db = new sqlite3.Database(DB_PATH);


db.run(
    `CREATE TABLE IF NOT EXISTS Students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nev TEXT,
    osztaly TEXT
    )`
);


app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post('/submit', (req,res) => {
    const { nev, osztaly } = req.body;
    
    db.run(
        `INSERT INTO Students (nev, osztaly)
         VALUES (?, ?)`,
        [
          nev,
          osztaly
        ],
    );
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});