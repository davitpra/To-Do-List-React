import React from "react";

function useLocalStorage (itemName, initialValue) {
  const [sincronizedItem, setSincronizedItem] = React.useState (true);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);

    React.useEffect ( ()=> {
        setTimeout (()=>{
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

              setSincronizedItem (true)
            } catch (error) {
              setError(error);
            } 
        },1000);
    },[sincronizedItem]);

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

    const sincronizeItem = () => {
      setLoading (true);
      setSincronizedItem (false);
    }

    return {
        item,
        saveItem,
        loading,
        error,
        sincronizeItem
    }
}

export {useLocalStorage}