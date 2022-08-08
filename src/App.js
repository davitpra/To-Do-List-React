import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch.js";
import { TodoList } from "./TodoList.js";
import { TodoItem } from "./TodoItem.js";
import { CreateTodoButtom } from "./CreateTodoButtom";
//import './App.css';
const todos=[
    {text:'Cortar cebolla', completed:false},
    {text:'Tormar el curso de intro a react', completed:false},
    {text:'Llorar con la llorona', completed:false}
];
function App() {
    return (
    <>
        <TodoCounter />    
        <TodoSearch />
        <TodoList>
        {todos.map(todo =>(<TodoItem key={todo.text} text={todo.text} />))}
        </TodoList>
        <CreateTodoButtom />      
    </>
);
}

export default App;
