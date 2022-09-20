import React from 'react'
import { DrawerItemProps, DrawerProps } from './Drawer.props'



export const DrawerItem = ({label, value}: DrawerItemProps) => {
    return (
        <div>
            <div>{label}</div>
            <div>{value}</div>
        </div>
    )
}

export const Drawer = ({isExpanded = false, children}: DrawerProps) => {

  return isExpanded ? (
    <div className="border border-gray-200 rounded-bl-lg rounded-br-lg p-2 overflow-hidden w-full">
        {children}
    </div>
  ) : null;
}
