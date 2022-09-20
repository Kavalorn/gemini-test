import { ReactNode } from "react";

export interface ConfirmUserDeleteModalProps {
    children: ({toggleOpened}: {toggleOpened: () => void}) => ReactNode;
    accountId: string;
}