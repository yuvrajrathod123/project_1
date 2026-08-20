const todoModel = require('../src/model/todoModel'); 
const todoController = require('../src/controller/todoController'); 
require('dotenv').config();

async function testGetAllTodos() {
    try{  
        console.log('satrt')
        const data = await todoModel.getTodo(1);
        //const data = await todoModel.createTodo('test','testing');
        console.log(`Data in the test file: ${JSON.stringify(data)}`);
    }catch(e){
        console.error(`Error in the function:  ${e.message}`);
    };
}


async function testGetAllTodosController(params) {
    try{
        console.log("Star in tets")
        
        var req = {
            params: {
                id: "1"
            }
        };

        var res = {
            status: function(code) {
                console.log("Status:", code);
                return this;
            },
            json: function(data) {
                console.log("Response:", data);
                return this;
            }
        };

        const data = await todoController.getTodo(req, res);

        //console.log(data);

    }catch(e){
        console.error( `Error occured: ${e.message}`);
    }
    
}

// Run the test
//testGetAllTodos();
testGetAllTodosController()