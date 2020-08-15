const {Router}  = require("express");
const toDo = require("../models/todo.model");

const router = new Router();

router.get('/', async (req,res) =>{

    try{
        const todos = await toDo.find({});

        res.json({
            status : 'ok',
            todos
        });
    }catch(e){
        console.error(e.message);
        res.json({
            status : 'fail',
            error : e.message
        });
    }
   
});

router.post('/', async (req,res) =>{
    let body = req.body;
    try{
       
        const todo =  new toDo({
            title : body.title,
            text : body.text
        });

        await todo.save();

        res.json({
            status : 'ok',
            todo
        });

    }catch(e){
        console.error(e.message);
        res.json({
            status : 'fail',
            error : e.message
        });
    }
});

router.put('/:id', async (req,res) =>{
    let body = req.body;
    try{
       
       const todo = await toDo.findByIdAndUpdate(req.params.id, body ,{new : true});

       if (!todo){
            res.json({
                status : 'fail',
                error : '404'
            });
       }
        res.json({
            status : 'ok',
            todo
        });

    }catch(e){
        console.error(e.message);
        res.json({
            status : 'fail',
            error : e.message
        });
    }
});

router.delete('/:id', async (req,res) =>{

    try{

        let id = req.params.id;

        const todo = await toDo.findByIdAndDelete(id);
    
        if (!todo){
            res.json({
                status : 'fail',
                error : '404'
            });
       }
        res.json({
            status : 'ok',
            todo
        });

    }catch(e){
        console.error(e.message);
        res.json({
            status : 'fail',
            error : e.message
        });
    }

})



module.exports = router;