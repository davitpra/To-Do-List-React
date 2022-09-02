import React from "react";
// inicial value esta dentro de una funcion para que el componente se pueda ingresar dentro de la funcion donde se asigna su valor. 
const initialState = ({ initialValue }) => ({
  sincronizedItem: true,
  error: false,
  loading: true,
  item: initialValue,
});

const actionTypes = {
  error: 'ERROR',
  success: 'SUCCESS',
  save: 'SAVE',
  sincronize: 'SINCRONIZE',
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
  },
  [actionTypes.success]: {
    ...state,
    error: false,
    loading: false,
    sincronizedItem: true,
    item: payload,
  },
  [actionTypes.save]: {
    ...state,
    item: payload,
  },
  [actionTypes.sincronize]: {
    ...state,
    sincronizedItem: false,
    loading: true,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

function useLocalStorage (itemName, initialValue) {
  const [state, dispatch] = React.useReducer(reducer, initialState({ initialValue }));
  const {
    sincronizedItem,
    error,
    loading,
    item,
  } = state;

  // ACTION CREATORS
  const onError = (error) => dispatch({
    type: actionTypes.error,
    payload: error,
  });

  const onSuccess = (item) => dispatch({
    type: actionTypes.success,
    payload: item,
  });

  const onSave = (item) => dispatch({
    type: actionTypes.save,
    payload: item,
  });

  const onSincronize = () => dispatch({
    type: actionTypes.sincronize,
  });
  
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
              onSuccess (parsedItem)
            } catch (error) {
              onError (error)
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
          onSave(newItem);
        } catch (error) {
          // En caso de un error lo guardamos en el estado
          onError (error)
        }
    };

    const sincronizeItem = () => {
      onSincronize ()
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