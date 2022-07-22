import React, { useEffect, useRef, useState } from 'react'

export default function AudioControl({volume, setVolume}) {
  const inputRef = useRef();

  useEffect(() => 
  {
    inputRef.current.value = volume
  }, [volume])

  function onChange(ref)
  {
    const newValue = ref.target.value
    setVolume(newValue)
  }

  return (
    <div>
        <input step="1" 
               ref={inputRef} 
               onChange={onChange} 
               id="vertical-slider" 
               type="range" 
               orient="vertical" 
               className='absolute translate-y-0.5 -translate-x-9 mr-2 w-14 h-24' 
        />
    </div>
  )
}
