import React, { useRef, useState } from "react"
import TodoElem from "/components/TodoElem";
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion'
const initialTodoList = []


export default function TodoList({ visible }) {
    const [todoList, setTodoList] = useState(initialTodoList);

    const inputRef = useRef();

    function addTodo() {
        const taskValue = inputRef.current.value
        setTodoList(old =>
            [...old, 
                {
                    id: uuidv4(),
                    value: taskValue,
                    completed: false
                }
            ]
        )
        inputRef.current.value = ""
    }

    function clearList()
    {
        setTodoList([])
    }

    function toggleTodo(id) {
        setTodoList(oldTodo => {
            const todoListCopy = [...oldTodo]
            const currTodo = todoListCopy.find(elem => elem.id === id)
            currTodo.completed = !currTodo.completed
            return todoListCopy
        })
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-bold"
                >
                    <div className="text-2xl">
                        <p className="text-4xl font-extrabold underline">
                            Todo
                        </p>
                        <div>
                        {todoList.map(elem =>
                                <TodoElem toggleTodo={toggleTodo}
                                    key={elem.id}
                                    task={elem} />)}
                        </div>
                    </div>
                    <div className="py-4">
                            <div className="inline-block text-2xl">
                                <input onKeyDown={(event) => (event.key === 'Enter') ? addTodo() : ('')}
                                    ref={inputRef}
                                    className="p-1 text-base rounded-lg text-white bg-transparent border-white border-2"
                                />
                            </div>
                        </div>
                    <div onClick={clearList} className="hover:bg-white p-2 hover:text-black hover:cursor-pointer inline-block border-white border-2 rounded-lg">
                        Clear List
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

    )
}