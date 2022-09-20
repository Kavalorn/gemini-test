import React, { useState } from 'react'

export const PasswordCell = ({password = "", id}: {password: string, id: string}) => {
    const [shown, setShown] = useState<boolean>(false);

    const toggle = () => setShown(!shown);

    return (
        <div>
            <div>{shown ? password  : "********"}</div>
            <div className="flex items-center">
                <input checked={shown} onChange={toggle} id={id} type="checkbox" value="" className="w-4 h-4 bg-gray-100 rounded border-gray-300" />
                <label htmlFor={id} className="ml-2 text-sm font-light">Show password</label>
            </div>
        </div>
    )
}
