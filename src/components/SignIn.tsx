import * as React from 'react';
import * as classNames from "classnames";
import { useState, useContext } from 'react';
import { StateContext, client, Authenticate, queryString, redirect } from '../shared'
import { ErrorSummary, Input, CheckBox } from '../shared/controls';
import { Link, withRouter } from "react-router-dom";
import { History } from 'history';

const SignInImpl: React.FC<any> = ({ history }) => {
    const {state, dispatch} = useContext(StateContext);

    const [loading, setLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    const switchUser = (email:string) => {
        setUserName(email);
        setPassword('p@55wOrd');
    };

    const submit = async () => {
        try {
            setLoading(true);
            setResponseStatus(null);

            const response = await client.post(new Authenticate({
                provider: 'credentials',
                userName,
                password,
                rememberMe,
            }));

            dispatch({ type:'signin', data:response });
            setLoading(false);
            redirect(history as History, queryString(history.location.search)['redirect'] || '/');
            
        } catch (e) {
            setResponseStatus(e.responseStatus || e);
            setLoading(false);
        }
    }

    return (<div>
        <h3>Sign In</h3>
        
        <form className={classNames({error:responseStatus, loading})} 
              onSubmit={async e => { e.preventDefault(); await submit(); }}>
            <div className="form-group">
                <ErrorSummary responseStatus={responseStatus} except={'userName,password'} />
            </div>
            <div className="form-group">
                <Input type="text" name="userName" value={userName} onChange={setUserName} responseStatus={responseStatus} placeholder="UserName" />
            </div>
            <div className="form-group">
                <Input type="password" name="password" value={password} onChange={setPassword} responseStatus={responseStatus} placeholder="Password" />
            </div>
            <div className="form-group">
                <CheckBox name="rememberMe" checked={rememberMe} onChange={setRememberMe} responseStatus={responseStatus}>
                    Remember Me
                </CheckBox>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-lg btn-primary">Login</button>
            </div>
            <div className="form-group">
                <Link className="btn btn-outline-primary" to="/signup">Register New User</Link>
            </div>
        </form>
        
        <div className="pt-3">
            <b>Quick Login:</b>
            <p className="pt-1">
                <a className="btn btn-outline-info btn-sm" href="javascript:void(0)" onClick={() => switchUser('admin@email.com')}>admin@email.com</a>
                {" "}
                <a className="btn btn-outline-info btn-sm" href="javascript:void(0)" onClick={() => switchUser('new@user.com')}>new@user.com</a>
            </p>
        </div>
    </div>);
}

export const SignIn = withRouter(SignInImpl);
