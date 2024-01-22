const express = require('express') ;
const app = express() ;
const cors = require('cors') ;
const pool = require("./db.js");


// middlewares
app.use(express.json({ limit: '10mb' }));
app.use(cors({
	origin: "*",
	credentials: true
}))




// routes

// test

app.get("/test",async (req,res)=>{
    res.status(200).json({
        success: true,
        message: "Yo its working"
    })
})

// create todo
app.post("/create/todo", async (req,res) => {
    try{
        const { description } = req.body ;
    
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        );

        res.status(200).json({
            success: true,
            todo: newTodo.rows[0]
        })        

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// get all todos
app.get("/get/todos", async (req,res) => {
    try{
    
        const todos = await pool.query(
            "SELECT * FROM todo"
        );

        res.status(200).json({
            success: true,
            todos: todos.rows
        })        

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// get a todo 
app.get("/get/todo/:todo_id", async (req,res) => {
    try{

        const { todo_id } = req.params ;
    
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",[todo_id]
        );

        res.status(200).json({
            success: true,
            todos: todo.rows
        })        

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// update a todo
app.put("/update/todo/:todo_id", async (req,res) => {
    try{

        const { todo_id } = req.params ;
        const { description } = req.body ;
    
        const todo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", [description, todo_id]
        );

        res.status(200).json({
            success: true,
            message: "todo updated"
        
        })        

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


// delete a todo 
app.delete("/delete/todo/:todo_id", async (req,res) => {
    try{

        const { todo_id } = req.params ;
    
        const todo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1 ",[todo_id]
        );

        res.status(200).json({
            success: true,
            todos: "todo deleted"
        })        

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})





app.listen(5000, ()=>{
    console.log(`server is running on port 5000`) ;
})


// Parse the connection string
const connectionString = "postgres://default:KFes1UxZT9aJ@ep-frosty-smoke-78032495.us-east-1.postgres.vercel-storage.com:5432/verceldb";
const { username, password, host, port, database } = new URL(connectionString);

console.log({ username, password, host, port, database }) ;