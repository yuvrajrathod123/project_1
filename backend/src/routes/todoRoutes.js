const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController')

router.post('/', todoController.createTodo);
router.get('/getAllTodos', todoController.getAllTodos);
router.get('/getTodo/:id', todoController.getTodo);

module.exports = router;