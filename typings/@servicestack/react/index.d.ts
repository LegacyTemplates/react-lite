import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { NavItem, NavOptions } from '@servicestack/client';
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
interface BootstrapColorProps {
    primary?: boolean;
    'outline-primary'?: boolean;
    secondary?: boolean;
    'outline-secondary'?: boolean;
    success?: boolean;
    'outline-success'?: boolean;
    info?: boolean;
    'outline-info'?: boolean;
    warning?: boolean;
    'outline-warning'?: boolean;
    danger?: boolean;
    'outline-danger'?: boolean;
    light?: boolean;
    'outline-light'?: boolean;
    dark?: boolean;
    'outline-dark'?: boolean;
}
interface BootstrapSizeProps {
    lg?: boolean;
    sm?: boolean;
    xs?: boolean;
}
interface BootstrapModifierProps {
    block?: boolean;
    vertical?: boolean;
    horizontal?: boolean;
}
declare type NavItemsProps = RouteComponentProps<any> & {
    items: NavItem[];
    options?: NavOptions;
    attributes?: string[];
    activePath?: string;
    baseHref?: string;
    navClass?: string;
    navItemClass?: string;
    navLinkClass?: string;
    childNavItemClass?: string;
    childNavLinkClass?: string;
    childNavMenuClass?: string;
    childNavMenuItemClass?: string;
};
export declare const Nav: any;
export declare const Navbar: any;
export declare const ALink: React.FC<any>;
export declare const NavLink: any;
export declare type NavButtonGroupProps = NavItemsProps & BootstrapSizeProps & BootstrapColorProps & BootstrapModifierProps;
export declare const NavButtonGroup: any;
export declare const NavLinkButton: any;
export declare const LinkButton: any;
declare type ButtonProps = BootstrapColorProps & BootstrapSizeProps & BootstrapModifierProps & {
    type?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    id?: string;
    className?: string;
};
export declare const Button: React.FC<ButtonProps>;
export declare const Fallback: any;
interface ForbiddenProps {
    message?: string;
    path?: string;
    role?: string;
    permission?: string;
}
export declare const Forbidden: React.FC<ForbiddenProps>;
interface SvgImageProps {
    id: string;
    fill?: string;
    className?: string;
    width?: number;
    height?: number;
    style?: any;
    baseUrl?: string;
}
export declare const SvgImage: React.FC<SvgImageProps>;
export {};
