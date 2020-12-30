const {Router}  = require("express");
const toDo = require("../models/todo.model");

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: ToDo's
 *   description: TODO management
 */

/**
 * @swagger
 * /api/todo:
 *  get:
 *      summary: Get all the toDo's
 *      tags: [ToDo's]
 *      responses:
 *          '200':
 *              description : Succesful response
 */
router.get('/', async (req,res) =>{

    try{
        const todos = await toDo.find({}).sort('-_id');

        res.json({
            status : 'ok',
            todos
        });
    }catch(e){
        console.log(e.message);
        res.json({
            status : 'fail',
            error : e.message
        });
    }
   
});

/**
 * @swagger
 * /api/todo:
 *  post:
 *      summary: Create new toDo
 *      tags: [ToDo's]
 *      parameters:
 *        - in: body
 *          name: body
 *          schema:
 *            type: object
 *            properties: 
 *               title:
 *                 type: string
 *                 example: title
 *               text:
 *                 type: string
 *                 example: text
 *          required: true
 *          description: Title and Text of the toDo
 *      responses:
 *          '200':
 *              description : Succesful response
 */
router.post('/', async (req,res) =>{
    let body = req.body;
        //console.log(body);

    try{
       
        if (!body){
            res.json({
                status : 'fail',
                todo : null
            });
        }

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
        console.log(e.message);
        res.json({
            status : 'fail',
            error : e.message
        });
    }
});

/**
 * @swagger
 * /api/todo/{id}:
 *  put:
 *      summary: Edit selected toDo
 *      tags: [ToDo's]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Id of the toDo to be edited
 *        - in: body
 *          name: body
 *          schema:
 *            type: object
 *            properties: 
 *               title:
 *                 type: string
 *                 example: title
 *               text:
 *                 type: string
 *                 example: text
 *          required: true
 *          description: Title and Text of the toDo
 *      responses:
 *          '200':
 *              description : Succesful response
 */
router.put('/:id', async (req,res) =>{
    let body = req.body;
    try{
       
       const todo = await toDo.findByIdAndUpdate(req.params.id, body ,{new : true});

       if (!todo){
            throw new Error('404');
       }
        res.json({
            status : 'ok',
            todo
        });

    }catch(e){
        console.log(e.message);
        res.json({
            status : 'fail',
            error : e.message
        });
    }
});

/**
 * @swagger
 * /api/todo/{id}:
 *  delete:
 *      summary: Delete selected toDo
 *      tags: [ToDo's]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Id of the toDo to be removed
 *      responses:
 *          '200':
 *              description : Succesful response
 */
router.delete('/:id', async (req,res) =>{

    try{

        let id = req.params.id;

        const todo = await toDo.findByIdAndDelete(id);
    
        if (!todo){
            throw new Error('404');
       }

        res.json({
            status : 'ok',
            todo
        });

    }catch(e){
        console.log(e.message);
        res.json({
            status : 'fail',
            error : e.message
        });
    }

})



module.exports = router;