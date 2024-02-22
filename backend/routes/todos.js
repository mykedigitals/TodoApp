const auth = require("../middleware/auth")
const { Todo } = require("../models/todo")
const express = require("express")
const { route } = require("express/lib/application")
const joi = require("joi")

const router = express.Router()

router.get("/", auth, async(req, res) => {
    try{
        const todos = await Todo.find()
        .sort({date: -1})
        const filteredTodos = todos.filter(todo => todo.uid === req.user._id)

        res.send(filteredTodos)
    } catch(error){
        res.status(500).send(error.message);
        console.log(error.message)
    }
})

router.post("/", auth, (req, res) => {
    const schema = joi.object({
        name: joi.string().min(3).max(200).required(),
        author: joi.string().min(3).max(30),
        uid: joi.string(),
        isComplete: joi.boolean(),
        date: joi.date()
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)
    
    const { name, author, isComplete, date, uid } = req.body
    
    let todo = new Todo({
        name,
        author,
        isComplete,
        date,
        uid,
    })
    todo.save().then(todo => {
        res.send(todo)
    }).catch(error => {
        console.log(error.message)
    })
});

router.put("/:id", auth, async( req, res ) => {
    //"put" involves replacing existing document, so it requires validation
    const schema = joi.object({
        name: joi.string().min(3).max(200).required(),
        author: joi.string().min(3).max(30),
        uid: joi.string(),
        isComplete: joi.boolean(),
        date: joi.date()
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    //checking if a particular id exists
    try {
        const todo = await Todo.findById(req.params.id)
    
    if (!todo)
    return res.status(404).send("Todo not found...")

    if (todo.uid !== req.user._id)
    return res.status(401).send("Todo Update Failed. Not authorized...")

    const { name, author, isComplete, date, uid } = req.body;

    //This get the Edited Todo list
    
        const updatedTodo = await Todo.findByIdAndUpdate(
    
        req.params.id,
        {
            name,
            author,
            isComplete,
            date,
            uid,
        },
        {new: true}
        );
        res.send (updatedTodo);
    } catch(error) {
        res.status(500).send(error.message);
        console.log(error.message)
    }
});
    

router.patch("/:id", auth, async( req, res ) => {
    try {
        const todo = await Todo.findById(req.params.id)
        
        if (!todo) return res.status(404).send("Todo not found...")

        if (todo.uid !== req.user._id)
        return res.status(401).send("Todo Check/Uncheck Failed. Not authorized...")
        
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
            isComplete: !todo.isComplete,
        }, {new: true});
        
        res.send(updatedTodo)
    } catch(error){
        res.status(500).send(error.message);
        console.log(error.message)
    }
})

router.delete("/:id", auth, async( req, res ) => {
    try {
        const todo = await Todo.findById(req.params.id)
        
        if (!todo) return res.status(404).send("Todo not found...")

        if (todo.uid !== req.user._id)
        return res.status(401).send("Todo Deletion Failed. Not authorized...")

        const deletedTodo = await Todo.findByIdAndDelete(//property goes here
        req.params.id)
        
        res.send(deletedTodo)
    } catch(error){
        res.status(500).send(error.message)
        console.log(error.message)
    }
})
    // methods to delete
    //deleteOne
    //deleteMany
    //findByIdAndDelete

    //const todo = await Todo.deleteOne({//property goes here
    // isComplete: true})

    // res.send(todo)
//})

// const todo = await Todo.deleteMany({//property goes here
   // isComplete: false})

    //res.send(todo)
// })


module.exports = router