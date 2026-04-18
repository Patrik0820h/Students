const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;
const DB_PATH = path.join(__dirname, 'Students.db');
const db = new sqlite3.Database(DB_PATH);
const fs = require('fs');


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
    res.sendFile(path.join(__dirname, "../Client/index.html"));
})
app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/app.js"));
})
app.get('/style1.css', (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/style1.css"));
})

app.post('/submit', (req,res) => {
    const { nev, osztaly } = req.body;
    
    db.run(
        `INSERT INTO Students (nev, osztaly) VALUES (?, ?)`, [nev,osztaly], (err) => {
            res.sendStatus(200);
        }
    );
})

app.get('/liststudents', (req, res) => {
    db.all(`SELECT * FROM Students ORDER BY CAST(substr(osztaly, 1, length(trim(osztaly)) - 1) AS INTEGER),lower(substr(trim(osztaly), -1))`,[],(err, rows) => {
            fs.writeFile("Students.json",JSON.stringify(rows || [], null, 2),(error) => {
                    res.json(rows);
                }
            );
        }
    );
});

app.get('/students', (req,res) => {
    res.sendFile(path.join(__dirname, "../Client/students.html"))
})
app.get('/students.js', (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/students.js"));
})
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/style.css"));
})


app.put('/students/:id', (req, res) => {
    const { nev, id } = req.body;

    db.run("UPDATE students SET nev = ? WHERE id = ?", [nev, id], (err) => {
        res.sendStatus(200);
    });
});

app.delete('/students/:id', (req, res) => {
    const { id } = req.body;

    db.run("DELETE FROM students WHERE id = ?", [id], (err) => {
        res.sendStatus(200);
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});