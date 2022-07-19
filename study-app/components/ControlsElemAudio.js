import React, { useEffect, useRef } from 'react'
import ControlsElem from './ControlsElem';
import ReactAudioPlayer from 'react-audio-player'

export default function ControlsElemAudio({ name, controlState, setControlState }) {
    const audioRef = useRef();

    useEffect(() => {
        if (controlState[name].enabled) {
            audioRef.current.play()
            setInterval(() =>
            {
                if (audioRef)
                audioRef.current.volume += 0.01
            },10)
        }
        else {
            audioRef.current.pause()
        }
    }, [controlState]
    )

    function clickHandler() {
        setControlState(oldState => {
            const newState = { ...oldState }
            newState[name].enabled = !newState[name].enabled
            console.log(newState)
            return newState
        }
        )
    }

    return (
        <>
            <div>
                <ControlsElem
                    enabled={controlState[name].enabled}
                    onClick={clickHandler}
                    img={controlState[name].imgSrc} />
            </div>

            <audio
                src={controlState[name].mediaSrc}
                ref={audioRef}
            />
        </>
    )
}
