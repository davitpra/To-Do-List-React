import React from "react";
import { TodoContext } from "../TodoContext";
import './TodoCounter.css';

// Desestructuramos los props que pasamos al componente
function TodoCounter(){
    const { totalTodos, completedTodos } = React.useContext (TodoContext)
    return(
        <h2 className="TodoCounter"> Has complentado {completedTodos} de {totalTodos} ToDos</h2>
    )
}

export {TodoCounter};