import React, { useState, useContext } from 'react'
import AudioControl from '/components/AudioControl'
import { motion, AnimatePresence } from 'framer-motion'
import { controlStateContext } from '../pages';

export default function ControlsElem({ audioControl, volume, setVolume, enabled, onClick, img }) {
  const [controlState, setControlState] = useContext(controlStateContext)
  const [mouseOver, setMouseOver] = useState(false);
  
  return (
    <>
      <div >
        <div onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)} className='py-2 flex flex-row justify-end'>
          <AnimatePresence>
            {audioControl && (mouseOver || controlState.isMobile) && enabled && (
              <motion.div
                exit={{ x: 15, opacity: 0 }}
                initial={{ x: 15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                <AudioControl volume={volume} setVolume={setVolume} />
              </motion.div>
            )}
          </AnimatePresence>
          <div onClick={onClick}
            className={`${enabled ? 'opacity-100' : `opacity-60 ${controlState.isMobile ? '' : 'hover:opacity-80' }`} flex 
            justify-center items-center h-16 w-16 p-2 md:h-24 md:w-24 md:p-4 text-3xl 
            rounded-lg hover:cursor-pointer bg-gray-200 ml-2 mr-4`}>

            <img src={img} className='opacity-100 w-full' />
          </div>
        </div>
      </div>


    </>

  )
}
