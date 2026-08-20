const pool = require('../config/db')
const logger = require('../utils/logger')

const createTodo = async (title, description) =>{
    try{ 
        const query ='insert into todos(title, description, completed) values ($1, $2, false) RETURNING *;';
        logger.debug('Executing database query', {
            query: 'INSERT INTO todos',
            title: title,
        });

        const result = await pool.query(query, [title, description]);

            // Log success
        logger.info('Database insert successful', {
            todoId: result.rows[0].id,
            affectedRows: result.rowCount,
        });

        return result.rows[0];
    }catch(error){
        logger.error('Database query failed', {
            error: error.message,
            query: 'INSERT INTO todos',
            sqlState: error.code,
            detail: error.detail,
        });
        throw new Error('Database error: ${error.message}');
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