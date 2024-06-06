import React from 'react'

const Icon = ({ icon, text, onClick }) => {
  return (
    <div className="sidebar-icon group" onClick={onClick}>
        {icon}
        {text ?
         <span className="sidebar-tooltip group-hover:scale-100">
        {text}
        </span>
        :
        ''}

    </div>
  )
}

export default Icon