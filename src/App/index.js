import React from "react";
import { AppUI } from "./AppUI";

function useLocalStorage (itemName, initialValue) {
      // Creamos el estado inicial para nuestros errores y carga
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true)

    // Creamos el estado inicial de item
    const [item, setItem] = React.useState(initialValue);
    
    React.useEffect ( ()=> {
        // Simulamos un segundo de delay de carga 
        setTimeout (()=>{
            // Manejamos la tarea dentro de un try/catch por si ocurre algún error
            try {
                // Traemos nuestros TODOs almacenados
                const localStorageItem = localStorage.getItem(itemName);
                let parsedItem;
                
                if (!localStorageItem) {
                
                    // Si el usuario es nuevo no existe un item en localStorage, por lo tanto guardamos uno con un array vacío
                    localStorage.setItem(itemName, JSON.stringify(initialValue));
                    parsedItem = initialValue;
                } else {
                    // Si existen TODOs en el localStorage los regresamos como nuestros todos
                    parsedItem = JSON.parse(localStorageItem);
                } 
                setItem (parsedItem)
            } catch (error) {
                // En caso de un error lo guardamos en el estado
                setError(error);
            } finally {
                // También podemos utilizar la última parte del try/cath (finally) para terminar la carga
                setLoading(false);
            }
        },1000);
    },[]
    );
    
    // Creamos la función en la que actualizaremos nuestro localStorage
    const saveItem = (newItem) => {
        try {
            // Convertimos a string nuestros Item
            const stringifiedItem = JSON.stringify(newItem);
            // Los guardamos en el localStorage
            localStorage.setItem(itemName, stringifiedItem);
            // Actualizamos nuestro estado
            setItem(newItem);
        } catch (error) {
            // En caso de un error lo guardamos en el estado
            setError(error);
        }
    };

    return {
        item,
        saveItem,
        loading,
        error
    }
}

function App() {
    const {
        item:todos,
        saveItem:saveTodos,
        loading,
        error
    } = useLocalStorage("TODOS_V1", [])


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
        loading={loading}
        error = {error}
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
