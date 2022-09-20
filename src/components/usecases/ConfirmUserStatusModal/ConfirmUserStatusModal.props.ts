import { ReactNode } from "react";
import { Account } from "../../../store/services/accounts/types";

export interface ConfirmUserStatusModalProps {
    children: ({toggleOpened}: {toggleOpened: () => void}) => ReactNode
    item: Account & {disabled: boolean}
}