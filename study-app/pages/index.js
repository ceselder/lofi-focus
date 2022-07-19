import { useState } from 'react';
import Router from 'next/router.js';
import { motion } from 'framer-motion';
import TodoList from '../components/TodoList';
import Controls from '../components/Controls';
import Player from '../components/Player';

export default function App(props) {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='relative flex h-screen'>
        <div className="flex text-center text-white">
          <div class="ml-8 mt-12 text-left">
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="pt-12 text-5xl font-semibold block">Welcome back, </motion.h1>
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              class=" text-5xl font-semibold block">what would you like to get done today?
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className='flex ml-auto items-center'>
              <TodoList />
            </motion.div>
            
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className='flex ml-auto items-center'>
          <Controls />
        </motion.div>
      </div>
    </>)
}