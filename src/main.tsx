import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { StateContext, StateProvider, NavItem, checkAuth } from './shared';
import { useContext, useEffect } from 'react';

import { About } from './components/About';
import { Home } from './components/Home';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';

const App: React.SFC<any> = (props:any) => {
    const {state, dispatch} = useContext(StateContext);
    
    useEffect(() => {
        (async () => await checkAuth(dispatch))();
    }, []); //only runs once on load

    return (<Router>
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        MyApp
                    </Link>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <NavItem to="/">Home</NavItem>
                            <NavItem to="/about">About</NavItem>                            
                            {!state.isAuthenticated ? <NavItem to="/login">Sign In</NavItem> : null}
                            {!state.isAuthenticated ? <NavItem to="/signup">Sign Up</NavItem> : null}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container">
                <div className="row p-4">
                    <div id="content">
                        <Route exact path="/" component={Home} activeClassName="active" />
                        <Route path="/about" component={About} activeClassName="active" />
                        <Route path="/login" component={SignIn} activeClassName="active" />
                        <Route path="/signup" component={SignUp} activeClassName="active" />
                    </div>
                </div>
            </div>
        </div>        
    </Router>);
}

ReactDOM.render(<StateProvider><App /></StateProvider>, 
    document.getElementById('app'));
