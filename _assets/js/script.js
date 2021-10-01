"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! For license information please see script.js.LICENSE.txt */
!function () {
  var e = {
    916: function _(e) {
      e.exports = function () {
        "use strict";

        var _e = function e() {
          return _e = Object.assign || function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              for (var o in t = arguments[n]) {
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
              }
            }

            return e;
          }, _e.apply(this, arguments);
        };

        function t() {
          var e,
              t,
              n = ((e = document.createElement("div")).style.cssText = "position: fixed; top: 0; height: 100vh; pointer-events: none;", document.documentElement.insertBefore(e, document.documentElement.firstChild), e),
              r = window.innerHeight,
              o = n.offsetHeight,
              i = o - r;
          return t = n, document.documentElement.removeChild(t), {
            vh: o,
            windowHeight: r,
            offset: i,
            isNeeded: 0 !== i,
            value: 0
          };
        }

        function n() {}

        function r() {
          var e = t();
          return e.value = e.offset, e;
        }

        var o = Object.freeze({
          noop: n,
          computeDifference: r,
          redefineVhUnit: function redefineVhUnit() {
            var e = t();
            return e.value = .01 * e.windowHeight, e;
          }
        });

        function i(e) {
          return "string" == typeof e && e.length > 0;
        }

        var c = Object.freeze({
          cssVarName: "vh-offset",
          redefineVh: !1,
          method: r,
          force: !1,
          bind: !0,
          updateOnTouch: !1,
          onUpdate: n
        });
        var a = !1,
            s = [];

        try {
          var u = Object.defineProperty({}, "passive", {
            get: function get() {
              a = !0;
            }
          });
          window.addEventListener("test", u, u), window.removeEventListener("test", u, u);
        } catch (e) {
          a = !1;
        }

        function d(e, t) {
          s.push({
            eventName: e,
            callback: t
          }), window.addEventListener(e, t, !!a && {
            passive: !0
          });
        }

        function f() {
          s.forEach(function (e) {
            window.removeEventListener(e.eventName, e.callback);
          }), s = [];
        }

        function l(e, t) {
          document.documentElement.style.setProperty("--" + e, t.value + "px");
        }

        function m(t, n) {
          return _e({}, t, {
            unbind: f,
            recompute: n.method
          });
        }

        return function (t) {
          var r = Object.freeze(function (t) {
            if (i(t)) return _e({}, c, {
              cssVarName: t
            });
            if ("object" != _typeof(t)) return c;
            var r,
                a = {
              force: !0 === t.force,
              bind: !1 !== t.bind,
              updateOnTouch: !0 === t.updateOnTouch,
              onUpdate: (r = t.onUpdate, "function" == typeof r ? t.onUpdate : n)
            },
                s = !0 === t.redefineVh;
            return a.method = o[s ? "redefineVhUnit" : "computeDifference"], a.cssVarName = i(t.cssVarName) ? t.cssVarName : s ? "vh" : c.cssVarName, a;
          }(t)),
              a = m(r.method(), r);
          if (!a.isNeeded && !r.force) return a;
          if (l(r.cssVarName, a), r.onUpdate(a), !r.bind) return a;

          function s() {
            window.requestAnimationFrame(function () {
              var e = r.method();
              l(r.cssVarName, e), r.onUpdate(m(e, r));
            });
          }

          return a.unbind(), d("orientationchange", s), r.updateOnTouch && d("touchmove", s), a;
        };
      }();
    }
  },
      t = {};

  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var i = t[r] = {
      exports: {}
    };
    return e[r].call(i.exports, i, i.exports, n), i.exports;
  }

  n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e["default"];
    } : function () {
      return e;
    };
    return n.d(t, {
      a: t
    }), t;
  }, n.d = function (e, t) {
    for (var r in t) {
      n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
        enumerable: !0,
        get: t[r]
      });
    }
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, function () {
    "use strict";

    var e = function e(_e2, t, n, r, o, i, c) {
      i = t.createElement(n), c = t.getElementsByTagName(n)[0], i.appendChild(t.createTextNode(r.text)), i.onload = o(r), c ? c.parentNode.insertBefore(i, c) : t.head.appendChild(i);
    };

    var t = n(916),
        r = n.n(t);
    Promise.all([new ( /*#__PURE__*/function () {
      function _class() {
        _classCallCheck(this, _class);
      }

      _createClass(_class, [{
        key: "register",
        value: function register() {
          return Promise.all([this.loadFont("opensans", "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap")]).then(function (e) {
            for (var _t = 0; _t < e.length; _t++) {
              var _n = e[_t];
              document.documentElement.className += " font--".concat(_n);
            }
          })["catch"](function (e) {
            console.error(e);
          });
        }
      }, {
        key: "loadFont",
        value: function loadFont(e, t) {
          return new Promise(function (n, r) {
            var o = document.createElement("link");
            o.rel = "stylesheet preload", o.as = "style", o.href = t, o.preload = !0, o.addEventListener("load", function () {
              return n(e);
            }), o.addEventListener("error", function (e) {
              return r(e);
            }), document.head.appendChild(o);
          });
        }
      }]);

      return _class;
    }())().register(), new ( /*#__PURE__*/function () {
      function _class2() {
        _classCallCheck(this, _class2);
      }

      _createClass(_class2, [{
        key: "register",
        value: function register() {
          return new Promise(function (e, t) {
            return e(r()());
          });
        }
      }]);

      return _class2;
    }())().register()]).then(function () {
      return function (t, n) {
        if (!arguments.length) return Promise.reject(new ReferenceError("Failed to execute 'fetchInject': 1 argument required but only 0 present."));
        if (arguments[0] && arguments[0].constructor !== Array) return Promise.reject(new TypeError("Failed to execute 'fetchInject': argument 1 must be of type 'Array'."));
        if (arguments[1] && arguments[1].constructor !== Promise) return Promise.reject(new TypeError("Failed to execute 'fetchInject': argument 2 must be of type 'Promise'."));
        var r = [],
            o = n ? [].concat(n) : [],
            i = [];
        return t.forEach(function (e) {
          return o.push(window.fetch(e).then(function (e) {
            return [e.clone().text(), e.blob()];
          }).then(function (e) {
            return Promise.all(e).then(function (e) {
              r.push({
                text: e[0],
                blob: e[1]
              });
            });
          }));
        }), Promise.all(o).then(function () {
          return r.forEach(function (t) {
            i.push({
              then: function then(n) {
                t.blob.type.includes("text/css") ? e(window, document, "style", t, n) : e(window, document, "script", t, n);
              }
            });
          }), Promise.all(i);
        });
      }(["".concat(window.themeDir, "/_assets/js/additional.js?v=").concat(window.themeVersion)]);
    })["catch"](function (e) {
      console.error(e);
    });
  }();
}();