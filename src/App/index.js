import React from 'react';
import { useTodo } from './useTodo';
import { TodoHeader } from '../TodoHeader';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosError } from '../TodosError'
import { TodosLoading } from '../TodosLoading'
import { EmptyTodos } from '../EmptyTodos'
import { TodoForm } from '../TodoForm';
import { CreateTodoButton } from '../CreateTodoButton/index';
import { Modal } from '../Modal'
import {ChangeAlertWithStorageListener} from '../ChangeAlert'



function App() {
    const {
        error,
        loading,
        searchedTodos,
        toggleCompleteTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        totalTodos, 
        completedTodos,
        searchValue, 
        setSearchValue,
        addTodo,
        sincronizeTodos,
    } = useTodo ()

    return (
    <>
        <TodoHeader loading = {loading}>
            <TodoCounter 
                totalTodos ={totalTodos}
                completedTodos = {completedTodos}
            />
            <TodoSearch 
                searchValue = {searchValue}
                setSearchValue = {setSearchValue}
            />
        </TodoHeader>

        <TodoList
            totalTodos = {totalTodos}
            error = {error}
            loading = {loading}
            searchText={searchValue}
            searchedTodos = {searchedTodos}
            onError = { () =><TodosError/>}
            onLoading = {() =><TodosLoading/>}
            onEmptyTodos={() => <EmptyTodos />}
            onEmptySearchResults={(searchText) => (
                <p>No hay resultado para {searchText} </p>
            )}
            render = { todo => (
                <TodoItem
                    key={todo.text}
                    text={todo.text}
                    completed={todo.completed}
                    onComplete={() => toggleCompleteTodo(todo.text)}
                    onDelete={() => deleteTodo(todo.text)}
                />
            )}

        />

        {!!openModal && (
            <Modal>
                <TodoForm 
                    addTodo = {addTodo}
                    setOpenModal = {setOpenModal}
                />
            </Modal>
        )}

        <CreateTodoButton 
            setOpenModal = {setOpenModal}
        />

        <ChangeAlertWithStorageListener
            sincronize = {sincronizeTodos}
        />
    </>
    );
}
export default App;
