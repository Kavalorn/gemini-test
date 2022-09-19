import React, { ReactNode } from 'react'

export const Container = ({children}: {children: ReactNode}) => {
  return (
    <div className="container mx-auto pt-4">{children}</div>
  )
}
