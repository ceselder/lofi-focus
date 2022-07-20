import React from 'react'

export default function AudioControl({volume, setVolume}) {
  const volumeCopy = volume
  function onChange(ref)
  {
    const newValue = ref.target.value / 100
    console.log(newValue)
    setVolume(newValue)
  }

  return (
    <div>
        <input volume={volumeCopy} onChange={onChange} id="vertical-slider" type="range" orient="vertical" className='my-0 h-[5.5rem] w-2' />
    </div>
  )
}
