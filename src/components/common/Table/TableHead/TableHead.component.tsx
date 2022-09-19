import React from 'react'
import { TableHeadProps } from './TableHead.props'

export const TableHead = ({ columnNames }: TableHeadProps) => {
    return (<thead className="">
        <tr>
            {Object.values(columnNames).map(name => (
                <th scope="col" className="py-3 px-6 font-extrabold">
                    {name}
                </th>
            ))}
        </tr>
    </thead>)
}