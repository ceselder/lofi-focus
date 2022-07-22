import React, { useEffect, useRef, useContext, useState } from 'react'
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
    ssr: false,
  })
import dynamic from 'next/dynamic';
import ControlsElem from '/components/ControlsElem';
import { controlStateContext } from '../pages';

export default function ControlsElemAudio({ elemState, setElemState }) {
    const [volume, setVolume] = useState(elemState.volume)
    const [controlState, setControlState] = useContext(controlStateContext)

    function clickHandler() {
        setElemState(oldState => {
            const newState = { ...oldState }
            newState.enabled = !newState.enabled
            return newState
        }
        )
    }

    return (
        <>
            <ControlsElem
                audioControl={true}
                volume={volume}
                setVolume={setVolume}
                enabled={elemState.enabled}
                onClick={clickHandler}
                img={elemState.imgSrc} />

                    <ReactPlayer
                        height="0"
                        width="0"
                        playing={elemState.enabled && !controlState.paused}
                        volume={(volume / 100).toFixed(2)}
                        url={elemState.mediaSrc} 
                    />
            

        </>
    )
}