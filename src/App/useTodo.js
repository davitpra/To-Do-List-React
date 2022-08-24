
import React from "react";
import { useLocalStorage } from "./useLocalStrorage";


function useTodo () {
    
    const {
        item:todos,
        saveItem:saveTodos,
        sincronizeItem: sincronizeTodos,
        loading,
        error,
    } = useLocalStorage("TODOS_V1", [])

    // El estado de nuestra búsqueda
    const [searchValue, setSearchValue] = React.useState('');
    //Logica para abrir y cerrar nuestro modal
    const [openModal, setOpenModal] = React.useState(false);

    // Cantidad de TODOs completados
    const completedTodos = todos.filter(todo => todo.completed).length;
    // Cantidad total de TODOs
    const totalTodos = todos.length;


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

    // Logica para añadir un Todo
    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            completed: false,
            text,
        })
        saveTodos(newTodos);
    };

    // Logica para cambiar las tareas a completado o descompletado
    const toggleCompleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos(newTodos);
    };

    // Logica para eliminar tareas de la lista 
    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };



    return {
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            addTodo,
            toggleCompleteTodo,
            deleteTodo,
            openModal,
            setOpenModal,
            sincronizeTodos,
        }
}
export {useTodo};