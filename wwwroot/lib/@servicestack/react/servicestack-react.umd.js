var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "react-router-dom", "@servicestack/client"], factory);
    }
    else if (typeof window != "undefined") factory(window.require||function(){}, window["@servicestack/react"]={});
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react") || window.React;
    var react_router_dom_1 = require("react-router-dom") || window.ReactRouterDOM;
    var client_1 = require("@servicestack/client") || window["@servicestack/client"];
    exports.ErrorSummary = function (_a) {
        var responseStatus = _a.responseStatus, except = _a.except;
        var self = { responseStatus: responseStatus };
        var errorSummary = client_1.errorResponseExcept.call(self, except);
        return (errorSummary ? React.createElement("div", { className: "alert alert-danger mt-2" }, errorSummary) : null);
    };
    exports.Input = function (props) {
        var responseStatus = props.responseStatus, type = props.type, id = props.id, placeholder = props.placeholder, label = props.label, help = props.help, inputClass = props.inputClass, inline = props.inline, value = props.value, values = props.values, onChange = props.onChange, remaining = __rest(props, ["responseStatus", "type", "id", "placeholder", "label", "help", "inputClass", "inline", "value", "values", "onChange"]);
        if (!type)
            type = 'text';
        if (!inputClass)
            inputClass = 'form-control-lg';
        var isCheck = type == 'radio' || type == 'checkbox';
        ;
        var self = { responseStatus: responseStatus };
        var errorField = id && client_1.errorResponse.call(self, id);
        var hasError = !!errorField;
        var fn = onChange;
        var kvpValues = (values || []).map(function (x) { return typeof x == 'string'
            ? { key: x, value: x }
            : x; });
        var onInput = function (e) { if (fn)
            fn(e.target.value); };
        var onInputValues = function (e) { if (fn)
            fn(inputSelectedValues(e.target)); };
        var hasValue = function (elValue) {
            return type == 'checkbox'
                ? (value instanceof Array
                    ? value.indexOf(elValue) >= 0
                    : false)
                : value == elValue;
        };
        return (React.createElement("div", null,
            label ? React.createElement("label", { className: isCheck ? 'form-check-label' : 'form-label', htmlFor: id }, label) : null,
            isCheck ?
                (React.createElement("div", { className: client_1.classNames('form-check', { 'is-invalid': hasError, 'form-control': hasError }) },
                    type == 'radio' ?
                        kvpValues.map(function (kvp) {
                            return (React.createElement("div", { key: id + "-" + kvp.key, className: client_1.classNames('custom-control', 'custom-radio', { 'custom-control-inline': inline }) },
                                React.createElement("input", { type: "radio", id: id + "-" + kvp.key, name: id, value: kvp.key, className: client_1.classNames('custom-control-input', inputClass), checked: value == kvp.key, onChange: onInput }),
                                React.createElement("label", { className: "custom-control-label", htmlFor: id + "-" + kvp.key }, kvp.value)));
                        }) : null,
                    type == 'checkbox' ?
                        kvpValues.map(function (kvp) {
                            return (React.createElement("div", { key: id + "-" + kvp.key, className: client_1.classNames('custom-control', 'custom-checkbox', { 'custom-control-inline': inline }) },
                                React.createElement("input", { type: "checkbox", id: id + "-" + kvp.key, name: id, value: kvp.key, className: "form-check-input", checked: hasValue(kvp.key), onChange: onInputValues }),
                                React.createElement("label", { className: "form-check-label", htmlFor: id + "-" + kvp.key }, kvp.value)));
                        }) : null,
                    help ? React.createElement("small", { className: "text-muted" }, help) : null))
                : null,
            !isCheck ? React.createElement("input", __assign({ type: type, id: id, name: id, value: value, className: client_1.classNames('form-control', { 'is-invalid': errorField }, inputClass), onChange: function (e) { if (fn)
                    fn(e.target.value); }, placeholder: placeholder }, remaining)) : null,
            !isCheck && help ? React.createElement("small", { className: "text-muted" }, help) : null,
            errorField ? React.createElement("div", { className: "invalid-feedback" }, errorField) : null));
        function inputSelectedValues(input) {
            if (input.form == null)
                throw new Error("multiple values must be within a <form> element");
            var selectedValues = [];
            var elements = input.form.elements;
            for (var i = 0; i < elements.length; i++) {
                var el = elements[i];
                if (el.name == input.name && el.checked) {
                    selectedValues.push(el.value);
                }
            }
            return selectedValues;
        }
    };
    exports.Select = function (props) {
        var responseStatus = props.responseStatus, id = props.id, label = props.label, help = props.help, selectClass = props.selectClass, multiple = props.multiple, value = props.value, values = props.values, onChange = props.onChange;
        var self = { responseStatus: responseStatus };
        var errorField = id && client_1.errorResponse.call(self, id);
        var hasError = !!errorField;
        var kvpValues = (values || []).map(function (x) { return typeof x == 'string'
            ? { key: x, value: x }
            : x; });
        var hasValue = function (elValue) {
            return multiple
                ? (value instanceof Array
                    ? value.indexOf(elValue) >= 0
                    : false)
                : value == elValue;
        };
        var fn = onChange;
        var onInputValues = function (e) { if (fn)
            fn(multiple ? selectedOptions(e.target) : e.target.value); };
        return (React.createElement("div", null,
            label ? React.createElement("label", { className: "form-label", htmlFor: id }, label) : null,
            React.createElement("select", { id: id, name: id, className: client_1.classNames('form-control', { 'is-invalid': errorField }, selectClass), multiple: multiple, value: value, onChange: onInputValues }, kvpValues.map(function (kvp) {
                return (React.createElement("option", { key: kvp.key, value: kvp.key }, kvp.value));
            })),
            help ? React.createElement("small", { className: "text-muted" }, help) : null,
            errorField ? React.createElement("div", { className: "invalid-feedback" }, errorField) : null));
    };
    function selectedOptions(select) {
        var selectedValues = [];
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].selected) {
                selectedValues.push(select.options[i].value);
            }
        }
        return selectedValues;
    }
    exports.CheckBox = function (props) {
        var responseStatus = props.responseStatus, id = props.id, value = props.value, help = props.help, onChange = props.onChange, inputClass = props.inputClass;
        var self = { responseStatus: responseStatus };
        var errorField = id && client_1.errorResponse.call(self, id);
        var fn = onChange;
        var onInput = function (e) { if (fn)
            fn(e.target.checked); };
        return (React.createElement("div", null,
            React.createElement("div", { className: client_1.classNames('form-check', { 'is-invalid': errorField, 'form-control': errorField }) },
                React.createElement("input", { type: "checkbox", id: id, name: id, onChange: onInput, checked: value, value: "true", className: client_1.classNames('form-check-input', { 'is-invalid': errorField }, inputClass) }),
                React.createElement("label", { className: "form-check-label", htmlFor: id }, props.children)),
            help ? React.createElement("small", { className: "text-muted" }, help) : null,
            errorField ? React.createElement("div", { className: "invalid-feedback" }, errorField) : null));
    };
    function parseIconHtml(html) {
        var match = /class="([^"]+)/.exec(html);
        if (match != null) {
            return React.createElement("i", { className: match[1] });
        }
        return null;
    }
    exports.Nav = react_router_dom_1.withRouter(function (_a) {
        var items = _a.items, options = _a.options, remaining = __rest(_a, ["items", "options"]);
        if (items == null || items.length === 0) {
            return null;
        }
        options = Object.assign(client_1.NavDefaults.forNav(options), remaining);
        return (React.createElement("div", { className: options.navClass }, items.map(function (x) { return React.createElement(exports.NavLink, { key: x.href || x.label, item: x, options: options }); })));
    });
    exports.Navbar = react_router_dom_1.withRouter(function (_a) {
        var items = _a.items, options = _a.options, remaining = __rest(_a, ["items", "options"]);
        if (items == null || items.length === 0) {
            return null;
        }
        options = Object.assign(client_1.NavbarDefaults.forNavbar(options), remaining);
        return (React.createElement(exports.Nav, { items: items, options: options }));
    });
    exports.ALink = function (_a) {
        var to = _a.to, onClick = _a.onClick, children = _a.children, attrs = __rest(_a, ["to", "onClick", "children"]);
        if (onClick != null) {
            return (React.createElement("a", __assign({ href: "javascript:void(0)", onClick: onClick }, attrs), children));
        }
        if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('://')) {
            return (React.createElement("a", __assign({ href: to }, attrs), children));
        }
        else {
            return (React.createElement(react_router_dom_1.Link, __assign({ to: to }, attrs), children));
        }
    };
    exports.NavLink = react_router_dom_1.withRouter(function (_a) {
        var item = _a.item, options = _a.options, activePath = _a.activePath, navItemClass = _a.navItemClass, navLinkClass = _a.navLinkClass, history = _a.history;
        options = options || client_1.NavDefaults.forNav();
        if (item == null || !client_1.NavDefaults.showNav(item, options.attributes)) {
            return null;
        }
        options.activePath = activePath || options.activePath || history.location.pathname;
        options.navItemClass = navItemClass || options.navItemClass;
        options.navLinkClass = navLinkClass || options.navLinkClass;
        var children = item.children || [];
        var hasChildren = children.length > 0;
        var navItemCls = hasChildren
            ? options.childNavItemClass
            : options.navItemClass;
        var navLinkCls = hasChildren
            ? options.childNavLinkClass
            : options.navLinkClass;
        var childProps = {};
        var id = item.id;
        if (hasChildren) {
            if (id == null) {
                id = client_1.safeVarName(item.label);
            }
            /* tslint:disable:no-string-literal */
            childProps['role'] = 'button';
            childProps['data-toggle'] = 'dropdown';
            childProps['aria-haspopup'] = 'true';
            childProps['aria-expanded'] = 'false';
            /* tslint:enable:no-string-literal */
        }
        var baseHref = client_1.trimEnd(options.baseHref || '', '/');
        return (React.createElement("li", { className: client_1.classNames(item.className, navItemCls) },
            React.createElement(exports.ALink, __assign({ to: baseHref + item.href, className: client_1.classNames(navLinkCls, client_1.activeClassNav(item, options.activePath)), id: id }, childProps), item.label),
            children.map(function (x) {
                return (React.createElement("div", { className: options.childNavMenuClass, "aria-labelledby": id }, x.label === '-'
                    ? React.createElement("div", { className: "dropdown-divider" })
                    : (React.createElement(exports.ALink, { to: baseHref + x.href, className: client_1.classNames(options.childNavMenuItemClass, client_1.activeClassNav(x, options.activePath)) }, x.label))));
            })));
    });
    exports.NavButtonGroup = react_router_dom_1.withRouter(function (_a) {
        var items = _a.items, options = _a.options, remaining = __rest(_a, ["items", "options"]);
        if (items == null || items.length === 0) {
            return null;
        }
        options = Object.assign(client_1.NavButtonGroupDefaults.forNavButtonGroup(options), remaining);
        return (React.createElement("div", { className: client_1.classNames(remaining.block ? null : remaining.vertical ? 'btn-group-vertical' : options.navClass) }, items.map(function (x) { return React.createElement(exports.NavLinkButton, __assign({ key: x.href || x.label, item: x, options: options }, remaining)); })));
    });
    exports.NavLinkButton = react_router_dom_1.withRouter(function (_a) {
        var item = _a.item, options = _a.options, activePath = _a.activePath, navItemClass = _a.navItemClass, history = _a.history, remaining = __rest(_a, ["item", "options", "activePath", "navItemClass", "history"]);
        options = Object.assign(client_1.NavLinkDefaults.forNavLink(options), remaining);
        if (item == null || !client_1.NavDefaults.showNav(item, options.attributes)) {
            return null;
        }
        options.activePath = activePath || options.activePath || history.location.pathname;
        options.navItemClass = navItemClass || options.navItemClass;
        var baseHref = client_1.trimEnd(options.baseHref || '', '/');
        var parseHtml = client_1.NavDefaults.parseIconHtml || parseIconHtml;
        return (React.createElement(exports.ALink, { to: baseHref + item.href, id: item.id, className: client_1.classNames(item.className, options.navItemClass, client_1.activeClassNav(item, options.activePath), client_1.btnClasses(remaining)) },
            parseHtml(item.iconHtml),
            item.label));
    });
    exports.LinkButton = react_router_dom_1.withRouter(function (_a) {
        var href = _a.href, exact = _a.exact, className = _a.className, options = _a.options, history = _a.history, children = _a.children, remaining = __rest(_a, ["href", "exact", "className", "options", "history", "children"]);
        var activePath = options != null ? options.activePath : '';
        if (!activePath) {
            activePath = history.location.pathname;
        }
        options = Object.assign(client_1.LinkButtonDefaults.forLinkButton(options), remaining);
        var hashPrefix = client_1.trimEnd(options.baseHref || '', '/');
        var attrs = client_1.pick(remaining, ['id', 'type', 'name', 'autofocus', 'disabled', 'value', 'onClick']);
        return (React.createElement(exports.ALink, __assign({ to: hashPrefix + href }, attrs, { className: client_1.classNames(className, options.navItemClass, client_1.activeClass(href || null, activePath, exact), client_1.btnClasses(remaining)) }), children));
    });
    exports.Button = function (_a) {
        var type = _a.type, id = _a.id, className = _a.className, children = _a.children, remaining = __rest(_a, ["type", "id", "className", "children"]);
        var attrs = client_1.pick(remaining, ['id', 'type', 'name', 'autofocus', 'disabled', 'value', 'onClick']);
        return (React.createElement("button", __assign({}, attrs, { className: client_1.classNames('btn', className, client_1.btnClasses(remaining)) }), children));
    };
    exports.Fallback = react_router_dom_1.withRouter(function (_a) {
        var location = _a.location;
        React.useEffect(function () {
            if (location.pathname.indexOf('://') >= 0) {
                window.location.href = location.pathname.substring(1); // chop path / prefix
            }
        }, []);
        return (React.createElement("div", { className: "fallback" },
            React.createElement("h3", null,
                "No matching ",
                React.createElement("code", null, "Route"),
                " found for ",
                React.createElement("code", null, location.pathname))));
    });
    exports.Forbidden = function (_a) {
        var message = _a.message, path = _a.path, role = _a.role, permission = _a.permission, remaining = __rest(_a, ["message", "path", "role", "permission"]);
        return (React.createElement("div", { className: "forbidden" },
            React.createElement("h3", null,
                "You are not authorized to access ",
                path ? React.createElement("code", null, path) : React.createElement("span", null, "this page")),
            message != null
                ? React.createElement("p", null, message)
                : role
                    ? React.createElement("p", null,
                        "Missing role ",
                        React.createElement("code", null, role))
                    : permission
                        ? React.createElement("p", null,
                            "Missing permission ",
                            React.createElement("code", null, permission))
                        : null));
    };
    exports.SvgImage = function (_a) {
        var id = _a.id, fill = _a.fill, className = _a.className, style = _a.style, width = _a.width, height = _a.height, baseUrl = _a.baseUrl;
        var svgSrc = "/metadata/svg/" + id + ".svg";
        if (fill) {
            svgSrc += "?fill=" + encodeURIComponent(fill);
        }
        style = style || {};
        if (width) {
            style.width = width;
        }
        if (height) {
            style.height = height;
        }
        var src = baseUrl ? client_1.combinePaths(baseUrl, svgSrc) : svgSrc;
        return (React.createElement("img", { src: src, className: className, style: style }));
    };
});
