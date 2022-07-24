import getYoutubeTitle from 'get-youtube-title';
import React, { useState, useContext, useEffect } from 'react'
import { controlStateContext } from '../pages';
import { AnimatePresence, motion } from 'framer-motion';

export default function CurrentlyPlaying() {
    const [musicTitle, setMusicTitle] = useState('');
    const [controlState, setControlState] = useContext(controlStateContext);
  
    
    useEffect(() => {
        
        if (controlState.music.mediaSrc)
        {   
            setMusicTitle('...')
            fetch(`https://noembed.com/embed?url=${controlState.music.mediaSrc}`)
            .then(resp => resp.json())
            .then(resp => resp.html)
            .then(resp => resp.match(new RegExp('.*title="([^"]*)".*')))
            .then(resp => resp[1])
            .then(resp => { setMusicTitle(resp) } )
        }


    }, [controlState.music.mediaSrc])
    
    return (
        <>
        <AnimatePresence>
        {(controlState.music.enabled) &&
            <motion.div
                    key={controlState.music.enabled}
                    exit={{ opacity: 0, y: 5}}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y:0 }}
                    className='print-clearly truncate max-w-[16rem] text-base sm:max-w-md sm:text-lg md:text-2xl md:max-w-2xl 
                               lg:text-3xl lg:max-w-3xl font-semibold text-white'
            >
                Listening to: 
                <span
                    onClick={() => (window.open(controlState.music.mediaSrc))} 
                    className="hover:underline hover:cursor-pointer font-bold"
                >
                {musicTitle}
                </span>
                
            </motion.div>
        }
        </AnimatePresence>
        

        </>
    
  )
}
