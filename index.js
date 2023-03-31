const connection = require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.get("/employees/", (req, res) => {
    connection.query("SELECT * FROM employee", [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);     
        } else {
            res.send(rows);
        }
    });
});

app.get("/employees/:id/", (req, res) => {
    connection.query("SELECT * FROM employee WHERE id=?", [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);     
        } else {
            res.send(rows);
        }
    });
});

app.post("/employees/", (req, res) => {
    const emp = req.body;
    const empData = [emp.name, emp.salary];
    connection.query("INSERT INTO employee(name,salary) values(?)", [empData], (err, rows) => {
        if (err) {
            console.log(err);     
        } else {
            res.send(rows);
        }
    });
});

app.put("/employees/", (req, res) => {
    const emp = req.body;
    connection.query("UPDATE employee SET ? WHERE id="+emp.id,[emp], (err, rows) => {
        if (err) {
            console.log(err);     
        } else {
            if (rows.affectedRows == 0) {
                const emp = req.body;
                const empData = [emp.name, emp.salary];
                connection.query("INSERT INTO employee(name,salary) values(?)", [empData], (err, rows) => {
                    if (err) {
                        console.log(err);     
                    } else {
                        res.send(rows);
                    }
                });
            } else {
            res.send(rows);
            }
        }
    });
});

app.delete("/employees/:id/", (req, res) => {
    connection.query("DELETE FROM employee WHERE id=?", [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);     
        } else {
            res.send(rows);
        }
    });
});


app.listen(3000, () => {
    console.log("Express Server is Running");
});