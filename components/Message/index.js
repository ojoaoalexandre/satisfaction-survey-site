import React from 'react'

const Message = ({ message }) => {
    return (
        <div className={`bg-red-200 text-red-800 px-2 border-l-2 border-red-800 text-sm`}>
            <p>{message}</p>
        </div>
    )
}

export default Message