/*! jQuery v1.9.0 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license */
(function(e, t) {
	"use strict";

	function n(e) {
		var t = e.length,
			n = st.type(e);
		return st.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
	}
	function r(e) {
		var t = Tt[e] = {};
		return st.each(e.match(lt) || [], function(e, n) {
			t[n] = !0
		}), t
	}
	function i(e, n, r, i) {
		if (st.acceptData(e)) {
			var o, a, s = st.expando,
				u = "string" == typeof n,
				l = e.nodeType,
				c = l ? st.cache : e,
				f = l ? e[s] : e[s] && s;
			if (f && c[f] && (i || c[f].data) || !u || r !== t) return f || (l ? e[s] = f = K.pop() || st.guid++ : f = s), c[f] || (c[f] = {}, l || (c[f].toJSON = st.noop)), ("object" == typeof n || "function" == typeof n) && (i ? c[f] = st.extend(c[f], n) : c[f].data = st.extend(c[f].data, n)), o = c[f], i || (o.data || (o.data = {}), o = o.data), r !== t && (o[st.camelCase(n)] = r), u ? (a = o[n], null == a && (a = o[st.camelCase(n)])) : a = o, a
		}
	}
	function o(e, t, n) {
		if (st.acceptData(e)) {
			var r, i, o, a = e.nodeType,
				u = a ? st.cache : e,
				l = a ? e[st.expando] : st.expando;
			if (u[l]) {
				if (t && (r = n ? u[l] : u[l].data)) {
					st.isArray(t) ? t = t.concat(st.map(t, st.camelCase)) : t in r ? t = [t] : (t = st.camelCase(t), t = t in r ? [t] : t.split(" "));
					for (i = 0, o = t.length; o > i; i++) delete r[t[i]];
					if (!(n ? s : st.isEmptyObject)(r)) return
				}(n || (delete u[l].data, s(u[l]))) && (a ? st.cleanData([e], !0) : st.support.deleteExpando || u != u.window ? delete u[l] : u[l] = null)
			}
		}
	}
	function a(e, n, r) {
		if (r === t && 1 === e.nodeType) {
			var i = "data-" + n.replace(Nt, "-$1").toLowerCase();
			if (r = e.getAttribute(i), "string" == typeof r) {
				try {
					r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : wt.test(r) ? st.parseJSON(r) : r
				} catch (o) {}
				st.data(e, n, r)
			} else r = t
		}
		return r
	}
	function s(e) {
		var t;
		for (t in e) if (("data" !== t || !st.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
		return !0
	}
	function u() {
		return !0
	}
	function l() {
		return !1
	}
	function c(e, t) {
		do e = e[t];
		while (e && 1 !== e.nodeType);
		return e
	}
	function f(e, t, n) {
		if (t = t || 0, st.isFunction(t)) return st.grep(e, function(e, r) {
			var i = !! t.call(e, r, e);
			return i === n
		});
		if (t.nodeType) return st.grep(e, function(e) {
			return e === t === n
		});
		if ("string" == typeof t) {
			var r = st.grep(e, function(e) {
				return 1 === e.nodeType
			});
			if (Wt.test(t)) return st.filter(t, r, !n);
			t = st.filter(t, r)
		}
		return st.grep(e, function(e) {
			return st.inArray(e, t) >= 0 === n
		})
	}
	function p(e) {
		var t = zt.split("|"),
			n = e.createDocumentFragment();
		if (n.createElement) for (; t.length;) n.createElement(t.pop());
		return n
	}
	function d(e, t) {
		return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
	}
	function h(e) {
		var t = e.getAttributeNode("type");
		return e.type = (t && t.specified) + "/" + e.type, e
	}
	function g(e) {
		var t = nn.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"), e
	}
	function m(e, t) {
		for (var n, r = 0; null != (n = e[r]); r++) st._data(n, "globalEval", !t || st._data(t[r], "globalEval"))
	}
	function y(e, t) {
		if (1 === t.nodeType && st.hasData(e)) {
			var n, r, i, o = st._data(e),
				a = st._data(t, o),
				s = o.events;
			if (s) {
				delete a.handle, a.events = {};
				for (n in s) for (r = 0, i = s[n].length; i > r; r++) st.event.add(t, n, s[n][r])
			}
			a.data && (a.data = st.extend({}, a.data))
		}
	}
	function v(e, t) {
		var n, r, i;
		if (1 === t.nodeType) {
			if (n = t.nodeName.toLowerCase(), !st.support.noCloneEvent && t[st.expando]) {
				r = st._data(t);
				for (i in r.events) st.removeEvent(t, i, r.handle);
				t.removeAttribute(st.expando)
			}
			"script" === n && t.text !== e.text ? (h(t).text = e.text, g(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), st.support.html5Clone && e.innerHTML && !st.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Zt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
		}
	}
	function b(e, n) {
		var r, i, o = 0,
			a = e.getElementsByTagName !== t ? e.getElementsByTagName(n || "*") : e.querySelectorAll !== t ? e.querySelectorAll(n || "*") : t;
		if (!a) for (a = [], r = e.childNodes || e; null != (i = r[o]); o++)!n || st.nodeName(i, n) ? a.push(i) : st.merge(a, b(i, n));
		return n === t || n && st.nodeName(e, n) ? st.merge([e], a) : a
	}
	function x(e) {
		Zt.test(e.type) && (e.defaultChecked = e.checked)
	}
	function T(e, t) {
		if (t in e) return t;
		for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Nn.length; i--;) if (t = Nn[i] + n, t in e) return t;
		return r
	}
	function w(e, t) {
		return e = t || e, "none" === st.css(e, "display") || !st.contains(e.ownerDocument, e)
	}
	function N(e, t) {
		for (var n, r = [], i = 0, o = e.length; o > i; i++) n = e[i], n.style && (r[i] = st._data(n, "olddisplay"), t ? (r[i] || "none" !== n.style.display || (n.style.display = ""), "" === n.style.display && w(n) && (r[i] = st._data(n, "olddisplay", S(n.nodeName)))) : r[i] || w(n) || st._data(n, "olddisplay", st.css(n, "display")));
		for (i = 0; o > i; i++) n = e[i], n.style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? r[i] || "" : "none"));
		return e
	}
	function C(e, t, n) {
		var r = mn.exec(t);
		return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
	}
	function k(e, t, n, r, i) {
		for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)"margin" === n && (a += st.css(e, n + wn[o], !0, i)), r ? ("content" === n && (a -= st.css(e, "padding" + wn[o], !0, i)), "margin" !== n && (a -= st.css(e, "border" + wn[o] + "Width", !0, i))) : (a += st.css(e, "padding" + wn[o], !0, i), "padding" !== n && (a += st.css(e, "border" + wn[o] + "Width", !0, i)));
		return a
	}
	function E(e, t, n) {
		var r = !0,
			i = "width" === t ? e.offsetWidth : e.offsetHeight,
			o = ln(e),
			a = st.support.boxSizing && "border-box" === st.css(e, "boxSizing", !1, o);
		if (0 >= i || null == i) {
			if (i = un(e, t, o), (0 > i || null == i) && (i = e.style[t]), yn.test(i)) return i;
			r = a && (st.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
		}
		return i + k(e, t, n || (a ? "border" : "content"), r, o) + "px"
	}
	function S(e) {
		var t = V,
			n = bn[e];
		return n || (n = A(e, t), "none" !== n && n || (cn = (cn || st("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (cn[0].contentWindow || cn[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = A(e, t), cn.detach()), bn[e] = n), n
	}
	function A(e, t) {
		var n = st(t.createElement(e)).appendTo(t.body),
			r = st.css(n[0], "display");
		return n.remove(), r
	}
	function j(e, t, n, r) {
		var i;
		if (st.isArray(t)) st.each(t, function(t, i) {
			n || kn.test(e) ? r(e, i) : j(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
		});
		else if (n || "object" !== st.type(t)) r(e, t);
		else for (i in t) j(e + "[" + i + "]", t[i], n, r)
	}
	function D(e) {
		return function(t, n) {
			"string" != typeof t && (n = t, t = "*");
			var r, i = 0,
				o = t.toLowerCase().match(lt) || [];
			if (st.isFunction(n)) for (; r = o[i++];)"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
		}
	}
	function L(e, n, r, i) {
		function o(u) {
			var l;
			return a[u] = !0, st.each(e[u] || [], function(e, u) {
				var c = u(n, r, i);
				return "string" != typeof c || s || a[c] ? s ? !(l = c) : t : (n.dataTypes.unshift(c), o(c), !1)
			}), l
		}
		var a = {},
			s = e === $n;
		return o(n.dataTypes[0]) || !a["*"] && o("*")
	}
	function H(e, n) {
		var r, i, o = st.ajaxSettings.flatOptions || {};
		for (r in n) n[r] !== t && ((o[r] ? e : i || (i = {}))[r] = n[r]);
		return i && st.extend(!0, e, i), e
	}
	function M(e, n, r) {
		var i, o, a, s, u = e.contents,
			l = e.dataTypes,
			c = e.responseFields;
		for (o in c) o in r && (n[c[o]] = r[o]);
		for (;
		"*" === l[0];) l.shift(), i === t && (i = e.mimeType || n.getResponseHeader("Content-Type"));
		if (i) for (o in u) if (u[o] && u[o].test(i)) {
			l.unshift(o);
			break
		}
		if (l[0] in r) a = l[0];
		else {
			for (o in r) {
				if (!l[0] || e.converters[o + " " + l[0]]) {
					a = o;
					break
				}
				s || (s = o)
			}
			a = a || s
		}
		return a ? (a !== l[0] && l.unshift(a), r[a]) : t
	}
	function q(e, t) {
		var n, r, i, o, a = {},
			s = 0,
			u = e.dataTypes.slice(),
			l = u[0];
		if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), u[1]) for (n in e.converters) a[n.toLowerCase()] = e.converters[n];
		for (; i = u[++s];) if ("*" !== i) {
			if ("*" !== l && l !== i) {
				if (n = a[l + " " + i] || a["* " + i], !n) for (r in a) if (o = r.split(" "), o[1] === i && (n = a[l + " " + o[0]] || a["* " + o[0]])) {
					n === !0 ? n = a[r] : a[r] !== !0 && (i = o[0], u.splice(s--, 0, i));
					break
				}
				if (n !== !0) if (n && e["throws"]) t = n(t);
				else try {
					t = n(t)
				} catch (c) {
					return {
						state: "parsererror",
						error: n ? c : "No conversion from " + l + " to " + i
					}
				}
			}
			l = i
		}
		return {
			state: "success",
			data: t
		}
	}
	function _() {
		try {
			return new e.XMLHttpRequest
		} catch (t) {}
	}
	function F() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {}
	}
	function O() {
		return setTimeout(function() {
			Qn = t
		}), Qn = st.now()
	}
	function B(e, t) {
		st.each(t, function(t, n) {
			for (var r = (rr[t] || []).concat(rr["*"]), i = 0, o = r.length; o > i; i++) if (r[i].call(e, t, n)) return
		})
	}
	function P(e, t, n) {
		var r, i, o = 0,
			a = nr.length,
			s = st.Deferred().always(function() {
				delete u.elem
			}),
			u = function() {
				if (i) return !1;
				for (var t = Qn || O(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++) l.tweens[a].run(o);
				return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
			},
			l = s.promise({
				elem: e,
				props: st.extend({}, t),
				opts: st.extend(!0, {
					specialEasing: {}
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: Qn || O(),
				duration: n.duration,
				tweens: [],
				createTween: function(t, n) {
					var r = st.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
					return l.tweens.push(r), r
				},
				stop: function(t) {
					var n = 0,
						r = t ? l.tweens.length : 0;
					if (i) return this;
					for (i = !0; r > n; n++) l.tweens[n].run(1);
					return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
				}
			}),
			c = l.props;
		for (R(c, l.opts.specialEasing); a > o; o++) if (r = nr[o].call(l, e, c, l.opts)) return r;
		return B(l, c), st.isFunction(l.opts.start) && l.opts.start.call(e, l), st.fx.timer(st.extend(u, {
			elem: e,
			anim: l,
			queue: l.opts.queue
		})), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
	}
	function R(e, t) {
		var n, r, i, o, a;
		for (n in e) if (r = st.camelCase(n), i = t[r], o = e[n], st.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = st.cssHooks[r], a && "expand" in a) {
			o = a.expand(o), delete e[r];
			for (n in o) n in e || (e[n] = o[n], t[n] = i)
		} else t[r] = i
	}
	function W(e, t, n) {
		var r, i, o, a, s, u, l, c, f, p = this,
			d = e.style,
			h = {},
			g = [],
			m = e.nodeType && w(e);
		n.queue || (c = st._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, f = c.empty.fire, c.empty.fire = function() {
			c.unqueued || f()
		}), c.unqueued++, p.always(function() {
			p.always(function() {
				c.unqueued--, st.queue(e, "fx").length || c.empty.fire()
			})
		})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === st.css(e, "display") && "none" === st.css(e, "float") && (st.support.inlineBlockNeedsLayout && "inline" !== S(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", st.support.shrinkWrapBlocks || p.done(function() {
			d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
		}));
		for (r in t) if (o = t[r], Zn.exec(o)) {
			if (delete t[r], u = u || "toggle" === o, o === (m ? "hide" : "show")) continue;
			g.push(r)
		}
		if (a = g.length) {
			s = st._data(e, "fxshow") || st._data(e, "fxshow", {}), "hidden" in s && (m = s.hidden), u && (s.hidden = !m), m ? st(e).show() : p.done(function() {
				st(e).hide()
			}), p.done(function() {
				var t;
				st._removeData(e, "fxshow");
				for (t in h) st.style(e, t, h[t])
			});
			for (r = 0; a > r; r++) i = g[r], l = p.createTween(i, m ? s[i] : 0), h[i] = s[i] || st.style(e, i), i in s || (s[i] = l.start, m && (l.end = l.start, l.start = "width" === i || "height" === i ? 1 : 0))
		}
	}
	function $(e, t, n, r, i) {
		return new $.prototype.init(e, t, n, r, i)
	}
	function I(e, t) {
		var n, r = {
			height: e
		},
			i = 0;
		for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = wn[i], r["margin" + n] = r["padding" + n] = e;
		return t && (r.opacity = r.width = e), r
	}
	function z(e) {
		return st.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
	}
	var X, U, V = e.document,
		Y = e.location,
		J = e.jQuery,
		G = e.$,
		Q = {},
		K = [],
		Z = "1.9.0",
		et = K.concat,
		tt = K.push,
		nt = K.slice,
		rt = K.indexOf,
		it = Q.toString,
		ot = Q.hasOwnProperty,
		at = Z.trim,
		st = function(e, t) {
			return new st.fn.init(e, t, X)
		},
		ut = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		lt = /\S+/g,
		ct = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		ft = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		pt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		dt = /^[\],:{}\s]*$/,
		ht = /(?:^|:|,)(?:\s*\[)+/g,
		gt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		mt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
		yt = /^-ms-/,
		vt = /-([\da-z])/gi,
		bt = function(e, t) {
			return t.toUpperCase()
		},
		xt = function() {
			V.addEventListener ? (V.removeEventListener("DOMContentLoaded", xt, !1), st.ready()) : "complete" === V.readyState && (V.detachEvent("onreadystatechange", xt), st.ready())
		};
	st.fn = st.prototype = {
		jquery: Z,
		constructor: st,
		init: function(e, n, r) {
			var i, o;
			if (!e) return this;
			if ("string" == typeof e) {
				if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ft.exec(e), !i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
				if (i[1]) {
					if (n = n instanceof st ? n[0] : n, st.merge(this, st.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : V, !0)), pt.test(i[1]) && st.isPlainObject(n)) for (i in n) st.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
					return this
				}
				if (o = V.getElementById(i[2]), o && o.parentNode) {
					if (o.id !== i[2]) return r.find(e);
					this.length = 1, this[0] = o
				}
				return this.context = V, this.selector = e, this
			}
			return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : st.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), st.makeArray(e, this))
		},
		selector: "",
		length: 0,
		size: function() {
			return this.length
		},
		toArray: function() {
			return nt.call(this)
		},
		get: function(e) {
			return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
		},
		pushStack: function(e) {
			var t = st.merge(this.constructor(), e);
			return t.prevObject = this, t.context = this.context, t
		},
		each: function(e, t) {
			return st.each(this, e, t)
		},
		ready: function(e) {
			return st.ready.promise().done(e), this
		},
		slice: function() {
			return this.pushStack(nt.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(e) {
			var t = this.length,
				n = +e + (0 > e ? t : 0);
			return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
		},
		map: function(e) {
			return this.pushStack(st.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: tt,
		sort: [].sort,
		splice: [].splice
	}, st.fn.init.prototype = st.fn, st.extend = st.fn.extend = function() {
		var e, n, r, i, o, a, s = arguments[0] || {},
			u = 1,
			l = arguments.length,
			c = !1;
		for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, u = 2), "object" == typeof s || st.isFunction(s) || (s = {}), l === u && (s = this, --u); l > u; u++) if (null != (e = arguments[u])) for (n in e) r = s[n], i = e[n], s !== i && (c && i && (st.isPlainObject(i) || (o = st.isArray(i))) ? (o ? (o = !1, a = r && st.isArray(r) ? r : []) : a = r && st.isPlainObject(r) ? r : {}, s[n] = st.extend(c, a, i)) : i !== t && (s[n] = i));
		return s
	}, st.extend({
		noConflict: function(t) {
			return e.$ === st && (e.$ = G), t && e.jQuery === st && (e.jQuery = J), st
		},
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? st.readyWait++ : st.ready(!0)
		},
		ready: function(e) {
			if (e === !0 ? !--st.readyWait : !st.isReady) {
				if (!V.body) return setTimeout(st.ready);
				st.isReady = !0, e !== !0 && --st.readyWait > 0 || (U.resolveWith(V, [st]), st.fn.trigger && st(V).trigger("ready").off("ready"))
			}
		},
		isFunction: function(e) {
			return "function" === st.type(e)
		},
		isArray: Array.isArray ||
		function(e) {
			return "array" === st.type(e)
		},
		isWindow: function(e) {
			return null != e && e == e.window
		},
		isNumeric: function(e) {
			return !isNaN(parseFloat(e)) && isFinite(e)
		},
		type: function(e) {
			return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Q[it.call(e)] || "object" : typeof e
		},
		isPlainObject: function(e) {
			if (!e || "object" !== st.type(e) || e.nodeType || st.isWindow(e)) return !1;
			try {
				if (e.constructor && !ot.call(e, "constructor") && !ot.call(e.constructor.prototype, "isPrototypeOf")) return !1
			} catch (n) {
				return !1
			}
			var r;
			for (r in e);
			return r === t || ot.call(e, r)
		},
		isEmptyObject: function(e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		error: function(e) {
			throw Error(e)
		},
		parseHTML: function(e, t, n) {
			if (!e || "string" != typeof e) return null;
			"boolean" == typeof t && (n = t, t = !1), t = t || V;
			var r = pt.exec(e),
				i = !n && [];
			return r ? [t.createElement(r[1])] : (r = st.buildFragment([e], t, i), i && st(i).remove(), st.merge([], r.childNodes))
		},
		parseJSON: function(n) {
			return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = st.trim(n), n && dt.test(n.replace(gt, "@").replace(mt, "]").replace(ht, ""))) ? Function("return " + n)() : (st.error("Invalid JSON: " + n), t)
		},
		parseXML: function(n) {
			var r, i;
			if (!n || "string" != typeof n) return null;
			try {
				e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
			} catch (o) {
				r = t
			}
			return r && r.documentElement && !r.getElementsByTagName("parsererror").length || st.error("Invalid XML: " + n), r
		},
		noop: function() {},
		globalEval: function(t) {
			t && st.trim(t) && (e.execScript ||
			function(t) {
				e.eval.call(e, t)
			})(t)
		},
		camelCase: function(e) {
			return e.replace(yt, "ms-").replace(vt, bt)
		},
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(e, t, r) {
			var i, o = 0,
				a = e.length,
				s = n(e);
			if (r) {
				if (s) for (; a > o && (i = t.apply(e[o], r), i !== !1); o++);
				else for (o in e) if (i = t.apply(e[o], r), i === !1) break
			} else if (s) for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++);
			else for (o in e) if (i = t.call(e[o], o, e[o]), i === !1) break;
			return e
		},
		trim: at && !at.call("\ufeff\u00a0") ?
		function(e) {
			return null == e ? "" : at.call(e)
		} : function(e) {
			return null == e ? "" : (e + "").replace(ct, "")
		},
		makeArray: function(e, t) {
			var r = t || [];
			return null != e && (n(Object(e)) ? st.merge(r, "string" == typeof e ? [e] : e) : tt.call(r, e)), r
		},
		inArray: function(e, t, n) {
			var r;
			if (t) {
				if (rt) return rt.call(t, e, n);
				for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) if (n in t && t[n] === e) return n
			}
			return -1
		},
		merge: function(e, n) {
			var r = n.length,
				i = e.length,
				o = 0;
			if ("number" == typeof r) for (; r > o; o++) e[i++] = n[o];
			else for (; n[o] !== t;) e[i++] = n[o++];
			return e.length = i, e
		},
		grep: function(e, t, n) {
			var r, i = [],
				o = 0,
				a = e.length;
			for (n = !! n; a > o; o++) r = !! t(e[o], o), n !== r && i.push(e[o]);
			return i
		},
		map: function(e, t, r) {
			var i, o = 0,
				a = e.length,
				s = n(e),
				u = [];
			if (s) for (; a > o; o++) i = t(e[o], o, r), null != i && (u[u.length] = i);
			else for (o in e) i = t(e[o], o, r), null != i && (u[u.length] = i);
			return et.apply([], u)
		},
		guid: 1,
		proxy: function(e, n) {
			var r, i, o;
			return "string" == typeof n && (r = e[n], n = e, e = r), st.isFunction(e) ? (i = nt.call(arguments, 2), o = function() {
				return e.apply(n || this, i.concat(nt.call(arguments)))
			}, o.guid = e.guid = e.guid || st.guid++, o) : t
		},
		access: function(e, n, r, i, o, a, s) {
			var u = 0,
				l = e.length,
				c = null == r;
			if ("object" === st.type(r)) {
				o = !0;
				for (u in r) st.access(e, n, u, r[u], !0, a, s)
			} else if (i !== t && (o = !0, st.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function(e, t, n) {
				return c.call(st(e), n)
			})), n)) for (; l > u; u++) n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)));
			return o ? e : c ? n.call(e) : l ? n(e[0], r) : a
		},
		now: function() {
			return (new Date).getTime()
		}
	}), st.ready.promise = function(t) {
		if (!U) if (U = st.Deferred(), "complete" === V.readyState) setTimeout(st.ready);
		else if (V.addEventListener) V.addEventListener("DOMContentLoaded", xt, !1), e.addEventListener("load", st.ready, !1);
		else {
			V.attachEvent("onreadystatechange", xt), e.attachEvent("onload", st.ready);
			var n = !1;
			try {
				n = null == e.frameElement && V.documentElement
			} catch (r) {}
			n && n.doScroll &&
			function i() {
				if (!st.isReady) {
					try {
						n.doScroll("left")
					} catch (e) {
						return setTimeout(i, 50)
					}
					st.ready()
				}
			}()
		}
		return U.promise(t)
	}, st.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
		Q["[object " + t + "]"] = t.toLowerCase()
	}), X = st(V);
	var Tt = {};
	st.Callbacks = function(e) {
		e = "string" == typeof e ? Tt[e] || r(e) : st.extend({}, e);
		var n, i, o, a, s, u, l = [],
			c = !e.once && [],
			f = function(t) {
				for (n = e.memory && t, i = !0, u = a || 0, a = 0, s = l.length, o = !0; l && s > u; u++) if (l[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
					n = !1;
					break
				}
				o = !1, l && (c ? c.length && f(c.shift()) : n ? l = [] : p.disable())
			},
			p = {
				add: function() {
					if (l) {
						var t = l.length;
						(function r(t) {
							st.each(t, function(t, n) {
								var i = st.type(n);
								"function" === i ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== i && r(n)
							})
						})(arguments), o ? s = l.length : n && (a = t, f(n))
					}
					return this
				},
				remove: function() {
					return l && st.each(arguments, function(e, t) {
						for (var n;
						(n = st.inArray(t, l, n)) > -1;) l.splice(n, 1), o && (s >= n && s--, u >= n && u--)
					}), this
				},
				has: function(e) {
					return st.inArray(e, l) > -1
				},
				empty: function() {
					return l = [], this
				},
				disable: function() {
					return l = c = n = t, this
				},
				disabled: function() {
					return !l
				},
				lock: function() {
					return c = t, n || p.disable(), this
				},
				locked: function() {
					return !c
				},
				fireWith: function(e, t) {
					return t = t || [], t = [e, t.slice ? t.slice() : t], !l || i && !c || (o ? c.push(t) : f(t)), this
				},
				fire: function() {
					return p.fireWith(this, arguments), this
				},
				fired: function() {
					return !!i
				}
			};
		return p
	}, st.extend({
		Deferred: function(e) {
			var t = [
				["resolve", "done", st.Callbacks("once memory"), "resolved"],
				["reject", "fail", st.Callbacks("once memory"), "rejected"],
				["notify", "progress", st.Callbacks("memory")]
			],
				n = "pending",
				r = {
					state: function() {
						return n
					},
					always: function() {
						return i.done(arguments).fail(arguments), this
					},
					then: function() {
						var e = arguments;
						return st.Deferred(function(n) {
							st.each(t, function(t, o) {
								var a = o[0],
									s = st.isFunction(e[t]) && e[t];
								i[o[1]](function() {
									var e = s && s.apply(this, arguments);
									e && st.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
								})
							}), e = null
						}).promise()
					},
					promise: function(e) {
						return null != e ? st.extend(e, r) : r
					}
				},
				i = {};
			return r.pipe = r.then, st.each(t, function(e, o) {
				var a = o[2],
					s = o[3];
				r[o[1]] = a.add, s && a.add(function() {
					n = s
				}, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
					return i[o[0] + "With"](this === i ? r : this, arguments), this
				}, i[o[0] + "With"] = a.fireWith
			}), r.promise(i), e && e.call(i, i), i
		},
		when: function(e) {
			var t, n, r, i = 0,
				o = nt.call(arguments),
				a = o.length,
				s = 1 !== a || e && st.isFunction(e.promise) ? a : 0,
				u = 1 === s ? e : st.Deferred(),
				l = function(e, n, r) {
					return function(i) {
						n[e] = this, r[e] = arguments.length > 1 ? nt.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
					}
				};
			if (a > 1) for (t = Array(a), n = Array(a), r = Array(a); a > i; i++) o[i] && st.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --s;
			return s || u.resolveWith(r, o), u.promise()
		}
	}), st.support = function() {
		var n, r, i, o, a, s, u, l, c, f, p = V.createElement("div");
		if (p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = p.getElementsByTagName("*"), i = p.getElementsByTagName("a")[0], !r || !i || !r.length) return {};
		o = V.createElement("select"), a = o.appendChild(V.createElement("option")), s = p.getElementsByTagName("input")[0], i.style.cssText = "top:1px;float:left;opacity:.5", n = {
			getSetAttribute: "t" !== p.className,
			leadingWhitespace: 3 === p.firstChild.nodeType,
			tbody: !p.getElementsByTagName("tbody").length,
			htmlSerialize: !! p.getElementsByTagName("link").length,
			style: /top/.test(i.getAttribute("style")),
			hrefNormalized: "/a" === i.getAttribute("href"),
			opacity: /^0.5/.test(i.style.opacity),
			cssFloat: !! i.style.cssFloat,
			checkOn: !! s.value,
			optSelected: a.selected,
			enctype: !! V.createElement("form").enctype,
			html5Clone: "<:nav></:nav>" !== V.createElement("nav").cloneNode(!0).outerHTML,
			boxModel: "CSS1Compat" === V.compatMode,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0,
			boxSizingReliable: !0,
			pixelPosition: !1
		}, s.checked = !0, n.noCloneChecked = s.cloneNode(!0).checked, o.disabled = !0, n.optDisabled = !a.disabled;
		try {
			delete p.test
		} catch (d) {
			n.deleteExpando = !1
		}
		s = V.createElement("input"), s.setAttribute("value", ""), n.input = "" === s.getAttribute("value"), s.value = "t", s.setAttribute("type", "radio"), n.radioValue = "t" === s.value, s.setAttribute("checked", "t"), s.setAttribute("name", "t"), u = V.createDocumentFragment(), u.appendChild(s), n.appendChecked = s.checked, n.checkClone = u.cloneNode(!0).cloneNode(!0).lastChild.checked, p.attachEvent && (p.attachEvent("onclick", function() {
			n.noCloneEvent = !1
		}), p.cloneNode(!0).click());
		for (f in {
			submit: !0,
			change: !0,
			focusin: !0
		}) p.setAttribute(l = "on" + f, "t"), n[f + "Bubbles"] = l in e || p.attributes[l].expando === !1;
		return p.style.backgroundClip = "content-box", p.cloneNode(!0).style.backgroundClip = "", n.clearCloneStyle = "content-box" === p.style.backgroundClip, st(function() {
			var r, i, o, a = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
				s = V.getElementsByTagName("body")[0];
			s && (r = V.createElement("div"), r.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(r).appendChild(p), p.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = p.getElementsByTagName("td"), o[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === o[0].offsetHeight, o[0].style.display = "", o[1].style.display = "none", n.reliableHiddenOffsets = c && 0 === o[0].offsetHeight, p.innerHTML = "", p.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", n.boxSizing = 4 === p.offsetWidth, n.doesNotIncludeMarginInBodyOffset = 1 !== s.offsetTop, e.getComputedStyle && (n.pixelPosition = "1%" !== (e.getComputedStyle(p, null) || {}).top, n.boxSizingReliable = "4px" === (e.getComputedStyle(p, null) || {
				width: "4px"
			}).width, i = p.appendChild(V.createElement("div")), i.style.cssText = p.style.cssText = a, i.style.marginRight = i.style.width = "0", p.style.width = "1px", n.reliableMarginRight = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), p.style.zoom !== t && (p.innerHTML = "", p.style.cssText = a + "width:1px;padding:1px;display:inline;zoom:1", n.inlineBlockNeedsLayout = 3 === p.offsetWidth, p.style.display = "block", p.innerHTML = "<div></div>", p.firstChild.style.width = "5px", n.shrinkWrapBlocks = 3 !== p.offsetWidth, s.style.zoom = 1), s.removeChild(r), r = p = o = i = null)
		}), r = o = u = a = i = s = null, n
	}();
	var wt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		Nt = /([A-Z])/g;
	st.extend({
		cache: {},
		expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function(e) {
			return e = e.nodeType ? st.cache[e[st.expando]] : e[st.expando], !! e && !s(e)
		},
		data: function(e, t, n) {
			return i(e, t, n, !1)
		},
		removeData: function(e, t) {
			return o(e, t, !1)
		},
		_data: function(e, t, n) {
			return i(e, t, n, !0)
		},
		_removeData: function(e, t) {
			return o(e, t, !0)
		},
		acceptData: function(e) {
			var t = e.nodeName && st.noData[e.nodeName.toLowerCase()];
			return !t || t !== !0 && e.getAttribute("classid") === t
		}
	}), st.fn.extend({
		data: function(e, n) {
			var r, i, o = this[0],
				s = 0,
				u = null;
			if (e === t) {
				if (this.length && (u = st.data(o), 1 === o.nodeType && !st._data(o, "parsedAttrs"))) {
					for (r = o.attributes; r.length > s; s++) i = r[s].name, i.indexOf("data-") || (i = st.camelCase(i.substring(5)), a(o, i, u[i]));
					st._data(o, "parsedAttrs", !0)
				}
				return u
			}
			return "object" == typeof e ? this.each(function() {
				st.data(this, e)
			}) : st.access(this, function(n) {
				return n === t ? o ? a(o, e, st.data(o, e)) : null : (this.each(function() {
					st.data(this, e, n)
				}), t)
			}, null, n, arguments.length > 1, null, !0)
		},
		removeData: function(e) {
			return this.each(function() {
				st.removeData(this, e)
			})
		}
	}), st.extend({
		queue: function(e, n, r) {
			var i;
			return e ? (n = (n || "fx") + "queue", i = st._data(e, n), r && (!i || st.isArray(r) ? i = st._data(e, n, st.makeArray(r)) : i.push(r)), i || []) : t
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = st.queue(e, t),
				r = n.length,
				i = n.shift(),
				o = st._queueHooks(e, t),
				a = function() {
					st.dequeue(e, t)
				};
			"inprogress" === i && (i = n.shift(), r--), o.cur = i, i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return st._data(e, n) || st._data(e, n, {
				empty: st.Callbacks("once memory").add(function() {
					st._removeData(e, t + "queue"), st._removeData(e, n)
				})
			})
		}
	}), st.fn.extend({
		queue: function(e, n) {
			var r = 2;
			return "string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? st.queue(this[0], e) : n === t ? this : this.each(function() {
				var t = st.queue(this, e, n);
				st._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && st.dequeue(this, e)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				st.dequeue(this, e)
			})
		},
		delay: function(e, t) {
			return e = st.fx ? st.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
				var r = setTimeout(t, e);
				n.stop = function() {
					clearTimeout(r)
				}
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, n) {
			var r, i = 1,
				o = st.Deferred(),
				a = this,
				s = this.length,
				u = function() {
					--i || o.resolveWith(a, [a])
				};
			for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;) r = st._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(u));
			return u(), o.promise(n)
		}
	});
	var Ct, kt, Et = /[\t\r\n]/g,
		St = /\r/g,
		At = /^(?:input|select|textarea|button|object)$/i,
		jt = /^(?:a|area)$/i,
		Dt = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
		Lt = /^(?:checked|selected)$/i,
		Ht = st.support.getSetAttribute,
		Mt = st.support.input;
	st.fn.extend({
		attr: function(e, t) {
			return st.access(this, st.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				st.removeAttr(this, e)
			})
		},
		prop: function(e, t) {
			return st.access(this, st.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return e = st.propFix[e] || e, this.each(function() {
				try {
					this[e] = t, delete this[e]
				} catch (n) {}
			})
		},
		addClass: function(e) {
			var t, n, r, i, o, a = 0,
				s = this.length,
				u = "string" == typeof e && e;
			if (st.isFunction(e)) return this.each(function(t) {
				st(this).addClass(e.call(this, t, this.className))
			});
			if (u) for (t = (e || "").match(lt) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Et, " ") : " ")) {
				for (o = 0; i = t[o++];) 0 > r.indexOf(" " + i + " ") && (r += i + " ");
				n.className = st.trim(r)
			}
			return this
		},
		removeClass: function(e) {
			var t, n, r, i, o, a = 0,
				s = this.length,
				u = 0 === arguments.length || "string" == typeof e && e;
			if (st.isFunction(e)) return this.each(function(t) {
				st(this).removeClass(e.call(this, t, this.className))
			});
			if (u) for (t = (e || "").match(lt) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Et, " ") : "")) {
				for (o = 0; i = t[o++];) for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
				n.className = e ? st.trim(r) : ""
			}
			return this
		},
		toggleClass: function(e, t) {
			var n = typeof e,
				r = "boolean" == typeof t;
			return st.isFunction(e) ? this.each(function(n) {
				st(this).toggleClass(e.call(this, n, this.className, t), t)
			}) : this.each(function() {
				if ("string" === n) for (var i, o = 0, a = st(this), s = t, u = e.match(lt) || []; i = u[o++];) s = r ? s : !a.hasClass(i), a[s ? "addClass" : "removeClass"](i);
				else("undefined" === n || "boolean" === n) && (this.className && st._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : st._data(this, "__className__") || "")
			})
		},
		hasClass: function(e) {
			for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Et, " ").indexOf(t) >= 0) return !0;
			return !1
		},
		val: function(e) {
			var n, r, i, o = this[0]; {
				if (arguments.length) return i = st.isFunction(e), this.each(function(r) {
					var o, a = st(this);
					1 === this.nodeType && (o = i ? e.call(this, r, a.val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : st.isArray(o) && (o = st.map(o, function(e) {
						return null == e ? "" : e + ""
					})), n = st.valHooks[this.type] || st.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, o, "value") !== t || (this.value = o))
				});
				if (o) return n = st.valHooks[o.type] || st.valHooks[o.nodeName.toLowerCase()], n && "get" in n && (r = n.get(o, "value")) !== t ? r : (r = o.value, "string" == typeof r ? r.replace(St, "") : null == r ? "" : r)
			}
		}
	}), st.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = e.attributes.value;
					return !t || t.specified ? e.value : e.text
				}
			},
			select: {
				get: function(e) {
					for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++) if (n = r[u], !(!n.selected && u !== i || (st.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && st.nodeName(n.parentNode, "optgroup"))) {
						if (t = st(n).val(), o) return t;
						a.push(t)
					}
					return a
				},
				set: function(e, t) {
					var n = st.makeArray(t);
					return st(e).find("option").each(function() {
						this.selected = st.inArray(st(this).val(), n) >= 0
					}), n.length || (e.selectedIndex = -1), n
				}
			}
		},
		attr: function(e, n, r) {
			var i, o, a, s = e.nodeType;
			if (e && 3 !== s && 8 !== s && 2 !== s) return e.getAttribute === t ? st.prop(e, n, r) : (a = 1 !== s || !st.isXMLDoc(e), a && (n = n.toLowerCase(), o = st.attrHooks[n] || (Dt.test(n) ? kt : Ct)), r === t ? o && a && "get" in o && null !== (i = o.get(e, n)) ? i : (e.getAttribute !== t && (i = e.getAttribute(n)), null == i ? t : i) : null !== r ? o && a && "set" in o && (i = o.set(e, r, n)) !== t ? i : (e.setAttribute(n, r + ""), r) : (st.removeAttr(e, n), t))
		},
		removeAttr: function(e, t) {
			var n, r, i = 0,
				o = t && t.match(lt);
			if (o && 1 === e.nodeType) for (; n = o[i++];) r = st.propFix[n] || n, Dt.test(n) ? !Ht && Lt.test(n) ? e[st.camelCase("default-" + n)] = e[r] = !1 : e[r] = !1 : st.attr(e, n, ""), e.removeAttribute(Ht ? n : r)
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (!st.support.radioValue && "radio" === t && st.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(e, n, r) {
			var i, o, a, s = e.nodeType;
			if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !st.isXMLDoc(e), a && (n = st.propFix[n] || n, o = st.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var n = e.getAttributeNode("tabindex");
					return n && n.specified ? parseInt(n.value, 10) : At.test(e.nodeName) || jt.test(e.nodeName) && e.href ? 0 : t
				}
			}
		}
	}), kt = {
		get: function(e, n) {
			var r = st.prop(e, n),
				i = "boolean" == typeof r && e.getAttribute(n),
				o = "boolean" == typeof r ? Mt && Ht ? null != i : Lt.test(n) ? e[st.camelCase("default-" + n)] : !! i : e.getAttributeNode(n);
			return o && o.value !== !1 ? n.toLowerCase() : t
		},
		set: function(e, t, n) {
			return t === !1 ? st.removeAttr(e, n) : Mt && Ht || !Lt.test(n) ? e.setAttribute(!Ht && st.propFix[n] || n, n) : e[st.camelCase("default-" + n)] = e[n] = !0, n
		}
	}, Mt && Ht || (st.attrHooks.value = {
		get: function(e, n) {
			var r = e.getAttributeNode(n);
			return st.nodeName(e, "input") ? e.defaultValue : r && r.specified ? r.value : t
		},
		set: function(e, n, r) {
			return st.nodeName(e, "input") ? (e.defaultValue = n, t) : Ct && Ct.set(e, n, r)
		}
	}), Ht || (Ct = st.valHooks.button = {
		get: function(e, n) {
			var r = e.getAttributeNode(n);
			return r && ("id" === n || "name" === n || "coords" === n ? "" !== r.value : r.specified) ? r.value : t
		},
		set: function(e, n, r) {
			var i = e.getAttributeNode(r);
			return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t
		}
	}, st.attrHooks.contenteditable = {
		get: Ct.get,
		set: function(e, t, n) {
			Ct.set(e, "" === t ? !1 : t, n)
		}
	}, st.each(["width", "height"], function(e, n) {
		st.attrHooks[n] = st.extend(st.attrHooks[n], {
			set: function(e, r) {
				return "" === r ? (e.setAttribute(n, "auto"), r) : t
			}
		})
	})), st.support.hrefNormalized || (st.each(["href", "src", "width", "height"], function(e, n) {
		st.attrHooks[n] = st.extend(st.attrHooks[n], {
			get: function(e) {
				var r = e.getAttribute(n, 2);
				return null == r ? t : r
			}
		})
	}), st.each(["href", "src"], function(e, t) {
		st.propHooks[t] = {
			get: function(e) {
				return e.getAttribute(t, 4)
			}
		}
	})), st.support.style || (st.attrHooks.style = {
		get: function(e) {
			return e.style.cssText || t
		},
		set: function(e, t) {
			return e.style.cssText = t + ""
		}
	}), st.support.optSelected || (st.propHooks.selected = st.extend(st.propHooks.selected, {
		get: function(e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		}
	})), st.support.enctype || (st.propFix.enctype = "encoding"), st.support.checkOn || st.each(["radio", "checkbox"], function() {
		st.valHooks[this] = {
			get: function(e) {
				return null === e.getAttribute("value") ? "on" : e.value
			}
		}
	}), st.each(["radio", "checkbox"], function() {
		st.valHooks[this] = st.extend(st.valHooks[this], {
			set: function(e, n) {
				return st.isArray(n) ? e.checked = st.inArray(st(e).val(), n) >= 0 : t
			}
		})
	});
	var qt = /^(?:input|select|textarea)$/i,
		_t = /^key/,
		Ft = /^(?:mouse|contextmenu)|click/,
		Ot = /^(?:focusinfocus|focusoutblur)$/,
		Bt = /^([^.]*)(?:\.(.+)|)$/;
	st.event = {
		global: {},
		add: function(e, n, r, i, o) {
			var a, s, u, l, c, f, p, d, h, g, m, y = 3 !== e.nodeType && 8 !== e.nodeType && st._data(e);
			if (y) {
				for (r.handler && (a = r, r = a.handler, o = a.selector), r.guid || (r.guid = st.guid++), (l = y.events) || (l = y.events = {}), (s = y.handle) || (s = y.handle = function(e) {
					return st === t || e && st.event.triggered === e.type ? t : st.event.dispatch.apply(s.elem, arguments)
				}, s.elem = e), n = (n || "").match(lt) || [""], c = n.length; c--;) u = Bt.exec(n[c]) || [], h = m = u[1], g = (u[2] || "").split(".").sort(), p = st.event.special[h] || {}, h = (o ? p.delegateType : p.bindType) || h, p = st.event.special[h] || {}, f = st.extend({
					type: h,
					origType: m,
					data: i,
					handler: r,
					guid: r.guid,
					selector: o,
					needsContext: o && st.expr.match.needsContext.test(o),
					namespace: g.join(".")
				}, a), (d = l[h]) || (d = l[h] = [], d.delegateCount = 0, p.setup && p.setup.call(e, i, g, s) !== !1 || (e.addEventListener ? e.addEventListener(h, s, !1) : e.attachEvent && e.attachEvent("on" + h, s))), p.add && (p.add.call(e, f), f.handler.guid || (f.handler.guid = r.guid)), o ? d.splice(d.delegateCount++, 0, f) : d.push(f), st.event.global[h] = !0;
				e = null
			}
		},
		remove: function(e, t, n, r, i) {
			var o, a, s, u, l, c, f, p, d, h, g, m = st.hasData(e) && st._data(e);
			if (m && (u = m.events)) {
				for (t = (t || "").match(lt) || [""], l = t.length; l--;) if (s = Bt.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
					for (f = st.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = u[d] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length; o--;) c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
					a && !p.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || st.removeEvent(e, d, m.handle), delete u[d])
				} else for (d in u) st.event.remove(e, d + t[l], n, r, !0);
				st.isEmptyObject(u) && (delete m.handle, st._removeData(e, "events"))
			}
		},
		trigger: function(n, r, i, o) {
			var a, s, u, l, c, f, p, d = [i || V],
				h = n.type || n,
				g = n.namespace ? n.namespace.split(".") : [];
			if (s = u = i = i || V, 3 !== i.nodeType && 8 !== i.nodeType && !Ot.test(h + st.event.triggered) && (h.indexOf(".") >= 0 && (g = h.split("."), h = g.shift(), g.sort()), c = 0 > h.indexOf(":") && "on" + h, n = n[st.expando] ? n : new st.Event(h, "object" == typeof n && n), n.isTrigger = !0, n.namespace = g.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : st.makeArray(r, [n]), p = st.event.special[h] || {}, o || !p.trigger || p.trigger.apply(i, r) !== !1)) {
				if (!o && !p.noBubble && !st.isWindow(i)) {
					for (l = p.delegateType || h, Ot.test(l + h) || (s = s.parentNode); s; s = s.parentNode) d.push(s), u = s;
					u === (i.ownerDocument || V) && d.push(u.defaultView || u.parentWindow || e)
				}
				for (a = 0;
				(s = d[a++]) && !n.isPropagationStopped();) n.type = a > 1 ? l : p.bindType || h, f = (st._data(s, "events") || {})[n.type] && st._data(s, "handle"), f && f.apply(s, r), f = c && s[c], f && st.acceptData(s) && f.apply && f.apply(s, r) === !1 && n.preventDefault();
				if (n.type = h, !(o || n.isDefaultPrevented() || p._default && p._default.apply(i.ownerDocument, r) !== !1 || "click" === h && st.nodeName(i, "a") || !st.acceptData(i) || !c || !i[h] || st.isWindow(i))) {
					u = i[c], u && (i[c] = null), st.event.triggered = h;
					try {
						i[h]()
					} catch (m) {}
					st.event.triggered = t, u && (i[c] = u)
				}
				return n.result
			}
		},
		dispatch: function(e) {
			e = st.event.fix(e);
			var n, r, i, o, a, s = [],
				u = nt.call(arguments),
				l = (st._data(this, "events") || {})[e.type] || [],
				c = st.event.special[e.type] || {};
			if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
				for (s = st.event.handlers.call(this, e, l), n = 0;
				(o = s[n++]) && !e.isPropagationStopped();) for (e.currentTarget = o.elem, r = 0;
				(a = o.handlers[r++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(a.namespace)) && (e.handleObj = a, e.data = a.data, i = ((st.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, u), i !== t && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
				return c.postDispatch && c.postDispatch.call(this, e), e.result
			}
		},
		handlers: function(e, n) {
			var r, i, o, a, s = [],
				u = n.delegateCount,
				l = e.target;
			if (u && l.nodeType && (!e.button || "click" !== e.type)) for (; l != this; l = l.parentNode || this) if (l.disabled !== !0 || "click" !== e.type) {
				for (i = [], r = 0; u > r; r++) a = n[r], o = a.selector + " ", i[o] === t && (i[o] = a.needsContext ? st(o, this).index(l) >= 0 : st.find(o, this, null, [l]).length), i[o] && i.push(a);
				i.length && s.push({
					elem: l,
					handlers: i
				})
			}
			return n.length > u && s.push({
				elem: this,
				handlers: n.slice(u)
			}), s
		},
		fix: function(e) {
			if (e[st.expando]) return e;
			var t, n, r = e,
				i = st.event.fixHooks[e.type] || {},
				o = i.props ? this.props.concat(i.props) : this.props;
			for (e = new st.Event(r), t = o.length; t--;) n = o[t], e[n] = r[n];
			return e.target || (e.target = r.srcElement || V), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, i.filter ? i.filter(e, r) : e
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(e, t) {
				return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(e, n) {
				var r, i, o, a = n.button,
					s = n.fromElement;
				return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || V, i = r.documentElement, o = r.body, e.pageX = n.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
			}
		},
		special: {
			load: {
				noBubble: !0
			},
			click: {
				trigger: function() {
					return st.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t
				}
			},
			focus: {
				trigger: function() {
					if (this !== V.activeElement && this.focus) try {
						return this.focus(), !1
					} catch (e) {}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					return this === V.activeElement && this.blur ? (this.blur(), !1) : t
				},
				delegateType: "focusout"
			},
			beforeunload: {
				postDispatch: function(e) {
					e.result !== t && (e.originalEvent.returnValue = e.result)
				}
			}
		},
		simulate: function(e, t, n, r) {
			var i = st.extend(new st.Event, n, {
				type: e,
				isSimulated: !0,
				originalEvent: {}
			});
			r ? st.event.trigger(i, null, t) : st.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
		}
	}, st.removeEvent = V.removeEventListener ?
	function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n, !1)
	} : function(e, n, r) {
		var i = "on" + n;
		e.detachEvent && (e[i] === t && (e[i] = null), e.detachEvent(i, r))
	}, st.Event = function(e, n) {
		return this instanceof st.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? u : l) : this.type = e, n && st.extend(this, n), this.timeStamp = e && e.timeStamp || st.now(), this[st.expando] = !0, t) : new st.Event(e, n)
	}, st.Event.prototype = {
		isDefaultPrevented: l,
		isPropagationStopped: l,
		isImmediatePropagationStopped: l,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = u, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = u, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = u, this.stopPropagation()
		}
	}, st.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(e, t) {
		st.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function(e) {
				var n, r = this,
					i = e.relatedTarget,
					o = e.handleObj;
				return (!i || i !== r && !st.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
			}
		}
	}), st.support.submitBubbles || (st.event.special.submit = {
		setup: function() {
			return st.nodeName(this, "form") ? !1 : (st.event.add(this, "click._submit keypress._submit", function(e) {
				var n = e.target,
					r = st.nodeName(n, "input") || st.nodeName(n, "button") ? n.form : t;
				r && !st._data(r, "submitBubbles") && (st.event.add(r, "submit._submit", function(e) {
					e._submit_bubble = !0
				}), st._data(r, "submitBubbles", !0))
			}), t)
		},
		postDispatch: function(e) {
			e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && st.event.simulate("submit", this.parentNode, e, !0))
		},
		teardown: function() {
			return st.nodeName(this, "form") ? !1 : (st.event.remove(this, "._submit"), t)
		}
	}), st.support.changeBubbles || (st.event.special.change = {
		setup: function() {
			return qt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (st.event.add(this, "propertychange._change", function(e) {
				"checked" === e.originalEvent.propertyName && (this._just_changed = !0)
			}), st.event.add(this, "click._change", function(e) {
				this._just_changed && !e.isTrigger && (this._just_changed = !1), st.event.simulate("change", this, e, !0)
			})), !1) : (st.event.add(this, "beforeactivate._change", function(e) {
				var t = e.target;
				qt.test(t.nodeName) && !st._data(t, "changeBubbles") && (st.event.add(t, "change._change", function(e) {
					!this.parentNode || e.isSimulated || e.isTrigger || st.event.simulate("change", this.parentNode, e, !0)
				}), st._data(t, "changeBubbles", !0))
			}), t)
		},
		handle: function(e) {
			var n = e.target;
			return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t
		},
		teardown: function() {
			return st.event.remove(this, "._change"), !qt.test(this.nodeName)
		}
	}), st.support.focusinBubbles || st.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		var n = 0,
			r = function(e) {
				st.event.simulate(t, e.target, st.event.fix(e), !0)
			};
		st.event.special[t] = {
			setup: function() {
				0 === n++ && V.addEventListener(e, r, !0)
			},
			teardown: function() {
				0 === --n && V.removeEventListener(e, r, !0)
			}
		}
	}), st.fn.extend({
		on: function(e, n, r, i, o) {
			var a, s;
			if ("object" == typeof e) {
				"string" != typeof n && (r = r || n, n = t);
				for (s in e) this.on(s, n, r, e[s], o);
				return this
			}
			if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = l;
			else if (!i) return this;
			return 1 === o && (a = i, i = function(e) {
				return st().off(e), a.apply(this, arguments)
			}, i.guid = a.guid || (a.guid = st.guid++)), this.each(function() {
				st.event.add(this, e, i, r, n)
			})
		},
		one: function(e, t, n, r) {
			return this.on(e, t, n, r, 1)
		},
		off: function(e, n, r) {
			var i, o;
			if (e && e.preventDefault && e.handleObj) return i = e.handleObj, st(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
			if ("object" == typeof e) {
				for (o in e) this.off(o, n, e[o]);
				return this
			}
			return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = l), this.each(function() {
				st.event.remove(this, e, r, n)
			})
		},
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		delegate: function(e, t, n, r) {
			return this.on(t, e, n, r)
		},
		undelegate: function(e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
		},
		trigger: function(e, t) {
			return this.each(function() {
				st.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, n) {
			var r = this[0];
			return r ? st.event.trigger(e, n, r, !0) : t
		},
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		}
	}), st.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
		st.fn[t] = function(e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}, _t.test(t) && (st.event.fixHooks[t] = st.event.keyHooks), Ft.test(t) && (st.event.fixHooks[t] = st.event.mouseHooks)
	}), function(e, t) {
		function n(e) {
			return ht.test(e + "")
		}
		function r() {
			var e, t = [];
			return e = function(n, r) {
				return t.push(n += " ") > C.cacheLength && delete e[t.shift()], e[n] = r
			}
		}
		function i(e) {
			return e[P] = !0, e
		}
		function o(e) {
			var t = L.createElement("div");
			try {
				return e(t)
			} catch (n) {
				return !1
			} finally {
				t = null
			}
		}
		function a(e, t, n, r) {
			var i, o, a, s, u, l, c, d, h, g;
			if ((t ? t.ownerDocument || t : R) !== L && D(t), t = t || L, n = n || [], !e || "string" != typeof e) return n;
			if (1 !== (s = t.nodeType) && 9 !== s) return [];
			if (!M && !r) {
				if (i = gt.exec(e)) if (a = i[1]) {
					if (9 === s) {
						if (o = t.getElementById(a), !o || !o.parentNode) return n;
						if (o.id === a) return n.push(o), n
					} else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && O(t, o) && o.id === a) return n.push(o), n
				} else {
					if (i[2]) return Q.apply(n, K.call(t.getElementsByTagName(e), 0)), n;
					if ((a = i[3]) && W.getByClassName && t.getElementsByClassName) return Q.apply(n, K.call(t.getElementsByClassName(a), 0)), n
				}
				if (W.qsa && !q.test(e)) {
					if (c = !0, d = P, h = t, g = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
						for (l = f(e), (c = t.getAttribute("id")) ? d = c.replace(vt, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", u = l.length; u--;) l[u] = d + p(l[u]);
						h = dt.test(e) && t.parentNode || t, g = l.join(",")
					}
					if (g) try {
						return Q.apply(n, K.call(h.querySelectorAll(g), 0)), n
					} catch (m) {} finally {
						c || t.removeAttribute("id")
					}
				}
			}
			return x(e.replace(at, "$1"), t, n, r)
		}
		function s(e, t) {
			for (var n = e && t && e.nextSibling; n; n = n.nextSibling) if (n === t) return -1;
			return e ? 1 : -1
		}
		function u(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return "input" === n && t.type === e
			}
		}
		function l(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return ("input" === n || "button" === n) && t.type === e
			}
		}
		function c(e) {
			return i(function(t) {
				return t = +t, i(function(n, r) {
					for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
				})
			})
		}
		function f(e, t) {
			var n, r, i, o, s, u, l, c = X[e + " "];
			if (c) return t ? 0 : c.slice(0);
			for (s = e, u = [], l = C.preFilter; s;) {
				(!n || (r = ut.exec(s))) && (r && (s = s.slice(r[0].length) || s), u.push(i = [])), n = !1, (r = lt.exec(s)) && (n = r.shift(), i.push({
					value: n,
					type: r[0].replace(at, " ")
				}), s = s.slice(n.length));
				for (o in C.filter)!(r = pt[o].exec(s)) || l[o] && !(r = l[o](r)) || (n = r.shift(), i.push({
					value: n,
					type: o,
					matches: r
				}), s = s.slice(n.length));
				if (!n) break
			}
			return t ? s.length : s ? a.error(e) : X(e, u).slice(0)
		}
		function p(e) {
			for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
			return r
		}
		function d(e, t, n) {
			var r = t.dir,
				i = n && "parentNode" === t.dir,
				o = I++;
			return t.first ?
			function(t, n, o) {
				for (; t = t[r];) if (1 === t.nodeType || i) return e(t, n, o)
			} : function(t, n, a) {
				var s, u, l, c = $ + " " + o;
				if (a) {
					for (; t = t[r];) if ((1 === t.nodeType || i) && e(t, n, a)) return !0
				} else for (; t = t[r];) if (1 === t.nodeType || i) if (l = t[P] || (t[P] = {}), (u = l[r]) && u[0] === c) {
					if ((s = u[1]) === !0 || s === N) return s === !0
				} else if (u = l[r] = [c], u[1] = e(t, n, a) || N, u[1] === !0) return !0
			}
		}
		function h(e) {
			return e.length > 1 ?
			function(t, n, r) {
				for (var i = e.length; i--;) if (!e[i](t, n, r)) return !1;
				return !0
			} : e[0]
		}
		function g(e, t, n, r, i) {
			for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
			return a
		}
		function m(e, t, n, r, o, a) {
			return r && !r[P] && (r = m(r)), o && !o[P] && (o = m(o, a)), i(function(i, a, s, u) {
				var l, c, f, p = [],
					d = [],
					h = a.length,
					m = i || b(t || "*", s.nodeType ? [s] : s, []),
					y = !e || !i && t ? m : g(m, p, e, s, u),
					v = n ? o || (i ? e : h || r) ? [] : a : y;
				if (n && n(y, v, s, u), r) for (l = g(v, d), r(l, [], s, u), c = l.length; c--;)(f = l[c]) && (v[d[c]] = !(y[d[c]] = f));
				if (i) {
					if (o || e) {
						if (o) {
							for (l = [], c = v.length; c--;)(f = v[c]) && l.push(y[c] = f);
							o(null, v = [], l, u)
						}
						for (c = v.length; c--;)(f = v[c]) && (l = o ? Z.call(i, f) : p[c]) > -1 && (i[l] = !(a[l] = f))
					}
				} else v = g(v === a ? v.splice(h, v.length) : v), o ? o(null, a, v, u) : Q.apply(a, v)
			})
		}
		function y(e) {
			for (var t, n, r, i = e.length, o = C.relative[e[0].type], a = o || C.relative[" "], s = o ? 1 : 0, u = d(function(e) {
				return e === t
			}, a, !0), l = d(function(e) {
				return Z.call(t, e) > -1
			}, a, !0), c = [function(e, n, r) {
				return !o && (r || n !== j) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r))
			}]; i > s; s++) if (n = C.relative[e[s].type]) c = [d(h(c), n)];
			else {
				if (n = C.filter[e[s].type].apply(null, e[s].matches), n[P]) {
					for (r = ++s; i > r && !C.relative[e[r].type]; r++);
					return m(s > 1 && h(c), s > 1 && p(e.slice(0, s - 1)).replace(at, "$1"), n, r > s && y(e.slice(s, r)), i > r && y(e = e.slice(r)), i > r && p(e))
				}
				c.push(n)
			}
			return h(c)
		}
		function v(e, t) {
			var n = 0,
				r = t.length > 0,
				o = e.length > 0,
				s = function(i, s, u, l, c) {
					var f, p, d, h = [],
						m = 0,
						y = "0",
						v = i && [],
						b = null != c,
						x = j,
						T = i || o && C.find.TAG("*", c && s.parentNode || s),
						w = $ += null == x ? 1 : Math.E;
					for (b && (j = s !== L && s, N = n); null != (f = T[y]); y++) {
						if (o && f) {
							for (p = 0; d = e[p]; p++) if (d(f, s, u)) {
								l.push(f);
								break
							}
							b && ($ = w, N = ++n)
						}
						r && ((f = !d && f) && m--, i && v.push(f))
					}
					if (m += y, r && y !== m) {
						for (p = 0; d = t[p]; p++) d(v, h, s, u);
						if (i) {
							if (m > 0) for (; y--;) v[y] || h[y] || (h[y] = G.call(l));
							h = g(h)
						}
						Q.apply(l, h), b && !i && h.length > 0 && m + t.length > 1 && a.uniqueSort(l)
					}
					return b && ($ = w, j = x), v
				};
			return r ? i(s) : s
		}
		function b(e, t, n) {
			for (var r = 0, i = t.length; i > r; r++) a(e, t[r], n);
			return n
		}
		function x(e, t, n, r) {
			var i, o, a, s, u, l = f(e);
			if (!r && 1 === l.length) {
				if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && !M && C.relative[o[1].type]) {
					if (t = C.find.ID(a.matches[0].replace(xt, Tt), t)[0], !t) return n;
					e = e.slice(o.shift().value.length)
				}
				for (i = pt.needsContext.test(e) ? -1 : o.length - 1; i >= 0 && (a = o[i], !C.relative[s = a.type]); i--) if ((u = C.find[s]) && (r = u(a.matches[0].replace(xt, Tt), dt.test(o[0].type) && t.parentNode || t))) {
					if (o.splice(i, 1), e = r.length && p(o), !e) return Q.apply(n, K.call(r, 0)), n;
					break
				}
			}
			return S(e, l)(r, t, M, n, dt.test(e)), n
		}
		function T() {}
		var w, N, C, k, E, S, A, j, D, L, H, M, q, _, F, O, B, P = "sizzle" + -new Date,
			R = e.document,
			W = {},
			$ = 0,
			I = 0,
			z = r(),
			X = r(),
			U = r(),
			V = typeof t,
			Y = 1 << 31,
			J = [],
			G = J.pop,
			Q = J.push,
			K = J.slice,
			Z = J.indexOf ||
		function(e) {
			for (var t = 0, n = this.length; n > t; t++) if (this[t] === e) return t;
			return -1
		}, et = "[\\x20\\t\\r\\n\\f]", tt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", nt = tt.replace("w", "w#"), rt = "([*^$|!~]?=)", it = "\\[" + et + "*(" + tt + ")" + et + "*(?:" + rt + et + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + nt + ")|)|)" + et + "*\\]", ot = ":(" + tt + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + it.replace(3, 8) + ")*)|.*)\\)|)", at = RegExp("^" + et + "+|((?:^|[^\\\\])(?:\\\\.)*)" + et + "+$", "g"), ut = RegExp("^" + et + "*," + et + "*"), lt = RegExp("^" + et + "*([\\x20\\t\\r\\n\\f>+~])" + et + "*"), ct = RegExp(ot), ft = RegExp("^" + nt + "$"), pt = {
			ID: RegExp("^#(" + tt + ")"),
			CLASS: RegExp("^\\.(" + tt + ")"),
			NAME: RegExp("^\\[name=['\"]?(" + tt + ")['\"]?\\]"),
			TAG: RegExp("^(" + tt.replace("w", "w*") + ")"),
			ATTR: RegExp("^" + it),
			PSEUDO: RegExp("^" + ot),
			CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + et + "*(even|odd|(([+-]|)(\\d*)n|)" + et + "*(?:([+-]|)" + et + "*(\\d+)|))" + et + "*\\)|)", "i"),
			needsContext: RegExp("^" + et + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + et + "*((?:-\\d)?\\d*)" + et + "*\\)|)(?=[^-]|$)", "i")
		}, dt = /[\x20\t\r\n\f]*[+~]/, ht = /\{\s*\[native code\]\s*\}/, gt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, mt = /^(?:input|select|textarea|button)$/i, yt = /^h\d$/i, vt = /'|\\/g, bt = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, xt = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, Tt = function(e, t) {
			var n = "0x" + t - 65536;
			return n !== n ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n)
		};
		try {
			K.call(H.childNodes, 0)[0].nodeType
		} catch (wt) {
			K = function(e) {
				for (var t, n = []; t = this[e]; e++) n.push(t);
				return n
			}
		}
		E = a.isXML = function(e) {
			var t = e && (e.ownerDocument || e).documentElement;
			return t ? "HTML" !== t.nodeName : !1
		}, D = a.setDocument = function(e) {
			var r = e ? e.ownerDocument || e : R;
			return r !== L && 9 === r.nodeType && r.documentElement ? (L = r, H = r.documentElement, M = E(r), W.tagNameNoComments = o(function(e) {
				return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length
			}), W.attributes = o(function(e) {
				e.innerHTML = "<select></select>";
				var t = typeof e.lastChild.getAttribute("multiple");
				return "boolean" !== t && "string" !== t
			}), W.getByClassName = o(function(e) {
				return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
			}), W.getByName = o(function(e) {
				e.id = P + 0, e.innerHTML = "<a name='" + P + "'></a><div name='" + P + "'></div>", H.insertBefore(e, H.firstChild);
				var t = r.getElementsByName && r.getElementsByName(P).length === 2 + r.getElementsByName(P + 0).length;
				return W.getIdNotName = !r.getElementById(P), H.removeChild(e), t
			}), C.attrHandle = o(function(e) {
				return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== V && "#" === e.firstChild.getAttribute("href")
			}) ? {} : {
				href: function(e) {
					return e.getAttribute("href", 2)
				},
				type: function(e) {
					return e.getAttribute("type")
				}
			}, W.getIdNotName ? (C.find.ID = function(e, t) {
				if (typeof t.getElementById !== V && !M) {
					var n = t.getElementById(e);
					return n && n.parentNode ? [n] : []
				}
			}, C.filter.ID = function(e) {
				var t = e.replace(xt, Tt);
				return function(e) {
					return e.getAttribute("id") === t
				}
			}) : (C.find.ID = function(e, n) {
				if (typeof n.getElementById !== V && !M) {
					var r = n.getElementById(e);
					return r ? r.id === e || typeof r.getAttributeNode !== V && r.getAttributeNode("id").value === e ? [r] : t : []
				}
			}, C.filter.ID = function(e) {
				var t = e.replace(xt, Tt);
				return function(e) {
					var n = typeof e.getAttributeNode !== V && e.getAttributeNode("id");
					return n && n.value === t
				}
			}), C.find.TAG = W.tagNameNoComments ?
			function(e, n) {
				return typeof n.getElementsByTagName !== V ? n.getElementsByTagName(e) : t
			} : function(e, t) {
				var n, r = [],
					i = 0,
					o = t.getElementsByTagName(e);
				if ("*" === e) {
					for (; n = o[i]; i++) 1 === n.nodeType && r.push(n);
					return r
				}
				return o
			}, C.find.NAME = W.getByName &&
			function(e, n) {
				return typeof n.getElementsByName !== V ? n.getElementsByName(name) : t
			}, C.find.CLASS = W.getByClassName &&
			function(e, n) {
				return typeof n.getElementsByClassName === V || M ? t : n.getElementsByClassName(e)
			}, _ = [], q = [":focus"], (W.qsa = n(r.querySelectorAll)) && (o(function(e) {
				e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || q.push("\\[" + et + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || q.push(":checked")
			}), o(function(e) {
				e.innerHTML = "<input type='hidden' i=''/>", e.querySelectorAll("[i^='']").length && q.push("[*^$]=" + et + "*(?:\"\"|'')"), e.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), q.push(",.*:")
			})), (W.matchesSelector = n(F = H.matchesSelector || H.mozMatchesSelector || H.webkitMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && o(function(e) {
				W.disconnectedMatch = F.call(e, "div"), F.call(e, "[s!='']:x"), _.push("!=", ot)
			}), q = RegExp(q.join("|")), _ = RegExp(_.join("|")), O = n(H.contains) || H.compareDocumentPosition ?
			function(e, t) {
				var n = 9 === e.nodeType ? e.documentElement : e,
					r = t && t.parentNode;
				return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
			} : function(e, t) {
				if (t) for (; t = t.parentNode;) if (t === e) return !0;
				return !1
			}, B = H.compareDocumentPosition ?
			function(e, t) {
				var n;
				return e === t ? (A = !0, 0) : (n = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t)) ? 1 & n || e.parentNode && 11 === e.parentNode.nodeType ? e === r || O(R, e) ? -1 : t === r || O(R, t) ? 1 : 0 : 4 & n ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
			} : function(e, t) {
				var n, i = 0,
					o = e.parentNode,
					a = t.parentNode,
					u = [e],
					l = [t];
				if (e === t) return A = !0, 0;
				if (e.sourceIndex && t.sourceIndex) return (~t.sourceIndex || Y) - (O(R, e) && ~e.sourceIndex || Y);
				if (!o || !a) return e === r ? -1 : t === r ? 1 : o ? -1 : a ? 1 : 0;
				if (o === a) return s(e, t);
				for (n = e; n = n.parentNode;) u.unshift(n);
				for (n = t; n = n.parentNode;) l.unshift(n);
				for (; u[i] === l[i];) i++;
				return i ? s(u[i], l[i]) : u[i] === R ? -1 : l[i] === R ? 1 : 0
			}, A = !1, [0, 0].sort(B), W.detectDuplicates = A, L) : L
		}, a.matches = function(e, t) {
			return a(e, null, null, t)
		}, a.matchesSelector = function(e, t) {
			if ((e.ownerDocument || e) !== L && D(e), t = t.replace(bt, "='$1']"), !(!W.matchesSelector || M || _ && _.test(t) || q.test(t))) try {
				var n = F.call(e, t);
				if (n || W.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
			} catch (r) {}
			return a(t, L, null, [e]).length > 0
		}, a.contains = function(e, t) {
			return (e.ownerDocument || e) !== L && D(e), O(e, t)
		}, a.attr = function(e, t) {
			var n;
			return (e.ownerDocument || e) !== L && D(e), M || (t = t.toLowerCase()), (n = C.attrHandle[t]) ? n(e) : M || W.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t : n && n.specified ? n.value : null
		}, a.error = function(e) {
			throw Error("Syntax error, unrecognized expression: " + e)
		}, a.uniqueSort = function(e) {
			var t, n = [],
				r = 1,
				i = 0;
			if (A = !W.detectDuplicates, e.sort(B), A) {
				for (; t = e[r]; r++) t === e[r - 1] && (i = n.push(r));
				for (; i--;) e.splice(n[i], 1)
			}
			return e
		}, k = a.getText = function(e) {
			var t, n = "",
				r = 0,
				i = e.nodeType;
			if (i) {
				if (1 === i || 9 === i || 11 === i) {
					if ("string" == typeof e.textContent) return e.textContent;
					for (e = e.firstChild; e; e = e.nextSibling) n += k(e)
				} else if (3 === i || 4 === i) return e.nodeValue
			} else for (; t = e[r]; r++) n += k(t);
			return n
		}, C = a.selectors = {
			cacheLength: 50,
			createPseudo: i,
			match: pt,
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function(e) {
					return e[1] = e[1].replace(xt, Tt), e[3] = (e[4] || e[5] || "").replace(xt, Tt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
				},
				CHILD: function(e) {
					return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || a.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && a.error(e[0]), e
				},
				PSEUDO: function(e) {
					var t, n = !e[5] && e[2];
					return pt.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && ct.test(n) && (t = f(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
				}
			},
			filter: {
				TAG: function(e) {
					return "*" === e ?
					function() {
						return !0
					} : (e = e.replace(xt, Tt).toLowerCase(), function(t) {
						return t.nodeName && t.nodeName.toLowerCase() === e
					})
				},
				CLASS: function(e) {
					var t = z[e + " "];
					return t || (t = RegExp("(^|" + et + ")" + e + "(" + et + "|$)")) && z(e, function(e) {
						return t.test(e.className || typeof e.getAttribute !== V && e.getAttribute("class") || "")
					})
				},
				ATTR: function(e, t, n) {
					return function(r) {
						var i = a.attr(r, e);
						return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.substr(i.length - n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.substr(0, n.length + 1) === n + "-" : !1) : !0
					}
				},
				CHILD: function(e, t, n, r, i) {
					var o = "nth" !== e.slice(0, 3),
						a = "last" !== e.slice(-4),
						s = "of-type" === t;
					return 1 === r && 0 === i ?
					function(e) {
						return !!e.parentNode
					} : function(t, n, u) {
						var l, c, f, p, d, h, g = o !== a ? "nextSibling" : "previousSibling",
							m = t.parentNode,
							y = s && t.nodeName.toLowerCase(),
							v = !u && !s;
						if (m) {
							if (o) {
								for (; g;) {
									for (f = t; f = f[g];) if (s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) return !1;
									h = g = "only" === e && !h && "nextSibling"
								}
								return !0
							}
							if (h = [a ? m.firstChild : m.lastChild], a && v) {
								for (c = m[P] || (m[P] = {}), l = c[e] || [], d = l[0] === $ && l[1], p = l[0] === $ && l[2], f = d && m.childNodes[d]; f = ++d && f && f[g] || (p = d = 0) || h.pop();) if (1 === f.nodeType && ++p && f === t) {
									c[e] = [$, d, p];
									break
								}
							} else if (v && (l = (t[P] || (t[P] = {}))[e]) && l[0] === $) p = l[1];
							else for (;
							(f = ++d && f && f[g] || (p = d = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== y : 1 !== f.nodeType) || !++p || (v && ((f[P] || (f[P] = {}))[e] = [$, p]), f !== t)););
							return p -= i, p === r || 0 === p % r && p / r >= 0
						}
					}
				},
				PSEUDO: function(e, t) {
					var n, r = C.pseudos[e] || C.setFilters[e.toLowerCase()] || a.error("unsupported pseudo: " + e);
					return r[P] ? r(t) : r.length > 1 ? (n = [e, e, "", t], C.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, n) {
						for (var i, o = r(e, t), a = o.length; a--;) i = Z.call(e, o[a]), e[i] = !(n[i] = o[a])
					}) : function(e) {
						return r(e, 0, n)
					}) : r
				}
			},
			pseudos: {
				not: i(function(e) {
					var t = [],
						n = [],
						r = S(e.replace(at, "$1"));
					return r[P] ? i(function(e, t, n, i) {
						for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
					}) : function(e, i, o) {
						return t[0] = e, r(t, null, o, n), !n.pop()
					}
				}),
				has: i(function(e) {
					return function(t) {
						return a(e, t).length > 0
					}
				}),
				contains: i(function(e) {
					return function(t) {
						return (t.textContent || t.innerText || k(t)).indexOf(e) > -1
					}
				}),
				lang: i(function(e) {
					return ft.test(e || "") || a.error("unsupported lang: " + e), e = e.replace(xt, Tt).toLowerCase(), function(t) {
						var n;
						do
						if (n = M ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
						while ((t = t.parentNode) && 1 === t.nodeType);
						return !1
					}
				}),
				target: function(t) {
					var n = e.location && e.location.hash;
					return n && n.slice(1) === t.id
				},
				root: function(e) {
					return e === H
				},
				focus: function(e) {
					return e === L.activeElement && (!L.hasFocus || L.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
				},
				enabled: function(e) {
					return e.disabled === !1
				},
				disabled: function(e) {
					return e.disabled === !0
				},
				checked: function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && !! e.checked || "option" === t && !! e.selected
				},
				selected: function(e) {
					return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
				},
				empty: function(e) {
					for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
					return !0
				},
				parent: function(e) {
					return !C.pseudos.empty(e)
				},
				header: function(e) {
					return yt.test(e.nodeName)
				},
				input: function(e) {
					return mt.test(e.nodeName)
				},
				button: function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && "button" === e.type || "button" === t
				},
				text: function(e) {
					var t;
					return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
				},
				first: c(function() {
					return [0]
				}),
				last: c(function(e, t) {
					return [t - 1]
				}),
				eq: c(function(e, t, n) {
					return [0 > n ? n + t : n]
				}),
				even: c(function(e, t) {
					for (var n = 0; t > n; n += 2) e.push(n);
					return e
				}),
				odd: c(function(e, t) {
					for (var n = 1; t > n; n += 2) e.push(n);
					return e
				}),
				lt: c(function(e, t, n) {
					for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
					return e
				}),
				gt: c(function(e, t, n) {
					for (var r = 0 > n ? n + t : n; t > ++r;) e.push(r);
					return e
				})
			}
		};
		for (w in {
			radio: !0,
			checkbox: !0,
			file: !0,
			password: !0,
			image: !0
		}) C.pseudos[w] = u(w);
		for (w in {
			submit: !0,
			reset: !0
		}) C.pseudos[w] = l(w);
		S = a.compile = function(e, t) {
			var n, r = [],
				i = [],
				o = U[e + " "];
			if (!o) {
				for (t || (t = f(e)), n = t.length; n--;) o = y(t[n]), o[P] ? r.push(o) : i.push(o);
				o = U(e, v(i, r))
			}
			return o
		}, C.pseudos.nth = C.pseudos.eq, C.filters = T.prototype = C.pseudos, C.setFilters = new T, D(), a.attr = st.attr, st.find = a, st.expr = a.selectors, st.expr[":"] = st.expr.pseudos, st.unique = a.uniqueSort, st.text = a.getText, st.isXMLDoc = a.isXML, st.contains = a.contains
	}(e);
	var Pt = /Until$/,
		Rt = /^(?:parents|prev(?:Until|All))/,
		Wt = /^.[^:#\[\.,]*$/,
		$t = st.expr.match.needsContext,
		It = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	st.fn.extend({
		find: function(e) {
			var t, n, r;
			if ("string" != typeof e) return r = this, this.pushStack(st(e).filter(function() {
				for (t = 0; r.length > t; t++) if (st.contains(r[t], this)) return !0
			}));
			for (n = [], t = 0; this.length > t; t++) st.find(e, this[t], n);
			return n = this.pushStack(st.unique(n)), n.selector = (this.selector ? this.selector + " " : "") + e, n
		},
		has: function(e) {
			var t, n = st(e, this),
				r = n.length;
			return this.filter(function() {
				for (t = 0; r > t; t++) if (st.contains(this, n[t])) return !0
			})
		},
		not: function(e) {
			return this.pushStack(f(this, e, !1))
		},
		filter: function(e) {
			return this.pushStack(f(this, e, !0))
		},
		is: function(e) {
			return !!e && ("string" == typeof e ? $t.test(e) ? st(e, this.context).index(this[0]) >= 0 : st.filter(e, this).length > 0 : this.filter(e).length > 0)
		},
		closest: function(e, t) {
			for (var n, r = 0, i = this.length, o = [], a = $t.test(e) || "string" != typeof e ? st(e, t || this.context) : 0; i > r; r++) for (n = this[r]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
				if (a ? a.index(n) > -1 : st.find.matchesSelector(n, e)) {
					o.push(n);
					break
				}
				n = n.parentNode
			}
			return this.pushStack(o.length > 1 ? st.unique(o) : o)
		},
		index: function(e) {
			return e ? "string" == typeof e ? st.inArray(this[0], st(e)) : st.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(e, t) {
			var n = "string" == typeof e ? st(e, t) : st.makeArray(e && e.nodeType ? [e] : e),
				r = st.merge(this.get(), n);
			return this.pushStack(st.unique(r))
		},
		addBack: function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), st.fn.andSelf = st.fn.addBack, st.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function(e) {
			return st.dir(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return st.dir(e, "parentNode", n)
		},
		next: function(e) {
			return c(e, "nextSibling")
		},
		prev: function(e) {
			return c(e, "previousSibling")
		},
		nextAll: function(e) {
			return st.dir(e, "nextSibling")
		},
		prevAll: function(e) {
			return st.dir(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return st.dir(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return st.dir(e, "previousSibling", n)
		},
		siblings: function(e) {
			return st.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return st.sibling(e.firstChild)
		},
		contents: function(e) {
			return st.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : st.merge([], e.childNodes)
		}
	}, function(e, t) {
		st.fn[e] = function(n, r) {
			var i = st.map(this, t, n);
			return Pt.test(e) || (r = n), r && "string" == typeof r && (i = st.filter(r, i)), i = this.length > 1 && !It[e] ? st.unique(i) : i, this.length > 1 && Rt.test(e) && (i = i.reverse()), this.pushStack(i)
		}
	}), st.extend({
		filter: function(e, t, n) {
			return n && (e = ":not(" + e + ")"), 1 === t.length ? st.find.matchesSelector(t[0], e) ? [t[0]] : [] : st.find.matches(e, t)
		},
		dir: function(e, n, r) {
			for (var i = [], o = e[n]; o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !st(o).is(r));) 1 === o.nodeType && i.push(o), o = o[n];
			return i
		},
		sibling: function(e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		}
	});
	var zt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		Xt = / jQuery\d+="(?:null|\d+)"/g,
		Ut = RegExp("<(?:" + zt + ")[\\s/>]", "i"),
		Vt = /^\s+/,
		Yt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		Jt = /<([\w:]+)/,
		Gt = /<tbody/i,
		Qt = /<|&#?\w+;/,
		Kt = /<(?:script|style|link)/i,
		Zt = /^(?:checkbox|radio)$/i,
		en = /checked\s*(?:[^=]|=\s*.checked.)/i,
		tn = /^$|\/(?:java|ecma)script/i,
		nn = /^true\/(.*)/,
		rn = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		on = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: st.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
		},
		an = p(V),
		sn = an.appendChild(V.createElement("div"));
	on.optgroup = on.option, on.tbody = on.tfoot = on.colgroup = on.caption = on.thead, on.th = on.td, st.fn.extend({
		text: function(e) {
			return st.access(this, function(e) {
				return e === t ? st.text(this) : this.empty().append((this[0] && this[0].ownerDocument || V).createTextNode(e))
			}, null, e, arguments.length)
		},
		wrapAll: function(e) {
			if (st.isFunction(e)) return this.each(function(t) {
				st(this).wrapAll(e.call(this, t))
			});
			if (this[0]) {
				var t = st(e, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
					for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		wrapInner: function(e) {
			return st.isFunction(e) ? this.each(function(t) {
				st(this).wrapInner(e.call(this, t))
			}) : this.each(function() {
				var t = st(this),
					n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function(e) {
			var t = st.isFunction(e);
			return this.each(function(n) {
				st(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				st.nodeName(this, "body") || st(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function() {
			return this.domManip(arguments, !0, function(e) {
				(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e)
			})
		},
		prepend: function() {
			return this.domManip(arguments, !0, function(e) {
				(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e, this.firstChild)
			})
		},
		before: function() {
			return this.domManip(arguments, !1, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return this.domManip(arguments, !1, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		remove: function(e, t) {
			for (var n, r = 0; null != (n = this[r]); r++)(!e || st.filter(e, [n]).length > 0) && (t || 1 !== n.nodeType || st.cleanData(b(n)), n.parentNode && (t && st.contains(n.ownerDocument, n) && m(b(n, "script")), n.parentNode.removeChild(n)));
			return this
		},
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++) {
				for (1 === e.nodeType && st.cleanData(b(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
				e.options && st.nodeName(e, "select") && (e.options.length = 0)
			}
			return this
		},
		clone: function(e, t) {
			return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
				return st.clone(this, e, t)
			})
		},
		html: function(e) {
			return st.access(this, function(e) {
				var n = this[0] || {},
					r = 0,
					i = this.length;
				if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Xt, "") : t;
				if (!("string" != typeof e || Kt.test(e) || !st.support.htmlSerialize && Ut.test(e) || !st.support.leadingWhitespace && Vt.test(e) || on[(Jt.exec(e) || ["", ""])[1].toLowerCase()])) {
					e = e.replace(Yt, "<$1></$2>");
					try {
						for (; i > r; r++) n = this[r] || {}, 1 === n.nodeType && (st.cleanData(b(n, !1)), n.innerHTML = e);
						n = 0
					} catch (o) {}
				}
				n && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function(e) {
			var t = st.isFunction(e);
			return t || "string" == typeof e || (e = st(e).not(this).detach()), this.domManip([e], !0, function(e) {
				var t = this.nextSibling,
					n = this.parentNode;
				(n && 1 === this.nodeType || 11 === this.nodeType) && (st(this).remove(), t ? t.parentNode.insertBefore(e, t) : n.appendChild(e))
			})
		},
		detach: function(e) {
			return this.remove(e, !0)
		},
		domManip: function(e, n, r) {
			e = et.apply([], e);
			var i, o, a, s, u, l, c = 0,
				f = this.length,
				p = this,
				m = f - 1,
				y = e[0],
				v = st.isFunction(y);
			if (v || !(1 >= f || "string" != typeof y || st.support.checkClone) && en.test(y)) return this.each(function(i) {
				var o = p.eq(i);
				v && (e[0] = y.call(this, i, n ? o.html() : t)), o.domManip(e, n, r)
			});
			if (f && (i = st.buildFragment(e, this[0].ownerDocument, !1, this), o = i.firstChild, 1 === i.childNodes.length && (i = o), o)) {
				for (n = n && st.nodeName(o, "tr"), a = st.map(b(i, "script"), h), s = a.length; f > c; c++) u = i, c !== m && (u = st.clone(u, !0, !0), s && st.merge(a, b(u, "script"))), r.call(n && st.nodeName(this[c], "table") ? d(this[c], "tbody") : this[c], u, c);
				if (s) for (l = a[a.length - 1].ownerDocument, st.map(a, g), c = 0; s > c; c++) u = a[c], tn.test(u.type || "") && !st._data(u, "globalEval") && st.contains(l, u) && (u.src ? st.ajax({
					url: u.src,
					type: "GET",
					dataType: "script",
					async: !1,
					global: !1,
					"throws": !0
				}) : st.globalEval((u.text || u.textContent || u.innerHTML || "").replace(rn, "")));
				i = o = null
			}
			return this
		}
	}), st.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, t) {
		st.fn[e] = function(e) {
			for (var n, r = 0, i = [], o = st(e), a = o.length - 1; a >= r; r++) n = r === a ? this : this.clone(!0), st(o[r])[t](n), tt.apply(i, n.get());
			return this.pushStack(i)
		}
	}), st.extend({
		clone: function(e, t, n) {
			var r, i, o, a, s, u = st.contains(e.ownerDocument, e);
			if (st.support.html5Clone || st.isXMLDoc(e) || !Ut.test("<" + e.nodeName + ">") ? s = e.cloneNode(!0) : (sn.innerHTML = e.outerHTML, sn.removeChild(s = sn.firstChild)), !(st.support.noCloneEvent && st.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || st.isXMLDoc(e))) for (r = b(s), i = b(e), a = 0; null != (o = i[a]); ++a) r[a] && v(o, r[a]);
			if (t) if (n) for (i = i || b(e), r = r || b(s), a = 0; null != (o = i[a]); a++) y(o, r[a]);
			else y(e, s);
			return r = b(s, "script"), r.length > 0 && m(r, !u && b(e, "script")), r = i = o = null, s
		},
		buildFragment: function(e, t, n, r) {
			for (var i, o, a, s, u, l, c, f = e.length, d = p(t), h = [], g = 0; f > g; g++) if (o = e[g], o || 0 === o) if ("object" === st.type(o)) st.merge(h, o.nodeType ? [o] : o);
			else if (Qt.test(o)) {
				for (s = s || d.appendChild(t.createElement("div")), a = (Jt.exec(o) || ["", ""])[1].toLowerCase(), u = on[a] || on._default, s.innerHTML = u[1] + o.replace(Yt, "<$1></$2>") + u[2], c = u[0]; c--;) s = s.lastChild;
				if (!st.support.leadingWhitespace && Vt.test(o) && h.push(t.createTextNode(Vt.exec(o)[0])), !st.support.tbody) for (o = "table" !== a || Gt.test(o) ? "<table>" !== u[1] || Gt.test(o) ? 0 : s : s.firstChild, c = o && o.childNodes.length; c--;) st.nodeName(l = o.childNodes[c], "tbody") && !l.childNodes.length && o.removeChild(l);
				for (st.merge(h, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
				s = d.lastChild
			} else h.push(t.createTextNode(o));
			for (s && d.removeChild(s), st.support.appendChecked || st.grep(b(h, "input"), x), g = 0; o = h[g++];) if ((!r || -1 === st.inArray(o, r)) && (i = st.contains(o.ownerDocument, o), s = b(d.appendChild(o), "script"), i && m(s), n)) for (c = 0; o = s[c++];) tn.test(o.type || "") && n.push(o);
			return s = null, d
		},
		cleanData: function(e, n) {
			for (var r, i, o, a, s = 0, u = st.expando, l = st.cache, c = st.support.deleteExpando, f = st.event.special; null != (o = e[s]); s++) if ((n || st.acceptData(o)) && (i = o[u], r = i && l[i])) {
				if (r.events) for (a in r.events) f[a] ? st.event.remove(o, a) : st.removeEvent(o, a, r.handle);
				l[i] && (delete l[i], c ? delete o[u] : o.removeAttribute !== t ? o.removeAttribute(u) : o[u] = null, K.push(i))
			}
		}
	});
	var un, ln, cn, fn = /alpha\([^)]*\)/i,
		pn = /opacity\s*=\s*([^)]*)/,
		dn = /^(top|right|bottom|left)$/,
		hn = /^(none|table(?!-c[ea]).+)/,
		gn = /^margin/,
		mn = RegExp("^(" + ut + ")(.*)$", "i"),
		yn = RegExp("^(" + ut + ")(?!px)[a-z%]+$", "i"),
		vn = RegExp("^([+-])=(" + ut + ")", "i"),
		bn = {
			BODY: "block"
		},
		xn = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		Tn = {
			letterSpacing: 0,
			fontWeight: 400
		},
		wn = ["Top", "Right", "Bottom", "Left"],
		Nn = ["Webkit", "O", "Moz", "ms"];
	st.fn.extend({
		css: function(e, n) {
			return st.access(this, function(e, n, r) {
				var i, o, a = {},
					s = 0;
				if (st.isArray(n)) {
					for (i = ln(e), o = n.length; o > s; s++) a[n[s]] = st.css(e, n[s], !1, i);
					return a
				}
				return r !== t ? st.style(e, n, r) : st.css(e, n)
			}, e, n, arguments.length > 1)
		},
		show: function() {
			return N(this, !0)
		},
		hide: function() {
			return N(this)
		},
		toggle: function(e) {
			var t = "boolean" == typeof e;
			return this.each(function() {
				(t ? e : w(this)) ? st(this).show() : st(this).hide()
			})
		}
	}), st.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var n = un(e, "opacity");
						return "" === n ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": st.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(e, n, r, i) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var o, a, s, u = st.camelCase(n),
					l = e.style;
				if (n = st.cssProps[u] || (st.cssProps[u] = T(l, u)), s = st.cssHooks[n] || st.cssHooks[u], r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : l[n];
				if (a = typeof r, "string" === a && (o = vn.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(st.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || st.cssNumber[u] || (r += "px"), st.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) try {
					l[n] = r
				} catch (c) {}
			}
		},
		css: function(e, n, r, i) {
			var o, a, s, u = st.camelCase(n);
			return n = st.cssProps[u] || (st.cssProps[u] = T(e.style, u)), s = st.cssHooks[n] || st.cssHooks[u], s && "get" in s && (o = s.get(e, !0, r)), o === t && (o = un(e, n, i)), "normal" === o && n in Tn && (o = Tn[n]), r ? (a = parseFloat(o), r === !0 || st.isNumeric(a) ? a || 0 : o) : o
		},
		swap: function(e, t, n, r) {
			var i, o, a = {};
			for (o in t) a[o] = e.style[o], e.style[o] = t[o];
			i = n.apply(e, r || []);
			for (o in t) e.style[o] = a[o];
			return i
		}
	}), e.getComputedStyle ? (ln = function(t) {
		return e.getComputedStyle(t, null)
	}, un = function(e, n, r) {
		var i, o, a, s = r || ln(e),
			u = s ? s.getPropertyValue(n) || s[n] : t,
			l = e.style;
		return s && ("" !== u || st.contains(e.ownerDocument, e) || (u = st.style(e, n)), yn.test(u) && gn.test(n) && (i = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = s.width, l.width = i, l.minWidth = o, l.maxWidth = a)), u
	}) : V.documentElement.currentStyle && (ln = function(e) {
		return e.currentStyle
	}, un = function(e, n, r) {
		var i, o, a, s = r || ln(e),
			u = s ? s[n] : t,
			l = e.style;
		return null == u && l && l[n] && (u = l[n]), yn.test(u) && !dn.test(n) && (i = l.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : u, u = l.pixelLeft + "px", l.left = i, a && (o.left = a)), "" === u ? "auto" : u
	}), st.each(["height", "width"], function(e, n) {
		st.cssHooks[n] = {
			get: function(e, r, i) {
				return r ? 0 === e.offsetWidth && hn.test(st.css(e, "display")) ? st.swap(e, xn, function() {
					return E(e, n, i)
				}) : E(e, n, i) : t
			},
			set: function(e, t, r) {
				var i = r && ln(e);
				return C(e, t, r ? k(e, n, r, st.support.boxSizing && "border-box" === st.css(e, "boxSizing", !1, i), i) : 0)
			}
		}
	}), st.support.opacity || (st.cssHooks.opacity = {
		get: function(e, t) {
			return pn.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
		},
		set: function(e, t) {
			var n = e.style,
				r = e.currentStyle,
				i = st.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				o = r && r.filter || n.filter || "";
			n.zoom = 1, (t >= 1 || "" === t) && "" === st.trim(o.replace(fn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = fn.test(o) ? o.replace(fn, i) : o + " " + i)
		}
	}), st(function() {
		st.support.reliableMarginRight || (st.cssHooks.marginRight = {
			get: function(e, n) {
				return n ? st.swap(e, {
					display: "inline-block"
				}, un, [e, "marginRight"]) : t
			}
		}), !st.support.pixelPosition && st.fn.position && st.each(["top", "left"], function(e, n) {
			st.cssHooks[n] = {
				get: function(e, r) {
					return r ? (r = un(e, n), yn.test(r) ? st(e).position()[n] + "px" : r) : t
				}
			}
		})
	}), st.expr && st.expr.filters && (st.expr.filters.hidden = function(e) {
		return 0 === e.offsetWidth && 0 === e.offsetHeight || !st.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || st.css(e, "display"))
	}, st.expr.filters.visible = function(e) {
		return !st.expr.filters.hidden(e)
	}), st.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(e, t) {
		st.cssHooks[e + t] = {
			expand: function(n) {
				for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + wn[r] + t] = o[r] || o[r - 2] || o[0];
				return i
			}
		}, gn.test(e) || (st.cssHooks[e + t].set = C)
	});
	var Cn = /%20/g,
		kn = /\[\]$/,
		En = /\r?\n/g,
		Sn = /^(?:submit|button|image|reset)$/i,
		An = /^(?:input|select|textarea|keygen)/i;
	st.fn.extend({
		serialize: function() {
			return st.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = st.prop(this, "elements");
				return e ? st.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !st(this).is(":disabled") && An.test(this.nodeName) && !Sn.test(e) && (this.checked || !Zt.test(e))
			}).map(function(e, t) {
				var n = st(this).val();
				return null == n ? null : st.isArray(n) ? st.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(En, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(En, "\r\n")
				}
			}).get()
		}
	}), st.param = function(e, n) {
		var r, i = [],
			o = function(e, t) {
				t = st.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		if (n === t && (n = st.ajaxSettings && st.ajaxSettings.traditional), st.isArray(e) || e.jquery && !st.isPlainObject(e)) st.each(e, function() {
			o(this.name, this.value)
		});
		else for (r in e) j(r, e[r], n, o);
		return i.join("&").replace(Cn, "+")
	};
	var jn, Dn, Ln = st.now(),
		Hn = /\?/,
		Mn = /#.*$/,
		qn = /([?&])_=[^&]*/,
		_n = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		Fn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		On = /^(?:GET|HEAD)$/,
		Bn = /^\/\//,
		Pn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		Rn = st.fn.load,
		Wn = {},
		$n = {},
		In = "*/".concat("*");
	try {
		Dn = Y.href
	} catch (zn) {
		Dn = V.createElement("a"), Dn.href = "", Dn = Dn.href
	}
	jn = Pn.exec(Dn.toLowerCase()) || [], st.fn.load = function(e, n, r) {
		if ("string" != typeof e && Rn) return Rn.apply(this, arguments);
		var i, o, a, s = this,
			u = e.indexOf(" ");
		return u >= 0 && (i = e.slice(u, e.length), e = e.slice(0, u)), st.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (o = "POST"), s.length > 0 && st.ajax({
			url: e,
			type: o,
			dataType: "html",
			data: n
		}).done(function(e) {
			a = arguments, s.html(i ? st("<div>").append(st.parseHTML(e)).find(i) : e)
		}).complete(r &&
		function(e, t) {
			s.each(r, a || [e.responseText, t, e])
		}), this
	}, st.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
		st.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), st.each(["get", "post"], function(e, n) {
		st[n] = function(e, r, i, o) {
			return st.isFunction(r) && (o = o || i, i = r, r = t), st.ajax({
				url: e,
				type: n,
				dataType: o,
				data: r,
				success: i
			})
		}
	}), st.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: Dn,
			type: "GET",
			isLocal: Fn.test(jn[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": In,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": e.String,
				"text html": !0,
				"text json": st.parseJSON,
				"text xml": st.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(e, t) {
			return t ? H(H(e, st.ajaxSettings), t) : H(st.ajaxSettings, e)
		},
		ajaxPrefilter: D(Wn),
		ajaxTransport: D($n),
		ajax: function(e, n) {
			function r(e, n, r, s) {
				var l, f, v, b, T, N = n;
				2 !== x && (x = 2, u && clearTimeout(u), i = t, a = s || "", w.readyState = e > 0 ? 4 : 0, r && (b = M(p, w, r)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (T = w.getResponseHeader("Last-Modified"), T && (st.lastModified[o] = T), T = w.getResponseHeader("etag"), T && (st.etag[o] = T)), 304 === e ? (l = !0, N = "notmodified") : (l = q(p, b), N = l.state, f = l.data, v = l.error, l = !v)) : (v = N, (e || !N) && (N = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (n || N) + "", l ? g.resolveWith(d, [f, N, w]) : g.rejectWith(d, [w, N, v]), w.statusCode(y), y = t, c && h.trigger(l ? "ajaxSuccess" : "ajaxError", [w, p, l ? f : v]), m.fireWith(d, [w, N]), c && (h.trigger("ajaxComplete", [w, p]), --st.active || st.event.trigger("ajaxStop")))
			}
			"object" == typeof e && (n = e, e = t), n = n || {};
			var i, o, a, s, u, l, c, f, p = st.ajaxSetup({}, n),
				d = p.context || p,
				h = p.context && (d.nodeType || d.jquery) ? st(d) : st.event,
				g = st.Deferred(),
				m = st.Callbacks("once memory"),
				y = p.statusCode || {},
				v = {},
				b = {},
				x = 0,
				T = "canceled",
				w = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if (2 === x) {
							if (!s) for (s = {}; t = _n.exec(a);) s[t[1].toLowerCase()] = t[2];
							t = s[e.toLowerCase()]
						}
						return null == t ? null : t
					},
					getAllResponseHeaders: function() {
						return 2 === x ? a : null
					},
					setRequestHeader: function(e, t) {
						var n = e.toLowerCase();
						return x || (e = b[n] = b[n] || e, v[e] = t), this
					},
					overrideMimeType: function(e) {
						return x || (p.mimeType = e), this
					},
					statusCode: function(e) {
						var t;
						if (e) if (2 > x) for (t in e) y[t] = [y[t], e[t]];
						else w.always(e[w.status]);
						return this
					},
					abort: function(e) {
						var t = e || T;
						return i && i.abort(t), r(0, t), this
					}
				};
			if (g.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, p.url = ((e || p.url || Dn) + "").replace(Mn, "").replace(Bn, jn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = st.trim(p.dataType || "*").toLowerCase().match(lt) || [""], null == p.crossDomain && (l = Pn.exec(p.url.toLowerCase()), p.crossDomain = !(!l || l[1] === jn[1] && l[2] === jn[2] && (l[3] || ("http:" === l[1] ? 80 : 443)) == (jn[3] || ("http:" === jn[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = st.param(p.data, p.traditional)), L(Wn, p, n, w), 2 === x) return w;
			c = p.global, c && 0 === st.active++ && st.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !On.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (Hn.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = qn.test(o) ? o.replace(qn, "$1_=" + Ln++) : o + (Hn.test(o) ? "&" : "?") + "_=" + Ln++)), p.ifModified && (st.lastModified[o] && w.setRequestHeader("If-Modified-Since", st.lastModified[o]), st.etag[o] && w.setRequestHeader("If-None-Match", st.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && w.setRequestHeader("Content-Type", p.contentType), w.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + In + "; q=0.01" : "") : p.accepts["*"]);
			for (f in p.headers) w.setRequestHeader(f, p.headers[f]);
			if (p.beforeSend && (p.beforeSend.call(d, w, p) === !1 || 2 === x)) return w.abort();
			T = "abort";
			for (f in {
				success: 1,
				error: 1,
				complete: 1
			}) w[f](p[f]);
			if (i = L($n, p, n, w)) {
				w.readyState = 1, c && h.trigger("ajaxSend", [w, p]), p.async && p.timeout > 0 && (u = setTimeout(function() {
					w.abort("timeout")
				}, p.timeout));
				try {
					x = 1, i.send(v, r)
				} catch (N) {
					if (!(2 > x)) throw N;
					r(-1, N)
				}
			} else r(-1, "No Transport");
			return w
		},
		getScript: function(e, n) {
			return st.get(e, t, n, "script")
		},
		getJSON: function(e, t, n) {
			return st.get(e, t, n, "json")
		}
	}), st.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(e) {
				return st.globalEval(e), e
			}
		}
	}), st.ajaxPrefilter("script", function(e) {
		e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
	}), st.ajaxTransport("script", function(e) {
		if (e.crossDomain) {
			var n, r = V.head || st("head")[0] || V.documentElement;
			return {
				send: function(t, i) {
					n = V.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
						(t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"))
					}, r.insertBefore(n, r.firstChild)
				},
				abort: function() {
					n && n.onload(t, !0)
				}
			}
		}
	});
	var Xn = [],
		Un = /(=)\?(?=&|$)|\?\?/;
	st.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = Xn.pop() || st.expando + "_" + Ln++;
			return this[e] = !0, e
		}
	}), st.ajaxPrefilter("json jsonp", function(n, r, i) {
		var o, a, s, u = n.jsonp !== !1 && (Un.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Un.test(n.data) && "data");
		return u || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = st.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Un, "$1" + o) : n.jsonp !== !1 && (n.url += (Hn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
			return s || st.error(o + " was not called"), s[0]
		}, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
			s = arguments
		}, i.always(function() {
			e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Xn.push(o)), s && st.isFunction(a) && a(s[0]), s = a = t
		}), "script") : t
	});
	var Vn, Yn, Jn = 0,
		Gn = e.ActiveXObject &&
	function() {
		var e;
		for (e in Vn) Vn[e](t, !0)
	};
	st.ajaxSettings.xhr = e.ActiveXObject ?
	function() {
		return !this.isLocal && _() || F()
	} : _, Yn = st.ajaxSettings.xhr(), st.support.cors = !! Yn && "withCredentials" in Yn, Yn = st.support.ajax = !! Yn, Yn && st.ajaxTransport(function(n) {
		if (!n.crossDomain || st.support.cors) {
			var r;
			return {
				send: function(i, o) {
					var a, s, u = n.xhr();
					if (n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), n.xhrFields) for (s in n.xhrFields) u[s] = n.xhrFields[s];
					n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (s in i) u.setRequestHeader(s, i[s])
					} catch (l) {}
					u.send(n.hasContent && n.data || null), r = function(e, i) {
						var s, l, c, f, p;
						try {
							if (r && (i || 4 === u.readyState)) if (r = t, a && (u.onreadystatechange = st.noop, Gn && delete Vn[a]), i) 4 !== u.readyState && u.abort();
							else {
								f = {}, s = u.status, p = u.responseXML, c = u.getAllResponseHeaders(), p && p.documentElement && (f.xml = p), "string" == typeof u.responseText && (f.text = u.responseText);
								try {
									l = u.statusText
								} catch (d) {
									l = ""
								}
								s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = f.text ? 200 : 404
							}
						} catch (h) {
							i || o(-1, h)
						}
						f && o(s, l, f, c)
					}, n.async ? 4 === u.readyState ? setTimeout(r) : (a = ++Jn, Gn && (Vn || (Vn = {}, st(e).unload(Gn)), Vn[a] = r), u.onreadystatechange = r) : r()
				},
				abort: function() {
					r && r(t, !0)
				}
			}
		}
	});
	var Qn, Kn, Zn = /^(?:toggle|show|hide)$/,
		er = RegExp("^(?:([+-])=|)(" + ut + ")([a-z%]*)$", "i"),
		tr = /queueHooks$/,
		nr = [W],
		rr = {
			"*": [function(e, t) {
				var n, r, i = this.createTween(e, t),
					o = er.exec(t),
					a = i.cur(),
					s = +a || 0,
					u = 1,
					l = 20;
				if (o) {
					if (n = +o[2], r = o[3] || (st.cssNumber[e] ? "" : "px"), "px" !== r && s) {
						s = st.css(i.elem, e, !0) || n || 1;
						do u = u || ".5", s /= u, st.style(i.elem, e, s + r);
						while (u !== (u = i.cur() / a) && 1 !== u && --l)
					}
					i.unit = r, i.start = s, i.end = o[1] ? s + (o[1] + 1) * n : n
				}
				return i
			}]
		};
	st.Animation = st.extend(P, {
		tweener: function(e, t) {
			st.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
			for (var n, r = 0, i = e.length; i > r; r++) n = e[r], rr[n] = rr[n] || [], rr[n].unshift(t)
		},
		prefilter: function(e, t) {
			t ? nr.unshift(e) : nr.push(e)
		}
	}), st.Tween = $, $.prototype = {
		constructor: $,
		init: function(e, t, n, r, i, o) {
			this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (st.cssNumber[n] ? "" : "px")
		},
		cur: function() {
			var e = $.propHooks[this.prop];
			return e && e.get ? e.get(this) : $.propHooks._default.get(this)
		},
		run: function(e) {
			var t, n = $.propHooks[this.prop];
			return this.pos = t = this.options.duration ? st.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : $.propHooks._default.set(this), this
		}
	}, $.prototype.init.prototype = $.prototype, $.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = st.css(e.elem, e.prop, "auto"), t && "auto" !== t ? t : 0) : e.elem[e.prop]
			},
			set: function(e) {
				st.fx.step[e.prop] ? st.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[st.cssProps[e.prop]] || st.cssHooks[e.prop]) ? st.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, $.propHooks.scrollTop = $.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, st.each(["toggle", "show", "hide"], function(e, t) {
		var n = st.fn[t];
		st.fn[t] = function(e, r, i) {
			return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(I(t, !0), e, r, i)
		}
	}), st.fn.extend({
		fadeTo: function(e, t, n, r) {
			return this.filter(w).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, r)
		},
		animate: function(e, t, n, r) {
			var i = st.isEmptyObject(e),
				o = st.speed(t, n, r),
				a = function() {
					var t = P(this, st.extend({}, e), o);
					a.finish = function() {
						t.stop(!0)
					}, (i || st._data(this, "finish")) && t.stop(!0)
				};
			return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
		},
		stop: function(e, n, r) {
			var i = function(e) {
					var t = e.stop;
					delete e.stop, t(r)
				};
			return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
				var t = !0,
					n = null != e && e + "queueHooks",
					o = st.timers,
					a = st._data(this);
				if (n) a[n] && a[n].stop && i(a[n]);
				else for (n in a) a[n] && a[n].stop && tr.test(n) && i(a[n]);
				for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
				(t || !r) && st.dequeue(this, e)
			})
		},
		finish: function(e) {
			return e !== !1 && (e = e || "fx"), this.each(function() {
				var t, n = st._data(this),
					r = n[e + "queue"],
					i = n[e + "queueHooks"],
					o = st.timers,
					a = r ? r.length : 0;
				for (n.finish = !0, st.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
				for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
				delete n.finish
			})
		}
	}), st.each({
		slideDown: I("show"),
		slideUp: I("hide"),
		slideToggle: I("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(e, t) {
		st.fn[e] = function(e, n, r) {
			return this.animate(t, e, n, r)
		}
	}), st.speed = function(e, t, n) {
		var r = e && "object" == typeof e ? st.extend({}, e) : {
			complete: n || !n && t || st.isFunction(e) && e,
			duration: e,
			easing: n && t || t && !st.isFunction(t) && t
		};
		return r.duration = st.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in st.fx.speeds ? st.fx.speeds[r.duration] : st.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
			st.isFunction(r.old) && r.old.call(this), r.queue && st.dequeue(this, r.queue)
		}, r
	}, st.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		}
	}, st.timers = [], st.fx = $.prototype.init, st.fx.tick = function() {
		var e, n = st.timers,
			r = 0;
		for (Qn = st.now(); n.length > r; r++) e = n[r], e() || n[r] !== e || n.splice(r--, 1);
		n.length || st.fx.stop(), Qn = t
	}, st.fx.timer = function(e) {
		e() && st.timers.push(e) && st.fx.start()
	}, st.fx.interval = 13, st.fx.start = function() {
		Kn || (Kn = setInterval(st.fx.tick, st.fx.interval))
	}, st.fx.stop = function() {
		clearInterval(Kn), Kn = null
	}, st.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, st.fx.step = {}, st.expr && st.expr.filters && (st.expr.filters.animated = function(e) {
		return st.grep(st.timers, function(t) {
			return e === t.elem
		}).length
	}), st.fn.offset = function(e) {
		if (arguments.length) return e === t ? this : this.each(function(t) {
			st.offset.setOffset(this, e, t)
		});
		var n, r, i = {
			top: 0,
			left: 0
		},
			o = this[0],
			a = o && o.ownerDocument;
		if (a) return n = a.documentElement, st.contains(n, o) ? (o.getBoundingClientRect !== t && (i = o.getBoundingClientRect()), r = z(a), {
			top: i.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
			left: i.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
		}) : i
	}, st.offset = {
		setOffset: function(e, t, n) {
			var r = st.css(e, "position");
			"static" === r && (e.style.position = "relative");
			var i, o, a = st(e),
				s = a.offset(),
				u = st.css(e, "top"),
				l = st.css(e, "left"),
				c = ("absolute" === r || "fixed" === r) && st.inArray("auto", [u, l]) > -1,
				f = {},
				p = {};
			c ? (p = a.position(), i = p.top, o = p.left) : (i = parseFloat(u) || 0, o = parseFloat(l) || 0), st.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (f.top = t.top - s.top + i), null != t.left && (f.left = t.left - s.left + o), "using" in t ? t.using.call(e, f) : a.css(f)
		}
	}, st.fn.extend({
		position: function() {
			if (this[0]) {
				var e, t, n = {
					top: 0,
					left: 0
				},
					r = this[0];
				return "fixed" === st.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), st.nodeName(e[0], "html") || (n = e.offset()), n.top += st.css(e[0], "borderTopWidth", !0), n.left += st.css(e[0], "borderLeftWidth", !0)), {
					top: t.top - n.top - st.css(r, "marginTop", !0),
					left: t.left - n.left - st.css(r, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var e = this.offsetParent || V.documentElement; e && !st.nodeName(e, "html") && "static" === st.css(e, "position");) e = e.offsetParent;
				return e || V.documentElement
			})
		}
	}), st.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(e, n) {
		var r = /Y/.test(n);
		st.fn[e] = function(i) {
			return st.access(this, function(e, i, o) {
				var a = z(e);
				return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? st(a).scrollLeft() : o, r ? o : st(a).scrollTop()) : e[i] = o, t)
			}, e, i, arguments.length, null)
		}
	}), st.each({
		Height: "height",
		Width: "width"
	}, function(e, n) {
		st.each({
			padding: "inner" + e,
			content: n,
			"": "outer" + e
		}, function(r, i) {
			st.fn[i] = function(i, o) {
				var a = arguments.length && (r || "boolean" != typeof i),
					s = r || (i === !0 || o === !0 ? "margin" : "border");
				return st.access(this, function(n, r, i) {
					var o;
					return st.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? st.css(n, r, s) : st.style(n, r, i, s)
				}, n, a ? i : t, a, null)
			}
		})
	}), e.jQuery = e.$ = st, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
		return st
	})
})(window);
(function($) {
	var settings = {},
		roots = {},
		caches = {},
		_consts = {
			className: {
				BUTTON: "button fa",
				LEVEL: "level",
				ICO_LOADING: "ico_loading",
				SWITCH: "switch"
			},
			event: {
				NODECREATED: "ztree_nodeCreated",
				CLICK: "ztree_click",
				EXPAND: "ztree_expand",
				COLLAPSE: "ztree_collapse",
				ASYNC_SUCCESS: "ztree_async_success",
				ASYNC_ERROR: "ztree_async_error",
				REMOVE: "ztree_remove"
			},
			id: {
				A: "_a",
				ICON: "_ico",
				SPAN: "_span",
				SWITCH: "_switch",
				UL: "_ul"
			},
			line: {
				ROOT: "root",
				ROOTS: "roots",
				CENTER: "center",
				BOTTOM: "bottom",
				NOLINE: "noline",
				LINE: "line"
			},
			folder: {
				OPEN: "open",
				CLOSE: "close",
				DOCU: "docu"
			},
			node: {
				CURSELECTED: "curSelectedNode"
			}
		},
		_setting = {
			treeId: "",
			treeObj: null,
			view: {
				addDiyDom: null,
				autoCancelSelected: true,
				dblClickExpand: true,
				expandSpeed: "fast",
				fontCss: {},
				nameIsHTML: false,
				selectedMulti: true,
				showIcon: true,
				showLine: true,
				showTitle: true,
				txtSelectedEnable: false
			},
			data: {
				key: {
					children: "children",
					name: "name",
					title: "",
					url: "url"
				},
				simpleData: {
					enable: false,
					idKey: "id",
					pIdKey: "pId",
					rootPId: null
				},
				keep: {
					parent: false,
					leaf: false
				}
			},
			async: {
				enable: false,
				contentType: "application/x-www-form-urlencoded",
				type: "post",
				dataType: "text",
				url: "",
				autoParam: [],
				otherParam: [],
				dataFilter: null
			},
			callback: {
				beforeAsync: null,
				beforeClick: null,
				beforeDblClick: null,
				beforeRightClick: null,
				beforeMouseDown: null,
				beforeMouseUp: null,
				beforeExpand: null,
				beforeCollapse: null,
				beforeRemove: null,
				onAsyncError: null,
				onAsyncSuccess: null,
				onNodeCreated: null,
				onClick: null,
				onDblClick: null,
				onRightClick: null,
				onMouseDown: null,
				onMouseUp: null,
				onExpand: null,
				onCollapse: null,
				onRemove: null
			}
		},
		_initRoot = function(setting) {
			var r = data.getRoot(setting);
			if (!r) {
				r = {};
				data.setRoot(setting, r)
			}
			r[setting.data.key.children] = [];
			r.expandTriggerFlag = false;
			r.curSelectedList = [];
			r.noSelection = true;
			r.createdNodes = [];
			r.zId = 0;
			r._ver = (new Date).getTime()
		},
		_initCache = function(setting) {
			var c = data.getCache(setting);
			if (!c) {
				c = {};
				data.setCache(setting, c)
			}
			c.nodes = [];
			c.doms = []
		},
		_bindEvent = function(setting) {
			var o = setting.treeObj,
				c = consts.event;
			o.bind(c.NODECREATED, function(event, treeId, node) {
				tools.apply(setting.callback.onNodeCreated, [event, treeId, node])
			});
			o.bind(c.CLICK, function(event, srcEvent, treeId, node, clickFlag) {
				tools.apply(setting.callback.onClick, [srcEvent, treeId, node, clickFlag])
			});
			o.bind(c.EXPAND, function(event, treeId, node) {
				tools.apply(setting.callback.onExpand, [event, treeId, node])
			});
			o.bind(c.COLLAPSE, function(event, treeId, node) {
				tools.apply(setting.callback.onCollapse, [event, treeId, node])
			});
			o.bind(c.ASYNC_SUCCESS, function(event, treeId, node, msg) {
				tools.apply(setting.callback.onAsyncSuccess, [event, treeId, node, msg])
			});
			o.bind(c.ASYNC_ERROR, function(event, treeId, node, XMLHttpRequest, textStatus, errorThrown) {
				tools.apply(setting.callback.onAsyncError, [event, treeId, node, XMLHttpRequest, textStatus, errorThrown])
			});
			o.bind(c.REMOVE, function(event, treeId, treeNode) {
				tools.apply(setting.callback.onRemove, [event, treeId, treeNode])
			})
		},
		_unbindEvent = function(setting) {
			var o = setting.treeObj,
				c = consts.event;
			o.unbind(c.NODECREATED).unbind(c.CLICK).unbind(c.EXPAND).unbind(c.COLLAPSE).unbind(c.ASYNC_SUCCESS).unbind(c.ASYNC_ERROR).unbind(c.REMOVE)
		},
		_eventProxy = function(event) {
			var target = event.target,
				setting = data.getSetting(event.data.treeId),
				tId = "",
				node = null,
				nodeEventType = "",
				treeEventType = "",
				nodeEventCallback = null,
				treeEventCallback = null,
				tmp = null;
			if (tools.eqs(event.type, "mousedown")) {
				treeEventType = "mousedown"
			} else if (tools.eqs(event.type, "mouseup")) {
				treeEventType = "mouseup"
			} else if (tools.eqs(event.type, "contextmenu")) {
				treeEventType = "contextmenu"
			} else if (tools.eqs(event.type, "click")) {
				if (tools.eqs(target.tagName, "span") && target.getAttribute("treeNode" + consts.id.SWITCH) !== null) {
					tId = tools.getNodeMainDom(target).id;
					nodeEventType = "switchNode"
				} else {
					tmp = tools.getMDom(setting, target, [{
						tagName: "a",
						attrName: "treeNode" + consts.id.A
					}]);
					if (tmp) {
						tId = tools.getNodeMainDom(tmp).id;
						nodeEventType = "clickNode"
					}
				}
			} else if (tools.eqs(event.type, "dblclick")) {
				treeEventType = "dblclick";
				tmp = tools.getMDom(setting, target, [{
					tagName: "a",
					attrName: "treeNode" + consts.id.A
				}]);
				if (tmp) {
					tId = tools.getNodeMainDom(tmp).id;
					nodeEventType = "switchNode"
				}
			}
			if (treeEventType.length > 0 && tId.length == 0) {
				tmp = tools.getMDom(setting, target, [{
					tagName: "a",
					attrName: "treeNode" + consts.id.A
				}]);
				if (tmp) {
					tId = tools.getNodeMainDom(tmp).id
				}
			}
			if (tId.length > 0) {
				node = data.getNodeCache(setting, tId);
				switch (nodeEventType) {
				case "switchNode":
					if (!node.isParent) {
						nodeEventType = ""
					} else if (tools.eqs(event.type, "click") || tools.eqs(event.type, "dblclick") && tools.apply(setting.view.dblClickExpand, [setting.treeId, node], setting.view.dblClickExpand)) {
						nodeEventCallback = handler.onSwitchNode
					} else {
						nodeEventType = ""
					}
					break;
				case "clickNode":
					nodeEventCallback = handler.onClickNode;
					break
				}
			}
			switch (treeEventType) {
			case "mousedown":
				treeEventCallback = handler.onZTreeMousedown;
				break;
			case "mouseup":
				treeEventCallback = handler.onZTreeMouseup;
				break;
			case "dblclick":
				treeEventCallback = handler.onZTreeDblclick;
				break;
			case "contextmenu":
				treeEventCallback = handler.onZTreeContextmenu;
				break
			}
			var proxyResult = {
				stop: false,
				node: node,
				nodeEventType: nodeEventType,
				nodeEventCallback: nodeEventCallback,
				treeEventType: treeEventType,
				treeEventCallback: treeEventCallback
			};
			return proxyResult
		},
		_initNode = function(setting, level, n, parentNode, isFirstNode, isLastNode, openFlag) {
			if (!n) return;
			var r = data.getRoot(setting),
				childKey = setting.data.key.children;
			n.level = level;
			n.tId = n.NotebookId;
			n.parentTId = parentNode ? parentNode.tId : null;
			n.open = typeof n.open == "string" ? tools.eqs(n.open, "true") : !! n.open;
			if (n[childKey] && n[childKey].length > 0) {
				n.isParent = true;
				n.zAsync = true
			} else {
				n.isParent = typeof n.isParent == "string" ? tools.eqs(n.isParent, "true") : !! n.isParent;
				n.open = n.isParent && !setting.async.enable ? n.open : false;
				n.zAsync = !n.isParent
			}
			n.isFirstNode = isFirstNode;
			n.isLastNode = isLastNode;
			n.getParentNode = function() {
				return data.getNodeCache(setting, n.parentTId)
			};
			n.getPreNode = function() {
				return data.getPreNode(setting, n)
			};
			n.getNextNode = function() {
				return data.getNextNode(setting, n)
			};
			n.isAjaxing = false;
			data.fixPIdKeyValue(setting, n)
		},
		_init = {
			bind: [_bindEvent],
			unbind: [_unbindEvent],
			caches: [_initCache],
			nodes: [_initNode],
			proxys: [_eventProxy],
			roots: [_initRoot],
			beforeA: [],
			afterA: [],
			innerBeforeA: [],
			innerAfterA: [],
			zTreeTools: []
		},
		data = {
			addNodeCache: function(setting, node) {
				data.getCache(setting).nodes[data.getNodeCacheId(node.tId)] = node
			},
			getNodeCacheId: function(tId) {
				return tId.substring(tId.lastIndexOf("_") + 1)
			},
			addAfterA: function(afterA) {
				_init.afterA.push(afterA)
			},
			addBeforeA: function(beforeA) {
				_init.beforeA.push(beforeA)
			},
			addInnerAfterA: function(innerAfterA) {
				_init.innerAfterA.push(innerAfterA)
			},
			addInnerBeforeA: function(innerBeforeA) {
				_init.innerBeforeA.push(innerBeforeA)
			},
			addInitBind: function(bindEvent) {
				_init.bind.push(bindEvent)
			},
			addInitUnBind: function(unbindEvent) {
				_init.unbind.push(unbindEvent)
			},
			addInitCache: function(initCache) {
				_init.caches.push(initCache)
			},
			addInitNode: function(initNode) {
				_init.nodes.push(initNode)
			},
			addInitProxy: function(initProxy, isFirst) {
				if ( !! isFirst) {
					_init.proxys.splice(0, 0, initProxy)
				} else {
					_init.proxys.push(initProxy)
				}
			},
			addInitRoot: function(initRoot) {
				_init.roots.push(initRoot)
			},
			addNodesData: function(setting, parentNode, nodes) {
				var childKey = setting.data.key.children;
				if (!parentNode[childKey]) parentNode[childKey] = [];
				if (parentNode[childKey].length > 0) {
					parentNode[childKey][parentNode[childKey].length - 1].isLastNode = false;
					view.setNodeLineIcos(setting, parentNode[childKey][parentNode[childKey].length - 1])
				}
				parentNode.isParent = true;
				parentNode[childKey] = parentNode[childKey].concat(nodes)
			},
			addSelectedNode: function(setting, node) {
				var root = data.getRoot(setting);
				if (!data.isSelectedNode(setting, node)) {
					root.curSelectedList.push(node)
				}
			},
			addCreatedNode: function(setting, node) {
				if ( !! setting.callback.onNodeCreated || !! setting.view.addDiyDom) {
					var root = data.getRoot(setting);
					root.createdNodes.push(node)
				}
			},
			addZTreeTools: function(zTreeTools) {
				_init.zTreeTools.push(zTreeTools)
			},
			exSetting: function(s) {
				$.extend(true, _setting, s)
			},
			fixPIdKeyValue: function(setting, node) {
				if (setting.data.simpleData.enable) {
					node[setting.data.simpleData.pIdKey] = node.parentTId ? node.getParentNode()[setting.data.simpleData.idKey] : setting.data.simpleData.rootPId
				}
			},
			getAfterA: function(setting, node, array) {
				for (var i = 0, j = _init.afterA.length; i < j; i++) {
					_init.afterA[i].apply(this, arguments)
				}
			},
			getBeforeA: function(setting, node, array) {
				for (var i = 0, j = _init.beforeA.length; i < j; i++) {
					_init.beforeA[i].apply(this, arguments)
				}
			},
			getInnerAfterA: function(setting, node, array) {
				for (var i = 0, j = _init.innerAfterA.length; i < j; i++) {
					_init.innerAfterA[i].apply(this, arguments)
				}
			},
			getInnerBeforeA: function(setting, node, array) {
				for (var i = 0, j = _init.innerBeforeA.length; i < j; i++) {
					_init.innerBeforeA[i].apply(this, arguments)
				}
			},
			getCache: function(setting) {
				return caches[setting.treeId]
			},
			getNextNode: function(setting, node) {
				if (!node) return null;
				var childKey = setting.data.key.children,
					p = node.parentTId ? node.getParentNode() : data.getRoot(setting);
				for (var i = 0, l = p[childKey].length - 1; i <= l; i++) {
					if (p[childKey][i] === node) {
						return i == l ? null : p[childKey][i + 1]
					}
				}
				return null
			},
			getNodeByParam: function(setting, nodes, key, value) {
				if (!nodes || !key) return null;
				var childKey = setting.data.key.children;
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (nodes[i][key] == value) {
						return nodes[i]
					}
					var tmp = data.getNodeByParam(setting, nodes[i][childKey], key, value);
					if (tmp) return tmp
				}
				return null
			},
			getNodeCache: function(setting, tId) {
				if (!tId) return null;
				var n = caches[setting.treeId].nodes[data.getNodeCacheId(tId)];
				return n ? n : null
			},
			getNodeName: function(setting, node) {
				var nameKey = setting.data.key.name;
				return "" + node[nameKey]
			},
			getNodeTitle: function(setting, node) {
				var t = setting.data.key.title === "" ? setting.data.key.name : setting.data.key.title;
				return "" + node[t]
			},
			getNodes: function(setting) {
				return data.getRoot(setting)[setting.data.key.children]
			},
			getNodesByParam: function(setting, nodes, key, value) {
				if (!nodes || !key) return [];
				var childKey = setting.data.key.children,
					result = [];
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (nodes[i][key] == value) {
						result.push(nodes[i])
					}
					result = result.concat(data.getNodesByParam(setting, nodes[i][childKey], key, value))
				}
				return result
			},
			getNodesByParamFuzzy: function(setting, nodes, key, value) {
				if (!nodes || !key) return [];
				var childKey = setting.data.key.children,
					result = [];
				value = value.toLowerCase();
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (typeof nodes[i][key] == "string" && nodes[i][key].toLowerCase().indexOf(value) > -1) {
						result.push(nodes[i])
					}
					result = result.concat(data.getNodesByParamFuzzy(setting, nodes[i][childKey], key, value))
				}
				return result
			},
			getNodesByFilter: function(setting, nodes, filter, isSingle, invokeParam) {
				if (!nodes) return isSingle ? null : [];
				var childKey = setting.data.key.children,
					result = isSingle ? null : [];
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (tools.apply(filter, [nodes[i], invokeParam], false)) {
						if (isSingle) {
							return nodes[i]
						}
						result.push(nodes[i])
					}
					var tmpResult = data.getNodesByFilter(setting, nodes[i][childKey], filter, isSingle, invokeParam);
					if (isSingle && !! tmpResult) {
						return tmpResult
					}
					result = isSingle ? tmpResult : result.concat(tmpResult)
				}
				return result
			},
			getPreNode: function(setting, node) {
				if (!node) return null;
				var childKey = setting.data.key.children,
					p = node.parentTId ? node.getParentNode() : data.getRoot(setting);
				for (var i = 0, l = p[childKey].length; i < l; i++) {
					if (p[childKey][i] === node) {
						return i == 0 ? null : p[childKey][i - 1]
					}
				}
				return null
			},
			getRoot: function(setting) {
				return setting ? roots[setting.treeId] : null
			},
			getRoots: function() {
				return roots
			},
			getSetting: function(treeId) {
				return settings[treeId]
			},
			getSettings: function() {
				return settings
			},
			getZTreeTools: function(treeId) {
				var r = this.getRoot(this.getSetting(treeId));
				return r ? r.treeTools : null
			},
			initCache: function(setting) {
				for (var i = 0, j = _init.caches.length; i < j; i++) {
					_init.caches[i].apply(this, arguments)
				}
			},
			initNode: function(setting, level, node, parentNode, preNode, nextNode) {
				for (var i = 0, j = _init.nodes.length; i < j; i++) {
					_init.nodes[i].apply(this, arguments)
				}
			},
			initRoot: function(setting) {
				for (var i = 0, j = _init.roots.length; i < j; i++) {
					_init.roots[i].apply(this, arguments)
				}
			},
			isSelectedNode: function(setting, node) {
				var root = data.getRoot(setting);
				for (var i = 0, j = root.curSelectedList.length; i < j; i++) {
					if (node === root.curSelectedList[i]) return true
				}
				return false
			},
			removeNodeCache: function(setting, node) {
				var childKey = setting.data.key.children;
				if (node[childKey]) {
					for (var i = 0, l = node[childKey].length; i < l; i++) {
						arguments.callee(setting, node[childKey][i])
					}
				}
				data.getCache(setting).nodes[data.getNodeCacheId(node.tId)] = null
			},
			removeSelectedNode: function(setting, node) {
				var root = data.getRoot(setting);
				for (var i = 0, j = root.curSelectedList.length; i < j; i++) {
					if (node === root.curSelectedList[i] || !data.getNodeCache(setting, root.curSelectedList[i].tId)) {
						root.curSelectedList.splice(i, 1);
						i--;
						j--
					}
				}
			},
			setCache: function(setting, cache) {
				caches[setting.treeId] = cache
			},
			setRoot: function(setting, root) {
				roots[setting.treeId] = root
			},
			setZTreeTools: function(setting, zTreeTools) {
				for (var i = 0, j = _init.zTreeTools.length; i < j; i++) {
					_init.zTreeTools[i].apply(this, arguments)
				}
			},
			transformToArrayFormat: function(setting, nodes) {
				if (!nodes) return [];
				var childKey = setting.data.key.children,
					r = [];
				if (tools.isArray(nodes)) {
					for (var i = 0, l = nodes.length; i < l; i++) {
						r.push(nodes[i]);
						if (nodes[i][childKey]) r = r.concat(data.transformToArrayFormat(setting, nodes[i][childKey]))
					}
				} else {
					r.push(nodes);
					if (nodes[childKey]) r = r.concat(data.transformToArrayFormat(setting, nodes[childKey]))
				}
				return r
			},
			transformTozTreeFormat: function(setting, sNodes) {
				var i, l, key = setting.data.simpleData.idKey,
					parentKey = setting.data.simpleData.pIdKey,
					childKey = setting.data.key.children;
				if (!key || key == "" || !sNodes) return [];
				if (tools.isArray(sNodes)) {
					var r = [];
					var tmpMap = [];
					for (i = 0, l = sNodes.length; i < l; i++) {
						tmpMap[sNodes[i][key]] = sNodes[i]
					}
					for (i = 0, l = sNodes.length; i < l; i++) {
						if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
							if (!tmpMap[sNodes[i][parentKey]][childKey]) tmpMap[sNodes[i][parentKey]][childKey] = [];
							tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i])
						} else {
							r.push(sNodes[i])
						}
					}
					return r
				} else {
					return [sNodes]
				}
			}
		},
		event = {
			bindEvent: function(setting) {
				for (var i = 0, j = _init.bind.length; i < j; i++) {
					_init.bind[i].apply(this, arguments)
				}
			},
			unbindEvent: function(setting) {
				for (var i = 0, j = _init.unbind.length; i < j; i++) {
					_init.unbind[i].apply(this, arguments)
				}
			},
			bindTree: function(setting) {
				var eventParam = {
					treeId: setting.treeId
				},
					o = setting.treeObj;
				if (!setting.view.txtSelectedEnable) {
					o.bind("selectstart", function(e) {
						var node;
						var n = e.originalEvent.srcElement.nodeName.toLowerCase();
						return n === "input" || n === "textarea"
					}).css({
						"-moz-user-select": "-moz-none"
					})
				}
				o.bind("click", eventParam, event.proxy);
				o.bind("dblclick", eventParam, event.proxy);
				o.bind("mouseover", eventParam, event.proxy);
				o.bind("mouseout", eventParam, event.proxy);
				o.bind("mousedown", eventParam, event.proxy);
				o.bind("mouseup", eventParam, event.proxy);
				o.bind("contextmenu", eventParam, event.proxy)
			},
			unbindTree: function(setting) {
				var o = setting.treeObj;
				o.unbind("click", event.proxy).unbind("dblclick", event.proxy).unbind("mouseover", event.proxy).unbind("mouseout", event.proxy).unbind("mousedown", event.proxy).unbind("mouseup", event.proxy).unbind("contextmenu", event.proxy)
			},
			doProxy: function(e) {
				var results = [];
				for (var i = 0, j = _init.proxys.length; i < j; i++) {
					var proxyResult = _init.proxys[i].apply(this, arguments);
					results.push(proxyResult);
					if (proxyResult.stop) {
						break
					}
				}
				return results
			},
			proxy: function(e) {
				var setting = data.getSetting(e.data.treeId);
				if (!tools.uCanDo(setting, e)) return true;
				var results = event.doProxy(e),
					r = true,
					x = false;
				for (var i = 0, l = results.length; i < l; i++) {
					var proxyResult = results[i];
					if (proxyResult.nodeEventCallback) {
						x = true;
						r = proxyResult.nodeEventCallback.apply(proxyResult, [e, proxyResult.node]) && r
					}
					if (proxyResult.treeEventCallback) {
						x = true;
						r = proxyResult.treeEventCallback.apply(proxyResult, [e, proxyResult.node]) && r
					}
				}
				return r
			}
		},
		handler = {
			onSwitchNode: function(event, node) {
				var setting = data.getSetting(event.data.treeId);
				if (node.open) {
					if (tools.apply(setting.callback.beforeCollapse, [setting.treeId, node], true) == false) return true;
					data.getRoot(setting).expandTriggerFlag = true;
					view.switchNode(setting, node)
				} else {
					if (tools.apply(setting.callback.beforeExpand, [setting.treeId, node], true) == false) return true;
					data.getRoot(setting).expandTriggerFlag = true;
					view.switchNode(setting, node)
				}
				return true
			},
			onClickNode: function(event, node) {
				var setting = data.getSetting(event.data.treeId),
					clickFlag = setting.view.autoCancelSelected && (event.ctrlKey || event.metaKey) && data.isSelectedNode(setting, node) ? 0 : setting.view.autoCancelSelected && (event.ctrlKey || event.metaKey) && setting.view.selectedMulti ? 2 : 1;
				if (tools.apply(setting.callback.beforeClick, [setting.treeId, node, clickFlag], true) == false) return true;
				if (clickFlag === 0) {
					view.cancelPreSelectedNode(setting, node)
				} else {
					view.selectNode(setting, node, clickFlag === 2)
				}
				setting.treeObj.trigger(consts.event.CLICK, [event, setting.treeId, node, clickFlag]);
				return true
			},
			onZTreeMousedown: function(event, node) {
				var setting = data.getSetting(event.data.treeId);
				if (tools.apply(setting.callback.beforeMouseDown, [setting.treeId, node], true)) {
					tools.apply(setting.callback.onMouseDown, [event, setting.treeId, node])
				}
				return true
			},
			onZTreeMouseup: function(event, node) {
				var setting = data.getSetting(event.data.treeId);
				if (tools.apply(setting.callback.beforeMouseUp, [setting.treeId, node], true)) {
					tools.apply(setting.callback.onMouseUp, [event, setting.treeId, node])
				}
				return true
			},
			onZTreeDblclick: function(event, node) {
				var setting = data.getSetting(event.data.treeId);
				if (tools.apply(setting.callback.beforeDblClick, [setting.treeId, node], true)) {
					tools.apply(setting.callback.onDblClick, [event, setting.treeId, node])
				}
				return true
			},
			onZTreeContextmenu: function(event, node) {
				var setting = data.getSetting(event.data.treeId);
				if (tools.apply(setting.callback.beforeRightClick, [setting.treeId, node], true)) {
					tools.apply(setting.callback.onRightClick, [event, setting.treeId, node])
				}
				return typeof setting.callback.onRightClick != "function"
			}
		},
		tools = {
			apply: function(fun, param, defaultValue) {
				if (typeof fun == "function") {
					return fun.apply(zt, param ? param : [])
				}
				return defaultValue
			},
			canAsync: function(setting, node) {
				var childKey = setting.data.key.children;
				return setting.async.enable && node && node.isParent && !(node.zAsync || node[childKey] && node[childKey].length > 0)
			},
			clone: function(obj) {
				if (obj === null) return null;
				var o = tools.isArray(obj) ? [] : {};
				for (var i in obj) {
					o[i] = obj[i] instanceof Date ? new Date(obj[i].getTime()) : typeof obj[i] === "object" ? arguments.callee(obj[i]) : obj[i]
				}
				return o
			},
			eqs: function(str1, str2) {
				return str1.toLowerCase() === str2.toLowerCase()
			},
			isArray: function(arr) {
				return Object.prototype.toString.apply(arr) === "[object Array]"
			},
			$: function(node, exp, setting) {
				if ( !! exp && typeof exp != "string") {
					setting = exp;
					exp = ""
				}
				if (typeof node == "string") {
					return $(node, setting ? setting.treeObj.get(0).ownerDocument : null)
				} else {
					return $("#" + node.tId + exp, setting ? setting.treeObj : null)
				}
			},
			getMDom: function(setting, curDom, targetExpr) {
				if (!curDom) return null;
				while (curDom && curDom.id !== setting.treeId) {
					for (var i = 0, l = targetExpr.length; curDom.tagName && i < l; i++) {
						if (tools.eqs(curDom.tagName, targetExpr[i].tagName) && curDom.getAttribute(targetExpr[i].attrName) !== null) {
							return curDom
						}
					}
					curDom = curDom.parentNode
				}
				return null
			},
			getNodeMainDom: function(target) {
				return $(target).parent("li").get(0) || $(target).parentsUntil("li").parent().get(0)
			},
			isChildOrSelf: function(dom, parentId) {
				return $(dom).closest("#" + parentId).length > 0
			},
			uCanDo: function(setting, e) {
				return true
			}
		},
		view = {
			addNodes: function(setting, parentNode, newNodes, isSilent, is_new) {
				if (setting.data.keep.leaf && parentNode && !parentNode.isParent) {
					return
				}
				if (!tools.isArray(newNodes)) {
					newNodes = [newNodes]
				}
				if (setting.data.simpleData.enable) {
					newNodes = data.transformTozTreeFormat(setting, newNodes)
				}
				if (parentNode) {
					var target_switchObj = $$(parentNode, consts.id.SWITCH, setting),
						target_icoObj = $$(parentNode, consts.id.ICON, setting),
						target_ulObj = $$(parentNode, consts.id.UL, setting);
					if (!parentNode.open) {
						view.replaceSwitchClass(parentNode, target_switchObj, consts.folder.CLOSE);
						view.replaceIcoClass(parentNode, target_icoObj, consts.folder.CLOSE);
						parentNode.open = false;
						target_ulObj.css({
							display: "none"
						})
					}
					if (!isSilent) {
						if (parentNode.Subs && parentNode.Subs.length > 0) {
							view.expandCollapseParentNode(setting, parentNode, true)
						} else {
							parentNode.Subs = []
						}
					}
					data.addNodesData(setting, parentNode, newNodes);
					view.createNodes(setting, parentNode.level + 1, newNodes, parentNode, is_new);
					if (!isSilent) {
						if (parentNode.Subs.length == 1) {
							view.expandCollapseParentNode(setting, parentNode, true, true, function() {
								view.editNode(setting, newNodes[0])
							})
						}
					}
				} else {
					data.addNodesData(setting, data.getRoot(setting), newNodes);
					view.createNodes(setting, 0, newNodes, null, is_new)
				}
			},
			appendNodes: function(setting, level, nodes, parentNode, initFlag, openFlag) {
				if (!nodes) return [];
				var html = [],
					childKey = setting.data.key.children;
				for (var i = 0, l = nodes.length; i < l; i++) {
					var node = nodes[i];
					if (initFlag) {
						var tmpPNode = parentNode ? parentNode : data.getRoot(setting),
							tmpPChild = tmpPNode[childKey],
							isFirstNode = tmpPChild.length == nodes.length && i == 0,
							isLastNode = i == nodes.length - 1;
						data.initNode(setting, level, node, parentNode, isFirstNode, isLastNode, openFlag);
						data.addNodeCache(setting, node)
					}
					var childHtml = [];
					if (node[childKey] && node[childKey].length > 0) {
						childHtml = view.appendNodes(setting, level + 1, node[childKey], node, initFlag, openFlag && node.open)
					}
					if (openFlag) {
						view.makeDOMNodeMainBefore(html, setting, node);
						view.makeDOMNodeLine(html, setting, node);
						data.getBeforeA(setting, node, html);
						view.makeDOMNodeNameBefore(html, setting, node);
						data.getInnerBeforeA(setting, node, html);
						view.makeDOMNodeIcon(html, setting, node);
						data.getInnerAfterA(setting, node, html);
						view.makeDOMNodeNameAfter(html, setting, node);
						data.getAfterA(setting, node, html);
						if (node.isParent && node.open) {
							view.makeUlHtml(setting, node, html, childHtml.join(""))
						}
						view.makeDOMNodeMainAfter(html, setting, node);
						data.addCreatedNode(setting, node)
					}
				}
				return html
			},
			appendParentULDom: function(setting, node) {
				var html = [],
					nObj = $$(node, setting);
				if (!nObj.get(0) && !! node.parentTId) {
					view.appendParentULDom(setting, node.getParentNode());
					nObj = $$(node, setting)
				}
				var ulObj = $$(node, consts.id.UL, setting);
				if (ulObj.get(0)) {
					ulObj.remove()
				}
				var childKey = setting.data.key.children,
					childHtml = view.appendNodes(setting, node.level + 1, node[childKey], node, false, true);
				view.makeUlHtml(setting, node, html, childHtml.join(""));
				nObj.append(html.join(""))
			},
			asyncNode: function(setting, node, isSilent, callback) {
				var i, l;
				if (node && !node.isParent) {
					tools.apply(callback);
					return false
				} else if (node && node.isAjaxing) {
					return false
				} else if (tools.apply(setting.callback.beforeAsync, [setting.treeId, node], true) == false) {
					tools.apply(callback);
					return false
				}
				if (node) {
					node.isAjaxing = true;
					var icoObj = $$(node, consts.id.ICON, setting);
					icoObj.attr({
						style: "",
						"class": consts.className.BUTTON + " " + consts.className.ICO_LOADING
					})
				}
				var tmpParam = {};
				for (i = 0, l = setting.async.autoParam.length; node && i < l; i++) {
					var pKey = setting.async.autoParam[i].split("="),
						spKey = pKey;
					if (pKey.length > 1) {
						spKey = pKey[1];
						pKey = pKey[0]
					}
					tmpParam[spKey] = node[pKey]
				}
				if (tools.isArray(setting.async.otherParam)) {
					for (i = 0, l = setting.async.otherParam.length; i < l; i += 2) {
						tmpParam[setting.async.otherParam[i]] = setting.async.otherParam[i + 1]
					}
				} else {
					for (var p in setting.async.otherParam) {
						tmpParam[p] = setting.async.otherParam[p]
					}
				}
				var _tmpV = data.getRoot(setting)._ver;
				$.ajax({
					contentType: setting.async.contentType,
					type: setting.async.type,
					url: tools.apply(setting.async.url, [setting.treeId, node], setting.async.url),
					data: tmpParam,
					dataType: setting.async.dataType,
					success: function(msg) {
						if (_tmpV != data.getRoot(setting)._ver) {
							return
						}
						var newNodes = [];
						try {
							if (!msg || msg.length == 0) {
								newNodes = []
							} else if (typeof msg == "string") {
								newNodes = eval("(" + msg + ")")
							} else {
								newNodes = msg
							}
						} catch (err) {
							newNodes = msg
						}
						if (node) {
							node.isAjaxing = null;
							node.zAsync = true
						}
						view.setNodeLineIcos(setting, node);
						if (newNodes && newNodes !== "") {
							newNodes = tools.apply(setting.async.dataFilter, [setting.treeId, node, newNodes], newNodes);
							view.addNodes(setting, node, !! newNodes ? tools.clone(newNodes) : [], !! isSilent)
						} else {
							view.addNodes(setting, node, [], !! isSilent)
						}
						setting.treeObj.trigger(consts.event.ASYNC_SUCCESS, [setting.treeId, node, msg]);
						tools.apply(callback)
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						if (_tmpV != data.getRoot(setting)._ver) {
							return
						}
						if (node) node.isAjaxing = null;
						view.setNodeLineIcos(setting, node);
						setting.treeObj.trigger(consts.event.ASYNC_ERROR, [setting.treeId, node, XMLHttpRequest, textStatus, errorThrown])
					}
				});
				return true
			},
			cancelPreSelectedNode: function(setting, node) {
				var list = data.getRoot(setting).curSelectedList;
				for (var i = 0, j = list.length - 1; j >= i; j--) {
					if (!node || node === list[j]) {
						$$(list[j], consts.id.A, setting).removeClass(consts.node.CURSELECTED);
						if (node) {
							data.removeSelectedNode(setting, node);
							break
						}
					}
				}
				if (!node) data.getRoot(setting).curSelectedList = []
			},
			createNodeCallback: function(setting) {
				if ( !! setting.callback.onNodeCreated || !! setting.view.addDiyDom) {
					var root = data.getRoot(setting);
					while (root.createdNodes.length > 0) {
						var node = root.createdNodes.shift();
						tools.apply(setting.view.addDiyDom, [setting.treeId, node]);
						if ( !! setting.callback.onNodeCreated) {
							setting.treeObj.trigger(consts.event.NODECREATED, [setting.treeId, node])
						}
					}
				}
			},
			createNodes: function(setting, level, nodes, parentNode, is_new) {
				if (!nodes || nodes.length == 0) return;
				var root = data.getRoot(setting),
					childKey = setting.data.key.children,
					openFlag = !parentNode || parentNode.open || !! $$(parentNode[childKey][0], setting).get(0);
				root.createdNodes = [];
				var zTreeHtml = view.appendNodes(setting, level, nodes, parentNode, true, openFlag);
				if (!parentNode) {
					if (is_new) {
						setting.treeObj.find("li").eq(0).after(zTreeHtml.join(""));
						view.editNode(setting, nodes[0])
					} else {
						setting.treeObj.append(zTreeHtml.join(""))
					}
				} else {
					var ulObj = $$(parentNode, consts.id.UL, setting);
					if (ulObj.get(0)) {
						if (is_new) {
							ulObj.prepend(zTreeHtml.join(""));
							view.editNode(setting, nodes[0])
						} else {
							ulObj.append(zTreeHtml.join(""))
						}
					}
				}
				view.createNodeCallback(setting)
			},
			destroy: function(setting) {
				if (!setting) return;
				data.initCache(setting);
				data.initRoot(setting);
				event.unbindTree(setting);
				event.unbindEvent(setting);
				setting.treeObj.empty();
				delete settings[setting.treeId]
			},
			expandCollapseNode: function(setting, node, expandFlag, animateFlag, callback) {
				var root = data.getRoot(setting),
					childKey = setting.data.key.children;
				if (!node) {
					tools.apply(callback, []);
					return
				}
				if (root.expandTriggerFlag) {
					var _callback = callback;
					callback = function() {
						if (_callback) _callback();
						if (node.open) {
							setting.treeObj.trigger(consts.event.EXPAND, [setting.treeId, node])
						} else {
							setting.treeObj.trigger(consts.event.COLLAPSE, [setting.treeId, node])
						}
					};
					root.expandTriggerFlag = false
				}
				if (!node.open && node.isParent && (!$$(node, consts.id.UL, setting).get(0) || node[childKey] && node[childKey].length > 0 && !$$(node[childKey][0], setting).get(0))) {
					view.appendParentULDom(setting, node);
					view.createNodeCallback(setting)
				}
				if (node.open == expandFlag) {
					tools.apply(callback, []);
					return
				}
				var ulObj = $$(node, consts.id.UL, setting),
					switchObj = $$(node, consts.id.SWITCH, setting),
					icoObj = $$(node, consts.id.ICON, setting);
				if (node.isParent) {
					node.open = !node.open;
					if (node.iconOpen && node.iconClose) {
						icoObj.attr("style", view.makeNodeIcoStyle(setting, node))
					}
					if (node.open) {
						view.replaceSwitchClass(node, switchObj, consts.folder.OPEN);
						view.replaceIcoClass(node, icoObj, consts.folder.OPEN);
						if (animateFlag == false || setting.view.expandSpeed == "") {
							ulObj.show();
							tools.apply(callback, [])
						} else {
							if (node[childKey] && node[childKey].length > 0) {
								ulObj.slideDown(setting.view.expandSpeed, callback)
							} else {
								ulObj.show();
								tools.apply(callback, [])
							}
						}
					} else {
						view.replaceSwitchClass(node, switchObj, consts.folder.CLOSE);
						view.replaceIcoClass(node, icoObj, consts.folder.CLOSE);
						if (animateFlag == false || setting.view.expandSpeed == "" || !(node[childKey] && node[childKey].length > 0)) {
							ulObj.hide();
							tools.apply(callback, [])
						} else {
							ulObj.slideUp(setting.view.expandSpeed, callback)
						}
					}
				} else {
					tools.apply(callback, [])
				}
			},
			expandCollapseParentNode: function(setting, node, expandFlag, animateFlag, callback) {
				if (!node) return;
				if (!node.parentTId) {
					view.expandCollapseNode(setting, node, expandFlag, animateFlag, callback);
					return
				} else {
					view.expandCollapseNode(setting, node, expandFlag, animateFlag)
				}
				if (node.parentTId) {
					view.expandCollapseParentNode(setting, node.getParentNode(), expandFlag, animateFlag, callback)
				}
			},
			expandCollapseSonNode: function(setting, node, expandFlag, animateFlag, callback) {
				var root = data.getRoot(setting),
					childKey = setting.data.key.children,
					treeNodes = node ? node[childKey] : root[childKey],
					selfAnimateSign = node ? false : animateFlag,
					expandTriggerFlag = data.getRoot(setting).expandTriggerFlag;
				data.getRoot(setting).expandTriggerFlag = false;
				if (treeNodes) {
					for (var i = 0, l = treeNodes.length; i < l; i++) {
						if (treeNodes[i]) view.expandCollapseSonNode(setting, treeNodes[i], expandFlag, selfAnimateSign)
					}
				}
				data.getRoot(setting).expandTriggerFlag = expandTriggerFlag;
				view.expandCollapseNode(setting, node, expandFlag, animateFlag, callback)
			},
			makeDOMNodeIcon: function(html, setting, node) {
				var nameStr = data.getNodeName(setting, node),
					name = setting.view.nameIsHTML ? nameStr : nameStr.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				html.push("<span id='", node.tId, consts.id.ICON, "' title='' treeNode", consts.id.ICON, " class='", view.makeNodeIcoClass(setting, node), "' style='", view.makeNodeIcoStyle(setting, node), "'></span><span class='tree-title' id='", node.tId, consts.id.SPAN, "'>", name, "</span>")
			},
			makeDOMNodeLine: function(html, setting, node) {
				html.push("<span id='", node.tId, consts.id.SWITCH, "' title='' class='", view.makeNodeLineClass(setting, node), "' treeNode", consts.id.SWITCH, "></span>")
			},
			makeDOMNodeMainAfter: function(html, setting, node) {
				html.push("</li>")
			},
			makeDOMNodeMainBefore: function(html, setting, node) {
				html.push("<li id='", node.tId, "' class='", consts.className.LEVEL, node.level, "' tabindex='0' hidefocus='true' treenode>")
			},
			makeDOMNodeNameAfter: function(html, setting, node) {
				html.push("</a>")
			},
			makeDOMNodeNameBefore: function(html, setting, node) {
				var title = data.getNodeTitle(setting, node),
					url = view.makeNodeUrl(setting, node),
					fontcss = view.makeNodeFontCss(setting, node),
					fontStyle = [];
				for (var f in fontcss) {
					fontStyle.push(f, ":", fontcss[f], ";")
				}
				html.push("<a id='", node.tId, consts.id.A, "' class='notebook-item ", consts.className.LEVEL, node.level, "' treeNode", consts.id.A, ' onclick="', node.click || "", '" ', url != null && url.length > 0 ? "href='" + url + "'" : "", " target='", view.makeNodeTarget(node), "' style='", fontStyle.join(""), "'", ' notebookId="' + node.NotebookId + '" ');
				if (tools.apply(setting.view.showTitle, [setting.treeId, node], setting.view.showTitle) && title) {
					html.push("title='", title.replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "'")
				}
				html.push(">")
			},
			makeNodeFontCss: function(setting, node) {
				var fontCss = tools.apply(setting.view.fontCss, [setting.treeId, node], setting.view.fontCss);
				return fontCss && typeof fontCss != "function" ? fontCss : {}
			},
			makeNodeIcoClass: function(setting, node) {
				var icoCss = ["ico"];
				if (!node.isAjaxing) {
					icoCss[0] = (node.iconSkin ? node.iconSkin + "_" : "") + icoCss[0];
					if (node.isParent) {
						icoCss.push(node.open ? consts.folder.OPEN : consts.folder.CLOSE)
					} else {
						icoCss.push(consts.folder.DOCU)
					}
				}
				return consts.className.BUTTON + " " + icoCss.join("_")
			},
			makeNodeIcoStyle: function(setting, node) {
				var icoStyle = [];
				if (!node.isAjaxing) {
					var icon = node.isParent && node.iconOpen && node.iconClose ? node.open ? node.iconOpen : node.iconClose : node.icon;
					if (icon) icoStyle.push("background:url(", icon, ") 0 0 no-repeat;");
					if (setting.view.showIcon == false || !tools.apply(setting.view.showIcon, [setting.treeId, node], true)) {
						icoStyle.push("width:0px;height:0px;")
					}
				}
				return icoStyle.join("")
			},
			makeNodeLineClass: function(setting, node) {
				var lineClass = [];
				if (setting.view.showLine) {
					if (node.level == 0 && node.isFirstNode && node.isLastNode) {
						lineClass.push(consts.line.ROOT)
					} else if (node.level == 0 && node.isFirstNode) {
						lineClass.push(consts.line.ROOTS)
					} else if (node.isLastNode) {
						lineClass.push(consts.line.BOTTOM)
					} else {
						lineClass.push(consts.line.CENTER)
					}
				} else {
					lineClass.push(consts.line.NOLINE)
				}
				if (node.isParent) {
					lineClass.push(node.open ? consts.folder.OPEN : consts.folder.CLOSE)
				} else {
					lineClass.push(consts.folder.DOCU)
				}
				return view.makeNodeLineClassEx(node) + lineClass.join("_")
			},
			makeNodeLineClassEx: function(node) {
				return consts.className.BUTTON + " " + consts.className.LEVEL + node.level + " " + consts.className.SWITCH + " "
			},
			makeNodeTarget: function(node) {
				return node.target || "_blank"
			},
			makeNodeUrl: function(setting, node) {
				var urlKey = setting.data.key.url;
				return node[urlKey] ? node[urlKey] : null
			},
			makeUlHtml: function(setting, node, html, content) {
				html.push("<ul id='", node.tId, consts.id.UL, "' class='", consts.className.LEVEL, node.level, " ", view.makeUlLineClass(setting, node), "' style='display:", node.open ? "block" : "none", "'>");
				html.push(content);
				html.push("</ul>")
			},
			makeUlLineClass: function(setting, node) {
				return setting.view.showLine && !node.isLastNode ? consts.line.LINE : ""
			},
			removeChildNodes: function(setting, node) {
				if (!node) return;
				var childKey = setting.data.key.children,
					nodes = node[childKey];
				if (!nodes) return;
				for (var i = 0, l = nodes.length; i < l; i++) {
					data.removeNodeCache(setting, nodes[i])
				}
				data.removeSelectedNode(setting);
				delete node[childKey];
				if (!setting.data.keep.parent) {
					node.isParent = false;
					node.open = false;
					var tmp_switchObj = $$(node, consts.id.SWITCH, setting),
						tmp_icoObj = $$(node, consts.id.ICON, setting);
					view.replaceSwitchClass(node, tmp_switchObj, consts.folder.DOCU);
					view.replaceIcoClass(node, tmp_icoObj, consts.folder.DOCU);
					$$(node, consts.id.UL, setting).remove()
				} else {
					$$(node, consts.id.UL, setting).empty()
				}
			},
			setFirstNode: function(setting, parentNode) {
				var childKey = setting.data.key.children,
					childLength = parentNode[childKey].length;
				if (childLength > 0) {
					parentNode[childKey][0].isFirstNode = true
				}
			},
			setLastNode: function(setting, parentNode) {
				var childKey = setting.data.key.children,
					childLength = parentNode[childKey].length;
				if (childLength > 0) {
					parentNode[childKey][childLength - 1].isLastNode = true
				}
			},
			removeNode: function(setting, node) {
				var root = data.getRoot(setting),
					childKey = setting.data.key.children,
					parentNode = node.parentTId ? node.getParentNode() : root;
				node.isFirstNode = false;
				node.isLastNode = false;
				node.getPreNode = function() {
					return null
				};
				node.getNextNode = function() {
					return null
				};
				if (!data.getNodeCache(setting, node.tId)) {
					return
				}
				$$(node, setting).remove();
				data.removeNodeCache(setting, node);
				data.removeSelectedNode(setting, node);
				for (var i = 0, l = parentNode[childKey].length; i < l; i++) {
					if (parentNode[childKey][i].tId == node.tId) {
						parentNode[childKey].splice(i, 1);
						break
					}
				}
				view.setFirstNode(setting, parentNode);
				view.setLastNode(setting, parentNode);
				var tmp_ulObj, tmp_switchObj, tmp_icoObj, childLength = parentNode[childKey].length;
				if (!setting.data.keep.parent && childLength == 0) {
					parentNode.isParent = false;
					parentNode.open = false;
					tmp_ulObj = $$(parentNode, consts.id.UL, setting);
					tmp_switchObj = $$(parentNode, consts.id.SWITCH, setting);
					tmp_icoObj = $$(parentNode, consts.id.ICON, setting);
					view.replaceSwitchClass(parentNode, tmp_switchObj, consts.folder.DOCU);
					view.replaceIcoClass(parentNode, tmp_icoObj, consts.folder.DOCU);
					tmp_ulObj.css("display", "none")
				} else if (setting.view.showLine && childLength > 0) {
					var newLast = parentNode[childKey][childLength - 1];
					tmp_ulObj = $$(newLast, consts.id.UL, setting);
					tmp_switchObj = $$(newLast, consts.id.SWITCH, setting);
					tmp_icoObj = $$(newLast, consts.id.ICON, setting);
					if (parentNode == root) {
						if (parentNode[childKey].length == 1) {
							view.replaceSwitchClass(newLast, tmp_switchObj, consts.line.ROOT)
						} else {
							var tmp_first_switchObj = $$(parentNode[childKey][0], consts.id.SWITCH, setting);
							view.replaceSwitchClass(parentNode[childKey][0], tmp_first_switchObj, consts.line.ROOTS);
							view.replaceSwitchClass(newLast, tmp_switchObj, consts.line.BOTTOM)
						}
					} else {
						view.replaceSwitchClass(newLast, tmp_switchObj, consts.line.BOTTOM)
					}
					tmp_ulObj.removeClass(consts.line.LINE)
				}
			},
			replaceIcoClass: function(node, obj, newName) {
				if (!obj || node.isAjaxing) return;
				var tmpName = obj.attr("class");
				if (tmpName == undefined) return;
				var tmpList = tmpName.split("_");
				switch (newName) {
				case consts.folder.OPEN:
				case consts.folder.CLOSE:
				case consts.folder.DOCU:
					tmpList[tmpList.length - 1] = newName;
					break
				}
				obj.attr("class", tmpList.join("_"))
			},
			replaceSwitchClass: function(node, obj, newName) {
				if (!obj) return;
				var tmpName = obj.attr("class");
				if (tmpName == undefined) return;
				var tmpList = tmpName.split("_");
				switch (newName) {
				case consts.line.ROOT:
				case consts.line.ROOTS:
				case consts.line.CENTER:
				case consts.line.BOTTOM:
				case consts.line.NOLINE:
					tmpList[0] = view.makeNodeLineClassEx(node) + newName;
					break;
				case consts.folder.OPEN:
				case consts.folder.CLOSE:
				case consts.folder.DOCU:
					tmpList[1] = newName;
					break
				}
				obj.attr("class", tmpList.join("_"));
				if (newName !== consts.folder.DOCU) {
					obj.removeAttr("disabled")
				} else {
					obj.attr("disabled", "disabled")
				}
			},
			selectNode: function(setting, node, addFlag) {
				if (!addFlag) {
					view.cancelPreSelectedNode(setting)
				}
				$$(node, consts.id.A, setting).addClass(consts.node.CURSELECTED);
				data.addSelectedNode(setting, node)
			},
			setNodeFontCss: function(setting, treeNode) {
				var aObj = $$(treeNode, consts.id.A, setting),
					fontCss = view.makeNodeFontCss(setting, treeNode);
				if (fontCss) {
					aObj.css(fontCss)
				}
			},
			setNodeLineIcos: function(setting, node) {
				if (!node) return;
				var switchObj = $$(node, consts.id.SWITCH, setting),
					ulObj = $$(node, consts.id.UL, setting),
					icoObj = $$(node, consts.id.ICON, setting),
					ulLine = view.makeUlLineClass(setting, node);
				if (ulLine.length == 0) {
					ulObj.removeClass(consts.line.LINE)
				} else {
					ulObj.addClass(ulLine)
				}
				switchObj.attr("class", view.makeNodeLineClass(setting, node));
				if (node.isParent) {
					switchObj.removeAttr("disabled")
				} else {
					switchObj.attr("disabled", "disabled")
				}
				icoObj.removeAttr("style");
				icoObj.attr("style", view.makeNodeIcoStyle(setting, node));
				icoObj.attr("class", view.makeNodeIcoClass(setting, node))
			},
			setNodeName: function(setting, node) {
				var title = data.getNodeTitle(setting, node),
					nObj = $$(node, consts.id.SPAN, setting);
				nObj.empty();
				if (setting.view.nameIsHTML) {
					nObj.html(data.getNodeName(setting, node))
				} else {
					nObj.text(data.getNodeName(setting, node))
				}
				if (tools.apply(setting.view.showTitle, [setting.treeId, node], setting.view.showTitle)) {
					var aObj = $$(node, consts.id.A, setting);
					aObj.attr("title", !title ? "" : title)
				}
			},
			setNodeTarget: function(setting, node) {
				var aObj = $$(node, consts.id.A, setting);
				aObj.attr("target", view.makeNodeTarget(node))
			},
			setNodeUrl: function(setting, node) {
				var aObj = $$(node, consts.id.A, setting),
					url = view.makeNodeUrl(setting, node);
				if (url == null || url.length == 0) {
					aObj.removeAttr("href")
				} else {
					aObj.attr("href", url)
				}
			},
			switchNode: function(setting, node) {
				if (node.open || !tools.canAsync(setting, node)) {
					view.expandCollapseNode(setting, node, !node.open)
				} else if (setting.async.enable) {
					if (!view.asyncNode(setting, node)) {
						view.expandCollapseNode(setting, node, !node.open);
						return
					}
				} else if (node) {
					view.expandCollapseNode(setting, node, !node.open)
				}
			}
		};
	$.fn.zTree = {
		consts: _consts,
		_z: {
			tools: tools,
			view: view,
			event: event,
			data: data
		},
		getZTreeObj: function(treeId) {
			var o = data.getZTreeTools(treeId);
			return o ? o : null
		},
		destroy: function(treeId) {
			if ( !! treeId && treeId.length > 0) {
				view.destroy(data.getSetting(treeId))
			} else {
				for (var s in settings) {
					view.destroy(settings[s])
				}
			}
		},
		init: function(obj, zSetting, zNodes) {
			var setting = tools.clone(_setting);
			$.extend(true, setting, zSetting);
			setting.treeId = obj.attr("id");
			setting.treeObj = obj;
			setting.treeObj.empty();
			settings[setting.treeId] = setting;
			if (typeof document.body.style.maxHeight === "undefined") {
				setting.view.expandSpeed = ""
			}
			data.initRoot(setting);
			var root = data.getRoot(setting),
				childKey = setting.data.key.children;
			zNodes = zNodes ? tools.clone(tools.isArray(zNodes) ? zNodes : [zNodes]) : [];
			if (setting.data.simpleData.enable) {
				root[childKey] = data.transformTozTreeFormat(setting, zNodes)
			} else {
				root[childKey] = zNodes
			}
			data.initCache(setting);
			event.unbindTree(setting);
			event.bindTree(setting);
			event.unbindEvent(setting);
			event.bindEvent(setting);
			var zTreeTools = {
				setting: setting,
				addNodes: function(parentNode, newNodes, isSilent, is_new) {
					if (!newNodes) return null;
					if (!parentNode) parentNode = null;
					if (parentNode && !parentNode.isParent && setting.data.keep.leaf) return null;
					var xNewNodes = tools.clone(tools.isArray(newNodes) ? newNodes : [newNodes]);

					function addCallback() {
						view.addNodes(setting, parentNode, xNewNodes, isSilent == true, is_new)
					}
					if (tools.canAsync(setting, parentNode)) {
						view.asyncNode(setting, parentNode, isSilent, addCallback)
					} else {
						addCallback()
					}
					return xNewNodes
				},
				cancelSelectedNode: function(node) {
					view.cancelPreSelectedNode(setting, node)
				},
				destroy: function() {
					view.destroy(setting)
				},
				expandAll: function(expandFlag) {
					expandFlag = !! expandFlag;
					view.expandCollapseSonNode(setting, null, expandFlag, true);
					return expandFlag
				},
				expandNode: function(node, expandFlag, sonSign, focus, callbackFlag) {
					if (!node || !node.isParent) return null;
					if (expandFlag !== true && expandFlag !== false) {
						expandFlag = !node.open
					}
					callbackFlag = !! callbackFlag;
					if (callbackFlag && expandFlag && tools.apply(setting.callback.beforeExpand, [setting.treeId, node], true) == false) {
						return null
					} else if (callbackFlag && !expandFlag && tools.apply(setting.callback.beforeCollapse, [setting.treeId, node], true) == false) {
						return null
					}
					if (expandFlag && node.parentTId) {
						view.expandCollapseParentNode(setting, node.getParentNode(), expandFlag, false)
					}
					if (expandFlag === node.open && !sonSign) {
						return null
					}
					data.getRoot(setting).expandTriggerFlag = callbackFlag;
					if (!tools.canAsync(setting, node) && sonSign) {
						view.expandCollapseSonNode(setting, node, expandFlag, true, function() {
							if (focus !== false) {
								try {
									$$(node, setting).focus().blur()
								} catch (e) {}
							}
						})
					} else {
						node.open = !expandFlag;
						view.switchNode(this.setting, node);
						if (focus !== false) {
							try {
								$$(node, setting).focus().blur()
							} catch (e) {}
						}
					}
					return expandFlag
				},
				getNodes: function() {
					return data.getNodes(setting)
				},
				getNodeByParam: function(key, value, parentNode) {
					if (!key) return null;
					return data.getNodeByParam(setting, parentNode ? parentNode[setting.data.key.children] : data.getNodes(setting), key, value)
				},
				getNodeByTId: function(tId) {
					return data.getNodeCache(setting, tId)
				},
				getNodesByParam: function(key, value, parentNode) {
					if (!key) return null;
					return data.getNodesByParam(setting, parentNode ? parentNode[setting.data.key.children] : data.getNodes(setting), key, value)
				},
				getNodesByParamFuzzy: function(key, value, parentNode) {
					if (!key) return null;
					return data.getNodesByParamFuzzy(setting, parentNode ? parentNode[setting.data.key.children] : data.getNodes(setting), key, value)
				},
				getNodesByFilter: function(filter, isSingle, parentNode, invokeParam) {
					isSingle = !! isSingle;
					if (!filter || typeof filter != "function") return isSingle ? null : [];
					return data.getNodesByFilter(setting, parentNode ? parentNode[setting.data.key.children] : data.getNodes(setting), filter, isSingle, invokeParam)
				},
				getNodeIndex: function(node) {
					if (!node) return null;
					var childKey = setting.data.key.children,
						parentNode = node.parentTId ? node.getParentNode() : data.getRoot(setting);
					for (var i = 0, l = parentNode[childKey].length; i < l; i++) {
						if (parentNode[childKey][i] == node) return i
					}
					return -1
				},
				getSelectedNodes: function() {
					var r = [],
						list = data.getRoot(setting).curSelectedList;
					for (var i = 0, l = list.length; i < l; i++) {
						r.push(list[i])
					}
					return r
				},
				isSelectedNode: function(node) {
					return data.isSelectedNode(setting, node)
				},
				reAsyncChildNodes: function(parentNode, reloadType, isSilent) {
					if (!this.setting.async.enable) return;
					var isRoot = !parentNode;
					if (isRoot) {
						parentNode = data.getRoot(setting)
					}
					if (reloadType == "refresh") {
						var childKey = this.setting.data.key.children;
						for (var i = 0, l = parentNode[childKey] ? parentNode[childKey].length : 0; i < l; i++) {
							data.removeNodeCache(setting, parentNode[childKey][i])
						}
						data.removeSelectedNode(setting);
						parentNode[childKey] = [];
						if (isRoot) {
							this.setting.treeObj.empty()
						} else {
							var ulObj = $$(parentNode, consts.id.UL, setting);
							ulObj.empty()
						}
					}
					view.asyncNode(this.setting, isRoot ? null : parentNode, !! isSilent)
				},
				refresh: function() {
					this.setting.treeObj.empty();
					var root = data.getRoot(setting),
						nodes = root[setting.data.key.children];
					data.initRoot(setting);
					root[setting.data.key.children] = nodes;
					data.initCache(setting);
					view.createNodes(setting, 0, root[setting.data.key.children])
				},
				removeChildNodes: function(node) {
					if (!node) return null;
					var childKey = setting.data.key.children,
						nodes = node[childKey];
					view.removeChildNodes(setting, node);
					return nodes ? nodes : null
				},
				removeNode: function(node, callbackFlag) {
					if (!node) return;
					callbackFlag = !! callbackFlag;
					if (callbackFlag && tools.apply(setting.callback.beforeRemove, [setting.treeId, node], true) == false) return;
					view.removeNode(setting, node);
					if (callbackFlag) {
						this.setting.treeObj.trigger(consts.event.REMOVE, [setting.treeId, node])
					}
				},
				selectNode: function(node, addFlag) {
					if (!node) return;
					if (tools.uCanDo(setting)) {
						addFlag = setting.view.selectedMulti && addFlag;
						if (node.parentTId) {
							view.expandCollapseParentNode(setting, node.getParentNode(), true, false, function() {
								try {
									$$(node, setting).focus().blur()
								} catch (e) {}
							})
						} else {
							try {
								$$(node, setting).focus().blur()
							} catch (e) {}
						}
						view.selectNode(setting, node, addFlag)
					}
				},
				transformTozTreeNodes: function(simpleNodes) {
					return data.transformTozTreeFormat(setting, simpleNodes)
				},
				transformToArray: function(nodes) {
					return data.transformToArrayFormat(setting, nodes)
				},
				updateNode: function(node, checkTypeFlag) {
					if (!node) return;
					var nObj = $$(node, setting);
					if (nObj.get(0) && tools.uCanDo(setting)) {
						view.setNodeName(setting, node);
						view.setNodeTarget(setting, node);
						view.setNodeUrl(setting, node);
						view.setNodeLineIcos(setting, node);
						view.setNodeFontCss(setting, node)
					}
				}
			};
			root.treeTools = zTreeTools;
			data.setZTreeTools(setting, zTreeTools);
			if (root[childKey] && root[childKey].length > 0) {
				view.createNodes(setting, 0, root[childKey])
			} else if (setting.async.enable && setting.async.url && setting.async.url !== "") {
				view.asyncNode(setting)
			}
			return zTreeTools
		}
	};
	var zt = $.fn.zTree,
		$$ = tools.$,
		consts = zt.consts
})(jQuery);
(function($) {
	var _consts = {
		event: {
			CHECK: "ztree_check"
		},
		id: {
			CHECK: "_check"
		},
		checkbox: {
			STYLE: "checkbox",
			DEFAULT: "chk",
			DISABLED: "disable",
			FALSE: "false",
			TRUE: "true",
			FULL: "full",
			PART: "part",
			FOCUS: "focus"
		},
		radio: {
			STYLE: "radio",
			TYPE_ALL: "all",
			TYPE_LEVEL: "level"
		}
	},
		_setting = {
			check: {
				enable: false,
				autoCheckTrigger: false,
				chkStyle: _consts.checkbox.STYLE,
				nocheckInherit: false,
				chkDisabledInherit: false,
				radioType: _consts.radio.TYPE_LEVEL,
				chkboxType: {
					Y: "ps",
					N: "ps"
				}
			},
			data: {
				key: {
					checked: "checked"
				}
			},
			callback: {
				beforeCheck: null,
				onCheck: null
			}
		},
		_initRoot = function(setting) {
			var r = data.getRoot(setting);
			r.radioCheckedList = []
		},
		_initCache = function(treeId) {},
		_bindEvent = function(setting) {
			var o = setting.treeObj,
				c = consts.event;
			o.bind(c.CHECK, function(event, srcEvent, treeId, node) {
				event.srcEvent = srcEvent;
				tools.apply(setting.callback.onCheck, [event, treeId, node])
			})
		},
		_unbindEvent = function(setting) {
			var o = setting.treeObj,
				c = consts.event;
			o.unbind(c.CHECK)
		},
		_eventProxy = function(e) {
			var target = e.target,
				setting = data.getSetting(e.data.treeId),
				tId = "",
				node = null,
				nodeEventType = "",
				treeEventType = "",
				nodeEventCallback = null,
				treeEventCallback = null;
			if (tools.eqs(e.type, "mouseover")) {
				if (setting.check.enable && tools.eqs(target.tagName, "span") && target.getAttribute("treeNode" + consts.id.CHECK) !== null) {
					tId = tools.getNodeMainDom(target).id;
					nodeEventType = "mouseoverCheck"
				}
			} else if (tools.eqs(e.type, "mouseout")) {
				if (setting.check.enable && tools.eqs(target.tagName, "span") && target.getAttribute("treeNode" + consts.id.CHECK) !== null) {
					tId = tools.getNodeMainDom(target).id;
					nodeEventType = "mouseoutCheck"
				}
			} else if (tools.eqs(e.type, "click")) {
				if (setting.check.enable && tools.eqs(target.tagName, "span") && target.getAttribute("treeNode" + consts.id.CHECK) !== null) {
					tId = tools.getNodeMainDom(target).id;
					nodeEventType = "checkNode"
				}
			}
			if (tId.length > 0) {
				node = data.getNodeCache(setting, tId);
				switch (nodeEventType) {
				case "checkNode":
					nodeEventCallback = _handler.onCheckNode;
					break;
				case "mouseoverCheck":
					nodeEventCallback = _handler.onMouseoverCheck;
					break;
				case "mouseoutCheck":
					nodeEventCallback = _handler.onMouseoutCheck;
					break
				}
			}
			var proxyResult = {
				stop: nodeEventType === "checkNode",
				node: node,
				nodeEventType: nodeEventType,
				nodeEventCallback: nodeEventCallback,
				treeEventType: treeEventType,
				treeEventCallback: treeEventCallback
			};
			return proxyResult
		},
		_initNode = function(setting, level, n, parentNode, isFirstNode, isLastNode, openFlag) {
			if (!n) return;
			var checkedKey = setting.data.key.checked;
			if (typeof n[checkedKey] == "string") n[checkedKey] = tools.eqs(n[checkedKey], "true");
			n[checkedKey] = !! n[checkedKey];
			n.checkedOld = n[checkedKey];
			if (typeof n.nocheck == "string") n.nocheck = tools.eqs(n.nocheck, "true");
			n.nocheck = !! n.nocheck || setting.check.nocheckInherit && parentNode && !! parentNode.nocheck;
			if (typeof n.chkDisabled == "string") n.chkDisabled = tools.eqs(n.chkDisabled, "true");
			n.chkDisabled = !! n.chkDisabled || setting.check.chkDisabledInherit && parentNode && !! parentNode.chkDisabled;
			if (typeof n.halfCheck == "string") n.halfCheck = tools.eqs(n.halfCheck, "true");
			n.halfCheck = !! n.halfCheck;
			n.check_Child_State = -1;
			n.check_Focus = false;
			n.getCheckStatus = function() {
				return data.getCheckStatus(setting, n)
			};
			if (setting.check.chkStyle == consts.radio.STYLE && setting.check.radioType == consts.radio.TYPE_ALL && n[checkedKey]) {
				var r = data.getRoot(setting);
				r.radioCheckedList.push(n)
			}
		},
		_beforeA = function(setting, node, html) {
			var checkedKey = setting.data.key.checked;
			if (setting.check.enable) {
				data.makeChkFlag(setting, node);
				html.push("<span ID='", node.tId, consts.id.CHECK, "' class='", view.makeChkClass(setting, node), "' treeNode", consts.id.CHECK, node.nocheck === true ? " style='display:none;'" : "", "></span>")
			}
		},
		_zTreeTools = function(setting, zTreeTools) {
			zTreeTools.checkNode = function(node, checked, checkTypeFlag, callbackFlag) {
				var checkedKey = this.setting.data.key.checked;
				if (node.chkDisabled === true) return;
				if (checked !== true && checked !== false) {
					checked = !node[checkedKey]
				}
				callbackFlag = !! callbackFlag;
				if (node[checkedKey] === checked && !checkTypeFlag) {
					return
				} else if (callbackFlag && tools.apply(this.setting.callback.beforeCheck, [this.setting.treeId, node], true) == false) {
					return
				}
				if (tools.uCanDo(this.setting) && this.setting.check.enable && node.nocheck !== true) {
					node[checkedKey] = checked;
					var checkObj = $$(node, consts.id.CHECK, this.setting);
					if (checkTypeFlag || this.setting.check.chkStyle === consts.radio.STYLE) view.checkNodeRelation(this.setting, node);
					view.setChkClass(this.setting, checkObj, node);
					view.repairParentChkClassWithSelf(this.setting, node);
					if (callbackFlag) {
						this.setting.treeObj.trigger(consts.event.CHECK, [null, this.setting.treeId, node])
					}
				}
			};
			zTreeTools.checkAllNodes = function(checked) {
				view.repairAllChk(this.setting, !! checked)
			};
			zTreeTools.getCheckedNodes = function(checked) {
				var childKey = this.setting.data.key.children;
				checked = checked !== false;
				return data.getTreeCheckedNodes(this.setting, data.getRoot(this.setting)[childKey], checked)
			};
			zTreeTools.getChangeCheckedNodes = function() {
				var childKey = this.setting.data.key.children;
				return data.getTreeChangeCheckedNodes(this.setting, data.getRoot(this.setting)[childKey])
			};
			zTreeTools.setChkDisabled = function(node, disabled, inheritParent, inheritChildren) {
				disabled = !! disabled;
				inheritParent = !! inheritParent;
				inheritChildren = !! inheritChildren;
				view.repairSonChkDisabled(this.setting, node, disabled, inheritChildren);
				view.repairParentChkDisabled(this.setting, node.getParentNode(), disabled, inheritParent)
			};
			var _updateNode = zTreeTools.updateNode;
			zTreeTools.updateNode = function(node, checkTypeFlag) {
				if (_updateNode) _updateNode.apply(zTreeTools, arguments);
				if (!node || !this.setting.check.enable) return;
				var nObj = $$(node, this.setting);
				if (nObj.get(0) && tools.uCanDo(this.setting)) {
					var checkObj = $$(node, consts.id.CHECK, this.setting);
					if (checkTypeFlag == true || this.setting.check.chkStyle === consts.radio.STYLE) view.checkNodeRelation(this.setting, node);
					view.setChkClass(this.setting, checkObj, node);
					view.repairParentChkClassWithSelf(this.setting, node)
				}
			}
		},
		_data = {
			getRadioCheckedList: function(setting) {
				var checkedList = data.getRoot(setting).radioCheckedList;
				for (var i = 0, j = checkedList.length; i < j; i++) {
					if (!data.getNodeCache(setting, checkedList[i].tId)) {
						checkedList.splice(i, 1);
						i--;
						j--
					}
				}
				return checkedList
			},
			getCheckStatus: function(setting, node) {
				if (!setting.check.enable || node.nocheck || node.chkDisabled) return null;
				var checkedKey = setting.data.key.checked,
					r = {
						checked: node[checkedKey],
						half: node.halfCheck ? node.halfCheck : setting.check.chkStyle == consts.radio.STYLE ? node.check_Child_State === 2 : node[checkedKey] ? node.check_Child_State > -1 && node.check_Child_State < 2 : node.check_Child_State > 0
					};
				return r
			},
			getTreeCheckedNodes: function(setting, nodes, checked, results) {
				if (!nodes) return [];
				var childKey = setting.data.key.children,
					checkedKey = setting.data.key.checked,
					onlyOne = checked && setting.check.chkStyle == consts.radio.STYLE && setting.check.radioType == consts.radio.TYPE_ALL;
				results = !results ? [] : results;
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (nodes[i].nocheck !== true && nodes[i].chkDisabled !== true && nodes[i][checkedKey] == checked) {
						results.push(nodes[i]);
						if (onlyOne) {
							break
						}
					}
					data.getTreeCheckedNodes(setting, nodes[i][childKey], checked, results);
					if (onlyOne && results.length > 0) {
						break
					}
				}
				return results
			},
			getTreeChangeCheckedNodes: function(setting, nodes, results) {
				if (!nodes) return [];
				var childKey = setting.data.key.children,
					checkedKey = setting.data.key.checked;
				results = !results ? [] : results;
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (nodes[i].nocheck !== true && nodes[i].chkDisabled !== true && nodes[i][checkedKey] != nodes[i].checkedOld) {
						results.push(nodes[i])
					}
					data.getTreeChangeCheckedNodes(setting, nodes[i][childKey], results)
				}
				return results
			},
			makeChkFlag: function(setting, node) {
				if (!node) return;
				var childKey = setting.data.key.children,
					checkedKey = setting.data.key.checked,
					chkFlag = -1;
				if (node[childKey]) {
					for (var i = 0, l = node[childKey].length; i < l; i++) {
						var cNode = node[childKey][i];
						var tmp = -1;
						if (setting.check.chkStyle == consts.radio.STYLE) {
							if (cNode.nocheck === true || cNode.chkDisabled === true) {
								tmp = cNode.check_Child_State
							} else if (cNode.halfCheck === true) {
								tmp = 2
							} else if (cNode[checkedKey]) {
								tmp = 2
							} else {
								tmp = cNode.check_Child_State > 0 ? 2 : 0
							}
							if (tmp == 2) {
								chkFlag = 2;
								break
							} else if (tmp == 0) {
								chkFlag = 0
							}
						} else if (setting.check.chkStyle == consts.checkbox.STYLE) {
							if (cNode.nocheck === true || cNode.chkDisabled === true) {
								tmp = cNode.check_Child_State
							} else if (cNode.halfCheck === true) {
								tmp = 1
							} else if (cNode[checkedKey]) {
								tmp = cNode.check_Child_State === -1 || cNode.check_Child_State === 2 ? 2 : 1
							} else {
								tmp = cNode.check_Child_State > 0 ? 1 : 0
							}
							if (tmp === 1) {
								chkFlag = 1;
								break
							} else if (tmp === 2 && chkFlag > -1 && i > 0 && tmp !== chkFlag) {
								chkFlag = 1;
								break
							} else if (chkFlag === 2 && tmp > -1 && tmp < 2) {
								chkFlag = 1;
								break
							} else if (tmp > -1) {
								chkFlag = tmp
							}
						}
					}
				}
				node.check_Child_State = chkFlag
			}
		},
		_event = {},
		_handler = {
			onCheckNode: function(event, node) {
				if (node.chkDisabled === true) return false;
				var setting = data.getSetting(event.data.treeId),
					checkedKey = setting.data.key.checked;
				if (tools.apply(setting.callback.beforeCheck, [setting.treeId, node], true) == false) return true;
				node[checkedKey] = !node[checkedKey];
				view.checkNodeRelation(setting, node);
				var checkObj = $$(node, consts.id.CHECK, setting);
				view.setChkClass(setting, checkObj, node);
				view.repairParentChkClassWithSelf(setting, node);
				setting.treeObj.trigger(consts.event.CHECK, [event, setting.treeId, node]);
				return true
			},
			onMouseoverCheck: function(event, node) {
				if (node.chkDisabled === true) return false;
				var setting = data.getSetting(event.data.treeId),
					checkObj = $$(node, consts.id.CHECK, setting);
				node.check_Focus = true;
				view.setChkClass(setting, checkObj, node);
				return true
			},
			onMouseoutCheck: function(event, node) {
				if (node.chkDisabled === true) return false;
				var setting = data.getSetting(event.data.treeId),
					checkObj = $$(node, consts.id.CHECK, setting);
				node.check_Focus = false;
				view.setChkClass(setting, checkObj, node);
				return true
			}
		},
		_tools = {},
		_view = {
			checkNodeRelation: function(setting, node) {
				var pNode, i, l, childKey = setting.data.key.children,
					checkedKey = setting.data.key.checked,
					r = consts.radio;
				if (setting.check.chkStyle == r.STYLE) {
					var checkedList = data.getRadioCheckedList(setting);
					if (node[checkedKey]) {
						if (setting.check.radioType == r.TYPE_ALL) {
							for (i = checkedList.length - 1; i >= 0; i--) {
								pNode = checkedList[i];
								if (pNode[checkedKey] && pNode != node) {
									pNode[checkedKey] = false;
									checkedList.splice(i, 1);
									view.setChkClass(setting, $$(pNode, consts.id.CHECK, setting), pNode);
									if (pNode.parentTId != node.parentTId) {
										view.repairParentChkClassWithSelf(setting, pNode)
									}
								}
							}
							checkedList.push(node)
						} else {
							var parentNode = node.parentTId ? node.getParentNode() : data.getRoot(setting);
							for (i = 0, l = parentNode[childKey].length; i < l; i++) {
								pNode = parentNode[childKey][i];
								if (pNode[checkedKey] && pNode != node) {
									pNode[checkedKey] = false;
									view.setChkClass(setting, $$(pNode, consts.id.CHECK, setting), pNode)
								}
							}
						}
					} else if (setting.check.radioType == r.TYPE_ALL) {
						for (i = 0, l = checkedList.length; i < l; i++) {
							if (node == checkedList[i]) {
								checkedList.splice(i, 1);
								break
							}
						}
					}
				} else {
					if (node[checkedKey] && (!node[childKey] || node[childKey].length == 0 || setting.check.chkboxType.Y.indexOf("s") > -1)) {
						view.setSonNodeCheckBox(setting, node, true)
					}
					if (!node[checkedKey] && (!node[childKey] || node[childKey].length == 0 || setting.check.chkboxType.N.indexOf("s") > -1)) {
						view.setSonNodeCheckBox(setting, node, false)
					}
					if (node[checkedKey] && setting.check.chkboxType.Y.indexOf("p") > -1) {
						view.setParentNodeCheckBox(setting, node, true)
					}
					if (!node[checkedKey] && setting.check.chkboxType.N.indexOf("p") > -1) {
						view.setParentNodeCheckBox(setting, node, false)
					}
				}
			},
			makeChkClass: function(setting, node) {
				var checkedKey = setting.data.key.checked,
					c = consts.checkbox,
					r = consts.radio,
					fullStyle = "";
				if (node.chkDisabled === true) {
					fullStyle = c.DISABLED
				} else if (node.halfCheck) {
					fullStyle = c.PART
				} else if (setting.check.chkStyle == r.STYLE) {
					fullStyle = node.check_Child_State < 1 ? c.FULL : c.PART
				} else {
					fullStyle = node[checkedKey] ? node.check_Child_State === 2 || node.check_Child_State === -1 ? c.FULL : c.PART : node.check_Child_State < 1 ? c.FULL : c.PART
				}
				var chkName = setting.check.chkStyle + "_" + (node[checkedKey] ? c.TRUE : c.FALSE) + "_" + fullStyle;
				chkName = node.check_Focus && node.chkDisabled !== true ? chkName + "_" + c.FOCUS : chkName;
				return consts.className.BUTTON + " " + c.DEFAULT + " " + chkName
			},
			repairAllChk: function(setting, checked) {
				if (setting.check.enable && setting.check.chkStyle === consts.checkbox.STYLE) {
					var checkedKey = setting.data.key.checked,
						childKey = setting.data.key.children,
						root = data.getRoot(setting);
					for (var i = 0, l = root[childKey].length; i < l; i++) {
						var node = root[childKey][i];
						if (node.nocheck !== true && node.chkDisabled !== true) {
							node[checkedKey] = checked
						}
						view.setSonNodeCheckBox(setting, node, checked)
					}
				}
			},
			repairChkClass: function(setting, node) {
				if (!node) return;
				data.makeChkFlag(setting, node);
				if (node.nocheck !== true) {
					var checkObj = $$(node, consts.id.CHECK, setting);
					view.setChkClass(setting, checkObj, node)
				}
			},
			repairParentChkClass: function(setting, node) {
				if (!node || !node.parentTId) return;
				var pNode = node.getParentNode();
				view.repairChkClass(setting, pNode);
				view.repairParentChkClass(setting, pNode)
			},
			repairParentChkClassWithSelf: function(setting, node) {
				if (!node) return;
				var childKey = setting.data.key.children;
				if (node[childKey] && node[childKey].length > 0) {
					view.repairParentChkClass(setting, node[childKey][0])
				} else {
					view.repairParentChkClass(setting, node)
				}
			},
			repairSonChkDisabled: function(setting, node, chkDisabled, inherit) {
				if (!node) return;
				var childKey = setting.data.key.children;
				if (node.chkDisabled != chkDisabled) {
					node.chkDisabled = chkDisabled
				}
				view.repairChkClass(setting, node);
				if (node[childKey] && inherit) {
					for (var i = 0, l = node[childKey].length; i < l; i++) {
						var sNode = node[childKey][i];
						view.repairSonChkDisabled(setting, sNode, chkDisabled, inherit)
					}
				}
			},
			repairParentChkDisabled: function(setting, node, chkDisabled, inherit) {
				if (!node) return;
				if (node.chkDisabled != chkDisabled && inherit) {
					node.chkDisabled = chkDisabled
				}
				view.repairChkClass(setting, node);
				view.repairParentChkDisabled(setting, node.getParentNode(), chkDisabled, inherit)
			},
			setChkClass: function(setting, obj, node) {
				if (!obj) return;
				if (node.nocheck === true) {
					obj.hide()
				} else {
					obj.show()
				}
				obj.attr("class", view.makeChkClass(setting, node))
			},
			setParentNodeCheckBox: function(setting, node, value, srcNode) {
				var childKey = setting.data.key.children,
					checkedKey = setting.data.key.checked,
					checkObj = $$(node, consts.id.CHECK, setting);
				if (!srcNode) srcNode = node;
				data.makeChkFlag(setting, node);
				if (node.nocheck !== true && node.chkDisabled !== true) {
					node[checkedKey] = value;
					view.setChkClass(setting, checkObj, node);
					if (setting.check.autoCheckTrigger && node != srcNode) {
						setting.treeObj.trigger(consts.event.CHECK, [null, setting.treeId, node])
					}
				}
				if (node.parentTId) {
					var pSign = true;
					if (!value) {
						var pNodes = node.getParentNode()[childKey];
						for (var i = 0, l = pNodes.length; i < l; i++) {
							if (pNodes[i].nocheck !== true && pNodes[i].chkDisabled !== true && pNodes[i][checkedKey] || (pNodes[i].nocheck === true || pNodes[i].chkDisabled === true) && pNodes[i].check_Child_State > 0) {
								pSign = false;
								break
							}
						}
					}
					if (pSign) {
						view.setParentNodeCheckBox(setting, node.getParentNode(), value, srcNode)
					}
				}
			},
			setSonNodeCheckBox: function(setting, node, value, srcNode) {
				if (!node) return;
				var childKey = setting.data.key.children,
					checkedKey = setting.data.key.checked,
					checkObj = $$(node, consts.id.CHECK, setting);
				if (!srcNode) srcNode = node;
				var hasDisable = false;
				if (node[childKey]) {
					for (var i = 0, l = node[childKey].length; i < l && node.chkDisabled !== true; i++) {
						var sNode = node[childKey][i];
						view.setSonNodeCheckBox(setting, sNode, value, srcNode);
						if (sNode.chkDisabled === true) hasDisable = true
					}
				}
				if (node != data.getRoot(setting) && node.chkDisabled !== true) {
					if (hasDisable && node.nocheck !== true) {
						data.makeChkFlag(setting, node)
					}
					if (node.nocheck !== true && node.chkDisabled !== true) {
						node[checkedKey] = value;
						if (!hasDisable) node.check_Child_State = node[childKey] && node[childKey].length > 0 ? value ? 2 : 0 : -1
					} else {
						node.check_Child_State = -1
					}
					view.setChkClass(setting, checkObj, node);
					if (setting.check.autoCheckTrigger && node != srcNode && node.nocheck !== true && node.chkDisabled !== true) {
						setting.treeObj.trigger(consts.event.CHECK, [null, setting.treeId, node])
					}
				}
			}
		},
		_z = {
			tools: _tools,
			view: _view,
			event: _event,
			data: _data
		};
	$.extend(true, $.fn.zTree.consts, _consts);
	$.extend(true, $.fn.zTree._z, _z);
	var zt = $.fn.zTree,
		tools = zt._z.tools,
		consts = zt.consts,
		view = zt._z.view,
		data = zt._z.data,
		event = zt._z.event,
		$$ = tools.$;
	data.exSetting(_setting);
	data.addInitBind(_bindEvent);
	data.addInitUnBind(_unbindEvent);
	data.addInitCache(_initCache);
	data.addInitNode(_initNode);
	data.addInitProxy(_eventProxy, true);
	data.addInitRoot(_initRoot);
	data.addBeforeA(_beforeA);
	data.addZTreeTools(_zTreeTools);
	var _createNodes = view.createNodes;
	view.createNodes = function(setting, level, nodes, parentNode) {
		if (_createNodes) _createNodes.apply(view, arguments);
		if (!nodes) return;
		view.repairParentChkClassWithSelf(setting, parentNode)
	};
	var _removeNode = view.removeNode;
	view.removeNode = function(setting, node) {
		var parentNode = node.getParentNode();
		if (_removeNode) _removeNode.apply(view, arguments);
		if (!node || !parentNode) return;
		view.repairChkClass(setting, parentNode);
		view.repairParentChkClass(setting, parentNode)
	};
	var _appendNodes = view.appendNodes;
	view.appendNodes = function(setting, level, nodes, parentNode, initFlag, openFlag) {
		var html = "";
		if (_appendNodes) {
			html = _appendNodes.apply(view, arguments)
		}
		if (parentNode) {
			data.makeChkFlag(setting, parentNode)
		}
		return html
	}
})(jQuery);
(function($) {
	var _consts = {
		event: {
			DRAG: "ztree_drag",
			DROP: "ztree_drop",
			RENAME: "ztree_rename",
			DRAGMOVE: "ztree_dragmove"
		},
		id: {
			EDIT: "_edit",
			INPUT: "_input",
			REMOVE: "_remove"
		},
		move: {
			TYPE_INNER: "inner",
			TYPE_PREV: "prev",
			TYPE_NEXT: "next"
		},
		node: {
			CURSELECTED_EDIT: "curSelectedNode_Edit",
			TMPTARGET_TREE: "tmpTargetzTree",
			TMPTARGET_NODE: "tmpTargetNode"
		}
	},
		_setting = {
			edit: {
				enable: false,
				editNameSelectAll: false,
				showRemoveBtn: true,
				showRenameBtn: true,
				removeTitle: "remove",
				renameTitle: "rename",
				drag: {
					autoExpandTrigger: false,
					isCopy: true,
					isMove: true,
					prev: true,
					next: true,
					inner: true,
					minMoveSize: 5,
					borderMax: 10,
					borderMin: -5,
					maxShowNodeNum: 5,
					autoOpenTime: 500
				}
			},
			view: {
				addHoverDom: null,
				removeHoverDom: null
			},
			callback: {
				beforeDrag: null,
				beforeDragOpen: null,
				beforeDrop: null,
				beforeEditName: null,
				beforeRename: null,
				onDrag: null,
				onDragMove: null,
				onDrop: null,
				onRename: null
			}
		},
		_initRoot = function(setting) {
			var r = data.getRoot(setting),
				rs = data.getRoots();
			r.curEditNode = null;
			r.curEditInput = null;
			r.curHoverNode = null;
			r.dragFlag = 0;
			r.dragNodeShowBefore = [];
			r.dragMaskList = new Array;
			rs.showHoverDom = true
		},
		_initCache = function(treeId) {},
		_bindEvent = function(setting) {
			var o = setting.treeObj;
			var c = consts.event;
			o.bind(c.RENAME, function(event, treeId, treeNode, isCancel) {
				tools.apply(setting.callback.onRename, [event, treeId, treeNode, isCancel])
			});
			o.bind(c.DRAG, function(event, srcEvent, treeId, treeNodes) {
				tools.apply(setting.callback.onDrag, [srcEvent, treeId, treeNodes])
			});
			o.bind(c.DRAGMOVE, function(event, srcEvent, treeId, treeNodes) {
				tools.apply(setting.callback.onDragMove, [srcEvent, treeId, treeNodes])
			});
			o.bind(c.DROP, function(event, srcEvent, treeId, treeNodes, targetNode, moveType, isCopy) {
				tools.apply(setting.callback.onDrop, [srcEvent, treeId, treeNodes, targetNode, moveType, isCopy])
			})
		},
		_unbindEvent = function(setting) {
			var o = setting.treeObj;
			var c = consts.event;
			o.unbind(c.RENAME);
			o.unbind(c.DRAG);
			o.unbind(c.DRAGMOVE);
			o.unbind(c.DROP)
		},
		_eventProxy = function(e) {
			var target = e.target,
				setting = data.getSetting(e.data.treeId),
				relatedTarget = e.relatedTarget,
				tId = "",
				node = null,
				nodeEventType = "",
				treeEventType = "",
				nodeEventCallback = null,
				treeEventCallback = null,
				tmp = null;
			if (tools.eqs(e.type, "mouseover")) {
				tmp = tools.getMDom(setting, target, [{
					tagName: "a",
					attrName: "treeNode" + consts.id.A
				}]);
				if (tmp) {
					tId = tools.getNodeMainDom(tmp).id;
					nodeEventType = "hoverOverNode"
				}
			} else if (tools.eqs(e.type, "mouseout")) {
				tmp = tools.getMDom(setting, relatedTarget, [{
					tagName: "a",
					attrName: "treeNode" + consts.id.A
				}]);
				if (!tmp) {
					tId = "remove";
					nodeEventType = "hoverOutNode"
				}
			} else if (tools.eqs(e.type, "mousedown")) {
				tmp = tools.getMDom(setting, target, [{
					tagName: "a",
					attrName: "treeNode" + consts.id.A
				}]);
				if (tmp) {
					tId = tools.getNodeMainDom(tmp).id;
					nodeEventType = "mousedownNode"
				}
			}
			if (tId.length > 0) {
				node = data.getNodeCache(setting, tId);
				switch (nodeEventType) {
				case "mousedownNode":
					nodeEventCallback = _handler.onMousedownNode;
					break;
				case "hoverOverNode":
					nodeEventCallback = _handler.onHoverOverNode;
					break;
				case "hoverOutNode":
					nodeEventCallback = _handler.onHoverOutNode;
					break
				}
			}
			var proxyResult = {
				stop: false,
				node: node,
				nodeEventType: nodeEventType,
				nodeEventCallback: nodeEventCallback,
				treeEventType: treeEventType,
				treeEventCallback: treeEventCallback
			};
			return proxyResult
		},
		_initNode = function(setting, level, n, parentNode, isFirstNode, isLastNode, openFlag) {
			if (!n) return;
			n.isHover = false;
			n.editNameFlag = false
		},
		_zTreeTools = function(setting, zTreeTools) {
			zTreeTools.cancelEditName = function(newName) {
				var root = data.getRoot(this.setting);
				if (!root.curEditNode) return;
				view.cancelCurEditNode(this.setting, newName ? newName : null, true)
			};
			zTreeTools.copyNode = function(targetNode, node, moveType, isSilent) {
				if (!node) return null;
				if (targetNode && !targetNode.isParent && this.setting.data.keep.leaf && moveType === consts.move.TYPE_INNER) return null;
				var _this = this,
					newNode = tools.clone(node);
				if (!targetNode) {
					targetNode = null;
					moveType = consts.move.TYPE_INNER
				}
				if (moveType == consts.move.TYPE_INNER) {
					function copyCallback() {
						view.addNodes(_this.setting, targetNode, [newNode], isSilent)
					}
					if (tools.canAsync(this.setting, targetNode)) {
						view.asyncNode(this.setting, targetNode, isSilent, copyCallback)
					} else {
						copyCallback()
					}
				} else {
					view.addNodes(this.setting, targetNode.parentNode, [newNode], isSilent);
					view.moveNode(this.setting, targetNode, newNode, moveType, false, isSilent)
				}
				return newNode
			};
			zTreeTools.editName = function(node) {
				if (!node || !node.tId || node !== data.getNodeCache(this.setting, node.tId)) return;
				if (node.parentTId) view.expandCollapseParentNode(this.setting, node.getParentNode(), true);
				view.editNode(this.setting, node)
			};
			zTreeTools.moveNode = function(targetNode, node, moveType, isSilent) {
				if (!node) return node;
				if (targetNode && !targetNode.isParent && this.setting.data.keep.leaf && moveType === consts.move.TYPE_INNER) {
					return null
				} else if (targetNode && (node.parentTId == targetNode.tId && moveType == consts.move.TYPE_INNER || $$(node, this.setting).find("#" + targetNode.tId).length > 0)) {
					return null
				} else if (!targetNode) {
					targetNode = null
				}
				var _this = this;

				function moveCallback() {
					view.moveNode(_this.setting, targetNode, node, moveType, false, isSilent)
				}
				if (tools.canAsync(this.setting, targetNode) && moveType === consts.move.TYPE_INNER) {
					view.asyncNode(this.setting, targetNode, isSilent, moveCallback)
				} else {
					moveCallback()
				}
				return node
			};
			zTreeTools.setEditable = function(editable) {
				this.setting.edit.enable = editable;
				return this.refresh()
			}
		},
		_data = {
			setSonNodeLevel: function(setting, parentNode, node) {
				if (!node) return;
				var childKey = setting.data.key.children;
				node.level = parentNode ? parentNode.level + 1 : 0;
				if (!node[childKey]) return;
				for (var i = 0, l = node[childKey].length; i < l; i++) {
					if (node[childKey][i]) data.setSonNodeLevel(setting, node, node[childKey][i])
				}
			}
		},
		_event = {},
		_handler = {
			onHoverOverNode: function(event, node) {
				var setting = data.getSetting(event.data.treeId),
					root = data.getRoot(setting);
				if (root.curHoverNode != node) {
					_handler.onHoverOutNode(event)
				}
				root.curHoverNode = node;
				view.addHoverDom(setting, node)
			},
			onHoverOutNode: function(event, node) {
				var setting = data.getSetting(event.data.treeId),
					root = data.getRoot(setting);
				if (root.curHoverNode && !data.isSelectedNode(setting, root.curHoverNode)) {
					view.removeTreeDom(setting, root.curHoverNode);
					root.curHoverNode = null
				}
			},
			onMousedownNode: function(eventMouseDown, _node) {
				var i, l, setting = data.getSetting(eventMouseDown.data.treeId),
					root = data.getRoot(setting),
					roots = data.getRoots();
				if (eventMouseDown.button == 2 || !setting.edit.enable || !setting.edit.drag.isCopy && !setting.edit.drag.isMove) return true;
				var target = eventMouseDown.target,
					_nodes = data.getRoot(setting).curSelectedList,
					nodes = [];
				if (!data.isSelectedNode(setting, _node)) {
					nodes = [_node]
				} else {
					for (i = 0, l = _nodes.length; i < l; i++) {
						if (_nodes[i].editNameFlag && tools.eqs(target.tagName, "input") && target.getAttribute("treeNode" + consts.id.INPUT) !== null) {
							return true
						}
						nodes.push(_nodes[i]);
						if (nodes[0].parentTId !== _nodes[i].parentTId) {
							nodes = [_node];
							break
						}
					}
				}
				view.editNodeBlur = true;
				view.cancelCurEditNode(setting);
				var doc = $(setting.treeObj.get(0).ownerDocument),
					body = $(setting.treeObj.get(0).ownerDocument.body),
					curNode, tmpArrow, tmpTarget, isOtherTree = false,
					targetSetting = setting,
					sourceSetting = setting,
					preNode, nextNode, preTmpTargetNodeId = null,
					preTmpMoveType = null,
					tmpTargetNodeId = null,
					moveType = consts.move.TYPE_INNER,
					mouseDownX = eventMouseDown.clientX,
					mouseDownY = eventMouseDown.clientY,
					startTime = (new Date).getTime();
				if (tools.uCanDo(setting)) {
					doc.bind("mousemove", _docMouseMove)
				}
				function _docMouseMove(event) {
					if (root.dragFlag == 0 && Math.abs(mouseDownX - event.clientX) < setting.edit.drag.minMoveSize && Math.abs(mouseDownY - event.clientY) < setting.edit.drag.minMoveSize) {
						return true
					}
					var i, l, tmpNode, tmpDom, tmpNodes, childKey = setting.data.key.children;
					body.css("cursor", "pointer");
					if (root.dragFlag == 0) {
						if (tools.apply(setting.callback.beforeDrag, [setting.treeId, nodes], true) == false) {
							_docMouseUp(event);
							return true
						}
						for (i = 0, l = nodes.length; i < l; i++) {
							if (i == 0) {
								root.dragNodeShowBefore = []
							}
							tmpNode = nodes[i];
							if (tmpNode.isParent && tmpNode.open) {
								view.expandCollapseNode(setting, tmpNode, !tmpNode.open);
								root.dragNodeShowBefore[tmpNode.tId] = true
							} else {
								root.dragNodeShowBefore[tmpNode.tId] = false
							}
						}
						root.dragFlag = 1;
						roots.showHoverDom = false;
						tools.showIfameMask(setting, true);
						var isOrder = true,
							lastIndex = -1;
						if (nodes.length > 1) {
							var pNodes = nodes[0].parentTId ? nodes[0].getParentNode()[childKey] : data.getNodes(setting);
							tmpNodes = [];
							for (i = 0, l = pNodes.length; i < l; i++) {
								if (root.dragNodeShowBefore[pNodes[i].tId] !== undefined) {
									if (isOrder && lastIndex > -1 && lastIndex + 1 !== i) {
										isOrder = false
									}
									tmpNodes.push(pNodes[i]);
									lastIndex = i
								}
								if (nodes.length === tmpNodes.length) {
									nodes = tmpNodes;
									break
								}
							}
						}
						if (isOrder) {
							preNode = nodes[0].getPreNode();
							nextNode = nodes[nodes.length - 1].getNextNode()
						}
						curNode = $$("<ul class='zTreeDragUL'></ul>", setting);
						for (i = 0, l = nodes.length; i < l; i++) {
							tmpNode = nodes[i];
							tmpNode.editNameFlag = false;
							view.selectNode(setting, tmpNode, i > 0);
							view.removeTreeDom(setting, tmpNode);
							if (i > setting.edit.drag.maxShowNodeNum - 1) {
								continue
							}
							tmpDom = $$("<li id='" + tmpNode.tId + "_tmp'></li>", setting);
							tmpDom.append($$(tmpNode, consts.id.A, setting).clone());
							tmpDom.css("padding", "0");
							tmpDom.children("#" + tmpNode.tId + consts.id.A).removeClass(consts.node.CURSELECTED);
							curNode.append(tmpDom);
							if (i == setting.edit.drag.maxShowNodeNum - 1) {
								tmpDom = $$("<li id='" + tmpNode.tId + "_moretmp'><a>  ...  </a></li>", setting);
								curNode.append(tmpDom)
							}
						}
						curNode.attr("id", nodes[0].tId + consts.id.UL + "_tmp");
						curNode.addClass(setting.treeObj.attr("class"));
						curNode.appendTo(body);
						tmpArrow = $$("<span class='fa fa-arrow-right tmpzTreeMove_arrow'></span>", setting);
						tmpArrow.attr("id", "zTreeMove_arrow_tmp");
						tmpArrow.appendTo(body);
						setting.treeObj.trigger(consts.event.DRAG, [event, setting.treeId, nodes])
					}
					if (root.dragFlag == 1) {
						if (tmpTarget && tmpArrow.attr("id") == event.target.id && tmpTargetNodeId && event.clientX + doc.scrollLeft() + 2 > $("#" + tmpTargetNodeId + consts.id.A, tmpTarget).offset().left) {
							var xT = $("#" + tmpTargetNodeId + consts.id.A, tmpTarget);
							event.target = xT.length > 0 ? xT.get(0) : event.target
						} else if (tmpTarget) {
							tmpTarget.removeClass(consts.node.TMPTARGET_TREE);
							if (tmpTargetNodeId) $("#" + tmpTargetNodeId + consts.id.A, tmpTarget).removeClass(consts.node.TMPTARGET_NODE + "_" + consts.move.TYPE_PREV).removeClass(consts.node.TMPTARGET_NODE + "_" + _consts.move.TYPE_NEXT).removeClass(consts.node.TMPTARGET_NODE + "_" + _consts.move.TYPE_INNER)
						}
						tmpTarget = null;
						tmpTargetNodeId = null;
						isOtherTree = false;
						targetSetting = setting;
						var settings = data.getSettings();
						for (var s in settings) {
							if (settings[s].treeId && settings[s].edit.enable && settings[s].treeId != setting.treeId && (event.target.id == settings[s].treeId || $(event.target).parents("#" + settings[s].treeId).length > 0)) {
								isOtherTree = true;
								targetSetting = settings[s]
							}
						}
						var docScrollTop = doc.scrollTop(),
							docScrollLeft = doc.scrollLeft(),
							treeOffset = targetSetting.treeObj.offset(),
							scrollHeight = targetSetting.treeObj.get(0).scrollHeight,
							scrollWidth = targetSetting.treeObj.get(0).scrollWidth,
							dTop = event.clientY + docScrollTop - treeOffset.top,
							dBottom = targetSetting.treeObj.height() + treeOffset.top - event.clientY - docScrollTop,
							dLeft = event.clientX + docScrollLeft - treeOffset.left,
							dRight = targetSetting.treeObj.width() + treeOffset.left - event.clientX - docScrollLeft,
							isTop = dTop < setting.edit.drag.borderMax && dTop > setting.edit.drag.borderMin,
							isBottom = dBottom < setting.edit.drag.borderMax && dBottom > setting.edit.drag.borderMin,
							isLeft = dLeft < setting.edit.drag.borderMax && dLeft > setting.edit.drag.borderMin,
							isRight = dRight < setting.edit.drag.borderMax && dRight > setting.edit.drag.borderMin,
							isTreeInner = dTop > setting.edit.drag.borderMin && dBottom > setting.edit.drag.borderMin && dLeft > setting.edit.drag.borderMin && dRight > setting.edit.drag.borderMin,
							isTreeTop = isTop && targetSetting.treeObj.scrollTop() <= 0,
							isTreeBottom = isBottom && targetSetting.treeObj.scrollTop() + targetSetting.treeObj.height() + 10 >= scrollHeight,
							isTreeLeft = isLeft && targetSetting.treeObj.scrollLeft() <= 0,
							isTreeRight = isRight && targetSetting.treeObj.scrollLeft() + targetSetting.treeObj.width() + 10 >= scrollWidth;
						if (event.target && tools.isChildOrSelf(event.target, targetSetting.treeId)) {
							var targetObj = event.target;
							while (targetObj && targetObj.tagName && !tools.eqs(targetObj.tagName, "li") && targetObj.id != targetSetting.treeId) {
								targetObj = targetObj.parentNode
							}
							var canMove = true;
							for (i = 0, l = nodes.length; i < l; i++) {
								tmpNode = nodes[i];
								if (targetObj.id === tmpNode.tId) {
									canMove = false;
									break
								} else if ($$(tmpNode, setting).find("#" + targetObj.id).length > 0) {
									canMove = false;
									break
								}
							}
							if (canMove && event.target && tools.isChildOrSelf(event.target, targetObj.id + consts.id.A)) {
								tmpTarget = $(targetObj);
								tmpTargetNodeId = targetObj.id
							}
						}
						tmpNode = nodes[0];
						if (isTreeInner && tools.isChildOrSelf(event.target, targetSetting.treeId)) {
							if (!tmpTarget && (event.target.id == targetSetting.treeId || isTreeTop || isTreeBottom || isTreeLeft || isTreeRight) && (isOtherTree || !isOtherTree && tmpNode.parentTId)) {
								tmpTarget = targetSetting.treeObj
							}
							if (isTop) {
								targetSetting.treeObj.scrollTop(targetSetting.treeObj.scrollTop() - 10)
							} else if (isBottom) {
								targetSetting.treeObj.scrollTop(targetSetting.treeObj.scrollTop() + 10)
							}
							if (isLeft) {
								targetSetting.treeObj.scrollLeft(targetSetting.treeObj.scrollLeft() - 10)
							} else if (isRight) {
								targetSetting.treeObj.scrollLeft(targetSetting.treeObj.scrollLeft() + 10)
							}
							if (tmpTarget && tmpTarget != targetSetting.treeObj && tmpTarget.offset().left < targetSetting.treeObj.offset().left) {
								targetSetting.treeObj.scrollLeft(targetSetting.treeObj.scrollLeft() + tmpTarget.offset().left - targetSetting.treeObj.offset().left)
							}
						}
						curNode.css({
							top: event.clientY + docScrollTop + 3 + "px",
							left: event.clientX + docScrollLeft + 3 + "px"
						});
						var dX = 0;
						var dY = 0;
						if (tmpTarget && tmpTarget.attr("id") != targetSetting.treeId) {
							var tmpTargetNode = tmpTargetNodeId == null ? null : data.getNodeCache(targetSetting, tmpTargetNodeId),
								isCopy = (event.ctrlKey || event.metaKey) && setting.edit.drag.isMove && setting.edit.drag.isCopy || !setting.edit.drag.isMove && setting.edit.drag.isCopy,
								isPrev = !! (preNode && tmpTargetNodeId === preNode.tId),
								isNext = !! (nextNode && tmpTargetNodeId === nextNode.tId),
								isInner = tmpNode.parentTId && tmpNode.parentTId == tmpTargetNodeId,
								canPrev = (isCopy || !isNext) && tools.apply(targetSetting.edit.drag.prev, [targetSetting.treeId, nodes, tmpTargetNode], !! targetSetting.edit.drag.prev),
								canNext = (isCopy || !isPrev) && tools.apply(targetSetting.edit.drag.next, [targetSetting.treeId, nodes, tmpTargetNode], !! targetSetting.edit.drag.next),
								canInner = (isCopy || !isInner) && !(targetSetting.data.keep.leaf && !tmpTargetNode.isParent) && tools.apply(targetSetting.edit.drag.inner, [targetSetting.treeId, nodes, tmpTargetNode], !! targetSetting.edit.drag.inner);
							if (!canPrev && !canNext && !canInner) {
								tmpTarget = null;
								tmpTargetNodeId = "";
								moveType = consts.move.TYPE_INNER;
								tmpArrow.css({
									display: "none"
								});
								if (window.zTreeMoveTimer) {
									clearTimeout(window.zTreeMoveTimer);
									window.zTreeMoveTargetNodeTId = null
								}
							} else {
								var tmpTargetA = $("#" + tmpTargetNodeId + consts.id.A, tmpTarget),
									tmpNextA = tmpTargetNode.isLastNode ? null : $("#" + tmpTargetNode.getNextNode().tId + consts.id.A, tmpTarget.next()),
									tmpTop = tmpTargetA.offset().top,
									tmpLeft = tmpTargetA.offset().left,
									prevPercent = canPrev ? canInner ? .25 : canNext ? .5 : 1 : -1,
									nextPercent = canNext ? canInner ? .75 : canPrev ? .5 : 0 : -1,
									dY_percent = (event.clientY + docScrollTop - tmpTop) / tmpTargetA.height();
								if ((prevPercent == 1 || dY_percent <= prevPercent && dY_percent >= -.2) && canPrev) {
									dX = 1 - tmpArrow.width();
									dY = tmpTop - tmpArrow.height() / 2;
									moveType = consts.move.TYPE_PREV
								} else if ((nextPercent == 0 || dY_percent >= nextPercent && dY_percent <= 1.2) && canNext) {
									dX = 1 - tmpArrow.width();
									dY = tmpNextA == null || tmpTargetNode.isParent && tmpTargetNode.open ? tmpTop + tmpTargetA.height() - tmpArrow.height() / 2 : tmpNextA.offset().top - tmpArrow.height() / 2;
									moveType = consts.move.TYPE_NEXT
								} else {
									dX = 5 - tmpArrow.width();
									dY = tmpTop;
									moveType = consts.move.TYPE_INNER
								}
								tmpArrow.css({
									display: "block",
									top: dY + "px",
									left: tmpLeft + dX + "px"
								});
								tmpTargetA.addClass(consts.node.TMPTARGET_NODE + "_" + moveType);
								if (preTmpTargetNodeId != tmpTargetNodeId || preTmpMoveType != moveType) {
									startTime = (new Date).getTime()
								}
								if (tmpTargetNode && tmpTargetNode.isParent && moveType == consts.move.TYPE_INNER) {
									var startTimer = true;
									if (window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId !== tmpTargetNode.tId) {
										clearTimeout(window.zTreeMoveTimer);
										window.zTreeMoveTargetNodeTId = null
									} else if (window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId === tmpTargetNode.tId) {
										startTimer = false
									}
									if (startTimer) {
										window.zTreeMoveTimer = setTimeout(function() {
											if (moveType != consts.move.TYPE_INNER) return;
											if (tmpTargetNode && tmpTargetNode.isParent && !tmpTargetNode.open && (new Date).getTime() - startTime > targetSetting.edit.drag.autoOpenTime && tools.apply(targetSetting.callback.beforeDragOpen, [targetSetting.treeId, tmpTargetNode], true)) {
												view.switchNode(targetSetting, tmpTargetNode);
												if (targetSetting.edit.drag.autoExpandTrigger) {
													targetSetting.treeObj.trigger(consts.event.EXPAND, [targetSetting.treeId, tmpTargetNode])
												}
											}
										}, targetSetting.edit.drag.autoOpenTime + 50);
										window.zTreeMoveTargetNodeTId = tmpTargetNode.tId
									}
								}
							}
						} else {
							moveType = consts.move.TYPE_INNER;
							if (tmpTarget && tools.apply(targetSetting.edit.drag.inner, [targetSetting.treeId, nodes, null], !! targetSetting.edit.drag.inner)) {
								tmpTarget.addClass(consts.node.TMPTARGET_TREE)
							} else {
								tmpTarget = null
							}
							tmpArrow.css({
								display: "none"
							});
							if (window.zTreeMoveTimer) {
								clearTimeout(window.zTreeMoveTimer);
								window.zTreeMoveTargetNodeTId = null
							}
						}
						preTmpTargetNodeId = tmpTargetNodeId;
						preTmpMoveType = moveType;
						setting.treeObj.trigger(consts.event.DRAGMOVE, [event, setting.treeId, nodes])
					}
					return false
				}
				doc.bind("mouseup", _docMouseUp);

				function _docMouseUp(event) {
					if (window.zTreeMoveTimer) {
						clearTimeout(window.zTreeMoveTimer);
						window.zTreeMoveTargetNodeTId = null
					}
					preTmpTargetNodeId = null;
					preTmpMoveType = null;
					doc.unbind("mousemove", _docMouseMove);
					doc.unbind("mouseup", _docMouseUp);
					doc.unbind("selectstart", _docSelect);
					body.css("cursor", "auto");
					if (tmpTarget) {
						tmpTarget.removeClass(consts.node.TMPTARGET_TREE);
						if (tmpTargetNodeId) $("#" + tmpTargetNodeId + consts.id.A, tmpTarget).removeClass(consts.node.TMPTARGET_NODE + "_" + consts.move.TYPE_PREV).removeClass(consts.node.TMPTARGET_NODE + "_" + _consts.move.TYPE_NEXT).removeClass(consts.node.TMPTARGET_NODE + "_" + _consts.move.TYPE_INNER)
					}
					tools.showIfameMask(setting, false);
					roots.showHoverDom = true;
					if (root.dragFlag == 0) return;
					root.dragFlag = 0;
					var i, l, tmpNode;
					for (i = 0, l = nodes.length; i < l; i++) {
						tmpNode = nodes[i];
						if (tmpNode.isParent && root.dragNodeShowBefore[tmpNode.tId] && !tmpNode.open) {
							view.expandCollapseNode(setting, tmpNode, !tmpNode.open);
							delete root.dragNodeShowBefore[tmpNode.tId]
						}
					}
					if (curNode) curNode.remove();
					if (tmpArrow) tmpArrow.remove();
					var isCopy = (event.ctrlKey || event.metaKey) && setting.edit.drag.isMove && setting.edit.drag.isCopy || !setting.edit.drag.isMove && setting.edit.drag.isCopy;
					if (!isCopy && tmpTarget && tmpTargetNodeId && nodes[0].parentTId && tmpTargetNodeId == nodes[0].parentTId && moveType == consts.move.TYPE_INNER) {
						tmpTarget = null
					}
					if (tmpTarget) {
						var dragTargetNode = tmpTargetNodeId == null ? null : data.getNodeCache(targetSetting, tmpTargetNodeId);
						if (tools.apply(setting.callback.beforeDrop, [targetSetting.treeId, nodes, dragTargetNode, moveType, isCopy], true) == false) {
							view.selectNodes(sourceSetting, nodes);
							return
						}
						var newNodes = isCopy ? tools.clone(nodes) : nodes;

						function dropCallback() {
							if (isOtherTree) {
								if (!isCopy) {
									for (var i = 0, l = nodes.length; i < l; i++) {
										view.removeNode(setting, nodes[i])
									}
								}
								if (moveType == consts.move.TYPE_INNER) {
									view.addNodes(targetSetting, dragTargetNode, newNodes)
								} else {
									view.addNodes(targetSetting, dragTargetNode.getParentNode(), newNodes);
									if (moveType == consts.move.TYPE_PREV) {
										for (i = 0, l = newNodes.length; i < l; i++) {
											view.moveNode(targetSetting, dragTargetNode, newNodes[i], moveType, false)
										}
									} else {
										for (i = -1, l = newNodes.length - 1; i < l; l--) {
											view.moveNode(targetSetting, dragTargetNode, newNodes[l], moveType, false)
										}
									}
								}
							} else {
								if (isCopy && moveType == consts.move.TYPE_INNER) {
									view.addNodes(targetSetting, dragTargetNode, newNodes)
								} else {
									if (isCopy) {
										view.addNodes(targetSetting, dragTargetNode.getParentNode(), newNodes)
									}
									if (moveType != consts.move.TYPE_NEXT) {
										for (i = 0, l = newNodes.length; i < l; i++) {
											view.moveNode(targetSetting, dragTargetNode, newNodes[i], moveType, false)
										}
									} else {
										for (i = -1, l = newNodes.length - 1; i < l; l--) {
											view.moveNode(targetSetting, dragTargetNode, newNodes[l], moveType, false)
										}
									}
								}
							}
							view.selectNodes(targetSetting, newNodes);
							$$(newNodes[0], setting).focus().blur();
							setting.treeObj.trigger(consts.event.DROP, [event, targetSetting.treeId, newNodes, dragTargetNode, moveType, isCopy])
						}
						if (moveType == consts.move.TYPE_INNER && tools.canAsync(targetSetting, dragTargetNode)) {
							view.asyncNode(targetSetting, dragTargetNode, false, dropCallback)
						} else {
							dropCallback()
						}
					} else {
						view.selectNodes(sourceSetting, nodes);
						setting.treeObj.trigger(consts.event.DROP, [event, setting.treeId, nodes, null, null, null])
					}
				}
				doc.bind("selectstart", _docSelect);

				function _docSelect() {
					return false
				}
				if (eventMouseDown.preventDefault) {
					eventMouseDown.preventDefault()
				}
				return true
			}
		},
		_tools = {
			getAbs: function(obj) {
				var oRect = obj.getBoundingClientRect(),
					scrollTop = document.body.scrollTop + document.documentElement.scrollTop,
					scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
				return [oRect.left + scrollLeft, oRect.top + scrollTop]
			},
			inputFocus: function(inputObj) {
				if (inputObj.get(0)) {
					inputObj.focus();
					tools.setCursorPosition(inputObj.get(0), inputObj.val().length)
				}
			},
			inputSelect: function(inputObj) {
				if (inputObj.get(0)) {
					inputObj.focus();
					inputObj.select()
				}
			},
			setCursorPosition: function(obj, pos) {
				if (obj.setSelectionRange) {
					obj.focus();
					obj.setSelectionRange(pos, pos)
				} else if (obj.createTextRange) {
					var range = obj.createTextRange();
					range.collapse(true);
					range.moveEnd("character", pos);
					range.moveStart("character", pos);
					range.select()
				}
			},
			showIfameMask: function(setting, showSign) {
				var root = data.getRoot(setting);
				while (root.dragMaskList.length > 0) {
					root.dragMaskList[0].remove();
					root.dragMaskList.shift()
				}
				if (showSign) {
					var iframeList = $$("iframe", setting);
					for (var i = 0, l = iframeList.length; i < l; i++) {
						var obj = iframeList.get(i),
							r = tools.getAbs(obj),
							dragMask = $$("<div id='zTreeMask_" + i + "' class='zTreeMask' style='top:" + r[1] + "px; left:" + r[0] + "px; width:" + obj.offsetWidth + "px; height:" + obj.offsetHeight + "px;'></div>", setting);
						dragMask.appendTo($$("body", setting));
						root.dragMaskList.push(dragMask)
					}
				}
			}
		},
		_view = {
			addEditBtn: function(setting, node) {
				if (node.editNameFlag || $$(node, consts.id.EDIT, setting).length > 0) {
					return
				}
				if (!tools.apply(setting.edit.showRenameBtn, [setting.treeId, node], setting.edit.showRenameBtn)) {
					return
				}
				var aObj = $$(node, consts.id.A, setting),
					editStr = "<span class='" + consts.className.BUTTON + " edit' id='" + node.tId + consts.id.EDIT + "' title='" + tools.apply(setting.edit.renameTitle, [setting.treeId, node], setting.edit.renameTitle) + "' treeNode" + consts.id.EDIT + " style='display:none;'></span>";
				aObj.append(editStr);
				$$(node, consts.id.EDIT, setting).bind("click", function() {
					if (!tools.uCanDo(setting) || tools.apply(setting.callback.beforeEditName, [setting.treeId, node], true) == false) return false;
					view.editNode(setting, node);
					return false
				}).show()
			},
			addRemoveBtn: function(setting, node) {
				if (node.editNameFlag || $$(node, consts.id.REMOVE, setting).length > 0) {
					return
				}
				if (!tools.apply(setting.edit.showRemoveBtn, [setting.treeId, node], setting.edit.showRemoveBtn)) {
					return
				}
				var aObj = $$(node, consts.id.A, setting),
					removeStr = "<span class='" + consts.className.BUTTON + " remove' id='" + node.tId + consts.id.REMOVE + "' title='" + tools.apply(setting.edit.removeTitle, [setting.treeId, node], setting.edit.removeTitle) + "' treeNode" + consts.id.REMOVE + " style='display:none;'></span>";
				aObj.append(removeStr);
				$$(node, consts.id.REMOVE, setting).bind("click", function() {
					if (!tools.uCanDo(setting) || tools.apply(setting.callback.beforeRemove, [setting.treeId, node], true) == false) return false;
					view.removeNode(setting, node);
					setting.treeObj.trigger(consts.event.REMOVE, [setting.treeId, node]);
					return false
				}).bind("mousedown", function(eventMouseDown) {
					return true
				}).show()
			},
			addHoverDom: function(setting, node) {
				if (data.getRoots().showHoverDom) {
					node.isHover = true;
					if (setting.edit.enable) {
						view.addEditBtn(setting, node);
						view.addRemoveBtn(setting, node)
					}
					tools.apply(setting.view.addHoverDom, [setting.treeId, node])
				}
			},
			cancelCurEditNode: function(setting, forceName, isCancel) {
				var root = data.getRoot(setting),
					nameKey = setting.data.key.name,
					node = root.curEditNode;
				if (node) {
					var inputObj = root.curEditInput,
						newName = forceName ? forceName : isCancel ? node[nameKey] : inputObj.val();
					if (tools.apply(setting.callback.beforeRename, [setting.treeId, node, newName, isCancel], true) === false) {
						return false
					} else {
						node[nameKey] = newName;
						setting.treeObj.trigger(consts.event.RENAME, [setting.treeId, node, isCancel])
					}
					var aObj = $$(node, consts.id.A, setting);
					aObj.removeClass(consts.node.CURSELECTED_EDIT);
					inputObj.unbind();
					view.setNodeName(setting, node);
					node.editNameFlag = false;
					root.curEditNode = null;
					root.curEditInput = null;
					view.selectNode(setting, node, false)
				}
				root.noSelection = true;
				return true
			},
			editNode: function(setting, node) {
				var root = data.getRoot(setting);
				view.editNodeBlur = false;
				if (data.isSelectedNode(setting, node) && root.curEditNode == node && node.editNameFlag) {
					setTimeout(function() {
						tools.inputFocus(root.curEditInput)
					}, 0);
					return
				}
				var nameKey = setting.data.key.name;
				node.editNameFlag = true;
				view.removeTreeDom(setting, node);
				view.cancelCurEditNode(setting);
				view.selectNode(setting, node, false);
				$$(node, consts.id.SPAN, setting).html("<input type=text class='rename' id='" + node.tId + consts.id.INPUT + "' treeNode" + consts.id.INPUT + " >");
				var inputObj = $$(node, consts.id.INPUT, setting);
				inputObj.attr("value", node[nameKey]);
				if (setting.edit.editNameSelectAll) {
					tools.inputSelect(inputObj)
				} else {
					tools.inputFocus(inputObj)
				}
				inputObj.bind("blur", function(event) {
					if (!view.editNodeBlur) {
						view.cancelCurEditNode(setting)
					}
				}).bind("keydown", function(event) {
					if (event.keyCode == "13") {
						view.editNodeBlur = true;
						view.cancelCurEditNode(setting)
					} else if (event.keyCode == "27") {
						view.cancelCurEditNode(setting, null, true)
					}
				}).bind("click", function(event) {
					return false
				}).bind("dblclick", function(event) {
					return false
				});
				$$(node, consts.id.A, setting).addClass(consts.node.CURSELECTED_EDIT);
				root.curEditInput = inputObj;
				root.noSelection = false;
				root.curEditNode = node
			},
			moveNode: function(setting, targetNode, node, moveType, animateFlag, isSilent) {
				var root = data.getRoot(setting),
					childKey = setting.data.key.children;
				if (targetNode == node) return;
				if (setting.data.keep.leaf && targetNode && !targetNode.isParent && moveType == consts.move.TYPE_INNER) return;
				var oldParentNode = node.parentTId ? node.getParentNode() : root,
					targetNodeIsRoot = targetNode === null || targetNode == root;
				if (targetNodeIsRoot && targetNode === null) targetNode = root;
				if (targetNodeIsRoot) moveType = consts.move.TYPE_INNER;
				var targetParentNode = targetNode.parentTId ? targetNode.getParentNode() : root;
				if (moveType != consts.move.TYPE_PREV && moveType != consts.move.TYPE_NEXT) {
					moveType = consts.move.TYPE_INNER
				}
				if (moveType == consts.move.TYPE_INNER) {
					if (targetNodeIsRoot) {
						node.parentTId = null
					} else {
						if (!targetNode.isParent) {
							targetNode.isParent = true;
							targetNode.open = !! targetNode.open;
							view.setNodeLineIcos(setting, targetNode)
						}
						node.parentTId = targetNode.tId
					}
				}
				var targetObj, target_ulObj;
				if (targetNodeIsRoot) {
					targetObj = setting.treeObj;
					target_ulObj = targetObj
				} else {
					if (!isSilent && moveType == consts.move.TYPE_INNER) {
						view.expandCollapseNode(setting, targetNode, true, false)
					} else if (!isSilent) {
						view.expandCollapseNode(setting, targetNode.getParentNode(), true, false)
					}
					targetObj = $$(targetNode, setting);
					target_ulObj = $$(targetNode, consts.id.UL, setting);
					if ( !! targetObj.get(0) && !target_ulObj.get(0)) {
						var ulstr = [];
						view.makeUlHtml(setting, targetNode, ulstr, "");
						targetObj.append(ulstr.join(""))
					}
					target_ulObj = $$(targetNode, consts.id.UL, setting)
				}
				var nodeDom = $$(node, setting);
				if (!nodeDom.get(0)) {
					nodeDom = view.appendNodes(setting, node.level, [node], null, false, true).join("")
				} else if (!targetObj.get(0)) {
					nodeDom.remove()
				}
				if (target_ulObj.get(0) && moveType == consts.move.TYPE_INNER) {
					target_ulObj.append(nodeDom)
				} else if (targetObj.get(0) && moveType == consts.move.TYPE_PREV) {
					targetObj.before(nodeDom)
				} else if (targetObj.get(0) && moveType == consts.move.TYPE_NEXT) {
					targetObj.after(nodeDom)
				}
				var i, l, tmpSrcIndex = -1,
					tmpTargetIndex = 0,
					oldNeighbor = null,
					newNeighbor = null,
					oldLevel = node.level;
				if (node.isFirstNode) {
					tmpSrcIndex = 0;
					if (oldParentNode[childKey].length > 1) {
						oldNeighbor = oldParentNode[childKey][1];
						oldNeighbor.isFirstNode = true
					}
				} else if (node.isLastNode) {
					tmpSrcIndex = oldParentNode[childKey].length - 1;
					oldNeighbor = oldParentNode[childKey][tmpSrcIndex - 1];
					oldNeighbor.isLastNode = true
				} else {
					for (i = 0, l = oldParentNode[childKey].length; i < l; i++) {
						if (oldParentNode[childKey][i].tId == node.tId) {
							tmpSrcIndex = i;
							break
						}
					}
				}
				if (tmpSrcIndex >= 0) {
					oldParentNode[childKey].splice(tmpSrcIndex, 1)
				}
				if (moveType != consts.move.TYPE_INNER) {
					for (i = 0, l = targetParentNode[childKey].length; i < l; i++) {
						if (targetParentNode[childKey][i].tId == targetNode.tId) tmpTargetIndex = i
					}
				}
				if (moveType == consts.move.TYPE_INNER) {
					if (!targetNode[childKey]) targetNode[childKey] = new Array;
					if (targetNode[childKey].length > 0) {
						newNeighbor = targetNode[childKey][targetNode[childKey].length - 1];
						newNeighbor.isLastNode = false
					}
					targetNode[childKey].splice(targetNode[childKey].length, 0, node);
					node.isLastNode = true;
					node.isFirstNode = targetNode[childKey].length == 1
				} else if (targetNode.isFirstNode && moveType == consts.move.TYPE_PREV) {
					targetParentNode[childKey].splice(tmpTargetIndex, 0, node);
					newNeighbor = targetNode;
					newNeighbor.isFirstNode = false;
					node.parentTId = targetNode.parentTId;
					node.isFirstNode = true;
					node.isLastNode = false
				} else if (targetNode.isLastNode && moveType == consts.move.TYPE_NEXT) {
					targetParentNode[childKey].splice(tmpTargetIndex + 1, 0, node);
					newNeighbor = targetNode;
					newNeighbor.isLastNode = false;
					node.parentTId = targetNode.parentTId;
					node.isFirstNode = false;
					node.isLastNode = true
				} else {
					if (moveType == consts.move.TYPE_PREV) {
						targetParentNode[childKey].splice(tmpTargetIndex, 0, node)
					} else {
						targetParentNode[childKey].splice(tmpTargetIndex + 1, 0, node)
					}
					node.parentTId = targetNode.parentTId;
					node.isFirstNode = false;
					node.isLastNode = false
				}
				data.fixPIdKeyValue(setting, node);
				data.setSonNodeLevel(setting, node.getParentNode(), node);
				view.setNodeLineIcos(setting, node);
				view.repairNodeLevelClass(setting, node, oldLevel);
				if (!setting.data.keep.parent && oldParentNode[childKey].length < 1) {
					oldParentNode.isParent = false;
					oldParentNode.open = false;
					var tmp_ulObj = $$(oldParentNode, consts.id.UL, setting),
						tmp_switchObj = $$(oldParentNode, consts.id.SWITCH, setting),
						tmp_icoObj = $$(oldParentNode, consts.id.ICON, setting);
					view.replaceSwitchClass(oldParentNode, tmp_switchObj, consts.folder.DOCU);
					view.replaceIcoClass(oldParentNode, tmp_icoObj, consts.folder.DOCU);
					tmp_ulObj.css("display", "none")
				} else if (oldNeighbor) {
					view.setNodeLineIcos(setting, oldNeighbor)
				}
				if (newNeighbor) {
					view.setNodeLineIcos(setting, newNeighbor)
				}
				if ( !! setting.check && setting.check.enable && view.repairChkClass) {
					view.repairChkClass(setting, oldParentNode);
					view.repairParentChkClassWithSelf(setting, oldParentNode);
					if (oldParentNode != node.parent) view.repairParentChkClassWithSelf(setting, node)
				}
				if (!isSilent) {
					view.expandCollapseParentNode(setting, node.getParentNode(), true, animateFlag)
				}
				setTimeout(function() {}, 10)
			},
			removeEditBtn: function(setting, node) {
				$$(node, consts.id.EDIT, setting).unbind().remove()
			},
			removeRemoveBtn: function(setting, node) {
				$$(node, consts.id.REMOVE, setting).unbind().remove()
			},
			removeTreeDom: function(setting, node) {
				node.isHover = false;
				view.removeEditBtn(setting, node);
				view.removeRemoveBtn(setting, node);
				tools.apply(setting.view.removeHoverDom, [setting.treeId, node])
			},
			repairNodeLevelClass: function(setting, node, oldLevel) {
				if (oldLevel === node.level) return;
				var liObj = $$(node, setting),
					aObj = $$(node, consts.id.A, setting),
					ulObj = $$(node, consts.id.UL, setting),
					oldClass = consts.className.LEVEL + oldLevel,
					newClass = consts.className.LEVEL + node.level;
				liObj.removeClass(oldClass);
				liObj.addClass(newClass);
				aObj.removeClass(oldClass);
				aObj.addClass(newClass);
				ulObj.removeClass(oldClass);
				ulObj.addClass(newClass)
			},
			selectNodes: function(setting, nodes) {
				for (var i = 0, l = nodes.length; i < l; i++) {
					view.selectNode(setting, nodes[i], i > 0)
				}
			}
		},
		_z = {
			tools: _tools,
			view: _view,
			event: _event,
			data: _data
		};
	$.extend(true, $.fn.zTree.consts, _consts);
	$.extend(true, $.fn.zTree._z, _z);
	var zt = $.fn.zTree,
		tools = zt._z.tools,
		consts = zt.consts,
		view = zt._z.view,
		data = zt._z.data,
		event = zt._z.event,
		$$ = tools.$;
	data.exSetting(_setting);
	data.addInitBind(_bindEvent);
	data.addInitUnBind(_unbindEvent);
	data.addInitCache(_initCache);
	data.addInitNode(_initNode);
	data.addInitProxy(_eventProxy);
	data.addInitRoot(_initRoot);
	data.addZTreeTools(_zTreeTools);
	var _cancelPreSelectedNode = view.cancelPreSelectedNode;
	view.cancelPreSelectedNode = function(setting, node) {
		var list = data.getRoot(setting).curSelectedList;
		for (var i = 0, j = list.length; i < j; i++) {
			if (!node || node === list[i]) {
				view.removeTreeDom(setting, list[i]);
				if (node) break
			}
		}
		if (_cancelPreSelectedNode) _cancelPreSelectedNode.apply(view, arguments)
	};
	var _createNodes = view.createNodes;
	view.createNodes = function(setting, level, nodes, parentNode) {
		if (_createNodes) {
			_createNodes.apply(view, arguments)
		}
		if (!nodes) return;
		if (view.repairParentChkClassWithSelf) {
			view.repairParentChkClassWithSelf(setting, parentNode)
		}
	};
	var _makeNodeUrl = view.makeNodeUrl;
	view.makeNodeUrl = function(setting, node) {
		return setting.edit.enable ? null : _makeNodeUrl.apply(view, arguments)
	};
	var _removeNode = view.removeNode;
	view.removeNode = function(setting, node) {
		var root = data.getRoot(setting);
		if (root.curEditNode === node) root.curEditNode = null;
		if (_removeNode) {
			_removeNode.apply(view, arguments)
		}
	};
	var _selectNode = view.selectNode;
	view.selectNode = function(setting, node, addFlag) {
		var root = data.getRoot(setting);
		if (data.isSelectedNode(setting, node) && root.curEditNode == node && node.editNameFlag) {
			return false
		}
		if (_selectNode) _selectNode.apply(view, arguments);
		view.addHoverDom(setting, node);
		return true
	};
	var _uCanDo = tools.uCanDo;
	tools.uCanDo = function(setting, e) {
		var root = data.getRoot(setting);
		if (e && (tools.eqs(e.type, "mouseover") || tools.eqs(e.type, "mouseout") || tools.eqs(e.type, "mousedown") || tools.eqs(e.type, "mouseup"))) {
			return true
		}
		if (root.curEditNode) {
			view.editNodeBlur = false;
			root.curEditInput.focus()
		}
		return !root.curEditNode && (_uCanDo ? _uCanDo.apply(view, arguments) : true)
	}
})(jQuery);
(function($) {
	jQuery.fn.extend({
		slimScroll: function(options) {
			var defaults = {
				width: "auto",
				height: "250px",
				size: "7px",
				color: "#000",
				position: "right",
				distance: "1px",
				start: "top",
				opacity: .4,
				alwaysVisible: false,
				disableFadeOut: false,
				railVisible: false,
				railColor: "#333",
				railOpacity: .2,
				railDraggable: true,
				railClass: "slimScrollRail",
				barClass: "slimScrollBar",
				wrapperClass: "slimScrollDiv",
				allowPageScroll: false,
				wheelStep: 20,
				touchScrollStep: 200,
				borderRadius: "7px",
				railBorderRadius: "7px"
			};
			var o = $.extend(defaults, options);
			this.each(function() {
				var isOverPanel, isOverBar, isDragg, queueHide, touchDif, barHeight, percentScroll, lastScroll, divS = "<div></div>",
					minBarHeight = 30,
					releaseScroll = false;
				var me = $(this);
				if (me.parent().hasClass(o.wrapperClass)) {
					var offset = me.scrollTop();
					bar = me.parent().find("." + o.barClass);
					rail = me.parent().find("." + o.railClass);
					getBarHeight();
					if ($.isPlainObject(options)) {
						if ("height" in options && options.height == "auto") {
							me.parent().css("height", "auto");
							me.css("height", "auto");
							var height = me.parent().parent().height();
							me.parent().css("height", height);
							me.css("height", height)
						}
						if ("scrollTo" in options) {
							offset = parseInt(o.scrollTo)
						} else if ("scrollBy" in options) {
							offset += parseInt(o.scrollBy)
						} else if ("destroy" in options) {
							bar.remove();
							rail.remove();
							me.unwrap();
							return
						}
						scrollContent(offset, false, true, options.onlyScrollBar)
					}
					return
				}
				o.height = o.height == "auto" ? me.parent().height() : o.height;
				var wrapper = $(divS).addClass(o.wrapperClass).css({
					position: "relative",
					overflow: "hidden",
					width: o.width,
					height: o.height
				});
				me.css({
					overflow: "hidden",
					width: o.width,
					height: o.height
				});
				var rail = $(divS).addClass(o.railClass).css({
					width: o.size,
					height: "100%",
					position: "absolute",
					top: 0,
					display: o.alwaysVisible && o.railVisible ? "block" : "none",
					"border-radius": o.railBorderRadius,
					background: o.railColor,
					opacity: o.railOpacity,
					zIndex: 90
				});
				var bar = $(divS).addClass(o.barClass).css({
					background: o.color,
					width: o.size,
					position: "absolute",
					top: 0,
					opacity: o.opacity,
					display: o.alwaysVisible ? "block" : "none",
					"border-radius": o.borderRadius,
					BorderRadius: o.borderRadius,
					MozBorderRadius: o.borderRadius,
					WebkitBorderRadius: o.borderRadius,
					zIndex: 99
				});
				var posCss = o.position == "right" ? {
					right: o.distance
				} : {
					left: o.distance
				};
				rail.css(posCss);
				bar.css(posCss);
				me.wrap(wrapper);
				me.parent().append(bar);
				me.parent().append(rail);
				if (o.railDraggable) {
					bar.bind("mousedown", function(e) {
						var $doc = $(document);
						isDragg = true;
						t = parseFloat(bar.css("top"));
						pageY = e.pageY;
						$doc.bind("mousemove.slimscroll", function(e) {
							currTop = t + e.pageY - pageY;
							bar.css("top", currTop);
							scrollContent(0, bar.position().top, false)
						});
						$doc.bind("mouseup.slimscroll", function(e) {
							isDragg = false;
							hideBar();
							$doc.unbind(".slimscroll")
						});
						return false
					}).bind("selectstart.slimscroll", function(e) {
						e.stopPropagation();
						e.preventDefault();
						return false
					})
				}
				rail.hover(function() {
					showBar()
				}, function() {
					hideBar()
				});
				bar.hover(function() {
					isOverBar = true
				}, function() {
					isOverBar = false
				});
				me.hover(function() {
					isOverPanel = true;
					showBar();
					hideBar()
				}, function() {
					isOverPanel = false;
					hideBar()
				});
				me.bind("touchstart", function(e, b) {
					if (e.originalEvent.touches.length) {
						touchDif = e.originalEvent.touches[0].pageY
					}
				});
				me.bind("touchmove", function(e) {
					if (!releaseScroll) {
						e.originalEvent.preventDefault()
					}
					if (e.originalEvent.touches.length) {
						var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
						scrollContent(diff, true);
						touchDif = e.originalEvent.touches[0].pageY
					}
				});
				getBarHeight();
				if (o.start === "bottom") {
					bar.css({
						top: me.outerHeight() - bar.outerHeight()
					});
					scrollContent(0, true)
				} else if (o.start !== "top") {
					scrollContent($(o.start).position().top, null, true);
					if (!o.alwaysVisible) {
						bar.hide()
					}
				}
				attachWheel();

				function _onWheel(e) {
					if (!isOverPanel) {
						return
					}
					var e = e || window.event;
					var delta = 0;
					if (e.wheelDelta) {
						delta = -e.wheelDelta / 120
					}
					if (e.detail) {
						delta = e.detail / 3
					}
					var target = e.target || e.srcTarget || e.srcElement;
					if ($(target).closest("." + o.wrapperClass).is(me.parent())) {
						scrollContent(delta, true)
					}
					if (e.preventDefault && !releaseScroll) {
						e.preventDefault()
					}
					if (!releaseScroll) {
						e.returnValue = false
					}
				}
				function scrollContent(y, isWheel, isJump, onlyScrollBar) {
					releaseScroll = false;
					var delta = y;
					var maxTop = me.outerHeight() - bar.outerHeight();
					if (isWheel) {
						delta = parseInt(bar.css("top")) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();
						delta = Math.min(Math.max(delta, 0), maxTop);
						delta = y > 0 ? Math.ceil(delta) : Math.floor(delta);
						bar.css({
							top: delta + "px"
						})
					}
					percentScroll = parseInt(bar.css("top")) / (me.outerHeight() - bar.outerHeight());
					delta = percentScroll * (me[0].scrollHeight - me.outerHeight());
					if (isJump) {
						delta = y;
						var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
						offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
						bar.css({
							top: offsetTop + "px"
						})
					}
					if (!onlyScrollBar) {
						me.scrollTop(delta)
					}
					me.trigger("slimscrolling", ~~delta);
					showBar();
					hideBar()
				}
				function attachWheel() {
					if (window.addEventListener) {
						this.addEventListener("DOMMouseScroll", _onWheel, false);
						this.addEventListener("mousewheel", _onWheel, false);
						this.addEventListener("MozMousePixelScroll", _onWheel, false)
					} else {
						document.attachEvent("onmousewheel", _onWheel)
					}
				}
				function getBarHeight() {
					barHeight = Math.max(me.outerHeight() / me[0].scrollHeight * me.outerHeight(), minBarHeight);
					bar.css({
						height: barHeight + "px"
					});
					var display = barHeight == me.outerHeight() ? "none" : "block";
					bar.css({
						display: display
					})
				}
				function showBar() {
					getBarHeight();
					clearTimeout(queueHide);
					if (percentScroll == ~~percentScroll) {
						releaseScroll = o.allowPageScroll;
						if (lastScroll != percentScroll) {
							var msg = ~~percentScroll == 0 ? "top" : "bottom";
							me.trigger("slimscroll", msg)
						}
					} else {
						releaseScroll = false
					}
					lastScroll = percentScroll;
					if (barHeight >= me.outerHeight()) {
						releaseScroll = true;
						return
					}
					bar.stop(true, true).fadeIn("fast");
					if (o.railVisible) {
						rail.stop(true, true).fadeIn("fast")
					}
				}
				function hideBar() {
					if (!o.alwaysVisible) {
						queueHide = setTimeout(function() {
							if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg) {
								bar.fadeOut("slow");
								rail.fadeOut("slow")
							}
						}, 1e3)
					}
				}
			});
			return this
		}
	});
	jQuery.fn.extend({
		slimscroll: jQuery.fn.slimScroll
	})
})(jQuery);

LEA.cmroot = 1;
(function($) {
	function returnfalse() {
		return false
	}
	$.fn.contextmenu = function(option) {
		var cmroot = "contextmenu" + LEA.cmroot;
		LEA.cmroot++;
		option = $.extend({
			alias: cmroot,
			width: 150
		}, option);
		var ruleName = null,
			target = null,
			groups = {},
			mitems = {},
			actions = {},
			showGroups = [],
			itemTpl = '<div class="b-m-$[type]" unselectable="on"><div class="clearfix cm-item"><div class="b-m-icon pull-left"><i class="fa $[faIcon]"></i>$[imgIcon]</div><div class="pull-left cm-text"><span class="c-text" unselectable="on">$[text]</span></div></div></div>';
		itemNoIconTpl = "<div class='b-m-$[type]' unselectable=on><nobr unselectable=on><span align='absmiddle'></span><span class='c-text' unselectable=on>$[text]</span></nobr></div>";
		var gTemplet = $("<div/>").addClass("b-m-mpanel").attr("unselectable", "on").css("display", "none");
		var iTemplet = $("<div/>").addClass("b-m-item").attr("unselectable", "on");
		var sTemplet = $("<div/>").addClass("b-m-split");
		var $body = $("body");
		var itemsCache = {};
		var buildGroup = function(obj) {
				groups[obj.alias] = this;
				this.gidx = obj.alias;
				this.id = obj.alias;
				if (obj.disable) {
					this.disable = obj.disable;
					this.className = "b-m-idisable"
				}
				$(this).width(obj.width).click(function() {}).mousedown(returnfalse).appendTo($body);
				obj = null;
				return this
			};
		var buildItem = function(obj) {
				var T = this;
				T.title = obj.text;
				T.idx = obj.alias;
				T.gidx = obj.gidx;
				T.data = obj;
				var imgIcon = "";
				if (obj.icon) {
					imgIcon = '<img src="' + obj.icon + '"/>'
				}
				obj.imgIcon = imgIcon;
				if (obj.icon) {
					T.innerHTML = itemTpl.replace(/\$\[([^\]]+)\]/g, function() {
						return obj[arguments[1]]
					})
				} else {
					T.innerHTML = itemTpl.replace(/\$\[([^\]]+)\]/g, function() {
						return obj[arguments[1]]
					})
				}
				if (obj.disable) {
					T.disable = obj.disable;
					T.className = "b-m-idisable"
				}
				obj.items && (T.group = true);
				obj.action && (actions[obj.alias] = obj.action);
				mitems[obj.alias] = T;
				T = obj = null;
				return this
			};
		var addItems = function(gidx, items, parentAlias) {
				var tmp = null;
				var len = items.length;
				for (var i = 0; i < len; i++) {
					var item = items[i];
					if (item.type == "splitLine") {
						tmp = sTemplet.clone()[0]
					} else {
						if (!item.alias) {
							if (parentAlias) {
								item.alias = parentAlias + "." + item.text
							} else {
								item.alias = item.text
							}
						}
						item.gidx = gidx;
						if (item.type == "group" && !item.action) {
							buildGroup.apply(gTemplet.clone()[0], [item]);
							itemsCache[item.alias] = item.items;
							item.type = "arrow";
							tmp = buildItem.apply(iTemplet.clone()[0], [item])
						} else {
							if (item.type == "group") {
								buildGroup.apply(gTemplet.clone()[0], [item]);
								itemsCache[item.alias] = item.items;
								item.type = "arrow";
								tmp = buildItem.apply(iTemplet.clone()[0], [item])
							} else {
								item.type = "ibody";
								tmp = buildItem.apply(iTemplet.clone()[0], [item])
							}
							var thisItem = item;
							(function(thisItem, tmp) {
								$(tmp).click(function(e) {
									if (!this.disable) {
										if ($.isFunction(actions[this.idx])) {
											actions[this.idx].call(this, target, thisItem)
										}
										hideMenuPane();
										$(target).removeClass("contextmenu-hover")
									}
									return false
								})
							})(thisItem, tmp)
						}
						$(tmp).bind("contextmenu", returnfalse).hover(overItem, outItem)
					}
					groups[gidx].appendChild(tmp);
					tmp = item = item.items = null
				}
				gidx = items = null
			};
		var overItem = function(e) {
				if (this.disable) return false;
				hideMenuPane.call(groups[this.gidx]);
				if (this.group) {
					var pos = $(this).offset();
					var width = $(this).outerWidth();
					showMenuGroup.apply(groups[this.idx], [pos, width, this])
				}
				this.className = "b-m-ifocus";
				return false
			};
		var outItem = function(e) {
				if (this.disable) return false;
				if (!this.group) {
					this.className = "b-m-item"
				}
				return false
			};
		var showMenuGroup = function(pos, width, t) {
				var $this = $(this);
				if ($this.html() == "") {
					addItems(t.idx, itemsCache[t.idx], t.idx)
				}
				var bwidth = $body.width();
				var bheight = document.documentElement.clientHeight - 10;
				bheight = bheight < 0 ? 100 : bheight;
				var mwidth = $(this).outerWidth();
				var mheight = $(this).outerHeight() - 10;
				mheight = mheight < 0 ? 100 : mheight;
				var mwidth = $(this).outerWidth();
				pos.left = pos.left + width + mwidth > bwidth ? pos.left - mwidth < 0 ? 0 : pos.left - mwidth : pos.left + width;
				pos.top = pos.top + mheight > bheight ? pos.top - mheight + (width > 0 ? 25 : 0) < 0 ? 0 : pos.top - mheight + (width > 0 ? 25 : 0) : pos.top;
				$(this).css(pos).show().css("max-height", bheight);
				showGroups.push(this.gidx)
			};
		var hideMenuPane = function() {
				var alias = null;
				for (var i = showGroups.length - 1; i >= 0; i--) {
					if (showGroups[i] == this.gidx) break;
					alias = showGroups.pop();
					groups[alias].style.display = "none";
					mitems[alias] && (mitems[alias].className = "b-m-item")
				}
			};

		function applyRule(rule) {
			for (var i in mitems) disable(i, !rule.disable);
			for (var i = 0; i < rule.items.length; i++) disable(rule.items[i], rule.disable);
			ruleName = rule.name
		}
		function disable(alias, disabled) {
			var item = mitems[alias];
			if (!item || !item.lastChild) {
				return
			}
			item.className = (item.disable = item.lastChild.disabled = disabled) ? "b-m-idisable" : "b-m-item"
		}
		function showMenu(e, menutarget) {
			target = menutarget;
			showMenuGroup.call(groups[cmroot], {
				left: e.pageX,
				top: e.pageY
			}, 0);
			if (!$(target).hasClass("item-active")) {
				$(target).addClass("contextmenu-hover")
			}
			$(document).one("click", function() {
				hideMenuPane();
				$(target).removeClass("contextmenu-hover")
			})
		}
		var $root = $("#" + option.alias);
		var root = null;
		if ($root.length == 0) {
			root = buildGroup.apply(gTemplet.clone()[0], [option]);
			root.applyrule = applyRule;
			root.showMenu = showMenu;
			addItems(option.alias, option.items)
		} else {
			root = $root[0]
		}
		function onShowMenu(e) {
			var bShowContext = option.onContextMenu && $.isFunction(option.onContextMenu) ? option.onContextMenu.call(this, e) : true;
			if (bShowContext) {
				if (option.onShow && $.isFunction(option.onShow)) {
					option.onShow.call(this, root)
				}
				root.showMenu(e, this)
			}
			if (e) {
				e.preventDefault()
			}
			return false
		}
		var me = $(option.parent).on("contextmenu", option.children, function(e) {
			onShowMenu.call(this, e)
		});
		if (option.rule) {
			applyRule(option.rule)
		}
		var out = {
			destroy: function() {
				me.unbind("contextmenu")
			},
			showMenu: function(e, target) {
				onShowMenu.call(target, e)
			}
		};
		return out
	}
})(jQuery);
if (typeof jQuery === "undefined") {
	throw new Error("Bootstrap requires jQuery")
} +
function($) {
	"use strict";

	function transitionEnd() {
		var el = document.createElement("bootstrap");
		var transEndEventNames = {
			WebkitTransition: "webkitTransitionEnd",
			MozTransition: "transitionend",
			OTransition: "oTransitionEnd otransitionend",
			transition: "transitionend"
		};
		for (var name in transEndEventNames) {
			if (el.style[name] !== undefined) {
				return {
					end: transEndEventNames[name]
				}
			}
		}
	}
	$.fn.emulateTransitionEnd = function(duration) {
		var called = false,
			$el = this;
		$(this).one($.support.transition.end, function() {
			called = true
		});
		var callback = function() {
				if (!called) $($el).trigger($.support.transition.end)
			};
		setTimeout(callback, duration);
		return this
	};
	$(function() {
		$.support.transition = transitionEnd()
	})
}(jQuery); +
function($) {
	"use strict";
	var dismiss = '[data-dismiss="alert"]';
	var Alert = function(el) {
			$(el).on("click", dismiss, this.close)
		};
	Alert.prototype.close = function(e) {
		var $this = $(this);
		var selector = $this.attr("data-target");
		if (!selector) {
			selector = $this.attr("href");
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")
		}
		var $parent = $(selector);
		if (e) e.preventDefault();
		if (!$parent.length) {
			$parent = $this.hasClass("alert") ? $this : $this.parent()
		}
		$parent.trigger(e = $.Event("close.bs.alert"));
		if (e.isDefaultPrevented()) return;
		$parent.removeClass("in");

		function removeElement() {
			$parent.trigger("closed.bs.alert").remove()
		}
		$.support.transition && $parent.hasClass("fade") ? $parent.one($.support.transition.end, removeElement).emulateTransitionEnd(150) : removeElement()
	};
	var old = $.fn.alert;
	$.fn.alert = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data("bs.alert");
			if (!data) $this.data("bs.alert", data = new Alert(this));
			if (typeof option == "string") data[option].call($this)
		})
	};
	$.fn.alert.Constructor = Alert;
	$.fn.alert.noConflict = function() {
		$.fn.alert = old;
		return this
	};
	$(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close)
}(jQuery); +
function($) {
	"use strict";
	var Button = function(element, options) {
			this.$element = $(element);
			this.options = $.extend({}, Button.DEFAULTS, options)
		};
	Button.DEFAULTS = {
		loadingText: "loading..."
	};
	Button.prototype.setState = function(state) {
		var d = "disabled";
		var $el = this.$element;
		var val = $el.is("input") ? "val" : "html";
		var data = $el.data();
		state = state + "Text";
		if (!data.resetText) $el.data("resetText", $el[val]());
		$el[val](data[state] || this.options[state]);
		setTimeout(function() {
			state == "loadingText" ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d)
		}, 0)
	};
	Button.prototype.toggle = function() {
		var $parent = this.$element.closest('[data-toggle="buttons"]');
		if ($parent.length) {
			var $input = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change");
			if ($input.prop("type") === "radio") $parent.find(".active").removeClass("active")
		}
		this.$element.toggleClass("active")
	};
	var old = $.fn.button;
	$.fn.button = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data("bs.button");
			var options = typeof option == "object" && option;
			if (!data) $this.data("bs.button", data = new Button(this, options));
			if (option == "toggle") data.toggle();
			else if (option) data.setState(option)
		})
	};
	$.fn.button.Constructor = Button;
	$.fn.button.noConflict = function() {
		$.fn.button = old;
		return this
	};
	$(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(e) {
		var $btn = $(e.target);
		if (!$btn.hasClass("btn")) $btn = $btn.closest(".btn");
		$btn.button("toggle");
		e.preventDefault()
	})
}(jQuery); +
function($) {
	"use strict";
	var Carousel = function(element, options) {
			this.$element = $(element);
			this.$indicators = this.$element.find(".carousel-indicators");
			this.options = options;
			this.paused = this.sliding = this.interval = this.$active = this.$items = null;
			this.options.pause == "hover" && this.$element.on("mouseenter", $.proxy(this.pause, this)).on("mouseleave", $.proxy(this.cycle, this))
		};
	Carousel.DEFAULTS = {
		interval: 5e3,
		pause: "hover",
		wrap: true
	};
	Carousel.prototype.cycle = function(e) {
		e || (this.paused = false);
		this.interval && clearInterval(this.interval);
		this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
		return this
	};
	Carousel.prototype.getActiveIndex = function() {
		this.$active = this.$element.find(".item.active");
		this.$items = this.$active.parent().children();
		return this.$items.index(this.$active)
	};
	Carousel.prototype.to = function(pos) {
		var that = this;
		var activeIndex = this.getActiveIndex();
		if (pos > this.$items.length - 1 || pos < 0) return;
		if (this.sliding) return this.$element.one("slid", function() {
			that.to(pos)
		});
		if (activeIndex == pos) return this.pause().cycle();
		return this.slide(pos > activeIndex ? "next" : "prev", $(this.$items[pos]))
	};
	Carousel.prototype.pause = function(e) {
		e || (this.paused = true);
		if (this.$element.find(".next, .prev").length && $.support.transition.end) {
			this.$element.trigger($.support.transition.end);
			this.cycle(true)
		}
		this.interval = clearInterval(this.interval);
		return this
	};
	Carousel.prototype.next = function() {
		if (this.sliding) return;
		return this.slide("next")
	};
	Carousel.prototype.prev = function() {
		if (this.sliding) return;
		return this.slide("prev")
	};
	Carousel.prototype.slide = function(type, next) {
		var $active = this.$element.find(".item.active");
		var $next = next || $active[type]();
		var isCycling = this.interval;
		var direction = type == "next" ? "left" : "right";
		var fallback = type == "next" ? "first" : "last";
		var that = this;
		if (!$next.length) {
			if (!this.options.wrap) return;
			$next = this.$element.find(".item")[fallback]()
		}
		this.sliding = true;
		isCycling && this.pause();
		var e = $.Event("slide.bs.carousel", {
			relatedTarget: $next[0],
			direction: direction
		});
		if ($next.hasClass("active")) return;
		if (this.$indicators.length) {
			this.$indicators.find(".active").removeClass("active");
			this.$element.one("slid", function() {
				var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
				$nextIndicator && $nextIndicator.addClass("active")
			})
		}
		if ($.support.transition && this.$element.hasClass("slide")) {
			this.$element.trigger(e);
			if (e.isDefaultPrevented()) return;
			$next.addClass(type);
			$next[0].offsetWidth;
			$active.addClass(direction);
			$next.addClass(direction);
			$active.one($.support.transition.end, function() {
				$next.removeClass([type, direction].join(" ")).addClass("active");
				$active.removeClass(["active", direction].join(" "));
				that.sliding = false;
				setTimeout(function() {
					that.$element.trigger("slid")
				}, 0)
			}).emulateTransitionEnd(600)
		} else {
			this.$element.trigger(e);
			if (e.isDefaultPrevented()) return;
			$active.removeClass("active");
			$next.addClass("active");
			this.sliding = false;
			this.$element.trigger("slid")
		}
		isCycling && this.cycle();
		return this
	};
	var old = $.fn.carousel;
	$.fn.carousel = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data("bs.carousel");
			var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == "object" && option);
			var action = typeof option == "string" ? option : options.slide;
			if (!data) $this.data("bs.carousel", data = new Carousel(this, options));
			if (typeof option == "number") data.to(option);
			else if (action) data[action]();
			else if (options.interval) data.pause().cycle()
		})
	};
	$.fn.carousel.Constructor = Carousel;
	$.fn.carousel.noConflict = function() {
		$.fn.carousel = old;
		return this
	};
	$(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
		var $this = $(this),
			href;
		var $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
		var options = $.extend({}, $target.data(), $this.data());
		var slideIndex = $this.attr("data-slide-to");
		if (slideIndex) options.interval = false;
		$target.carousel(options);
		if (slideIndex = $this.attr("data-slide-to")) {
			$target.data("bs.carousel").to(slideIndex)
		}
		e.preventDefault()
	});
	$(window).on("load", function() {
		$('[data-ride="carousel"]').each(function() {
			var $carousel = $(this);
			$carousel.carousel($carousel.data())
		})
	})
}(jQuery); +
function($) {
	"use strict";
	var Collapse = function(element, options) {
			this.$element = $(element);
			this.options = $.extend({}, Collapse.DEFAULTS, options);
			this.transitioning = null;
			if (this.options.parent) this.$parent = $(this.options.parent);
			if (this.options.toggle) this.toggle()
		};
	Collapse.DEFAULTS = {
		toggle: true
	};
	Collapse.prototype.dimension = function() {
		var hasWidth = this.$element.hasClass("width");
		return hasWidth ? "width" : "height"
	};
	Collapse.prototype.show = function() {
		if (this.transitioning || this.$element.hasClass("in")) return;
		var startEvent = $.Event("show.bs.collapse");
		this.$element.trigger(startEvent);
		if (startEvent.isDefaultPrevented()) return;
		var actives = this.$parent && this.$parent.find("> .panel > .in");
		if (actives && actives.length) {
			var hasData = actives.data("bs.collapse");
			if (hasData && hasData.transitioning) return;
			actives.collapse("hide");
			hasData || actives.data("bs.collapse", null)
		}
		var dimension = this.dimension();
		this.$element.removeClass("collapse").addClass("collapsing")[dimension](0);
		this.transitioning = 1;
		var complete = function() {
				this.$element.removeClass("collapsing").addClass("in")[dimension]("auto");
				this.transitioning = 0;
				this.$element.trigger("shown.bs.collapse")
			};
		if (!$.support.transition) return complete.call(this);
		var scrollSize = $.camelCase(["scroll", dimension].join("-"));
		this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
	};
	Collapse.prototype.hide = function() {
		if (this.transitioning || !this.$element.hasClass("in")) return;
		var startEvent = $.Event("hide.bs.collapse");
		this.$element.trigger(startEvent);
		if (startEvent.isDefaultPrevented()) return;
		var dimension = this.dimension();
		this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
		this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");
		this.transitioning = 1;
		var complete = function() {
				this.transitioning = 0;
				this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
			};
		if (!$.support.transition) return complete.call(this);
		this.$element[dimension](0).one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350)
	};
	Collapse.prototype.toggle = function() {
		this[this.$element.hasClass("in") ? "hide" : "show"]()
	};
	var old = $.fn.collapse;
	$.fn.collapse = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data("bs.collapse");
			var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == "object" && option);
			if (!data) $this.data("bs.collapse", data = new Collapse(this, options));
			if (typeof option == "string") data[option]()
		})
	};
	$.fn.collapse.Constructor = Collapse;
	$.fn.collapse.noConflict = function() {
		$.fn.collapse = old;
		return this
	};
	$(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(e) {
		var $this = $(this),
			href;
		var target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
		var $target = $(target);
		var data = $target.data("bs.collapse");
		var option = data ? "toggle" : $this.data();
		var parent = $this.attr("data-parent");
		var $parent = parent && $(parent);
		if (!data || !data.transitioning) {
			if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass("collapsed");
			$this[$target.hasClass("in") ? "addClass" : "removeClass"]("collapsed")
		}
		$target.collapse(option)
	})
}(jQuery); +
function($) {
	"use strict";
	var backdrop = ".dropdown-backdrop";
	var toggle = "[data-toggle=dropdown]";
	var Dropdown = function(element) {
			var $el = $(element).on("click.bs.dropdown", this.toggle)
		};
	Dropdown.prototype.toggle = function(e) {
		var $this = $(this);
		if ($this.is(".disabled, :disabled")) return;
		var $parent = getParent($this);
		var isActive = $parent.hasClass("open");
		clearMenus();
		if (!isActive) {
			if ("ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length) {
				$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on("click", clearMenus)
			}
			$parent.trigger(e = $.Event("show.bs.dropdown"));
			if (e.isDefaultPrevented()) return;
			$parent.toggleClass("open").trigger("shown.bs.dropdown");
			$this.focus()
		}
		return false
	};
	Dropdown.prototype.keydown = function(e) {
		if (!/(38|40|27)/.test(e.keyCode)) return;
		var $this = $(this);
		e.preventDefault();
		e.stopPropagation();
		if ($this.is(".disabled, :disabled")) return;
		var $parent = getParent($this);
		var isActive = $parent.hasClass("open");
		if (!isActive || isActive && e.keyCode == 27) {
			if (e.which == 27) $parent.find(toggle).focus();
			return $this.click()
		}
		var $items = $("[role=menu] li:not(.divider):visible a", $parent);
		if (!$items.length) return;
		var index = $items.index($items.filter(":focus"));
		if (e.keyCode == 38 && index > 0) index--;
		if (e.keyCode == 40 && index < $items.length - 1) index++;
		if (!~index) index = 0;
		$items.eq(index).focus()
	};

	function clearMenus() {
		$(backdrop).remove();
		$(toggle).each(function(e) {
			var $parent = getParent($(this));
			if (!$parent.hasClass("open")) return;
			$parent.trigger(e = $.Event("hide.bs.dropdown"));
			if (e.isDefaultPrevented()) return;
			$parent.removeClass("open").trigger("hidden.bs.dropdown")
		})
	}
	function getParent($this) {
		var selector = $this.attr("data-target");
		if (!selector) {
			selector = $this.attr("href");
			selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "")
		}
		var $parent = selector && $(selector);
		return $parent && $parent.length ? $parent : $this.parent()
	}
	var old = $.fn.dropdown;
	$.fn.dropdown = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data("dropdown");
			if (!data) $this.data("dropdown", data = new Dropdown(this));
			if (typeof option == "string") data[option].call($this)
		})
	};
	$.fn.dropdown.Constructor = Dropdown;
	$.fn.dropdown.noConflict = function() {
		$.fn.dropdown = old;
		return this
	};
	$(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
		e.stopPropagation()
	}).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle + ", [role=menu]", Dropdown.prototype.keydown)
}(jQuery); +
function($) {
	"use strict";
	var Modal = function(element, options) {
			this.options = options;
			this.$element = $(element);
			this.$backdrop = this.isShown = null;
			if (this.options.remote) {
				this.$element.load(this.options.remote)
			}
		};
	Modal.DEFAULTS = {
		backdrop: true,
		keyboard: true,
		show: true
	};
	Modal.prototype.toggle = function(_relatedTarget) {
		return this[!this.isShown ? "show" : "hide"](_relatedTarget)
	};
	Modal.prototype.show = function(_relatedTarget) {
		var that = this;
		var e = $.Event("show.bs.modal", {
			relatedTarget: _relatedTarget
		});
		this.$element.trigger(e);
		if (this.isShown || e.isDefaultPrevented()) return;
		this.isShown = true;
		this.escape();
		this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this));
		this.backdrop(function() {
			var transition = $.support.transition && that.$element.hasClass("fade");
			if (!that.$element.parent().length) {
				that.$element.appendTo(document.body)
			}
			that.$element.show();
			if (transition) {
				that.$element[0].offsetWidth
			}
			that.$element.addClass("in").attr("aria-hidden", false);
			that.enforceFocus();
			var e = $.Event("shown.bs.modal", {
				relatedTarget: _relatedTarget
			});
			transition ? that.$element.find(".modal-dialog").one($.support.transition.end, function() {
				that.$element.focus().trigger(e)
			}).emulateTransitionEnd(300) : that.$element.focus().trigger(e)
		})
	};
	Modal.prototype.hide = function(e) {
		if (e) e.preventDefault();
		e = $.Event("hide.bs.modal");
		this.$element.trigger(e);
		if (!this.isShown || e.isDefaultPrevented()) return;
		this.isShown = false;
		this.escape();
		$(document).off("focusin.bs.modal");
		this.$element.removeClass("in").attr("aria-hidden", true).off("click.dismiss.modal");
		$.support.transition && this.$element.hasClass("fade") ? this.$element.one($.support.transition.end, $.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal()
	};
	Modal.prototype.enforceFocus = function() {
		$(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
			if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
				this.$element.focus()
			}
		}, this))
	};
	Modal.prototype.escape = function() {
		if (this.isShown && this.options.keyboard) {
			this.$element.on("keyup.dismiss.bs.modal", $.proxy(function(e) {
				e.which == 27 && this.hide()
			}, this))
		} else if (!this.isShown) {
			this.$element.off("keyup.dismiss.bs.modal")
		}
	};
	Modal.prototype.hideModal = function() {
		var that = this;
		this.$element.hide();
		this.backdrop(function() {
			that.removeBackdrop();
			that.$element.trigger("hidden.bs.modal")
		})
	};
	Modal.prototype.removeBackdrop = function() {
		this.$backdrop && this.$backdrop.remove();
		this.$backdrop = null
	};
	Modal.prototype.backdrop = function(callback) {
		var that = this;
		var animate = this.$element.hasClass("fade") ? "fade" : "";
		if (this.isShown && this.options.backdrop) {
			var doAnimate = $.support.transition && animate;
			this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body);
			this.$element.on("click.dismiss.modal", $.proxy(function(e) {
				if (e.target !== e.currentTarget) return;
				this.options.backdrop == "static" ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)
			}, this));
			if (doAnimate) this.$backdrop[0].offsetWidth;
			this.$backdrop.addClass("in");
			if (!callback) return;
			doAnimate ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback()
		} else if (!this.isShown && this.$backdrop) {
			this.$backdrop.removeClass("in");
			$.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback()
		} else if (callback) {
			callback()
		}
	};
	var old = $.fn.modal;
	$.fn.modal = function(option, _relatedTarget) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data("bs.modal");
			var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == "object" && option);
			if (options.remote) {
				data = null
			}
			if (!data) $this.data("bs.modal", data = new Modal(this, options));
			if (typeof option == "string") data[option](_relatedTarget);
			else if (options.show) data.show(_relatedTarget);
			if (options.postShow) {
				options.postShow();
				$this.find(".alert").hide()
			}
		})
	};
	$.fn.modal.Constructor = Modal;
	$.fn.modal.noConflict = function() {
		$.fn.modal = old;
		return this
	};
	$(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
		var $this = $(this);
		var href = $this.attr("href");
		var $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, ""));
		var option = $target.data("modal") ? "toggle" : $.extend({
			remote: !/#/.test(href) && href
		}, $target.data(), $this.data());
		e.preventDefault();
		$target.modal(option, this).one("hide", function() {
			$this.is(":visible") && $this.focus()
		})
	});
	$(document).on("show.bs.modal", ".modal", function() {
		$(document.body).addClass("modal-open")
	}).on("hidden.bs.modal", ".modal", function() {
		$(document.body).removeClass("modal-open")
	})
}(jQuery); +
function($) {
	"use strict";
	var Tooltip = function(element, options) {
			this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
			this.init("tooltip", element, options)
		};
	Tooltip.DEFAULTS = {
		animation: true,
		placement: "top",
		selector: false,
		template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger: "hover focus",
		title: "",
		delay: 0,
		html: false,
		container: false
	};
	Tooltip.prototype.init = function(type, element, options) {
		this.enabled = true;
		this.type = type;
		this.$element = $(element);
		this.options = this.getOptions(options);
		var triggers = this.options.trigger.split(" ");
		for (var i = triggers.length; i--;) {
			var trigger = triggers[i];
			if (trigger == "click") {
				this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this))
			} else if (trigger != "manual") {
				var eventIn = trigger == "hover" ? "mouseenter" : "focus";
				var eventOut = trigger == "hover" ? "mouseleave" : "blur";
				this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this));
				this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this))
			}
		}
		this.options.selector ? this._options = $.extend({}, this.options, {
			trigger: "manual",
			selector: ""
		}) : this.fixTitle()
	};
	Tooltip.prototype.getDefaults = function() {
		return Tooltip.DEFAULTS
	};
	Tooltip.prototype.getOptions = function(options) {
		options = $.extend({}, this.getDefaults(), this.$element.data(), options);
		if (options.delay && typeof options.delay == "number") {
			options.delay = {
				show: options.delay,
				hide: options.delay
			}
		}
		return options
	};
	Tooltip.prototype.getDelegateOptions = function() {
		var options = {};
		var defaults = this.getDefaults();
		this._options && $.each(this._options, function(key, value) {
			if (defaults[key] != value) options[key] = value
		});
		return options
	};
	Tooltip.prototype.enter = function(obj) {
		var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
		clearTimeout(self.timeout);
		self.hoverState = "in";
		if (!self.options.delay || !self.options.delay.show) return self.show();
		self.timeout = setTimeout(function() {
			if (self.hoverState == "in") self.show()
		}, self.options.delay.show)
	};
	Tooltip.prototype.leave = function(obj) {
		var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
		clearTimeout(self.timeout);
		self.hoverState = "out";
		if (!self.options.delay || !self.options.delay.hide) return self.hide();
		self.timeout = setTimeout(function() {
			if (self.hoverState == "out") self.hide()
		}, self.options.delay.hide)
	};
	Tooltip.prototype.show = function() {
		var e = $.Event("show.bs." + this.type);
		if (this.hasContent() && this.enabled) {
			this.$element.trigger(e);
			if (e.isDefaultPrevented()) return;
			var $tip = this.tip();
			this.setContent();
			if (this.options.animation) $tip.addClass("fade");
			var placement = typeof this.options.placement == "function" ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
			var autoToken = /\s?auto?\s?/i;
			var autoPlace = autoToken.test(placement);
			if (autoPlace) placement = placement.replace(autoToken, "") || "top";
			$tip.detach().css({
				top: 0,
				left: 0,
				display: "block"
			}).addClass(placement);
			this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
			var pos = this.getPosition();
			var actualWidth = $tip[0].offsetWidth;
			var actualHeight = $tip[0].offsetHeight;
			if (autoPlace) {
				var $parent = this.$element.parent();
				var orgPlacement = placement;
				var docScroll = document.documentElement.scrollTop || document.body.scrollTop;
				var parentWidth = this.options.container == "body" ? window.innerWidth : $parent.outerWidth();
				var parentHeight = this.options.container == "body" ? window.innerHeight : $parent.outerHeight();
				var parentLeft = this.options.container == "body" ? 0 : $parent.offset().left;
				placement = placement == "bottom" && pos.top + pos.height + actualHeight - docScroll > parentHeight ? "top" : placement == "top" && pos.top - docScroll - actualHeight < 0 ? "bottom" : placement == "right" && pos.right + actualWidth > parentWidth ? "left" : placement == "left" && pos.left - actualWidth < parentLeft ? "right" : placement;
				$tip.removeClass(orgPlacement).addClass(placement)
			}
			var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
			this.applyPlacement(calculatedOffset, placement);
			this.$element.trigger("shown.bs." + this.type)
		}
	};
	Tooltip.prototype.applyPlacement = function(offset, placement) {
		var replace;
		var $tip = this.tip();
		var width = $tip[0].offsetWidth;
		var height = $tip[0].offsetHeight;
		var marginTop = parseInt($tip.css("margin-top"), 10);
		var marginLeft = parseInt($tip.css("margin-left"), 10);
		if (isNaN(marginTop)) marginTop = 0;
		if (isNaN(marginLeft)) marginLeft = 0;
		offset.top = offset.top + marginTop;
		offset.left = offset.left + marginLeft;
		$tip.offset(offset).addClass("in");
		var actualWidth = $tip[0].offsetWidth;
		var actualHeight = $tip[0].offsetHeight;
		if (placement == "top" && actualHeight != height) {
			replace = true;
			offset.top = offset.top + height - actualHeight
		}
		if (/bottom|top/.test(placement)) {
			var delta = 0;
			if (offset.left < 0) {
				delta = offset.left * -2;
				offset.left = 0;
				$tip.offset(offset);
				actualWidth = $tip[0].offsetWidth;
				actualHeight = $tip[0].offsetHeight
			}
			this.replaceArrow(delta - width + actualWidth, actualWidth, "left")
		} else {
			this.replaceArrow(actualHeight - height, actualHeight, "top")
		}
		if (replace) $tip.offset(offset)
	};
	Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
		this.arrow().css(position, delta ? 50 * (1 - delta / dimension) + "%" : "")
	};
	Tooltip.prototype.setContent = function() {
		var $tip = this.tip();
		var title = this.getTitle();
		$tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title);
		$tip.removeClass("fade in top bottom left right")
	};
	Tooltip.prototype.hide = function() {
		var that = this;
		var $tip = this.tip();
		var e = $.Event("hide.bs." + this.type);

		function complete() {
			if (that.hoverState != "in") $tip.detach()
		}
		this.$element.trigger(e);
		if (e.isDefaultPrevented()) return;
		$tip.removeClass("in");
		$.support.transition && this.$tip.hasClass("fade") ? $tip.one($.support.transition.end, complete).emulateTransitionEnd(150) : complete();
		this.$element.trigger("hidden.bs." + this.type);
		return this
	};
	Tooltip.prototype.fixTitle = function() {
		var $e = this.$element;
		if ($e.attr("title") || typeof $e.attr("data-original-title") != "string") {
			$e.attr("data-original-title", $e.attr("title") || "").attr("title", "")
		}
	};
	Tooltip.prototype.hasContent = function() {
		return this.getTitle()
	};
	Tooltip.prototype.getPosition = function() {
		var el = this.$element[0];
		return $.extend({}, typeof el.getBoundingClientRect == "function" ? el.getBoundingClientRect() : {
			width: el.offsetWidth,
			height: el.offsetHeight
		}, this.$element.offset())
	};
	Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
		return placement == "bottom" ? {
			top: pos.top + pos.height,
			left: pos.left + pos.width / 2 - actualWidth / 2
		} : placement == "top" ? {
			top: pos.top - actualHeight,
			left: pos.left + pos.width / 2 - actualWidth / 2
		} : placement == "left" ? {
			top: pos.top + pos.height / 2 - actualHeight / 2,
			left: pos.left - actualWidth
		} : {
			top: pos.top + pos.height / 2 - actualHeight / 2,
			left: pos.left + pos.width
		}
	};
	Tooltip.prototype.getTitle = function() {
		var title;
		var $e = this.$element;
		var o = this.options;
		title = $e.attr("data-original-title") || (typeof o.title == "function" ? o.title.call($e[0]) : o.title);
		return title
	};
	Tooltip.prototype.tip = function() {
		return this.$tip = this.$tip || $(this.options.template)
	};
	Tooltip.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
	};
	Tooltip.prototype.validate = function() {
		if (!this.$element[0].parentNode) {
			this.hide();
			this.$element = null;
			this.options = null
		}
	};
	Tooltip.prototype.enable = function() {
		this.enabled = true
	};
	Tooltip.prototype.disable = function() {
		this.enabled = false
	};
	Tooltip.prototype.toggleEnabled = function() {
		this.enabled = !this.enabled
	};
	Tooltip.prototype.toggle = function(e) {
		var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
		self.tip().hasClass("in") ? self.leave(self) : self.enter(self)
	};
	Tooltip.prototype.destroy = function() {
		this.hide().$element.off("." + this.type).removeData("bs." + this.type)
	};
	var old = $.fn.tooltip;
	$.fn.tooltip = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data("bs.tooltip");
			var options = typeof option == "object" && option;
			if (!data) $this.data("bs.tooltip", data = new Tooltip(this, options));
			if (typeof option == "string") data[option]()
		})
	};
	$.fn.tooltip.Constructor = Tooltip;
	$.fn.tooltip.noConflict = function() {
		$.fn.tooltip = old;
		return this
	}
}(jQuery); +
function($) {
	"use strict";
	var Popover = function(element, options) {
			this.init("popover", element, options)
		};
	if (!$.fn.tooltip) throw new Error("Popover requires tooltip.js");
	Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
		placement: "right",
		trigger: "click",
		content: "",
		template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	});
	Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
	Popover.prototype.constructor = Popover;
	Popover.prototype.getDefaults = function() {
		return Popover.DEFAULTS
	};
	Popover.prototype.setContent = function() {
		var $tip = this.tip();
		var title = this.getTitle();
		var content = this.getContent();
		$tip.find(".popover-title")[this.options.html ? "html" : "text"](title);
		$tip.find(".popover-content")[this.options.html ? "html" : "text"](content);
		$tip.removeClass("fade top bottom left right in");
		if (!$tip.find(".popover-title").html()) $tip.find(".popover-title").hide()
	};
	Popover.prototype.hasContent = function() {
		return this.getTitle() || this.getContent()
	};
	Popover.prototype.getContent = function() {
		var $e = this.$element;
		var o = this.options;
		return $e.attr("data-content") || (typeof o.content == "function" ? o.content.call($e[0]) : o.content)
	};
	Popover.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".arrow")
	};
	Popover.prototype.tip = function() {
		if (!this.$tip) this.$tip = $(this.options.template);
		return this.$tip
	};
	var old = $.fn.popover;
	$.fn.popover = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data("bs.popover");
			var options = typeof option == "object" && option;
			if (!data) $this.data("bs.popover", data = new Popover(this, options));
			if (typeof option == "string") data[option]()
		})
	};
	$.fn.popover.Constructor = Popover;
	$.fn.popover.noConflict = function() {
		$.fn.popover = old;
		return this
	}
}(jQuery); +
function($) {
	"use strict";

	function ScrollSpy(element, options) {
		var href;
		var process = $.proxy(this.process, this);
		this.$element = $(element).is("body") ? $(window) : $(element);
		this.$body = $("body");
		this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", process);
		this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
		this.selector = (this.options.target || (href = $(element).attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a";
		this.offsets = $([]);
		this.targets = $([]);
		this.activeTarget = null;
		this.refresh();
		this.process()
	}
	ScrollSpy.DEFAULTS = {
		offset: 10
	};
	ScrollSpy.prototype.refresh = function() {
		var offsetMethod = this.$element[0] == window ? "offset" : "position";
		this.offsets = $([]);
		this.targets = $([]);
		var self = this;
		var $targets = this.$body.find(this.selector).map(function() {
			var $el = $(this);
			var href = $el.data("target") || $el.attr("href");
			var $href = /^#\w/.test(href) && $(href);
			return $href && $href.length && [
				[$href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]
			] || null
		}).sort(function(a, b) {
			return a[0] - b[0]
		}).each(function() {
			self.offsets.push(this[0]);
			self.targets.push(this[1])
		})
	};
	ScrollSpy.prototype.process = function() {
		var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
		var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight;
		var maxScroll = scrollHeight - this.$scrollElement.height();
		var offsets = this.offsets;
		var targets = this.targets;
		var activeTarget = this.activeTarget;
		var i;
		if (scrollTop >= maxScroll) {
			return activeTarget != (i = targets.last()[0]) && this.activate(i)
		}
		for (i = offsets.length; i--;) {
			activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i])
		}
	};
	ScrollSpy.prototype.activate = function(target) {
		this.activeTarget = target;
		$(this.selector).parents(".active").removeClass("active");
		var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
		var active = $(selector).parents("li").addClass("active");
		if (active.parent(".dropdown-menu").length) {
			active = active.closest("li.dropdown").addClass("active")
		}
		active.trigger("activate")
	};
	var old = $.fn.scrollspy;
	$.fn.scrollspy = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data("bs.scrollspy");
			var options = typeof option == "object" && option;
			if (!data) $this.data("bs.scrollspy", data = new ScrollSpy(this, options));
			if (typeof option == "string") data[option]()
		})
	};
	$.fn.scrollspy.Constructor = ScrollSpy;
	$.fn.scrollspy.noConflict = function() {
		$.fn.scrollspy = old;
		return this
	};
	$(window).on("load", function() {
		$('[data-spy="scroll"]').each(function() {
			var $spy = $(this);
			$spy.scrollspy($spy.data())
		})
	})
}(jQuery); +
function($) {
	"use strict";
	var Tab = function(element) {
			this.element = $(element)
		};
	Tab.prototype.show = function() {
		var $this = this.element;
		var $ul = $this.closest("ul:not(.dropdown-menu)");
		var selector = $this.data("target");
		if (!selector) {
			selector = $this.attr("href");
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")
		}
		if ($this.parent("li").hasClass("active")) return;
		var previous = $ul.find(".active:last a")[0];
		var e = $.Event("show.bs.tab", {
			relatedTarget: previous
		});
		$this.trigger(e);
		if (e.isDefaultPrevented()) return;
		var $target = $(selector);
		this.activate($this.parent("li"), $ul);
		this.activate($target, $target.parent(), function() {
			$this.trigger({
				type: "shown.bs.tab",
				relatedTarget: previous
			})
		})
	};
	Tab.prototype.activate = function(element, container, callback) {
		var $active = container.find("> .active");
		var transition = callback && $.support.transition && $active.hasClass("fade");

		function next() {
			$active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
			element.addClass("active");
			if (transition) {
				element[0].offsetWidth;
				element.addClass("in")
			} else {
				element.removeClass("fade")
			}
			if (element.parent(".dropdown-menu")) {
				element.closest("li.dropdown").addClass("active")
			}
			callback && callback()
		}
		transition ? $active.one($.support.transition.end, next).emulateTransitionEnd(150) : next();
		$active.removeClass("in")
	};
	var old = $.fn.tab;
	$.fn.tab = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data("bs.tab");
			if (!data) $this.data("bs.tab", data = new Tab(this));
			if (typeof option == "string") data[option]()
		})
	};
	$.fn.tab.Constructor = Tab;
	$.fn.tab.noConflict = function() {
		$.fn.tab = old;
		return this
	};
	$(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
		e.preventDefault();
		$(this).tab("show")
	})
}(jQuery); +
function($) {
	"use strict";
	var Affix = function(element, options) {
			this.options = $.extend({}, Affix.DEFAULTS, options);
			this.$window = $(window).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this));
			this.$element = $(element);
			this.affixed = this.unpin = null;
			this.checkPosition()
		};
	Affix.RESET = "affix affix-top affix-bottom";
	Affix.DEFAULTS = {
		offset: 0
	};
	Affix.prototype.checkPositionWithEventLoop = function() {
		setTimeout($.proxy(this.checkPosition, this), 1)
	};
	Affix.prototype.checkPosition = function() {
		if (!this.$element.is(":visible")) return;
		var scrollHeight = $(document).height();
		var scrollTop = this.$window.scrollTop();
		var position = this.$element.offset();
		var offset = this.options.offset;
		var offsetTop = offset.top;
		var offsetBottom = offset.bottom;
		if (typeof offset != "object") offsetBottom = offsetTop = offset;
		if (typeof offsetTop == "function") offsetTop = offset.top();
		if (typeof offsetBottom == "function") offsetBottom = offset.bottom();
		var affix = this.unpin != null && scrollTop + this.unpin <= position.top ? false : offsetBottom != null && position.top + this.$element.height() >= scrollHeight - offsetBottom ? "bottom" : offsetTop != null && scrollTop <= offsetTop ? "top" : false;
		if (this.affixed === affix) return;
		if (this.unpin) this.$element.css("top", "");
		this.affixed = affix;
		this.unpin = affix == "bottom" ? position.top - scrollTop : null;
		this.$element.removeClass(Affix.RESET).addClass("affix" + (affix ? "-" + affix : ""));
		if (affix == "bottom") {
			this.$element.offset({
				top: document.body.offsetHeight - offsetBottom - this.$element.height()
			})
		}
	};
	var old = $.fn.affix;
	$.fn.affix = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data("bs.affix");
			var options = typeof option == "object" && option;
			if (!data) $this.data("bs.affix", data = new Affix(this, options));
			if (typeof option == "string") data[option]()
		})
	};
	$.fn.affix.Constructor = Affix;
	$.fn.affix.noConflict = function() {
		$.fn.affix = old;
		return this
	};
	$(window).on("load", function() {
		$('[data-spy="affix"]').each(function() {
			var $spy = $(this);
			var data = $spy.data();
			data.offset = data.offset || {};
			if (data.offsetBottom) data.offset.bottom = data.offsetBottom;
			if (data.offsetTop) data.offset.top = data.offsetTop;
			$spy.affix(data)
		})
	})
}(jQuery);
var ObjectId = function() {
		var increment = 0;
		var pid = Math.floor(Math.random() * 32767);
		var machine = Math.floor(Math.random() * 16777216);
		if (typeof localStorage != "undefined") {
			var mongoMachineId = parseInt(localStorage["mongoMachineId"]);
			if (mongoMachineId >= 0 && mongoMachineId <= 16777215) {
				machine = Math.floor(localStorage["mongoMachineId"])
			}
			localStorage["mongoMachineId"] = machine;
			document.cookie = "mongoMachineId=" + machine + ";expires=Tue, 19 Jan 2038 05:00:00 GMT"
		} else {
			var cookieList = document.cookie.split("; ");
			for (var i in cookieList) {
				var cookie = cookieList[i].split("=");
				if (cookie[0] == "mongoMachineId" && cookie[1] >= 0 && cookie[1] <= 16777215) {
					machine = cookie[1];
					break
				}
			}
			document.cookie = "mongoMachineId=" + machine + ";expires=Tue, 19 Jan 2038 05:00:00 GMT"
		}
		function ObjId() {
			if (!(this instanceof ObjectId)) {
				return new ObjectId(arguments[0], arguments[1], arguments[2], arguments[3]).toString()
			}
			if (typeof arguments[0] == "object") {
				this.timestamp = arguments[0].timestamp;
				this.machine = arguments[0].machine;
				this.pid = arguments[0].pid;
				this.increment = arguments[0].increment
			} else if (typeof arguments[0] == "string" && arguments[0].length == 24) {
				this.timestamp = Number("0x" + arguments[0].substr(0, 8)), this.machine = Number("0x" + arguments[0].substr(8, 6)), this.pid = Number("0x" + arguments[0].substr(14, 4)), this.increment = Number("0x" + arguments[0].substr(18, 6))
			} else if (arguments.length == 4 && arguments[0] != null) {
				this.timestamp = arguments[0];
				this.machine = arguments[1];
				this.pid = arguments[2];
				this.increment = arguments[3]
			} else {
				this.timestamp = Math.floor((new Date).valueOf() / 1e3);
				this.machine = machine;
				this.pid = pid;
				this.increment = increment++;
				if (increment > 16777215) {
					increment = 0
				}
			}
		}
		return ObjId
	}();
ObjectId.prototype.getDate = function() {
	return new Date(this.timestamp * 1e3)
};
ObjectId.prototype.toArray = function() {
	var strOid = this.toString();
	var array = [];
	var i;
	for (i = 0; i < 12; i++) {
		array[i] = parseInt(strOid.slice(i * 2, i * 2 + 2), 16)
	}
	return array
};
ObjectId.prototype.toString = function() {
	var timestamp = this.timestamp.toString(16);
	var machine = this.machine.toString(16);
	var pid = this.pid.toString(16);
	var increment = this.increment.toString(16);
	return "00000000".substr(0, 8 - timestamp.length) + timestamp + "000000".substr(0, 6 - machine.length) + machine + "0000".substr(0, 4 - pid.length) + pid + "000000".substr(0, 6 - increment.length) + increment
};