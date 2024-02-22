//A reducer is a function which have access to state and  also action which can be used to update state

import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "./todoReducer";
import authReducer from "./authReducer";
//import userReducer from "./reducer/userReducer"


const rootReducer = configureStore({
    reducer: {
        todos: todoReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export default rootReducer;