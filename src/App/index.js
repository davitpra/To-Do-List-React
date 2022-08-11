import React from "react";
import { AppUI } from "./AppUI";

function App() {
    // Traemos nuestros TODOs almacenados
    const localStorageTodos = localStorage.getItem('TODOS_V1');
    let parsedTodos;

    if (!localStorageTodos) {
      // Si el usuario es nuevo no existe un item en localStorage, por lo tanto guardamos uno con un array vacío
        localStorage.setItem('TODOS_V1', JSON.stringify([]));
        parsedTodos = [];
    } else {
      // Si existen TODOs en el localStorage los regresamos como nuestros todos
        parsedTodos = JSON.parse(localStorageTodos);
    }


    // Guardamos nuestros TODOs del localStorage en nuestro estado
    const [todos, setTodos] = React.useState(parsedTodos);
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
    };

    // Creamos la función en la que actualizaremos nuestro localStorage
    const saveTodos = (newTodos) => {
    // Convertimos a string nuestros TODOs
    const stringifiedTodos = JSON.stringify(newTodos);
    // Los guardamos en el localStorage
    localStorage.setItem('TODOS_V1', stringifiedTodos);
    // Actualizamos nuestro estado
    setTodos(newTodos);
    };

    // Logica para cambiar las tareas a completado o descompletado
    const toggleCompleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
        saveTodos(newTodos);
    };

    // Logica para eliminar tareas de la lista 
    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
        saveTodos(newTodos);
    };

    return (
    <>
    <AppUI
        totalTodos={totalTodos}
        completedTodos={completedTodos}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchedTodos={searchedTodos}
        completeTodo={toggleCompleteTodo}
        deleteTodo={deleteTodo}
    />        
    </>
);
}

export default App;
