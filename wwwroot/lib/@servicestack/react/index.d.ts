import * as React from 'react';
interface ErrorSummaryProps {
    responseStatus: any;
    except: string | string[];
}
export declare const ErrorSummary: React.FC<ErrorSummaryProps>;
interface InputPropsBase {
    responseStatus?: any;
    type?: string;
    id?: string;
    placeholder?: string;
    label?: string;
    help?: string;
    inline?: boolean;
    onChange?: (value: any) => void;
}
interface InputProps extends InputPropsBase {
    type?: string;
    value?: string[] | string;
    values?: any[];
    inputClass?: string;
}
export declare const Input: React.FC<InputProps>;
interface SelectProps extends InputPropsBase {
    selectClass?: string;
    multiple?: boolean;
    value?: string[] | string;
    values?: any[];
}
export declare const Select: React.FC<SelectProps>;
interface CheckBoxProps extends InputPropsBase {
    value?: boolean;
    inputClass?: string;
}
export declare const CheckBox: React.FC<CheckBoxProps>;
export {};
