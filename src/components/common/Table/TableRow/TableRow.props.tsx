import { DetailedHTMLProps, HTMLAttributes } from "react";
import { CustomHandlers, GenericObject } from "../Table.props";



export interface TableRowProps<T extends GenericObject> extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    headers: {[key: string]: string}
    item: T
    customHandlers?: CustomHandlers<T>
}