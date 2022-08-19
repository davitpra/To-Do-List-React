import React from "react";
import './TodoList.css'

function TodoList(props){
    // const renderFunc = props.children || props.render;
    return(
        <section className="TodoList-container">
            {!props.loading && !props.totalTodos && props.onEmptyTodos()}
            {(!!props.totalTodos && !props.searchedTodos.length) && props.onEmptySearchResults(props.searchText)}
            <ul>
                {props.searchedTodos.map(props.render)}
            </ul>
        </section>
    );
}

export { TodoList};