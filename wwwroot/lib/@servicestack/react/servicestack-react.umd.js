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
        define(["require", "exports", "react", "classnames", "@servicestack/client"], factory);
    }
    else if (typeof window != "undefined") factory(window.require||function(){}, window["@servicestack/react"]={});
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react") || window.React;
    var classNames = require("classnames") || window.classNames;
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
                (React.createElement("div", { className: classNames('form-check', { 'is-invalid': hasError, 'form-control': hasError }) },
                    type == 'radio' ?
                        kvpValues.map(function (kvp) {
                            return (React.createElement("div", { key: id + "-" + kvp.key, className: classNames('custom-control', 'custom-radio', { 'custom-control-inline': inline }) },
                                React.createElement("input", { type: "radio", id: id + "-" + kvp.key, name: id, value: kvp.key, className: classNames('custom-control-input', inputClass), checked: value == kvp.key, onChange: onInput }),
                                React.createElement("label", { className: "custom-control-label", htmlFor: id + "-" + kvp.key }, kvp.value)));
                        }) : null,
                    type == 'checkbox' ?
                        kvpValues.map(function (kvp) {
                            return (React.createElement("div", { key: id + "-" + kvp.key, className: classNames('custom-control', 'custom-checkbox', { 'custom-control-inline': inline }) },
                                React.createElement("input", { type: "checkbox", id: id + "-" + kvp.key, name: id, value: kvp.key, className: "form-check-input", checked: hasValue(kvp.key), onChange: onInputValues }),
                                React.createElement("label", { className: "form-check-label", htmlFor: id + "-" + kvp.key }, kvp.value)));
                        }) : null,
                    help ? React.createElement("small", { className: "text-muted" }, help) : null))
                : null,
            !isCheck ? React.createElement("input", __assign({ type: type, id: id, name: id, value: value, className: classNames('form-control', { 'is-invalid': errorField }, inputClass), onChange: function (e) { if (fn)
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
            React.createElement("select", { id: id, name: id, className: classNames('form-control', { 'is-invalid': errorField }, selectClass), multiple: multiple, value: value, onChange: onInputValues }, kvpValues.map(function (kvp) {
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
            React.createElement("div", { className: classNames('form-check', { 'is-invalid': errorField, 'form-control': errorField }) },
                React.createElement("input", { type: "checkbox", id: id, name: id, onChange: onInput, checked: value, value: "true", className: classNames('form-check-input', { 'is-invalid': errorField }, inputClass) }),
                React.createElement("label", { className: "form-check-label", htmlFor: id }, props.children)),
            help ? React.createElement("small", { className: "text-muted" }, help) : null,
            errorField ? React.createElement("div", { className: "invalid-feedback" }, errorField) : null));
    };
});
