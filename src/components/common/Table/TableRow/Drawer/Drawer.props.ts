import { PropsWithChildren, ReactNode } from "react";

export interface DrawerProps extends PropsWithChildren {
    isExpanded: boolean
}

export interface DrawerItemProps {
    label: ReactNode | string;
    value: ReactNode | string;
}