import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { ModalProps } from './Modal.props'
import cn from 'classnames';
export const Modal = ({isOpen = false, className, children}: ModalProps) => {

  return isOpen ? ReactDOM.createPortal(
(<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div className={"fixed inset-0 z-10 overflow-y-auto"}>
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className={cn("relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 min-w-max", className)}>
        {children}
      </div>
    </div>
  </div>
</div>)
  , document.getElementById("modal")!) : null;
}
