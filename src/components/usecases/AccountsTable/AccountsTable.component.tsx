import React from 'react'
import { Switch } from '../../common/Switch/Switch.component'
import { Table } from '../../common/Table/Table.component'
import accounts from '../../../samples/accounts.json'
import pencilSvg from '../../../assets/images/pencil.svg'
import trashSvg from '../../../assets/images/trash.svg'
import chevronSvg from '../../../assets/images/chevron.svg'
import { Action } from '../../common/Action/Action.component'
import { PasswordCell } from './PasswordCell.component'
import cn from 'classnames'
import { Drawer, DrawerItem } from '../../common/Table/TableRow/Drawer/Drawer.component'
import { Account, GetAllAccountsResDto } from '../../../API/types'
import { ConfirmUserDeleteModal } from '../ConfirmUserDeleteModal/ConfirmUserDeleteModal.component'
import { ConfirmUserStatusModal } from '../ConfirmUserStatusModal/ConfirmUserStatusModal.component'
import { EditUserModal } from '../EditUserModal/EditUserModal.component'
export const AccountsTable = () => {
    return (
        <Table
            items={accounts as unknown as GetAllAccountsResDto}
            sortRows={(a, b) => a.username.toLocaleLowerCase() >= b.username.toLocaleLowerCase() ? 1 : -1}
            headers={{
                username: "Username",
                password: "Password",
                actions: "Actions",
            }}
            customHandlers={{
                username: (item, { isExpanded, toggleExpand }) => {
                    return <span onClick={toggleExpand}
                        className={cn("cursor-pointer", {
                            "font-bold": isExpanded
                        })}>{item.username}</span>
                },
                password: (item) => {
                    return <PasswordCell password={item.password} id={item._id} />
                },
                actions: (item, { toggleExpand, isExpanded }) => {
                    return (
                        <div className='flex flex-row'>
                            <Action label="switch">
                                <ConfirmUserStatusModal>
                                    {({ toggleOpened }) => <Switch isChecked={!item.disabled} onChange={toggleOpened} className="" />}
                                </ConfirmUserStatusModal>
                            </Action>
                            <Action label="edit">
                                <EditUserModal item={item}>
                                    {({ toggleOpened }) => <img src={pencilSvg} alt="" className='h-6 m-auto' onClick={toggleOpened} />}
                                </EditUserModal>
                            </Action>
                            <Action label="delete">
                                <ConfirmUserDeleteModal>
                                    {({ toggleOpened }) => <img src={trashSvg} alt="" className='h-6 m-auto' onClick={() => toggleOpened()} />}
                                </ConfirmUserDeleteModal>
                            </Action>
                            <Action label="expand" onClick={toggleExpand}>
                                <img src={chevronSvg} alt="" className={cn('h-6 m-auto', {
                                    "rotate-180": !isExpanded
                                })} />
                            </Action>
                        </div>
                    )
                }
            }}
            drawer={({ item, isExpanded }) => {
                return (
                    <Drawer isExpanded={isExpanded}>
                        <div className="flex mb-4">
                            <div className='font-bold w-2/12'>User-agent</div>
                            <div className='w-10/12'>{item.userAgent}</div>
                        </div>
                        <div className="flex mb-4">
                            <div className='font-bold w-2/12'>Proxies</div>
                            <div className='w-10/12'>{item.proxies.map((proxy) => <span className='border border-black px-2 py-1 mr-2 font-semibold'>{proxy}</span>)}</div>
                        </div>
                        <div className="flex">
                            <div className='font-bold w-2/12'>Cookies</div>
                            <div className='w-10/12'>
                                {Object.keys(item.cookies).map(domain => (
                                    <div>
                                        <div className='font-semibold'>{domain}</div>
                                        <ul className='mb-2'>
                                            {item.cookies[domain].map(cookie => {
                                                const { name, value, expires, httpOnly, path, secure } = cookie;
                                                const cookieString: string[] = [];
                                                cookieString.push(`${name}=${value}`)
                                                if (path) cookieString.push("Path=" + path);
                                                if (expires) cookieString.push('Expires=' + expires);
                                                if (secure) cookieString.push('Secure');
                                                if (httpOnly) cookieString.push('HttpOnly');

                                                return (
                                                    <li className='list-disc ml-5'>{cookieString.join("; ")}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Drawer>
                )
            }}
        />
    )
}
