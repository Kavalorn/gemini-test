import React, { useEffect, useState } from 'react'
import { showError } from '../../../misc/helpers';
import { useGetAllAccountsQuery, useSwitchAccountMutation } from '../../../store/services/accounts/accounts';
import { Button } from '../../common/Button/Button.component';
import { Modal } from '../../common/Modal/Modal.component';
import { ConfirmUserStatusModalProps } from './ConfirmUserStatusModal.props';

export const ConfirmUserStatusModal = ({children, item}: ConfirmUserStatusModalProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const toggleOpened = () => setIsOpened(!isOpened);

    const [ switchAccount, {isLoading, error}] = useSwitchAccountMutation();

    useEffect(() => {
      showError(error)
  }, [error]);

    const handleConfirm = () => {
        switchAccount({
          disable: !item.disabled,
          username: item.username
        }).then(() => {
          toggleOpened()
        })
    }

  return (
    <>
      {children({toggleOpened})}
      {<Modal isOpen={isOpened}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              
              <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Changing user status</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Are you sure you want to change status for {item.username} account?</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <Button fitContent loading={isLoading} onClick={handleConfirm} className="ml-2 w-fit!important">Confirm</Button>
          <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={toggleOpened}>Cancel</button>
        </div>
      
      </Modal>}
    </>
  )
}
