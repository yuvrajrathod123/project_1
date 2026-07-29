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


module.exports = {createTodo};