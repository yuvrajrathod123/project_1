const pool = require('../config/db')

const createTodo = async (title, description) =>{
    try{ 
        const query ='insert into todos(title, description, completed) values ($1, $2, false) RETURNING *;';
        const result = await pool.query(query, [title, description]);
        console.log(result);
        return result.rows[0];
    }catch(error){
        throw new Error('Database error: ${error.message}');
    }
}


module.exports = {createTodo};