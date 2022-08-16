import React from "react";

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
              setLoading(false);
            } catch (error) {
              // En caso de un error lo guardamos en el estado
              setError(error);
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

export {useLocalStorage}