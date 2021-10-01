"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

new ( /*#__PURE__*/function () {
  function _class() {
    _classCallCheck(this, _class);

    this.registerListeners();
  }

  _createClass(_class, [{
    key: "registerListeners",
    value: function registerListeners() {
      var _this = this;

      return new Promise(function (e, t) {
        self.onmessage = function (e) {
          if (void 0 === e.data) return t("No data supplied");
          "processUrl" === e.data.event && "undefined" !== e.data.dataset.url && _this.processDatasetUrl(e.data.dataset).then(function (e) {
            return self.postMessage({
              event: "processedUrl",
              dataset: e
            });
          });
        };
      });
    }
  }, {
    key: "processDatasetUrl",
    value: function processDatasetUrl(e) {
      return fetch(e.url).then(function (e) {
        return e.blob();
      }).then(function (t) {
        return e.bloburl = URL.createObjectURL(t), e;
      });
    }
  }]);

  return _class;
}())();