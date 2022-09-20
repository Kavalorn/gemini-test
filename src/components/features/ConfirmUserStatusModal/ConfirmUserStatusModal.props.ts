import { ReactNode } from "react";

export interface ConfirmUserStatusModalProps {
    children: ({toggleOpened}: {toggleOpened: () => void}) => ReactNode
}