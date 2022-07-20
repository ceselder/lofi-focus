import React from 'react'
import AudioControl from '/components/AudioControl'
import { motion, AnimatePresence } from 'framer-motion'

export default function ControlsElem({ audioControl, volume, setVolume, enabled, onClick, img }) {
  return (
    <>
      <div className='my-4 flex flex-row justify-end'>
      <AnimatePresence>
            {audioControl && enabled && (
                  <motion.div
                      exit={{ opacity: 0}}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                  >
                  <AudioControl volume={volume} setVolume={setVolume} />
                </motion.div>
            )}
      </AnimatePresence>
        <div onClick={onClick}
          className={`${enabled ? 'opacity-100' : 'opacity-60 hover:opacity-80'} flex justify-center items-center h-24 w-24 p-4 text-3xl 
     rounded-lg hover:cursor-pointer 
    bg-gray-200 mx-4`}>

          <img src={img} className='opacity-100' />
        </div>
      </div>

    </>

  )
}
