import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
  })
import ControlsElem from '/components/ControlsElem';

export default function ControlsElemYoutube({ name, controlState, setControlState }) {
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(100)
    const fadeDelta = 5;
    /*useEffect(() => {
        if (controlState[name].enabled) {
            setPlaying(true)
            const currInterval = setInterval(() =>
            {
                if (volume >= 0.95)
                {
                    clearInterval(currInterval)
                    setVolume(1);
                    return
                }
                setVolume(vol => vol + 0.01)
            },fadeDelta)
        }
        else {
            setTimeout(() => {
                setPlaying(false)
            }, (fadeDelta * 110));
            const currInterval = setInterval(() =>
            {
                if (volume <= 0.05)
                {
                    clearInterval(currInterval)
                    setVolume(0);
                    return
                }
                setVolume(vol => vol - 0.01)
            },fadeDelta)
        }
    }, [controlState]
    )*/

    //todo help

    function clickHandler() {
        setControlState(oldState => {
            const newState = { ...oldState }
            newState[name].enabled = !newState[name].enabled
            setPlaying(newState[name].enabled)
            console.log(newState)
            return newState
        }
        )
    }

    return (
        <>
            <ControlsElem
                enabled={controlState[name].enabled}
                onClick={clickHandler}
                img={controlState[name].imgSrc} />

            <ReactPlayer
                height="0"
                width="0"
                playing={playing}
                volume={volume}
                url={controlState[name].mediaSrc} 
            />
        </>
    )
}
