function trimLeft(t, e) {
	if (!e || " " == e) return $.trim(t);
	for (; 0 == t.indexOf(e);) t = t.substring(e.length);
	return t
}
function json(str) {
	return eval("(" + str + ")")
}
function t() {
	var t = arguments;
	if (t.length <= 1) return t[0];
	var e = t[0];
	if (!e) return e;
	var n = "LEAAEL";
	e = e.replace(/\?/g, n);
	for (var o = 1; o <= t.length; ++o) e = e.replace(n, t[o]);
	return e
}
function arrayEqual(t, e) {
	return t = t || [], e = e || [], t.join(",") == e.join(",")
}
function isArray(t) {
	return "[object Array]" === Object.prototype.toString.call(t)
}
function isEmpty(t) {
	return t ? isArray(t) && 0 == t.length ? !0 : !1 : !0
}
function getFormJsonData(t) {
	var e = formArrDataToJson($("#" + t).serializeArray());
	return e
}
function formArrDataToJson(t) {
	var e = {},
		n = {};
	for (var o in t) {
		var r = t[o].name,
			i = t[o].value;
		"[]" != r.substring(r.length - 2, r.length) ? e[r] = i : (r = r.substring(0, r.length - 2), void 0 == n[r] ? n[r] = [i] : n[r].push(i))
	}
	return $.extend(e, n)
}
function formSerializeDataToJson(t) {
	for (var e = t.split("&"), n = {}, o = {}, r = 0; r < e.length; ++r) {
		var i = e[r].split("="),
			a = decodeURI(i[0]),
			s = decodeURI(i[1]);
		"[]" != a.substring(a.length - 2, a.length) ? n[a] = s : (a = a.substring(0, a.length - 2), void 0 == o[a] ? o[a] = [s] : o[a].push(s))
	}
	return $.extend(n, o)
}
function _ajaxCallback(t, e, n) {
	if (t === !0 || "true" == t || "object" == typeof t) {
		console.log("第一个")
		if (t && "object" == typeof t && "NOTLOGIN" == t.Msg) return void alert(getMsg("Please sign in firstly!"));
		"function" == typeof e && e(t)
	} else "function" == typeof n ? n(t) : alert("error!")
}
function csrfSafeMethod(method){
	return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function _ajax(t, e, n, o, r, i) {
	return i = "undefined" == typeof i ? !0 : !1, $.ajax({
		type: t,
		url: e,
		data: n,
		async: i,
		beforeSend: function (xhr, settings){
			var csrftoken = $("[name=csrfmiddlewaretoken]").val();
			if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                console.log("setting X-CSRFToken")
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
		},
		success: function(t) {
			_ajaxCallback(t, o, r)
		},
		error: function(t) {
			_ajaxCallback(t, o, r)
		}
	})
}
function ajaxGet(t, e, n, o, r) {
	return _ajax("GET", t, e, n, o, r)
}
function ajaxPost(t, e, n, o, r) {
    console.log("post")
	_ajax("POST", t, e, n, o, r)
}
function ajaxPut(t, e, n, o, r) {
	console.log("61 line ", n)
    console.log("put")
	_ajax("PUT", t, e, n, o, r)
}

function ajaxDelete(t, e, n, o, r){
	console.log("line96,准备删除")
	_ajax("Delete", t, e, n, o, r)
}

function ajaxPostJson(t, e, n, o, r) {
	r = "undefined" == typeof r ? !0 : !1, $.ajax({
		url: t,
		type: "POST",
		contentType: "application/json; charset=utf-8",
		datatype: "json",
		async: r,
		data: JSON.stringify(e),
		success: function(t) {
			_ajaxCallback(t, n, o)
		},
		error: function(t) {
			_ajaxCallback(t, n, o)
		}
	})
}

function findParents(t, e) {
	if ($(t).is(e)) return $(t);
	for (var n = $(t).parents(), o = 0; o < n.length; ++o) if (log(n.eq(o)), n.eq(o).is(e)) return n.seq(o);
	return null
}
function getVendorPrefix() {
	for (var t = document.body || document.documentElement, e = t.style, n = ["webkit", "khtml", "moz", "ms", "o"], o = 0; o < n.length;) {
		if ("string" == typeof e[n[o] + "Transition"]) return n[o];
		o++
	}
}
function switchEditor(t) {
	LEA.isM = t, t ? ($("#mdEditor").css("z-index", 3).show(), $("#leanoteNav").hide()) : ($("#editor").show(), $("#mdEditor").css("z-index", 1).hide(), $("#leanoteNav").show())
}
function setEditorContent(t, e, n, o) {
	if (t || (t = ""), clearIntervalForSetContent && clearInterval(clearIntervalForSetContent), e) MD ? (MD.setContent(t), MD.clearUndo && MD.clearUndo(), o && o()) : clearIntervalForSetContent = setTimeout(function() {
		setEditorContent(t, !0, !1, o)
	}, 100);
	else if ("undefined" != typeof tinymce && tinymce.activeEditor) {
		var r = tinymce.activeEditor;
		r.setContent(t), o && o(), r.undoManager.clear()
	} else clearIntervalForSetContent = setTimeout(function() {
		setEditorContent(t, !1, !1, o)
	}, 100)
}
function previewIsEmpty(t) {
	return t && t.substr(0, previewToken.length) != previewToken ? !1 : !0
}
function isAceError(t) {
	return t ? -1 != t.indexOf("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX") : !1
}
function getEditorContent(t) {
	var e = _getEditorContent(t);
	return '<p><br data-mce-bogus="1"></p>' === e ? "<p><br></p>" : e
}
function _getEditorContent(t) {
	if (t) return [MD.getContent(), "<div>" + $("#preview-contents").html() + "</div>"];
	var e = tinymce.activeEditor;
	if (e) {
		var n = $(e.getBody()).clone();
		if (n.find(".toggle-raw").remove(), window.LeaAce && LeaAce.getAce) for (var o = n.find("pre"), r = 0; r < o.length; ++r) {
			var i = o.eq(r),
				a = i.attr("id"),
				s = LeaAce.getAce(a);
			if (s) {
				var l = s.getValue();
				isAceError(l) && (l = i.html()), l = l.replace(/</g, "&lt").replace(/>/g, "&gt"), i.removeAttr("style", "").removeAttr("contenteditable").removeClass("ace_editor"), i.html(l)
			}
		}
		if (n.find("pinit").remove(), n.find(".thunderpin").remove(), n.find(".pin").parent().remove(), n = $(n).html()) for (;;) {
			var c = n.lastIndexOf("</script>");
			if (-1 == c) return n;
			var u = n.length;
			if (u - 9 != c) return n;
			var f = n.lastIndexOf("<script ");
			if (-1 == f && (f = n.lastIndexOf("<script>")), -1 == f) return n;
			n = n.substring(0, f)
		}
		return n
	}
}
function disableEditor() {
	var t = tinymce.activeEditor;
	t && (t.hide(), LEA.editorStatus = !1, $("#mceTollbarMark").show().css("z-index", 1e3))
}
function enableEditor() {
	if (!LEA.editorStatus) {
		$("#mceTollbarMark").css("z-index", -1).hide();
		var t = tinymce.activeEditor;
		t && t.show()
	}
}
function showDialog(t, e) {
	$("#leanoteDialog #modalTitle").html(e.title), $("#leanoteDialog .modal-body").html($("#" + t + " .modal-body").html()), $("#leanoteDialog .modal-footer").html($("#" + t + " .modal-footer").html()), delete e.title, e.show = !0, $("#leanoteDialog").modal(e)
}
function hideDialog(t) {
	t || (t = 0), setTimeout(function() {
		$("#leanoteDialog").modal("hide")
	}, t)
}
function closeDialog() {
	$(".modal").modal("hide")
}
function showDialog2(t, e) {
	e = e || {}, e.show = !0, $(t).modal(e)
}
function hideDialog2(t, e) {
	e || (e = 0), setTimeout(function() {
		$(t).modal("hide")
	}, e)
}
function showDialogRemote(t, e) {
	e = e || {}, t += "?";
	for (var n in e) t += n + "=" + e[n] + "&";
	$("#leanoteDialogRemote").modal({
		remote: t
	})
}
function hideDialogRemote(t) {
	t ? setTimeout(function() {
		$("#leanoteDialogRemote").modal("hide")
	}, t) : $("#leanoteDialogRemote").modal("hide")
}
function notifyInfo(t) {
	$.pnotify({
		title: "通知",
		text: t,
		type: "info",
		styling: "bootstrap"
	})
}
function notifyError(t) {
	$.pnotify.defaults.delay = 2e3, $.pnotify({
		title: "通知",
		text: t,
		type: "error",
		styling: "bootstrap"
	})
}
function notifySuccess(t) {
	$.pnotify({
		title: "通知",
		text: t,
		type: "success",
		styling: "bootstrap"
	})
}
function goNowToDatetime(t) {
	if (!t) return "";
	if ("object" == typeof t) try {
		return t.format("yyyy-M-d hh:mm:ss")
	} catch (e) {
		return getCurDate()
	}
	return t.substr(0, 10) + " " + t.substr(11, 8)
}
function getCurDate() {
	return (new Date).format("yyyy-M-d")
}
function enter(t, e, n) {
	t || (t = "body"), $(t).on("keydown", e, function(t) {
		13 == t.keyCode && n.call(this)
	})
}
function enterBlur(t, e) {
	t || (t = "body"), e || (e = t, t = "body"), $(t).on("keydown", e, function(t) {
		13 == t.keyCode && $(this).trigger("blur")
	})
}
function getObjectId() {
	return ObjectId()
}
function resizeEditor() {
	return void(LEA.isM && MD && MD.resize && MD.resize())
}
function showMsg(t, e) {
	$("#msg").html(t), e && setTimeout(function() {
		$("#msg").html("")
	}, e)
}
function showMsg2(t, e, n) {
	$(t).html(e), n && setTimeout(function() {
		$(t).html("")
	}, n)
}
function showAlert(t, e, n, o) {
	$(t).html(e).removeClass("alert-danger").removeClass("alert-success").removeClass("alert-warning").addClass("alert-" + n).show(), o && $(o).focus()
}
function hideAlert(t, e) {
	e ? setTimeout(function() {
		$(t).hide()
	}, e) : $(t).hide()
}
function post(t, e, n, o) {
	o && $(o).button("loading"), ajaxPost(t, e, function(t) {
		o && $(o).button("reset"), "object" == typeof t ? "function" == typeof n && n(t) : alert("leanote出现了错误!")
	})
}
function isEmail(t) {
	var e = /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9\-]+@([a-zA-Z0-9\-]+[_|\_|\.|\-]?)*[a-zA-Z0-9\-]+\.[0-9a-zA-Z]{2,3}$/;
	return e.test(t)
}
function isEmailFromInput(t, e, n, o) {
	var r = $(t).val(),
		i = function() {};
	if (e && (i = function(e, n) {
		showAlert(e, n, "danger", t)
	}), r) {
		if (isEmail(r)) return r;
		i(e, o || getMsg("errorEmail"))
	} else i(e, n || getMsg("inputEmail"))
}
function initCopy(t, e) {
	var n = new ZeroClipboard(document.getElementById(t), {
		moviePath: "/js/ZeroClipboard/ZeroClipboard.swf"
	});
	n.on("complete", function(t, n) {
		e(n)
	})
}
function showLoading() {
	$("#loading").css("visibility", "visible")
}
function hideLoading() {
	$("#loading").css("visibility", "hidden")
}
function setCookie(t, e, n) {
	var o = new Date;
	o.setDate(o.getDate() + n), document.cookie = t + "=" + escape(e) + (null == n ? "" : ";expires=" + o.toGMTString()) + ";domain=leanote.com;path=/", document.cookie = t + "=" + escape(e) + (null == n ? "" : ";expires=" + o.toGMTString()) + ";domain=leanote.com;path=/note", document.cookie = t + "=" + escape(e) + (null == n ? "" : ";expires=" + o.toGMTString())
}
function logout() {
	Note.curChangedSaveIt(!0), LEA.isLogout = !0, setCookie("LEANOTE_SESSION", "", -1),location.href = "/api-auth/login/?next=/note/index" /*location.href = "/logout?id=1"*/
}
function getImageSize(t, e) {
	function n(t, n) {
		o.parentNode.removeChild(o), e({
			width: t,
			height: n
		})
	}
	var o = document.createElement("img");
	o.onload = function() {
		n(o.clientWidth, o.clientHeight)
	}, o.onerror = function() {
		n()
	}, o.src = t;
	var r = o.style;
	r.visibility = "hidden", r.position = "fixed", r.bottom = r.left = 0, r.width = r.height = "auto", document.body.appendChild(o)
}
function hiddenIframeBorder() {
	$(".mce-window iframe").attr("frameborder", "no").attr("scrolling", "no")
}
function getEmailLoginAddress(t) {
	if (t) {
		var e = t.split("@");
		if (e && !(e.length < 2)) {
			var n = e[1];
			return email2LoginAddress[n] || "http://mail." + n
		}
	}
}
function reIsOk(t) {
	return t && "object" == typeof t && t.Ok
}
function saveBookmark() {
	try {
		if (LEA.bookmark = tinymce.activeEditor.selection.getBookmark(), LEA.bookmark && LEA.bookmark.id) {
			var t = $($("#editorContent_ifr").contents()),
				e = t.find("body"),
				n = e.children().eq(0);
			if (n.is("span")) {
				var o = n,
					r = o.eq(0);
				r.attr("id") == LEA.bookmark.id + "_start" ? (LEA.hasBookmark = !1, r.remove()) : LEA.hasBookmark = !0
			} else if (n.is("p")) {
				var o = n.children();
				if (1 == o.length && "" == $.trim(n.text())) {
					var r = o.eq(0);
					r.attr("id") == LEA.bookmark.id + "_start" ? (LEA.hasBookmark = !1, n.remove()) : LEA.hasBookmark = !0
				} else LEA.hasBookmark = !0
			}
		}
	} catch (i) {}
}
function restoreBookmark() {
	try {
		if (LEA.hasBookmark) {
			var t = tinymce.activeEditor;
			t.focus(), t.selection.moveToBookmark(LEA.bookmark)
		}
	} catch (e) {}
}
function getHashObject() {
	var t = location.hash;
	if (!t) return {};
	for (var e = t.substr(1), n = e.split("&"), o = {}, r = 0; r < n.length; ++r) {
		var i = n[r].split("=");
		2 == i.length && (o[i[0]] = i[1])
	}
	return o
}
function getHash(t) {
	var e = getHashObject();
	return e[t]
}
function setHash(t, e) {
	var n = location.hash;
	if (!n) return void(location.href = "#" + t + "=" + e);
	var o = getHashObject();
	o[t] = e;
	var r = "";
	for (var i in o) o[i] && (r && (r += "&"), r += i + "=" + o[i]);
	location.href = "#" + r
}
if ("undefined" == typeof LEA) var LEA = {};
var Notebook = {
	cache: {}
},
	Note = {
		cache: {}
	},
	Tag = {},
	Notebook = {},
	Share = {},
	Mobile = {},
	LeaAce = {},
	Converter, MarkdownEditor, ScrollLink, MD;
$.extend(LEA, {
	_eventCallbacks: {},
	_listen: function(t, e) {
		var n = this._eventCallbacks[t] || (this._eventCallbacks[t] = []);
		n.push(e)
	},
	on: function(t, e) {
		for (var n = t.split(/\s+/), o = 0; o < n.length; ++o) this._listen(n[o], e);
		return this
	},
	off: function(t, e) {
		var n, o, r, i, a = t.split(/\s+/);
		for (n = 0; n < a.length; n++) if (r = this._eventCallbacks[a[n].toLowerCase()]) {
			for (i = null, o = 0; o < r.length; o++) r[o] == e && (i = o);
			null !== i && r.splice(i, 1)
		}
	},
	trigger: function(t, e) {
		var n = this._eventCallbacks[t] || [];
		if (0 !== n.length) for (var o = 0; o < n.length; o++) n[o].call(this, e)
	}
});
var tt = t;
LEA.isM = !1, LEA.isMarkdownEditor = function() {
	return LEA.isM
};
var previewToken = "<div style='display: none'>FORTOKEN</div>",
	clearIntervalForSetContent;
LEA.editorStatus = !0, $(function() {
	$.pnotify && ($.pnotify.defaults.delay = 1e3)
}), Date.prototype.format = function(t) {
	var e = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		S: this.getMilliseconds()
	};
	/(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
	for (var n in e) new RegExp("(" + n + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[n] : ("00" + e[n]).substr(("" + e[n]).length)));
	return t
};
var email2LoginAddress = {
	"qq.com": "http://mail.qq.com",
	"gmail.com": "http://mail.google.com",
	"sina.com": "http://mail.sina.com.cn",
	"163.com": "http://mail.163.com",
	"126.com": "http://mail.126.com",
	"yeah.net": "http://www.yeah.net/",
	"sohu.com": "http://mail.sohu.com/",
	"tom.com": "http://mail.tom.com/",
	"sogou.com": "http://mail.sogou.com/",
	"139.com": "http://mail.10086.cn/",
	"hotmail.com": "http://www.hotmail.com",
	"live.com": "http://login.live.com/",
	"live.cn": "http://login.live.cn/",
	"live.com.cn": "http://login.live.com.cn",
	"189.com": "http://webmail16.189.cn/webmail/",
	"yahoo.com.cn": "http://mail.cn.yahoo.com/",
	"yahoo.cn": "http://mail.cn.yahoo.com/",
	"eyou.com": "http://www.eyou.com/",
	"21cn.com": "http://mail.21cn.com/",
	"188.com": "http://www.188.com/",
	"foxmail.com": "http://mail.foxmail.com"
};
LEA.bookmark = null, LEA.hasBookmark = !1;
var vd = {
	isInt: function(t) {
		var e = /^0$|^[1-9]\d*$/;
		return result = e.test(t)
	},
	isNumeric: function(t) {
		return $.isNumeric(t)
	},
	isFloat: function(t) {
		var e = /^0(\.\d+)?$|^[1-9]\d*(\.\d+)?$/;
		return result = e.test(t)
	},
	isEmail: function(t) {
		var e = /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9\-]+@([a-zA-Z0-9\-]+[_|\_|\.|\-]?)*[a-zA-Z0-9\-]+\.[0-9a-zA-Z]{2,3}$/;
		return result = e.test(t)
	},
	isBlank: function(t) {
		return !$.trim(t)
	},
	has_special_chars: function(t) {
		return /['"#$%&\^<>\?*]/.test(t)
	},
	init: function(form, rule_funcs) {
		function is_required(t) {
			var e = get_name(t),
				n = get_rules(t, e),
				o = n[0];
			return "required" == o.rule ? !0 : !1
		}
		function get_rules(target, name) {
			return rules[name] || (rules[name] = eval("(" + target.data("rules") + ")")), rules[name]
		}
		function get_msg_target(t, e) {
			if (!msg_targets[e]) {
				var n = t.data("msg_target");
				if (n) msg_targets[e] = $(n);
				else {
					var o = $('<div class="help-block alert alert-warning" style="display: block;"></div>');
					t.parent().append(o), msg_targets[e] = o
				}
			}
			return msg_targets[e]
		}
		function hide_msg(t, e) {
			var n = get_msg_target(t, e);
			n.hasClass("alert-success") || n.hide()
		}
		function show_msg(t, e, n, o) {
			var r = get_msg_target(t, e);
			r.html(getMsg(n, o)).removeClass("hide alert-success").addClass("alert-danger").show()
		}
		function pre_fix(t) {
			var e = t.data("pre_fix");
			if (e) switch (e) {
			case "int":
				int_fix(t);
				break;
			case "price":
				price_fix(t);
				break;
			case "decimal":
				decimal_fix(t)
			}
		}
		function apply_rules(t, e) {
			var n = get_rules(t, e);
			if (pre_fix(t), !n) return !0;
			for (var o = 0; o < n.length; ++o) {
				var r = n[o],
					i = r.rule,
					a = r.msg,
					s = r.msgData;
				if (!rule_funcs[i](t, r)) return show_msg(t, e, a, s), !1
			}
			hide_msg(t, e);
			var l = t.data("post_rule");
			return l && setTimeout(function() {
				var t = $(l);
				apply_rules(t, get_name(t))
			}, 0), !0
		}
		function focus_func(t) {
			var e = $(t.target),
				n = get_name(e);
			hide_msg(e, n), pre_fix(e)
		}
		function unfocus_func(t) {
			var e = $(t.target),
				n = get_name(e);
			apply_rules(e, n)
		}
		function get_name(t) {
			return t.data("u_name") || t.attr("name") || t.attr("id")
		}
		var get_val = function(t) {
				if (t.is(":checkbox")) {
					var e = t.attr("name"),
						n = $('input[name="' + e + '"]:checked').length;
					return n
				}
				return t.is(":radio") ? void 0 : t.val()
			},
			default_rule_funcs = {
				required: function(t) {
					return get_val(t)
				},
				min: function(t, e) {
					var n = get_val(t);
					return ("" !== n || is_required(t)) && n < e.data ? !1 : !0
				},
				minLength: function(t, e) {
					var n = get_val(t);
					return ("" !== n || is_required(t)) && n.length < e.data ? !1 : !0
				},
				email: function(t) {
					var e = get_val(t);
					return "" !== e || is_required(t) ? vd.isEmail(e) : !0
				},
				noSpecialChars: function(t) {
					var e = get_val(t);
					return e && /[^0-9a-zzA-Z_\-]/.test(e) ? !1 : !0
				},
				password: function(t) {
					var e = get_val(t);
					return "" !== e || is_required(t) ? e.length >= 6 : !0
				},
				equalTo: function(t, e) {
					var n = get_val(t);
					return "" !== n || is_required(t) ? $(e.data).val() == n : !0
				}
			};
		rule_funcs = rule_funcs || {}, rule_funcs = $.extend(default_rule_funcs, rule_funcs);
		var rules = {},
			msg_targets = {},
			$allElems = $(form).find("[data-rules]"),
			$form = $(form);
		$form.on({
			keyup: function(t) {
				13 != t.keyCode && focus_func(t)
			},
			blur: unfocus_func
		}, 'input[type="text"], input[type="password"]'), $form.on({
			change: function(t) {
				$(this).val() ? focus_func(t) : unfocus_func(t)
			}
		}, "select"), $form.on({
			change: function(t) {
				unfocus_func(t)
			}
		}, 'input[type="checkbox"]'), this.valid = function() {
			for (var t = $allElems, e = !0, n = 0; n < t.length; ++n) {
				var o = t.eq(n),
					r = get_name(o);
				if (!apply_rules(o, r)) return e = !1, o.focus(), !1
			}
			return e
		}, this.validElement = function(t) {
			for (var t = $(t), e = !0, n = 0; n < t.length; ++n) {
				var o = t.eq(n),
					r = get_name(o);
				apply_rules(o, r) || (e = !1)
			}
			return e
		}
	}
},
	trimTitle = function(t) {
		return t && "string" == typeof t ? t.replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""
	};
Note.curNoteId = "", Note.interval = "", Note.itemIsBlog = '<div class="item-blog"><i class="fa fa-bold" title="blog"></i></div><div class="item-setting"><i class="fa fa-cog" title="setting"></i></div>', Note.itemTplNoImg = '<li href="#" class="item ?" data-seq="?" noteId="?">', Note.itemTplNoImg += Note.itemIsBlog + '<div class="item-desc"><p class="item-title">?</p><p class="item-info"><i class="fa fa-book"></i> <span class="note-notebook">?</span> <i class="fa fa-clock-o"></i> <span class="updated-time">?</span></p><p class="desc">?</p></div></li>', Note.itemTpl = '<li href="#" class="item ? item-image" data-seq="?" noteId="?"><div class="item-thumb" style=""><img src="?"/></div>', Note.itemTpl += Note.itemIsBlog + '<div class="item-desc" style=""><p class="item-title">?</p><p class="item-info"><i class="fa fa-book"></i> <span class="note-notebook">?</span> <i class="fa fa-clock-o"></i> <span class="updated-time">?</span></p><p class="desc">?</p></div></li>', Note.newItemTpl = '<li href="#" class="item item-active ?" data-seq="?" fromUserId="?" noteId="?">', Note.newItemTpl += Note.itemIsBlog + '<div class="item-desc" style="right: 0px;"><p class="item-title">?</p><p class="item-info"><i class="fa fa-book"></i> <span class="note-notebook">?</span> <i class="fa fa-clock-o"></i> <span class="updated-time">?</span></p><p class="desc">?</p></div></li>', Note.noteItemListO = $("#noteItemList"), Note.cacheByNotebookId = {
	all: {}
}, Note.notebookIds = {}, Note.isReadOnly = !1, Note.intervalTime = 0, Note.intervalTime = 1e4, Note.startInterval = function() {
	clearInterval(Note.interval), Note.interval = setInterval(function() {
		log("自动保存开始..."), Note.curChangedSaveIt()
	}, Note.intervalTime)
}, Note.stopInterval = function() {
	clearInterval(Note.interval), setTimeout(function() {
		Note.startInterval()
	}, Note.intervalTime)
}, Note.addNoteCache = function(t) {
	Note.cache[t.NoteId] = t, Note.clearCacheByNotebookId(t.NotebookId)
}, Note.setNoteCache = function(t, e) {
	Note.cache[t.NoteId] ? $.extend(Note.cache[t.NoteId], t) : Note.cache[t.NoteId] = t, void 0 == e && (e = !0), e && Note.clearCacheByNotebookId(t.NotebookId)
}, Note.setCurNoteId = function(t) {
	this.curNoteId = t
}, Note.clearCurNoteId = function() {
	this.curNoteId = null
}, Note.getCurNote = function() {
	var t = this;
	return "" == t.curNoteId ? null : t.cache[t.curNoteId]
}, Note.getNote = function(t) {
	var e = this;
	return e.cache[t]
}, Note.clearCacheByNotebookId = function(t) {
	t && (Note.cacheByNotebookId[t] = {}, Note.cacheByNotebookId.all = {}, Note.notebookIds[t] = !0)
}, Note.notebookHasNotes = function(t) {
	var e = Note.getNotesByNotebookId(t);
	return !isEmpty(e)
}, Note.getNotesByNotebookId = function(t) {
	var e = Note.getSorterAndOrder(),
		o = e.sortBy,
		a = e.isAsc;
	if (Note.listIsIn(), t || (t = "all"), !Note.cacheByNotebookId[t]) return [];
	if (Note.cacheByNotebookId[t][o]) {
		if (Note.cacheByNotebookId[t][o][a]) return Note.cacheByNotebookId[t][o][a];
		Note.cacheByNotebookId[t][o][!a].reverse();
		var n = Note.cacheByNotebookId[t][o][!a];
		return Note.cacheByNotebookId[t][o][!a] = null, Note.cacheByNotebookId[t][o][a] = n, n
	}
	var n = [];
	for (var i in Note.cache) if (i) {
		var r = Note.cache[i];
		r && (r.IsTrash || r.IsShared || ("all" == t || r.NotebookId == t) && n.push(r))
	}
	return Note.sortNotes(n), Note.cacheByNotebookId[t][o] = {}, Note.cacheByNotebookId[t][o][a] = n, n
}, Note.renderNotesAndFirstOneContent = function(t, e) {
	isArray(t) && (Note.renderNotes(t, !1, !1, e), isEmpty(t[0]) || Note.changeNoteForPjax(t[0].NoteId, !0, !1))
}, Note.curHasChanged = function(t, e) {
	var o = Note.getCurNote();
	if (!o) return !1;
	var a = $("#noteTitle").val(),
		n = Tag.getTags(),
		i = {
			hasChanged: !1,
			IsNew: o.IsNew,
			IsMarkdown: o.IsMarkdown,
			FromUserId: o.FromUserId,
			NoteId: o.NoteId,
			NotebookId: o.NotebookId
		};
	o.IsNew && (i.hasChanged = !0, i.title = a, LEA.topInfo && (i.Src = LEA.topInfo.src)), o.Title != a && (i.hasChanged = !0, i.Title = a), arrayEqual(o.Tags, n) || (i.hasChanged = !0, i.Tags = n.join(","));
	var r = !1;
	if ((o.IsNew || t || !Note.readOnly) && (r = !0), !i.hasChanged && !r) return !1;
	if (!r) return i;
	var s, c, l = getEditorContent(o.IsMarkdown);
	if (isArray(l) ? (s = l[0], c = l[1], s && previewIsEmpty(c) && Converter && (c = Converter.makeHtml(s)), s || (c = ""), o.Preview = c) : s = l, !(!i.Src || !LEA.topInfo || a !== LEA.topInfo.title || i.Tags || s && "<p><br></p>" != s || e && e.ctrls)) return !1;
	if (o.Content != s) {
		i.hasChanged = !0, i.Content = s;
		var d = c || s;
		o.HasSelfDefined && o.IsBlog || (i.Desc = Note.genDesc(d), i.ImgSrc = Note.getImgSrc(d), i.Abstract = Note.genAbstract(d))
	} else log("text相同");
	return i.hasChanged ? i : !1
}, Note.genDesc = function(t) {
	return t ? (t = t.replace(/<br \/>/g, " "), t = t.replace(/<\/p>/g, " "), t = t.replace(/<\/div>/g, " "), t = t.replace(/<\/?[^>]+(>|$)/g, ""), t = $.trim(t), t = t.replace(/</g, "&lt;"), t = t.replace(/>/g, "&gt;"), t.length < 300 ? t : t.substring(0, 300)) : ""
}, Note.genAbstract = function(t, e) {
	if (!t) return "";
	if (void 0 == e && (e = 1e3), t.length < e) return t;
	for (var o = !1, a = !1, n = 0, i = "", r = e, s = 0; s < t.length; ++s) {
		var c = t[s];
		if ("<" == c ? o = !0 : "&" == c ? a = !0 : ">" == c && o ? (n -= 1, o = !1) : ";" == c && a && (a = !1), o || a || (n += 1), i += c, n >= r) break
	}
	var l = document.createElement("div");
	return l.innerHTML = i, l.innerHTML
}, Note.getImgSrc = function(t) {
	if (!t) return "";
	var e = $(t).find("img");
	for (var o in e) {
		var a = e.eq(o).attr("src");
		if (a) return a
	}
	return ""
}, Note.saveInProcess = {}, Note.savePool = {}, Note.curChangedSaveIt = function(t, e, o) {
	var a = this;
	if (Note.curNoteId && !Note.isReadOnly) {
		var n;
		try {
			n = Note.curHasChanged(t, o)
		} catch (i) {
			return void(e && e(!1))
		}
		// /note/updateNoteOrContent
		// /api/note/

/*function _ajax(t, e, n, o, r, i) {
	return i = "undefined" == typeof i ? !0 : !1, $.ajax({
		type: t,
		url: e,
		data: n,
		async: i,
		beforeSend: function (xhr, settings){
			var csrftoken = $("[name=csrfmiddlewaretoken]").val();
			if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                console.log("setting X-CSRFToken")
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
		},
		success: function(t) {
			_ajaxCallback(t, o, r)
		},
		error: function(t) {
			_ajaxCallback(t, o, r)
		}
	})*/
		return n && n.hasChanged ? (log("需要保存..."), Note.renderChangedNote(n), delete n.hasChanged, showMsg(getMsg("saving")), a.saveInProcess[n.NoteId] = !0,
			ajaxPost("/api/note/update_note_or_content/", n, function(t) {
			console.log("弹出前", t)
			a.saveInProcess[n.NoteId] = !1, "object" == typeof t && /*t.Ok*/ t.Ok ? (n.IsNew && (t.Item.IsNew = !1, Note.setNoteCache(t.Item, !1), Pjax.changeNote(t.Item)), showMsg(getMsg("saveSuccess"), 1e3)) : alert(getMsg("saveError")), e && e()
		}), void 0 != n.Tags && "string" == typeof n.Tags && (n.Tags = n.Tags.split(",")), Note.setNoteCache(n, !1), Note.setNoteCache({
			NoteId: n.NoteId,
			UpdatedTime: (new Date).format("yyyy-MM-ddThh:mm:ss.S")
		}, !1), Note.clearCacheByNotebookId(n.NotebookId), n) : (log("无需保存"), !1)
	}
}, Note.updatePoolNote = function() {
	var t = this;
	for (var e in t.savePool) if (e) {
		delete t.savePool[e];
		var o = t.savePool[e];
		// t.saveInProcess[e] = !0, ajaxPost("/note/updateNoteOrContent", o, function() {
		t.saveInProcess[e] = !0, ajaxPost("/api/note/update_note_or_content/", o, function() {
			t.saveInProcess[e] = !1
		})
	}
}, Note.updatePoolNoteInterval = null, Note.startUpdatePoolNoteInterval = function() {
	return
}, Note.clearSelect = function() {
	$(".item").removeClass("item-active")
}, Note.selectTarget = function(t) {
	this.clearSelect(), $(t).addClass("item-active")
}, Note.showContentLoading = function() {
	$("#noteMaskForLoading").css("z-index", 11)
}, Note.hideContentLoading = function() {
	$("#noteMaskForLoading").css("z-index", -1)
}, Note.directToNote = function(t) {
	var e = $("#noteItemList"),
		o = e.height(),
		a = $("[noteId='" + t + "']").position();
	if (!a) return void console.error("no position: " + t);
	var n = a.top,
		i = e.scrollTop();
	if (n += i, n >= i && o + i >= n);
	else {
		var r = n;
		log("定位到特定note, 在可视范围内"), LEA.isMobile || Mobile.isMobile() || ($("#noteItemList").scrollTop(r), $("#noteItemList").slimScroll({
			scrollTo: r + "px",
			height: "100%",
			onlyScrollBar: !0
		}))
	}
}, Note.changeNoteForPjax = function(t, e, o) {
	var a = this,
		n = a.getNote(t);
	if (n) {
		var i = void 0 != n.Perm;
		void 0 == o && (o = !0), a.changeNote(t, i, !0, function(a) {
			void 0 == e && (e = !0), e && Pjax.changeNote(a), o && Note.directToNote(t)
		}), o && (i ? $("#myShareNotebooks").hasClass("closed") && $("#myShareNotebooks .folderHeader").trigger("click") : $("#myNotebooks").hasClass("closed") && $("#myNotebooks .folderHeader").trigger("click"), Notebook.expandNotebookTo(n.NotebookId))
	}
}, Note.contentAjax = null, Note.contentAjaxSeq = 1, Note.changeNote = function(t, e, o, a) {
	console.log('840 line', t)
	console.log('841 line', e)
	console.log('842 line', o)
	console.log('843 line', a)
	function n(e, o) {
		Note.contentAjax = null, o == Note.contentAjaxSeq && (Note.setNoteCache(e, !1), e = Note.cache[t], Note.renderNoteContent(e), i.hideContentLoading(), a && a(e))
	}
	var i = this;
	if (t) {
		Note.stopInterval();
		var r = i.getTargetById(t);
		if (Note.selectTarget(r), void 0 == o && (o = !0), o) {
			Note.curChangedSaveIt()
		}
		Note.clearCurNoteId();
		var s = i.getNote(t);
		console.log("856 line", s)
		console.log("857 line", s.Tags)
		if (s) {
			e || void 0 != s.Perm && (e = !0);
			var c = !e || Share.hasUpdatePerm(t);
			console.log("line 855", s)
			c ? (Note.hideReadOnly(), Note.renderNote(s)) : Note.renderNoteReadOnly(s), switchEditor(s.IsMarkdown), LEA.trigger("noteChanged", s), Attach.renderNoteAttachNum(t, !0), Note.contentAjaxSeq++;
			var l = Note.contentAjaxSeq;
			if (s.Content) return void n(s, l);
			// var d = "note/getNoteContent",
			// N = {
			// 		noteId: t
			// 	};
			var d = "/api/note/" + t + "/"
			N = {}
			e && (d = "/share/getShareNoteContent", N.sharedUserId = s.UserId), i.showContentLoading(), null != Note.contentAjax && Note.contentAjax.abort(), Note.contentAjax = ajaxGet(d, N, function(t) {
				return function(e) {
					delete e.IsBlog, n(e, t)
				}
			}(l))
		}
	}
}, Note.renderChangedNote = function(t) {
	if (t) {
		var e = $(tt('[noteId="?"]', t.NoteId));
		t.Title && e.find(".item-title").html(trimTitle(t.Title)), t.Desc && e.find(".desc").html(trimTitle(t.Desc)), t.ImgSrc ? ($thumb = e.find(".item-thumb"), $thumb.length > 0 ? $thumb.find("img").attr("src", t.ImgSrc) : (e.append(tt('<div class="item-thumb" style=""><img src="?"></div>', t.ImgSrc)), e.addClass("item-image")), e.find(".item-desc").removeAttr("style")) : "" == t.ImgSrc && (e.find(".item-thumb").remove(), e.removeClass("item-image"))
	}
}, Note.clearNoteInfo = function() {
	Note.clearCurNoteId(), Tag.clearTags(), $("#noteTitle").val(""), setEditorContent(""), $("#noteRead").hide()
}, Note.clearNoteList = function() {
	Note.noteItemListO.html("")
}, Note.clearAll = function() {
	Note.clearCurNoteId(), Note.clearNoteInfo(), Note.clearNoteList()
}, Note.renderNote = function(t) {
	console.log("853 line", t)
	console.log("854 line")
	console.log("855 line", t.Tags, t)
	t && ($("#noteTitle").val(t.Title), Tag.renderTags(t.Tags))
}, Note.renderNoteContent = function(t) {
	setEditorContent(t.Content, t.IsMarkdown, t.Preview, function() {
		Note.setCurNoteId(t.NoteId), Note.toggleReadOnly()
	})
}, Note.showEditorMask = function() {
	$("#editorMask").css("z-index", 10).show(), Notebook.curNotebookIsTrashOrAll() ? ($("#editorMaskBtns").hide(), $("#editorMaskBtnsEmpty").show()) : ($("#editorMaskBtns").show(), $("#editorMaskBtnsEmpty").hide())
}, Note.hideEditorMask = function() {
	$("#editorMask").css("z-index", -10).hide()
}, Note.toggleView = function(t) {
	var e;
	e = "object" == typeof t && t ? $(t.target).data("view") : t, e || (e = "snippet"), "list" == e ? $("#noteItemList").addClass("list") : $("#noteItemList").removeClass("list"), localStorage.setItem("viewStyle", e), $(".view-style").removeClass("checked"), $(".view-" + e).addClass("checked")
}, Note.setNotesSorter = function(t) {
	var e = $(t.currentTarget).data("sorter");
	e || (e = "dateUpdatedDESC"), localStorage.setItem("sorterType", e), Note.checkSorter(e), Note._isTag || Note._isSearch || Note._isShare ? Note.renderNotesAndFirstOneContent(Note._everNotes, !1) : Notebook.changeNotebook(Notebook.curNotebookId)
};
var $sorterStyles = $(".sorter-style");
Note.checkSorter = function(t) {
	t || (t = "dateUpdatedDESC");
	var e = $(".sorter-" + t);
	e.is(".checked") || ($sorterStyles.removeClass("checked"), e.addClass("checked"))
}, Note.sortNotesToRender = function(t) {
	Note.sortNotes(t)
}, Note.sortNotes = function(t) {
	if (!isEmpty(t)) {
		var e = Note.getSorterAndOrder(),
			o = e.sortBy,
			a = e.isAsc;
		t.sort(function(t, e) {
			var n = t[o],
				i = e[o];
			if (a) {
				if (i > n) return -1;
				if (n > i) return 1
			} else {
				if (i > n) return 1;
				if (n > i) return -1
			}
			return 0
		})
	}
}, Note.getSorterAndOrder = function() {
	var t = "UpdatedTime",
		e = !1,
		o = localStorage.getItem("sorterType");
	if (Note.checkSorter(o), o) switch (o) {
	case "dateCreatedASC":
		t = "CreatedTime", e = !0;
		break;
	case "dateCreatedDESC":
		t = "CreatedTime", e = !1;
		break;
	case "dateUpdatedASC":
		t = "UpdatedTime", e = !0;
		break;
	case "dateUpdatedDESC":
		t = "UpdatedTime", e = !1;
		break;
	case "titleASC":
		t = "Title", e = !0;
		break;
	case "titleDESC":
		t = "Title", e = !1
	}
	return console.log({
		sortBy: t,
		isAsc: e
	}), {
		sortBy: t,
		isAsc: e
	}
}, Note.listIsIn = function(t, e, o) {
	this._isTag = t, this._isSearch = e, this._isShare = o
}, Note.renderNotesC = 0, Note.renderNotes = function(t, e, o, a) {
	var n = ++Note.renderNotesC;
	if (this.clearSeqForNew(), this.batch.reset(), Note._everNotes = t, LEA.isMobile || Mobile.isMobile() || $("#noteItemList").slimScroll({
		scrollTo: "0px",
		height: "100%",
		onlyScrollBar: !0
	}), !t || "object" != typeof t || t.length <= 0) return void(e || Note.showEditorMask());
	Note.hideEditorMask(), void 0 == e && (e = !1), e || Note.noteItemListO.html("");
	var i = t.length,
		r = Math.ceil(i / 20);
	a || Note.sortNotes(t), Note._renderNotes(t, e, o, 1);
	for (var s = 0; i > s; ++s) {
		var c = t[s];
		Note.setNoteCache(c, !1), o && Share.setCache(c)
	}
	for (var s = 1; r > s; ++s) setTimeout(function(a) {
		return function() {
			n == Note.renderNotesC && Note._renderNotes(t, e, o, a + 1)
		}
	}(s), 2e3 * s)
}, Note._renderNotes = function(t, e, o, a) {
	for (var n = t.length, i = 20 * (a - 1); n > i && 20 * a > i; ++i) {
		var r = t[i];
		r.Title = trimTitle(r.Title);
		var s = "item-my";
		Note.nowIsInShared = !1, (o || r.UserId != UserInfo.UserId) && (s = "item-shared", Note.nowIsInShared = !0), e || 0 != i || (s += " item-active");
		var c;
		c = r.ImgSrc ? tt(Note.itemTpl, s, i, r.NoteId, r.ImgSrc, r.Title, Notebook.getNotebookTitle(r.NotebookId), goNowToDatetime(r.UpdatedTime), r.Desc) : tt(Note.itemTplNoImg, s, i, r.NoteId, r.Title, Notebook.getNotebookTitle(r.NotebookId), goNowToDatetime(r.UpdatedTime), r.Desc), c = $(c), r.IsBlog ? c.addClass("item-b") : c.removeClass("item-b"), Note.noteItemListO.append(c)
	}
}, Note._seqForNew = 0, Note.clearSeqForNew = function() {
	this._seqForNew = 0
}, Note.newNoteSeq = function() {
	return --this._seqForNew
}, Note.newNote = function(t, e, o, a) {
	console.log("line 1012", n);
	t || (t = $("#curNotebookForNewNote").attr("notebookId")), switchEditor(a), Note.hideEditorMask(), Note.hideReadOnly(), Note.stopInterval(), Note.curChangedSaveIt(), Note.batch.reset();
	var n = {
		NoteId: getObjectId(),
		Title: "",
		Tags: [],
		Content: "",
		NotebookId: t,
		IsNew: !0,
		FromUserId: o,
		IsMarkdown: a,
		UpdatedTime: new Date,
		CreatedTime: new Date
	};
	LEA.topInfo && LEA.topInfo.title && (n.Title = LEA.topInfo.title), Note.addNoteCache(n), Note.clearCacheByNotebookId(t), Attach.clearNoteAttachNum();
	var i = "",
		r = "item-my";
	e && (r = "item-shared");
	var s = Notebook.getNotebook(t),
		c = s ? s.Title : "",
		l = getCurDate();
	i = e ? tt(Note.newItemTpl, r, this.newNoteSeq(), o, n.NoteId, n.Title, c, l, "") : tt(Note.newItemTpl, r, this.newNoteSeq(), "", n.NoteId, n.Title, c, l, ""), i = $(i), s.IsBlog ? i.addClass("item-b") : i.removeClass("item-b"), Notebook.isCurNotebook(t) ? Note.noteItemListO.prepend(i) : (Note.clearAll(), Note.noteItemListO.prepend(i), e ? Share.changeNotebookForNewNote(t) : Notebook.changeNotebookForNewNote(t)), Note.selectTarget($(tt('[noteId="?"]', n.NoteId))), $("#noteTitle").focus(),Note.renderNote(n), Note.renderNoteContent(n), Note.setCurNoteId(n.NoteId), Notebook.incrNotebookNumberNotes(t), Note.toggleWriteable(!0)
}, Note.changeToNext = function(t) {
	var e = $(t),
		o = e.next();
	if (!o.length) {
		var a = e.prev();
		if (!a.length) return void Note.showEditorMask();
		o = a
	}
	Note.changeNote(o.attr("noteId"))
}, Note.changeToNextSkipNotes = function(t) {
	var e = Note;
	if (!isEmpty(t)) {
		if (e.$itemList.find("li").length == t.length) return void e.showEditorMask();
		if (1 == t.length) {
			var o = e.$itemList.find(".item-active");
			if (1 == o.length && o.attr("noteId") != t[0]) return
		}
		for (var a = e.getTargetById(t[0]), n = a.next(), i = 1, r = t.length, s = !1; n.length;) {
			if (i >= r) {
				s = !0;
				break
			}
			if (n.attr("noteId") != e.getTargetById(t[i]).attr("noteId")) {
				s = !0;
				break
			}
			n = n.next(), i++
		}
		s || (n = a.prev()), n && e.changeNote(n.attr("noteId"))
	}
}, Note.deleteNote = function(t, e, o) {
	var a, n = Note;

	if (a = n.inBatch ? n.getBatchNoteIds() : [$(t).attr("noteId")], !isEmpty(a)) {
		1 == a.length && $(t).hasClass("item-active") && (Note.stopInterval(), n.clearCurNoteId(), Note.clearNoteInfo());
		var i;
		// i = 1 == a.length ? $(t) : n.$itemList.find(".item-active"), i.hide(), ajaxPost("/note/deleteNote", {
		console.log("a", a)
		console.log(typeof(a))
		// i = 1 == a.length ? $(t) : n.$itemList.find(".item-active"), i.hide(), ajaxPut("/api/note/" + a + "/", {
			// noteIds: a,
			// NoteId: a.join(""),
		i = 1 == a.length ? $(t) : n.$itemList.find(".item-active"), i.hide(), ajaxPost("/api/note/trash_note/", {
			noteIds: a,
			isShared: o,
			// IsTrash: true
		}, function(t) {
			if (t) {
				Note.changeToNextSkipNotes(a), i.remove();
				for (var e = 0; e < a.length; ++e) {
					var o = a[e],
						r = n.getNote(o);
					r && (Notebook.minusNotebookNumberNotes(r.NotebookId), Note.clearCacheByNotebookId(r.NotebookId), delete Note.cache[o])
				}
			}
		}), n.batch.reset()
	}
}, Note.listNoteShareUserInfo = function(t) {
	var e = $(t).attr("noteId");
	showDialogRemote("/share/listNoteShareUserInfo", {
		noteId: e
	})
}, Note.shareNote = function(t) {
	var e = $(t).find(".item-title").text();
	showDialog("dialogShareNote", {
		title: getMsg("shareToFriends") + "-" + e
	}), setTimeout(function() {
		$("#friendsEmail").focus()
	}, 500);
	var o = $(t).attr("noteId");
	shareNoteOrNotebook(o, !0)
}, Note.download = function(t, e) {
	var o = "";
	for (var a in e) o += '<input name="' + a + '" value="' + e[a] + '">';
	$('<form target="mdImageManager" action="' + t + '" method="GET">' + o + "</form>").appendTo("body").submit().remove()
}, Note.exportPDF = function(t) {
	var e = $(t).attr("noteId");
	$('<form target="mdImageManager" action="/note/exportPdf" method="GET"><input name="noteId" value="' + e + '"/></form>').appendTo("body").submit().remove()
}, Note.showReadOnly = function() {
	Note.isReadOnly = !0, $("#note").addClass("read-only")
}, Note.hideReadOnly = function() {
	Note.isReadOnly = !1, $("#note").removeClass("read-only"), $("#noteRead").hide()
}, Note.renderNoteReadOnly = function(t) {
	Note.showReadOnly(), $("#noteReadTitle").html(t.Title || getMsg("unTitled")), Tag.renderReadOnlyTags(t.Tags), $("#noteReadCreatedTime").html(goNowToDatetime(t.CreatedTime)), $("#noteReadUpdatedTime").html(goNowToDatetime(t.UpdatedTime))
}, Note.lastSearch = null, Note.lastKey = null, Note.lastSearchTime = new Date, Note.isOver2Seconds = !1, Note.isSameSearch = function(t) {
	var e = new Date,
		o = e.getTime() - Note.lastSearchTime.getTime();
	return Note.isOver2Seconds = o > 2e3 ? !0 : !1, !Note.lastKey || Note.lastKey != t || o > 1e3 ? (Note.lastKey = t, Note.lastSearchTime = e, !1) : t == Note.lastKey ? !0 : (Note.lastSearchTime = e, Note.lastKey = t, !1)
}, Note.searchNote = function() {
	var t = $("#searchNoteInput").val();
	return t ? void(Note.isSameSearch(t) || (Note.lastSearch && Note.lastSearch.abort(), Note.curChangedSaveIt(), Note.clearAll(), showLoading(), Notebook.showNoteAndEditorLoading(), Note.listIsIn(!1, !0), $("#tagSearch").hide(), Note.lastSearch = $.post("/note/searchNote", {
		key: t
	}, function(t) {
		hideLoading(), Notebook.hideNoteAndEditorLoading(), t && (Note.lastSearch = null, Note.renderNotes(t), isEmpty(t) || Note.changeNote(t[0].NoteId, !1))
	}))) : void Notebook.changeNotebook("0")
}, Note.$itemList = $("#noteItemList"), Note.getTargetById = function(t) {
	return this.$itemList.find('li[noteId="' + t + '"]')
}, Note.setNote2Blog = function(t) {
	Note._setBlog(t, !0)
}, Note.unsetNote2Blog = function(t) {
	Note._setBlog(t, !1)
}, Note._setBlog = function(t, e) {
	var o, a = Note;
	o = Note.inBatch ? a.getBatchNoteIds() : [$(t).attr("noteId")], ajaxPost(/*/note/setNote2Blog*/"/api/note/set_note_to_blog/", {
		noteIds: o,
		isBlog: e
	}, function(t) {
		if (t) for (var n = 0; n < o.length; ++n) {
			var i = o[n],
				r = a.getTargetById(i);
			e ? r.addClass("item-b") : r.removeClass("item-b"), a.setNoteCache({
				NoteId: i,
				IsBlog: e
			}, !1)
		}
	})
}, Note.setAllNoteBlogStatus = function(t, e) {
	if (t) {
		var o = Note.getNotesByNotebookId(t);
		if (isArray(o)) {
			var a = o.length;
			if (0 == a) for (var n in Note.cache) Note.cache[n].NotebookId == t && (Note.cache[n].IsBlog = e);
			else for (var n = 0; a > n; ++n) o[n].IsBlog = e
		}
	}
}, Note.moveNote = function(t, e) {
	var o, a = Note;
	o = Note.inBatch ? a.getBatchNoteIds() : [$(t).attr("noteId")];
	var n = e.notebookId;
	if (Notebook.getCurNotebookId() != n) {
		if (1 == o.length) {
			var i = a.getNote(o[0]);
			if (!i.IsTrash && i.NotebookId == n) return
		}
		// ajaxPost("/note/moveNote", {
		// 	noteIds: o,
		// 	notebookId: n
		ajaxPost("/api/note/move_note/" ,{
			noteIds: o,
			notebookId: n
		}, function(e) {
			if (e) {
				a.clearCacheByNotebookId(n);
				for (var i = 0; i < o.length; ++i) {
					var r = o[i],
						s = a.getNote(r);
					s && (s.NotebookId != n ? (Notebook.incrNotebookNumberNotes(n), s.IsTrash || Notebook.minusNotebookNumberNotes(s.NotebookId)) : s.IsTrash && Notebook.incrNotebookNumberNotes(s.NotebookId), a.clearCacheByNotebookId(s.NotebookId), s.NotebookId = n, s.IsTrash = !1, s.UpdatedTime = new Date, a.setNoteCache(s))
				}
				var c;
				c = 1 == o.length ? t : a.$itemList.find(".item-active"), Notebook.curActiveNotebookIsAll() ? (c.find(".note-notebook").html(Notebook.getNotebookTitle(n)), a.changeNote(c.eq(0).attr("noteId"))) : (a.changeToNextSkipNotes(o), c.remove())
			}
		}), a.batch.reset()
	}
}, Note.copyNote = function(t, e, o) {
	var a, n = Note,
		i = e.notebookId;
	a = Note.inBatch ? n.getBatchNoteIds() : [$(t).attr("noteId")];
	for (var r = [], s = 0; s < a.length; ++s) {
		var c = a[s],
			l = n.getNote(c);
		if (l) {
			if (l.IsTrash || l.NotebookId == i) continue;
			r.push(c)
		}
	}
	if (0 != r.length) {
		var d = "/note/copyNote",
			e = {
				noteIds: r,
				notebookId: i
			};
		if (o) {
			d = "/note/copySharedNote";
			var l = n.getNote(r[0]);
			e.fromUserId = l.UserId
		}
		ajaxPost(d, e, function(t) {
			if (reIsOk(t)) {
				var e = t.Item;
				if (isEmpty(e)) return;
				Note.clearCacheByNotebookId(i);
				for (var o = 0; o < e.length; ++o) {
					var a = e[o];
					a.NoteId && (Note.setNoteCache(a), Notebook.incrNotebookNumberNotes(i))
				}
			}
		})
	}
}, Note.deleteNoteTag = function(t, e) {
	if (t) for (var o in t) {
		var a = Note.getNote(o);
		if (a) {
			a.Tags = a.Tags || [];
			for (var n in a.Tags) a.Tags[n] != e || a.Tags.splice(n, 1);
			o == Note.curNoteId && Tag.renderTags(a.Tags)
		}
	}
}, Note.readOnly = !0, LEA.readOnly = !0, Note.toggleReadOnly = function(t) {
	if (LEA.em && LEA.em.isWriting()) return Note.toggleWriteable();
	var e = this,
		o = e.getCurNote(),
		a = $("#editor");
	a.addClass("read-only").removeClass("all-tool"), $("#editorContent").attr("contenteditable", !1), $("#mdEditor").addClass("read-only"), $("#note").addClass("read-only-editor"), o && ($(".info-toolbar").removeClass("invisible"), o.IsMarkdown ? ($("#mdInfoToolbar .created-time").html(goNowToDatetime(o.CreatedTime)), $("#mdInfoToolbar .updated-time").html(goNowToDatetime(o.UpdatedTime))) : ($("#infoToolbar .created-time").html(goNowToDatetime(o.CreatedTime)), $("#infoToolbar .updated-time").html(goNowToDatetime(o.UpdatedTime))), t && Note.curChangedSaveIt(), Note.readOnly = !0, LEA.readOnly = !0, o.IsMarkdown || $("#editorContent pre").each(function() {
		LeaAce.setAceReadOnly($(this), !0)
	}))
}, LEA.toggleWriteable = Note.toggleWriteable = function(t) {
	var e = Note;
	$("#editor").removeClass("read-only"), $("#note").removeClass("read-only-editor"), $("#editorContent").attr("contenteditable", !0), $("#mdEditor").removeClass("read-only");
	var o = e.getCurNote();
	o && (Note.readOnly = !1, LEA.readOnly = !1, o.IsMarkdown ? MD && (t || MD.focus(), MD.onResize()) : ($("#editorContent pre").each(function() {
		LeaAce.setAceReadOnly($(this), !1)
	}), t || tinymce.activeEditor.focus()))
}, Note.toggleWriteableAndReadOnly = function() {
	LEA.readOnly ? Note.toggleWriteable() : Note.toggleReadOnly(!0)
}, Note.getPostUrl = function(t) {
	var e = t.UrlTitle || t.NoteId;
	return UserInfo.PostUrl + "/" + e
}, Note.getContextNotebooks = function(t) {
	var e = [],
		o = [],
		a = [];
	for (var n in t) {
		var i = t[n],
			r = {
				text: i.Title,
				notebookId: i.NotebookId,
				action: Note.moveNote
			},
			s = {
				text: i.Title,
				notebookId: i.NotebookId,
				action: Note.copyNote
			},
			c = {
				text: i.Title,
				notebookId: i.NotebookId,
				action: Share.copySharedNote
			};
		if (!isEmpty(i.Subs)) {
			var l = Note.getContextNotebooks(i.Subs);
			r.items = l[0], s.items = l[1], c.items = l[2], r.type = "group", r.width = 150, s.type = "group", s.width = 150, c.type = "group", c.width = 150
		}
		e.push(r), o.push(s), a.push(c)
	}
	return [e, o, a]
}, Note.contextmenu = null, Note.notebooksCopy = [], Note.initContextmenu = function() {
	function t(t) {
		var e = $(this).attr("noteId"),
			o = [];
		if (trialOrPremiumIsOver && o.push("exportPDF"), Note.inBatch) o.push("shareToFriends"), o.push("exportPDF"), Notebook.curActiveNotebookIsTrash() && (o.push("shareStatus"), o.push("unset2Blog"), o.push("set2Blog"), o.push("copy"));
		else {
			var a = Note.getNote(e);
			if (!a) return;
			if (a.IsTrash || Notebook.curActiveNotebookIsTrash()) o.push("shareToFriends"), o.push("shareStatus"), o.push("unset2Blog"), o.push("set2Blog"), o.push("copy");
			else {
				o.push(a.IsBlog ? "set2Blog" : "unset2Blog");
				var n = Notebook.getNotebookTitle(a.NotebookId);
				o.push("move." + n), o.push("copy." + n)
			}
		}
		t.applyrule({
			name: "target..",
			disable: !0,
			items: o
		})
	}
	function e() {
		return "target3" != this.id
	}
	var o = Note;
	Note.contextmenu && Note.contextmenu.destroy();
	var a = Notebook.everNotebooks,
		n = o.getContextNotebooks(a),
		i = n[0],
		r = n[1];
	o.notebooksCopy = n[2];
	var s = {
		width: 180,
		items: [{
			text: getMsg("shareToFriends"),
			alias: "shareToFriends",
			icon: "",
			faIcon: "fa-share-square-o",
			action: Note.listNoteShareUserInfo
		}, {
			type: "splitLine"
		}, {
			text: getMsg("publicAsBlog"),
			alias: "set2Blog",
			faIcon: "fa-bold",
			action: Note.setNote2Blog
		}, {
			text: getMsg("cancelPublic"),
			alias: "unset2Blog",
			faIcon: "fa-undo",
			action: Note.unsetNote2Blog
		}, {
			type: "splitLine"
		}, {
			text: getMsg("exportPdf"),
			alias: "exportPDF",
			faIcon: "fa-file-pdf-o",
			action: Note.exportPDF
		}, {
			type: "splitLine"
		}, {
			text: getMsg("delete"),
			icon: "",
			faIcon: "fa-trash-o",
			action: Note.deleteNote
		}, {
			text: getMsg("move"),
			alias: "move",
			faIcon: "fa-arrow-right",
			type: "group",
			width: 180,
			items: i
		}, {
			text: getMsg("copy"),
			alias: "copy",
			icon: "",
			faIcon: "fa-copy",
			type: "group",
			width: 180,
			items: r
		}],
		onShow: t,
		onContextMenu: e,
		parent: "#noteItemList",
		children: ".item-my"
	};
	Note.contextmenu = $("#noteItemList .item-my").contextmenu(s)
};
var Attach = {
	loadedNoteAttachs: {},
	attachsMap: {},
	init: function() {
		var t = this;
		$("#showAttach").click(function() {
			t.renderAttachs(Note.curNoteId)
		}), t.attachListO.click(function(t) {
			t.stopPropagation()
		}), t.attachListO.on("click", ".delete-attach", function(e) {
			e.stopPropagation();
			var o = $(this).closest("li").data("id"),
				a = this;
			confirm(getMsg("Are you sure to delete it ?")) && ($(a).button("loading"), ajaxPost("/attach/deleteAttach", {
				attachId: o
			}, function(e) {
				$(a).button("reset"), reIsOk(e) ? t.deleteAttach(o) : alert(e.Msg)
			}))
		}), t.attachListO.on("click", ".download-attach", function(t) {
			t.stopPropagation();
			var e = $(this).closest("li").data("id");
			Note.download("/attach/download", {
				attachId: e
			})
		}), t.downloadAllBtnO.click(function() {
			Note.download("/attach/downloadAll", {
				noteId: Note.curNoteId
			})
		}), t.attachListO.on("click", ".link-attach", function(e) {
			e.stopPropagation();
			var o = $(this).closest("li").data("id"),
				a = t.attachsMap[o],
				n = UrlPrefix + "/api/file/getAttach?fileId=" + o;
			Note.toggleWriteable(), LEA.isMarkdownEditor() && MD ? MD.insertLink(n, a.Title) : tinymce.activeEditor.insertContent('<a target="_blank" href="' + n + '">' + a.Title + "</a>")
		})
	},
	attachListO: $("#attachList"),
	attachNumO: $("#attachNum"),
	attachDropdownO: $("#attachDropdown"),
	downloadAllBtnO: $("#downloadAllBtn"),
	linkAllBtnO: $("#linkAllBtn"),
	clearNoteAttachNum: function() {
		var t = this;
		t.attachNumO.html("").hide()
	},
	renderNoteAttachNum: function(t, e) {
		var o = this,
			a = Note.getNote(t);
		a.AttachNum ? (o.attachNumO.html("(" + a.AttachNum + ")").show(), o.downloadAllBtnO.show(), o.linkAllBtnO.show()) : (o.attachNumO.hide(), o.downloadAllBtnO.hide(), o.linkAllBtnO.hide()), e && o.attachDropdownO.removeClass("open")
	},
	_renderAttachs: function(t) {
		for (var e = this, o = "", a = t.length, n = getMsg("Delete"), i = getMsg("Download"), r = getMsg("Insert link into content"), s = 0; a > s; ++s) {
			var c = t[s];
			o += '<li class="clearfix" data-id="' + c.AttachId + '"><div class="attach-title">' + c.Title + '</div><div class="attach-process"> 	  <button class="btn btn-sm btn-warning delete-attach" data-loading-text="..." title="' + n + '"><i class="fa fa-trash-o"></i></button> 	  <button type="button" class="btn btn-sm btn-primary download-attach" title="' + i + '"><i class="fa fa-download"></i></button> 	  <button type="button" class="btn btn-sm btn-default link-attach" title="' + r + '"><i class="fa fa-link"></i></button> </div></li>', e.attachsMap[c.AttachId] = c
		}
		e.attachListO.html(o);
		var l = Note.getCurNote();
		l && (l.AttachNum = a, e.renderNoteAttachNum(l.NoteId, !1))
	},
	_bookmark: null,
	renderAttachs: function(t) {
		var e = this;
		return e.loadedNoteAttachs[t] ? void e._renderAttachs(e.loadedNoteAttachs[t]) : (e.attachListO.html('<li class="loading"><img src="/images/loading-24.gif"/></li>'), void ajaxGet("/attach/getAttachs", {
			noteId: t
		}, function(o) {
			var a = [];
			o.Ok && (a = o.List, a || (a = [])), e.loadedNoteAttachs[t] = a, e._renderAttachs(a)
		}))
	},
	addAttach: function(t) {
		var e = this;
		e.loadedNoteAttachs[t.NoteId] || (e.loadedNoteAttachs[t.NoteId] = []), e.loadedNoteAttachs[t.NoteId].push(t), e.renderAttachs(t.NoteId)
	},
	deleteAttach: function(t) {
		for (var e = this, o = Note.curNoteId, a = e.loadedNoteAttachs[o], n = 0; n < a.length; ++n) if (a[n].AttachId == t) {
			a.splice(n, 1);
			break
		}
		e.renderAttachs(o)
	},
	downloadAttach: function() {},
	downloadAll: function() {}
};
Note.inBatch = !1, Note.getBatchNoteIds = function() {
	for (var t = [], e = Note.$itemList.find(".item-active"), o = 0; o < e.length; ++o) t.push(e.eq(o).attr("noteId"));
	return t
}, Note.batch = {
	$noteItemList: $("#noteItemList"),
	cancelInBatch: function() {
		Note.inBatch = !1, this.$body.removeClass("batch")
	},
	setInBatch: function() {
		Note.inBatch = !0, this.$body.addClass("batch")
	},
	isInBatch: function() {
		var t = this,
			e = t.$noteItemList.find(".item-active");
		return e.length >= 2 ? !0 : !1
	},
	_startNoteO: null,
	getStartNoteO: function() {
		var t = this;
		return t._startNoteO || (t._startNoteO = t.getCurSelected()), t._startNoteO
	},
	_selectByStart: {},
	clearByStart: function(t) {
		var e = this;
		if (t) {
			var o = this._selectByStart[t];
			if (!isEmpty(o)) for (var a = 0; a < o.length; ++a) e.clearTarget(o[a])
		}
	},
	selectTo: function(t) {
		var e = this.getStartNoteO();
		e || alert("nono start");
		var o, a, n, i, r = +e.data("seq"),
			s = +t.data("seq");
		s > r ? (o = e, a = t, n = r, i = s) : (o = t, a = e, n = s, i = r);
		var c = e.attr("noteId");
		this.clearByStart(c);
		var l = o;
		this._selectByStart[c] = [];
		for (var d = n; i >= d; ++d) this.selectTarget(l), this._selectByStart[c].push(l), l = l.next()
	},
	selectAll: function() {
		this.$noteItemList.find("li").addClass("item-active")
	},
	clearAllSelect: function() {
		Note.clearSelect()
	},
	selectTarget: function(t) {
		t && t.addClass("item-active")
	},
	clearTarget: function(t) {
		t && t.removeClass("item-active")
	},
	select: function(t) {
		var e = this;
		if (t.hasClass("item-active")) {
			var o = this.isInBatch();
			o && t.removeClass("item-active")
		} else e._startNoteO = t, this.selectTarget(t)
	},
	getCurSelected: function() {
		return this.$noteItemList.find(".item-active")
	},
	reset: function() {
		this.cancelInBatch(), this._selectByStart = {}, this._startMove = !1, this._startNoteO = null, this.clearRender()
	},
	canBatch: function() {
		return !LEA.em.isWritingMode
	},
	init: function() {
		var t = this;
		t.$noteItemList.on("click", ".item", function(e) {
			var o = $(this),
				a = o.attr("noteId");
			if (a) {
				var n = !1,
					i = !1;
				t.canBatch() && (e.shiftKey ? i = !0 : n = e.metaKey || e.ctrlKey), (n || i) && Note.curChangedSaveIt(), n ? t.select(o) : i ? t.selectTo(o) : Note.selectTarget(o), t.finalFix()
			}
		}), t._startMove = !1, t.$noteItemList.on("mousedown", ".item", function(e) {
			t.canBatch() && (t.isContextMenu(e) || (t._startMove || !(e.metaKey || e.ctrlKey || e.shiftKey)) && (t._startNoteO = $(this), t._startMove = !0))
		}), t.$noteItemList.on("mousemove", ".item", function() {
			t.canBatch() && t._startMove && (Note.curChangedSaveIt(), t.clearAllSelect(), t.selectTo($(this)), t.finalFix(!0))
		});
		var e = $("body");
		e.on("mouseup", function() {
			t._startMove = !1
		}), e.keydown(function(e) {
			e.target && "BODY" === e.target.nodeName && (e.ctrlKey || e.metaKey) && 65 === e.which && (e.preventDefault(), t.canBatch() && (Note.curChangedSaveIt(), t.selectAll(), t.finalFix()))
		}), t.$noteItemList.on("dragstart", function(t) {
			t.preventDefault(), t.stopPropagation()
		}), t.initContextmenu()
	},
	initContextmenu: function() {
		var t = this;
		t.$batchMask.on("contextmenu", function(t) {
			t.preventDefault(), Note.nowIsInShared ? Share.contextmenu.showMenu(t) : Note.contextmenu.showMenu(t)
		}), t.$batchMask.find(".batch-info .fa").click(function(t) {
			t.preventDefault(), t.pageX -= 90, t.pageY += 10, t.stopPropagation(), $(document).click(), Note.nowIsInShared ? Share.contextmenu.showMenu(t) : Note.contextmenu.showMenu(t)
		})
	},
	$body: $("body"),
	finalFix: function(t) {
		var e = this;
		if (e.isInBatch()) Note.clearCurNoteId(), e.renderBatchNotes(), e.setInBatch();
		else {
			e.clearRender(), e.cancelInBatch();
			var o = e.getCurSelected();
			if (o) {
				var a = o.attr("noteId");
				t || (e._startNoteO = o), Mobile.changeNote(a), Note.curNoteId != a && Note.changeNoteForPjax(a, !0, !1)
			}
		}
	},
	isContextMenu: function(t) {
		return void 0 != t.which && 1 == t.which || 1 == t.button ? !1 : void 0 != t.which && 3 == t.which || 2 == t.button ? !0 : !1
	},
	_notes: {},
	clearRender: function() {
		this._notes = {}, this.$batchCtn.html(""), this.hideMask()
	},
	showMask: function() {
		this.$batchMask.css({
			"z-index": 99
		}).show()
	},
	hideMask: function() {
		this.$batchMask.css({
			"z-index": -2
		}).hide()
	},
	renderBatchNotes: function() {
		var t = this;
		t.showMask();
		var e = t.$noteItemList.find(".item-active");
		t.$batchNum.html(e.length);
		for (var o = {}, a = 0; a < e.length; ++a) {
			var n = e.eq(a).attr("noteId");
			t.addTo(n), o[n] = 1
		}
		for (var n in t._notes) if (!o[n]) {
			var i = t._notes[n];
			i.css({
				"margin-left": "-800px"
			}), setTimeout(function() {
				i.remove()
			}, 500), delete t._notes[n]
		}
	},
	$batchMask: $("#batchMask"),
	$batchCtn: $("#batchCtn"),
	$batchNum: $("#batchMask .batch-info span"),
	_i: 1,
	getRotate: function() {
		var t = this,
			e = t._i++,
			o = e % 2 === 0 ? 1 : -1,
			a = (o * Math.random() * 70, [0, 10, 20, 30, 40]),
			n = o * a[e % 5] * 3;
		return n -= 80, [o * Math.random() * 30, n]
	},
	addTo: function(t) {
		var e = this;
		if (!e._notes[t]) {
			var o = Note.getNote(t),
				a = o.Title || getMsg("unTitled"),
				n = o.Desc || "...",
				i = $('<div class="batch-note"><div class="title">' + a + '</div><div class="content">' + n + "</div></div>");
			e._notes[t] = i;
			var r = e.getRotate();
			e.$batchCtn.append(i), setTimeout(function() {
				i.css({
					transform: "rotate(" + r[0] + "deg)",
					"margin-left": r[1] + "px"
				})
			})
		}
	}
}, $(function() {
	Attach.init(), $("#noteItemList").on("mouseenter", ".item", function() {
		(LEA.isIpad || LEA.isIphone) && $(this).trigger("click")
	}), Note.batch.init(), $("#newNoteBtn, #editorMask .note").click(function() {
		var t = $("#curNotebookForNewNote").attr("notebookId");
		Note.newNote(t)
	}), $("#newNoteMarkdownBtn, #editorMask .markdown").click(function() {
		var t = $("#curNotebookForNewNote").attr("notebookId");
		Note.newNote(t, !1, "", !0)
	}), $("#notebookNavForNewNote").on("click", "li div", function() {
		var t = $(this).attr("notebookId");
		$(this).hasClass("new-note-right") ? Note.newNote(t, !1, "", !0) : Note.newNote(t)
	}), $("#searchNotebookForAdd").click(function(t) {
		t.stopPropagation()
	}), $("#searchNotebookForAdd").keyup(function() {
		var t = $(this).val();
		Notebook.searchNotebookForAddNote(t)
	}), $("#searchNotebookForList").keyup(function() {
		var t = $(this).val();
		Notebook.searchNotebookForList(t)
	}), $("#noteTitle").on("keydown", function(t) {
		var e = t.keyCode || t.witch;
		9 == e && (Note.toggleWriteable(), t.preventDefault())
	}), $("#searchNoteInput").on("keydown", function(t) {
		var e = t.keyCode || t.witch;
		return 13 == e || 108 == e ? (t.preventDefault(), Note.searchNote(), !1) : void 0
	}), $("#saveBtn").click(function() {
		Note.curChangedSaveIt(!0)
	}), Note.$itemList.on("click", ".item-blog", function(t) {
		t.preventDefault(), t.stopPropagation(), $(document).click();
		var e = $(this).parent().attr("noteId"),
			o = Note.getNote(e);
		o && window.open(Note.getPostUrl(o))
	}), Note.$itemList.on("click", ".item-my .item-setting", function(t) {
		t.preventDefault(), t.stopPropagation(), $(document).click();
		var e = $(this).parent();
		Note.contextmenu.showMenu(t, e)
	}), $(".toolbar-update").click(function() {
		Note.toggleWriteable()
	}), $("#editBtn").click(function() {
		Note.toggleWriteableAndReadOnly()
	}), $("#editorContent").on("click", "a", function(t) {
		if (Note.readOnly) {
			var e = $(this).attr("href");
			if (e && "#" == e[0]) return;
			t.preventDefault(), window.open(e)
		}
	}), $("#preview-contents").on("click", "a", function(t) {
		var e = $(this).attr("href");
		e && "#" == e[0] || (t.preventDefault(), window.open(e))
	});
	var t = localStorage.getItem("viewStyle");
	Note.toggleView(t), $(".view-style").click(function(t) {
		Note.toggleView(t)
	}), $(".sorter-style").click(function(t) {
		Note.setNotesSorter(t)
	})
}), Note.startInterval();

function sendLog(e, t) {
	e && (t || (t = ""), ajaxGet("/index/log", {
		key: e,
		value: t
	}))
}
function editorMode() {
	this.writingHash = "writing", this.normalHash = "normal", this.isWritingMode = location.hash.indexOf(this.writingHash) >= 0, this.toggleA = null
}
function initSlimScroll() {
	Mobile.isMobile() || ($("#notebook").slimScroll({
		height: "100%"
	}), $("#noteItemList").slimScroll({
		height: "100%"
	}), $("#wmd-panel-preview").slimScroll({
		height: "100%"
	}), $("#wmd-panel-preview").css("width", "100%"))
}
function initEditor() {
	$("#moreBtn").click(function() {
		saveBookmark();
		var e = $("#editor");
		e.hasClass("all-tool") ? e.removeClass("all-tool") : e.addClass("all-tool"), restoreBookmark()
	}), tinymce.init({
		inline: !0,
		theme: "leanote",
		valid_children: "+pre[div|#text|p|span|textarea|i|b|strong]",
		setup: function(e) {
			e.on("keydown", function(e) {
				var t = e.which ? e.which : e.keyCode;
				return !Note.readOnly || (e.ctrlKey || e.metaKey) && 67 == t ? void LeaAce.removeCurToggleRaw() : void e.preventDefault()
			}), e.on("cut", function(e) {
				return $(e.target).hasClass("ace_text-input") ? void e.preventDefault() : void 0
			})
		},
		convert_urls: !0,
		relative_urls: !1,
		remove_script_host: !1,
		selector: "#editorContent",
		skin: "custom",
		language: LEA.locale,
		plugins: ["autolink link leaui_image leaui_mindmap lists hr", "paste", "searchreplace leanote_nav leanote_code tabfocus", "table textcolor"],
		toolbar1: "formatselect | forecolor backcolor | bold italic underline strikethrough | leaui_image leaui_mindmap | leanote_code leanote_inline_code | bullist numlist | alignleft aligncenter alignright alignjustify",
		toolbar2: "outdent indent blockquote | link unlink | table | hr removeformat | subscript superscript |searchreplace | pastetext | leanote_ace_pre | fontselect fontsizeselect",
		menubar: !1,
		toolbar_items_size: "small",
		statusbar: !1,
		url_converter: !1,
		font_formats: "Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Times New Roman=times new roman,times;Courier New=courier new,courier;Tahoma=tahoma,arial,helvetica,sans-serif;Verdana=verdana,geneva;宋体=SimSun;新宋体=NSimSun;黑体=SimHei;微软雅黑=Microsoft YaHei",
		block_formats: "Header 1=h1;Header 2=h2;Header 3=h3;Header 4=h4;Paragraph=p",
		paste_data_images: !0
	}), window.onbeforeunload = function() {
		LEA.isLogout || Note.curChangedSaveIt(!0, null, {
			refresh: !0
		})
	}, $("body").on("keydown", function(e) {
		var t = e.which ? e.which : e.keyCode,
			o = e.ctrlKey || e.metaKey;
		if (o) {
			if (83 == t) return Note.curChangedSaveIt(!0, null, {
				ctrls: !0
			}), e.preventDefault(), !1;
			if (69 == t) return Note.toggleWriteableAndReadOnly(), e.preventDefault(), !1
		}
	})
}
function scrollTo(e, t, o) {
	var i = $("#editorContent"),
		n = i.find(t + ":contains(" + o + ")");
	random++;
	for (var r = $('#leanoteNavContent [data-a="' + t + "-" + encodeURI(o) + '"]'), a = r.size(), s = 0; a > s && r[s] != e; ++s);
	if (n.size() >= s + 1) {
		n = n.eq(s);
		var l = i.scrollTop() - i.offset().top + n.offset().top;
		return void i.animate({
			scrollTop: l
		}, 300)
	}
}
function hideMask() {
	$("#mainMask").html(""), $("#mainMask").hide(100)
}
function updateLeftIsMin(e) {
	ajaxGet("/user/updateLeftIsMin", {
		leftIsMin: e
	})
}
function minLeft(e) {
	$page.addClass("mini-left"), e && updateLeftIsMin(!0)
}
function maxLeft(e) {
	$page.removeClass("mini-left"), $("#noteAndEditor").css("left", UserInfo.NotebookWidth), $("#leftNotebook").width(UserInfo.NotebookWidth), e && updateLeftIsMin(!1)
}
function getMaxDropdownHeight(e) {
	var t = $(e).offset(),
		o = $(document).height() - t.top;
	o -= 70, 0 > o && (o = 0);
	var i = $(e).find("ul").height();
	return o > i ? i : o
}
function initLeanoteIfrPlugin() {
	self != window.parent && (LEA.topInfo = {}, window.addEventListener("message", function(e) {
		console.log("child 收到消息: "), console.log(e.data), LEA.topInfo = e.data || {}, LEA.topInfo.got = !0
	}, !1), window.parent.postMessage && window.parent.postMessage("leanote", "*"))
}
function getNoteBySrc(e, t) {
	ajaxGet("/note/getNoteAndContentBySrc", {
		src: e
	}, function(e) {
		if (e && e.Ok) {
			var o = e.Item;
			if (o) {
				var i = o.NoteInfo,
					n = o.NoteContentInfo;
				for (var r in n) i[r] = n[r];
				t(i)
			} else t()
		} else t()
	})
}
function getTopInfoSrc(e) {
	return LEA.topInfo.got ? e(LEA.topInfo.src) : (new Date).getTime() - _topInfoStart > 2e3 ? e() : void setTimeout(function() {
		getTopInfoSrc(e)
	}, 10)
}
function initPage() {
	initLeanoteIfrPlugin(), LEA.topInfo ? getTopInfoSrc(function(e) {
		e ? getNoteBySrc(e, function(e) {
			_initPage(e, !0)
		}) : _initPage(!1, !0)
	}) : _initPage()
}
function _initPage(e, t) {
	console.log("1808 line", e, t);
	if (e ? (curNoteId = e.NoteId, curNotebookId = e.NotebookId, noteContentJson = e) : t && (curNoteId = null), Notebook.renderNotebooks(notebooks), Share.renderShareNotebooks(sharedUserInfos, shareNotebooks), curSharedNoteNotebookId) Share.firstRenderShareNote(curSharedUserId, curSharedNoteNotebookId, curNoteId);
	else {
		console.log("line 1810", noteContentJson.Tags)
		Note.setNoteCache(noteContentJson);
		var o = !1;
		if (t && e && notes) {
			for (var i = 0; i < notes.length; ++i) {
				var n = notes[i];
				if (n.NoteId === e.NoteId) {
					o = !0, notes.splice(i, 1), notes.unshift(e);
					break
				}
			}
			o || notes.unshift(e)
		}
		Note.renderNotes(notes), curNoteId && (setTimeout(function() {
			Note.changeNoteForPjax(curNoteId, !0, curNotebookId), t && (Note.toggleWriteable(), setTimeout(function() {
				Note.toggleWriteable()
			}, 100), setTimeout(function() {
				Note.toggleWriteable()
			}, 1e3))
		}), curNotebookId || Notebook.selectNotebook($(tt('#notebook [notebookId="?"]', Notebook.allNotebookId))))
	}
	if (latestNotes.length > 0) for (var i = 0; i < latestNotes.length; ++i) Note.addNoteCache(latestNotes[i]);
	if (Tag.renderTagNav(tagsJson), initSlimScroll(), LeaAce.handleEvent(), t && (Mobile.toEditor(), e || (Note.newNote(), Note.toggleWriteable(!0), setTimeout(function() {
		Note.toggleWriteable(!0)
	}, 100), setTimeout(function() {
		Note.toggleWriteable(!0)
	}, 1e3))), hideMask(), !Mobile.isMobile()) try {
		var r = !1,
			a = window.localStorage.getItem("showUpgradeModal2");
		a ? r = userIsNormal && trialOrPremiumIsOver : (r = !0, window.localStorage.setItem("showUpgradeModal2", 1)), r && $("#upgradeAccountModal").modal()
	} catch (s) {
		$("#upgradeAccountModal").modal()
	}
}
editorMode.prototype.toggleAText = function(e) {
	var t = this;
	setTimeout(function() {
		var o = $(".toggle-editor-mode a"),
			i = $(".toggle-editor-mode span");
		e ? (o.attr("href", "#" + t.normalHash), i.text(getMsg("normalMode"))) : (o.attr("href", "#" + t.writingHash), i.text(getMsg("writingMode")))
	}, 0)
}, editorMode.prototype.isWriting = function(e) {
	return e || (e = location.hash), e.indexOf(this.writingHash) >= 0
}, editorMode.prototype.init = function() {
	this.$themeLink = $("#themeLink"), this.changeMode(this.isWritingMode);
	var e = this;
	$(".toggle-editor-mode").click(function(t) {
		t.preventDefault(), saveBookmark();
		var o = $(this).find("a"),
			i = e.isWriting(o.attr("href"));
		e.changeMode(i), i ? setHash("m", e.writingHash) : setHash("m", e.normalHash), restoreBookmark()
	})
}, editorMode.prototype.changeMode = function(e) {
	this.toggleAText(e), e ? this.writtingMode() : this.normalMode()
}, editorMode.prototype.resizeEditor = function() {
	setTimeout(function() {
		resizeEditor()
	}, 10), setTimeout(function() {
		resizeEditor()
	}, 20), setTimeout(function() {
		resizeEditor()
	}, 500)
}, editorMode.prototype.normalMode = function() {
	$("#noteItemListWrap, #notesAndSort").show(), $("#noteList").unbind("mouseenter").unbind("mouseleave");
	var e = UserInfo.Theme || "default";
	e += ".css";
	$("#themeLink"); - 1 != this.$themeLink.attr("href").indexOf("writting-overwrite.css") && this.$themeLink.attr("href", LEA.sPath + "/css/theme/" + e), $("#noteList").width(UserInfo.NoteListWidth), $("#note").css("left", UserInfo.NoteListWidth), this.isWritingMode = !1, this.resizeEditor()
}, editorMode.prototype.writtingMode = function() {
	Note.inBatch || (-1 == this.$themeLink.attr("href").indexOf("writting-overwrite.css") && this.$themeLink.attr("href", LEA.sPath + "/css/theme/writting-overwrite.css"), $("#noteItemListWrap, #notesAndSort").fadeOut(), $("#noteList").hover(function() {
		$("#noteItemListWrap, #notesAndSort").fadeIn()
	}, function() {
		$("#noteItemListWrap, #notesAndSort").fadeOut()
	}), this.resizeEditor(), $("#noteList").width(250), $("#note").css("left", 0), Note.toggleWriteable(), this.isWritingMode = !0)
}, editorMode.prototype.getWritingCss = function() {
	return this.isWritingMode ? ["/css/editor/editor-writting-mode.css"] : []
};
var em = new editorMode;
LEA.em = em;
var Resize = {
	lineMove: !1,
	mdLineMove: !1,
	target: null,
	leftNotebook: $("#leftNotebook"),
	notebookSplitter: $("#notebookSplitter"),
	noteList: $("#noteList"),
	noteAndEditor: $("#noteAndEditor"),
	noteSplitter: $("#noteSplitter"),
	note: $("#note"),
	body: $("body"),
	leftColumn: $("#left-column"),
	rightColumn: $("#right-column"),
	mdSplitter: $("#mdSplitter2"),
	init: function() {
		var e = this;
		e.initEvent()
	},
	initEvent: function() {
		var e = this;
		$(".noteSplit").bind("mousedown", function(t) {
			t.preventDefault(), e.lineMove = !0, $(this).css("background-color", "#ccc"), e.target = $(this).attr("id"), $("#noteMask").css("z-index", 99999)
		}), e.mdSplitter.bind("mousedown", function(t) {
			t.preventDefault(), $(this).hasClass("open") && (e.mdLineMove = !0)
		}), e.body.bind("mousemove", function(t) {
			e.lineMove ? (t.preventDefault(), e.resize3Columns(t)) : e.mdLineMove && (t.preventDefault(), e.resizeMdColumns(t))
		}), e.body.bind("mouseup", function() {
			e.stopResize(), $("#noteMask").css("z-index", -1)
		});
		var t;
		$(".layout-toggler-preview").click(function() {
			var o = $(this),
				i = e.leftColumn.parent();
			if (o.hasClass("open")) {
				var n = i.width(),
					r = 22,
					a = n - r;
				t = e.leftColumn.width(), e.leftColumn.width(a), e.rightColumn.css("left", "auto").width(r), o.removeClass("open"), e.rightColumn.find(".layout-resizer").removeClass("open"), $(".preview-container").hide(), MD && MD.resize()
			} else o.addClass("open"), e.rightColumn.find(".layout-resizer").addClass("open"), e.leftColumn.width(t), $(".preview-container").show(), e.rightColumn.css("left", t).width("auto"), MD && MD.resize()
		})
	},
	stopResize: function() {
		var e = this;
		(e.lineMove || e.mdLineMove) && ajaxGet("/user/updateColumnWidth", {
			mdEditorWidth: UserInfo.MdEditorWidth,
			notebookWidth: UserInfo.NotebookWidth,
			noteListWidth: UserInfo.NoteListWidth
		}, function() {}), e.lineMove = !1, e.mdLineMove = !1, $(".noteSplit").css("background", "none"), e.mdSplitter.css("background", "none")
	},
	set3ColumnsWidth: function(e, t) {
		var o = this;
		if (!(150 > e || 100 > t)) {
			var i = o.body.width() - e - t;
			400 > i || (o.leftNotebook.width(e), o.notebookSplitter.css("left", e), o.noteAndEditor.css("left", e), o.noteList.width(t), o.noteSplitter.css("left", t), o.note.css("left", t), UserInfo.NotebookWidth = e, UserInfo.NoteListWidth = t)
		}
	},
	resize3Columns: function(e, t) {
		var o = this;
		t && (e.clientX += o.body.width() - o.note.width());
		var i, n;
		o.lineMove && ("notebookSplitter" == o.target ? (i = e.clientX, n = o.noteList.width(), o.set3ColumnsWidth(i, n)) : (i = o.leftNotebook.width(), n = e.clientX - i, o.set3ColumnsWidth(i, n)), resizeEditor())
	},
	resizeMDInterval: null,
	resizeMdColumns: function(e) {
		var t = this;
		if (t.mdLineMove) {
			var o = e.clientX - t.leftColumn.offset().left;
			t.setMdColumnWidth(o), clearInterval(t.resizeMDInterval), t.resizeMDInterval = setTimeout(function() {
				MD.resize && MD.resize()
			}, 50)
		}
	},
	setMdColumnWidth: function(e) {
		var t = this,
			o = $("#note").width();
		e > 100 && o - 80 > e && (UserInfo.MdEditorWidth = e, t.leftColumn.width(e), t.rightColumn.css("left", e)), MD && MD.onResize()
	}
};
Mobile = {
	noteO: $("#note"),
	bodyO: $("body"),
	setMenuO: $("#setMenu"),
	hashChange: function() {
		var e = Mobile,
			t = location.hash;
		if (-1 != t.indexOf("noteId")) {
			e.toEditor(!1);
			var o = t.substr(8);
			Note.changeNote(o, !1, !1)
		} else e.toNormal(!1)
	},
	init: function() {
		var e = this;
		e.isMobile()
	},
	isMobile: function() {
		var e = navigator.userAgent;
		return LEA.isMobile = !1, LEA.isMobile = /Mobile|Android|iPhone|iPad/i.test(e), LEA.isIpad = /iPad/i.test(e), LEA.isIphone = /iPhone/i.test(e), !LEA.isMobile && $(document).width() <= 700 && (LEA.isMobile = !0), LEA.isMobile
	},
	changeNote: function(e) {
		var t = this;
		return LEA.isMobile ? (t.toEditor(!0, e), !1) : !0
	},
	toEditor: function() {
		var e = this;
		e.bodyO.addClass("full-editor"), e.noteO.addClass("editor-show")
	},
	toNormal: function() {
		var e = this;
		e.bodyO.removeClass("full-editor"), e.noteO.removeClass("editor-show")
	},
	switchPage: function() {
		var e = this;
		return !LEA.isMobile || LEA.isIpad ? !0 : (e.bodyO.hasClass("full-editor") ? e.toNormal(!0) : e.toEditor(!0), !1)
	}
};
var random = 1;
LEA.s3 = new Date, console.log("initing..."), $(window).resize(function() {
	Mobile.isMobile(), resizeEditor()
}), initEditor(), $(".folderHeader").click(function() {
	var e = $(this).next(),
		t = $(this).parent();
	e.is(":hidden") ? ($(".folderNote").removeClass("opened").addClass("closed"), t.removeClass("closed").addClass("opened"), $(this).find(".fa-angle-right").removeClass("fa-angle-right").addClass("fa-angle-down")) : ($(".folderNote").removeClass("opened").addClass("closed"), t.removeClass("opened").addClass("closed"), $(this).find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-right"))
}), $(".leanoteNav h1").on("click", function() {
	var e = $(this).closest(".leanoteNav");
	e.hasClass("unfolder") ? e.removeClass("unfolder") : e.addClass("unfolder")
}), $("#wrongEmail").click(function() {
	openSetInfoDialog(1)
}), $("#setTheme").click(function() {
	showDialog2("#setThemeDialog", {
		title: "主题设置",
		postShow: function() {
			UserInfo.Theme || (UserInfo.Theme = "default"), $("#themeForm input[value='" + UserInfo.Theme + "']").attr("checked", !0)
		}
	})
}), $("#themeForm").on("click", "input", function() {
	var e = $(this).val(),
		t = $("#themeLink").attr("href"),
		o = t.split("="),
		i = 1;
	2 == o.length && (i = o[1]), $("#themeLink").attr("href", LEA.sPath + "/css/theme/" + e + ".css?id=" + i), ajaxPost("/user/updateTheme", {
		theme: e
	}, function(t) {
		reIsOk(t) && (UserInfo.Theme = e)
	})
}), $("#notebook, #newMyNote, #myProfile, #topNav, #notesAndSort", "#leanoteNavTrigger").bind("selectstart", function(e) {
	return e.preventDefault(), !1
});
var $page = $("#page");
$("#leftSwitcher2").on("click", function() {
	maxLeft(!0)
}), $("#leftSwitcher").click("click", function() {
	Mobile.switchPage() && minLeft(!0)
}), $("#notebookMin div.minContainer").click(function() {
	var e = $(this).attr("target");
	maxLeft(!0), "#notebookList" == e ? $("#myNotebooks").hasClass("closed") && $("#myNotebooks .folderHeader").trigger("click") : "#tagNav" == e ? $("#myTag").hasClass("closed") && $("#myTag .folderHeader").trigger("click") : $("#myShareNotebooks").hasClass("closed") && $("#myShareNotebooks .folderHeader").trigger("click")
}), UserInfo.NotebookWidth = UserInfo.NotebookWidth || $("#notebook").width(), UserInfo.NoteListWidth = UserInfo.NoteListWidth || $("#noteList").width(), Resize.init(), Resize.set3ColumnsWidth(UserInfo.NotebookWidth, UserInfo.NoteListWidth), Resize.setMdColumnWidth(UserInfo.MdEditorWidth), Mobile.isMobile() ? maxLeft(!1) : UserInfo.LeftIsMin ? minLeft(!1) : maxLeft(!1), $(".dropdown").on("shown.bs.dropdown", function() {
	$(this).find("ul")
}), em.init(), Mobile.init();
var Pjax = {
	init: function() {
		var e = this;
		window.addEventListener("popstate", function(t) {
			var o = t.state;
			o && (document.title = o.title || "Untitled", log("pop"), e.changeNotebookAndNote(o.noteId))
		}, !1), history.pushState || $(window).on("hashchange", function() {
			var t = getHash("noteId");
			t && e.changeNotebookAndNote(t)
		})
	},
	changeNotebookAndNote: function(e) {
		var t = Note.getNote(e);
		if (t) {
			var o = void 0 != t.Perm,
				i = t.NotebookId;
			return Notebook.curNotebookId == i ? void Note.changeNoteForPjax(e, !1) : void(o ? Share.changeNotebook(t.UserId, i, function(t) {
				Note.renderNotes(t), Note.changeNoteForPjax(e, !1, !0)
			}) : Notebook.changeNotebook(i, function(t) {
				Note.renderNotes(t), Note.changeNoteForPjax(e, !1, !0)
			}))
		}
	},
	changeNote: function(e) {
		var t = e.NoteId,
			o = e.Title,
			i = "/note/" + t;
		if (location.href.indexOf("?online") > 0 && (i += "?online=" + /online=([0-9])/.exec(location.href)[1]), location.hash && (i += location.hash), history.pushState) {
			var n = {
				url: i,
				noteId: t,
				title: o
			};
			history.pushState(n, o, i), document.title = o || "Untitled"
		} else setHash("noteId", t)
	}
};
$(function() {
	Pjax.init()
}), LeaAce = {
	_aceId: 0,
	_aceEditors: {},
	_isInit: !1,
	_canAce: !1,
	isAce: !0,
	disableAddHistory: function() {
		tinymce.activeEditor.undoManager.setCanAdd(!1)
	},
	resetAddHistory: function() {
		tinymce.activeEditor.undoManager.setCanAdd(!0)
	},
	canAce: function() {
		return this._isInit ? this._canAce : (this._canAce = "webkit" != getVendorPrefix() || Mobile.isMobile() ? !1 : !0, this._isInit = !0, this._canAce)
	},
	canAndIsAce: function() {
		return this.canAce() && this.isAce
	},
	getAceId: function() {
		return this.aceId++, "leanote_ace_" + (new Date).getTime() + "_" + this._aceId
	},
	initAce: function(e, t, o) {
		var i = this;
		if (o || i.canAndIsAce()) {
			var n = $("#" + e);
			if (0 != n.length) {
				var r = n.html();
				try {
					i.disableAddHistory();
					var a = n.attr("class") || "",
						s = -1 != a.indexOf("brush:html");
					(n.attr("style") || !s && -1 != n.html().indexOf("style")) && n.html(n.text()), n.find(".toggle-raw").remove(); {
						n.html()
					}
					n.removeClass("ace-to-pre"), n.attr("contenteditable", !1);
					var l = ace.edit(e);
					l.container.style.lineHeight = 1.5, l.setTheme("ace/theme/tomorrow");
					var c = i.getPreBrush(n),
						d = "";
					if (c) try {
						d = c.split(":")[1]
					} catch (h) {}
					return d && "false" !== d || (d = "javascript"), l.session.setMode("ace/mode/" + d), l.session.setOption("useWorker", !1), l.setFontSize(2 == window.devicePixelRatio ? "12px" : "14px"), l.getSession().setUseWorker(!1), l.setOption("showInvisibles", !1), l.setShowInvisibles(!1), l.setOption("wrap", "free"), l.setShowInvisibles(!1), l.setReadOnly(Note.readOnly), l.setAutoScrollEditorIntoView(!0), l.setOption("maxLines", 1e4), l.commands.addCommand({
						name: "undo",
						bindKey: {
							win: "Ctrl-z",
							mac: "Command-z"
						},
						exec: function(e) {
							var t = e.getSession().getUndoManager();
							t.hasUndo() ? t.undo() : (t.reset(), tinymce.activeEditor.undoManager.undo())
						}
					}), this._aceEditors[e] = l, t && l.setValue(t), i.resetAddHistory(), l
				} catch (h) {
					console.error("ace error!!!!"), console.error(h), n.attr("contenteditable", !0), n.removeClass("ace-tomorrow ace_editor ace-tm"), n.html(r), i.resetAddHistory()
				}
			}
		}
	},
	clearIntervalForInitAce: null,
	initAceFromContent: function(e) {
		if (!this.canAndIsAce()) {
			var t = $(e.getBody());
			return void t.find("pre").removeClass("ace_editor")
		}
		var o = this;
		this.clearIntervalForInitAce && clearInterval(this.clearIntervalForInitAce), this.clearIntervalForInitAce = setTimeout(function() {
			for (var t = $(e.getBody()), i = t.find("pre"), n = 0; n < i.length; ++n) {
				var r = i.eq(n),
					a = o.isInAce(r);
				if (a) {
					if (!isAceError(a[0].getValue())) break;
					console.error("之前有些没有destroy掉")
				}
				setTimeout(function(e) {
					return function() {
						e.find(".toggle-raw").remove();
						var t = e.html();
						t = t.replace(/ /g, "&nbsp;").replace(/\<br *\/*\>/gi, "\n").replace(/</g, "&lt;").replace(/>/g, "&gt;"), e.html(t);
						var i = e.attr("id");
						i || (i = o.getAceId(), e.attr("id", i)), o.initAce(i)
					}
				}(r))
			}
		}, 10)
	},
	allToPre: function(e) {
		if (this.canAndIsAce()) {
			var t = this;
			t.clearIntervalForInitAce && clearInterval(t.clearIntervalForInitAce), t.clearIntervalForInitAce = setTimeout(function() {
				for (var o = $(e.getBody()), i = o.find("pre"), n = 0; n < i.length; ++n) {
					var r = i.eq(n);
					setTimeout(function(e) {
						return function() {
							t.aceToPre(e)
						}
					}(r))
				}
			}, 10)
		}
	},
	undo: function(e) {
		if (this.canAndIsAce()) {
			var t = this;
			this.clearIntervalForInitAce && clearInterval(this.clearIntervalForInitAce), this.clearIntervalForInitAce = setTimeout(function() {
				for (var o = $(e.getBody()), i = o.find("pre"), n = 0; n < i.length; ++n) {
					var r = i.eq(n);
					setTimeout(function(e) {
						return function() {
							var o = e.html(),
								i = e.attr("id"),
								n = t.getAce(i);
							if (n) {
								var o = n.getValue();
								n.destroy();
								var n = t.initAce(i, o);
								n.selection.clearSelection()
							} else {
								o = o.replace(/ /g, "&nbsp;").replace(/\<br *\/*\>/gi, "\n"), e.html(o);
								var i = e.attr("id");
								i || (i = t.getAceId(), e.attr("id", i)), t.initAce(i)
							}
						}
					}(r))
				}
			}, 10)
		}
	},
	destroyAceFromContent: function(e) {
		if (this.canAce()) for (var t = e.find("pre"), o = 0; o < t.length; ++o) {
			var i = t.eq(o).attr("id"),
				n = this.getAce(i);
			n && (n.destroy(), this._aceEditors[i] = null)
		}
	},
	getAce: function(e) {
		return this.canAce() ? this._aceEditors[e] : void 0
	},
	setAceReadOnly: function(e, t) {
		var o = this;
		if ("object" == typeof e) var i = e.attr("id");
		else var i = e;
		var n = o.getAce(i);
		n && n.setReadOnly(t)
	},
	nowIsInAce: function() {
		if (this.canAce()) {
			var e = tinymce.activeEditor.selection.getNode();
			return this.isInAce(e)
		}
	},
	nowIsInPre: function() {
		var e = tinymce.activeEditor.selection.getNode();
		return this.isInPre(e)
	},
	isInPre: function(e) {
		var t = $(e),
			e = t.get(0);
		return "PRE" == e.nodeName ? !0 : ($pre = t.closest("pre"), 0 == $pre.length ? !1 : !0)
	},
	isInAce: function(e) {
		if (this.canAce()) {
			var t = $(e),
				e = t.get(0);
			if ("PRE" == e.nodeName) {
				var o = t.attr("id"),
					i = this.getAce(o);
				return i ? [i, t] : !1
			}
			return $pre = t.closest("pre"), 0 == $pre.length ? !1 : this.isInAce($pre)
		}
	},
	getPreBrush: function(e) {
		var t = $(e),
			o = t.attr("class");
		if (!o) return "";
		var i = o.match(/brush:[^ ]*/),
			n = "";
		return i && i.length > 0 && (n = i[0]), n
	},
	preToAce: function(e, t) {
		if (t || this.canAce()) {
			var o = $(e),
				i = this.getAceId();
			o.attr("id", i);
			var n = this.initAce(i, "", !0);
			n && n.focus()
		}
	},
	aceToPre: function(e, t) {
		var o = this,
			i = $(e),
			n = o.isInAce(i);
		if (n) {
			var r = n[0],
				i = n[1],
				a = r.getValue();
			isAceError(a) && (a = i.html()), a = a.replace(/</g, "&lt").replace(/>/g, "&gt");
			var s = $('<pre class="' + i.attr("class") + ' ace-to-pre">' + a + "</pre>");
			i.replaceWith(s), r.destroy(), o._aceEditors[i.attr("id")] = null, t && setTimeout(function() {
				var e = tinymce.activeEditor,
					t = e.selection,
					o = t.getRng();
				o.selectNode(s.get(0)), e.focus(), s.trigger("click"), s.html(a + " ")
			}, 0)
		}
	},
	removeAllToggleRaw: function() {
		$("#editorContent .toggle-raw").remove()
	},
	removeCurToggleRaw: function() {
		if (this.curToggleRaw) try {
			this.curToggleRaw.remove()
		} catch (e) {}
	},
	curToggleRaw: null,
	handleEvent: function() {
		if (this.canAce()) {
			var e = this;
			$("#editorContent").on("mouseenter", "pre", function() {
				var t = $(this);
				if ($raw = t.find(".toggle-raw"), 0 == $raw.length) {
					var o = $('<div class="toggle-raw" title="Toggle code with raw html"><input type="checkbox" /></div>');
					t.append(o), e.curToggleRaw = o
				}
				$input = t.find(".toggle-raw input"), LeaAce.isInAce(t) ? $input.prop("checked", !0) : $input.prop("checked", !1)
			}), $("#editorContent").on("mouseleave", "pre", function() {
				var e = $(this).find(".toggle-raw");
				e.remove()
			}), $("#editorContent").on("change", ".toggle-raw input", function() {
				var t = $(this).prop("checked"),
					o = $(this).closest("pre");
				t ? e.preToAce(o, !0) : e.aceToPre(o, !0)
			});
			var t;
			$("#editorContent").on("keyup", "pre", function(o) {
				var i = o.keyCode;
				if (8 == i || 46 == i) if (t) {
					var n = (new Date).getTime();
					if (300 > n - t) {
						var r = e.isInAce($(this));
						if (r && !r[0].getValue()) return r[0].destroy(), void $(this).remove()
					}
					t = n
				} else t = (new Date).getTime()
			})
		}
	}
};
var _topInfoStart = (new Date).getTime();
LEA.canSetMDModeFromStorage = function() {
	return "demo@leanote.com" != UserInfo.Email && "demo2@leanote.com" != UserInfo.Email
};

function revertTagStatus() {
	$("#addTagTrigger").show(), $("#addTagInput").hide()
}
function hideTagList(a) {
	$("#tagDropdown").removeClass("open"), a && a.stopPropagation()
}
function showTagList(a) {
	$("#tagDropdown").addClass("open"), a && a.stopPropagation()
}
function reRenderTags() {
	var a = ["label label-default", "label label-info"],
		e = 0;
	$("#tags").children().each(function() {
		var t = $(this).attr("class");
		("label label-default" == t || "label label-info" == t) && ($(this).removeClass(t).addClass(a[e % 2]), e++)
	})
}
Tag.classes = {
	"蓝色": "label label-blue",
	"红色": "label label-red",
	"绿色": "label label-green",
	"黄色": "label label-yellow",
	blue: "label label-blue",
	red: "label label-red",
	green: "label label-green",
	yellow: "label label-yellow"
}, Tag.mapCn2En = {
	"蓝色": "blue",
	"红色": "red",
	"绿色": "green",
	"黄色": "yellow"
}, Tag.mapEn2Cn = {
	blue: "蓝色",
	red: "红色",
	green: "绿色",
	yellow: "黄色"
}, Tag.t = $("#tags"), Tag.getTags = function() {
	var a = [];
	return Tag.t.children().each(function() {
		var e = $(this).data("tag");
		console.log('2327line', e)
		e = Tag.mapCn2En[e] || e, a.push(e)
	}), a
}, Tag.clearTags = function() {
	Tag.t.html("")
}, Tag.renderTags = function(a) {
	console.log("2333 a =", a)
	if (Tag.t.html(""), !isEmpty(a)) for (var e = 0; e < a.length; ++e) {
		var t = a[e];
		console.log("2335", t)
		Tag.appendTag(t)
	}
/*	if (Tag.t.html(""), !isEmpty(a)) for (var e = 0; e < a.length; ++e) {
		var t = a[e];
		console.log("2335", t)
		Tag.appendTag(t)
	}*/
}, Tag.renderReadOnlyTags = function(a) {
	function e() {
		return t ? "label label-default" : (t = !0, "label label-info")
	}
	$("#noteReadTags").html(""), (isEmpty(a) || 1 == a.length && "" == a[0]) && $("#noteReadTags").html(getMsg("noTag"));
	var t = !0;
	for (var t in a) {
		var l = a[t];
		l = Tag.mapEn2Cn[l] || l;
		var n = Tag.classes[l];
		n || (n = e()), tag = tt('<span class="?">?</span>', n, trimTitle(l)), $("#noteReadTags").append(tag)
	}
}, Tag.appendTag = function(a, e) {
	console.log("2357 line", a)
	var t, l, n = !1;
	if ("object" == typeof a) {
		if (t = a.classes, l = a.text, !l) return
	} else {
		if (a = $.trim(a), l = a, !l) return;
		var t = Tag.classes[l];
		t ? n = !0 : t = "label label-default"
	}
	var g = l;
	"zh" == LEA.locale && (l = Tag.mapEn2Cn[l] || l, g = Tag.mapCn2En[g] || g), a = tt('<span class="?" data-tag="?">?<i title="' + getMsg("delete") + '">X</i></span>', t, l, l);
	var s = !1;
	console.log("2411 line",a)
	$("#tags").children().each(function() {
		console.log("2412 line",a)
		if (n) {
			var e = $("<div></div>").append($(this).clone()).html();
			e == a && ($(this).remove(), s = !0)
		} else l + "X" == $(this).text() && ($(this).remove(), s = !0)
	}), $("#tags").append(a), hideTagList(), n || reRenderTags(), e && (s || Note.curChangedSaveIt(!0, function() {
		// ajaxPost("/tag/updateTag", {
		ajaxPost("/api/tag/update_tag/", {
			tag: g
		}, function(a) {
			reIsOk(a) && Tag.addTagNav(a.Item)
		})
	}))
}, Tag.removeTag = function(a) {
	var e = a.data("tag");
	a.remove(), reRenderTags(), "zh" == LEA.locale && (e = Tag.mapCn2En[e] || e), Note.curChangedSaveIt(!0, function() {})
}, Tag.tags = [], Tag.renderTagNav = function(a) {
	a = a || [], Tag.tags = a, $("#tagNav").html("");
	for (var e in a) {
		var t = a[e],
			l = t.Tag,
			n = l;
		if ("zh" == LEA.locale) var n = Tag.mapEn2Cn[l] || n;
		if (n = trimTitle(n)) {
			var g = Tag.classes[l] || "label label-default";
			$("#tagNav").append(tt('<li data-tag="?"><a> <span class="?">?</span> <span class="tag-delete">X</span></li>', l, g, n))
		}
	}
}, Tag.deleteTag = function(a) {
	for (var e = 0; e < this.tags.length; ++e) {
		var t = this.tags[e];
		if (t.Tag == a) {
			this.tags.splice(e, 1);
			break
		}
	}
}, Tag.addTagNav = function(a) {
	var e = this;
	for (var t in e.tags) {
		var l = e.tags[t];
		if (l.Tag == a.Tag) {
			e.tags.splice(t, 1);
			break
		}
	}
	e.tags.unshift(a), e.renderTagNav(e.tags)
}, $(function() {
	function a() {
		$li = $(this).closest("li");
		var a = $.trim($li.data("tag"));
		confirm("Are you sure ?") && ajaxPost("/tag/deleteTag", {
			tag: a
		}, function(e) {
			if (reIsOk(e)) {
				var t = e.Item;
				Note.deleteNoteTag(t, a), $li.remove(), Tag.deleteTag(a)
			}
		})
	}
	function e() {
		var a = $(this).closest("li"),
			e = $.trim(a.data("tag"));
		Note.curChangedSaveIt(), Note.clearAll(), $("#tagSearch").html(a.html()).show(), $("#tagSearch .tag-delete").remove(), Note.listIsIn(!0, !1), showLoading(), ajaxGet("/note/searchNoteByTags", {
			tags: [e]
		}, function(a) {
			hideLoading(), a && (Note.renderNotes(a), isEmpty(a) || Note.changeNote(a[0].NoteId))
		})
	}
	$("#addTagTrigger").click(function() {
		$(this).hide(), $("#addTagInput").show().focus().val("")
	}), $("#addTagInput").click(function(a) {
		showTagList(a)
	}), $("#addTagInput").blur(function() {
		var a = $(this).val();
		a && Tag.appendTag(a, !0)
	}), $("#addTagInput").keydown(function(a) {
		13 == a.keyCode && (hideTagList(), $("#addTagInput").val() ? ($(this).trigger("blur"), $("#addTagTrigger").trigger("click")) : $(this).trigger("blur"))
	}), $("#tagColor li").click(function() {
		var a;
		a = $(this).attr("role") ? $(this).find("span") : $(this), Tag.appendTag({
			classes: a.attr("class"),
			text: a.text()
		}, !0)
	}), $("#tags").on("click", "i", function() {
		Tag.removeTag($(this).parent())
	}), $("#myTag .folderBody").on("click", "li .label", e), $("#myTag .folderBody").on("click", "li .tag-delete", a)
});
Notebook.curNotebookId = "", Notebook.cache = {}, Notebook.notebooks = [], Notebook.notebookNavForListNote = "", Notebook.notebookNavForNewNote = "", Notebook.setCache = function(o) {
	var e = o.NotebookId;
	e && (Notebook.cache[e] || (Notebook.cache[e] = {}), $.extend(Notebook.cache[e], o))
}, Notebook.getCurNotebookId = function() {
	return Notebook.curNotebookId
}, Notebook.getCurNotebook = function() {
	return Notebook.cache[Notebook.curNotebookId]
}, Notebook._updateNotebookNumberNotes = function(o, e) {
	var t = this,
		N = t.getNotebook(o);
	N && (N.NumberNotes += e, N.NumberNotes < 0 && (N.NumberNotes = 0), $("#numberNotes_" + o).html(N.NumberNotes))
}, Notebook.incrNotebookNumberNotes = function(o) {
	var e = this;
	e._updateNotebookNumberNotes(o, 1)
}, Notebook.minusNotebookNumberNotes = function(o) {
	var e = this;
	e._updateNotebookNumberNotes(o, -1)
}, Notebook.getNotebook = function(o) {
	return Notebook.cache[o]
}, Notebook.getNotebookTitle = function(o) {
	var e = Notebook.cache[o];
	return e ? e.Title : "未知"
}, Notebook.getTreeSetting = function(o, e) {
	function t(o, t) {
		var N = 5,
			a = $("#" + o + " #" + t.tId + "_switch"),
			n = $("#" + o + " #" + t.tId + "_ico");
		if (a.remove(), n.before(a), e ? Share.isDefaultNotebookId(t.NotebookId) || n.after($('<span class="fa notebook-setting" title="setting"></span>')) : Notebook.isAllNotebookId(t.NotebookId) || Notebook.isTrashNotebookId(t.NotebookId) || (n.after($('<span class="notebook-number-notes" id="numberNotes_' + t.NotebookId + '">' + (t.NumberNotes || 0) + "</span>")), n.after($('<span class="fa notebook-setting" title="setting"></span>'))), t.level > 1) {
			var r = "<span style='display: inline-block;width:" + N * t.level + "px'></span>";
			a.before(r)
		}
	}
	function N(o, e) {
		for (var t = 0, N = e.length; N > t; t++) if (e[t].drag === !1) return !1;
		return !0
	}
	function a(o, e, t) {
		return t ? t.drop !== !1 : !0
	}
	function n(o, e, t, N, a) {
		function n(o) {
			return o.level == d
		}
		var r = t[0];
		if (N) {
			var k, i = b.tree,
				s = {
					curNotebookId: r.NotebookId
				};
			if (k = "inner" == a ? N : N.getParentNode()) {
				s.parentNotebookId = k.NotebookId;
				var d = k.level + 1,
					c = i.getNodesByFilter(n, !1, k)
			} else var c = i.getNodes();
			s.siblings = [];
			for (var l in c) {
				var h = c[l].NotebookId;
				Notebook.isAllNotebookId(h) || Notebook.isTrashNotebookId(h) || s.siblings.push(h)
			}
			ajaxPost("/notebook/dragNotebooks", {
				data: JSON.stringify(s)
			}), setTimeout(function() {
				Notebook.changeNav()
			}, 100)
		}
	}
	var r = !o,
		b = this;
	if (e) var k = function(o, e, t) {
			var N = t.NotebookId,
				a = $(o.target).closest(".friend-notebooks").attr("fromUserId");
			Share.changeNotebook(a, N)
		},
		i = null;
	else var k = function(o, e, t) {
			var N = t.NotebookId;
			Notebook.changeNotebook(N)
		},
		i = function(o) {
			var e = $(o.target).attr("notebookId");
			Notebook.isAllNotebookId(e) || Notebook.isTrashNotebookId(e) || b.updateNotebookTitle(o.target)
		};
	var s = {
		view: {
			showLine: !1,
			showIcon: !1,
			selectedMulti: !1,
			dblClickExpand: !1,
			addDiyDom: t
		},
		data: {
			key: {
				name: "Title",
				children: "Subs"
			}
		},
		edit: {
			enable: !0,
			showRemoveBtn: !1,
			showRenameBtn: !1,
			drag: {
				isMove: r,
				prev: r,
				inner: r,
				next: r
			}
		},
		callback: {
			beforeDrag: N,
			beforeDrop: a,
			onDrop: n,
			onClick: k,
			onDblClick: i,
			beforeRename: function(o, e, t) {
				if ("" == t) return e.IsNew ? (b.tree.removeNode(e), !0) : !1;
				if (e.Title == t) return !0;
				if (e.IsNew) {
					var N = e.getParentNode(),
						a = N ? N.NotebookId : "";
					b.doAddNotebook(e.NotebookId, t, a)
				} else b.doUpdateNotebookTitle(e.NotebookId, t);
				return !0
			}
		}
	};
	return s
}, Notebook.allNotebookId = "0", Notebook.trashNotebookId = "-1", Notebook.curNotebookIsTrashOrAll = function() {
	return Notebook.curNotebookId == Notebook.trashNotebookId || Notebook.curNotebookId == Notebook.allNotebookId
}, Notebook.renderNotebooks = function(o) {
	var e = this;
	(!o || "object" != typeof o || o.length < 0) && (o = []);
	for (var t = 0, N = o.length; N > t; ++t) {
		var a = o[t];
		a.Title = trimTitle(a.Title)
	}
	o = [{
		NotebookId: Notebook.allNotebookId,
		Title: getMsg("all"),
		drop: !1,
		drag: !1
	}].concat(o), o.push({
		NotebookId: Notebook.trashNotebookId,
		Title: getMsg("trash"),
		drop: !1,
		drag: !1
	}), Notebook.notebooks = o, e.tree = $.fn.zTree.init($("#notebookList"), e.getTreeSetting(), o);
	var n = $("#notebookList");
	n.hover(function() {
		$(this).hasClass("showIcon") || $(this).addClass("showIcon")
	}, function() {
		$(this).removeClass("showIcon")
	}), isEmpty(o) || (Notebook.curNotebookId = o[0].NotebookId, e.cacheAllNotebooks(o)), Notebook.renderNav(), Notebook.changeNotebookNavForNewNote(o[0].NotebookId)
}, Notebook.cacheAllNotebooks = function(o) {
	var e = this;
	for (var t in o) {
		var N = o[t];
		Notebook.cache[N.NotebookId] = N, isEmpty(N.Subs) || e.cacheAllNotebooks(N.Subs)
	}
}, Notebook.expandNotebookTo = function(o, e) {
	var t = this,
		N = !1,
		a = t.tree;
	if (e && (a = Share.trees[e]), a) {
		var n = a.getNodeByTId(o);
		if (n) for (;;) {
			var r = n.getParentNode();
			if (!r) {
				N || Notebook.changeNotebookNav(o);
				break
			}
			a.expandNode(r, !0), N || (Notebook.changeNotebookNav(o), N = !0), n = r
		}
	}
}, Notebook.renderNav = function() {
	var o = this;
	o.changeNav()
}, Notebook.searchNotebookForAddNote = function(o) {
	var e = this;
	if (o) {
		var t = e.tree.getNodesByParamFuzzy("Title", o);
		t = t || [];
		var N = [];
		for (var a in t) {
			var n = t[a].NotebookId;
			e.isAllNotebookId(n) || e.isTrashNotebookId(n) || N.push(t[a])
		}
		$("#notebookNavForNewNote").html(isEmpty(N) ? "" : e.getChangedNotebooks(N))
	} else $("#notebookNavForNewNote").html(e.everNavForNewNote)
}, Notebook.searchNotebookForList = function(o) {
	var e = this,
		t = $("#notebookListForSearch"),
		N = $("#notebookList");
	if (o) {
		t.show(), N.hide();
		var a = e.tree.getNodesByParamFuzzy("Title", o);
		if (log("search"), log(a), isEmpty(a)) t.html("");
		else {
			var n = e.getTreeSetting(!0);
			e.tree2 = $.fn.zTree.init(t, n, a)
		}
	} else e.tree2 = null, t.hide(), N.show(), $("#notebookNavForNewNote").html(e.everNavForNewNote)
}, Notebook.getChangedNotebooks = function(o) {
	for (var e = this, t = "", N = o.length, a = 0; N > a; ++a) {
		var n = o[a],
			r = "";
		isEmpty(n.Subs) || (r = "dropdown-submenu");
		var b = tt('<li role="presentation" class="clearfix ?"><div class="new-note-left pull-left" title="为该笔记本新建笔记" href="#" notebookId="?">?</div><div title="为该笔记本新建markdown笔记" class="new-note-right pull-left" notebookId="?">M</div>', r, n.NotebookId, n.Title, n.NotebookId);
		isEmpty(n.Subs) || (b += "<ul class='dropdown-menu'>", b += e.getChangedNotebooks(n.Subs), b += "</ul>"), b += "</li>", t += b
	}
	return t
}, Notebook.everNavForNewNote = "", Notebook.everNotebooks = [], Notebook.changeNav = function() {
	var o = Notebook,
		e = Notebook.tree.getNodes(),
		t = e.slice(1, -1),
		N = o.getChangedNotebooks(t);
	o.everNavForNewNote = N, o.everNotebooks = t, $("#notebookNavForNewNote").html(N), Note.initContextmenu(), Share.initContextmenu(Note.notebooksCopy)
}, Notebook.renderShareNotebooks = function(o, e) {
	if (!isEmpty(o) && e && "object" == typeof e && !(e.length < 0)) {
		var t = $("#shareNotebooks"),
			N = {};
		for (var a in e) {
			var n = e[a];
			N[n.UserId] = n
		}
		for (var a in o) {
			var r = o[a],
				n = N[r.UserId] || {
					ShareNotebooks: []
				};
			n.ShareNotebooks = [{
				NotebookId: "-2",
				Title: "默认共享"
			}].concat(n.ShareNotebooks);
			var b = r.Username || r.Email,
				k = tt('<div class="folderNote closed"><div class="folderHeader"><a><h1 title="? 的共享"><i class="fa fa-angle-right"></i>?</h1></a></div>', b, b),
				i = '<ul class="folderBody">';
			for (var s in n.ShareNotebooks) {
				var d = n.ShareNotebooks[s];
				i += tt('<li><a notebookId="?">?</a></li>', d.NotebookId, d.Title)
			}
			i += "</ul>", t.append(k + i + "</div>")
		}
	}
}, Notebook.selectNotebook = function(o) {
	$(".notebook-item").removeClass("curSelectedNode"), $(o).addClass("curSelectedNode")
}, Notebook.changeNotebookNavForNewNote = function(o, e) {
	if (!o) {
		var t = Notebook.notebooks[0];
		o = t.NotebookId, e = t.Title
	}
	if (!e) {
		var t = Notebook.cache[0];
		e = t.Title
	}
	if (Notebook.isAllNotebookId(o) || Notebook.isTrashNotebookId(o)) {
		if (!$("#curNotebookForNewNote").attr("notebookId") && Notebook.notebooks.length > 2) {
			var t = Notebook.notebooks[1];
			o = t.NotebookId, e = t.Title, Notebook.changeNotebookNavForNewNote(o, e)
		}
	} else $("#curNotebookForNewNote").html(e).attr("notebookId", o)
}, Notebook.toggleToMyNav = function() {
	$("#sharedNotebookNavForListNav").hide(), $("#myNotebookNavForListNav").show(), $("#newMyNote").show(), $("#newSharedNote").hide(), $("#tagSearch").hide()
}, Notebook.changeNotebookNav = function(o) {
	Notebook.curNotebookId = o, Notebook.toggleToMyNav(), Notebook.selectNotebook($(tt('#notebook [notebookId="?"]', o)));
	var e = Notebook.cache[o];
	e && ($("#curNotebookForListNote").html(e.Title), Notebook.changeNotebookNavForNewNote(o, e.Title))
}, Notebook.isAllNotebookId = function(o) {
	return o == Notebook.allNotebookId
}, Notebook.isTrashNotebookId = function(o) {
	return o == Notebook.trashNotebookId
}, Notebook.curActiveNotebookIsAll = function() {
	return Notebook.isAllNotebookId($("#notebookList .curSelectedNode").attr("notebookId"))
}, Notebook.curActiveNotebookIsTrash = function() {
	return Notebook.isTrashNotebookId($("#notebookList .curSelectedNode").attr("notebookId"))
}, Notebook.changeNotebookSeq = 1, Notebook.changeNotebook = function(o, e) {
	var t = this;
	Notebook.changeNotebookNav(o), Notebook.curNotebookId = o, Note.curChangedSaveIt(), Note.clearAll();
	// var N = "/note/listNotes/",
	console.log("2796 line", o)
	var N = "/api/note/sub_list/",
		a = {
			notebookId: o
		};
	// if (Notebook.isTrashNotebookId(o)) N = "/note/listTrashNotes", a = {};
	if (Notebook.isTrashNotebookId(o)) N = "/api/note/trash_list", a = {};
	else if (Notebook.isAllNotebookId(o)) {
		if (a = {}, cacheNotes = Note.getNotesByNotebookId(), !isEmpty(cacheNotes)) return void(e ? e(cacheNotes) : Note.renderNotesAndFirstOneContent(cacheNotes, !0))
	} else {
		cacheNotes = Note.getNotesByNotebookId(o);
		var n = Notebook.cache[o],
			r = cacheNotes ? cacheNotes.length : 0;
		if (r == n.NumberNotes) return void(e ? e(cacheNotes) : Note.renderNotesAndFirstOneContent(cacheNotes, !0));
		Note.clearCacheByNotebookId(o), log("数量不一致")
	}
	t.showNoteAndEditorLoading(), t.changeNotebookSeq++, function(o) {
		ajaxGet(N, a, function(N) {
			return o != t.changeNotebookSeq ? (log("notebook changed too fast!"), void log(N)) : (e ? e(N) : Note.renderNotesAndFirstOneContent(N, !1), void t.hideNoteAndEditorLoading())
		})
	}(t.changeNotebookSeq)
}, Notebook.showNoteAndEditorLoading = function() {
	$("#noteAndEditorMask").show()
}, Notebook.hideNoteAndEditorLoading = function() {
	$("#noteAndEditorMask").hide()
}, Notebook.isCurNotebook = function(o) {
	return "active" == $(tt('#notebookList [notebookId="?"], #shareNotebooks [notebookId="?"]', o, o)).attr("class")
}, Notebook.changeNotebookForNewNote = function(o) {
	if (!Notebook.isTrashNotebookId(o) && !Notebook.isAllNotebookId(o)) {
		Notebook.changeNotebookNav(o, !0), Notebook.curNotebookId = o;
		// var e = "/note/listNotes/",
		console.log("2797line", o)
		// var N = "/api/note/sub_list/?notebookId=" + o,
		var e = "/api/note/sub_list/",
			t = {
				notebookId: o
			};
		ajaxGet(e, t, function(o) {
			Note.renderNotes(o, !0)
		})
	}
}, Notebook.listNotebookShareUserInfo = function(o) {
	var e = $(o).attr("notebookId");
	showDialogRemote("/share/listNotebookShareUserInfo", {
		notebookId: e
	})
}, Notebook.shareNotebooks = function(o) {
	var e = $(o).text();
	showDialog("dialogShareNote", {
		title: "分享笔记本给好友-" + e
	}), setTimeout(function() {
		$("#friendsEmail").focus()
	}, 500);
	var t = $(o).attr("notebookId");
	shareNoteOrNotebook(t, !1)
}, Notebook.setNotebook2Blog = function(o) {
	var e = $(o).attr("notebookId"),
		t = Notebook.cache[e],
		N = !0;
	void 0 != t.IsBlog && (N = !t.IsBlog), Notebook.curNotebookId == e ? N ? $(".item").addClass("item-b") : $(".item").removeClass("item-b") : Notebook.curNotebookId == Notebook.allNotebookId && $("#noteItemList .item").each(function() {
		var o = $(this).attr("noteId"),
			t = Note.cache[o];
		t.NotebookId == e && (N ? $(this).addClass("item-b") : $(this).removeClass("item-b"))
	}), ajaxPost("/notebook/setNotebook2Blog", {
		notebookId: e,
		isBlog: N
	}, function(o) {
		o && (Note.setAllNoteBlogStatus(e, N), Notebook.setCache({
			NotebookId: e,
			IsBlog: N
		}))
	})
}, Notebook.updateNotebookTitle = function(o) {
	var e = Notebook,
		t = $(o).attr("notebookId");
	e.tree2 ? e.tree2.editName(e.tree2.getNodeByTId(t)) : e.tree.editName(e.tree.getNodeByTId(t))
}, Notebook.doUpdateNotebookTitle = function(o, e) {
	var t = Notebook;
	ajaxPost(/*/notebook/updateNotebookTitle*/"/api/notebook/update_notebook_title/", {
		notebookId: o,
		title: e
	}, function() {
		if (Notebook.cache[o].Title = e, Notebook.changeNav(), t.tree2) {
			var N = t.tree.getNodeByTId(o);
			N.Title = e, t.tree.updateNode(N)
		}
	})
}, Notebook.addNotebookSeq = 1, Notebook.addNotebook = function() {
	var o = Notebook;
	$("#myNotebooks").hasClass("closed") && $("#myNotebooks .folderHeader").trigger("click"), o.tree.addNodes(null, {
		Title: "",
		NotebookId: getObjectId(),
		IsNew: !0
	}, !0, !0)
}, Notebook.doAddNotebook = function(o, e, t) {
	var N = Notebook;
	ajaxPost(/*/notebook/addNotebook*/"/api/notebook/add_notebook/", {
		notebookId: o,
		title: e,
		parentNotebookId: t
	}, function(e) {
		if (e.NotebookId) {
			Notebook.cache[e.NotebookId] = e;
			var t = N.tree.getNodeByTId(o);
			$.extend(t, e), t.IsNew = !1, Notebook.changeNotebook(o), Notebook.changeNav()
		}
	})
}, Notebook.addChildNotebook = function(o) {
	var e = Notebook;
	$("#myNotebooks").hasClass("closed") && $("#myNotebooks .folderHeader").trigger("click");
	var t = $(o).attr("notebookId");
	e.tree.addNodes(e.tree.getNodeByTId(t), {
		Title: "",
		NotebookId: getObjectId(),
		IsNew: !0
	}, !1, !0)
}, Notebook.deleteNotebook = function(o) {
	var e = Notebook,
		t = $(o).attr("notebookId");
	t && ajaxGet(/*/notebook/deleteNotebook*/"/api/notebook/delete_notebook/", {
		notebookId: t
	}, function(o) {
		o.Ok ? (e.tree.removeNode(e.tree.getNodeByTId(t)), e.tree2 && e.tree2.removeNode(e.tree2.getNodeByTId(t)), delete Notebook.cache[t], Notebook.changeNav()) : alert(o.Msg)
	})
}, $(function() {
	function o(o) {
		var e = $(this).attr("notebookId"),
			t = Notebook.cache[e];
		if (t) {
			var N = [];
			N.push(t.IsBlog ? "set2Blog" : "unset2Blog"), Note.notebookHasNotes(e) && N.push("delete"), o.applyrule({
				name: "target2",
				disable: !0,
				items: N
			})
		}
	}
	function e() {
		var o = $(this).attr("notebookId");
		return !Notebook.isTrashNotebookId(o) && !Notebook.isAllNotebookId(o)
	}
	$("#minNotebookList").on("click", "li", function() {
		var o = $(this).find("a").attr("notebookId");
		Notebook.changeNotebook(o)
	});
	var t = {
		width: 180,
		items: [{
			text: getMsg("shareToFriends"),
			alias: "shareToFriends",
			icon: "",
			faIcon: "fa-share-square-o",
			action: Notebook.listNotebookShareUserInfo
		}, {
			type: "splitLine"
		}, {
			text: getMsg("publicAsBlog"),
			alias: "set2Blog",
			faIcon: "fa-bold",
			action: Notebook.setNotebook2Blog
		}, {
			text: getMsg("cancelPublic"),
			alias: "unset2Blog",
			faIcon: "fa-undo",
			action: Notebook.setNotebook2Blog
		}, {
			type: "splitLine"
		}, {
			text: getMsg("addChildNotebook"),
			faIcon: "fa-sitemap",
			action: Notebook.addChildNotebook
		}, {
			text: getMsg("rename"),
			faIcon: "fa-pencil",
			action: Notebook.updateNotebookTitle
		}, {
			text: getMsg("delete"),
			icon: "",
			alias: "delete",
			faIcon: "fa-trash-o",
			action: Notebook.deleteNotebook
		}],
		onShow: o,
		onContextMenu: e,
		parent: "#notebookList ",
		children: "li a"
	},
		N = {
			width: 180,
			items: [{
				text: getMsg("shareToFriends"),
				alias: "shareToFriends",
				icon: "",
				faIcon: "fa-share-square-o",
				action: Notebook.listNotebookShareUserInfo
			}, {
				type: "splitLine"
			}, {
				text: getMsg("publicAsBlog"),
				alias: "set2Blog",
				faIcon: "fa-bold",
				action: Notebook.setNotebook2Blog
			}, {
				text: getMsg("cancelPublic"),
				alias: "unset2Blog",
				faIcon: "fa-undo",
				action: Notebook.setNotebook2Blog
			}, {
				type: "splitLine"
			}, {
				text: getMsg("rename"),
				icon: "",
				action: Notebook.updateNotebookTitle
			}, {
				text: getMsg("delete"),
				icon: "",
				alias: "delete",
				faIcon: "fa-trash-o",
				action: Notebook.deleteNotebook
			}],
			onShow: o,
			onContextMenu: e,
			parent: "#notebookListForSearch ",
			children: "li a"
		};
	Notebook.contextmenu = $("#notebookList li a").contextmenu(t), Notebook.contextmenuSearch = $("#notebookListForSearch li a").contextmenu(N), $("#addNotebookPlus").click(function(o) {
		o.stopPropagation(), Notebook.addNotebook()
	}), $("#notebookList").on("click", ".notebook-setting", function(o) {
		o.preventDefault(), o.stopPropagation();
		var e = $(this).parent();
		Notebook.contextmenu.showMenu(o, e)
	}), $("#notebookListForSearch").on("click", ".notebook-setting", function(o) {
		o.preventDefault(), o.stopPropagation();
		var e = $(this).parent();
		Notebook.contextmenuSearch.showMenu(o, e)
	})
});

function addShareNoteOrNotebook(e) {
	var t = "#tr" + e,
		o = Share.dialogNoteOrNotebookId,
		r = isEmailFromInput(t + " #friendsEmail", "#shareMsg", getMsg("inputFriendEmail"));
	if (r) {
		var a = $(t + ' input[name="perm' + e + '"]:checked').val() || 0,
			n = a,
			s = "/share/addShareNote",
			i = {
				noteId: o,
				emails: [r],
				perm: a
			};
		Share.dialogIsNote || (s = "/share/addShareNotebook", i = {
			notebookId: o,
			emails: [r],
			perm: a
		}), hideAlert("#shareMsg"), post(s, i, function(e) {
			var e = e[r];
			if (e) if (e.Ok) {
				var a = tt("<td>?</td>", "#");
				a += tt("<td>?</td>", r), a += tt('<td><a href="#" noteOrNotebookId="?" perm="?" toUserId="?" title="' + getMsg("clickToChangePermission") + '" class="btn btn-default change-perm">?</a></td>', o, n, e.Id, getMsg(n && "0" != n ? "writable" : "readOnly")), a += tt('<td><a href="#" noteOrNotebookId="?" toUserId="?" class="btn btn-warning delete-share">' + getMsg("delete") + "</a></td>", o, e.Id), $(t).html(a)
			} else {
				var s = UrlPrefix + "/register?iu=" + UserInfo.Username;
				showAlert("#shareMsg", getMsg("friendNotExits", [getMsg("app"), '<input style="background: none;border: 1px solid #ccc;width: 300px;padding: 3px;border-radius: 3px;outline: none;" onclick="$(this).focus().select()" type="text" value="' + s + '" />']) + "</a> <br /> " + getMsg("sendInviteEmailToYourFriend") + ', <a href="#" onclick="sendRegisterEmail(\'' + r + "')\">" + getMsg("send"), "warning")
			}
		}, t + " .btn-success")
	}
}
function sendRegisterEmail(e) {
	showDialog2("#sendRegisterEmailDialog", {
		postShow: function() {
			$("#emailContent").val(getMsg("inviteEmailBody", [UserInfo.Username, getMsg("app")])), setTimeout(function() {
				$("#emailContent").focus()
			}, 500), $("#toEmail").val(e)
		}
	})
}
function deleteShareNoteOrNotebook(e) {
	$("#tr" + e).remove()
}
Share.defaultNotebookId = "share0", Share.defaultNotebookTitle = getMsg("defaultShare"), Share.sharedUserInfos = {}, Share.userNavs = {}, Share.notebookCache = {}, Share.cache = {}, Share.dialogIsNote = !0, Share.setCache = function(e) {
	e && e.NoteId && (Share.cache[e.NoteId] = e)
}, Share.getNotebooksForNew = function(e, t) {
	for (var o = this, r = "", a = t.length, n = 0; a > n; ++n) {
		var s = t[n];
		s.IsShared = !0, s.UserId = e, o.notebookCache[s.NotebookId] = s, Notebook.cache[s.NotebookId] = s;
		var i = "",
			d = !1;
		if (!isEmpty(s.Subs)) {
			log(11), log(s.Subs);
			var d = o.getNotebooksForNew(e, s.Subs);
			d && (i = "dropdown-submenu")
		}
		var h = "";
		if (s.Perm) {
			var h = tt('<li role="presentation" class="clearfix ?" userId="?" notebookId="?"><div class="new-note-left pull-left" title="为该笔记本新建笔记" href="#">?</div><div title="为该笔记本新建markdown笔记" class="new-note-right pull-left">M</div>', i, e, s.NotebookId, s.Title);
			d && (h += "<ul class='dropdown-menu'>", h += d, h += "</ul>"), h += "</li>"
		}
		r += h
	}
	return r
}, Share.trees = {}, Share.renderShareNotebooks = function(e, t) {
	function o() {}
	function r() {
		var e = $(this).attr("notebookId");
		return !Share.isDefaultNotebookId(e)
	}
	var a = Share;
	if (!isEmpty(e)) {
		(!t || "object" != typeof t || t.length < 0) && (t = {});
		var n = $("#shareNotebooks");
		for (var s in e) {
			var i = e[s],
				d = t[i.UserId] || [];
			userNotebooks = [{
				NotebookId: a.defaultNotebookId,
				Title: Share.defaultNotebookTitle
			}].concat(d), a.notebookCache[a.defaultNotebookId] = userNotebooks[0];
			var h = i.Username || i.Email;
			i.Username = h, Share.sharedUserInfos[i.UserId] = i;
			var l = i.UserId,
				c = tt('<li class="each-user"><div class="friend-header" fromUserId="?"><i class="fa fa-angle-down"></i><span>?</span> <span class="fa notebook-setting" title="setting"></span> </div>', i.UserId, h),
				N = "friendContainer_" + l,
				u = '<ul class="friend-notebooks ztree" id="' + N + '" fromUserId="' + l + '"></ul>';
			n.append(c + u + "</li>"), a.trees[l] = $.fn.zTree.init($("#" + N), Notebook.getTreeSetting(!0, !0), userNotebooks), a.userNavs[l] = {
				forNew: a.getNotebooksForNew(l, d)
			}, log(a.userNavs)
		}
		$(".friend-notebooks").hover(function() {
			$(this).hasClass("showIcon") || $(this).addClass("showIcon")
		}, function() {
			$(this).removeClass("showIcon")
		}), $(".friend-header i").click(function() {
			var e = $(this),
				t = $(this).parent().next();
			t.is(":hidden") ? (t.slideDown("fast"), e.removeClass("fa-angle-right fa-angle-down").addClass("fa-angle-down")) : (t.slideUp("fast"), e.removeClass("fa-angle-right fa-angle-down").addClass("fa-angle-right"))
		});
		var f = {
			width: 180,
			items: [{
				text: getMsg("deleteSharedNotebook"),
				icon: "",
				faIcon: "fa-trash-o",
				action: Share.deleteShareNotebook
			}],
			onShow: o,
			onContextMenu: r,
			parent: "#shareNotebooks",
			children: ".notebook-item"
		},
			b = $("#shareNotebooks").contextmenu(f),
			k = {
				width: 180,
				items: [{
					text: getMsg("deleteAllShared"),
					icon: "",
					faIcon: "fa-trash-o",
					action: Share.deleteUserShareNoteAndNotebook
				}],
				parent: "#shareNotebooks",
				children: ".friend-header"
			},
			g = $("#shareNotebooks").contextmenu(k);
		$(".friend-header").on("click", ".notebook-setting", function(e) {
			e.preventDefault(), e.stopPropagation();
			var t = $(this).parent();
			g.showMenu(e, t)
		}), $("#shareNotebooks .notebook-item").on("click", ".notebook-setting", function(e) {
			e.preventDefault(), e.stopPropagation();
			var t = $(this).parent();
			b.showMenu(e, t)
		})
	}
}, Share.isDefaultNotebookId = function(e) {
	return Share.defaultNotebookId == e
}, Share.toggleToSharedNav = function(e, t) {
	$("#curNotebookForListNote").html(Share.notebookCache[t].Title + "(" + Share.sharedUserInfos[e].Username + ")"), Note.listIsIn(!1, !1, !0);
	var o = Share.userNavs[e].forNew;
	if (o) {
		$("#notebookNavForNewSharedNote").html(o);
		var r = "",
			a = "";
		if (Share.notebookCache[t].Perm) r = t, a = Share.notebookCache[t].Title;
		else {
			var n = $("#notebookNavForNewSharedNote li").eq(0);
			r = n.attr("notebookId"), a = n.find(".new-note-left").text()
		}
		$("#curNotebookForNewSharedNote").html(a + "(" + Share.sharedUserInfos[e].Username + ")"), $("#curNotebookForNewSharedNote").attr("notebookId", r), $("#curNotebookForNewSharedNote").attr("userId", e), $("#newSharedNote").show(), $("#newMyNote").hide()
	} else $("#newMyNote").show(), $("#newSharedNote").hide();
	$("#tagSearch").hide()
}, Share.firstRenderShareNote = function(e, t, o) {
	$("#myShareNotebooks .folderHeader").trigger("click"), Notebook.expandNotebookTo(t, e), Share.changeNotebook(e, t, function(e) {
		Note.renderNotes(e), Note.changeNoteForPjax(o, !1, !1)
	})
}, Share.changeNotebook = function(e, t, o) {
	var r = this;
	Notebook.curNotebookId = t;
	var a = $(tt('#friendContainer_? a[notebookId="?"]', e, t));
	0 == a.length ? (Notebook.selectNotebook($(tt('#friendContainer_? a[notebookId="?"]', e, r.defaultNotebookId))), t = r.defaultNotebookId) : Notebook.selectNotebook(a), Share.toggleToSharedNav(e, t), Note.curChangedSaveIt(), Note.clearAll();
	var n = "/share/listShareNotes",
		s = {
			userId: e
		};
	Share.isDefaultNotebookId(t) || (s.notebookId = t), ajaxGet(n, s, function(e) {
		s.notebookId, o ? o(e) : (Note.renderNotes(e, !1, !0), isEmpty(e) || Note.changeNoteForPjax(e[0].NoteId, !0, !1))
	})
}, Share.hasUpdatePerm = function(e) {
	var t = Share.cache[e];
	return t || (t = Note.getNote(e)), t && t.Perm ? !0 : !1
}, Share.deleteShareNotebook = function(e) {
	if (confirm("Are you sure to delete it?")) {
		var t = $(e).attr("notebookId"),
			o = $(e).closest(".friend-notebooks").attr("fromUserId");
		ajaxGet("/share/DeleteShareNotebookBySharedUser", {
			notebookId: t,
			fromUserId: o
		}, function(t) {
			t && $(e).parent().remove()
		})
	}
}, Share.deleteShareNote = function(e) {
	var t = $(e).attr("noteId"),
		o = $(e).attr("fromUserId");
	ajaxGet("/share/DeleteShareNoteBySharedUser", {
		noteId: t,
		fromUserId: o
	}, function(t) {
		t && $(e).remove()
	})
}, Share.deleteUserShareNoteAndNotebook = function(e) {
	if (confirm("Are you sure to delete all shared notebooks and notes?")) {
		var t = $(e).attr("fromUserId");
		ajaxGet("/share/deleteUserShareNoteAndNotebook", {
			fromUserId: t
		}, function(t) {
			t && $(e).parent().remove()
		})
	}
}, Share.changeNotebookForNewNote = function(e) {
	Notebook.selectNotebook($(tt('#shareNotebooks [notebookId="?"]', e)));
	var t = Share.notebookCache[e].UserId;
	Share.toggleToSharedNav(t, e);
	var o = "/share/listShareNotes",
		r = {
			userId: t,
			notebookId: e
		};
	ajaxGet(o, r, function(e) {
		Note.renderNotes(e, !0, !0)
	})
}, Share.deleteSharedNote = function(e, t) {
	Note.deleteNote(e, t, !0)
}, Share.copySharedNote = function(e, t) {
	Note.copyNote(e, t, !0)
}, Share.contextmenu = null, Share.initContextmenu = function(e) {
	function t(e) {
		var t = $(this).attr("noteId"),
			o = Note.getNote(t),
			r = [];
		(Note.inBatch || !o) && r.push("delete"), !o || o.Perm && o.CreatedUserId == UserInfo.UserId || r.push("delete"), e.applyrule({
			name: "target...",
			disable: !0,
			items: r
		})
	}
	Share.contextmenu && Share.contextmenu.destroy();
	var o = {
		width: 180,
		items: [{
			text: getMsg("copyToMyNotebook"),
			alias: "copy",
			faIcon: "fa-copy",
			type: "group",
			width: 180,
			items: e
		}, {
			type: "splitLine"
		}, {
			text: getMsg("delete"),
			alias: "delete",
			icon: "",
			faIcon: "fa-trash-o",
			action: Share.deleteSharedNote
		}],
		onShow: t,
		parent: "#noteItemList",
		children: ".item-shared"
	};
	Share.contextmenu = $("#noteItemList .item-shared").contextmenu(o)
}, $(function() {
	$("#noteItemList").on("click", ".item-shared .item-setting", function(e) {
		e.preventDefault(), e.stopPropagation();
		var t = $(this).parent();
		Share.contextmenu.showMenu(e, t)
	}), $("#newSharedNoteBtn").click(function() {
		var e = $("#curNotebookForNewSharedNote").attr("notebookId"),
			t = $("#curNotebookForNewSharedNote").attr("userId");
		Note.newNote(e, !0, t)
	}), $("#newShareNoteMarkdownBtn").click(function() {
		var e = $("#curNotebookForNewSharedNote").attr("notebookId"),
			t = $("#curNotebookForNewSharedNote").attr("userId");
		Note.newNote(e, !0, t, !0)
	}), $("#notebookNavForNewSharedNote").on("click", "li div", function() {
		var e = $(this).parent().attr("notebookId"),
			t = $(this).parent().attr("userId");
		"M" == $(this).text() ? Note.newNote(e, !0, t, !0) : Note.newNote(e, !0, t)
	}), $("#leanoteDialogRemote").on("click", ".change-perm", function() {
		var e = this,
			t = $(this).attr("perm"),
			o = $(this).attr("noteOrNotebookId"),
			r = $(this).attr("toUserId"),
			a = getMsg("writable"),
			n = "1";
		"1" == t && (a = getMsg("readOnly"), n = "0");
		var s = "/share/updateShareNotebookPerm",
			i = {
				perm: n,
				toUserId: r
			};
		Share.dialogIsNote ? (s = "/share/updateShareNotePerm", i.noteId = o) : i.notebookId = o, ajaxGet(s, i, function(t) {
			t && ($(e).html(a), $(e).attr("perm", n))
		})
	}), $("#leanoteDialogRemote").on("click", ".delete-share", function() {
		var e = this,
			t = $(this).attr("noteOrNotebookId"),
			o = $(this).attr("toUserId"),
			r = "/share/deleteShareNotebook",
			a = {
				toUserId: o
			};
		Share.dialogIsNote ? (r = "/share/deleteShareNote", a.noteId = t) : a.notebookId = t, ajaxGet(r, a, function(t) {
			t && $(e).parent().parent().remove()
		})
	});
	var e = 1;
	$("#leanoteDialogRemote").on("click", "#addShareNotebookBtn", function() {
		e++;
		var t = '<tr id="tr' + e + '"><td>#</td><td><input id="friendsEmail" type="text" class="form-control" style="width: 200px" placeholder="' + getMsg("friendEmail") + '"/></td>';
		t += '<td><label for="readPerm' + e + '"><input type="radio" name="perm' + e + '" checked="checked" value="0" id="readPerm' + e + '"> ' + getMsg("readOnly") + "</label>", t += ' <label for="writePerm' + e + '"><input type="radio" name="perm' + e + '" value="1" id="writePerm' + e + '"> ' + getMsg("writable") + "</label></td>", t += '<td><button class="btn btn-success" onclick="addShareNoteOrNotebook(' + e + ')">' + getMsg("share") + "</button>", t += ' <button class="btn btn-warning" onclick="deleteShareNoteOrNotebook(' + e + ')">' + getMsg("delete") + "</button>", t += "</td></tr>", $("#shareNotebookTable tbody").prepend(t), $("#tr" + e + " #friendsEmail").focus()
	}), $("#registerEmailBtn").click(function() {
		var e = $("#emailContent").val(),
			t = $("#toEmail").val();
		return e ? void post("/user/sendRegisterEmail", {
			content: e,
			toEmail: t
		}, function() {
			showAlert("#registerEmailMsg", getMsg("sendSuccess"), "success"), hideDialog2("#sendRegisterEmailDialog", 1e3)
		}, this) : void showAlert("#registerEmailMsg", getMsg("emailBodyRequired"), "danger")
	})
});