const express = require("express");
require('dotenv').config();
const app = new express();
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

require("./db/conn");
const Students = require("./models/Students");

app.get("/", (req, res) => {
    res.send("This is a Node JS server")
})

//login and signup api
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const Student = await Students.findOne({ email });
        if (!Student) {
            return res.status(401).json({ error: 'Data you provide is wrong, Please check once' });
        }
        
        const passwordMatch = await bcrypt.compare(password, Student.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password is not match, please check once' });
        }
        if(!Student.approve){
            return res.status(403).json({ error: 'Contanct Admin to Approve Login' });
        }
        const token = jwt.sign({ studentId: Student._id }, process.env.SECRET_KEY , {
            expiresIn: '48h',
        });
        res.status(200).json({ token, Student });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

//create student with async
app.post("/register", async (req, res) => {
    try {
        const { username, email, gender, role, approve, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const student = new Students({ username, email, gender, role, approve, password: hashedPassword });
        const result = await student.save();
        res.status(201).send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

// New API to get all users except admins
app.get("/students", async (req, res) => {
    try {
        const users = await Students.find({ role: { $ne: "admin" } });
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

app.put('/students/approve/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedDoc = await Students.findByIdAndUpdate(
        id,
        { $set: { "approve" : true } },
        { new: true, runValidators: true } // Return the updated document, enforce validation
      );
  
      if (!updatedDoc) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.json(updatedDoc);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.delete('/students/:id', async (req, res) => {
    try {
      const studentId = req.params.id;
  
      const ObjectId = mongoose.Types.ObjectId;
      if (!ObjectId.isValid(studentId)) {
        return res.status(400).json({ error: 'Invalid student ID' });
      }
  
      const result = await Students.deleteOne({ _id: studentId });
  
      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Student deleted successfully' });
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

//app listen
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`listen port ${port}`);
});