import * as React from 'react';
import * as classNames from "classnames";
import { client, ResponseStatus, errorResponse, errorResponseExcept } from '../shared'

interface ErrorSummaryProps {
    responseStatus: any,
    except: string | string[]
}
export const ErrorSummary: React.SFC<ErrorSummaryProps> = ({ responseStatus, except }) => {
    const self = { responseStatus };
    const errorSummary = errorResponseExcept.call(self,except);
    return (errorSummary ? <div className="alert alert-danger mt-2">{errorSummary}</div> : null);
}

interface InputPropsBase {
    responseStatus?: any,
    name?: string;
    placeholder?: string;
    value?: string;
    className?: string;
    onChange?: (value:any) => void;
}

interface InputProps extends InputPropsBase {
    type?: string;
}

export const Input: React.SFC<InputProps> = (props) => {
    const { responseStatus, type, name, value, onChange, className, placeholder, ...remaining } = props;
    const self = { responseStatus };
    const errorField = name && errorResponse.call(self,name);
    const fn = onChange;

    return (<>
        <input type={type || 'text'} name={name} value={value}
               className={classNames('form-control',{'is-invalid':errorField}, className || 'form-control-lg')}
               onChange={e => { if (fn) fn(e.target.value); }} placeholder={placeholder} 
               {...remaining} />
        {errorField ? <div className="invalid-feedback">{errorField}</div> : null}
    </>);
}

interface CheckBoxProps extends InputPropsBase {
    checked?: boolean
}

export const CheckBox: React.SFC<CheckBoxProps> = (props) => {
    const { responseStatus, name, checked, onChange, className } = props;
    const self = { responseStatus };
    const errorField = name && errorResponse.call(self,name);
    const fn = onChange;

    return (<><div className={classNames('form-check', {'is-invalid':errorField,'form-control':errorField})}>
        <input type="checkbox" id={name} name={name} checked={checked} value="true"
               className={classNames('form-check-input',{'is-invalid':errorField}, className || '')}
               onChange={e => { if (fn) fn(e.target.checked); }} />
        {" "}
        <label className="form-check-label" htmlFor={name}>{props.children}</label>
    </div>
    {errorField ? <div className="invalid-feedback">{errorField}</div> : null}
    </>);
}
