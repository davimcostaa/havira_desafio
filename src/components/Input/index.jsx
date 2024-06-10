import React from 'react'

const Input = ({onChange}) => {
  return (
    <div className={`flex flex-col gap-2`}>
        <input 
            onChange={onChange}
            className={`input-base`}
                        />
    </div>
  )
}

export default Input