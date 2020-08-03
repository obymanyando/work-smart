const functions = require('firebase-functions')
const app = require('express')()

const { 
    getAllTodos, 
    getOneTodo,
    createTodo, 
    deleteTodo, 
    editTodo,
} = require('./APIs/todos')

const { 
    loginUser,
    signUpUser,
 } = require('./APIs/users')

//todos
app.get('/todos', getAllTodos)
app.get('/todo/:todoId', getOneTodo)
app.post('/todo', createTodo)
app.delete('/todo/:todoId', deleteTodo)
app.put('todo/:todoId', editTodo)

//Users
app.post('/login', loginUser)
app.post('/signup', signUpUser)

exports.api = functions.https.onRequest(app)
