import React from 'react'

export default function TodoElem({ toggleTodo, task }) {
    return (
        <div 
            className={`${(task.completed ? 'line-through opacity-75' : '')} hover:cursor-pointer  hover:opacity-75 block text-2xl`}
            onClick={() => toggleTodo(task.id)}
        >
            {task.value}
        </div>)
}