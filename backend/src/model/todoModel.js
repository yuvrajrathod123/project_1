const pool = require('../config/db')

const createTodo = async (title, description) =>{
    try{ 
        const query ='insert into todos(title, description, completed) values ($1, $2, false) RETURNING *;';
        const result = await pool.query(query, [title, description]);
        console.log(result);
        return result.rows[0];
    }catch(e){
        throw new Error(`Database error: ${e.message}`);
    }
}

const getAllTodos = async(req, res) =>{
    try{
        const query ='select title, description, completed from todos order by created_at desc;';
        const result = await pool.query(query);
       // console.log(`in model: ${JSON.stringify(result.rows)}`);
        return result.rows;
    }catch(e){
        throw new Error(`Database error: ${e.message}`)
    }
}

const getTodo = async (id) =>{
    try { 
        const query = `select title, description, completed from todos where id=${id};`;
        const result = await pool.query(query);
        //console.log(`Result in getTodo: ${JSON.stringify(result)}`)
         //console.log(`=====================================================================`)
        return result.rows;
    } catch (e) {
        console.log(`Error occured in getTodo model: ${e.message}`);
        
    }

}


module.exports = {createTodo, getAllTodos, getTodo};