const todoModel = require('../model/todoModel');
const logger = require('../utils/logger')

const createTodo = async (req, res) =>{
    try{
        const {title, description} = req.body;
        if(!title || title.trim()===''){

            logger.warn('Todo creation failed - Title missing', {ip:req.ip, requestbody:req.body});
            return res.status(400).json({
                error:"Title is required"
            });
        }

        logger.info('Creating new todo', {title:title, description:description});
        const newTodo = await todoModel.createTodo(title, description);
        logger.info('Todo added succesfully',{todoId:newTodo.id, title:newTodo.id, completionTime: new Date().toISOString()})

        return res.status(201).json({
            message:"Todo added succesfully",
            todo: newTodo
        });

    }catch(error){
        logger.error('Error creating todo', {error:error.message, stack:error.stack, requestbody:req.body})
        console.error('Error creating todo', error);
        res.status(500).json({
            error:error.message
        });
    }    
};

module.exports = {createTodo};