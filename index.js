/**
 * This source code is merely a bundle of all Inferno packages required 
 * for Inferno Compat, originally authored by Dominic Gannaway and 
 * therefore maintains the same MIT license of the original source code
 * along with any copyrights held by Dominic Gannaway.
 */


// InfernoJS Core
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Inferno = {})));
}(this, (function (exports) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var NO_OP = "$NO_OP";
    var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== "undefined" && window.document);
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isStatefulComponent(o) {
        return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
    }
    function isStringOrNumber(o) {
        var type = typeof o;
        return type === "string" || type === "number";
    }
    function isNullOrUndef(o) {
        return isUndefined(o) || isNull(o);
    }
    function isInvalid(o) {
        return isNull(o) || o === false || isTrue(o) || isUndefined(o);
    }
    function isFunction(o) {
        return typeof o === "function";
    }
    function isString(o) {
        return typeof o === "string";
    }
    function isNumber(o) {
        return typeof o === "number";
    }
    function isNull(o) {
        return o === null;
    }
    function isTrue(o) {
        return o === true;
    }
    function isUndefined(o) {
        return o === void 0;
    }
    function isObject(o) {
        return typeof o === "object";
    }
    function throwError(message) {
        if (!message) {
            message = ERROR_MSG;
        }
        throw new Error(("Inferno Error: " + message));
    }
    function warning(message) {
        // tslint:disable-next-line:no-console
        console.warn(message);
    }
    function combineFrom(first, second) {
        var out = {};
        if (first) {
            for (var key in first) {
                out[key] = first[key];
            }
        }
        if (second) {
            for (var key$1 in second) {
                out[key$1] = second[key$1];
            }
        }
        return out;
    }
    function Lifecycle() {
        this.listeners = [];
    }
    Lifecycle.prototype.addListener = function addListener(callback) {
        this.listeners.push(callback);
    };
    Lifecycle.prototype.trigger = function trigger() {
        var listeners = this.listeners;
        var listener;
        // We need to remove current listener from array when calling it, because more listeners might be added
        while ((listener = listeners.shift())) {
            listener();
        }
    };

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    var options = {
        afterMount: null,
        afterRender: null,
        afterUpdate: null,
        beforeRender: null,
        beforeUnmount: null,
        createVNode: null,
        findDOMNodeEnabled: false,
        recyclingEnabled: false,
        roots: []
    };

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    var xlinkNS = "http://www.w3.org/1999/xlink";
    var xmlNS = "http://www.w3.org/XML/1998/namespace";
    var svgNS = "http://www.w3.org/2000/svg";
    var strictProps = new Set();
    strictProps.add("volume");
    strictProps.add("defaultChecked");
    var booleanProps = new Set();
    booleanProps.add("muted");
    booleanProps.add("scoped");
    booleanProps.add("loop");
    booleanProps.add("open");
    booleanProps.add("checked");
    booleanProps.add("default");
    booleanProps.add("capture");
    booleanProps.add("disabled");
    booleanProps.add("readOnly");
    booleanProps.add("required");
    booleanProps.add("autoplay");
    booleanProps.add("controls");
    booleanProps.add("seamless");
    booleanProps.add("reversed");
    booleanProps.add("allowfullscreen");
    booleanProps.add("novalidate");
    booleanProps.add("hidden");
    booleanProps.add("autoFocus");
    booleanProps.add("selected");
    booleanProps.add("indeterminate");
    var namespaces = new Map();
    namespaces.set("xlink:href", xlinkNS);
    namespaces.set("xlink:arcrole", xlinkNS);
    namespaces.set("xlink:actuate", xlinkNS);
    namespaces.set("xlink:show", xlinkNS);
    namespaces.set("xlink:role", xlinkNS);
    namespaces.set("xlink:title", xlinkNS);
    namespaces.set("xlink:type", xlinkNS);
    namespaces.set("xml:base", xmlNS);
    namespaces.set("xml:lang", xmlNS);
    namespaces.set("xml:space", xmlNS);
    var isUnitlessNumber = new Set();
    isUnitlessNumber.add("animationIterationCount");
    isUnitlessNumber.add("borderImageOutset");
    isUnitlessNumber.add("borderImageSlice");
    isUnitlessNumber.add("borderImageWidth");
    isUnitlessNumber.add("boxFlex");
    isUnitlessNumber.add("boxFlexGroup");
    isUnitlessNumber.add("boxOrdinalGroup");
    isUnitlessNumber.add("columnCount");
    isUnitlessNumber.add("flex");
    isUnitlessNumber.add("flexGrow");
    isUnitlessNumber.add("flexPositive");
    isUnitlessNumber.add("flexShrink");
    isUnitlessNumber.add("flexNegative");
    isUnitlessNumber.add("flexOrder");
    isUnitlessNumber.add("gridRow");
    isUnitlessNumber.add("gridColumn");
    isUnitlessNumber.add("fontWeight");
    isUnitlessNumber.add("lineClamp");
    isUnitlessNumber.add("lineHeight");
    isUnitlessNumber.add("opacity");
    isUnitlessNumber.add("order");
    isUnitlessNumber.add("orphans");
    isUnitlessNumber.add("tabSize");
    isUnitlessNumber.add("widows");
    isUnitlessNumber.add("zIndex");
    isUnitlessNumber.add("zoom");
    isUnitlessNumber.add("fillOpacity");
    isUnitlessNumber.add("floodOpacity");
    isUnitlessNumber.add("stopOpacity");
    isUnitlessNumber.add("strokeDasharray");
    isUnitlessNumber.add("strokeDashoffset");
    isUnitlessNumber.add("strokeMiterlimit");
    isUnitlessNumber.add("strokeOpacity");
    isUnitlessNumber.add("strokeWidth");
    var skipProps = new Set();
    skipProps.add("children");
    skipProps.add("childrenType");
    skipProps.add("defaultValue");
    skipProps.add("ref");
    skipProps.add("key");
    skipProps.add("checked");
    skipProps.add("multiple");
    var delegatedEvents = new Set();
    delegatedEvents.add("onClick");
    delegatedEvents.add("onMouseDown");
    delegatedEvents.add("onMouseUp");
    delegatedEvents.add("onMouseMove");
    delegatedEvents.add("onSubmit");
    delegatedEvents.add("onDblClick");
    delegatedEvents.add("onKeyDown");
    delegatedEvents.add("onKeyUp");
    delegatedEvents.add("onKeyPress");

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    var isiOS = isBrowser &&
        !!navigator.platform &&
        /iPad|iPhone|iPod/.test(navigator.platform);
    var delegatedEvents$1 = new Map();
    function handleEvent(name, lastEvent, nextEvent, dom) {
        var delegatedRoots = delegatedEvents$1.get(name);
        if (nextEvent) {
            if (!delegatedRoots) {
                delegatedRoots = { items: new Map(), docEvent: null };
                delegatedRoots.docEvent = attachEventToDocument(name, delegatedRoots);
                delegatedEvents$1.set(name, delegatedRoots);
            }
            if (!lastEvent) {
                if (isiOS && name === "onClick") {
                    trapClickOnNonInteractiveElement(dom);
                }
            }
            delegatedRoots.items.set(dom, nextEvent);
        }
        else if (delegatedRoots) {
            var items = delegatedRoots.items;
            if (items.delete(dom)) {
                // If any items were deleted, check if listener need to be removed
                if (items.size === 0) {
                    document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
                    delegatedEvents$1.delete(name);
                }
            }
        }
    }
    function dispatchEvents(event, target, items, count, isClick, eventData) {
        var dom = target;
        while (count > 0) {
            var eventsToTrigger = items.get(dom);
            if (eventsToTrigger) {
                count--;
                // linkEvent object
                eventData.dom = dom;
                if (eventsToTrigger.event) {
                    eventsToTrigger.event(eventsToTrigger.data, event);
                }
                else {
                    eventsToTrigger(event);
                }
                if (event.cancelBubble) {
                    return;
                }
            }
            dom = dom.parentNode;
            // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
            // because the event listener is on document.body
            // Don't process clicks on disabled elements
            if (dom === null || (isClick && dom.disabled)) {
                return;
            }
        }
    }
    function normalizeEventName(name) {
        return name.substr(2).toLowerCase();
    }
    function stopPropagation() {
        this.cancelBubble = true;
        this.stopImmediatePropagation();
    }
    function attachEventToDocument(name, delegatedRoots) {
        var docEvent = function (event) {
            var count = delegatedRoots.items.size;
            if (count > 0) {
                event.stopPropagation = stopPropagation;
                // Event data needs to be object to save reference to currentTarget getter
                var eventData = {
                    dom: document
                };
                try {
                    Object.defineProperty(event, "currentTarget", {
                        configurable: true,
                        get: function get() {
                            return eventData.dom;
                        }
                    });
                }
                catch (e) {
                    /* safari7 and phantomJS will crash */
                }
                dispatchEvents(event, event.target, delegatedRoots.items, count, event.type === "click", eventData);
            }
        };
        document.addEventListener(normalizeEventName(name), docEvent);
        return docEvent;
    }
    // tslint:disable-next-line:no-empty
    function emptyFn() { }
    function trapClickOnNonInteractiveElement(dom) {
        // Mobile Safari does not fire properly bubble click events on
        // non-interactive elements, which means delegated click listeners do not
        // fire. The workaround for this bug involves attaching an empty click
        // listener on the target node.
        // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
        // Just set it using the onclick property so that we don't have to manage any
        // bookkeeping for it. Not sure if we need to clear it when the listener is
        // removed.
        // TODO: Only do this for the relevant Safaris maybe?
        dom.onclick = emptyFn;
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function isCheckedType(type) {
        return type === "checkbox" || type === "radio";
    }
    function onTextInputChange(e) {
        var vNode = this.vNode;
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        var previousValue = props.value;
        if (props.onInput) {
            var event = props.onInput;
            if (event.event) {
                event.event(event.data, e);
            }
            else {
                event(e);
            }
        }
        else if (props.oninput) {
            props.oninput(e);
        }
        // the user may have updated the vNode from the above onInput events syncronously
        // so we need to get it from the context of `this` again
        var newVNode = this.vNode;
        var newProps = newVNode.props || EMPTY_OBJ;
        // If render is going async there is no value change yet, it will come back to process input soon
        if (previousValue !== newProps.value) {
            // When this happens we need to store current cursor position and restore it, to avoid jumping
            applyValue(newProps, dom);
        }
    }
    function wrappedOnChange(e) {
        var props = this.vNode.props || EMPTY_OBJ;
        var event = props.onChange;
        if (event.event) {
            event.event(event.data, e);
        }
        else {
            event(e);
        }
    }
    function onCheckboxChange(e) {
        e.stopPropagation(); // This click should not propagate its for internal use
        var vNode = this.vNode;
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        if (props.onClick) {
            var event = props.onClick;
            if (event.event) {
                event.event(event.data, e);
            }
            else {
                event(e);
            }
        }
        else if (props.onclick) {
            props.onclick(e);
        }
        // the user may have updated the vNode from the above onInput events syncronously
        // so we need to get it from the context of `this` again
        var newVNode = this.vNode;
        var newProps = newVNode.props || EMPTY_OBJ;
        // If render is going async there is no value change yet, it will come back to process input soon
        applyValue(newProps, dom);
    }
    function processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        applyValue(nextPropsOrEmpty, dom);
        if (isControlled) {
            dom.vNode = vNode; // TODO: Remove this when implementing Fiber's
            if (mounting) {
                if (isCheckedType(nextPropsOrEmpty.type)) {
                    dom.onclick = onCheckboxChange;
                    dom.onclick.wrapped = true;
                }
                else {
                    dom.oninput = onTextInputChange;
                    dom.oninput.wrapped = true;
                }
                if (nextPropsOrEmpty.onChange) {
                    dom.onchange = wrappedOnChange;
                    dom.onchange.wrapped = true;
                }
            }
        }
    }
    function applyValue(nextPropsOrEmpty, dom) {
        var type = nextPropsOrEmpty.type;
        var value = nextPropsOrEmpty.value;
        var checked = nextPropsOrEmpty.checked;
        var multiple = nextPropsOrEmpty.multiple;
        var defaultValue = nextPropsOrEmpty.defaultValue;
        var hasValue = !isNullOrUndef(value);
        if (type && type !== dom.type) {
            dom.setAttribute("type", type);
        }
        if (multiple && multiple !== dom.multiple) {
            dom.multiple = multiple;
        }
        if (!isNullOrUndef(defaultValue) && !hasValue) {
            dom.defaultValue = defaultValue + "";
        }
        if (isCheckedType(type)) {
            if (hasValue) {
                dom.value = value;
            }
            if (!isNullOrUndef(checked)) {
                dom.checked = checked;
            }
        }
        else {
            if (hasValue && dom.value !== value) {
                dom.defaultValue = value;
                dom.value = value;
            }
            else if (!isNullOrUndef(checked)) {
                dom.checked = checked;
            }
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function updateChildOptionGroup(vNode, value) {
        var type = vNode.type;
        if (type === "optgroup") {
            var children = vNode.children;
            if (isArray(children)) {
                for (var i = 0, len = children.length; i < len; i++) {
                    updateChildOption(children[i], value);
                }
            }
            else if (isVNode(children)) {
                updateChildOption(children, value);
            }
        }
        else {
            updateChildOption(vNode, value);
        }
    }
    function updateChildOption(vNode, value) {
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        // we do this as multiple may have changed
        dom.value = props.value;
        if ((isArray(value) && value.indexOf(props.value) !== -1) ||
            props.value === value) {
            dom.selected = true;
        }
        else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
            dom.selected = props.selected || false;
        }
    }
    function onSelectChange(e) {
        var vNode = this.vNode;
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        var previousValue = props.value;
        if (props.onChange) {
            var event = props.onChange;
            if (event.event) {
                event.event(event.data, e);
            }
            else {
                event(e);
            }
        }
        else if (props.onchange) {
            props.onchange(e);
        }
        // the user may have updated the vNode from the above onInput events syncronously
        // so we need to get it from the context of `this` again
        var newVNode = this.vNode;
        var newProps = newVNode.props || EMPTY_OBJ;
        // If render is going async there is no value change yet, it will come back to process input soon
        if (previousValue !== newProps.value) {
            // When this happens we need to store current cursor position and restore it, to avoid jumping
            applyValue$1(newVNode, dom, newProps, false);
        }
    }
    function processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        applyValue$1(vNode, dom, nextPropsOrEmpty, mounting);
        if (isControlled) {
            dom.vNode = vNode; // TODO: Remove this when implementing Fiber's
            if (mounting) {
                dom.onchange = onSelectChange;
                dom.onchange.wrapped = true;
            }
        }
    }
    function applyValue$1(vNode, dom, nextPropsOrEmpty, mounting) {
        if (nextPropsOrEmpty.multiple !== dom.multiple) {
            dom.multiple = nextPropsOrEmpty.multiple;
        }
        var children = vNode.children;
        if (!isInvalid(children)) {
            var value = nextPropsOrEmpty.value;
            if (mounting && isNullOrUndef(value)) {
                value = nextPropsOrEmpty.defaultValue;
            }
            if (isArray(children)) {
                for (var i = 0, len = children.length; i < len; i++) {
                    updateChildOptionGroup(children[i], value);
                }
            }
            else if (isVNode(children)) {
                updateChildOptionGroup(children, value);
            }
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function wrappedOnChange$1(e) {
        var props = this.vNode.props || EMPTY_OBJ;
        var event = props.onChange;
        if (event.event) {
            event.event(event.data, e);
        }
        else {
            event(e);
        }
    }
    function onTextareaInputChange(e) {
        var vNode = this.vNode;
        var props = vNode.props || EMPTY_OBJ;
        var previousValue = props.value;
        if (props.onInput) {
            var event = props.onInput;
            if (event.event) {
                event.event(event.data, e);
            }
            else {
                event(e);
            }
        }
        else if (props.oninput) {
            props.oninput(e);
        }
        // the user may have updated the vNode from the above onInput events syncronously
        // so we need to get it from the context of `this` again
        var newVNode = this.vNode;
        var newProps = newVNode.props || EMPTY_OBJ;
        // If render is going async there is no value change yet, it will come back to process input soon
        if (previousValue !== newProps.value) {
            // When this happens we need to store current cursor position and restore it, to avoid jumping
            applyValue$2(newVNode, vNode.dom, false);
        }
    }
    function processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        applyValue$2(nextPropsOrEmpty, dom, mounting);
        if (isControlled) {
            dom.vNode = vNode; // TODO: Remove this when implementing Fiber's
            if (mounting) {
                dom.oninput = onTextareaInputChange;
                dom.oninput.wrapped = true;
                if (nextPropsOrEmpty.onChange) {
                    dom.onchange = wrappedOnChange$1;
                    dom.onchange.wrapped = true;
                }
            }
        }
    }
    function applyValue$2(nextPropsOrEmpty, dom, mounting) {
        var value = nextPropsOrEmpty.value;
        var domValue = dom.value;
        if (isNullOrUndef(value)) {
            if (mounting) {
                var defaultValue = nextPropsOrEmpty.defaultValue;
                if (!isNullOrUndef(defaultValue)) {
                    if (defaultValue !== domValue) {
                        dom.defaultValue = defaultValue;
                        dom.value = defaultValue;
                    }
                }
                else if (domValue !== "") {
                    dom.defaultValue = "";
                    dom.value = "";
                }
            }
        }
        else {
            /* There is value so keep it controlled */
            if (domValue !== value) {
                dom.defaultValue = value;
                dom.value = value;
            }
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    /**
     * There is currently no support for switching same input between controlled and nonControlled
     * If that ever becomes a real issue, then re design controlled elements
     * Currently user must choose either controlled or non-controlled and stick with that
     */
    function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        if (flags & 512 /* InputElement */) {
            processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
        }
        if (flags & 2048 /* SelectElement */) {
            processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
        }
        if (flags & 1024 /* TextareaElement */) {
            processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
        }
    }
    function isControlledFormElement(nextPropsOrEmpty) {
        return nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type)
            ? !isNullOrUndef(nextPropsOrEmpty.checked)
            : !isNullOrUndef(nextPropsOrEmpty.value);
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function normalizeChildNodes(parentDom) {
        var dom = parentDom.firstChild;
        while (dom) {
            if (dom.nodeType === 8) {
                if (dom.data === "!") {
                    var placeholder = document.createTextNode("");
                    parentDom.replaceChild(placeholder, dom);
                    dom = dom.nextSibling;
                }
                else {
                    var lastDom = dom.previousSibling;
                    parentDom.removeChild(dom);
                    dom = lastDom || parentDom.firstChild;
                }
            }
            else {
                dom = dom.nextSibling;
            }
        }
    }
    function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
        var type = vNode.type;
        var ref = vNode.ref;
        var props = vNode.props || EMPTY_OBJ;
        if (isClass) {
            var _isSVG = dom.namespaceURI === svgNS;
            var instance = createClassComponentInstance(vNode, type, props, context, _isSVG, lifecycle);
            var input = instance._lastInput;
            instance._vNode = vNode;
            hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
            vNode.dom = input.dom;
            mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
            instance._updating = false; // Mount finished allow going sync
            if (options.findDOMNodeEnabled) {
                componentToDOMNodeMap.set(instance, dom);
            }
        }
        else {
            var input$1 = createFunctionalComponentInput(vNode, type, props, context);
            hydrate(input$1, dom, lifecycle, context, isSVG);
            vNode.children = input$1;
            vNode.dom = input$1.dom;
            mountFunctionalComponentCallbacks(props, ref, dom, lifecycle);
        }
        return dom;
    }
    function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
        var children = vNode.children;
        var props = vNode.props;
        var className = vNode.className;
        var flags = vNode.flags;
        var ref = vNode.ref;
        isSVG = isSVG || (flags & 128 /* SvgElement */) > 0;
        if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
            {
                warning("Inferno hydration: Server-side markup doesn't match client-side markup or Initial render target is not empty");
            }
            var newDom = mountElement(vNode, null, lifecycle, context, isSVG);
            vNode.dom = newDom;
            replaceChild(dom.parentNode, newDom, dom);
            return newDom;
        }
        vNode.dom = dom;
        if (!isInvalid(children)) {
            hydrateChildren(children, dom, lifecycle, context, isSVG);
        }
        else if (dom.firstChild !== null && !isSamePropsInnerHTML(dom, props)) {
            dom.textContent = ""; // dom has content, but VNode has no children remove everything from DOM
        }
        if (props) {
            var hasControlledValue = false;
            var isFormElement = (flags & 3584 /* FormElement */) > 0;
            if (isFormElement) {
                hasControlledValue = isControlledFormElement(props);
            }
            for (var prop in props) {
                // do not add a hasOwnProperty check here, it affects performance
                patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
            }
            if (isFormElement) {
                processElement(flags, vNode, dom, props, true, hasControlledValue);
            }
        }
        if (!isNullOrUndef(className)) {
            if (isSVG) {
                dom.setAttribute("class", className);
            }
            else {
                dom.className = className;
            }
        }
        else {
            if (dom.className !== "") {
                dom.removeAttribute("class");
            }
        }
        if (ref) {
            mountRef(dom, ref, lifecycle);
        }
        return dom;
    }
    function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
        normalizeChildNodes(parentDom);
        var dom = parentDom.firstChild;
        if (isStringOrNumber(children)) {
            if (!isNull(dom) && dom.nodeType === 3) {
                if (dom.nodeValue !== children) {
                    dom.nodeValue = children;
                }
            }
            else if (children === "") {
                parentDom.appendChild(document.createTextNode(""));
            }
            else {
                parentDom.textContent = children;
            }
            if (!isNull(dom)) {
                dom = dom.nextSibling;
            }
        }
        else if (isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                var child = children[i];
                if (!isNull(child) && isObject(child)) {
                    if (!isNull(dom)) {
                        var nextSibling = dom.nextSibling;
                        hydrate(child, dom, lifecycle, context, isSVG);
                        dom = nextSibling;
                    }
                    else {
                        mount(child, parentDom, lifecycle, context, isSVG);
                    }
                }
            }
        }
        else {
            // It's VNode
            if (!isNull(dom)) {
                hydrate(children, dom, lifecycle, context, isSVG);
                dom = dom.nextSibling;
            }
            else {
                mount(children, parentDom, lifecycle, context, isSVG);
            }
        }
        // clear any other DOM nodes, there should be only a single entry for the root
        while (dom) {
            var nextSibling$1 = dom.nextSibling;
            parentDom.removeChild(dom);
            dom = nextSibling$1;
        }
    }
    function hydrateText(vNode, dom) {
        if (dom.nodeType !== 3) {
            var newDom = mountText(vNode, null);
            vNode.dom = newDom;
            replaceChild(dom.parentNode, newDom, dom);
            return newDom;
        }
        var text = vNode.children;
        if (dom.nodeValue !== text) {
            dom.nodeValue = text;
        }
        vNode.dom = dom;
        return dom;
    }
    function hydrateVoid(vNode, dom) {
        vNode.dom = dom;
        return dom;
    }
    function hydrate(vNode, dom, lifecycle, context, isSVG) {
        var flags = vNode.flags;
        if (flags & 28 /* Component */) {
            hydrateComponent(vNode, dom, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
        }
        else if (flags & 3970 /* Element */) {
            hydrateElement(vNode, dom, lifecycle, context, isSVG);
        }
        else if (flags & 1 /* Text */) {
            hydrateText(vNode, dom);
        }
        else if (flags & 4096 /* Void */) {
            hydrateVoid(vNode, dom);
        }
        else {
            {
                throwError(("hydrate() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
            }
            throwError();
        }
    }
    function hydrateRoot(input, parentDom, lifecycle) {
        if (!isNull(parentDom)) {
            var dom = parentDom.firstChild;
            if (!isNull(dom)) {
                hydrate(input, dom, lifecycle, EMPTY_OBJ, false);
                dom = parentDom.firstChild;
                // clear any other DOM nodes, there should be only a single entry for the root
                while ((dom = dom.nextSibling)) {
                    parentDom.removeChild(dom);
                }
                return true;
            }
        }
        return false;
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    var componentPools = new Map();
    var elementPools = new Map();
    function recycleElement(vNode, lifecycle, context, isSVG) {
        var tag = vNode.type;
        var pools = elementPools.get(tag);
        if (!isUndefined(pools)) {
            var key = vNode.key;
            var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
            if (!isUndefined(pool)) {
                var recycledVNode = pool.pop();
                if (!isUndefined(recycledVNode)) {
                    patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
                    return vNode.dom;
                }
            }
        }
        return null;
    }
    function poolElement(vNode) {
        var tag = vNode.type;
        var key = vNode.key;
        var pools = elementPools.get(tag);
        if (isUndefined(pools)) {
            pools = {
                keyed: new Map(),
                nonKeyed: []
            };
            elementPools.set(tag, pools);
        }
        if (isNull(key)) {
            pools.nonKeyed.push(vNode);
        }
        else {
            var pool = pools.keyed.get(key);
            if (isUndefined(pool)) {
                pool = [];
                pools.keyed.set(key, pool);
            }
            pool.push(vNode);
        }
    }
    function recycleComponent(vNode, lifecycle, context, isSVG) {
        var type = vNode.type;
        var pools = componentPools.get(type);
        if (!isUndefined(pools)) {
            var key = vNode.key;
            var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
            if (!isUndefined(pool)) {
                var recycledVNode = pool.pop();
                if (!isUndefined(recycledVNode)) {
                    var flags = vNode.flags;
                    var failed = patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0, true);
                    if (!failed) {
                        return vNode.dom;
                    }
                }
            }
        }
        return null;
    }
    function poolComponent(vNode) {
        var hooks = vNode.ref;
        var nonRecycleHooks = hooks &&
            (hooks.onComponentWillMount ||
                hooks.onComponentWillUnmount ||
                hooks.onComponentDidMount ||
                hooks.onComponentWillUpdate ||
                hooks.onComponentDidUpdate);
        if (nonRecycleHooks) {
            return;
        }
        var type = vNode.type;
        var key = vNode.key;
        var pools = componentPools.get(type);
        if (isUndefined(pools)) {
            pools = {
                keyed: new Map(),
                nonKeyed: []
            };
            componentPools.set(type, pools);
        }
        if (isNull(key)) {
            pools.nonKeyed.push(vNode);
        }
        else {
            var pool = pools.keyed.get(key);
            if (isUndefined(pool)) {
                pool = [];
                pools.keyed.set(key, pool);
            }
            pool.push(vNode);
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function unmount(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
        var flags = vNode.flags;
        var dom = vNode.dom;
        if (flags & 28 /* Component */) {
            var instance = vNode.children;
            var isStatefulComponent$$1 = (flags & 4 /* ComponentClass */) > 0;
            var props = vNode.props || EMPTY_OBJ;
            var ref = vNode.ref;
            if (!isRecycling) {
                if (isStatefulComponent$$1) {
                    if (!instance._unmounted) {
                        if (!isNull(options.beforeUnmount)) {
                            options.beforeUnmount(vNode);
                        }
                        if (!isUndefined(instance.componentWillUnmount)) {
                            instance.componentWillUnmount();
                        }
                        if (ref && !isRecycling) {
                            ref(null);
                        }
                        instance._unmounted = true;
                        if (options.findDOMNodeEnabled) {
                            componentToDOMNodeMap.delete(instance);
                        }
                        unmount(instance._lastInput, null, instance._lifecycle, false, isRecycling);
                    }
                }
                else {
                    if (!isNullOrUndef(ref)) {
                        if (!isNullOrUndef(ref.onComponentWillUnmount)) {
                            ref.onComponentWillUnmount(dom, props);
                        }
                    }
                    unmount(instance, null, lifecycle, false, isRecycling);
                }
            }
            if (options.recyclingEnabled &&
                !isStatefulComponent$$1 &&
                (parentDom || canRecycle)) {
                poolComponent(vNode);
            }
        }
        else if (flags & 3970 /* Element */) {
            var ref$1 = vNode.ref;
            var props$1 = vNode.props;
            if (!isRecycling && isFunction(ref$1)) {
                ref$1(null);
            }
            var children = vNode.children;
            if (!isNullOrUndef(children)) {
                if (isArray(children)) {
                    for (var i = 0, len = children.length; i < len; i++) {
                        var child = children[i];
                        if (!isInvalid(child) && isObject(child)) {
                            unmount(child, null, lifecycle, false, isRecycling);
                        }
                    }
                }
                else if (isObject(children)) {
                    unmount(children, null, lifecycle, false, isRecycling);
                }
            }
            if (!isNull(props$1)) {
                for (var name in props$1) {
                    // do not add a hasOwnProperty check here, it affects performance
                    if (props$1[name] !== null && isAttrAnEvent(name)) {
                        patchEvent(name, props$1[name], null, dom);
                        // We need to set this null, because same props otherwise come back if SCU returns false and we are recyling
                        props$1[name] = null;
                    }
                }
            }
            if (options.recyclingEnabled && (parentDom || canRecycle)) {
                poolElement(vNode);
            }
        }
        if (!isNull(parentDom)) {
            removeChild(parentDom, dom);
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    // rather than use a Map, like we did before, we can use an array here
    // given there shouldn't be THAT many roots on the page, the difference
    // in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
    var componentToDOMNodeMap = new Map();
    var roots = options.roots;
    /**
     * When inferno.options.findDOMNOdeEnabled is true, this function will return DOM Node by component instance
     * @param ref Component instance
     * @returns {*|null} returns dom node
     */
    function findDOMNode(ref) {
        if (!options.findDOMNodeEnabled) {
            {
                throwError("findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!");
            }
            throwError();
        }
        var dom = ref && ref.nodeType ? ref : null;
        return componentToDOMNodeMap.get(ref) || dom;
    }
    function getRoot(dom) {
        for (var i = 0, len = roots.length; i < len; i++) {
            var root = roots[i];
            if (root.dom === dom) {
                return root;
            }
        }
        return null;
    }
    function setRoot(dom, input, lifecycle) {
        var root = {
            dom: dom,
            input: input,
            lifecycle: lifecycle
        };
        roots.push(root);
        return root;
    }
    function removeRoot(root) {
        for (var i = 0, len = roots.length; i < len; i++) {
            if (roots[i] === root) {
                roots.splice(i, 1);
                return;
            }
        }
    }
    {
        if (isBrowser && document.body === null) {
            warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
        }
    }
    var documentBody = isBrowser ? document.body : null;
    /**
     * Renders virtual node tree into parent node.
     * @param {VNode | null | string | number} input vNode to be rendered
     * @param parentDom DOM node which content will be replaced by virtual node
     * @returns {InfernoChildren} rendered virtual node
     */
    function render(input, parentDom) {
        if (documentBody === parentDom) {
            {
                throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
            }
            throwError();
        }
        if (input === NO_OP) {
            return;
        }
        var root = getRoot(parentDom);
        if (isNull(root)) {
            var lifecycle = new Lifecycle();
            if (!isInvalid(input)) {
                if (input.dom) {
                    input = directClone(input);
                }
                if (!hydrateRoot(input, parentDom, lifecycle)) {
                    mount(input, parentDom, lifecycle, EMPTY_OBJ, false);
                }
                root = setRoot(parentDom, input, lifecycle);
                lifecycle.trigger();
            }
        }
        else {
            var lifecycle$1 = root.lifecycle;
            lifecycle$1.listeners = [];
            if (isNullOrUndef(input)) {
                unmount(root.input, parentDom, lifecycle$1, false, false);
                removeRoot(root);
            }
            else {
                if (input.dom) {
                    input = directClone(input);
                }
                patch(root.input, input, parentDom, lifecycle$1, EMPTY_OBJ, false, false);
            }
            root.input = input;
            lifecycle$1.trigger();
        }
        if (root) {
            var rootInput = root.input;
            if (rootInput && rootInput.flags & 28 /* Component */) {
                return rootInput.children;
            }
        }
    }
    function createRenderer(parentDom) {
        return function renderer(lastInput, nextInput) {
            if (!parentDom) {
                parentDom = lastInput;
            }
            render(nextInput, parentDom);
        };
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
        if (lastVNode !== nextVNode) {
            var lastFlags = lastVNode.flags;
            var nextFlags = nextVNode.flags;
            if (nextFlags & 28 /* Component */) {
                var isClass = (nextFlags & 4 /* ComponentClass */) > 0;
                if (lastFlags & 28 /* Component */) {
                    patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling);
                }
                else {
                    replaceVNode(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, isClass), lastVNode, lifecycle, isRecycling);
                }
            }
            else if (nextFlags & 3970 /* Element */) {
                if (lastFlags & 3970 /* Element */) {
                    patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
                }
                else {
                    replaceVNode(parentDom, mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
                }
            }
            else if (nextFlags & 1 /* Text */) {
                if (lastFlags & 1 /* Text */) {
                    patchText(lastVNode, nextVNode);
                }
                else {
                    replaceVNode(parentDom, mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
                }
            }
            else if (nextFlags & 4096 /* Void */) {
                if (lastFlags & 4096 /* Void */) {
                    patchVoid(lastVNode, nextVNode);
                }
                else {
                    replaceVNode(parentDom, mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
                }
            }
            else {
                // Error case: mount new one replacing old one
                replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            }
        }
    }
    function unmountChildren(children, dom, lifecycle, isRecycling) {
        if (isVNode(children)) {
            unmount(children, dom, lifecycle, true, isRecycling);
        }
        else if (isArray(children)) {
            removeAllChildren(dom, children, lifecycle, isRecycling);
        }
        else {
            dom.textContent = "";
        }
    }
    function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
        var nextTag = nextVNode.type;
        var lastTag = lastVNode.type;
        if (lastTag !== nextTag) {
            replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            var dom = lastVNode.dom;
            var lastProps = lastVNode.props;
            var nextProps = nextVNode.props;
            var lastChildren = lastVNode.children;
            var nextChildren = nextVNode.children;
            var lastFlags = lastVNode.flags;
            var nextFlags = nextVNode.flags;
            var nextRef = nextVNode.ref;
            var lastClassName = lastVNode.className;
            var nextClassName = nextVNode.className;
            nextVNode.dom = dom;
            isSVG = isSVG || (nextFlags & 128 /* SvgElement */) > 0;
            if (lastChildren !== nextChildren) {
                var childrenIsSVG = isSVG === true && nextVNode.type !== "foreignObject";
                patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, childrenIsSVG, isRecycling);
            }
            // inlined patchProps  -- starts --
            if (lastProps !== nextProps) {
                var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
                var nextPropsOrEmpty = nextProps || EMPTY_OBJ;
                var hasControlledValue = false;
                if (nextPropsOrEmpty !== EMPTY_OBJ) {
                    var isFormElement = (nextFlags & 3584 /* FormElement */) > 0;
                    if (isFormElement) {
                        hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
                    }
                    for (var prop in nextPropsOrEmpty) {
                        // do not add a hasOwnProperty check here, it affects performance
                        var nextValue = nextPropsOrEmpty[prop];
                        var lastValue = lastPropsOrEmpty[prop];
                        patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue);
                    }
                    if (isFormElement) {
                        // When inferno is recycling form element, we need to process it like it would be mounting
                        processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, isRecycling, hasControlledValue);
                    }
                }
                if (lastPropsOrEmpty !== EMPTY_OBJ) {
                    for (var prop$1 in lastPropsOrEmpty) {
                        // do not add a hasOwnProperty check here, it affects performance
                        if (isNullOrUndef(nextPropsOrEmpty[prop$1]) &&
                            !isNullOrUndef(lastPropsOrEmpty[prop$1])) {
                            removeProp(prop$1, lastPropsOrEmpty[prop$1], dom, nextFlags);
                        }
                    }
                }
            }
            // inlined patchProps  -- ends --
            if (lastClassName !== nextClassName) {
                if (isNullOrUndef(nextClassName)) {
                    dom.removeAttribute("class");
                }
                else {
                    if (isSVG) {
                        dom.setAttribute("class", nextClassName);
                    }
                    else {
                        dom.className = nextClassName;
                    }
                }
            }
            if (nextRef) {
                if (lastVNode.ref !== nextRef || isRecycling) {
                    mountRef(dom, nextRef, lifecycle);
                }
            }
        }
    }
    function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
        var patchArray = false;
        var patchKeyed = false;
        if (nextFlags & 64 /* HasNonKeyedChildren */) {
            patchArray = true;
        }
        else if ((lastFlags & 32 /* HasKeyedChildren */) > 0 &&
            (nextFlags & 32 /* HasKeyedChildren */) > 0) {
            patchKeyed = true;
            patchArray = true;
        }
        else if (isInvalid(nextChildren)) {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
        }
        else if (isInvalid(lastChildren)) {
            if (isStringOrNumber(nextChildren)) {
                setTextContent(dom, nextChildren);
            }
            else {
                if (isArray(nextChildren)) {
                    mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
                }
                else {
                    mount(nextChildren, dom, lifecycle, context, isSVG);
                }
            }
        }
        else if (isStringOrNumber(nextChildren)) {
            if (isStringOrNumber(lastChildren)) {
                updateTextContent(dom, nextChildren);
            }
            else {
                unmountChildren(lastChildren, dom, lifecycle, isRecycling);
                setTextContent(dom, nextChildren);
            }
        }
        else if (isArray(nextChildren)) {
            if (isArray(lastChildren)) {
                patchArray = true;
                if (isKeyed(lastChildren, nextChildren)) {
                    patchKeyed = true;
                }
            }
            else {
                unmountChildren(lastChildren, dom, lifecycle, isRecycling);
                mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
        else if (isArray(lastChildren)) {
            removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
            mount(nextChildren, dom, lifecycle, context, isSVG);
        }
        else if (isVNode(nextChildren)) {
            if (isVNode(lastChildren)) {
                patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
            }
            else {
                unmountChildren(lastChildren, dom, lifecycle, isRecycling);
                mount(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
        if (patchArray) {
            var lastLength = lastChildren.length;
            var nextLength = nextChildren.length;
            // Fast path's for both algorithms
            if (lastLength === 0) {
                if (nextLength > 0) {
                    mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
                }
            }
            else if (nextLength === 0) {
                removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
            }
            else if (patchKeyed) {
                patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling, lastLength, nextLength);
            }
            else {
                patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling, lastLength, nextLength);
            }
        }
    }
    function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
        var lastType = lastVNode.type;
        var nextType = nextVNode.type;
        var lastKey = lastVNode.key;
        var nextKey = nextVNode.key;
        if (lastType !== nextType || lastKey !== nextKey) {
            replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            return false;
        }
        else {
            var nextProps = nextVNode.props || EMPTY_OBJ;
            if (isClass) {
                var instance = lastVNode.children;
                instance._updating = true;
                if (instance._unmounted) {
                    if (isNull(parentDom)) {
                        return true;
                    }
                    replaceChild(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, (nextVNode.flags & 4 /* ComponentClass */) > 0), lastVNode.dom);
                }
                else {
                    var hasComponentDidUpdate = !isUndefined(instance.componentDidUpdate);
                    var nextState = instance.state;
                    // When component has componentDidUpdate hook, we need to clone lastState or will be modified by reference during update
                    var lastState = hasComponentDidUpdate
                        ? combineFrom(nextState, null)
                        : nextState;
                    var lastProps = instance.props;
                    nextVNode.children = instance;
                    instance._isSVG = isSVG;
                    var lastInput = instance._lastInput;
                    var nextInput = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false, false);
                    // If this component was destroyed by its parent do nothing, this is no-op
                    // It can happen by using external callback etc during render / update
                    if (instance._unmounted) {
                        return false;
                    }
                    var didUpdate = true;
                    // Update component before getting child context
                    var childContext;
                    if (!isNullOrUndef(instance.getChildContext)) {
                        childContext = instance.getChildContext();
                    }
                    if (isNullOrUndef(childContext)) {
                        childContext = context;
                    }
                    else {
                        childContext = combineFrom(context, childContext);
                    }
                    instance._childContext = childContext;
                    if (isInvalid(nextInput)) {
                        nextInput = createVoidVNode();
                    }
                    else if (nextInput === NO_OP) {
                        nextInput = lastInput;
                        didUpdate = false;
                    }
                    else if (isStringOrNumber(nextInput)) {
                        nextInput = createTextVNode(nextInput, null);
                    }
                    else if (isArray(nextInput)) {
                        {
                            throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
                        }
                        throwError();
                    }
                    else if (isObject(nextInput)) {
                        if (!isNull(nextInput.dom)) {
                            nextInput = directClone(nextInput);
                        }
                    }
                    if (nextInput.flags & 28 /* Component */) {
                        nextInput.parentVNode = nextVNode;
                    }
                    else if (lastInput.flags & 28 /* Component */) {
                        lastInput.parentVNode = nextVNode;
                    }
                    instance._lastInput = nextInput;
                    instance._vNode = nextVNode;
                    if (didUpdate) {
                        patch(lastInput, nextInput, parentDom, lifecycle, childContext, isSVG, isRecycling);
                        if (hasComponentDidUpdate && instance.componentDidUpdate) {
                            instance.componentDidUpdate(lastProps, lastState);
                        }
                        if (!isNull(options.afterUpdate)) {
                            options.afterUpdate(nextVNode);
                        }
                        if (options.findDOMNodeEnabled) {
                            componentToDOMNodeMap.set(instance, nextInput.dom);
                        }
                    }
                    nextVNode.dom = nextInput.dom;
                }
                instance._updating = false;
            }
            else {
                var shouldUpdate = true;
                var lastProps$1 = lastVNode.props;
                var nextHooks = nextVNode.ref;
                var nextHooksDefined = !isNullOrUndef(nextHooks);
                var lastInput$1 = lastVNode.children;
                var nextInput$1 = lastInput$1;
                nextVNode.dom = lastVNode.dom;
                nextVNode.children = lastInput$1;
                if (lastKey !== nextKey) {
                    shouldUpdate = true;
                }
                else {
                    if (nextHooksDefined &&
                        !isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
                        shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps$1, nextProps);
                    }
                }
                if (shouldUpdate !== false) {
                    if (nextHooksDefined &&
                        !isNullOrUndef(nextHooks.onComponentWillUpdate)) {
                        nextHooks.onComponentWillUpdate(lastProps$1, nextProps);
                    }
                    nextInput$1 = nextType(nextProps, context);
                    if (isInvalid(nextInput$1)) {
                        nextInput$1 = createVoidVNode();
                    }
                    else if (isStringOrNumber(nextInput$1) && nextInput$1 !== NO_OP) {
                        nextInput$1 = createTextVNode(nextInput$1, null);
                    }
                    else if (isArray(nextInput$1)) {
                        {
                            throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
                        }
                        throwError();
                    }
                    else if (isObject(nextInput$1)) {
                        if (!isNull(nextInput$1.dom)) {
                            nextInput$1 = directClone(nextInput$1);
                        }
                    }
                    if (nextInput$1 !== NO_OP) {
                        patch(lastInput$1, nextInput$1, parentDom, lifecycle, context, isSVG, isRecycling);
                        nextVNode.children = nextInput$1;
                        if (nextHooksDefined &&
                            !isNullOrUndef(nextHooks.onComponentDidUpdate)) {
                            nextHooks.onComponentDidUpdate(lastProps$1, nextProps);
                        }
                        nextVNode.dom = nextInput$1.dom;
                    }
                }
                if (nextInput$1.flags & 28 /* Component */) {
                    nextInput$1.parentVNode = nextVNode;
                }
                else if (lastInput$1.flags & 28 /* Component */) {
                    lastInput$1.parentVNode = nextVNode;
                }
            }
        }
        return false;
    }
    function patchText(lastVNode, nextVNode) {
        var nextText = nextVNode.children;
        var dom = lastVNode.dom;
        nextVNode.dom = dom;
        if (lastVNode.children !== nextText) {
            dom.nodeValue = nextText;
        }
    }
    function patchVoid(lastVNode, nextVNode) {
        nextVNode.dom = lastVNode.dom;
    }
    function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling, lastChildrenLength, nextChildrenLength) {
        var commonLength = lastChildrenLength > nextChildrenLength
            ? nextChildrenLength
            : lastChildrenLength;
        var i = 0;
        for (; i < commonLength; i++) {
            var nextChild = nextChildren[i];
            if (nextChild.dom) {
                nextChild = nextChildren[i] = directClone(nextChild);
            }
            patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
        }
        if (lastChildrenLength < nextChildrenLength) {
            for (i = commonLength; i < nextChildrenLength; i++) {
                var nextChild$1 = nextChildren[i];
                if (nextChild$1.dom) {
                    nextChild$1 = nextChildren[i] = directClone(nextChild$1);
                }
                appendChild(dom, mount(nextChild$1, null, lifecycle, context, isSVG));
            }
        }
        else if (lastChildrenLength > nextChildrenLength) {
            for (i = commonLength; i < lastChildrenLength; i++) {
                unmount(lastChildren[i], dom, lifecycle, false, isRecycling);
            }
        }
    }
    function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling, aLength, bLength) {
        var aEnd = aLength - 1;
        var bEnd = bLength - 1;
        var aStart = 0;
        var bStart = 0;
        var i;
        var j;
        var aNode;
        var bNode;
        var nextNode;
        var nextPos;
        var node;
        var aStartNode = a[aStart];
        var bStartNode = b[bStart];
        var aEndNode = a[aEnd];
        var bEndNode = b[bEnd];
        if (bStartNode.dom) {
            b[bStart] = bStartNode = directClone(bStartNode);
        }
        if (bEndNode.dom) {
            b[bEnd] = bEndNode = directClone(bEndNode);
        }
        // Step 1
        // tslint:disable-next-line
        outer: {
            // Sync nodes with the same key at the beginning.
            while (aStartNode.key === bStartNode.key) {
                patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
                aStart++;
                bStart++;
                if (aStart > aEnd || bStart > bEnd) {
                    break outer;
                }
                aStartNode = a[aStart];
                bStartNode = b[bStart];
                if (bStartNode.dom) {
                    b[bStart] = bStartNode = directClone(bStartNode);
                }
            }
            // Sync nodes with the same key at the end.
            while (aEndNode.key === bEndNode.key) {
                patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
                aEnd--;
                bEnd--;
                if (aStart > aEnd || bStart > bEnd) {
                    break outer;
                }
                aEndNode = a[aEnd];
                bEndNode = b[bEnd];
                if (bEndNode.dom) {
                    b[bEnd] = bEndNode = directClone(bEndNode);
                }
            }
        }
        if (aStart > aEnd) {
            if (bStart <= bEnd) {
                nextPos = bEnd + 1;
                nextNode = nextPos < bLength ? b[nextPos].dom : null;
                while (bStart <= bEnd) {
                    node = b[bStart];
                    if (node.dom) {
                        b[bStart] = node = directClone(node);
                    }
                    bStart++;
                    insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
                }
            }
        }
        else if (bStart > bEnd) {
            while (aStart <= aEnd) {
                unmount(a[aStart++], dom, lifecycle, false, isRecycling);
            }
        }
        else {
            var aLeft = aEnd - aStart + 1;
            var bLeft = bEnd - bStart + 1;
            var sources = new Array(bLeft);
            // Mark all nodes as inserted.
            for (i = 0; i < bLeft; i++) {
                sources[i] = -1;
            }
            var moved = false;
            var pos = 0;
            var patched = 0;
            // When sizes are small, just loop them through
            if (bLeft <= 4 || aLeft * bLeft <= 16) {
                for (i = aStart; i <= aEnd; i++) {
                    aNode = a[i];
                    if (patched < bLeft) {
                        for (j = bStart; j <= bEnd; j++) {
                            bNode = b[j];
                            if (aNode.key === bNode.key) {
                                sources[j - bStart] = i;
                                if (pos > j) {
                                    moved = true;
                                }
                                else {
                                    pos = j;
                                }
                                if (bNode.dom) {
                                    b[j] = bNode = directClone(bNode);
                                }
                                patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                                patched++;
                                a[i] = null;
                                break;
                            }
                        }
                    }
                }
            }
            else {
                var keyIndex = new Map();
                // Map keys by their index in array
                for (i = bStart; i <= bEnd; i++) {
                    keyIndex.set(b[i].key, i);
                }
                // Try to patch same keys
                for (i = aStart; i <= aEnd; i++) {
                    aNode = a[i];
                    if (patched < bLeft) {
                        j = keyIndex.get(aNode.key);
                        if (!isUndefined(j)) {
                            bNode = b[j];
                            sources[j - bStart] = i;
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            if (bNode.dom) {
                                b[j] = bNode = directClone(bNode);
                            }
                            patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                            patched++;
                            a[i] = null;
                        }
                    }
                }
            }
            // fast-path: if nothing patched remove all old and add all new
            if (aLeft === aLength && patched === 0) {
                removeAllChildren(dom, a, lifecycle, isRecycling);
                while (bStart < bLeft) {
                    node = b[bStart];
                    if (node.dom) {
                        b[bStart] = node = directClone(node);
                    }
                    bStart++;
                    insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), null);
                }
            }
            else {
                i = aLeft - patched;
                while (i > 0) {
                    aNode = a[aStart++];
                    if (!isNull(aNode)) {
                        unmount(aNode, dom, lifecycle, true, isRecycling);
                        i--;
                    }
                }
                if (moved) {
                    var seq = lis_algorithm(sources);
                    j = seq.length - 1;
                    for (i = bLeft - 1; i >= 0; i--) {
                        if (sources[i] === -1) {
                            pos = i + bStart;
                            node = b[pos];
                            if (node.dom) {
                                b[pos] = node = directClone(node);
                            }
                            nextPos = pos + 1;
                            insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextPos < bLength ? b[nextPos].dom : null);
                        }
                        else {
                            if (j < 0 || i !== seq[j]) {
                                pos = i + bStart;
                                node = b[pos];
                                nextPos = pos + 1;
                                insertOrAppend(dom, node.dom, nextPos < bLength ? b[nextPos].dom : null);
                            }
                            else {
                                j--;
                            }
                        }
                    }
                }
                else if (patched !== bLeft) {
                    // when patched count doesn't match b length we need to insert those new ones
                    // loop backwards so we can use insertBefore
                    for (i = bLeft - 1; i >= 0; i--) {
                        if (sources[i] === -1) {
                            pos = i + bStart;
                            node = b[pos];
                            if (node.dom) {
                                b[pos] = node = directClone(node);
                            }
                            nextPos = pos + 1;
                            insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextPos < bLength ? b[nextPos].dom : null);
                        }
                    }
                }
            }
        }
    }
    // // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
    function lis_algorithm(arr) {
        var p = arr.slice(0);
        var result = [0];
        var i;
        var j;
        var u;
        var v;
        var c;
        var len = arr.length;
        for (i = 0; i < len; i++) {
            var arrI = arr[i];
            if (arrI !== -1) {
                j = result[result.length - 1];
                if (arr[j] < arrI) {
                    p[i] = j;
                    result.push(i);
                    continue;
                }
                u = 0;
                v = result.length - 1;
                while (u < v) {
                    c = ((u + v) / 2) | 0;
                    if (arr[result[c]] < arrI) {
                        u = c + 1;
                    }
                    else {
                        v = c;
                    }
                }
                if (arrI < arr[result[u]]) {
                    if (u > 0) {
                        p[i] = result[u - 1];
                    }
                    result[u] = i;
                }
            }
        }
        u = result.length;
        v = result[u - 1];
        while (u-- > 0) {
            result[u] = v;
            v = p[v];
        }
        return result;
    }
    function isAttrAnEvent(attr) {
        return attr[0] === "o" && attr[1] === "n";
    }
    function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue) {
        if (lastValue !== nextValue) {
            if (skipProps.has(prop) || (hasControlledValue && prop === "value")) {
                return;
            }
            else if (booleanProps.has(prop)) {
                prop = prop === "autoFocus" ? prop.toLowerCase() : prop;
                dom[prop] = !!nextValue;
            }
            else if (strictProps.has(prop)) {
                var value = isNullOrUndef(nextValue) ? "" : nextValue;
                if (dom[prop] !== value) {
                    dom[prop] = value;
                }
            }
            else if (isAttrAnEvent(prop)) {
                patchEvent(prop, lastValue, nextValue, dom);
            }
            else if (isNullOrUndef(nextValue)) {
                dom.removeAttribute(prop);
            }
            else if (prop === "style") {
                patchStyle(lastValue, nextValue, dom);
            }
            else if (prop === "dangerouslySetInnerHTML") {
                var lastHtml = lastValue && lastValue.__html;
                var nextHtml = nextValue && nextValue.__html;
                if (lastHtml !== nextHtml) {
                    if (!isNullOrUndef(nextHtml) && !isSameInnerHTML(dom, nextHtml)) {
                        dom.innerHTML = nextHtml;
                    }
                }
            }
            else {
                // We optimize for NS being boolean. Its 99.9% time false
                if (isSVG && namespaces.has(prop)) {
                    // If we end up in this path we can read property again
                    dom.setAttributeNS(namespaces.get(prop), prop, nextValue);
                }
                else {
                    dom.setAttribute(prop, nextValue);
                }
            }
        }
    }
    function patchEvent(name, lastValue, nextValue, dom) {
        if (lastValue !== nextValue) {
            if (delegatedEvents.has(name)) {
                handleEvent(name, lastValue, nextValue, dom);
            }
            else {
                var nameLowerCase = name.toLowerCase();
                var domEvent = dom[nameLowerCase];
                // if the function is wrapped, that means it's been controlled by a wrapper
                if (domEvent && domEvent.wrapped) {
                    return;
                }
                if (!isFunction(nextValue) && !isNullOrUndef(nextValue)) {
                    var linkEvent = nextValue.event;
                    if (linkEvent && isFunction(linkEvent)) {
                        dom[nameLowerCase] = function (e) {
                            linkEvent(nextValue.data, e);
                        };
                    }
                    else {
                        {
                            throwError(("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent."));
                        }
                        throwError();
                    }
                }
                else {
                    dom[nameLowerCase] = nextValue;
                }
            }
        }
    }
    // We are assuming here that we come from patchProp routine
    // -nextAttrValue cannot be null or undefined
    function patchStyle(lastAttrValue, nextAttrValue, dom) {
        var domStyle = dom.style;
        var style;
        var value;
        if (isString(nextAttrValue)) {
            domStyle.cssText = nextAttrValue;
            return;
        }
        if (!isNullOrUndef(lastAttrValue) && !isString(lastAttrValue)) {
            for (style in nextAttrValue) {
                // do not add a hasOwnProperty check here, it affects performance
                value = nextAttrValue[style];
                if (value !== lastAttrValue[style]) {
                    domStyle[style] =
                        !isNumber(value) || isUnitlessNumber.has(style)
                            ? value
                            : value + "px";
                }
            }
            for (style in lastAttrValue) {
                if (isNullOrUndef(nextAttrValue[style])) {
                    domStyle[style] = "";
                }
            }
        }
        else {
            for (style in nextAttrValue) {
                value = nextAttrValue[style];
                domStyle[style] =
                    !isNumber(value) || isUnitlessNumber.has(style) ? value : value + "px";
            }
        }
    }
    function removeProp(prop, lastValue, dom, nextFlags) {
        if (prop === "value") {
            // When removing value of select element, it needs to be set to null instead empty string, because empty string is valid value for option which makes that option selected
            // MS IE/Edge don't follow html spec for textArea and input elements and we need to set empty string to value in those cases to avoid "null" and "undefined" texts
            dom.value = nextFlags & 2048 /* SelectElement */ ? null : "";
        }
        else if (prop === "style") {
            dom.removeAttribute("style");
        }
        else if (isAttrAnEvent(prop)) {
            handleEvent(prop, lastValue, null, dom);
        }
        else {
            dom.removeAttribute(prop);
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function mount(vNode, parentDom, lifecycle, context, isSVG) {
        var flags = vNode.flags;
        if (flags & 3970 /* Element */) {
            return mountElement(vNode, parentDom, lifecycle, context, isSVG);
        }
        else if (flags & 28 /* Component */) {
            return mountComponent(vNode, parentDom, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
        }
        else if (flags & 4096 /* Void */) {
            return mountVoid(vNode, parentDom);
        }
        else if (flags & 1 /* Text */) {
            return mountText(vNode, parentDom);
        }
        else {
            {
                if (typeof vNode === "object") {
                    throwError(("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + (JSON.stringify(vNode)) + "\"."));
                }
                else {
                    throwError(("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
                }
            }
            throwError();
        }
    }
    function mountText(vNode, parentDom) {
        var dom = document.createTextNode(vNode.children);
        vNode.dom = dom;
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        return dom;
    }
    function mountVoid(vNode, parentDom) {
        var dom = document.createTextNode("");
        vNode.dom = dom;
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        return dom;
    }
    function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
        var dom;
        if (options.recyclingEnabled) {
            dom = recycleElement(vNode, lifecycle, context, isSVG);
            if (!isNull(dom)) {
                if (!isNull(parentDom)) {
                    appendChild(parentDom, dom);
                }
                return dom;
            }
        }
        var flags = vNode.flags;
        isSVG = isSVG || (flags & 128 /* SvgElement */) > 0;
        dom = documentCreateElement(vNode.type, isSVG);
        var children = vNode.children;
        var props = vNode.props;
        var className = vNode.className;
        var ref = vNode.ref;
        vNode.dom = dom;
        if (!isInvalid(children)) {
            if (isStringOrNumber(children)) {
                setTextContent(dom, children);
            }
            else {
                var childrenIsSVG = isSVG === true && vNode.type !== "foreignObject";
                if (isArray(children)) {
                    mountArrayChildren(children, dom, lifecycle, context, childrenIsSVG);
                }
                else if (isVNode(children)) {
                    mount(children, dom, lifecycle, context, childrenIsSVG);
                }
            }
        }
        if (!isNull(props)) {
            var hasControlledValue = false;
            var isFormElement = (flags & 3584 /* FormElement */) > 0;
            if (isFormElement) {
                hasControlledValue = isControlledFormElement(props);
            }
            for (var prop in props) {
                // do not add a hasOwnProperty check here, it affects performance
                patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
            }
            if (isFormElement) {
                processElement(flags, vNode, dom, props, true, hasControlledValue);
            }
        }
        if (className !== null) {
            if (isSVG) {
                dom.setAttribute("class", className);
            }
            else {
                dom.className = className;
            }
        }
        if (!isNull(ref)) {
            mountRef(dom, ref, lifecycle);
        }
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        return dom;
    }
    function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            // Verify can string/number be here. might cause de-opt. - Normalization takes care of it.
            if (!isInvalid(child)) {
                if (child.dom) {
                    children[i] = child = directClone(child);
                }
                mount(children[i], dom, lifecycle, context, isSVG);
            }
        }
    }
    function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
        var dom;
        if (options.recyclingEnabled) {
            dom = recycleComponent(vNode, lifecycle, context, isSVG);
            if (!isNull(dom)) {
                if (!isNull(parentDom)) {
                    appendChild(parentDom, dom);
                }
                return dom;
            }
        }
        var type = vNode.type;
        var props = vNode.props || EMPTY_OBJ;
        var ref = vNode.ref;
        if (isClass) {
            var instance = createClassComponentInstance(vNode, type, props, context, isSVG, lifecycle);
            var input = instance._lastInput;
            instance._vNode = vNode;
            vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
            if (!isNull(parentDom)) {
                appendChild(parentDom, dom);
            }
            mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
            instance._updating = false;
            if (options.findDOMNodeEnabled) {
                componentToDOMNodeMap.set(instance, dom);
            }
        }
        else {
            var input$1 = createFunctionalComponentInput(vNode, type, props, context);
            vNode.dom = dom = mount(input$1, null, lifecycle, context, isSVG);
            vNode.children = input$1;
            mountFunctionalComponentCallbacks(props, ref, dom, lifecycle);
            if (!isNull(parentDom)) {
                appendChild(parentDom, dom);
            }
        }
        return dom;
    }
    function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
        if (ref) {
            if (isFunction(ref)) {
                ref(instance);
            }
            else {
                {
                    if (isStringOrNumber(ref)) {
                        throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                    }
                    else if (isObject(ref) && vNode.flags & 4 /* ComponentClass */) {
                        throwError("functional component lifecycle events are not supported on ES2015 class components.");
                    }
                    else {
                        throwError(("a bad value for \"ref\" was used on component: \"" + (JSON.stringify(ref)) + "\""));
                    }
                }
                throwError();
            }
        }
        var hasDidMount = !isUndefined(instance.componentDidMount);
        var afterMount = options.afterMount;
        if (hasDidMount || !isNull(afterMount)) {
            lifecycle.addListener((function () {
                instance._updating = true;
                if (afterMount) {
                    afterMount(vNode);
                }
                if (hasDidMount) {
                    instance.componentDidMount();
                }
                instance._updating = false;
            }));
        }
    }
    function mountFunctionalComponentCallbacks(props, ref, dom, lifecycle) {
        if (ref) {
            if (!isNullOrUndef(ref.onComponentWillMount)) {
                ref.onComponentWillMount(props);
            }
            if (!isNullOrUndef(ref.onComponentDidMount)) {
                lifecycle.addListener((function () { return ref.onComponentDidMount(dom, props); }));
            }
        }
    }
    function mountRef(dom, value, lifecycle) {
        if (isFunction(value)) {
            lifecycle.addListener((function () { return value(dom); }));
        }
        else {
            if (isInvalid(value)) {
                return;
            }
            {
                throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
            }
            throwError();
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    // We need EMPTY_OBJ defined in one place.
    // Its used for comparison so we cant inline it into shared
    var EMPTY_OBJ = {};
    {
        Object.freeze(EMPTY_OBJ);
    }
    function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
        if (isUndefined(context)) {
            context = EMPTY_OBJ; // Context should not be mutable
        }
        var instance = new Component(props, context);
        vNode.children = instance;
        instance._blockSetState = false;
        instance.context = context;
        if (instance.props === EMPTY_OBJ) {
            instance.props = props;
        }
        // setState callbacks must fire after render is done when called from componentWillReceiveProps or componentWillMount
        instance._lifecycle = lifecycle;
        instance._unmounted = false;
        instance._isSVG = isSVG;
        if (!isNullOrUndef(instance.componentWillMount)) {
            instance._blockRender = true;
            instance.componentWillMount();
            if (instance._pendingSetState) {
                var state = instance.state;
                var pending = instance._pendingState;
                if (state === null) {
                    instance.state = pending;
                }
                else {
                    for (var key in pending) {
                        state[key] = pending[key];
                    }
                }
                instance._pendingSetState = false;
                instance._pendingState = null;
            }
            instance._blockRender = false;
        }
        var childContext;
        if (!isNullOrUndef(instance.getChildContext)) {
            childContext = instance.getChildContext();
        }
        if (isNullOrUndef(childContext)) {
            instance._childContext = context;
        }
        else {
            instance._childContext = combineFrom(context, childContext);
        }
        if (!isNull(options.beforeRender)) {
            options.beforeRender(instance);
        }
        var input = instance.render(props, instance.state, context);
        if (!isNull(options.afterRender)) {
            options.afterRender(instance);
        }
        if (isArray(input)) {
            {
                throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
            }
            throwError();
        }
        else if (isInvalid(input)) {
            input = createVoidVNode();
        }
        else if (isStringOrNumber(input)) {
            input = createTextVNode(input, null);
        }
        else {
            if (input.dom) {
                input = directClone(input);
            }
            if (input.flags & 28 /* Component */) {
                // if we have an input that is also a component, we run into a tricky situation
                // where the root vNode needs to always have the correct DOM entry
                // so we break monomorphism on our input and supply it our vNode as parentVNode
                // we can optimise this in the future, but this gets us out of a lot of issues
                input.parentVNode = vNode;
            }
        }
        instance._lastInput = input;
        return instance;
    }
    function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
        replaceVNode(parentDom, mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
    }
    function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
        unmount(vNode, null, lifecycle, false, isRecycling);
        replaceChild(parentDom, dom, vNode.dom);
    }
    function createFunctionalComponentInput(vNode, component, props, context) {
        var input = component(props, context);
        if (isArray(input)) {
            {
                throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
            }
            throwError();
        }
        else if (isInvalid(input)) {
            input = createVoidVNode();
        }
        else if (isStringOrNumber(input)) {
            input = createTextVNode(input, null);
        }
        else {
            if (input.dom) {
                input = directClone(input);
            }
            if (input.flags & 28 /* Component */) {
                // if we have an input that is also a component, we run into a tricky situation
                // where the root vNode needs to always have the correct DOM entry
                // so we break monomorphism on our input and supply it our vNode as parentVNode
                // we can optimise this in the future, but this gets us out of a lot of issues
                input.parentVNode = vNode;
            }
        }
        return input;
    }
    function setTextContent(dom, text) {
        if (text !== "") {
            dom.textContent = text;
        }
        else {
            dom.appendChild(document.createTextNode(""));
        }
    }
    function updateTextContent(dom, text) {
        dom.firstChild.nodeValue = text;
    }
    function appendChild(parentDom, dom) {
        parentDom.appendChild(dom);
    }
    function insertOrAppend(parentDom, newNode, nextNode) {
        if (isNullOrUndef(nextNode)) {
            appendChild(parentDom, newNode);
        }
        else {
            parentDom.insertBefore(newNode, nextNode);
        }
    }
    function documentCreateElement(tag, isSVG) {
        if (isSVG === true) {
            return document.createElementNS(svgNS, tag);
        }
        else {
            return document.createElement(tag);
        }
    }
    function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
        unmount(lastNode, null, lifecycle, false, isRecycling);
        var dom = mount(nextNode, null, lifecycle, context, isSVG);
        nextNode.dom = dom;
        replaceChild(parentDom, dom, lastNode.dom);
    }
    function replaceChild(parentDom, newDom, lastDom) {
        if (!parentDom) {
            parentDom = lastDom.parentNode;
        }
        parentDom.replaceChild(newDom, lastDom);
    }
    function removeChild(parentDom, dom) {
        parentDom.removeChild(dom);
    }
    function removeAllChildren(dom, children, lifecycle, isRecycling) {
        if (!options.recyclingEnabled || (options.recyclingEnabled && !isRecycling)) {
            removeChildren(null, children, lifecycle, isRecycling);
        }
        dom.textContent = "";
    }
    function removeChildren(dom, children, lifecycle, isRecycling) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!isInvalid(child)) {
                unmount(child, dom, lifecycle, true, isRecycling);
            }
        }
    }
    function isKeyed(lastChildren, nextChildren) {
        return (nextChildren.length > 0 &&
            !isNullOrUndef(nextChildren[0]) &&
            !isNullOrUndef(nextChildren[0].key) &&
            lastChildren.length > 0 &&
            !isNullOrUndef(lastChildren[0]) &&
            !isNullOrUndef(lastChildren[0].key));
    }
    function isSameInnerHTML(dom, innerHTML) {
        var tempdom = document.createElement("i");
        tempdom.innerHTML = innerHTML;
        return tempdom.innerHTML === dom.innerHTML;
    }
    function isSamePropsInnerHTML(dom, props) {
        return Boolean(props &&
            props.dangerouslySetInnerHTML &&
            props.dangerouslySetInnerHTML.__html &&
            isSameInnerHTML(dom, props.dangerouslySetInnerHTML.__html));
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    /**
     * Creates virtual node
     * @param {number} flags
     * @param {string|Function|null} type
     * @param {string|null=} className
     * @param {object=} children
     * @param {object=} props
     * @param {*=} key
     * @param {object|Function=} ref
     * @param {boolean=} noNormalise
     * @returns {VNode} returns new virtual node
     */
    function createVNode(flags, type, className, children, props, key, ref, noNormalise) {
        if (flags & 16 /* ComponentUnknown */) {
            flags = isStatefulComponent(type)
                ? 4 /* ComponentClass */
                : 8 /* ComponentFunction */;
        }
        var vNode = {
            children: children === void 0 ? null : children,
            className: className === void 0 ? null : className,
            dom: null,
            flags: flags,
            key: key === void 0 ? null : key,
            props: props === void 0 ? null : props,
            ref: ref === void 0 ? null : ref,
            type: type
        };
        if (noNormalise !== true) {
            normalize(vNode);
        }
        if (options.createVNode !== null) {
            options.createVNode(vNode);
        }
        return vNode;
    }
    function directClone(vNodeToClone) {
        var newVNode;
        var flags = vNodeToClone.flags;
        if (flags & 28 /* Component */) {
            var props;
            var propsToClone = vNodeToClone.props;
            if (isNull(propsToClone)) {
                props = EMPTY_OBJ;
            }
            else {
                props = {};
                for (var key in propsToClone) {
                    props[key] = propsToClone[key];
                }
            }
            newVNode = createVNode(flags, vNodeToClone.type, null, null, props, vNodeToClone.key, vNodeToClone.ref, true);
            var newProps = newVNode.props;
            var newChildren = newProps.children;
            // we need to also clone component children that are in props
            // as the children may also have been hoisted
            if (newChildren) {
                if (isArray(newChildren)) {
                    var len = newChildren.length;
                    if (len > 0) {
                        var tmpArray = [];
                        for (var i = 0; i < len; i++) {
                            var child = newChildren[i];
                            if (isStringOrNumber(child)) {
                                tmpArray.push(child);
                            }
                            else if (!isInvalid(child) && isVNode(child)) {
                                tmpArray.push(directClone(child));
                            }
                        }
                        newProps.children = tmpArray;
                    }
                }
                else if (isVNode(newChildren)) {
                    newProps.children = directClone(newChildren);
                }
            }
            newVNode.children = null;
        }
        else if (flags & 3970 /* Element */) {
            var children = vNodeToClone.children;
            var props$1;
            var propsToClone$1 = vNodeToClone.props;
            if (propsToClone$1 === null) {
                props$1 = EMPTY_OBJ;
            }
            else {
                props$1 = {};
                for (var key$1 in propsToClone$1) {
                    props$1[key$1] = propsToClone$1[key$1];
                }
            }
            newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, children, props$1, vNodeToClone.key, vNodeToClone.ref, !children);
        }
        else if (flags & 1 /* Text */) {
            newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
        }
        return newVNode;
    }
    /*
     directClone is preferred over cloneVNode and used internally also.
     This function makes Inferno backwards compatible.
     And can be tree-shaked by modern bundlers

     Would be nice to combine this with directClone but could not do it without breaking change
     */
    /**
     * Clones given virtual node by creating new instance of it
     * @param {VNode} vNodeToClone virtual node to be cloned
     * @param {Props=} props additional props for new virtual node
     * @param {...*} _children new children for new virtual node
     * @returns {VNode} new virtual node
     */
    function cloneVNode(vNodeToClone, props) {
        var _children = [], len$2 = arguments.length - 2;
        while ( len$2-- > 0 ) _children[ len$2 ] = arguments[ len$2 + 2 ];

        var children = _children;
        var childrenLen = _children.length;
        if (childrenLen > 0 && !isUndefined(_children[0])) {
            if (!props) {
                props = {};
            }
            if (childrenLen === 1) {
                children = _children[0];
            }
            if (!isUndefined(children)) {
                props.children = children;
            }
        }
        var newVNode;
        if (isArray(vNodeToClone)) {
            var tmpArray = [];
            for (var i = 0, len = vNodeToClone.length; i < len; i++) {
                tmpArray.push(directClone(vNodeToClone[i]));
            }
            newVNode = tmpArray;
        }
        else {
            var flags = vNodeToClone.flags;
            var className = vNodeToClone.className;
            var key = vNodeToClone.key;
            var ref = vNodeToClone.ref;
            if (props) {
                if (props.hasOwnProperty("className")) {
                    className = props.className;
                }
                if (props.hasOwnProperty("ref")) {
                    ref = props.ref;
                }
                if (props.hasOwnProperty("key")) {
                    key = props.key;
                }
            }
            if (flags & 28 /* Component */) {
                newVNode = createVNode(flags, vNodeToClone.type, className, null, !vNodeToClone.props && !props
                    ? EMPTY_OBJ
                    : combineFrom(vNodeToClone.props, props), key, ref, true);
                var newProps = newVNode.props;
                if (newProps) {
                    var newChildren = newProps.children;
                    // we need to also clone component children that are in props
                    // as the children may also have been hoisted
                    if (newChildren) {
                        if (isArray(newChildren)) {
                            var len$1 = newChildren.length;
                            if (len$1 > 0) {
                                var tmpArray$1 = [];
                                for (var i$1 = 0; i$1 < len$1; i$1++) {
                                    var child = newChildren[i$1];
                                    if (isStringOrNumber(child)) {
                                        tmpArray$1.push(child);
                                    }
                                    else if (!isInvalid(child) && isVNode(child)) {
                                        tmpArray$1.push(directClone(child));
                                    }
                                }
                                newProps.children = tmpArray$1;
                            }
                        }
                        else if (isVNode(newChildren)) {
                            newProps.children = directClone(newChildren);
                        }
                    }
                }
                newVNode.children = null;
            }
            else if (flags & 3970 /* Element */) {
                children =
                    props && !isUndefined(props.children)
                        ? props.children
                        : vNodeToClone.children;
                newVNode = createVNode(flags, vNodeToClone.type, className, children, !vNodeToClone.props && !props
                    ? EMPTY_OBJ
                    : combineFrom(vNodeToClone.props, props), key, ref, false);
            }
            else if (flags & 1 /* Text */) {
                newVNode = createTextVNode(vNodeToClone.children, key);
            }
        }
        return newVNode;
    }
    function createVoidVNode() {
        return createVNode(4096 /* Void */, null);
    }
    function createTextVNode(text, key) {
        return createVNode(1 /* Text */, null, null, text, null, key);
    }
    function isVNode(o) {
        return !!o.flags;
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function applyKey(key, vNode) {
        vNode.key = key;
        return vNode;
    }
    function applyKeyIfMissing(key, vNode) {
        if (isNumber(key)) {
            key = "." + key;
        }
        if (isNull(vNode.key) || vNode.key[0] === ".") {
            return applyKey(key, vNode);
        }
        return vNode;
    }
    function applyKeyPrefix(key, vNode) {
        vNode.key = key + vNode.key;
        return vNode;
    }
    function _normalizeVNodes(nodes, result, index, currentKey) {
        for (var len = nodes.length; index < len; index++) {
            var n = nodes[index];
            var key = currentKey + "." + index;
            if (!isInvalid(n)) {
                if (isArray(n)) {
                    _normalizeVNodes(n, result, 0, key);
                }
                else {
                    if (isStringOrNumber(n)) {
                        n = createTextVNode(n, null);
                    }
                    else if ((isVNode(n) && n.dom) || (n.key && n.key[0] === ".")) {
                        n = directClone(n);
                    }
                    if (isNull(n.key) || n.key[0] === ".") {
                        n = applyKey(key, n);
                    }
                    else {
                        n = applyKeyPrefix(currentKey, n);
                    }
                    result.push(n);
                }
            }
        }
    }
    function normalizeVNodes(nodes) {
        var newNodes;
        // we assign $ which basically means we've flagged this array for future note
        // if it comes back again, we need to clone it, as people are using it
        // in an immutable way
        // tslint:disable
        if (nodes["$"] === true) {
            nodes = nodes.slice();
        }
        else {
            nodes["$"] = true;
        }
        // tslint:enable
        for (var i = 0, len = nodes.length; i < len; i++) {
            var n = nodes[i];
            if (isInvalid(n) || isArray(n)) {
                var result = (newNodes || nodes).slice(0, i);
                _normalizeVNodes(nodes, result, i, "");
                return result;
            }
            else if (isStringOrNumber(n)) {
                if (!newNodes) {
                    newNodes = nodes.slice(0, i);
                }
                newNodes.push(applyKeyIfMissing(i, createTextVNode(n, null)));
            }
            else if ((isVNode(n) && n.dom !== null) ||
                (isNull(n.key) && (n.flags & 64 /* HasNonKeyedChildren */) === 0)) {
                if (!newNodes) {
                    newNodes = nodes.slice(0, i);
                }
                newNodes.push(applyKeyIfMissing(i, directClone(n)));
            }
            else if (newNodes) {
                newNodes.push(applyKeyIfMissing(i, directClone(n)));
            }
        }
        return newNodes || nodes;
    }
    function normalizeChildren(children) {
        if (isArray(children)) {
            return normalizeVNodes(children);
        }
        else if (isVNode(children) && children.dom !== null) {
            return directClone(children);
        }
        return children;
    }
    function normalizeProps(vNode, props, children) {
        if (vNode.flags & 3970 /* Element */) {
            if (isNullOrUndef(children) && props.hasOwnProperty("children")) {
                vNode.children = props.children;
            }
            if (props.hasOwnProperty("className")) {
                vNode.className = props.className || null;
                delete props.className;
            }
        }
        if (props.hasOwnProperty("ref")) {
            vNode.ref = props.ref;
            delete props.ref;
        }
        if (props.hasOwnProperty("key")) {
            vNode.key = props.key;
            delete props.key;
        }
    }
    function getFlagsForElementVnode(type) {
        if (type === "svg") {
            return 128 /* SvgElement */;
        }
        else if (type === "input") {
            return 512 /* InputElement */;
        }
        else if (type === "select") {
            return 2048 /* SelectElement */;
        }
        else if (type === "textarea") {
            return 1024 /* TextareaElement */;
        }
        else if (type === "media") {
            return 256 /* MediaElement */;
        }
        return 2 /* HtmlElement */;
    }
    function normalize(vNode) {
        var props = vNode.props;
        var children = vNode.children;
        // convert a wrongly created type back to element
        // Primitive node doesn't have defaultProps, only Component
        if (vNode.flags & 28 /* Component */) {
            // set default props
            var type = vNode.type;
            var defaultProps = type.defaultProps;
            if (!isNullOrUndef(defaultProps)) {
                if (!props) {
                    props = vNode.props = defaultProps; // Create new object if only defaultProps given
                }
                else {
                    for (var prop in defaultProps) {
                        if (isUndefined(props[prop])) {
                            props[prop] = defaultProps[prop];
                        }
                    }
                }
            }
            if (isString(type)) {
                vNode.flags = getFlagsForElementVnode(type);
                if (props && props.children) {
                    vNode.children = props.children;
                    children = props.children;
                }
            }
        }
        if (props) {
            normalizeProps(vNode, props, children);
            if (!isInvalid(props.children)) {
                props.children = normalizeChildren(props.children);
            }
        }
        if (!isInvalid(children)) {
            vNode.children = normalizeChildren(children);
        }
        {
            // This code will be stripped out from production CODE
            // It helps users to track errors in their applications.
            var verifyKeys = function (vNodes) {
                var keyValues = vNodes.map((function (vnode) {
                    return vnode.key;
                }));
                keyValues.some((function (item, idx) {
                    var hasDuplicate = keyValues.indexOf(item) !== idx;
                    if (hasDuplicate) {
                        warning("Inferno normalisation(...): Encountered two children with same key, all keys must be unique within its siblings. Duplicated key is:" +
                            item);
                    }
                    return hasDuplicate;
                }));
            };
            if (vNode.children && Array.isArray(vNode.children)) {
                verifyKeys(vNode.children);
            }
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    /**
     * Links given data to event as first parameter
     * @param {*} data data to be linked, it will be available in function as first parameter
     * @param {Function} event Function to be called when event occurs
     * @returns {{data: *, event: Function}}
     */
    function linkEvent(data, event) {
        if (isFunction(event)) {
            return { data: data, event: event };
        }
        return null; // Return null when event is invalid, to avoid creating unnecessary event handlers
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    /* tslint:disable:object-literal-sort-keys */
    {
        /* tslint:disable-next-line:no-empty */
        var testFunc = function testFn() { };
        if ((testFunc.name || testFunc.toString()).indexOf("testFn") ===
            -1) {
            warning("It looks like you're using a minified copy of the development build " +
                "of Inferno. When deploying Inferno apps to production, make sure to use " +
                "the production build which skips development warnings and is faster. " +
                "See http://infernojs.org for more details.");
        }
    }
    var version = "3.9.0";
    // we duplicate it so it plays nicely with different module loading systems
    var index = {
        EMPTY_OBJ: EMPTY_OBJ,
        NO_OP: NO_OP,
        cloneVNode: cloneVNode,
        createRenderer: createRenderer,
        createVNode: createVNode,
        findDOMNode: findDOMNode,
        getFlagsForElementVnode: getFlagsForElementVnode,
        internal_DOMNodeMap: componentToDOMNodeMap,
        internal_isUnitlessNumber: isUnitlessNumber,
        internal_normalize: normalize,
        internal_patch: patch,
        linkEvent: linkEvent,
        options: options,
        render: render,
        version: version
    };

    exports['default'] = index;
    exports.EMPTY_OBJ = EMPTY_OBJ;
    exports.NO_OP = NO_OP;
    exports.cloneVNode = cloneVNode;
    exports.createRenderer = createRenderer;
    exports.createVNode = createVNode;
    exports.findDOMNode = findDOMNode;
    exports.getFlagsForElementVnode = getFlagsForElementVnode;
    exports.internal_DOMNodeMap = componentToDOMNodeMap;
    exports.internal_isUnitlessNumber = isUnitlessNumber;
    exports.internal_normalize = normalize;
    exports.internal_patch = patch;
    exports.linkEvent = linkEvent;
    exports.options = options;
    exports.render = render;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

// Inferno Component
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno')) :
    typeof define === 'function' && define.amd ? define(['inferno'], factory) :
    (global.Inferno = global.Inferno || {}, global.Inferno.Component = factory(global.Inferno));
}(this, (function (inferno) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var NO_OP = "$NO_OP";
    var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isStringOrNumber(o) {
        var type = typeof o;
        return type === "string" || type === "number";
    }
    function isNullOrUndef(o) {
        return isUndefined(o) || isNull(o);
    }
    function isInvalid(o) {
        return isNull(o) || o === false || isTrue(o) || isUndefined(o);
    }
    function isFunction(o) {
        return typeof o === "function";
    }
    function isNull(o) {
        return o === null;
    }
    function isTrue(o) {
        return o === true;
    }
    function isUndefined(o) {
        return o === void 0;
    }
    function throwError(message) {
        if (!message) {
            message = ERROR_MSG;
        }
        throw new Error(("Inferno Error: " + message));
    }
    function combineFrom(first, second) {
        var out = {};
        if (first) {
            for (var key in first) {
                out[key] = first[key];
            }
        }
        if (second) {
            for (var key$1 in second) {
                out[key$1] = second[key$1];
            }
        }
        return out;
    }

    /**
     * @module Inferno-Component
     */ /** TypeDoc Comment */
    // Make sure u use EMPTY_OBJ from 'inferno', otherwise it'll be a different reference
    var noOp = ERROR_MSG;
    {
        noOp =
            "Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.";
    }
    var componentCallbackQueue = new Map();
    // when a components root VNode is also a component, we can run into issues
    // this will recursively look for vNode.parentNode if the VNode is a component
    function updateParentComponentVNodes(vNode, dom) {
        if (vNode.flags & 28 /* Component */) {
            var parentVNode = vNode.parentVNode;
            if (parentVNode) {
                parentVNode.dom = dom;
                updateParentComponentVNodes(parentVNode, dom);
            }
        }
    }
    var resolvedPromise = Promise.resolve();
    function addToQueue(component, force, callback) {
        var queue = componentCallbackQueue.get(component);
        if (queue === void 0) {
            queue = [];
            componentCallbackQueue.set(component, queue);
            resolvedPromise.then((function () {
                componentCallbackQueue.delete(component);
                component._updating = true;
                applyState(component, force, (function () {
                    for (var i = 0, len = queue.length; i < len; i++) {
                        queue[i].call(component);
                    }
                }));
                component._updating = false;
            }));
        }
        if (!isNullOrUndef(callback)) {
            queue.push(callback);
        }
    }
    function queueStateChanges(component, newState, callback) {
        if (isFunction(newState)) {
            newState = newState(component.state, component.props, component.context);
        }
        var pending = component._pendingState;
        if (isNullOrUndef(pending)) {
            component._pendingState = newState;
        }
        else {
            for (var stateKey in newState) {
                pending[stateKey] = newState[stateKey];
            }
        }
        if (!component._pendingSetState && !component._blockRender) {
            if (!component._updating) {
                component._pendingSetState = true;
                component._updating = true;
                applyState(component, false, callback);
                component._updating = false;
            }
            else {
                addToQueue(component, false, callback);
            }
        }
        else {
            component._pendingSetState = true;
            if (!isNullOrUndef(callback) && component._blockRender) {
                component._lifecycle.addListener(callback.bind(component));
            }
        }
    }
    function applyState(component, force, callback) {
        if (component._unmounted) {
            return;
        }
        if (force || !component._blockRender) {
            component._pendingSetState = false;
            var pendingState = component._pendingState;
            var prevState = component.state;
            var nextState = combineFrom(prevState, pendingState);
            var props = component.props;
            var context = component.context;
            component._pendingState = null;
            var nextInput;
            var renderOutput = component._updateComponent(prevState, nextState, props, props, context, force, true);
            var didUpdate = true;
            if (isInvalid(renderOutput)) {
                nextInput = inferno.createVNode(4096 /* Void */, null);
            }
            else if (renderOutput === NO_OP) {
                nextInput = component._lastInput;
                didUpdate = false;
            }
            else if (isStringOrNumber(renderOutput)) {
                nextInput = inferno.createVNode(1 /* Text */, null, null, renderOutput);
            }
            else if (isArray(renderOutput)) {
                {
                    throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
                }
                return throwError();
            }
            else {
                nextInput = renderOutput;
            }
            var lastInput = component._lastInput;
            var vNode = component._vNode;
            var parentDom = (lastInput.dom && lastInput.dom.parentNode) ||
                (lastInput.dom = vNode.dom);
            if (nextInput.flags & 28 /* Component */) {
                nextInput.parentVNode = vNode;
            }
            component._lastInput = nextInput;
            if (didUpdate) {
                var childContext;
                if (!isNullOrUndef(component.getChildContext)) {
                    childContext = component.getChildContext();
                }
                if (isNullOrUndef(childContext)) {
                    childContext = component._childContext;
                }
                else {
                    childContext = combineFrom(context, childContext);
                }
                var lifeCycle = component._lifecycle;
                inferno.internal_patch(lastInput, nextInput, parentDom, lifeCycle, childContext, component._isSVG, false);
                // If this component was unmounted by its parent, do nothing. This is no-op
                if (component._unmounted) {
                    return;
                }
                lifeCycle.trigger();
                if (!isNullOrUndef(component.componentDidUpdate)) {
                    component.componentDidUpdate(props, prevState, context);
                }
                if (!isNull(inferno.options.afterUpdate)) {
                    inferno.options.afterUpdate(vNode);
                }
            }
            var dom = (vNode.dom = nextInput.dom);
            if (inferno.options.findDOMNodeEnabled) {
                inferno.internal_DOMNodeMap.set(component, nextInput.dom);
            }
            updateParentComponentVNodes(vNode, dom);
        }
        else {
            component.state = component._pendingState;
            component._pendingState = null;
        }
        if (!isNullOrUndef(callback)) {
            callback.call(component);
        }
    }
    var Component = function Component(props, context) {
        this.state = null;
        this._blockRender = false;
        this._blockSetState = true;
        this._pendingSetState = false;
        this._pendingState = null;
        this._lastInput = null;
        this._vNode = null;
        this._unmounted = false;
        this._lifecycle = null;
        this._childContext = null;
        this._isSVG = false;
        this._updating = true;
        /** @type {object} */
        this.props = props || inferno.EMPTY_OBJ;
        /** @type {object} */
        this.context = context || inferno.EMPTY_OBJ; // context should not be mutable
    };
    Component.prototype.forceUpdate = function forceUpdate (callback) {
        if (this._unmounted) {
            return;
        }
        applyState(this, true, callback);
    };
    Component.prototype.setState = function setState (newState, callback) {
        if (this._unmounted) {
            return;
        }
        if (!this._blockSetState) {
            queueStateChanges(this, newState, callback);
        }
        else {
            {
                throwError("cannot update state via setState() in componentWillUpdate() or constructor.");
            }
            throwError();
        }
    };
    Component.prototype._updateComponent = function _updateComponent (prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
        if (this._unmounted === true) {
            {
                throwError(noOp);
            }
            throwError();
        }
        if (prevProps !== nextProps ||
            nextProps === inferno.EMPTY_OBJ ||
            prevState !== nextState ||
            force) {
            if (prevProps !== nextProps || nextProps === inferno.EMPTY_OBJ) {
                if (!isNullOrUndef(this.componentWillReceiveProps) && !fromSetState) {
                    this._blockRender = true;
                    this.componentWillReceiveProps(nextProps, context);
                    // If this component was removed during its own update do nothing...
                    if (this._unmounted) {
                        return NO_OP;
                    }
                    this._blockRender = false;
                }
                if (this._pendingSetState) {
                    nextState = combineFrom(nextState, this._pendingState);
                    this._pendingSetState = false;
                    this._pendingState = null;
                }
            }
            /* Update if scu is not defined, or it returns truthy value or force */
            if (force ||
                isNullOrUndef(this.shouldComponentUpdate) ||
                (this.shouldComponentUpdate &&
                    this.shouldComponentUpdate(nextProps, nextState, context))) {
                if (!isNullOrUndef(this.componentWillUpdate)) {
                    this._blockSetState = true;
                    this.componentWillUpdate(nextProps, nextState, context);
                    this._blockSetState = false;
                }
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
                if (inferno.options.beforeRender) {
                    inferno.options.beforeRender(this);
                }
                var render = this.render(nextProps, nextState, context);
                if (inferno.options.afterRender) {
                    inferno.options.afterRender(this);
                }
                return render;
            }
            else {
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
            }
        }
        return NO_OP;
    };
    // tslint:disable-next-line:no-empty
    Component.prototype.render = function render (nextProps, nextState, nextContext) { };

    return Component;

})));

// Inferno Create Class
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno-component')) :
    typeof define === 'function' && define.amd ? define(['inferno-component'], factory) :
    (global.Inferno = global.Inferno || {}, global.Inferno.createClass = factory(global.Inferno.Component));
}(this, (function (Component) { 'use strict';

    Component = Component && Component.hasOwnProperty('default') ? Component['default'] : Component;

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
    function isNullOrUndef(o) {
        return isUndefined(o) || isNull(o);
    }
    function isFunction(o) {
        return typeof o === "function";
    }
    function isNull(o) {
        return o === null;
    }
    function isUndefined(o) {
        return o === void 0;
    }
    function isObject(o) {
        return typeof o === "object";
    }
    function throwError(message) {
        if (!message) {
            message = ERROR_MSG;
        }
        throw new Error(("Inferno Error: " + message));
    }

    /**
     * @module Inferno-Create-Class
     */ /** TypeDoc Comment */
    // don't autobind these methods since they already have guaranteed context.
    var AUTOBIND_BLACKLIST = new Set();
    AUTOBIND_BLACKLIST.add("constructor");
    AUTOBIND_BLACKLIST.add("render");
    AUTOBIND_BLACKLIST.add("shouldComponentUpdate");
    AUTOBIND_BLACKLIST.add("componentWillReceiveProps");
    AUTOBIND_BLACKLIST.add("componentWillUpdate");
    AUTOBIND_BLACKLIST.add("componentDidUpdate");
    AUTOBIND_BLACKLIST.add("componentWillMount");
    AUTOBIND_BLACKLIST.add("componentDidMount");
    AUTOBIND_BLACKLIST.add("componentWillUnmount");
    AUTOBIND_BLACKLIST.add("componentDidUnmount");
    function extend(base, props) {
        for (var key in props) {
            if (!isNullOrUndef(props[key])) {
                base[key] = props[key];
            }
        }
        return base;
    }
    function bindAll(ctx) {
        for (var i in ctx) {
            var v = ctx[i];
            if (typeof v === "function" && !v.__bound && !AUTOBIND_BLACKLIST.has(i)) {
                (ctx[i] = v.bind(ctx)).__bound = true;
            }
        }
    }
    function collateMixins(mixins, keyed) {
        if ( keyed === void 0 ) keyed = {};

        for (var i = 0, len = mixins.length; i < len; i++) {
            var mixin = mixins[i];
            // Surprise: Mixins can have mixins
            if (mixin.mixins) {
                // Recursively collate sub-mixins
                collateMixins(mixin.mixins, keyed);
            }
            for (var key in mixin) {
                if (mixin.hasOwnProperty(key) && typeof mixin[key] === "function") {
                    (keyed[key] || (keyed[key] = [])).push(mixin[key]);
                }
            }
        }
        return keyed;
    }
    function multihook(hooks, mergeFn) {
        return function () {
            var arguments$1 = arguments;
            var this$1 = this;

            var ret;
            for (var i = 0, len = hooks.length; i < len; i++) {
                var hook = hooks[i];
                var r = hook.apply(this$1, arguments$1);
                if (mergeFn) {
                    ret = mergeFn(ret, r);
                }
                else if (!isUndefined(r)) {
                    ret = r;
                }
            }
            return ret;
        };
    }
    function mergeNoDupes(previous, current) {
        if (!isUndefined(current)) {
            if (!isObject(current)) {
                throwError("Expected Mixin to return value to be an object or null.");
            }
            if (!previous) {
                previous = {};
            }
            for (var key in current) {
                if (current.hasOwnProperty(key)) {
                    if (previous.hasOwnProperty(key)) {
                        throwError(("Mixins return duplicate key " + key + " in their return values"));
                    }
                    previous[key] = current[key];
                }
            }
        }
        return previous;
    }
    function applyMixin(key, inst, mixin) {
        var hooks = isUndefined(inst[key]) ? mixin : mixin.concat(inst[key]);
        if (key === "getDefaultProps" ||
            key === "getInitialState" ||
            key === "getChildContext") {
            inst[key] = multihook(hooks, mergeNoDupes);
        }
        else {
            inst[key] = multihook(hooks);
        }
    }
    function applyMixins(Cl, mixins) {
        for (var key in mixins) {
            if (mixins.hasOwnProperty(key)) {
                var mixin = mixins[key];
                var inst = (void 0);
                if (key === "getDefaultProps") {
                    inst = Cl;
                }
                else {
                    inst = Cl.prototype;
                }
                if (isFunction(mixin[0])) {
                    applyMixin(key, inst, mixin);
                }
                else {
                    inst[key] = mixin;
                }
            }
        }
    }
    function createClass(obj) {
        var Cl = (function (Component$$1) {
            function Cl(props, context) {
                Component$$1.call(this, props, context);
                bindAll(this);
                if (this.getInitialState) {
                    this.state = this.getInitialState();
                }
            }

            if ( Component$$1 ) Cl.__proto__ = Component$$1;
            Cl.prototype = Object.create( Component$$1 && Component$$1.prototype );
            Cl.prototype.constructor = Cl;
            Cl.prototype.replaceState = function replaceState (nextState, callback) {
                this.setState(nextState, callback);
            };
            Cl.prototype.isMounted = function isMounted () {
                return !this._unmounted;
            };

            return Cl;
        }(Component));
        Cl.displayName = obj.displayName || "Component";
        Cl.propTypes = obj.propTypes;
        Cl.mixins = obj.mixins && collateMixins(obj.mixins);
        Cl.getDefaultProps = obj.getDefaultProps;
        extend(Cl.prototype, obj);
        if (obj.statics) {
            extend(Cl, obj.statics);
        }
        if (obj.mixins) {
            applyMixins(Cl, collateMixins(obj.mixins));
        }
        Cl.defaultProps = isUndefined(Cl.getDefaultProps)
            ? undefined
            : Cl.getDefaultProps();
        return Cl;
    }

    return createClass;

})));

// Inferno Create Element
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno')) :
    typeof define === 'function' && define.amd ? define(['inferno'], factory) :
    (global.Inferno = global.Inferno || {}, global.Inferno.createElement = factory(global.Inferno));
}(this, (function (inferno) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    function isNullOrUndef(o) {
        return isUndefined(o) || isNull(o);
    }
    function isInvalid(o) {
        return isNull(o) || o === false || isTrue(o) || isUndefined(o);
    }
    function isString(o) {
        return typeof o === "string";
    }
    function isNull(o) {
        return o === null;
    }
    function isTrue(o) {
        return o === true;
    }
    function isUndefined(o) {
        return o === void 0;
    }
    function isObject(o) {
        return typeof o === "object";
    }

    /**
     * @module Inferno-Create-Element
     */ /** TypeDoc Comment */
    var componentHooks = new Set();
    componentHooks.add("onComponentWillMount");
    componentHooks.add("onComponentDidMount");
    componentHooks.add("onComponentWillUnmount");
    componentHooks.add("onComponentShouldUpdate");
    componentHooks.add("onComponentWillUpdate");
    componentHooks.add("onComponentDidUpdate");
    /**
     * Creates virtual node
     * @param {string|Function|Component<any, any>} type Type of node
     * @param {object=} props Optional props for virtual node
     * @param {...{object}=} _children Optional children for virtual node
     * @returns {VNode} new virtual ndoe
     */
    function createElement(type, props) {
        var _children = [], len = arguments.length - 2;
        while ( len-- > 0 ) _children[ len ] = arguments[ len + 2 ];

        if (isInvalid(type) || isObject(type)) {
            throw new Error("Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.");
        }
        var children = _children;
        var ref = null;
        var key = null;
        var className = null;
        var flags = 0;
        var newProps;
        if (_children) {
            if (_children.length === 1) {
                children = _children[0];
            }
            else if (_children.length === 0) {
                children = void 0;
            }
        }
        if (isString(type)) {
            flags = inferno.getFlagsForElementVnode(type);
            if (!isNullOrUndef(props)) {
                newProps = {};
                for (var prop in props) {
                    if (prop === "className" || prop === "class") {
                        className = props[prop];
                    }
                    else if (prop === "key") {
                        key = props.key;
                    }
                    else if (prop === "children" && isUndefined(children)) {
                        children = props.children; // always favour children args, default to props
                    }
                    else if (prop === "ref") {
                        ref = props.ref;
                    }
                    else {
                        newProps[prop] = props[prop];
                    }
                }
            }
        }
        else {
            flags = 16 /* ComponentUnknown */;
            if (!isUndefined(children)) {
                if (!props) {
                    props = {};
                }
                props.children = children;
                children = null;
            }
            if (!isNullOrUndef(props)) {
                newProps = {};
                for (var prop$1 in props) {
                    if (componentHooks.has(prop$1)) {
                        if (!ref) {
                            ref = {};
                        }
                        ref[prop$1] = props[prop$1];
                    }
                    else if (prop$1 === "key") {
                        key = props.key;
                    }
                    else {
                        newProps[prop$1] = props[prop$1];
                    }
                }
            }
        }
        return inferno.createVNode(flags, type, className, children, newProps, key, ref);
    }

    return createElement;

})));

// Inferno Vnode Flags
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Inferno = global.Inferno || {}, global.Inferno.VNodeFlags = factory());
}(this, (function () { 'use strict';

    /**
     * @module Inferno-Vnode-Flags
     */ /** TypeDoc Comment */
    var VNodeFlags;
    (function (VNodeFlags) {
        VNodeFlags[VNodeFlags["Text"] = 1] = "Text";
        VNodeFlags[VNodeFlags["HtmlElement"] = 2] = "HtmlElement";
        VNodeFlags[VNodeFlags["ComponentClass"] = 4] = "ComponentClass";
        VNodeFlags[VNodeFlags["ComponentFunction"] = 8] = "ComponentFunction";
        VNodeFlags[VNodeFlags["ComponentUnknown"] = 16] = "ComponentUnknown";
        VNodeFlags[VNodeFlags["HasKeyedChildren"] = 32] = "HasKeyedChildren";
        VNodeFlags[VNodeFlags["HasNonKeyedChildren"] = 64] = "HasNonKeyedChildren";
        VNodeFlags[VNodeFlags["SvgElement"] = 128] = "SvgElement";
        VNodeFlags[VNodeFlags["MediaElement"] = 256] = "MediaElement";
        VNodeFlags[VNodeFlags["InputElement"] = 512] = "InputElement";
        VNodeFlags[VNodeFlags["TextareaElement"] = 1024] = "TextareaElement";
        VNodeFlags[VNodeFlags["SelectElement"] = 2048] = "SelectElement";
        VNodeFlags[VNodeFlags["Void"] = 4096] = "Void";
        VNodeFlags[VNodeFlags["FormElement"] = 3584] = "FormElement";
        VNodeFlags[VNodeFlags["Element"] = 3970] = "Element";
        VNodeFlags[VNodeFlags["Component"] = 28] = "Component";
    })(VNodeFlags || (VNodeFlags = {}));
    var VNodeFlags$1 = VNodeFlags;

    return VNodeFlags$1;

})));

// Inferno Transition Group
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno'), require('inferno-component')) :
  typeof define === 'function' && define.amd ? define(['inferno', 'inferno-component'], factory) :
  (global.InfernoTransitionGroup = factory(global.Inferno,global.Inferno.Component));
}(this, (function (inferno,Component) {

  Component = 'default' in Component ? Component['default'] : Component;

  function assign(obj, props) {
    for (var i in props) {
      if (props.hasOwnProperty(i)) obj[i] = props[i];
    }return obj;
  }

  function getKey(vnode, fallback) {
    var key = vnode.key;
    return key === null || key === void 0 ? fallback : key;
  }

  function getChildMapping(children) {
    var out = {};
    for (var i = 0; i < children.length; i++) {
      var child = children[i];

      if (child !== null && child !== void 0) {
        var key = getKey(child, i.toString(36));
        out[key] = child;
      }
    }
    return out;
  }

  function mergeChildMappings(prev, next) {
    prev = prev || {};
    next = next || {};

    var getValueForKey = function getValueForKey(key) {
      return next.hasOwnProperty(key) ? next[key] : prev[key];
    };

    var nextKeysPending = {};

    var pendingKeys = [];
    for (var prevKey in prev) {
      if (next.hasOwnProperty(prevKey)) {
        if (pendingKeys.length) {
          nextKeysPending[prevKey] = pendingKeys;
          pendingKeys = [];
        }
      } else {
        pendingKeys.push(prevKey);
      }
    }

    var childMapping = {};
    for (var nextKey in next) {
      if (nextKeysPending.hasOwnProperty(nextKey)) {
        for (var i = 0; i < nextKeysPending[nextKey].length; i++) {
          var pendingNextKey = nextKeysPending[nextKey][i];
          childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
        }
      }
      childMapping[nextKey] = getValueForKey(nextKey);
    }

    for (var _i = 0; _i < pendingKeys.length; _i++) {
      childMapping[pendingKeys[_i]] = getValueForKey(pendingKeys[_i]);
    }

    return childMapping;
  }

  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var identity = function identity(i) {
    return i;
  };

  var TransitionGroup$1 = function (_Component) {
    _inherits(TransitionGroup, _Component);

    function TransitionGroup() {
      var _temp, _this, _ret;

      _classCallCheck(this, TransitionGroup);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.refs = {}, _this.state = {
        children: getChildMapping(_this.props.children || [])
      }, _this.performEnter = function (key) {
        _this.currentlyTransitioningKeys[key] = true;

        var component = _this.refs[key];

        if (component.componentWillEnter) {
          component.componentWillEnter(_this._handleDoneEntering.bind(_this, key));
        } else {
          _this._handleDoneEntering(key);
        }
      }, _this.performLeave = function (key) {
        _this.currentlyTransitioningKeys[key] = true;

        var component = _this.refs[key];
        if (component.componentWillLeave) {
          component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key));
        } else {
          _this._handleDoneLeaving(key);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    TransitionGroup.prototype.componentWillMount = function componentWillMount() {
      this.currentlyTransitioningKeys = {};
      this.keysToEnter = [];
      this.keysToLeave = [];
    };

    TransitionGroup.prototype.componentDidMount = function componentDidMount() {
      var initialChildMapping = this.state.children;
      for (var key in initialChildMapping) {
        if (initialChildMapping[key]) {
          this.performAppear(key);
        }
      }
    };

    TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var nextChildMapping = getChildMapping(nextProps.children || []);
      var prevChildMapping = this.state.children;

      this.setState({
        children: mergeChildMappings(prevChildMapping, nextChildMapping)
      });

      var key = void 0;

      for (key in nextChildMapping) {
        if (nextChildMapping.hasOwnProperty(key)) {
          var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
          if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
            this.keysToEnter.push(key);
          }
        }
      }for (key in prevChildMapping) {
        if (prevChildMapping.hasOwnProperty(key)) {
          var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
          if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
            this.keysToLeave.push(key);
          }
        }
      }
    };

    TransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
      var keysToEnter = this.keysToEnter;
      this.keysToEnter = [];
      keysToEnter.forEach(this.performEnter);

      var keysToLeave = this.keysToLeave;
      this.keysToLeave = [];
      keysToLeave.forEach(this.performLeave);
    };

    TransitionGroup.prototype.performAppear = function performAppear(key) {
      this.currentlyTransitioningKeys[key] = true;

      var component = this.refs[key];

      if (component.componentWillAppear) {
        component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
      } else {
        this._handleDoneAppearing(key);
      }
    };

    TransitionGroup.prototype._handleDoneAppearing = function _handleDoneAppearing(key) {
      var component = this.refs[key];
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }

      delete this.currentlyTransitioningKeys[key];

      var currentChildMapping = getChildMapping(this.props.children || []);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        this.performLeave(key);
      }
    };

    TransitionGroup.prototype._handleDoneEntering = function _handleDoneEntering(key) {
      var component = this.refs[key];
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }

      delete this.currentlyTransitioningKeys[key];

      var currentChildMapping = getChildMapping(this.props.children || []);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        this.performLeave(key);
      }
    };

    TransitionGroup.prototype._handleDoneLeaving = function _handleDoneLeaving(key) {
      var component = this.refs[key];

      if (component.componentDidLeave) {
        component.componentDidLeave();
      }

      delete this.currentlyTransitioningKeys[key];

      var currentChildMapping = getChildMapping(this.props.children || []);

      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        this.performEnter(key);
      } else {
        var children = assign({}, this.state.children);
        delete children[key];
        this.setState({ children: children });
      }
    };

    TransitionGroup.prototype.render = function render(_ref) {
      var _this2 = this;

      var childFactory = _ref.childFactory,
          transitionLeave = _ref.transitionLeave,
          transitionName = _ref.transitionName,
          transitionAppear = _ref.transitionAppear,
          transitionEnter = _ref.transitionEnter,
          transitionLeaveTimeout = _ref.transitionLeaveTimeout,
          transitionEnterTimeout = _ref.transitionEnterTimeout,
          transitionAppearTimeout = _ref.transitionAppearTimeout,
          component = _ref.component,
          props = _objectWithoutProperties(_ref, ['childFactory', 'transitionLeave', 'transitionName', 'transitionAppear', 'transitionEnter', 'transitionLeaveTimeout', 'transitionEnterTimeout', 'transitionAppearTimeout', 'component']);

      var childrenToRender = [];

      var _loop = function _loop(key) {
        if (_this2.state.children.hasOwnProperty(key)) {
          var child = _this2.state.children[key];
          if (child) {
            var ref = function ref(instance) {
              return _this2.refs[key] = instance;
            },
                el = inferno.cloneVNode(childFactory(child), { key: key, ref: ref });
            childrenToRender.push(el);
          }
        }
      };

      for (var key in this.state.children) {
        _loop(key);
      }return inferno.createVNode(typeof component === 'string' ? 2 : 16, component, props && props.className, childrenToRender, props);
    };

    return TransitionGroup;
  }(Component);
  TransitionGroup$1.defaultProps = {
    component: 'span',
    childFactory: identity
  };

  return TransitionGroup$1;

})));

// Inferno Shared
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Inferno = global.Inferno || {}, global.Inferno.Shared = {})));
}(this, (function (exports) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var NO_OP = "$NO_OP";
    var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== "undefined" && window.document);
    function toArray(children) {
        return isArray(children) ? children : children ? [children] : children;
    }
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isStatefulComponent(o) {
        return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
    }
    function isStringOrNumber(o) {
        var type = typeof o;
        return type === "string" || type === "number";
    }
    function isNullOrUndef(o) {
        return isUndefined(o) || isNull(o);
    }
    function isInvalid(o) {
        return isNull(o) || o === false || isTrue(o) || isUndefined(o);
    }
    function isFunction(o) {
        return typeof o === "function";
    }
    function isString(o) {
        return typeof o === "string";
    }
    function isNumber(o) {
        return typeof o === "number";
    }
    function isNull(o) {
        return o === null;
    }
    function isTrue(o) {
        return o === true;
    }
    function isUndefined(o) {
        return o === void 0;
    }
    function isObject(o) {
        return typeof o === "object";
    }
    function throwError(message) {
        if (!message) {
            message = ERROR_MSG;
        }
        throw new Error(("Inferno Error: " + message));
    }
    function warning(message) {
        // tslint:disable-next-line:no-console
        console.warn(message);
    }
    function combineFrom(first, second) {
        var out = {};
        if (first) {
            for (var key in first) {
                out[key] = first[key];
            }
        }
        if (second) {
            for (var key$1 in second) {
                out[key$1] = second[key$1];
            }
        }
        return out;
    }
    function Lifecycle() {
        this.listeners = [];
    }
    Lifecycle.prototype.addListener = function addListener(callback) {
        this.listeners.push(callback);
    };
    Lifecycle.prototype.trigger = function trigger() {
        var listeners = this.listeners;
        var listener;
        // We need to remove current listener from array when calling it, because more listeners might be added
        while ((listener = listeners.shift())) {
            listener();
        }
    };

    exports.NO_OP = NO_OP;
    exports.ERROR_MSG = ERROR_MSG;
    exports.isBrowser = isBrowser;
    exports.toArray = toArray;
    exports.isArray = isArray;
    exports.isStatefulComponent = isStatefulComponent;
    exports.isStringOrNumber = isStringOrNumber;
    exports.isNullOrUndef = isNullOrUndef;
    exports.isInvalid = isInvalid;
    exports.isFunction = isFunction;
    exports.isString = isString;
    exports.isNumber = isNumber;
    exports.isNull = isNull;
    exports.isTrue = isTrue;
    exports.isUndefined = isUndefined;
    exports.isObject = isObject;
    exports.throwError = throwError;
    exports.warning = warning;
    exports.combineFrom = combineFrom;
    exports.Lifecycle = Lifecycle;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

// Inferno Compat
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-component')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-component'], factory) :
    (factory((global.Inferno = global.Inferno || {}),global.Inferno,global.Inferno.Component));
}(this, (function (exports,inferno,Component) { 'use strict';

    Component = Component && Component.hasOwnProperty('default') ? Component['default'] : Component;

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
    function isNullOrUndef(o) {
        return isUndefined(o) || isNull(o);
    }
    function isFunction(o) {
        return typeof o === "function";
    }
    function isNull(o) {
        return o === null;
    }
    function isUndefined(o) {
        return o === void 0;
    }
    function isObject(o) {
        return typeof o === "object";
    }
    function throwError(message) {
        if (!message) {
            message = ERROR_MSG;
        }
        throw new Error(("Inferno Error: " + message));
    }

    /**
     * @module Inferno-Create-Class
     */ /** TypeDoc Comment */
    // don't autobind these methods since they already have guaranteed context.
    var AUTOBIND_BLACKLIST = new Set();
    AUTOBIND_BLACKLIST.add("constructor");
    AUTOBIND_BLACKLIST.add("render");
    AUTOBIND_BLACKLIST.add("shouldComponentUpdate");
    AUTOBIND_BLACKLIST.add("componentWillReceiveProps");
    AUTOBIND_BLACKLIST.add("componentWillUpdate");
    AUTOBIND_BLACKLIST.add("componentDidUpdate");
    AUTOBIND_BLACKLIST.add("componentWillMount");
    AUTOBIND_BLACKLIST.add("componentDidMount");
    AUTOBIND_BLACKLIST.add("componentWillUnmount");
    AUTOBIND_BLACKLIST.add("componentDidUnmount");
    function extend(base, props) {
        for (var key in props) {
            if (!isNullOrUndef(props[key])) {
                base[key] = props[key];
            }
        }
        return base;
    }
    function bindAll(ctx) {
        for (var i in ctx) {
            var v = ctx[i];
            if (typeof v === "function" && !v.__bound && !AUTOBIND_BLACKLIST.has(i)) {
                (ctx[i] = v.bind(ctx)).__bound = true;
            }
        }
    }
    function collateMixins(mixins, keyed) {
        if ( keyed === void 0 ) { keyed = {}; }

        for (var i = 0, len = mixins.length; i < len; i++) {
            var mixin = mixins[i];
            // Surprise: Mixins can have mixins
            if (mixin.mixins) {
                // Recursively collate sub-mixins
                collateMixins(mixin.mixins, keyed);
            }
            for (var key in mixin) {
                if (mixin.hasOwnProperty(key) && typeof mixin[key] === "function") {
                    (keyed[key] || (keyed[key] = [])).push(mixin[key]);
                }
            }
        }
        return keyed;
    }
    function multihook(hooks, mergeFn) {
        return function () {
            var arguments$1 = arguments;
            var this$1 = this;

            var ret;
            for (var i = 0, len = hooks.length; i < len; i++) {
                var hook = hooks[i];
                var r = hook.apply(this$1, arguments$1);
                if (mergeFn) {
                    ret = mergeFn(ret, r);
                }
                else if (!isUndefined(r)) {
                    ret = r;
                }
            }
            return ret;
        };
    }
    function mergeNoDupes(previous, current) {
        if (!isUndefined(current)) {
            if (!isObject(current)) {
                throwError("Expected Mixin to return value to be an object or null.");
            }
            if (!previous) {
                previous = {};
            }
            for (var key in current) {
                if (current.hasOwnProperty(key)) {
                    if (previous.hasOwnProperty(key)) {
                        throwError(("Mixins return duplicate key " + key + " in their return values"));
                    }
                    previous[key] = current[key];
                }
            }
        }
        return previous;
    }
    function applyMixin(key, inst, mixin) {
        var hooks = isUndefined(inst[key]) ? mixin : mixin.concat(inst[key]);
        if (key === "getDefaultProps" ||
            key === "getInitialState" ||
            key === "getChildContext") {
            inst[key] = multihook(hooks, mergeNoDupes);
        }
        else {
            inst[key] = multihook(hooks);
        }
    }
    function applyMixins(Cl, mixins) {
        for (var key in mixins) {
            if (mixins.hasOwnProperty(key)) {
                var mixin = mixins[key];
                var inst = (void 0);
                if (key === "getDefaultProps") {
                    inst = Cl;
                }
                else {
                    inst = Cl.prototype;
                }
                if (isFunction(mixin[0])) {
                    applyMixin(key, inst, mixin);
                }
                else {
                    inst[key] = mixin;
                }
            }
        }
    }
    function createClass(obj) {
        var Cl = (function (Component$$1) {
            function Cl(props, context) {
                Component$$1.call(this, props, context);
                bindAll(this);
                if (this.getInitialState) {
                    this.state = this.getInitialState();
                }
            }

            if ( Component$$1 ) { Cl.__proto__ = Component$$1; }
            Cl.prototype = Object.create( Component$$1 && Component$$1.prototype );
            Cl.prototype.constructor = Cl;
            Cl.prototype.replaceState = function replaceState (nextState, callback) {
                this.setState(nextState, callback);
            };
            Cl.prototype.isMounted = function isMounted () {
                return !this._unmounted;
            };

            return Cl;
        }(Component));
        Cl.displayName = obj.displayName || "Component";
        Cl.propTypes = obj.propTypes;
        Cl.mixins = obj.mixins && collateMixins(obj.mixins);
        Cl.getDefaultProps = obj.getDefaultProps;
        extend(Cl.prototype, obj);
        if (obj.statics) {
            extend(Cl, obj.statics);
        }
        if (obj.mixins) {
            applyMixins(Cl, collateMixins(obj.mixins));
        }
        Cl.defaultProps = isUndefined(Cl.getDefaultProps)
            ? undefined
            : Cl.getDefaultProps();
        return Cl;
    }

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    function isNullOrUndef$1(o) {
        return isUndefined$1(o) || isNull$1(o);
    }
    function isInvalid(o) {
        return isNull$1(o) || o === false || isTrue(o) || isUndefined$1(o);
    }
    function isString(o) {
        return typeof o === "string";
    }
    function isNull$1(o) {
        return o === null;
    }
    function isTrue(o) {
        return o === true;
    }
    function isUndefined$1(o) {
        return o === void 0;
    }
    function isObject$1(o) {
        return typeof o === "object";
    }

    /**
     * @module Inferno-Create-Element
     */ /** TypeDoc Comment */
    var componentHooks = new Set();
    componentHooks.add("onComponentWillMount");
    componentHooks.add("onComponentDidMount");
    componentHooks.add("onComponentWillUnmount");
    componentHooks.add("onComponentShouldUpdate");
    componentHooks.add("onComponentWillUpdate");
    componentHooks.add("onComponentDidUpdate");
    /**
     * Creates virtual node
     * @param {string|Function|Component<any, any>} type Type of node
     * @param {object=} props Optional props for virtual node
     * @param {...{object}=} _children Optional children for virtual node
     * @returns {VNode} new virtual ndoe
     */
    function createElement$1(type, props) {
        var arguments$1 = arguments;

        var _children = [], len = arguments.length - 2;
        while ( len-- > 0 ) { _children[ len ] = arguments$1[ len + 2 ]; }

        if (isInvalid(type) || isObject$1(type)) {
            throw new Error("Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.");
        }
        var children = _children;
        var ref = null;
        var key = null;
        var className = null;
        var flags = 0;
        var newProps;
        if (_children) {
            if (_children.length === 1) {
                children = _children[0];
            }
            else if (_children.length === 0) {
                children = void 0;
            }
        }
        if (isString(type)) {
            flags = inferno.getFlagsForElementVnode(type);
            if (!isNullOrUndef$1(props)) {
                newProps = {};
                for (var prop in props) {
                    if (prop === "className" || prop === "class") {
                        className = props[prop];
                    }
                    else if (prop === "key") {
                        key = props.key;
                    }
                    else if (prop === "children" && isUndefined$1(children)) {
                        children = props.children; // always favour children args, default to props
                    }
                    else if (prop === "ref") {
                        ref = props.ref;
                    }
                    else {
                        newProps[prop] = props[prop];
                    }
                }
            }
        }
        else {
            flags = 16 /* ComponentUnknown */;
            if (!isUndefined$1(children)) {
                if (!props) {
                    props = {};
                }
                props.children = children;
                children = null;
            }
            if (!isNullOrUndef$1(props)) {
                newProps = {};
                for (var prop$1 in props) {
                    if (componentHooks.has(prop$1)) {
                        if (!ref) {
                            ref = {};
                        }
                        ref[prop$1] = props[prop$1];
                    }
                    else if (prop$1 === "key") {
                        key = props.key;
                    }
                    else {
                        newProps[prop$1] = props[prop$1];
                    }
                }
            }
        }
        return inferno.createVNode(flags, type, className, children, newProps, key, ref);
    }

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var NO_OP = "$NO_OP";
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== "undefined" && window.document);
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isNullOrUndef$2(o) {
        return isUndefined$2(o) || isNull$2(o);
    }
    function isFunction$1(o) {
        return typeof o === "function";
    }
    function isString$1(o) {
        return typeof o === "string";
    }
    function isNull$2(o) {
        return o === null;
    }
    function isUndefined$2(o) {
        return o === void 0;
    }
    function isObject$2(o) {
        return typeof o === "object";
    }

    /**
     * @module Inferno-Compat
     */ /** TypeDoc Comment */
    function isValidElement(obj) {
        var isNotANullObject = isObject$2(obj) && isNull$2(obj) === false;
        if (isNotANullObject === false) {
            return false;
        }
        var flags = obj.flags;
        return (flags & (28 /* Component */ | 3970 /* Element */)) > 0;
    }

    /**
     * @module Inferno-Compat
     */
    /**
     * Inlined PropTypes, there is propType checking ATM.
     */
    // tslint:disable-next-line:no-empty
    function proptype() { }
    proptype.isRequired = proptype;
    var getProptype = function () { return proptype; };
    var PropTypes = {
        any: getProptype,
        array: proptype,
        arrayOf: getProptype,
        bool: proptype,
        checkPropTypes: function () { return null; },
        element: getProptype,
        func: proptype,
        instanceOf: getProptype,
        node: getProptype,
        number: proptype,
        object: proptype,
        objectOf: getProptype,
        oneOf: getProptype,
        oneOfType: getProptype,
        shape: getProptype,
        string: proptype,
        symbol: proptype
    };

    /**
     * @module Inferno-Compat
     */ /** TypeDoc Comment */
    /**
     * borrowed React SVGDOMPropertyConfig
     * @link https://github.com/facebook/react/blob/c78464f8ea9a5b00ec80252d20a71a1482210e57/src/renderers/dom/shared/SVGDOMPropertyConfig.js
     */
    var SVGDOMPropertyConfig = {
        accentHeight: "accent-height",
        accumulate: 0,
        additive: 0,
        alignmentBaseline: "alignment-baseline",
        allowReorder: "allowReorder",
        alphabetic: 0,
        amplitude: 0,
        arabicForm: "arabic-form",
        ascent: 0,
        attributeName: "attributeName",
        attributeType: "attributeType",
        autoReverse: "autoReverse",
        azimuth: 0,
        baseFrequency: "baseFrequency",
        baseProfile: "baseProfile",
        baselineShift: "baseline-shift",
        bbox: 0,
        begin: 0,
        bias: 0,
        by: 0,
        calcMode: "calcMode",
        capHeight: "cap-height",
        clip: 0,
        clipPath: "clip-path",
        clipPathUnits: "clipPathUnits",
        clipRule: "clip-rule",
        colorInterpolation: "color-interpolation",
        colorInterpolationFilters: "color-interpolation-filters",
        colorProfile: "color-profile",
        colorRendering: "color-rendering",
        contentScriptType: "contentScriptType",
        contentStyleType: "contentStyleType",
        cursor: 0,
        cx: 0,
        cy: 0,
        d: 0,
        decelerate: 0,
        descent: 0,
        diffuseConstant: "diffuseConstant",
        direction: 0,
        display: 0,
        divisor: 0,
        dominantBaseline: "dominant-baseline",
        dur: 0,
        dx: 0,
        dy: 0,
        edgeMode: "edgeMode",
        elevation: 0,
        enableBackground: "enable-background",
        end: 0,
        exponent: 0,
        externalResourcesRequired: "externalResourcesRequired",
        fill: 0,
        fillOpacity: "fill-opacity",
        fillRule: "fill-rule",
        filter: 0,
        filterRes: "filterRes",
        filterUnits: "filterUnits",
        floodColor: "flood-color",
        floodOpacity: "flood-opacity",
        focusable: 0,
        fontFamily: "font-family",
        fontSize: "font-size",
        fontSizeAdjust: "font-size-adjust",
        fontStretch: "font-stretch",
        fontStyle: "font-style",
        fontVariant: "font-variant",
        fontWeight: "font-weight",
        format: 0,
        from: 0,
        fx: 0,
        fy: 0,
        g1: 0,
        g2: 0,
        glyphName: "glyph-name",
        glyphOrientationHorizontal: "glyph-orientation-horizontal",
        glyphOrientationVertical: "glyph-orientation-vertical",
        glyphRef: "glyphRef",
        gradientTransform: "gradientTransform",
        gradientUnits: "gradientUnits",
        hanging: 0,
        horizAdvX: "horiz-adv-x",
        horizOriginX: "horiz-origin-x",
        ideographic: 0,
        imageRendering: "image-rendering",
        in: 0,
        in2: 0,
        intercept: 0,
        k: 0,
        k1: 0,
        k2: 0,
        k3: 0,
        k4: 0,
        kernelMatrix: "kernelMatrix",
        kernelUnitLength: "kernelUnitLength",
        kerning: 0,
        keyPoints: "keyPoints",
        keySplines: "keySplines",
        keyTimes: "keyTimes",
        lengthAdjust: "lengthAdjust",
        letterSpacing: "letter-spacing",
        lightingColor: "lighting-color",
        limitingConeAngle: "limitingConeAngle",
        local: 0,
        markerEnd: "marker-end",
        markerHeight: "markerHeight",
        markerMid: "marker-mid",
        markerStart: "marker-start",
        markerUnits: "markerUnits",
        markerWidth: "markerWidth",
        mask: 0,
        maskContentUnits: "maskContentUnits",
        maskUnits: "maskUnits",
        mathematical: 0,
        mode: 0,
        numOctaves: "numOctaves",
        offset: 0,
        opacity: 0,
        operator: 0,
        order: 0,
        orient: 0,
        orientation: 0,
        origin: 0,
        overflow: 0,
        overlinePosition: "overline-position",
        overlineThickness: "overline-thickness",
        paintOrder: "paint-order",
        panose1: "panose-1",
        pathLength: "pathLength",
        patternContentUnits: "patternContentUnits",
        patternTransform: "patternTransform",
        patternUnits: "patternUnits",
        pointerEvents: "pointer-events",
        points: 0,
        pointsAtX: "pointsAtX",
        pointsAtY: "pointsAtY",
        pointsAtZ: "pointsAtZ",
        preserveAlpha: "preserveAlpha",
        preserveAspectRatio: "preserveAspectRatio",
        primitiveUnits: "primitiveUnits",
        r: 0,
        radius: 0,
        refX: "refX",
        refY: "refY",
        renderingIntent: "rendering-intent",
        repeatCount: "repeatCount",
        repeatDur: "repeatDur",
        requiredExtensions: "requiredExtensions",
        requiredFeatures: "requiredFeatures",
        restart: 0,
        result: 0,
        rotate: 0,
        rx: 0,
        ry: 0,
        scale: 0,
        seed: 0,
        shapeRendering: "shape-rendering",
        slope: 0,
        spacing: 0,
        specularConstant: "specularConstant",
        specularExponent: "specularExponent",
        speed: 0,
        spreadMethod: "spreadMethod",
        startOffset: "startOffset",
        stdDeviation: "stdDeviation",
        stemh: 0,
        stemv: 0,
        stitchTiles: "stitchTiles",
        stopColor: "stop-color",
        stopOpacity: "stop-opacity",
        strikethroughPosition: "strikethrough-position",
        strikethroughThickness: "strikethrough-thickness",
        string: 0,
        stroke: 0,
        strokeDasharray: "stroke-dasharray",
        strokeDashoffset: "stroke-dashoffset",
        strokeLinecap: "stroke-linecap",
        strokeLinejoin: "stroke-linejoin",
        strokeMiterlimit: "stroke-miterlimit",
        strokeOpacity: "stroke-opacity",
        strokeWidth: "stroke-width",
        surfaceScale: "surfaceScale",
        systemLanguage: "systemLanguage",
        tableValues: "tableValues",
        targetX: "targetX",
        targetY: "targetY",
        textAnchor: "text-anchor",
        textDecoration: "text-decoration",
        textLength: "textLength",
        textRendering: "text-rendering",
        to: 0,
        transform: 0,
        u1: 0,
        u2: 0,
        underlinePosition: "underline-position",
        underlineThickness: "underline-thickness",
        unicode: 0,
        unicodeBidi: "unicode-bidi",
        unicodeRange: "unicode-range",
        unitsPerEm: "units-per-em",
        vAlphabetic: "v-alphabetic",
        vHanging: "v-hanging",
        vIdeographic: "v-ideographic",
        vMathematical: "v-mathematical",
        values: 0,
        vectorEffect: "vector-effect",
        version: 0,
        vertAdvY: "vert-adv-y",
        vertOriginX: "vert-origin-x",
        vertOriginY: "vert-origin-y",
        viewBox: "viewBox",
        viewTarget: "viewTarget",
        visibility: 0,
        widths: 0,
        wordSpacing: "word-spacing",
        writingMode: "writing-mode",
        x: 0,
        x1: 0,
        x2: 0,
        xChannelSelector: "xChannelSelector",
        xHeight: "x-height",
        xlinkActuate: "xlink:actuate",
        xlinkArcrole: "xlink:arcrole",
        xlinkHref: "xlink:href",
        xlinkRole: "xlink:role",
        xlinkShow: "xlink:show",
        xlinkTitle: "xlink:title",
        xlinkType: "xlink:type",
        xmlBase: "xml:base",
        // xmlns: 0,
        xmlLang: "xml:lang",
        xmlSpace: "xml:space",
        xmlnsXlink: "xmlns:xlink",
        y: 0,
        y1: 0,
        y2: 0,
        yChannelSelector: "yChannelSelector",
        z: 0,
        zoomAndPan: "zoomAndPan"
    };

    /**
     * @module Inferno-Compat
     */ /** TypeDoc Comment */
    inferno.options.findDOMNodeEnabled = true;
    function unmountComponentAtNode(container) {
        inferno.render(null, container);
        return true;
    }
    var ARR = [];
    var Children = {
        map: function map(children, fn, ctx) {
            if (isNullOrUndef$2(children)) {
                return children;
            }
            children = Children.toArray(children);
            if (ctx && ctx !== children) {
                fn = fn.bind(ctx);
            }
            return children.map(fn);
        },
        forEach: function forEach(children, fn, ctx) {
            if (isNullOrUndef$2(children)) {
                return;
            }
            children = Children.toArray(children);
            if (ctx && ctx !== children) {
                fn = fn.bind(ctx);
            }
            for (var i = 0, len = children.length; i < len; i++) {
                fn(children[i], i, children);
            }
        },
        count: function count(children) {
            children = Children.toArray(children);
            return children.length;
        },
        only: function only(children) {
            children = Children.toArray(children);
            if (children.length !== 1) {
                throw new Error("Children.only() expects only one child.");
            }
            return children[0];
        },
        toArray: function toArray$$1(children) {
            if (isNullOrUndef$2(children)) {
                return [];
            }
            return isArray(children) ? children : ARR.concat(children);
        }
    };
    Component.prototype.isReactComponent = {};
    var currentComponent = null;
    inferno.options.beforeRender = function (component) {
        currentComponent = component;
    };
    inferno.options.afterRender = function () {
        currentComponent = null;
    };
    var version = "15.4.2";
    function normalizeProps(name, props) {
        if ((name === "input" || name === "textarea") &&
            props.type !== "radio" &&
            props.onChange) {
            var type = props.type;
            var eventName;
            if (type === "checkbox") {
                eventName = "onclick";
            }
            else if (type === "file") {
                eventName = "onchange";
            }
            else {
                eventName = "oninput";
            }
            if (!props[eventName]) {
                props[eventName] = props.onChange;
                delete props.onChange;
            }
        }
        for (var prop in props) {
            if (prop === "onDoubleClick") {
                props.onDblClick = props[prop];
                delete props[prop];
            }
            if (prop === "htmlFor") {
                props.for = props[prop];
                delete props[prop];
            }
            var mappedProp = SVGDOMPropertyConfig[prop];
            if (mappedProp && mappedProp !== prop) {
                props[mappedProp] = props[prop];
                delete props[prop];
            }
        }
    }
    // we need to add persist() to Event (as React has it for synthetic events)
    // this is a hack and we really shouldn't be modifying a global object this way,
    // but there isn't a performant way of doing this apart from trying to proxy
    // every prop event that starts with "on", i.e. onClick or onKeyPress
    // but in reality devs use onSomething for many things, not only for
    // input events
    if (typeof Event !== "undefined" && !Event.prototype.persist) {
        // tslint:disable-next-line:no-empty
        Event.prototype.persist = function () { };
    }
    function iterableToArray(iterable) {
        var iterStep;
        var tmpArr = [];
        do {
            iterStep = iterable.next();
            if (iterStep.value) {
                tmpArr.push(iterStep.value);
            }
        } while (!iterStep.done);
        return tmpArr;
    }
    var hasSymbolSupport = typeof Symbol !== "undefined";
    var injectStringRefs = function (originalFunction) {
        return function (name, _props) {
            var children = [], len$1 = arguments.length - 2;
            while ( len$1-- > 0 ) children[ len$1 ] = arguments[ len$1 + 2 ];

            var props = _props || {};
            var ref = props.ref;
            if (typeof ref === "string" && !isNull$2(currentComponent)) {
                currentComponent.refs = currentComponent.refs || {};
                props.ref = function (val) {
                    this.refs[ref] = val;
                }.bind(currentComponent);
            }
            if (typeof name === "string") {
                normalizeProps(name, props);
            }
            // React supports iterable children, in addition to Array-like
            if (hasSymbolSupport) {
                for (var i = 0, len = children.length; i < len; i++) {
                    var child = children[i];
                    if (child &&
                        !isArray(child) &&
                        !isString$1(child) &&
                        isFunction$1(child[Symbol.iterator])) {
                        children[i] = iterableToArray(child[Symbol.iterator]());
                    }
                }
            }
            var vnode = originalFunction.apply(void 0, [ name, props ].concat( children ));
            if (vnode.className) {
                vnode.props = vnode.props || {};
                vnode.props.className = vnode.className;
            }
            return vnode;
        };
    };
    var createElement = injectStringRefs(createElement$1);
    var cloneElement = injectStringRefs(inferno.cloneVNode);
    var oldCreateVNode = inferno.options.createVNode;
    inferno.options.createVNode = function (vNode) {
        var children = vNode.children;
        var props = vNode.props;
        if (isNullOrUndef$2(props)) {
            props = vNode.props = {};
        }
        if (!isNullOrUndef$2(children) && isNullOrUndef$2(props.children)) {
            props.children = children;
        }
        if (oldCreateVNode) {
            oldCreateVNode(vNode);
        }
    };
    // Credit: preact-compat - https://github.com/developit/preact-compat :)
    function shallowDiffers(a, b) {
        for (var i in a) {
            if (!(i in b)) {
                return true;
            }
        }
        for (var i$1 in b) {
            if (a[i$1] !== b[i$1]) {
                return true;
            }
        }
        return false;
    }
    function PureComponent(props, context) {
        Component.call(this, props, context);
    }
    PureComponent.prototype = new Component({}, {});
    PureComponent.prototype.shouldComponentUpdate = function (props, state) {
        return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
    };
    var WrapperComponent = (function (Component$$1) {
        function WrapperComponent () {
            Component$$1.apply(this, arguments);
        }

        if ( Component$$1 ) WrapperComponent.__proto__ = Component$$1;
        WrapperComponent.prototype = Object.create( Component$$1 && Component$$1.prototype );
        WrapperComponent.prototype.constructor = WrapperComponent;

        WrapperComponent.prototype.getChildContext = function getChildContext () {
            // tslint:disable-next-line
            return this.props["context"];
        };
        WrapperComponent.prototype.render = function render$$1 (props) {
            return props.children;
        };

        return WrapperComponent;
    }(Component));
    function unstable_renderSubtreeIntoContainer(parentComponent, vNode, container, callback) {
        var wrapperVNode = inferno.createVNode(4, WrapperComponent, null, null, {
            children: vNode,
            context: parentComponent.context
        });
        var component = inferno.render(wrapperVNode, container);
        if (callback) {
            // callback gets the component as context, no other argument.
            callback.call(component);
        }
        return component;
    }
    // Credit: preact-compat - https://github.com/developit/preact-compat
    var ELEMENTS = "a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan".split(" ");
    function createFactory(type) {
        return createElement.bind(null, type);
    }
    var DOM = {};
    for (var i = ELEMENTS.length; i--;) {
        DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
    }
    // Mask React global in browser enviornments when React is not used.
    if (isBrowser && typeof window.React === "undefined") {
        var exports$1 = {
            Children: Children,
            Component: Component,
            DOM: DOM,
            EMPTY_OBJ: inferno.EMPTY_OBJ,
            NO_OP: NO_OP,
            PropTypes: PropTypes,
            PureComponent: PureComponent,
            cloneElement: cloneElement,
            cloneVNode: inferno.cloneVNode,
            createClass: createClass,
            createElement: createElement,
            createFactory: createFactory,
            createVNode: inferno.createVNode,
            findDOMNode: inferno.findDOMNode,
            isValidElement: isValidElement,
            render: inferno.render,
            unmountComponentAtNode: unmountComponentAtNode,
            unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
            version: version
        };
        window.React = exports$1;
        window.ReactDOM = exports$1;
    }
    var index = {
        Children: Children,
        Component: Component,
        DOM: DOM,
        EMPTY_OBJ: inferno.EMPTY_OBJ,
        NO_OP: NO_OP,
        PropTypes: PropTypes,
        PureComponent: PureComponent,
        cloneElement: cloneElement,
        cloneVNode: inferno.cloneVNode,
        createClass: createClass,
        createElement: createElement,
        createFactory: createFactory,
        createVNode: inferno.createVNode,
        findDOMNode: inferno.findDOMNode,
        isValidElement: isValidElement,
        render: inferno.render,
        unmountComponentAtNode: unmountComponentAtNode,
        unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
        version: version
    };

    exports.Children = Children;
    exports.Component = Component;
    exports.DOM = DOM;
    exports.EMPTY_OBJ = inferno.EMPTY_OBJ;
    exports.NO_OP = NO_OP;
    exports.PropTypes = PropTypes;
    exports.PureComponent = PureComponent;
    exports.cloneElement = cloneElement;
    exports.cloneVNode = inferno.cloneVNode;
    exports.createClass = createClass;
    exports.createElement = createElement;
    exports.createFactory = createFactory;
    exports.createVNode = inferno.createVNode;
    exports.findDOMNode = inferno.findDOMNode;
    exports.isValidElement = isValidElement;
    exports.render = inferno.render;
    exports.unmountComponentAtNode = unmountComponentAtNode;
    exports.unstable_renderSubtreeIntoContainer = unstable_renderSubtreeIntoContainer;
    exports.version = version;
    exports['default'] = index;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

