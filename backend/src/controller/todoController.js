const todoModel = require('../model/todoModel')

const createTodo = async (req, res) =>{
    try{
        const {title, description} = req.body;
        if(!title || title.trim()===''){
            return res.status(400).json({
                error:"Title is required"
            });
        }

        const newTodo = await todoModel.createTodo(title, description);

        return res.status(201).json({
            message:"todo added succesfully",
            todo: newTodo
        });

    }catch(error){
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