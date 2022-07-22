import { useContext } from 'react';
import useElemState from '../hooks/useElemState';
import ControlsElem from '/components/ControlsElem'
import ControlsElemAudio from '/components/ControlsElemAudio'
import { controlStateContext } from '../pages';


export default function Controls() {
  const [controlState, setControlState] = useContext(controlStateContext)

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
      <div className='flex flex-col'>
        <ControlsElem 
        enabled={controlState.todo.enabled} 
        onClick={toggleTodoList} img='/img/task-list.svg' />
        <ControlsElemAudio 
          elemState={controlState.rain} 
          setElemState={useElemState("rain",setControlState)} 
        />
        <ControlsElemAudio 
          elemState={controlState.fire} 
          setElemState={useElemState("fire",setControlState)} 
        />
        <ControlsElemAudio 
          elemState={controlState.nature} 
          setElemState={useElemState("nature",setControlState)} 
        />
        <ControlsElemAudio 
          elemState={controlState.whitenoise} 
          setElemState={useElemState("whitenoise",setControlState)} 
        />
        <ControlsElemAudio 
          playerType="youtube"
          elemState={controlState.music} 
          setElemState={useElemState("music",setControlState)} 
        />
      </div>
    </>

  )
}