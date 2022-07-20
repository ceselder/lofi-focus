import React, { useEffect, useRef, useState } from 'react'

export default function AudioPlayer({ playing, src, volume }) {
    const audioRef = useRef();

    useEffect(() => {
        const newVolume = (volume / 100).toFixed(2)
        console.log("newVolume", newVolume)
        audioRef.current.volume = (newVolume);
    }, [volume])

    useEffect(() => {
        if (playing) {
            audioRef.current.play()
        }
        else {
            audioRef.current.pause()
        }
    }, [playing])

    return (
        <>
            <audio
                volume="100"
                src={src}
                ref={audioRef} />
        </>
    )
}
