import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ControlsElem from '/components/ControlsElem'
import ControlsElemAudio from './ControlsElemAudio'
import ControlsElemYoutube from './ControlsElemYoutube';


export default function Controls({controlState, setControlState}) {
  function toggleTodoList()
  {
    setControlState(oldState => {
      let newState = {...oldState}
      newState.todo.enabled = !newState.todo.enabled
      return newState
    })
  }

  return (
    <>
      <div className='flex-col'>
        <ControlsElem enabled={controlState.todo.enabled} onClick={toggleTodoList} img='https://www.svgrepo.com/show/11307/task-list.svg' />
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
        <ControlsElemYoutube 
          name={"music"} 
          controlState={controlState} 
          setControlState={setControlState} 
        />
      </div>
    </>

  )
}