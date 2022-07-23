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
    const [loading, setLoading] = useState(false);
    const playerRef = useRef(); 

    function clickHandler() {
        if (!(loading && elemState.enabled))
        {
            setElemState(oldState => {
                const newState = { ...oldState }
                newState.enabled = !newState.enabled
                return newState
            })
        }
    }

    return (
        <>
            <div className='flex flex-row'>
                <img
                src="https://samherbert.net/svg-loaders/svg-loaders/tail-spin.svg" 
                className={`self-center ${(loading && elemState.enabled) ? '' : 'invisible' }  h-8`} />
                <div>
                    <ControlsElem
                        audioControl={true}
                        volume={volume}
                        setVolume={setVolume}
                        enabled={(elemState.enabled && !loading )}
                        onClick={clickHandler}
                        img={elemState.imgSrc} />
                    <ReactPlayer
                        ref={playerRef}
                        height="0"
                        width="0"
                        onReady={() => setLoading(true)}
                        onStart={() => setLoading(false)}
                        playing={elemState.enabled && !controlState.paused}
                        volume={(volume / 100).toFixed(2)}
                        url={elemState.mediaSrc}
                    />
                </div>
            </div>
        </>
    )
}