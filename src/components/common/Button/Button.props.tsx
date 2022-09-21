import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    loading?: boolean;
    type?: 'button' | 'submit'
    fitContent?: boolean
}