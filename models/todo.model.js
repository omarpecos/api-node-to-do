const {Schema, model} = require("mongoose");

const toDoSchema = new Schema({
    'title' : String,
    'text' : String,
    'date' : {type : Date , default : Date.now}
});

const toDo = new model('toDo',toDoSchema);

module.exports = toDo;