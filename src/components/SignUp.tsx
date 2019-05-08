import * as React from 'react';
import * as classNames from "classnames";
import { useState, useContext } from 'react';
import { StateContext, client, checkAuth, Register, toPascalCase, splitOnFirst } from '../shared'
import { ErrorSummary, Input, CheckBox } from '@servicestack/react';
import { withRouter } from "react-router-dom";
import { History } from 'history';

export const SignUpImpl: React.FC<any> = ({ history }) => {
    const {state, dispatch} = useContext(StateContext);

    const [loading, setLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(true);

    const newUser = (email:string) => {
        const names = email.split('@');
        setDisplayName(toPascalCase(names[0]) + " " + toPascalCase(splitOnFirst(names[1],'.')[0]));
        setEmail(email);
        setPassword('p@55wOrd');
        setConfirmPassword('p@55wOrd');
    }

    const submit = async () => {
        try {
            setLoading(true);
            setResponseStatus(null);

            const response = await client.post(new Register({
                displayName,
                email,
                password,
                confirmPassword,
                autoLogin,
            }));
            
            await checkAuth(dispatch);
            setLoading(false);

            (history as History).push('/');
        } catch (e) {
            setResponseStatus(e.responseStatus || e);
            setLoading(false);
        }
    };

    return (<div>
        <h3>Register New User</h3>
    
        <form className={classNames({error:responseStatus, loading})} 
              onSubmit={async e => { e.preventDefault(); await submit(); }}>
            <div className="form-group">
                <ErrorSummary except={'displayName,email,password,confirmPassword'} responseStatus={responseStatus} />
            </div>
            <div className="form-group">
                <Input type="text" id="displayName" value={displayName} onChange={setDisplayName} responseStatus={responseStatus}
                       placeholder="Display Name" label="Name" help="Your first and last name" />
            </div>
            <div className="form-group">
                <Input type="text" id="email" value={email} onChange={setEmail} responseStatus={responseStatus}
                       placeholder="Email" label="Email" />
            </div>
            <div className="form-group">
                <Input type="password" id="password" value={password} onChange={setPassword} responseStatus={responseStatus}
                       placeholder="Password" label="Password" />
            </div>
            <div className="form-group">
                <Input type="password" id="confirmPassword" value={confirmPassword} onChange={setConfirmPassword} responseStatus={responseStatus}
                       placeholder="Confirm" label="Confirm Password" />
            </div>
            <div className="form-group">
                <CheckBox id="autoLogin" value={autoLogin} onChange={setAutoLogin} responseStatus={responseStatus}>
                    Auto Login
                </CheckBox>
            </div>
            <div className="form-group">
                <button className="btn btn-lg btn-primary" type="submit">Register</button>
            </div>
            <div className="pt-3">
            <b>Quick Populate:</b>
                <p className="pt-1">
                    <a className="btn btn-outline-info btn-sm" href="javascript:void(0)" onClick={() => newUser('new@user.com')}>new@user.com</a>
                </p>
            </div>
        </form>
        </div>);
}

export const SignUp = withRouter(SignUpImpl);
