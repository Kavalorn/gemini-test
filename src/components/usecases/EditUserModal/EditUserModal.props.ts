import { ReactNode } from "react";
import { Account } from "../../../store/services/accounts/types";

export interface EditUserModalProps {
    children: ({toggleOpened}: {toggleOpened: () => void}) => ReactNode
    item?: Account,
}