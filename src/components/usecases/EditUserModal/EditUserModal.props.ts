import { ReactNode } from "react";
import { Account } from "../../../API/types";

export interface EditUserModalProps {
    children: ({toggleOpened}: {toggleOpened: () => void}) => ReactNode
    item?: Account,
}