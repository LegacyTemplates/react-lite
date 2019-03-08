import * as React from "react";
import { createContext, useReducer, useEffect, useContext } from "react";
import * as ReactDOM from "react-dom";
import { JsonServiceClient } from "@servicestack/client";
import { Link, withRouter } from "react-router-dom";
import * as classNames from "classnames";

export var client = new JsonServiceClient("/");

export {
  errorResponse, errorResponseExcept,
  splitOnFirst, toPascalCase
} from "@servicestack/client";

export {
  ResponseStatus, ResponseError,
  Authenticate, AuthenticateResponse,
  Register,
  Hello, HelloResponse
} from "./dtos";

import {
  ResponseStatus, ResponseError,
  Authenticate, AuthenticateResponse
} from "./dtos";

class NavItemImpl extends React.Component<any, any> {
  public render() {
    const { to, location, children } = this.props;
    const active = location.pathname === to;

    return (
      <li role="presentation" className={classNames("nav-item", { active })}>
        <Link to={to} className="nav-link">
          {children}
        </Link>
      </li>
    );
  }
}
export const NavItem = withRouter(NavItemImpl);

// Shared state between all Components
interface State {
  isAuthenticated: boolean;
  userSession: { displayName:string } | null;
}
interface Action {
    type: 'signout' | 'signin'
    data?: any
}
const initialState: State = {
  isAuthenticated: false,
  userSession: null
};

const reducer = (state:State, action:Action) => {
    switch (action.type) {
        case 'signin':
            return { ...state, isAuthenticated:true, userSession:action.data };
        case 'signout':
            return { ...state, isAuthenticated:false, userSession:null };
        default:
            throw new Error();
    }
}

interface Context {
    state:State,
    dispatch:React.Dispatch<Action>
}

export const StateContext = createContext({} as Context);

export const StateProvider = (props:any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (<StateContext.Provider value={{ state, dispatch }}>{props.children}</StateContext.Provider>);
}

type Dispatch = React.Dispatch<Action>;

export const checkAuth = async (dispatch:Dispatch) => {
    try {
        dispatch({ type: 'signin', data: await client.post(new Authenticate()) });
    } catch (e) {
        dispatch({ type: 'signout' });
    }
};

export const signout = async (dispatch:Dispatch) => {
    dispatch({ type: 'signout'});
    await client.post(new Authenticate({ provider: "logout" }));
};
