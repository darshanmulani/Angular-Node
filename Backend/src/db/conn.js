const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Darshan:Darshan123@cluster0.tgjvsx7.mongodb.net/AngularCRUD?retryWrites=true&w=majority").then(() => {
    console.log("connection succuesfull....");
})
    .catch((err) => {
        console.log(err);
    });