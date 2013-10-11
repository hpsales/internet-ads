/*pub-1|2013-05-16 10:00:40*/
KSLITE.declare("tanxssp-main", ["tanxssp-utils", "tanxssp-config", "tanxssp-params", "tanxssp-request"],
function(d, c) {
    var b=d("tanxssp-utils");
    var f=d("tanxssp-params").Def;
    var e=d("tanxssp-request").Def;
    var a=d("tanxssp-config");
    c.run = function(g) {
        a.ready(function() {
            var h = {};
            b.mix(h, f());
            b.mix(h, g);
            e(h)
        })
    }
});
KSLITE.declare("tanxssp-config",
function(d, b) {
    var c = {},
    f = {},
    a = {};
    var e = false;
    c.mapAdType = {
        "1": "txt",
        "2": "pic",
        "3": "flash",
        "4": "video",
        "5": "txtlink",
        "6": "tuwen",
        "7": "js",
        "8": "html",
        "9": "flashb",
        "98": "iframehtml",
        "99": "multiframe"
    };
    c.mapDisType = {
        "1": "static",
        "2": "couplet",
        "3": "rightfloat",
        "4": "floatwin",
        "5": "popwin",
        "6": "common",
        "7": "backdisplay",
        "8": "channel",
        "9": "search",
        "10": "topic",
        "11": "video"
    };
    c.ali = ["taobao.com", "alimama.com", "alibaba.com", "alipay.com", "alisoft.com", "linezing.com", "tanx.com", "mmstat.com", "etao.com", "tmall.com"];
    c.sc = "sc1";
    c.mc = "mc1";
    c.kws = ["wd", "p", "q", "keyword", "kw", "w", "key", "word", "query", "name"];
    f.cache = undefined;
    f.win = window;
    f.d = document;
    f.maxwin = null;
    f._maxwin = function(h) {
        if (h) {
            f.maxwin = h;
            return
        }
        h = f.win;
        try {
            if (top != h) {
                if (top.location && top.location.href) {
                    h = top
                }
            }
        } catch(g) {}
        f.maxwin = h
    };
    f.ali = (function() {
        var h, j = f.d.domain.split("."),
        k = c.ali,
        g;
        if (j.length > 1) {
            g = "@" + j[j.length - 2] + "." + j[j.length - 1];
            if (("@" + k.join("@")).indexOf(g) > -1) {
                return true
            }
        }
        return false
    })();
    f.frm = (function() {
        return (top != window)
    })();
    f.data = {};
    f.dx = function() {
        return f.data[c.sc]
    };
    f.units = [];
    f.addUnit = function(i) {
        var h = (new Date()).getTime();
        var g = {};
        g.w = window;
        g.pid = i.pid;
        g.t = h;
        f.units.push(g)
    };
    f.plusUnitCount = function(j) {
        var g = 0;
        for (var h = 0; h < f.units.length; h++) {
            if (f.units[h].pid == j.pid) {
                g += 1
            }
            if (g > 1) {
                return
            }
        }
        var k = c.sc;
        if (!f.data[k]) {
            f.data[k] = 1
        } else {
            f.data[k]++
        }
    };
    f.ref_url = null;
    f.getRef_url = function() {
        if (f.ref_url) {
            return f.ref_url
        }
        var g = location.href;
        if (f.frm) {
            if (f.win == f.maxwin) {
                g = f.d.referrer
            } else {
                g = top.location.href
            }
            if (g == "") {
                g = location.href
            }
        }
        f.ref_url = g;
        return g
    };
    f.r = (function() {
        var h = "";
        try {
            h = top.document.referrer
        } catch(g) {}
        if (h === null) {
            h = ""
        }
        return h
    })();
    b.c = c;
    b.r = f;
    b.ready = function(g) {
        if (e) {
            return g()
        }
        var h = setTimeout(function() {
            f._maxwin(window);
            e = true;
            g()
        },
        50);
        f._maxwin();
        clearTimeout(h);
        e = true;
        g()
    };
    b.ready(function() {})
});
KSLITE.declare("tanxssp-utils", ["tanxssp-config"],
function(c, b) {
    var d = c("tanxssp-config").r;
    var a = {};
    a.mix = KSLITE.mix;
    a.getScript = KSLITE.getScript;
    a.syncScript = function(e, f) {
        document.write('<script charset="' + (f || "gbk") + '" src="' + e + '"><\/script>')
    };
    a.encode = function(e) {
        return encodeURIComponent(e.toString())
    };
    a.decode = function(e) {
        return decodeURIComponent(e.toString())
    };
    a.getAttr = function(f, e) {
        return a.trim(f.getAttribute(e.toLowerCase(), 2) || "") || ""
    };
    a.setAttr = function(g, e, f) {
        g.setAttribute(e.toLowerCase(), a.trim(f + ""))
    };
    a.$ = function(e) {
        return document.getElementById(e)
    };
    a.tanxId = function(e) {
        return a.$("tanx-a-" + e)
    };
    a.getCookie = function(g) {
        var h = (" " + document.cookie).split(";"),
        e = "";
        g = g ? g: config.cookieKey;
        for (var f = 0; f < h.length; f++) {
            if (h[f].indexOf(" " + g + "=") === 0) {
                e = a.decode(h[f].split("=")[1]);
                break
            }
        }
        return e
    };
    a.css = function(f, e, g) {
        if (g) {
            f.style[e] = g;
            return g
        }
        if (window.getComputedStyle) {
            return window.getComputedStyle(f, null).getPropertyValue(e)
        } else {
            if (f.currentStyle) {
                return f.currentStyle[e]
            }
        }
    };
    a.show = function(e) {
        var f = a.getAttr(e, "_tk_old_display") || "";
        a.css(e, "display", f)
    };
    a.hide = function(e) {
        a.setAttr(e, "_tk_old_display", a.css(e, "display"));
        a.css(e, "display", "none")
    };
    a.nodeList2Array = function(g) {
        var h = [];
        for (var f = 0,
        e = g.length; f < e; f++) {
            h[f] = g[f]
        }
        return h
    };
    a.getElClientRect = function(e) {
        var f = e.getBoundingClientRect();
        if (f.height === undefined || f.width === undefined) {
            f = KSLITE.mix({},
            f);
            f.height = e.offsetHeight;
            f.width = e.offsetWidth
        }
        return f
    };
    a.each = function(j, h) {
        if (j.length && j.slice) {
            for (var g = 0,
            e = j.length; g < e; g++) {
                h(j[g], g)
            }
        } else {
            for (var f in j) {
                if (j.hasOwnProperty(f)) {
                    h(j[f], f)
                }
            }
        }
    };
    a.setCookie = function(e, f) {
        e = arguments.length == 1 ? config.cookieKey: e;
        document.cookie = e + "=" + a.encode(f) + "; path=/"
    };
    a.trim = function(g) {
        var e = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
        for (var f = 0; f < g.length; f++) {
            if (e.indexOf(g.charAt(f)) === -1) {
                g = g.substring(f);
                break
            }
        }
        for (f = g.length - 1; f >= 0; f--) {
            if (e.indexOf(g.charAt(f)) === -1) {
                g = g.substring(0, f + 1);
                break
            }
        }
        return e.indexOf(g.charAt(0)) === -1 ? g: ""
    };
    if (navigator.userAgent && navigator.userAgent.indexOf("firefox") > -1) {
        if (typeof(HTMLElement) != "undefined" && !HTMLElement.prototype.insertAdjacentElement) {
            HTMLElement.prototype.insertAdjacentElement = function(f, e) {
                switch (f.toLowerCase()) {
                case "beforebegin":
                    this.parentNode.insertBefore(e, this);
                    break;
                case "afterbegin":
                    this.insertBefore(e, this.firstChild);
                    break;
                case "beforeend":
                    this.appendChild(e);
                    break;
                case "afterend":
                    if (this.nextSibling) {
                        this.parentNode.insertBefore(e, this.nextSibling)
                    } else {
                        this.parentNode.appendChild(e)
                    }
                    break
                }
            };
            HTMLElement.prototype.insertAdjacentHTML = function(e, g) {
                var h = this.ownerDocument.createRange();
                h.setStartBefore(this);
                var f = h.createContextualFragment(g);
                this.insertAdjacentElement(e, f)
            }
        }
    }
    a.showAd = function(h, e, f, g) {
        if (e) {
            window.setTimeout((function() {
                try {
                    e.insertAdjacentHTML("beforebegin", h);
                    if (typeof g == "function") {
                        g()
                    }
                } catch(i) {
                    e = e.parentNode;
                    e.insertAdjacentHTML("beforebegin", h);
                    if (typeof g == "function") {
                        g()
                    }
                }
            }), 0)
        } else {
            if (f) {
                window.setTimeout((function() {
                    try {
                        f.insertAdjacentHTML("afterbegin", h);
                        if (typeof g == "function") {
                            g()
                        }
                    } catch(i) {
                        f = f.parentNode;
                        f.insertAdjacentHTML("afterbegin", h);
                        if (typeof g == "function") {
                            g()
                        }
                    }
                }), 0)
            } else {
                document.write(h);
                if (typeof g == "function") {
                    g()
                }
            }
        }
    };
    a.fixedEl = (function() {
        var g = navigator.userAgent.toLowerCase();
        var h = (g.indexOf("msie") > -1);
        var e = navigator.userAgent.match(/MSIE\s([^;]*)/);
        var k = 0;
        var j;
        if (e && e[1]) {
            k = parseFloat(e[1])
        }
        if (h) {
            if (k < 7) {
                j = false
            } else {
                if ("BackCompat" == document.compatMode) {
                    j = false
                } else {
                    j = true
                }
            }
        } else {
            j = true
        }
        var i = [];
        var f = [];
        return function(m, p) {
            if (j) {
                m.style.position = "fixed";
                a.each(p,
                function(r, q) {
                    m.style[q] = (r || 0)
                })
            } else {
                var o = null;
                var l = null;
                i.push(m);
                f.push(p);
                var n = function() {
                    var x = document;
                    var u = (x.documentElement.clientHeight || x.body.clientHeight);
                    var r = (x.documentElement.clientHeight || x.body.clientHeight);
                    var s;
                    var q;
                    var y;
                    var w;
                    for (var t = 0,
                    v = i.length; t < v; t++) {
                        s = i[t];
                        w = f[t];
                        s.style.position = "absolute";
                        q = s.offsetWidth;
                        y = s.offsetHeight;
                        if (w.top !== undefined) {
                            s.style.top = (parseInt(w.top, 10) || 0) + (x.body.scrollTop || x.documentElement.scrollTop) + "px"
                        }
                        if (w.left !== undefined) {
                            s.style.left = (parseInt(w.left, 10) || 0) + (x.body.scrollLeft || x.documentElement.scrollLeft) + "px"
                        }
                        if (w.right !== undefined) {
                            s.style.right = (parseInt(w.right, 10) || 0) - (x.body.scrollLeft || x.documentElement.scrollLeft) + "px"
                        }
                        if (w.bottom !== undefined) {
                            s.style.top = u - (parseInt(w.bottom, 10) || 0) - y + (x.body.scrollTop || x.documentElement.scrollTop) + "px"
                        }
                    }
                };
                a.addEvent(window, "scroll",
                function() {
                    if (o) {
                        clearTimeout(o)
                    }
                    o = setTimeout(function() {
                        n()
                    },
                    10)
                });
                a.addEvent(window, "resize",
                function() {
                    if (l) {
                        clearTimeout(l)
                    }
                    l = setTimeout(function() {
                        n()
                    },
                    10)
                });
                n()
            }
        }
    })(); (function(n, p) {
        if (p.addEventListener) {
            a.addEvent = function(s, r, t) {
                s.addEventListener(r, t, false)
            };
            a.removeEvent = function(s, r, t) {
                s.removeEventListener(r, t, false)
            }
        } else {
            if (p.attachEvent) {
                a.addEvent = function(u, t, v) {
                    var s, r;
                    u["e" + t + v] = v;
                    u[t + v] = function() {
                        u["e" + t + v](window.event)
                    };
                    u.attachEvent("on" + t, u[t + v])
                };
                a.removeEvent = function(s, r, t) {
                    s.detachEvent("on" + r, s[r + t]);
                    s[r + t] = null
                }
            } else {
                a.addEvent = function(s, r, t) {
                    s["on" + r] = t.call(s, n.event)
                };
                a.removeEvent = function(s, r, t) {
                    s["on" + r] = null
                }
            }
        }
        var i = p && p.documentElement,
        j = i && i.doScroll,
        f = j ? "readystatechange": "DOMContentLoaded",
        o = false,
        e = [],
        h = !d.frm,
        m = "complete",
        q = 40,
        g = function() {
            o = true;
            var r;
            while (r = e.shift()) {
                try {
                    r()
                } catch(s) {
                    KSLITE.log(s)
                }
            }
        };
        function k() {
            try {
                j("left");
                g()
            } catch(r) {
                KSLITE.log(r);
                setTimeout(k, q)
            }
        }
        function l() {
            if (/complete/.test(p.readyState)) {
                g()
            } else {
                setTimeout(l, q)
            }
        }
        if (j && h) {
            k()
        } else {
            l()
        }
        a.domReady = function(r) {
            if (o) {
                r()
            } else {
                e.push(r)
            }
        }
    })(window, document);
    a.tagName = function(e) {
        return e && e.tagName ? e.tagName.toLowerCase() : null
    };
    a.findMatchEl = function(h) {
        var f = a;
        try {
            if (h && f.tagName(h) != "a") {
                for (var g = 5; g > 0; g--) {
                    if (h) {
                        h = h.parentNode;
                        if (f.tagName(h) == "a") {
                            break
                        }
                    }
                }
                if (f.tagName(h) != "a") {
                    h = 0
                }
            }
            return h
        } catch(j) {
            KSLITE.log(j);
            return null
        }
    };
    a.each(a,
    function(f, e) {
        b[e] = f
    })
});
KSLITE.declare("tanxssp-request", ["tanxssp-utils", "tanxssp-config", "tanxssp-show"],
function(b, d) {
    var c = b("tanxssp-config").r;
    var g = b("tanxssp-utils");
    var h = b("tanxssp-show").show;
    var a;
    var e;
    if (window.null_data) {
        e = window.null_data
    }
    window.null_data = function() {
        if (e) {
            e()
        }
    };
    function f(n) {
        /*-- 原代码 --*/
        //var k = "jsonp_callback_" + parseInt(Math.random() * 100000, 10);
        /*-- 本地代码 --*/
        var k = "jsonp_callback";
        window[k] = function(s) {
            h(s);
            var q = {
                elConId: "tanxssp-outer-con" + s.pid,
                clickUrl: s.clickurl,
                data: s.data,
                height: s.height,
                pid: s.pid,
                width: s.width
            },
            p = window;
            if (p.tanx_ssp_load_ad && p.tanx_ssp_load_ad.length) {
                for (var r = 0,
                o = p.tanx_ssp_load_ad.length; r < o; r++) {
                    if (p.tanx_ssp_load_ad[r][s.pid]) {
                        try {
                            p.tanx_ssp_load_ad[r][s.pid](q)
                        } catch(t) {}
                    }
                }
            }
            try {
                delete window[k]
            } catch(t) {}
        };
        n.cb = k;
        var j = n.cas;
        var m = ["i", "cb", "callback", "ep", "userid", "o", "f", "n", "re", "r", "cah", "caw", "ccd", "ctz", "chl", "cja", "cpl", "cmm", "cf", "cg", "ac", j, "cas", "cbh", "cbw", "dx", "u", "pf", "k", "tt"];
        var l = [];
        g.each(m,
        function(p, o) {
            if (n[p] !== a) {
                l.push(p + "=" + g.encode(n[p]))
            }
        });
        return l.join("&")
    }
    function i(m) {
        var k = false;
        for (var l = 0,
        j = c.units.length; l < j; l++) {
            if (m.i == c.units[l].i) {
                k = true;
                break
            }
        }
        if (!k) {
            c.units.push({
                i: m.i,
                sync: m.sync
            })
        }
        return k
    }
    d.Def = function(l) {
        if (i(l)) {
            return false
        }
        var k = f(l);
        /*-- 原代码 --*/
        //var j = "http://" + l.sd + "/ex?" + k;
        /*-- 本地代码 --*/
        var j = "./" + l.sd + "/ex.js?" + k;
        if (l.sync) {
            g.syncScript(j)
        } else {
            g.getScript(j)
        }
    }
});
KSLITE.declare("tanxssp-params", ["tanxssp-config", "tanxssp-utils"],
function(e, v) {
    var j = e("tanxssp-config").r;
    var t = e("tanxssp-config").c;
    var q = e("tanxssp-utils");
    var d = Math;
    var u = j.maxwin.document;
    function i() {
        return {
            ctz: ( - ((new Date()).getTimezoneOffset() / 60))
        }
    }
    function o() {
        return {
            chl: history.length
        }
    }
    function p() {
        var w = navigator;
        return {
            cja: (w.javaEnabled() ? "1": "0"),
            cpl: (w.plugins ? w.plugins.length: 0),
            cmm: (w.mimeTypes ? w.mimeTypes.length: 0)
        }
    }
    function s() {
        var w = "-1",
        B = navigator,
        y, x;
        if (B.plugins && B.plugins.length) {
            for (y = 0; y < B.plugins.length; y++) {
                if (B.plugins[y].name.indexOf("Shockwave Flash") != -1) {
                    w = B.plugins[y].description.split("Shockwave Flash ")[1];
                    break
                }
            }
        } else {
            if (window.ActiveXObject) {
                for (x = 10; x >= 2; x--) {
                    try {
                        var z = new Function("return new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + x + "');");
                        if (z) {
                            w = x + ".0";
                            break
                        }
                    } catch(A) {}
                }
            }
        }
        if (w != "-1") {
            w = w.substring(0, w.indexOf(".") + 2)
        }
        return {
            cf: w
        }
    }
    function g() {
        var x, w = 1,
        y = -1;
        if (u) {
            x = u.body;
            w = x.clientHeight;
            y = x.clientWidth
        }
        return {
            cbh: w,
            cbw: y
        }
    }
    function a() {
        var y = window.screen,
        w = 0,
        C = 0,
        x = 0,
        A = 0,
        B = 0;
        try {
            w = y.width;
            C = y.height;
            x = y.availHeight;
            A = y.availWidth;
            B = y.colorDepth
        } catch(z) {}
        return {
            re: w + "x" + C,
            cah: x,
            caw: A,
            ccd: B
        }
    }
    function h() {
        var w = "";
        try {
            w = u.title
        } catch(x) {}
        return {
            tt: w
        }
    }
    function f() {
        var x = "",
        w = "",
        z, A, D, E, C = location,
        y = "";
        function B(H, J) {
            var I = "",
            F = 1,
            G;
            F = Math.floor(H.length / J);
            if (F == 1) {
                I = H.substr(0, J)
            } else {
                for (G = 0; G < J; G++) {
                    I += H.substr(G * F, 1)
                }
            }
            return I
        }
        if (j.ali) {
            z = (" " + document.cookie).split(";");
            for (A = 0; A < z.length; A++) {
                if (z[A].indexOf(" cna=") === 0) {
                    w = z[A].substr(5, 24);
                    break
                }
            }
        }
        if (w === "") {
            cu = (C.search.length > 9) ? C.search: ((C.pathname.length > 9) ? C.pathname: C.href).substr(1);
            z = document.cookie.split(";");
            for (A = 0; A < z.length; A++) {
                if (z[A].split("=").length > 1) {
                    y += z[A].split("=")[1]
                }
            }
            if (y.length < 16) {
                y += "0123456789abcdef"
            }
            w = B(cu, 8) + B(y, 16)
        }
        for (A = 1; A <= 32; A++) {
            D = d.floor(d.random() * 16);
            if (w && A <= w.length) {
                E = w.charCodeAt(A - 1);
                D = (D + E) % 16
            }
            x += D.toString(16);
            if (A === 1 && x < "a") {
                x = "a"
            }
        }
        return {
            cg: x
        }
    }
    function m() {
        var w = d.floor(d.random() * 10000) + 10001;
        try {
            if (j.sid) {
                w = j.sid
            } else {
                w = w - 10001;
                j.sid = w
            }
        } catch(x) {}
        return {
            ac: w
        }
    }
    function b() {
        var B = 0,
        E = 16,
        C = 0,
        y, x, z, F, A, D = t[0] || 4973;
        for (z = 1; z <= E; z++) {
            y = d.random();
            x = d.random();
            if ((d.pow(y, 2) + d.pow(x, 2)) <= 1) {
                B++
            }
            if (z <= 12) {
                C = C + y
            }
        }
        F = "pr" + String.fromCharCode(97 + B);
        A = (d.round(C * D) | ((u.body ? u.body.clientWidth: 0) << 16));
        var w = {};
        w[F] = A;
        w.cas = F;
        return w
    }
    function l() {
        var w = j.data[t.sc] || 1;
        return {
            dx: (w ? w: "")
        }
    }
    function k() {
        return {
            u: j.getRef_url()
        }
    }
    function n() {
        return {
            r: j.r
        }
    }
    function r(x) {
        var z = t.kws,
        y, A, w;
        if (x) {
            for (y = 0; y < z.length; y++) {
                A = new RegExp("[^1-9a-zA-Z]" + z[y] + "=([^&]*)");
                w = x.match(A);
                if (w) {
                    A = new RegExp("^[0-9]*$");
                    if (w[1].match(A) === null) {
                        return w[1]
                    }
                }
            }
        }
        return ""
    }
    function c() {
        var w = r(j.u);
        if (w === "" && j.r) {
            w = r(j.r)
        }
        return {
            k: w
        }
    }
    v.Def = function() {
        var w = {};
        q.each([i(), o(), p(), s(), g(), a(), h(), f(), m(), b(), l(), k(), n(), c()],
        function(y, x) {
            q.mix(w, y)
        });
        return w
    }
});
KSLITE.declare("tanxssp-acookie",
function(c, a) {
    var b = false;
    a.Def = function(e) {
        if (!b) {
            b = true;
            if (e.acookie === "" || location.host.indexOf("www.taobao.com") < 0) {
                var f = document;
                var d = f.createElement("iframe");
                d.style.width = "0px";
                d.style.height = "0px";
                d.style.borderWidth = "0px";
                d.style.display = "none";
                d.marginWidth = 0;
                d.marginHeight = 0;
                d.frameBorder = 0;
                /*-- 原代码 --*/
                //d.src = "http://cdn.tanx.com/t/acookie/acbeacon2.html";
                /*-- 本地代码 --*/
                d.src = "./cdn.tanx.com/t/acookie/acbeacon2.html";
                f.body.insertBefore(d, f.body.firstChild)
            }
        }
    }
});
KSLITE.declare("tanxssp-show", ["tanxssp-display", "tanxssp-acookie", "tanxssp-feedback"],
function(d, b) {
    var e = d("tanxssp-display").Def;
    var c = d("tanxssp-acookie").Def;
    var a = d("tanxssp-feedback").Def;
    b.show = function(f) {
        c(f);
        e(f);
        a(f)
    }
});
KSLITE.declare("tanxssp-feedback",
function(b, a) {
    a.Def = function(f) {
        if (f.feedback !== undefined && f.feedback !== "") {
            var e = window["tanxssp-feedback-cache"] || (window["tanxssp-feedback-cache"] = {});
            var d = new Image();
            e[f.pid] = d;
            d.onload = d.onerror = function() {
                d.onload = d.onerror = null;
                d = null;
                delete e[f.pid]
            };
            var c = "?";
            if (f.feedback.indexOf("?") > -1) {
                c = "&"
            }
            d.src = f.feedback + c + "tanxssp_t=" + parseInt(Math.random() * 100000, 10)
        }
    }
});
KSLITE.declare("tanxssp-icon", ["tanxssp-utils"],
function(c, b) {
    var a = c("tanxssp-utils");
    b.show = function(g) {
        var k = function(l) {
            return l + g.pid
        };
        var f = a.$(k("icon"));
        var i = a.$(k("icon_small"));
        var e = a.$(k("icon_big"));
        if (!f || !i || !e) {
            return false
        }
        var h = null;
        var j = "s";
        function d() {
            i.style.display = "block";
            e.style.display = "none";
            f.style.width = "26px";
            j = "s"
        }
        f.onmouseover = function() {
            if (h) {
                window.clearTimeout(h)
            }
            if ("s" === j) {
                i.style.display = "none";
                e.style.display = "block";
                f.style.width = "110px";
                j = "b"
            }
        };
        f.onmouseout = function() {
            if ("b" === j) {
                h = window.setTimeout(d, 200)
            }
        }
    };
    b.tmpl = function(g, d) {
        if (g.icon !== "1") {
            return d
        }
        var h = function(f) {
            return f + g.pid
        };
        /*-- 原代码 --*/
        //var e = '<a id="' + h("icon") + '" title="&#25105;&#20063;&#35201;&#30003;&#35831;&#27249;&#31383;&#25512;&#24191;" target="_blank" href="http://c.alimama.com" style="width:26px;height:17px;right:0px;bottom:0px;display:block;position:absolute;cursor:pointer;z-index:250;">   <span id="' + h("icon_small") + "\" style=\"display:block;height:17px;background-image: url('http://img02.taobaocdn.com/tps/i2/T1oY3VXmNbXXXb8qDc-26-18.png');*background-image:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://img02.taobaocdn.com/tps/i2/T1oY3VXmNbXXXb8qDc-26-18.png');\"></span>   <span id=\"" + h("icon_big") + "\" style=\"height:17px;display: none;background-image: url('http://img03.taobaocdn.com/tps/i3/T1dt7VXiRaXXbd25o5-110-18.png');*background-image:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://img03.taobaocdn.com/tps/i3/T1dt7VXiRaXXbd25o5-110-18.png');\"></span></a>";
        /*-- 本地代码 --*/
        var e = '<a id="' + h("icon") + '" title="&#25105;&#20063;&#35201;&#30003;&#35831;&#27249;&#31383;&#25512;&#24191;" target="_blank" href="http://c.alimama.com" style="width:26px;height:17px;right:0px;bottom:0px;display:block;position:absolute;cursor:pointer;z-index:250;">   <span id="' + h("icon_small") + "\" style=\"display:block;height:17px;background-image: url('./img02.taobaocdn.com/tps/i2/T1oY3VXmNbXXXb8qDc-26-18.png');*background-image:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='./img02.taobaocdn.com/tps/i2/T1oY3VXmNbXXXb8qDc-26-18.png');\"></span>   <span id=\"" + h("icon_big") + "\" style=\"height:17px;display: none;background-image: url('./img03.taobaocdn.com/tps/i3/T1dt7VXiRaXXbd25o5-110-18.png');*background-image:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='./img03.taobaocdn.com/tps/i3/T1dt7VXiRaXXbd25o5-110-18.png');\"></span></a>";
        return '<div id="tanxssp_con_' + g.pid + '" style="display:block;position:relative;width:' + g.width + "px;height:" + g.height + 'px;">' + d + e + "</div>"
    }
});
KSLITE.declare("tanxssp-otherwin", ["tanxssp-utils"],
function(d, b) {
    var a = d("tanxssp-utils");
    /*-- 原代码 --*/
    //var f = "http://cdn.tanx.com/t/tanxssp.js";
    //var e = "http://cdn.tanx.com/t/tanxssp/main.js?_t=20130516";
    /*-- 本地代码 --*/
    var f = "./cdn.tanx.com/t/tanxssp.js";
    var e = "./cdn.tanx.com/t/tanxssp/main.js?_t=20130516";
    var c = "1";
    b.insertScript = function(i) {
        var g = i.document.getElementsByTagName("HEAD")[0];
        var h = i.document.createElement("script");
        h.type = "text/javascript";
        h.charset = "gbk";
        h.src = f;
        function j() {
            var k = i.document.createElement("script");
            k.type = "text/javascript";
            k.charset = "gbk";
            k.src = e;
            g.insertBefore(k, g.lastChild)
        }
        h.onload = j;
        h.onreadystatechange = function() {
            if (h.readyState && (h.readyState == "loaded" || h.readyState == "complete")) {
                j()
            }
        };
        g.insertBefore(h, g.lastChild)
    };
    b.writeData = function(j) {
        var g = [];
        for (var h in j) {
            if (j.hasOwnProperty(h)) {
                if (h == "distype") {
                    g.push('"' + h + '":"' + c + '"')
                } else {
                    if (h == "data") {
                        g.push('"' + h + '":"' + j[h].replace(/"/g, '\\"') + '"')
                    } else {
                        g.push('"' + h + '":"' + j[h] + '"')
                    }
                }
            }
        }
        g = "{" + g.join(",") + "}";
        var i = "";
        i += "<html>";
        i += "<head>";
        i += '<style type="text/css">*{margin:0;padding:0}</style>';
        i += '<script type="text/javascript">';
        i += "   window.tanx_ssp_temp_show_obj = " + g + ";";
        i += "<\/script>";
        i += "</head>";
        i += "<body>";
        i += '<a style="none" id="tanx-a-' + j.pid + '" style="display:none"></a>';
        i += "</body>";
        i += "</html>";
        return i
    }
});
KSLITE.declare("tanxssp-display", ["tanxssp-template", "tanxssp-utils", "tanxssp-config", "tanxssp-icon", "tanxssp-otherwin"],
function(a, c) {
    var l = a("tanxssp-template").Def;
    var i = a("tanxssp-utils");
    var k = a("tanxssp-config").c.mapAdType;
    var b = a("tanxssp-config").r;
    var f = a("tanxssp-config").c.mapDisType;
    var h = a("tanxssp-icon");
    var n = a("tanxssp-otherwin");
    var e = {};
    function d(q, p) {
        if (p.insertAdjacentHTML) {
            p.insertAdjacentHTML("beforebegin", q)
        } else {
            var o = document.createElement("div");
            o.innerHTML = q;
            p.parentNode.insertBefore(o.getElementsByTagName("iframe")[0], p)
        }
    }
    function m(s, o, v, r) {
        var u = i.tanxId(s);
        var t = "tanx_frameanchor_" + s;
        var p = 0;
        var q = '<!doctype html><html><head><meta charset=gbk /></head><body style="margin:0px;padding:0px">' + r + "</body></html>";
        if (i.$(t)) { (function w(C) {
                if (C > 20) {
                    return false
                }
                var z = "tanxssp-outer-iframe" + s;
                var A = '<iframe id="' + z + '" width="' + o + '" height="' + v + '" style="display:none"';
                var y = " src=\"javascript:void((function(){var d=document;d.open();d.domain='" + document.domain + "';d.write('');d.close();})())\"";
                var x = ' border="0" frameborder="0" scrolling="no" marginwidth="0" allowTransparency="true" marginheight="0"  style="border: 0pt none;"></iframe>';
                var D = A;
                if (navigator.userAgent.toLowerCase().indexOf("msie") > -1 && document.domain != location.hostname) {
                    D += y
                }
                D += x;
                var B = i.$(t);
                d(D, B);
                setTimeout(function() {
                    try {
                        var G = document.getElementById(z);
                        var F = G.contentWindow.document;
                        F.open("text/html", "replace");
                        F.write(q);
                        setTimeout(function() {
                            F.close()
                        },
                        250);
                        G.style.display = "";
                        if (G.style.display == "none") {
                            setTimeout(function() {
                                G.style.display = ""
                            },
                            200)
                        }
                    } catch(E) {
                        G.parentNode.removeChild(G);
                        D = A + y + x;
                        d(D, B);
                        if (!C) {
                            C = 1
                        } else {
                            C++
                        }
                        w(C)
                    }
                },
                20)
            })()
        }
    }
    function j(q, p, o) {
        this.frameCount = p;
        this.clickurl = o;
        this.pid = q;
        this.cur = 0;
        this.previous = 0;
        this.init()
    }
    i.mix(j.prototype, {
        interval: 2000,
        timer: null,
        isAuto: true,
        init: function() {
            this.show(0);
            this.start();
            this.bindEvents()
        },
        stopBubble: function(o) {
            o = o ? o: window.event;
            if (o.stopPropagation) {
                o.stopPropagation()
            } else {
                o.cancelBubble = true
            }
        },
        bindEvents: function() {
            var p = i.$("tanx-sw-wrap-" + this.pid);
            var q = this;
            p.onmouseover = function(r) {
                q.isAuto = false;
                q.stopBubble(r)
            };
            p.onmouseout = function(r) {
                q.isAuto = true;
                q.stopBubble(r)
            };
            for (var o = 0; o < this.frameCount; o++) { (function(s) {
                    var r = i.$("tanx-sw-nav-" + q.pid + s);
                    var t = i.$("tanx-sw-block-" + q.pid + s);
                    r.onmouseover = function(u) {
                        q.isAuto = false;
                        q.show(s);
                        q.stopBubble(u)
                    };
                    r.onmouseout = function(u) {
                        q.isAuto = true;
                        q.stopBubble(u)
                    };
                    t.onclick = function(z) {
                        z = window.event || z;
                        var y = z.srcElement || z.target;
                        try {
                            if (y.tagName.toUpperCase() != "A") {
                                for (var v = 5; v > 0; v--) {
                                    y = y.parentNode;
                                    if (y.tagName.toUpperCase() == "A") {
                                        break
                                    }
                                }
                                if (y.tagName.toUpperCase() != "A") {
                                    y = 0
                                }
                            }
                            if (typeof y.href == "undefined") {
                                y = 0
                            }
                            if (y) {
                                if (y.tagName.toUpperCase() == "A" && y.getAttribute("href", 2).replace(/(^\s*)/g, "").indexOf("http") !== 0) {
                                    y = 0
                                }
                                var x = (y.getAttribute("href", 2).replace(/(^\s*)/g, "").match(/http:\/\/([^\/]+)/i) || ["", ""])[1];
                                new Image().src = decodeURIComponent(q.clickurl) + "&d_r=" + x + "_" + (new Date()).getTime().toString().substr(9)
                            }
                            q.stopBubble(z)
                        } catch(u) {}
                    }
                })(o)
            }
        },
        stop: function() {
            this.isAuto = false
        },
        start: function() {
            var o = this;
            this.timer = setInterval(function() {
                if (!o.isAuto) {
                    return false
                }
                var p = o.cur + 1;
                if (p >= o.frameCount) {
                    p = 0
                }
                o.show(p)
            },
            this.interval)
        },
        show: function(o) {
            try {
                this.cur = o;
                this.hide(this.previous);
                i.$("tanx-sw-block-" + this.pid + o).style.display = "block";
                i.$("tanx-sw-nav-" + this.pid + o).className = "tanx-sw-nav-cur";
                this.previous = this.cur
            } catch(p) {}
        },
        hide: function(o) {
            try {
                i.$("tanx-sw-block-" + this.pid + o).style.display = "none";
                i.$("tanx-sw-nav-" + this.pid + o).className = ""
            } catch(p) {}
        }
    });
    e.flash = function(r, o) {
        var s = i.tanxId(r.pid);
        var p = "<a style='display:none !important;' id='tanx_frameanchor_" + r.pid + "'></a>";
        var q = l(r);
        i.showAd(p, s, null,
        function() {
            m(r.pid, r.width, r.height, q);
            if (o) {
                o()
            }
        })
    };
    e.iframehtml = function(p, o) {
        var q = i.tanxId(p.pid);
        i.showAd(l(p), q, null,
        function() {
            m(p.pid, p.width, p.height, p.data);
            if (o) {
                o()
            }
        })
    };
    e.multiframe = function(r, q) {
        var v = r;
        var p = "#tanx-sw-nav-" + v.pid + " span";
        var y = "text-decoration:underline;color:#F60;cursor:pointer;margin-left:3px;width:18px;height:18px;background:white;float:left;font-size:13px;line-height:18px;overflow:visible;text-align:center;opacity:.7;filter:alpha(opacity=70);border:1px solid #D8D8D8;margin-left:-1px;font-family:tahoma,arial;";
        var t = "#tanx-sw-nav-" + v.pid + " span.tanx-sw-nav-cur";
        var s = "background:#F60;color:white;font-weight:bold;opacity:1;filter:alpha(opacity=100);z-index:2;position:relative;";
        var x = document;
        if (x.createStyleSheet) {
            var u = x.createStyleSheet();
            u.addRule(p, y);
            u.addRule(t, s)
        } else {
            var o = x.createElement("style");
            o.innerHTML = p + "{" + y + "}" + t + "{" + s + "}";
            o.setAttribute("type", "text/css");
            var w = x.getElementsByTagName("head")[0];
            w.insertBefore(o, w.firstChild)
        }
        var z = i.tanxId(v.pid);
        i.showAd(l(r), z, null,
        function() {
            new j(r.pid, r.data.split("|+|").length || 0, r.clickurl);
            if (q) {
                q()
            }
        })
    };
    var g = {};
    g.popwin = (function() {
        var o = false;
        return function(t) {
            if (o) {
                return false
            }
            var w = document;
            var v = w.createElement("div");
            var r = i.$("tanxssp-outer-con" + t.pid);
            if (!r) {
                r = i.$("tanxssp-outer-iframe" + t.pid)
            }
            if (!r) {
                return false
            }
            v.style.cssText = "position:absolute;display:block;z-index:999999;height:0px;overflow:hidden;right:0";
            var q = w.createElement("div");
            q.style.cssText = "height:16px;font-size:14px;float:right;width:44px;cursor:pointer;position:absolute;top:-16px;right:0";
            q.appendChild((function() {
                var y = document.createElement("img");
                y.alt = "Close";
                /*- 原代码 -*/
                /*
                y.src = "http://img.alimama.cn/p/close1.gif";
                y.onmouseout = 'this.src="http://img.alimama.cn/p/close1.gif"';
                y.onmouseover = 'this.src="http://img.alimama.cn/p/close2.gif"';
                */
                /*- 本地代码 -*/
                y.src = "./img.alimama.cn/p/close1.gif";
                y.onmouseout = 'this.src="./img.alimama.cn/p/close1.gif"';
                y.onmouseover = 'this.src="./img.alimama.cn/p/close2.gif"';
                return y
            })());
            q.onclick = function() {
                i.hide(v)
            };
            v.appendChild(q);
            v.appendChild(r);
            var u = document.body;
            u.insertBefore(v, u.firstChild);
            o = true;
            var p = 0;
            var s;
            var x = parseInt(t.height, 10);
            s = setInterval(function() {
                var y = (w.documentElement.clientHeight || w.body.clientHeight);
                var z = (w.documentElement.scrollTop || w.body.scrollTop);
                p += 30;
                if (p >= x) {
                    p = x;
                    clearInterval(s);
                    v.style.overflow = "visible";
                    setTimeout(function() {
                        i.fixedEl(v, {
                            top: "auto",
                            right: "0px",
                            bottom: "0px"
                        })
                    },
                    150)
                }
                v.style.top = (y + z - p) + "px";
                v.style.height = p + "px"
            },
            150)
        }
    })();
    g.backdisplay = function(r, y, x) {
        var o = r.data;
        if (r.width < 254) {
            r.width = 254
        }
        if (r.width === "") {
            r.width = 760
        }
        if (r.height === "") {
            r.height = 480
        }
        var p = "width=" + r.width + ",height=" + r.height + ",toolbar=no,location=no,directories=no,status=yes,resizable=no,scrollbars=no";
        var v = n.writeData(r);
        var w = function() {
            var B;
            if ( !! (window.attachEvent && !window.opera)) {
                try {
                    var C = document.getElementById("tanx_popup_try") || document.createElement("iframe");
                    C.id = "tanx_popup_try";
                    C.style.display = "none";
                    document.body.insertBefore(C, document.body.childNodes[0]);
                    document.getElementById("tanx_popup_try").contentWindow.document.write(".");
                    document.body.removeChild(document.getElementById("tanx_popup_try"));
                    B = window.open("about:blank", "_blank", p)
                } catch(A) {
                    B = window.open('javascript:void((function(){var d=document;d.open();d.domain="' + document.domain + '";d.write("");d.close();})())', "_blank", p)
                }
                C = null
            } else {
                B = window.open("about:blank", "_blank", p)
            }
            if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
                B.HTMLElement.prototype.insertAdjacentElement = function(D, E) {
                    switch (D.toLowerCase()) {
                    case "beforebegin":
                        this.parentNode.insertBefore(E, this);
                        break;
                    case "afterbegin":
                        this.insertBefore(E, this.firstChild);
                        break;
                    case "beforeend":
                        this.appendChild(E);
                        break;
                    case "afterend":
                        if (this.nextSibling) {
                            this.parentNode.insertBefore(E, this.nextSibling)
                        } else {
                            this.parentNode.appendChild(E)
                        }
                        break
                    }
                };
                B.HTMLElement.prototype.insertAdjacentHTML = function(E, G) {
                    var F = this.ownerDocument.createRange();
                    F.setStartBefore(this);
                    var D = F.createContextualFragment(G);
                    this.insertAdjacentElement(E, D)
                }
            }
            B.blur();
            try {
                B.opener.focus()
            } catch(z) {}
            if (y) {
                B.location = y
            } else {
                var u = B.document;
                u.open("text/html", "replace");
                u.write(v);
                u.close();
                n.insertScript(B)
            }
        };
        var s = function() {
            i.removeEvent(document, "click", s);
            try {
                w()
            } catch(u) {
                i.domReady(t)
            }
        };
        var t = function() {
            i.addEvent(document, "click", s)
        };
        try {
            t()
        } catch(q) {
            setTimeout(function() {
                t()
            },
            2000)
        }
    };
    g.couplet = (function() {
        return function(G, t) {
            var H = document;
            var r = Math.min(H.documentElement.clientHeight, H.body.clientHeight);
            var E = Math.min(H.documentElement.clientWidth, H.body.clientWidth);
            var C = n.writeData(G);
            var F = {},
            D;
            if (G.webwidth) {
                D = ((E - parseInt(G.webwidth, 10)) / 2 - G.width)
            }
            D = (D < 0 || D === undefined) ? 5 : D;
            F.pos = {
                top: (r < 301 ? "80": "30") + "px"
            };
            var s = H.createElement("div");
            var q = H.createElement("div");
            s.style.cssText = "position:absolute;display:block;z-index:999999;left:" + D + "px";
            q.style.cssText = "position:absolute;display:block;z-index:999999;right:" + D + "px";
            var y = "tanx_displayframe_" + G.pid + "_l";
            var o = "tanx_displayframe_" + G.pid + "_r";
            var z = G.height;
            var B = G.width;
            function A(M) {
                var K = '<iframe id="' + M + '" width="' + B + '" height="' + z + '"';
                var J = " src=\"javascript:void((function(){var d=document;d.open();d.domain='" + document.domain + "';d.write('');d.close();})())\"";
                var I = ' border="0" frameborder="0" scrolling="no" marginwidth="0" allowTransparency="true" marginheight="0"  style="border: 0pt none;"></iframe>';
                var L = K;
                if (navigator.userAgent.toLowerCase().indexOf("msie") > -1 && document.domain != location.hostname) {
                    L += J
                }
                L += I;
                return L
            }
            s.innerHTML = A(y);
            q.innerHTML = A(o);
            var u = H.createElement("div");
            u.style.cssText = "height:16px;font-size:14px;float:right;width:44px;cursor:pointer;position:absolute;top:-16px;right:0";
            u.appendChild((function() {
                var I = document.createElement("img");
                I.alt = "Close";
                /*- 原代码 -*/
                /*
                I.src = "http://img.alimama.cn/p/close1.gif";
                I.onmouseout = 'this.src="http://img.alimama.cn/p/close1.gif"';
                I.onmouseover = 'this.src="http://img.alimama.cn/p/close2.gif"';
                */
                /*- 本地代码 -*/
                I.src = "http://img.alimama.cn/p/close1.gif";
                I.onmouseout = 'this.src="http://img.alimama.cn/p/close1.gif"';
                I.onmouseover = 'this.src="http://img.alimama.cn/p/close2.gif"';
                return I
            })());
            var v = H.createElement("div");
            v.style.cssText = "height:16px;font-size:14px;froat:right;width:44px;cursor:pointer;position:absolute;top:-16px;right:0";
            v.appendChild((function() {
                var I = document.createElement("img");
                I.alt = "Crose";
                /*- 原代码 -*/
                /*
                I.src = "http://img.alimama.cn/p/close1.gif";
                I.onmouseout = 'this.src="http://img.alimama.cn/p/close1.gif"';
                I.onmouseover = 'this.src="http://img.alimama.cn/p/close2.gif"';
                */
                /*- 本地代码 -*/
                I.src = "./img.alimama.cn/p/close1.gif";
                I.onmouseout = 'this.src="./img.alimama.cn/p/close1.gif"';
                I.onmouseover = 'this.src="./img.alimama.cn/p/close2.gif"';
                return I
            })());
            u.onclick = v.onclick = function() {
                i.hide(s);
                i.hide(q)
            };
            s.appendChild(u);
            q.appendChild(v);
            var w = document.body;
            w.insertBefore(s, w.firstChild);
            w.insertBefore(q, w.firstChild);
            i.fixedEl(s, F.pos);
            i.fixedEl(q, F.pos);
            var x = 0; (function p() {
                if (x > 10) {
                    return false
                }
                x++;
                var K;
                var N;
                try {
                    K = document.getElementById(y);
                    var L = K.contentWindow;
                    var I = L.document;
                    I.open("text/html", "replace");
                    I.write(C);
                    I.close();
                    N = document.getElementById(o);
                    var J = N.contentWindow;
                    var P = J.document;
                    P.open("text/html", "replace");
                    P.write(C);
                    P.close();
                    n.insertScript(L);
                    n.insertScript(J)
                } catch(O) {
                    K = document.getElementById(y);
                    N = document.getElementById(o);
                    var M = "javascript:void((function(){var d=document;d.open();d.domain='" + document.domain + "';d.write('');d.close();})())";
                    K.src = M;
                    N.src = M;
                    p()
                }
            })()
        }
    })();
    c.Def = function(t) {
        var v = i.tanxId(t.pid);
        var p = k[t.adboardtype];
        var r = f[t.distype];
        var q = false;
        if (p == "html" && r == "static") {
            for (var s = 0,
            o = b.units.length; s < o; s++) {
                if (b.units[s].i === t.pid) {
                    q = b.units[s].sync;
                    break
                }
            }
            if (q) {
                document.write(l(t));
                try {
                    setTimeout(function() {
                        h.show(t)
                    },
                    0)
                } catch(u) {}
            } else {
                i.showAd(l(t), v, null,
                function() {
                    setTimeout(function() {
                        h.show(t)
                    },
                    0)
                })
            }
            return false
        }
        if (r === "backdisplay") {
            g[r](t);
            return false
        }
        if (r === "couplet") {
            g[r](t);
            return false
        }
        if (!e[p]) {
            i.showAd(l(t), v, null,
            function() {
                setTimeout(function() {
                    h.show(t)
                },
                0)
            })
        } else {
            e[p](t,
            function() {
                setTimeout(function() {
                    h.show(t)
                },
                0)
            })
        }
        if (g[r]) {
            setTimeout(function() {
                g[r](t)
            },
            0)
        }
    }
});
KSLITE.declare("tanxssp-template", ["tanxssp-utils", "tanxssp-config", "tanxssp-icon"],
function(a, c) {
    var h = a("tanxssp-utils");
    var i = a("tanxssp-config").c.mapAdType;
    var e = a("tanxssp-config").c.mapDisType;
    var g = a("tanxssp-icon").tmpl;
    var d = {};
    d.txt = {
        tmpl: function(j) {
            return '<a href="' + j.clickurl + '" target="_blank">' + j.data + "</a>"
        }
    };
    d.txtlink = d.txt;
    d.pic = {
        tmpl: function(j) {
            return '<a href="' + j.clickurl + '" target="_blank"><img border=0 src="' + j.data + '" width="' + j.width + 'px" height="' + j.height + 'px"/></a>'
        }
    };
    d.tuwen = {
        tmpl: function(k) {
            var j = "pid=" + k.pid;
            if (k.data.indexOf("?") == -1) {
                j = "?" + j
            } else {
                j = "&" + j
            }
            return '<iframe src="' + k.data + j + '" width="' + k.width + 'px" height="' + k.height + 'px" border="0" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowTransparency="true"></iframe>'
        }
    };
    d.flash = {
        tmpl: function(l) {
            var j = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + l.width + 'px" height="' + l.height + 'px" align="middle">   <param name="allowScriptAccess" value="' + (l.bannermaker == "1" ? "always": "never") + '" />' + (l.fvs !== "" ? '<param name="flashvars" value="' + l.fvs + '" />': "") + '   <param name="movie" value="' + l.data + '" />   <param name="wmode" value="transparent" />   <param name="quality" value="high" />   <param name="bgcolor" value="#ffffff" />   <embed src="' + l.data + '" quality="high" bgcolor="#ffffff" width="' + l.width + '" height="' + l.height + '" ' + (l.fvs !== "" ? 'flashvars="' + l.fvs + '" ': "") + '      align="middle" allowScriptAccess="' + (l.bannermaker === "1" ? "always": "never") + '" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
            var k = '<!doctype html><html><head></head>  <body style="margin:0px;padding:0px">       <div style="float:left;z-index:100;position:absolute;width:' + l.width + "px;height:" + l.height + 'px;">' + j + '       </div>       <div style="float:left;overflow:hidden;z-index:1000;position:absolute;left:0;top:0;width:' + l.width + "px;height:" + l.height + 'px;">       <a style="position:absolute;height:100%;width:100%;overflow:hidden;font-size:900px;" target="_blank" href="' + l.clickurl + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></div> </body></html>';
            return k
        }
    };
    d.flashb = {
        tmpl: function(k) {
            if (k.fvs) {
                k.fvs = k.fvs + "&clickTAG=" + h.encode(k.clickurl)
            } else {
                k.fvs = "clickTAG=" + h.encode(k.clickurl)
            }
            var j = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + k.width + 'px" height="' + k.height + 'px" align="middle">    <param name="allowScriptAccess" value="' + (k.bannermaker === "1" ? "always": "never") + '" />    <param name="flashvars" value="' + k.fvs + '" />    <param name="movie" value="' + k.data + '" />    <param name="wmode" value="transparent" />    <param name="quality" value="high" />    <param name="bgcolor" value="#ffffff" />    <embed src="' + k.data + '" quality="high" bgcolor="#ffffff" width="' + k.width + '" height="' + k.height + '" flashvars="' + k.fvs + '" align="middle" allowScriptAccess="' + (k.bannermaker === "1" ? "always": "never") + '" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
            return j
        }
    };
    d.iframehtml = {
        tmpl: function(j) {
            return "<a style='display:none !important;' id='tanx_frameanchor_" + j.pid + "'></a>"
        }
    };
    d.multiframe = {
        tmpl: function(r) {
            var p = r.data.split("|+|");
            var j = p.length;
            var m = "";
            var l = "";
            var n = '<div id="tanx-sw-nav-' + r.pid + '" style="display:block;position:absolute;bottom:20px;right:10px;">{nav}</div>';
            var q = '<div><div id="tanx-sw-wrap-' + r.pid + '" style="display:block;position:relative;width:' + r.width + "px;height:" + r.height + 'px; border:0;margin:0;">{block}</div></div>';
            for (var k = 0; k < j; k++) {
                m += '<div id="tanx-sw-block-' + r.pid + k + '" style="display:' + (k === 0 ? "block": "none") + ';position:absolute;top:0;left:0;">' + p[k] + "</div>";
                l += '<span id="tanx-sw-nav-' + r.pid + k + '" style="display:block;text-decoration:none">' + (k + 1) + "</span>"
            }
            n = n.replace(/{nav}/gi, l);
            q = q.replace(/{block}/gi, [m, n].join(""));
            return q
        }
    };
    d.html = {
        tmpl: function(j) {
            return j.data
        }
    };
    function f(m, l) {
        var j = i[m.adboardtype];
        var k = e[m.distype];
        if (j == "multiframe") {
            return '<ins style="display:block;padding:0;margin:0;width:' + m.width + ";height:" + m.height + ';" id="tanxssp-outer-con' + m.pid + '">' + l + "</ins>"
        }
        if (j == "html" && k == "static") {
            return l
        }
        return '<ins style="display:inline;padding:0;margin:0;" id="tanxssp-outer-con' + m.pid + '">' + l + "</ins>"
    }
    /*- 原代码 -*/
    /*
    var b = {
        "760x90": "http://img.alimama.cn/defboards/domainbind/2/760x90.jpg",
        "468x60": "http://img.alimama.cn/defboards/domainbind/2/468x60.jpg",
        "250x60": "http://img.alimama.cn/defboards/domainbind/2/250x60.jpg",
        "728x90": "http://img.alimama.cn/defboards/domainbind/2/728x90.jpg",
        "950x90": "http://img.alimama.cn/defboards/domainbind/2/950x90.jpg",
        "658x60": "http://img.alimama.cn/defboards/domainbind/2/658x60.jpg",
        "120x600": "http://img.alimama.cn/defboards/domainbind/2/120x600.jpg",
        "336x280": "http://img.alimama.cn/defboards/domainbind/2/336x280.jpg",
        "300x250": "http://img.alimama.cn/defboards/domainbind/2/300x250.jpg",
        "290x200": "http://img.alimama.cn/defboards/domainbind/2/290x200.jpg",
        "120x60": "http://img.alimama.cn/defboards/domainbind/2/120x60.jpg",
        "100x100": "http://img.alimama.cn/defboards/domainbind/2/100x100.jpg",
        "120x240": "http://img.alimama.cn/defboards/domainbind/2/120x240.jpg",
        "160x600": "http://img.alimama.cn/defboards/domainbind/2/160x600.jpg",
        "180x250": "http://img.alimama.cn/defboards/domainbind/2/180x250.jpg",
        "250x300": "http://img.alimama.cn/defboards/domainbind/2/250x300.jpg",
        "360x190": "http://img.alimama.cn/defboards/domainbind/2/360x190.jpg",
        "250x250": "http://img.alimama.cn/defboards/domainbind/2/250x250.jpg",
        "200x200": "http://img.alimama.cn/defboards/domainbind/2/200x200.jpg"
    };
    */
    /*- 本地代码 -*/
    var b = {
        "760x90": "./img.alimama.cn/defboards/domainbind/2/760x90.jpg",
        "468x60": "./img.alimama.cn/defboards/domainbind/2/468x60.jpg",
        "250x60": "./img.alimama.cn/defboards/domainbind/2/250x60.jpg",
        "728x90": "./img.alimama.cn/defboards/domainbind/2/728x90.jpg",
        "950x90": "./img.alimama.cn/defboards/domainbind/2/950x90.jpg",
        "658x60": "./img.alimama.cn/defboards/domainbind/2/658x60.jpg",
        "120x600": "./img.alimama.cn/defboards/domainbind/2/120x600.jpg",
        "336x280": "./img.alimama.cn/defboards/domainbind/2/336x280.jpg",
        "300x250": "./img.alimama.cn/defboards/domainbind/2/300x250.jpg",
        "290x200": "./img.alimama.cn/defboards/domainbind/2/290x200.jpg",
        "120x60": "./img.alimama.cn/defboards/domainbind/2/120x60.jpg",
        "100x100": "./img.alimama.cn/defboards/domainbind/2/100x100.jpg",
        "120x240": "./img.alimama.cn/defboards/domainbind/2/120x240.jpg",
        "160x600": "./img.alimama.cn/defboards/domainbind/2/160x600.jpg",
        "180x250": "./img.alimama.cn/defboards/domainbind/2/180x250.jpg",
        "250x300": "./img.alimama.cn/defboards/domainbind/2/250x300.jpg",
        "360x190": "./img.alimama.cn/defboards/domainbind/2/360x190.jpg",
        "250x250": "./img.alimama.cn/defboards/domainbind/2/250x250.jpg",
        "200x200": "./img.alimama.cn/defboards/domainbind/2/200x200.jpg"
    };
    c.Def = function(k) {
        if (k.unregist === "1") {
            k.clickurl = "http://a.alimama.cn";
            if (b[k.width + "x" + k.height]) {
                k.data = b[k.width + "x" + k.height]
            } else {
                /*- 原代码 -*/
                //k.data = "http://img.alimama.cn/defboards/domainbind/2/200x200.jpg"
                /*- 本地代码 -*/
                k.data = "./img.alimama.cn/defboards/domainbind/2/200x200.jpg"
            }
            k.distype = "1";
            k.adboardtype = "2"
        }
        var j = i[k.adboardtype];
        if (k.width === "0") {
            k.width = "auto"
        }
        if (k.height === "0") {
            k.height = "auto"
        }
        return f(k, g(k, d[j].tmpl(k)))
    }
}); (function() {
    if (window.tanx_ssp_temp_adobj) {
        var a = window.tanx_ssp_temp_adobj;
        try {
            window.tanx_ssp_temp_adobj = null;
            delete window.tanx_ssp_temp_adobj
        } catch(c) {}
        KSLITE.provide(["tanxssp-main"],
        function(d) {
            d("tanxssp-main").run(a)
        })
    }
    if (window.tanx_ssp_temp_show_obj) {
        var b = window.tanx_ssp_temp_show_obj;
        try {
            window.tanx_ssp_temp_show_obj = null;
            delete window.tanx_ssp_temp_show_obj
        } catch(c) {}
        try {
            KSLITE.provide(["tanxssp-display"],
            function(d) {
                d("tanxssp-display").Def(b)
            })
        } catch(c) {}
    }
})();