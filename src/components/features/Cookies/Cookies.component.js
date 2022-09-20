import React, {useState} from 'react'
import {Switch2} from '../../common/Switch/Switch.component';

export const DomainEditForm = ({domainName, cookies, toggleEdit}) => {
    return (
        <div className="py-6 px-6 lg:px-8 border rounded-md my-4">
            <h3 className="mb-4 text-xl font-medium text-gray-900 ">Edit domain</h3>
            <form className="space-y-6">
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">domain</label>
                    <input value={domainName} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="provide a username..." />
                </div>
                {cookies[domainName].map(cookie => <Cookie cookie={cookie} editable />)}
                <div className="flex">
                    <button className="w-full border hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4" onClick={toggleEdit}>Cancel</button>
                    <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                </div>
            </form>
        </div>
    )
}

export const CookieForm = ({cookie, toggleEdit}) => {
    return (
        <div className="py-6 px-6 lg:px-8 border rounded-md my-4">
            <h3 className="mb-4 text-xl font-medium text-gray-900 ">Edit cookie</h3>
            <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="provide a username..." />
                </div>
                <div>
                    <label htmlFor="value" className="block mb-2 text-sm font-medium text-gray-900 ">Value</label>
                    <input type="text" name="value" id="value" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="provide a username..." />
                </div>
                <div>
                    <label htmlFor="path" className="block mb-2 text-sm font-medium text-gray-900 ">Path</label>
                    <input type="text" name="path" id="path" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="provide a username..." />
                </div>
                <div>
                    <label htmlFor="expires" className="block mb-2 text-sm font-medium text-gray-900 ">Expires</label>
                    <input type="text" name="expires" id="expires" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="provide a username..." />
                </div>
                <div className="flex">
                    <input type="checkbox" className="mr-4 mb-1.5" />
                    <label htmlFor="secure" className="block mb-2 text-sm font-medium text-gray-900 ">Secure</label>
                </div>
                <div className="flex">
                    <input type="checkbox" className="mr-4 mb-1.5" />
                    <label htmlFor="httpOnly" className="block mb-2 text-sm font-medium text-gray-900 ">HttpOnly</label>
                </div>
                <div className="flex">
                    <button type="button" className="w-full border hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4" onClick={toggleEdit}>Cancel</button>
                    <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                </div>
                {/* {Object.keys(formik.errors).length ? (<Alert>
                    {Object.keys(formik.errors).map(key => (<div>{(formik.errors as {[key: string]: string})[key]}</div>))}
                </Alert>) : null} */}
            </form>
        </div>
    )
}

export const Cookie = ({cookie, editable = false}) => {
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => setEdit(!edit);

    const { name, value, expires, httpOnly, path, secure } = cookie;
    const cookieString = [];
    cookieString.push(`${name}=${value}`)
    if (path) cookieString.push("Path=" + path);
    if (expires) cookieString.push('Expires=' + expires);
    if (secure) cookieString.push('Secure');
    if (httpOnly) cookieString.push('HttpOnly');

    return !edit ? (
        <div className="flex">
        <li className='list-disc ml-5 mr-4'>{
            cookieString.join('; ')
        }
        </li>
        {editable ? (
            <>
                <span className='block border px-2 py-0.5 mr-4 rounded-md cursor-pointer text-xs hover:text-white hover:bg-slate-600' onClick={toggleEdit}>edit</span>
                <span className='block border px-2 py-0.5 mr-4 rounded-md cursor-pointer text-xs hover:text-white hover:bg-slate-600'>delete</span>
            </>
        ) : null}
    </div>
    ) : <CookieForm cookie={cookie} toggleEdit={toggleEdit} />
}

export const Domain = ({domainName, cookies, className}) => {
    const [edit, setEdit] = useState(false);

    const toggleEdit = () => setEdit(!edit);

    return !edit ? (
        <div className={className}>
            <div className="flex mb-2">
                <div className='font-semibold mr-5'>{domainName}</div> 
                <span className='block border px-2 py-0.5 mr-4 rounded-md cursor-pointer text-xs hover:text-white hover:bg-slate-600' onClick={toggleEdit}>edit</span>
                <span className='block border px-2 py-0.5 mr-4 rounded-md cursor-pointer text-xs hover:text-white hover:bg-slate-600'>delete</span>
            </div>
            <ul className='mb-2'>
                {cookies[domainName].map(cookie => <Cookie cookie={cookie} />)}
            </ul>
        </div>
    ) : <DomainEditForm domainName={domainName} cookies={cookies} toggleEdit={toggleEdit} />
}

export const Cookies = ({cookies, className = ""}) => {

  return (
    <>
    <span className='border px-2 py-0.5 mr-4 rounded-md cursor-pointer text-xs hover:text-white hover:bg-slate-600 ml-3'>add domain</span>
        {Object.keys(cookies).map(domain => <Domain cookies={cookies} domainName={domain} className />)}
    </>
  )
}
