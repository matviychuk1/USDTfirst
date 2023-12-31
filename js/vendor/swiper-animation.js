/*!
 * swiper-animation v2.0.2
 * Homepage: https://github.com/cycdpo/swiper-animation#readme
 * Released under the MIT License.
 */
!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.SwiperAnimation = e())
    : (t.SwiperAnimation = e());
})(window, function () {
  return ((n = {}),
  (a.m = i =
    {
      tjUo: function (t, e, i) {
        "use strict";
        i.r(e);
        function n(t) {
          return Array.isArray(t)
            ? t
            : (function (t) {
                return (
                  "[object NodeList]" === Object.prototype.toString.call(t)
                );
              })(t)
            ? Array.from
              ? Array.from(t)
              : Array.prototype.slice.call(t)
            : new Array(t);
        }
        function a(e, i) {
          return (
            void 0 === i && (i = 0),
            (function (t) {
              return (
                "Promise" === Object.prototype.toString.call(t).slice(8, -1)
              );
            })(e)
              ? e
              : new Promise(function (t) {
                  e(), setTimeout(t, i);
                })
          );
        }
        i.d(e, "default", function () {
          return o;
        });
        var r = "visibility: hidden;",
          o = (function () {
            function t() {
              (this.swiper = null),
                (this.allBoxes = []),
                (this.activeBoxes = []),
                (this.appendedPromise = !1),
                (this.isPromiseReady = !1);
            }
            var e = t.prototype;
            return (
              (e.init = function (t) {
                var e = this;
                return (
                  this.swiper || (this.swiper = t),
                  this.isPromiseReady || window.Promise
                    ? (this.isPromiseReady = !0)
                    : this._initPromisePolyfill(function () {
                        e.isPromiseReady = !0;
                      }),
                  this
                );
              }),
              (e.animate = function () {
                var e = this;
                return this.isPromiseReady
                  ? Promise.resolve()
                      .then(function () {
                        return e._cache();
                      })
                      .then(function () {
                        return e._outAnimate();
                      })
                      .then(function () {
                        return e._clear();
                      })
                      .then(function () {
                        e.activeBoxes = [].concat(
                          n(
                            e.swiper.slides[
                              e.swiper.activeIndex
                            ].querySelectorAll("[data-swiper-animation]")
                          ),
                          n(
                            e.swiper.slides[
                              e.swiper.activeIndex
                            ].querySelectorAll("[data-swiper-animation-once]")
                          )
                        );
                        var t = e.activeBoxes.map(function (t) {
                          return t.__animationData
                            ? a(function () {
                                (t.style.visibility = "visible"),
                                  (t.style.cssText +=
                                    " animation-duration:" +
                                    t.__animationData.duration +
                                    "; -webkit-animation-duration:" +
                                    t.__animationData.duration +
                                    "; animation-delay:" +
                                    t.__animationData.delay +
                                    "; -webkit-animation-delay:" +
                                    t.__animationData.delay +
                                    ";"),
                                  t.classList.add(
                                    t.__animationData.effect,
                                    "animated"
                                  ),
                                  (t.__animationData.isRecovery = !1);
                              })
                            : Promise.resolve();
                        });
                        return Promise.all(t);
                      })
                  : setTimeout(function () {
                      return e.animate();
                    }, 500);
              }),
              (e._outAnimate = function () {
                var t = this.activeBoxes.map(function (t) {
                  return t.__animationData.isRecovery
                    ? Promise.resolve()
                    : t.__animationData.outEffect
                    ? a(function () {
                        (t.style.cssText = t.styleCache),
                          (t.style.visibility = "visible"),
                          (t.style.cssText +=
                            " animation-duration:" +
                            t.__animationData.outDuration +
                            "; -webkit-animation-duration:" +
                            t.__animationData.outDuration +
                            ";"),
                          t.classList.add(
                            t.__animationData.outEffect,
                            "animated"
                          );
                      }, 500)
                    : Promise.resolve();
                });
                return Promise.all(t);
              }),
              (e._clear = function () {
                var t = this,
                  e = this.activeBoxes.map(function (e) {
                    return e.__animationData.isRecovery
                      ? Promise.resolve()
                      : e.__animationData.runOnce
                      ? Promise.resolve()
                      : a(function () {
                          var t;
                          (e.style.cssText = e.__animationData.styleCache),
                            (t = e.classList).remove.apply(
                              t,
                              [
                                e.__animationData.effect,
                                e.__animationData.outEffect,
                                "animated",
                              ].filter(function (t) {
                                return !!t;
                              })
                            ),
                            (e.__animationData.isRecovery = !0);
                        });
                  });
                return Promise.all(e).then(function () {
                  return (t.activeBoxes = []);
                });
              }),
              (e._cache = function () {
                var e = this;
                return this.allBoxes.length
                  ? Promise.resolve()
                  : Promise.resolve()
                      .then(function () {
                        return e._initAllBoxes();
                      })
                      .then(function () {
                        var t = e.allBoxes.map(function (t) {
                          return a(function () {
                            (t.__animationData = {
                              styleCache: t.attributes.style
                                ? r + t.style.cssText
                                : r,
                              effect:
                                t.dataset.swiperAnimation ||
                                t.dataset.swiperAnimationOnce ||
                                "",
                              duration: t.dataset.duration || ".5s",
                              delay: t.dataset.delay || ".5s",
                              outEffect: t.dataset.swiperOutAnimation || "",
                              outDuration: t.dataset.outDuration || ".5s",
                              isRecovery: !0,
                              runOnce: !!t.dataset.swiperAnimationOnce,
                            }),
                              (t.style.cssText = t.__animationData.styleCache);
                          });
                        });
                        return Promise.all(t);
                      });
              }),
              (e._initAllBoxes = function () {
                var e = this;
                return this.allBoxes.length
                  ? Promise.resolve()
                  : a(function () {
                      var t = null;
                      e.swiper.wrapperEl
                        ? (t = e.swiper.wrapperEl)
                        : e.swiper.wrapper && (t = e.swiper.wrapper[0]),
                        (e.allBoxes = [].concat(
                          n(t.querySelectorAll("[data-swiper-animation]")),
                          n(t.querySelectorAll("[data-swiper-animation-once]"))
                        ));
                    });
              }),
              (e._initPromisePolyfill = function (t) {
                if (
                  (void 0 === t && (t = function () {}), !this.appendedPromise)
                ) {
                  var e = document.createElement("script");
                  (e.type = "text/javascript"),
                    (e.onload = function () {
                      return t();
                    }),
                    (e.src =
                      "https://cdn.jsdelivr.net/npm/promise-polyfill@7/dist/polyfill.min.js"),
                    document.querySelector("head").appendChild(e),
                    (this.appendedPromise = !0);
                }
              }),
              t
            );
          })();
      },
    }),
  (a.c = n),
  (a.d = function (t, e, i) {
    a.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
  }),
  (a.r = function (t) {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(t, "__esModule", { value: !0 });
  }),
  (a.t = function (e, t) {
    if ((1 & t && (e = a(e)), 8 & t)) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var i = Object.create(null);
    if (
      (a.r(i),
      Object.defineProperty(i, "default", { enumerable: !0, value: e }),
      2 & t && "string" != typeof e)
    )
      for (var n in e)
        a.d(
          i,
          n,
          function (t) {
            return e[t];
          }.bind(null, n)
        );
    return i;
  }),
  (a.n = function (t) {
    var e =
      t && t.__esModule
        ? function () {
            return t.default;
          }
        : function () {
            return t;
          };
    return a.d(e, "a", e), e;
  }),
  (a.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }),
  (a.p = ""),
  a((a.s = "tjUo"))).default;
  function a(t) {
    if (n[t]) return n[t].exports;
    var e = (n[t] = { i: t, l: !1, exports: {} });
    return i[t].call(e.exports, e, e.exports, a), (e.l = !0), e.exports;
  }
  var i, n;
});
