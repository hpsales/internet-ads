/*pub-1|2013-05-16 10:00:40*/
(function(e, f, i) {
    var l = {
        /*-- 原代码 --*/
        /*
        lt_pkgs: {
            tanxssp: "http://cdn.tanx.com/t/",
            charset: "gbk"
        },
        */
        /*-- 本地代码 --*/
        lt_pkgs: {
            tanxssp: "./cdn.tanx.com/t/",
            charset: "gbk"
        },
        lt_v: "1.0.0",
        lt_t: "20130516.js"
    };
    if (e[f] === i) {
        e[f] = {}
    } else {
        KSLITE.Config.lt_pkgs = KSLITE.mix(l.lt_pkgs, KSLITE.Config.lt_pkgs);
        return
    }
    var k = e.KSLITEonLoad,
    d = e.KSLITEpkgPaths;
    f = e[f];
    var r = e.document;
    var o = Object.prototype.toString;
    var m = function(x, w, v, z) {
        if (!w || !x) {
            return x
        }
        if (v === i) {
            v = true
        }
        var u, y, t;
        if (z && (t = z.length)) {
            for (u = 0; u < t; u++) {
                y = z[u];
                if (y in w) {
                    if (v || !(y in x)) {
                        x[y] = w[y]
                    }
                }
            }
        } else {
            for (y in w) {
                if (v || !(y in x)) {
                    x[y] = w[y]
                }
            }
        }
        return x
    };
    var h = r.getElementsByTagName("head")[0] || r.documentElement;
    var a = 0,
    q = 1,
    g = 2,
    j = 3,
    c = 4,
    b = /\.css(?:\?|$)/i;
    var n = r.createElement("script").readyState ?
    function(t, u) {
        var s = t.onreadystatechange;
        t.onreadystatechange = function() {
            var v = t.readyState;
            if (v === "loaded" || v === "complete") {
                t.onreadystatechange = null;
                if (s) {
                    s()
                }
                u.call(this)
            }
        }
    }: function(s, t) {
        s.addEventListener("load", t, false);
        s.addEventListener("error", t, false)
    };
    function p() {
        if (navigator.userAgent.indexOf("MSIE") < 0) {
            return null
        }
        var t = h.getElementsByTagName("script");
        var u, v = 0,
        s = t.length;
        for (; v < s; v++) {
            u = t[v];
            if (u.readyState === "interactive") {
                return u
            }
        }
        return null
    }
    m(f, {
        version: l.lt_v,
        _init: function() {
            var u, v, t = r.getElementsByTagName("script");
            if (!window.KSLITEcurrentScript) {
                for (u = 0; u < t.length; u++) {
                    if (t[u].kslite) {
                        window.KSLITEcurrentScript = t[u];
                        break
                    }
                }
            }
            v = window.KSLITEcurrentScript || t[t.length - 1];
            window.KSLITEcurrentScript = v;
            var y = (v.src).split("/").slice(0, -1).join("/") + "/";
            f.Env = {
                mods: {},
                fns: {},
                _loadQueue: {},
                _relies: {
                    rq: {},
                    sp: {}
                }
            };
            f.Config = {
                debug: "",
                base: y,
                timeout: 10,
                kslite: l
            };
            f.mix(f.Config, l);
            f.declare("kslite", [],
            function(z, x) {
                x = f.mix(x, f, true, ["path", "log", "getScript", "substitute", "clone", "mix", "multiAsync", "extend", "iA", "iF", "iPO", "iS"])
            });
            f.provide(["kslite"],
            function(x) {
                f.require("kslite").log("kslite inited")
            });
            if (f.Config.debug) {
                l.lt_t += (new Date()).getTime() + ".js"
            }
            var w;
            function s(z) {
                var x = z.split("@");
                l.lt_pkgs[x[0]] = x[1]
            }
            e.KSLITEpkgPaths = {
                push: function(x) {
                    s(x)
                }
            };
            if (d && f.iA(d)) {
                for (w = 0; w < d.length; w++) {
                    s(d[w])
                }
            }
            l.lt_t = e.KSLITEtimestamp || l.lt_t;
            e.KSLITEonLoad = {
                push: function(x) {
                    if (x && f.iF(x)) {
                        x(f)
                    }
                }
            };
            if (k && f.iA(k)) {
                for (w = 0; w < k.length; w++) {
                    if (f.iF(k[w])) {
                        k[w](f)
                    }
                }
            }
        },
        mix: m,
        log: function(u, s, t) {
            if (f.Config.debug) {
                if (e.console !== i && console.log) {
                    console[s && console[s] ? s: "log"](u)
                }
            }
            return f
        },
        clone: function(v) {
            var u = v,
            s, t;
            if (v && ((s = f.iA(v)) || f.iPO(v))) {
                u = s ? [] : {};
                for (t in v) {
                    if (v.hasOwnProperty(t)) {
                        u[t] = f.clone(v[t])
                    }
                }
            }
            return u
        },
        extend: function(x, w, u, A) {
            if (!w || !x) {
                return x
            }
            var t = Object.prototype,
            z = function(B) {
                function s() {}
                s.prototype = B;
                return new s()
            },
            y = w.prototype,
            v = z(y);
            x.prototype = v;
            v.constructor = x;
            x.superclass = y;
            if (w !== Object && y.constructor === t.constructor) {
                y.constructor = w
            }
            if (u) {
                m(v, u)
            }
            if (A) {
                m(x, A)
            }
            return x
        },
        substitute: function(v, u, t, s) {
            if (!f.iS(v) || !f.iPO(u)) {
                return v
            }
            return v.replace(t || (/\\?\{([^{}]+)\}/g),
            function(x, w) {
                if (x.charAt(0) === "\\") {
                    return x.slice(1)
                }
                return (u[w] !== i) ? u[w] : (s ? x: "")
            })
        },
        getScript: function(s, B, w, A) {
            var C = b.test(s),
            v = r.createElement(C ? "link": "script");
            var u = B,
            y, z, t, x;
            if (f.iPO(u)) {
                B = u.success;
                y = u.error;
                z = u.timeout;
                w = u.charset
            }
            if (C) {
                v.href = s;
                v.rel = "stylesheet"
            } else {
                v.src = s;
                v.async = true
            }
            if (w) {
                v.charset = w
            }
            if (A) {
                for (x in A) {
                    v.setAttribute(x, A[x])
                }
            }
            if (f.iF(B)) {
                if (C) {
                    B.call(v)
                } else {
                    n(v,
                    function() {
                        if (t) {
                            t.cancel();
                            t = i
                        }
                        B.call(v)
                    })
                }
            }
            if (f.iF(y)) {
                t = setTimeout(function() {
                    t = i;
                    y()
                },
                (z || f.Config.timeout) * 1000)
            }
            h.insertBefore(v, h.firstChild);
            return v
        },
        iF: function(s) {
            return o.call(s) === "[object Function]"
        },
        iA: function(s) {
            return o.call(s) === "[object Array]"
        },
        iS: function(s) {
            return o.call(s) === "[object String]"
        },
        iPO: function(s) {
            return s && o.call(s) === "[object Object]" && !s.nodeType && !s.setInterval
        },
        add: function(t, v, s) {
            var w = f.Env.mods,
            u;
            if (w[t] && w[t].status > a) {
                return
            }
            u = {
                name: t,
                fn: v || null,
                status: g
            };
            if (f.iA(s)) {
                s = {
                    requires: s
                }
            }
            m(u, s);
            w[t] = u;
            return f
        },
        use: function(s, u) {
            s = s.split(",");
            var t = f.Env.mods;
            f._aMs(s,
            function() {
                if (u) {
                    u(f)
                }
            })
        },
        _aMs: function(s, v) {
            var t, u = {};
            for (t = 0; t < s.length; t++) {
                u[s[t]] = {
                    f: f._aM,
                    a: s[t]
                }
            }
            f.multiAsync(u, v)
        },
        _aM: function(x, w) {
            var t, A;
            var y = f.Env.mods,
            s = f.Env._relies.rq,
            v = f.Env._relies.sp;
            function u(B) {
                if (B.status != c) {
                    if (B.fn) {
                        f.log("attach " + B.name);
                        B.fn(f, f.require(B.name), f._ns(B.name))
                    } else {
                        f.log("attach " + B.name + " without expected attach fn!", "warn")
                    }
                    B.status = c
                }
                w()
            }
            function z(E) {
                var D, F, H, B, G;
                function C(I) {
                    s[I] = s[I] || {};
                    v[I] = v[I] || {};
                    return I
                }
                F = C(E.name);
                for (D = 0; D < E.requires.length; D++) {
                    H = C(E.requires[D]);
                    s[F][H] = 1;
                    v[H][F] = 1;
                    for (G in v[F]) {
                        s[G][H] = 1;
                        v[H][G] = 1
                    }
                }
            }
            t = y[x];
            if (t && t.status !== a) {
                A = t.requires;
                if (f.iA(A) && A.length > 0) {
                    z(t);
                    if (s[x][x]) {
                        throw new Error("Fatal Error,Loop Reqs:" + t.name)
                    }
                    f.log(t.name + " to req: " + A);
                    f._aMs(A,
                    function() {
                        u(t)
                    })
                } else {
                    u(t)
                }
            } else {
                t = {
                    name: x
                };
                f._lM(t,
                function() {
                    f._aM(x,
                    function() {
                        u(y[x])
                    })
                })
            }
        },
        _lM: function(t, y) {
            var s = f.Env._loadQueue,
            w = t.name,
            u;
            var v = f.Env.mods;
            if (s[w]) {
                u = s[w];
                if (u.c) {
                    f.log(w + " is already loaded", "warn");
                    y()
                } else {
                    f.log(w + " is loading,listen to callback");
                    u.fns.push(y)
                }
            } else {
                if (typeof s[w] != "undefined") {
                    try {
                        s[w].fns.push(y)
                    } catch(x) {
                        s[w].fns = [y]
                    }
                } else {
                    s[w] = {
                        fns: [y],
                        c: false
                    }
                }
                f._gPath(t,
                function() {
                    if (!v[w]) {
                        v[w] = {
                            name: w,
                            status: a
                        }
                    }
                    f.getScript(t.fullpath,
                    function() {
                        var A, B = s[w],
                        z;
                        if (f.__m__) {
                            z = f.__m__;
                            f.add(w, z.fn, z.deps);
                            f.__m__ = null
                        }
                        if (v[w].status === a) {
                            v[w].status = g
                        }
                        for (A = 0; A < B.fns.length; A++) {
                            B.fns[A]()
                        }
                        B.c = true;
                        B.fns = i
                    },
                    "gbk", {
                        mod_name: w
                    })
                })
            }
        },
        path: function(u, x) {
            var t = u.split("-"),
            w = t[0],
            v = f.Config.lt_pkgs;
            if (f.iS(v[w])) {
                x(v[w] + t.join("/"))
            } else {
                KSLITE.provide(["packages-router"],
                function(s) {
                    var y = s("packages-router");
                    x((y[w] || f.Config.base) + t.join("/"))
                })
            }
        },
        _gPath: function(s, t) {
            f.path(s.name,
            function(u) {
                s.fullpath = u + ".js?_t=" + l.lt_t;
                f.log("path " + s.name + ": " + s.fullpath);
                t()
            })
        },
        multiAsync: function(w, x) {
            var t, u, s = false;
            function v() {
                var y, z = {};
                for (y in w) {
                    if (!w[y].c) {
                        return
                    }
                    z[y] = w[y].r
                }
                x(z)
            }
            for (u in w) {
                s = true
            }
            if (!s) {
                x({})
            }
            for (u in w) {
                if (w.hasOwnProperty(u)) { (function() {
                        var y = w[u];
                        y.f.call((y.c || f), y.a,
                        function(z) {
                            y.r = z;
                            y.c = true;
                            v()
                        })
                    })()
                }
            }
        },
        _ns: function(u) {
            var s, t = u.split("-"),
            v = f.Env.fns;
            for (s = 0; s < t.length; s++) {
                v[t[s]] = v[t[s]] || {};
                v = v[t[s]]
            }
            return v
        },
        require: function(t) {
            var s = f._ns(t);
            s.exports = s.exports || {};
            return s.exports
        },
        declare: function() {
            var v, u, t, x, s, w;
            for (u = 0; u < arguments.length; u++) {
                t = arguments[u];
                if (f.iS(t)) {
                    x = t
                } else {
                    if (f.iA(t)) {
                        s = t
                    } else {
                        if (f.iF(t)) {
                            w = t
                        }
                    }
                }
            }
            if (!x) {
                v = p();
                if (v) {
                    x = v.getAttribute("mod_name") || false
                }
            }
            if (!x) {
                f.__m__ = {
                    deps: s,
                    fn: function(z, y, A) {
                        w(z.require, y, A)
                    }
                }
            } else {
                f.add(x,
                function(z, y, A) {
                    w(z.require, y, A)
                },
                s)
            }
        },
        provide: function(t, s) {
            f.use(t.join(","),
            function(u) {
                s(u.require)
            })
        }
    });
    f._init()
})(window, "KSLITE"); (function(c, b) {
    var d = c.tanx_ssp_onload;
    if (d && b.iA(d)) {
        for (var a = 0; a < d.length; a++) {
            if (b.iPO(d[a])) {
                tanxssp_show(d[a])
            }
        }
    }
    c.tanx_ssp_onload = {
        push: function(e) {
            if (e && b.iPO(e)) {
                tanxssp_show(e)
            }
        }
    }
})(window, KSLITE);
function tanxssp_show(b) {
    if (!document.getElementById("tanx-a-" + b.i || "")) {
        document.write("<iframe style='display:none' id='tanx-a-" + b.i + "' frameborder=0 scrolling='no' marginwidth='0' marginheight='0'></iframe>");
        b.sync = true
    }
    /*-- 原代码 --*/
    //var a = "http://cdn.tanx.com/t/tanxssp/main.js?_t=20130516";
    /*-- 本地代码 --*/
    var a = "./cdn.tanx.com/t/tanxssp/main.js?_t=20130516";
    if (b.sync) {
        window.tanx_ssp_temp_adobj = b;
        document.write('<script charset="gbk" src="' + a + '"></sc');
        document.write("ript>")
    } else {
        KSLITE.provide(["tanxssp-main"],
        function(c) {
            c("tanxssp-main").run(b)
        })
    }
};