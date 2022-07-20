import React, { useRef, useState } from "react"
import TodoElem from "/components/TodoElem";
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion'
const initialTodoList = []


export default function TodoList({ visible }) {
    const [todoList, setTodoList] = useState(initialTodoList);

    const inputRef = useRef();

    function addTodo() {
        setTodoList(old => [...old, { id: uuidv4(), value: inputRef.current.value, completed: false }])
    }

    function toggleTodo(id) {
        const todoListCopy = [...todoList]
        const currTodo = todoListCopy.find(elem => elem.id === id)
        currTodo.completed = !currTodo.completed
        setTodoList(todoListCopy)
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    exit={{ opacity: 0}}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="py-4">
                        Todo:
                        {todoList.map(elem =>
                            <TodoElem toggleTodo={toggleTodo} key={elem} task={elem} />)}
                    </div>
                    <div className="py-4">
                        <div className="inline-block text-2xl">
                            <input ref={inputRef} className="rounded-lg text-gray-800" />
                            <div onClick={() => addTodo()}
                                className="hover:bg-white hover:text-black hover:cursor-pointer mx-1 inline-block border-white border-2 px-1 rounded-lg">
                                ✓
                            </div>
                            <div className="hover:bg-white hover:text-black hover:cursor-pointer mx-1 inline-block border-white border-2 px-1 rounded-lg">
                                ✖
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

    )
}