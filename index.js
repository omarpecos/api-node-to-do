require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

const toDoRouter = require('./routes/todo.routes');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/todo', toDoRouter);

app.listen( PORT ,() =>{

    mongoose.connect(process.env.MONGO_URI)
        .then(() =>{
            console.log('Connected to mongo!');
            console.log(`Running in http://localhost:${PORT}`);
        }).catch(() =>{
            console.log('Something failed with the BD')
        });

});