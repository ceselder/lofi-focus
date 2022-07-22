import React, { useState } from 'react'
import AudioControl from '/components/AudioControl'
import { motion, AnimatePresence } from 'framer-motion'

export default function ControlsElem({ audioControl, volume, setVolume, enabled, onClick, img }) {
  const [mouseOver, setMouseOver] = useState(false);
  
  return (
    <>
      <div >
        <div onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)} className='min-w-[14rem] py-2 flex flex-row justify-end'>
          <AnimatePresence>
            {audioControl && mouseOver && enabled && (
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
            className={`${enabled ? 'opacity-100' : 'opacity-60 hover:opacity-80'} flex 
            justify-center items-center h-16 w-16 p-2 xl:h-24 xl:w-24 xl:p-4 text-3xl 
            rounded-lg hover:cursor-pointer bg-gray-200 ml-2 mr-4`}>

            <img src={img} className='opacity-100 w-full' />
          </div>
        </div>
      </div>


    </>

  )
}
