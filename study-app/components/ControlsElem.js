import React from 'react'

export default function ({ enabled, onClick, img }) {
  return (
    <>
      <div onClick={onClick}
        className={`${enabled ? 'opacity-100' : 'opacity-50'} flex justify-center items-center h-20 w-20 p-4 text-3xl 
     rounded-lg hover:opacity-80 hover:cursor-pointer 
    bg-gray-200 m-4`}>
        <img src={img} className='opacity-100' />
      </div>
    </>

  )
}
