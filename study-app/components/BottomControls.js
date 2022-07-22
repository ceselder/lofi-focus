import React, { useContext, useState, useRef } from 'react'
import { controlStateContext } from '../pages'
import BottomControlsElem from './BottomControlsElem'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
})

export default function BottomControls() {
    const [controlState, setControlState] = useContext(controlStateContext)
    const playerRef = useRef();

    function changeBackground(oldState, newIndex = controlState.backgroundIndex) {
        const state = { ...oldState }
        state.transitionPlaying = true
        const timeout = setTimeout(() => {
            setControlState((localOldState) => {
                const localState = { ...localOldState }
                localState.transitionPlaying = false
                localState.backgroundIndex = newIndex
                return localState
            })
        }, 300);
        return state
    }

    function nextStation() {
        setControlState(state => changeBackground(state))
        setControlState(oldState => {
            let state = { ...oldState }
            state.music.stationIndex = (state.music.stationIndex + 1) % (state.stations.length)
            state.music.mediaSrc = state.stations[state.music.stationIndex]
            return state
        })
    }

    function pause()
    {
        setControlState(old => {
            const state = {...old}
            state.paused = !state.paused
            return state
        })
    }

    function nextBackground()
    {
        const newIndex = (controlState.backgroundIndex + 1) % (controlState.backgrounds.length)
        setControlState(state => changeBackground(state, newIndex))
    }

    return (
        <>
            <div className='flex flex-row'>
                <BottomControlsElem
                    enabled={false}
                    onClick={nextBackground}
                    img={'https://www.svgrepo.com/show/371946/image-gallery.svg'}
                />
                <BottomControlsElem
                    enabled={false}
                    onClick={nextStation}
                    img={'/img/skip.svg'}
                />
                <BottomControlsElem
                    enabled={controlState.paused}
                    onClick={pause}
                    img={'https://www.svgrepo.com/show/74606/pause.svg'}
                />
            </div>
            <ReactPlayer
                url="/mp3/transition.mp3"
                ref={playerRef}
                volume="0.1"
                width="0"
                height="0"
                key={controlState.transitionPlaying}
                playing={controlState.transitionPlaying} />
        </>


    )
}
