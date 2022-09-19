import React from 'react'
import { Switch } from '../../common/Switch/Switch.component'
import { Table } from '../../common/Table/Table.component'
import accounts from '../../../samples/accounts.json'
import pencilSvg from '../../../assets/images/pencil.svg'
import trashSvg from '../../../assets/images/trash.svg'
import { Action } from '../../common/Action/Action.component'
import { PasswordCell } from './PasswordCell.component'
export const AccountsTable = () => {
    return (
        <Table
            items={accounts}
            headers={{
                username: "Username",
                password: "Password",
                actions: "Actions",
            }}
            customHandlers={{
                password: (item) => {
                    return <PasswordCell password={item.password} id={item._id} />
                },
                actions: (item) => {
                    return (
                        <div className='flex flex-row'>
                            <Action label="switch">
                                <Switch isChecked={!item.disabled} onChange={() => { }} className="" />
                            </Action>
                            <Action label="edit">
                                <img src={pencilSvg} alt="" className='h-6 m-auto' />
                            </Action>
                            <Action label="delete">
                                <img src={trashSvg} alt="" className='h-6 m-auto' />
                            </Action>
                        </div>
                    )
                }
            }} />
    )
}
