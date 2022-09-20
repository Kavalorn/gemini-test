import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { CustomHandlers, GenericObject } from "../Table.props";



export interface TableRowProps<T extends GenericObject> extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    headers: {[key: string]: string}
    item: T
    customHandlers?: CustomHandlers<T>
    drawer: ({item, isExpanded}: {item: T, isExpanded: boolean}) => ReactNode
}

export type DrawerHandlers<T> = Partial<
  Record<string, (
    it: T,
  ) => React.ReactNode | string>
>;