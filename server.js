const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

// connect to database
MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} database.`)
        db = client.db(dbName)
    })
    .catch(err => {
        console.log(err)
    })


// server setup for all the things that the server is going to use for the things you need the server to do

app.set('view engine', 'ejs') // set application up to use ejs files
app.use(express.static('public')) // all the static files that the server is going to serve up   
// get the information that is sent along with the request from the application
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// routes
// load page
app.get('/', async (request, response) => {
    const todoItems = await db.collection('todo').find().toArray()
    const todoLeft = await db.collection('todo').countDocuments(
        {completed: false})
        response.render('index.ejs', {todoItem: todoItems, itemsLeft: todoLeft})
    // db.collection('todo').find().toArray()
    // .then(data => {
    //     response.render('index.ejs', {todoItem: data})
    // })
})

// add todo item
app.post('/createTodo', (request, response) => {
    db.collection('todo').insertOne({todo: request.body.todoItem, completed: false})
    .then(result => {
        console.log('Item added to the list')
        response.redirect('/')
    })
})

// delete todo item
app.delete('/deleteTodo', (request, response) => {
    db.collection('todo').deleteOne({todo: request.body.todoItem})
    .then(result => {
        console.log('Item removed from list.')
        response.json("Item removed from list")
    })
    .catch(err => {
        console.log(err)
    })
})

// mark todo item complete
app.put('/check', (request, response) => {
    db.collection('todo').updateOne({todo: request.body.todoItem}, {
        $set: {
            completed: true
        }
    })
    .then(result => {
        console.log('Todo item marked complete')
        response.json('Marked complete')
    })
    .catch(err => {
        console.log(err)
    })
})

// undo completed todo item
app.put('/unCheck', (request, response) => {
    db.collection('todo').updateOne({todo: request.body.todoItem}, {
        $set: {
            completed: false
        }
    })
    .then(result => {
        console.log('Item unchecked')
        response.json('Item unchecked')
    })
    .catch(err => {
        console.log(err)
    })
})

// set up server to listen
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})