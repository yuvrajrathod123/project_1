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

module.exports = {createTodo};