import React from 'react'

export default function AudioControl({volume, setVolume}) {
  function onChange(ref)
  {
    const newValue = ref.target.value / 100
    setVolume(ref.target.value / 100)
  }

  return (
    <div>
        <input value={volume} onChange={onChange} id="vertical-slider" type="range" orient="vertical" className='my-0 h-[5.5rem] w-2' />
    </div>
  )
}
