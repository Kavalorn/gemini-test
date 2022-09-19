import { DetailedHTMLProps, HTMLAttributes } from "react";



export interface TableProps<T> extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    headers: {[key: string]: string}
    items: T[]
    customHandlers?: CustomHandlers<T>
}

export type CustomHandlers<T> = Partial<
  Record<string, (it: T) => React.ReactNode>
>;

export type GenericObject = {
    [key: string]: any
    _id: string
}