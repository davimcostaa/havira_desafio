import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const UserItem = ({name, email, city}) => {
  return (
    <div className='usericon-div'>

        <h3 className='text-xl text-white'>{name}</h3>

        <div className='usericon-info'>
            <MdEmail className='usericon-icon' />
            <p className='text-sm'>{email}</p>
        </div>
      
        <div className='usericon-info'>
            <FaLocationDot className='usericon-icon' />
            <p className='text-sm'>{city}</p>
        </div>

    </div>
  )
}

export default UserItem