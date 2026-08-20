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


const getAllTodos = async (req, res)=>{
    try{
        console.log("In getAllDos")

        const allTodos = await todoModel.getAllTodos();
        //console.log(allTodos);

        console.log("Fetched the data");

        
        return res.status(200).json({
            message: "Fetched Todos Successfully",
            todos: allTodos
        });


    }catch(e){
        console.error(`Error occured while fetching todos ${e.message}`);
        res.status(500).json({
            Error:e.message
        })
    }

};


const getTodo = async (req, res)=>{
    try{
        console.log("In getAllDos")
        const {id} = req.params;

        console.log("Request:", req);

        const Todo = await todoModel.getTodo(id);
        //console.log(allTodos);

        console.log("Fetched the data");

        
        return res.status(200).json({
            message: "Fetched Todos Successfully",
            todos: Todo
        });


    }catch(e){
        console.error(`Error occured while fetching todo ${e.message}`);
        res.status(500).json({
            Error:e.message
        })
    }

};

module.exports = {createTodo, getAllTodos, getTodo};