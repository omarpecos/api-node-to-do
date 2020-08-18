require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const toDoRouter = require('./routes/todo');

const app = express();

app.use(express.static('./public'));

    // https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition : {
        info : {
            title : 'My ToDo API',
            description : 'Simple API with Node/Express using async/await',
            contact : {
                name : 'Omar PV'
            },
            servers : ['http://localhost:3000']
        }
    },
    // ['routes/*.js'] o ['index.js']
    apis : ['./routes/*.js']
    
}

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/todo', toDoRouter);

//test Doc
/**
 * @swagger
 * /test:
 *  get:
 *      description: test
 *      responses:
 *          '200':
 *              description : Succesful response
 
app.get('/test', (req,res) =>{
    res.status(200).json({msg : 'text'});
}) */


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.listen( PORT ,() =>{

    mongoose.connect(process.env.MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() =>{
            console.log('Connected to mongo!');
            console.log(`Running in http://localhost:${PORT}`);
        }).catch(() =>{
            console.log('Something failed with the BD')
        });

});