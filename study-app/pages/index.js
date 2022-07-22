import { createContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TodoList from '/components/TodoList';
import Controls from '/components/Controls';
import Background from '../components/Background';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import BottomControls from '../components/BottomControls';

const stations = ['https://www.youtube.com/watch?v=-5KAN9_CzSA',
  'https://www.youtube.com/watch?v=-9gEgshJUuY',
  'https://www.youtube.com/watch?v=jfKfPfyJRdk',
  'https://www.youtube.com/watch?v=kgx4WGK0oNU',
  'https://www.youtube.com/watch?v=ceqgwo7U28Y']

export async function getStaticProps(context) {
  const backgrounds = await fetch(`${process.env.URL}/api/backgrounds`)
    .then(resp => resp.json())
    .then(resp => resp.backgrounds)
  console.log(backgrounds)

  const controlState = {
    stations: stations,
    paused: false,
    backgrounds: backgrounds,
    backgroundIndex: 1,
    background: backgrounds[1], //handled by useEffect
    transitionPlaying: false,
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
    whitenoise: {
      enabled: false, volume: 50,
      imgSrc: 'https://www.svgrepo.com/show/348483/sounds.svg',
      mediaSrc: '/mp3/brown_noise.mp3'
    },
    music: {
      enabled: true, volume: 50,
      imgSrc: 'https://www.svgrepo.com/show/133878/music-note.svg',
      stationIndex: 0,
      mediaSrc: '' //handled by useEffect
    },
  }

  return {
    props: { backgrounds: backgrounds, defaultControlState: controlState },
  }
}

export const controlStateContext = createContext();

export default function App({ backgrounds, defaultControlState }) {
  const [controlState, setControlState] = useState(defaultControlState);


  useEffect(() => {
    //todo niet beste manier om dit te doen
    setControlState(oldState => {
      const newState = { ...oldState }
      newState.background = backgrounds[controlState.backgroundIndex]
      return newState
    })
  }, [controlState.backgroundIndex])

  useEffect(() => {
    //todo niet beste manier om dit te doen
    setControlState(oldState => {
      const newState = { ...oldState }
      newState.music.mediaSrc = stations[controlState.music.stationIndex]
      return newState
    })
  }, [controlState.music.stationIndex])

  return (
    <>
      <controlStateContext.Provider value={[controlState, setControlState]}>
        <Background background={controlState.background} />
        <div className="static z-10">
          <div className='relative flex h-screen'>
            <div className="flex text-center text-white">
              <div className="ml-8 mt-2 text-left">
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ default: {ease: "easeInOut", duration: 0.4 }}}
                  className="pt-12 text-5xl font-semibold block">Welcome back, </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.4, delay: 0.8 }}
                  className=" text-5xl font-semibold block">what would you like to get done today?
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ default: {ease: "easeInOut"}, delay: 2, duration: 1 }}
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
              <Controls />
            </motion.div>
            <div className="absolute bottom-0 left-0 ml-2 mb-2">
              <CurrentlyPlaying />
            </div>

            <div className="absolute bottom-0 right-0 mr-2 mb-2">
              <BottomControls />
            </div>
          </div>
        </div>
      </controlStateContext.Provider>

    </>)
}