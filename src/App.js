import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch.js";
import { TodoList } from "./TodoList.js";
import { TodoItem } from "./TodoItem.js";
import { CreateTodoButtom } from "./CreateTodoButtom";
//import './App.css';


const defaultTodos=[
    {text:'Cortar cebolla', completed:true},
    {text:'Tormar el curso de intro a react', completed:false},
    {text:'Llorar con la llorona', completed:false}
];


function App() {
    // Estado inicial de nuestros TODOs
    const [todos, setTodos] = React.useState(defaultTodos);
    // Cantidad de TODOs completados
    const completedTodos = todos.filter(todo => todo.completed).length;
    // Cantidad total de TODOs
    const totalTodos = todos.length;

    // El estado de nuestra búsqueda
    const [searchValue, setSearchValue] = React.useState('');
    // Creamos una nueva variable en donde guardaremos las coincidencias con la búsqueda
    let searchedTodos = [];
    // Lógica para filtrar
    if (!searchValue.length >= 1) {
        searchedTodos = todos;
    } else {
        searchedTodos = todos.filter(todo => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
        });
    }
    return (
    <>
        {/* Pasamos el estado a nuestro componente */}
        <TodoCounter
            total={totalTodos}
            completed={completedTodos}
        />    
        <TodoSearch 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
        />
        <TodoList>
        {/* Regresamos solamente los TODOs buscados */}
        {searchedTodos.map(todo => (
            <TodoItem
                key={todo.text}
                text={todo.text}
                completed={todo.completed}
            />
        ))}
        </TodoList>
        <CreateTodoButtom />      
    </>
);
}

export default App;
