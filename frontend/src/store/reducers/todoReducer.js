//A reducer is a function which have access to state and  also action which can be used to update state

//import { createSlice, asyncThunkCreator } from "@reduxjs/toolkit";
//import { nanoid } from "@reduxjs/toolkit";

//export const todoReducer = createSlice({
//    name: 'todos',
//    initialState: [],
//    reducers: {
//        addTodo: (state = [], actions) => {
        
//        const todo = {
//            id : nanoid(),
//            name : actions.payload.name,
//            author: actions.payload.author,
//            isComplete: false,
//            date: new Date(), 
//            }
//            state.push(todo)
//        }
//    }
//})

// export const {addTodo} = todoReducer.actions
// export default todoReducer.reducer

import { toast } from "react-toastify" 


const todoReducer = (state = [], action) => {
    switch (action.type){
        case "GET_TODOS":
            return action.todos.data
        case "ADD_TODO":
            toast.success("A todo was created...", {
                position: "bottom-right"
            })
            return [action.todo.data, ...state];
        case "UPDATE_TODO":
            toast.success("A todo was edited...", {
                position: "bottom-right"
            })
            state.map((todo) => {
                return todo._id === action.todo.data._id ? action.todo.data : todo
            });
        case "CHECK_TODO":
            toast.success("A todo status was changed...", {
                position: "bottom-right"
            })
            state.map((todo) => {
                return todo._id === action.todo.data._id ? action.todo.data : todo
            });
        case "DELETE_TODO":
            toast.success("A todo was deleted...", {
                position: "bottom-right"
            })
            state.filter((todo) => {
                return todo._id !== action.id
            });
            
            default:
                return state;
    }
};

export default todoReducer;