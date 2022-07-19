import React, { useRef, useState } from "react"
import TodoElem from "./TodoElem";
import { v4 as uuidv4 } from 'uuid';
const initialTodoList = []


export default function TodoList() {
    const [todoList, setTodoList] = useState(initialTodoList);

    const inputRef = useRef();
    
    function addTodo() {
        setTodoList(old => [...old, { id: uuidv4() ,value: inputRef.current.value, completed: false}])
    }

    function toggleTodo(id) {
        const todoListCopy = [...todoList]
        const currTodo = todoListCopy.find(elem => elem.id === id)
        currTodo.completed = !currTodo.completed
        setTodoList(todoListCopy)
    }

    return (
        <>
            <div class="py-4">
                Todo:
                {todoList.map(elem =>
                    <TodoElem toggleTodo={toggleTodo} key={elem} task={elem} />)}
            </div>
            <div class="py-4">
                <div className="inline-block text-2xl">
                    <input ref={inputRef} className="rounded-lg text-gray-800" />
                    <div onClick={() => addTodo()}
                        className="hover:cursor-pointer mx-1 inline-block border-white border-2 px-1 rounded-lg">
                        ✓
                    </div>
                    <div className="hover:cursor-pointer mx-1 inline-block border-white border-2 px-1 rounded-lg">
                        ✖
                    </div>
                </div>
            </div>
        </>

    )
}