import React from 'react'
import './TodosLoading.css'

function TodosLoading () {
  return (
    <>
      <div className='LoadingTodo-container'>
        <span className='LoadingTodo-completeIcon' />
        <p className='LoadingTodo-text'>Cargando TODOs...</p>
        <span className='LoadingTodo-deleteIcon' />
      </div>
      <div className='LoadingTodo-container'>
        <span className='LoadingTodo-completeIcon' />
        <p className='LoadingTodo-text'>Cargando TODOs...</p>
        <span className='LoadingTodo-deleteIcon' />
      </div>
      <div className='LoadingTodo-container'>
        <span className='LoadingTodo-completeIcon' />
        <p className='LoadingTodo-text'>Cargando TODOs...</p>
        <span className='LoadingTodo-deleteIcon' />
      </div>
    </>
  )
}

export { TodosLoading }
