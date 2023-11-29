(() => {
  var t = {
      138: function (t) {
        var e, r;
        (e = "undefined" != typeof window ? window : this),
          (r = function () {
            function t() {}
            let e = t.prototype;
            return (
              (e.on = function (t, e) {
                if (!t || !e) return this;
                let r = (this._events = this._events || {}),
                  n = (r[t] = r[t] || []);
                return n.includes(e) || n.push(e), this;
              }),
              (e.once = function (t, e) {
                if (!t || !e) return this;
                this.on(t, e);
                let r = (this._onceEvents = this._onceEvents || {});
                return ((r[t] = r[t] || {})[e] = !0), this;
              }),
              (e.off = function (t, e) {
                let r = this._events && this._events[t];
                if (!r || !r.length) return this;
                let n = r.indexOf(e);
                return -1 != n && r.splice(n, 1), this;
              }),
              (e.emitEvent = function (t, e) {
                let r = this._events && this._events[t];
                if (!r || !r.length) return this;
                (r = r.slice(0)), (e = e || []);
                let n = this._onceEvents && this._onceEvents[t];
                for (let i of r)
                  n && n[i] && (this.off(t, i), delete n[i]), i.apply(this, e);
                return this;
              }),
              (e.allOff = function () {
                return delete this._events, delete this._onceEvents, this;
              }),
              t
            );
          }),
          t.exports ? (t.exports = r()) : (e.EvEmitter = r());
      },
      70: function (t, e, r) {
        !(function (e, n) {
          t.exports
            ? (t.exports = n(e, r(138)))
            : (e.imagesLoaded = n(e, e.EvEmitter));
        })("undefined" != typeof window ? window : this, function (t, e) {
          let r = t.jQuery,
            n = t.console;
          function i(t, e, s) {
            if (!(this instanceof i)) return new i(t, e, s);
            let o = t;
            var a;
            "string" == typeof t && (o = document.querySelectorAll(t)),
              o
                ? ((this.elements =
                    ((a = o),
                    Array.isArray(a)
                      ? a
                      : "object" == typeof a && "number" == typeof a.length
                      ? [...a]
                      : [a])),
                  (this.options = {}),
                  "function" == typeof e
                    ? (s = e)
                    : Object.assign(this.options, e),
                  s && this.on("always", s),
                  this.getImages(),
                  r && (this.jqDeferred = new r.Deferred()),
                  setTimeout(this.check.bind(this)))
                : n.error(`Bad element for imagesLoaded ${o || t}`);
          }
          (i.prototype = Object.create(e.prototype)),
            (i.prototype.getImages = function () {
              (this.images = []),
                this.elements.forEach(this.addElementImages, this);
            });
          const s = [1, 9, 11];
          i.prototype.addElementImages = function (t) {
            "IMG" === t.nodeName && this.addImage(t),
              !0 === this.options.background &&
                this.addElementBackgroundImages(t);
            let { nodeType: e } = t;
            if (!e || !s.includes(e)) return;
            let r = t.querySelectorAll("img");
            for (let t of r) this.addImage(t);
            if ("string" == typeof this.options.background) {
              let e = t.querySelectorAll(this.options.background);
              for (let t of e) this.addElementBackgroundImages(t);
            }
          };
          const o = /url\((['"])?(.*?)\1\)/gi;
          function a(t) {
            this.img = t;
          }
          function u(t, e) {
            (this.url = t), (this.element = e), (this.img = new Image());
          }
          return (
            (i.prototype.addElementBackgroundImages = function (t) {
              let e = getComputedStyle(t);
              if (!e) return;
              let r = o.exec(e.backgroundImage);
              for (; null !== r; ) {
                let n = r && r[2];
                n && this.addBackground(n, t), (r = o.exec(e.backgroundImage));
              }
            }),
            (i.prototype.addImage = function (t) {
              let e = new a(t);
              this.images.push(e);
            }),
            (i.prototype.addBackground = function (t, e) {
              let r = new u(t, e);
              this.images.push(r);
            }),
            (i.prototype.check = function () {
              if (
                ((this.progressedCount = 0),
                (this.hasAnyBroken = !1),
                !this.images.length)
              )
                return void this.complete();
              let t = (t, e, r) => {
                setTimeout(() => {
                  this.progress(t, e, r);
                });
              };
              this.images.forEach(function (e) {
                e.once("progress", t), e.check();
              });
            }),
            (i.prototype.progress = function (t, e, r) {
              this.progressedCount++,
                (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
                this.emitEvent("progress", [this, t, e]),
                this.jqDeferred &&
                  this.jqDeferred.notify &&
                  this.jqDeferred.notify(this, t),
                this.progressedCount === this.images.length && this.complete(),
                this.options.debug && n && n.log(`progress: ${r}`, t, e);
            }),
            (i.prototype.complete = function () {
              let t = this.hasAnyBroken ? "fail" : "done";
              if (
                ((this.isComplete = !0),
                this.emitEvent(t, [this]),
                this.emitEvent("always", [this]),
                this.jqDeferred)
              ) {
                let t = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[t](this);
              }
            }),
            (a.prototype = Object.create(e.prototype)),
            (a.prototype.check = function () {
              this.getIsImageComplete()
                ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
                : ((this.proxyImage = new Image()),
                  this.img.crossOrigin &&
                    (this.proxyImage.crossOrigin = this.img.crossOrigin),
                  this.proxyImage.addEventListener("load", this),
                  this.proxyImage.addEventListener("error", this),
                  this.img.addEventListener("load", this),
                  this.img.addEventListener("error", this),
                  (this.proxyImage.src = this.img.currentSrc || this.img.src));
            }),
            (a.prototype.getIsImageComplete = function () {
              return this.img.complete && this.img.naturalWidth;
            }),
            (a.prototype.confirm = function (t, e) {
              this.isLoaded = t;
              let { parentNode: r } = this.img,
                n = "PICTURE" === r.nodeName ? r : this.img;
              this.emitEvent("progress", [this, n, e]);
            }),
            (a.prototype.handleEvent = function (t) {
              let e = "on" + t.type;
              this[e] && this[e](t);
            }),
            (a.prototype.onload = function () {
              this.confirm(!0, "onload"), this.unbindEvents();
            }),
            (a.prototype.onerror = function () {
              this.confirm(!1, "onerror"), this.unbindEvents();
            }),
            (a.prototype.unbindEvents = function () {
              this.proxyImage.removeEventListener("load", this),
                this.proxyImage.removeEventListener("error", this),
                this.img.removeEventListener("load", this),
                this.img.removeEventListener("error", this);
            }),
            (u.prototype = Object.create(a.prototype)),
            (u.prototype.check = function () {
              this.img.addEventListener("load", this),
                this.img.addEventListener("error", this),
                (this.img.src = this.url),
                this.getIsImageComplete() &&
                  (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                  this.unbindEvents());
            }),
            (u.prototype.unbindEvents = function () {
              this.img.removeEventListener("load", this),
                this.img.removeEventListener("error", this);
            }),
            (u.prototype.confirm = function (t, e) {
              (this.isLoaded = t),
                this.emitEvent("progress", [this, this.element, e]);
            }),
            (i.makeJQueryPlugin = function (e) {
              (e = e || t.jQuery) &&
                ((r = e),
                (r.fn.imagesLoaded = function (t, e) {
                  return new i(this, t, e).jqDeferred.promise(r(this));
                }));
            }),
            i.makeJQueryPlugin(),
            i
          );
        });
      },
    },
    e = {};
  function r(n) {
    var i = e[n];
    if (void 0 !== i) return i.exports;
    var s = (e[n] = { exports: {} });
    return t[n].call(s.exports, s, s.exports, r), s.exports;
  }
  (r.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return r.d(e, { a: e }), e;
  }),
    (r.d = (t, e) => {
      for (var n in e)
        r.o(e, n) &&
          !r.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
    (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (() => {
      "use strict";
      function t(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function e(t, e) {
        (t.prototype = Object.create(e.prototype)),
          (t.prototype.constructor = t),
          (t.__proto__ = e);
      }
      var n,
        i,
        s,
        o,
        a,
        u,
        l,
        c,
        h,
        f,
        p,
        d,
        g,
        m,
        _,
        v = {
          autoSleep: 120,
          force3D: "auto",
          nullTargetWarn: 1,
          units: { lineHeight: "" },
        },
        y = { duration: 0.5, overwrite: !1, delay: 0 },
        x = 1e8,
        b = 1e-8,
        w = 2 * Math.PI,
        T = w / 4,
        k = 0,
        E = Math.sqrt,
        M = Math.cos,
        C = Math.sin,
        O = function (t) {
          return "string" == typeof t;
        },
        S = function (t) {
          return "function" == typeof t;
        },
        A = function (t) {
          return "number" == typeof t;
        },
        P = function (t) {
          return void 0 === t;
        },
        D = function (t) {
          return "object" == typeof t;
        },
        R = function (t) {
          return !1 !== t;
        },
        I = function () {
          return "undefined" != typeof window;
        },
        z = function (t) {
          return S(t) || O(t);
        },
        L =
          ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
          function () {},
        B = Array.isArray,
        F = /(?:-?\.?\d|\.)+/gi,
        Y = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
        q = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        N = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
        X = /[+-]=-?[.\d]+/,
        j = /[^,'"\[\]\s]+/gi,
        U = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
        W = {},
        H = {},
        V = function (t) {
          return (H = wt(t, W)) && wr;
        },
        G = function (t, e) {
          return console.warn(
            "Invalid property",
            t,
            "set to",
            e,
            "Missing plugin? gsap.registerPlugin()"
          );
        },
        Q = function (t, e) {
          return !e && console.warn(t);
        },
        $ = function (t, e) {
          return (t && (W[t] = e) && H && (H[t] = e)) || W;
        },
        Z = function () {
          return 0;
        },
        J = { suppressEvents: !0, isStart: !0, kill: !1 },
        K = { suppressEvents: !0, kill: !1 },
        tt = { suppressEvents: !0 },
        et = {},
        rt = [],
        nt = {},
        it = {},
        st = {},
        ot = 30,
        at = [],
        ut = "",
        lt = function (t) {
          var e,
            r,
            n = t[0];
          if ((D(n) || S(n) || (t = [t]), !(e = (n._gsap || {}).harness))) {
            for (r = at.length; r-- && !at[r].targetTest(n); );
            e = at[r];
          }
          for (r = t.length; r--; )
            (t[r] && (t[r]._gsap || (t[r]._gsap = new Le(t[r], e)))) ||
              t.splice(r, 1);
          return t;
        },
        ct = function (t) {
          return t._gsap || lt(Kt(t))[0]._gsap;
        },
        ht = function (t, e, r) {
          return (r = t[e]) && S(r)
            ? t[e]()
            : (P(r) && t.getAttribute && t.getAttribute(e)) || r;
        },
        ft = function (t, e) {
          return (t = t.split(",")).forEach(e) || t;
        },
        pt = function (t) {
          return Math.round(1e5 * t) / 1e5 || 0;
        },
        dt = function (t) {
          return Math.round(1e7 * t) / 1e7 || 0;
        },
        gt = function (t, e) {
          var r = e.charAt(0),
            n = parseFloat(e.substr(2));
          return (
            (t = parseFloat(t)),
            "+" === r ? t + n : "-" === r ? t - n : "*" === r ? t * n : t / n
          );
        },
        mt = function (t, e) {
          for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r; );
          return n < r;
        },
        _t = function () {
          var t,
            e,
            r = rt.length,
            n = rt.slice(0);
          for (nt = {}, rt.length = 0, t = 0; t < r; t++)
            (e = n[t]) &&
              e._lazy &&
              (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
        },
        vt = function (t, e, r, n) {
          rt.length && !i && _t(),
            t.render(e, r, n || (i && e < 0 && (t._initted || t._startAt))),
            rt.length && !i && _t();
        },
        yt = function (t) {
          var e = parseFloat(t);
          return (e || 0 === e) && (t + "").match(j).length < 2
            ? e
            : O(t)
            ? t.trim()
            : t;
        },
        xt = function (t) {
          return t;
        },
        bt = function (t, e) {
          for (var r in e) r in t || (t[r] = e[r]);
          return t;
        },
        wt = function (t, e) {
          for (var r in e) t[r] = e[r];
          return t;
        },
        Tt = function t(e, r) {
          for (var n in r)
            "__proto__" !== n &&
              "constructor" !== n &&
              "prototype" !== n &&
              (e[n] = D(r[n]) ? t(e[n] || (e[n] = {}), r[n]) : r[n]);
          return e;
        },
        kt = function (t, e) {
          var r,
            n = {};
          for (r in t) r in e || (n[r] = t[r]);
          return n;
        },
        Et = function (t) {
          var e,
            r = t.parent || o,
            n = t.keyframes
              ? ((e = B(t.keyframes)),
                function (t, r) {
                  for (var n in r)
                    n in t ||
                      ("duration" === n && e) ||
                      "ease" === n ||
                      (t[n] = r[n]);
                })
              : bt;
          if (R(t.inherit))
            for (; r; ) n(t, r.vars.defaults), (r = r.parent || r._dp);
          return t;
        },
        Mt = function (t, e, r, n, i) {
          void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
          var s,
            o = t[n];
          if (i) for (s = e[i]; o && o[i] > s; ) o = o._prev;
          return (
            o
              ? ((e._next = o._next), (o._next = e))
              : ((e._next = t[r]), (t[r] = e)),
            e._next ? (e._next._prev = e) : (t[n] = e),
            (e._prev = o),
            (e.parent = e._dp = t),
            e
          );
        },
        Ct = function (t, e, r, n) {
          void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
          var i = e._prev,
            s = e._next;
          i ? (i._next = s) : t[r] === e && (t[r] = s),
            s ? (s._prev = i) : t[n] === e && (t[n] = i),
            (e._next = e._prev = e.parent = null);
        },
        Ot = function (t, e) {
          t.parent &&
            (!e || t.parent.autoRemoveChildren) &&
            t.parent.remove &&
            t.parent.remove(t),
            (t._act = 0);
        },
        St = function (t, e) {
          if (t && (!e || e._end > t._dur || e._start < 0))
            for (var r = t; r; ) (r._dirty = 1), (r = r.parent);
          return t;
        },
        At = function (t, e, r, n) {
          return (
            t._startAt &&
            (i
              ? t._startAt.revert(K)
              : (t.vars.immediateRender && !t.vars.autoRevert) ||
                t._startAt.render(e, !0, n))
          );
        },
        Pt = function t(e) {
          return !e || (e._ts && t(e.parent));
        },
        Dt = function (t) {
          return t._repeat
            ? Rt(t._tTime, (t = t.duration() + t._rDelay)) * t
            : 0;
        },
        Rt = function (t, e) {
          var r = Math.floor((t /= e));
          return t && r === t ? r - 1 : r;
        },
        It = function (t, e) {
          return (
            (t - e._start) * e._ts +
            (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
          );
        },
        zt = function (t) {
          return (t._end = dt(
            t._start + (t._tDur / Math.abs(t._ts || t._rts || b) || 0)
          ));
        },
        Lt = function (t, e) {
          var r = t._dp;
          return (
            r &&
              r.smoothChildTiming &&
              t._ts &&
              ((t._start = dt(
                r._time -
                  (t._ts > 0
                    ? e / t._ts
                    : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
              )),
              zt(t),
              r._dirty || St(r, t)),
            t
          );
        },
        Bt = function (t, e) {
          var r;
          if (
            ((e._time ||
              (!e._dur && e._initted) ||
              (e._start < t._time && (e._dur || !e.add))) &&
              ((r = It(t.rawTime(), e)),
              (!e._dur || Qt(0, e.totalDuration(), r) - e._tTime > b) &&
                e.render(r, !0)),
            St(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
          ) {
            if (t._dur < t.duration())
              for (r = t; r._dp; )
                r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp);
            t._zTime = -1e-8;
          }
        },
        Ft = function (t, e, r, n) {
          return (
            e.parent && Ot(e),
            (e._start = dt(
              (A(r) ? r : r || t !== o ? Ht(t, r, e) : t._time) + e._delay
            )),
            (e._end = dt(
              e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
            )),
            Mt(t, e, "_first", "_last", t._sort ? "_start" : 0),
            Xt(e) || (t._recent = e),
            n || Bt(t, e),
            t._ts < 0 && Lt(t, t._tTime),
            t
          );
        },
        Yt = function (t, e) {
          return (
            (W.ScrollTrigger || G("scrollTrigger", e)) &&
            W.ScrollTrigger.create(e, t)
          );
        },
        qt = function (t, e, r, n, s) {
          return (
            Ue(t, e, s),
            t._initted
              ? !r &&
                t._pt &&
                !i &&
                ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
                h !== Te.frame
                ? (rt.push(t), (t._lazy = [s, n]), 1)
                : void 0
              : 1
          );
        },
        Nt = function t(e) {
          var r = e.parent;
          return (
            r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || t(r))
          );
        },
        Xt = function (t) {
          var e = t.data;
          return "isFromStart" === e || "isStart" === e;
        },
        jt = function (t, e, r, n) {
          var i = t._repeat,
            s = dt(e) || 0,
            o = t._tTime / t._tDur;
          return (
            o && !n && (t._time *= s / t._dur),
            (t._dur = s),
            (t._tDur = i
              ? i < 0
                ? 1e10
                : dt(s * (i + 1) + t._rDelay * i)
              : s),
            o > 0 && !n && Lt(t, (t._tTime = t._tDur * o)),
            t.parent && zt(t),
            r || St(t.parent, t),
            t
          );
        },
        Ut = function (t) {
          return t instanceof Fe ? St(t) : jt(t, t._dur);
        },
        Wt = { _start: 0, endTime: Z, totalDuration: Z },
        Ht = function t(e, r, n) {
          var i,
            s,
            o,
            a = e.labels,
            u = e._recent || Wt,
            l = e.duration() >= x ? u.endTime(!1) : e._dur;
          return O(r) && (isNaN(r) || r in a)
            ? ((s = r.charAt(0)),
              (o = "%" === r.substr(-1)),
              (i = r.indexOf("=")),
              "<" === s || ">" === s
                ? (i >= 0 && (r = r.replace(/=/, "")),
                  ("<" === s ? u._start : u.endTime(u._repeat >= 0)) +
                    (parseFloat(r.substr(1)) || 0) *
                      (o ? (i < 0 ? u : n).totalDuration() / 100 : 1))
                : i < 0
                ? (r in a || (a[r] = l), a[r])
                : ((s = parseFloat(r.charAt(i - 1) + r.substr(i + 1))),
                  o && n && (s = (s / 100) * (B(n) ? n[0] : n).totalDuration()),
                  i > 1 ? t(e, r.substr(0, i - 1), n) + s : l + s))
            : null == r
            ? l
            : +r;
        },
        Vt = function (t, e, r) {
          var n,
            i,
            s = A(e[1]),
            o = (s ? 2 : 1) + (t < 2 ? 0 : 1),
            a = e[o];
          if ((s && (a.duration = e[1]), (a.parent = r), t)) {
            for (n = a, i = r; i && !("immediateRender" in n); )
              (n = i.vars.defaults || {}), (i = R(i.vars.inherit) && i.parent);
            (a.immediateRender = R(n.immediateRender)),
              t < 2 ? (a.runBackwards = 1) : (a.startAt = e[o - 1]);
          }
          return new Qe(e[0], a, e[o + 1]);
        },
        Gt = function (t, e) {
          return t || 0 === t ? e(t) : e;
        },
        Qt = function (t, e, r) {
          return r < t ? t : r > e ? e : r;
        },
        $t = function (t, e) {
          return O(t) && (e = U.exec(t)) ? e[1] : "";
        },
        Zt = [].slice,
        Jt = function (t, e) {
          return (
            t &&
            D(t) &&
            "length" in t &&
            ((!e && !t.length) || (t.length - 1 in t && D(t[0]))) &&
            !t.nodeType &&
            t !== a
          );
        },
        Kt = function (t, e, r) {
          return s && !e && s.selector
            ? s.selector(t)
            : !O(t) || r || (!u && ke())
            ? B(t)
              ? (function (t, e, r) {
                  return (
                    void 0 === r && (r = []),
                    t.forEach(function (t) {
                      var n;
                      return (O(t) && !e) || Jt(t, 1)
                        ? (n = r).push.apply(n, Kt(t))
                        : r.push(t);
                    }) || r
                  );
                })(t, r)
              : Jt(t)
              ? Zt.call(t, 0)
              : t
              ? [t]
              : []
            : Zt.call((e || l).querySelectorAll(t), 0);
        },
        te = function (t) {
          return (
            (t = Kt(t)[0] || Q("Invalid scope") || {}),
            function (e) {
              var r = t.current || t.nativeElement || t;
              return Kt(
                e,
                r.querySelectorAll
                  ? r
                  : r === t
                  ? Q("Invalid scope") || l.createElement("div")
                  : t
              );
            }
          );
        },
        ee = function (t) {
          return t.sort(function () {
            return 0.5 - Math.random();
          });
        },
        re = function (t) {
          if (S(t)) return t;
          var e = D(t) ? t : { each: t },
            r = Pe(e.ease),
            n = e.from || 0,
            i = parseFloat(e.base) || 0,
            s = {},
            o = n > 0 && n < 1,
            a = isNaN(n) || o,
            u = e.axis,
            l = n,
            c = n;
          return (
            O(n)
              ? (l = c = { center: 0.5, edges: 0.5, end: 1 }[n] || 0)
              : !o && a && ((l = n[0]), (c = n[1])),
            function (t, o, h) {
              var f,
                p,
                d,
                g,
                m,
                _,
                v,
                y,
                b,
                w = (h || e).length,
                T = s[w];
              if (!T) {
                if (!(b = "auto" === e.grid ? 0 : (e.grid || [1, x])[1])) {
                  for (
                    v = -x;
                    v < (v = h[b++].getBoundingClientRect().left) && b < w;

                  );
                  b--;
                }
                for (
                  T = s[w] = [],
                    f = a ? Math.min(b, w) * l - 0.5 : n % b,
                    p = b === x ? 0 : a ? (w * c) / b - 0.5 : (n / b) | 0,
                    v = 0,
                    y = x,
                    _ = 0;
                  _ < w;
                  _++
                )
                  (d = (_ % b) - f),
                    (g = p - ((_ / b) | 0)),
                    (T[_] = m =
                      u ? Math.abs("y" === u ? g : d) : E(d * d + g * g)),
                    m > v && (v = m),
                    m < y && (y = m);
                "random" === n && ee(T),
                  (T.max = v - y),
                  (T.min = y),
                  (T.v = w =
                    (parseFloat(e.amount) ||
                      parseFloat(e.each) *
                        (b > w
                          ? w - 1
                          : u
                          ? "y" === u
                            ? w / b
                            : b
                          : Math.max(b, w / b)) ||
                      0) * ("edges" === n ? -1 : 1)),
                  (T.b = w < 0 ? i - w : i),
                  (T.u = $t(e.amount || e.each) || 0),
                  (r = r && w < 0 ? Se(r) : r);
              }
              return (
                (w = (T[t] - T.min) / T.max || 0),
                dt(T.b + (r ? r(w) : w) * T.v) + T.u
              );
            }
          );
        },
        ne = function (t) {
          var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
          return function (r) {
            var n = dt(Math.round(parseFloat(r) / t) * t * e);
            return (n - (n % 1)) / e + (A(r) ? 0 : $t(r));
          };
        },
        ie = function (t, e) {
          var r,
            n,
            i = B(t);
          return (
            !i &&
              D(t) &&
              ((r = i = t.radius || x),
              t.values
                ? ((t = Kt(t.values)), (n = !A(t[0])) && (r *= r))
                : (t = ne(t.increment))),
            Gt(
              e,
              i
                ? S(t)
                  ? function (e) {
                      return (n = t(e)), Math.abs(n - e) <= r ? n : e;
                    }
                  : function (e) {
                      for (
                        var i,
                          s,
                          o = parseFloat(n ? e.x : e),
                          a = parseFloat(n ? e.y : 0),
                          u = x,
                          l = 0,
                          c = t.length;
                        c--;

                      )
                        (i = n
                          ? (i = t[c].x - o) * i + (s = t[c].y - a) * s
                          : Math.abs(t[c] - o)) < u && ((u = i), (l = c));
                      return (
                        (l = !r || u <= r ? t[l] : e),
                        n || l === e || A(e) ? l : l + $t(e)
                      );
                    }
                : ne(t)
            )
          );
        },
        se = function (t, e, r, n) {
          return Gt(B(t) ? !e : !0 === r ? !!(r = 0) : !n, function () {
            return B(t)
              ? t[~~(Math.random() * t.length)]
              : (r = r || 1e-5) &&
                  (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
                  Math.floor(
                    Math.round(
                      (t - r / 2 + Math.random() * (e - t + 0.99 * r)) / r
                    ) *
                      r *
                      n
                  ) / n;
          });
        },
        oe = function (t, e, r) {
          return Gt(r, function (r) {
            return t[~~e(r)];
          });
        },
        ae = function (t) {
          for (var e, r, n, i, s = 0, o = ""; ~(e = t.indexOf("random(", s)); )
            (n = t.indexOf(")", e)),
              (i = "[" === t.charAt(e + 7)),
              (r = t.substr(e + 7, n - e - 7).match(i ? j : F)),
              (o +=
                t.substr(s, e - s) +
                se(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5)),
              (s = n + 1);
          return o + t.substr(s, t.length - s);
        },
        ue = function (t, e, r, n, i) {
          var s = e - t,
            o = n - r;
          return Gt(i, function (e) {
            return r + (((e - t) / s) * o || 0);
          });
        },
        le = function (t, e, r) {
          var n,
            i,
            s,
            o = t.labels,
            a = x;
          for (n in o)
            (i = o[n] - e) < 0 == !!r &&
              i &&
              a > (i = Math.abs(i)) &&
              ((s = n), (a = i));
          return s;
        },
        ce = function (t, e, r) {
          var n,
            i,
            o,
            a = t.vars,
            u = a[e],
            l = s,
            c = t._ctx;
          if (u)
            return (
              (n = a[e + "Params"]),
              (i = a.callbackScope || t),
              r && rt.length && _t(),
              c && (s = c),
              (o = n ? u.apply(i, n) : u.call(i)),
              (s = l),
              o
            );
        },
        he = function (t) {
          return (
            Ot(t),
            t.scrollTrigger && t.scrollTrigger.kill(!!i),
            t.progress() < 1 && ce(t, "onInterrupt"),
            t
          );
        },
        fe = [],
        pe = function (t) {
          if (I() && t) {
            var e = (t = (!t.name && t.default) || t).name,
              r = S(t),
              n =
                e && !r && t.init
                  ? function () {
                      this._props = [];
                    }
                  : t,
              i = {
                init: Z,
                render: ir,
                add: Xe,
                kill: or,
                modifier: sr,
                rawVars: 0,
              },
              s = {
                targetTest: 0,
                get: 0,
                getSetter: tr,
                aliases: {},
                register: 0,
              };
            if ((ke(), t !== n)) {
              if (it[e]) return;
              bt(n, bt(kt(t, i), s)),
                wt(n.prototype, wt(i, kt(t, s))),
                (it[(n.prop = e)] = n),
                t.targetTest && (at.push(n), (et[e] = 1)),
                (e =
                  ("css" === e
                    ? "CSS"
                    : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
            }
            $(e, n), t.register && t.register(wr, n, lr);
          } else t && fe.push(t);
        },
        de = 255,
        ge = {
          aqua: [0, de, de],
          lime: [0, de, 0],
          silver: [192, 192, 192],
          black: [0, 0, 0],
          maroon: [128, 0, 0],
          teal: [0, 128, 128],
          blue: [0, 0, de],
          navy: [0, 0, 128],
          white: [de, de, de],
          olive: [128, 128, 0],
          yellow: [de, de, 0],
          orange: [de, 165, 0],
          gray: [128, 128, 128],
          purple: [128, 0, 128],
          green: [0, 128, 0],
          red: [de, 0, 0],
          pink: [de, 192, 203],
          cyan: [0, de, de],
          transparent: [de, de, de, 0],
        },
        me = function (t, e, r) {
          return (
            ((6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
              ? e + (r - e) * t * 6
              : t < 0.5
              ? r
              : 3 * t < 2
              ? e + (r - e) * (2 / 3 - t) * 6
              : e) *
              de +
              0.5) |
            0
          );
        },
        _e = function (t, e, r) {
          var n,
            i,
            s,
            o,
            a,
            u,
            l,
            c,
            h,
            f,
            p = t ? (A(t) ? [t >> 16, (t >> 8) & de, t & de] : 0) : ge.black;
          if (!p) {
            if (
              ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), ge[t])
            )
              p = ge[t];
            else if ("#" === t.charAt(0)) {
              if (
                (t.length < 6 &&
                  ((n = t.charAt(1)),
                  (i = t.charAt(2)),
                  (s = t.charAt(3)),
                  (t =
                    "#" +
                    n +
                    n +
                    i +
                    i +
                    s +
                    s +
                    (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))),
                9 === t.length)
              )
                return [
                  (p = parseInt(t.substr(1, 6), 16)) >> 16,
                  (p >> 8) & de,
                  p & de,
                  parseInt(t.substr(7), 16) / 255,
                ];
              p = [
                (t = parseInt(t.substr(1), 16)) >> 16,
                (t >> 8) & de,
                t & de,
              ];
            } else if ("hsl" === t.substr(0, 3))
              if (((p = f = t.match(F)), e)) {
                if (~t.indexOf("="))
                  return (p = t.match(Y)), r && p.length < 4 && (p[3] = 1), p;
              } else
                (o = (+p[0] % 360) / 360),
                  (a = +p[1] / 100),
                  (n =
                    2 * (u = +p[2] / 100) -
                    (i = u <= 0.5 ? u * (a + 1) : u + a - u * a)),
                  p.length > 3 && (p[3] *= 1),
                  (p[0] = me(o + 1 / 3, n, i)),
                  (p[1] = me(o, n, i)),
                  (p[2] = me(o - 1 / 3, n, i));
            else p = t.match(F) || ge.transparent;
            p = p.map(Number);
          }
          return (
            e &&
              !f &&
              ((n = p[0] / de),
              (i = p[1] / de),
              (s = p[2] / de),
              (u = ((l = Math.max(n, i, s)) + (c = Math.min(n, i, s))) / 2),
              l === c
                ? (o = a = 0)
                : ((h = l - c),
                  (a = u > 0.5 ? h / (2 - l - c) : h / (l + c)),
                  (o =
                    l === n
                      ? (i - s) / h + (i < s ? 6 : 0)
                      : l === i
                      ? (s - n) / h + 2
                      : (n - i) / h + 4),
                  (o *= 60)),
              (p[0] = ~~(o + 0.5)),
              (p[1] = ~~(100 * a + 0.5)),
              (p[2] = ~~(100 * u + 0.5))),
            r && p.length < 4 && (p[3] = 1),
            p
          );
        },
        ve = function (t) {
          var e = [],
            r = [],
            n = -1;
          return (
            t.split(xe).forEach(function (t) {
              var i = t.match(q) || [];
              e.push.apply(e, i), r.push((n += i.length + 1));
            }),
            (e.c = r),
            e
          );
        },
        ye = function (t, e, r) {
          var n,
            i,
            s,
            o,
            a = "",
            u = (t + a).match(xe),
            l = e ? "hsla(" : "rgba(",
            c = 0;
          if (!u) return t;
          if (
            ((u = u.map(function (t) {
              return (
                (t = _e(t, e, 1)) &&
                l +
                  (e
                    ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3]
                    : t.join(",")) +
                  ")"
              );
            })),
            r && ((s = ve(t)), (n = r.c).join(a) !== s.c.join(a)))
          )
            for (o = (i = t.replace(xe, "1").split(q)).length - 1; c < o; c++)
              a +=
                i[c] +
                (~n.indexOf(c)
                  ? u.shift() || l + "0,0,0,0)"
                  : (s.length ? s : u.length ? u : r).shift());
          if (!i)
            for (o = (i = t.split(xe)).length - 1; c < o; c++) a += i[c] + u[c];
          return a + i[o];
        },
        xe = (function () {
          var t,
            e =
              "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
          for (t in ge) e += "|" + t + "\\b";
          return new RegExp(e + ")", "gi");
        })(),
        be = /hsl[a]?\(/,
        we = function (t) {
          var e,
            r = t.join(" ");
          if (((xe.lastIndex = 0), xe.test(r)))
            return (
              (e = be.test(r)),
              (t[1] = ye(t[1], e)),
              (t[0] = ye(t[0], e, ve(t[1]))),
              !0
            );
        },
        Te = (function () {
          var t,
            e,
            r,
            n,
            i,
            s,
            o = Date.now,
            h = 500,
            f = 33,
            d = o(),
            g = d,
            m = 1e3 / 240,
            _ = m,
            v = [],
            y = function r(a) {
              var u,
                l,
                c,
                p,
                y = o() - g,
                x = !0 === a;
              if (
                (y > h && (d += y - f),
                ((u = (c = (g += y) - d) - _) > 0 || x) &&
                  ((p = ++n.frame),
                  (i = c - 1e3 * n.time),
                  (n.time = c /= 1e3),
                  (_ += u + (u >= m ? 4 : m - u)),
                  (l = 1)),
                x || (t = e(r)),
                l)
              )
                for (s = 0; s < v.length; s++) v[s](c, i, p, a);
            };
          return (n = {
            time: 0,
            frame: 0,
            tick: function () {
              y(!0);
            },
            deltaRatio: function (t) {
              return i / (1e3 / (t || 60));
            },
            wake: function () {
              c &&
                (!u &&
                  I() &&
                  ((a = u = window),
                  (l = a.document || {}),
                  (W.gsap = wr),
                  (a.gsapVersions || (a.gsapVersions = [])).push(wr.version),
                  V(H || a.GreenSockGlobals || (!a.gsap && a) || {}),
                  (r = a.requestAnimationFrame),
                  fe.forEach(pe)),
                t && n.sleep(),
                (e =
                  r ||
                  function (t) {
                    return setTimeout(t, (_ - 1e3 * n.time + 1) | 0);
                  }),
                (p = 1),
                y(2));
            },
            sleep: function () {
              (r ? a.cancelAnimationFrame : clearTimeout)(t), (p = 0), (e = Z);
            },
            lagSmoothing: function (t, e) {
              (h = t || 1 / 0), (f = Math.min(e || 33, h));
            },
            fps: function (t) {
              (m = 1e3 / (t || 240)), (_ = 1e3 * n.time + m);
            },
            add: function (t, e, r) {
              var i = e
                ? function (e, r, s, o) {
                    t(e, r, s, o), n.remove(i);
                  }
                : t;
              return n.remove(t), v[r ? "unshift" : "push"](i), ke(), i;
            },
            remove: function (t, e) {
              ~(e = v.indexOf(t)) && v.splice(e, 1) && s >= e && s--;
            },
            _listeners: v,
          });
        })(),
        ke = function () {
          return !p && Te.wake();
        },
        Ee = {},
        Me = /^[\d.\-M][\d.\-,\s]/,
        Ce = /["']/g,
        Oe = function (t) {
          for (
            var e,
              r,
              n,
              i = {},
              s = t.substr(1, t.length - 3).split(":"),
              o = s[0],
              a = 1,
              u = s.length;
            a < u;
            a++
          )
            (r = s[a]),
              (e = a !== u - 1 ? r.lastIndexOf(",") : r.length),
              (n = r.substr(0, e)),
              (i[o] = isNaN(n) ? n.replace(Ce, "").trim() : +n),
              (o = r.substr(e + 1).trim());
          return i;
        },
        Se = function (t) {
          return function (e) {
            return 1 - t(1 - e);
          };
        },
        Ae = function t(e, r) {
          for (var n, i = e._first; i; )
            i instanceof Fe
              ? t(i, r)
              : !i.vars.yoyoEase ||
                (i._yoyo && i._repeat) ||
                i._yoyo === r ||
                (i.timeline
                  ? t(i.timeline, r)
                  : ((n = i._ease),
                    (i._ease = i._yEase),
                    (i._yEase = n),
                    (i._yoyo = r))),
              (i = i._next);
        },
        Pe = function (t, e) {
          return (
            (t &&
              (S(t)
                ? t
                : Ee[t] ||
                  (function (t) {
                    var e,
                      r,
                      n,
                      i,
                      s = (t + "").split("("),
                      o = Ee[s[0]];
                    return o && s.length > 1 && o.config
                      ? o.config.apply(
                          null,
                          ~t.indexOf("{")
                            ? [Oe(s[1])]
                            : ((e = t),
                              (r = e.indexOf("(") + 1),
                              (n = e.indexOf(")")),
                              (i = e.indexOf("(", r)),
                              e.substring(
                                r,
                                ~i && i < n ? e.indexOf(")", n + 1) : n
                              ))
                                .split(",")
                                .map(yt)
                        )
                      : Ee._CE && Me.test(t)
                      ? Ee._CE("", t)
                      : o;
                  })(t))) ||
            e
          );
        },
        De = function (t, e, r, n) {
          void 0 === r &&
            (r = function (t) {
              return 1 - e(1 - t);
            }),
            void 0 === n &&
              (n = function (t) {
                return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
              });
          var i,
            s = { easeIn: e, easeOut: r, easeInOut: n };
          return (
            ft(t, function (t) {
              for (var e in ((Ee[t] = W[t] = s),
              (Ee[(i = t.toLowerCase())] = r),
              s))
                Ee[
                  i +
                    ("easeIn" === e
                      ? ".in"
                      : "easeOut" === e
                      ? ".out"
                      : ".inOut")
                ] = Ee[t + "." + e] = s[e];
            }),
            s
          );
        },
        Re = function (t) {
          return function (e) {
            return e < 0.5
              ? (1 - t(1 - 2 * e)) / 2
              : 0.5 + t(2 * (e - 0.5)) / 2;
          };
        },
        Ie = function t(e, r, n) {
          var i = r >= 1 ? r : 1,
            s = (n || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1),
            o = (s / w) * (Math.asin(1 / i) || 0),
            a = function (t) {
              return 1 === t
                ? 1
                : i * Math.pow(2, -10 * t) * C((t - o) * s) + 1;
            },
            u =
              "out" === e
                ? a
                : "in" === e
                ? function (t) {
                    return 1 - a(1 - t);
                  }
                : Re(a);
          return (
            (s = w / s),
            (u.config = function (r, n) {
              return t(e, r, n);
            }),
            u
          );
        },
        ze = function t(e, r) {
          void 0 === r && (r = 1.70158);
          var n = function (t) {
              return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
            },
            i =
              "out" === e
                ? n
                : "in" === e
                ? function (t) {
                    return 1 - n(1 - t);
                  }
                : Re(n);
          return (
            (i.config = function (r) {
              return t(e, r);
            }),
            i
          );
        };
      ft("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
        var r = e < 5 ? e + 1 : e;
        De(
          t + ",Power" + (r - 1),
          e
            ? function (t) {
                return Math.pow(t, r);
              }
            : function (t) {
                return t;
              },
          function (t) {
            return 1 - Math.pow(1 - t, r);
          },
          function (t) {
            return t < 0.5
              ? Math.pow(2 * t, r) / 2
              : 1 - Math.pow(2 * (1 - t), r) / 2;
          }
        );
      }),
        (Ee.Linear.easeNone = Ee.none = Ee.Linear.easeIn),
        De("Elastic", Ie("in"), Ie("out"), Ie()),
        (d = 7.5625),
        (m = 1 / (g = 2.75)),
        De(
          "Bounce",
          function (t) {
            return 1 - _(1 - t);
          },
          (_ = function (t) {
            return t < m
              ? d * t * t
              : t < 0.7272727272727273
              ? d * Math.pow(t - 1.5 / g, 2) + 0.75
              : t < 0.9090909090909092
              ? d * (t -= 2.25 / g) * t + 0.9375
              : d * Math.pow(t - 2.625 / g, 2) + 0.984375;
          })
        ),
        De("Expo", function (t) {
          return t ? Math.pow(2, 10 * (t - 1)) : 0;
        }),
        De("Circ", function (t) {
          return -(E(1 - t * t) - 1);
        }),
        De("Sine", function (t) {
          return 1 === t ? 1 : 1 - M(t * T);
        }),
        De("Back", ze("in"), ze("out"), ze()),
        (Ee.SteppedEase =
          Ee.steps =
          W.SteppedEase =
            {
              config: function (t, e) {
                void 0 === t && (t = 1);
                var r = 1 / t,
                  n = t + (e ? 0 : 1),
                  i = e ? 1 : 0;
                return function (t) {
                  return (((n * Qt(0, 0.99999999, t)) | 0) + i) * r;
                };
              },
            }),
        (y.ease = Ee["quad.out"]),
        ft(
          "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
          function (t) {
            return (ut += t + "," + t + "Params,");
          }
        );
      var Le = function (t, e) {
          (this.id = k++),
            (t._gsap = this),
            (this.target = t),
            (this.harness = e),
            (this.get = e ? e.get : ht),
            (this.set = e ? e.getSetter : tr);
        },
        Be = (function () {
          function t(t) {
            (this.vars = t),
              (this._delay = +t.delay || 0),
              (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
                ((this._rDelay = t.repeatDelay || 0),
                (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
              (this._ts = 1),
              jt(this, +t.duration, 1, 1),
              (this.data = t.data),
              s && ((this._ctx = s), s.data.push(this)),
              p || Te.wake();
          }
          var e = t.prototype;
          return (
            (e.delay = function (t) {
              return t || 0 === t
                ? (this.parent &&
                    this.parent.smoothChildTiming &&
                    this.startTime(this._start + t - this._delay),
                  (this._delay = t),
                  this)
                : this._delay;
            }),
            (e.duration = function (t) {
              return arguments.length
                ? this.totalDuration(
                    this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t
                  )
                : this.totalDuration() && this._dur;
            }),
            (e.totalDuration = function (t) {
              return arguments.length
                ? ((this._dirty = 0),
                  jt(
                    this,
                    this._repeat < 0
                      ? t
                      : (t - this._repeat * this._rDelay) / (this._repeat + 1)
                  ))
                : this._tDur;
            }),
            (e.totalTime = function (t, e) {
              if ((ke(), !arguments.length)) return this._tTime;
              var r = this._dp;
              if (r && r.smoothChildTiming && this._ts) {
                for (
                  Lt(this, t), !r._dp || r.parent || Bt(r, this);
                  r && r.parent;

                )
                  r.parent._time !==
                    r._start +
                      (r._ts >= 0
                        ? r._tTime / r._ts
                        : (r.totalDuration() - r._tTime) / -r._ts) &&
                    r.totalTime(r._tTime, !0),
                    (r = r.parent);
                !this.parent &&
                  this._dp.autoRemoveChildren &&
                  ((this._ts > 0 && t < this._tDur) ||
                    (this._ts < 0 && t > 0) ||
                    (!this._tDur && !t)) &&
                  Ft(this._dp, this, this._start - this._delay);
              }
              return (
                (this._tTime !== t ||
                  (!this._dur && !e) ||
                  (this._initted && Math.abs(this._zTime) === b) ||
                  (!t && !this._initted && (this.add || this._ptLookup))) &&
                  (this._ts || (this._pTime = t), vt(this, t, e)),
                this
              );
            }),
            (e.time = function (t, e) {
              return arguments.length
                ? this.totalTime(
                    Math.min(this.totalDuration(), t + Dt(this)) %
                      (this._dur + this._rDelay) || (t ? this._dur : 0),
                    e
                  )
                : this._time;
            }),
            (e.totalProgress = function (t, e) {
              return arguments.length
                ? this.totalTime(this.totalDuration() * t, e)
                : this.totalDuration()
                ? Math.min(1, this._tTime / this._tDur)
                : this.ratio;
            }),
            (e.progress = function (t, e) {
              return arguments.length
                ? this.totalTime(
                    this.duration() *
                      (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                      Dt(this),
                    e
                  )
                : this.duration()
                ? Math.min(1, this._time / this._dur)
                : this.ratio;
            }),
            (e.iteration = function (t, e) {
              var r = this.duration() + this._rDelay;
              return arguments.length
                ? this.totalTime(this._time + (t - 1) * r, e)
                : this._repeat
                ? Rt(this._tTime, r) + 1
                : 1;
            }),
            (e.timeScale = function (t) {
              if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
              if (this._rts === t) return this;
              var e =
                this.parent && this._ts
                  ? It(this.parent._time, this)
                  : this._tTime;
              return (
                (this._rts = +t || 0),
                (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
                this.totalTime(Qt(-Math.abs(this._delay), this._tDur, e), !0),
                zt(this),
                (function (t) {
                  for (var e = t.parent; e && e.parent; )
                    (e._dirty = 1), e.totalDuration(), (e = e.parent);
                  return t;
                })(this)
              );
            }),
            (e.paused = function (t) {
              return arguments.length
                ? (this._ps !== t &&
                    ((this._ps = t),
                    t
                      ? ((this._pTime =
                          this._tTime ||
                          Math.max(-this._delay, this.rawTime())),
                        (this._ts = this._act = 0))
                      : (ke(),
                        (this._ts = this._rts),
                        this.totalTime(
                          this.parent && !this.parent.smoothChildTiming
                            ? this.rawTime()
                            : this._tTime || this._pTime,
                          1 === this.progress() &&
                            Math.abs(this._zTime) !== b &&
                            (this._tTime -= b)
                        ))),
                  this)
                : this._ps;
            }),
            (e.startTime = function (t) {
              if (arguments.length) {
                this._start = t;
                var e = this.parent || this._dp;
                return (
                  e &&
                    (e._sort || !this.parent) &&
                    Ft(e, this, t - this._delay),
                  this
                );
              }
              return this._start;
            }),
            (e.endTime = function (t) {
              return (
                this._start +
                (R(t) ? this.totalDuration() : this.duration()) /
                  Math.abs(this._ts || 1)
              );
            }),
            (e.rawTime = function (t) {
              var e = this.parent || this._dp;
              return e
                ? t &&
                  (!this._ts ||
                    (this._repeat && this._time && this.totalProgress() < 1))
                  ? this._tTime % (this._dur + this._rDelay)
                  : this._ts
                  ? It(e.rawTime(t), this)
                  : this._tTime
                : this._tTime;
            }),
            (e.revert = function (t) {
              void 0 === t && (t = tt);
              var e = i;
              return (
                (i = t),
                (this._initted || this._startAt) &&
                  (this.timeline && this.timeline.revert(t),
                  this.totalTime(-0.01, t.suppressEvents)),
                "nested" !== this.data && !1 !== t.kill && this.kill(),
                (i = e),
                this
              );
            }),
            (e.globalTime = function (t) {
              for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
                (r = e._start + r / (e._ts || 1)), (e = e._dp);
              return !this.parent && this._sat
                ? this._sat.vars.immediateRender
                  ? -1 / 0
                  : this._sat.globalTime(t)
                : r;
            }),
            (e.repeat = function (t) {
              return arguments.length
                ? ((this._repeat = t === 1 / 0 ? -2 : t), Ut(this))
                : -2 === this._repeat
                ? 1 / 0
                : this._repeat;
            }),
            (e.repeatDelay = function (t) {
              if (arguments.length) {
                var e = this._time;
                return (this._rDelay = t), Ut(this), e ? this.time(e) : this;
              }
              return this._rDelay;
            }),
            (e.yoyo = function (t) {
              return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
            }),
            (e.seek = function (t, e) {
              return this.totalTime(Ht(this, t), R(e));
            }),
            (e.restart = function (t, e) {
              return this.play().totalTime(t ? -this._delay : 0, R(e));
            }),
            (e.play = function (t, e) {
              return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
            }),
            (e.reverse = function (t, e) {
              return (
                null != t && this.seek(t || this.totalDuration(), e),
                this.reversed(!0).paused(!1)
              );
            }),
            (e.pause = function (t, e) {
              return null != t && this.seek(t, e), this.paused(!0);
            }),
            (e.resume = function () {
              return this.paused(!1);
            }),
            (e.reversed = function (t) {
              return arguments.length
                ? (!!t !== this.reversed() &&
                    this.timeScale(-this._rts || (t ? -1e-8 : 0)),
                  this)
                : this._rts < 0;
            }),
            (e.invalidate = function () {
              return (
                (this._initted = this._act = 0), (this._zTime = -1e-8), this
              );
            }),
            (e.isActive = function () {
              var t,
                e = this.parent || this._dp,
                r = this._start;
              return !(
                e &&
                !(
                  this._ts &&
                  this._initted &&
                  e.isActive() &&
                  (t = e.rawTime(!0)) >= r &&
                  t < this.endTime(!0) - b
                )
              );
            }),
            (e.eventCallback = function (t, e, r) {
              var n = this.vars;
              return arguments.length > 1
                ? (e
                    ? ((n[t] = e),
                      r && (n[t + "Params"] = r),
                      "onUpdate" === t && (this._onUpdate = e))
                    : delete n[t],
                  this)
                : n[t];
            }),
            (e.then = function (t) {
              var e = this;
              return new Promise(function (r) {
                var n = S(t) ? t : xt,
                  i = function () {
                    var t = e.then;
                    (e.then = null),
                      S(n) && (n = n(e)) && (n.then || n === e) && (e.then = t),
                      r(n),
                      (e.then = t);
                  };
                (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
                (!e._tTime && e._ts < 0)
                  ? i()
                  : (e._prom = i);
              });
            }),
            (e.kill = function () {
              he(this);
            }),
            t
          );
        })();
      bt(Be.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -1e-8,
        _prom: 0,
        _ps: !1,
        _rts: 1,
      });
      var Fe = (function (r) {
        function n(e, n) {
          var i;
          return (
            void 0 === e && (e = {}),
            ((i = r.call(this, e) || this).labels = {}),
            (i.smoothChildTiming = !!e.smoothChildTiming),
            (i.autoRemoveChildren = !!e.autoRemoveChildren),
            (i._sort = R(e.sortChildren)),
            o && Ft(e.parent || o, t(i), n),
            e.reversed && i.reverse(),
            e.paused && i.paused(!0),
            e.scrollTrigger && Yt(t(i), e.scrollTrigger),
            i
          );
        }
        e(n, r);
        var s = n.prototype;
        return (
          (s.to = function (t, e, r) {
            return Vt(0, arguments, this), this;
          }),
          (s.from = function (t, e, r) {
            return Vt(1, arguments, this), this;
          }),
          (s.fromTo = function (t, e, r, n) {
            return Vt(2, arguments, this), this;
          }),
          (s.set = function (t, e, r) {
            return (
              (e.duration = 0),
              (e.parent = this),
              Et(e).repeatDelay || (e.repeat = 0),
              (e.immediateRender = !!e.immediateRender),
              new Qe(t, e, Ht(this, r), 1),
              this
            );
          }),
          (s.call = function (t, e, r) {
            return Ft(this, Qe.delayedCall(0, t, e), r);
          }),
          (s.staggerTo = function (t, e, r, n, i, s, o) {
            return (
              (r.duration = e),
              (r.stagger = r.stagger || n),
              (r.onComplete = s),
              (r.onCompleteParams = o),
              (r.parent = this),
              new Qe(t, r, Ht(this, i)),
              this
            );
          }),
          (s.staggerFrom = function (t, e, r, n, i, s, o) {
            return (
              (r.runBackwards = 1),
              (Et(r).immediateRender = R(r.immediateRender)),
              this.staggerTo(t, e, r, n, i, s, o)
            );
          }),
          (s.staggerFromTo = function (t, e, r, n, i, s, o, a) {
            return (
              (n.startAt = r),
              (Et(n).immediateRender = R(n.immediateRender)),
              this.staggerTo(t, e, n, i, s, o, a)
            );
          }),
          (s.render = function (t, e, r) {
            var n,
              s,
              a,
              u,
              l,
              c,
              h,
              f,
              p,
              d,
              g,
              m,
              _ = this._time,
              v = this._dirty ? this.totalDuration() : this._tDur,
              y = this._dur,
              x = t <= 0 ? 0 : dt(t),
              w = this._zTime < 0 != t < 0 && (this._initted || !y);
            if (
              (this !== o && x > v && t >= 0 && (x = v),
              x !== this._tTime || r || w)
            ) {
              if (
                (_ !== this._time &&
                  y &&
                  ((x += this._time - _), (t += this._time - _)),
                (n = x),
                (p = this._start),
                (c = !(f = this._ts)),
                w && (y || (_ = this._zTime), (t || !e) && (this._zTime = t)),
                this._repeat)
              ) {
                if (
                  ((g = this._yoyo),
                  (l = y + this._rDelay),
                  this._repeat < -1 && t < 0)
                )
                  return this.totalTime(100 * l + t, e, r);
                if (
                  ((n = dt(x % l)),
                  x === v
                    ? ((u = this._repeat), (n = y))
                    : ((u = ~~(x / l)) && u === x / l && ((n = y), u--),
                      n > y && (n = y)),
                  (d = Rt(this._tTime, l)),
                  !_ &&
                    this._tTime &&
                    d !== u &&
                    this._tTime - d * l - this._dur <= 0 &&
                    (d = u),
                  g && 1 & u && ((n = y - n), (m = 1)),
                  u !== d && !this._lock)
                ) {
                  var T = g && 1 & d,
                    k = T === (g && 1 & u);
                  if (
                    (u < d && (T = !T),
                    (_ = T ? 0 : x % y ? y : x),
                    (this._lock = 1),
                    (this.render(_ || (m ? 0 : dt(u * l)), e, !y)._lock = 0),
                    (this._tTime = x),
                    !e && this.parent && ce(this, "onRepeat"),
                    this.vars.repeatRefresh &&
                      !m &&
                      (this.invalidate()._lock = 1),
                    (_ && _ !== this._time) ||
                      c !== !this._ts ||
                      (this.vars.onRepeat && !this.parent && !this._act))
                  )
                    return this;
                  if (
                    ((y = this._dur),
                    (v = this._tDur),
                    k &&
                      ((this._lock = 2),
                      (_ = T ? y : -1e-4),
                      this.render(_, !0),
                      this.vars.repeatRefresh && !m && this.invalidate()),
                    (this._lock = 0),
                    !this._ts && !c)
                  )
                    return this;
                  Ae(this, m);
                }
              }
              if (
                (this._hasPause &&
                  !this._forcing &&
                  this._lock < 2 &&
                  ((h = (function (t, e, r) {
                    var n;
                    if (r > e)
                      for (n = t._first; n && n._start <= r; ) {
                        if ("isPause" === n.data && n._start > e) return n;
                        n = n._next;
                      }
                    else
                      for (n = t._last; n && n._start >= r; ) {
                        if ("isPause" === n.data && n._start < e) return n;
                        n = n._prev;
                      }
                  })(this, dt(_), dt(n))),
                  h && (x -= n - (n = h._start))),
                (this._tTime = x),
                (this._time = n),
                (this._act = !f),
                this._initted ||
                  ((this._onUpdate = this.vars.onUpdate),
                  (this._initted = 1),
                  (this._zTime = t),
                  (_ = 0)),
                !_ && n && !e && !u && (ce(this, "onStart"), this._tTime !== x))
              )
                return this;
              if (n >= _ && t >= 0)
                for (s = this._first; s; ) {
                  if (
                    ((a = s._next),
                    (s._act || n >= s._start) && s._ts && h !== s)
                  ) {
                    if (s.parent !== this) return this.render(t, e, r);
                    if (
                      (s.render(
                        s._ts > 0
                          ? (n - s._start) * s._ts
                          : (s._dirty ? s.totalDuration() : s._tDur) +
                              (n - s._start) * s._ts,
                        e,
                        r
                      ),
                      n !== this._time || (!this._ts && !c))
                    ) {
                      (h = 0), a && (x += this._zTime = -1e-8);
                      break;
                    }
                  }
                  s = a;
                }
              else {
                s = this._last;
                for (var E = t < 0 ? t : n; s; ) {
                  if (
                    ((a = s._prev), (s._act || E <= s._end) && s._ts && h !== s)
                  ) {
                    if (s.parent !== this) return this.render(t, e, r);
                    if (
                      (s.render(
                        s._ts > 0
                          ? (E - s._start) * s._ts
                          : (s._dirty ? s.totalDuration() : s._tDur) +
                              (E - s._start) * s._ts,
                        e,
                        r || (i && (s._initted || s._startAt))
                      ),
                      n !== this._time || (!this._ts && !c))
                    ) {
                      (h = 0), a && (x += this._zTime = E ? -1e-8 : b);
                      break;
                    }
                  }
                  s = a;
                }
              }
              if (
                h &&
                !e &&
                (this.pause(),
                (h.render(n >= _ ? 0 : -1e-8)._zTime = n >= _ ? 1 : -1),
                this._ts)
              )
                return (this._start = p), zt(this), this.render(t, e, r);
              this._onUpdate && !e && ce(this, "onUpdate", !0),
                ((x === v && this._tTime >= this.totalDuration()) ||
                  (!x && _)) &&
                  ((p !== this._start && Math.abs(f) === Math.abs(this._ts)) ||
                    this._lock ||
                    ((t || !y) &&
                      ((x === v && this._ts > 0) || (!x && this._ts < 0)) &&
                      Ot(this, 1),
                    e ||
                      (t < 0 && !_) ||
                      (!x && !_ && v) ||
                      (ce(
                        this,
                        x === v && t >= 0 ? "onComplete" : "onReverseComplete",
                        !0
                      ),
                      this._prom &&
                        !(x < v && this.timeScale() > 0) &&
                        this._prom())));
            }
            return this;
          }),
          (s.add = function (t, e) {
            var r = this;
            if ((A(e) || (e = Ht(this, e, t)), !(t instanceof Be))) {
              if (B(t))
                return (
                  t.forEach(function (t) {
                    return r.add(t, e);
                  }),
                  this
                );
              if (O(t)) return this.addLabel(t, e);
              if (!S(t)) return this;
              t = Qe.delayedCall(0, t);
            }
            return this !== t ? Ft(this, t, e) : this;
          }),
          (s.getChildren = function (t, e, r, n) {
            void 0 === t && (t = !0),
              void 0 === e && (e = !0),
              void 0 === r && (r = !0),
              void 0 === n && (n = -x);
            for (var i = [], s = this._first; s; )
              s._start >= n &&
                (s instanceof Qe
                  ? e && i.push(s)
                  : (r && i.push(s),
                    t && i.push.apply(i, s.getChildren(!0, e, r)))),
                (s = s._next);
            return i;
          }),
          (s.getById = function (t) {
            for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
              if (e[r].vars.id === t) return e[r];
          }),
          (s.remove = function (t) {
            return O(t)
              ? this.removeLabel(t)
              : S(t)
              ? this.killTweensOf(t)
              : (Ct(this, t),
                t === this._recent && (this._recent = this._last),
                St(this));
          }),
          (s.totalTime = function (t, e) {
            return arguments.length
              ? ((this._forcing = 1),
                !this._dp &&
                  this._ts &&
                  (this._start = dt(
                    Te.time -
                      (this._ts > 0
                        ? t / this._ts
                        : (this.totalDuration() - t) / -this._ts)
                  )),
                r.prototype.totalTime.call(this, t, e),
                (this._forcing = 0),
                this)
              : this._tTime;
          }),
          (s.addLabel = function (t, e) {
            return (this.labels[t] = Ht(this, e)), this;
          }),
          (s.removeLabel = function (t) {
            return delete this.labels[t], this;
          }),
          (s.addPause = function (t, e, r) {
            var n = Qe.delayedCall(0, e || Z, r);
            return (
              (n.data = "isPause"),
              (this._hasPause = 1),
              Ft(this, n, Ht(this, t))
            );
          }),
          (s.removePause = function (t) {
            var e = this._first;
            for (t = Ht(this, t); e; )
              e._start === t && "isPause" === e.data && Ot(e), (e = e._next);
          }),
          (s.killTweensOf = function (t, e, r) {
            for (var n = this.getTweensOf(t, r), i = n.length; i--; )
              Ye !== n[i] && n[i].kill(t, e);
            return this;
          }),
          (s.getTweensOf = function (t, e) {
            for (var r, n = [], i = Kt(t), s = this._first, o = A(e); s; )
              s instanceof Qe
                ? mt(s._targets, i) &&
                  (o
                    ? (!Ye || (s._initted && s._ts)) &&
                      s.globalTime(0) <= e &&
                      s.globalTime(s.totalDuration()) > e
                    : !e || s.isActive()) &&
                  n.push(s)
                : (r = s.getTweensOf(i, e)).length && n.push.apply(n, r),
                (s = s._next);
            return n;
          }),
          (s.tweenTo = function (t, e) {
            e = e || {};
            var r,
              n = this,
              i = Ht(n, t),
              s = e,
              o = s.startAt,
              a = s.onStart,
              u = s.onStartParams,
              l = s.immediateRender,
              c = Qe.to(
                n,
                bt(
                  {
                    ease: e.ease || "none",
                    lazy: !1,
                    immediateRender: !1,
                    time: i,
                    overwrite: "auto",
                    duration:
                      e.duration ||
                      Math.abs(
                        (i - (o && "time" in o ? o.time : n._time)) /
                          n.timeScale()
                      ) ||
                      b,
                    onStart: function () {
                      if ((n.pause(), !r)) {
                        var t =
                          e.duration ||
                          Math.abs(
                            (i - (o && "time" in o ? o.time : n._time)) /
                              n.timeScale()
                          );
                        c._dur !== t && jt(c, t, 0, 1).render(c._time, !0, !0),
                          (r = 1);
                      }
                      a && a.apply(c, u || []);
                    },
                  },
                  e
                )
              );
            return l ? c.render(0) : c;
          }),
          (s.tweenFromTo = function (t, e, r) {
            return this.tweenTo(e, bt({ startAt: { time: Ht(this, t) } }, r));
          }),
          (s.recent = function () {
            return this._recent;
          }),
          (s.nextLabel = function (t) {
            return void 0 === t && (t = this._time), le(this, Ht(this, t));
          }),
          (s.previousLabel = function (t) {
            return void 0 === t && (t = this._time), le(this, Ht(this, t), 1);
          }),
          (s.currentLabel = function (t) {
            return arguments.length
              ? this.seek(t, !0)
              : this.previousLabel(this._time + b);
          }),
          (s.shiftChildren = function (t, e, r) {
            void 0 === r && (r = 0);
            for (var n, i = this._first, s = this.labels; i; )
              i._start >= r && ((i._start += t), (i._end += t)), (i = i._next);
            if (e) for (n in s) s[n] >= r && (s[n] += t);
            return St(this);
          }),
          (s.invalidate = function (t) {
            var e = this._first;
            for (this._lock = 0; e; ) e.invalidate(t), (e = e._next);
            return r.prototype.invalidate.call(this, t);
          }),
          (s.clear = function (t) {
            void 0 === t && (t = !0);
            for (var e, r = this._first; r; )
              (e = r._next), this.remove(r), (r = e);
            return (
              this._dp && (this._time = this._tTime = this._pTime = 0),
              t && (this.labels = {}),
              St(this)
            );
          }),
          (s.totalDuration = function (t) {
            var e,
              r,
              n,
              i = 0,
              s = this,
              a = s._last,
              u = x;
            if (arguments.length)
              return s.timeScale(
                (s._repeat < 0 ? s.duration() : s.totalDuration()) /
                  (s.reversed() ? -t : t)
              );
            if (s._dirty) {
              for (n = s.parent; a; )
                (e = a._prev),
                  a._dirty && a.totalDuration(),
                  (r = a._start) > u && s._sort && a._ts && !s._lock
                    ? ((s._lock = 1), (Ft(s, a, r - a._delay, 1)._lock = 0))
                    : (u = r),
                  r < 0 &&
                    a._ts &&
                    ((i -= r),
                    ((!n && !s._dp) || (n && n.smoothChildTiming)) &&
                      ((s._start += r / s._ts),
                      (s._time -= r),
                      (s._tTime -= r)),
                    s.shiftChildren(-r, !1, -Infinity),
                    (u = 0)),
                  a._end > i && a._ts && (i = a._end),
                  (a = e);
              jt(s, s === o && s._time > i ? s._time : i, 1, 1), (s._dirty = 0);
            }
            return s._tDur;
          }),
          (n.updateRoot = function (t) {
            if ((o._ts && (vt(o, It(t, o)), (h = Te.frame)), Te.frame >= ot)) {
              ot += v.autoSleep || 120;
              var e = o._first;
              if ((!e || !e._ts) && v.autoSleep && Te._listeners.length < 2) {
                for (; e && !e._ts; ) e = e._next;
                e || Te.sleep();
              }
            }
          }),
          n
        );
      })(Be);
      bt(Fe.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
      var Ye,
        qe,
        Ne = function (t, e, r, n, i, s, o) {
          var a,
            u,
            l,
            c,
            h,
            f,
            p,
            d,
            g = new lr(this._pt, t, e, 0, 1, nr, null, i),
            m = 0,
            _ = 0;
          for (
            g.b = r,
              g.e = n,
              r += "",
              (p = ~(n += "").indexOf("random(")) && (n = ae(n)),
              s && (s((d = [r, n]), t, e), (r = d[0]), (n = d[1])),
              u = r.match(N) || [];
            (a = N.exec(n));

          )
            (c = a[0]),
              (h = n.substring(m, a.index)),
              l ? (l = (l + 1) % 5) : "rgba(" === h.substr(-5) && (l = 1),
              c !== u[_++] &&
                ((f = parseFloat(u[_ - 1]) || 0),
                (g._pt = {
                  _next: g._pt,
                  p: h || 1 === _ ? h : ",",
                  s: f,
                  c: "=" === c.charAt(1) ? gt(f, c) - f : parseFloat(c) - f,
                  m: l && l < 4 ? Math.round : 0,
                }),
                (m = N.lastIndex));
          return (
            (g.c = m < n.length ? n.substring(m, n.length) : ""),
            (g.fp = o),
            (X.test(n) || p) && (g.e = 0),
            (this._pt = g),
            g
          );
        },
        Xe = function (t, e, r, n, i, s, o, a, u, l) {
          S(n) && (n = n(i || 0, t, s));
          var c,
            h = t[e],
            f =
              "get" !== r
                ? r
                : S(h)
                ? u
                  ? t[
                      e.indexOf("set") || !S(t["get" + e.substr(3)])
                        ? e
                        : "get" + e.substr(3)
                    ](u)
                  : t[e]()
                : h,
            p = S(h) ? (u ? Je : Ze) : $e;
          if (
            (O(n) &&
              (~n.indexOf("random(") && (n = ae(n)),
              "=" === n.charAt(1) &&
                ((c = gt(f, n) + ($t(f) || 0)) || 0 === c) &&
                (n = c)),
            !l || f !== n || qe)
          )
            return isNaN(f * n) || "" === n
              ? (!h && !(e in t) && G(e, n),
                Ne.call(this, t, e, f, n, p, a || v.stringFilter, u))
              : ((c = new lr(
                  this._pt,
                  t,
                  e,
                  +f || 0,
                  n - (f || 0),
                  "boolean" == typeof h ? rr : er,
                  0,
                  p
                )),
                u && (c.fp = u),
                o && c.modifier(o, this, t),
                (this._pt = c));
        },
        je = function (t, e, r, n, i, s) {
          var o, a, u, l;
          if (
            it[t] &&
            !1 !==
              (o = new it[t]()).init(
                i,
                o.rawVars
                  ? e[t]
                  : (function (t, e, r, n, i) {
                      if (
                        (S(t) && (t = He(t, i, e, r, n)),
                        !D(t) || (t.style && t.nodeType) || B(t) || L(t))
                      )
                        return O(t) ? He(t, i, e, r, n) : t;
                      var s,
                        o = {};
                      for (s in t) o[s] = He(t[s], i, e, r, n);
                      return o;
                    })(e[t], n, i, s, r),
                r,
                n,
                s
              ) &&
            ((r._pt = a =
              new lr(r._pt, i, t, 0, 1, o.render, o, 0, o.priority)),
            r !== f)
          )
            for (
              u = r._ptLookup[r._targets.indexOf(i)], l = o._props.length;
              l--;

            )
              u[o._props[l]] = a;
          return o;
        },
        Ue = function t(e, r, s) {
          var a,
            u,
            l,
            c,
            h,
            f,
            p,
            d,
            g,
            m,
            _,
            v,
            w,
            T = e.vars,
            k = T.ease,
            E = T.startAt,
            M = T.immediateRender,
            C = T.lazy,
            O = T.onUpdate,
            S = T.onUpdateParams,
            A = T.callbackScope,
            P = T.runBackwards,
            D = T.yoyoEase,
            I = T.keyframes,
            z = T.autoRevert,
            L = e._dur,
            B = e._startAt,
            F = e._targets,
            Y = e.parent,
            q = Y && "nested" === Y.data ? Y.vars.targets : F,
            N = "auto" === e._overwrite && !n,
            X = e.timeline;
          if (
            (X && (!I || !k) && (k = "none"),
            (e._ease = Pe(k, y.ease)),
            (e._yEase = D ? Se(Pe(!0 === D ? k : D, y.ease)) : 0),
            D &&
              e._yoyo &&
              !e._repeat &&
              ((D = e._yEase), (e._yEase = e._ease), (e._ease = D)),
            (e._from = !X && !!T.runBackwards),
            !X || (I && !T.stagger))
          ) {
            if (
              ((v = (d = F[0] ? ct(F[0]).harness : 0) && T[d.prop]),
              (a = kt(T, et)),
              B &&
                (B._zTime < 0 && B.progress(1),
                r < 0 && P && M && !z
                  ? B.render(-1, !0)
                  : B.revert(P && L ? K : J),
                (B._lazy = 0)),
              E)
            ) {
              if (
                (Ot(
                  (e._startAt = Qe.set(
                    F,
                    bt(
                      {
                        data: "isStart",
                        overwrite: !1,
                        parent: Y,
                        immediateRender: !0,
                        lazy: !B && R(C),
                        startAt: null,
                        delay: 0,
                        onUpdate: O,
                        onUpdateParams: S,
                        callbackScope: A,
                        stagger: 0,
                      },
                      E
                    )
                  ))
                ),
                (e._startAt._dp = 0),
                (e._startAt._sat = e),
                r < 0 && (i || (!M && !z)) && e._startAt.revert(K),
                M && L && r <= 0 && s <= 0)
              )
                return void (r && (e._zTime = r));
            } else if (P && L && !B)
              if (
                (r && (M = !1),
                (l = bt(
                  {
                    overwrite: !1,
                    data: "isFromStart",
                    lazy: M && !B && R(C),
                    immediateRender: M,
                    stagger: 0,
                    parent: Y,
                  },
                  a
                )),
                v && (l[d.prop] = v),
                Ot((e._startAt = Qe.set(F, l))),
                (e._startAt._dp = 0),
                (e._startAt._sat = e),
                r < 0 && (i ? e._startAt.revert(K) : e._startAt.render(-1, !0)),
                (e._zTime = r),
                M)
              ) {
                if (!r) return;
              } else t(e._startAt, b, b);
            for (
              e._pt = e._ptCache = 0, C = (L && R(C)) || (C && !L), u = 0;
              u < F.length;
              u++
            ) {
              if (
                ((p = (h = F[u])._gsap || lt(F)[u]._gsap),
                (e._ptLookup[u] = m = {}),
                nt[p.id] && rt.length && _t(),
                (_ = q === F ? u : q.indexOf(h)),
                d &&
                  !1 !== (g = new d()).init(h, v || a, e, _, q) &&
                  ((e._pt = c =
                    new lr(e._pt, h, g.name, 0, 1, g.render, g, 0, g.priority)),
                  g._props.forEach(function (t) {
                    m[t] = c;
                  }),
                  g.priority && (f = 1)),
                !d || v)
              )
                for (l in a)
                  it[l] && (g = je(l, a, e, _, h, q))
                    ? g.priority && (f = 1)
                    : (m[l] = c =
                        Xe.call(e, h, l, "get", a[l], _, q, 0, T.stringFilter));
              e._op && e._op[u] && e.kill(h, e._op[u]),
                N &&
                  e._pt &&
                  ((Ye = e),
                  o.killTweensOf(h, m, e.globalTime(r)),
                  (w = !e.parent),
                  (Ye = 0)),
                e._pt && C && (nt[p.id] = 1);
            }
            f && ur(e), e._onInit && e._onInit(e);
          }
          (e._onUpdate = O),
            (e._initted = (!e._op || e._pt) && !w),
            I && r <= 0 && X.render(x, !0, !0);
        },
        We = function (t, e, r, n) {
          var i,
            s,
            o = e.ease || n || "power1.inOut";
          if (B(e))
            (s = r[t] || (r[t] = [])),
              e.forEach(function (t, r) {
                return s.push({ t: (r / (e.length - 1)) * 100, v: t, e: o });
              });
          else
            for (i in e)
              (s = r[i] || (r[i] = [])),
                "ease" === i || s.push({ t: parseFloat(t), v: e[i], e: o });
        },
        He = function (t, e, r, n, i) {
          return S(t)
            ? t.call(e, r, n, i)
            : O(t) && ~t.indexOf("random(")
            ? ae(t)
            : t;
        },
        Ve = ut + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
        Ge = {};
      ft(Ve + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
        return (Ge[t] = 1);
      });
      var Qe = (function (r) {
        function s(e, i, s, a) {
          var u;
          "number" == typeof i && ((s.duration = i), (i = s), (s = null));
          var l,
            c,
            h,
            f,
            p,
            d,
            g,
            m,
            _ = (u = r.call(this, a ? i : Et(i)) || this).vars,
            y = _.duration,
            x = _.delay,
            b = _.immediateRender,
            w = _.stagger,
            T = _.overwrite,
            k = _.keyframes,
            E = _.defaults,
            M = _.scrollTrigger,
            C = _.yoyoEase,
            O = i.parent || o,
            S = (B(e) || L(e) ? A(e[0]) : "length" in i) ? [e] : Kt(e);
          if (
            ((u._targets = S.length
              ? lt(S)
              : Q(
                  "GSAP target " + e + " not found. https://greensock.com",
                  !v.nullTargetWarn
                ) || []),
            (u._ptLookup = []),
            (u._overwrite = T),
            k || w || z(y) || z(x))
          ) {
            if (
              ((i = u.vars),
              (l = u.timeline =
                new Fe({
                  data: "nested",
                  defaults: E || {},
                  targets: O && "nested" === O.data ? O.vars.targets : S,
                })).kill(),
              (l.parent = l._dp = t(u)),
              (l._start = 0),
              w || z(y) || z(x))
            ) {
              if (((f = S.length), (g = w && re(w)), D(w)))
                for (p in w) ~Ve.indexOf(p) && (m || (m = {}), (m[p] = w[p]));
              for (c = 0; c < f; c++)
                ((h = kt(i, Ge)).stagger = 0),
                  C && (h.yoyoEase = C),
                  m && wt(h, m),
                  (d = S[c]),
                  (h.duration = +He(y, t(u), c, d, S)),
                  (h.delay = (+He(x, t(u), c, d, S) || 0) - u._delay),
                  !w &&
                    1 === f &&
                    h.delay &&
                    ((u._delay = x = h.delay), (u._start += x), (h.delay = 0)),
                  l.to(d, h, g ? g(c, d, S) : 0),
                  (l._ease = Ee.none);
              l.duration() ? (y = x = 0) : (u.timeline = 0);
            } else if (k) {
              Et(bt(l.vars.defaults, { ease: "none" })),
                (l._ease = Pe(k.ease || i.ease || "none"));
              var P,
                I,
                F,
                Y = 0;
              if (B(k))
                k.forEach(function (t) {
                  return l.to(S, t, ">");
                }),
                  l.duration();
              else {
                for (p in ((h = {}), k))
                  "ease" === p ||
                    "easeEach" === p ||
                    We(p, k[p], h, k.easeEach);
                for (p in h)
                  for (
                    P = h[p].sort(function (t, e) {
                      return t.t - e.t;
                    }),
                      Y = 0,
                      c = 0;
                    c < P.length;
                    c++
                  )
                    ((F = {
                      ease: (I = P[c]).e,
                      duration: ((I.t - (c ? P[c - 1].t : 0)) / 100) * y,
                    })[p] = I.v),
                      l.to(S, F, Y),
                      (Y += F.duration);
                l.duration() < y && l.to({}, { duration: y - l.duration() });
              }
            }
            y || u.duration((y = l.duration()));
          } else u.timeline = 0;
          return (
            !0 !== T || n || ((Ye = t(u)), o.killTweensOf(S), (Ye = 0)),
            Ft(O, t(u), s),
            i.reversed && u.reverse(),
            i.paused && u.paused(!0),
            (b ||
              (!y &&
                !k &&
                u._start === dt(O._time) &&
                R(b) &&
                Pt(t(u)) &&
                "nested" !== O.data)) &&
              ((u._tTime = -1e-8), u.render(Math.max(0, -x) || 0)),
            M && Yt(t(u), M),
            u
          );
        }
        e(s, r);
        var a = s.prototype;
        return (
          (a.render = function (t, e, r) {
            var n,
              s,
              o,
              a,
              u,
              l,
              c,
              h,
              f,
              p = this._time,
              d = this._tDur,
              g = this._dur,
              m = t < 0,
              _ = t > d - b && !m ? d : t < b ? 0 : t;
            if (g) {
              if (
                _ !== this._tTime ||
                !t ||
                r ||
                (!this._initted && this._tTime) ||
                (this._startAt && this._zTime < 0 !== m)
              ) {
                if (((n = _), (h = this.timeline), this._repeat)) {
                  if (((a = g + this._rDelay), this._repeat < -1 && m))
                    return this.totalTime(100 * a + t, e, r);
                  if (
                    ((n = dt(_ % a)),
                    _ === d
                      ? ((o = this._repeat), (n = g))
                      : ((o = ~~(_ / a)) && o === _ / a && ((n = g), o--),
                        n > g && (n = g)),
                    (l = this._yoyo && 1 & o) &&
                      ((f = this._yEase), (n = g - n)),
                    (u = Rt(this._tTime, a)),
                    n === p && !r && this._initted)
                  )
                    return (this._tTime = _), this;
                  o !== u &&
                    (h && this._yEase && Ae(h, l),
                    !this.vars.repeatRefresh ||
                      l ||
                      this._lock ||
                      ((this._lock = r = 1),
                      (this.render(dt(a * o), !0).invalidate()._lock = 0)));
                }
                if (!this._initted) {
                  if (qt(this, m ? t : n, r, e, _))
                    return (this._tTime = 0), this;
                  if (p !== this._time) return this;
                  if (g !== this._dur) return this.render(t, e, r);
                }
                if (
                  ((this._tTime = _),
                  (this._time = n),
                  !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                  (this.ratio = c = (f || this._ease)(n / g)),
                  this._from && (this.ratio = c = 1 - c),
                  n &&
                    !p &&
                    !e &&
                    !o &&
                    (ce(this, "onStart"), this._tTime !== _))
                )
                  return this;
                for (s = this._pt; s; ) s.r(c, s.d), (s = s._next);
                (h &&
                  h.render(
                    t < 0
                      ? t
                      : !n && l
                      ? -1e-8
                      : h._dur * h._ease(n / this._dur),
                    e,
                    r
                  )) ||
                  (this._startAt && (this._zTime = t)),
                  this._onUpdate &&
                    !e &&
                    (m && At(this, t, 0, r), ce(this, "onUpdate")),
                  this._repeat &&
                    o !== u &&
                    this.vars.onRepeat &&
                    !e &&
                    this.parent &&
                    ce(this, "onRepeat"),
                  (_ !== this._tDur && _) ||
                    this._tTime !== _ ||
                    (m && !this._onUpdate && At(this, t, 0, !0),
                    (t || !g) &&
                      ((_ === this._tDur && this._ts > 0) ||
                        (!_ && this._ts < 0)) &&
                      Ot(this, 1),
                    e ||
                      (m && !p) ||
                      !(_ || p || l) ||
                      (ce(
                        this,
                        _ === d ? "onComplete" : "onReverseComplete",
                        !0
                      ),
                      this._prom &&
                        !(_ < d && this.timeScale() > 0) &&
                        this._prom()));
              }
            } else
              !(function (t, e, r, n) {
                var s,
                  o,
                  a,
                  u = t.ratio,
                  l =
                    e < 0 ||
                    (!e &&
                      ((!t._start && Nt(t) && (t._initted || !Xt(t))) ||
                        ((t._ts < 0 || t._dp._ts < 0) && !Xt(t))))
                      ? 0
                      : 1,
                  c = t._rDelay,
                  h = 0;
                if (
                  (c &&
                    t._repeat &&
                    ((h = Qt(0, t._tDur, e)),
                    (o = Rt(h, c)),
                    t._yoyo && 1 & o && (l = 1 - l),
                    o !== Rt(t._tTime, c) &&
                      ((u = 1 - l),
                      t.vars.repeatRefresh && t._initted && t.invalidate())),
                  l !== u || i || n || t._zTime === b || (!e && t._zTime))
                ) {
                  if (!t._initted && qt(t, e, n, r, h)) return;
                  for (
                    a = t._zTime,
                      t._zTime = e || (r ? b : 0),
                      r || (r = e && !a),
                      t.ratio = l,
                      t._from && (l = 1 - l),
                      t._time = 0,
                      t._tTime = h,
                      s = t._pt;
                    s;

                  )
                    s.r(l, s.d), (s = s._next);
                  e < 0 && At(t, e, 0, !0),
                    t._onUpdate && !r && ce(t, "onUpdate"),
                    h && t._repeat && !r && t.parent && ce(t, "onRepeat"),
                    (e >= t._tDur || e < 0) &&
                      t.ratio === l &&
                      (l && Ot(t, 1),
                      r ||
                        i ||
                        (ce(t, l ? "onComplete" : "onReverseComplete", !0),
                        t._prom && t._prom()));
                } else t._zTime || (t._zTime = e);
              })(this, t, e, r);
            return this;
          }),
          (a.targets = function () {
            return this._targets;
          }),
          (a.invalidate = function (t) {
            return (
              (!t || !this.vars.runBackwards) && (this._startAt = 0),
              (this._pt =
                this._op =
                this._onUpdate =
                this._lazy =
                this.ratio =
                  0),
              (this._ptLookup = []),
              this.timeline && this.timeline.invalidate(t),
              r.prototype.invalidate.call(this, t)
            );
          }),
          (a.resetTo = function (t, e, r, n) {
            p || Te.wake(), this._ts || this.play();
            var i = Math.min(
              this._dur,
              (this._dp._time - this._start) * this._ts
            );
            return (
              this._initted || Ue(this, i),
              (function (t, e, r, n, i, s, o) {
                var a,
                  u,
                  l,
                  c,
                  h = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
                if (!h)
                  for (
                    h = t._ptCache[e] = [],
                      l = t._ptLookup,
                      c = t._targets.length;
                    c--;

                  ) {
                    if ((a = l[c][e]) && a.d && a.d._pt)
                      for (a = a.d._pt; a && a.p !== e && a.fp !== e; )
                        a = a._next;
                    if (!a)
                      return (
                        (qe = 1), (t.vars[e] = "+=0"), Ue(t, o), (qe = 0), 1
                      );
                    h.push(a);
                  }
                for (c = h.length; c--; )
                  ((a = (u = h[c])._pt || u).s =
                    (!n && 0 !== n) || i ? a.s + (n || 0) + s * a.c : n),
                    (a.c = r - a.s),
                    u.e && (u.e = pt(r) + $t(u.e)),
                    u.b && (u.b = a.s + $t(u.b));
              })(this, t, e, r, n, this._ease(i / this._dur), i)
                ? this.resetTo(t, e, r, n)
                : (Lt(this, 0),
                  this.parent ||
                    Mt(
                      this._dp,
                      this,
                      "_first",
                      "_last",
                      this._dp._sort ? "_start" : 0
                    ),
                  this.render(0))
            );
          }),
          (a.kill = function (t, e) {
            if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
              return (this._lazy = this._pt = 0), this.parent ? he(this) : this;
            if (this.timeline) {
              var r = this.timeline.totalDuration();
              return (
                this.timeline.killTweensOf(t, e, Ye && !0 !== Ye.vars.overwrite)
                  ._first || he(this),
                this.parent &&
                  r !== this.timeline.totalDuration() &&
                  jt(this, (this._dur * this.timeline._tDur) / r, 0, 1),
                this
              );
            }
            var n,
              i,
              s,
              o,
              a,
              u,
              l,
              c = this._targets,
              h = t ? Kt(t) : c,
              f = this._ptLookup,
              p = this._pt;
            if (
              (!e || "all" === e) &&
              (function (t, e) {
                for (
                  var r = t.length, n = r === e.length;
                  n && r-- && t[r] === e[r];

                );
                return r < 0;
              })(c, h)
            )
              return "all" === e && (this._pt = 0), he(this);
            for (
              n = this._op = this._op || [],
                "all" !== e &&
                  (O(e) &&
                    ((a = {}),
                    ft(e, function (t) {
                      return (a[t] = 1);
                    }),
                    (e = a)),
                  (e = (function (t, e) {
                    var r,
                      n,
                      i,
                      s,
                      o = t[0] ? ct(t[0]).harness : 0,
                      a = o && o.aliases;
                    if (!a) return e;
                    for (n in ((r = wt({}, e)), a))
                      if ((n in r))
                        for (i = (s = a[n].split(",")).length; i--; )
                          r[s[i]] = r[n];
                    return r;
                  })(c, e))),
                l = c.length;
              l--;

            )
              if (~h.indexOf(c[l]))
                for (a in ((i = f[l]),
                "all" === e
                  ? ((n[l] = e), (o = i), (s = {}))
                  : ((s = n[l] = n[l] || {}), (o = e)),
                o))
                  (u = i && i[a]) &&
                    (("kill" in u.d && !0 !== u.d.kill(a)) ||
                      Ct(this, u, "_pt"),
                    delete i[a]),
                    "all" !== s && (s[a] = 1);
            return this._initted && !this._pt && p && he(this), this;
          }),
          (s.to = function (t, e) {
            return new s(t, e, arguments[2]);
          }),
          (s.from = function (t, e) {
            return Vt(1, arguments);
          }),
          (s.delayedCall = function (t, e, r, n) {
            return new s(e, 0, {
              immediateRender: !1,
              lazy: !1,
              overwrite: !1,
              delay: t,
              onComplete: e,
              onReverseComplete: e,
              onCompleteParams: r,
              onReverseCompleteParams: r,
              callbackScope: n,
            });
          }),
          (s.fromTo = function (t, e, r) {
            return Vt(2, arguments);
          }),
          (s.set = function (t, e) {
            return (
              (e.duration = 0), e.repeatDelay || (e.repeat = 0), new s(t, e)
            );
          }),
          (s.killTweensOf = function (t, e, r) {
            return o.killTweensOf(t, e, r);
          }),
          s
        );
      })(Be);
      bt(Qe.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0,
      }),
        ft("staggerTo,staggerFrom,staggerFromTo", function (t) {
          Qe[t] = function () {
            var e = new Fe(),
              r = Zt.call(arguments, 0);
            return (
              r.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, r)
            );
          };
        });
      var $e = function (t, e, r) {
          return (t[e] = r);
        },
        Ze = function (t, e, r) {
          return t[e](r);
        },
        Je = function (t, e, r, n) {
          return t[e](n.fp, r);
        },
        Ke = function (t, e, r) {
          return t.setAttribute(e, r);
        },
        tr = function (t, e) {
          return S(t[e]) ? Ze : P(t[e]) && t.setAttribute ? Ke : $e;
        },
        er = function (t, e) {
          return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
        },
        rr = function (t, e) {
          return e.set(e.t, e.p, !!(e.s + e.c * t), e);
        },
        nr = function (t, e) {
          var r = e._pt,
            n = "";
          if (!t && e.b) n = e.b;
          else if (1 === t && e.e) n = e.e;
          else {
            for (; r; )
              (n =
                r.p +
                (r.m
                  ? r.m(r.s + r.c * t)
                  : Math.round(1e4 * (r.s + r.c * t)) / 1e4) +
                n),
                (r = r._next);
            n += e.c;
          }
          e.set(e.t, e.p, n, e);
        },
        ir = function (t, e) {
          for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
        },
        sr = function (t, e, r, n) {
          for (var i, s = this._pt; s; )
            (i = s._next), s.p === n && s.modifier(t, e, r), (s = i);
        },
        or = function (t) {
          for (var e, r, n = this._pt; n; )
            (r = n._next),
              (n.p === t && !n.op) || n.op === t
                ? Ct(this, n, "_pt")
                : n.dep || (e = 1),
              (n = r);
          return !e;
        },
        ar = function (t, e, r, n) {
          n.mSet(t, e, n.m.call(n.tween, r, n.mt), n);
        },
        ur = function (t) {
          for (var e, r, n, i, s = t._pt; s; ) {
            for (e = s._next, r = n; r && r.pr > s.pr; ) r = r._next;
            (s._prev = r ? r._prev : i) ? (s._prev._next = s) : (n = s),
              (s._next = r) ? (r._prev = s) : (i = s),
              (s = e);
          }
          t._pt = n;
        },
        lr = (function () {
          function t(t, e, r, n, i, s, o, a, u) {
            (this.t = e),
              (this.s = n),
              (this.c = i),
              (this.p = r),
              (this.r = s || er),
              (this.d = o || this),
              (this.set = a || $e),
              (this.pr = u || 0),
              (this._next = t),
              t && (t._prev = this);
          }
          return (
            (t.prototype.modifier = function (t, e, r) {
              (this.mSet = this.mSet || this.set),
                (this.set = ar),
                (this.m = t),
                (this.mt = r),
                (this.tween = e);
            }),
            t
          );
        })();
      ft(
        ut +
          "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
        function (t) {
          return (et[t] = 1);
        }
      ),
        (W.TweenMax = W.TweenLite = Qe),
        (W.TimelineLite = W.TimelineMax = Fe),
        (o = new Fe({
          sortChildren: !1,
          defaults: y,
          autoRemoveChildren: !0,
          id: "root",
          smoothChildTiming: !0,
        })),
        (v.stringFilter = we);
      var cr = [],
        hr = {},
        fr = [],
        pr = 0,
        dr = 0,
        gr = function (t) {
          return (hr[t] || fr).map(function (t) {
            return t();
          });
        },
        mr = function () {
          var t = Date.now(),
            e = [];
          t - pr > 2 &&
            (gr("matchMediaInit"),
            cr.forEach(function (t) {
              var r,
                n,
                i,
                s,
                o = t.queries,
                u = t.conditions;
              for (n in o)
                (r = a.matchMedia(o[n]).matches) && (i = 1),
                  r !== u[n] && ((u[n] = r), (s = 1));
              s && (t.revert(), i && e.push(t));
            }),
            gr("matchMediaRevert"),
            e.forEach(function (t) {
              return t.onMatch(t);
            }),
            (pr = t),
            gr("matchMedia"));
        },
        _r = (function () {
          function t(t, e) {
            (this.selector = e && te(e)),
              (this.data = []),
              (this._r = []),
              (this.isReverted = !1),
              (this.id = dr++),
              t && this.add(t);
          }
          var e = t.prototype;
          return (
            (e.add = function (t, e, r) {
              S(t) && ((r = e), (e = t), (t = S));
              var n = this,
                i = function () {
                  var t,
                    i = s,
                    o = n.selector;
                  return (
                    i && i !== n && i.data.push(n),
                    r && (n.selector = te(r)),
                    (s = n),
                    (t = e.apply(n, arguments)),
                    S(t) && n._r.push(t),
                    (s = i),
                    (n.selector = o),
                    (n.isReverted = !1),
                    t
                  );
                };
              return (n.last = i), t === S ? i(n) : t ? (n[t] = i) : i;
            }),
            (e.ignore = function (t) {
              var e = s;
              (s = null), t(this), (s = e);
            }),
            (e.getTweens = function () {
              var e = [];
              return (
                this.data.forEach(function (r) {
                  return r instanceof t
                    ? e.push.apply(e, r.getTweens())
                    : r instanceof Qe &&
                        !(r.parent && "nested" === r.parent.data) &&
                        e.push(r);
                }),
                e
              );
            }),
            (e.clear = function () {
              this._r.length = this.data.length = 0;
            }),
            (e.kill = function (t, e) {
              var r = this;
              if (t) {
                var n = this.getTweens();
                this.data.forEach(function (t) {
                  "isFlip" === t.data &&
                    (t.revert(),
                    t.getChildren(!0, !0, !1).forEach(function (t) {
                      return n.splice(n.indexOf(t), 1);
                    }));
                }),
                  n
                    .map(function (t) {
                      return { g: t.globalTime(0), t };
                    })
                    .sort(function (t, e) {
                      return e.g - t.g || -1 / 0;
                    })
                    .forEach(function (e) {
                      return e.t.revert(t);
                    }),
                  this.data.forEach(function (e) {
                    return !(e instanceof Qe) && e.revert && e.revert(t);
                  }),
                  this._r.forEach(function (e) {
                    return e(t, r);
                  }),
                  (this.isReverted = !0);
              } else
                this.data.forEach(function (t) {
                  return t.kill && t.kill();
                });
              if ((this.clear(), e))
                for (var i = cr.length; i--; )
                  cr[i].id === this.id && cr.splice(i, 1);
            }),
            (e.revert = function (t) {
              this.kill(t || {});
            }),
            t
          );
        })(),
        vr = (function () {
          function t(t) {
            (this.contexts = []), (this.scope = t);
          }
          var e = t.prototype;
          return (
            (e.add = function (t, e, r) {
              D(t) || (t = { matches: t });
              var n,
                i,
                o,
                u = new _r(0, r || this.scope),
                l = (u.conditions = {});
              for (i in (s && !u.selector && (u.selector = s.selector),
              this.contexts.push(u),
              (e = u.add("onMatch", e)),
              (u.queries = t),
              t))
                "all" === i
                  ? (o = 1)
                  : (n = a.matchMedia(t[i])) &&
                    (cr.indexOf(u) < 0 && cr.push(u),
                    (l[i] = n.matches) && (o = 1),
                    n.addListener
                      ? n.addListener(mr)
                      : n.addEventListener("change", mr));
              return o && e(u), this;
            }),
            (e.revert = function (t) {
              this.kill(t || {});
            }),
            (e.kill = function (t) {
              this.contexts.forEach(function (e) {
                return e.kill(t, !0);
              });
            }),
            t
          );
        })(),
        yr = {
          registerPlugin: function () {
            for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
              e[r] = arguments[r];
            e.forEach(function (t) {
              return pe(t);
            });
          },
          timeline: function (t) {
            return new Fe(t);
          },
          getTweensOf: function (t, e) {
            return o.getTweensOf(t, e);
          },
          getProperty: function (t, e, r, n) {
            O(t) && (t = Kt(t)[0]);
            var i = ct(t || {}).get,
              s = r ? xt : yt;
            return (
              "native" === r && (r = ""),
              t
                ? e
                  ? s(((it[e] && it[e].get) || i)(t, e, r, n))
                  : function (e, r, n) {
                      return s(((it[e] && it[e].get) || i)(t, e, r, n));
                    }
                : t
            );
          },
          quickSetter: function (t, e, r) {
            if ((t = Kt(t)).length > 1) {
              var n = t.map(function (t) {
                  return wr.quickSetter(t, e, r);
                }),
                i = n.length;
              return function (t) {
                for (var e = i; e--; ) n[e](t);
              };
            }
            t = t[0] || {};
            var s = it[e],
              o = ct(t),
              a = (o.harness && (o.harness.aliases || {})[e]) || e,
              u = s
                ? function (e) {
                    var n = new s();
                    (f._pt = 0),
                      n.init(t, r ? e + r : e, f, 0, [t]),
                      n.render(1, n),
                      f._pt && ir(1, f);
                  }
                : o.set(t, a);
            return s
              ? u
              : function (e) {
                  return u(t, a, r ? e + r : e, o, 1);
                };
          },
          quickTo: function (t, e, r) {
            var n,
              i = wr.to(
                t,
                wt((((n = {})[e] = "+=0.1"), (n.paused = !0), n), r || {})
              ),
              s = function (t, r, n) {
                return i.resetTo(e, t, r, n);
              };
            return (s.tween = i), s;
          },
          isTweening: function (t) {
            return o.getTweensOf(t, !0).length > 0;
          },
          defaults: function (t) {
            return t && t.ease && (t.ease = Pe(t.ease, y.ease)), Tt(y, t || {});
          },
          config: function (t) {
            return Tt(v, t || {});
          },
          registerEffect: function (t) {
            var e = t.name,
              r = t.effect,
              n = t.plugins,
              i = t.defaults,
              s = t.extendTimeline;
            (n || "").split(",").forEach(function (t) {
              return (
                t &&
                !it[t] &&
                !W[t] &&
                Q(e + " effect requires " + t + " plugin.")
              );
            }),
              (st[e] = function (t, e, n) {
                return r(Kt(t), bt(e || {}, i), n);
              }),
              s &&
                (Fe.prototype[e] = function (t, r, n) {
                  return this.add(st[e](t, D(r) ? r : (n = r) && {}, this), n);
                });
          },
          registerEase: function (t, e) {
            Ee[t] = Pe(e);
          },
          parseEase: function (t, e) {
            return arguments.length ? Pe(t, e) : Ee;
          },
          getById: function (t) {
            return o.getById(t);
          },
          exportRoot: function (t, e) {
            void 0 === t && (t = {});
            var r,
              n,
              i = new Fe(t);
            for (
              i.smoothChildTiming = R(t.smoothChildTiming),
                o.remove(i),
                i._dp = 0,
                i._time = i._tTime = o._time,
                r = o._first;
              r;

            )
              (n = r._next),
                (!e &&
                  !r._dur &&
                  r instanceof Qe &&
                  r.vars.onComplete === r._targets[0]) ||
                  Ft(i, r, r._start - r._delay),
                (r = n);
            return Ft(o, i, 0), i;
          },
          context: function (t, e) {
            return t ? new _r(t, e) : s;
          },
          matchMedia: function (t) {
            return new vr(t);
          },
          matchMediaRefresh: function () {
            return (
              cr.forEach(function (t) {
                var e,
                  r,
                  n = t.conditions;
                for (r in n) n[r] && ((n[r] = !1), (e = 1));
                e && t.revert();
              }) || mr()
            );
          },
          addEventListener: function (t, e) {
            var r = hr[t] || (hr[t] = []);
            ~r.indexOf(e) || r.push(e);
          },
          removeEventListener: function (t, e) {
            var r = hr[t],
              n = r && r.indexOf(e);
            n >= 0 && r.splice(n, 1);
          },
          utils: {
            wrap: function t(e, r, n) {
              var i = r - e;
              return B(e)
                ? oe(e, t(0, e.length), r)
                : Gt(n, function (t) {
                    return ((i + ((t - e) % i)) % i) + e;
                  });
            },
            wrapYoyo: function t(e, r, n) {
              var i = r - e,
                s = 2 * i;
              return B(e)
                ? oe(e, t(0, e.length - 1), r)
                : Gt(n, function (t) {
                    return (
                      e + ((t = (s + ((t - e) % s)) % s || 0) > i ? s - t : t)
                    );
                  });
            },
            distribute: re,
            random: se,
            snap: ie,
            normalize: function (t, e, r) {
              return ue(t, e, 0, 1, r);
            },
            getUnit: $t,
            clamp: function (t, e, r) {
              return Gt(r, function (r) {
                return Qt(t, e, r);
              });
            },
            splitColor: _e,
            toArray: Kt,
            selector: te,
            mapRange: ue,
            pipe: function () {
              for (
                var t = arguments.length, e = new Array(t), r = 0;
                r < t;
                r++
              )
                e[r] = arguments[r];
              return function (t) {
                return e.reduce(function (t, e) {
                  return e(t);
                }, t);
              };
            },
            unitize: function (t, e) {
              return function (r) {
                return t(parseFloat(r)) + (e || $t(r));
              };
            },
            interpolate: function t(e, r, n, i) {
              var s = isNaN(e + r)
                ? 0
                : function (t) {
                    return (1 - t) * e + t * r;
                  };
              if (!s) {
                var o,
                  a,
                  u,
                  l,
                  c,
                  h = O(e),
                  f = {};
                if ((!0 === n && (i = 1) && (n = null), h))
                  (e = { p: e }), (r = { p: r });
                else if (B(e) && !B(r)) {
                  for (u = [], l = e.length, c = l - 2, a = 1; a < l; a++)
                    u.push(t(e[a - 1], e[a]));
                  l--,
                    (s = function (t) {
                      t *= l;
                      var e = Math.min(c, ~~t);
                      return u[e](t - e);
                    }),
                    (n = r);
                } else i || (e = wt(B(e) ? [] : {}, e));
                if (!u) {
                  for (o in r) Xe.call(f, e, o, "get", r[o]);
                  s = function (t) {
                    return ir(t, f) || (h ? e.p : e);
                  };
                }
              }
              return Gt(n, s);
            },
            shuffle: ee,
          },
          install: V,
          effects: st,
          ticker: Te,
          updateRoot: Fe.updateRoot,
          plugins: it,
          globalTimeline: o,
          core: {
            PropTween: lr,
            globals: $,
            Tween: Qe,
            Timeline: Fe,
            Animation: Be,
            getCache: ct,
            _removeLinkedListItem: Ct,
            reverting: function () {
              return i;
            },
            context: function (t) {
              return t && s && (s.data.push(t), (t._ctx = s)), s;
            },
            suppressOverwrites: function (t) {
              return (n = t);
            },
          },
        };
      ft("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
        return (yr[t] = Qe[t]);
      }),
        Te.add(Fe.updateRoot),
        (f = yr.to({}, { duration: 0 }));
      var xr = function (t, e) {
          for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
            r = r._next;
          return r;
        },
        br = function (t, e) {
          return {
            name: t,
            rawVars: 1,
            init: function (t, r, n) {
              n._onInit = function (t) {
                var n, i;
                if (
                  (O(r) &&
                    ((n = {}),
                    ft(r, function (t) {
                      return (n[t] = 1);
                    }),
                    (r = n)),
                  e)
                ) {
                  for (i in ((n = {}), r)) n[i] = e(r[i]);
                  r = n;
                }
                !(function (t, e) {
                  var r,
                    n,
                    i,
                    s = t._targets;
                  for (r in e)
                    for (n = s.length; n--; )
                      (i = t._ptLookup[n][r]) &&
                        (i = i.d) &&
                        (i._pt && (i = xr(i, r)),
                        i && i.modifier && i.modifier(e[r], t, s[n], r));
                })(t, r);
              };
            },
          };
        },
        wr =
          yr.registerPlugin(
            {
              name: "attr",
              init: function (t, e, r, n, i) {
                var s, o, a;
                for (s in ((this.tween = r), e))
                  (a = t.getAttribute(s) || ""),
                    ((o = this.add(
                      t,
                      "setAttribute",
                      (a || 0) + "",
                      e[s],
                      n,
                      i,
                      0,
                      0,
                      s
                    )).op = s),
                    (o.b = a),
                    this._props.push(s);
              },
              render: function (t, e) {
                for (var r = e._pt; r; )
                  i ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), (r = r._next);
              },
            },
            {
              name: "endArray",
              init: function (t, e) {
                for (var r = e.length; r--; )
                  this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
              },
            },
            br("roundProps", ne),
            br("modifiers"),
            br("snap", ie)
          ) || yr;
      (Qe.version = Fe.version = wr.version = "3.12.2"),
        (c = 1),
        I() && ke(),
        Ee.Power0,
        Ee.Power1,
        Ee.Power2,
        Ee.Power3,
        Ee.Power4,
        Ee.Linear,
        Ee.Quad,
        Ee.Cubic,
        Ee.Quart,
        Ee.Quint,
        Ee.Strong,
        Ee.Elastic,
        Ee.Back,
        Ee.SteppedEase,
        Ee.Bounce,
        Ee.Sine,
        Ee.Expo,
        Ee.Circ;
      var Tr,
        kr,
        Er,
        Mr,
        Cr,
        Or,
        Sr,
        Ar,
        Pr = {},
        Dr = 180 / Math.PI,
        Rr = Math.PI / 180,
        Ir = Math.atan2,
        zr = /([A-Z])/g,
        Lr = /(left|right|width|margin|padding|x)/i,
        Br = /[\s,\(]\S/,
        Fr = {
          autoAlpha: "opacity,visibility",
          scale: "scaleX,scaleY",
          alpha: "opacity",
        },
        Yr = function (t, e) {
          return e.set(
            e.t,
            e.p,
            Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
            e
          );
        },
        qr = function (t, e) {
          return e.set(
            e.t,
            e.p,
            1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
            e
          );
        },
        Nr = function (t, e) {
          return e.set(
            e.t,
            e.p,
            t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
            e
          );
        },
        Xr = function (t, e) {
          var r = e.s + e.c * t;
          e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
        },
        jr = function (t, e) {
          return e.set(e.t, e.p, t ? e.e : e.b, e);
        },
        Ur = function (t, e) {
          return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
        },
        Wr = function (t, e, r) {
          return (t.style[e] = r);
        },
        Hr = function (t, e, r) {
          return t.style.setProperty(e, r);
        },
        Vr = function (t, e, r) {
          return (t._gsap[e] = r);
        },
        Gr = function (t, e, r) {
          return (t._gsap.scaleX = t._gsap.scaleY = r);
        },
        Qr = function (t, e, r, n, i) {
          var s = t._gsap;
          (s.scaleX = s.scaleY = r), s.renderTransform(i, s);
        },
        $r = function (t, e, r, n, i) {
          var s = t._gsap;
          (s[e] = r), s.renderTransform(i, s);
        },
        Zr = "transform",
        Jr = Zr + "Origin",
        Kr = function t(e, r) {
          var n = this,
            i = this.target,
            s = i.style;
          if (e in Pr && s) {
            if (((this.tfm = this.tfm || {}), "transform" === e))
              return Fr.transform.split(",").forEach(function (e) {
                return t.call(n, e, r);
              });
            if (
              (~(e = Fr[e] || e).indexOf(",")
                ? e.split(",").forEach(function (t) {
                    return (n.tfm[t] = vn(i, t));
                  })
                : (this.tfm[e] = i._gsap.x ? i._gsap[e] : vn(i, e)),
              this.props.indexOf(Zr) >= 0)
            )
              return;
            i._gsap.svg &&
              ((this.svgo = i.getAttribute("data-svg-origin")),
              this.props.push(Jr, r, "")),
              (e = Zr);
          }
          (s || r) && this.props.push(e, r, s[e]);
        },
        tn = function (t) {
          t.translate &&
            (t.removeProperty("translate"),
            t.removeProperty("scale"),
            t.removeProperty("rotate"));
        },
        en = function () {
          var t,
            e,
            r = this.props,
            n = this.target,
            i = n.style,
            s = n._gsap;
          for (t = 0; t < r.length; t += 3)
            r[t + 1]
              ? (n[r[t]] = r[t + 2])
              : r[t + 2]
              ? (i[r[t]] = r[t + 2])
              : i.removeProperty(
                  "--" === r[t].substr(0, 2)
                    ? r[t]
                    : r[t].replace(zr, "-$1").toLowerCase()
                );
          if (this.tfm) {
            for (e in this.tfm) s[e] = this.tfm[e];
            s.svg &&
              (s.renderTransform(),
              n.setAttribute("data-svg-origin", this.svgo || "")),
              ((t = Sr()) && t.isStart) || i[Zr] || (tn(i), (s.uncache = 1));
          }
        },
        rn = function (t, e) {
          var r = { target: t, props: [], revert: en, save: Kr };
          return (
            t._gsap || wr.core.getCache(t),
            e &&
              e.split(",").forEach(function (t) {
                return r.save(t);
              }),
            r
          );
        },
        nn = function (t, e) {
          var r = kr.createElementNS
            ? kr.createElementNS(
                (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
                t
              )
            : kr.createElement(t);
          return r.style ? r : kr.createElement(t);
        },
        sn = function t(e, r, n) {
          var i = getComputedStyle(e);
          return (
            i[r] ||
            i.getPropertyValue(r.replace(zr, "-$1").toLowerCase()) ||
            i.getPropertyValue(r) ||
            (!n && t(e, an(r) || r, 1)) ||
            ""
          );
        },
        on = "O,Moz,ms,Ms,Webkit".split(","),
        an = function (t, e, r) {
          var n = (e || Cr).style,
            i = 5;
          if (t in n && !r) return t;
          for (
            t = t.charAt(0).toUpperCase() + t.substr(1);
            i-- && !(on[i] + t in n);

          );
          return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? on[i] : "") + t;
        },
        un = function () {
          "undefined" != typeof window &&
            window.document &&
            ((Tr = window),
            (kr = Tr.document),
            (Er = kr.documentElement),
            (Cr = nn("div") || { style: {} }),
            nn("div"),
            (Zr = an(Zr)),
            (Jr = Zr + "Origin"),
            (Cr.style.cssText =
              "border-width:0;line-height:0;position:absolute;padding:0"),
            (Ar = !!an("perspective")),
            (Sr = wr.core.reverting),
            (Mr = 1));
        },
        ln = function t(e) {
          var r,
            n = nn(
              "svg",
              (this.ownerSVGElement &&
                this.ownerSVGElement.getAttribute("xmlns")) ||
                "http://www.w3.org/2000/svg"
            ),
            i = this.parentNode,
            s = this.nextSibling,
            o = this.style.cssText;
          if (
            (Er.appendChild(n),
            n.appendChild(this),
            (this.style.display = "block"),
            e)
          )
            try {
              (r = this.getBBox()),
                (this._gsapBBox = this.getBBox),
                (this.getBBox = t);
            } catch (t) {}
          else this._gsapBBox && (r = this._gsapBBox());
          return (
            i && (s ? i.insertBefore(this, s) : i.appendChild(this)),
            Er.removeChild(n),
            (this.style.cssText = o),
            r
          );
        },
        cn = function (t, e) {
          for (var r = e.length; r--; )
            if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
        },
        hn = function (t) {
          var e;
          try {
            e = t.getBBox();
          } catch (r) {
            e = ln.call(t, !0);
          }
          return (
            (e && (e.width || e.height)) ||
              t.getBBox === ln ||
              (e = ln.call(t, !0)),
            !e || e.width || e.x || e.y
              ? e
              : {
                  x: +cn(t, ["x", "cx", "x1"]) || 0,
                  y: +cn(t, ["y", "cy", "y1"]) || 0,
                  width: 0,
                  height: 0,
                }
          );
        },
        fn = function (t) {
          return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !hn(t));
        },
        pn = function (t, e) {
          if (e) {
            var r = t.style;
            e in Pr && e !== Jr && (e = Zr),
              r.removeProperty
                ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
                    (e = "-" + e),
                  r.removeProperty(e.replace(zr, "-$1").toLowerCase()))
                : r.removeAttribute(e);
          }
        },
        dn = function (t, e, r, n, i, s) {
          var o = new lr(t._pt, e, r, 0, 1, s ? Ur : jr);
          return (t._pt = o), (o.b = n), (o.e = i), t._props.push(r), o;
        },
        gn = { deg: 1, rad: 1, turn: 1 },
        mn = { grid: 1, flex: 1 },
        _n = function t(e, r, n, i) {
          var s,
            o,
            a,
            u,
            l = parseFloat(n) || 0,
            c = (n + "").trim().substr((l + "").length) || "px",
            h = Cr.style,
            f = Lr.test(r),
            p = "svg" === e.tagName.toLowerCase(),
            d = (p ? "client" : "offset") + (f ? "Width" : "Height"),
            g = 100,
            m = "px" === i,
            _ = "%" === i;
          return i === c || !l || gn[i] || gn[c]
            ? l
            : ("px" !== c && !m && (l = t(e, r, n, "px")),
              (u = e.getCTM && fn(e)),
              (!_ && "%" !== c) || (!Pr[r] && !~r.indexOf("adius"))
                ? ((h[f ? "width" : "height"] = g + (m ? c : i)),
                  (o =
                    ~r.indexOf("adius") || ("em" === i && e.appendChild && !p)
                      ? e
                      : e.parentNode),
                  u && (o = (e.ownerSVGElement || {}).parentNode),
                  (o && o !== kr && o.appendChild) || (o = kr.body),
                  (a = o._gsap) &&
                  _ &&
                  a.width &&
                  f &&
                  a.time === Te.time &&
                  !a.uncache
                    ? pt((l / a.width) * g)
                    : ((_ || "%" === c) &&
                        !mn[sn(o, "display")] &&
                        (h.position = sn(e, "position")),
                      o === e && (h.position = "static"),
                      o.appendChild(Cr),
                      (s = Cr[d]),
                      o.removeChild(Cr),
                      (h.position = "absolute"),
                      f &&
                        _ &&
                        (((a = ct(o)).time = Te.time), (a.width = o[d])),
                      pt(m ? (s * l) / g : s && l ? (g / s) * l : 0)))
                : ((s = u ? e.getBBox()[f ? "width" : "height"] : e[d]),
                  pt(_ ? (l / s) * g : (l / 100) * s)));
        },
        vn = function (t, e, r, n) {
          var i;
          return (
            Mr || un(),
            e in Fr &&
              "transform" !== e &&
              ~(e = Fr[e]).indexOf(",") &&
              (e = e.split(",")[0]),
            Pr[e] && "transform" !== e
              ? ((i = Sn(t, n)),
                (i =
                  "transformOrigin" !== e
                    ? i[e]
                    : i.svg
                    ? i.origin
                    : An(sn(t, Jr)) + " " + i.zOrigin + "px"))
              : (!(i = t.style[e]) ||
                  "auto" === i ||
                  n ||
                  ~(i + "").indexOf("calc(")) &&
                (i =
                  (wn[e] && wn[e](t, e, r)) ||
                  sn(t, e) ||
                  ht(t, e) ||
                  ("opacity" === e ? 1 : 0)),
            r && !~(i + "").trim().indexOf(" ") ? _n(t, e, i, r) + r : i
          );
        },
        yn = function (t, e, r, n) {
          if (!r || "none" === r) {
            var i = an(e, t, 1),
              s = i && sn(t, i, 1);
            s && s !== r
              ? ((e = i), (r = s))
              : "borderColor" === e && (r = sn(t, "borderTopColor"));
          }
          var o,
            a,
            u,
            l,
            c,
            h,
            f,
            p,
            d,
            g,
            m,
            _ = new lr(this._pt, t.style, e, 0, 1, nr),
            y = 0,
            x = 0;
          if (
            ((_.b = r),
            (_.e = n),
            (r += ""),
            "auto" == (n += "") &&
              ((t.style[e] = n), (n = sn(t, e) || n), (t.style[e] = r)),
            we((o = [r, n])),
            (n = o[1]),
            (u = (r = o[0]).match(q) || []),
            (n.match(q) || []).length)
          ) {
            for (; (a = q.exec(n)); )
              (f = a[0]),
                (d = n.substring(y, a.index)),
                c
                  ? (c = (c + 1) % 5)
                  : ("rgba(" !== d.substr(-5) && "hsla(" !== d.substr(-5)) ||
                    (c = 1),
                f !== (h = u[x++] || "") &&
                  ((l = parseFloat(h) || 0),
                  (m = h.substr((l + "").length)),
                  "=" === f.charAt(1) && (f = gt(l, f) + m),
                  (p = parseFloat(f)),
                  (g = f.substr((p + "").length)),
                  (y = q.lastIndex - g.length),
                  g ||
                    ((g = g || v.units[e] || m),
                    y === n.length && ((n += g), (_.e += g))),
                  m !== g && (l = _n(t, e, h, g) || 0),
                  (_._pt = {
                    _next: _._pt,
                    p: d || 1 === x ? d : ",",
                    s: l,
                    c: p - l,
                    m: (c && c < 4) || "zIndex" === e ? Math.round : 0,
                  }));
            _.c = y < n.length ? n.substring(y, n.length) : "";
          } else _.r = "display" === e && "none" === n ? Ur : jr;
          return X.test(n) && (_.e = 0), (this._pt = _), _;
        },
        xn = {
          top: "0%",
          bottom: "100%",
          left: "0%",
          right: "100%",
          center: "50%",
        },
        bn = function (t, e) {
          if (e.tween && e.tween._time === e.tween._dur) {
            var r,
              n,
              i,
              s = e.t,
              o = s.style,
              a = e.u,
              u = s._gsap;
            if ("all" === a || !0 === a) (o.cssText = ""), (n = 1);
            else
              for (i = (a = a.split(",")).length; --i > -1; )
                (r = a[i]),
                  Pr[r] && ((n = 1), (r = "transformOrigin" === r ? Jr : Zr)),
                  pn(s, r);
            n &&
              (pn(s, Zr),
              u &&
                (u.svg && s.removeAttribute("transform"),
                Sn(s, 1),
                (u.uncache = 1),
                tn(o)));
          }
        },
        wn = {
          clearProps: function (t, e, r, n, i) {
            if ("isFromStart" !== i.data) {
              var s = (t._pt = new lr(t._pt, e, r, 0, 0, bn));
              return (
                (s.u = n), (s.pr = -10), (s.tween = i), t._props.push(r), 1
              );
            }
          },
        },
        Tn = [1, 0, 0, 1, 0, 0],
        kn = {},
        En = function (t) {
          return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
        },
        Mn = function (t) {
          var e = sn(t, Zr);
          return En(e) ? Tn : e.substr(7).match(Y).map(pt);
        },
        Cn = function (t, e) {
          var r,
            n,
            i,
            s,
            o = t._gsap || ct(t),
            a = t.style,
            u = Mn(t);
          return o.svg && t.getAttribute("transform")
            ? "1,0,0,1,0,0" ===
              (u = [
                (i = t.transform.baseVal.consolidate().matrix).a,
                i.b,
                i.c,
                i.d,
                i.e,
                i.f,
              ]).join(",")
              ? Tn
              : u
            : (u !== Tn ||
                t.offsetParent ||
                t === Er ||
                o.svg ||
                ((i = a.display),
                (a.display = "block"),
                ((r = t.parentNode) && t.offsetParent) ||
                  ((s = 1), (n = t.nextElementSibling), Er.appendChild(t)),
                (u = Mn(t)),
                i ? (a.display = i) : pn(t, "display"),
                s &&
                  (n
                    ? r.insertBefore(t, n)
                    : r
                    ? r.appendChild(t)
                    : Er.removeChild(t))),
              e && u.length > 6 ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
        },
        On = function (t, e, r, n, i, s) {
          var o,
            a,
            u,
            l = t._gsap,
            c = i || Cn(t, !0),
            h = l.xOrigin || 0,
            f = l.yOrigin || 0,
            p = l.xOffset || 0,
            d = l.yOffset || 0,
            g = c[0],
            m = c[1],
            _ = c[2],
            v = c[3],
            y = c[4],
            x = c[5],
            b = e.split(" "),
            w = parseFloat(b[0]) || 0,
            T = parseFloat(b[1]) || 0;
          r
            ? c !== Tn &&
              (a = g * v - m * _) &&
              ((u = w * (-m / a) + T * (g / a) - (g * x - m * y) / a),
              (w = w * (v / a) + T * (-_ / a) + (_ * x - v * y) / a),
              (T = u))
            : ((w =
                (o = hn(t)).x + (~b[0].indexOf("%") ? (w / 100) * o.width : w)),
              (T =
                o.y +
                (~(b[1] || b[0]).indexOf("%") ? (T / 100) * o.height : T))),
            n || (!1 !== n && l.smooth)
              ? ((y = w - h),
                (x = T - f),
                (l.xOffset = p + (y * g + x * _) - y),
                (l.yOffset = d + (y * m + x * v) - x))
              : (l.xOffset = l.yOffset = 0),
            (l.xOrigin = w),
            (l.yOrigin = T),
            (l.smooth = !!n),
            (l.origin = e),
            (l.originIsAbsolute = !!r),
            (t.style[Jr] = "0px 0px"),
            s &&
              (dn(s, l, "xOrigin", h, w),
              dn(s, l, "yOrigin", f, T),
              dn(s, l, "xOffset", p, l.xOffset),
              dn(s, l, "yOffset", d, l.yOffset)),
            t.setAttribute("data-svg-origin", w + " " + T);
        },
        Sn = function (t, e) {
          var r = t._gsap || new Le(t);
          if ("x" in r && !e && !r.uncache) return r;
          var n,
            i,
            s,
            o,
            a,
            u,
            l,
            c,
            h,
            f,
            p,
            d,
            g,
            m,
            _,
            y,
            x,
            b,
            w,
            T,
            k,
            E,
            M,
            C,
            O,
            S,
            A,
            P,
            D,
            R,
            I,
            z,
            L = t.style,
            B = r.scaleX < 0,
            F = "px",
            Y = "deg",
            q = getComputedStyle(t),
            N = sn(t, Jr) || "0";
          return (
            (n = i = s = u = l = c = h = f = p = 0),
            (o = a = 1),
            (r.svg = !(!t.getCTM || !fn(t))),
            q.translate &&
              (("none" === q.translate &&
                "none" === q.scale &&
                "none" === q.rotate) ||
                (L[Zr] =
                  ("none" !== q.translate
                    ? "translate3d(" +
                      (q.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                      ") "
                    : "") +
                  ("none" !== q.rotate ? "rotate(" + q.rotate + ") " : "") +
                  ("none" !== q.scale
                    ? "scale(" + q.scale.split(" ").join(",") + ") "
                    : "") +
                  ("none" !== q[Zr] ? q[Zr] : "")),
              (L.scale = L.rotate = L.translate = "none")),
            (m = Cn(t, r.svg)),
            r.svg &&
              (r.uncache
                ? ((O = t.getBBox()),
                  (N = r.xOrigin - O.x + "px " + (r.yOrigin - O.y) + "px"),
                  (C = ""))
                : (C = !e && t.getAttribute("data-svg-origin")),
              On(t, C || N, !!C || r.originIsAbsolute, !1 !== r.smooth, m)),
            (d = r.xOrigin || 0),
            (g = r.yOrigin || 0),
            m !== Tn &&
              ((b = m[0]),
              (w = m[1]),
              (T = m[2]),
              (k = m[3]),
              (n = E = m[4]),
              (i = M = m[5]),
              6 === m.length
                ? ((o = Math.sqrt(b * b + w * w)),
                  (a = Math.sqrt(k * k + T * T)),
                  (u = b || w ? Ir(w, b) * Dr : 0),
                  (h = T || k ? Ir(T, k) * Dr + u : 0) &&
                    (a *= Math.abs(Math.cos(h * Rr))),
                  r.svg &&
                    ((n -= d - (d * b + g * T)), (i -= g - (d * w + g * k))))
                : ((z = m[6]),
                  (R = m[7]),
                  (A = m[8]),
                  (P = m[9]),
                  (D = m[10]),
                  (I = m[11]),
                  (n = m[12]),
                  (i = m[13]),
                  (s = m[14]),
                  (l = (_ = Ir(z, D)) * Dr),
                  _ &&
                    ((C = E * (y = Math.cos(-_)) + A * (x = Math.sin(-_))),
                    (O = M * y + P * x),
                    (S = z * y + D * x),
                    (A = E * -x + A * y),
                    (P = M * -x + P * y),
                    (D = z * -x + D * y),
                    (I = R * -x + I * y),
                    (E = C),
                    (M = O),
                    (z = S)),
                  (c = (_ = Ir(-T, D)) * Dr),
                  _ &&
                    ((y = Math.cos(-_)),
                    (I = k * (x = Math.sin(-_)) + I * y),
                    (b = C = b * y - A * x),
                    (w = O = w * y - P * x),
                    (T = S = T * y - D * x)),
                  (u = (_ = Ir(w, b)) * Dr),
                  _ &&
                    ((C = b * (y = Math.cos(_)) + w * (x = Math.sin(_))),
                    (O = E * y + M * x),
                    (w = w * y - b * x),
                    (M = M * y - E * x),
                    (b = C),
                    (E = O)),
                  l &&
                    Math.abs(l) + Math.abs(u) > 359.9 &&
                    ((l = u = 0), (c = 180 - c)),
                  (o = pt(Math.sqrt(b * b + w * w + T * T))),
                  (a = pt(Math.sqrt(M * M + z * z))),
                  (_ = Ir(E, M)),
                  (h = Math.abs(_) > 2e-4 ? _ * Dr : 0),
                  (p = I ? 1 / (I < 0 ? -I : I) : 0)),
              r.svg &&
                ((C = t.getAttribute("transform")),
                (r.forceCSS =
                  t.setAttribute("transform", "") || !En(sn(t, Zr))),
                C && t.setAttribute("transform", C))),
            Math.abs(h) > 90 &&
              Math.abs(h) < 270 &&
              (B
                ? ((o *= -1),
                  (h += u <= 0 ? 180 : -180),
                  (u += u <= 0 ? 180 : -180))
                : ((a *= -1), (h += h <= 0 ? 180 : -180))),
            (e = e || r.uncache),
            (r.x =
              n -
              ((r.xPercent =
                n &&
                ((!e && r.xPercent) ||
                  (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0)))
                ? (t.offsetWidth * r.xPercent) / 100
                : 0) +
              F),
            (r.y =
              i -
              ((r.yPercent =
                i &&
                ((!e && r.yPercent) ||
                  (Math.round(t.offsetHeight / 2) === Math.round(-i)
                    ? -50
                    : 0)))
                ? (t.offsetHeight * r.yPercent) / 100
                : 0) +
              F),
            (r.z = s + F),
            (r.scaleX = pt(o)),
            (r.scaleY = pt(a)),
            (r.rotation = pt(u) + Y),
            (r.rotationX = pt(l) + Y),
            (r.rotationY = pt(c) + Y),
            (r.skewX = h + Y),
            (r.skewY = f + Y),
            (r.transformPerspective = p + F),
            (r.zOrigin = parseFloat(N.split(" ")[2]) || 0) && (L[Jr] = An(N)),
            (r.xOffset = r.yOffset = 0),
            (r.force3D = v.force3D),
            (r.renderTransform = r.svg ? Bn : Ar ? Ln : Dn),
            (r.uncache = 0),
            r
          );
        },
        An = function (t) {
          return (t = t.split(" "))[0] + " " + t[1];
        },
        Pn = function (t, e, r) {
          var n = $t(e);
          return pt(parseFloat(e) + parseFloat(_n(t, "x", r + "px", n))) + n;
        },
        Dn = function (t, e) {
          (e.z = "0px"),
            (e.rotationY = e.rotationX = "0deg"),
            (e.force3D = 0),
            Ln(t, e);
        },
        Rn = "0deg",
        In = "0px",
        zn = ") ",
        Ln = function (t, e) {
          var r = e || this,
            n = r.xPercent,
            i = r.yPercent,
            s = r.x,
            o = r.y,
            a = r.z,
            u = r.rotation,
            l = r.rotationY,
            c = r.rotationX,
            h = r.skewX,
            f = r.skewY,
            p = r.scaleX,
            d = r.scaleY,
            g = r.transformPerspective,
            m = r.force3D,
            _ = r.target,
            v = r.zOrigin,
            y = "",
            x = ("auto" === m && t && 1 !== t) || !0 === m;
          if (v && (c !== Rn || l !== Rn)) {
            var b,
              w = parseFloat(l) * Rr,
              T = Math.sin(w),
              k = Math.cos(w);
            (w = parseFloat(c) * Rr),
              (b = Math.cos(w)),
              (s = Pn(_, s, T * b * -v)),
              (o = Pn(_, o, -Math.sin(w) * -v)),
              (a = Pn(_, a, k * b * -v + v));
          }
          g !== In && (y += "perspective(" + g + zn),
            (n || i) && (y += "translate(" + n + "%, " + i + "%) "),
            (x || s !== In || o !== In || a !== In) &&
              (y +=
                a !== In || x
                  ? "translate3d(" + s + ", " + o + ", " + a + ") "
                  : "translate(" + s + ", " + o + zn),
            u !== Rn && (y += "rotate(" + u + zn),
            l !== Rn && (y += "rotateY(" + l + zn),
            c !== Rn && (y += "rotateX(" + c + zn),
            (h === Rn && f === Rn) || (y += "skew(" + h + ", " + f + zn),
            (1 === p && 1 === d) || (y += "scale(" + p + ", " + d + zn),
            (_.style[Zr] = y || "translate(0, 0)");
        },
        Bn = function (t, e) {
          var r,
            n,
            i,
            s,
            o,
            a = e || this,
            u = a.xPercent,
            l = a.yPercent,
            c = a.x,
            h = a.y,
            f = a.rotation,
            p = a.skewX,
            d = a.skewY,
            g = a.scaleX,
            m = a.scaleY,
            _ = a.target,
            v = a.xOrigin,
            y = a.yOrigin,
            x = a.xOffset,
            b = a.yOffset,
            w = a.forceCSS,
            T = parseFloat(c),
            k = parseFloat(h);
          (f = parseFloat(f)),
            (p = parseFloat(p)),
            (d = parseFloat(d)) && ((p += d = parseFloat(d)), (f += d)),
            f || p
              ? ((f *= Rr),
                (p *= Rr),
                (r = Math.cos(f) * g),
                (n = Math.sin(f) * g),
                (i = Math.sin(f - p) * -m),
                (s = Math.cos(f - p) * m),
                p &&
                  ((d *= Rr),
                  (o = Math.tan(p - d)),
                  (i *= o = Math.sqrt(1 + o * o)),
                  (s *= o),
                  d &&
                    ((o = Math.tan(d)),
                    (r *= o = Math.sqrt(1 + o * o)),
                    (n *= o))),
                (r = pt(r)),
                (n = pt(n)),
                (i = pt(i)),
                (s = pt(s)))
              : ((r = g), (s = m), (n = i = 0)),
            ((T && !~(c + "").indexOf("px")) ||
              (k && !~(h + "").indexOf("px"))) &&
              ((T = _n(_, "x", c, "px")), (k = _n(_, "y", h, "px"))),
            (v || y || x || b) &&
              ((T = pt(T + v - (v * r + y * i) + x)),
              (k = pt(k + y - (v * n + y * s) + b))),
            (u || l) &&
              ((o = _.getBBox()),
              (T = pt(T + (u / 100) * o.width)),
              (k = pt(k + (l / 100) * o.height))),
            (o =
              "matrix(" +
              r +
              "," +
              n +
              "," +
              i +
              "," +
              s +
              "," +
              T +
              "," +
              k +
              ")"),
            _.setAttribute("transform", o),
            w && (_.style[Zr] = o);
        },
        Fn = function (t, e, r, n, i) {
          var s,
            o,
            a = 360,
            u = O(i),
            l = parseFloat(i) * (u && ~i.indexOf("rad") ? Dr : 1) - n,
            c = n + l + "deg";
          return (
            u &&
              ("short" === (s = i.split("_")[1]) &&
                (l %= a) != l % 180 &&
                (l += l < 0 ? a : -360),
              "cw" === s && l < 0
                ? (l = ((l + 36e9) % a) - ~~(l / a) * a)
                : "ccw" === s &&
                  l > 0 &&
                  (l = ((l - 36e9) % a) - ~~(l / a) * a)),
            (t._pt = o = new lr(t._pt, e, r, n, l, qr)),
            (o.e = c),
            (o.u = "deg"),
            t._props.push(r),
            o
          );
        },
        Yn = function (t, e) {
          for (var r in e) t[r] = e[r];
          return t;
        },
        qn = function (t, e, r) {
          var n,
            i,
            s,
            o,
            a,
            u,
            l,
            c = Yn({}, r._gsap),
            h = r.style;
          for (i in (c.svg
            ? ((s = r.getAttribute("transform")),
              r.setAttribute("transform", ""),
              (h[Zr] = e),
              (n = Sn(r, 1)),
              pn(r, Zr),
              r.setAttribute("transform", s))
            : ((s = getComputedStyle(r)[Zr]),
              (h[Zr] = e),
              (n = Sn(r, 1)),
              (h[Zr] = s)),
          Pr))
            (s = c[i]) !== (o = n[i]) &&
              "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) < 0 &&
              ((a = $t(s) !== (l = $t(o)) ? _n(r, i, s, l) : parseFloat(s)),
              (u = parseFloat(o)),
              (t._pt = new lr(t._pt, n, i, a, u - a, Yr)),
              (t._pt.u = l || 0),
              t._props.push(i));
          Yn(n, c);
        };
      ft("padding,margin,Width,Radius", function (t, e) {
        var r = "Top",
          n = "Right",
          i = "Bottom",
          s = "Left",
          o = (e < 3 ? [r, n, i, s] : [r + s, r + n, i + n, i + s]).map(
            function (r) {
              return e < 2 ? t + r : "border" + r + t;
            }
          );
        wn[e > 1 ? "border" + t : t] = function (t, e, r, n, i) {
          var s, a;
          if (arguments.length < 4)
            return (
              (s = o.map(function (e) {
                return vn(t, e, r);
              })),
              5 === (a = s.join(" ")).split(s[0]).length ? s[0] : a
            );
          (s = (n + "").split(" ")),
            (a = {}),
            o.forEach(function (t, e) {
              return (a[t] = s[e] = s[e] || s[((e - 1) / 2) | 0]);
            }),
            t.init(e, a, i);
        };
      });
      var Nn,
        Xn,
        jn = {
          name: "css",
          register: un,
          targetTest: function (t) {
            return t.style && t.nodeType;
          },
          init: function (t, e, r, n, i) {
            var s,
              o,
              a,
              u,
              l,
              c,
              h,
              f,
              p,
              d,
              g,
              m,
              _,
              y,
              x,
              b,
              w,
              T,
              k,
              E,
              M = this._props,
              C = t.style,
              S = r.vars.startAt;
            for (h in (Mr || un(),
            (this.styles = this.styles || rn(t)),
            (b = this.styles.props),
            (this.tween = r),
            e))
              if (
                "autoRound" !== h &&
                ((o = e[h]), !it[h] || !je(h, e, r, n, t, i))
              )
                if (
                  ((l = typeof o),
                  (c = wn[h]),
                  "function" === l && (l = typeof (o = o.call(r, n, t, i))),
                  "string" === l && ~o.indexOf("random(") && (o = ae(o)),
                  c)
                )
                  c(this, t, h, o, r) && (x = 1);
                else if ("--" === h.substr(0, 2))
                  (s = (getComputedStyle(t).getPropertyValue(h) + "").trim()),
                    (o += ""),
                    (xe.lastIndex = 0),
                    xe.test(s) || ((f = $t(s)), (p = $t(o))),
                    p ? f !== p && (s = _n(t, h, s, p) + p) : f && (o += f),
                    this.add(C, "setProperty", s, o, n, i, 0, 0, h),
                    M.push(h),
                    b.push(h, 0, C[h]);
                else if ("undefined" !== l) {
                  if (
                    (S && h in S
                      ? ((s =
                          "function" == typeof S[h]
                            ? S[h].call(r, n, t, i)
                            : S[h]),
                        O(s) && ~s.indexOf("random(") && (s = ae(s)),
                        $t(s + "") || (s += v.units[h] || $t(vn(t, h)) || ""),
                        "=" === (s + "").charAt(1) && (s = vn(t, h)))
                      : (s = vn(t, h)),
                    (u = parseFloat(s)),
                    (d =
                      "string" === l &&
                      "=" === o.charAt(1) &&
                      o.substr(0, 2)) && (o = o.substr(2)),
                    (a = parseFloat(o)),
                    h in Fr &&
                      ("autoAlpha" === h &&
                        (1 === u &&
                          "hidden" === vn(t, "visibility") &&
                          a &&
                          (u = 0),
                        b.push("visibility", 0, C.visibility),
                        dn(
                          this,
                          C,
                          "visibility",
                          u ? "inherit" : "hidden",
                          a ? "inherit" : "hidden",
                          !a
                        )),
                      "scale" !== h &&
                        "transform" !== h &&
                        ~(h = Fr[h]).indexOf(",") &&
                        (h = h.split(",")[0])),
                    (g = h in Pr))
                  )
                    if (
                      (this.styles.save(h),
                      m ||
                        (((_ = t._gsap).renderTransform && !e.parseTransform) ||
                          Sn(t, e.parseTransform),
                        (y = !1 !== e.smoothOrigin && _.smooth),
                        ((m = this._pt =
                          new lr(
                            this._pt,
                            C,
                            Zr,
                            0,
                            1,
                            _.renderTransform,
                            _,
                            0,
                            -1
                          )).dep = 1)),
                      "scale" === h)
                    )
                      (this._pt = new lr(
                        this._pt,
                        _,
                        "scaleY",
                        _.scaleY,
                        (d ? gt(_.scaleY, d + a) : a) - _.scaleY || 0,
                        Yr
                      )),
                        (this._pt.u = 0),
                        M.push("scaleY", h),
                        (h += "X");
                    else {
                      if ("transformOrigin" === h) {
                        b.push(Jr, 0, C[Jr]),
                          (T = void 0),
                          (k = void 0),
                          (E = void 0),
                          (k = (T = (w = o).split(" "))[0]),
                          (E = T[1] || "50%"),
                          ("top" !== k &&
                            "bottom" !== k &&
                            "left" !== E &&
                            "right" !== E) ||
                            ((w = k), (k = E), (E = w)),
                          (T[0] = xn[k] || k),
                          (T[1] = xn[E] || E),
                          (o = T.join(" ")),
                          _.svg
                            ? On(t, o, 0, y, 0, this)
                            : ((p = parseFloat(o.split(" ")[2]) || 0) !==
                                _.zOrigin &&
                                dn(this, _, "zOrigin", _.zOrigin, p),
                              dn(this, C, h, An(s), An(o)));
                        continue;
                      }
                      if ("svgOrigin" === h) {
                        On(t, o, 1, y, 0, this);
                        continue;
                      }
                      if (h in kn) {
                        Fn(this, _, h, u, d ? gt(u, d + o) : o);
                        continue;
                      }
                      if ("smoothOrigin" === h) {
                        dn(this, _, "smooth", _.smooth, o);
                        continue;
                      }
                      if ("force3D" === h) {
                        _[h] = o;
                        continue;
                      }
                      if ("transform" === h) {
                        qn(this, o, t);
                        continue;
                      }
                    }
                  else h in C || (h = an(h) || h);
                  if (
                    g ||
                    ((a || 0 === a) && (u || 0 === u) && !Br.test(o) && h in C)
                  )
                    a || (a = 0),
                      (f = (s + "").substr((u + "").length)) !==
                        (p = $t(o) || (h in v.units ? v.units[h] : f)) &&
                        (u = _n(t, h, s, p)),
                      (this._pt = new lr(
                        this._pt,
                        g ? _ : C,
                        h,
                        u,
                        (d ? gt(u, d + a) : a) - u,
                        g ||
                        ("px" !== p && "zIndex" !== h) ||
                        !1 === e.autoRound
                          ? Yr
                          : Xr
                      )),
                      (this._pt.u = p || 0),
                      f !== p &&
                        "%" !== p &&
                        ((this._pt.b = s), (this._pt.r = Nr));
                  else if (h in C) yn.call(this, t, h, s, d ? d + o : o);
                  else if (h in t)
                    this.add(t, h, s || t[h], d ? d + o : o, n, i);
                  else if ("parseTransform" !== h) {
                    G(h, o);
                    continue;
                  }
                  g || (h in C ? b.push(h, 0, C[h]) : b.push(h, 1, s || t[h])),
                    M.push(h);
                }
            x && ur(this);
          },
          render: function (t, e) {
            if (e.tween._time || !Sr())
              for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
            else e.styles.revert();
          },
          get: vn,
          aliases: Fr,
          getSetter: function (t, e, r) {
            var n = Fr[e];
            return (
              n && n.indexOf(",") < 0 && (e = n),
              e in Pr && e !== Jr && (t._gsap.x || vn(t, "x"))
                ? r && Or === r
                  ? "scale" === e
                    ? Gr
                    : Vr
                  : (Or = r || {}) && ("scale" === e ? Qr : $r)
                : t.style && !P(t.style[e])
                ? Wr
                : ~e.indexOf("-")
                ? Hr
                : tr(t, e)
            );
          },
          core: { _removeProperty: pn, _getMatrix: Cn },
        };
      (wr.utils.checkPrefix = an),
        (wr.core.getStyleSaver = rn),
        (Xn = ft(
          "x,y,z,scale,scaleX,scaleY,xPercent,yPercent" +
            "," +
            (Nn = "rotation,rotationX,rotationY,skewX,skewY") +
            ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
          function (t) {
            Pr[t] = 1;
          }
        )),
        ft(Nn, function (t) {
          (v.units[t] = "deg"), (kn[t] = 1);
        }),
        (Fr[Xn[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + Nn),
        ft(
          "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
          function (t) {
            var e = t.split(":");
            Fr[e[1]] = Xn[e[0]];
          }
        ),
        ft(
          "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
          function (t) {
            v.units[t] = "px";
          }
        ),
        wr.registerPlugin(jn);
      var Un = wr.registerPlugin(jn) || wr;
      function Wn(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      Un.core.Tween;
      var Hn,
        Vn,
        Gn,
        Qn,
        $n,
        Zn,
        Jn,
        Kn,
        ti,
        ei,
        ri,
        ni,
        ii,
        si = function () {
          return (
            Hn ||
            ("undefined" != typeof window &&
              (Hn = window.gsap) &&
              Hn.registerPlugin &&
              Hn)
          );
        },
        oi = 1,
        ai = [],
        ui = [],
        li = [],
        ci = Date.now,
        hi = function (t, e) {
          return e;
        },
        fi = function (t, e) {
          return ~li.indexOf(t) && li[li.indexOf(t) + 1][e];
        },
        pi = function (t) {
          return !!~ei.indexOf(t);
        },
        di = function (t, e, r, n, i) {
          return t.addEventListener(e, r, { passive: !n, capture: !!i });
        },
        gi = function (t, e, r, n) {
          return t.removeEventListener(e, r, !!n);
        },
        mi = "scrollLeft",
        _i = "scrollTop",
        vi = function () {
          return (ri && ri.isPressed) || ui.cache++;
        },
        yi = function (t, e) {
          var r = function r(n) {
            if (n || 0 === n) {
              oi && (Gn.history.scrollRestoration = "manual");
              var i = ri && ri.isPressed;
              (n = r.v = Math.round(n) || (ri && ri.iOS ? 1 : 0)),
                t(n),
                (r.cacheID = ui.cache),
                i && hi("ss", n);
            } else
              (e || ui.cache !== r.cacheID || hi("ref")) &&
                ((r.cacheID = ui.cache), (r.v = t()));
            return r.v + r.offset;
          };
          return (r.offset = 0), t && r;
        },
        xi = {
          s: mi,
          p: "left",
          p2: "Left",
          os: "right",
          os2: "Right",
          d: "width",
          d2: "Width",
          a: "x",
          sc: yi(function (t) {
            return arguments.length
              ? Gn.scrollTo(t, bi.sc())
              : Gn.pageXOffset || Qn[mi] || $n[mi] || Zn[mi] || 0;
          }),
        },
        bi = {
          s: _i,
          p: "top",
          p2: "Top",
          os: "bottom",
          os2: "Bottom",
          d: "height",
          d2: "Height",
          a: "y",
          op: xi,
          sc: yi(function (t) {
            return arguments.length
              ? Gn.scrollTo(xi.sc(), t)
              : Gn.pageYOffset || Qn[_i] || $n[_i] || Zn[_i] || 0;
          }),
        },
        wi = function (t, e) {
          return (
            ((e && e._ctx && e._ctx.selector) || Hn.utils.toArray)(t)[0] ||
            ("string" == typeof t && !1 !== Hn.config().nullTargetWarn
              ? console.warn("Element not found:", t)
              : null)
          );
        },
        Ti = function (t, e) {
          var r = e.s,
            n = e.sc;
          pi(t) && (t = Qn.scrollingElement || $n);
          var i = ui.indexOf(t),
            s = n === bi.sc ? 1 : 2;
          !~i && (i = ui.push(t) - 1), ui[i + s] || di(t, "scroll", vi);
          var o = ui[i + s],
            a =
              o ||
              (ui[i + s] =
                yi(fi(t, r), !0) ||
                (pi(t)
                  ? n
                  : yi(function (e) {
                      return arguments.length ? (t[r] = e) : t[r];
                    })));
          return (
            (a.target = t),
            o || (a.smooth = "smooth" === Hn.getProperty(t, "scrollBehavior")),
            a
          );
        },
        ki = function (t, e, r) {
          var n = t,
            i = t,
            s = ci(),
            o = s,
            a = e || 50,
            u = Math.max(500, 3 * a),
            l = function (t, e) {
              var u = ci();
              e || u - s > a
                ? ((i = n), (n = t), (o = s), (s = u))
                : r
                ? (n += t)
                : (n = i + ((t - i) / (u - o)) * (s - o));
            };
          return {
            update: l,
            reset: function () {
              (i = n = r ? 0 : n), (o = s = 0);
            },
            getVelocity: function (t) {
              var e = o,
                a = i,
                c = ci();
              return (
                (t || 0 === t) && t !== n && l(t),
                s === o || c - o > u
                  ? 0
                  : ((n + (r ? a : -a)) / ((r ? c : s) - e)) * 1e3
              );
            },
          };
        },
        Ei = function (t, e) {
          return (
            e && !t._gsapAllow && t.preventDefault(),
            t.changedTouches ? t.changedTouches[0] : t
          );
        },
        Mi = function (t) {
          var e = Math.max.apply(Math, t),
            r = Math.min.apply(Math, t);
          return Math.abs(e) >= Math.abs(r) ? e : r;
        },
        Ci = function () {
          var t, e, r, n;
          (ti = Hn.core.globals().ScrollTrigger) &&
            ti.core &&
            ((t = ti.core),
            (e = t.bridge || {}),
            (r = t._scrollers),
            (n = t._proxies),
            r.push.apply(r, ui),
            n.push.apply(n, li),
            (ui = r),
            (li = n),
            (hi = function (t, r) {
              return e[t](r);
            }));
        },
        Oi = function (t) {
          return (
            (Hn = t || si()) &&
              "undefined" != typeof document &&
              document.body &&
              ((Gn = window),
              (Qn = document),
              ($n = Qn.documentElement),
              (Zn = Qn.body),
              (ei = [Gn, Qn, $n, Zn]),
              Hn.utils.clamp,
              (ii = Hn.core.context || function () {}),
              (Kn = "onpointerenter" in Zn ? "pointer" : "mouse"),
              (Jn = Si.isTouch =
                Gn.matchMedia &&
                Gn.matchMedia("(hover: none), (pointer: coarse)").matches
                  ? 1
                  : "ontouchstart" in Gn ||
                    navigator.maxTouchPoints > 0 ||
                    navigator.msMaxTouchPoints > 0
                  ? 2
                  : 0),
              (ni = Si.eventTypes =
                (
                  "ontouchstart" in $n
                    ? "touchstart,touchmove,touchcancel,touchend"
                    : "onpointerdown" in $n
                    ? "pointerdown,pointermove,pointercancel,pointerup"
                    : "mousedown,mousemove,mouseup,mouseup"
                ).split(",")),
              setTimeout(function () {
                return (oi = 0);
              }, 500),
              Ci(),
              (Vn = 1)),
            Vn
          );
        };
      (xi.op = bi), (ui.cache = 0);
      var Si = (function () {
        function t(t) {
          this.init(t);
        }
        var e, r;
        return (
          (t.prototype.init = function (t) {
            Vn ||
              Oi(Hn) ||
              console.warn("Please gsap.registerPlugin(Observer)"),
              ti || Ci();
            var e = t.tolerance,
              r = t.dragMinimum,
              n = t.type,
              i = t.target,
              s = t.lineHeight,
              o = t.debounce,
              a = t.preventDefault,
              u = t.onStop,
              l = t.onStopDelay,
              c = t.ignore,
              h = t.wheelSpeed,
              f = t.event,
              p = t.onDragStart,
              d = t.onDragEnd,
              g = t.onDrag,
              m = t.onPress,
              _ = t.onRelease,
              v = t.onRight,
              y = t.onLeft,
              x = t.onUp,
              b = t.onDown,
              w = t.onChangeX,
              T = t.onChangeY,
              k = t.onChange,
              E = t.onToggleX,
              M = t.onToggleY,
              C = t.onHover,
              O = t.onHoverEnd,
              S = t.onMove,
              A = t.ignoreCheck,
              P = t.isNormalizer,
              D = t.onGestureStart,
              R = t.onGestureEnd,
              I = t.onWheel,
              z = t.onEnable,
              L = t.onDisable,
              B = t.onClick,
              F = t.scrollSpeed,
              Y = t.capture,
              q = t.allowClicks,
              N = t.lockAxis,
              X = t.onLockAxis;
            (this.target = i = wi(i) || $n),
              (this.vars = t),
              c && (c = Hn.utils.toArray(c)),
              (e = e || 1e-9),
              (r = r || 0),
              (h = h || 1),
              (F = F || 1),
              (n = n || "wheel,touch,pointer"),
              (o = !1 !== o),
              s || (s = parseFloat(Gn.getComputedStyle(Zn).lineHeight) || 22);
            var j,
              U,
              W,
              H,
              V,
              G,
              Q,
              $ = this,
              Z = 0,
              J = 0,
              K = Ti(i, xi),
              tt = Ti(i, bi),
              et = K(),
              rt = tt(),
              nt =
                ~n.indexOf("touch") &&
                !~n.indexOf("pointer") &&
                "pointerdown" === ni[0],
              it = pi(i),
              st = i.ownerDocument || Qn,
              ot = [0, 0, 0],
              at = [0, 0, 0],
              ut = 0,
              lt = function () {
                return (ut = ci());
              },
              ct = function (t, e) {
                return (
                  (($.event = t) && c && ~c.indexOf(t.target)) ||
                  (e && nt && "touch" !== t.pointerType) ||
                  (A && A(t, e))
                );
              },
              ht = function () {
                var t = ($.deltaX = Mi(ot)),
                  r = ($.deltaY = Mi(at)),
                  n = Math.abs(t) >= e,
                  i = Math.abs(r) >= e;
                k && (n || i) && k($, t, r, ot, at),
                  n &&
                    (v && $.deltaX > 0 && v($),
                    y && $.deltaX < 0 && y($),
                    w && w($),
                    E && $.deltaX < 0 != Z < 0 && E($),
                    (Z = $.deltaX),
                    (ot[0] = ot[1] = ot[2] = 0)),
                  i &&
                    (b && $.deltaY > 0 && b($),
                    x && $.deltaY < 0 && x($),
                    T && T($),
                    M && $.deltaY < 0 != J < 0 && M($),
                    (J = $.deltaY),
                    (at[0] = at[1] = at[2] = 0)),
                  (H || W) && (S && S($), W && (g($), (W = !1)), (H = !1)),
                  G && !(G = !1) && X && X($),
                  V && (I($), (V = !1)),
                  (j = 0);
              },
              ft = function (t, e, r) {
                (ot[r] += t),
                  (at[r] += e),
                  $._vx.update(t),
                  $._vy.update(e),
                  o ? j || (j = requestAnimationFrame(ht)) : ht();
              },
              pt = function (t, e) {
                N &&
                  !Q &&
                  (($.axis = Q = Math.abs(t) > Math.abs(e) ? "x" : "y"),
                  (G = !0)),
                  "y" !== Q && ((ot[2] += t), $._vx.update(t, !0)),
                  "x" !== Q && ((at[2] += e), $._vy.update(e, !0)),
                  o ? j || (j = requestAnimationFrame(ht)) : ht();
              },
              dt = function (t) {
                if (!ct(t, 1)) {
                  var e = (t = Ei(t, a)).clientX,
                    n = t.clientY,
                    i = e - $.x,
                    s = n - $.y,
                    o = $.isDragging;
                  ($.x = e),
                    ($.y = n),
                    (o ||
                      Math.abs($.startX - e) >= r ||
                      Math.abs($.startY - n) >= r) &&
                      (g && (W = !0),
                      o || ($.isDragging = !0),
                      pt(i, s),
                      o || (p && p($)));
                }
              },
              gt = ($.onPress = function (t) {
                ct(t, 1) ||
                  (t && t.button) ||
                  (($.axis = Q = null),
                  U.pause(),
                  ($.isPressed = !0),
                  (t = Ei(t)),
                  (Z = J = 0),
                  ($.startX = $.x = t.clientX),
                  ($.startY = $.y = t.clientY),
                  $._vx.reset(),
                  $._vy.reset(),
                  di(P ? i : st, ni[1], dt, a, !0),
                  ($.deltaX = $.deltaY = 0),
                  m && m($));
              }),
              mt = ($.onRelease = function (t) {
                if (!ct(t, 1)) {
                  gi(P ? i : st, ni[1], dt, !0);
                  var e = !isNaN($.y - $.startY),
                    r =
                      $.isDragging &&
                      (Math.abs($.x - $.startX) > 3 ||
                        Math.abs($.y - $.startY) > 3),
                    n = Ei(t);
                  !r &&
                    e &&
                    ($._vx.reset(),
                    $._vy.reset(),
                    a &&
                      q &&
                      Hn.delayedCall(0.08, function () {
                        if (ci() - ut > 300 && !t.defaultPrevented)
                          if (t.target.click) t.target.click();
                          else if (st.createEvent) {
                            var e = st.createEvent("MouseEvents");
                            e.initMouseEvent(
                              "click",
                              !0,
                              !0,
                              Gn,
                              1,
                              n.screenX,
                              n.screenY,
                              n.clientX,
                              n.clientY,
                              !1,
                              !1,
                              !1,
                              !1,
                              0,
                              null
                            ),
                              t.target.dispatchEvent(e);
                          }
                      })),
                    ($.isDragging = $.isGesturing = $.isPressed = !1),
                    u && !P && U.restart(!0),
                    d && r && d($),
                    _ && _($, r);
                }
              }),
              _t = function (t) {
                return (
                  t.touches &&
                  t.touches.length > 1 &&
                  ($.isGesturing = !0) &&
                  D(t, $.isDragging)
                );
              },
              vt = function () {
                return ($.isGesturing = !1) || R($);
              },
              yt = function (t) {
                if (!ct(t)) {
                  var e = K(),
                    r = tt();
                  ft((e - et) * F, (r - rt) * F, 1),
                    (et = e),
                    (rt = r),
                    u && U.restart(!0);
                }
              },
              xt = function (t) {
                if (!ct(t)) {
                  (t = Ei(t, a)), I && (V = !0);
                  var e =
                    (1 === t.deltaMode
                      ? s
                      : 2 === t.deltaMode
                      ? Gn.innerHeight
                      : 1) * h;
                  ft(t.deltaX * e, t.deltaY * e, 0), u && !P && U.restart(!0);
                }
              },
              bt = function (t) {
                if (!ct(t)) {
                  var e = t.clientX,
                    r = t.clientY,
                    n = e - $.x,
                    i = r - $.y;
                  ($.x = e), ($.y = r), (H = !0), (n || i) && pt(n, i);
                }
              },
              wt = function (t) {
                ($.event = t), C($);
              },
              Tt = function (t) {
                ($.event = t), O($);
              },
              kt = function (t) {
                return ct(t) || (Ei(t, a) && B($));
              };
            (U = $._dc =
              Hn.delayedCall(l || 0.25, function () {
                $._vx.reset(), $._vy.reset(), U.pause(), u && u($);
              }).pause()),
              ($.deltaX = $.deltaY = 0),
              ($._vx = ki(0, 50, !0)),
              ($._vy = ki(0, 50, !0)),
              ($.scrollX = K),
              ($.scrollY = tt),
              ($.isDragging = $.isGesturing = $.isPressed = !1),
              ii(this),
              ($.enable = function (t) {
                return (
                  $.isEnabled ||
                    (di(it ? st : i, "scroll", vi),
                    n.indexOf("scroll") >= 0 &&
                      di(it ? st : i, "scroll", yt, a, Y),
                    n.indexOf("wheel") >= 0 && di(i, "wheel", xt, a, Y),
                    ((n.indexOf("touch") >= 0 && Jn) ||
                      n.indexOf("pointer") >= 0) &&
                      (di(i, ni[0], gt, a, Y),
                      di(st, ni[2], mt),
                      di(st, ni[3], mt),
                      q && di(i, "click", lt, !1, !0),
                      B && di(i, "click", kt),
                      D && di(st, "gesturestart", _t),
                      R && di(st, "gestureend", vt),
                      C && di(i, Kn + "enter", wt),
                      O && di(i, Kn + "leave", Tt),
                      S && di(i, Kn + "move", bt)),
                    ($.isEnabled = !0),
                    t && t.type && gt(t),
                    z && z($)),
                  $
                );
              }),
              ($.disable = function () {
                $.isEnabled &&
                  (ai.filter(function (t) {
                    return t !== $ && pi(t.target);
                  }).length || gi(it ? st : i, "scroll", vi),
                  $.isPressed &&
                    ($._vx.reset(),
                    $._vy.reset(),
                    gi(P ? i : st, ni[1], dt, !0)),
                  gi(it ? st : i, "scroll", yt, Y),
                  gi(i, "wheel", xt, Y),
                  gi(i, ni[0], gt, Y),
                  gi(st, ni[2], mt),
                  gi(st, ni[3], mt),
                  gi(i, "click", lt, !0),
                  gi(i, "click", kt),
                  gi(st, "gesturestart", _t),
                  gi(st, "gestureend", vt),
                  gi(i, Kn + "enter", wt),
                  gi(i, Kn + "leave", Tt),
                  gi(i, Kn + "move", bt),
                  ($.isEnabled = $.isPressed = $.isDragging = !1),
                  L && L($));
              }),
              ($.kill = $.revert =
                function () {
                  $.disable();
                  var t = ai.indexOf($);
                  t >= 0 && ai.splice(t, 1), ri === $ && (ri = 0);
                }),
              ai.push($),
              P && pi(i) && (ri = $),
              $.enable(f);
          }),
          (e = t),
          (r = [
            {
              key: "velocityX",
              get: function () {
                return this._vx.getVelocity();
              },
            },
            {
              key: "velocityY",
              get: function () {
                return this._vy.getVelocity();
              },
            },
          ]) && Wn(e.prototype, r),
          t
        );
      })();
      (Si.version = "3.12.2"),
        (Si.create = function (t) {
          return new Si(t);
        }),
        (Si.register = Oi),
        (Si.getAll = function () {
          return ai.slice();
        }),
        (Si.getById = function (t) {
          return ai.filter(function (e) {
            return e.vars.id === t;
          })[0];
        }),
        si() && Hn.registerPlugin(Si);
      var Ai,
        Pi,
        Di,
        Ri,
        Ii,
        zi,
        Li,
        Bi,
        Fi,
        Yi,
        qi,
        Ni,
        Xi,
        ji,
        Ui,
        Wi,
        Hi,
        Vi,
        Gi,
        Qi,
        $i,
        Zi,
        Ji,
        Ki,
        ts,
        es,
        rs,
        ns,
        is,
        ss,
        os,
        as,
        us,
        ls,
        cs,
        hs,
        fs = 1,
        ps = Date.now,
        ds = ps(),
        gs = 0,
        ms = 0,
        _s = function (t, e, r) {
          var n =
            Ps(t) && ("clamp(" === t.substr(0, 6) || t.indexOf("max") > -1);
          return (r["_" + e + "Clamp"] = n), n ? t.substr(6, t.length - 7) : t;
        },
        vs = function (t, e) {
          return !e || (Ps(t) && "clamp(" === t.substr(0, 6))
            ? t
            : "clamp(" + t + ")";
        },
        ys = function t() {
          return ms && requestAnimationFrame(t);
        },
        xs = function () {
          return (ji = 1);
        },
        bs = function () {
          return (ji = 0);
        },
        ws = function (t) {
          return t;
        },
        Ts = function (t) {
          return Math.round(1e5 * t) / 1e5 || 0;
        },
        ks = function () {
          return "undefined" != typeof window;
        },
        Es = function () {
          return Ai || (ks() && (Ai = window.gsap) && Ai.registerPlugin && Ai);
        },
        Ms = function (t) {
          return !!~Li.indexOf(t);
        },
        Cs = function (t) {
          return (
            ("Height" === t ? os : Di["inner" + t]) ||
            Ii["client" + t] ||
            zi["client" + t]
          );
        },
        Os = function (t) {
          return (
            fi(t, "getBoundingClientRect") ||
            (Ms(t)
              ? function () {
                  return (No.width = Di.innerWidth), (No.height = os), No;
                }
              : function () {
                  return to(t);
                })
          );
        },
        Ss = function (t, e) {
          var r = e.s,
            n = e.d2,
            i = e.d,
            s = e.a;
          return Math.max(
            0,
            (r = "scroll" + n) && (s = fi(t, r))
              ? s() - Os(t)()[i]
              : Ms(t)
              ? (Ii[r] || zi[r]) - Cs(n)
              : t[r] - t["offset" + n]
          );
        },
        As = function (t, e) {
          for (var r = 0; r < Gi.length; r += 3)
            (!e || ~e.indexOf(Gi[r + 1])) && t(Gi[r], Gi[r + 1], Gi[r + 2]);
        },
        Ps = function (t) {
          return "string" == typeof t;
        },
        Ds = function (t) {
          return "function" == typeof t;
        },
        Rs = function (t) {
          return "number" == typeof t;
        },
        Is = function (t) {
          return "object" == typeof t;
        },
        zs = function (t, e, r) {
          return t && t.progress(e ? 0 : 1) && r && t.pause();
        },
        Ls = function (t, e) {
          if (t.enabled) {
            var r = e(t);
            r && r.totalTime && (t.callbackAnimation = r);
          }
        },
        Bs = Math.abs,
        Fs = "left",
        Ys = "right",
        qs = "bottom",
        Ns = "width",
        Xs = "height",
        js = "Right",
        Us = "Left",
        Ws = "Top",
        Hs = "Bottom",
        Vs = "padding",
        Gs = "margin",
        Qs = "Width",
        $s = "Height",
        Zs = "px",
        Js = function (t) {
          return Di.getComputedStyle(t);
        },
        Ks = function (t, e) {
          for (var r in e) r in t || (t[r] = e[r]);
          return t;
        },
        to = function (t, e) {
          var r =
              e &&
              "matrix(1, 0, 0, 1, 0, 0)" !== Js(t)[Ui] &&
              Ai.to(t, {
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
                rotation: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                skewX: 0,
                skewY: 0,
              }).progress(1),
            n = t.getBoundingClientRect();
          return r && r.progress(0).kill(), n;
        },
        eo = function (t, e) {
          var r = e.d2;
          return t["offset" + r] || t["client" + r] || 0;
        },
        ro = function (t) {
          var e,
            r = [],
            n = t.labels,
            i = t.duration();
          for (e in n) r.push(n[e] / i);
          return r;
        },
        no = function (t) {
          var e = Ai.utils.snap(t),
            r =
              Array.isArray(t) &&
              t.slice(0).sort(function (t, e) {
                return t - e;
              });
          return r
            ? function (t, n, i) {
                var s;
                if ((void 0 === i && (i = 0.001), !n)) return e(t);
                if (n > 0) {
                  for (t -= i, s = 0; s < r.length; s++)
                    if (r[s] >= t) return r[s];
                  return r[s - 1];
                }
                for (s = r.length, t += i; s--; ) if (r[s] <= t) return r[s];
                return r[0];
              }
            : function (r, n, i) {
                void 0 === i && (i = 0.001);
                var s = e(r);
                return !n || Math.abs(s - r) < i || s - r < 0 == n < 0
                  ? s
                  : e(n < 0 ? r - t : r + t);
              };
        },
        io = function (t, e, r, n) {
          return r.split(",").forEach(function (r) {
            return t(e, r, n);
          });
        },
        so = function (t, e, r, n, i) {
          return t.addEventListener(e, r, { passive: !n, capture: !!i });
        },
        oo = function (t, e, r, n) {
          return t.removeEventListener(e, r, !!n);
        },
        ao = function (t, e, r) {
          (r = r && r.wheelHandler) && (t(e, "wheel", r), t(e, "touchmove", r));
        },
        uo = {
          startColor: "green",
          endColor: "red",
          indent: 0,
          fontSize: "16px",
          fontWeight: "normal",
        },
        lo = { toggleActions: "play", anticipatePin: 0 },
        co = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
        ho = function (t, e) {
          if (Ps(t)) {
            var r = t.indexOf("="),
              n = ~r ? +(t.charAt(r - 1) + 1) * parseFloat(t.substr(r + 1)) : 0;
            ~r &&
              (t.indexOf("%") > r && (n *= e / 100), (t = t.substr(0, r - 1))),
              (t =
                n +
                (t in co
                  ? co[t] * e
                  : ~t.indexOf("%")
                  ? (parseFloat(t) * e) / 100
                  : parseFloat(t) || 0));
          }
          return t;
        },
        fo = function (t, e, r, n, i, s, o, a) {
          var u = i.startColor,
            l = i.endColor,
            c = i.fontSize,
            h = i.indent,
            f = i.fontWeight,
            p = Ri.createElement("div"),
            d = Ms(r) || "fixed" === fi(r, "pinType"),
            g = -1 !== t.indexOf("scroller"),
            m = d ? zi : r,
            _ = -1 !== t.indexOf("start"),
            v = _ ? u : l,
            y =
              "border-color:" +
              v +
              ";font-size:" +
              c +
              ";color:" +
              v +
              ";font-weight:" +
              f +
              ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
          return (
            (y += "position:" + ((g || a) && d ? "fixed;" : "absolute;")),
            (g || a || !d) &&
              (y += (n === bi ? Ys : qs) + ":" + (s + parseFloat(h)) + "px;"),
            o &&
              (y +=
                "box-sizing:border-box;text-align:left;width:" +
                o.offsetWidth +
                "px;"),
            (p._isStart = _),
            p.setAttribute(
              "class",
              "gsap-marker-" + t + (e ? " marker-" + e : "")
            ),
            (p.style.cssText = y),
            (p.innerText = e || 0 === e ? t + "-" + e : t),
            m.children[0] ? m.insertBefore(p, m.children[0]) : m.appendChild(p),
            (p._offset = p["offset" + n.op.d2]),
            po(p, 0, n, _),
            p
          );
        },
        po = function (t, e, r, n) {
          var i = { display: "block" },
            s = r[n ? "os2" : "p2"],
            o = r[n ? "p2" : "os2"];
          (t._isFlipped = n),
            (i[r.a + "Percent"] = n ? -100 : 0),
            (i[r.a] = n ? "1px" : 0),
            (i["border" + s + Qs] = 1),
            (i["border" + o + Qs] = 0),
            (i[r.p] = e + "px"),
            Ai.set(t, i);
        },
        go = [],
        mo = {},
        _o = function () {
          return ps() - gs > 34 && (us || (us = requestAnimationFrame(Io)));
        },
        vo = function () {
          (!Ji || !Ji.isPressed || Ji.startX > zi.clientWidth) &&
            (ui.cache++,
            Ji ? us || (us = requestAnimationFrame(Io)) : Io(),
            gs || ko("scrollStart"),
            (gs = ps()));
        },
        yo = function () {
          (es = Di.innerWidth), (ts = Di.innerHeight);
        },
        xo = function () {
          ui.cache++,
            !Xi &&
              !Zi &&
              !Ri.fullscreenElement &&
              !Ri.webkitFullscreenElement &&
              (!Ki ||
                es !== Di.innerWidth ||
                Math.abs(Di.innerHeight - ts) > 0.25 * Di.innerHeight) &&
              Bi.restart(!0);
        },
        bo = {},
        wo = [],
        To = function t() {
          return oo(Go, "scrollEnd", t) || Po(!0);
        },
        ko = function (t) {
          return (
            (bo[t] &&
              bo[t].map(function (t) {
                return t();
              })) ||
            wo
          );
        },
        Eo = [],
        Mo = function (t) {
          for (var e = 0; e < Eo.length; e += 5)
            (!t || (Eo[e + 4] && Eo[e + 4].query === t)) &&
              ((Eo[e].style.cssText = Eo[e + 1]),
              Eo[e].getBBox && Eo[e].setAttribute("transform", Eo[e + 2] || ""),
              (Eo[e + 3].uncache = 1));
        },
        Co = function (t, e) {
          var r;
          for (Wi = 0; Wi < go.length; Wi++)
            !(r = go[Wi]) ||
              (e && r._ctx !== e) ||
              (t ? r.kill(1) : r.revert(!0, !0));
          e && Mo(e), e || ko("revert");
        },
        Oo = function (t, e) {
          ui.cache++,
            (e || !ls) &&
              ui.forEach(function (t) {
                return Ds(t) && t.cacheID++ && (t.rec = 0);
              }),
            Ps(t) && (Di.history.scrollRestoration = is = t);
        },
        So = 0,
        Ao = function () {
          zi.appendChild(ss),
            (os = ss.offsetHeight || Di.innerHeight),
            zi.removeChild(ss);
        },
        Po = function (t, e) {
          if (!gs || t) {
            Ao(),
              (ls = Go.isRefreshing = !0),
              ui.forEach(function (t) {
                return Ds(t) && ++t.cacheID && (t.rec = t());
              });
            var r = ko("refreshInit");
            Qi && Go.sort(),
              e || Co(),
              ui.forEach(function (t) {
                Ds(t) &&
                  (t.smooth && (t.target.style.scrollBehavior = "auto"), t(0));
              }),
              go.slice(0).forEach(function (t) {
                return t.refresh();
              }),
              go.forEach(function (t, e) {
                if (t._subPinOffset && t.pin) {
                  var r = t.vars.horizontal ? "offsetWidth" : "offsetHeight",
                    n = t.pin[r];
                  t.revert(!0, 1),
                    t.adjustPinSpacing(t.pin[r] - n),
                    t.refresh();
                }
              }),
              go.forEach(function (t) {
                var e = Ss(t.scroller, t._dir);
                ("max" === t.vars.end || (t._endClamp && t.end > e)) &&
                  t.setPositions(t.start, Math.max(t.start + 1, e), !0);
              }),
              r.forEach(function (t) {
                return t && t.render && t.render(-1);
              }),
              ui.forEach(function (t) {
                Ds(t) &&
                  (t.smooth &&
                    requestAnimationFrame(function () {
                      return (t.target.style.scrollBehavior = "smooth");
                    }),
                  t.rec && t(t.rec));
              }),
              Oo(is, 1),
              Bi.pause(),
              So++,
              (ls = 2),
              Io(2),
              go.forEach(function (t) {
                return Ds(t.vars.onRefresh) && t.vars.onRefresh(t);
              }),
              (ls = Go.isRefreshing = !1),
              ko("refresh");
          } else so(Go, "scrollEnd", To);
        },
        Do = 0,
        Ro = 1,
        Io = function (t) {
          if (!ls || 2 === t) {
            (Go.isUpdating = !0), hs && hs.update(0);
            var e = go.length,
              r = ps(),
              n = r - ds >= 50,
              i = e && go[0].scroll();
            if (
              ((Ro = Do > i ? -1 : 1),
              ls || (Do = i),
              n &&
                (gs && !ji && r - gs > 200 && ((gs = 0), ko("scrollEnd")),
                (qi = ds),
                (ds = r)),
              Ro < 0)
            ) {
              for (Wi = e; Wi-- > 0; ) go[Wi] && go[Wi].update(0, n);
              Ro = 1;
            } else for (Wi = 0; Wi < e; Wi++) go[Wi] && go[Wi].update(0, n);
            Go.isUpdating = !1;
          }
          us = 0;
        },
        zo = [
          Fs,
          "top",
          qs,
          Ys,
          Gs + Hs,
          Gs + js,
          Gs + Ws,
          Gs + Us,
          "display",
          "flexShrink",
          "float",
          "zIndex",
          "gridColumnStart",
          "gridColumnEnd",
          "gridRowStart",
          "gridRowEnd",
          "gridArea",
          "justifySelf",
          "alignSelf",
          "placeSelf",
          "order",
        ],
        Lo = zo.concat([
          Ns,
          Xs,
          "boxSizing",
          "max" + Qs,
          "max" + $s,
          "position",
          Gs,
          Vs,
          Vs + Ws,
          Vs + js,
          Vs + Hs,
          Vs + Us,
        ]),
        Bo = function (t, e, r, n) {
          if (!t._gsap.swappedIn) {
            for (var i, s = zo.length, o = e.style, a = t.style; s--; )
              o[(i = zo[s])] = r[i];
            (o.position = "absolute" === r.position ? "absolute" : "relative"),
              "inline" === r.display && (o.display = "inline-block"),
              (a[qs] = a[Ys] = "auto"),
              (o.flexBasis = r.flexBasis || "auto"),
              (o.overflow = "visible"),
              (o.boxSizing = "border-box"),
              (o[Ns] = eo(t, xi) + Zs),
              (o[Xs] = eo(t, bi) + Zs),
              (o[Vs] = a[Gs] = a.top = a[Fs] = "0"),
              Yo(n),
              (a[Ns] = a["max" + Qs] = r[Ns]),
              (a[Xs] = a["max" + $s] = r[Xs]),
              (a[Vs] = r[Vs]),
              t.parentNode !== e &&
                (t.parentNode.insertBefore(e, t), e.appendChild(t)),
              (t._gsap.swappedIn = !0);
          }
        },
        Fo = /([A-Z])/g,
        Yo = function (t) {
          if (t) {
            var e,
              r,
              n = t.t.style,
              i = t.length,
              s = 0;
            for (
              (t.t._gsap || Ai.core.getCache(t.t)).uncache = 1;
              s < i;
              s += 2
            )
              (r = t[s + 1]),
                (e = t[s]),
                r
                  ? (n[e] = r)
                  : n[e] &&
                    n.removeProperty(e.replace(Fo, "-$1").toLowerCase());
          }
        },
        qo = function (t) {
          for (var e = Lo.length, r = t.style, n = [], i = 0; i < e; i++)
            n.push(Lo[i], r[Lo[i]]);
          return (n.t = t), n;
        },
        No = { left: 0, top: 0 },
        Xo = function (t, e, r, n, i, s, o, a, u, l, c, h, f, p) {
          Ds(t) && (t = t(a)),
            Ps(t) &&
              "max" === t.substr(0, 3) &&
              (t = h + ("=" === t.charAt(4) ? ho("0" + t.substr(3), r) : 0));
          var d,
            g,
            m,
            _ = f ? f.time() : 0;
          if ((f && f.seek(0), isNaN(t) || (t = +t), Rs(t)))
            f &&
              (t = Ai.utils.mapRange(
                f.scrollTrigger.start,
                f.scrollTrigger.end,
                0,
                h,
                t
              )),
              o && po(o, r, n, !0);
          else {
            Ds(e) && (e = e(a));
            var v,
              y,
              x,
              b,
              w = (t || "0").split(" ");
            (m = wi(e, a) || zi),
              ((v = to(m) || {}) && (v.left || v.top)) ||
                "none" !== Js(m).display ||
                ((b = m.style.display),
                (m.style.display = "block"),
                (v = to(m)),
                b ? (m.style.display = b) : m.style.removeProperty("display")),
              (y = ho(w[0], v[n.d])),
              (x = ho(w[1] || "0", r)),
              (t = v[n.p] - u[n.p] - l + y + i - x),
              o && po(o, x, n, r - x < 20 || (o._isStart && x > 20)),
              (r -= r - x);
          }
          if ((p && ((a[p] = t || -0.001), t < 0 && (t = 0)), s)) {
            var T = t + r,
              k = s._isStart;
            (d = "scroll" + n.d2),
              po(
                s,
                T,
                n,
                (k && T > 20) ||
                  (!k &&
                    (c ? Math.max(zi[d], Ii[d]) : s.parentNode[d]) <= T + 1)
              ),
              c &&
                ((u = to(o)),
                c && (s.style[n.op.p] = u[n.op.p] - n.op.m - s._offset + Zs));
          }
          return (
            f &&
              m &&
              ((d = to(m)),
              f.seek(h),
              (g = to(m)),
              (f._caScrollDist = d[n.p] - g[n.p]),
              (t = (t / f._caScrollDist) * h)),
            f && f.seek(_),
            f ? t : Math.round(t)
          );
        },
        jo = /(webkit|moz|length|cssText|inset)/i,
        Uo = function (t, e, r, n) {
          if (t.parentNode !== e) {
            var i,
              s,
              o = t.style;
            if (e === zi) {
              for (i in ((t._stOrig = o.cssText), (s = Js(t))))
                +i ||
                  jo.test(i) ||
                  !s[i] ||
                  "string" != typeof o[i] ||
                  "0" === i ||
                  (o[i] = s[i]);
              (o.top = r), (o.left = n);
            } else o.cssText = t._stOrig;
            (Ai.core.getCache(t).uncache = 1), e.appendChild(t);
          }
        },
        Wo = function (t, e, r) {
          var n = e,
            i = n;
          return function (e) {
            var s = Math.round(t());
            return (
              s !== n &&
                s !== i &&
                Math.abs(s - n) > 3 &&
                Math.abs(s - i) > 3 &&
                ((e = s), r && r()),
              (i = n),
              (n = e),
              e
            );
          };
        },
        Ho = function (t, e, r) {
          var n = {};
          (n[e.p] = "+=" + r), Ai.set(t, n);
        },
        Vo = function (t, e) {
          var r = Ti(t, e),
            n = "_scroll" + e.p2,
            i = function e(i, s, o, a, u) {
              var l = e.tween,
                c = s.onComplete,
                h = {};
              o = o || r();
              var f = Wo(r, o, function () {
                l.kill(), (e.tween = 0);
              });
              return (
                (u = (a && u) || 0),
                (a = a || i - o),
                l && l.kill(),
                (s[n] = i),
                (s.modifiers = h),
                (h[n] = function () {
                  return f(o + a * l.ratio + u * l.ratio * l.ratio);
                }),
                (s.onUpdate = function () {
                  ui.cache++, Io();
                }),
                (s.onComplete = function () {
                  (e.tween = 0), c && c.call(l);
                }),
                (l = e.tween = Ai.to(t, s))
              );
            };
          return (
            (t[n] = r),
            (r.wheelHandler = function () {
              return i.tween && i.tween.kill() && (i.tween = 0);
            }),
            so(t, "wheel", r.wheelHandler),
            Go.isTouch && so(t, "touchmove", r.wheelHandler),
            i
          );
        },
        Go = (function () {
          function t(e, r) {
            Pi ||
              t.register(Ai) ||
              console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
              ns(this),
              this.init(e, r);
          }
          return (
            (t.prototype.init = function (e, r) {
              if (
                ((this.progress = this.start = 0),
                this.vars && this.kill(!0, !0),
                ms)
              ) {
                var n,
                  i,
                  s,
                  o,
                  a,
                  u,
                  l,
                  c,
                  h,
                  f,
                  p,
                  d,
                  g,
                  m,
                  _,
                  v,
                  y,
                  x,
                  b,
                  w,
                  T,
                  k,
                  E,
                  M,
                  C,
                  O,
                  S,
                  A,
                  P,
                  D,
                  R,
                  I,
                  z,
                  L,
                  B,
                  F,
                  Y,
                  q,
                  N,
                  X,
                  j,
                  U,
                  W = (e = Ks(
                    Ps(e) || Rs(e) || e.nodeType ? { trigger: e } : e,
                    lo
                  )),
                  H = W.onUpdate,
                  V = W.toggleClass,
                  G = W.id,
                  Q = W.onToggle,
                  $ = W.onRefresh,
                  Z = W.scrub,
                  J = W.trigger,
                  K = W.pin,
                  tt = W.pinSpacing,
                  et = W.invalidateOnRefresh,
                  rt = W.anticipatePin,
                  nt = W.onScrubComplete,
                  it = W.onSnapComplete,
                  st = W.once,
                  ot = W.snap,
                  at = W.pinReparent,
                  ut = W.pinSpacer,
                  lt = W.containerAnimation,
                  ct = W.fastScrollEnd,
                  ht = W.preventOverlaps,
                  ft =
                    e.horizontal ||
                    (e.containerAnimation && !1 !== e.horizontal)
                      ? xi
                      : bi,
                  pt = !Z && 0 !== Z,
                  dt = wi(e.scroller || Di),
                  gt = Ai.core.getCache(dt),
                  mt = Ms(dt),
                  _t =
                    "fixed" ===
                    ("pinType" in e
                      ? e.pinType
                      : fi(dt, "pinType") || (mt && "fixed")),
                  vt = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack],
                  yt = pt && e.toggleActions.split(" "),
                  xt = "markers" in e ? e.markers : lo.markers,
                  bt = mt ? 0 : parseFloat(Js(dt)["border" + ft.p2 + Qs]) || 0,
                  wt = this,
                  Tt =
                    e.onRefreshInit &&
                    function () {
                      return e.onRefreshInit(wt);
                    },
                  kt = (function (t, e, r) {
                    var n = r.d,
                      i = r.d2,
                      s = r.a;
                    return (s = fi(t, "getBoundingClientRect"))
                      ? function () {
                          return s()[n];
                        }
                      : function () {
                          return (e ? Cs(i) : t["client" + i]) || 0;
                        };
                  })(dt, mt, ft),
                  Et = (function (t, e) {
                    return !e || ~li.indexOf(t)
                      ? Os(t)
                      : function () {
                          return No;
                        };
                  })(dt, mt),
                  Mt = 0,
                  Ct = 0,
                  Ot = 0,
                  St = Ti(dt, ft);
                if (
                  ((wt._startClamp = wt._endClamp = !1),
                  (wt._dir = ft),
                  (rt *= 45),
                  (wt.scroller = dt),
                  (wt.scroll = lt ? lt.time.bind(lt) : St),
                  (o = St()),
                  (wt.vars = e),
                  (r = r || e.animation),
                  "refreshPriority" in e &&
                    ((Qi = 1), -9999 === e.refreshPriority && (hs = wt)),
                  (gt.tweenScroll = gt.tweenScroll || {
                    top: Vo(dt, bi),
                    left: Vo(dt, xi),
                  }),
                  (wt.tweenTo = n = gt.tweenScroll[ft.p]),
                  (wt.scrubDuration = function (t) {
                    (z = Rs(t) && t)
                      ? I
                        ? I.duration(t)
                        : (I = Ai.to(r, {
                            ease: "expo",
                            totalProgress: "+=0",
                            duration: z,
                            paused: !0,
                            onComplete: function () {
                              return nt && nt(wt);
                            },
                          }))
                      : (I && I.progress(1).kill(), (I = 0));
                  }),
                  r &&
                    ((r.vars.lazy = !1),
                    (r._initted && !wt.isReverted) ||
                      (!1 !== r.vars.immediateRender &&
                        !1 !== e.immediateRender &&
                        r.duration() &&
                        r.render(0, !0, !0)),
                    (wt.animation = r.pause()),
                    (r.scrollTrigger = wt),
                    wt.scrubDuration(Z),
                    (D = 0),
                    G || (G = r.vars.id)),
                  ot &&
                    ((Is(ot) && !ot.push) || (ot = { snapTo: ot }),
                    "scrollBehavior" in zi.style &&
                      Ai.set(mt ? [zi, Ii] : dt, { scrollBehavior: "auto" }),
                    ui.forEach(function (t) {
                      return (
                        Ds(t) &&
                        t.target === (mt ? Ri.scrollingElement || Ii : dt) &&
                        (t.smooth = !1)
                      );
                    }),
                    (s = Ds(ot.snapTo)
                      ? ot.snapTo
                      : "labels" === ot.snapTo
                      ? (function (t) {
                          return function (e) {
                            return Ai.utils.snap(ro(t), e);
                          };
                        })(r)
                      : "labelsDirectional" === ot.snapTo
                      ? ((X = r),
                        function (t, e) {
                          return no(ro(X))(t, e.direction);
                        })
                      : !1 !== ot.directional
                      ? function (t, e) {
                          return no(ot.snapTo)(
                            t,
                            ps() - Ct < 500 ? 0 : e.direction
                          );
                        }
                      : Ai.utils.snap(ot.snapTo)),
                    (L = ot.duration || { min: 0.1, max: 2 }),
                    (L = Is(L) ? Yi(L.min, L.max) : Yi(L, L)),
                    (B = Ai.delayedCall(ot.delay || z / 2 || 0.1, function () {
                      var t = St(),
                        e = ps() - Ct < 500,
                        i = n.tween;
                      if (
                        !(e || Math.abs(wt.getVelocity()) < 10) ||
                        i ||
                        ji ||
                        Mt === t
                      )
                        wt.isActive && Mt !== t && B.restart(!0);
                      else {
                        var o = (t - u) / m,
                          a = r && !pt ? r.totalProgress() : o,
                          c = e ? 0 : ((a - R) / (ps() - qi)) * 1e3 || 0,
                          h = Ai.utils.clamp(
                            -o,
                            1 - o,
                            (Bs(c / 2) * c) / 0.185
                          ),
                          f = o + (!1 === ot.inertia ? 0 : h),
                          p = Yi(0, 1, s(f, wt)),
                          d = Math.round(u + p * m),
                          g = ot,
                          _ = g.onStart,
                          v = g.onInterrupt,
                          y = g.onComplete;
                        if (t <= l && t >= u && d !== t) {
                          if (i && !i._initted && i.data <= Bs(d - t)) return;
                          !1 === ot.inertia && (h = p - o),
                            n(
                              d,
                              {
                                duration: L(
                                  Bs(
                                    (0.185 * Math.max(Bs(f - a), Bs(p - a))) /
                                      c /
                                      0.05 || 0
                                  )
                                ),
                                ease: ot.ease || "power3",
                                data: Bs(d - t),
                                onInterrupt: function () {
                                  return B.restart(!0) && v && v(wt);
                                },
                                onComplete: function () {
                                  wt.update(),
                                    (Mt = St()),
                                    (D = R =
                                      r && !pt
                                        ? r.totalProgress()
                                        : wt.progress),
                                    it && it(wt),
                                    y && y(wt);
                                },
                              },
                              t,
                              h * m,
                              d - t - h * m
                            ),
                            _ && _(wt, n.tween);
                        }
                      }
                    }).pause())),
                  G && (mo[G] = wt),
                  (N =
                    (J = wt.trigger = wi(J || (!0 !== K && K))) &&
                    J._gsap &&
                    J._gsap.stRevert) && (N = N(wt)),
                  (K = !0 === K ? J : wi(K)),
                  Ps(V) && (V = { targets: J, className: V }),
                  K &&
                    (!1 === tt ||
                      tt === Gs ||
                      (tt =
                        !(
                          !tt &&
                          K.parentNode &&
                          K.parentNode.style &&
                          "flex" === Js(K.parentNode).display
                        ) && Vs),
                    (wt.pin = K),
                    (i = Ai.core.getCache(K)).spacer
                      ? (_ = i.pinState)
                      : (ut &&
                          ((ut = wi(ut)) &&
                            !ut.nodeType &&
                            (ut = ut.current || ut.nativeElement),
                          (i.spacerIsNative = !!ut),
                          ut && (i.spacerState = qo(ut))),
                        (i.spacer = x = ut || Ri.createElement("div")),
                        x.classList.add("pin-spacer"),
                        G && x.classList.add("pin-spacer-" + G),
                        (i.pinState = _ = qo(K))),
                    !1 !== e.force3D && Ai.set(K, { force3D: !0 }),
                    (wt.spacer = x = i.spacer),
                    (P = Js(K)),
                    (M = P[tt + ft.os2]),
                    (w = Ai.getProperty(K)),
                    (T = Ai.quickSetter(K, ft.a, Zs)),
                    Bo(K, x, P),
                    (y = qo(K))),
                  xt)
                ) {
                  (d = Is(xt) ? Ks(xt, uo) : uo),
                    (f = fo("scroller-start", G, dt, ft, d, 0)),
                    (p = fo("scroller-end", G, dt, ft, d, 0, f)),
                    (b = f["offset" + ft.op.d2]);
                  var At = wi(fi(dt, "content") || dt);
                  (c = this.markerStart = fo("start", G, At, ft, d, b, 0, lt)),
                    (h = this.markerEnd = fo("end", G, At, ft, d, b, 0, lt)),
                    lt && (q = Ai.quickSetter([c, h], ft.a, Zs)),
                    _t ||
                      (li.length && !0 === fi(dt, "fixedMarkers")) ||
                      ((U = Js((j = mt ? zi : dt)).position),
                      (j.style.position =
                        "absolute" === U || "fixed" === U ? U : "relative"),
                      Ai.set([f, p], { force3D: !0 }),
                      (O = Ai.quickSetter(f, ft.a, Zs)),
                      (A = Ai.quickSetter(p, ft.a, Zs)));
                }
                if (lt) {
                  var Pt = lt.vars.onUpdate,
                    Dt = lt.vars.onUpdateParams;
                  lt.eventCallback("onUpdate", function () {
                    wt.update(0, 0, 1), Pt && Pt.apply(lt, Dt || []);
                  });
                }
                if (
                  ((wt.previous = function () {
                    return go[go.indexOf(wt) - 1];
                  }),
                  (wt.next = function () {
                    return go[go.indexOf(wt) + 1];
                  }),
                  (wt.revert = function (t, e) {
                    if (!e) return wt.kill(!0);
                    var n = !1 !== t || !wt.enabled,
                      i = Xi;
                    n !== wt.isReverted &&
                      (n &&
                        ((F = Math.max(St(), wt.scroll.rec || 0)),
                        (Ot = wt.progress),
                        (Y = r && r.progress())),
                      c &&
                        [c, h, f, p].forEach(function (t) {
                          return (t.style.display = n ? "none" : "block");
                        }),
                      n && ((Xi = wt), wt.update(n)),
                      !K ||
                        (at && wt.isActive) ||
                        (n
                          ? (function (t, e, r) {
                              Yo(r);
                              var n = t._gsap;
                              if (n.spacerIsNative) Yo(n.spacerState);
                              else if (t._gsap.swappedIn) {
                                var i = e.parentNode;
                                i && (i.insertBefore(t, e), i.removeChild(e));
                              }
                              t._gsap.swappedIn = !1;
                            })(K, x, _)
                          : Bo(K, x, Js(K), C)),
                      n || wt.update(n),
                      (Xi = i),
                      (wt.isReverted = n));
                  }),
                  (wt.refresh = function (i, s, d, b) {
                    if ((!Xi && wt.enabled) || s)
                      if (K && i && gs) so(t, "scrollEnd", To);
                      else {
                        !ls && Tt && Tt(wt),
                          (Xi = wt),
                          n.tween && !d && (n.tween.kill(), (n.tween = 0)),
                          I && I.pause(),
                          et && r && r.revert({ kill: !1 }).invalidate(),
                          wt.isReverted || wt.revert(!0, !0),
                          (wt._subPinOffset = !1);
                        var T,
                          M,
                          O,
                          A,
                          P,
                          D,
                          R,
                          z,
                          L,
                          q,
                          N,
                          X,
                          j,
                          U = kt(),
                          W = Et(),
                          H = lt ? lt.duration() : Ss(dt, ft),
                          V = m <= 0.01,
                          G = 0,
                          Q = b || 0,
                          Z = Is(d) ? d.end : e.end,
                          rt = e.endTrigger || J,
                          nt = Is(d)
                            ? d.start
                            : e.start ||
                              (0 !== e.start && J ? (K ? "0 0" : "0 100%") : 0),
                          it = (wt.pinnedContainer =
                            e.pinnedContainer && wi(e.pinnedContainer, wt)),
                          st = (J && Math.max(0, go.indexOf(wt))) || 0,
                          ot = st;
                        for (
                          xt &&
                          Is(d) &&
                          ((X = Ai.getProperty(f, ft.p)),
                          (j = Ai.getProperty(p, ft.p)));
                          ot--;

                        )
                          (D = go[ot]).end || D.refresh(0, 1) || (Xi = wt),
                            !(R = D.pin) ||
                              (R !== J && R !== K && R !== it) ||
                              D.isReverted ||
                              (q || (q = []), q.unshift(D), D.revert(!0, !0)),
                            D !== go[ot] && (st--, ot--);
                        for (
                          Ds(nt) && (nt = nt(wt)),
                            nt = _s(nt, "start", wt),
                            u =
                              Xo(
                                nt,
                                J,
                                U,
                                ft,
                                St(),
                                c,
                                f,
                                wt,
                                W,
                                bt,
                                _t,
                                H,
                                lt,
                                wt._startClamp && "_startClamp"
                              ) || (K ? -0.001 : 0),
                            Ds(Z) && (Z = Z(wt)),
                            Ps(Z) &&
                              !Z.indexOf("+=") &&
                              (~Z.indexOf(" ")
                                ? (Z = (Ps(nt) ? nt.split(" ")[0] : "") + Z)
                                : ((G = ho(Z.substr(2), U)),
                                  (Z = Ps(nt)
                                    ? nt
                                    : (lt
                                        ? Ai.utils.mapRange(
                                            0,
                                            lt.duration(),
                                            lt.scrollTrigger.start,
                                            lt.scrollTrigger.end,
                                            u
                                          )
                                        : u) + G),
                                  (rt = J))),
                            Z = _s(Z, "end", wt),
                            l =
                              Math.max(
                                u,
                                Xo(
                                  Z || (rt ? "100% 0" : H),
                                  rt,
                                  U,
                                  ft,
                                  St() + G,
                                  h,
                                  p,
                                  wt,
                                  W,
                                  bt,
                                  _t,
                                  H,
                                  lt,
                                  wt._endClamp && "_endClamp"
                                )
                              ) || -0.001,
                            G = 0,
                            ot = st;
                          ot--;

                        )
                          (R = (D = go[ot]).pin) &&
                            D.start - D._pinPush <= u &&
                            !lt &&
                            D.end > 0 &&
                            ((T =
                              D.end -
                              (wt._startClamp
                                ? Math.max(0, D.start)
                                : D.start)),
                            ((R === J && D.start - D._pinPush < u) ||
                              R === it) &&
                              isNaN(nt) &&
                              (G += T * (1 - D.progress)),
                            R === K && (Q += T));
                        if (
                          ((u += G),
                          (l += G),
                          wt._startClamp && (wt._startClamp += G),
                          wt._endClamp &&
                            !ls &&
                            ((wt._endClamp = l || -0.001),
                            (l = Math.min(l, Ss(dt, ft)))),
                          (m = l - u || ((u -= 0.01) && 0.001)),
                          V &&
                            (Ot = Ai.utils.clamp(
                              0,
                              1,
                              Ai.utils.normalize(u, l, F)
                            )),
                          (wt._pinPush = Q),
                          c &&
                            G &&
                            (((T = {})[ft.a] = "+=" + G),
                            it && (T[ft.p] = "-=" + St()),
                            Ai.set([c, h], T)),
                          K)
                        )
                          (T = Js(K)),
                            (A = ft === bi),
                            (O = St()),
                            (k = parseFloat(w(ft.a)) + Q),
                            !H &&
                              l > 1 &&
                              ((N = {
                                style: (N = (
                                  mt ? Ri.scrollingElement || Ii : dt
                                ).style),
                                value: N["overflow" + ft.a.toUpperCase()],
                              }),
                              mt &&
                                "scroll" !==
                                  Js(zi)["overflow" + ft.a.toUpperCase()] &&
                                (N.style["overflow" + ft.a.toUpperCase()] =
                                  "scroll")),
                            Bo(K, x, T),
                            (y = qo(K)),
                            (M = to(K, !0)),
                            (z = _t && Ti(dt, A ? xi : bi)()),
                            tt &&
                              (((C = [tt + ft.os2, m + Q + Zs]).t = x),
                              (ot = tt === Vs ? eo(K, ft) + m + Q : 0) &&
                                C.push(ft.d, ot + Zs),
                              Yo(C),
                              it &&
                                go.forEach(function (t) {
                                  t.pin === it &&
                                    !1 !== t.vars.pinSpacing &&
                                    (t._subPinOffset = !0);
                                }),
                              _t && St(F)),
                            _t &&
                              (((P = {
                                top: M.top + (A ? O - u : z) + Zs,
                                left: M.left + (A ? z : O - u) + Zs,
                                boxSizing: "border-box",
                                position: "fixed",
                              })[Ns] = P["max" + Qs] =
                                Math.ceil(M.width) + Zs),
                              (P[Xs] = P["max" + $s] =
                                Math.ceil(M.height) + Zs),
                              (P[Gs] =
                                P[Gs + Ws] =
                                P[Gs + js] =
                                P[Gs + Hs] =
                                P[Gs + Us] =
                                  "0"),
                              (P[Vs] = T[Vs]),
                              (P[Vs + Ws] = T[Vs + Ws]),
                              (P[Vs + js] = T[Vs + js]),
                              (P[Vs + Hs] = T[Vs + Hs]),
                              (P[Vs + Us] = T[Vs + Us]),
                              (v = (function (t, e, r) {
                                for (
                                  var n, i = [], s = t.length, o = r ? 8 : 0;
                                  o < s;
                                  o += 2
                                )
                                  (n = t[o]),
                                    i.push(n, n in e ? e[n] : t[o + 1]);
                                return (i.t = t.t), i;
                              })(_, P, at)),
                              ls && St(0)),
                            r
                              ? ((L = r._initted),
                                $i(1),
                                r.render(r.duration(), !0, !0),
                                (E = w(ft.a) - k + m + Q),
                                (S = Math.abs(m - E) > 1),
                                _t && S && v.splice(v.length - 2, 2),
                                r.render(0, !0, !0),
                                L || r.invalidate(!0),
                                r.parent || r.totalTime(r.totalTime()),
                                $i(0))
                              : (E = m),
                            N &&
                              (N.value
                                ? (N.style["overflow" + ft.a.toUpperCase()] =
                                    N.value)
                                : N.style.removeProperty("overflow-" + ft.a));
                        else if (J && St() && !lt)
                          for (M = J.parentNode; M && M !== zi; )
                            M._pinOffset &&
                              ((u -= M._pinOffset), (l -= M._pinOffset)),
                              (M = M.parentNode);
                        q &&
                          q.forEach(function (t) {
                            return t.revert(!1, !0);
                          }),
                          (wt.start = u),
                          (wt.end = l),
                          (o = a = ls ? F : St()),
                          lt || ls || (o < F && St(F), (wt.scroll.rec = 0)),
                          wt.revert(!1, !0),
                          (Ct = ps()),
                          B && ((Mt = -1), B.restart(!0)),
                          (Xi = 0),
                          r &&
                            pt &&
                            (r._initted || Y) &&
                            r.progress() !== Y &&
                            r.progress(Y || 0, !0).render(r.time(), !0, !0),
                          (V || Ot !== wt.progress || lt) &&
                            (r &&
                              !pt &&
                              r.totalProgress(
                                lt && u < -0.001 && !Ot
                                  ? Ai.utils.normalize(u, l, 0)
                                  : Ot,
                                !0
                              ),
                            (wt.progress = V || (o - u) / m === Ot ? 0 : Ot)),
                          K &&
                            tt &&
                            (x._pinOffset = Math.round(wt.progress * E)),
                          I && I.invalidate(),
                          isNaN(X) ||
                            ((X -= Ai.getProperty(f, ft.p)),
                            (j -= Ai.getProperty(p, ft.p)),
                            Ho(f, ft, X),
                            Ho(c, ft, X - (b || 0)),
                            Ho(p, ft, j),
                            Ho(h, ft, j - (b || 0))),
                          V && !ls && wt.update(),
                          !$ || ls || g || ((g = !0), $(wt), (g = !1));
                      }
                  }),
                  (wt.getVelocity = function () {
                    return ((St() - a) / (ps() - qi)) * 1e3 || 0;
                  }),
                  (wt.endAnimation = function () {
                    zs(wt.callbackAnimation),
                      r &&
                        (I
                          ? I.progress(1)
                          : r.paused()
                          ? pt || zs(r, wt.direction < 0, 1)
                          : zs(r, r.reversed()));
                  }),
                  (wt.labelToScroll = function (t) {
                    return (
                      (r &&
                        r.labels &&
                        (u || wt.refresh() || u) +
                          (r.labels[t] / r.duration()) * m) ||
                      0
                    );
                  }),
                  (wt.getTrailing = function (t) {
                    var e = go.indexOf(wt),
                      r =
                        wt.direction > 0
                          ? go.slice(0, e).reverse()
                          : go.slice(e + 1);
                    return (
                      Ps(t)
                        ? r.filter(function (e) {
                            return e.vars.preventOverlaps === t;
                          })
                        : r
                    ).filter(function (t) {
                      return wt.direction > 0 ? t.end <= u : t.start >= l;
                    });
                  }),
                  (wt.update = function (t, e, i) {
                    if (!lt || i || t) {
                      var s,
                        c,
                        h,
                        p,
                        d,
                        g,
                        _,
                        b = !0 === ls ? F : wt.scroll(),
                        w = t ? 0 : (b - u) / m,
                        C = w < 0 ? 0 : w > 1 ? 1 : w || 0,
                        P = wt.progress;
                      if (
                        (e &&
                          ((a = o),
                          (o = lt ? St() : b),
                          ot &&
                            ((R = D), (D = r && !pt ? r.totalProgress() : C))),
                        rt &&
                          !C &&
                          K &&
                          !Xi &&
                          !fs &&
                          gs &&
                          u < b + ((b - a) / (ps() - qi)) * rt &&
                          (C = 1e-4),
                        C !== P && wt.enabled)
                      ) {
                        if (
                          ((p =
                            (d =
                              (s = wt.isActive = !!C && C < 1) !=
                              (!!P && P < 1)) || !!C != !!P),
                          (wt.direction = C > P ? 1 : -1),
                          (wt.progress = C),
                          p &&
                            !Xi &&
                            ((c = C && !P ? 0 : 1 === C ? 1 : 1 === P ? 2 : 3),
                            pt &&
                              ((h =
                                (!d && "none" !== yt[c + 1] && yt[c + 1]) ||
                                yt[c]),
                              (_ =
                                r &&
                                ("complete" === h ||
                                  "reset" === h ||
                                  h in r)))),
                          ht &&
                            (d || _) &&
                            (_ || Z || !r) &&
                            (Ds(ht)
                              ? ht(wt)
                              : wt.getTrailing(ht).forEach(function (t) {
                                  return t.endAnimation();
                                })),
                          pt ||
                            (!I || Xi || fs
                              ? r && r.totalProgress(C, !(!Xi || (!Ct && !t)))
                              : (I._dp._time - I._start !== I._time &&
                                  I.render(I._dp._time - I._start),
                                I.resetTo
                                  ? I.resetTo(
                                      "totalProgress",
                                      C,
                                      r._tTime / r._tDur
                                    )
                                  : ((I.vars.totalProgress = C),
                                    I.invalidate().restart()))),
                          K)
                        )
                          if ((t && tt && (x.style[tt + ft.os2] = M), _t)) {
                            if (p) {
                              if (
                                ((g =
                                  !t &&
                                  C > P &&
                                  l + 1 > b &&
                                  b + 1 >= Ss(dt, ft)),
                                at)
                              )
                                if (t || (!s && !g)) Uo(K, x);
                                else {
                                  var z = to(K, !0),
                                    L = b - u;
                                  Uo(
                                    K,
                                    zi,
                                    z.top + (ft === bi ? L : 0) + Zs,
                                    z.left + (ft === bi ? 0 : L) + Zs
                                  );
                                }
                              Yo(s || g ? v : y),
                                (S && C < 1 && s) ||
                                  T(k + (1 !== C || g ? 0 : E));
                            }
                          } else T(Ts(k + E * C));
                        ot && !n.tween && !Xi && !fs && B.restart(!0),
                          V &&
                            (d || (st && C && (C < 1 || !as))) &&
                            Fi(V.targets).forEach(function (t) {
                              return t.classList[s || st ? "add" : "remove"](
                                V.className
                              );
                            }),
                          H && !pt && !t && H(wt),
                          p && !Xi
                            ? (pt &&
                                (_ &&
                                  ("complete" === h
                                    ? r.pause().totalProgress(1)
                                    : "reset" === h
                                    ? r.restart(!0).pause()
                                    : "restart" === h
                                    ? r.restart(!0)
                                    : r[h]()),
                                H && H(wt)),
                              (!d && as) ||
                                (Q && d && Ls(wt, Q),
                                vt[c] && Ls(wt, vt[c]),
                                st && (1 === C ? wt.kill(!1, 1) : (vt[c] = 0)),
                                d ||
                                  (vt[(c = 1 === C ? 1 : 3)] && Ls(wt, vt[c]))),
                              ct &&
                                !s &&
                                Math.abs(wt.getVelocity()) >
                                  (Rs(ct) ? ct : 2500) &&
                                (zs(wt.callbackAnimation),
                                I
                                  ? I.progress(1)
                                  : zs(r, "reverse" === h ? 1 : !C, 1)))
                            : pt && H && !Xi && H(wt);
                      }
                      if (A) {
                        var Y = lt
                          ? (b / lt.duration()) * (lt._caScrollDist || 0)
                          : b;
                        O(Y + (f._isFlipped ? 1 : 0)), A(Y);
                      }
                      q && q((-b / lt.duration()) * (lt._caScrollDist || 0));
                    }
                  }),
                  (wt.enable = function (e, r) {
                    wt.enabled ||
                      ((wt.enabled = !0),
                      so(dt, "resize", xo),
                      mt || so(dt, "scroll", vo),
                      Tt && so(t, "refreshInit", Tt),
                      !1 !== e && ((wt.progress = Ot = 0), (o = a = Mt = St())),
                      !1 !== r && wt.refresh());
                  }),
                  (wt.getTween = function (t) {
                    return t && n ? n.tween : I;
                  }),
                  (wt.setPositions = function (t, e, r, n) {
                    if (lt) {
                      var i = lt.scrollTrigger,
                        s = lt.duration(),
                        o = i.end - i.start;
                      (t = i.start + (o * t) / s), (e = i.start + (o * e) / s);
                    }
                    wt.refresh(
                      !1,
                      !1,
                      {
                        start: vs(t, r && !!wt._startClamp),
                        end: vs(e, r && !!wt._endClamp),
                      },
                      n
                    ),
                      wt.update();
                  }),
                  (wt.adjustPinSpacing = function (t) {
                    if (C && t) {
                      var e = C.indexOf(ft.d) + 1;
                      (C[e] = parseFloat(C[e]) + t + Zs),
                        (C[1] = parseFloat(C[1]) + t + Zs),
                        Yo(C);
                    }
                  }),
                  (wt.disable = function (e, r) {
                    if (
                      wt.enabled &&
                      (!1 !== e && wt.revert(!0, !0),
                      (wt.enabled = wt.isActive = !1),
                      r || (I && I.pause()),
                      (F = 0),
                      i && (i.uncache = 1),
                      Tt && oo(t, "refreshInit", Tt),
                      B &&
                        (B.pause(), n.tween && n.tween.kill() && (n.tween = 0)),
                      !mt)
                    ) {
                      for (var s = go.length; s--; )
                        if (go[s].scroller === dt && go[s] !== wt) return;
                      oo(dt, "resize", xo), mt || oo(dt, "scroll", vo);
                    }
                  }),
                  (wt.kill = function (t, n) {
                    wt.disable(t, n), I && !n && I.kill(), G && delete mo[G];
                    var s = go.indexOf(wt);
                    s >= 0 && go.splice(s, 1),
                      s === Wi && Ro > 0 && Wi--,
                      (s = 0),
                      go.forEach(function (t) {
                        return t.scroller === wt.scroller && (s = 1);
                      }),
                      s || ls || (wt.scroll.rec = 0),
                      r &&
                        ((r.scrollTrigger = null),
                        t && r.revert({ kill: !1 }),
                        n || r.kill()),
                      c &&
                        [c, h, f, p].forEach(function (t) {
                          return t.parentNode && t.parentNode.removeChild(t);
                        }),
                      hs === wt && (hs = 0),
                      K &&
                        (i && (i.uncache = 1),
                        (s = 0),
                        go.forEach(function (t) {
                          return t.pin === K && s++;
                        }),
                        s || (i.spacer = 0)),
                      e.onKill && e.onKill(wt);
                  }),
                  go.push(wt),
                  wt.enable(!1, !1),
                  N && N(wt),
                  r && r.add && !m)
                ) {
                  var Rt = wt.update;
                  (wt.update = function () {
                    (wt.update = Rt), u || l || wt.refresh();
                  }),
                    Ai.delayedCall(0.01, wt.update),
                    (m = 0.01),
                    (u = l = 0);
                } else wt.refresh();
                K &&
                  (function () {
                    if (cs !== So) {
                      var t = (cs = So);
                      requestAnimationFrame(function () {
                        return t === So && Po(!0);
                      });
                    }
                  })();
              } else this.update = this.refresh = this.kill = ws;
            }),
            (t.register = function (e) {
              return (
                Pi ||
                  ((Ai = e || Es()),
                  ks() && window.document && t.enable(),
                  (Pi = ms)),
                Pi
              );
            }),
            (t.defaults = function (t) {
              if (t) for (var e in t) lo[e] = t[e];
              return lo;
            }),
            (t.disable = function (t, e) {
              (ms = 0),
                go.forEach(function (r) {
                  return r[e ? "kill" : "disable"](t);
                }),
                oo(Di, "wheel", vo),
                oo(Ri, "scroll", vo),
                clearInterval(Ni),
                oo(Ri, "touchcancel", ws),
                oo(zi, "touchstart", ws),
                io(oo, Ri, "pointerdown,touchstart,mousedown", xs),
                io(oo, Ri, "pointerup,touchend,mouseup", bs),
                Bi.kill(),
                As(oo);
              for (var r = 0; r < ui.length; r += 3)
                ao(oo, ui[r], ui[r + 1]), ao(oo, ui[r], ui[r + 2]);
            }),
            (t.enable = function () {
              if (
                ((Di = window),
                (Ri = document),
                (Ii = Ri.documentElement),
                (zi = Ri.body),
                Ai &&
                  ((Fi = Ai.utils.toArray),
                  (Yi = Ai.utils.clamp),
                  (ns = Ai.core.context || ws),
                  ($i = Ai.core.suppressOverwrites || ws),
                  (is = Di.history.scrollRestoration || "auto"),
                  (Do = Di.pageYOffset),
                  Ai.core.globals("ScrollTrigger", t),
                  zi))
              ) {
                (ms = 1),
                  ((ss = document.createElement("div")).style.height = "100vh"),
                  (ss.style.position = "absolute"),
                  Ao(),
                  ys(),
                  Si.register(Ai),
                  (t.isTouch = Si.isTouch),
                  (rs =
                    Si.isTouch &&
                    /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
                  so(Di, "wheel", vo),
                  (Li = [Di, Ri, Ii, zi]),
                  Ai.matchMedia
                    ? ((t.matchMedia = function (t) {
                        var e,
                          r = Ai.matchMedia();
                        for (e in t) r.add(e, t[e]);
                        return r;
                      }),
                      Ai.addEventListener("matchMediaInit", function () {
                        return Co();
                      }),
                      Ai.addEventListener("matchMediaRevert", function () {
                        return Mo();
                      }),
                      Ai.addEventListener("matchMedia", function () {
                        Po(0, 1), ko("matchMedia");
                      }),
                      Ai.matchMedia("(orientation: portrait)", function () {
                        return yo(), yo;
                      }))
                    : console.warn("Requires GSAP 3.11.0 or later"),
                  yo(),
                  so(Ri, "scroll", vo);
                var e,
                  r,
                  n = zi.style,
                  i = n.borderTopStyle,
                  s = Ai.core.Animation.prototype;
                for (
                  s.revert ||
                    Object.defineProperty(s, "revert", {
                      value: function () {
                        return this.time(-0.01, !0);
                      },
                    }),
                    n.borderTopStyle = "solid",
                    e = to(zi),
                    bi.m = Math.round(e.top + bi.sc()) || 0,
                    xi.m = Math.round(e.left + xi.sc()) || 0,
                    i
                      ? (n.borderTopStyle = i)
                      : n.removeProperty("border-top-style"),
                    Ni = setInterval(_o, 250),
                    Ai.delayedCall(0.5, function () {
                      return (fs = 0);
                    }),
                    so(Ri, "touchcancel", ws),
                    so(zi, "touchstart", ws),
                    io(so, Ri, "pointerdown,touchstart,mousedown", xs),
                    io(so, Ri, "pointerup,touchend,mouseup", bs),
                    Ui = Ai.utils.checkPrefix("transform"),
                    Lo.push(Ui),
                    Pi = ps(),
                    Bi = Ai.delayedCall(0.2, Po).pause(),
                    Gi = [
                      Ri,
                      "visibilitychange",
                      function () {
                        var t = Di.innerWidth,
                          e = Di.innerHeight;
                        Ri.hidden
                          ? ((Hi = t), (Vi = e))
                          : (Hi === t && Vi === e) || xo();
                      },
                      Ri,
                      "DOMContentLoaded",
                      Po,
                      Di,
                      "load",
                      Po,
                      Di,
                      "resize",
                      xo,
                    ],
                    As(so),
                    go.forEach(function (t) {
                      return t.enable(0, 1);
                    }),
                    r = 0;
                  r < ui.length;
                  r += 3
                )
                  ao(oo, ui[r], ui[r + 1]), ao(oo, ui[r], ui[r + 2]);
              }
            }),
            (t.config = function (e) {
              "limitCallbacks" in e && (as = !!e.limitCallbacks);
              var r = e.syncInterval;
              (r && clearInterval(Ni)) || ((Ni = r) && setInterval(_o, r)),
                "ignoreMobileResize" in e &&
                  (Ki = 1 === t.isTouch && e.ignoreMobileResize),
                "autoRefreshEvents" in e &&
                  (As(oo) || As(so, e.autoRefreshEvents || "none"),
                  (Zi = -1 === (e.autoRefreshEvents + "").indexOf("resize")));
            }),
            (t.scrollerProxy = function (t, e) {
              var r = wi(t),
                n = ui.indexOf(r),
                i = Ms(r);
              ~n && ui.splice(n, i ? 6 : 2),
                e && (i ? li.unshift(Di, e, zi, e, Ii, e) : li.unshift(r, e));
            }),
            (t.clearMatchMedia = function (t) {
              go.forEach(function (e) {
                return e._ctx && e._ctx.query === t && e._ctx.kill(!0, !0);
              });
            }),
            (t.isInViewport = function (t, e, r) {
              var n = (Ps(t) ? wi(t) : t).getBoundingClientRect(),
                i = n[r ? Ns : Xs] * e || 0;
              return r
                ? n.right - i > 0 && n.left + i < Di.innerWidth
                : n.bottom - i > 0 && n.top + i < Di.innerHeight;
            }),
            (t.positionInViewport = function (t, e, r) {
              Ps(t) && (t = wi(t));
              var n = t.getBoundingClientRect(),
                i = n[r ? Ns : Xs],
                s =
                  null == e
                    ? i / 2
                    : e in co
                    ? co[e] * i
                    : ~e.indexOf("%")
                    ? (parseFloat(e) * i) / 100
                    : parseFloat(e) || 0;
              return r
                ? (n.left + s) / Di.innerWidth
                : (n.top + s) / Di.innerHeight;
            }),
            (t.killAll = function (t) {
              if (
                (go.slice(0).forEach(function (t) {
                  return "ScrollSmoother" !== t.vars.id && t.kill();
                }),
                !0 !== t)
              ) {
                var e = bo.killAll || [];
                (bo = {}),
                  e.forEach(function (t) {
                    return t();
                  });
              }
            }),
            t
          );
        })();
      (Go.version = "3.12.2"),
        (Go.saveStyles = function (t) {
          return t
            ? Fi(t).forEach(function (t) {
                if (t && t.style) {
                  var e = Eo.indexOf(t);
                  e >= 0 && Eo.splice(e, 5),
                    Eo.push(
                      t,
                      t.style.cssText,
                      t.getBBox && t.getAttribute("transform"),
                      Ai.core.getCache(t),
                      ns()
                    );
                }
              })
            : Eo;
        }),
        (Go.revert = function (t, e) {
          return Co(!t, e);
        }),
        (Go.create = function (t, e) {
          return new Go(t, e);
        }),
        (Go.refresh = function (t) {
          return t ? xo() : (Pi || Go.register()) && Po(!0);
        }),
        (Go.update = function (t) {
          return ++ui.cache && Io(!0 === t ? 2 : 0);
        }),
        (Go.clearScrollMemory = Oo),
        (Go.maxScroll = function (t, e) {
          return Ss(t, e ? xi : bi);
        }),
        (Go.getScrollFunc = function (t, e) {
          return Ti(wi(t), e ? xi : bi);
        }),
        (Go.getById = function (t) {
          return mo[t];
        }),
        (Go.getAll = function () {
          return go.filter(function (t) {
            return "ScrollSmoother" !== t.vars.id;
          });
        }),
        (Go.isScrolling = function () {
          return !!gs;
        }),
        (Go.snapDirectional = no),
        (Go.addEventListener = function (t, e) {
          var r = bo[t] || (bo[t] = []);
          ~r.indexOf(e) || r.push(e);
        }),
        (Go.removeEventListener = function (t, e) {
          var r = bo[t],
            n = r && r.indexOf(e);
          n >= 0 && r.splice(n, 1);
        }),
        (Go.batch = function (t, e) {
          var r,
            n = [],
            i = {},
            s = e.interval || 0.016,
            o = e.batchMax || 1e9,
            a = function (t, e) {
              var r = [],
                n = [],
                i = Ai.delayedCall(s, function () {
                  e(r, n), (r = []), (n = []);
                }).pause();
              return function (t) {
                r.length || i.restart(!0),
                  r.push(t.trigger),
                  n.push(t),
                  o <= r.length && i.progress(1);
              };
            };
          for (r in e)
            i[r] =
              "on" === r.substr(0, 2) && Ds(e[r]) && "onRefreshInit" !== r
                ? a(0, e[r])
                : e[r];
          return (
            Ds(o) &&
              ((o = o()),
              so(Go, "refresh", function () {
                return (o = e.batchMax());
              })),
            Fi(t).forEach(function (t) {
              var e = {};
              for (r in i) e[r] = i[r];
              (e.trigger = t), n.push(Go.create(e));
            }),
            n
          );
        });
      var Qo,
        $o = function (t, e, r, n) {
          return (
            e > n ? t(n) : e < 0 && t(0),
            r > n ? (n - e) / (r - e) : r < 0 ? e / (e - r) : 1
          );
        },
        Zo = function t(e, r) {
          !0 === r
            ? e.style.removeProperty("touch-action")
            : (e.style.touchAction =
                !0 === r
                  ? "auto"
                  : r
                  ? "pan-" + r + (Si.isTouch ? " pinch-zoom" : "")
                  : "none"),
            e === Ii && t(zi, r);
        },
        Jo = { auto: 1, scroll: 1 },
        Ko = function (t) {
          var e,
            r = t.event,
            n = t.target,
            i = t.axis,
            s = (r.changedTouches ? r.changedTouches[0] : r).target,
            o = s._gsap || Ai.core.getCache(s),
            a = ps();
          if (!o._isScrollT || a - o._isScrollT > 2e3) {
            for (
              ;
              s &&
              s !== zi &&
              ((s.scrollHeight <= s.clientHeight &&
                s.scrollWidth <= s.clientWidth) ||
                (!Jo[(e = Js(s)).overflowY] && !Jo[e.overflowX]));

            )
              s = s.parentNode;
            (o._isScroll =
              s &&
              s !== n &&
              !Ms(s) &&
              (Jo[(e = Js(s)).overflowY] || Jo[e.overflowX])),
              (o._isScrollT = a);
          }
          (o._isScroll || "x" === i) &&
            (r.stopPropagation(), (r._gsapAllow = !0));
        },
        ta = function (t, e, r, n) {
          return Si.create({
            target: t,
            capture: !0,
            debounce: !1,
            lockAxis: !0,
            type: e,
            onWheel: (n = n && Ko),
            onPress: n,
            onDrag: n,
            onScroll: n,
            onEnable: function () {
              return r && so(Ri, Si.eventTypes[0], ra, !1, !0);
            },
            onDisable: function () {
              return oo(Ri, Si.eventTypes[0], ra, !0);
            },
          });
        },
        ea = /(input|label|select|textarea)/i,
        ra = function (t) {
          var e = ea.test(t.target.tagName);
          (e || Qo) && ((t._gsapAllow = !0), (Qo = e));
        };
      (Go.sort = function (t) {
        return go.sort(
          t ||
            function (t, e) {
              return (
                -1e6 * (t.vars.refreshPriority || 0) +
                t.start -
                (e.start + -1e6 * (e.vars.refreshPriority || 0))
              );
            }
        );
      }),
        (Go.observe = function (t) {
          return new Si(t);
        }),
        (Go.normalizeScroll = function (t) {
          if (void 0 === t) return Ji;
          if (!0 === t && Ji) return Ji.enable();
          if (!1 === t) return Ji && Ji.kill();
          var e =
            t instanceof Si
              ? t
              : (function (t) {
                  Is(t) || (t = {}),
                    (t.preventDefault = t.isNormalizer = t.allowClicks = !0),
                    t.type || (t.type = "wheel,touch"),
                    (t.debounce = !!t.debounce),
                    (t.id = t.id || "normalizer");
                  var e,
                    r,
                    n,
                    i,
                    s,
                    o,
                    a,
                    u,
                    l = t,
                    c = l.normalizeScrollX,
                    h = l.momentum,
                    f = l.allowNestedScroll,
                    p = l.onRelease,
                    d = wi(t.target) || Ii,
                    g = Ai.core.globals().ScrollSmoother,
                    m = g && g.get(),
                    _ =
                      rs &&
                      ((t.content && wi(t.content)) ||
                        (m && !1 !== t.content && !m.smooth() && m.content())),
                    v = Ti(d, bi),
                    y = Ti(d, xi),
                    x = 1,
                    b =
                      (Si.isTouch && Di.visualViewport
                        ? Di.visualViewport.scale * Di.visualViewport.width
                        : Di.outerWidth) / Di.innerWidth,
                    w = 0,
                    T = Ds(h)
                      ? function () {
                          return h(e);
                        }
                      : function () {
                          return h || 2.8;
                        },
                    k = ta(d, t.type, !0, f),
                    E = function () {
                      return (i = !1);
                    },
                    M = ws,
                    C = ws,
                    O = function () {
                      (r = Ss(d, bi)),
                        (C = Yi(rs ? 1 : 0, r)),
                        c && (M = Yi(0, Ss(d, xi))),
                        (n = So);
                    },
                    S = function () {
                      (_._gsap.y = Ts(parseFloat(_._gsap.y) + v.offset) + "px"),
                        (_.style.transform =
                          "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                          parseFloat(_._gsap.y) +
                          ", 0, 1)"),
                        (v.offset = v.cacheID = 0);
                    },
                    A = function () {
                      O(),
                        s.isActive() &&
                          s.vars.scrollY > r &&
                          (v() > r
                            ? s.progress(1) && v(r)
                            : s.resetTo("scrollY", r));
                    };
                  return (
                    _ && Ai.set(_, { y: "+=0" }),
                    (t.ignoreCheck = function (t) {
                      return (
                        (rs &&
                          "touchmove" === t.type &&
                          (function () {
                            if (i) {
                              requestAnimationFrame(E);
                              var t = Ts(e.deltaY / 2),
                                r = C(v.v - t);
                              if (_ && r !== v.v + v.offset) {
                                v.offset = r - v.v;
                                var n = Ts(
                                  (parseFloat(_ && _._gsap.y) || 0) - v.offset
                                );
                                (_.style.transform =
                                  "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                                  n +
                                  ", 0, 1)"),
                                  (_._gsap.y = n + "px"),
                                  (v.cacheID = ui.cache),
                                  Io();
                              }
                              return !0;
                            }
                            v.offset && S(), (i = !0);
                          })()) ||
                        (x > 1.05 && "touchstart" !== t.type) ||
                        e.isGesturing ||
                        (t.touches && t.touches.length > 1)
                      );
                    }),
                    (t.onPress = function () {
                      i = !1;
                      var t = x;
                      (x = Ts(
                        ((Di.visualViewport && Di.visualViewport.scale) || 1) /
                          b
                      )),
                        s.pause(),
                        t !== x && Zo(d, x > 1.01 || (!c && "x")),
                        (o = y()),
                        (a = v()),
                        O(),
                        (n = So);
                    }),
                    (t.onRelease = t.onGestureStart =
                      function (t, e) {
                        if ((v.offset && S(), e)) {
                          ui.cache++;
                          var n,
                            i,
                            o = T();
                          c &&
                            ((i =
                              (n = y()) + (0.05 * o * -t.velocityX) / 0.227),
                            (o *= $o(y, n, i, Ss(d, xi))),
                            (s.vars.scrollX = M(i))),
                            (i = (n = v()) + (0.05 * o * -t.velocityY) / 0.227),
                            (o *= $o(v, n, i, Ss(d, bi))),
                            (s.vars.scrollY = C(i)),
                            s.invalidate().duration(o).play(0.01),
                            ((rs && s.vars.scrollY >= r) || n >= r - 1) &&
                              Ai.to({}, { onUpdate: A, duration: o });
                        } else u.restart(!0);
                        p && p(t);
                      }),
                    (t.onWheel = function () {
                      s._ts && s.pause(),
                        ps() - w > 1e3 && ((n = 0), (w = ps()));
                    }),
                    (t.onChange = function (t, e, r, i, s) {
                      if (
                        (So !== n && O(),
                        e &&
                          c &&
                          y(
                            M(
                              i[2] === e ? o + (t.startX - t.x) : y() + e - i[1]
                            )
                          ),
                        r)
                      ) {
                        v.offset && S();
                        var u = s[2] === r,
                          l = u ? a + t.startY - t.y : v() + r - s[1],
                          h = C(l);
                        u && l !== h && (a += h - l), v(h);
                      }
                      (r || e) && Io();
                    }),
                    (t.onEnable = function () {
                      Zo(d, !c && "x"),
                        Go.addEventListener("refresh", A),
                        so(Di, "resize", A),
                        v.smooth &&
                          ((v.target.style.scrollBehavior = "auto"),
                          (v.smooth = y.smooth = !1)),
                        k.enable();
                    }),
                    (t.onDisable = function () {
                      Zo(d, !0),
                        oo(Di, "resize", A),
                        Go.removeEventListener("refresh", A),
                        k.kill();
                    }),
                    (t.lockAxis = !1 !== t.lockAxis),
                    ((e = new Si(t)).iOS = rs),
                    rs && !v() && v(1),
                    rs && Ai.ticker.add(ws),
                    (u = e._dc),
                    (s = Ai.to(e, {
                      ease: "power4",
                      paused: !0,
                      scrollX: c ? "+=0.1" : "+=0",
                      scrollY: "+=0.1",
                      modifiers: {
                        scrollY: Wo(v, v(), function () {
                          return s.pause();
                        }),
                      },
                      onUpdate: Io,
                      onComplete: u.vars.onComplete,
                    })),
                    e
                  );
                })(t);
          return (
            Ji && Ji.target === e.target && Ji.kill(),
            Ms(e.target) && (Ji = e),
            e
          );
        }),
        (Go.core = {
          _getVelocityProp: ki,
          _inputObserver: ta,
          _scrollers: ui,
          _proxies: li,
          bridge: {
            ss: function () {
              gs || ko("scrollStart"), (gs = ps());
            },
            ref: function () {
              return Xi;
            },
          },
        }),
        Es() && Ai.registerPlugin(Go);
      var na = r(70),
        ia = r.n(na);
      Un.registerPlugin(Go);
      const sa = document.getElementById("top");
      if (sa) {
        const oa = Un.timeline(),
          aa = Un.timeline(),
          ua = [
            {
              word: "",
              desc: "",
              title: "",
              type: "a",
            },
            {
              word: "",
              desc: "",
              title: "",
              type: "b",
            },
            {
              word: "",
              desc: "",
              title: "",
              type: "c",
            },
          ];
        let la = 0,
          ca = !1,
          ha = !1,
          fa = 1e3,
          pa = !1,
          da = !1;
        const ga = sa.querySelector(".js-top-word-in"),
          ma = sa.querySelector(".js-top-title"),
          _a = sa.querySelector(".js-top-desc"),
          va = sa.querySelectorAll(".js-top-btn-dot"),
          ya = sa.querySelectorAll(".js-top-decors"),
          xa = sa.querySelector(".js-top-cube"),
          ba = xa.querySelector("#cube-1"),
          wa = xa.querySelector("#cube-2"),
          Ta = xa.querySelector("#cube-3"),
          ka = xa.querySelector("#cube-4"),
          Ea = sa.querySelectorAll(".js-top-logos .def"),
          Ma = sa.querySelectorAll(".js-top-logos .act");
        function Ca() {
          va[0].classList.add("active"),
            Ra(ua[la]),
            Sa(),
            Oa(),
            xa.addEventListener("click", Pa);
        }
        function Oa() {
          for (let t = 0; t < va.length; t++)
            va[t].addEventListener("click", function (e) {
              e.preventDefault(),
                !(
                  e.target.classList.contains("js-top-btn-dot")
                    ? e.target
                    : e.target.closest(".js-top-btn-dot")
                ).classList.contains("active") &&
                  pa &&
                  (oa.clear(), clearTimeout(ca), (la = t), Aa());
            });
        }
        function Sa() {
          oa.fromTo(ga, { y: "-120%" }, { y: "0%" })
            .fromTo(
              [ma, _a],
              { x: "200%", opacity: 0 },
              { x: "0%", opacity: 1 }
            )
            .fromTo(
              xa,
              { y: "120%", opacity: 0 },
              {
                y: "0%",
                opacity: 1,
                onComplete: () => {
                  pa = !0;
                },
              }
            )
            .addLabel("show")
            .fromTo(
              ba,
              { x: "0%", y: "0%" },
              { x: "156%", y: "156%", duration: 7 },
              "show"
            )
            .fromTo(
              wa,
              { x: "0%", y: "0%" },
              { x: "-112%", y: "0%", duration: 7 },
              "show"
            )
            .fromTo(
              Ta,
              { x: "0%", y: "0%" },
              { x: "24%", y: "48%", duration: 7 },
              "show"
            )
            .fromTo(
              ka,
              { x: "0%", y: "0%" },
              { x: "32%", y: "64%", duration: 7 },
              "show"
            )
            .fromTo(ya, { scale: 0 }, { scale: 1, duration: 7 }, "show")
            .eventCallback("onComplete", () => {
              ca = setTimeout(() => {
                (la = Ia(la)), Aa();
              }, fa);
            });
        }
        function Aa() {
          aa.clear(),
            clearTimeout(ha),
            oa
              .addLabel("show")
              .to([ba, wa, Ta, ka], { x: "0%", y: "0%", duration: 0.8 }, "show")
              .to(ya, { scale: 0, duration: 0.8 }, "show")
              .to(xa, { y: "120%", opacity: 0 })
              .to([ma, _a], { x: "120%", opacity: 0 })
              .to(ga, { y: "120%" })
              .eventCallback("onComplete", () => {
                Ra(ua[la]),
                  Da(),
                  Sa(),
                  (pa = !1),
                  Un.set(Ma, { opacity: 0 }),
                  Un.set(Ea, { opacity: 1 });
              });
        }
        function Pa() {
          oa.clear(),
            aa
              .addLabel("show")
              .to([ba, wa, Ta, ka], { x: "0%", y: "0%", duration: 0.3 }, "show")
              .to(ya, { scale: 0, duration: 0.3 }, "show")
              .to(Ea, { opacity: 0, duration: 0.1 })
              .to(Ma, { opacity: 1, duration: 0.1 }),
            (da = !0),
            (ca = setTimeout(() => {
              (la = Ia(la)), Aa();
            }, 3e3));
        }
        function Da() {
          for (let t = 0; t < va.length; t++)
            t == la
              ? va[t].classList.add("active")
              : va[t].classList.remove("active");
        }
        function Ra(t) {
          (ga.innerHTML = t.word),
            (ma.innerHTML = t.title),
            (_a.innerHTML = t.desc),
            xa.setAttribute("data-type", t.type);
        }
        function Ia(t) {
          return ++t < ua.length ? t : 0;
        }
        ia()(sa, Ca);
      }
    })();
})();
