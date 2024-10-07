import React from 'react'
import { Link } from 'react-router-dom'

export const Nevbar = () => {
  return (
    <div className='flex px-10 py-2 items-center text-white font-bold  bg-[#F50157]'>
      <div className='w-1/2'>
        <span>Quiz_App</span>
      </div>
      <div className='w-1/2 flex justify-around'>
        <p className='hover:text-black cursor-pointer'>
          <Link className='hover-text-black' to="/">Quiz Setup</Link>
        </p>
        <p className='hover:text-black cursor-pointer'>
          <Link to="/quiz">Quiz Page</Link>
        </p>
        <p className='hover:text-black cursor-pointer'>
          <Link to="/leaderboard">Leaderboard</Link>
        </p>
      </div>
    </div>
  )
}
