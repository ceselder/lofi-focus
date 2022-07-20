import React, { useEffect, useRef, useState } from 'react'
import ControlsElem from '/components/ControlsElem';

export default function ControlsElemAudio({ name, controlState, setControlState }) {
    const [volume, setVolume] = useState(controlState[name].volume)
    const audioRef = useRef();
    const fadeDelta = 5;

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume])

    useEffect(() => {
        if (controlState[name].enabled)
        {
            audioRef.current.play()
        }
        else
        {
            audioRef.current.pause()
        }
    }, [controlState[name].enabled])

    /*useEffect(() => {
        if (controlState[name].enabled) {
            audioRef.current.play()
            const currInterval = setInterval(() =>
            {
                if (audioRef.current.volume >= 0.95)
                {
                    clearInterval(currInterval)
                    audioRef.current.volume = 1;
                    return
                }
                audioRef.current.volume += 0.01
            },fadeDelta)
        }
        else {
            setTimeout(() => {
                audioRef.current.pause()
            }, (fadeDelta * 110));
            const currInterval = setInterval(() =>
            {
                if (audioRef.current.volume <= 0.05)
                {
                    clearInterval(currInterval)
                    audioRef.current.volume = 0;
                    return
                }
                audioRef.current.volume -= 0.01
            },fadeDelta)
        }
    }, [controlState]
    )*/

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
            <ControlsElem
                audioControl={true}
                volume={volume}
                setVolume={setVolume}
                enabled={controlState[name].enabled}
                onClick={clickHandler}
                img={controlState[name].imgSrc} />

                <audio
                    volume="100"
                    src={controlState[name].mediaSrc}
                    ref={audioRef}
            />
            
        </>
    )
}
