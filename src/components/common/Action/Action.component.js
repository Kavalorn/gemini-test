import React from 'react'

export const Action = ({children, label, onClick = () => {}}) => {
  return (
    <div className='d-flex w-fit mr-6 cursor-pointer' onClick={onClick}>
    <div className='h-6 m-auto'>
      {children}
    </div>
    <div className='mt-1 text-center'>{label}</div>
</div>
  )
}
