import { Field, FieldProps, Form, Formik, FormikHelpers, FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Modal } from '../../common/Modal/Modal.component';
import { EditUserModalProps } from './EditUserModal.props';
import * as Yup from 'yup'
import { Alert } from '../../common/Alert/Alert.component';
import { Cookies } from '../Cookies/Cookies.component';
import _ from 'lodash';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { Account, Cookie, ICookies } from '../../../store/services/accounts/types';
import { useGetProxiesQuery } from '../../../store/services/proxies/proxies';
import { useAddAccountMutation, useUpdateAccountMutation } from '../../../store/services/accounts/accounts';
import { showError } from '../../../misc/helpers';
import { Button } from '../../common/Button/Button.component';

const initialValues: Account = {
    "_id": "",
    "password": "",
    "proxies": [],
    "cookies": {},
    "userAgent": "",
    "username": ""
  }

export const Proxies = (props: FieldProps) => {
    const {data = [], isLoading, error} = useGetProxiesQuery()

    useEffect(() => {
        showError(error)
    }, [error]);

    return (
    <Select
        closeMenuOnSelect={false}
        isMulti
        options={data.map(({label}) => ({label, value: label}))}
        value={props.field.value.map((value: string) => ({label: value, value}))}
        onChange={(newValue) => props.form.setFieldValue('proxies', newValue.map(({value}) => value))}
        isLoading={isLoading}
        placeholder={"select proxies..."}
      />
    )
}

export const EditUserModal = ({ children, item }: EditUserModalProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const toggleOpened = () => setIsOpened(!isOpened);

     const [updateAccount, {error: updateAccountError, isLoading: updateAccountIsLoading}] = useUpdateAccountMutation()
     const [addAccount, {error: addAccountError, isLoading: addAccountIsLoading}] = useAddAccountMutation()

     useEffect(() => {
        showError(updateAccountError)
    }, [updateAccountError]);

    useEffect(() => {
        showError(addAccountError)
    }, [addAccountError]);

    const handleConfirm = (values: Account, helpers: FormikHelpers<Account>) => {
        if (item) {
            updateAccount(values)
            .then(() => {
                toggleOpened()
            })
        } else {
            addAccount(values)
            .then(() => {
                toggleOpened()
                helpers.resetForm()
            })
        }
    }

    initialValues._id = uuidv4();

    return (
        <>
            {children({ toggleOpened })}
            <Formik
                initialValues={item ? item : initialValues}
                validationSchema={Yup.object().shape({
                    username: Yup.string().required('field username should not be empty'),
                    password: Yup.string().required('field password should not be empty'),
                    userAgent: Yup.string().required('field userAgent should not be empty'),
                    cookies: Yup.mixed().test({
                        name: "cookies-with-label-and-value",
                        message: "There shouldn`t be cookies without name or value in any domain",
                        test: (object: ICookies) => {
                          let result: boolean = true;
                          const values = Object.keys(object).reduce<any>((acc, domain) => [...acc, ...object[domain]], []);
                          result = (values as Cookie[]).some(cookie => !cookie.name || !cookie.value) ? false : true
                          return result;
                        },
                      }),
                })}
                onSubmit={(values, helpers) => {
                    handleConfirm(values, helpers)
                }}
                enableReinitialize={true}
            >
            {(props: FormikProps<Account>) => (
                    <Modal isOpen={isOpened} className="w-10/12">
                        <div className="relative bg-white rounded-lg shadow">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="authentication-modal" onClick={toggleOpened}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="py-6 px-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 ">{`${item ? "Edit" : "Add"}`} account</h3>
                                <Form className="space-y-6">
                                    <Field name="username">
                                        {({field}: FieldProps) => (
                                            <div>
                                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">username</label>
                                                <input {...field} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="provide a username..." />
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({field}: FieldProps) => (
                                            <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">password</label>
                                                <input {...field} type="text" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="userAgent">
                                        {({field}: FieldProps) => (
                                            <div>
                                                <label htmlFor="userAgent" className="block mb-2 text-sm font-medium text-gray-900 ">userAgent</label>
                                                <textarea {...field} name="userAgent" id="userAgent" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="provide a userAgent..." />
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="proxies">
                                        {(props: FieldProps) => (
                                            <div>
                                                <div className="block mb-2 text-sm font-medium text-gray-900 ">proxies</div>                                
                                                <Proxies {...props} />
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="cookies">
                                    {({field}: FieldProps) => (
                                        <div>
                                            <div className="block mb-2 text-sm font-medium text-gray-900 ">cookies</div>                                
                                            <Cookies cookies={field.value} className="ml-4" />
                                        </div>
                                    )}
                                    </Field>
                                    <Button type={"submit"} loading={updateAccountIsLoading || addAccountIsLoading}>Save account</Button>
                                    {Object.keys(props.errors).length ? (<Alert>
                                        {Object.keys(props.errors).map(key => (<div>{(props.errors as {[key: string]: string})[key]}</div>))}
                                    </Alert>) : null}
                                </Form>
                            </div>
                        </div>
                    </Modal>
                        )}
            </Formik>
        </>
    )
}
