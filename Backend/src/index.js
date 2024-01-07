const express = require("express");
require('dotenv').config();
const app = new express();
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

require("./db/conn");
const Students = require("./models/Students");

//login and signup api
app.get("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const Student = await Students.findOne({ email });
        if (!Student) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, Student.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ studentId: Student._id }, process.env.SECRET_KEY , {
            expiresIn: '48h',
        });
        res.status(200).json({ token });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

//create student with async

app.post("/register", async (req, res) => {
    try {
        const { username, email, gender, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const student = new Students({ username, email, gender, password: hashedPassword });
        const result = await student.save();
        res.status(201).send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

//app listen
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`listen port ${port}`);
});