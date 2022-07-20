import { createContext, useState } from 'react';
import { motion } from 'framer-motion';
import TodoList from '/components/TodoList';
import Controls from '/components/Controls';


const lofiYoutubeID = 'jfKfPfyJRdk';


const defaultControlState = {
  todo: {
    enabled: false
  },
  rain: {
    enabled: false, volume: 50,
    imgSrc: '/img/rain.svg',
    mediaSrc: '/mp3/rain.mp3'
  },
  fire: {
    enabled: false, volume: 50,
    imgSrc: 'https://www.svgrepo.com/show/263992/fire.svg',
    mediaSrc: '/mp3/fire.mp3'
  },
  nature: {
    enabled: false, volume: 50,
    imgSrc: '/img/nature.svg',
    mediaSrc: '/mp3/nature.mp3'
  },
  music: {
    enabled: false, volume: 50,
    imgSrc: 'https://www.svgrepo.com/show/133878/music-note.svg',
    mediaSrc: `https://www.youtube.com/watch?v=${lofiYoutubeID}`
  },
}

export const controlStateContext = createContext();

export default function App() {
  const [controlState, setControlState] = useState(defaultControlState);

  return (
    <>
      <div className='relative flex h-screen'>
        <div className="flex text-center text-white">
          <div className="ml-8 mt-12 text-left">
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="pt-12 text-5xl font-semibold block">Welcome back, </motion.h1>
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className=" text-5xl font-semibold block">what would you like to get done today?
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className='flex ml-auto items-center'>
              <TodoList visible={controlState.todo.enabled} />
            </motion.div>
            
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className='flex ml-auto items-center'>
            <controlStateContext.Provider value={[controlState, setControlState]}>
              <Controls />
            </controlStateContext.Provider>
          
        </motion.div>
      </div>
    </>)
}