import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import ControlsElem from './ControlsElem'
import ControlsElemAudio from './ControlsElemAudio'

const youtubeID = 'jfKfPfyJRdk';

const defaultControlState = {
  todo: {
    enabled: false
  },
  rain: {
    enabled: false, volume: 100,
    imgSrc: 'https://www.svgrepo.com/show/29571/rain.svg',
    mediaSrc: '/mp3/rain.mp3'
  },
  wind: {
    enabled: false, volume: 100,
    imgSrc: 'https://www.svgrepo.com/show/76131/wind.svg',
    mediaSrc: '/mp3/fire.mp3'
  },
  fire: {
    enabled: false, volume: 100,
    imgSrc: 'https://www.svgrepo.com/show/263992/fire.svg',
    mediaSrc: '/mp3/rain.mp3'
  },
  music: {
    enabled: false, volume: 100,
    imgSrc: 'https://www.svgrepo.com/show/29571/rain.svg',
    mediaSrc: `https://www.youtube.com/watch?v=${youtubeID}`
  },
}

export default function Controls() {
  const [controlState, setControlState] = useState(defaultControlState);

  function toggleTodoList()
  {
    setControlState(oldState => {
      let newState = {...oldState}
      newState.todo.enabled = !newState.todo.enabled
      return newState
    })
  }

  function toggleMusic()
  {
    setControlState(oldState => {
      let newState = {...oldState}
      newState.music.enabled = !newState.music.enabled
      console.log(newState.music.enabled)
      return newState
    })
  }

  return (
    <>
      <div className='flex-col'>
        <ControlsElem onClick={toggleTodoList} img='https://www.svgrepo.com/show/11307/task-list.svg' />
        <ControlsElemAudio 
          name={"rain"} 
          controlState={controlState} 
          setControlState={setControlState} 
        />
        <ControlsElemAudio 
          name={"fire"} 
          controlState={controlState} 
          setControlState={setControlState} 
        />
        <ControlsElemAudio 
          name={"wind"} 
          controlState={controlState} 
          setControlState={setControlState} 
        />
        <ControlsElem enabled={true} onClick={toggleMusic} img='https://www.svgrepo.com/show/129576/music-note.svg' />
      </div>
    </>

  )
}