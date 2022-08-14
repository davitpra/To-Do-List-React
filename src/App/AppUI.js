import React from 'react';
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton/index';

function AppUI() {
    return (
    <>
        <TodoCounter />
        <TodoSearch />
        <TodoContext.Consumer>
        {({
            error, 
            loading, 
            searchedTodos,
            completeTodo,
            deleteTodo,
        })=>(        
            <TodoList>
                {error && <p>Oooops.... Hubo un error</p>}
                {loading && <p>Cargando...</p>}
                {(!loading && !searchedTodos.lengh) && <p>!Crea tu primer ToDo</p>}
                {searchedTodos.map(todo => (
                    <TodoItem
                        key={todo.text}
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.text)}
                        onDelete={() => deleteTodo(todo.text)}
                    />
                ))}
            </TodoList>
        )}
        </TodoContext.Consumer>

        <CreateTodoButton />
    </>
    );
}

export { AppUI };