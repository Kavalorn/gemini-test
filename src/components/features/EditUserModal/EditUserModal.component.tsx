import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Account } from '../../../API/types';
import { Modal } from '../../common/Modal/Modal.component';
import { EditUserModalProps } from './EditUserModal.props';
import * as Yup from 'yup'
import { Alert } from '../../common/Alert/Alert.component';
import { Cookies } from '../Cookies/Cookies.component';

export const EditUserModal = ({ children, item }: EditUserModalProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const toggleOpened = () => setIsOpened(!isOpened);

    const handleConfirm = (values: Account) => {
        console.log('values: ', values);
        toggleOpened()
    }

    const formik = useFormik({
        initialValues: item,
        validationSchema: Yup.object().shape({
            username: Yup.string().required('field username should not be empty'),
            password: Yup.string().required('field password should not be empty'),
            userAgent: Yup.string().required('field userAgent should not be empty'),
        }),
        onSubmit: (values) => {
            handleConfirm(values)
        }
    })

    return (
        <>
            {children({ toggleOpened })}
            <Modal isOpen={isOpened} className="w-10/12">
                <div className="relative bg-white rounded-lg shadow">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="authentication-modal" onClick={toggleOpened}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="py-6 px-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 ">Edit account</h3>
                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">username</label>
                                <input {...formik.getFieldProps('username')} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="provide a username..." />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">password</label>
                                <input {...formik.getFieldProps('password')} type="text" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>
                            <div>
                                <label htmlFor="userAgent" className="block mb-2 text-sm font-medium text-gray-900 ">userAgent</label>
                                <textarea {...formik.getFieldProps('userAgent')} name="userAgent" id="userAgent" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="provide a userAgent..." />
                            </div>
                            <div>
                                <div className="block mb-2 text-sm font-medium text-gray-900 ">cookies</div>                                
                                <Cookies cookies={item.cookies} className="ml-4" />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                            {Object.keys(formik.errors).length ? (<Alert>
                                {Object.keys(formik.errors).map(key => (<div>{(formik.errors as {[key: string]: string})[key]}</div>))}
                            </Alert>) : null}
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}
