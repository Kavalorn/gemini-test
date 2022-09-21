import React, { ReactNode, useState } from 'react';
import { GenericObject } from '../Table.props';
import { TableRowProps } from './TableRow.props';
import cn from 'classnames';

export const Cell = ({ children }: { children: ReactNode }) => (
  <th scope="col" className={`py-3 px-6 font-normal`}>
    {children}
  </th>
)

export const TableRow = <T extends GenericObject>({ item, headers, customHandlers, drawer, className }: TableRowProps<T>) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const renderCells = () => {
    return Object.keys(headers).map((header) => {
      if (customHandlers && customHandlers[header]) return <Cell key={header}>{customHandlers[header]!(item, { toggleExpand, isExpanded })}</Cell>;
      if (!item[header]) return <Cell key={header}>{null}</Cell>;
      return (
        <Cell key={header}>{item[header]}</Cell>
      );
    })
  }

  return (
    <>
      <tr className={cn(className)}>
        {renderCells()}
      </tr>
      <tr>
        <td colSpan={Object.keys(headers).length}>
          {drawer({item, isExpanded})}
        </td>
      </tr>
    </>
  )
}