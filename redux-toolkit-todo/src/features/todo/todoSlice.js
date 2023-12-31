import { createSlice, nanoid } from '@reduxjs/toolkit';

// initialState can be array or object also, we take object

const initialState = {
    // this todos will be shown inside Redux-Devtools .. inside reducer name
    todos: [
        {
            id: "",
            text: "",
            isCompleted: false
        }
    ]
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: initialState ,
    reducers:{
        // state is current state, 
        addTodo: (state, action)=>{

            const todo = {
                id: nanoid(),
                isCompleted: false,
                text: action.payload,
            }// this is the structure of our initialState
            state.todos.push(todo)
        },

        removeTodo: (state, action)=>{
            state.todos = state.todos.filter((eachTodo)=>eachTodo.id != action.payload)
        },

        updateTodo: (state, action)=>{
            // console.log('action', action)
            state.todos = state.todos.map((eachTodo)=> eachTodo.id === action.payload.id ? action.payload : eachTodo )
        },

        toggleComplete: (state, action)=>{
            console.log('action', action)
            state.todos = state.todos.map((prevTodo)=> prevTodo.id === action.payload.id ? ({...prevTodo, isCompleted: !prevTodo?.isCompleted }) : prevTodo);
        }
    }
})
export const {addTodo, removeTodo, updateTodo, toggleComplete} = todoSlice.actions      // this will be used in components
export default todoSlice.reducer                            // this is used in store.js


/* 
    Redux principle says that we must not mutate state directly..
    if we update obj or array we first spread all previous values and then update.
    inside reduxt toolkit we have got immer library.. it take care of all that,,

    now we can mutate state directly, without spread previous values
*/