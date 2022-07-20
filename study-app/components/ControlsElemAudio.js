import React, { useEffect, useRef, useState } from 'react'
const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
  })
import dynamic from 'next/dynamic';
import ControlsElem from '/components/ControlsElem';
import AudioPlayer from './AudioPlayer';

export default function ControlsElemAudio({ playerType, elemState, setElemState }) {
    const [volume, setVolume] = useState(elemState.volume)

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
            {(playerType == "mp3") &&
                (<AudioPlayer 
                    playing={elemState.enabled}
                    volume={volume}
                    src={elemState.mediaSrc} />)
            }
            {(playerType == "youtube") &&
                (
                    <ReactPlayer
                        height="0"
                        width="0"
                        playing={elemState.enabled}
                        volume={(volume / 100).toFixed(2)}
                        url={elemState.mediaSrc} 
                    />)
            }

        </>
    )
}

ControlsElemAudio.defaultProps = {
    playerType: 'mp3',
};
