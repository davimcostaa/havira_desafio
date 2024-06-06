import React from 'react'

const Input = ({onChange}) => {
  return (
    <div className={`flex flex-col gap-2`}>
        <input 
            onChange={onChange}
            className={`bg-secondaryGray text-white border-2 h-8 appearance-none rounded
                        border-lightGray focus:outline-none focus:border-principal`}
                        />
    </div>
  )
}

export default Input