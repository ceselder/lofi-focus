import React from 'react'
import BottomControlsElem from './BottomControlsElem'

export default function Links() {
  return (
    <div className='flex flex-row'>
        <BottomControlsElem
            enabled={false}
            onClick={() => window.open('https://github.com/celestrogen/lofi-focus')}
            img={'/img/github.svg'}
        />
    </div>
  )
}
