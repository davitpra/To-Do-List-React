import React from "react";
import './TodoCounter.css';

// Desestructuramos los props que pasamos al componente
function TodoCounter({ totalTodos, completedTodos }){

    return(
        <h2 className="TodoCounter"> Has complentado {completedTodos} de {totalTodos} ToDos</h2>
    )
}

export {TodoCounter};