import React from 'react'
import cn from 'classnames'
import { TableRow } from './TableRow/TableRow.component'
import { TableHead } from './TableHead/TableHead.component'
import { GenericObject, TableProps } from './Table.props'

export const Table = <T extends GenericObject>({sortRows, headers, items, customHandlers, drawer = () => null, className, ...rest}: TableProps<T>) => {

  const renderRows = () => {
    if (sortRows) items.sort(sortRows);
    return items.map((item, index) => {
      return <TableRow item={item} headers={headers} customHandlers={customHandlers} drawer={drawer} className={cn({
        "bg-gray-50": !(index % 2)
      })} />
  })}

  return (
    <div className={cn("overflow-x-auto relative", className)} {...rest}>
      <table className="w-full text-sm text-left">
        <TableHead columnNames={headers} />
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  )
}
