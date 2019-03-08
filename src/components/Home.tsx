import * as React from 'react';
import { StateContext, NavItem, client, Hello, signout } from '../shared';
import { Input } from '../shared/controls';
import { useState, useEffect, useContext } from 'react';

export const Home: React.SFC<any> = (props:any) => {
    const {state, dispatch} = useContext(StateContext);
    const [name, setName] = useState('React');
    const [result, setResult] = useState('');

    useEffect(() => {
        (async () => {
            setResult(!name ? '' : (await client.get(new Hello({ name }) )).result)
        })();
    }, [name]); //fires when name changes

    return (<div className="container">
        <div className="row">
            <div className="form-group">
                <div>/hello API:</div>
                <Input value={name} onChange={(setName)} placeholder="Your name" />
                <h3 className="result pt-2">{ result }</h3>
            </div>
        </div>
        <div className="row">
            {state.isAuthenticated ? 
            (<div>
                <p className="pt-3">{`Hi ${state.userSession!.displayName}!`}</p> 
                <a className="btn btn-primary" href="javascript:void(0)" onClick={async () => await signout(dispatch) }>Sign Out</a>
            </div>) : 
            (<div>
                <p className="pt-3">You're not authenticated, please Sign In:</p>
                <ul className="nav flex-column">
                    <NavItem to="/signin">Sign In</NavItem>
                    <NavItem to="/signup">Register new User</NavItem>
                </ul>
            </div>)}
        </div>
    </div>);
}
