import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";



export interface TableProps<T> extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sortRows?: (a: T, b: T) => number
  headers: { [key: string]: string }
  items: T[]
  customHandlers?: CustomHandlers<T>
  drawer?: ({item, isExpanded}: {item: T, isExpanded: boolean}) => ReactNode
}

export type CustomHandlers<T> = Partial<
  Record<string, (
    it: T,
    { toggleExpand, isExpanded }: { toggleExpand: () => void, isExpanded: boolean }
  ) => React.ReactNode>
>;

export type GenericObject = {
  [key: string]: any
  _id: string
}