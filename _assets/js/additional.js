"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

!function () {
  "use strict";

  !function () {
    var e = /*#__PURE__*/function () {
      function e(_e, t) {
        var _this = this;

        _classCallCheck(this, e);

        this.options = _e, this.surface = t, this.intersecting = !1, this.current = 0, this.registerDatasets().then(function () {
          return Promise.all([_this.registerWorker(), _this.registerIntersectionObserver(), _this.registerWorkerListener(), _this.registerMediaQueryListener()]);
        })["catch"](function (_e2) {
          console.error(_e2);
        });
      }

      _createClass(e, [{
        key: "registerWorker",
        value: function registerWorker() {
          var _this2 = this;

          return new Promise(function (_e3, t) {
            return _this2.worker = new Worker("".concat(_this2.options.path, "OffloadServiceWorker.js?v=").concat(_this2.options.version)), _e3();
          });
        }
      }, {
        key: "registerIntersectionObserver",
        value: function registerIntersectionObserver() {
          var _this3 = this;

          return new Promise(function (_e4, t) {
            return new IntersectionObserver(function (_e5, t) {
              for (var _t = 0; _t < _e5.length; _t++) {
                _e5[_t].isIntersecting ? (_this3.isIntersecting = !0, _this3.processImage()) : _this3.isIntersecting = !1;
              }
            }, {
              threshold: 0,
              rootMargin: "100px"
            }).observe(_this3.surface), _e4();
          });
        }
      }, {
        key: "processImage",
        value: function processImage() {
          var _this4 = this;

          this.getCurrentDataset().then(function (_e6) {
            return _this4.hasBlob(_e6) ? _this4.setStyle(_e6) : _this4.getBlob(_e6);
          });
        }
      }, {
        key: "hasBlob",
        value: function hasBlob(_e7) {
          return void 0 !== _e7.bloburl;
        }
      }, {
        key: "getBlob",
        value: function getBlob(_e8) {
          var _this5 = this;

          return new Promise(function (t, r) {
            return _this5.worker.postMessage({
              event: "processUrl",
              dataset: _e8
            });
          });
        }
      }, {
        key: "isIntersecting",
        value: function isIntersecting() {
          var _this6 = this;

          return new Promise(function (_e9, t) {
            return _e9(_this6.intersecting);
          });
        }
      }, {
        key: "registerWorkerListener",
        value: function registerWorkerListener() {
          var _this7 = this;

          return new Promise(function (_e10, t) {
            return _this7.worker.addEventListener("message", function (_e11) {
              return void 0 === _e11.data ? t("No data returned") : void 0 === _e11.data.event ? t("No event returned") : "processedUrl" === _e11.data.event && void 0 !== _e11.data.dataset ? _this7.updateDatasets(_e11.data.dataset).then(function () {
                return _this7.getCurrentDataset();
              }).then(function (_e12) {
                return _this7.setStyle(_e12);
              }) : void 0;
            }), _e10();
          });
        }
      }, {
        key: "updateDatasets",
        value: function updateDatasets(_e13) {
          var _this8 = this;

          return new Promise(function (t, r) {
            return _this8.datasets = _this8.datasets.map(function (t) {
              return t.uid === _e13.uid ? _e13 : t;
            }), t();
          });
        }
      }, {
        key: "registerMediaQueryListener",
        value: function registerMediaQueryListener() {
          var _this9 = this;

          return this.getMediaQueries().then(function (_e14) {
            return _e14.forEach(function (_e15, t) {
              _e15.addEventListener("change", function (_e16) {
                if (_this9.isIntersecting) return _this9.processImage();
              });
            }), Promise.resolve();
          });
        }
      }, {
        key: "registerDatasets",
        value: function registerDatasets() {
          var _this10 = this;

          return this.getDatasets().then(function (_e17) {
            return _this10.sortDatasets(_e17);
          }).then(function (_e18) {
            return _this10.datasets = _e18;
          });
        }
      }, {
        key: "getDatasets",
        value: function getDatasets() {
          var _this11 = this;

          return new Promise(function (_e19, t) {
            var r = _this11.surface.getAttribute("offload"),
                s = JSON.parse(r);

            return s.map(function (_e20, t) {
              return _e20.uid = t, _e20;
            }), _this11.surface.removeAttribute("offload"), _this11.surface.setAttribute("processed", JSON.stringify(s)), _e19(s);
          });
        }
      }, {
        key: "sortDatasets",
        value: function sortDatasets(_e21) {
          return new Promise(function (t, r) {
            return _e21.sort(function (_e22, t) {
              return void 0 === _e22.minwidth || parseFloat(_e22.minwidth) < parseFloat(t.minwidth) ? -1 : 1;
            }), t(_e21);
          });
        }
      }, {
        key: "getMediaQueries",
        value: function getMediaQueries() {
          var _this12 = this;

          return new Promise(function (_e23, t) {
            var r = [];
            return _this12.datasets.forEach(function (_e24, t) {
              var s = void 0 !== _e24.minwidth ? _e24.minwidth : "0em",
                  i = window.matchMedia("(min-width: ".concat(s, ")"));
              r.push(i);
            }), _e23(r);
          });
        }
      }, {
        key: "getCurrentDataset",
        value: function getCurrentDataset() {
          var _this13 = this;

          return this.getCurrentMediaQuery().then(function (_e25) {
            return _this13.datasets.find(function (t) {
              return (void 0 !== t.minwidth ? parseInt(t.minwidth.replace(/\D/g, "")) : 0) === parseInt(_e25.media.replace(/\D/g, ""));
            });
          });
        }
      }, {
        key: "getCurrentMediaQuery",
        value: function getCurrentMediaQuery() {
          return this.getMediaQueries().then(function (_e26) {
            for (var t = _e26.length - 1; t >= 0; t--) {
              var r = _e26[t];
              if (r.matches) return r;
            }
          });
        }
      }, {
        key: "setStyle",
        value: function setStyle(_e27) {
          var _this14 = this;

          return new Promise(function (t, r) {
            return _this14.surface.style.paddingTop = "".concat(_e27.ratio, "%"), _this14.surface.style.backgroundImage = "url('".concat(_e27.bloburl, "')"), t();
          });
        }
      }]);

      return e;
    }();

    new ( /*#__PURE__*/function () {
      function _class(e) {
        var _this15 = this;

        _classCallCheck(this, _class);

        if (!this.supportsWorkers()) return;
        var t = {
          path: "",
          version: "1.0.6"
        };
        this.options = Object.assign(t, e), this.processContainer(document.body).then(function () {
          return _this15.registerBinds();
        })["catch"](function (e) {
          console.error(e);
        });
      }

      _createClass(_class, [{
        key: "supportsWorkers",
        value: function supportsWorkers() {
          return "Worker" in window;
        }
      }, {
        key: "processContainer",
        value: function processContainer(e) {
          var _this16 = this;

          return this.getSurfaces(e).then(function (e) {
            return _this16.processSurfaces(e);
          });
        }
      }, {
        key: "getSurfaces",
        value: function getSurfaces(e) {
          return new Promise(function (t, r) {
            var s = e.querySelectorAll("[offload]");
            if (s.length) return t(s);
          });
        }
      }, {
        key: "processSurfaces",
        value: function processSurfaces(t) {
          var _this17 = this;

          var r = [];
          return t.forEach(function (t, s) {
            var i = new Promise(function (r, s) {
              return r(new e(_this17.options, t));
            });
            r.push(i);
          }), Promise.all(r);
        }
      }, {
        key: "registerBinds",
        value: function registerBinds() {
          var _this18 = this;

          new MutationObserver(function (e, t) {
            e.forEach(function (e, t) {
              _this18.processContainer(e.target)["catch"](function (e) {
                console.error(e);
              });
            });
          }).observe(document.body, {
            attributes: !1,
            childList: !0,
            subtree: !0
          });
        }
      }]);

      return _class;
    }())({
      path: "".concat(window.themeDir, "/_assets/js/")
    });
  }();
}();