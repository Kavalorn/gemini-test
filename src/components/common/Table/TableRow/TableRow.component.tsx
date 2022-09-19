import React, { ReactNode } from 'react';
import { GenericObject } from '../Table.props';
import { TableRowProps } from './TableRow.props';
import cn from 'classnames';

export const Cell = ({children}: {children: ReactNode}) => (
  <th scope="col" className={`py-3 px-6 font-normal`}>
    {children}
  </th>
)

export const TableRow = <T extends GenericObject>({item, headers, customHandlers, className}: TableRowProps<T>) => {
    const renderCells = () => {
      return Object.keys(headers).map((header) => {
        if (customHandlers && customHandlers[header]) return <Cell>{customHandlers[header]!(item)}</Cell>;
        if (!item[header]) return <Cell>{null}</Cell>;
        return (
          <Cell>{item[header]}</Cell>
          );
      })
    }
  
    return (
      <tr className={cn(className)}>
        {renderCells()}
      </tr>
    )
  }