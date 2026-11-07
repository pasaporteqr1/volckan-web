// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.for("react.view_transition"), m = Symbol.iterator;
	function h(e) {
		return typeof e != "object" || !e ? null : (e = m && e[m] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var g = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, _ = Object.assign, v = {};
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	y.prototype.isReactComponent = {}, y.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, y.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function b() {}
	b.prototype = y.prototype;
	function ee(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	var te = ee.prototype = new b();
	te.constructor = ee, _(te, y.prototype), te.isPureReactComponent = !0;
	var ne = Array.isArray;
	function re() {}
	var x = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ie = Object.prototype.hasOwnProperty;
	function S(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ae(e, t) {
		return S(e.type, t, e.props);
	}
	function oe(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function C(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var se = /\/+/g;
	function ce(e, t) {
		return typeof e == "object" && e && e.key != null ? C("" + e.key) : t.toString(36);
	}
	function le(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(re, re) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ue(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ue(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + ce(e, 0) : a, ne(o) ? (i = "", c != null && (i = c.replace(se, "$&/") + "/"), ue(o, r, i, "", function(e) {
			return e;
		})) : o != null && (oe(o) && (o = ae(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(se, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ne(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + ce(a, u), c += ue(a, r, i, s, o);
		else if (u = h(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + ce(a, u++), c += ue(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ue(le(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function de(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ue(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function fe(e) {
		if (e._status === -1) {
			var t = e._result, n = t();
			n.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t, n.status === void 0 && (n.status = "fulfilled", n.value = t));
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t, n.status === void 0 && (n.status = "rejected", n.reason = t));
			}), e._status === -1 && (e._status = 0, e._result = n);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var pe = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function me(e) {
		var t = x.T, n = {};
		n.types = t === null ? null : t.types, x.T = n;
		try {
			var r = e(), i = x.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(re, pe);
		} catch (e) {
			pe(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), x.T = t;
		}
	}
	function he(e) {
		var t = x.T;
		if (t !== null) {
			var n = t.types;
			n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
		} else me(he.bind(null, e));
	}
	var ge = {
		map: de,
		forEach: function(e, t, n) {
			de(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return de(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return de(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!oe(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = ge, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = ee, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = x, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return x.H.useMemoCache(e);
		}
	}, e.addTransitionType = he, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = _({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ie.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return S(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ie.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return S(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = oe, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: fe
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = me, e.unstable_useCacheRefresh = function() {
		return x.H.useCacheRefresh();
	}, e.use = function(e) {
		return x.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return x.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return x.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return x.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return x.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return x.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return x.H.useEffectEvent(e);
	}, e.useId = function() {
		return x.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return x.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return x.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return x.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return x.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return x.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return x.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return x.H.useRef(e);
	}, e.useState = function(e) {
		return x.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return x.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return x.H.useTransition();
	}, e.version = "19.3.1";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function ee(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, te || (te = !0, ae());
			else {
				var t = n(l);
				t !== null && se(ee, t.startTime - e);
			}
		}
	}
	var te = !1, ne = -1, re = 5, x = -1;
	function ie() {
		return g ? !0 : !(e.unstable_now() - x < re);
	}
	function S() {
		if (g = !1, te) {
			var t = e.unstable_now();
			x = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(ne), ne = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && ie());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && se(ee, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? ae() : te = !1;
			}
		}
	}
	var ae;
	if (typeof y == "function") ae = function() {
		y(S);
	};
	else if (typeof MessageChannel < "u") {
		var oe = new MessageChannel(), C = oe.port2;
		oe.port1.onmessage = S, ae = function() {
			C.postMessage(null);
		};
	} else ae = function() {
		_(S, 0);
	};
	function se(t, n) {
		ne = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : re = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(ne), ne = -1) : h = !0, se(ee, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, te || (te = !0, ae()))), r;
	}, e.unstable_shouldYield = ie, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal"), o = Symbol.for("react.recoverable"), s = Symbol.for("react.optimistic_key");
	function c(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : r === s ? s : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var l = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function d(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.browser = function(e) {
		return {
			$$typeof: o,
			_reason: e
		};
	}, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return c(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = l.T, n = i.p;
		try {
			if (l.T = null, i.p = 2, e) return e();
		} finally {
			l.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = d(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = d(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0,
						fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = d(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = d(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return l.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return l.H.useHostTransitionStatus();
	}, e.version = "19.3.1";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
		for (; t.return;) t = t.return;
		return t.tag === 3 ? e : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function h(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && h(e.child, t, n, r, i, a)) return !0;
			e = e.sibling;
		}
		return !1;
	}
	function g(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function _(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function v(e) {
		var t = [null, null], n = g(e);
		return n === null || y(t, e, n.child, { foundSelf: !1 }), t;
	}
	function y(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && y(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function b(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var ee = null, te = null;
	function ne(e, t, n) {
		return e === n || e === t && (ee = e, !0);
	}
	function re(e, t, n) {
		return e === n ? (te = e, !1) : e === t && (te !== null && (ee = e), !0);
	}
	function x(e) {
		if (e === null) return null;
		do
			e = e === null ? null : e.return;
		while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
		return e || null;
	}
	function ie(e, t, n) {
		for (var r = 0, i = e; i; i = n(i)) r++;
		i = 0;
		for (var a = t; a; a = n(a)) i++;
		for (; 0 < r - i;) e = n(e), r--;
		for (; 0 < i - r;) t = n(t), i--;
		for (; r--;) {
			if (e === t || t !== null && e === t.alternate) return e;
			e = n(e), t = n(t);
		}
		return null;
	}
	var S = Object.assign, ae = Symbol.for("react.element"), oe = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), se = Symbol.for("react.fragment"), ce = Symbol.for("react.strict_mode"), le = Symbol.for("react.profiler"), ue = Symbol.for("react.consumer"), de = Symbol.for("react.context"), fe = Symbol.for("react.forward_ref"), pe = Symbol.for("react.suspense"), me = Symbol.for("react.suspense_list"), he = Symbol.for("react.memo"), ge = Symbol.for("react.lazy"), _e = Symbol.for("react.activity"), ve = Symbol.for("react.legacy_hidden"), ye = Symbol.for("react.memo_cache_sentinel"), be = Symbol.for("react.view_transition"), xe = Symbol.for("react.recoverable"), Se = Symbol.iterator;
	function Ce(e) {
		return typeof e != "object" || !e ? null : (e = Se && e[Se] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var we = Symbol.for("react.client.reference");
	function Te(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === we ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case se: return "Fragment";
			case le: return "Profiler";
			case ce: return "StrictMode";
			case pe: return "Suspense";
			case me: return "SuspenseList";
			case _e: return "Activity";
			case be: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case C: return "Portal";
			case de: return e.displayName || "Context";
			case ue: return (e._context.displayName || "Context") + ".Consumer";
			case fe:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case he: return t = e.displayName || null, t === null ? Te(e.type) || "Memo" : t;
			case ge:
				t = e._payload, e = e._init;
				try {
					return Te(e(t));
				} catch {}
		}
		return null;
	}
	var Ee = Array.isArray, w = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, T = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, De = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, Oe = [], ke = -1;
	function Ae(e) {
		return { current: e };
	}
	function je(e) {
		0 > ke || (e.current = Oe[ke], Oe[ke] = null, ke--);
	}
	function E(e, t) {
		ke++, Oe[ke] = e.current, e.current = t;
	}
	var D = Ae(null), Me = Ae(null), Ne = Ae(null), Pe = Ae(null);
	function Fe(e, t) {
		switch (E(Ne, t), E(Me, e), E(D, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? up(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = up(t), e = dp(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		je(D), E(D, e);
	}
	function Ie() {
		je(D), je(Me), je(Ne);
	}
	function Le(e) {
		var t = e.memoizedState;
		t !== null && (sh._currentValue = t.memoizedState, E(Pe, e)), t = D.current;
		var n = dp(t, e.type);
		t !== n && (E(Me, e), E(D, n));
	}
	function Re(e) {
		Me.current === e && (je(D), je(Me)), Pe.current === e && (je(Pe), sh._currentValue = De);
	}
	var ze, Be;
	function Ve(e) {
		if (ze === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ze = t && t[1] || "", Be = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ze + e + Be;
	}
	var He = !1;
	function Ue(e, t) {
		if (!e || He) return "";
		He = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							n = !1;
							try {
								var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
								Object.defineProperty(e.prototype, "props", {
									configurable: !0,
									set: function() {
										throw Error();
									}
								}), n = !0, new e();
							} finally {
								n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
							}
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			He = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ve(n) : "";
	}
	function We(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Ve(e.type);
			case 16: return Ve("Lazy");
			case 13: return e.child !== t && t !== null ? Ve("Suspense Fallback") : Ve("Suspense");
			case 19: return Ve("SuspenseList");
			case 0:
			case 15: return Ue(e.type, !1);
			case 11: return Ue(e.type.render, !1);
			case 1: return Ue(e.type, !0);
			case 31: return Ve("Activity");
			case 30: return Ve("ViewTransition");
			default: return "";
		}
	}
	function Ge(e) {
		try {
			var t = "", n = null;
			do
				t += We(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ke = Object.prototype.hasOwnProperty, qe = t.unstable_scheduleCallback, Je = t.unstable_cancelCallback, Ye = t.unstable_shouldYield, Xe = t.unstable_requestPaint, Ze = t.unstable_now, Qe = t.unstable_getCurrentPriorityLevel, $e = t.unstable_ImmediatePriority, et = t.unstable_UserBlockingPriority, O = t.unstable_NormalPriority, tt = t.unstable_LowPriority, nt = t.unstable_IdlePriority, rt = t.log, k = t.unstable_setDisableYieldValue, A = null, it = null;
	function j(e) {
		if (typeof rt == "function" && k(e), it && typeof it.setStrictMode == "function") try {
			it.setStrictMode(A, e);
		} catch {}
	}
	var at = Math.clz32 ? Math.clz32 : N, M = Math.log, ot = Math.LN2;
	function N(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (M(e) / ot | 0) | 0;
	}
	var st = 256, ct = 262144, lt = 4194304;
	function ut(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & -e;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function dt(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = ut(n))) : i = ut(o) : i = ut(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = ut(n))) : i = ut(o)) : i = ut(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function ft(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function pt(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - at(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function mt(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function ht() {
		var e = lt;
		return lt <<= 1, !(lt & 62914560) && (lt = 4194304), e;
	}
	function gt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function _t(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function vt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - at(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && yt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function yt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - at(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function bt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - at(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function xt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : St(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function St(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function Ct(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function wt() {
		var e = T.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ch(e.type)) : e;
	}
	function Tt(e, t) {
		var n = T.p;
		try {
			return T.p = e, t();
		} finally {
			T.p = n;
		}
	}
	var Et = Math.random().toString(36).slice(2), Dt = "__reactFiber$" + Et, Ot = "__reactProps$" + Et, kt = "__reactContainer$" + Et, At = "__reactEvents$" + Et, jt = "__reactListeners$" + Et, Mt = "__reactHandles$" + Et, Nt = "__reactResources$" + Et, Pt = "__reactMarker$" + Et, Ft = "__reactLoad$" + Et;
	function It(e) {
		delete e[Dt], delete e[Ot], delete e[jt], delete e[Mt];
	}
	function Lt(e) {
		var t;
		if (t = e[Dt]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[kt] || n[Dt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = fm(e); e !== null;) {
					if (n = e[Dt]) return n;
					e = fm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Rt(e) {
		if (e = e[Dt] || e[kt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function zt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Bt(e) {
		var t = e[Nt];
		return t ||= e[Nt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Vt(e) {
		e[Pt] = !0;
	}
	function Ht(e) {
		e[Ft] = void 0;
	}
	var Ut = /* @__PURE__ */ new Set(), Wt = {};
	function Gt(e, t) {
		Kt(e, t), Kt(e + "Capture", t);
	}
	function Kt(e, t) {
		for (Wt[e] = t, e = 0; e < t.length; e++) Ut.add(t[e]);
	}
	var qt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Jt = {}, Yt = {};
	function Xt(e) {
		return Ke.call(Yt, e) ? !0 : Ke.call(Jt, e) ? !1 : qt.test(e) ? Yt[e] = !0 : (Jt[e] = !0, !1);
	}
	var P = !1;
	function Zt() {
		var e = P;
		return P = !1, e;
	}
	function Qt(e, t, n) {
		if (Xt(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, n);
			}
		}
	}
	function $t(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, n);
		}
	}
	function en(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, r);
		}
	}
	function tn(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function nn(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function rn(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function an(e) {
		if (!e._valueTracker) {
			var t = nn(e) ? "checked" : "value";
			e._valueTracker = rn(e, t, "" + e[t]);
		}
	}
	function on(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = nn(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var sn = /[\n"\\]/g;
	function cn(e) {
		return e.replace(sn, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function ln(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + tn(t)) : e.value !== "" + tn(t) && (e.value = "" + tn(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : dn(e, tn(n)) : o === "number" && e.value == t ? dn(e, tn(e.value)) : dn(e, tn(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + tn(s) : e.removeAttribute("name");
	}
	function un(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				an(e);
				return;
			}
			n = n == null ? "" : "" + tn(n), t = t == null ? n : "" + tn(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), an(e);
	}
	function dn(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function fn(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + tn(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function pn(e, t, n) {
		t != null && (t = "" + tn(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + tn(n);
	}
	function mn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (Ee(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = tn(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), an(e);
	}
	function hn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var gn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function _n(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || gn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function vn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", P = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (_n(e, a, r), P = !0);
		} else for (var o in t) t.hasOwnProperty(o) && _n(e, o, t[o]);
	}
	function yn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var bn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["maskType", "mask-type"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), xn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Sn(e) {
		return xn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Cn() {}
	var wn = null;
	function Tn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var En = null, Dn = null;
	function On(e) {
		var t = Rt(e);
		if (t && (e = t.stateNode)) {
			var n = e[Ot] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (ln(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + cn("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Ot] || null;
								if (!a) throw Error(i(90));
								ln(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && on(r);
					}
					break a;
				case "textarea":
					pn(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && fn(e, !!n.multiple, t, !1);
			}
		}
	}
	var kn = !1;
	function An(e, t, n) {
		if (kn) return e(t, n);
		kn = !0;
		try {
			return e(t);
		} finally {
			if (kn = !1, (En !== null || Dn !== null) && (zd(), En && (t = En, e = Dn, Dn = En = null, On(t), e))) for (t = 0; t < e.length; t++) On(e[t]);
		}
	}
	function jn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[Ot] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var Mn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Nn = !1;
	if (Mn) try {
		var Pn = {};
		Object.defineProperty(Pn, "passive", { get: function() {
			Nn = !0;
		} }), window.addEventListener("test", Pn, Pn), window.removeEventListener("test", Pn, Pn);
	} catch {
		Nn = !1;
	}
	var Fn = null, In = null, Ln = null;
	function Rn() {
		if (Ln) return Ln;
		var e, t = In, n = t.length, r, i = "value" in Fn ? Fn.value : Fn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Ln = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function zn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function Bn() {
		return !0;
	}
	function Vn() {
		return !1;
	}
	function Hn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Bn : Vn, this.isPropagationStopped = Vn, this;
		}
		return S(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Bn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Bn);
			},
			persist: function() {},
			isPersistent: Bn
		}), t;
	}
	var Un = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Wn = Hn(Un), Gn = S({}, Un, {
		view: 0,
		detail: 0
	}), Kn = Hn(Gn), qn, Jn, Yn, Xn = S({}, Gn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: sr,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Yn && (Yn && e.type === "mousemove" ? (qn = e.screenX - Yn.screenX, Jn = e.screenY - Yn.screenY) : Jn = qn = 0, Yn = e), qn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Jn;
		}
	}), Zn = Hn(Xn), Qn = Hn(S({}, Xn, { dataTransfer: 0 })), $n = Hn(S({}, Gn, { relatedTarget: 0 })), er = Hn(S({}, Un, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), tr = Hn(S({}, Un, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), nr = Hn(S({}, Un, { data: 0 })), rr = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, ir = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, ar = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function or(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = ar[e]) ? !!t[e] : !1;
	}
	function sr() {
		return or;
	}
	var cr = Hn(S({}, Gn, {
		key: function(e) {
			if (e.key) {
				var t = rr[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = zn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ir[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: sr,
		charCode: function(e) {
			return e.type === "keypress" ? zn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? zn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), lr = Hn(S({}, Xn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), ur = Hn(S({}, Un, { submitter: 0 })), dr = Hn(S({}, Gn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: sr
	})), fr = Hn(S({}, Un, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), pr = Hn(S({}, Xn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), mr = Hn(S({}, Un, {
		newState: 0,
		oldState: 0,
		source: 0
	})), hr = [
		9,
		13,
		27,
		32
	], gr = Mn && "CompositionEvent" in window, _r = null;
	Mn && "documentMode" in document && (_r = document.documentMode);
	var vr = Mn && "TextEvent" in window && !_r, yr = Mn && (!gr || _r && 8 < _r && 11 >= _r), br = " ", xr = !1;
	function Sr(e, t) {
		switch (e) {
			case "keyup": return hr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Cr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var wr = !1;
	function Tr(e, t) {
		switch (e) {
			case "compositionend": return Cr(t);
			case "keypress": return t.which === 32 ? (xr = !0, br) : null;
			case "textInput": return e = t.data, e === br && xr ? null : e;
			default: return null;
		}
	}
	function Er(e, t) {
		if (wr) return e === "compositionend" || !gr && Sr(e, t) ? (e = Rn(), Ln = In = Fn = null, wr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return yr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Dr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function Or(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Dr[e.type] : t === "textarea";
	}
	function kr(e, t, n, r) {
		En ? Dn ? Dn.push(r) : Dn = [r] : En = r, t = Jf(t, "onChange"), 0 < t.length && (n = new Wn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Ar = null, jr = null;
	function Mr(e) {
		Vf(e, 0);
	}
	function Nr(e) {
		if (on(zt(e))) return e;
	}
	function Pr(e, t) {
		if (e === "change") return t;
	}
	var Fr = !1;
	if (Mn) {
		var Ir;
		if (Mn) {
			var Lr = "oninput" in document;
			if (!Lr) {
				var Rr = document.createElement("div");
				Rr.setAttribute("oninput", "return;"), Lr = typeof Rr.oninput == "function";
			}
			Ir = Lr;
		} else Ir = !1;
		Fr = Ir && (!document.documentMode || 9 < document.documentMode);
	}
	function zr() {
		Ar && (Ar.detachEvent("onpropertychange", Br), jr = Ar = null);
	}
	function Br(e) {
		if (e.propertyName === "value" && Nr(jr)) {
			var t = [];
			kr(t, jr, e, Tn(e)), An(Mr, t);
		}
	}
	function Vr(e, t, n) {
		e === "focusin" ? (zr(), Ar = t, jr = n, Ar.attachEvent("onpropertychange", Br)) : e === "focusout" && zr();
	}
	function Hr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Nr(jr);
	}
	function Ur(e, t) {
		if (e === "click") return Nr(t);
	}
	function Wr(e, t) {
		if (e === "input" || e === "change") return Nr(t);
	}
	function Gr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Kr = typeof Object.is == "function" ? Object.is : Gr;
	function qr(e, t) {
		if (Kr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ke.call(t, i) || !Kr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Jr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Yr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Xr(e, t) {
		var n = Yr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Yr(n);
		}
	}
	function Zr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Zr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Qr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Jr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Jr(e.document);
		}
		return t;
	}
	function $r(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var ei = Mn && "documentMode" in document && 11 >= document.documentMode, ti = null, ni = null, ri = null, ii = !1;
	function ai(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		ii || ti == null || ti !== Jr(r) || (r = ti, "selectionStart" in r && $r(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), ri && qr(ri, r) || (ri = r, r = Jf(ni, "onSelect"), 0 < r.length && (t = new Wn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = ti)));
	}
	function oi(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var si = {
		animationend: oi("Animation", "AnimationEnd"),
		animationiteration: oi("Animation", "AnimationIteration"),
		animationstart: oi("Animation", "AnimationStart"),
		transitionrun: oi("Transition", "TransitionRun"),
		transitionstart: oi("Transition", "TransitionStart"),
		transitioncancel: oi("Transition", "TransitionCancel"),
		transitionend: oi("Transition", "TransitionEnd")
	}, ci = {}, li = {};
	Mn && (li = document.createElement("div").style, "AnimationEvent" in window || (delete si.animationend.animation, delete si.animationiteration.animation, delete si.animationstart.animation), "TransitionEvent" in window || delete si.transitionend.transition);
	function ui(e) {
		if (ci[e]) return ci[e];
		if (!si[e]) return e;
		var t = si[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in li) return ci[e] = t[n];
		return e;
	}
	var di = ui("animationend"), fi = ui("animationiteration"), pi = ui("animationstart"), mi = ui("transitionrun"), hi = ui("transitionstart"), gi = ui("transitioncancel"), _i = ui("transitionend"), vi = /* @__PURE__ */ new Map(), yi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	yi.push("scrollEnd");
	function bi(e, t) {
		vi.set(e, t), Gt(t, [e]);
	}
	var xi = 0;
	function Si(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = bd.identifierPrefix;
		var n = xi++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function Ci(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Od;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function wi(e, t) {
		return e = Ci(e), t = Ci(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var Ti = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Ei = [], Di = 0, Oi = 0;
	function ki() {
		for (var e = Di, t = Oi = Di = 0; t < e;) {
			var n = Ei[t];
			Ei[t++] = null;
			var r = Ei[t];
			Ei[t++] = null;
			var i = Ei[t];
			Ei[t++] = null;
			var a = Ei[t];
			if (Ei[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Ni(n, i, a);
		}
	}
	function Ai(e, t, n, r) {
		Ei[Di++] = e, Ei[Di++] = t, Ei[Di++] = n, Ei[Di++] = r, Oi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function ji(e, t, n, r) {
		return Ai(e, t, n, r), Pi(e);
	}
	function Mi(e, t) {
		return Ai(e, null, null, t), Pi(e);
	}
	function Ni(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - at(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Pi(e) {
		if (50 < kd) throw kd = 0, Ad = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Fi = {};
	function Ii(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Li(e, t, n, r) {
		return new Ii(e, t, n, r);
	}
	function Ri(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function zi(e, t) {
		var n = e.alternate;
		return n === null ? (n = Li(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Bi(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Vi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Ri(r) && (s = 1);
		else if (typeof r == "string") s = qm(e, n, D.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case _e: return e = Li(31, n, t, a), e.elementType = _e, e.lanes = o, e;
			case se: return Hi(n.children, a, o, t);
			case ce:
				s = 8, a |= 24;
				break;
			case le: return e = Li(12, n, t, a | 2), e.elementType = le, e.lanes = o, e;
			case pe: return e = Li(13, n, t, a), e.elementType = pe, e.lanes = o, e;
			case me: return e = Li(19, n, t, a), e.elementType = me, e.lanes = o, e;
			case ve:
			case be: return e = a | 32, e = Li(30, n, t, e), e.elementType = be, e.lanes = o, e.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, e;
			default:
				if (typeof r == "object" && r) switch (r.$$typeof) {
					case de:
						s = 10;
						break a;
					case ue:
						s = 9;
						break a;
					case fe:
						s = 11;
						break a;
					case he:
						s = 14;
						break a;
					case ge:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = Li(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function Hi(e, t, n, r) {
		return e = Li(7, e, r, t), e.lanes = n, e;
	}
	function Ui(e, t, n) {
		return e = Li(6, e, null, t), e.lanes = n, e;
	}
	function Wi(e) {
		var t = Li(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Gi(e, t, n) {
		return t = Li(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Ki = /* @__PURE__ */ new WeakMap();
	function qi(e, t) {
		if (typeof e == "object" && e) {
			var n = Ki.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Ge(t)
			}, Ki.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Ge(t)
		};
	}
	var Ji = [], Yi = 0, Xi = null, Zi = 0, Qi = [], $i = 0, ea = null, ta = 1, na = "";
	function ra(e, t) {
		Ji[Yi++] = Zi, Ji[Yi++] = Xi, Xi = e, Zi = t;
	}
	function ia(e, t, n) {
		Qi[$i++] = ta, Qi[$i++] = na, Qi[$i++] = ea, ea = e;
		var r = ta;
		e = na;
		var i = 32 - at(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - at(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ta = 1 << 32 - at(t) + i | n << i | r, na = a + e;
		} else ta = 1 << a | n << i | r, na = e;
	}
	function aa(e) {
		e.return !== null && (ra(e, 1), ia(e, 1, 0));
	}
	function oa(e) {
		for (; e === Xi;) Xi = Ji[--Yi], Ji[Yi] = null, Zi = Ji[--Yi], Ji[Yi] = null;
		for (; e === ea;) ea = Qi[--$i], Qi[$i] = null, na = Qi[--$i], Qi[$i] = null, ta = Qi[--$i], Qi[$i] = null;
	}
	function sa(e, t) {
		Qi[$i++] = ta, Qi[$i++] = na, Qi[$i++] = ea, ta = t.id, na = t.overflow, ea = e;
	}
	var ca = null, F = null, I = !1, la = null, ua = !1, da = Error(i(519));
	function fa(e) {
		throw va(qi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), da;
	}
	function pa(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[Dt] = e, t[Ot] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < zf.length; n++) Q(zf[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), un(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), mn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || ep(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = Cn), t = !0) : t = !1, t || fa(e, !0);
	}
	function ma(e) {
		for (ca = e.return; ca;) switch (ca.tag) {
			case 5:
			case 31:
			case 13:
				ua = !1;
				return;
			case 27:
			case 3:
				ua = !0;
				return;
			default: ca = ca.return;
		}
	}
	function ha(e) {
		if (e !== ca) return !1;
		if (!I) return ma(e), I = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || pp(e.type, e.memoizedProps)), n = !n), n && F && fa(e), ma(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			F = dm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			F = dm(e);
		} else t === 27 ? (t = F, Sp(e.type) ? (e = um, um = null, F = e) : F = t) : F = ca ? lm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function ga() {
		F = ca = null, I = !1;
	}
	function _a() {
		var e = la;
		return e !== null && (pd === null ? pd = e : pd.push.apply(pd, e), la = null), e;
	}
	function va(e) {
		la === null ? la = [e] : la.push(e);
	}
	var ya = Ae(null), ba = null, xa = null;
	function Sa(e, t, n) {
		E(ya, t._currentValue), t._currentValue = n;
	}
	function Ca(e) {
		e._currentValue = ya.current, je(ya);
	}
	function wa(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Ta(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), wa(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), wa(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), wa(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Ea(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Kr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === Pe.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [sh] : e.push(sh));
			}
			a = a.return;
		}
		return e !== null && Ta(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function Da(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Kr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Oa(e) {
		ba = e, xa = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function ka(e) {
		return ja(ba, e);
	}
	function Aa(e, t) {
		return ba === null && Oa(e), ja(e, t);
	}
	function ja(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, xa === null) {
			if (e === null) throw Error(i(308));
			xa = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else xa = xa.next = t;
		return n;
	}
	var Ma = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, Na = t.unstable_scheduleCallback, Pa = t.unstable_NormalPriority, Fa = {
		$$typeof: de,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Ia() {
		return {
			controller: new Ma(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function La(e) {
		e.refCount--, e.refCount === 0 && Na(Pa, function() {
			e.controller.abort();
		});
	}
	function Ra(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var za = null;
	function Ba(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var Va = null, Ha = 0, Ua = 0, Wa = null;
	function Ga(e, t) {
		if (Va === null) {
			var n = Va = [];
			Ha = 0, Ua = Pf(), Wa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return Ha++, t.then(Ka, Ka), t;
	}
	function Ka() {
		if (--Ha === 0 && (za = null, Va !== null)) {
			Wa !== null && (Wa.status = "fulfilled");
			var e = Va;
			Va = null, Ua = 0, Wa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function qa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Ja = w.S;
	w.S = function(e, t) {
		if (gd = Ze(), typeof t == "object" && t && typeof t.then == "function" && Ga(e, t), za !== null) for (var n = bf; n !== null;) Ra(n, za), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = bf; r !== null;) Ra(r, n), r = r.next;
			if (Ua !== 0) {
				r = za, r === null && (r = za = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Ja !== null && Ja(e, t);
	};
	var Ya = Ae(null);
	function Xa() {
		var e = Ya.current;
		return e === null ? G.pooledCache : e;
	}
	function Za(e, t) {
		t === null ? E(Ya, Ya.current) : E(Ya, t.pool);
	}
	function Qa() {
		var e = Xa();
		return e === null ? null : {
			parent: Fa._currentValue,
			pool: e
		};
	}
	var $a = Error(i(460)), eo = Error(i(474)), to = Error(i(542)), no = { then: function() {} };
	function ro(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function io(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Cn, Cn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, co(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(Cn, Cn);
				else {
					if (e = G, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, co(e), e;
				}
				throw oo = t, $a;
		}
	}
	function ao(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (oo = e, $a) : e;
		}
	}
	var oo = null;
	function so() {
		if (oo === null) throw Error(i(459));
		var e = oo;
		return oo = null, e;
	}
	function co(e) {
		if (e === $a || e === to) throw Error(i(483));
	}
	var lo = null, uo = 0;
	function fo(e) {
		var t = uo;
		return uo += 1, lo === null && (lo = []), io(lo, e, t);
	}
	function po(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function mo(e, t) {
		throw t.$$typeof === ae ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function ho(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = zi(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Ui(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === se ? (e = d(e, t, n.props.children, r, n.key), po(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === ge && ao(i) === t.type) ? (t = a(t, n.props), po(t, n), t.return = e, t) : (t = Vi(n.type, n.key, n.props, null, e.mode, r), po(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Gi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = Hi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Ui("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case oe: return n = Vi(t.type, t.key, t.props, null, e.mode, n), po(n, t), n.return = e, n;
					case C: return t = Gi(t, e.mode, n), t.return = e, t;
					case ge: return t = ao(t), f(e, t, n);
				}
				if (Ee(t) || Ce(t)) return t = Hi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, fo(t), n);
				if (t.$$typeof === de) return f(e, Aa(e, t), n);
				mo(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case oe: return n.key === i ? l(e, t, n, r) : null;
					case C: return n.key === i ? u(e, t, n, r) : null;
					case ge: return n = ao(n), p(e, t, n, r);
				}
				if (Ee(n) || Ce(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, fo(n), r);
				if (n.$$typeof === de) return p(e, t, Aa(e, n), r);
				mo(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case oe: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case C: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case ge: return r = ao(r), m(e, t, n, r, i);
				}
				if (Ee(r) || Ce(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, fo(r), i);
				if (r.$$typeof === de) return m(e, t, n, Aa(t, r), i);
				mo(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), I && ra(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return I && ra(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), I && ra(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), I && ra(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return I && ra(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), I && ra(a, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === se && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case oe:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === se) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), po(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === ge && ao(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), po(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === se ? (c = Hi(o.props.children, e.mode, c, o.key), po(c, o), c.return = e, e = c) : (c = Vi(o.type, o.key, o.props, null, e.mode, c), po(c, o), c.return = e, e = c);
						}
						return s(e);
					case C:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = Gi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case ge: return o = ao(o), _(e, r, o, c);
				}
				if (Ee(o)) return h(e, r, o, c);
				if (Ce(o)) {
					if (l = Ce(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, fo(o), c);
				if (o.$$typeof === de) return _(e, r, Aa(e, o), c);
				mo(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Ui(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				uo = 0;
				var i = _(e, t, n, r);
				return lo = null, i;
			} catch (t) {
				if (t === $a || t === to) throw t;
				var a = Li(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var go = ho(!0), _o = ho(!1), vo = !1;
	function yo(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function bo(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function xo(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function So(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, W & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Pi(e), Ni(e, null, n), t;
		}
		return Ai(e, r, t, n), Pi(e);
	}
	function Co(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, bt(e, n);
		}
	}
	function wo(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var To = !1;
	function Eo() {
		if (To) {
			var e = Wa;
			if (e !== null) throw e;
		}
	}
	function Do(e, t, n, r) {
		To = !1;
		var i = e.updateQueue;
		vo = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (q & f) === f : (r & f) === f) {
					f !== 0 && f === Ua && (To = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var g = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(g, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(g, d, f) : m, f == null) break a;
								d = S({}, d, f);
								break a;
							case 2: vo = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), sd |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Oo(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function ko(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Oo(n[e], t);
	}
	var Ao = Ae(null), jo = Ae(0);
	function Mo(e, t) {
		e = od, E(jo, e), E(Ao, t), od = e | t.baseLanes;
	}
	function No() {
		E(jo, od), E(Ao, Ao.current);
	}
	function Po() {
		od = jo.current, je(Ao), je(jo);
	}
	var Fo = Ae(null), Io = null;
	function Lo(e) {
		var t = e.alternate;
		E(Ho, Ho.current & 1), E(Fo, e), Io === null && (t === null || Ao.current !== null || t.memoizedState !== null) && (Io = e);
	}
	function Ro(e) {
		E(Ho, Ho.current), E(Fo, e), Io === null && (Io = e);
	}
	function zo(e) {
		e.tag === 22 ? (E(Ho, Ho.current), E(Fo, e), Io === null && (Io = e)) : Bo();
	}
	function Bo() {
		E(Ho, Ho.current), E(Fo, Fo.current);
	}
	function Vo(e) {
		je(Fo), Io === e && (Io = null), je(Ho);
	}
	var Ho = Ae(0);
	function Uo(e, t) {
		E(Fo, Fo.current), E(Ho, t);
	}
	function Wo(e) {
		je(Ho), je(Fo), Io === e && (Io = null);
	}
	function Go(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || om(n) || sm(n))) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var Ko = 0, L = null, R = null, qo = null, Jo = !1, Yo = !1, Xo = !1, Zo = 0, Qo = 0, $o = null, es = 0;
	function z() {
		throw Error(i(321));
	}
	function ts(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Kr(e[n], t[n])) return !1;
		return !0;
	}
	function ns(e, t, n, r, i, a) {
		return Ko = a, L = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, w.H = e === null || e.memoizedState === null ? vc : yc, Xo = !1, a = n(r, i), Xo = !1, Yo && (a = is(t, n, r, i)), rs(e), a;
	}
	function rs(e) {
		w.H = _c;
		var t = R !== null && R.next !== null;
		if (Ko = 0, qo = R = L = null, Jo = !1, Qo = 0, $o = null, t) throw Error(i(300));
		e === null || Ic || (e = e.dependencies, e !== null && Da(e) && (Ic = !0));
	}
	function is(e, t, n, r) {
		L = e;
		var a = 0;
		do {
			if (Yo && ($o = null), Qo = 0, Yo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, qo = R = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			w.H = bc, o = t(n, r);
		} while (Yo);
		return o;
	}
	function as() {
		var e = w.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? ds(t) : t, e = e.useState()[0], (R === null ? null : R.memoizedState) !== e && (L.flags |= 1024), t;
	}
	function os() {
		var e = Zo !== 0;
		return Zo = 0, e;
	}
	function ss(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function cs(e) {
		if (Jo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Jo = !1;
		}
		Ko = 0, qo = R = L = null, Yo = !1, Qo = Zo = 0, $o = null;
	}
	function ls() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return qo === null ? L.memoizedState = qo = e : qo = qo.next = e, qo;
	}
	function B() {
		if (R === null) {
			var e = L.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = R.next;
		var t = qo === null ? L.memoizedState : qo.next;
		if (t !== null) qo = t, R = e;
		else {
			if (e === null) throw L.alternate === null ? Error(i(467)) : Error(i(310));
			R = e, e = {
				memoizedState: R.memoizedState,
				baseState: R.baseState,
				baseQueue: R.baseQueue,
				queue: R.queue,
				next: null
			}, qo === null ? L.memoizedState = qo = e : qo = qo.next = e;
		}
		return qo;
	}
	function us() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function ds(e) {
		var t = Qo;
		return Qo += 1, $o === null && ($o = []), e = io($o, e, t), t = L, (qo === null ? t.memoizedState : qo.next) === null && (t = t.alternate, w.H = t === null || t.memoizedState === null ? vc : yc), e;
	}
	function fs(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ds(e);
			if (e.$$typeof === xe) return;
			if (e.$$typeof === de) return ka(e);
		}
		throw Error(i(438, String(e)));
	}
	function ps(e) {
		var t = null, n = L.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = L.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = us(), L.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ye;
		return t.index++, n;
	}
	function ms(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function hs(e) {
		return gs(B(), R, e);
	}
	function gs(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (Ko & f) === f : (q & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Ua && (d = !0);
					else if ((Ko & p) === p) {
						u = u.next, p === Ua && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, L.lanes |= p, sd |= p;
					f = u.action, Xo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, L.lanes |= f, sd |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Kr(o, e.memoizedState) && (Ic = !0, d && (n = Wa, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function _s(e) {
		var t = B(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Kr(o, t.memoizedState) || (Ic = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function vs(e, t, n) {
		var r = L, a = B(), o = I;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Kr((R || a).memoizedState, n);
		if (s && (a.memoizedState = n, Ic = !0), a = a.queue, Us(xs.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || qo !== null && !!(qo.memoizedState.tag & 1), Rs(e ? 9 : 8, { destroy: void 0 }, bs.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, G === null) throw Error(i(349));
			o || Ko & 127 || ys(r, t, n);
		}
		return n;
	}
	function ys(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = L.updateQueue, t === null ? (t = us(), L.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function bs(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Ss(t) && Cs(e);
	}
	function xs(e, t, n) {
		return n(function() {
			Ss(t) && Cs(e);
		});
	}
	function Ss(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Kr(e, n);
		} catch {
			return !0;
		}
	}
	function Cs(e) {
		var t = Mi(e, 2);
		t !== null && Pd(t, e, 2);
	}
	function ws(e) {
		var t = ls();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Xo) {
				j(!0);
				try {
					n();
				} finally {
					j(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ms,
			lastRenderedState: e
		}, t;
	}
	function Ts(e, t, n, r) {
		return e.baseState = n, gs(e, R, typeof r == "function" ? r : ms);
	}
	function Es(e, t, n, r, a) {
		if (mc(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			w.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Ds(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Ds(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = w.T, o = {};
			o.types = a === null ? null : a.types, w.T = o;
			try {
				var s = n(i, r), c = w.S;
				c !== null && c(o, s), Os(e, t, s);
			} catch (n) {
				As(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), w.T = a;
			}
		} else try {
			a = n(i, r), Os(e, t, a);
		} catch (n) {
			As(e, t, n);
		}
	}
	function Os(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			ks(e, t, n);
		}, function(n) {
			return As(e, t, n);
		}) : ks(e, t, n);
	}
	function ks(e, t, n) {
		t.status = "fulfilled", t.value = n, js(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ds(e, n)));
	}
	function As(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, js(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function js(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Ms(e, t) {
		return t;
	}
	function Ns(e, t) {
		if (I) {
			var n = G.formState;
			if (n !== null) {
				a: {
					var r = L;
					if (I) {
						if (F) {
							b: {
								for (var i = F, a = ua; i.nodeType !== 8;) if (!a || (i = lm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								F = lm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						fa(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = ls(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ms,
			lastRenderedState: t
		}, n.queue = r, n = dc.bind(null, L, r), r.dispatch = n, r = ws(!1), a = pc.bind(null, L, !1, r.queue), r = ls(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Es.bind(null, L, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Ps(e) {
		return Fs(B(), R, e);
	}
	function Fs(e, t, n) {
		if (t = gs(e, t, Ms)[0], e = hs(ms)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ds(t);
		} catch (e) {
			throw e === $a ? to : e;
		}
		else r = t;
		t = B();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (L.flags |= 2048, Rs(9, { destroy: void 0 }, Is.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Is(e, t) {
		e.action = t;
	}
	function Ls(e) {
		var t = B(), n = R;
		if (n !== null) return Fs(t, n, e);
		B(), t = t.memoizedState, n = B();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Rs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = L.updateQueue, t === null && (t = us(), L.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function zs() {
		return B().memoizedState;
	}
	function Bs(e, t, n, r) {
		var i = ls();
		L.flags |= e, i.memoizedState = Rs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Vs(e, t, n, r) {
		var i = B();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		R !== null && r !== null && ts(r, R.memoizedState.deps) ? i.memoizedState = Rs(t, a, n, r) : (L.flags |= e, i.memoizedState = Rs(1 | t, a, n, r));
	}
	function Hs(e, t) {
		Bs(8390656, 8, e, t);
	}
	function Us(e, t) {
		Vs(2048, 8, e, t);
	}
	function Ws(e) {
		L.flags |= 4;
		var t = L.updateQueue;
		if (t === null) t = us(), L.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Gs(e) {
		var t = B().memoizedState;
		return Ws({
			ref: t,
			nextImpl: e
		}), function() {
			if (W & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Ks(e, t) {
		return Vs(4, 2, e, t);
	}
	function qs(e, t) {
		return Vs(4, 4, e, t);
	}
	function Js(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function Ys(e, t, n) {
		n = n == null ? null : n.concat([e]), Vs(4, 4, Js.bind(null, t, e), n);
	}
	function Xs() {}
	function Zs(e, t) {
		var n = B();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && ts(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Qs(e, t) {
		var n = B();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && ts(t, r[1])) return r[0];
		if (r = e(), Xo) {
			j(!0);
			try {
				e();
			} finally {
				j(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function $s(e, t, n) {
		return n === void 0 || Ko & 1073741824 && !(q & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Md(), L.lanes |= e, sd |= e, n);
	}
	function ec(e, t, n, r) {
		return Kr(n, t) ? n : Ao.current === null ? !(Ko & 106) || Ko & 1073741824 && !(q & 261930) ? (Ic = !0, e.memoizedState = n) : (e = Md(), L.lanes |= e, sd |= e, t) : (e = $s(e, n, r), Kr(e, t) || (Ic = !0), e);
	}
	function tc(e, t, n, r, i) {
		var a = T.p;
		T.p = a !== 0 && 8 > a ? a : 8;
		var o = w.T, s = {};
		s.types = o === null ? null : o.types, w.T = s, pc(e, !1, t, n);
		try {
			var c = i(), l = w.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? fc(e, t, qa(c, r), jd(e)) : fc(e, t, r, jd(e));
		} catch (n) {
			fc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, jd());
		} finally {
			T.p = a, o !== null && s.types !== null && (o.types = s.types), w.T = o;
		}
	}
	function nc() {}
	function rc(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = ic(e).queue;
		tc(e, a, t, De, n === null ? nc : function() {
			return ac(e), n(r);
		});
	}
	function ic(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: De,
			baseState: De,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ms,
				lastRenderedState: De
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ms,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ac(e) {
		var t = ic(e);
		t.next === null && (t = e.alternate.memoizedState), fc(e, t.next.queue, {}, jd());
	}
	function oc() {
		return ka(sh);
	}
	function sc() {
		return B().memoizedState;
	}
	function cc() {
		return B().memoizedState;
	}
	function lc(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = jd();
					e = xo(n);
					var r = So(t, e, n);
					r !== null && (Pd(r, t, n), Co(r, t, n)), t = { cache: Ia() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function uc(e, t, n) {
		var r = jd();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, mc(e) ? hc(t, n) : (n = ji(e, t, n, r), n !== null && (Pd(n, e, r), gc(n, t, r)));
	}
	function dc(e, t, n) {
		fc(e, t, n, jd());
	}
	function fc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (mc(e)) hc(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Kr(s, o)) return Ai(e, t, i, 0), G === null && ki(), !1;
			} catch {}
			if (n = ji(e, t, i, r), n !== null) return Pd(n, e, r), gc(n, t, r), !0;
		}
		return !1;
	}
	function pc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Pf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, mc(e)) {
			if (t) throw Error(i(479));
		} else t = ji(e, n, r, 2), t !== null && Pd(t, e, 2);
	}
	function mc(e) {
		var t = e.alternate;
		return e === L || t !== null && t === L;
	}
	function hc(e, t) {
		Yo = Jo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function gc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, bt(e, n);
		}
	}
	var _c = {
		readContext: ka,
		use: fs,
		useCallback: z,
		useContext: z,
		useEffect: z,
		useImperativeHandle: z,
		useLayoutEffect: z,
		useInsertionEffect: z,
		useMemo: z,
		useReducer: z,
		useRef: z,
		useState: z,
		useDebugValue: z,
		useDeferredValue: z,
		useTransition: z,
		useSyncExternalStore: z,
		useId: z,
		useHostTransitionStatus: z,
		useFormState: z,
		useActionState: z,
		useOptimistic: z,
		useMemoCache: z,
		useCacheRefresh: z,
		useEffectEvent: z
	}, vc = {
		readContext: ka,
		use: fs,
		useCallback: function(e, t) {
			return ls().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ka,
		useEffect: Hs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), Bs(4194308, 4, Js.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Bs(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			Bs(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = ls();
			t = t === void 0 ? null : t;
			var r = e();
			if (Xo) {
				j(!0);
				try {
					e();
				} finally {
					j(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = ls();
			if (n !== void 0) {
				var i = n(t);
				if (Xo) {
					j(!0);
					try {
						n(t);
					} finally {
						j(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = uc.bind(null, L, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = ls();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = ws(e);
			var t = e.queue, n = dc.bind(null, L, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Xs,
		useDeferredValue: function(e, t) {
			return $s(ls(), e, t);
		},
		useTransition: function() {
			var e = ws(!1);
			return e = tc.bind(null, L, e.queue, !0, !1), ls().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = L, a = ls();
			if (I) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), G === null) throw Error(i(349));
				q & 127 || ys(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Hs(xs.bind(null, r, o, e), [e]), r.flags |= 2048, Rs(9, { destroy: void 0 }, bs.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = ls(), t = G.identifierPrefix;
			if (I) {
				var n = na, r = ta;
				n = (r & ~(1 << 32 - at(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Zo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = es++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: oc,
		useFormState: Ns,
		useActionState: Ns,
		useOptimistic: function(e) {
			var t = ls();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = pc.bind(null, L, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: ps,
		useCacheRefresh: function() {
			return ls().memoizedState = lc.bind(null, L);
		},
		useEffectEvent: function(e) {
			var t = ls(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (W & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, yc = {
		readContext: ka,
		use: fs,
		useCallback: Zs,
		useContext: ka,
		useEffect: Us,
		useImperativeHandle: Ys,
		useInsertionEffect: Ks,
		useLayoutEffect: qs,
		useMemo: Qs,
		useReducer: hs,
		useRef: zs,
		useState: function() {
			return hs(ms);
		},
		useDebugValue: Xs,
		useDeferredValue: function(e, t) {
			return ec(B(), R.memoizedState, e, t);
		},
		useTransition: function() {
			var e = hs(ms)[0], t = B().memoizedState;
			return [typeof e == "boolean" ? e : ds(e), t];
		},
		useSyncExternalStore: vs,
		useId: sc,
		useHostTransitionStatus: oc,
		useFormState: Ps,
		useActionState: Ps,
		useOptimistic: function(e, t) {
			return Ts(B(), R, e, t);
		},
		useMemoCache: ps,
		useCacheRefresh: cc,
		useEffectEvent: Gs
	}, bc = {
		readContext: ka,
		use: fs,
		useCallback: Zs,
		useContext: ka,
		useEffect: Us,
		useImperativeHandle: Ys,
		useInsertionEffect: Ks,
		useLayoutEffect: qs,
		useMemo: Qs,
		useReducer: _s,
		useRef: zs,
		useState: function() {
			return _s(ms);
		},
		useDebugValue: Xs,
		useDeferredValue: function(e, t) {
			var n = B();
			return R === null ? $s(n, e, t) : ec(n, R.memoizedState, e, t);
		},
		useTransition: function() {
			var e = _s(ms)[0], t = B().memoizedState;
			return [typeof e == "boolean" ? e : ds(e), t];
		},
		useSyncExternalStore: vs,
		useId: sc,
		useHostTransitionStatus: oc,
		useFormState: Ls,
		useActionState: Ls,
		useOptimistic: function(e, t) {
			var n = B();
			return R === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ts(n, R, e, t);
		},
		useMemoCache: ps,
		useCacheRefresh: cc,
		useEffectEvent: Gs
	};
	function xc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : S({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Sc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = jd(), i = xo(r);
			i.payload = t, n != null && (i.callback = n), t = So(e, i, r), t !== null && (Pd(t, e, r), Co(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = jd(), i = xo(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = So(e, i, r), t !== null && (Pd(t, e, r), Co(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = jd(), r = xo(n);
			r.tag = 2, t != null && (r.callback = t), t = So(e, r, n), t !== null && (Pd(t, e, n), Co(t, e, n));
		}
	};
	function Cc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !qr(n, r) || !qr(i, a) : !0;
	}
	function wc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Sc.enqueueReplaceState(t, t.state, null);
	}
	function Tc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = S({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Ec(e) {
		Ti(e);
	}
	function Dc(e) {
		console.error(e);
	}
	function Oc(e) {
		Ti(e);
	}
	function kc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ac(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function jc(e, t, n) {
		return n = xo(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			kc(e, t);
		}, n;
	}
	function Mc(e) {
		return e = xo(e), e.tag = 3, e;
	}
	function Nc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Ac(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Ac(t, n, r), typeof i != "function" && (yd === null ? yd = /* @__PURE__ */ new Set([this]) : yd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Pc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Ea(t, n, a, !0), n = Fo.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return Io === null ? Kd() : n.alternate === null && Y === 0 && (Y = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === no ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), mf(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === no ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), mf(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return mf(e, r, a), Kd(), !1;
		}
		if (I) return t = Fo.current, t === null ? (r !== da && (t = Error(i(423), { cause: r }), va(qi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = qi(r, n), a = jc(e.stateNode, r, a), wo(e, a), Y !== 4 && (Y = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== da && (e = Error(i(422), { cause: r }), va(qi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = qi(o, n), fd === null ? fd = [o] : fd.push(o), Y !== 4 && (Y = 2), t === null) return !0;
		r = qi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = jc(n.stateNode, r, e), wo(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (yd === null || !yd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Mc(a), Nc(a, e, n, r), wo(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Fc = Error(i(461)), Ic = !1;
	function Lc(e, t, n, r) {
		t.child = e === null ? _o(t, null, n, r) : go(t, e.child, n, r);
	}
	function Rc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Oa(t), r = ns(e, t, n, o, a, i), s = os(), e !== null && !Ic ? (ss(e, t, i), fl(e, t, i)) : (I && s && aa(t), t.flags |= 1, Lc(e, t, r, i), t.child);
	}
	function zc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Ri(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, Bc(e, t, a, r, i)) : (e = Vi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !pl(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? qr : n, n(o, r) && e.ref === t.ref) return fl(e, t, i);
		}
		return t.flags |= 1, e = zi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Bc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (qr(a, r) && e.ref === t.ref) {
				if (Ic = !1, t.pendingProps = r = a, pl(e, i)) e.flags & 131072 && (Ic = !0);
				else return t.lanes = e.lanes, fl(e, t, i);
			}
		}
		return Jc(e, t, n, r, i);
	}
	function Vc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return Uc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Za(t, a === null ? null : a.cachePool), a === null ? No() : Mo(t, a), zo(t);
			else return r = t.lanes = 536870912, Uc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Za(t, null), No(), Bo()) : (Za(t, a.cachePool), Mo(t, a), Bo(), t.memoizedState = null);
		return Lc(e, t, i, n), t.child;
	}
	function Hc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Uc(e, t, n, r, i) {
		var a = Xa();
		return a = a === null ? null : {
			parent: Fa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Za(t, null), No(), zo(t), e !== null && Ea(e, t, r, !0), t.childLanes = i, null;
	}
	function Wc(e, t) {
		return t = rl({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Gc(e, t, n) {
		return go(t, e.child, null, n), e = Wc(t, t.pendingProps), e.flags |= 2, Vo(t), t.memoizedState = null, e;
	}
	function Kc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (I) {
				if (r.mode === "hidden") return e = Wc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, Hc(null, e);
				if (Ro(t), (e = F) ? (e = am(e, ua), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: ea === null ? null : {
						id: ta,
						overflow: na
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Wi(e), n.return = t, t.child = n, ca = t, F = null)) : e = null, e === null) throw fa(t);
				return t.lanes = 536870912, null;
			}
			return Wc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Ro(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Gc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Ic || Ea(e, t, n, !1), a = (n & e.childLanes) !== 0, Ic || a) {
				if (Ao.current === null) {
					if (r = G, r !== null && (s = xt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Mi(e, s), Pd(r, e, s), Fc;
					Kd();
				}
				t = Gc(e, t, n);
			} else e = o.treeContext, F = lm(s.nextSibling), ca = t, I = !0, la = null, ua = !1, e !== null && sa(t, e), t = Wc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = zi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function qc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Jc(e, t, n, r, i) {
		return Oa(t), n = ns(e, t, n, r, void 0, i), r = os(), e !== null && !Ic ? (ss(e, t, i), fl(e, t, i)) : (I && r && aa(t), t.flags |= 1, Lc(e, t, n, i), t.child);
	}
	function Yc(e, t, n, r, i, a) {
		return Oa(t), t.updateQueue = null, n = is(t, r, n, i), rs(e), r = os(), e !== null && !Ic ? (ss(e, t, a), fl(e, t, a)) : (I && r && aa(t), t.flags |= 1, Lc(e, t, n, a), t.child);
	}
	function Xc(e, t, n, r, i) {
		if (Oa(t), t.stateNode === null) {
			var a = Fi, o = n.contextType;
			typeof o == "object" && o && (a = ka(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Sc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, yo(t), o = n.contextType, a.context = typeof o == "object" && o ? ka(o) : Fi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (xc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Sc.enqueueReplaceState(a, a.state, null), Do(t, r, a, i), Eo(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Tc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Fi, typeof u == "object" && u && (o = ka(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && wc(t, a, r, o), vo = !1;
			var f = t.memoizedState;
			a.state = f, Do(t, r, a, i), Eo(), l = t.memoizedState, s || f !== l || vo ? (typeof d == "function" && (xc(t, n, d, r), l = t.memoizedState), (c = vo || Cc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, bo(e, t), o = t.memoizedProps, u = Tc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Fi, typeof l == "object" && l && (c = ka(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && wc(t, a, r, c), vo = !1, f = t.memoizedState, a.state = f, Do(t, r, a, i), Eo();
			var p = t.memoizedState;
			o !== d || f !== p || vo || e !== null && e.dependencies !== null && Da(e.dependencies) ? (typeof s == "function" && (xc(t, n, s, r), p = t.memoizedState), (u = vo || Cc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Da(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, qc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = go(t, e.child, null, i), t.child = go(t, null, n, i)) : Lc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = fl(e, t, i), e;
	}
	function Zc(e, t, n, r) {
		return ga(), t.flags |= 256, Lc(e, t, n, r), t.child;
	}
	var Qc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function $c(e) {
		return {
			baseLanes: e,
			cachePool: Qa()
		};
	}
	function el(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= ud), e;
	}
	function tl(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Ho.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (I) {
				if (i ? Lo(t) : Bo(), (e = F) ? (e = am(e, ua), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: ea === null ? null : {
						id: ta,
						overflow: na
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Wi(e), n.return = t, t.child = n, ca = t, F = null)) : e = null, e === null) throw fa(t);
				return t.lanes = sm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Bo(), i = t.mode, a = rl({
				mode: "hidden",
				children: a
			}, i), r = Hi(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = $c(n), r.childLanes = el(e, o, n), t.memoizedState = Qc, Hc(null, r)) : (Lo(t), nl(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return al(e, t, a, o, r, c, s, n);
		}
		return i ? (Bo(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = zi(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = Hi(i, a, n, null), i.flags |= 2) : i = zi(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Hc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = $c(n) : (a = i.cachePool, a === null ? a = Qa() : (s = Fa._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = el(e, o, n), t.memoizedState = Qc, Hc(e.child, r)) : (Lo(t), n = e.child, e = n.sibling, n = zi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function nl(e, t) {
		return t = rl({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function rl(e, t) {
		return e = Li(22, e, null, t), e.lanes = 0, e;
	}
	function il(e, t, n) {
		return go(t, e.child, null, n), e = nl(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function al(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (Lo(t), t.flags &= -257, il(e, t, c)) : t.memoizedState === null ? (Bo(), o = a.fallback, s = t.mode, a = rl({
			mode: "visible",
			children: a.children
		}, s), o = Hi(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, go(t, e.child, null, c), a = t.child, a.memoizedState = $c(c), a.childLanes = el(e, r, c), t.memoizedState = Qc, Hc(null, a)) : (Bo(), t.child = e.child, t.flags |= 128, null);
		if (Lo(t), sm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, va({
				value: a,
				source: null,
				stack: null
			})), il(e, t, c);
		}
		if (Ic || Ea(e, t, c, !1), r = (c & e.childLanes) !== 0, Ic || r) {
			if (Ao.current !== null) return il(e, t, c);
			if (r = G, r !== null && (a = xt(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, Mi(e, a), Pd(r, e, a), Fc;
			return om(o) || Kd(), il(e, t, c);
		}
		return om(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, F = lm(o.nextSibling), ca = t, I = !0, la = null, ua = !1, e !== null && sa(t, e), t = nl(t, a.children), t.flags |= 134221824, t);
	}
	function ol(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), wa(e.return, t, n);
	}
	function sl(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && Go(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function cl(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function ll(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function ul(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Ho.current;
		if (t.flags & 128) return Uo(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, Uo(t, o), i === "backwards" && e !== null ? (ll(e), Lc(e, t, r, n), ll(e)) : Lc(e, t, r, n), r = I ? Zi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && ol(e, n, t);
			else if (e.tag === 19) ol(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "backwards":
				n = sl(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, ll(t)), cl(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Go(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				cl(t, !0, n, null, a, r);
				break;
			case "together":
				cl(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = sl(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), cl(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function dl(e, t, n) {
		var r = t.pendingProps;
		return Sa(t, t.type, r.value), Lc(e, t, r.children, n), t.child;
	}
	function fl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), sd |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (Ea(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = zi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = zi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function pl(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Da(e)));
	}
	function ml(e, t, n) {
		switch (t.tag) {
			case 3:
				Fe(t, t.stateNode.containerInfo), Sa(t, Fa, e.memoizedState.cache), ga();
				break;
			case 27:
			case 5:
				Le(t);
				break;
			case 4:
				Fe(t, t.stateNode.containerInfo);
				break;
			case 10:
				Sa(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Ro(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return Lo(t), t.flags |= 128, null;
					r = Ea(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? tl(e, t, n) : (Lo(t), e = fl(e, t, n), e === null ? null : e.sibling);
				}
				Lo(t);
				break;
			case 19:
				if (t.flags & 128) return ul(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (Ea(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return ul(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Uo(t, Ho.current), r) break;
				return null;
			case 22: return t.lanes = 0, Vc(e, t, n, t.pendingProps);
			case 24: Sa(t, Fa, e.memoizedState.cache);
		}
		return fl(e, t, n);
	}
	function hl(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Ic = !0;
			else {
				if (!pl(e, n) && !(t.flags & 128)) return Ic = !1, ml(e, t, n);
				Ic = !!(e.flags & 131072);
			}
		} else Ic = !1, I && t.flags & 1048576 && ia(t, Zi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ao(t.elementType), t.type = e, typeof e == "function") Ri(e) ? (r = Tc(e, r), t.tag = 1, t = Xc(null, t, e, r, n)) : (t.tag = 0, t = Jc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === fe) {
								t.tag = 11, t = Rc(null, t, e, r, n);
								break a;
							}
							if (a === he) {
								t.tag = 14, t = zc(null, t, e, r, n);
								break a;
							}
							if (a === de) {
								t.tag = 10, t.type = e, t = dl(null, t, n);
								break a;
							}
						}
						throw t = Te(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Jc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Tc(r, t.pendingProps), Xc(e, t, r, a, n);
			case 3:
				a: {
					if (Fe(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, bo(e, t), Do(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Sa(t, Fa, r), r !== o.cache && Ta(t, [Fa], n, !0), Eo(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Zc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = qi(Error(i(424)), t), va(a), t = Zc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (F = lm(e.firstChild), ca = t, I = !0, la = null, ua = !0, n = _o(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (ga(), r === a) {
							t = fl(e, t, n);
							break a;
						}
						Lc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return qc(e, t), e === null ? (n = Nm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : I || (t.stateNode = fp(t.type, t.pendingProps, Ne.current, t)) : t.memoizedState = Nm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Le(t), e === null && I && (r = t.stateNode = hm(t.type, t.pendingProps, Ne.current), ca = t, ua = !0, a = F, Sp(t.type) ? (um = a, F = lm(r.firstChild)) : F = a), Lc(e, t, t.pendingProps.children, n), qc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && I && ((a = r = F) && (r = rm(r, t.type, t.pendingProps, ua), r === null ? a = !1 : (t.stateNode = r, ca = t, F = lm(r.firstChild), ua = !1, a = !0)), a || fa(t)), Le(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, pp(a, o) ? r = null : s !== null && pp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = ns(e, t, as, null, null, n), sh._currentValue = a), qc(e, t), Lc(e, t, r, n), t.child;
			case 6: return e === null && I && ((e = n = F) && (n = im(n, t.pendingProps, ua), n === null ? e = !1 : (t.stateNode = n, ca = t, F = null, e = !0)), e || fa(t)), null;
			case 13: return tl(e, t, n);
			case 4: return Fe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = go(t, null, r, n) : Lc(e, t, r, n), t.child;
			case 11: return Rc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, qc(e, t), Lc(e, t, r, n), t.child;
			case 8: return Lc(e, t, t.pendingProps.children, n), t.child;
			case 12: return Lc(e, t, t.pendingProps.children, n), t.child;
			case 10: return dl(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, Oa(t), a = ka(a), r = r(a), t.flags |= 1, Lc(e, t, r, n), t.child;
			case 14: return zc(e, t, t.type, t.pendingProps, n);
			case 15: return Bc(e, t, t.type, t.pendingProps, n);
			case 19: return ul(e, t, n);
			case 31: return Kc(e, t, n);
			case 22: return Vc(e, t, n, t.pendingProps);
			case 24: return Oa(t), r = ka(Fa), e === null ? (a = Xa(), a === null && (a = G, o = Ia(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, yo(t), Sa(t, Fa, a)) : ((e.lanes & n) !== 0 && (bo(e, t), Do(t, null, null, n), Eo()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Sa(t, Fa, r), r !== a.cache && Ta(t, [Fa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Sa(t, Fa, r))), Lc(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : I && aa(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : qc(e, t), Lc(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function gl(e) {
		e.flags |= 4;
	}
	function _l(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Jm(t, r) : Jm(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Ud()) e.flags |= 8192;
				else throw oo = no, eo;
			}
		} else e.flags &= -16777217;
	}
	function vl(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Ym(t)) {
			if (Ud()) e.flags |= 8192;
			else throw oo = no, eo;
		}
	}
	function yl(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : ht(), e.lanes |= t, dd |= t);
	}
	function bl(e, t) {
		if (!I) switch (e.tailMode) {
			case "visible": break;
			case "collapsed":
				for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
				break;
			default:
				for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
		}
	}
	function V(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function xl(e, t, n) {
		var r = t.pendingProps;
		switch (oa(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return V(t), null;
			case 1: return V(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Ca(Fa), Ie(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ha(t) ? gl(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, _a())), V(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (gl(t), o === null ? (V(t), _l(t, a, null, r, n)) : (V(t), vl(t, o))) : o ? o === e.memoizedState ? (V(t), t.flags &= -16777217) : (gl(t), V(t), vl(t, o)) : (e = e.memoizedProps, e !== r && gl(t), V(t), _l(t, a, e, r, n)), null;
			case 27:
				if (Re(t), n = Ne.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && gl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return V(t), t.subtreeFlags &= -33554433, null;
					}
					e = D.current, ha(t) ? pa(t, e) : (e = hm(a, r, n), t.stateNode = e, gl(t));
				}
				return V(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (Re(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && gl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return V(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = D.current, ha(t)) pa(t, o);
					else {
						var s = lp(Ne.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[Dt] = t, o[Ot] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (np(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && gl(t);
					}
				}
				return V(t), t.subtreeFlags &= -33554433, _l(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && gl(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = Ne.current, ha(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = ca, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Dt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || ep(e.nodeValue, n)), e || fa(t, !0);
					} else e = lp(e).createTextNode(r), e[Dt] = t, t.stateNode = e;
				}
				return V(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ha(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Dt] = t;
						} else ga(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						V(t), e = !1;
					} else n = _a(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Vo(t), t) : (Vo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return V(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ha(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Dt] = t;
						} else ga(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						V(t), a = !1;
					} else a = _a(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Vo(t), t) : (Vo(t), null);
				}
				return Vo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), yl(t, t.updateQueue), V(t), null);
			case 4: return Ie(), e === null && Wf(t.stateNode.containerInfo), t.flags |= 67108864, V(t), null;
			case 10: return Ca(t.type), V(t), null;
			case 19:
				if (Wo(t), r = t.memoizedState, r === null) return V(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) bl(r, !1);
					else {
						if (Y !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = Go(e), o !== null) {
								for (t.flags |= 128, bl(r, !1), e = o.updateQueue, t.updateQueue = e, yl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Bi(n, e), n = n.sibling;
								return Uo(t, Ho.current & 1 | 2), I && ra(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Ze() > _d && (t.flags |= 128, a = !0, bl(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = Go(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, yl(t, e), bl(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !I) return V(t), null;
						} else 2 * Ze() - r.renderingStartTime > _d && n !== 536870912 && (t.flags |= 128, a = !0, bl(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				if (r.tail !== null) {
					e = r.tail;
					a: {
						for (n = e; n !== null;) {
							if (n.alternate !== null) {
								n = !1;
								break a;
							}
							n = n.sibling;
						}
						n = !0;
					}
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ze(), e.sibling = null, o = Ho.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || I ? Uo(t, o) : (n = o, E(Fo, t), E(Ho, n), Io === null && (Io = t)), I && ra(t, r.treeForkCount), e;
				}
				return V(t), null;
			case 22:
			case 23: return Vo(t), Po(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (V(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : V(t), n = t.updateQueue, n !== null && yl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && je(Ya), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Ca(Fa), V(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, V(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function Sl(e, t) {
		switch (oa(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Ca(Fa), Ie(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return Re(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Vo(t), t.alternate === null) throw Error(i(340));
					ga();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Vo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					ga();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Wo(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return Ie(), null;
			case 10: return Ca(t.type), null;
			case 22:
			case 23: return Vo(t), Po(), e !== null && je(Ya), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Ca(Fa), null;
			case 25: return null;
			default: return null;
		}
	}
	function Cl(e, t) {
		switch (oa(t), t.tag) {
			case 3:
				Ca(Fa), Ie();
				break;
			case 26:
			case 27:
			case 5:
				Re(t);
				break;
			case 4:
				Ie();
				break;
			case 31:
				t.memoizedState !== null && Vo(t);
				break;
			case 13:
				Vo(t);
				break;
			case 19:
				Wo(t);
				break;
			case 10:
				Ca(t.type);
				break;
			case 22:
			case 23:
				Vo(t), Po(), e !== null && je(Ya);
				break;
			case 24: Ca(Fa);
		}
	}
	function wl(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Tl(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function El(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				ko(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Dl(e, t, n) {
		n.props = Tc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Ol(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						var i = e.stateNode, a = Si(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Pp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Fp(e);
							h(e.child, !1, Qp, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function kl(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				Z(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Z(e, t, n);
			}
			else n.current = null;
		}
	}
	function Al(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) em(e.stateNode, t[n]);
	}
	function jl(e) {
		for (var t = e.return; t !== null && (Pl(t) && em(e.stateNode, t.stateNode), !Nl(t));) t = t.return;
	}
	function Ml(e) {
		for (var t = e.return; t !== null && (Pl(t) && tm(e.stateNode, t.stateNode), !Nl(t));) t = t.return;
	}
	function Nl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function Pl(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function Fl(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Il(e, t, n) {
		try {
			var r = e.stateNode;
			ip(r, e.type, n, t), r[Ot] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Ll(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Sp(e.type) || e.tag === 4;
	}
	function Rl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Ll(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Sp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function zl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Cn)), Al(e, r), P = !0;
		else if (i !== 4 && (i === 27 && (Al(e, r), r = null, Sp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (zl(e, t, n, r), e = e.sibling; e !== null;) zl(e, t, n, r), e = e.sibling;
	}
	function Bl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), Al(e, r), P = !0;
		else if (i !== 4 && (i === 27 && (Al(e, r), r = null, Sp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Bl(e, t, n, r), e = e.sibling; e !== null;) Bl(e, t, n, r), e = e.sibling;
	}
	function Vl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			np(t, r, n), t[Dt] = e, t[Ot] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var Hl = !1, Ul = null;
	function Wl(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Hl = !0);
	}
	var Gl = null;
	function Kl() {
		var e = Gl;
		return Gl = null, e;
	}
	var ql = 0;
	function Jl(e, t, n, r, i) {
		return ql = 0, Yl(e.child, t, n, r, i);
	}
	function Yl(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Op(o);
					r.push(s), s.view && (a = !0);
				} else a || Op(o).view && (a = !0);
				Hl = !0, Tp(o, ql === 0 ? t : t + "_" + ql, n), ql++;
			} else e.tag === 22 && e.memoizedState !== null || e.tag === 30 && i || Yl(e.child, t, n, r, i) && (a = !0);
			e = e.sibling;
		}
		return a;
	}
	function Xl(e, t) {
		for (; e !== null;) e.tag === 5 ? Ep(e.stateNode, e.memoizedProps) : e.tag === 22 && e.memoizedState !== null || e.tag === 30 && t || Xl(e.child, t), e = e.sibling;
	}
	function Zl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (Zl(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = wi(t.default, t.share), t !== "none" && (Jl(e, n, t, null, !1) || Xl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Ql(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = Si(r, n), a = wi(r.default, n.paired ? r.share : r.enter);
			a === "none" ? Zl(e) : Jl(e, i, a, null, !1) ? (Zl(e), n.paired || t || Nd(e, r.onEnter)) : Xl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Ql(e, t), e = e.sibling;
		else Zl(e);
	}
	function $l(e) {
		if (Ul !== null && Ul.size !== 0) {
			var t = Ul;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = wi(n.default, n.share);
								if (a !== "none" && (Jl(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Nd(e, n.onShare)) : Xl(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					$l(e);
				}
				e = e.sibling;
			}
		}
	}
	function eu(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = Si(t, e.stateNode), r = Ul === null ? void 0 : Ul.get(n), i = wi(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Jl(e, n, i, null, !1) ? r === void 0 ? Nd(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Ul.delete(n), Nd(e, t.onShare)) : Xl(e.child, !1)), Ul !== null && $l(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) eu(e), e = e.sibling;
		else Ul !== null && $l(e);
	}
	function tu(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = Si(t, e.stateNode);
				t = wi(t.default, t.update), e.flags &= -5, t !== "none" && Jl(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && tu(e);
			e = e.sibling;
		}
	}
	function nu(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, Xl(e.child, !1));
				}
				nu(e);
			}
			e = e.sibling;
		}
	}
	function ru(e) {
		if (e.tag === 30) e.stateNode.paired = null, Xl(e.child, !1), nu(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) ru(e), e = e.sibling;
		else nu(e);
	}
	function iu(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? Xl(e.child, !1) : e.subtreeFlags & 33554432 && iu(e), e = e.sibling;
	}
	function au(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && ql < a.length) {
					var l = a[ql], u = Op(c);
					(l.view || u.view) && (s = !0);
					var d;
					if (d = !(e.flags & 4)) {
						if (u.clip) d = !0;
						else {
							d = l.rect;
							var f = u.rect;
							d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
						}
					}
					d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
				} else e.flags |= 32;
				e.flags & 4 && Tp(c, ql === 0 ? n : n + "_" + ql, i), s && e.flags & 4 || (Gl === null && (Gl = []), Gl.push(c, ql === 0 ? r : r + "_" + ql, t.memoizedProps)), ql++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : au(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function ou(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = Si(n, r), a = wi(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(kp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				ql = 0, i = au(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Nd(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && ou(e, t);
			e = e.sibling;
		}
	}
	var su = !1, H = !1, cu = !1, lu = !1, uu = typeof WeakSet == "function" ? WeakSet : Set, du = null, fu = !1, pu = !1, mu = !1, hu = !1;
	function gu(e, t, n) {
		if (e = e.containerInfo, sp = gh, e = Qr(e), $r(e)) {
			if ("selectionStart" in e) var r = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				r = (r = e.ownerDocument) && r.defaultView || window;
				var i = r.getSelection && r.getSelection();
				if (i && i.rangeCount !== 0) {
					r = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						r.nodeType, o.nodeType;
					} catch {
						r = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					r = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else r = null;
			}
			r ||= {
				start: 0,
				end: 0
			};
		} else r = null;
		for (cp = {
			focusedElem: e,
			selectionRange: r
		}, gh = !1, n = (n & 335544064) === n, du = t, t = n ? 9270 : 1024; du !== null;) {
			if (e = du, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && eu(r[a]);
			if (e.alternate === null && e.flags & 2) n && Wl(e), _u(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && eu(r), _u(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Wl(e), _u(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, du = r) : (n && tu(e), _u(n));
			}
		}
		Ul = null;
	}
	function _u(e) {
		for (; du !== null;) {
			var t = du, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = Tc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							Z(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) nm(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								nm(r);
								break;
							default: r.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				case 30:
					n && r !== null && (n = Si(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = wi(a.default, a.update), a !== "none" && Jl(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, du = r;
				break;
			}
			du = t.return;
		}
	}
	function vu(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Lu(e, n), r & 4 && wl(5, n);
				break;
			case 1:
				if (Lu(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						Z(n, n.return, e);
					}
					else {
						var i = Tc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							Z(n, n.return, e);
						}
					}
				}
				r & 64 && El(n), r & 512 && Ol(n, n.return);
				break;
			case 3:
				if (Lu(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						ko(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Vl(n);
			case 26:
			case 5:
				Lu(e, n), t === null && r & 4 && Fl(n), r & 512 && Ol(n, n.return);
				break;
			case 12:
				Lu(e, n);
				break;
			case 31:
				Lu(e, n), r & 4 && Eu(e, n);
				break;
			case 13:
				Lu(e, n), r & 4 && Du(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = _f.bind(null, n), cm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || su, !r) {
					var a = t !== null && t.memoizedState !== null || H;
					t = su, i = H, su = r, (H = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), zu(e, n, r)) : Lu(e, n), su = t, H = i;
				}
				break;
			case 30:
				Lu(e, n), r & 512 && Ol(n, n.return);
				break;
			case 7: r & 512 && Ol(n, n.return);
			default: Lu(e, n);
		}
	}
	function yu(e, t) {
		for (e = e.child; e !== null;) bu(e, t), e = e.sibling;
	}
	function bu(e, t) {
		switch (e.tag) {
			case 5:
			case 26:
				try {
					var n = e.stateNode;
					if (t) {
						var r = n.style;
						typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
					} else {
						var i = e.stateNode, a = e.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null;
						i.style.display = o == null || typeof o == "boolean" ? "" : ("" + o).trim();
					}
				} catch (t) {
					Z(e, e.return, t);
				}
				xu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, P = !0;
				} catch (t) {
					Z(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? wp(s, !0) : wp(e.stateNode, !1);
				} catch (t) {
					Z(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && yu(e, t);
				break;
			default: yu(e, t);
		}
	}
	function xu(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						bu(n, r);
						break a;
					case 22:
						n.memoizedState === null && xu(n, r);
						break a;
					default: xu(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function Su(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, Su(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && It(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var U = null, Cu = !1;
	function wu(e, t, n) {
		for (n = n.child; n !== null;) Tu(e, t, n), n = n.sibling;
	}
	function Tu(e, t, n) {
		if (it && typeof it.onCommitFiberUnmount == "function") try {
			it.onCommitFiberUnmount(A, n);
		} catch {}
		switch (n.tag) {
			case 26:
				H || kl(n, t), wu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !H && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				H || kl(n, t), Ml(n);
				var r = U, i = Cu;
				Sp(n.type) && (U = n.stateNode, Cu = !1), wu(e, t, n), gm(n.stateNode, n.type, n.memoizedProps), U = r, Cu = i;
				break;
			case 5: H || kl(n, t), Ml(n);
			case 6:
				if (n.tag === 6 && Ml(n), r = U, i = Cu, U = null, wu(e, t, n), U = r, Cu = i, U !== null) {
					if (Cu) try {
						(U.nodeType === 9 ? U.body : U.nodeName === "HTML" ? U.ownerDocument.body : U).removeChild(n.stateNode), P = !0;
					} catch (e) {
						Z(n, t, e);
					}
					else try {
						U.removeChild(n.stateNode), P = !0;
					} catch (e) {
						Z(n, t, e);
					}
				}
				break;
			case 18:
				U !== null && (Cu ? (e = U, Cp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Hh(e)) : Cp(U, n.stateNode));
				break;
			case 4:
				r = U, i = Cu, U = n.stateNode.containerInfo, Cu = !0, wu(e, t, n), U = r, Cu = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Tl(2, n, t), H || Tl(4, n, t), wu(e, t, n);
				break;
			case 1:
				H || (kl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Dl(n, t, r)), wu(e, t, n);
				break;
			case 21:
				wu(e, t, n);
				break;
			case 22:
				H = (r = H) || n.memoizedState !== null, wu(e, t, n), H = r;
				break;
			case 30:
				kl(n, t), wu(e, t, n);
				break;
			case 7:
				H || kl(n, t), wu(e, t, n);
				break;
			default: wu(e, t, n);
		}
	}
	function Eu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Hh(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function Du(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Hh(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Ou(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new uu()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new uu()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ku(e, t) {
		var n = Ou(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = vf.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Au(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Sp(l.type)) {
							U = l.stateNode, Cu = !1;
							break a;
						}
						break;
					case 5:
						U = l.stateNode, Cu = !1;
						break a;
					case 3:
					case 4:
						U = l.stateNode.containerInfo, Cu = !0;
						break a;
				}
				l = l.return;
			}
			if (U === null) throw Error(i(160));
			Tu(s, c, o), U = null, Cu = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Mu(t, e, n), t = t.sibling;
	}
	var ju = null;
	function Mu(e, t, n) {
		var r = e.alternate, a = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (a & 4 && (r = e.updateQueue, r = r === null ? null : r.events, r !== null)) for (var o = 0; o < r.length; o++) {
					var s = r[o];
					s.ref.impl = s.nextImpl;
				}
				Au(t, e, n), Nu(e), a & 4 && (Tl(3, e, e.return), wl(3, e), Tl(5, e, e.return));
				break;
			case 1:
				Au(t, e, n), Nu(e), a & 512 && (H || r === null || kl(r, r.return)), a & 64 && su && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = ju, Au(t, e, n), Nu(e), a & 512 && (H || r === null || kl(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (su) e.stateNode = fp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[Pt] || r[Dt] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), np(r, t, n), r[Dt] = e, Vt(r), t = r;
												break a;
											case "link":
												if (o = Gm("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = Gm("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[Dt] = e, Vt(r), t = r;
									}
									e.stateNode = t;
								}
							} else su || Km(o, e.type, e.stateNode);
						} else e.stateNode = Bm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Il(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || H || t.parentNode.removeChild(t)) : a.count--, n === null ? su || Km(o, e.type, e.stateNode) : Bm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				Au(t, e, n), Nu(e), a & 512 && (H || r === null || kl(r, r.return)), r !== null && a & 4 && Il(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = cu, cu = !1, Au(t, e, n), cu = o, Nu(e), a & 512 && (H || r === null || kl(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						hn(t, ""), P = !0;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Il(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (lu = !0);
				break;
			case 6:
				if (Au(t, e, n), Nu(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, P = !0;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (P = !1, Wm = null, o = ju, ju = bm(t.containerInfo), Au(t, e, n), ju = o, Nu(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Hh(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				lu && (lu = !1, Pu(e)), P = !1;
				break;
			case 4:
				a = cu, cu = su, r = Zt(), o = ju, ju = bm(e.stateNode.containerInfo), Au(t, e, n), Nu(e), ju = o, P && pu && (mu = !0), P = r, cu = a;
				break;
			case 12:
				Au(t, e, n), Nu(e);
				break;
			case 31:
				Au(t, e, n), Nu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ku(e, t)));
				break;
			case 13:
				Au(t, e, n), Nu(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (hd = Ze()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ku(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = su, l = H, u = cu;
				su = c || o, cu = u || o, H = l || s, Au(t, e, n), H = l, cu = u, su = c, Nu(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || su || H || (t = s || H, n = su, r = H, su = o || su, H = t, Ru(e, 2), su = n, H = r), !o && cu || yu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, ku(e, n))));
				break;
			case 19:
				Au(t, e, n), Nu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ku(e, t)));
				break;
			case 30:
				a & 512 && (H || r === null || kl(r, r.return)), a = Zt(), o = pu, s = (n & 335544064) === n, c = e.memoizedProps, pu = s && wi(c.default, c.update) !== "none", Au(t, e, n), Nu(e), s && r !== null && P && (e.flags |= 4), pu = o, P = a;
				break;
			case 21: break;
			case 7: a & 512 && (H || r === null || kl(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: Au(t, e, n), Nu(e);
		}
	}
	function Nu(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Ll(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (Pl(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Nl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						Bl(e, Rl(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (hn(l, ""), n.flags &= -33), Bl(e, Rl(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						zl(e, Rl(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Pu(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Pu(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gh = !0, t.reset(), gh = !1), e = e.sibling;
		}
	}
	function Fu(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Iu(t, e), t = t.sibling;
		else ou(t, !1);
	}
	function Iu(e, t) {
		var n = e.alternate;
		if (n === null) Ql(e, !1);
		else switch (e.tag) {
			case 3:
				if (hu = fu = !1, Kl(), Fu(t, e), !fu && !mu) {
					if (e = Gl, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Ep(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(" + i + ")"
						});
					}
					e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
						opacity: [0, 0],
						pointerEvents: ["none", "none"]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition-group(root)"
					}), e.animate({
						width: [0, 0],
						height: [0, 0]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition"
					})), hu = !0;
				}
				Gl = null;
				break;
			case 5:
				Fu(t, e);
				break;
			case 4:
				r = fu, fu = !1, Fu(t, e), fu && (mu = !0), fu = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? Fu(t, e) : Ql(e, !1));
				break;
			case 30:
				r = fu, i = Kl(), fu = !1, Fu(t, e), fu && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = Si(a, o), o = Si(n.memoizedProps, o);
				var s = wi(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, ql = 0, t = au(e, n, t, o, s, a, !0), ql !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Nd(e, e.memoizedProps.onUpdate), Gl = i) : i !== null && (i.push.apply(i, Gl), Gl = i), fu = e.flags & 32 ? !0 : r;
				break;
			default: Fu(t, e);
		}
	}
	function Lu(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) vu(e, t.alternate, t), t = t.sibling;
	}
	function Ru(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Tl(4, n, n.return), Ru(n, r);
					break;
				case 1:
					kl(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && Dl(n, n.return, i), Ru(n, r);
					break;
				case 27: r & 2 && gm(n.stateNode, n.type, n.memoizedProps);
				case 5:
					kl(n, n.return), n.tag !== 5 && n.tag !== 27 || Ml(n), Ru(n, r);
					break;
				case 6:
					Ml(n);
					break;
				case 26:
					kl(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || H || i.parentNode.removeChild(i), Ru(n, r);
					break;
				case 22:
					n.memoizedState === null && Ru(n, r);
					break;
				case 30:
					kl(n, n.return), Ru(n, r);
					break;
				case 7: kl(n, n.return);
				default: Ru(n, r);
			}
			e = e.sibling;
		}
	}
	function zu(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					zu(i, a, n), wl(4, a);
					break;
				case 1:
					if (zu(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) Oo(l[i], c);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					s && o & 64 && El(a), Ol(a, a.return);
					break;
				case 27: n & 2 && Vl(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || jl(a), zu(i, a, n), s && r === null && o & 4 && Fl(a), Ol(a, a.return);
					break;
				case 6:
					jl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || su || Km(bm(c.ownerDocument), a.type, c), zu(i, a, n), s && r === null && o & 4 && Fl(a), Ol(a, a.return);
					break;
				case 12:
					zu(i, a, n);
					break;
				case 31:
					zu(i, a, n), s && o & 4 && Eu(i, a);
					break;
				case 13:
					zu(i, a, n), s && o & 4 && Du(i, a);
					break;
				case 22:
					a.memoizedState === null && zu(i, a, n), Ol(a, a.return);
					break;
				case 30:
					zu(i, a, n), Ol(a, a.return);
					break;
				case 7: Ol(a, a.return);
				default: zu(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Bu(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && La(n));
	}
	function Vu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && La(e));
	}
	function Hu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Uu(e, t, n, r), t = t.sibling;
		else i && iu(t);
	}
	function Uu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && ru(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Hu(e, t, n, r), a & 2048 && wl(9, t);
				break;
			case 1:
				Hu(e, t, n, r);
				break;
			case 3:
				Hu(e, t, n, r), i && hu && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && La(a)));
				break;
			case 12:
				if (a & 2048) {
					Hu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else Hu(e, t, n, r);
				break;
			case 31:
				Hu(e, t, n, r);
				break;
			case 13:
				Hu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && ru(t), o._visibility & 2 ? Hu(e, t, n, r) : (o._visibility |= 2, Wu(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && ru(s), o._visibility & 2 ? Hu(e, t, n, r) : Gu(e, t)), a & 2048 && Bu(s, t);
				break;
			case 24:
				Hu(e, t, n, r), a & 2048 && Vu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Xl(a.child, !0), Xl(t.child, !0))), Hu(e, t, n, r);
				break;
			default: Hu(e, t, n, r);
		}
	}
	function Wu(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Wu(a, o, s, c, i), wl(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Wu(a, o, s, c, i)) : u._visibility & 2 ? Wu(a, o, s, c, i) : Gu(a, o), i && l & 2048 && Bu(o.alternate, o);
					break;
				case 24:
					Wu(a, o, s, c, i), i && l & 2048 && Vu(o.alternate, o);
					break;
				default: Wu(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Gu(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Gu(n, r), i & 2048 && Bu(r.alternate, r);
					break;
				case 24:
					Gu(n, r), i & 2048 && Vu(r.alternate, r);
					break;
				default: Gu(n, r);
			}
			t = t.sibling;
		}
	}
	var Ku = 8192;
	function qu(e, t, n) {
		if (e.subtreeFlags & Ku) for (e = e.child; e !== null;) Ju(e, t, n), e = e.sibling;
	}
	function Ju(e, t, n) {
		switch (e.tag) {
			case 26:
				qu(e, t, n), e.flags & Ku && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Zm(n, e)) : Qm(n, ju, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				qu(e, t, n), e.flags & Ku && (e = e.stateNode, (t & 335544128) === t && Zm(n, e));
				break;
			case 3:
			case 4:
				var r = ju;
				ju = bm(e.stateNode.containerInfo), qu(e, t, n), ju = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ku, Ku = 16777216, qu(e, t, n), Ku = r) : qu(e, t, n));
				break;
			case 30:
				if ((e.flags & Ku) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Ul === null && (Ul = /* @__PURE__ */ new Map()), Ul.set(r, i);
				}
				qu(e, t, n);
				break;
			default: qu(e, t, n);
		}
	}
	function Yu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Xu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				du = r, $u(r, e);
			}
			Yu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Zu(e), e = e.sibling;
	}
	function Zu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Xu(e), e.flags & 2048 && Tl(9, e, e.return);
				break;
			case 3:
				Xu(e);
				break;
			case 12:
				Xu(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Qu(e)) : Xu(e);
				break;
			default: Xu(e);
		}
	}
	function Qu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				du = r, $u(r, e);
			}
			Yu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Tl(8, t, t.return), Qu(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Qu(t));
					break;
				default: Qu(t);
			}
			e = e.sibling;
		}
	}
	function $u(e, t) {
		for (; du !== null;) {
			var n = du;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Tl(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: La(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, du = r;
			else a: for (n = e; du !== null;) {
				r = du;
				var i = r.sibling, a = r.return;
				if (Su(r), r === n) {
					du = null;
					break a;
				}
				if (i !== null) {
					i.return = a, du = i;
					break a;
				}
				du = a;
			}
		}
	}
	var ed = {
		getCacheForType: function(e) {
			var t = ka(Fa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ka(Fa).controller.signal;
		}
	}, td = typeof WeakMap == "function" ? WeakMap : Map, W = 0, G = null, K = null, q = 0, J = 0, nd = null, rd = !1, id = !1, ad = !1, od = 0, Y = 0, sd = 0, cd = 0, ld = 0, ud = 0, dd = 0, fd = null, pd = null, md = !1, hd = 0, gd = 0, _d = Infinity, vd = null, yd = null, X = 0, bd = null, xd = null, Sd = 0, Cd = 0, wd = null, Td = null, Ed = null, Dd = null, Od = null, kd = 0, Ad = null;
	function jd() {
		return W & 2 && q !== 0 ? q & -q : w.T === null ? wt() : Pf();
	}
	function Md() {
		if (ud === 0) {
			if (!(q & 536870912) || I) {
				var e = ct;
				ct <<= 1, !(ct & 3932160) && (ct = 262144), ud = e;
			} else ud = 536870912;
		}
		return e = Fo.current, e !== null && (e.flags |= 32), ud;
	}
	function Nd(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Pp(Si(e.memoizedProps, n))), Dd === null && (Dd = []), Dd.push(t.bind(null, r));
		}
	}
	function Pd(e, t, n) {
		(e === G && (J === 2 || J === 9) || e.cancelPendingCommit !== null) && (Vd(e, 0), Rd(e, q, ud, !1)), _t(e, n), W & 2 && e === G || (e === G && (!(W & 2) && (cd |= n), Y === 4 && Rd(e, q, ud, !1)), Ef(e));
	}
	function Fd(e, t, n) {
		if (W & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || ft(e, t), a = r ? Yd(e, t) : qd(e, t, !0), o = r;
		do {
			if (a === 0) {
				id && !r && Rd(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Ld(n)) a = qd(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = fd;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Vd(c, s).flags |= 256), s = qd(c, s, !1), s !== 2 && s !== 6) {
								if (ad && !l) {
									c.errorRecoveryDisabledLanes |= o, cd |= o, a = 4;
									break a;
								}
								o = pd, pd = a, o !== null && (pd === null ? pd = o : pd.push.apply(pd, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Vd(e, 0), Rd(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Rd(r, t, ud, !rd);
							break a;
						case 2:
							pd = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = hd + 300 - Ze(), 10 < a)) {
						if (Rd(r, t, ud, !rd), dt(r, 0, !0) !== 0) break a;
						Sd = t, r.timeoutHandle = gp(Id.bind(null, r, n, pd, vd, md, t, ud, cd, dd, rd, o, "Throttled", -0, 0), a);
						break a;
					}
					Id(r, n, pd, vd, md, t, ud, cd, dd, rd, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		Ef(e);
	}
	function Id(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.timeoutHandle = -1;
		var m = t.subtreeFlags, h = (a & 335544064) === a;
		d = null, (h || m & 8192 || (m & 16785408) == 16785408) && (d = {
			stylesheets: null,
			count: 0,
			imgCount: 0,
			imgBytes: 0,
			suspenseyImages: [],
			waitingForImages: !0,
			waitingForViewTransition: !1,
			unsuspend: Cn
		}, Ul = null, Ju(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = nh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? hd - Ze() : (a & 4194048) === a ? gd - Ze() : 0, m = eh(d, m), m !== null) ? (Sd = a, e.cancelPendingCommit = m(nf.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Rd(e, a, o, !l)) : nf(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Ld(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Kr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Rd(e, t, n, r) {
		t = pt(e, t), t &= ~ld, t &= ~cd, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - at(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && yt(e, n, t);
	}
	function zd() {
		return W & 6 ? !0 : (Df(0, !1), !1);
	}
	function Bd() {
		if (K !== null) {
			if (J === 0) var e = K.return;
			else e = K, xa = ba = null, cs(e), lo = null, uo = 0, e = K;
			for (; e !== null;) Cl(e.alternate, e), e = e.return;
			K = null;
		}
	}
	function Vd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, _p(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Sd = 0, Bd(), G = e, K = n = zi(e.current, null), q = t, J = 0, nd = null, rd = !1, id = ft(e, t), ad = !1, dd = ud = ld = cd = sd = Y = 0, pd = fd = null, md = !1, od = pt(e, t), ki(), n;
	}
	function Hd(e, t) {
		L = null, w.H = _c, t === $a || t === to ? (t = so(), J = 3) : t === eo ? (t = so(), J = 4) : J = t === Fc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, nd = t, K === null && (Y = 1, kc(e, qi(t, e.current)));
	}
	function Ud() {
		var e = Fo.current;
		return e === null ? !0 : (q & 4194048) === q ? Io === null : (q & 62914560) === q || q & 536870912 ? e === Io : !1;
	}
	function Wd() {
		var e = w.H;
		return w.H = _c, e === null ? _c : e;
	}
	function Gd() {
		var e = w.A;
		return w.A = ed, e;
	}
	function Kd() {
		Y = 4, rd || (q & 4194048) !== q && Fo.current !== null || (id = !0), !(sd & 134217727) && !(cd & 134217727) || G === null || Rd(G, q, ud, !1);
	}
	function qd(e, t, n) {
		var r = W;
		W |= 2;
		var i = Wd(), a = Gd();
		(G !== e || q !== t) && (vd = null, Vd(e, t)), t = !1;
		var o = Y;
		a: do
			try {
				if (J !== 0 && K !== null) {
					var s = K, c = nd;
					switch (J) {
						case 8:
							Bd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Fo.current === null && (t = !0);
							var l = J;
							if (J = 0, nd = null, $d(e, s, c, l), n && id) {
								o = 0;
								break a;
							}
							break;
						default: l = J, J = 0, nd = null, $d(e, s, c, l);
					}
				}
				Jd(), o = Y;
				break;
			} catch (t) {
				Hd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, xa = ba = null, W = r, w.H = i, w.A = a, K === null && (G = null, q = 0, ki()), o;
	}
	function Jd() {
		for (; K !== null;) Zd(K);
	}
	function Yd(e, t) {
		var n = W;
		W |= 2;
		var r = Wd(), a = Gd();
		G !== e || q !== t ? (vd = null, _d = Ze() + 500, Vd(e, t)) : id = ft(e, t);
		a: do
			try {
				if (J !== 0 && K !== null) {
					t = K;
					var o = nd;
					b: switch (J) {
						case 1:
							J = 0, nd = null, $d(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ro(o)) {
								J = 0, nd = null, Qd(t);
								break;
							}
							t = function() {
								J !== 2 && J !== 9 || G !== e || (J = 7), Ef(e);
							}, o.then(t, t);
							break a;
						case 3:
							J = 7;
							break a;
						case 4:
							J = 5;
							break a;
						case 7:
							ro(o) ? (J = 0, nd = null, Qd(t)) : (J = 0, nd = null, $d(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (K.tag) {
								case 26: s = K.memoizedState;
								case 5:
								case 27:
									var c = K;
									if (s ? Ym(s) : c.stateNode.complete) {
										J = 0, nd = null;
										var l = c.sibling;
										if (l !== null) K = l;
										else {
											var u = c.return;
											u === null ? K = null : (K = u, ef(u));
										}
										break b;
									}
							}
							J = 0, nd = null, $d(e, t, o, 5);
							break;
						case 6:
							J = 0, nd = null, $d(e, t, o, 6);
							break;
						case 8:
							Bd(), Y = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Xd();
				break;
			} catch (t) {
				Hd(e, t);
			}
		while (1);
		return xa = ba = null, w.H = r, w.A = a, W = n, K === null ? (G = null, q = 0, ki(), Y) : 0;
	}
	function Xd() {
		for (; K !== null && !Ye();) Zd(K);
	}
	function Zd(e) {
		var t = hl(e.alternate, e, od);
		e.memoizedProps = e.pendingProps, t === null ? ef(e) : K = t;
	}
	function Qd(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Yc(n, t, t.pendingProps, t.type, void 0, q);
				break;
			case 11:
				t = Yc(n, t, t.pendingProps, t.type.render, t.ref, q);
				break;
			case 5:
				cs(t);
				var r = t;
				r === ca && (I ? (ma(r), r.tag === 5 && r.stateNode != null && (F = r.stateNode)) : (ma(r), I = !0));
			default: Cl(n, t), t = K = Bi(t, od), t = hl(n, t, od);
		}
		e.memoizedProps = e.pendingProps, t === null ? ef(e) : K = t;
	}
	function $d(e, t, n, r) {
		xa = ba = null, cs(t), lo = null, uo = 0;
		var i = t.return;
		try {
			if (Pc(e, i, t, n, q)) {
				Y = 1, kc(e, qi(n, e.current)), K = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw K = i, t;
			Y = 1, kc(e, qi(n, e.current)), K = null;
			return;
		}
		t.flags & 32768 ? (I || r === 1 ? e = !0 : id || q & 536870912 ? e = !1 : (rd = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Fo.current, r !== null && r.tag === 13 && (r.flags |= 16384))), tf(t, e)) : ef(t);
	}
	function ef(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				tf(t, rd);
				return;
			}
			e = t.return;
			var n = xl(t.alternate, t, od);
			if (n !== null) {
				K = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				K = t;
				return;
			}
			K = t = e;
		} while (t !== null);
		Y === 0 && (Y = 5);
	}
	function tf(e, t) {
		do {
			var n = Sl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, K = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				K = e;
				return;
			}
			K = e = n;
		} while (e !== null);
		Y = 6, K = null;
	}
	function nf(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			df();
		while (X !== 0);
		if (W & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === G && (K = G = null, q = 0), xd = t, bd = e, Sd = n, wd = a, Td = r, rf(e, t, n, s, c, l, f);
		}
	}
	function rf(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (Cd = s, s |= Oi, vt(e, n, s, r, i, a), Dd = null, (n & 335544064) === n ? (Od = Ba(e), r = 10262) : (Od = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, yf(O, function() {
			return ff(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Hl = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = w.T, w.T = null, i = T.p, T.p = 2, a = W, W |= 4;
			try {
				gu(e, t, n);
			} finally {
				W = a, T.p = i, w.T = r;
			}
		}
		X = 1, Hl ? Ed = Mp(o, e.containerInfo, Od, sf, cf, of, lf, ff, af, null, null) : (sf(), cf(), lf());
	}
	function af(e) {
		if (X !== 0) {
			var t = bd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function of() {
		X === 3 && (X = 0, Iu(xd, bd), X = 4);
	}
	function sf() {
		if (X === 1) {
			X = 0;
			var e = bd, t = xd, n = Sd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = w.T, w.T = null;
				var i = T.p;
				T.p = 2;
				var a = W;
				W |= 4;
				try {
					pu = mu = !1, Mu(t, e, n), n = cp;
					var o = Qr(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && Zr(s.ownerDocument.documentElement, s)) {
						if (c !== null && $r(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Xr(s, h), v = Xr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					gh = !!sp, cp = sp = null;
				} finally {
					W = a, T.p = i, w.T = r;
				}
			}
			e.current = t, X = 2;
		}
	}
	function cf() {
		if (X === 2) {
			X = 0;
			var e = bd, t = xd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = w.T, w.T = null;
				var r = T.p;
				T.p = 2;
				var i = W;
				W |= 4;
				try {
					vu(e, t.alternate, t);
				} finally {
					W = i, T.p = r, w.T = n;
				}
			}
			X = 3;
		}
	}
	function lf() {
		if (X === 4 || X === 3) {
			X = 0;
			var e = Ed;
			Ed = null, Xe();
			var t = bd, n = xd, r = Sd, i = Td, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? X = 5 : (X = 0, xd = bd = null, uf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (yd = null), Ct(r), n = n.stateNode, it && typeof it.onCommitFiberRoot == "function") try {
				it.onCommitFiberRoot(A, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = w.T, a = T.p, T.p = 2, w.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					w.T = n, T.p = a;
				}
			}
			if (i = Dd, o = Od, Od = null, i !== null && (Dd = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			Sd & 3 && df(), Ef(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Ad ? kd++ : (kd = 0, Ad = t) : (kd = 0, Ad = null), Df(0, !1);
		}
	}
	function uf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, La(t)));
	}
	function df() {
		return Ed !== null && (Ed.skipTransition(), Ed = null), sf(), cf(), lf(), ff();
	}
	function ff() {
		if (X !== 5) return !1;
		var e = bd, t = Cd;
		Cd = 0;
		var n = Ct(Sd), r = w.T, a = T.p;
		try {
			T.p = 32 > n ? 32 : n, w.T = null, n = wd, wd = null;
			var o = bd, s = Sd;
			if (X = 0, xd = bd = null, Sd = 0, W & 6) throw Error(i(331));
			var c = W;
			if (W |= 4, Zu(o.current), Uu(o, o.current, s, n), W = c, Df(0, !1), it && typeof it.onPostCommitFiberRoot == "function") try {
				it.onPostCommitFiberRoot(A, o);
			} catch {}
			return !0;
		} finally {
			T.p = a, w.T = r, uf(e, t);
		}
	}
	function pf(e, t, n) {
		t = qi(n, t), t = jc(e.stateNode, t, 2), e = So(e, t, 2), e !== null && (_t(e, 2), Ef(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) pf(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				pf(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (yd === null || !yd.has(r))) {
					e = qi(n, e), n = Mc(2), r = So(t, n, 2), r !== null && (Nc(n, r, t, e), _t(r, 2), Ef(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function mf(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new td();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (ad = !0, i.add(n), e = hf.bind(null, e, t, n), t.then(e, e));
	}
	function hf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, G === e && (q & n) === n && (Y === 4 || Y === 3 && (q & 62914560) === q && 300 > Ze() - hd ? W & 2 ? ld |= n : Vd(e, 0) : ld |= n, dd === q && (dd = 0)), Ef(e);
	}
	function gf(e, t) {
		t === 0 && (t = ht()), e = Mi(e, t), e !== null && (_t(e, t), Ef(e));
	}
	function _f(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), gf(e, n);
	}
	function vf(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), gf(e, n);
	}
	function yf(e, t) {
		return qe(e, t);
	}
	var bf = null, xf = null, Sf = !1, Cf = !1, wf = !1, Tf = 0;
	function Ef(e) {
		e !== xf && e.next === null && (xf === null ? bf = xf = e : xf = xf.next = e), Cf = !0, Sf || (Sf = !0, Nf());
	}
	function Df(e, t) {
		if (!wf && Cf) {
			wf = !0;
			do
				for (var n = !1, r = bf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - at(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Mf(r, a));
						} else a = q, a = dt(r, r === G ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || ft(r, a) || (n = !0, Mf(r, a));
					}
					r = r.next;
				}
			while (n);
			wf = !1;
		}
	}
	function Of() {
		kf();
	}
	function kf() {
		Cf = Sf = !1;
		var e = 0;
		Tf !== 0 && hp() && (e = Tf);
		for (var t = Ze(), n = null, r = bf; r !== null;) {
			var i = r.next, a = Af(r, t);
			a === 0 ? (r.next = null, n === null ? bf = i : n.next = i, i === null && (xf = n)) : (n = r, (e !== 0 || a & 3) && (Cf = !0)), r = i;
		}
		X !== 0 && X !== 5 || Df(e, !1), Tf !== 0 && (Tf = 0);
	}
	function Af(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - at(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = mt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = G, n = q, n = dt(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (J === 2 || J === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Je(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || ft(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Je(r), Ct(n)) {
				case 2:
				case 8:
					n = et;
					break;
				case 32:
					n = O;
					break;
				case 268435456:
					n = nt;
					break;
				default: n = O;
			}
			return r = jf.bind(null, e), n = qe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Je(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function jf(e, t) {
		if (X !== 0 && X !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (df() && e.callbackNode !== n) return null;
		var r = q;
		return r = dt(e, e === G ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Fd(e, r, t), Af(e, Ze()), e.callbackNode != null && e.callbackNode === n ? jf.bind(null, e) : null);
	}
	function Mf(e, t) {
		if (df()) return null;
		Fd(e, t, !0);
	}
	function Nf() {
		bp(function() {
			W & 6 ? qe($e, Of) : kf();
		});
	}
	function Pf() {
		if (Tf === 0) {
			var e = Ua;
			e === 0 && (e = st, st <<= 1, !(st & 261888) && (st = 256)), Tf = e;
		}
		return Tf;
	}
	function Ff(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Sn(e);
	}
	function If(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Ff((i[Ot] || null).action), o = r.submitter;
			o && (t = (t = o[Ot] || null) ? Ff(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Wn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Tf !== 0) {
								var e = new FormData(i, o);
								rc(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), rc(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var Lf = 0; Lf < yi.length; Lf++) {
		var Rf = yi[Lf];
		bi(Rf.toLowerCase(), "on" + (Rf[0].toUpperCase() + Rf.slice(1)));
	}
	bi(di, "onAnimationEnd"), bi(fi, "onAnimationIteration"), bi(pi, "onAnimationStart"), bi("dblclick", "onDoubleClick"), bi("focusin", "onFocus"), bi("focusout", "onBlur"), bi(mi, "onTransitionRun"), bi(hi, "onTransitionStart"), bi(gi, "onTransitionCancel"), bi(_i, "onTransitionEnd"), Kt("onMouseEnter", ["mouseout", "mouseover"]), Kt("onMouseLeave", ["mouseout", "mouseover"]), Kt("onPointerEnter", ["pointerout", "pointerover"]), Kt("onPointerLeave", ["pointerout", "pointerover"]), Gt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Gt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Gt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Gt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Gt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Gt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var zf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Bf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zf));
	function Vf(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Ti(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Ti(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[At];
		n === void 0 && (n = t[At] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Gf(t, e, 2, !1), n.add(r));
	}
	function Hf(e, t, n) {
		var r = 0;
		t && (r |= 4), Gf(n, e, r, t);
	}
	var Uf = "_reactListening" + Math.random().toString(36).slice(2);
	function Wf(e) {
		if (!e[Uf]) {
			e[Uf] = !0, Ut.forEach(function(t) {
				t !== "selectionchange" && (Bf.has(t) || Hf(t, !1, e), Hf(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Uf] || (t[Uf] = !0, Hf("selectionchange", !1, t));
		}
	}
	function Gf(e, t, n, r) {
		switch (Ch(t)) {
			case 2:
				var i = _h;
				break;
			case 8:
				i = vh;
				break;
			default: i = yh;
		}
		n = i.bind(null, t, n, e), i = void 0, !Nn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Kf(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = Lt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		An(function() {
			var r = a, i = Tn(n), s = [];
			a: {
				var c = vi.get(e);
				if (c !== void 0) {
					var l = Wn, u = e;
					switch (e) {
						case "keypress": if (zn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = cr;
							break;
						case "focusin":
							u = "focus", l = $n;
							break;
						case "focusout":
							u = "blur", l = $n;
							break;
						case "beforeblur":
						case "afterblur":
							l = $n;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Zn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Qn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = dr;
							break;
						case di:
						case fi:
						case pi:
							l = er;
							break;
						case _i:
							l = fr;
							break;
						case "scroll":
						case "scrollend":
							l = Kn;
							break;
						case "wheel":
							l = pr;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = tr;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = lr;
							break;
						case "submit":
							l = ur;
							break;
						case "toggle":
						case "beforetoggle": l = mr;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = jn(m, p), g != null && d.push(qf(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== wn && (u = n.relatedTarget || n.fromElement) && (Lt(u) || u[kt])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Lt(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Zn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = lr, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : zt(c), h = l == null ? u : zt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, Lt(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? ie(c, l, Yf) : null, c !== null && Xf(s, u, c, d, !1), l !== null && f !== null && Xf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? zt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = Pr;
					else if (Or(c)) {
						if (Fr) _ = Wr;
						else {
							_ = Hr;
							var v = Vr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && yn(r.elementType) && (_ = Pr) : _ = Ur;
					if (_ &&= _(e, r)) {
						kr(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? zt(r) : window, e) {
					case "focusin":
						(Or(v) || v.contentEditable === "true") && (ti = v, ni = r, ri = null);
						break;
					case "focusout":
						ri = ni = ti = null;
						break;
					case "mousedown":
						ii = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						ii = !1, ai(s, n, i);
						break;
					case "selectionchange": if (ei) break;
					case "keydown":
					case "keyup": ai(s, n, i);
				}
				var y;
				if (gr) b: {
					switch (e) {
						case "compositionstart":
							var b = "onCompositionStart";
							break b;
						case "compositionend":
							b = "onCompositionEnd";
							break b;
						case "compositionupdate":
							b = "onCompositionUpdate";
							break b;
					}
					b = void 0;
				}
				else wr ? Sr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (yr && n.locale !== "ko" && (wr || b !== "onCompositionStart" ? b === "onCompositionEnd" && wr && (y = Rn()) : (Fn = i, In = "value" in Fn ? Fn.value : Fn.textContent, wr = !0)), v = Jf(r, b), 0 < v.length && (b = new nr(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = Cr(n), y !== null && (b.data = y)))), (y = vr ? Tr(e, n) : Er(e, n)) && (b = Jf(r, "onBeforeInput"), 0 < b.length && (v = new nr("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), If(s, e, r, n, i);
			}
			Vf(s, t);
		});
	}
	function qf(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Jf(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = jn(e, n), i != null && r.unshift(qf(e, i, a)), i = jn(e, t), i != null && r.push(qf(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Yf(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Xf(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = jn(n, a), l != null && o.unshift(qf(n, l, c))) : i || (l = jn(n, a), l != null && o.push(qf(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Zf = /\r\n?/g, Qf = /\u0000|\uFFFD/g;
	function $f(e) {
		return (typeof e == "string" ? e : "" + e).replace(Zf, "\n").replace(Qf, "");
	}
	function ep(e, t) {
		return t = $f(t), $f(e) === t;
	}
	function $(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || hn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && hn(e, "" + r);
				else return;
				break;
			case "className":
				$t(e, "class", r);
				break;
			case "tabIndex":
				$t(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				$t(e, n, r);
				break;
			case "style":
				vn(e, r, o);
				return;
			case "data": if (t !== "object") {
				$t(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Sn(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", a.name, a, null), $(e, t, "formEncType", a.formEncType, a, null), $(e, t, "formMethod", a.formMethod, a, null), $(e, t, "formTarget", a.formTarget, a, null)) : ($(e, t, "encType", a.encType, a, null), $(e, t, "method", a.method, a, null), $(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Sn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Cn);
				return;
			case "onScroll":
				r != null && Q("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = Sn(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "credentialless":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), Qt(e, "popover", r);
				break;
			case "xlinkActuate":
				en(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				en(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				en(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				en(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				en(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				en(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				en(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				en(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				en(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Qt(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = bn.get(n) || n, Qt(e, n, r);
			else return;
		}
		P = !0;
	}
	function tp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				vn(e, r, o);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "children":
				if (typeof r == "string") hn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") hn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = Cn);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!Wt.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[Ot] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					P = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Qt(e, n, r);
				}
				return;
		}
		P = !0;
	}
	function np(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: $(e, t, o, s, n, null);
					}
				}
				a && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				un(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && fn(e, !!r, n, !0) : fn(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: $(e, t, s, c, n, null);
				}
				mn(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < zf.length; r++) Q(zf[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (yn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && tp(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	var rp = {};
	function ip(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (P = !0), o = m;
							break;
						case "name":
							m !== f && (P = !0), a = m;
							break;
						case "checked":
							m !== f && (P = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (P = !0), d = m;
							break;
						case "value":
							m !== f && (P = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (P = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				ln(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (P = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (P = !0), c = o;
						break;
					case "multiple": o !== l && (P = !0), s = o;
					default: o !== l && $(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? fn(e, !!n, n ? [] : "", !1) : fn(e, !!n, t, !0)) : fn(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (P = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (P = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && $(e, t, s, a, r, o);
				}
				pn(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (P = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (yn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && tp(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || tp(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function ap(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function op() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && ap(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && ap(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var sp = null, cp = null;
	function lp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function up(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function dp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function fp(e, t, n, r) {
		return n = lp(n).createElement(e), n[Dt] = r, n[Ot] = t, np(n, e, t), Vt(n), n;
	}
	function pp(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var mp = null;
	function hp() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== mp && (mp = e, !0) : (mp = null, !1);
	}
	var gp = typeof setTimeout == "function" ? setTimeout : void 0, _p = typeof clearTimeout == "function" ? clearTimeout : void 0, vp = typeof Promise == "function" ? Promise : void 0, yp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : gp, bp = typeof queueMicrotask == "function" ? queueMicrotask : vp === void 0 ? gp : function(e) {
		return vp.resolve(null).then(e).catch(xp);
	};
	function xp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Sp(e) {
		return e === "head";
	}
	function Cp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Hh(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") _m(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, _m(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[Pt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && _m(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Hh(t);
	}
	function wp(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function Tp(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Ep(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function Dp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function Op(e) {
		return Dp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function kp(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return Dp(t, n, e);
	}
	function Ap(e) {
		return e.documentElement.clientHeight;
	}
	function jp(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Mp(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Ap(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += Xm(f), u > $m) {
									s.length = o;
									break;
								}
								f = new Promise(jp.bind(f)), s.push(f);
							}
						}
					}
					if (0 < s.length) return t = Promise.race([Promise.all(s), new Promise(function(e) {
						return setTimeout(e, 500);
					})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
					if (i(), n) return n.finished.then(a, a);
					a();
				},
				types: n
			});
			l.__reactViewTransition = u;
			var d = [];
			return u.ready.then(function() {
				for (var e = l.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
					var n = e[t], r = n.effect, i = r.pseudoElement;
					if (i != null && i.startsWith("::view-transition")) {
						d.push(n), n = r.getKeyframes();
						for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
							var u = n[c], f = u.width;
							if (i === void 0) i = f;
							else if (i !== f) {
								s = !1;
								break;
							}
							if (f = u.height, a === void 0) a = f;
							else if (a !== f) {
								s = !1;
								break;
							}
							delete u.width, delete u.height, u.transform === "none" && delete u.transform;
						}
						s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
					}
				}
				o();
			}, function(e) {
				l.__reactViewTransition === u && (l.__reactViewTransition = null);
				try {
					if (typeof e == "object" && e) switch (e.name) {
						case "InvalidStateError": (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") && (e = null);
					}
					e !== null && c(e);
				} finally {
					r(), i(), o();
				}
			}), u.finished.finally(function() {
				for (var e = 0; e < d.length; e++) d[e].cancel();
				l.__reactViewTransition === u && (l.__reactViewTransition = null), s();
			}), u;
		} catch {
			return r(), i(), o(), null;
		}
	}
	function Np(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Np.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : S({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Np.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Np.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Pp(e) {
		return {
			name: e,
			group: new Np("group", e),
			imagePair: new Np("image-pair", e),
			old: new Np("old", e),
			new: new Np("new", e)
		};
	}
	function Fp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Fp.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (Bp(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = Rp(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), h(this._fragmentFiber.child, !1, Ip, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Ip(e, t, n, r) {
		return b(e).addEventListener(t, n, r), !1;
	}
	Fp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Bp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Rp(i.optionsOrUseCapture), h(this._fragmentFiber.child, !1, Lp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Lp(e, t, n, r) {
		return b(e).removeEventListener(t, n, r), !1;
	}
	function Rp(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function zp(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function Bp(e, t, n, r) {
		if (e.length === 0) return -1;
		r = zp(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && zp(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Fp.prototype.dispatchEvent = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return !0;
		t = b(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Fp.prototype.focus = function(e) {
		h(this._fragmentFiber.child, !0, Vp, e, void 0, void 0);
	};
	function Vp(e, t) {
		return e.tag !== 6 && (e = b(e), pm(e, t));
	}
	Fp.prototype.focusLast = function(e) {
		var t = [];
		h(this._fragmentFiber.child, !0, Hp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Vp(t[n], e); n--);
	};
	function Hp(e, t) {
		return t.push(e), !1;
	}
	Fp.prototype.blur = function() {
		var e = g(this._fragmentFiber);
		e !== null && (e = b(e), e = lp(e).activeElement, e !== null && h(this._fragmentFiber.child, !1, Up, e, void 0, void 0));
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = b(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Fp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), h(this._fragmentFiber.child, !1, Wp, e, void 0, void 0);
	};
	function Wp(e, t) {
		return e.tag === 6 || (e = b(e), t.observe(e)), !1;
	}
	Fp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), h(this._fragmentFiber.child, !1, Gp, e, void 0, void 0);
			for (var n = t = 0; n < Kp.length; n++) {
				var r = Kp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : Kp[t++] = r;
			}
			Kp.length = t;
		}
	};
	function Gp(e, t) {
		return e.tag === 6 || (e = b(e), t.unobserve(e)), !1;
	}
	var Kp = [], qp = !1;
	function Jp(e, t, n) {
		Kp.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), qp || (qp = !0, mm(function() {
			qp = !1;
			var e = Kp;
			Kp = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Fp.prototype.getClientRects = function() {
		var e = [];
		return h(this._fragmentFiber.child, !1, Yp, e, void 0, void 0), e;
	};
	function Yp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = b(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Fp.prototype.getRootNode = function(e) {
		var t = g(this._fragmentFiber);
		return t === null ? this : b(t).getRootNode(e);
	}, Fp.prototype.compareDocumentPosition = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		h(this._fragmentFiber.child, !1, Hp, n, void 0, void 0);
		var r = b(t);
		if (n.length === 0) {
			if (n = r, _(this._fragmentFiber)) {
				a: {
					for (t = this._fragmentFiber.return; t !== null;) {
						if (t.tag === 4) {
							t = t.stateNode.containerInfo;
							break a;
						}
						if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
						t = t.return;
					}
					t = null;
				}
				t != null && (n = t);
			}
			t = this._fragmentFiber;
			var i = r = n.compareDocumentPosition(e);
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = v(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = b(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = b(n[0]), i = b(n[n.length - 1]);
		var a = _(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Xp(e, t, n, r, i) {
		var a = Lt(i);
		if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
			if (n = !!a) a: {
				for (; a !== null;) {
					if (a.tag === 7 && (a === t || a.alternate === t)) {
						n = !0;
						break a;
					}
					a = a.return;
				}
				n = !1;
			}
			return n;
		}
		if (e & Node.DOCUMENT_POSITION_CONTAINS) {
			if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
			a: {
				for (a = t, t = g(t); a !== null;) {
					if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
						a = !0;
						break a;
					}
					a = a.return;
				}
				a = !1;
			}
			return a;
		}
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = ie(n, a, x), t === null ? t = !1 : (h(t, !0, ne, a, n), a = ee, ee = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = ie(r, a, x), t === null ? t = !1 : (h(t, !0, re, a, r), a = ee, te = ee = null, t = a !== null)), t) : !1;
	}
	function Zp(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Fp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		h(this._fragmentFiber.child, !1, Hp, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = v(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || g(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = b(r), Zp(e, n);
				return;
			}
			if (r = b(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = b(a), Zp(a, n)) : b(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function Qp(e, t) {
		return e = b(e), $p(e, t), !1;
	}
	function $p(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function em(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < Kp.length; i++) {
				var a = Kp[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (Kp[r++] = a);
			}
			Kp.length = r, n.observe(e);
		}), $p(e, t));
	}
	function tm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? Jp(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function nm(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					nm(n), It(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function rm(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[Pt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = lm(e.nextSibling), e === null) break;
		}
		return null;
	}
	function im(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function am(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function om(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function sm(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function cm(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function lm(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var um = null;
	function dm(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return lm(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function fm(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function pm(e, t) {
		function n() {
			r = !0;
		}
		if (e.ownerDocument.activeElement === e) return !0;
		var r = !1;
		try {
			e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
		} finally {
			e.ownerDocument.removeEventListener("focus", n, !0);
		}
		return r;
	}
	function mm(e) {
		yp(function() {
			yp(function(t) {
				return e(t);
			});
		});
	}
	function hm(e, t, n) {
		switch (t = lp(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function gm(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && $(e, t, r, null, rp, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === Cn && (e.onclick = null), It(e);
	}
	function _m(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		It(e);
	}
	var vm = /* @__PURE__ */ new Map(), ym = /* @__PURE__ */ new Set();
	function bm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var xm = T.d;
	T.d = {
		f: Sm,
		r: Cm,
		D: Em,
		C: Dm,
		L: Om,
		m: km,
		X: jm,
		S: Am,
		M: Mm
	};
	function Sm() {
		var e = xm.f(), t = zd();
		return e || t;
	}
	function Cm(e) {
		var t = Rt(e);
		t !== null && t.tag === 5 && t.type === "form" ? ac(t) : xm.r(e);
	}
	var wm = typeof document > "u" ? null : document;
	function Tm(e, t, n) {
		var r = wm;
		if (r && typeof t == "string" && t) {
			var i = cn(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), ym.has(i) || (ym.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), np(t, "link", e), Vt(t), r.head.appendChild(t)));
		}
	}
	function Em(e) {
		xm.D(e), Tm("dns-prefetch", e, null);
	}
	function Dm(e, t) {
		xm.C(e, t), Tm("preconnect", e, t);
	}
	function Om(e, t, n) {
		xm.L(e, t, n);
		var r = wm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + cn(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + cn(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + cn(n.imageSizes) + "\"]")) : i += "[href=\"" + cn(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Pm(e);
					break;
				case "script": a = Rm(e);
			}
			if (!(vm.has(a) || (e = S({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), vm.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Fm(a)) || t === "script" && r.querySelector(zm(a))))) {
				var o = r.createElement("link");
				np(o, "link", e), t === "style" && (o[Ft] = !0, o.onload = o.onerror = function() {
					Ht(o);
				}), Vt(o), r.head.appendChild(o);
			}
		}
	}
	function km(e, t) {
		xm.m(e, t);
		var n = wm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + cn(r) + "\"][href=\"" + cn(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Rm(e);
			}
			if (!vm.has(a) && (e = S({
				rel: "modulepreload",
				href: e
			}, t), vm.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(zm(a))) return;
				}
				r = n.createElement("link"), np(r, "link", e), Vt(r), n.head.appendChild(r);
			}
		}
	}
	function Am(e, t, n) {
		xm.S(e, t, n);
		var r = wm;
		if (r && e) {
			var i = Bt(r).hoistableStyles, a = Pm(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Fm(a))) s.loading = 5;
				else {
					e = S({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = vm.get(a)) && Hm(e, n);
					var c = o = r.createElement("link");
					Vt(c), np(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Vm(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function jm(e, t) {
		xm.X(e, t);
		var n = wm;
		if (n && e) {
			var r = Bt(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = S({
				src: e,
				async: !0
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), Vt(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Mm(e, t) {
		xm.M(e, t);
		var n = wm;
		if (n && e) {
			var r = Bt(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = S({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), Vt(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nm(e, t, n, r) {
		var a = (a = Ne.current) ? bm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Pm(n.href), t = Bt(a).hoistableStyles, r = t.get(n), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Pm(n.href);
					var o = Bt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Fm(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = vm.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, vm.set(e, o)), Lm(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Rm(n), t = Bt(a).hoistableScripts, r = t.get(n), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Pm(e) {
		return "href=\"" + cn(e) + "\"";
	}
	function Fm(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Im(e) {
		return S({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Lm(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[Ft]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[Ft] = !0, t.onload = t.onerror = Ht.bind(null, t), np(t, "link", n), Vt(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function Rm(e) {
		return "[src=\"" + cn(e) + "\"]";
	}
	function zm(e) {
		return "script[async]" + e;
	}
	function Bm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + cn(n.href) + "\"]");
				if (r) return t.instance = r, Vt(r), r;
				var a = S({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Vt(r), np(r, "style", a), Vm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Pm(n.href);
				var o = e.querySelector(Fm(a));
				if (o) return t.state.loading |= 4, t.instance = o, Vt(o), o;
				r = Im(n), (a = vm.get(a)) && Hm(r, a), o = (e.ownerDocument || e).createElement("link"), Vt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), np(o, "link", r), t.state.loading |= 4, Vm(o, n.precedence, e), t.instance = o;
			case "script": return o = Rm(n.src), (a = e.querySelector(zm(o))) ? (t.instance = a, Vt(a), a) : (r = n, (a = vm.get(o)) && (r = S({}, n), Um(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Vt(a), np(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Vm(r, n.precedence, e));
		return t.instance;
	}
	function Vm(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Hm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Um(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Wm = null;
	function Gm(e, t, n) {
		if (Wm === null) {
			var r = /* @__PURE__ */ new Map(), i = Wm = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Wm, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[Pt] || a[Dt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Km(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function qm(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Jm(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function Ym(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Xm(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function Zm(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Xm(t), e.suspenseyImages.push(t)), e = rh.bind(e), t.decode().then(e, e));
	}
	function Qm(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Pm(r.href), a = t.querySelector(Fm(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = nh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Vt(a);
					return;
				}
				a = t.ownerDocument || t, r = Im(r), (i = vm.get(i)) && Hm(r, i), a = a.createElement("link"), Vt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), np(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = nh.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var $m = 0;
	function eh(e, t) {
		return e.stylesheets && e.count === 0 && ah(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && ah(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && $m === 0 && ($m = 62500 * op());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ah(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > $m ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function th(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) ah(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function nh() {
		this.count--, th(this);
	}
	function rh() {
		this.imgCount--, th(this);
	}
	var ih = null;
	function ah(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ih = /* @__PURE__ */ new Map(), t.forEach(oh, e), ih = null, nh.call(e));
	}
	function oh(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ih.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ih.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = nh.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var sh = {
		$$typeof: de,
		Provider: null,
		Consumer: null,
		_currentValue: De,
		_currentValue2: De,
		_threadCount: 0
	};
	function ch(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = gt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = gt(0), this.hiddenUpdates = gt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function lh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ch(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Li(3, null, null, t), e.current = a, a.stateNode = e, t = Ia(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, yo(a), e;
	}
	function uh(e) {
		return e ? (e = Fi, e) : Fi;
	}
	function dh(e, t, n, r, i, a) {
		i = uh(i), r.context === null ? r.context = i : r.pendingContext = i, r = xo(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = So(e, r, t), n !== null && (Pd(n, e, t), Co(n, e, t));
	}
	function fh(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ph(e, t) {
		fh(e, t), (e = e.alternate) && fh(e, t);
	}
	function mh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Mi(e, 67108864);
			t !== null && Pd(t, e, 67108864), ph(e, 67108864);
		}
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = jd();
			t = St(t);
			var n = Mi(e, t);
			n !== null && Pd(n, e, t), ph(e, t);
		}
	}
	var gh = !0;
	function _h(e, t, n, r) {
		var i = w.T;
		w.T = null;
		var a = T.p;
		try {
			T.p = 2, yh(e, t, n, r);
		} finally {
			T.p = a, w.T = i;
		}
	}
	function vh(e, t, n, r) {
		var i = w.T;
		w.T = null;
		var a = T.p;
		try {
			T.p = 8, yh(e, t, n, r);
		} finally {
			T.p = a, w.T = i;
		}
	}
	function yh(e, t, n, r) {
		if (gh) {
			var i = bh(r);
			if (i === null) Kf(e, t, r, xh, n), Mh(e, r);
			else if (Ph(i, e, t, n, r)) r.stopPropagation();
			else if (Mh(e, r), t & 4 && -1 < jh.indexOf(e)) {
				for (; i !== null;) {
					var a = Rt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = ut(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - at(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									Ef(a), !(W & 6) && (_d = Ze() + 500, Df(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Mi(a, 2), s !== null && Pd(s, a, 2), zd(), ph(a, 2);
					}
					if (a = bh(r), a === null && Kf(e, t, r, xh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Kf(e, t, r, null, n);
		}
	}
	function bh(e) {
		return e = Tn(e), Sh(e);
	}
	var xh = null;
	function Sh(e) {
		if (xh = null, e = Lt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return xh = e, null;
	}
	function Ch(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "fullscreenerror":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "resize":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Qe()) {
				case $e: return 2;
				case et: return 8;
				case O:
				case tt: return 32;
				case nt: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var wh = !1, Th = null, Eh = null, Dh = null, Oh = /* @__PURE__ */ new Map(), kh = /* @__PURE__ */ new Map(), Ah = [], jh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Mh(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Th = null;
				break;
			case "dragenter":
			case "dragleave":
				Eh = null;
				break;
			case "mouseover":
			case "mouseout":
				Dh = null;
				break;
			case "pointerover":
			case "pointerout":
				Oh.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": kh.delete(t.pointerId);
		}
	}
	function Nh(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Rt(t), t !== null && mh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ph(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Th = Nh(Th, e, t, n, r, i), !0;
			case "dragenter": return Eh = Nh(Eh, e, t, n, r, i), !0;
			case "mouseover": return Dh = Nh(Dh, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Oh.set(a, Nh(Oh.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, kh.set(a, Nh(kh.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Fh(e) {
		var t = Lt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, Tt(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Tt(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Ih(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = bh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				wn = r, n.target.dispatchEvent(r), wn = null;
			} else return t = Rt(n), t !== null && mh(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Lh(e, t, n) {
		Ih(e) && n.delete(t);
	}
	function Rh() {
		wh = !1, Th !== null && Ih(Th) && (Th = null), Eh !== null && Ih(Eh) && (Eh = null), Dh !== null && Ih(Dh) && (Dh = null), Oh.forEach(Lh), kh.forEach(Lh);
	}
	function zh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, wh || (wh = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Rh)));
	}
	var Bh = null;
	function Vh(e) {
		Bh !== e && (Bh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Bh === e && (Bh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Sh(r || n) === null) continue;
					break;
				}
				var a = Rt(n);
				a !== null && (e.splice(t, 3), t -= 3, rc(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Hh(e) {
		function t(t) {
			return zh(t, e);
		}
		Th !== null && zh(Th, e), Eh !== null && zh(Eh, e), Dh !== null && zh(Dh, e), Oh.forEach(t), kh.forEach(t);
		for (var n = 0; n < Ah.length; n++) {
			var r = Ah[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Ah.length && (n = Ah[0], n.blockedOn === null);) Fh(n), n.blockedOn === null && Ah.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[Ot] || null;
			if (typeof a == "function") o || Vh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Ot] || null) s = o.formAction;
					else if (Sh(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Vh(n);
			}
		}
	}
	function Uh() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Wh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.render = Wh.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		dh(n, jd(), e, t, null, null);
	}, Gh.prototype.unmount = Wh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			dh(e.current, 2, null, e, null, null), zd(), t[kt] = null;
		}
	};
	function Gh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = wt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Ah.length && t !== 0 && t < Ah[n].priority; n++);
			Ah.splice(n, 0, e), n === 0 && Fh(e);
		}
	};
	var Kh = n.version;
	if (Kh !== "19.3.1") throw Error(i(527, Kh, "19.3.1"));
	T.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var qh = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: w,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Jh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Jh.isDisabled && Jh.supportsFiber) try {
			A = Jh.inject(qh), it = Jh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Ec, s = Dc, c = Oc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = lh(e, 1, !1, null, null, n, r, null, o, s, c, Uh), e[kt] = t.current, Wf(e), new Wh(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})), _ = /* @__PURE__ */ c(u(), 1), v = {
	color: void 0,
	size: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
}, y = _.createContext && /*#__PURE__*/ _.createContext(v), b = [
	"attr",
	"size",
	"title"
];
function ee(e, t) {
	if (e == null) return {};
	var n, r, i = te(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function te(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function ne() {
	return ne = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ne.apply(null, arguments);
}
function re(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function x(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? re(Object(n), !0).forEach(function(t) {
			ie(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : re(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ie(e, t, n) {
	return (t = S(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function S(e) {
	var t = ae(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ae(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function oe(e) {
	return e && e.map((e, t) => /*#__PURE__*/ _.createElement(e.tag, x({ key: t }, e.attr), oe(e.child)));
}
function C(e) {
	return (t) => /*#__PURE__*/ _.createElement(se, ne({ attr: x({}, e.attr) }, t), oe(e.child));
}
function se(e) {
	var t = (t) => {
		var n = e.attr, r = e.size, i = e.title, a = ee(e, b), o = r || t.size || "1em", s;
		return t.className && (s = t.className), e.className && (s = (s ? s + " " : "") + e.className), /*#__PURE__*/ _.createElement("svg", ne({
			stroke: "currentColor",
			fill: "currentColor",
			strokeWidth: "0"
		}, t.attr, n, a, {
			className: s,
			style: x(x({ color: e.color || t.color }, t.style), e.style),
			height: o,
			width: o,
			xmlns: "http://www.w3.org/2000/svg"
		}), i && /*#__PURE__*/ _.createElement("title", null, i), e.children);
	};
	return y === void 0 ? t(v) : /*#__PURE__*/ _.createElement(y.Consumer, null, (e) => t(e));
}
// node_modules/react-icons/lu/index.mjs
var ce = g();
function le(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [
			{
				tag: "circle",
				attr: {
					cx: "11",
					cy: "11",
					r: "8"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "21",
					x2: "16.65",
					y1: "21",
					y2: "16.65"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "8",
					x2: "14",
					y1: "11",
					y2: "11"
				},
				child: []
			}
		]
	})(e);
}
function ue(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [
			{
				tag: "circle",
				attr: {
					cx: "11",
					cy: "11",
					r: "8"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "21",
					x2: "16.65",
					y1: "21",
					y2: "16.65"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "11",
					x2: "11",
					y1: "8",
					y2: "14"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "8",
					x2: "14",
					y1: "11",
					y2: "11"
				},
				child: []
			}
		]
	})(e);
}
function de(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "path",
			attr: { d: "M18 6 6 18" },
			child: []
		}, {
			tag: "path",
			attr: { d: "m6 6 12 12" },
			child: []
		}]
	})(e);
}
function fe(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "polyline",
			attr: { points: "22 7 13.5 15.5 8.5 10.5 2 17" },
			child: []
		}, {
			tag: "polyline",
			attr: { points: "16 7 22 7 22 13" },
			child: []
		}]
	})(e);
}
function pe(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [
			{
				tag: "circle",
				attr: {
					cx: "12",
					cy: "12",
					r: "4"
				},
				child: []
			},
			{
				tag: "path",
				attr: { d: "M12 2v2" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "M12 20v2" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "m4.93 4.93 1.41 1.41" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "m17.66 17.66 1.41 1.41" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "M2 12h2" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "M20 12h2" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "m6.34 17.66-1.41 1.41" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "m19.07 4.93-1.41 1.41" },
				child: []
			}
		]
	})(e);
}
function me(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [
			{
				tag: "line",
				attr: {
					x1: "21",
					x2: "14",
					y1: "4",
					y2: "4"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "10",
					x2: "3",
					y1: "4",
					y2: "4"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "21",
					x2: "12",
					y1: "12",
					y2: "12"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "8",
					x2: "3",
					y1: "12",
					y2: "12"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "21",
					x2: "16",
					y1: "20",
					y2: "20"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "12",
					x2: "3",
					y1: "20",
					y2: "20"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "14",
					x2: "14",
					y1: "2",
					y2: "6"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "8",
					x2: "8",
					y1: "10",
					y2: "14"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "16",
					x2: "16",
					y1: "18",
					y2: "22"
				},
				child: []
			}
		]
	})(e);
}
function he(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [
			{
				tag: "circle",
				attr: {
					cx: "18",
					cy: "5",
					r: "3"
				},
				child: []
			},
			{
				tag: "circle",
				attr: {
					cx: "6",
					cy: "12",
					r: "3"
				},
				child: []
			},
			{
				tag: "circle",
				attr: {
					cx: "18",
					cy: "19",
					r: "3"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "8.59",
					x2: "15.42",
					y1: "13.51",
					y2: "17.49"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "15.41",
					x2: "8.59",
					y1: "6.51",
					y2: "10.49"
				},
				child: []
			}
		]
	})(e);
}
function ge(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "circle",
			attr: {
				cx: "11",
				cy: "11",
				r: "8"
			},
			child: []
		}, {
			tag: "path",
			attr: { d: "m21 21-4.3-4.3" },
			child: []
		}]
	})(e);
}
function _e(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "path",
			attr: { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" },
			child: []
		}, {
			tag: "path",
			attr: { d: "M3 3v5h5" },
			child: []
		}]
	})(e);
}
function ve(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "polygon",
			attr: { points: "3 11 22 2 13 21 11 13 3 11" },
			child: []
		}]
	})(e);
}
function ye(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [
			{
				tag: "path",
				attr: { d: "M8 3v3a2 2 0 0 1-2 2H3" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "M21 8h-3a2 2 0 0 1-2-2V3" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "M3 16h3a2 2 0 0 1 2 2v3" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "M16 21v-3a2 2 0 0 1 2-2h3" },
				child: []
			}
		]
	})(e);
}
function be(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [
			{
				tag: "path",
				attr: { d: "M8 3H5a2 2 0 0 0-2 2v3" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "M21 8V5a2 2 0 0 0-2-2h-3" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "M3 16v3a2 2 0 0 0 2 2h3" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "M16 21h3a2 2 0 0 0 2-2v-3" },
				child: []
			}
		]
	})(e);
}
function xe(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [
			{
				tag: "polyline",
				attr: { points: "15 3 21 3 21 9" },
				child: []
			},
			{
				tag: "polyline",
				attr: { points: "9 21 3 21 3 15" },
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "21",
					x2: "14",
					y1: "3",
					y2: "10"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "3",
					x2: "10",
					y1: "21",
					y2: "14"
				},
				child: []
			}
		]
	})(e);
}
function Se(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "path",
			attr: { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" },
			child: []
		}, {
			tag: "circle",
			attr: {
				cx: "12",
				cy: "10",
				r: "3"
			},
			child: []
		}]
	})(e);
}
function Ce(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [
			{
				tag: "line",
				attr: {
					x1: "2",
					x2: "5",
					y1: "12",
					y2: "12"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "19",
					x2: "22",
					y1: "12",
					y2: "12"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "12",
					x2: "12",
					y1: "2",
					y2: "5"
				},
				child: []
			},
			{
				tag: "line",
				attr: {
					x1: "12",
					x2: "12",
					y1: "19",
					y2: "22"
				},
				child: []
			},
			{
				tag: "circle",
				attr: {
					cx: "12",
					cy: "12",
					r: "7"
				},
				child: []
			},
			{
				tag: "circle",
				attr: {
					cx: "12",
					cy: "12",
					r: "3"
				},
				child: []
			}
		]
	})(e);
}
function we(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [
			{
				tag: "circle",
				attr: {
					cx: "18",
					cy: "18",
					r: "3"
				},
				child: []
			},
			{
				tag: "circle",
				attr: {
					cx: "6",
					cy: "6",
					r: "3"
				},
				child: []
			},
			{
				tag: "path",
				attr: { d: "M13 6h3a2 2 0 0 1 2 2v7" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "M11 18H8a2 2 0 0 1-2-2V9" },
				child: []
			}
		]
	})(e);
}
function Te(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [
			{
				tag: "path",
				attr: { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "M14 2v4a2 2 0 0 0 2 2h4" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "M12 18v-6" },
				child: []
			},
			{
				tag: "path",
				attr: { d: "m9 15 3 3 3-3" },
				child: []
			}
		]
	})(e);
}
function Ee(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "rect",
			attr: {
				width: "14",
				height: "14",
				x: "8",
				y: "8",
				rx: "2",
				ry: "2"
			},
			child: []
		}, {
			tag: "path",
			attr: { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" },
			child: []
		}]
	})(e);
}
function w(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "path",
			attr: { d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" },
			child: []
		}, {
			tag: "circle",
			attr: {
				cx: "12",
				cy: "12",
				r: "10"
			},
			child: []
		}]
	})(e);
}
function T(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "circle",
			attr: {
				cx: "12",
				cy: "12",
				r: "10"
			},
			child: []
		}, {
			tag: "path",
			attr: { d: "m9 12 2 2 4-4" },
			child: []
		}]
	})(e);
}
function De(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "path",
			attr: { d: "m18 15-6-6-6 6" },
			child: []
		}]
	})(e);
}
function Oe(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "path",
			attr: { d: "m6 9 6 6 6-6" },
			child: []
		}]
	})(e);
}
function ke(e) {
	return C({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "path",
			attr: { d: "M20 6 9 17l-5-5" },
			child: []
		}]
	})(e);
}
// src/data/realLotsData.ts
var Ae = [
	{
		id: "F-1",
		codigoCatastral: "F1",
		sector: "Manzana F",
		numero: 1,
		label: "F-1",
		frente: 25.88,
		fondo: 24.14,
		areaM2: 336.86,
		areaV2: 481.98,
		orientacion: "Este",
		latitud: 14.54368,
		longitud: -91.67426,
		altitud: 240,
		precioGTQ: 247592.1,
		precioM2: 735,
		enganche10: 24759.210000000003,
		aFinanciar: 222832.89,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Este: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "186.5,337.5 292.0,337.5 292.0,435.9 228.0,386.5",
		centerX: 249.6,
		centerY: 374.4,
		irregular: !0,
		notasVendedor: "Lote esquinero triangular/curvo (Norte: 25.88m, Este: 24.14m, Calle: tramos de 15.51m y 20.00m)",
		cuotasNiveladas: {
			12: 20429.317773086485,
			24: 11124.709200360001,
			36: 8055.942769687995,
			48: 6545.716054616844,
			60: 5658.490814547186,
			72: 5082.326002178979,
			84: 4683.46557868804,
			96: 4394.980800849782
		}
	},
	{
		id: "F-2",
		codigoCatastral: "F2",
		sector: "Manzana F",
		numero: 2,
		label: "F-2",
		frente: 11.24,
		fondo: 20,
		areaM2: 313.8,
		areaV2: 448.99,
		orientacion: "Este",
		latitud: 14.54529,
		longitud: -91.67539,
		altitud: 240,
		precioGTQ: 230643,
		precioM2: 735,
		enganche10: 23064.300000000003,
		aFinanciar: 207578.7,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Este: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "130.5,223.0 210.5,223.0 210.5,304.5 164.7,304.5 152.5,281.5",
		centerX: 173.7,
		centerY: 267.3,
		irregular: !0,
		notasVendedor: "Lote en esquina/curva (Norte: 19.64m, Sur: 11.24m, Calle: tramos de 15.41m y 6.30m)",
		cuotasNiveladas: {
			12: 19030.813742191232,
			24: 10363.159018800001,
			36: 7504.46725977585,
			48: 6097.624229468521,
			60: 5271.134648236381,
			72: 4734.411623474926,
			84: 4362.855484748285,
			96: 4094.119145362054
		}
	},
	{
		id: "F-3",
		codigoCatastral: "F3",
		sector: "Manzana F",
		numero: 3,
		label: "F-3",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Este",
		latitud: 14.54534,
		longitud: -91.67454,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "reservado",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Este: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "210.5,223.0 251.2,223.0 251.2,304.5 210.5,304.5",
		centerX: 230.8,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "F-4",
		codigoCatastral: "F4",
		sector: "Manzana F",
		numero: 4,
		label: "F-4",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Este",
		latitud: 14.54534,
		longitud: -91.67393,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Este: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "251.2,223.0 292.0,223.0 292.0,304.5 251.2,304.5",
		centerX: 271.6,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "F-5",
		codigoCatastral: "F5",
		sector: "Manzana F",
		numero: 5,
		label: "F-5",
		frente: 16.84,
		fondo: 20,
		areaM2: 264.79,
		areaV2: 378.86,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.67586,
		altitud: 240,
		precioGTQ: 194620.65000000002,
		precioM2: 735,
		enganche10: 19462.065000000002,
		aFinanciar: 175158.58500000002,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "101.1,141.5 169.8,141.5 169.8,223.0 130.5,223.0",
		centerX: 142.8,
		centerY: 182.2,
		irregular: !0,
		notasVendedor: "Lote perimetral trapezoidal (Norte: 16.84m, Sur: 9.64m, Diag. Calle: 21.26m, Este: 20.00m)",
		cuotasNiveladas: {
			12: 16058.537829174049,
			24: 8744.617197540001,
			36: 6332.402440140368,
			48: 5145.283364311566,
			60: 4447.87681168423,
			72: 3994.9804135752893,
			84: 3681.4547603776236,
			96: 3454.6902756546156
		}
	},
	{
		id: "F-6",
		codigoCatastral: "F6",
		sector: "Manzana F",
		numero: 6,
		label: "F-6",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.67515,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "169.8,141.5 210.5,141.5 210.5,223.0 169.8,223.0",
		centerX: 190.2,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "F-7",
		codigoCatastral: "F7",
		sector: "Manzana F",
		numero: 7,
		label: "F-7",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.67454,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "reservado",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "210.5,141.5 251.2,141.5 251.2,223.0 210.5,223.0",
		centerX: 230.8,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "F-8",
		codigoCatastral: "F8",
		sector: "Manzana F",
		numero: 8,
		label: "F-8",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.67393,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "251.2,141.5 292.0,141.5 292.0,223.0 251.2,223.0",
		centerX: 271.6,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "F-9",
		codigoCatastral: "F9",
		sector: "Manzana F",
		numero: 9,
		label: "F-9",
		frente: 9.72,
		fondo: 20,
		areaM2: 266.57,
		areaV2: 381.41,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.67647,
		altitud: 240,
		precioGTQ: 195928.94999999998,
		precioM2: 735,
		enganche10: 19592.895,
		aFinanciar: 176336.055,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "60.0,27.0 129.0,27.0 129.0,108.5 89.4,108.5",
		centerX: 101.8,
		centerY: 67.8,
		irregular: !0,
		notasVendedor: "Lote perimetral trapezoidal (Norte: 16.93m, Sur: 9.72m, Diag. Calle: 21.26m, Este: 20.00m)",
		cuotasNiveladas: {
			12: 16166.488270414011,
			24: 8803.40120982,
			36: 6374.970801269752,
			48: 5179.8715450905775,
			60: 4477.7768106449075,
			72: 4021.8359033451593,
			84: 3706.2026340642133,
			96: 3477.9137685760443
		}
	},
	{
		id: "F-10",
		codigoCatastral: "F10",
		sector: "Manzana F",
		numero: 10,
		label: "F-10",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.67576,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "129.0,27.0 169.8,27.0 169.8,108.5 129.0,108.5",
		centerX: 149.4,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "F-11",
		codigoCatastral: "F11",
		sector: "Manzana F",
		numero: 11,
		label: "F-11",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.67515,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "169.8,27.0 210.5,27.0 210.5,108.5 169.8,108.5",
		centerX: 190.2,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "F-12",
		codigoCatastral: "F12",
		sector: "Manzana F",
		numero: 12,
		label: "F-12",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.67454,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "210.5,27.0 251.2,27.0 251.2,108.5 210.5,108.5",
		centerX: 230.8,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "F-13",
		codigoCatastral: "F13",
		sector: "Manzana F",
		numero: 13,
		label: "F-13",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.67393,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana F, Fase 2",
		points: "251.2,27.0 292.0,27.0 292.0,108.5 251.2,108.5",
		centerX: 271.6,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-1",
		codigoCatastral: "G1",
		sector: "Manzana G",
		numero: 1,
		label: "G-1",
		frente: 25.48,
		fondo: 26.22,
		areaM2: 366.54,
		areaV2: 524.45,
		orientacion: "Sur",
		latitud: 14.54246,
		longitud: -91.67251,
		altitud: 240,
		precioGTQ: 269406.9,
		precioM2: 735,
		enganche10: 26940.690000000002,
		aFinanciar: 242466.21000000002,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Sur: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "325.0,419.0 406.5,419.0 406.5,525.8 325.0,461.5",
		centerX: 365.8,
		centerY: 456.3,
		irregular: !0,
		notasVendedor: "Lote esquinero diagonal (Norte: 20.00m, Oeste: 10.43m, Este: 26.22m, Frente Calle: 25.48m)",
		cuotasNiveladas: {
			12: 22229.300411289914,
			24: 12104.883068040002,
			36: 8765.734319306055,
			48: 7122.444821763516,
			60: 6157.048100588155,
			72: 5530.118663060865,
			84: 5096.115517462194,
			96: 4782.212974955409
		}
	},
	{
		id: "G-2",
		codigoCatastral: "G2",
		sector: "Manzana G",
		numero: 2,
		label: "G-2",
		frente: 15.28,
		fondo: 35.69,
		areaM2: 371.49,
		areaV2: 531.53,
		orientacion: "Sur",
		latitud: 14.54207,
		longitud: -91.67154,
		altitud: 240,
		precioGTQ: 273045.15,
		precioM2: 735,
		enganche10: 27304.515000000003,
		aFinanciar: 245740.635,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Sur: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "406.5,419.0 455.4,419.0 455.4,564.4 406.5,525.8",
		centerX: 430.9,
		centerY: 482,
		irregular: !0,
		notasVendedor: "Lote profundo frente a curva (Norte: 12.00m, Oeste: 26.22m, Este: 35.69m, Frente Calle: 15.28m)",
		cuotasNiveladas: {
			12: 22529.499672041493,
			24: 12268.35546174,
			36: 8884.112626941142,
			48: 7218.6310548287465,
			60: 6240.1969741023995,
			72: 5604.80106438719,
			84: 5164.936851590632,
			96: 4846.795160326798
		}
	},
	{
		id: "G-3",
		codigoCatastral: "G3",
		sector: "Manzana G",
		numero: 3,
		label: "G-3",
		frente: 22.26,
		fondo: 15.73,
		areaM2: 362.1,
		areaV2: 518.09,
		orientacion: "Sur",
		latitud: 14.54096,
		longitud: -91.67057,
		altitud: 240,
		precioGTQ: 266143.5,
		precioM2: 735,
		enganche10: 26614.350000000002,
		aFinanciar: 239529.15,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Sur: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "455.4,500.5 536.9,500.5 536.9,562.5 525.0,568.5 510.0,575.5 495.5,582.0 476.0,579.5 465.0,571.5 455.4,564.6",
		centerX: 495.1,
		centerY: 556.1,
		irregular: !0,
		notasVendedor: "Lote en punta curva Sur (Norte: 20.00m, Oeste: 15.73m, Este: 15.22m, Curva: 6.36m + 4.77m + 11.13m)",
		cuotasNiveladas: {
			12: 21960.030771343037,
			24: 11958.253284600001,
			36: 8659.552564578824,
			48: 7036.16868543834,
			60: 6082.46608070871,
			72: 5463.130812174221,
			84: 5034.384866243957,
			96: 4724.284711713192
		}
	},
	{
		id: "G-4",
		codigoCatastral: "G4",
		sector: "Manzana G",
		numero: 4,
		label: "G-4",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Sur",
		latitud: 14.5421,
		longitud: -91.67056,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Sur: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "455.4,459.8 536.9,459.8 536.9,500.5 455.4,500.5",
		centerX: 496.1,
		centerY: 480.1,
		irregular: !1,
		notasVendedor: "Terreno regular orientación Este-Oeste (10.00m × 20.00m)",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-5",
		codigoCatastral: "G5",
		sector: "Manzana G",
		numero: 5,
		label: "G-5",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54271,
		longitud: -91.67056,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "455.4,419.0 536.9,419.0 536.9,459.8 455.4,459.8",
		centerX: 496.1,
		centerY: 439.4,
		irregular: !1,
		notasVendedor: "Terreno regular orientación Este-Oeste (10.00m × 20.00m)",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-6",
		codigoCatastral: "G6",
		sector: "Manzana G",
		numero: 6,
		label: "G-6",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Este",
		latitud: 14.54363,
		longitud: -91.67282,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Este: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "325.0,337.5 365.8,337.5 365.8,419.0 325.0,419.0",
		centerX: 345.4,
		centerY: 378.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-7",
		codigoCatastral: "G7",
		sector: "Manzana G",
		numero: 7,
		label: "G-7",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Este",
		latitud: 14.54363,
		longitud: -91.67221,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Este: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "365.8,337.5 406.5,337.5 406.5,419.0 365.8,419.0",
		centerX: 386.1,
		centerY: 378.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-8",
		codigoCatastral: "G8",
		sector: "Manzana G",
		numero: 8,
		label: "G-8",
		frente: 12,
		fondo: 20,
		areaM2: 240,
		areaV2: 343.39,
		orientacion: "Oeste",
		latitud: 14.54363,
		longitud: -91.67154,
		altitud: 240,
		precioGTQ: 159600,
		precioM2: 665,
		enganche10: 15960,
		aFinanciar: 143640,
		cuotaInicialPct: 10,
		estado: "reservado",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "406.5,337.5 455.4,337.5 455.4,419.0 406.5,419.0",
		centerX: 430.9,
		centerY: 378.2,
		irregular: !0,
		notasVendedor: "Terreno amplio (12.00m × 20.00m)",
		cuotasNiveladas: {
			12: 13168.914180156002,
			24: 7171.0833600000005,
			36: 5192.930089619999,
			48: 4219.424942544,
			60: 3647.511911736,
			72: 3276.1111115732892,
			84: 3019.0022474812854,
			96: 2833.042475166312
		}
	},
	{
		id: "G-9",
		codigoCatastral: "G9",
		sector: "Manzana G",
		numero: 9,
		label: "G-9",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54363,
		longitud: -91.67086,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "455.4,337.5 496.1,337.5 496.1,419.0 455.4,419.0",
		centerX: 475.8,
		centerY: 378.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-10",
		codigoCatastral: "G10",
		sector: "Manzana G",
		numero: 10,
		label: "G-10",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54363,
		longitud: -91.67025,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "496.1,337.5 536.9,337.5 536.9,419.0 496.1,419.0",
		centerX: 516.5,
		centerY: 378.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-11",
		codigoCatastral: "G11",
		sector: "Manzana G",
		numero: 11,
		label: "G-11",
		frente: 22.19,
		fondo: 21.11,
		areaM2: 322.99,
		areaV2: 462.13,
		orientacion: "Sur",
		latitud: 14.54181,
		longitud: -91.66884,
		altitud: 240,
		precioGTQ: 237397.65,
		precioM2: 735,
		enganche10: 23739.765,
		aFinanciar: 213657.885,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Sur: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "569.5,459.8 651.0,459.8 651.0,506.7 612.0,523.0 569.5,545.8",
		centerX: 610.6,
		centerY: 499,
		irregular: !0,
		notasVendedor: "Lote esquinero curvo (Norte: 20.00m, Oeste: 21.11m, Este: 11.53m, Calle curva: 12.32m + 9.87m)",
		cuotasNiveladas: {
			12: 19588.15337982902,
			24: 10666.656250740001,
			36: 7724.244360213517,
			48: 6276.200286411846,
			60: 5425.505991185049,
			72: 4873.064404927235,
			84: 4490.626810130173,
			96: 4214.020212748534
		}
	},
	{
		id: "G-12",
		codigoCatastral: "G12",
		sector: "Manzana G",
		numero: 12,
		label: "G-12",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54271,
		longitud: -91.66885,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "569.5,419.0 651.0,419.0 651.0,459.8 569.5,459.8",
		centerX: 610.2,
		centerY: 439.4,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-13",
		codigoCatastral: "G13",
		sector: "Manzana G",
		numero: 13,
		label: "G-13",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54332,
		longitud: -91.66885,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "569.5,378.2 651.0,378.2 651.0,419.0 569.5,419.0",
		centerX: 610.2,
		centerY: 398.6,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-14",
		codigoCatastral: "G14",
		sector: "Manzana G",
		numero: 14,
		label: "G-14",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54393,
		longitud: -91.66885,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "reservado",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "569.5,337.5 651.0,337.5 651.0,378.2 569.5,378.2",
		centerX: 610.2,
		centerY: 357.9,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-15",
		codigoCatastral: "G15",
		sector: "Manzana G",
		numero: 15,
		label: "G-15",
		frente: 20.54,
		fondo: 21.53,
		areaM2: 377.9,
		areaV2: 540.7,
		orientacion: "Sur",
		latitud: 14.54224,
		longitud: -91.66761,
		altitud: 240,
		precioGTQ: 277756.5,
		precioM2: 735,
		enganche10: 27775.65,
		aFinanciar: 249980.85,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Sur: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "651.0,419.0 732.5,419.0 732.5,489.1 706.0,492.5 681.0,497.5 651.0,506.7",
		centerX: 692.3,
		centerY: 470.6,
		irregular: !0,
		notasVendedor: "Lote amplio frente a calle curva (Norte: 20.00m, Oeste: 21.53m, Este: 17.20m, Curva: 7.89m + 6.06m + 6.59m)",
		cuotasNiveladas: {
			12: 22918.242553135966,
			24: 12480.0439554,
			36: 9037.406556626174,
			48: 7343.18736875766,
			60: 6347.870565865291,
			72: 5701.51100226633,
			84: 5254.057003462003,
			96: 4930.425828656214
		}
	},
	{
		id: "G-16",
		codigoCatastral: "G16",
		sector: "Manzana G",
		numero: 16,
		label: "G-16",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54332,
		longitud: -91.66762,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "651.0,378.2 732.5,378.2 732.5,419.0 651.0,419.0",
		centerX: 691.8,
		centerY: 398.6,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-17",
		codigoCatastral: "G17",
		sector: "Manzana G",
		numero: 17,
		label: "G-17",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54393,
		longitud: -91.66762,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "651.0,337.5 732.5,337.5 732.5,378.2 651.0,378.2",
		centerX: 691.8,
		centerY: 357.9,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-18",
		codigoCatastral: "G18",
		sector: "Manzana G",
		numero: 18,
		label: "G-18",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Este",
		latitud: 14.54534,
		longitud: -91.67282,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Este: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "325.0,223.0 365.8,223.0 365.8,304.5 325.0,304.5",
		centerX: 345.4,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-19",
		codigoCatastral: "G19",
		sector: "Manzana G",
		numero: 19,
		label: "G-19",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Este",
		latitud: 14.54534,
		longitud: -91.67221,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Este: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "365.8,223.0 406.5,223.0 406.5,304.5 365.8,304.5",
		centerX: 386.1,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-20",
		codigoCatastral: "G20",
		sector: "Manzana G",
		numero: 20,
		label: "G-20",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54534,
		longitud: -91.6716,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "406.5,223.0 447.2,223.0 447.2,304.5 406.5,304.5",
		centerX: 426.9,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-21",
		codigoCatastral: "G21",
		sector: "Manzana G",
		numero: 21,
		label: "G-21",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54534,
		longitud: -91.67099,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "447.2,223.0 488.0,223.0 488.0,304.5 447.2,304.5",
		centerX: 467.6,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-22",
		codigoCatastral: "G22",
		sector: "Manzana G",
		numero: 22,
		label: "G-22",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54534,
		longitud: -91.67037,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "reservado",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "488.0,223.0 528.8,223.0 528.8,304.5 488.0,304.5",
		centerX: 508.4,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-23",
		codigoCatastral: "G23",
		sector: "Manzana G",
		numero: 23,
		label: "G-23",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54534,
		longitud: -91.66976,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "528.8,223.0 569.5,223.0 569.5,304.5 528.8,304.5",
		centerX: 549.1,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-24",
		codigoCatastral: "G24",
		sector: "Manzana G",
		numero: 24,
		label: "G-24",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54534,
		longitud: -91.66915,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "569.5,223.0 610.2,223.0 610.2,304.5 569.5,304.5",
		centerX: 589.9,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-25",
		codigoCatastral: "G25",
		sector: "Manzana G",
		numero: 25,
		label: "G-25",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54534,
		longitud: -91.66854,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "610.2,223.0 651.0,223.0 651.0,304.5 610.2,304.5",
		centerX: 630.6,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-26",
		codigoCatastral: "G26",
		sector: "Manzana G",
		numero: 26,
		label: "G-26",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54504,
		longitud: -91.66762,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "651.0,263.8 732.5,263.8 732.5,304.5 651.0,304.5",
		centerX: 691.8,
		centerY: 284.1,
		irregular: !1,
		notasVendedor: "Terreno regular orientación Este-Oeste (10.00m × 20.00m)",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-27",
		codigoCatastral: "G27",
		sector: "Manzana G",
		numero: 27,
		label: "G-27",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54565,
		longitud: -91.66762,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "651.0,223.0 732.5,223.0 732.5,263.8 651.0,263.8",
		centerX: 691.8,
		centerY: 243.4,
		irregular: !1,
		notasVendedor: "Terreno regular orientación Este-Oeste (10.00m × 20.00m)",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-28",
		codigoCatastral: "G28",
		sector: "Manzana G",
		numero: 28,
		label: "G-28",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54626,
		longitud: -91.66762,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "651.0,182.2 732.5,182.2 732.5,223.0 651.0,223.0",
		centerX: 691.8,
		centerY: 202.6,
		irregular: !1,
		notasVendedor: "Terreno regular orientación Este-Oeste (10.00m × 20.00m)",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-29",
		codigoCatastral: "G29",
		sector: "Manzana G",
		numero: 29,
		label: "G-29",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54687,
		longitud: -91.66762,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "651.0,141.5 732.5,141.5 732.5,182.2 651.0,182.2",
		centerX: 691.8,
		centerY: 161.8,
		irregular: !1,
		notasVendedor: "Terreno regular orientación Este-Oeste (10.00m × 20.00m)",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-30",
		codigoCatastral: "G30",
		sector: "Manzana G",
		numero: 30,
		label: "G-30",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.67282,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "325.0,141.5 365.8,141.5 365.8,223.0 325.0,223.0",
		centerX: 345.4,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-31",
		codigoCatastral: "G31",
		sector: "Manzana G",
		numero: 31,
		label: "G-31",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.67221,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "365.8,141.5 406.5,141.5 406.5,223.0 365.8,223.0",
		centerX: 386.1,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-32",
		codigoCatastral: "G32",
		sector: "Manzana G",
		numero: 32,
		label: "G-32",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.6716,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "406.5,141.5 447.2,141.5 447.2,223.0 406.5,223.0",
		centerX: 426.9,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-33",
		codigoCatastral: "G33",
		sector: "Manzana G",
		numero: 33,
		label: "G-33",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.67099,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "reservado",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "447.2,141.5 488.0,141.5 488.0,223.0 447.2,223.0",
		centerX: 467.6,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-34",
		codigoCatastral: "G34",
		sector: "Manzana G",
		numero: 34,
		label: "G-34",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.67037,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "488.0,141.5 528.8,141.5 528.8,223.0 488.0,223.0",
		centerX: 508.4,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-35",
		codigoCatastral: "G35",
		sector: "Manzana G",
		numero: 35,
		label: "G-35",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.66976,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "528.8,141.5 569.5,141.5 569.5,223.0 528.8,223.0",
		centerX: 549.1,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-36",
		codigoCatastral: "G36",
		sector: "Manzana G",
		numero: 36,
		label: "G-36",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.66915,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "569.5,141.5 610.2,141.5 610.2,223.0 569.5,223.0",
		centerX: 589.9,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-37",
		codigoCatastral: "G37",
		sector: "Manzana G",
		numero: 37,
		label: "G-37",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.66854,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "610.2,141.5 651.0,141.5 651.0,223.0 610.2,223.0",
		centerX: 630.6,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-38",
		codigoCatastral: "G38",
		sector: "Manzana G",
		numero: 38,
		label: "G-38",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.67282,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "325.0,27.0 365.8,27.0 365.8,108.5 325.0,108.5",
		centerX: 345.4,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "G-39",
		codigoCatastral: "G39",
		sector: "Manzana G",
		numero: 39,
		label: "G-39",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.67221,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "365.8,27.0 406.5,27.0 406.5,108.5 365.8,108.5",
		centerX: 386.1,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-40",
		codigoCatastral: "G40",
		sector: "Manzana G",
		numero: 40,
		label: "G-40",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.6716,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "406.5,27.0 447.2,27.0 447.2,108.5 406.5,108.5",
		centerX: 426.9,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-41",
		codigoCatastral: "G41",
		sector: "Manzana G",
		numero: 41,
		label: "G-41",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.67099,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "reservado",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "447.2,27.0 488.0,27.0 488.0,108.5 447.2,108.5",
		centerX: 467.6,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-42",
		codigoCatastral: "G42",
		sector: "Manzana G",
		numero: 42,
		label: "G-42",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.67037,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "488.0,27.0 528.8,27.0 528.8,108.5 488.0,108.5",
		centerX: 508.4,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-43",
		codigoCatastral: "G43",
		sector: "Manzana G",
		numero: 43,
		label: "G-43",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.66976,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "528.8,27.0 569.5,27.0 569.5,108.5 528.8,108.5",
		centerX: 549.1,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-44",
		codigoCatastral: "G44",
		sector: "Manzana G",
		numero: 44,
		label: "G-44",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.66915,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "569.5,27.0 610.2,27.0 610.2,108.5 569.5,108.5",
		centerX: 589.9,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-45",
		codigoCatastral: "G45",
		sector: "Manzana G",
		numero: 45,
		label: "G-45",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.66854,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "610.2,27.0 651.0,27.0 651.0,108.5 610.2,108.5",
		centerX: 630.6,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-46",
		codigoCatastral: "G46",
		sector: "Manzana G",
		numero: 46,
		label: "G-46",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.66793,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "651.0,27.0 691.8,27.0 691.8,108.5 651.0,108.5",
		centerX: 671.4,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "G-47",
		codigoCatastral: "G47",
		sector: "Manzana G",
		numero: 47,
		label: "G-47",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.66732,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana G, Fase 2",
		points: "691.8,27.0 732.5,27.0 732.5,108.5 691.8,108.5",
		centerX: 712.1,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-1",
		codigoCatastral: "H1",
		sector: "Manzana H",
		numero: 1,
		label: "H-1",
		frente: 20.19,
		fondo: 19.53,
		areaM2: 361.49,
		areaV2: 517.22,
		orientacion: "Sur",
		latitud: 14.54236,
		longitud: -91.66598,
		altitud: 240,
		precioGTQ: 265695.15,
		precioM2: 735,
		enganche10: 26569.515000000003,
		aFinanciar: 239125.635,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Sur: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "765.5,419.0 847.0,419.0 847.0,498.6 780.0,488.5 765.5,488.2",
		centerX: 801,
		centerY: 462.7,
		irregular: !0,
		notasVendedor: "Lote esquinero amplio (Norte: 20.00m, Oeste: 16.98m, Este: 19.53m, Calle: 3.63m + 16.56m)",
		cuotasNiveladas: {
			12: 21923.036519007994,
			24: 11938.10820174,
			36: 8644.964530708641,
			48: 7024.315432474747,
			60: 6072.2194518514,
			72: 5453.9275263542095,
			84: 5025.903853351361,
			96: 4716.326098970455
		}
	},
	{
		id: "H-2",
		codigoCatastral: "H2",
		sector: "Manzana H",
		numero: 2,
		label: "H-2",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54332,
		longitud: -91.66591,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "reservado",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "765.5,378.2 847.0,378.2 847.0,419.0 765.5,419.0",
		centerX: 806.2,
		centerY: 398.6,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-3",
		codigoCatastral: "H3",
		sector: "Manzana H",
		numero: 3,
		label: "H-3",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54393,
		longitud: -91.66591,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "765.5,337.5 847.0,337.5 847.0,378.2 765.5,378.2",
		centerX: 806.2,
		centerY: 357.9,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-4",
		codigoCatastral: "H4",
		sector: "Manzana H",
		numero: 4,
		label: "H-4",
		frente: 20.22,
		fondo: 12.53,
		areaM2: 220.58,
		areaV2: 315.61,
		orientacion: "Sur",
		latitud: 14.54207,
		longitud: -91.66468,
		altitud: 240,
		precioGTQ: 162126.30000000002,
		precioM2: 735,
		enganche10: 16212.630000000003,
		aFinanciar: 145913.67,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Sur: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "847.0,459.8 928.5,459.8 928.5,510.8 847.0,498.6",
		centerX: 887.8,
		centerY: 482.2,
		irregular: !0,
		notasVendedor: "Lote esquinero inclinado (Norte: 20.00m, Oeste: 9.53m, Este: 12.53m, Calle: 20.22m)",
		cuotasNiveladas: {
			12: 13377.364229612946,
			24: 7284.594061080001,
			36: 5275.128706696485,
			48: 4286.213997884533,
			60: 3705.2481858125584,
			72: 3327.9685019314825,
			84: 3066.789875161812,
			96: 2877.8865553982214
		}
	},
	{
		id: "H-5",
		codigoCatastral: "H5",
		sector: "Manzana H",
		numero: 5,
		label: "H-5",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54271,
		longitud: -91.66468,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "847.0,419.0 928.5,419.0 928.5,459.8 847.0,459.8",
		centerX: 887.8,
		centerY: 439.4,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-6",
		codigoCatastral: "H6",
		sector: "Manzana H",
		numero: 6,
		label: "H-6",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54332,
		longitud: -91.66468,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "847.0,378.2 928.5,378.2 928.5,419.0 847.0,419.0",
		centerX: 887.8,
		centerY: 398.6,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-7",
		codigoCatastral: "H7",
		sector: "Manzana H",
		numero: 7,
		label: "H-7",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54393,
		longitud: -91.66468,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "847.0,337.5 928.5,337.5 928.5,378.2 847.0,378.2",
		centerX: 887.8,
		centerY: 357.9,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-8",
		codigoCatastral: "H8",
		sector: "Manzana H",
		numero: 8,
		label: "H-8",
		frente: 20.24,
		fondo: 13.73,
		areaM2: 282.89,
		areaV2: 404.76,
		orientacion: "Sur",
		latitud: 14.54183,
		longitud: -91.66296,
		altitud: 240,
		precioGTQ: 207924.15,
		precioM2: 735,
		enganche10: 20792.415,
		aFinanciar: 187131.735,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Esquinero",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Sur: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "961.5,459.8 1043.0,459.8 1043.0,512.3 1012.0,519.5 994.0,520.0 961.5,515.7",
		centerX: 1002.5,
		centerY: 497.8,
		irregular: !0,
		notasVendedor: "Lote en curva Sur-Este (Norte: 20.00m, Oeste: 13.73m, Este: 12.90m, Curva: 8.24m + 4.32m + 7.68m)",
		cuotasNiveladas: {
			12: 17156.23613616468,
			24: 9342.36473814,
			36: 6765.260494321192,
			48: 5496.9946407723055,
			60: 4751.916126958539,
			72: 4268.061517414983,
			84: 3933.104487190701,
			96: 3690.839276709596
		}
	},
	{
		id: "H-9",
		codigoCatastral: "H9",
		sector: "Manzana H",
		numero: 9,
		label: "H-9",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54271,
		longitud: -91.66297,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "961.5,419.0 1043.0,419.0 1043.0,459.8 961.5,459.8",
		centerX: 1002.2,
		centerY: 439.4,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-10",
		codigoCatastral: "H10",
		sector: "Manzana H",
		numero: 10,
		label: "H-10",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54332,
		longitud: -91.66297,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "961.5,378.2 1043.0,378.2 1043.0,419.0 961.5,419.0",
		centerX: 1002.2,
		centerY: 398.6,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-11",
		codigoCatastral: "H11",
		sector: "Manzana H",
		numero: 11,
		label: "H-11",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54393,
		longitud: -91.66297,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "961.5,337.5 1043.0,337.5 1043.0,378.2 961.5,378.2",
		centerX: 1002.2,
		centerY: 357.9,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-12",
		codigoCatastral: "H12",
		sector: "Manzana H",
		numero: 12,
		label: "H-12",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54534,
		longitud: -91.66621,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "765.5,223.0 806.2,223.0 806.2,304.5 765.5,304.5",
		centerX: 785.9,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-13",
		codigoCatastral: "H13",
		sector: "Manzana H",
		numero: 13,
		label: "H-13",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54534,
		longitud: -91.6656,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "806.2,223.0 847.0,223.0 847.0,304.5 806.2,304.5",
		centerX: 826.6,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "H-14",
		codigoCatastral: "H14",
		sector: "Manzana H",
		numero: 14,
		label: "H-14",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54534,
		longitud: -91.66499,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "847.0,223.0 887.8,223.0 887.8,304.5 847.0,304.5",
		centerX: 867.4,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "H-15",
		codigoCatastral: "H15",
		sector: "Manzana H",
		numero: 15,
		label: "H-15",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54534,
		longitud: -91.66438,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "reservado",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "887.8,223.0 928.5,223.0 928.5,304.5 887.8,304.5",
		centerX: 908.1,
		centerY: 263.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-16",
		codigoCatastral: "H16",
		sector: "Manzana H",
		numero: 16,
		label: "H-16",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.66621,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "765.5,141.5 806.2,141.5 806.2,223.0 765.5,223.0",
		centerX: 785.9,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-17",
		codigoCatastral: "H17",
		sector: "Manzana H",
		numero: 17,
		label: "H-17",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.6656,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "806.2,141.5 847.0,141.5 847.0,223.0 806.2,223.0",
		centerX: 826.6,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "H-18",
		codigoCatastral: "H18",
		sector: "Manzana H",
		numero: 18,
		label: "H-18",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.66499,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "847.0,141.5 887.8,141.5 887.8,223.0 847.0,223.0",
		centerX: 867.4,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "H-19",
		codigoCatastral: "H19",
		sector: "Manzana H",
		numero: 19,
		label: "H-19",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54657,
		longitud: -91.66438,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "887.8,141.5 928.5,141.5 928.5,223.0 887.8,223.0",
		centerX: 908.1,
		centerY: 182.2,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-20",
		codigoCatastral: "H20",
		sector: "Manzana H",
		numero: 20,
		label: "H-20",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Oeste",
		latitud: 14.54504,
		longitud: -91.66297,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Oeste: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "961.5,263.8 1043.0,263.8 1043.0,304.5 961.5,304.5",
		centerX: 1002.2,
		centerY: 284.1,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-21",
		codigoCatastral: "H21",
		sector: "Manzana H",
		numero: 21,
		label: "H-21",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54565,
		longitud: -91.66297,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "961.5,223.0 1043.0,223.0 1043.0,263.8 961.5,263.8",
		centerX: 1002.2,
		centerY: 243.4,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "H-22",
		codigoCatastral: "H22",
		sector: "Manzana H",
		numero: 22,
		label: "H-22",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54626,
		longitud: -91.66297,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "reservado",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "961.5,182.2 1043.0,182.2 1043.0,223.0 961.5,223.0",
		centerX: 1002.2,
		centerY: 202.6,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "H-23",
		codigoCatastral: "H23",
		sector: "Manzana H",
		numero: 23,
		label: "H-23",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54687,
		longitud: -91.66297,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "961.5,141.5 1043.0,141.5 1043.0,182.2 961.5,182.2",
		centerX: 1002.2,
		centerY: 161.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-24",
		codigoCatastral: "H24",
		sector: "Manzana H",
		numero: 24,
		label: "H-24",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54565,
		longitud: -91.66174,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "1043.0,223.0 1124.5,223.0 1124.5,263.8 1043.0,263.8",
		centerX: 1083.8,
		centerY: 243.4,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-25",
		codigoCatastral: "H25",
		sector: "Manzana H",
		numero: 25,
		label: "H-25",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54626,
		longitud: -91.66174,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "1043.0,182.2 1124.5,182.2 1124.5,223.0 1043.0,223.0",
		centerX: 1083.8,
		centerY: 202.6,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "H-26",
		codigoCatastral: "H26",
		sector: "Manzana H",
		numero: 26,
		label: "H-26",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54687,
		longitud: -91.66174,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "1043.0,141.5 1124.5,141.5 1124.5,182.2 1043.0,182.2",
		centerX: 1083.8,
		centerY: 161.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-27",
		codigoCatastral: "H27",
		sector: "Manzana H",
		numero: 27,
		label: "H-27",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.66621,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "765.5,27.0 806.2,27.0 806.2,108.5 765.5,108.5",
		centerX: 785.9,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-28",
		codigoCatastral: "H28",
		sector: "Manzana H",
		numero: 28,
		label: "H-28",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.6656,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "reservado",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "806.2,27.0 847.0,27.0 847.0,108.5 806.2,108.5",
		centerX: 826.6,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "H-29",
		codigoCatastral: "H29",
		sector: "Manzana H",
		numero: 29,
		label: "H-29",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.66499,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "847.0,27.0 887.8,27.0 887.8,108.5 847.0,108.5",
		centerX: 867.4,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "H-30",
		codigoCatastral: "H30",
		sector: "Manzana H",
		numero: 30,
		label: "H-30",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54828,
		longitud: -91.66438,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "887.8,27.0 928.5,27.0 928.5,108.5 887.8,108.5",
		centerX: 908.1,
		centerY: 67.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-35",
		codigoCatastral: "H35",
		sector: "Manzana H",
		numero: 35,
		label: "H-35",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54797,
		longitud: -91.66297,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "961.5,68.0 1043.0,68.0 1043.0,108.8 961.5,108.8",
		centerX: 1002.2,
		centerY: 88.4,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-36",
		codigoCatastral: "H36",
		sector: "Manzana H",
		numero: 36,
		label: "H-36",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54859,
		longitud: -91.66297,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "961.5,27.2 1043.0,27.2 1043.0,68.0 961.5,68.0",
		centerX: 1002.2,
		centerY: 47.6,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "H-39",
		codigoCatastral: "H39",
		sector: "Manzana H",
		numero: 39,
		label: "H-39",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54797,
		longitud: -91.66174,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "1043.0,68.0 1124.5,68.0 1124.5,108.8 1043.0,108.8",
		centerX: 1083.8,
		centerY: 88.4,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "H-40",
		codigoCatastral: "H40",
		sector: "Manzana H",
		numero: 40,
		label: "H-40",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54859,
		longitud: -91.66174,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana H, Fase 2",
		points: "1043.0,27.2 1124.5,27.2 1124.5,68.0 1043.0,68.0",
		centerX: 1083.8,
		centerY: 47.6,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	},
	{
		id: "I-1",
		codigoCatastral: "I1",
		sector: "Manzana I",
		numero: 1,
		label: "I-1",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54687,
		longitud: -91.66003,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "reservado",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana I, Fase 2",
		points: "1157.0,141.5 1238.5,141.5 1238.5,182.2 1157.0,182.2",
		centerX: 1197.8,
		centerY: 161.8,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "I-2",
		codigoCatastral: "I2",
		sector: "Manzana I",
		numero: 2,
		label: "I-2",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54797,
		longitud: -91.66003,
		altitud: 240,
		precioGTQ: 133e3,
		precioM2: 665,
		enganche10: 13300,
		aFinanciar: 119700,
		cuotaInicialPct: 10,
		estado: "vendido",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana I, Fase 2",
		points: "1157.0,68.0 1238.5,68.0 1238.5,108.8 1157.0,108.8",
		centerX: 1197.8,
		centerY: 88.4,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 10974.09515013,
			24: 5975.902800000001,
			36: 4327.44174135,
			48: 3516.18745212,
			60: 3039.59325978,
			72: 2730.092592977741,
			84: 2515.8352062344047,
			96: 2360.8687293052603
		}
	},
	{
		id: "I-3",
		codigoCatastral: "I3",
		sector: "Manzana I",
		numero: 3,
		label: "I-3",
		frente: 10,
		fondo: 20,
		areaM2: 200,
		areaV2: 286.16,
		orientacion: "Norte",
		latitud: 14.54859,
		longitud: -91.66003,
		altitud: 240,
		precioGTQ: 121e3,
		precioM2: 605,
		enganche10: 12100,
		aFinanciar: 108900,
		cuotaInicialPct: 10,
		estado: "disponible",
		categoria: "Estándar",
		topografia: "100% Plano",
		servicios: [
			"Agua potable",
			"Energía subterránea",
			"Drenaje sanitario y pluvial",
			"Calles pavimentadas",
			"Seguridad 24/7"
		],
		plusvaliaAnual: 12,
		asoleamiento: "Orientación Norte: Excelente iluminación natural y ventilación cruzada",
		distanciaAmenidades: "Ubicación privilegiada en Manzana I, Fase 2",
		points: "1157.0,27.2 1238.5,27.2 1238.5,68.0 1157.0,68.0",
		centerX: 1197.8,
		centerY: 47.6,
		irregular: !1,
		notasVendedor: "Terreno rectangular estándar",
		cuotasNiveladas: {
			12: 9983.95122681,
			24: 5436.7236,
			36: 3936.99586995,
			48: 3198.93745644,
			60: 2765.34424386,
			72: 2483.768449250426,
			84: 2288.8425560478418,
			96: 2147.8580168867406
		}
	}
], je = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCALQBQADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoooo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rA8Ja7ca6usGdUX7HqU9nHsHVEIwT781v14na/Gjw74DvPEekM1zrviebWrt7fw7okP2q+lGRglBxGv+3IVUdzQB7ZXnHjn47eHfCGrPoFitz4r8YbNyeHNCQT3Q9DLyEgX/AGpGXjpnpXPJ4W+JnxYO/wAV6kvw88MyZz4f8P3HmalOh7XF8MCL3WAZ/wCmhr0TwL8OPDPw00gab4Y0W00e0zucW8eHlbuzufmdj1JYkmgDzf8A4V/8Qvi6rt4/1dfB/hyXp4W8L3LfaJFyflub7hjxwViCgjvXp/gzwL4e+Hmix6T4a0e00XTkOfItIwgZu7MerMe7MST61u0UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFYev63PperaFbRKhjvrlopC3UAIW4/EVuVyfjH/AJGLwl/1/P8A+imoA6yiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAKGhX0mp6Tb3MoAkkBJC9OpH9Kv1j+Ef+Rds/o3/oRrYoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDG1LXzYeJNG0ryd41BZ2MmfueWqnp3zurZrj/Ef/JRvB3/XO+/9AjrsKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAKF/ottqOo6bezb/P0+R5YdrYGWjZDkd+GNX65zxDql1ZeKPCtrDJsgvLmeOdMffVbeRwP++lBro6ACiiigAooooAKKKKACiiigAooooAKKKKACkIDAgjIPUGlooA8U1f4WeIfhTq114h+FCwS2FzIZtS8DXcvlWdyxOWltH6W0x7rjy27hTyey+Gnxh0H4npd21kbjTNe08hdR0DU4jBfWTejxnqp7OuVPY13NcH8S/g5ovxKa1vpJbrRPEthk6f4h0mTyb20PoG6Oh7xuCp5yKAO8orxTTfi34i+FV7Do3xbht0sHZYrTx3p8ZTTrgnhVu0/5dJD6kmInoy8LXtEUqTxJJG6yRuAyupyGB6EHuKAH0UUUAFFFFABRRRQAUUVw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AUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/2Q==", E = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element");
	function n(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.jsx = n, e.jsxs = n;
})), D = (/* @__PURE__ */ o(((e, t) => {
	t.exports = E();
})))(), Me = 7.75;
function Ne() {
	let [e, t] = (0, _.useState)(Ae), [n, r] = (0, _.useState)("G-1"), [i, a] = (0, _.useState)("GTQ"), [o, s] = (0, _.useState)("todos"), [c, l] = (0, _.useState)("todos"), [u, d] = (0, _.useState)(""), [f, p] = (0, _.useState)("estado"), [m, h] = (0, _.useState)("ficha"), [g, v] = (0, _.useState)(15), [y, b] = (0, _.useState)("peek"), [ee, te] = (0, _.useState)(!1), [ne, re] = (0, _.useState)({
		x: 0,
		y: 0
	}), [x, ie] = (0, _.useState)(1), [S, ae] = (0, _.useState)(8), [oe, C] = (0, _.useState)(18), [se, ce] = (0, _.useState)(null), [E, Ne] = (0, _.useState)("Carlos Méndez"), [Pe, Fe] = (0, _.useState)("+502 5544-8899"), [Ie, Le] = (0, _.useState)("Ing. Sofía Barrios"), [Re, ze] = (0, _.useState)(["F-1", "G-1"]), [Be, Ve] = (0, _.useState)(!1), [He, Ue] = (0, _.useState)(!1), [We, Ge] = (0, _.useState)(!1), [Ke, qe] = (0, _.useState)(!1), [Je, Ye] = (0, _.useState)(null), [Xe, Ze] = (0, _.useState)(!1), Qe = (0, _.useRef)(null), $e = (0, _.useRef)(null), et = (0, _.useRef)(null), O = (0, _.useRef)({
		x: 0,
		y: 0
	}), tt = (0, _.useRef)(1), nt = (0, _.useCallback)((e, t, n, r, i) => {
		let a = r * .45, o = i * .45, s = r * n, c = i * n, l = a - s, u = r - a, d = o - c, f = i - o;
		return {
			x: Math.min(Math.max(e, l), u),
			y: Math.min(Math.max(t, d), f)
		};
	}, []), rt = (0, _.useCallback)((e, t, n, r = !1) => {
		O.current = {
			x: e,
			y: t
		}, tt.current = n, $e.current && ($e.current.style.transition = r ? "transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none", $e.current.style.transform = `translate3d(${e}px, ${t}px, 0px) scale(${n})`), et.current && (et.current.textContent = `${Math.round(n * 100)}%`);
	}, []), k = (0, _.useRef)({
		mode: "none",
		startX: 0,
		startY: 0,
		panStartX: 0,
		panStartY: 0,
		initialDistance: 0,
		scaleStart: 1,
		contentPoint: {
			x: 0,
			y: 0
		},
		hasMoved: !1,
		lastTapTime: 0
	});
	(0, _.useEffect)(() => {
		O.current = ne;
	}, [ne]), (0, _.useEffect)(() => {
		tt.current = x;
	}, [x]);
	let A = (0, _.useMemo)(() => e.find((e) => e.id === n) || e[0], [e, n]), it = (0, _.useMemo)(() => A.estado === "disponible" ? {
		headerBg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700",
		borderColor: "border-emerald-400/50",
		dotColor: "bg-emerald-300",
		statusBadge: "bg-emerald-950/60 text-emerald-200 border-emerald-400/30",
		handleBg: "bg-emerald-300/80",
		label: "DISPONIBLE"
	} : A.estado === "reservado" ? {
		headerBg: "bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700",
		borderColor: "border-amber-400/50",
		dotColor: "bg-amber-300",
		statusBadge: "bg-amber-950/60 text-amber-200 border-amber-400/30",
		handleBg: "bg-amber-300/80",
		label: "RESERVADO"
	} : {
		headerBg: "bg-gradient-to-r from-rose-700 via-red-700 to-rose-800",
		borderColor: "border-rose-400/50",
		dotColor: "bg-rose-300",
		statusBadge: "bg-rose-950/60 text-rose-200 border-rose-400/30",
		handleBg: "bg-rose-300/80",
		label: "VENDIDO"
	}, [A.estado]), j = se === null ? A.cuotaInicialPct : se, at = (e) => {
		Ye(e), setTimeout(() => {
			Ye((t) => t === e ? null : t);
		}, 3500);
	}, M = (e) => {
		if (i === "GTQ") return `Q${Math.round(e).toLocaleString("es-GT")}`;
		let t = e / Me;
		return `$${Math.round(t).toLocaleString("en-US")} USD`;
	}, ot = (0, _.useMemo)(() => e.filter((e) => {
		let t = o === "todos" || e.estado === o, n = c === "todos" || e.sector === c, r = u.trim() === "" || e.label.toLowerCase().includes(u.toLowerCase()) || e.codigoCatastral.toLowerCase().includes(u.toLowerCase()) || e.categoria.toLowerCase().includes(u.toLowerCase()) || e.orientacion.toLowerCase().includes(u.toLowerCase());
		return t && n && r;
	}), [
		e,
		o,
		c,
		u
	]), N = (0, _.useMemo)(() => {
		let e = A.precioGTQ, t = e * j / 100, n = e - t, r = Math.round(S * 12), i = j === 10 && Math.abs(oe - 18) < .01 && A.cuotasNiveladas && r in A.cuotasNiveladas, a = 0;
		if (i) a = A.cuotasNiveladas[r];
		else {
			let e = oe / 100 / 12;
			a = e > 0 ? n * (e * (1 + e) ** +r) / ((1 + e) ** +r - 1) : n / r;
		}
		let o = e * .009 / 4, s = e * (1 + A.plusvaliaAnual / 100) ** 5;
		return {
			precioTotal: e,
			cuotaInicial: t,
			saldoFinanciar: n,
			cuotaMensual: a,
			meses: r,
			iusiTrimestral: o,
			valor5Anios: s,
			gananciaPlusvalia5A: s - e
		};
	}, [
		A,
		j,
		S,
		oe
	]), st = (0, _.useCallback)((e, t = 1.6) => {
		let n = Qe.current;
		if (!n) return;
		let r = n.getBoundingClientRect(), i = r.width, a = r.height, o = Math.min(i / 1280, a / 720), s = (i - 1280 * o) / 2, c = (a - 720 * o) / 2, l = s + e.centerX * o, u = c + e.centerY * o, d = Math.min(Math.max(t, 1.2), 3.5), f = i / 2 - l * d, p = a / 2 - u * d, m = nt(f, p, d, i, a);
		rt(m.x, m.y, d, !0), ie(d), re(m);
	}, [nt, rt]), ct = (e) => {
		k.current.hasMoved || (r(e.id), Ze(!0), setTimeout(() => Ze(!1), 700), ce(null), b("peek"), st(e, 1.5));
	}, lt = () => {
		rt(0, 0, 1, !0), ie(1), re({
			x: 0,
			y: 0
		});
	}, ut = (e) => {
		let t = Qe.current;
		if (!t) return;
		let n = t.getBoundingClientRect(), r = n.width / 2, i = n.height / 2, a = tt.current, o = Math.min(Math.max(a + e, .75), 4.5), s = o / a, c = r - (r - O.current.x) * s, l = i - (i - O.current.y) * s, u = nt(c, l, o, n.width, n.height);
		rt(u.x, u.y, o, !0), ie(o), re(u);
	};
	(0, _.useEffect)(() => {
		let e = Qe.current;
		if (!e) return;
		let t = (t) => {
			t.touches.length > 1 && t.cancelable && t.preventDefault();
			let n = e.getBoundingClientRect();
			if (n.width, n.height, t.touches.length === 1) {
				let e = t.touches[0];
				k.current.mode = "pan", k.current.startX = e.clientX, k.current.startY = e.clientY, k.current.panStartX = O.current.x, k.current.panStartY = O.current.y, k.current.hasMoved = !1;
			} else if (t.touches.length >= 2) {
				let e = t.touches[0], r = t.touches[1], i = Math.hypot(r.clientX - e.clientX, r.clientY - e.clientY), a = (e.clientX + r.clientX) / 2 - n.left, o = (e.clientY + r.clientY) / 2 - n.top;
				k.current.mode = "pinch", k.current.initialDistance = Math.max(i, 10), k.current.scaleStart = tt.current, k.current.panStartX = O.current.x, k.current.panStartY = O.current.y, k.current.contentPoint = {
					x: (a - O.current.x) / tt.current,
					y: (o - O.current.y) / tt.current
				}, k.current.hasMoved = !0;
			}
		}, n = (t) => {
			let n = e.getBoundingClientRect(), r = n.width, i = n.height;
			if (t.touches.length === 1 && k.current.mode === "pan") {
				let e = t.touches[0], n = e.clientX - k.current.startX, a = e.clientY - k.current.startY;
				if (Math.hypot(n, a) > 10) {
					k.current.hasMoved = !0, t.cancelable && t.preventDefault();
					let e = k.current.panStartX + n, o = k.current.panStartY + a, s = nt(e, o, tt.current, r, i);
					rt(s.x, s.y, tt.current, !1);
				}
			} else if (t.touches.length >= 2) {
				t.cancelable && t.preventDefault();
				let e = t.touches[0], a = t.touches[1], o = Math.hypot(a.clientX - e.clientX, a.clientY - e.clientY), s = (e.clientX + a.clientX) / 2 - n.left, c = (e.clientY + a.clientY) / 2 - n.top, l = o / k.current.initialDistance, u = Math.min(Math.max(k.current.scaleStart * l, .75), 4.5), d = s - k.current.contentPoint.x * u, f = c - k.current.contentPoint.y * u, p = nt(d, f, u, r, i);
				k.current.hasMoved = !0, rt(p.x, p.y, u, !1);
			}
		}, r = (t) => {
			let n = e.getBoundingClientRect(), r = n.width, i = n.height;
			if (t.touches.length === 1) {
				let e = t.touches[0];
				k.current.mode = "pan", k.current.startX = e.clientX, k.current.startY = e.clientY, k.current.panStartX = O.current.x, k.current.panStartY = O.current.y, k.current.hasMoved = !0;
			} else if (t.touches.length === 0) {
				let e = !k.current.hasMoved;
				k.current.mode = "none";
				let t = Date.now();
				if (e) {
					let e = t - k.current.lastTapTime;
					if (e > 50 && e < 320) {
						let e = tt.current > 1.6 ? 1 : 2.2;
						if (e === 1) rt(0, 0, 1, !0), re({
							x: 0,
							y: 0
						}), ie(1);
						else {
							let t = r / 2, n = i / 2, a = e / tt.current, o = t - (t - O.current.x) * a, s = n - (n - O.current.y) * a, c = nt(o, s, e, r, i);
							rt(c.x, c.y, e, !0), re(c), ie(e);
						}
						k.current.lastTapTime = 0;
						return;
					}
					k.current.lastTapTime = t;
				}
				re({
					x: O.current.x,
					y: O.current.y
				}), ie(tt.current);
			}
		};
		return e.addEventListener("touchstart", t, { passive: !1 }), e.addEventListener("touchmove", n, { passive: !1 }), e.addEventListener("touchend", r, { passive: !1 }), e.addEventListener("touchcancel", r, { passive: !1 }), () => {
			e.removeEventListener("touchstart", t), e.removeEventListener("touchmove", n), e.removeEventListener("touchend", r), e.removeEventListener("touchcancel", r);
		};
	}, [nt, rt]);
	let dt = (0, _.useRef)(!1), ft = (e) => {
		dt.current = !0, k.current.startX = e.clientX, k.current.startY = e.clientY, k.current.panStartX = O.current.x, k.current.panStartY = O.current.y, k.current.hasMoved = !1;
	}, pt = (e) => {
		if (!dt.current) return;
		let t = Qe.current;
		if (!t) return;
		let n = t.getBoundingClientRect(), r = e.clientX - k.current.startX, i = e.clientY - k.current.startY;
		if (Math.hypot(r, i) > 4) {
			k.current.hasMoved = !0;
			let e = k.current.panStartX + r, t = k.current.panStartY + i, a = nt(e, t, tt.current, n.width, n.height);
			rt(a.x, a.y, tt.current, !1);
		}
	}, mt = () => {
		dt.current && (dt.current = !1, re({
			x: O.current.x,
			y: O.current.y
		}), ie(tt.current));
	}, ht = (e) => {
		e.preventDefault();
		let t = e.deltaY < 0 ? .2 : -.2;
		ut(t);
	}, gt = (e) => {
		t((t) => t.map((t) => t.id === A.id ? {
			...t,
			estado: e
		} : t)), at(`Estado del Lote ${A.label} actualizado a ${e.toUpperCase()}`);
	}, _t = (e) => {
		ze((t) => t.includes(e) ? t.filter((t) => t !== e) : t.length >= 3 ? (at("Puedes comparar hasta 3 lotes simultáneamente"), t) : [...t, e]);
	}, vt = (e, t, n) => {
		if (!n) return "rgba(148, 163, 184, 0.22)";
		if (f === "estado") return e.estado === "disponible" ? t ? "#059669" : "#10b981" : e.estado === "reservado" ? t ? "#d97706" : "#f59e0b" : t ? "#dc2626" : "#ef4444";
		if (f === "categoria") return e.categoria === "Esquinero" || e.irregular ? t ? "#0284c7" : "#0ea5e9" : t ? "#059669" : "#10b981";
		if (f === "precio") {
			let n = e.precioM2 || e.precioGTQ / e.areaM2;
			return n >= 735 ? t ? "#7c3aed" : "#8b5cf6" : n >= 665 ? t ? "#0284c7" : "#38bdf8" : t ? "#059669" : "#34d399";
		}
		return e.orientacion === "Norte" || e.orientacion === "Este" ? t ? "#0284c7" : "#38bdf8" : t ? "#ea580c" : "#fb923c";
	}, yt = (0, _.useMemo)(() => `🌳 *RESIDENCIALES LAS MACADAMIAS - FASE 2* 🌳
📍 *Cotización Oficial — Lote ${A.label} (${A.sector})*
👤 Preparado para: ${E}

📐 *MEDIDAS Y UBICACIÓN:*
• Código de Terreno: ${A.codigoCatastral}
• Dimensiones: ${A.frente}m frente × ${A.fondo}m fondo
• Área Total: ${A.areaM2} m² (${A.areaV2.toFixed(2)} varas²)
• Categoría: ${A.categoria} (${A.irregular ? "Lote irregular / esquinero" : "Lote rectangular estándar"})
• Orientación Solar: ${A.orientacion}
• Coordenadas GPS: ${A.latitud}° N, ${A.longitud}° W (Retalhuleu)

💰 *PLAN FINANCIERO OFICIAL (${i}):*
• Precio de Lista: ${M(N.precioTotal)}
• Precio por M²: ${M(A.precioM2)}/m²
• Enganche (${j}%): *${M(N.cuotaInicial)}*
• Saldo a Financiar: ${M(N.saldoFinanciar)}
• Cuota Mensual Nivelada (${N.meses} meses al ${oe}%): *${M(N.cuotaMensual)}/mes*

📋 *TABLA OFICIAL DE CUOTAS AL 18% NIVELADO:*
• 12 Meses: ${M(A.cuotasNiveladas?.[12] || 0)}/mes
• 24 Meses: ${M(A.cuotasNiveladas?.[24] || 0)}/mes
• 36 Meses: ${M(A.cuotasNiveladas?.[36] || 0)}/mes
• 48 Meses: ${M(A.cuotasNiveladas?.[48] || 0)}/mes
• 60 Meses: ${M(A.cuotasNiveladas?.[60] || 0)}/mes
• 72 Meses: ${M(A.cuotasNiveladas?.[72] || 0)}/mes
• 84 Meses: ${M(A.cuotasNiveladas?.[84] || 0)}/mes
• 96 Meses: ${M(A.cuotasNiveladas?.[96] || 0)}/mes

🏗️ *SERVICIOS Y URBANIZACIÓN:*
• ${A.servicios.join(" • ")}

💼 Asesor Inmobiliario: ${Ie}
📱 Contacto Directo: https://wa.me/502${Pe.replace(/\D/g, "")}
📅 Vigente según listado oficial octubre 2025`, [
		A,
		E,
		i,
		j,
		N,
		S,
		oe,
		Ie,
		Pe
	]), bt = () => {
		try {
			navigator.clipboard.writeText(yt), qe(!0), at("Ficha digital copiada al portapapeles para WhatsApp / Correo"), setTimeout(() => qe(!1), 2500);
		} catch {
			let e = document.createElement("textarea");
			e.value = yt, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e), qe(!0), at("Ficha digital copiada al portapapeles"), setTimeout(() => qe(!1), 2500);
		}
	}, xt = () => {
		let e = (/* @__PURE__ */ new Date()).toLocaleDateString("es-GT", {
			year: "numeric",
			month: "long",
			day: "numeric"
		}), t = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Ficha_Tecnica_Lote_${A.label}_Retalhuleu.html</title>
  <style>
    @page { size: A4; margin: 14mm; }
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 24px; background: #f8fafc; }
    .sheet { max-width: 780px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #059669; padding-bottom: 18px; margin-bottom: 24px; }
    .brand h1 { margin: 0; font-size: 24px; color: #065f46; letter-spacing: -0.5px; }
    .brand p { margin: 4px 0 0; font-size: 13px; color: #475569; }
    .badge { background: #ecfdf5; color: #047857; border: 1px solid #6ee7b7; padding: 6px 14px; border-radius: 999px; font-weight: 700; font-size: 13px; text-transform: uppercase; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 22px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; }
    .card h3 { margin: 0 0 12px; font-size: 14px; text-transform: uppercase; color: #0f766e; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
    .row { display: flex; justify-content: space-between; font-size: 13.5px; margin-bottom: 8px; }
    .row span:first-child { color: #64748b; }
    .row span:last-child { font-weight: 600; color: #0f172a; }
    .highlight-box { background: linear-gradient(135deg, #065f46, #047857); color: white; border-radius: 10px; padding: 20px; margin-bottom: 22px; display: flex; justify-content: space-between; align-items: center; }
    .highlight-box .price { font-size: 28px; font-weight: 800; margin-top: 4px; }
    .footer { margin-top: 28px; border-top: 1px solid #e2e8f0; padding-top: 14px; display: flex; justify-content: space-between; font-size: 12px; color: #64748b; }
    .print-btn { display: inline-block; margin-bottom: 16px; background: #059669; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; }
    @media print { body { background: white; padding: 0; } .sheet { border: none; box-shadow: none; padding: 0; } .print-btn { display: none; } }
  </style>
</head>
<body>
  <div style="max-width: 780px; margin: 0 auto;">
    <button class="print-btn" onclick="window.print()">🖨️ Imprimir / Guardar como PDF</button>
  </div>
  <div class="sheet">
    <div class="header">
      <div class="brand">
        <h1>RESIDENCIALES LAS MACADAMIAS — FASE 2</h1>
        <p>Retalhuleu, Guatemala • Manzanas F, G, H, I</p>
        <p style="margin-top:4px;font-weight:600;color:#0f172a;">Cliente: ${E} | Fecha: ${e}</p>
      </div>
      <div class="badge">Lote ${A.label} • ${A.estado.toUpperCase()}</div>
    </div>

    <div class="highlight-box">
      <div>
        <div style="font-size:12px;text-transform:uppercase;opacity:0.9;">Precio Total del Lote (${A.categoria})</div>
        <div class="price">${M(N.precioTotal)}</div>
        <div style="font-size:12px;opacity:0.85;">Equivalente a ${M(A.precioGTQ / A.areaM2)} por m²</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:12px;text-transform:uppercase;opacity:0.9;">Cuota Inicial (${j}%)</div>
        <div class="price" style="color:#a7f3d0;">${M(N.cuotaInicial)}</div>
        <div style="font-size:12px;opacity:0.9;">Cuota mensual a ${S} años: <strong>${M(N.cuotaMensual)}/mes</strong></div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <h3>📐 Medidas y Datos Catastrales</h3>
        <div class="row"><span>Identificación del Lote:</span><span>Lote ${A.label} (${A.sector})</span></div>
        <div class="row"><span>Código Catastral:</span><span>${A.codigoCatastral}</span></div>
        <div class="row"><span>Frente × Fondo:</span><span>${A.frente} m × ${A.fondo} m</span></div>
        <div class="row"><span>Área en Metros Cuadrados:</span><span>${A.areaM2.toFixed(2)} m²</span></div>
        <div class="row"><span>Área en Varas Cuadradas:</span><span>${A.areaV2.toFixed(2)} v²</span></div>
        <div class="row"><span>Topografía:</span><span>${A.topografia}</span></div>
      </div>

      <div class="card">
        <h3>🧭 Georreferenciación y Clima</h3>
        <div class="row"><span>Orientación Solar:</span><span>${A.orientacion}</span></div>
        <div class="row"><span>Latitud Norte:</span><span>${A.latitud}° N</span></div>
        <div class="row"><span>Longitud Oeste:</span><span>${A.longitud}° W</span></div>
        <div class="row"><span>Altitud sobre el nivel del mar:</span><span>${A.altitud} msnm</span></div>
        <div class="row"><span>Jurisdicción:</span><span>Retalhuleu, Guatemala</span></div>
        <div class="row"><span>Plusvalía Anual Estimada:</span><span>+${A.plusvaliaAnual}% anual</span></div>
      </div>
    </div>

    <div class="card" style="margin-bottom:20px;">
      <h3>💰 Desglose Financiero y Proyección de Inversión</h3>
      <div class="row"><span>Precio de Contado / Lista:</span><span>${M(N.precioTotal)}</span></div>
      <div class="row"><span>Enganche / Cuota Inicial (${j}%):</span><span>${M(N.cuotaInicial)}</span></div>
      <div class="row"><span>Saldo a Financiar (${S} años / ${N.meses} cuotas):</span><span>${M(N.saldoFinanciar)}</span></div>
      <div class="row"><span>Tasa de Interés Anual Referencial:</span><span>${oe}%</span></div>
      <div class="row"><span>Cuota Mensual Nivelada:</span><span>${M(N.cuotaMensual)} / mes</span></div>
      <div class="row"><span>Valor Proyectado del Lote en 5 Años:</span><span style="color:#059669;">${M(N.valor5Anios)} (+${M(N.gananciaPlusvalia5A)})</span></div>
    </div>

    <div class="card">
      <h3>✨ Urbanización, Servicios y Observaciones Técnicas</h3>
      <p style="font-size:13px;margin:0 0 8px;"><strong>Infraestructura Instalada:</strong> ${A.servicios.join(" • ")}.</p>
      <p style="font-size:13px;margin:0 0 8px;"><strong>Confort Bioclimático:</strong> ${A.asoleamiento}.</p>
      <p style="font-size:13px;margin:0;"><strong>Nota del Asesor Comercial:</strong> ${A.notasVendedor}</p>
    </div>

    <div class="footer">
      <div>Asesor Comercial: <strong>${Ie}</strong> | Contacto: ${Pe}</div>
      <div>Cotización válida por 7 días calendario • Retalhuleu, Guatemala</div>
    </div>
  </div>
  <script>setTimeout(() => { window.print(); }, 400);<\/script>
</body>
</html>`, n = new Blob([t], { type: "text/html;charset=utf-8" }), r = URL.createObjectURL(n), i = document.createElement("a");
		i.href = r, i.download = `Ficha_Tecnica_Lote_${A.label}_Retalhuleu.html`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r), at(`Ficha PDF del Lote ${A.label} descargada`);
	}, St = (0, _.useMemo)(() => ({
		disponibles: e.filter((e) => e.estado === "disponible").length,
		reservados: e.filter((e) => e.estado === "reservado").length,
		vendidos: e.filter((e) => e.estado === "vendido").length,
		total: e.length
	}), [e]), Ct = (0, _.useMemo)(() => {
		let e = (g - 7) / 11;
		return {
			x: 1180 - e * 1080,
			y: 80 + Math.sin(e * Math.PI) * -50,
			progress: e
		};
	}, [g]);
	return /* @__PURE__ */ (0, D.jsxs)("div", {
		className: `w-full bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-all ${ee ? "fixed inset-0 z-50 overflow-hidden flex flex-col bg-slate-950" : "rounded-none sm:rounded-2xl shadow-2xl border-y sm:border border-slate-800"}`,
		children: [
			Je && /* @__PURE__ */ (0, D.jsxs)("div", {
				className: "fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-2.5 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-400/40 animate-bounce",
				children: [/* @__PURE__ */ (0, D.jsx)(T, { className: "w-5 h-5 shrink-0" }), /* @__PURE__ */ (0, D.jsx)("span", {
					className: "text-xs font-semibold",
					children: Je
				})]
			}),
			/* @__PURE__ */ (0, D.jsx)("div", {
				className: "border-b border-slate-800 bg-slate-900/95 backdrop-blur px-3 sm:px-4 py-2.5 sm:py-3 shrink-0",
				children: /* @__PURE__ */ (0, D.jsxs)("div", {
					className: "max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5",
					children: [/* @__PURE__ */ (0, D.jsxs)("div", {
						className: "flex items-center gap-2.5 min-w-0",
						children: [/* @__PURE__ */ (0, D.jsx)("div", {
							className: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/40 shrink-0",
							children: /* @__PURE__ */ (0, D.jsx)(Se, { className: "w-5 h-5 text-white" })
						}), /* @__PURE__ */ (0, D.jsxs)("div", {
							className: "truncate",
							children: [/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "flex items-center gap-1.5 sm:gap-2",
								children: [/* @__PURE__ */ (0, D.jsx)("h1", {
									className: "text-sm sm:text-base font-bold tracking-tight text-white truncate",
									children: "Residenciales Las Macadamias • Fase 2"
								}), /* @__PURE__ */ (0, D.jsx)("span", {
									className: "hidden xs:inline-block text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium shrink-0",
									children: "97 Lotes Reales"
								})]
							}), /* @__PURE__ */ (0, D.jsx)("p", {
								className: "text-[11px] text-slate-400 truncate",
								children: "Retalhuleu, Guatemala • Manzanas F, G, H, I"
							})]
						})]
					}), /* @__PURE__ */ (0, D.jsxs)("div", {
						className: "flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto",
						children: [
							/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 rounded-lg px-2 py-1 text-[11px]",
								children: [
									/* @__PURE__ */ (0, D.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-500 inline-block" }),
									/* @__PURE__ */ (0, D.jsx)("strong", {
										className: "text-white",
										children: St.disponibles
									}),
									/* @__PURE__ */ (0, D.jsx)("span", {
										className: "text-slate-600",
										children: "/"
									}),
									/* @__PURE__ */ (0, D.jsx)("span", { className: "w-2 h-2 rounded-full bg-amber-500 inline-block" }),
									/* @__PURE__ */ (0, D.jsx)("strong", {
										className: "text-white",
										children: St.reservados
									}),
									/* @__PURE__ */ (0, D.jsx)("span", {
										className: "text-slate-600",
										children: "/"
									}),
									/* @__PURE__ */ (0, D.jsx)("span", { className: "w-2 h-2 rounded-full bg-rose-500 inline-block" }),
									/* @__PURE__ */ (0, D.jsx)("strong", {
										className: "text-white",
										children: St.vendidos
									})
								]
							}),
							/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700",
								children: [/* @__PURE__ */ (0, D.jsx)("button", {
									onClick: () => a("GTQ"),
									className: `px-2 py-1 rounded-md text-[11px] font-bold transition ${i === "GTQ" ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-white"}`,
									children: "GTQ"
								}), /* @__PURE__ */ (0, D.jsx)("button", {
									onClick: () => a("USD"),
									className: `px-2 py-1 rounded-md text-[11px] font-bold transition ${i === "USD" ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-white"}`,
									children: "USD"
								})]
							}),
							/* @__PURE__ */ (0, D.jsx)("button", {
								onClick: () => te((e) => !e),
								title: ee ? "Salir de pantalla completa" : "Pantalla completa móvil",
								className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition",
								children: ee ? /* @__PURE__ */ (0, D.jsx)(ye, { className: "w-4 h-4 text-emerald-400" }) : /* @__PURE__ */ (0, D.jsx)(be, { className: "w-4 h-4" })
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, D.jsxs)("div", {
				className: `w-full ${ee ? "flex-grow relative overflow-hidden flex flex-col" : "grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6 p-0 sm:p-4 lg:p-6"}`,
				children: [/* @__PURE__ */ (0, D.jsxs)("section", {
					className: `${ee ? "flex-grow relative w-full h-full" : "lg:col-span-7 flex flex-col gap-3 sm:gap-4"}`,
					children: [/* @__PURE__ */ (0, D.jsxs)("div", {
						className: "bg-slate-900 border-b lg:border lg:rounded-2xl border-slate-800 p-2.5 sm:p-3 flex flex-col gap-2 shadow-lg",
						children: [
							/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2",
								children: [/* @__PURE__ */ (0, D.jsxs)("div", {
									className: "relative flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, D.jsx)(ge, { className: "w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ (0, D.jsx)("input", {
										type: "text",
										value: u,
										onChange: (e) => d(e.target.value),
										placeholder: "Buscar lote (ej. F-1, G-15, H-30)...",
										className: "w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-2 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
									})]
								}), /* @__PURE__ */ (0, D.jsxs)("div", {
									className: "grid grid-cols-2 sm:flex sm:items-center gap-2 shrink-0",
									children: [/* @__PURE__ */ (0, D.jsxs)("select", {
										value: o,
										onChange: (e) => s(e.target.value),
										className: "w-full sm:w-auto bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 truncate",
										children: [
											/* @__PURE__ */ (0, D.jsxs)("option", {
												value: "todos",
												children: [
													"Todos (",
													e.length,
													")"
												]
											}),
											/* @__PURE__ */ (0, D.jsxs)("option", {
												value: "disponible",
												children: [
													"Disponibles (",
													St.disponibles,
													")"
												]
											}),
											/* @__PURE__ */ (0, D.jsxs)("option", {
												value: "reservado",
												children: [
													"Reservados (",
													St.reservados,
													")"
												]
											}),
											/* @__PURE__ */ (0, D.jsxs)("option", {
												value: "vendido",
												children: [
													"Vendidos (",
													St.vendidos,
													")"
												]
											})
										]
									}), /* @__PURE__ */ (0, D.jsxs)("select", {
										value: c,
										onChange: (e) => l(e.target.value),
										className: "w-full sm:w-auto bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 truncate",
										children: [
											/* @__PURE__ */ (0, D.jsx)("option", {
												value: "todos",
												children: "Todas las Manzanas"
											}),
											/* @__PURE__ */ (0, D.jsx)("option", {
												value: "Manzana F",
												children: "Manzana F (13 lotes)"
											}),
											/* @__PURE__ */ (0, D.jsx)("option", {
												value: "Manzana G",
												children: "Manzana G (47 lotes)"
											}),
											/* @__PURE__ */ (0, D.jsx)("option", {
												value: "Manzana H",
												children: "Manzana H (34 lotes)"
											}),
											/* @__PURE__ */ (0, D.jsx)("option", {
												value: "Manzana I",
												children: "Manzana I (3 lotes)"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "flex items-center justify-between gap-2 overflow-x-auto pb-0.5 text-xs",
								children: [/* @__PURE__ */ (0, D.jsx)("div", {
									className: "flex items-center gap-1 shrink-0",
									children: [
										{
											id: "estado",
											label: "Disponibilidad"
										},
										{
											id: "categoria",
											label: "Categoría"
										},
										{
											id: "precio",
											label: "Valor m²"
										},
										{
											id: "solar",
											label: "☀️ Confort Solar"
										}
									].map((e) => /* @__PURE__ */ (0, D.jsx)("button", {
										onClick: () => p(e.id),
										className: `px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition ${f === e.id ? e.id === "solar" ? "bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-sm" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-slate-800/80 text-slate-400 hover:text-slate-200"}`,
										children: e.label
									}, e.id))
								}), /* @__PURE__ */ (0, D.jsxs)("button", {
									type: "button",
									onClick: () => p((e) => e === "solar" ? "estado" : "solar"),
									className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold shrink-0 transition ${f === "solar" ? "bg-amber-500/25 text-amber-300 border-amber-500/50 shadow" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-amber-300 hover:border-slate-700"}`,
									title: "Activar / Desactivar Simulación Solar",
									children: [/* @__PURE__ */ (0, D.jsx)(pe, { className: `w-3.5 h-3.5 text-amber-400 ${f === "solar" ? "animate-pulse" : ""}` }), /* @__PURE__ */ (0, D.jsxs)("span", {
										className: "text-[11px] font-mono",
										children: [g, ":00h"]
									})]
								})]
							}),
							f === "solar" && /* @__PURE__ */ (0, D.jsxs)("div", {
								className: "bg-slate-950/95 border border-amber-500/30 rounded-xl p-2.5 flex flex-col gap-2 shadow-inner transition-all animate-fadeIn",
								children: [/* @__PURE__ */ (0, D.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "flex items-center gap-1.5 min-w-0",
										children: [
											/* @__PURE__ */ (0, D.jsx)(pe, { className: "w-4 h-4 text-amber-400 shrink-0" }),
											/* @__PURE__ */ (0, D.jsxs)("span", {
												className: "text-xs font-bold text-amber-200 truncate",
												children: [
													"Simulación Solar: ",
													g,
													":00h"
												]
											}),
											/* @__PURE__ */ (0, D.jsx)("span", {
												className: "text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium whitespace-nowrap",
												children: g < 11 ? "🌅 Mañana" : g <= 13 ? "☀️ Mediodía" : "🌇 Tarde"
											})
										]
									}), /* @__PURE__ */ (0, D.jsx)("div", {
										className: "flex items-center gap-1 shrink-0",
										children: [
											{
												h: 8,
												label: "8h"
											},
											{
												h: 12,
												label: "12h"
											},
											{
												h: 15,
												label: "15h"
											},
											{
												h: 17,
												label: "17h"
											}
										].map((e) => /* @__PURE__ */ (0, D.jsx)("button", {
											type: "button",
											onClick: () => v(e.h),
											className: `px-2 py-0.5 rounded-md text-[10px] font-bold border transition ${g === e.h ? "bg-amber-500 text-slate-950 border-amber-400 shadow-sm font-extrabold" : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"}`,
											children: e.label
										}, e.h))
									})]
								}), /* @__PURE__ */ (0, D.jsxs)("div", {
									className: "flex items-center gap-2 pt-0.5",
									children: [
										/* @__PURE__ */ (0, D.jsx)("span", {
											className: "text-[10px] text-slate-400 font-mono shrink-0",
											children: "07:00"
										}),
										/* @__PURE__ */ (0, D.jsx)("input", {
											type: "range",
											min: 7,
											max: 18,
											step: 1,
											value: g,
											onChange: (e) => v(Number(e.target.value)),
											className: "w-full h-2.5 bg-slate-800 rounded-lg accent-amber-400 cursor-pointer"
										}),
										/* @__PURE__ */ (0, D.jsx)("span", {
											className: "text-[10px] text-slate-400 font-mono shrink-0",
											children: "18:00"
										})
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, D.jsxs)("div", {
						ref: Qe,
						onMouseDown: ft,
						onMouseMove: pt,
						onMouseUp: mt,
						onWheel: ht,
						className: `relative w-full bg-slate-950 overflow-hidden select-none border-b sm:border border-slate-800 sm:rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing touch-none ${ee ? "flex-grow h-full" : "h-[54vh] sm:h-[580px] lg:h-[620px]"}`,
						children: [
							/* @__PURE__ */ (0, D.jsx)("div", {
								className: "absolute top-2.5 left-2.5 z-20 flex items-center gap-2 pointer-events-none",
								children: /* @__PURE__ */ (0, D.jsxs)("div", {
									className: "bg-slate-950/85 backdrop-blur border border-slate-800 rounded-xl px-2.5 py-1.5 flex items-center gap-2 shadow-lg",
									children: [/* @__PURE__ */ (0, D.jsx)(w, { className: "w-4 h-4 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, D.jsxs)("div", {
										className: "text-[10px] leading-tight",
										children: [/* @__PURE__ */ (0, D.jsx)("div", {
											className: "font-bold text-white",
											children: "NORTE ↑"
										}), /* @__PURE__ */ (0, D.jsx)("div", {
											className: "text-slate-400 hidden xs:block",
											children: "Brisa Sur → Norte"
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 bg-slate-950/90 backdrop-blur border border-slate-800 rounded-xl p-1 shadow-xl",
								children: [
									/* @__PURE__ */ (0, D.jsxs)("div", {
										title: "Escala actual del mapa (usa 2 dedos para pellizcar y escalar)",
										className: "flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold",
										children: [/* @__PURE__ */ (0, D.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ (0, D.jsxs)("span", {
											ref: et,
											children: [Math.round(x * 100), "%"]
										})]
									}),
									/* @__PURE__ */ (0, D.jsx)("button", {
										onClick: () => ut(.3),
										title: "Acercar (Solo escritorio)",
										className: "hidden sm:flex w-7 h-7 rounded-lg hover:bg-slate-800 active:bg-slate-700 items-center justify-center text-slate-200 transition",
										children: /* @__PURE__ */ (0, D.jsx)(ue, { className: "w-3.5 h-3.5" })
									}),
									/* @__PURE__ */ (0, D.jsx)("button", {
										onClick: () => ut(-.3),
										title: "Alejar (Solo escritorio)",
										className: "hidden sm:flex w-7 h-7 rounded-lg hover:bg-slate-800 active:bg-slate-700 items-center justify-center text-slate-200 transition",
										children: /* @__PURE__ */ (0, D.jsx)(le, { className: "w-3.5 h-3.5" })
									}),
									/* @__PURE__ */ (0, D.jsx)("button", {
										onClick: () => st(A, 1.8),
										title: "Centrar en lote seleccionado",
										className: "w-7 h-7 rounded-lg hover:bg-slate-800 active:bg-slate-700 flex items-center justify-center text-emerald-400 transition",
										children: /* @__PURE__ */ (0, D.jsx)(Ce, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, D.jsx)("button", {
										onClick: lt,
										title: "Restablecer vista a 100%",
										className: "w-7 h-7 rounded-lg hover:bg-slate-800 active:bg-slate-700 flex items-center justify-center text-slate-300 transition",
										children: /* @__PURE__ */ (0, D.jsx)(_e, { className: "w-3.5 h-3.5" })
									})
								]
							}),
							/* @__PURE__ */ (0, D.jsx)("div", {
								ref: $e,
								style: {
									transform: `translate3d(${ne.x}px, ${ne.y}px, 0px) scale(${x})`,
									transformOrigin: "0 0",
									width: "100%",
									height: "100%"
								},
								className: "w-full h-full select-none",
								children: /* @__PURE__ */ (0, D.jsxs)("svg", {
									viewBox: "0 0 1280 720",
									preserveAspectRatio: "xMidYMid meet",
									className: "w-full h-full select-none",
									children: [
										/* @__PURE__ */ (0, D.jsx)("defs", { children: /* @__PURE__ */ (0, D.jsx)("filter", {
											id: "glowSelected3",
											x: "-20%",
											y: "-20%",
											width: "140%",
											height: "140%",
											children: /* @__PURE__ */ (0, D.jsx)("feDropShadow", {
												dx: "0",
												dy: "0",
												stdDeviation: "5",
												floodColor: "#38bdf8",
												floodOpacity: "0.95"
											})
										}) }),
										/* @__PURE__ */ (0, D.jsx)("image", {
											href: je,
											width: "1280",
											height: "720",
											style: { opacity: .92 },
											preserveAspectRatio: "none"
										}),
										/* @__PURE__ */ (0, D.jsx)("path", {
											d: "M 1180 80 Q 640 10, 100 80",
											fill: "none",
											stroke: "#fbbf24",
											strokeWidth: "1.5",
											strokeDasharray: "5,5",
											opacity: "0.60"
										}),
										/* @__PURE__ */ (0, D.jsxs)("g", {
											transform: `translate(${Ct.x}, ${Ct.y})`,
											children: [
												/* @__PURE__ */ (0, D.jsx)("circle", {
													cx: "0",
													cy: "0",
													r: "15",
													fill: "#f59e0b",
													opacity: "0.30"
												}),
												/* @__PURE__ */ (0, D.jsx)("circle", {
													cx: "0",
													cy: "0",
													r: "8",
													fill: "#fbbf24"
												}),
												/* @__PURE__ */ (0, D.jsxs)("text", {
													x: "0",
													y: "-13",
													textAnchor: "middle",
													fill: "#fde68a",
													fontSize: "8.5",
													fontWeight: "700",
													children: [
														"☀️ ",
														g,
														":00"
													]
												})
											]
										}),
										e.map((e) => {
											let t = e.id === A.id, n = ot.some((t) => t.id === e.id), r = Re.includes(e.id), i = vt(e, t, n), a = (12.5 - g) * 1.2;
											return /* @__PURE__ */ (0, D.jsxs)("g", {
												onClick: () => ct(e),
												onTouchEnd: (t) => {
													k.current.hasMoved || (t.stopPropagation(), ct(e));
												},
												className: "cursor-pointer group",
												children: [
													/* @__PURE__ */ (0, D.jsx)("polygon", {
														points: e.points,
														transform: `translate(${a}, 2)`,
														fill: "#020617",
														opacity: n ? "0.32" : "0.08"
													}),
													/* @__PURE__ */ (0, D.jsx)("polygon", {
														points: e.points,
														fill: i,
														fillOpacity: t ? .85 : n ? .52 : .12,
														stroke: t ? "#ffffff" : r ? "#818cf8" : "#0f172a",
														strokeWidth: t ? 3 : r ? 2.5 : 1.2,
														filter: t ? "url(#glowSelected3)" : void 0,
														className: "transition-all duration-150 hover:brightness-125"
													}),
													n && /* @__PURE__ */ (0, D.jsxs)("g", {
														className: "pointer-events-none select-none",
														children: [/* @__PURE__ */ (0, D.jsx)("rect", {
															x: e.centerX - 16,
															y: e.centerY - 8,
															width: 32,
															height: 16,
															rx: 4,
															fill: t ? "#0f172a" : "rgba(15, 23, 42, 0.88)",
															stroke: t ? "#38bdf8" : i,
															strokeWidth: t ? 1.5 : .9
														}), /* @__PURE__ */ (0, D.jsx)("text", {
															x: e.centerX,
															y: e.centerY + 3.5,
															textAnchor: "middle",
															fill: t ? "#38bdf8" : "#f8fafc",
															fontSize: "8.5",
															fontWeight: "800",
															children: e.label
														})]
													}),
													t && /* @__PURE__ */ (0, D.jsx)("circle", {
														cx: e.centerX,
														cy: e.centerY - 16,
														r: "4",
														fill: "#ffffff",
														stroke: "#059669",
														strokeWidth: "2"
													})
												]
											}, e.id);
										})
									]
								})
							}),
							/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "absolute bottom-2 left-2 right-2 z-20 flex items-center gap-1.5 overflow-x-auto py-1 px-1.5 bg-slate-950/85 backdrop-blur border border-slate-800 rounded-xl",
								children: [/* @__PURE__ */ (0, D.jsx)("span", {
									className: "text-[10px] text-slate-400 font-semibold px-1 whitespace-nowrap hidden sm:inline",
									children: "Ir a lote:"
								}), ot.map((e) => /* @__PURE__ */ (0, D.jsxs)("button", {
									onClick: () => {
										r(e.id), ce(null), b("peek"), st(e, 1.5);
									},
									className: `px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 border transition flex items-center gap-1 ${A.id === e.id ? "bg-emerald-600 text-white border-emerald-400 shadow" : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"}`,
									children: [/* @__PURE__ */ (0, D.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${e.estado === "disponible" ? "bg-emerald-400" : e.estado === "reservado" ? "bg-amber-400" : "bg-rose-400"}` }), /* @__PURE__ */ (0, D.jsx)("span", { children: e.label })]
								}, e.id))]
							})
						]
					})]
				}), /* @__PURE__ */ (0, D.jsx)("section", {
					className: "hidden lg:flex lg:col-span-5 flex-col gap-4",
					children: /* @__PURE__ */ (0, D.jsxs)("div", {
						className: `bg-slate-900 border rounded-2xl p-5 shadow-xl transition-all duration-300 ${it.borderColor} ${Xe ? "ring-2 ring-white/50" : "border-slate-800"}`,
						children: [
							/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "flex items-start justify-between gap-3 mb-4",
								children: [/* @__PURE__ */ (0, D.jsxs)("div", { children: [/* @__PURE__ */ (0, D.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, D.jsxs)("span", {
										className: "px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold",
										children: ["LOTE ", A.label]
									}), /* @__PURE__ */ (0, D.jsxs)("span", {
										className: "text-xs font-medium text-slate-400",
										children: ["ID: ", A.codigoCatastral]
									})]
								}), /* @__PURE__ */ (0, D.jsxs)("h2", {
									className: "text-xl font-bold text-white mt-1",
									children: [
										A.sector,
										" • ",
										A.categoria
									]
								})] }), /* @__PURE__ */ (0, D.jsx)("span", {
									className: `px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${A.estado === "disponible" ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40" : A.estado === "reservado" ? "bg-amber-500/15 text-amber-300 border-amber-500/40" : "bg-rose-500/15 text-rose-300 border-rose-500/40"}`,
									children: A.estado
								})]
							}),
							/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/90 via-slate-900 to-slate-950 border border-emerald-500/30 mb-4",
								children: [/* @__PURE__ */ (0, D.jsxs)("div", { children: [
									/* @__PURE__ */ (0, D.jsx)("span", {
										className: "text-[11px] uppercase tracking-wider text-slate-400 block",
										children: "Precio Total"
									}),
									/* @__PURE__ */ (0, D.jsx)("div", {
										className: "text-2xl font-extrabold text-white mt-0.5",
										children: M(N.precioTotal)
									}),
									/* @__PURE__ */ (0, D.jsxs)("span", {
										className: "text-[11px] text-emerald-400",
										children: [M(A.precioGTQ / A.areaM2), " / m²"]
									})
								] }), /* @__PURE__ */ (0, D.jsxs)("div", {
									className: "border-l border-slate-800 pl-3",
									children: [
										/* @__PURE__ */ (0, D.jsxs)("span", {
											className: "text-[11px] uppercase tracking-wider text-slate-400 block",
											children: [
												"Cuota Inicial (",
												j,
												"%)"
											]
										}),
										/* @__PURE__ */ (0, D.jsx)("div", {
											className: "text-2xl font-extrabold text-emerald-400 mt-0.5",
											children: M(N.cuotaInicial)
										}),
										/* @__PURE__ */ (0, D.jsxs)("span", {
											className: "text-[11px] text-slate-300",
											children: [
												"Desde ",
												M(N.cuotaMensual),
												"/mes"
											]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "grid grid-cols-2 gap-2.5 mb-4",
								children: [/* @__PURE__ */ (0, D.jsxs)("button", {
									onClick: () => Ue(!0),
									className: "flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-900/40 transition",
									children: [/* @__PURE__ */ (0, D.jsx)(he, { className: "w-4 h-4" }), /* @__PURE__ */ (0, D.jsx)("span", { children: "Compartir Ficha Digital" })]
								}), /* @__PURE__ */ (0, D.jsxs)("button", {
									onClick: () => Ge(!0),
									className: "flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-xs transition",
									children: [/* @__PURE__ */ (0, D.jsx)(Te, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ (0, D.jsx)("span", { children: "Descargar Ficha PDF" })]
								})]
							}),
							/* @__PURE__ */ (0, D.jsx)("div", {
								className: "grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-4",
								children: [
									{
										id: "ficha",
										label: "Ficha Técnica"
									},
									{
										id: "cotizador",
										label: "Cotizador"
									},
									{
										id: "plusvalia",
										label: "ROI / Clima"
									},
									{
										id: "ideas",
										label: "Innovación"
									}
								].map((e) => /* @__PURE__ */ (0, D.jsx)("button", {
									onClick: () => h(e.id),
									className: `py-2 rounded-lg text-xs font-semibold transition ${m === e.id ? "bg-slate-800 text-emerald-400 shadow" : "text-slate-400 hover:text-slate-200"}`,
									children: e.label
								}, e.id))
							}),
							m === "ficha" && /* @__PURE__ */ (0, D.jsxs)("div", {
								className: "space-y-3 text-xs",
								children: [
									/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "grid grid-cols-2 gap-2.5",
										children: [
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "bg-slate-950/90 border border-slate-800/90 p-3 rounded-xl",
												children: [
													/* @__PURE__ */ (0, D.jsxs)("span", {
														className: "text-slate-400 flex items-center gap-1.5 mb-1",
														children: [/* @__PURE__ */ (0, D.jsx)(xe, { className: "w-3.5 h-3.5 text-emerald-400" }), " Medidas (Frente × Fondo)"]
													}),
													/* @__PURE__ */ (0, D.jsxs)("div", {
														className: "text-sm font-bold text-white",
														children: [
															A.frente,
															" m × ",
															A.fondo,
															" m"
														]
													}),
													/* @__PURE__ */ (0, D.jsxs)("div", {
														className: "text-[11px] text-slate-400 mt-0.5",
														children: [
															A.areaM2,
															" m² • ",
															A.areaV2.toFixed(2),
															" varas²"
														]
													})
												]
											}),
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "bg-slate-950/90 border border-slate-800/90 p-3 rounded-xl",
												children: [
													/* @__PURE__ */ (0, D.jsxs)("span", {
														className: "text-slate-400 flex items-center gap-1.5 mb-1",
														children: [/* @__PURE__ */ (0, D.jsx)(w, { className: "w-3.5 h-3.5 text-emerald-400" }), " Orientación y Categoría"]
													}),
													/* @__PURE__ */ (0, D.jsxs)("div", {
														className: "text-sm font-bold text-white",
														children: ["Orientación ", A.orientacion]
													}),
													/* @__PURE__ */ (0, D.jsxs)("div", {
														className: "text-[11px] text-emerald-400 mt-0.5",
														children: ["Categoría: ", A.categoria]
													})
												]
											}),
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "bg-slate-950/90 border border-slate-800/90 p-3 rounded-xl",
												children: [
													/* @__PURE__ */ (0, D.jsxs)("span", {
														className: "text-slate-400 flex items-center gap-1.5 mb-1",
														children: [/* @__PURE__ */ (0, D.jsx)(ve, { className: "w-3.5 h-3.5 text-emerald-400" }), " Latitud y Longitud GPS"]
													}),
													/* @__PURE__ */ (0, D.jsxs)("div", {
														className: "text-sm font-bold text-white",
														children: [A.latitud, "° N"]
													}),
													/* @__PURE__ */ (0, D.jsxs)("div", {
														className: "text-[11px] text-slate-400 mt-0.5",
														children: [A.longitud, "° W (Retalhuleu)"]
													})
												]
											}),
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "bg-slate-950/90 border border-slate-800/90 p-3 rounded-xl",
												children: [
													/* @__PURE__ */ (0, D.jsxs)("span", {
														className: "text-slate-400 flex items-center gap-1.5 mb-1",
														children: [/* @__PURE__ */ (0, D.jsx)(fe, { className: "w-3.5 h-3.5 text-emerald-400" }), " Altitud y Topografía"]
													}),
													/* @__PURE__ */ (0, D.jsxs)("div", {
														className: "text-sm font-bold text-white",
														children: [A.altitud, " msnm"]
													}),
													/* @__PURE__ */ (0, D.jsx)("div", {
														className: "text-[11px] text-slate-400 mt-0.5",
														children: A.topografia
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "bg-slate-950/90 border border-slate-800/90 p-3.5 rounded-xl space-y-2",
										children: [
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "font-semibold text-slate-200 flex items-center justify-between",
												children: [/* @__PURE__ */ (0, D.jsx)("span", { children: "Servicios a Pie de Lote" }), /* @__PURE__ */ (0, D.jsx)("span", {
													className: "text-[11px] text-emerald-400",
													children: "Entrega Inmediata"
												})]
											}),
											/* @__PURE__ */ (0, D.jsx)("div", {
												className: "flex flex-wrap gap-1.5",
												children: A.servicios.map((e, t) => /* @__PURE__ */ (0, D.jsxs)("span", {
													className: "px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px]",
													children: ["✓ ", e]
												}, t))
											}),
											/* @__PURE__ */ (0, D.jsxs)("p", {
												className: "text-slate-400 pt-1 border-t border-slate-800/80 leading-relaxed",
												children: [
													/* @__PURE__ */ (0, D.jsx)("strong", {
														className: "text-slate-200",
														children: "Argumento de Venta:"
													}),
													" ",
													A.notasVendedor
												]
											})
										]
									}),
									/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "bg-slate-950/90 border border-slate-800/90 p-3.5 rounded-xl flex flex-col gap-2.5",
										children: [/* @__PURE__ */ (0, D.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, D.jsx)("span", {
												className: "font-semibold text-slate-300",
												children: "Control de Sala de Ventas:"
											}), /* @__PURE__ */ (0, D.jsxs)("button", {
												onClick: () => _t(A.id),
												className: "text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1",
												children: [/* @__PURE__ */ (0, D.jsx)(we, { className: "w-3.5 h-3.5" }), Re.includes(A.id) ? "Quitar de comparar" : "+ Comparar lote"]
											})]
										}), /* @__PURE__ */ (0, D.jsxs)("div", {
											className: "grid grid-cols-3 gap-2",
											children: [
												/* @__PURE__ */ (0, D.jsx)("button", {
													onClick: () => gt("disponible"),
													className: `py-1.5 rounded-lg font-semibold border transition ${A.estado === "disponible" ? "bg-emerald-600 text-white border-emerald-400" : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"}`,
													children: "Disponible"
												}),
												/* @__PURE__ */ (0, D.jsx)("button", {
													onClick: () => gt("reservado"),
													className: `py-1.5 rounded-lg font-semibold border transition ${A.estado === "reservado" ? "bg-amber-600 text-white border-amber-400" : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"}`,
													children: "Reservar Lote"
												}),
												/* @__PURE__ */ (0, D.jsx)("button", {
													onClick: () => gt("vendido"),
													className: `py-1.5 rounded-lg font-semibold border transition ${A.estado === "vendido" ? "bg-rose-600 text-white border-rose-400" : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"}`,
													children: "Marcar Vendido"
												})
											]
										})]
									})
								]
							}),
							m === "cotizador" && /* @__PURE__ */ (0, D.jsxs)("div", {
								className: "space-y-3.5 text-xs",
								children: [
									/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "grid grid-cols-2 gap-2.5",
										children: [/* @__PURE__ */ (0, D.jsxs)("div", { children: [/* @__PURE__ */ (0, D.jsx)("label", {
											className: "text-slate-400 block mb-1",
											children: "Prospecto / Cliente"
										}), /* @__PURE__ */ (0, D.jsx)("input", {
											type: "text",
											value: E,
											onChange: (e) => Ne(e.target.value),
											className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
										})] }), /* @__PURE__ */ (0, D.jsxs)("div", { children: [/* @__PURE__ */ (0, D.jsx)("label", {
											className: "text-slate-400 block mb-1",
											children: "WhatsApp Cliente"
										}), /* @__PURE__ */ (0, D.jsx)("input", {
											type: "text",
											value: Pe,
											onChange: (e) => Fe(e.target.value),
											className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
										})] })]
									}),
									/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-3",
										children: [
											/* @__PURE__ */ (0, D.jsxs)("div", { children: [/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "flex justify-between mb-1",
												children: [/* @__PURE__ */ (0, D.jsx)("span", {
													className: "text-slate-300",
													children: "Cuota Inicial (Enganche):"
												}), /* @__PURE__ */ (0, D.jsxs)("strong", {
													className: "text-emerald-400",
													children: [
														j,
														"% (",
														M(N.cuotaInicial),
														")"
													]
												})]
											}), /* @__PURE__ */ (0, D.jsx)("input", {
												type: "range",
												min: 10,
												max: 50,
												step: 5,
												value: j,
												onChange: (e) => ce(Number(e.target.value)),
												className: "w-full accent-emerald-500 cursor-pointer"
											})] }),
											/* @__PURE__ */ (0, D.jsxs)("div", { children: [
												/* @__PURE__ */ (0, D.jsxs)("div", {
													className: "flex justify-between mb-1.5",
													children: [/* @__PURE__ */ (0, D.jsx)("span", {
														className: "text-slate-300",
														children: "Plazo Oficial de Financiamiento:"
													}), /* @__PURE__ */ (0, D.jsxs)("strong", {
														className: "text-white",
														children: [
															N.meses,
															" meses (",
															S,
															" ",
															S === 1 ? "año" : "años",
															")"
														]
													})]
												}),
												/* @__PURE__ */ (0, D.jsx)("div", {
													className: "grid grid-cols-4 gap-1.5 mb-2",
													children: [
														12,
														24,
														36,
														48,
														60,
														72,
														84,
														96
													].map((e) => /* @__PURE__ */ (0, D.jsxs)("button", {
														type: "button",
														onClick: () => ae(e / 12),
														className: `py-1 px-1 rounded-lg text-[10px] font-bold border transition ${Math.round(S * 12) === e ? "bg-emerald-600 text-white border-emerald-400 shadow-sm" : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"}`,
														children: [
															e,
															"m (",
															e / 12,
															"a)"
														]
													}, e))
												}),
												/* @__PURE__ */ (0, D.jsx)("input", {
													type: "range",
													min: 1,
													max: 8,
													step: 1,
													value: S,
													onChange: (e) => ae(Number(e.target.value)),
													className: "w-full accent-emerald-500 cursor-pointer"
												})
											] }),
											/* @__PURE__ */ (0, D.jsxs)("div", { children: [/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "flex justify-between mb-1",
												children: [/* @__PURE__ */ (0, D.jsx)("span", {
													className: "text-slate-300",
													children: "Tasa Anual Nivelada:"
												}), /* @__PURE__ */ (0, D.jsxs)("strong", {
													className: "text-white",
													children: [oe, "% anual"]
												})]
											}), /* @__PURE__ */ (0, D.jsx)("input", {
												type: "range",
												min: 10,
												max: 22,
												step: .5,
												value: oe,
												onChange: (e) => C(Number(e.target.value)),
												className: "w-full accent-emerald-500 cursor-pointer"
											})] })
										]
									}),
									/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-2",
										children: [
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, D.jsx)("span", {
													className: "text-slate-400",
													children: "Precio de Lista:"
												}), /* @__PURE__ */ (0, D.jsx)("span", {
													className: "font-bold text-white",
													children: M(N.precioTotal)
												})]
											}),
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, D.jsx)("span", {
													className: "text-slate-400",
													children: "Enganche 10%:"
												}), /* @__PURE__ */ (0, D.jsx)("span", {
													className: "font-semibold text-emerald-400",
													children: M(N.cuotaInicial)
												})]
											}),
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, D.jsx)("span", {
													className: "text-slate-400",
													children: "Saldo a Financiar:"
												}), /* @__PURE__ */ (0, D.jsx)("span", {
													className: "font-bold text-white",
													children: M(N.saldoFinanciar)
												})]
											}),
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "flex justify-between items-center pt-1 border-t border-slate-800/80",
												children: [/* @__PURE__ */ (0, D.jsxs)("span", {
													className: "text-slate-300 font-semibold",
													children: [
														"Cuota Mensual Nivelada (",
														N.meses,
														"m):"
													]
												}), /* @__PURE__ */ (0, D.jsxs)("span", {
													className: "font-extrabold text-emerald-400 text-sm",
													children: [M(N.cuotaMensual), " / mes"]
												})]
											}),
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, D.jsx)("span", {
													className: "text-slate-400",
													children: "Ingreso Familiar Sugerido:"
												}), /* @__PURE__ */ (0, D.jsxs)("span", {
													className: "font-semibold text-slate-200",
													children: [M(N.cuotaMensual * 3), " / mes"]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "bg-slate-950 border border-slate-800 p-3 rounded-xl",
										children: [/* @__PURE__ */ (0, D.jsxs)("div", {
											className: "text-[11px] font-bold text-slate-300 mb-2 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, D.jsxs)("span", { children: [
												"Tabla Oficial de Cuotas (",
												A.label,
												")"
											] }), /* @__PURE__ */ (0, D.jsx)("span", {
												className: "text-[10px] text-emerald-400 font-normal",
												children: "18% Nivelado"
											})]
										}), /* @__PURE__ */ (0, D.jsx)("div", {
											className: "grid grid-cols-2 gap-1.5 text-[10px]",
											children: [
												12,
												24,
												36,
												48,
												60,
												72,
												84,
												96
											].map((e) => {
												let t = A.cuotasNiveladas?.[e], n = Math.round(S * 12) === e;
												return /* @__PURE__ */ (0, D.jsxs)("div", {
													onClick: () => ae(e / 12),
													className: `p-1.5 rounded-lg border flex justify-between items-center cursor-pointer transition ${n ? "bg-emerald-950/70 border-emerald-500/60 text-white font-bold" : "bg-slate-900/60 border-slate-800/60 text-slate-300 hover:border-slate-700"}`,
													children: [/* @__PURE__ */ (0, D.jsxs)("span", {
														className: "text-slate-400",
														children: [e, " meses:"]
													}), /* @__PURE__ */ (0, D.jsx)("span", {
														className: n ? "text-emerald-300" : "text-slate-200",
														children: M(t || 0)
													})]
												}, e);
											})
										})]
									})
								]
							}),
							m === "plusvalia" && /* @__PURE__ */ (0, D.jsxs)("div", {
								className: "space-y-3 text-xs",
								children: [/* @__PURE__ */ (0, D.jsxs)("div", {
									className: "bg-slate-950 border border-slate-800 p-3.5 rounded-xl",
									children: [
										/* @__PURE__ */ (0, D.jsxs)("div", {
											className: "font-semibold text-emerald-400 mb-1 flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, D.jsx)(pe, { className: "w-4 h-4" }), " Análisis Bioclimático en Retalhuleu"]
										}),
										/* @__PURE__ */ (0, D.jsxs)("p", {
											className: "text-slate-300 leading-relaxed mb-2",
											children: [A.asoleamiento, "."]
										}),
										/* @__PURE__ */ (0, D.jsxs)("div", {
											className: "text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800",
											children: [
												"💡 ",
												/* @__PURE__ */ (0, D.jsx)("strong", { children: "Tip Arquitectónico:" }),
												" Orientación ",
												/* @__PURE__ */ (0, D.jsx)("strong", { children: A.orientacion }),
												" permite ubicar dormitorios hacia la sombra vespertina, ahorrando energía en climatización."
											]
										})
									]
								}), /* @__PURE__ */ (0, D.jsxs)("div", {
									className: "bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-2",
									children: [/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "font-semibold text-white flex items-center justify-between",
										children: [/* @__PURE__ */ (0, D.jsx)("span", { children: "Proyección de Plusvalía a 5 Años" }), /* @__PURE__ */ (0, D.jsxs)("span", {
											className: "text-emerald-400",
											children: [
												"+",
												A.plusvaliaAnual,
												"% Anual"
											]
										})]
									}), /* @__PURE__ */ (0, D.jsxs)("div", {
										className: "grid grid-cols-2 gap-2 pt-1",
										children: [/* @__PURE__ */ (0, D.jsxs)("div", {
											className: "bg-slate-900 p-2.5 rounded-lg border border-slate-800",
											children: [/* @__PURE__ */ (0, D.jsx)("span", {
												className: "text-slate-400 block text-[11px]",
												children: "Valor Actual"
											}), /* @__PURE__ */ (0, D.jsx)("strong", {
												className: "text-sm text-white",
												children: M(N.precioTotal)
											})]
										}), /* @__PURE__ */ (0, D.jsxs)("div", {
											className: "bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-500/30",
											children: [/* @__PURE__ */ (0, D.jsx)("span", {
												className: "text-emerald-300 block text-[11px]",
												children: "Valor Proyectado (5A)"
											}), /* @__PURE__ */ (0, D.jsx)("strong", {
												className: "text-sm text-emerald-400",
												children: M(N.valor5Anios)
											})]
										})]
									})]
								})]
							}),
							m === "ideas" && /* @__PURE__ */ (0, D.jsxs)("div", {
								className: "space-y-2 text-xs",
								children: [/* @__PURE__ */ (0, D.jsxs)("div", {
									className: "p-3 rounded-xl bg-slate-950 border border-slate-800",
									children: [/* @__PURE__ */ (0, D.jsx)("div", {
										className: "font-bold text-emerald-400",
										children: "Gestos Táctiles 100% Móviles"
									}), /* @__PURE__ */ (0, D.jsx)("p", {
										className: "text-slate-400 mt-0.5",
										children: "Pellizca con 2 dedos para zoom fluido o desliza con 1 dedo. En tablets y smartphones el mapa es totalmente libre y sensible."
									})]
								}), /* @__PURE__ */ (0, D.jsxs)("div", {
									className: "p-3 rounded-xl bg-slate-950 border border-slate-800",
									children: [/* @__PURE__ */ (0, D.jsx)("div", {
										className: "font-bold text-sky-400",
										children: "Bottom Sheet para Vendedores"
									}), /* @__PURE__ */ (0, D.jsx)("p", {
										className: "text-slate-400 mt-0.5",
										children: "Permite a los asesores tocar cualquier lote y desplegar cotización instantánea sin perder visibilidad del masterplan."
									})]
								})]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, D.jsxs)("div", {
				className: "block lg:hidden",
				children: [y === "expanded" && /* @__PURE__ */ (0, D.jsx)("div", {
					onClick: () => b("peek"),
					className: "fixed inset-0 bg-slate-950/60 backdrop-blur-[2px] z-40 transition-opacity duration-300"
				}), /* @__PURE__ */ (0, D.jsx)("div", {
					className: `fixed bottom-0 left-0 right-0 z-40 w-full max-w-full pointer-events-none flex justify-center items-end ${y === "expanded" ? "top-[5.5rem] md:top-[6.5rem]" : ""}`,
					children: /* @__PURE__ */ (0, D.jsxs)("div", {
						style: y === "expanded" ? {
							height: "calc(100dvh - 5.5rem)",
							maxHeight: "calc(100dvh - 5.5rem)"
						} : void 0,
						className: `pointer-events-auto w-full max-w-xl bg-slate-900/98 backdrop-blur-2xl border-t sm:border-x border-slate-800 shadow-[0_-10px_35px_rgba(0,0,0,0.6)] transition-all duration-300 overflow-hidden flex flex-col ${y === "expanded" ? "h-full max-h-full rounded-t-3xl" : "h-auto rounded-t-2xl"}`,
						children: [
							/* @__PURE__ */ (0, D.jsxs)("div", {
								onClick: () => b((e) => e === "peek" ? "expanded" : "peek"),
								className: `w-full pt-2 pb-2.5 px-3.5 flex flex-col cursor-pointer select-none rounded-t-2xl border-b transition-all duration-300 shrink-0 sticky top-0 z-30 shadow-md ${it.headerBg} ${it.borderColor} ${Xe ? "brightness-125 ring-2 ring-white/70 shadow-xl" : "shadow"}`,
								children: [/* @__PURE__ */ (0, D.jsx)("div", {
									className: "flex justify-center mb-1.5",
									children: /* @__PURE__ */ (0, D.jsx)("div", { className: `w-10 h-1 rounded-full ${it.handleBg}` })
								}), /* @__PURE__ */ (0, D.jsxs)("div", {
									className: "flex items-center justify-between gap-2 text-white",
									children: [/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "flex items-center gap-1.5 min-w-0",
										children: [
											/* @__PURE__ */ (0, D.jsxs)("span", {
												className: "relative flex h-2 w-2 shrink-0",
												children: [/* @__PURE__ */ (0, D.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" }), /* @__PURE__ */ (0, D.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-white" })]
											}),
											/* @__PURE__ */ (0, D.jsxs)("span", {
												className: "text-xs font-black tracking-wide uppercase truncate",
												children: [
													"LOTE ",
													A.label,
													" • ",
													A.sector
												]
											}),
											/* @__PURE__ */ (0, D.jsx)("span", {
												className: `text-[9px] font-black px-2 py-0.5 rounded-full border uppercase shrink-0 ${it.statusBadge}`,
												children: it.label
											})
										]
									}), /* @__PURE__ */ (0, D.jsx)("div", {
										className: "flex items-center gap-1 shrink-0",
										children: y === "expanded" ? /* @__PURE__ */ (0, D.jsxs)("button", {
											type: "button",
											onClick: (e) => {
												e.stopPropagation(), b("peek");
											},
											className: "flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/70 hover:bg-slate-950 active:scale-95 text-white text-[11px] font-bold border border-white/20 shadow-sm transition",
											children: [/* @__PURE__ */ (0, D.jsx)("span", { children: "Volver al mapa" }), /* @__PURE__ */ (0, D.jsx)(Oe, { className: "w-3.5 h-3.5 text-white" })]
										}) : /* @__PURE__ */ (0, D.jsxs)("div", {
											className: "flex items-center gap-1 text-[11px] font-bold text-white/95",
											children: [/* @__PURE__ */ (0, D.jsx)("span", { children: "Ver Ficha" }), /* @__PURE__ */ (0, D.jsx)(De, { className: "w-3.5 h-3.5 text-white" })]
										})
									})]
								})]
							}),
							y === "peek" && /* @__PURE__ */ (0, D.jsxs)("div", {
								className: "px-3.5 pb-3 pt-1 w-full max-w-full overflow-hidden shrink-0",
								children: [/* @__PURE__ */ (0, D.jsxs)("div", {
									className: "flex items-center justify-between gap-2 w-full",
									children: [/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "flex items-center gap-1.5 min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, D.jsx)("span", {
												className: "px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black shrink-0",
												children: A.label
											}),
											/* @__PURE__ */ (0, D.jsx)("span", {
												className: `px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border shrink-0 ${A.estado === "disponible" ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40" : A.estado === "reservado" ? "bg-amber-500/15 text-amber-300 border-amber-500/40" : "bg-rose-500/15 text-rose-300 border-rose-500/40"}`,
												children: A.estado
											}),
											/* @__PURE__ */ (0, D.jsxs)("span", {
												className: "text-[11px] text-slate-400 truncate hidden sm:inline",
												children: [
													A.frente,
													"×",
													A.fondo,
													"m (",
													A.areaM2,
													"m²)"
												]
											})
										]
									}), /* @__PURE__ */ (0, D.jsxs)("div", {
										className: "text-right shrink-0",
										children: [/* @__PURE__ */ (0, D.jsx)("div", {
											className: "text-sm sm:text-base font-extrabold text-white leading-tight",
											children: M(N.precioTotal)
										}), /* @__PURE__ */ (0, D.jsxs)("div", {
											className: "text-[10px] font-semibold text-emerald-400",
											children: [
												"Desde ",
												M(N.cuotaMensual),
												"/m"
											]
										})]
									})]
								}), /* @__PURE__ */ (0, D.jsxs)("div", {
									className: "flex items-center gap-2 mt-2 w-full",
									children: [
										/* @__PURE__ */ (0, D.jsxs)("button", {
											onClick: () => b("expanded"),
											className: "flex-1 min-w-0 py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition active:scale-[0.98]",
											children: [/* @__PURE__ */ (0, D.jsx)(me, { className: "w-3.5 h-3.5 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, D.jsx)("span", {
												className: "truncate",
												children: "Cotizar y Ficha"
											})]
										}),
										/* @__PURE__ */ (0, D.jsxs)("button", {
											onClick: bt,
											className: "py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-900/30 transition active:scale-[0.98] shrink-0",
											title: "Compartir datos del lote",
											children: [/* @__PURE__ */ (0, D.jsx)(he, { className: "w-3.5 h-3.5 shrink-0" }), /* @__PURE__ */ (0, D.jsx)("span", { children: "Compartir" })]
										}),
										/* @__PURE__ */ (0, D.jsxs)("button", {
											onClick: xt,
											className: "py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1 border border-slate-700 transition active:scale-[0.98] shrink-0",
											title: "Descargar Ficha PDF",
											children: [/* @__PURE__ */ (0, D.jsx)(Te, { className: "w-3.5 h-3.5 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, D.jsx)("span", { children: "PDF" })]
										})
									]
								})]
							}),
							y === "expanded" && /* @__PURE__ */ (0, D.jsxs)("div", {
								className: "flex-1 overflow-y-auto overscroll-contain px-3.5 sm:px-4 pb-10 space-y-3.5 pt-2 max-w-full",
								children: [
									/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0",
										children: [/* @__PURE__ */ (0, D.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, D.jsx)("span", {
												className: "text-[10px] text-slate-400 block",
												children: "Precio Total de Lista"
											}), /* @__PURE__ */ (0, D.jsx)("strong", {
												className: "text-white text-sm block font-extrabold",
												children: M(N.precioTotal)
											})]
										}), /* @__PURE__ */ (0, D.jsxs)("div", {
											className: "text-right shrink-0",
											children: [/* @__PURE__ */ (0, D.jsxs)("span", {
												className: "text-[10px] text-slate-400 block",
												children: [
													"Cuota (",
													N.meses,
													"m al ",
													oe,
													"%)"
												]
											}), /* @__PURE__ */ (0, D.jsxs)("strong", {
												className: "text-emerald-400 text-sm block font-extrabold",
												children: [M(N.cuotaMensual), "/m"]
											})]
										})]
									}),
									/* @__PURE__ */ (0, D.jsx)("div", {
										className: "grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full max-w-full",
										children: [
											{
												id: "ficha",
												label: "Ficha Técnica"
											},
											{
												id: "cotizador",
												label: "Cotizador"
											},
											{
												id: "plusvalia",
												label: "Clima & ROI"
											}
										].map((e) => /* @__PURE__ */ (0, D.jsx)("button", {
											onClick: () => h(e.id),
											className: `py-1.5 px-1 rounded-lg text-[11px] sm:text-xs font-bold transition text-center truncate min-w-0 ${m === e.id ? "bg-slate-800 text-emerald-400 shadow" : "text-slate-400"}`,
											children: e.label
										}, e.id))
									}),
									m === "ficha" && /* @__PURE__ */ (0, D.jsxs)("div", {
										className: "space-y-3 text-xs w-full max-w-full",
										children: [
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "grid grid-cols-2 gap-2 w-full max-w-full",
												children: [
													/* @__PURE__ */ (0, D.jsxs)("div", {
														className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 min-w-0 overflow-hidden",
														children: [
															/* @__PURE__ */ (0, D.jsx)("span", {
																className: "text-slate-400 text-[10px] block",
																children: "Medidas"
															}),
															/* @__PURE__ */ (0, D.jsxs)("strong", {
																className: "text-white text-xs block truncate",
																children: [
																	A.frente,
																	"m × ",
																	A.fondo,
																	"m"
																]
															}),
															/* @__PURE__ */ (0, D.jsxs)("div", {
																className: "text-[10px] text-slate-400 mt-0.5 truncate",
																children: [
																	A.areaM2,
																	" m² (",
																	A.areaV2.toFixed(1),
																	" v²)"
																]
															})
														]
													}),
													/* @__PURE__ */ (0, D.jsxs)("div", {
														className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 min-w-0 overflow-hidden",
														children: [
															/* @__PURE__ */ (0, D.jsx)("span", {
																className: "text-slate-400 text-[10px] block",
																children: "Orientación"
															}),
															/* @__PURE__ */ (0, D.jsx)("strong", {
																className: "text-white text-xs block truncate",
																children: A.orientacion
															}),
															/* @__PURE__ */ (0, D.jsx)("div", {
																className: "text-[10px] text-emerald-400 mt-0.5 truncate",
																children: A.categoria
															})
														]
													}),
													/* @__PURE__ */ (0, D.jsxs)("div", {
														className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 min-w-0 overflow-hidden",
														children: [/* @__PURE__ */ (0, D.jsx)("span", {
															className: "text-slate-400 text-[10px] block",
															children: "Topografía"
														}), /* @__PURE__ */ (0, D.jsx)("strong", {
															className: "text-white text-xs block break-words leading-tight",
															children: A.topografia
														})]
													}),
													/* @__PURE__ */ (0, D.jsxs)("div", {
														className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 min-w-0 overflow-hidden",
														children: [/* @__PURE__ */ (0, D.jsx)("span", {
															className: "text-slate-400 text-[10px] block",
															children: "Altitud GPS"
														}), /* @__PURE__ */ (0, D.jsxs)("strong", {
															className: "text-white text-xs block truncate",
															children: [A.altitud, " msnm"]
														})]
													})
												]
											}),
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "bg-slate-950 p-3 rounded-xl border border-slate-800 w-full max-w-full overflow-hidden",
												children: [/* @__PURE__ */ (0, D.jsx)("div", {
													className: "text-[11px] font-bold text-slate-200 mb-1",
													children: "Servicios Incluidos"
												}), /* @__PURE__ */ (0, D.jsx)("div", {
													className: "flex flex-wrap gap-1 max-w-full",
													children: A.servicios.map((e, t) => /* @__PURE__ */ (0, D.jsxs)("span", {
														className: "px-2 py-0.5 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 rounded max-w-full truncate",
														children: ["✓ ", e]
													}, t))
												})]
											}),
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 w-full max-w-full",
												children: [/* @__PURE__ */ (0, D.jsx)("div", {
													className: "text-[11px] font-bold text-slate-300",
													children: "Cambiar Estado (Sala de Ventas):"
												}), /* @__PURE__ */ (0, D.jsxs)("div", {
													className: "grid grid-cols-3 gap-1.5 w-full max-w-full",
													children: [
														/* @__PURE__ */ (0, D.jsx)("button", {
															onClick: () => gt("disponible"),
															className: `py-1.5 px-1 rounded-lg text-xs font-bold border truncate min-w-0 ${A.estado === "disponible" ? "bg-emerald-600 text-white border-emerald-400" : "bg-slate-900 text-slate-400 border-slate-800"}`,
															children: "Disponible"
														}),
														/* @__PURE__ */ (0, D.jsx)("button", {
															onClick: () => gt("reservado"),
															className: `py-1.5 px-1 rounded-lg text-xs font-bold border truncate min-w-0 ${A.estado === "reservado" ? "bg-amber-600 text-white border-amber-400" : "bg-slate-900 text-slate-400 border-slate-800"}`,
															children: "Reservar"
														}),
														/* @__PURE__ */ (0, D.jsx)("button", {
															onClick: () => gt("vendido"),
															className: `py-1.5 px-1 rounded-lg text-xs font-bold border truncate min-w-0 ${A.estado === "vendido" ? "bg-rose-600 text-white border-rose-400" : "bg-slate-900 text-slate-400 border-slate-800"}`,
															children: "Vendido"
														})
													]
												})]
											})
										]
									}),
									m === "cotizador" && /* @__PURE__ */ (0, D.jsxs)("div", {
										className: "space-y-3 text-xs w-full max-w-full",
										children: [
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3 w-full max-w-full",
												children: [/* @__PURE__ */ (0, D.jsxs)("div", { children: [/* @__PURE__ */ (0, D.jsxs)("div", {
													className: "flex justify-between items-center mb-1 text-xs",
													children: [/* @__PURE__ */ (0, D.jsxs)("span", {
														className: "text-slate-300",
														children: [
															"Enganche (",
															j,
															"%):"
														]
													}), /* @__PURE__ */ (0, D.jsx)("strong", {
														className: "text-emerald-400",
														children: M(N.cuotaInicial)
													})]
												}), /* @__PURE__ */ (0, D.jsx)("input", {
													type: "range",
													min: 10,
													max: 50,
													step: 5,
													value: j,
													onChange: (e) => ce(Number(e.target.value)),
													className: "w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
												})] }), /* @__PURE__ */ (0, D.jsxs)("div", { children: [
													/* @__PURE__ */ (0, D.jsxs)("div", {
														className: "flex justify-between items-center mb-1.5 text-xs",
														children: [/* @__PURE__ */ (0, D.jsxs)("span", {
															className: "text-slate-300",
															children: [
																"Plazo (",
																N.meses,
																" meses):"
															]
														}), /* @__PURE__ */ (0, D.jsxs)("strong", {
															className: "text-white",
															children: [
																S,
																" ",
																S === 1 ? "año" : "años"
															]
														})]
													}),
													/* @__PURE__ */ (0, D.jsx)("div", {
														className: "grid grid-cols-4 gap-1 mb-2",
														children: [
															12,
															24,
															36,
															48,
															60,
															72,
															84,
															96
														].map((e) => /* @__PURE__ */ (0, D.jsxs)("button", {
															type: "button",
															onClick: () => ae(e / 12),
															className: `py-1 px-1 rounded-md text-[10px] font-bold border transition ${Math.round(S * 12) === e ? "bg-emerald-600 text-white border-emerald-400" : "bg-slate-900 text-slate-300 border-slate-800"}`,
															children: [e, "m"]
														}, e))
													}),
													/* @__PURE__ */ (0, D.jsx)("input", {
														type: "range",
														min: 1,
														max: 8,
														step: 1,
														value: S,
														onChange: (e) => ae(Number(e.target.value)),
														className: "w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
													})
												] })]
											}),
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 w-full max-w-full",
												children: [/* @__PURE__ */ (0, D.jsxs)("div", {
													className: "flex justify-between text-xs",
													children: [/* @__PURE__ */ (0, D.jsx)("span", {
														className: "text-slate-400",
														children: "Saldo a Financiar:"
													}), /* @__PURE__ */ (0, D.jsx)("strong", {
														className: "text-white",
														children: M(N.saldoFinanciar)
													})]
												}), /* @__PURE__ */ (0, D.jsxs)("div", {
													className: "flex justify-between text-xs items-center",
													children: [/* @__PURE__ */ (0, D.jsx)("span", {
														className: "text-slate-400",
														children: "Cuota Mensual Nivelada:"
													}), /* @__PURE__ */ (0, D.jsxs)("strong", {
														className: "text-emerald-400 text-sm",
														children: [M(N.cuotaMensual), "/mes"]
													})]
												})]
											}),
											/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1.5 w-full max-w-full",
												children: [/* @__PURE__ */ (0, D.jsxs)("div", {
													className: "text-[10px] font-bold text-slate-300 mb-1 flex justify-between",
													children: [/* @__PURE__ */ (0, D.jsx)("span", { children: "Cuotas Oficiales al 18%" }), /* @__PURE__ */ (0, D.jsxs)("span", {
														className: "text-emerald-400",
														children: ["Lote ", A.label]
													})]
												}), /* @__PURE__ */ (0, D.jsx)("div", {
													className: "grid grid-cols-2 gap-1 text-[10px]",
													children: [
														12,
														24,
														36,
														48,
														60,
														72,
														84,
														96
													].map((e) => {
														let t = A.cuotasNiveladas?.[e], n = Math.round(S * 12) === e;
														return /* @__PURE__ */ (0, D.jsxs)("div", {
															onClick: () => ae(e / 12),
															className: `p-1 rounded border flex justify-between items-center cursor-pointer ${n ? "bg-emerald-950/80 border-emerald-500 text-white font-bold" : "bg-slate-900 border-slate-800 text-slate-300"}`,
															children: [/* @__PURE__ */ (0, D.jsxs)("span", {
																className: "text-slate-400",
																children: [e, "m:"]
															}), /* @__PURE__ */ (0, D.jsx)("span", {
																className: n ? "text-emerald-300" : "text-slate-200",
																children: M(t || 0)
															})]
														}, e);
													})
												})]
											})
										]
									}),
									m === "plusvalia" && /* @__PURE__ */ (0, D.jsxs)("div", {
										className: "space-y-3 text-xs w-full max-w-full",
										children: [/* @__PURE__ */ (0, D.jsxs)("div", {
											className: "bg-slate-950 p-3 rounded-xl border border-slate-800 w-full max-w-full",
											children: [/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "font-bold text-amber-400 mb-1 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, D.jsx)(pe, { className: "w-4 h-4 shrink-0" }), " Confort Bioclimático"]
											}), /* @__PURE__ */ (0, D.jsxs)("p", {
												className: "text-slate-300 leading-relaxed text-[11px] break-words",
												children: [A.asoleamiento, "."]
											})]
										}), /* @__PURE__ */ (0, D.jsxs)("div", {
											className: "bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 w-full max-w-full",
											children: [/* @__PURE__ */ (0, D.jsxs)("div", {
												className: "flex justify-between text-xs",
												children: [/* @__PURE__ */ (0, D.jsx)("span", {
													className: "text-slate-400",
													children: "Plusvalía estimada:"
												}), /* @__PURE__ */ (0, D.jsxs)("strong", {
													className: "text-emerald-400",
													children: [
														"+",
														A.plusvaliaAnual,
														"% anual"
													]
												})]
											}), /* @__PURE__ */ (0, D.jsxs)("div", {
												className: "flex justify-between text-xs",
												children: [/* @__PURE__ */ (0, D.jsx)("span", {
													className: "text-slate-400",
													children: "Proyección a 5 años:"
												}), /* @__PURE__ */ (0, D.jsx)("strong", {
													className: "text-white",
													children: M(N.valor5Anios)
												})]
											})]
										})]
									}),
									/* @__PURE__ */ (0, D.jsxs)("div", {
										className: "flex items-center gap-2 pt-2",
										children: [/* @__PURE__ */ (0, D.jsxs)("button", {
											onClick: bt,
											className: "flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/30 transition active:scale-[0.98]",
											children: [/* @__PURE__ */ (0, D.jsx)(he, { className: "w-3.5 h-3.5 shrink-0" }), /* @__PURE__ */ (0, D.jsx)("span", { children: "Compartir WhatsApp" })]
										}), /* @__PURE__ */ (0, D.jsxs)("button", {
											onClick: xt,
											className: "py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition active:scale-[0.98]",
											children: [/* @__PURE__ */ (0, D.jsx)(Te, { className: "w-3.5 h-3.5 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, D.jsx)("span", { children: "Descargar PDF" })]
										})]
									}),
									/* @__PURE__ */ (0, D.jsxs)("button", {
										type: "button",
										onClick: () => b("peek"),
										className: "w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 active:bg-slate-850 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 shadow transition",
										children: [/* @__PURE__ */ (0, D.jsx)(Oe, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ (0, D.jsx)("span", { children: "Volver al Mapa Interactivo" })]
									})
								]
							})
						]
					})
				})]
			}),
			He && /* @__PURE__ */ (0, D.jsx)("div", {
				className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, D.jsxs)("div", {
					className: "bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-4 sm:p-5 shadow-2xl space-y-3 sm:space-y-4 max-w-[calc(100vw-1.5rem)] overflow-hidden",
					children: [
						/* @__PURE__ */ (0, D.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-800 pb-3",
							children: [/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, D.jsx)(he, { className: "w-5 h-5 text-emerald-400" }), /* @__PURE__ */ (0, D.jsxs)("h3", {
									className: "font-bold text-white text-sm sm:text-base",
									children: ["Compartir Ficha — Lote ", A.label]
								})]
							}), /* @__PURE__ */ (0, D.jsx)("button", {
								onClick: () => Ue(!1),
								className: "p-1 rounded-lg hover:bg-slate-800 text-slate-400",
								children: /* @__PURE__ */ (0, D.jsx)(de, { className: "w-5 h-5" })
							})]
						}),
						/* @__PURE__ */ (0, D.jsx)("pre", {
							className: "bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-200 whitespace-pre-wrap font-mono max-h-56 overflow-y-auto break-all max-w-full",
							children: yt
						}),
						/* @__PURE__ */ (0, D.jsxs)("div", {
							className: "flex items-center justify-end gap-2 pt-1",
							children: [/* @__PURE__ */ (0, D.jsxs)("button", {
								onClick: bt,
								className: "flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition",
								children: [Ke ? /* @__PURE__ */ (0, D.jsx)(ke, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, D.jsx)(Ee, { className: "w-4 h-4" }), /* @__PURE__ */ (0, D.jsx)("span", { children: Ke ? "¡Copiado!" : "Copiar para WhatsApp" })]
							}), /* @__PURE__ */ (0, D.jsx)("button", {
								onClick: () => Ue(!1),
								className: "px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold",
								children: "Cerrar"
							})]
						})
					]
				})
			}),
			We && /* @__PURE__ */ (0, D.jsx)("div", {
				className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, D.jsxs)("div", {
					className: "bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-4 sm:p-5 shadow-2xl space-y-3 sm:space-y-4 max-w-[calc(100vw-1.5rem)] overflow-hidden",
					children: [
						/* @__PURE__ */ (0, D.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-800 pb-2",
							children: [/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, D.jsx)(Te, { className: "w-5 h-5 text-emerald-400" }), /* @__PURE__ */ (0, D.jsxs)("h3", {
									className: "font-bold text-white text-sm sm:text-base",
									children: ["Ficha Oficial PDF — Lote ", A.label]
								})]
							}), /* @__PURE__ */ (0, D.jsx)("button", {
								onClick: () => Ge(!1),
								className: "p-1 rounded-lg hover:bg-slate-800 text-slate-400",
								children: /* @__PURE__ */ (0, D.jsx)(de, { className: "w-5 h-5" })
							})]
						}),
						/* @__PURE__ */ (0, D.jsxs)("div", {
							className: "bg-white text-slate-900 rounded-xl p-4 border border-slate-300 space-y-2 text-xs",
							children: [
								/* @__PURE__ */ (0, D.jsxs)("div", {
									className: "font-extrabold text-sm text-emerald-900 border-b pb-1",
									children: ["RESIDENCIALES LAS MACADAMIAS - FASE 2 • LOTE ", A.label]
								}),
								/* @__PURE__ */ (0, D.jsxs)("div", {
									className: "text-[11px] text-slate-600",
									children: [
										A.frente,
										"m × ",
										A.fondo,
										"m (",
										A.areaM2,
										"m² / ",
										A.areaV2.toFixed(1),
										" v²) • ",
										A.orientacion
									]
								}),
								/* @__PURE__ */ (0, D.jsxs)("div", {
									className: "flex justify-between bg-emerald-900 text-white p-2.5 rounded-lg",
									children: [
										/* @__PURE__ */ (0, D.jsxs)("div", { children: [/* @__PURE__ */ (0, D.jsx)("div", {
											className: "text-[9px] text-emerald-200",
											children: "Precio"
										}), /* @__PURE__ */ (0, D.jsx)("strong", {
											className: "text-xs",
											children: M(N.precioTotal)
										})] }),
										/* @__PURE__ */ (0, D.jsxs)("div", { children: [/* @__PURE__ */ (0, D.jsxs)("div", {
											className: "text-[9px] text-emerald-200",
											children: [
												"Enganche (",
												j,
												"%)"
											]
										}), /* @__PURE__ */ (0, D.jsx)("strong", {
											className: "text-xs text-emerald-300",
											children: M(N.cuotaInicial)
										})] }),
										/* @__PURE__ */ (0, D.jsxs)("div", { children: [/* @__PURE__ */ (0, D.jsx)("div", {
											className: "text-[9px] text-emerald-200",
											children: "Mensualidad"
										}), /* @__PURE__ */ (0, D.jsxs)("strong", {
											className: "text-xs",
											children: [M(N.cuotaMensual), "/mes"]
										})] })
									]
								})
							]
						}),
						/* @__PURE__ */ (0, D.jsxs)("div", {
							className: "flex items-center justify-end gap-2 pt-1",
							children: [/* @__PURE__ */ (0, D.jsxs)("button", {
								onClick: xt,
								className: "flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition",
								children: [/* @__PURE__ */ (0, D.jsx)(Te, { className: "w-4 h-4" }), /* @__PURE__ */ (0, D.jsx)("span", { children: "Descargar PDF" })]
							}), /* @__PURE__ */ (0, D.jsx)("button", {
								onClick: () => Ge(!1),
								className: "px-3 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold",
								children: "Cerrar"
							})]
						})
					]
				})
			}),
			Be && /* @__PURE__ */ (0, D.jsx)("div", {
				className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, D.jsxs)("div", {
					className: "bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-4 sm:p-5 shadow-2xl space-y-3 max-w-[calc(100vw-1.5rem)] overflow-hidden",
					children: [
						/* @__PURE__ */ (0, D.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-800 pb-2",
							children: [/* @__PURE__ */ (0, D.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, D.jsx)(we, { className: "w-5 h-5 text-indigo-400" }), /* @__PURE__ */ (0, D.jsxs)("h3", {
									className: "font-bold text-white text-sm sm:text-base",
									children: [
										"Comparador (",
										Re.length,
										"/3)"
									]
								})]
							}), /* @__PURE__ */ (0, D.jsx)("button", {
								onClick: () => Ve(!1),
								className: "p-1 rounded-lg hover:bg-slate-800 text-slate-400",
								children: /* @__PURE__ */ (0, D.jsx)(de, { className: "w-5 h-5" })
							})]
						}),
						Re.length === 0 ? /* @__PURE__ */ (0, D.jsx)("p", {
							className: "text-xs text-slate-400 py-4 text-center",
							children: "No hay lotes en el comparador. Usa \"+ Comparar lote\" en la ficha técnica."
						}) : /* @__PURE__ */ (0, D.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, D.jsxs)("table", {
								className: "w-full text-left text-xs border-collapse",
								children: [/* @__PURE__ */ (0, D.jsx)("thead", { children: /* @__PURE__ */ (0, D.jsxs)("tr", {
									className: "border-b border-slate-800 text-slate-400",
									children: [/* @__PURE__ */ (0, D.jsx)("th", {
										className: "py-1.5 px-2",
										children: "Dato"
									}), Re.map((e) => /* @__PURE__ */ (0, D.jsxs)("th", {
										className: "py-1.5 px-2 text-white font-bold",
										children: ["Lote ", e]
									}, e))]
								}) }), /* @__PURE__ */ (0, D.jsxs)("tbody", {
									className: "divide-y divide-slate-800/60",
									children: [
										/* @__PURE__ */ (0, D.jsxs)("tr", { children: [/* @__PURE__ */ (0, D.jsx)("td", {
											className: "py-1.5 px-2 text-slate-400",
											children: "Área"
										}), Re.map((t) => {
											let n = e.find((e) => e.id === t);
											return /* @__PURE__ */ (0, D.jsxs)("td", {
												className: "py-1.5 px-2 text-slate-200",
												children: [n?.areaM2, " m²"]
											}, t);
										})] }),
										/* @__PURE__ */ (0, D.jsxs)("tr", { children: [/* @__PURE__ */ (0, D.jsx)("td", {
											className: "py-1.5 px-2 text-slate-400",
											children: "Precio"
										}), Re.map((t) => {
											let n = e.find((e) => e.id === t);
											return /* @__PURE__ */ (0, D.jsx)("td", {
												className: "py-1.5 px-2 font-bold text-emerald-400",
												children: n ? M(n.precioGTQ) : "-"
											}, t);
										})] }),
										/* @__PURE__ */ (0, D.jsxs)("tr", { children: [/* @__PURE__ */ (0, D.jsx)("td", {
											className: "py-1.5 px-2 text-slate-400",
											children: "Enganche"
										}), Re.map((t) => {
											let n = e.find((e) => e.id === t);
											return /* @__PURE__ */ (0, D.jsx)("td", {
												className: "py-1.5 px-2 text-slate-200",
												children: n ? M(n.precioGTQ * n.cuotaInicialPct / 100) : "-"
											}, t);
										})] })
									]
								})]
							})
						}),
						/* @__PURE__ */ (0, D.jsx)("div", {
							className: "flex justify-end pt-1",
							children: /* @__PURE__ */ (0, D.jsx)("button", {
								onClick: () => Ve(!1),
								className: "px-4 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold",
								children: "Cerrar"
							})
						})
					]
				})
			})
		]
	});
}
// src/lotificacion-entry.tsx
var Pe = document.getElementById("lotificacion-root");
Pe ? (0, ce.createRoot)(Pe).render(/* @__PURE__ */ (0, D.jsx)(_.StrictMode, { children: /* @__PURE__ */ (0, D.jsx)(Ne, {}) })) : console.error("No element with id 'lotificacion-root' found");
