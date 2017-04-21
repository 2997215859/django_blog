require = window.require
define("note_info", [], function() {
	var t = ["<table>", "<tr><th>" + getMsg("Create Time") + '</th><td id="noteInfoCreatedTime"></td></tr>', "<tr><th>" + getMsg("Update Time") + '</th><td id="noteInfoUpdatedTime"></td></tr>', '<tr class="noteInfoSource-tr"><th>' + getMsg("Source") + '</th><td id="noteInfoSource"></td></tr>', '<tr class="post-url-tr">', "<th>" + getMsg("Post Url") + "</th>", "<td>", '<div class="post-url-wrap">', '<span class="post-url-base">http://blog.leanote.com/life/post/</span><span><span class="post-url-text">life-life-life-a-leanote</span>', '<input type="text" class="form-control">', "</span>", ' <a class="post-url-pencil" title="' + getMsg("update") + '"><i class="fa fa-pencil"></i></a>', "</div>", "</td>", "</tr>", "</table>"].join(""),
		e = $(t),
		o = e.find("#noteInfoCreatedTime"),
		n = e.find("#noteInfoUpdatedTime"),
		r = e.find("#noteInfoSource"),
		i = e.find(".noteInfoSource-tr"),
		l = (e.find("#noteInfoPostUrl"), e.find(".post-url-tr")),
		d = e.find(".post-url-wrap"),
		s = e.find("input"),
		a = e.find(".post-url-base"),
		f = e.find(".post-url-text"),
		c = {
			$noteInfo: $("#noteInfo"),
			note: null,
			bind: function() {
				var t = this;
				$("#noteInfoDropdown").click(function() {
					t.render()
				}), e.find(".post-url-pencil").click(function() {
					d.addClass("post-url-edit"), s.val(decodeURI(t.note.UrlTitle)), s.focus()
				}), s.keydown(function(t) {
					13 === t.keyCode && s.blur()
				}), s.blur(function() {
					d.removeClass("post-url-edit");
					var e = s.val();
					e && ajaxPost("/member/blog/updateBlogUrlTitle", {
						noteId: t.note.NoteId,
						urlTitle: e
					}, function(e) {
						if (reIsOk(e)) {
							var o = encodeURI(e.Item);
							t.note.UrlTitle = o, f.text(decodeURI(t.note.UrlTitle))
						} else alert(e.Msg || "error")
					})
				}), LEA.on("noteChanged", function(e) {
					t.render(e)
				})
			},
			getPostUrl: function() {
				return ""
			},
			rendered: !1,
			render: function(t) {
				var d = this;
				t || (t = Note.getCurNote()), t && (d.note = t, o.html(goNowToDatetime(t.CreatedTime)), n.html(goNowToDatetime(t.UpdatedTime)), t.Src ? (r.html('<a target="_blank" href="' + t.Src + '">' + t.Src + "</a>"), i.show()) : i.hide(), t.IsBlog ? (l.removeClass("hide"), a.text(UserInfo.PostUrl + "/"), f.text(decodeURI(t.UrlTitle))) : l.addClass("hide"), d.rendered || (d.$noteInfo.html(e), d.rendered = !0))
			},
			init: function() {
				this.bind()
			}
		};
	c.init()
});
define("history", [], function() {
	var t = ['<div class="modal fade history-modal" tabindex="-1" role="dialog" aria-hidden="true">', '<div class="modal-dialog modal-lg ">', '<div class="modal-content">', '<div class="modal-header">', '<h4 class="modal-title" class="modalTitle">NaN', "</div>", '<div class="modal-body clearfix">', '<div class="history-list-wrap pull-left">', '<div class="history-list-header">' + getMsg("history") + ' (<span class="history-num"></span>)</div>', '<div class="history-list list-group"></div>', "</div>", '<div class="history-content-wrap pull-left">', '<div class="history-content-header">', '<a class="btn btn-primary back">' + getMsg("restoreFromThisVersion") + "</a>", '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>', "</div>", '<div class="history-content"></div>', "</div>", "</div>", '<div class="modal-footer hide">', '<button type="button" class="btn btn-default" data-dismiss="modal">' + getMsg("close") + "</button>", "</div>", "</div>", "</div>", "</div>"].join(""),
		i = $(t),
		s = i.find(".history-content"),
		e = i.find(".history-list"),
		o = i.find(".history-num"),
		n = {
			note: null,
			list: [],
			curIndex: 0,
			renderContent: function(t) {
				var i = this.list[t].Content;
				this.curIndex = t;
				var o = "<div>",
					n = "</div>";
				this.note.IsMarkdown && (o = "<pre>", n = "</pre>"), s.html(o + i + n);
				var a = e.find("a");
				a.removeClass("active"), a.eq(t).addClass("active")
			},
			render: function(t) {
				var s = "";
				if (this.list = t, t) for (var n = 0; n < t.length; ++n) {
					var a = t[n];
					s += '<a class="list-group-item" data-index="' + n + '"><span class="badge">#' + (n + 1) + "</span>" + goNowToDatetime(a.UpdatedTime) + "</a>"
				}
				e.html(s), this.renderContent(0), o.html(t.length), i.modal({
					show: !0
				})
			},
			bind: function() {
				var t = this;
				$("#contentHistory").click(function() {
					t.getHistories()
				}), e.on("click", "a", function() {
					var i = $(this).data("index");
					t.renderContent(i)
				}), i.find(".back").click(function() {
					confirm(getMsg("confirmBackup")) && (Note.curChangedSaveIt(!0), note = Note.cache[Note.curNoteId], setEditorContent(t.list[t.curIndex].Content, note.IsMarkdown), i.modal("hide"), Note.curChangedSaveIt(!0))
				})
			},
			getHistories: function() {
				var t = this,
					i = Note.getCurNote();
				t.note = i, ajaxGet("/noteContentHistory/listHistories", {
					noteId: Note.curNoteId
				}, function(i) {
					return isArray(i) ? void t.render(i) : void alert(getMsg("noHistories"))
				})
			},
			init: function() {
				this.bind()
			}
		};
	n.init()
});
var urlPrefix = UrlPrefix;
define("attachment_upload", ["fileupload"], function() {
	function e(e) {
		return "number" != typeof e ? "" : e >= 1e9 ? (e / 1e9).toFixed(2) + " GB" : e >= 1e6 ? (e / 1e6).toFixed(2) + " MB" : (e / 1e3).toFixed(2) + " KB"
	}
	function t(e, t) {
		var a = $(e);
		$(t).bind("dragover", function(e) {
			e.preventDefault();
			var t = window.dropZoneTimeoutAttach;
			t && clearTimeout(t);
			var o = !1,
				i = e.target;
			do {
				if (i === a[0]) {
					o = !0;
					break
				}
				i = i.parentNode
			} while (null != i);
			o ? a.addClass("hover") : a.removeClass("hover"), window.dropZoneTimeoutAttach = setTimeout(function() {
				window.dropZoneTimeoutAttach = null, a.removeClass("in hover")
			}, 100)
		})
	}
	t("#dropAttach", "#uploadAttach");
	var a = function() {
			$(".dropzone .btn-choose-file").click(function() {
				$(this).parent().find("input").click()
			});
			var t = $("#attachUploadMsg");
			$("#uploadAttach").fileupload({
				dataType: "json",
				pasteZone: "",
				dropZone: $("#dropAttach"),
				formData: function() {
					return [{
						name: "noteId",
						value: Note.curNoteId
					}]
				},
				add: function(a, o) {
					var i = Note.getCurNote();
					if (!i || i.IsNew) return void alert("This note hasn't saved, please save it firstly!");
					var r = $('<div class="alert alert-info"><img class="loader" src="/images/ajax-loader.gif"> <a class="close" data-dismiss="alert">×</a></div>');
					r.append(o.files[0].name + " <small>[<i>" + e(o.files[0].size) + "</i>]</small>"), t.html(r), o.context = t;
					var n = o.files[0].size,
						l = +GlobalConfigs.uploadAttachSize || 100;
					if ("number" == typeof n && n > 1048576 * l) return r.find("img").remove(), r.removeClass("alert-info").addClass("alert-danger"), r.append(" Warning: File size is bigger than " + l + "M"), void setTimeout(function(e) {
						return function() {
							e.remove()
						}
					}(r), 3e3);
					var s;
					setTimeout(function() {
						s = o.submit()
					}, 10)
				},
				done: function(t, a) {
					if (1 == a.result.Ok) a.context.html(""), Attach.addAttach(a.result.Item);
					else {
						{
							a.result
						}
						a.context.html("");
						var o = $('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a></div>');
						o.append("<b>Error:</b> " + a.files[0].name + " <small>[<i>" + e(a.files[0].size) + "</i>]</small> " + a.result.Msg), a.context.html(o), setTimeout(function(e) {
							return function() {
								e.remove()
							}
						}(o), 3e3)
					}
					$("#uploadAttachMsg").scrollTop(1e3)
				},
				fail: function(t, a) {
					a.context.html("");
					var o = $('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a></div>');
					o.append("<b>Error:</b> " + a.files[0].name + " <small>[<i>" + e(a.files[0].size) + "</i>]</small> " + a.errorThrown), a.context.html(o), setTimeout(function(e) {
						return function() {
							e.remove()
						}
					}(o), 3e3), $("#uploadAttachMsg").scrollTop(1e3)
				}
			})
		};
	a()
});
var urlPrefix = UrlPrefixHttps;
define("editor_drop_paste", ["fileupload"], function() {
	function e() {
		var e = $("#editorContent").children(),
			t = e && e.length > 0 ? e[e.length - 1] : null;
		t && "P" == t.tagName || $("#editorContent").append('<p><br data-mce-bogus="1"></p>')
	}
	function t(t) {
		var i = "__mcenew" + (new Date).getTime(),
			o = '<div contenteditable="false" id="' + i + '" class="leanote-image-container"><img class="loader" src="/images/ajax-loader.gif"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">0%</div></div></div>';
		this.containerStr = o, t.insertContent(o), e();
		var a = $("#" + i);
		this.container = a, this.id = i, this.processBar = a.find(".progress-bar")
	}
	function i(e, t) {
		function i(e, i) {
			o.parentNode.removeChild(o), t({
				width: e,
				height: i
			})
		}
		var o = document.createElement("img");
		o.onload = function() {
			i(o.clientWidth, o.clientHeight)
		}, o.onerror = function() {
			i()
		}, o.src = e;
		var a = o.style;
		a.visibility = "hidden", a.position = "fixed", a.bottom = a.left = 0, a.width = a.height = "auto", document.body.appendChild(o)
	}
	function o(e) {
		var t = tinymce.activeEditor,
			o = t.dom,
			r = function(t) {
				function r() {
					o.setAttrib(n, "src", t.src), t.title && o.setAttrib(n, "title", t.title), o.setAttrib(n, "id", null)
				}
				var n, s = {};
				s.id = "__mcenew" + a++, s.src = "/images/loading-24.gif", n = o.createHTML("img", s), tinymce.activeEditor.insertContent(n), n = o.get(s.id), i(e.src, r)
			},
			n = "";
		if (fileIds = e.src.split("fileId="), 2 == fileIds.length && fileIds[1].length == "53aecf8a8a039a43c8036282".length && (n = fileIds[1]), n) {
			var s = Note.getCurNote();
			s && s.UserId != UserInfo.UserId ? !
			function(e) {
				ajaxPost("/file/copyImage", {
					userId: UserInfo.UserId,
					fileId: n,
					toUserId: s.UserId
				}, function(t) {
					if (reIsOk(t) && t.Id) {
						var i = window.location.protocol + "//" + window.location.host;
						e.src = i + "/api/file/getImage?fileId=" + t.Id
					}
					r(e)
				})
			}(e) : r(e)
		} else r(e)
	}
	t.prototype.update = function(e) {
		var t = this;
		e = Math.ceil(100 * e), e >= 100 && (e = 99), e += "%", $("#" + t.id + " .progress-bar").html(e).css("width", e)
	}, t.prototype.replace = function(e) {
		var t = this;
		i(e, function() {
			$("#" + t.id).replaceWith('<img src="' + e + '" />')
		})
	}, t.prototype.remove = function() {
		var e = this;
		$("#" + e.id).remove()
	};
	var a = 1,
		r = function() {
			function e(e) {
				return "number" != typeof e ? "" : e >= 1e9 ? (e / 1e9).toFixed(2) + " GB" : e >= 1e6 ? (e / 1e6).toFixed(2) + " MB" : (e / 1e3).toFixed(2) + " KB"
			}
			function t() {
				$("#upload").css("z-index", 12);
				var e = +$("#mceToolbar").css("height").slice(0, -2);
				$("#upload").css("top", e - 8), $("#upload").show()
			}
			function i() {
				$("#upload").css("z-index", 0).css("top", "auto").hide()
			}
			var a = $("#upload ul");
			$("#drop a").click(function() {
				$(this).parent().find("input").click()
			}), $("#upload").fileupload({
				dataType: "json",
				pasteZone: "",
				acceptFileTypes: /(\.|\/)(gif|jpg|jpeg|png|jpe)$/i,
				maxFileSize: 21e4,
				dropZone: $("#drop"),
				formData: function() {
					return [{
						name: "albumId",
						value: ""
					}]
				},
				add: function(t, i) {
					var o = $('<li><div class="alert alert-info"><img class="loader" src="/images/ajax-loader.gif"> <a class="close" data-dismiss="alert">×</a></div></li>');
					o.find("div").append(i.files[0].name + " <small>[<i>" + e(i.files[0].size) + "</i>]</small>"), i.context = o.appendTo(a);
					i.submit()
				},
				done: function(t, i) {
					if (1 == i.result.Ok) {
						i.context.remove();
						var a = {
							src: urlPrefix + "/api/file/getImage?fileId=" + i.result.Id
						};
						o(a)
					} else {
						i.context.empty();
						var r = $('<li><div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a></div></li>');
						r.find("div").append("<b>" + getMsg("Error") + ":</b> " + i.files[0].name + " <small>[<i>" + e(i.files[0].size) + "</i>]</small> " + i.result.Msg), i.context.append(r), setTimeout(function(e) {
							return function() {
								e.remove()
							}
						}(r), 2e3)
					}
					$("#uploadMsg").scrollTop(1e3)
				},
				fail: function(t, i) {
					i.context.empty();
					var o = $('<li><div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a></div></li>');
					o.find("div").append("<b>" + getMsg("Error") + ":</b> " + i.files[0].name + " <small>[<i>" + e(i.files[0].size) + "</i>]</small> " + i.errorThrown), i.context.append(o), setTimeout(function(e) {
						return function() {
							e.remove()
						}
					}(o), 2e3), $("#uploadMsg").scrollTop(1e3)
				}
			}), $(document).on("drop dragover", function(e) {
				e.preventDefault()
			}), $(document).bind("dragover", function(e) {
				var o = $("#drop"),
					a = window.dropZoneTimeout;
				a ? clearTimeout(a) : (o.addClass("in"), t());
				var r = !1,
					n = e.target;
				do {
					if (n === o[0]) {
						r = !0;
						break
					}
					n = n.parentNode
				} while (null != n);
				r ? (o.addClass("hover"), LEA.readOnly && LEA.toggleWriteable()) : o.removeClass("hover"), window.dropZoneTimeout = setTimeout(function() {
					window.dropZoneTimeout = null, o.removeClass("in hover"), i()
				}, 500)
			})
		},
		n = 0,
		s = function() {
			var e, i;
			$("#editorContent, #left-column").fileupload({
				dataType: "json",
				pasteZone: $("#editorContent, #left-column"),
				dropZone: "",
				maxFileSize: 21e4,
				url: "/file/pasteImage",
				paramName: "file",
				formData: function() {
					return [{
						name: "from",
						value: "pasteImage"
					}, {
						name: "noteId",
						value: Note.curNoteId
					}]
				},
				progress: function(t, i) {
					e && !e.IsMarkdown && i.process.update(i.loaded / i.total)
				},
				add: function(o, a) {
					var r = (new Date).getTime();
					if (!(500 > r - n)) {
						n = r;
						var s = Note.getCurNote();
						e = s, !s || s.IsNew, setTimeout(function() {
							if (i = tinymce.EditorManager.activeEditor, !s.IsMarkdown) var e = new t(i);
							a.process = e;
							a.submit()
						}, 20)
					}
				},
				done: function(t, i) {
					if (1 == i.result.Ok) {
						var o = i.result,
							a = UrlPrefixHttps,
							r = a + "/api/file/getImage?fileId=" + o.Id;
						e && !e.IsMarkdown ? i.process.replace(r) : MD && MD.insertLink(r, "title", !0)
					} else i.process.remove()
				},
				fail: function(t, i) {
					e && !e.IsMarkdown && i.process.remove()
				}
			})
		};
	r(), s()
});
requirejs.config({
	paths: {
		editor_drop_paste: "js/plugins/editor_drop_paste",
		attachment_upload: "js/plugins/attachment_upload",
		fileupload: "js/plugins/libs-min/fileupload",
		note_info: "js/plugins/note_info",
		history: "js/plugins/history"
	},
	shim: {}
}), setTimeout(function() {
    // require = window.require22
	require(["editor_drop_paste", "attachment_upload"]), require(["note_info"]), setTimeout(function() {
		require(["history"])
	}, 10)
});
!
function(e) {
	"use strict";
	e(window.jQuery)
}(function(e) {
	"use strict";
	var t = 0;
	e.ajaxTransport("iframe", function(i) {
		if (i.async) {
			var n, r, o;
			return {
				send: function(s, a) {
					n = e('<form style="display:none;"></form>'), n.attr("accept-charset", i.formAcceptCharset), o = /\?/.test(i.url) ? "&" : "?", "DELETE" === i.type ? (i.url = i.url + o + "_method=DELETE", i.type = "POST") : "PUT" === i.type ? (i.url = i.url + o + "_method=PUT", i.type = "POST") : "PATCH" === i.type && (i.url = i.url + o + "_method=PATCH", i.type = "POST"), r = e('<iframe src="javascript:false;" name="iframe-transport-' + (t += 1) + '"></iframe>').bind("load", function() {
						var t, o = e.isArray(i.paramName) ? i.paramName : [i.paramName];
						r.unbind("load").bind("load", function() {
							var t;
							try {
								if (t = r.contents(), !t.length || !t[0].firstChild) throw new Error
							} catch (i) {
								t = void 0
							}
							a(200, "success", {
								iframe: t
							}), e('<iframe src="javascript:false;"></iframe>').appendTo(n), n.remove()
						}), n.prop("target", r.prop("name")).prop("action", i.url).prop("method", i.type), i.formData && e.each(i.formData, function(t, i) {
							e('<input type="hidden"/>').prop("name", i.name).val(i.value).appendTo(n)
						}), i.fileInput && i.fileInput.length && "POST" === i.type && (t = i.fileInput.clone(), i.fileInput.after(function(e) {
							return t[e]
						}), i.paramName && i.fileInput.each(function(t) {
							e(this).prop("name", o[t] || i.paramName)
						}), n.append(i.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data")), n.submit(), t && t.length && i.fileInput.each(function(i, n) {
							var r = e(t[i]);
							e(n).prop("name", r.prop("name")), r.replaceWith(n)
						})
					}), n.append(r).appendTo(document.body)
				},
				abort: function() {
					r && r.unbind("load").prop("src", "javascript".concat(":false;")), n && n.remove()
				}
			}
		}
	}), e.ajaxSetup({
		converters: {
			"iframe text": function(t) {
				return t && e(t[0].body).text()
			},
			"iframe json": function(t) {
				return t && e.parseJSON(e(t[0].body).text())
			},
			"iframe html": function(t) {
				return t && e(t[0].body).html()
			},
			"iframe script": function(t) {
				return t && e.globalEval(e(t[0].body).text())
			}
		}
	})
}), !
function(e) {
	e(jQuery)
}(function(e, t) {
	var i = 0,
		n = Array.prototype.slice,
		r = e.cleanData;
	e.cleanData = function(t) {
		for (var i, n = 0; null != (i = t[n]); n++) try {
			e(i).triggerHandler("remove")
		} catch (o) {}
		r(t)
	}, e.widget = function(t, i, n) {
		var r, o, s, a, l = {},
			p = t.split(".")[0];
		t = t.split(".")[1], r = p + "-" + t, n || (n = i, i = e.Widget), e.expr[":"][r.toLowerCase()] = function(t) {
			return !!e.data(t, r)
		}, e[p] = e[p] || {}, o = e[p][t], s = e[p][t] = function(e, t) {
			return this._createWidget ? void(arguments.length && this._createWidget(e, t)) : new s(e, t)
		}, e.extend(s, o, {
			version: n.version,
			_proto: e.extend({}, n),
			_childConstructors: []
		}), a = new i, a.options = e.widget.extend({}, a.options), e.each(n, function(t, n) {
			return e.isFunction(n) ? void(l[t] = function() {
				var e = function() {
						return i.prototype[t].apply(this, arguments)
					},
					r = function(e) {
						return i.prototype[t].apply(this, e)
					};
				return function() {
					var t, i = this._super,
						o = this._superApply;
					return this._super = e, this._superApply = r, t = n.apply(this, arguments), this._super = i, this._superApply = o, t
				}
			}()) : void(l[t] = n)
		}), s.prototype = e.widget.extend(a, {
			widgetEventPrefix: o ? a.widgetEventPrefix : t
		}, l, {
			constructor: s,
			namespace: p,
			widgetName: t,
			widgetFullName: r
		}), o ? (e.each(o._childConstructors, function(t, i) {
			var n = i.prototype;
			e.widget(n.namespace + "." + n.widgetName, s, i._proto)
		}), delete o._childConstructors) : i._childConstructors.push(s), e.widget.bridge(t, s)
	}, e.widget.extend = function(i) {
		for (var r, o, s = n.call(arguments, 1), a = 0, l = s.length; l > a; a++) for (r in s[a]) o = s[a][r], s[a].hasOwnProperty(r) && o !== t && (i[r] = e.isPlainObject(o) ? e.isPlainObject(i[r]) ? e.widget.extend({}, i[r], o) : e.widget.extend({}, o) : o);
		return i
	}, e.widget.bridge = function(i, r) {
		var o = r.prototype.widgetFullName || i;
		e.fn[i] = function(s) {
			var a = "string" == typeof s,
				l = n.call(arguments, 1),
				p = this;
			return s = !a && l.length ? e.widget.extend.apply(null, [s].concat(l)) : s, this.each(a ?
			function() {
				var n, r = e.data(this, o);
				return r ? e.isFunction(r[s]) && "_" !== s.charAt(0) ? (n = r[s].apply(r, l), n !== r && n !== t ? (p = n && n.jquery ? p.pushStack(n.get()) : n, !1) : void 0) : e.error("no such method '" + s + "' for " + i + " widget instance") : e.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + s + "'")
			} : function() {
				var t = e.data(this, o);
				t ? t.option(s || {})._init() : e.data(this, o, new r(s, this))
			}), p
		}
	}, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(t, n) {
			n = e(n || this.defaultElement || this)[0], this.element = e(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), n !== this && (e.data(n, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function(e) {
					e.target === n && this.destroy()
				}
			}), this.document = e(n.style ? n.ownerDocument : n.document || n), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: e.noop,
		_getCreateEventData: e.noop,
		_create: e.noop,
		_init: e.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: e.noop,
		widget: function() {
			return this.element
		},
		option: function(i, n) {
			var r, o, s, a = i;
			if (0 === arguments.length) return e.widget.extend({}, this.options);
			if ("string" == typeof i) if (a = {}, r = i.split("."), i = r.shift(), r.length) {
				for (o = a[i] = e.widget.extend({}, this.options[i]), s = 0; s < r.length - 1; s++) o[r[s]] = o[r[s]] || {}, o = o[r[s]];
				if (i = r.pop(), n === t) return o[i] === t ? null : o[i];
				o[i] = n
			} else {
				if (n === t) return this.options[i] === t ? null : this.options[i];
				a[i] = n
			}
			return this._setOptions(a), this
		},
		_setOptions: function(e) {
			var t;
			for (t in e) this._setOption(t, e[t]);
			return this
		},
		_setOption: function(e, t) {
			return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !! t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
		},
		enable: function() {
			return this._setOption("disabled", !1)
		},
		disable: function() {
			return this._setOption("disabled", !0)
		},
		_on: function(t, i, n) {
			var r, o = this;
			"boolean" != typeof t && (n = i, i = t, t = !1), n ? (i = r = e(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, r = this.widget()), e.each(n, function(n, s) {
				function a() {
					return t || o.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof s ? o[s] : s).apply(o, arguments) : void 0
				}
				"string" != typeof s && (a.guid = s.guid = s.guid || a.guid || e.guid++);
				var l = n.match(/^(\w+)\s*(.*)$/),
					p = l[1] + o.eventNamespace,
					u = l[2];
				u ? r.delegate(u, p, a) : i.bind(p, a)
			})
		},
		_off: function(e, t) {
			t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
		},
		_delay: function(e, t) {
			function i() {
				return ("string" == typeof e ? n[e] : e).apply(n, arguments)
			}
			var n = this;
			return setTimeout(i, t || 0)
		},
		_hoverable: function(t) {
			this.hoverable = this.hoverable.add(t), this._on(t, {
				mouseenter: function(t) {
					e(t.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(t) {
					e(t.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(t) {
			this.focusable = this.focusable.add(t), this._on(t, {
				focusin: function(t) {
					e(t.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(t) {
					e(t.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(t, i, n) {
			var r, o, s = this.options[t];
			if (n = n || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (r in o) r in i || (i[r] = o[r]);
			return this.element.trigger(i, n), !(e.isFunction(s) && s.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
		}
	}, e.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(t, i) {
		e.Widget.prototype["_" + t] = function(n, r, o) {
			"string" == typeof r && (r = {
				effect: r
			});
			var s, a = r ? r === !0 || "number" == typeof r ? i : r.effect || i : t;
			r = r || {}, "number" == typeof r && (r = {
				duration: r
			}), s = !e.isEmptyObject(r), r.complete = o, r.delay && n.delay(r.delay), s && e.effects && e.effects.effect[a] ? n[t](r) : a !== t && n[a] ? n[a](r.duration, r.easing, o) : n.queue(function(i) {
				e(this)[t](), o && o.call(n[0]), i()
			})
		}
	})
}), !
function(e) {
	"use strict";
	e(window.jQuery)
}(function(e) {
	"use strict";
	e.support.xhrFileUpload = !(!window.XMLHttpRequestUpload || !window.FileReader), e.support.xhrFormDataFileUpload = !! window.FormData, e.widget("blueimp.fileupload", {
		options: {
			dropZone: e(document),
			pasteZone: e(document),
			fileInput: void 0,
			replaceFileInput: !0,
			paramName: void 0,
			singleFileUploads: !0,
			limitMultiFileUploads: void 0,
			sequentialUploads: !1,
			limitConcurrentUploads: void 0,
			forceIframeTransport: !1,
			redirect: void 0,
			redirectParamName: void 0,
			postMessage: void 0,
			multipart: !0,
			maxChunkSize: void 0,
			uploadedBytes: void 0,
			recalculateProgress: !0,
			progressInterval: 100,
			bitrateInterval: 500,
			autoUpload: !0,
			formData: function(e) {
				return e.serializeArray()
			},
			add: function(t, i) {
				(i.autoUpload || i.autoUpload !== !1 && (e(this).data("blueimp-fileupload") || e(this).data("fileupload")).options.autoUpload) && i.submit()
			},
			processData: !1,
			contentType: !1,
			cache: !1
		},
		_refreshOptionsList: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
		_BitrateTimer: function() {
			this.timestamp = +new Date, this.loaded = 0, this.bitrate = 0, this.getBitrate = function(e, t, i) {
				var n = e - this.timestamp;
				return (!this.bitrate || !i || n > i) && (this.bitrate = (t - this.loaded) * (1e3 / n) * 8, this.loaded = t, this.timestamp = e), this.bitrate
			}
		},
		_isXHRUpload: function(t) {
			return !t.forceIframeTransport && (!t.multipart && e.support.xhrFileUpload || e.support.xhrFormDataFileUpload)
		},
		_getFormData: function(t) {
			var i;
			return "function" == typeof t.formData ? t.formData(t.form) : e.isArray(t.formData) ? t.formData : t.formData ? (i = [], e.each(t.formData, function(e, t) {
				i.push({
					name: e,
					value: t
				})
			}), i) : []
		},
		_getTotal: function(t) {
			var i = 0;
			return e.each(t, function(e, t) {
				i += t.size || 1
			}), i
		},
		_initProgressObject: function(e) {
			e._progress = {
				loaded: 0,
				total: 0,
				bitrate: 0
			}
		},
		_onProgress: function(e, t) {
			if (e.lengthComputable) {
				var i, n = +new Date;
				if (t._time && t.progressInterval && n - t._time < t.progressInterval && e.loaded !== e.total) return;
				t._time = n, i = Math.floor(e.loaded / e.total * (t.chunkSize || t._progress.total)) + (t.uploadedBytes || 0), this._progress.loaded += i - t._progress.loaded, this._progress.bitrate = this._bitrateTimer.getBitrate(n, this._progress.loaded, t.bitrateInterval), t._progress.loaded = t.loaded = i, t._progress.bitrate = t.bitrate = t._bitrateTimer.getBitrate(n, i, t.bitrateInterval), this._trigger("progress", e, t), this._trigger("progressall", e, this._progress)
			}
		},
		_initProgressListener: function(t) {
			var i = this,
				n = t.xhr ? t.xhr() : e.ajaxSettings.xhr();
			n.upload && (e(n.upload).bind("progress", function(e) {
				var n = e.originalEvent;
				e.lengthComputable = n.lengthComputable, e.loaded = n.loaded, e.total = n.total, i._onProgress(e, t)
			}), t.xhr = function() {
				return n
			})
		},
		_initXHRData: function(t) {
			var i, n = t.files[0],
				r = t.multipart || !e.support.xhrFileUpload,
				o = t.paramName[0];
			if (t.headers = t.headers || {}, t.contentRange && (t.headers["Content-Range"] = t.contentRange), r) {
				if (e.support.xhrFormDataFileUpload) {
					if (t.postMessage) i = this._getFormData(t), t.blob ? i.push({
						name: o,
						value: t.blob
					}) : e.each(t.files, function(e, n) {
						i.push({
							name: t.paramName[e] || o,
							value: n
						})
					});
					else {
						if (t.formData instanceof FormData) i = t.formData;
						else {
							i = new FormData;
							var s = this._getFormData(t);
							log(s), e.each(this._getFormData(t), function(e, t) {
								i.append(t.name, t.value)
							})
						}
						t.blob ? (t.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(n.name) + '"', i.append(o, t.blob, n.name)) : e.each(t.files, function(e, n) {
							(window.Blob && n instanceof Blob || window.File && n instanceof File) && i.append(t.paramName[e] || o, n, n.name)
						})
					}
					t.data = i
				}
			} else t.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(n.name) + '"', t.contentType = n.type, t.data = t.blob || n;
			t.blob = null
		},
		_initIframeSettings: function(t) {
			t.dataType = "iframe " + (t.dataType || ""), t.formData = this._getFormData(t), t.redirect && e("<a></a>").prop("href", t.url).prop("host") !== location.host && t.formData.push({
				name: t.redirectParamName || "redirect",
				value: t.redirect
			})
		},
		_initDataSettings: function(e) {
			this._isXHRUpload(e) ? (this._chunkedUpload(e, !0) || (e.data || this._initXHRData(e), this._initProgressListener(e)), e.postMessage && (e.dataType = "postmessage " + (e.dataType || ""))) : this._initIframeSettings(e, "iframe")
		},
		_getParamName: function(t) {
			var i = e(t.fileInput),
				n = t.paramName;
			return n ? e.isArray(n) || (n = [n]) : (n = [], i.each(function() {
				for (var t = e(this), i = t.prop("name") || "files[]", r = (t.prop("files") || [1]).length; r;) n.push(i), r -= 1
			}), n.length || (n = [i.prop("name") || "files[]"])), n
		},
		_initFormSettings: function(t) {
			t.form && t.form.length || (t.form = e(t.fileInput.prop("form")), t.form.length || (t.form = e(this.options.fileInput.prop("form")))), t.paramName = this._getParamName(t), t.urlFunc && (t.url = t.urlFunc()), t.url || (t.url = t.form.prop("action") || location.href), t.type = (t.type || t.form.prop("method") || "").toUpperCase(), "POST" !== t.type && "PUT" !== t.type && "PATCH" !== t.type && (t.type = "POST"), t.formAcceptCharset || (t.formAcceptCharset = t.form.attr("accept-charset"))
		},
		_getAJAXSettings: function(t) {
			var i = e.extend({}, this.options, t);
			return this._initFormSettings(i), this._initDataSettings(i), i
		},
		_getDeferredState: function(e) {
			return e.state ? e.state() : e.isResolved() ? "resolved" : e.isRejected() ? "rejected" : "pending"
		},
		_enhancePromise: function(e) {
			return e.success = e.done, e.error = e.fail, e.complete = e.always, e
		},
		_getXHRPromise: function(t, i, n) {
			var r = e.Deferred(),
				o = r.promise();
			return i = i || this.options.context || o, t === !0 ? r.resolveWith(i, n) : t === !1 && r.rejectWith(i, n), o.abort = r.promise, this._enhancePromise(o)
		},
		_addConvenienceMethods: function(e, t) {
			var i = this;
			t.submit = function() {
				return "pending" !== this.state() && (t.jqXHR = this.jqXHR = i._trigger("submit", e, this) !== !1 && i._onSend(e, this)), this.jqXHR || i._getXHRPromise()
			}, t.abort = function() {
				return this.jqXHR ? this.jqXHR.abort() : this._getXHRPromise()
			}, t.state = function() {
				return this.jqXHR ? i._getDeferredState(this.jqXHR) : void 0
			}, t.progress = function() {
				return this._progress
			}
		},
		_getUploadedBytes: function(e) {
			var t = e.getResponseHeader("Range"),
				i = t && t.split("-"),
				n = i && i.length > 1 && parseInt(i[1], 10);
			return n && n + 1
		},
		_chunkedUpload: function(t, i) {
			var n, r, o = this,
				s = t.files[0],
				a = s.size,
				l = t.uploadedBytes = t.uploadedBytes || 0,
				p = t.maxChunkSize || a,
				u = s.slice || s.webkitSlice || s.mozSlice,
				d = e.Deferred(),
				h = d.promise();
			return this._isXHRUpload(t) && u && (l || a > p) && !t.data ? i ? !0 : l >= a ? (s.error = "Uploaded bytes exceed file size", this._getXHRPromise(!1, t.context, [null, "error", s.error])) : (r = function() {
				var i = e.extend({}, t),
					h = i._progress.loaded;
				i.blob = u.call(s, l, l + p, s.type), i.chunkSize = i.blob.size, i.contentRange = "bytes " + l + "-" + (l + i.chunkSize - 1) + "/" + a, o._initXHRData(i), o._initProgressListener(i), n = (o._trigger("chunksend", null, i) !== !1 && e.ajax(i) || o._getXHRPromise(!1, i.context)).done(function(n, s, p) {
					l = o._getUploadedBytes(p) || l + i.chunkSize, i._progress.loaded === h && o._onProgress(e.Event("progress", {
						lengthComputable: !0,
						loaded: l - i.uploadedBytes,
						total: l - i.uploadedBytes
					}), i), t.uploadedBytes = i.uploadedBytes = l, i.result = n, i.textStatus = s, i.jqXHR = p, o._trigger("chunkdone", null, i), o._trigger("chunkalways", null, i), a > l ? r() : d.resolveWith(i.context, [n, s, p])
				}).fail(function(e, t, n) {
					i.jqXHR = e, i.textStatus = t, i.errorThrown = n, o._trigger("chunkfail", null, i), o._trigger("chunkalways", null, i), d.rejectWith(i.context, [e, t, n])
				})
			}, this._enhancePromise(h), h.abort = function() {
				return n.abort()
			}, r(), h) : !1
		},
		_beforeSend: function(e, t) {
			0 === this._active && (this._trigger("start"), this._bitrateTimer = new this._BitrateTimer, this._progress.loaded = this._progress.total = 0, this._progress.bitrate = 0), t._progress || (t._progress = {}), t._progress.loaded = t.loaded = t.uploadedBytes || 0, t._progress.total = t.total = this._getTotal(t.files) || 1, t._progress.bitrate = t.bitrate = 0, this._active += 1, this._progress.loaded += t.loaded, this._progress.total += t.total
		},
		_onDone: function(t, i, n, r) {
			var o = r._progress.total;
			r._progress.loaded < o && this._onProgress(e.Event("progress", {
				lengthComputable: !0,
				loaded: o,
				total: o
			}), r), r.result = t, r.textStatus = i, r.jqXHR = n, this._trigger("done", null, r)
		},
		_onFail: function(e, t, i, n) {
			n.jqXHR = e, n.textStatus = t, n.errorThrown = i, this._trigger("fail", null, n), n.recalculateProgress && (this._progress.loaded -= n._progress.loaded, this._progress.total -= n._progress.total)
		},
		_onAlways: function(e, t, i, n) {
			this._active -= 1, this._trigger("always", null, n), 0 === this._active && this._trigger("stop")
		},
		_onSend: function(t, i) {
			i.submit || this._addConvenienceMethods(t, i);
			var n, r, o, s, a = this,
				l = a._getAJAXSettings(i),
				p = function() {
					return a._sending += 1, l._bitrateTimer = new a._BitrateTimer, n = n || ((r || a._trigger("send", t, l) === !1) && a._getXHRPromise(!1, l.context, r) || a._chunkedUpload(l) || e.ajax(l)).done(function(e, t, i) {
						a._onDone(e, t, i, l)
					}).fail(function(e, t, i) {
						a._onFail(e, t, i, l)
					}).always(function(e, t, i) {
						if (a._sending -= 1, a._onAlways(e, t, i, l), l.limitConcurrentUploads && l.limitConcurrentUploads > a._sending) for (var n = a._slots.shift(); n;) {
							if ("pending" === a._getDeferredState(n)) {
								n.resolve();
								break
							}
							n = a._slots.shift()
						}
					})
				};
			return this._beforeSend(t, l), this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? (this.options.limitConcurrentUploads > 1 ? (o = e.Deferred(), this._slots.push(o), s = o.pipe(p)) : s = this._sequence = this._sequence.pipe(p, p), s.abort = function() {
				return r = [void 0, "abort", "abort"], n ? n.abort() : (o && o.rejectWith(l.context, r), p())
			}, this._enhancePromise(s)) : p()
		},
		_onAdd: function(t, i) {
			var n, r, o, s, a = this,
				l = !0,
				p = e.extend({}, this.options, i),
				u = p.limitMultiFileUploads,
				d = this._getParamName(p);
			if ((p.singleFileUploads || u) && this._isXHRUpload(p)) if (!p.singleFileUploads && u) for (o = [], n = [], s = 0; s < i.files.length; s += u) o.push(i.files.slice(s, s + u)), r = d.slice(s, s + u), r.length || (r = d), n.push(r);
			else n = d;
			else o = [i.files], n = [d];
			return i.originalFiles = i.files, e.each(o || i.files, function(r, s) {
				var p = e.extend({}, i);
				return p.files = o ? s : [s], p.paramName = n[r], a._initProgressObject(p), a._addConvenienceMethods(t, p), l = a._trigger("add", t, p)
			}), l
		},
		_replaceFileInput: function(t) {
			var i = t.clone(!0);
			e("<form></form>").append(i)[0].reset(), t.after(i).detach(), e.cleanData(t.unbind("remove")), this.options.fileInput = this.options.fileInput.map(function(e, n) {
				return n === t[0] ? i[0] : n
			}), t[0] === this.element[0] && (this.element = i)
		},
		_handleFileTreeEntry: function(t, i) {
			var n, r = this,
				o = e.Deferred(),
				s = function(e) {
					e && !e.entry && (e.entry = t), o.resolve([e])
				};
			return i = i || "", t.isFile ? t._file ? (t._file.relativePath = i, o.resolve(t._file)) : t.file(function(e) {
				e.relativePath = i, o.resolve(e)
			}, s) : t.isDirectory ? (n = t.createReader(), n.readEntries(function(e) {
				r._handleFileTreeEntries(e, i + t.name + "/").done(function(e) {
					o.resolve(e)
				}).fail(s)
			}, s)) : o.resolve([]), o.promise()
		},
		_handleFileTreeEntries: function(t, i) {
			var n = this;
			return e.when.apply(e, e.map(t, function(e) {
				return n._handleFileTreeEntry(e, i)
			})).pipe(function() {
				return Array.prototype.concat.apply([], arguments)
			})
		},
		_getDroppedFiles: function(t) {
			t = t || {};
			var i = t.items;
			return i && i.length && (i[0].webkitGetAsEntry || i[0].getAsEntry) ? this._handleFileTreeEntries(e.map(i, function(e) {
				var t;
				return e.webkitGetAsEntry ? (t = e.webkitGetAsEntry(), t && (t._file = e.getAsFile()), t) : e.getAsEntry()
			})) : e.Deferred().resolve(e.makeArray(t.files)).promise()
		},
		_getSingleFileInputFiles: function(t) {
			t = e(t);
			var i, n, r = t.prop("webkitEntries") || t.prop("entries");
			if (r && r.length) return this._handleFileTreeEntries(r);
			if (i = e.makeArray(t.prop("files")), i.length) void 0 === i[0].name && i[0].fileName && e.each(i, function(e, t) {
				t.name = t.fileName, t.size = t.fileSize
			});
			else {
				if (n = t.prop("value"), !n) return e.Deferred().resolve([]).promise();
				i = [{
					name: n.replace(/^.*\\/, "")
				}]
			}
			return e.Deferred().resolve(i).promise()
		},
		_getFileInputFiles: function(t) {
			return t instanceof e && 1 !== t.length ? e.when.apply(e, e.map(t, this._getSingleFileInputFiles)).pipe(function() {
				return Array.prototype.concat.apply([], arguments)
			}) : this._getSingleFileInputFiles(t)
		},
		_onChange: function(t) {
			var i = this,
				n = {
					fileInput: e(t.target),
					form: e(t.target.form)
				};
			this._getFileInputFiles(n.fileInput).always(function(e) {
				n.files = e, i.options.replaceFileInput && i._replaceFileInput(n.fileInput), i._trigger("change", t, n) !== !1 && i._onAdd(t, n)
			})
		},
		_onPaste: function(t) {
			var i = t.originalEvent.clipboardData,
				n = i && i.items || [],
				r = {
					files: []
				};
			return e.each(n, function(e, t) {
				var i = t.getAsFile && t.getAsFile();
				i && r.files.push(i)
			}), this._trigger("paste", t, r) === !1 || this._onAdd(t, r) === !1 ? !1 : void 0
		},
		_onDrop: function(e) {
			var t = this,
				i = e.dataTransfer = e.originalEvent.dataTransfer,
				n = {};
			i && i.files && i.files.length && e.preventDefault(), this._getDroppedFiles(i).always(function(i) {
				n.files = i, t._trigger("drop", e, n) !== !1 && t._onAdd(e, n)
			})
		},
		_onDragOver: function(t) {
			var i = t.dataTransfer = t.originalEvent.dataTransfer;
			return this._trigger("dragover", t) === !1 ? !1 : void(i && -1 !== e.inArray("Files", i.types) && (i.dropEffect = "copy", t.preventDefault()))
		},
		_initEventHandlers: function() {
			this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
				dragover: this._onDragOver,
				drop: this._onDrop
			}), this._on(this.options.pasteZone, {
				paste: this._onPaste
			})), this._on(this.options.fileInput, {
				change: this._onChange
			})
		},
		_destroyEventHandlers: function() {
			this._off(this.options.dropZone, "dragover drop"), this._off(this.options.pasteZone, "paste"), this._off(this.options.fileInput, "change")
		},
		_setOption: function(t, i) {
			var n = -1 !== e.inArray(t, this._refreshOptionsList);
			n && this._destroyEventHandlers(), this._super(t, i), n && (this._initSpecialOptions(), this._initEventHandlers())
		},
		_initSpecialOptions: function() {
			var t = this.options;
			void 0 === t.fileInput ? t.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]') : t.fileInput instanceof e || (t.fileInput = e(t.fileInput)), t.dropZone instanceof e || (t.dropZone = e(t.dropZone)), t.pasteZone instanceof e || (t.pasteZone = e(t.pasteZone))
		},
		_create: function() {
			var t = this.options;
			e.extend(t, e(this.element[0].cloneNode(!1)).data()), this._initSpecialOptions(), this._slots = [], this._sequence = this._getXHRPromise(!0), this._sending = this._active = 0, this._initProgressObject(this), this._initEventHandlers()
		},
		progress: function() {
			return this._progress
		},
		add: function(t) {
			var i = this;
			t && !this.options.disabled && (t.fileInput && !t.files ? this._getFileInputFiles(t.fileInput).always(function(e) {
				t.files = e, i._onAdd(null, t)
			}) : (t.files = e.makeArray(t.files), this._onAdd(null, t)))
		},
		send: function(t) {
			if (t && !this.options.disabled) {
				if (t.fileInput && !t.files) {
					var i, n, r = this,
						o = e.Deferred(),
						s = o.promise();
					return s.abort = function() {
						return n = !0, i ? i.abort() : (o.reject(null, "abort", "abort"), s)
					}, this._getFileInputFiles(t.fileInput).always(function(e) {
						n || (t.files = e, i = r._onSend(null, t).then(function(e, t, i) {
							o.resolve(e, t, i)
						}, function(e, t, i) {
							o.reject(e, t, i)
						}))
					}), this._enhancePromise(s)
				}
				if (t.files = e.makeArray(t.files), t.files.length) return this._onSend(null, t)
			}
			return this._getXHRPromise(!1, t && t.context)
		}
	})
}), window.define && define("fileupload", [], function() {});