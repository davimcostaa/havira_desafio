import React from 'react'

const Input = ({label, small, name, register, error}) => {
  return (
    <div className={`flex flex-col gap-2 ${small ? 'w-2/6': ''}`}>
        <label>{label}</label>
        <input 
            className={`input-base ${error?.message ? 'border-red-500 focus:border-red-500' : ''}`}
            {...register(name)}
                        />
    </div>
  )
}

export default Input