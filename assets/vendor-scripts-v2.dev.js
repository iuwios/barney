    (function (t) {
        var e = !1;
        if (("function" == typeof define && define.amd && (define(t), (e = !0)), "object" == typeof exports && ((module.exports = t()), (e = !0)), !e)) {
            var i = window.Cookies,
                n = (window.Cookies = t());
            n.noConflict = function () {
                return (window.Cookies = i), n;
            };
        }
    })(function () {
        function t() {
            for (var t = 0, e = {}; t < arguments.length; t++) {
                var i = arguments[t];
                for (var n in i) e[n] = i[n];
            }
            return e;
        }
        return (function e(i) {
            function n(e, o, r) {
                var s;
                if ("undefined" != typeof document) {
                    if (arguments.length > 1) {
                        if ("number" == typeof (r = t({ path: "/" }, n.defaults, r)).expires) {
                            var a = new Date();
                            a.setMilliseconds(a.getMilliseconds() + 864e5 * r.expires), (r.expires = a);
                        }
                        r.expires = r.expires ? r.expires.toUTCString() : "";
                        try {
                            (s = JSON.stringify(o)), /^[\{\[]/.test(s) && (o = s);
                        } catch (t) {}
                        (o = i.write ? i.write(o, e) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)),
                            (e = (e = (e = encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape));
                        var l = "";
                        for (var c in r) r[c] && ((l += "; " + c), !0 !== r[c] && (l += "=" + r[c]));
                        return (document.cookie = e + "=" + o + l);
                    }
                    e || (s = {});
                    for (var u = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, h = 0; h < u.length; h++) {
                        var p = u[h].split("="),
                            f = p.slice(1).join("=");
                        this.json || '"' !== f.charAt(0) || (f = f.slice(1, -1));
                        try {
                            var m = p[0].replace(d, decodeURIComponent);
                            if (((f = i.read ? i.read(f, m) : i(f, m) || f.replace(d, decodeURIComponent)), this.json))
                                try {
                                    f = JSON.parse(f);
                                } catch (t) {}
                            if (e === m) {
                                s = f;
                                break;
                            }
                            e || (s[m] = f);
                        } catch (t) {}
                    }
                    return s;
                }
            }
            return (
                (n.set = n),
                (n.get = function (t) {
                    return n.call(n, t);
                }),
                (n.getJSON = function () {
                    return n.apply({ json: !0 }, [].slice.call(arguments));
                }),
                (n.defaults = {}),
                (n.remove = function (e, i) {
                    n(e, "", t(i, { expires: -1 }));
                }),
                (n.withConverter = e),
                n
            );
        })(function () {});
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.EvEmitter = e());
    })("undefined" != typeof window ? window : this, function () {
        function t() {}
        var e = t.prototype;
        return (
            (e.on = function (t, e) {
                if (t && e) {
                    var i = (this._events = this._events || {}),
                        n = (i[t] = i[t] || []);
                    return -1 == n.indexOf(e) && n.push(e), this;
                }
            }),
            (e.once = function (t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = (this._onceEvents = this._onceEvents || {});
                    return ((i[t] = i[t] || {})[e] = !0), this;
                }
            }),
            (e.off = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = i.indexOf(e);
                    return -1 != n && i.splice(n, 1), this;
                }
            }),
            (e.emitEvent = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    (i = i.slice(0)), (e = e || []);
                    for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                        var r = i[o];
                        n && n[r] && (this.off(t, r), delete n[r]), r.apply(this, e);
                    }
                    return this;
                }
            }),
            (e.allOff = function () {
                delete this._events, delete this._onceEvents;
            }),
            t
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.getSize = e());
    })(window, function () {
        "use strict";
        function t(t) {
            var e = parseFloat(t);
            return -1 == t.indexOf("%") && !isNaN(e) && e;
        }
        var e = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
            i = e.length;
        function n(t) {
            return getComputedStyle(t);
        }
        var o,
            r = !1;
        return function s(a) {
            if (
                ((function () {
                    if (!r) {
                        r = !0;
                        var e = document.createElement("div");
                        (e.style.width = "200px"), (e.style.padding = "1px 2px 3px 4px"), (e.style.borderStyle = "solid"), (e.style.borderWidth = "1px 2px 3px 4px"), (e.style.boxSizing = "border-box");
                        var i = document.body || document.documentElement;
                        i.appendChild(e);
                        var a = n(e);
                        (o = 200 == Math.round(t(a.width))), (s.isBoxSizeOuter = o), i.removeChild(e);
                    }
                })(),
                "string" == typeof a && (a = document.querySelector(a)),
                a && "object" == typeof a && a.nodeType)
            ) {
                var l = n(a);
                if ("none" == l.display)
                    return (function () {
                        for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, n = 0; n < i; n++) t[e[n]] = 0;
                        return t;
                    })();
                var c = {};
                (c.width = a.offsetWidth), (c.height = a.offsetHeight);
                for (var u = (c.isBorderBox = "border-box" == l.boxSizing), d = 0; d < i; d++) {
                    var h = e[d],
                        p = l[h],
                        f = parseFloat(p);
                    c[h] = isNaN(f) ? 0 : f;
                }
                var m = c.paddingLeft + c.paddingRight,
                    g = c.paddingTop + c.paddingBottom,
                    v = c.marginLeft + c.marginRight,
                    y = c.marginTop + c.marginBottom,
                    x = c.borderLeftWidth + c.borderRightWidth,
                    b = c.borderTopWidth + c.borderBottomWidth,
                    w = u && o,
                    S = t(l.width);
                !1 !== S && (c.width = S + (w ? 0 : m + x));
                var C = t(l.height);
                return !1 !== C && (c.height = C + (w ? 0 : g + b)), (c.innerWidth = c.width - (m + x)), (c.innerHeight = c.height - (g + b)), (c.outerWidth = c.width + v), (c.outerHeight = c.height + y), c;
            }
        };
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.matchesSelector = e());
    })(window, function () {
        "use strict";
        var t = (function () {
            var t = window.Element.prototype;
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                var n = e[i] + "MatchesSelector";
                if (t[n]) return n;
            }
        })();
        return function (e, i) {
            return e[t](i);
        };
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("desandro-matches-selector")))
            : (t.fizzyUIUtils = e(t, t.matchesSelector));
    })(window, function (t, e) {
        var i = {
                extend: function (t, e) {
                    for (var i in e) t[i] = e[i];
                    return t;
                },
                modulo: function (t, e) {
                    return ((t % e) + e) % e;
                },
            },
            n = Array.prototype.slice;
        return (
            (i.makeArray = function (t) {
                return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? n.call(t) : [t];
            }),
            (i.removeFrom = function (t, e) {
                var i = t.indexOf(e);
                -1 != i && t.splice(i, 1);
            }),
            (i.getParent = function (t, i) {
                for (; t.parentNode && t != document.body; ) if (((t = t.parentNode), e(t, i))) return t;
            }),
            (i.getQueryElement = function (t) {
                return "string" == typeof t ? document.querySelector(t) : t;
            }),
            (i.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (i.filterFindElements = function (t, n) {
                t = i.makeArray(t);
                var o = [];
                return (
                    t.forEach(function (t) {
                        if (t instanceof HTMLElement)
                            if (n) {
                                e(t, n) && o.push(t);
                                for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r]);
                            } else o.push(t);
                    }),
                    o
                );
            }),
            (i.debounceMethod = function (t, e, i) {
                i = i || 100;
                var n = t.prototype[e],
                    o = e + "Timeout";
                t.prototype[e] = function () {
                    var t = this[o];
                    clearTimeout(t);
                    var e = arguments,
                        r = this;
                    this[o] = setTimeout(function () {
                        n.apply(r, e), delete r[o];
                    }, i);
                };
            }),
            (i.docReady = function (t) {
                var e = document.readyState;
                "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
            }),
            (i.toDashed = function (t) {
                return t
                    .replace(/(.)([A-Z])/g, function (t, e, i) {
                        return e + "-" + i;
                    })
                    .toLowerCase();
            }),
            (i.htmlInit = function (t, e) {
                i.docReady(function () {
                    var n = i.toDashed(e),
                        o = "data-" + n,
                        r = document.querySelectorAll("[" + o + "]"),
                        s = document.querySelectorAll(".js-" + n),
                        a = i.makeArray(r).concat(i.makeArray(s)),
                        l = o + "-options";
                    a.forEach(function (e) {
                        var i,
                            n = e.getAttribute(o) || e.getAttribute(l);
                        try {
                            i = n && JSON.parse(n);
                        } catch (t) {
                            return;
                        }
                        new t(e, i);
                    });
                });
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/cell", ["get-size/get-size"], function (i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("get-size")))
            : ((t.Flickity = t.Flickity || {}), (t.Flickity.Cell = e(t, t.getSize)));
    })(window, function (t, e) {
        function i(t, e) {
            (this.element = t), (this.parent = e), this.create();
        }
        var n = i.prototype;
        return (
            (n.create = function () {
                (this.element.style.position = "absolute"), this.element.setAttribute("aria-hidden", "true"), (this.x = 0), (this.shift = 0), (this.element.style[this.parent.originSide] = 0);
            }),
            (n.destroy = function () {
                this.unselect(), (this.element.style.position = "");
                var t = this.parent.originSide;
                (this.element.style[t] = ""), (this.element.style.transform = ""), this.element.removeAttribute("aria-hidden");
            }),
            (n.getSize = function () {
                this.size = e(this.element);
            }),
            (n.setPosition = function (t) {
                (this.x = t), this.updateTarget(), this.renderPosition(t);
            }),
            (n.updateTarget = n.setDefaultTarget = function () {
                var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
                this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign;
            }),
            (n.renderPosition = function (t) {
                var e = "left" === this.parent.originSide ? 1 : -1,
                    i = this.parent.options.percentPosition ? t * e * (this.parent.size.innerWidth / this.size.width) : t * e;
                this.element.style.transform = "translateX(" + this.parent.getPositionValue(i) + ")";
            }),
            (n.select = function () {
                this.element.classList.add("is-selected"), this.element.removeAttribute("aria-hidden");
            }),
            (n.unselect = function () {
                this.element.classList.remove("is-selected"), this.element.setAttribute("aria-hidden", "true");
            }),
            (n.wrapShift = function (t) {
                (this.shift = t), this.renderPosition(this.x + this.parent.slideableWidth * t);
            }),
            (n.remove = function () {
                this.element.parentNode.removeChild(this.element);
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? (module.exports = e()) : ((t.Flickity = t.Flickity || {}), (t.Flickity.Slide = e()));
    })(window, function () {
        "use strict";
        function t(t) {
            (this.parent = t), (this.isOriginLeft = "left" == t.originSide), (this.cells = []), (this.outerWidth = 0), (this.height = 0);
        }
        var e = t.prototype;
        return (
            (e.addCell = function (t) {
                if ((this.cells.push(t), (this.outerWidth += t.size.outerWidth), (this.height = Math.max(t.size.outerHeight, this.height)), 1 == this.cells.length)) {
                    this.x = t.x;
                    var e = this.isOriginLeft ? "marginLeft" : "marginRight";
                    this.firstMargin = t.size[e];
                }
            }),
            (e.updateTarget = function () {
                var t = this.isOriginLeft ? "marginRight" : "marginLeft",
                    e = this.getLastCell(),
                    i = e ? e.size[t] : 0,
                    n = this.outerWidth - (this.firstMargin + i);
                this.target = this.x + this.firstMargin + n * this.parent.cellAlign;
            }),
            (e.getLastCell = function () {
                return this.cells[this.cells.length - 1];
            }),
            (e.select = function () {
                this.cells.forEach(function (t) {
                    t.select();
                });
            }),
            (e.unselect = function () {
                this.cells.forEach(function (t) {
                    t.unselect();
                });
            }),
            (e.getCellElements = function () {
                return this.cells.map(function (t) {
                    return t.element;
                });
            }),
            t
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("fizzy-ui-utils")))
            : ((t.Flickity = t.Flickity || {}), (t.Flickity.animatePrototype = e(t, t.fizzyUIUtils)));
    })(window, function (t, e) {
        return {
            startAnimation: function () {
                this.isAnimating || ((this.isAnimating = !0), (this.restingFrames = 0), this.animate());
            },
            animate: function () {
                this.applyDragForce(), this.applySelectedAttraction();
                var t = this.x;
                if ((this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating)) {
                    var e = this;
                    requestAnimationFrame(function () {
                        e.animate();
                    });
                }
            },
            positionSlider: function () {
                var t = this.x;
                this.options.wrapAround && this.cells.length > 1 && ((t = e.modulo(t, this.slideableWidth)), (t -= this.slideableWidth), this.shiftWrapCells(t)), this.setTranslateX(t, this.isAnimating), this.dispatchScrollEvent();
            },
            setTranslateX: function (t, e) {
                (t += this.cursorPosition), (t = this.options.rightToLeft ? -t : t);
                var i = this.getPositionValue(t);
                this.slider.style.transform = e ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")";
            },
            dispatchScrollEvent: function () {
                var t = this.slides[0];
                if (t) {
                    var e = -this.x - t.target,
                        i = e / this.slidesWidth;
                    this.dispatchEvent("scroll", null, [i, e]);
                }
            },
            positionSliderAtSelected: function () {
                this.cells.length && ((this.x = -this.selectedSlide.target), (this.velocity = 0), this.positionSlider());
            },
            getPositionValue: function (t) {
                return this.options.percentPosition ? 0.01 * Math.round((t / this.size.innerWidth) * 1e4) + "%" : Math.round(t) + "px";
            },
            settle: function (t) {
                !this.isPointerDown && Math.round(100 * this.x) == Math.round(100 * t) && this.restingFrames++,
                    this.restingFrames > 2 && ((this.isAnimating = !1), delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]));
            },
            shiftWrapCells: function (t) {
                var e = this.cursorPosition + t;
                this._shiftCells(this.beforeShiftCells, e, -1);
                var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
                this._shiftCells(this.afterShiftCells, i, 1);
            },
            _shiftCells: function (t, e, i) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n],
                        r = e > 0 ? i : 0;
                    o.wrapShift(r), (e -= o.size.outerWidth);
                }
            },
            _unshiftCells: function (t) {
                if (t && t.length) for (var e = 0; e < t.length; e++) t[e].wrapShift(0);
            },
            integratePhysics: function () {
                (this.x += this.velocity), (this.velocity *= this.getFrictionFactor());
            },
            applyForce: function (t) {
                this.velocity += t;
            },
            getFrictionFactor: function () {
                return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"];
            },
            getRestingPosition: function () {
                return this.x + this.velocity / (1 - this.getFrictionFactor());
            },
            applyDragForce: function () {
                if (this.isDraggable && this.isPointerDown) {
                    var t = this.dragX - this.x - this.velocity;
                    this.applyForce(t);
                }
            },
            applySelectedAttraction: function () {
                if ((!this.isDraggable || !this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
                    var t = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
                    this.applyForce(t);
                }
            },
        };
    }),
    (function (t, e) {
        if ("function" == typeof define && define.amd)
            define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function (i, n, o, r, s, a) {
                return e(t, i, n, o, r, s, a);
            });
        else if ("object" == typeof module && module.exports) module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
        else {
            var i = t.Flickity;
            t.Flickity = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype);
        }
    })(window, function (t, e, i, n, o, r, s) {
        function a(t, e) {
            for (t = n.makeArray(t); t.length; ) e.appendChild(t.shift());
        }
        t.getComputedStyle;
        var l = 0,
            c = {};
        function u(t, e) {
            var i = n.getQueryElement(t);
            if (i) {
                if (((this.element = i), this.element.flickityGUID)) {
                    var o = c[this.element.flickityGUID];
                    return o && o.option(e), o;
                }
                (this.options = n.extend({}, this.constructor.defaults)), this.option(e), this._create();
            }
        }
        (u.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            cellAlign: "center",
            freeScrollFriction: 0.075,
            friction: 0.28,
            initialIndex: 0,
            percentPosition: !0,
            resize: !0,
            selectedAttraction: 0.025,
            setGallerySize: !0,
            wrapAround: !1,
        }),
            (u.createMethods = []);
        var d = u.prototype;
        n.extend(d, e.prototype),
            (d._create = function () {
                var t = (this.guid = ++l);
                for (var e in ((this.element.flickityGUID = t),
                (c[t] = this),
                (this.selectedIndex = 0),
                (this.restingFrames = 0),
                (this.x = 0),
                (this.velocity = 0),
                (this.originSide = this.options.rightToLeft ? "right" : "left"),
                (this.viewport = document.createElement("div")),
                (this.viewport.className = "flickity-viewport"),
                this._createSlider(),
                this.options.on)) {
                    var i = this.options.on[e];
                    this.on(e, i);
                }
                u.createMethods.forEach(function (t) {
                    this[t]();
                }, this),
                    this.activate();
            }),
            (d.option = function (t) {
                n.extend(this.options, t);
            }),
            (d.activate = function () {
                this.isActive ||
                    ((this.isActive = !0),
                    this.element.classList.add("flickity-enabled-expanse"),
                    this.options.rightToLeft && this.element.classList.add("flickity-rtl"),
                    this.getSize(),
                    a(this._filterFindCellElements(this.element.children), this.slider),
                    this.viewport.appendChild(this.slider),
                    this.element.appendChild(this.viewport),
                    this.reloadCells(),
                    this.options.accessibility && ((this.element.tabIndex = 0), this.element.addEventListener("keydown", this)),
                    this.emitEvent("activate"),
                    this.selectInitialIndex(),
                    (this.isInitActivated = !0),
                    this.dispatchEvent("ready", null, [this.element]));
            }),
            (d._createSlider = function () {
                var t = document.createElement("div");
                (t.className = "flickity-slider"), (t.style[this.originSide] = 0), (this.slider = t);
            }),
            (d._filterFindCellElements = function (t) {
                return n.filterFindElements(t, this.options.cellSelector);
            }),
            (d.reloadCells = function () {
                (this.cells = this._makeCells(this.slider.children)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize();
            }),
            (d._makeCells = function (t) {
                return this._filterFindCellElements(t).map(function (t) {
                    return new o(t, this);
                }, this);
            }),
            (d.getLastCell = function () {
                return this.cells[this.cells.length - 1];
            }),
            (d.getLastSlide = function () {
                return this.slides[this.slides.length - 1];
            }),
            (d.positionCells = function () {
                this._sizeCells(this.cells), this._positionCells(0);
            }),
            (d._positionCells = function (t) {
                (t = t || 0), (this.maxCellHeight = (t && this.maxCellHeight) || 0);
                var e = 0;
                if (t > 0) {
                    var i = this.cells[t - 1];
                    e = i.x + i.size.outerWidth;
                }
                for (var n = this.cells.length, o = t; o < n; o++) {
                    var r = this.cells[o];
                    r.setPosition(e), (e += r.size.outerWidth), (this.maxCellHeight = Math.max(r.size.outerHeight, this.maxCellHeight));
                }
                (this.slideableWidth = e), this.updateSlides(), this._containSlides(), (this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0);
            }),
            (d._sizeCells = function (t) {
                t.forEach(function (t) {
                    t.getSize();
                });
            }),
            (d.updateSlides = function () {
                if (((this.slides = []), this.cells.length)) {
                    var t = new r(this);
                    this.slides.push(t);
                    var e = "left" == this.originSide ? "marginRight" : "marginLeft",
                        i = this._getCanCellFit();
                    this.cells.forEach(function (n, o) {
                        if (t.cells.length) {
                            var s = t.outerWidth - t.firstMargin + (n.size.outerWidth - n.size[e]);
                            i.call(this, o, s) || (t.updateTarget(), (t = new r(this)), this.slides.push(t)), t.addCell(n);
                        } else t.addCell(n);
                    }, this),
                        t.updateTarget(),
                        this.updateSelectedSlide();
                }
            }),
            (d._getCanCellFit = function () {
                var t = this.options.groupCells;
                if (!t)
                    return function () {
                        return !1;
                    };
                if ("number" == typeof t) {
                    var e = parseInt(t, 10);
                    return function (t) {
                        return t % e != 0;
                    };
                }
                var i = "string" == typeof t && t.match(/^(\d+)%$/),
                    n = i ? parseInt(i[1], 10) / 100 : 1;
                return function (t, e) {
                    return e <= (this.size.innerWidth + 1) * n;
                };
            }),
            (d.reposition = function () {
                this.positionCells(), this.positionSliderAtSelected();
            }),
            (d.getSize = function () {
                (this.size = i(this.element)), this.setCellAlign(), (this.cursorPosition = this.size.innerWidth * this.cellAlign);
            });
        var h = { center: { left: 0.5, right: 0.5 }, left: { left: 0, right: 1 }, right: { right: 0, left: 1 } };
        return (
            (d.setCellAlign = function () {
                var t = h[this.options.cellAlign];
                this.cellAlign = t ? t[this.originSide] : this.options.cellAlign;
            }),
            (d.setGallerySize = function () {
                if (this.options.setGallerySize) {
                    var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
                    this.viewport.style.height = t + "px";
                }
            }),
            (d._getWrapShiftCells = function () {
                if (this.options.wrapAround) {
                    this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
                    var t = this.cursorPosition,
                        e = this.cells.length - 1;
                    (this.beforeShiftCells = this._getGapCells(t, e, -1)), (t = this.size.innerWidth - this.cursorPosition), (this.afterShiftCells = this._getGapCells(t, 0, 1));
                }
            }),
            (d._getGapCells = function (t, e, i) {
                for (var n = []; t > 0; ) {
                    var o = this.cells[e];
                    if (!o) break;
                    n.push(o), (e += i), (t -= o.size.outerWidth);
                }
                return n;
            }),
            (d._containSlides = function () {
                if (this.options.contain && !this.options.wrapAround && this.cells.length) {
                    var t = this.options.rightToLeft,
                        e = t ? "marginRight" : "marginLeft",
                        i = t ? "marginLeft" : "marginRight",
                        n = this.slideableWidth - this.getLastCell().size[i],
                        o = n < this.size.innerWidth,
                        r = this.cursorPosition + this.cells[0].size[e],
                        s = n - this.size.innerWidth * (1 - this.cellAlign);
                    this.slides.forEach(function (t) {
                        o ? (t.target = n * this.cellAlign) : ((t.target = Math.max(t.target, r)), (t.target = Math.min(t.target, s)));
                    }, this);
                }
            }),
            (d.dispatchEvent = function (t, e, i) {
                var n = e ? [e].concat(i) : i;
                this.emitEvent(t, n);
            }),
            (d.select = function (t, e, i) {
                if (this.isActive && ((t = parseInt(t, 10)), this._wrapSelect(t), (this.options.wrapAround || e) && (t = n.modulo(t, this.slides.length)), this.slides[t])) {
                    var o = this.selectedIndex;
                    (this.selectedIndex = t),
                        this.updateSelectedSlide(),
                        i ? this.positionSliderAtSelected() : this.startAnimation(),
                        this.options.adaptiveHeight && this.setGallerySize(),
                        this.dispatchEvent("select", null, [t]),
                        t != o && this.dispatchEvent("change", null, [t]),
                        this.dispatchEvent("cellSelect");
                }
            }),
            (d._wrapSelect = function (t) {
                var e = this.slides.length;
                if (!(this.options.wrapAround && e > 1)) return t;
                var i = n.modulo(t, e),
                    o = Math.abs(i - this.selectedIndex),
                    r = Math.abs(i + e - this.selectedIndex),
                    s = Math.abs(i - e - this.selectedIndex);
                !this.isDragSelect && r < o ? (t += e) : !this.isDragSelect && s < o && (t -= e), t < 0 ? (this.x -= this.slideableWidth) : t >= e && (this.x += this.slideableWidth);
            }),
            (d.previous = function (t, e) {
                this.select(this.selectedIndex - 1, t, e);
            }),
            (d.next = function (t, e) {
                this.select(this.selectedIndex + 1, t, e);
            }),
            (d.updateSelectedSlide = function () {
                var t = this.slides[this.selectedIndex];
                t &&
                    (this.unselectSelectedSlide(),
                    (this.selectedSlide = t),
                    t.select(),
                    (this.selectedCells = t.cells),
                    (this.selectedElements = t.getCellElements()),
                    (this.selectedCell = t.cells[0]),
                    (this.selectedElement = this.selectedElements[0]));
            }),
            (d.unselectSelectedSlide = function () {
                this.selectedSlide && this.selectedSlide.unselect();
            }),
            (d.selectInitialIndex = function () {
                var t = this.options.initialIndex;
                if (this.isInitActivated) this.select(this.selectedIndex, !1, !0);
                else {
                    if (t && "string" == typeof t && this.queryCell(t)) return void this.selectCell(t, !1, !0);
                    var e = 0;
                    t && this.slides[t] && (e = t), this.select(e, !1, !0);
                }
            }),
            (d.selectCell = function (t, e, i) {
                var n = this.queryCell(t);
                if (n) {
                    var o = this.getCellSlideIndex(n);
                    this.select(o, e, i);
                }
            }),
            (d.getCellSlideIndex = function (t) {
                for (var e = 0; e < this.slides.length; e++) if (-1 != this.slides[e].cells.indexOf(t)) return e;
            }),
            (d.getCell = function (t) {
                for (var e = 0; e < this.cells.length; e++) {
                    var i = this.cells[e];
                    if (i.element == t) return i;
                }
            }),
            (d.getCells = function (t) {
                t = n.makeArray(t);
                var e = [];
                return (
                    t.forEach(function (t) {
                        var i = this.getCell(t);
                        i && e.push(i);
                    }, this),
                    e
                );
            }),
            (d.getCellElements = function () {
                return this.cells.map(function (t) {
                    return t.element;
                });
            }),
            (d.getParentCell = function (t) {
                return this.getCell(t) || ((t = n.getParent(t, ".flickity-slider > *")), this.getCell(t));
            }),
            (d.getAdjacentCellElements = function (t, e) {
                if (!t) return this.selectedSlide.getCellElements();
                e = void 0 === e ? this.selectedIndex : e;
                var i = this.slides.length;
                if (1 + 2 * t >= i) return this.getCellElements();
                for (var o = [], r = e - t; r <= e + t; r++) {
                    var s = this.options.wrapAround ? n.modulo(r, i) : r,
                        a = this.slides[s];
                    a && (o = o.concat(a.getCellElements()));
                }
                return o;
            }),
            (d.queryCell = function (t) {
                if ("number" == typeof t) return this.cells[t];
                if ("string" == typeof t) {
                    if (t.match(/^[#.]?[\d/]/)) return;
                    t = this.element.querySelector(t);
                }
                return this.getCell(t);
            }),
            (d.uiChange = function () {
                this.emitEvent("uiChange");
            }),
            (d.childUIPointerDown = function (t) {
                "touchstart" != t.type && t.preventDefault(), this.focus();
            }),
            (d.onresize = function () {
                this.resize();
            }),
            n.debounceMethod(u, "onresize", 150),
            (d.resize = function () {
                if (this.isActive && !this.isAnimating && !this.isDragging) {
                    this.getSize(), this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
                    var t = this.selectedElements && this.selectedElements[0];
                    this.selectCell(t, !1, !0);
                }
            }),
            (d.onkeydown = function (t) {
                var e = document.activeElement && document.activeElement != this.element;
                if (this.options.accessibility && !e) {
                    var i = u.keyboardHandlers[t.keyCode];
                    i && i.call(this);
                }
            }),
            (u.keyboardHandlers = {
                37: function () {
                    var t = this.options.rightToLeft ? "next" : "previous";
                    this.uiChange(), this[t]();
                },
                39: function () {
                    var t = this.options.rightToLeft ? "previous" : "next";
                    this.uiChange(), this[t]();
                },
            }),
            (d.focus = function () {
                var e = t.pageYOffset;
                this.element.focus({ preventScroll: !0 }), t.pageYOffset != e && t.scrollTo(t.pageXOffset, e);
            }),
            (d.deactivate = function () {
                this.isActive &&
                    (this.element.classList.remove("flickity-enabled-expanse"),
                    this.element.classList.remove("flickity-rtl"),
                    this.unselectSelectedSlide(),
                    this.cells.forEach(function (t) {
                        t.destroy();
                    }),
                    this.element.removeChild(this.viewport),
                    a(this.slider.children, this.element),
                    this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)),
                    (this.isActive = !1),
                    this.emitEvent("deactivate"));
            }),
            (d.destroy = function () {
                this.deactivate(), t.removeEventListener("resize", this), this.allOff(), this.emitEvent("destroy"), delete this.element.flickityGUID, delete c[this.guid];
            }),
            n.extend(d, s),
            (u.data = function (t) {
                var e = (t = n.getQueryElement(t)) && t.flickityGUID;
                return e && c[e];
            }),
            n.htmlInit(u, "flickity"),
            (u.Cell = o),
            (u.Slide = r),
            u
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function (i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("ev-emitter")))
            : (t.Unipointer = e(t, t.EvEmitter));
    })(window, function (t, e) {
        function i() {}
        var n = (i.prototype = Object.create(e.prototype));
        (n.bindStartEvent = function (t) {
            this._bindStartEvent(t, !0);
        }),
            (n.unbindStartEvent = function (t) {
                this._bindStartEvent(t, !1);
            }),
            (n._bindStartEvent = function (e, i) {
                var n = (i = void 0 === i || i) ? "addEventListener" : "removeEventListener",
                    o = "mousedown";
                "ontouchstart" in t ? (o = "touchstart") : t.PointerEvent && (o = "pointerdown"), e[n](o, this);
            }),
            (n.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (n.getTouch = function (t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    if (i.identifier == this.pointerIdentifier) return i;
                }
            }),
            (n.onmousedown = function (t) {
                var e = t.button;
                (e && 0 !== e && 1 !== e) || this._pointerDown(t, t);
            }),
            (n.ontouchstart = function (t) {
                this._pointerDown(t, t.changedTouches[0]);
            }),
            (n.onpointerdown = function (t) {
                this._pointerDown(t, t);
            }),
            (n._pointerDown = function (t, e) {
                t.button || this.isPointerDown || ((this.isPointerDown = !0), (this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier), this.pointerDown(t, e));
            }),
            (n.pointerDown = function (t, e) {
                this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]);
            });
        var o = { mousedown: ["mousemove", "mouseup"], touchstart: ["touchmove", "touchend", "touchcancel"], pointerdown: ["pointermove", "pointerup", "pointercancel"] };
        return (
            (n._bindPostStartEvents = function (e) {
                if (e) {
                    var i = o[e.type];
                    i.forEach(function (e) {
                        t.addEventListener(e, this);
                    }, this),
                        (this._boundPointerEvents = i);
                }
            }),
            (n._unbindPostStartEvents = function () {
                this._boundPointerEvents &&
                    (this._boundPointerEvents.forEach(function (e) {
                        t.removeEventListener(e, this);
                    }, this),
                    delete this._boundPointerEvents);
            }),
            (n.onmousemove = function (t) {
                this._pointerMove(t, t);
            }),
            (n.onpointermove = function (t) {
                t.pointerId == this.pointerIdentifier && this._pointerMove(t, t);
            }),
            (n.ontouchmove = function (t) {
                var e = this.getTouch(t.changedTouches);
                e && this._pointerMove(t, e);
            }),
            (n._pointerMove = function (t, e) {
                this.pointerMove(t, e);
            }),
            (n.pointerMove = function (t, e) {
                this.emitEvent("pointerMove", [t, e]);
            }),
            (n.onmouseup = function (t) {
                this._pointerUp(t, t);
            }),
            (n.onpointerup = function (t) {
                t.pointerId == this.pointerIdentifier && this._pointerUp(t, t);
            }),
            (n.ontouchend = function (t) {
                var e = this.getTouch(t.changedTouches);
                e && this._pointerUp(t, e);
            }),
            (n._pointerUp = function (t, e) {
                this._pointerDone(), this.pointerUp(t, e);
            }),
            (n.pointerUp = function (t, e) {
                this.emitEvent("pointerUp", [t, e]);
            }),
            (n._pointerDone = function () {
                this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone();
            }),
            (n._pointerReset = function () {
                (this.isPointerDown = !1), delete this.pointerIdentifier;
            }),
            (n.pointerDone = function () {}),
            (n.onpointercancel = function (t) {
                t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t);
            }),
            (n.ontouchcancel = function (t) {
                var e = this.getTouch(t.changedTouches);
                e && this._pointerCancel(t, e);
            }),
            (n._pointerCancel = function (t, e) {
                this._pointerDone(), this.pointerCancel(t, e);
            }),
            (n.pointerCancel = function (t, e) {
                this.emitEvent("pointerCancel", [t, e]);
            }),
            (i.getPointerPoint = function (t) {
                return { x: t.pageX, y: t.pageY };
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("unidragger/unidragger", ["unipointer/unipointer"], function (i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("unipointer")))
            : (t.Unidragger = e(t, t.Unipointer));
    })(window, function (t, e) {
        function i() {}
        var n = (i.prototype = Object.create(e.prototype));
        (n.bindHandles = function () {
            this._bindHandles(!0);
        }),
            (n.unbindHandles = function () {
                this._bindHandles(!1);
            }),
            (n._bindHandles = function (e) {
                for (var i = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener", n = e ? this._touchActionValue : "", o = 0; o < this.handles.length; o++) {
                    var r = this.handles[o];
                    this._bindStartEvent(r, e), r[i]("click", this), t.PointerEvent && (r.style.touchAction = n);
                }
            }),
            (n._touchActionValue = "none"),
            (n.pointerDown = function (t, e) {
                this.okayPointerDown(t) && ((this.pointerDownPointer = { pageX: e.pageX, pageY: e.pageY }), t.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]));
            });
        var o = { TEXTAREA: !0, INPUT: !0, SELECT: !0, OPTION: !0 },
            r = { radio: !0, checkbox: !0, button: !0, submit: !0, image: !0, file: !0 };
        return (
            (n.okayPointerDown = function (t) {
                var e = o[t.target.nodeName],
                    i = r[t.target.type],
                    n = !e || i;
                return n || this._pointerReset(), n;
            }),
            (n.pointerDownBlur = function () {
                var t = document.activeElement;
                t && t.blur && t != document.body && t.blur();
            }),
            (n.pointerMove = function (t, e) {
                var i = this._dragPointerMove(t, e);
                this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i);
            }),
            (n._dragPointerMove = function (t, e) {
                var i = { x: e.pageX - this.pointerDownPointer.pageX, y: e.pageY - this.pointerDownPointer.pageY };
                return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e), i;
            }),
            (n.hasDragStarted = function (t) {
                return Math.abs(t.x) > 3 || Math.abs(t.y) > 3;
            }),
            (n.pointerUp = function (t, e) {
                this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e);
            }),
            (n._dragPointerUp = function (t, e) {
                this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e);
            }),
            (n._dragStart = function (t, e) {
                (this.isDragging = !0), (this.isPreventingClicks = !0), this.dragStart(t, e);
            }),
            (n.dragStart = function (t, e) {
                this.emitEvent("dragStart", [t, e]);
            }),
            (n._dragMove = function (t, e, i) {
                this.isDragging && this.dragMove(t, e, i);
            }),
            (n.dragMove = function (t, e, i) {
                t.preventDefault(), this.emitEvent("dragMove", [t, e, i]);
            }),
            (n._dragEnd = function (t, e) {
                (this.isDragging = !1),
                    setTimeout(
                        function () {
                            delete this.isPreventingClicks;
                        }.bind(this)
                    ),
                    this.dragEnd(t, e);
            }),
            (n.dragEnd = function (t, e) {
                this.emitEvent("dragEnd", [t, e]);
            }),
            (n.onclick = function (t) {
                this.isPreventingClicks && t.preventDefault();
            }),
            (n._staticClick = function (t, e) {
                (this.isIgnoringMouseUp && "mouseup" == t.type) ||
                    (this.staticClick(t, e),
                    "mouseup" != t.type &&
                        ((this.isIgnoringMouseUp = !0),
                        setTimeout(
                            function () {
                                delete this.isIgnoringMouseUp;
                            }.bind(this),
                            400
                        )));
            }),
            (n.staticClick = function (t, e) {
                this.emitEvent("staticClick", [t, e]);
            }),
            (i.getPointerPoint = e.getPointerPoint),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function (i, n, o) {
                  return e(t, i, n, o);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")))
            : (t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils));
    })(window, function (t, e, i, n) {
        n.extend(e.defaults, { draggable: ">1", dragThreshold: 3 }), e.createMethods.push("_createDrag");
        var o = e.prototype;
        n.extend(o, i.prototype),
            (o._touchActionValue = "pan-y"),
            (o._createDrag = function () {
                this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("deactivate", this.onDeactivateDrag), this.on("cellChange", this.updateDraggable);
            }),
            (o.onActivateDrag = function () {
                (this.handles = [this.viewport]), this.bindHandles(), this.updateDraggable();
            }),
            (o.onDeactivateDrag = function () {
                this.unbindHandles(), this.element.classList.remove("is-draggable");
            }),
            (o.updateDraggable = function () {
                ">1" == this.options.draggable ? (this.isDraggable = this.slides.length > 1) : (this.isDraggable = this.options.draggable),
                    this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable");
            }),
            (o.bindDrag = function () {
                (this.options.draggable = !0), this.updateDraggable();
            }),
            (o.unbindDrag = function () {
                (this.options.draggable = !1), this.updateDraggable();
            }),
            (o._uiChangeDrag = function () {
                delete this.isFreeScrolling;
            }),
            (o.pointerDown = function (e, i) {
                this.isDraggable
                    ? this.okayPointerDown(e) &&
                      (this._pointerDownPreventDefault(e),
                      this.pointerDownFocus(e),
                      document.activeElement != this.element && this.pointerDownBlur(),
                      (this.dragX = this.x),
                      this.viewport.classList.add("is-pointer-down"),
                      (this.pointerDownScroll = s()),
                      t.addEventListener("scroll", this),
                      this._pointerDownDefault(e, i))
                    : this._pointerDownDefault(e, i);
            }),
            (o._pointerDownDefault = function (t, e) {
                (this.pointerDownPointer = { pageX: e.pageX, pageY: e.pageY }), this._bindPostStartEvents(t), this.dispatchEvent("pointerDown", t, [e]);
            });
        var r = { INPUT: !0, TEXTAREA: !0, SELECT: !0 };
        function s() {
            return { x: t.pageXOffset, y: t.pageYOffset };
        }
        return (
            (o.pointerDownFocus = function (t) {
                r[t.target.nodeName] || this.focus();
            }),
            (o._pointerDownPreventDefault = function (t) {
                var e = "touchstart" == t.type,
                    i = "touch" == t.pointerType,
                    n = r[t.target.nodeName];
                e || i || n || t.preventDefault();
            }),
            (o.hasDragStarted = function (t) {
                return Math.abs(t.x) > this.options.dragThreshold;
            }),
            (o.pointerUp = function (t, e) {
                delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", t, [e]), this._dragPointerUp(t, e);
            }),
            (o.pointerDone = function () {
                t.removeEventListener("scroll", this), delete this.pointerDownScroll;
            }),
            (o.dragStart = function (e, i) {
                this.isDraggable && ((this.dragStartPosition = this.x), this.startAnimation(), t.removeEventListener("scroll", this), this.dispatchEvent("dragStart", e, [i]));
            }),
            (o.pointerMove = function (t, e) {
                var i = this._dragPointerMove(t, e);
                this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i);
            }),
            (o.dragMove = function (t, e, i) {
                if (this.isDraggable) {
                    t.preventDefault(), (this.previousDragX = this.dragX);
                    var n = this.options.rightToLeft ? -1 : 1;
                    this.options.wrapAround && (i.x %= this.slideableWidth);
                    var o = this.dragStartPosition + i.x * n;
                    if (!this.options.wrapAround && this.slides.length) {
                        var r = Math.max(-this.slides[0].target, this.dragStartPosition);
                        o = o > r ? 0.5 * (o + r) : o;
                        var s = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                        o = o < s ? 0.5 * (o + s) : o;
                    }
                    (this.dragX = o), (this.dragMoveTime = new Date()), this.dispatchEvent("dragMove", t, [e, i]);
                }
            }),
            (o.dragEnd = function (t, e) {
                if (this.isDraggable) {
                    this.options.freeScroll && (this.isFreeScrolling = !0);
                    var i = this.dragEndRestingSelect();
                    if (this.options.freeScroll && !this.options.wrapAround) {
                        var n = this.getRestingPosition();
                        this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target;
                    } else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
                    delete this.previousDragX, (this.isDragSelect = this.options.wrapAround), this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", t, [e]);
                }
            }),
            (o.dragEndRestingSelect = function () {
                var t = this.getRestingPosition(),
                    e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
                    i = this._getClosestResting(t, e, 1),
                    n = this._getClosestResting(t, e, -1);
                return i.distance < n.distance ? i.index : n.index;
            }),
            (o._getClosestResting = function (t, e, i) {
                for (
                    var n = this.selectedIndex,
                        o = 1 / 0,
                        r =
                            this.options.contain && !this.options.wrapAround
                                ? function (t, e) {
                                      return t <= e;
                                  }
                                : function (t, e) {
                                      return t < e;
                                  };
                    r(e, o) && ((n += i), (o = e), null !== (e = this.getSlideDistance(-t, n)));

                )
                    e = Math.abs(e);
                return { distance: o, index: n - i };
            }),
            (o.getSlideDistance = function (t, e) {
                var i = this.slides.length,
                    o = this.options.wrapAround && i > 1,
                    r = o ? n.modulo(e, i) : e,
                    s = this.slides[r];
                if (!s) return null;
                var a = o ? this.slideableWidth * Math.floor(e / i) : 0;
                return t - (s.target + a);
            }),
            (o.dragEndBoostSelect = function () {
                if (void 0 === this.previousDragX || !this.dragMoveTime || new Date() - this.dragMoveTime > 100) return 0;
                var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
                    e = this.previousDragX - this.dragX;
                return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0;
            }),
            (o.staticClick = function (t, e) {
                var i = this.getParentCell(t.target),
                    n = i && i.element,
                    o = i && this.cells.indexOf(i);
                this.dispatchEvent("staticClick", t, [e, n, o]);
            }),
            (o.onscroll = function () {
                var t = s(),
                    e = this.pointerDownScroll.x - t.x,
                    i = this.pointerDownScroll.y - t.y;
                (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone();
            }),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (i, n, o) {
                  return e(t, i, n, o);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")))
            : e(t, t.Flickity, t.Unipointer, t.fizzyUIUtils);
    })(window, function (t, e, i, n) {
        "use strict";
        var o = "http://www.w3.org/2000/svg";
        function r(t, e) {
            (this.direction = t), (this.parent = e), this._create();
        }
        (r.prototype = Object.create(i.prototype)),
            (r.prototype._create = function () {
                (this.isEnabled = !0), (this.isPrevious = -1 == this.direction);
                var t = this.parent.options.rightToLeft ? 1 : -1;
                this.isLeft = this.direction == t;
                var e = (this.element = document.createElement("button"));
                (e.className = "flickity-button flickity-prev-next-button"),
                    (e.className += this.isPrevious ? " flickity-previous" : " flickity-next"),
                    e.setAttribute("type", "button"),
                    this.disable(),
                    e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
                var i = this.createSVG();
                e.appendChild(i), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
            }),
            (r.prototype.activate = function () {
                this.bindStartEvent(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element);
            }),
            (r.prototype.deactivate = function () {
                this.parent.element.removeChild(this.element), this.unbindStartEvent(this.element), this.element.removeEventListener("click", this);
            }),
            (r.prototype.createSVG = function () {
                var t = document.createElementNS(o, "svg");
                t.setAttribute("class", "flickity-button-icon"), t.setAttribute("viewBox", "0 0 100 100");
                var e = document.createElementNS(o, "path"),
                    i = (function (t) {
                        return "string" == typeof t ? t : "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z";
                    })(this.parent.options.arrowShape);
                return e.setAttribute("d", i), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t;
            }),
            (r.prototype.handleEvent = n.handleEvent),
            (r.prototype.onclick = function () {
                if (this.isEnabled) {
                    this.parent.uiChange();
                    var t = this.isPrevious ? "previous" : "next";
                    this.parent[t]();
                }
            }),
            (r.prototype.enable = function () {
                this.isEnabled || ((this.element.disabled = !1), (this.isEnabled = !0));
            }),
            (r.prototype.disable = function () {
                this.isEnabled && ((this.element.disabled = !0), (this.isEnabled = !1));
            }),
            (r.prototype.update = function () {
                var t = this.parent.slides;
                if (this.parent.options.wrapAround && t.length > 1) this.enable();
                else {
                    var e = t.length ? t.length - 1 : 0,
                        i = this.isPrevious ? 0 : e;
                    this[this.parent.selectedIndex == i ? "disable" : "enable"]();
                }
            }),
            (r.prototype.destroy = function () {
                this.deactivate(), this.allOff();
            }),
            n.extend(e.defaults, { prevNextButtons: !0, arrowShape: { x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30 } }),
            e.createMethods.push("_createPrevNextButtons");
        var s = e.prototype;
        return (
            (s._createPrevNextButtons = function () {
                this.options.prevNextButtons && ((this.prevButton = new r(-1, this)), (this.nextButton = new r(1, this)), this.on("activate", this.activatePrevNextButtons));
            }),
            (s.activatePrevNextButtons = function () {
                this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons);
            }),
            (s.deactivatePrevNextButtons = function () {
                this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons);
            }),
            (e.PrevNextButton = r),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (i, n, o) {
                  return e(t, i, n, o);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")))
            : e(t, t.Flickity, t.Unipointer, t.fizzyUIUtils);
    })(window, function (t, e, i, n) {
        function o(t) {
            (this.parent = t), this._create();
        }
        (o.prototype = Object.create(i.prototype)),
            (o.prototype._create = function () {
                (this.holder = document.createElement("ol")),
                    (this.holder.className = "flickity-page-dots"),
                    (this.dots = []),
                    (this.handleClick = this.onClick.bind(this)),
                    this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
            }),
            (o.prototype.activate = function () {
                this.setDots(), this.holder.addEventListener("click", this.handleClick), this.bindStartEvent(this.holder), this.parent.element.appendChild(this.holder);
            }),
            (o.prototype.deactivate = function () {
                this.holder.removeEventListener("click", this.handleClick), this.unbindStartEvent(this.holder), this.parent.element.removeChild(this.holder);
            }),
            (o.prototype.setDots = function () {
                var t = this.parent.slides.length - this.dots.length;
                t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t);
            }),
            (o.prototype.addDots = function (t) {
                for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, o = n + t, r = n; r < o; r++) {
                    var s = document.createElement("li");
                    (s.className = "dot"), s.setAttribute("aria-label", "Page dot " + (r + 1)), e.appendChild(s), i.push(s);
                }
                this.holder.appendChild(e), (this.dots = this.dots.concat(i));
            }),
            (o.prototype.removeDots = function (t) {
                this.dots.splice(this.dots.length - t, t).forEach(function (t) {
                    this.holder.removeChild(t);
                }, this);
            }),
            (o.prototype.updateSelected = function () {
                this.selectedDot && ((this.selectedDot.className = "dot"), this.selectedDot.removeAttribute("aria-current")),
                    this.dots.length && ((this.selectedDot = this.dots[this.parent.selectedIndex]), (this.selectedDot.className = "dot is-selected"), this.selectedDot.setAttribute("aria-current", "step"));
            }),
            (o.prototype.onTap = o.prototype.onClick = function (t) {
                var e = t.target;
                if ("LI" == e.nodeName) {
                    this.parent.uiChange();
                    var i = this.dots.indexOf(e);
                    this.parent.select(i);
                }
            }),
            (o.prototype.destroy = function () {
                this.deactivate(), this.allOff();
            }),
            (e.PageDots = o),
            n.extend(e.defaults, { pageDots: !0 }),
            e.createMethods.push("_createPageDots");
        var r = e.prototype;
        return (
            (r._createPageDots = function () {
                this.options.pageDots &&
                    ((this.pageDots = new o(this)),
                    this.on("activate", this.activatePageDots),
                    this.on("select", this.updateSelectedPageDots),
                    this.on("cellChange", this.updatePageDots),
                    this.on("resize", this.updatePageDots),
                    this.on("deactivate", this.deactivatePageDots));
            }),
            (r.activatePageDots = function () {
                this.pageDots.activate();
            }),
            (r.updateSelectedPageDots = function () {
                this.pageDots.updateSelected();
            }),
            (r.updatePageDots = function () {
                this.pageDots.setDots();
            }),
            (r.deactivatePageDots = function () {
                this.pageDots.deactivate();
            }),
            (e.PageDots = o),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function (t, i, n) {
                  return e(t, i, n);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")))
            : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity);
    })(window, function (t, e, i) {
        function n(t) {
            (this.parent = t), (this.state = "stopped"), (this.onVisibilityChange = this.visibilityChange.bind(this)), (this.onVisibilityPlay = this.visibilityPlay.bind(this));
        }
        (n.prototype = Object.create(t.prototype)),
            (n.prototype.play = function () {
                "playing" != this.state &&
                    (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : ((this.state = "playing"), document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick()));
            }),
            (n.prototype.tick = function () {
                if ("playing" == this.state) {
                    var t = this.parent.options.autoPlay;
                    t = "number" == typeof t ? t : 3e3;
                    var e = this;
                    this.clear(),
                        (this.timeout = setTimeout(function () {
                            e.parent.next(!0), e.tick();
                        }, t));
                }
            }),
            (n.prototype.stop = function () {
                (this.state = "stopped"), this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange);
            }),
            (n.prototype.clear = function () {
                clearTimeout(this.timeout);
            }),
            (n.prototype.pause = function () {
                "playing" == this.state && ((this.state = "paused"), this.clear());
            }),
            (n.prototype.unpause = function () {
                "paused" == this.state && this.play();
            }),
            (n.prototype.visibilityChange = function () {
                this[document.hidden ? "pause" : "unpause"]();
            }),
            (n.prototype.visibilityPlay = function () {
                this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay);
            }),
            e.extend(i.defaults, { pauseAutoPlayOnHover: !0 }),
            i.createMethods.push("_createPlayer");
        var o = i.prototype;
        return (
            (o._createPlayer = function () {
                (this.player = new n(this)), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer);
            }),
            (o.activatePlayer = function () {
                this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this));
            }),
            (o.playPlayer = function () {
                this.player.play();
            }),
            (o.stopPlayer = function () {
                this.player.stop();
            }),
            (o.pausePlayer = function () {
                this.player.pause();
            }),
            (o.unpausePlayer = function () {
                this.player.unpause();
            }),
            (o.deactivatePlayer = function () {
                this.player.stop(), this.element.removeEventListener("mouseenter", this);
            }),
            (o.onmouseenter = function () {
                this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this));
            }),
            (o.onmouseleave = function () {
                this.player.unpause(), this.element.removeEventListener("mouseleave", this);
            }),
            (i.Player = n),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function (i, n) {
                  return e(t, i, n);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")))
            : e(t, t.Flickity, t.fizzyUIUtils);
    })(window, function (t, e, i) {
        var n = e.prototype;
        return (
            (n.insert = function (t, e) {
                var i = this._makeCells(t);
                if (i && i.length) {
                    var n = this.cells.length;
                    e = void 0 === e ? n : e;
                    var o = (function (t) {
                            var e = document.createDocumentFragment();
                            return (
                                t.forEach(function (t) {
                                    e.appendChild(t.element);
                                }),
                                e
                            );
                        })(i),
                        r = e == n;
                    if (r) this.slider.appendChild(o);
                    else {
                        var s = this.cells[e].element;
                        this.slider.insertBefore(o, s);
                    }
                    if (0 === e) this.cells = i.concat(this.cells);
                    else if (r) this.cells = this.cells.concat(i);
                    else {
                        var a = this.cells.splice(e, n - e);
                        this.cells = this.cells.concat(i).concat(a);
                    }
                    this._sizeCells(i), this.cellChange(e, !0);
                }
            }),
            (n.append = function (t) {
                this.insert(t, this.cells.length);
            }),
            (n.prepend = function (t) {
                this.insert(t, 0);
            }),
            (n.remove = function (t) {
                var e = this.getCells(t);
                if (e && e.length) {
                    var n = this.cells.length - 1;
                    e.forEach(function (t) {
                        t.remove();
                        var e = this.cells.indexOf(t);
                        (n = Math.min(e, n)), i.removeFrom(this.cells, t);
                    }, this),
                        this.cellChange(n, !0);
                }
            }),
            (n.cellSizeChange = function (t) {
                var e = this.getCell(t);
                if (e) {
                    e.getSize();
                    var i = this.cells.indexOf(e);
                    this.cellChange(i);
                }
            }),
            (n.cellChange = function (t, e) {
                var i = this.selectedElement;
                this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize();
                var n = this.getCell(i);
                n && (this.selectedIndex = this.getCellSlideIndex(n)),
                    (this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex)),
                    this.emitEvent("cellChange", [t]),
                    this.select(this.selectedIndex),
                    e && this.positionSliderAtSelected();
            }),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell"], e)
            : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell")));
    })(window, function (t) {
        return t;
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define(["flickity/js/index", "fizzy-ui-utils/utils"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("flickity"), require("fizzy-ui-utils")))
            : e(t.Flickity, t.fizzyUIUtils);
    })(this, function (t, e) {
        var i = t.Slide,
            n = i.prototype.updateTarget;
        i.prototype.updateTarget = function () {
            if ((n.apply(this, arguments), this.parent.options.fade)) {
                var t = this.target - this.x,
                    e = this.cells[0].x;
                this.cells.forEach(function (i) {
                    var n = i.x - e - t;
                    i.renderPosition(n);
                });
            }
        };
        var o = t.prototype;
        t.createMethods.push("_createFade"),
            (o._createFade = function () {
                (this.fadeIndex = this.selectedIndex),
                    (this.prevSelectedIndex = this.selectedIndex),
                    this.on("select", this.onSelectFade),
                    this.on("dragEnd", this.onDragEndFade),
                    this.on("settle", this.onSettleFade),
                    this.on("activate", this.onActivateFade),
                    this.on("deactivate", this.onDeactivateFade);
            });
        var r = o.updateSlides;
        (o.updateSlides = function () {
            r.apply(this, arguments), this.options.fade;
        }),
            (o.onSelectFade = function () {
                (this.fadeIndex = Math.min(this.prevSelectedIndex, this.slides.length - 1)), (this.prevSelectedIndex = this.selectedIndex);
            }),
            (o.onSettleFade = function () {
                delete this.didDragEnd, this.options.fade && this.slides[this.fadeIndex];
            }),
            (o.onDragEndFade = function () {
                this.didDragEnd = !0;
            }),
            (o.onActivateFade = function () {
                this.options.fade && this.element.classList.add("is-fade");
            }),
            (o.onDeactivateFade = function () {
                this.options.fade && this.element.classList.remove("is-fade");
            });
        var s = o.positionSlider;
        o.positionSlider = function () {
            this.options.fade ? (this.fadeSlides(), this.dispatchScrollEvent()) : s.apply(this, arguments);
        };
        var a = o.positionSliderAtSelected;
        (o.positionSliderAtSelected = function () {
            this.options.fade && this.setTranslateX(0), a.apply(this, arguments);
        }),
            (o.fadeSlides = function () {
                if (!(this.slides.length < 2)) {
                    var t = this.getFadeIndexes(),
                        e = this.slides[t.a],
                        i = this.slides[t.b],
                        n = this.wrapDifference(e.target, i.target),
                        o = this.wrapDifference(e.target, -this.x);
                    o /= n;
                    var r = t.a;
                    this.isDragging && (r = o > 0.5 ? t.a : t.b), null != this.fadeHideIndex && this.fadeHideIndex != r && this.fadeHideIndex != t.a && (this.fadeHideIndex, t.b), (this.fadeHideIndex = r);
                }
            }),
            (o.getFadeIndexes = function () {
                return this.isDragging || this.didDragEnd ? (this.options.wrapAround ? this.getFadeDragWrapIndexes() : this.getFadeDragLimitIndexes()) : { a: this.fadeIndex, b: this.selectedIndex };
            }),
            (o.getFadeDragWrapIndexes = function () {
                var t = this.slides.map(function (t, e) {
                        return this.getSlideDistance(-this.x, e);
                    }, this),
                    i = t.map(function (t) {
                        return Math.abs(t);
                    }),
                    n = Math.min.apply(Math, i),
                    o = i.indexOf(n),
                    r = t[o],
                    s = this.slides.length,
                    a = r >= 0 ? 1 : -1;
                return { a: o, b: e.modulo(o + a, s) };
            }),
            (o.getFadeDragLimitIndexes = function () {
                for (var t = 0, e = 0; e < this.slides.length - 1; e++) {
                    var i = this.slides[e];
                    if (-this.x < i.target) break;
                    t = e;
                }
                return { a: t, b: t + 1 };
            }),
            (o.wrapDifference = function (t, e) {
                var i = e - t;
                if (!this.options.wrapAround) return i;
                var n = i + this.slideableWidth,
                    o = i - this.slideableWidth;
                return Math.abs(n) < Math.abs(i) && (i = n), Math.abs(o) < Math.abs(i) && (i = o), i;
            });
        var l = o._getWrapShiftCells;
        o._getWrapShiftCells = function () {
            this.options.fade || l.apply(this, arguments);
        };
        var c = o.shiftWrapCells;
        return (
            (o.shiftWrapCells = function () {
                this.options.fade || c.apply(this, arguments);
            }),
            t
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? (module.exports = e()) : (t.PhotoSwipe = e());
    })(this, function () {
        "use strict";
        return function (t, e, i, n) {
            var o = {
                features: null,
                bind: function (t, e, i, n) {
                    var o = (n ? "remove" : "add") + "EventListener";
                    e = e.split(" ");
                    for (var r = 0; r < e.length; r++) e[r] && t[o](e[r], i, !1);
                },
                isArray: function (t) {
                    return t instanceof Array;
                },
                createEl: function (t, e) {
                    var i = document.createElement(e || "div");
                    return t && (i.className = t), i;
                },
                getScrollY: function () {
                    var t = window.pageYOffset;
                    return void 0 !== t ? t : document.documentElement.scrollTop;
                },
                unbind: function (t, e, i) {
                    o.bind(t, e, i, !0);
                },
                removeClass: function (t, e) {
                    var i = new RegExp("(\\s|^)" + e + "(\\s|$)");
                    t.className = t.className
                        .replace(i, " ")
                        .replace(/^\s\s*/, "")
                        .replace(/\s\s*$/, "");
                },
                addClass: function (t, e) {
                    o.hasClass(t, e) || (t.className += (t.className ? " " : "") + e);
                },
                hasClass: function (t, e) {
                    return t.className && new RegExp("(^|\\s)" + e + "(\\s|$)").test(t.className);
                },
                getChildByClass: function (t, e) {
                    for (var i = t.firstChild; i; ) {
                        if (o.hasClass(i, e)) return i;
                        i = i.nextSibling;
                    }
                },
                arraySearch: function (t, e, i) {
                    for (var n = t.length; n--; ) if (t[n][i] === e) return n;
                    return -1;
                },
                extend: function (t, e, i) {
                    for (var n in e)
                        if (e.hasOwnProperty(n)) {
                            if (i && t.hasOwnProperty(n)) continue;
                            t[n] = e[n];
                        }
                },
                easing: {
                    sine: {
                        out: function (t) {
                            return Math.sin(t * (Math.PI / 2));
                        },
                        inOut: function (t) {
                            return -(Math.cos(Math.PI * t) - 1) / 2;
                        },
                    },
                    cubic: {
                        out: function (t) {
                            return --t * t * t + 1;
                        },
                    },
                },
                detectFeatures: function () {
                    if (o.features) return o.features;
                    var t = o.createEl().style,
                        e = "",
                        i = {};
                    if (
                        ((i.oldIE = document.all && !document.addEventListener),
                        (i.touch = "ontouchstart" in window),
                        window.requestAnimationFrame && ((i.raf = window.requestAnimationFrame), (i.caf = window.cancelAnimationFrame)),
                        (i.pointerEvent = !!window.PointerEvent || navigator.msPointerEnabled),
                        !i.pointerEvent)
                    ) {
                        var n = navigator.userAgent;
                        if (/iP(hone|od)/.test(navigator.platform)) {
                            var r = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                            r && r.length > 0 && (r = parseInt(r[1], 10)) >= 1 && r < 8 && (i.isOldIOSPhone = !0);
                        }
                        var s = n.match(/Android\s([0-9\.]*)/),
                            a = s ? s[1] : 0;
                        (a = parseFloat(a)) >= 1 && (a < 4.4 && (i.isOldAndroid = !0), (i.androidVersion = a)), (i.isMobileOpera = /opera mini|opera mobi/i.test(n));
                    }
                    for (var l, c, u = ["transform", "perspective", "animationName"], d = ["", "webkit", "Moz", "ms", "O"], h = 0; h < 4; h++) {
                        e = d[h];
                        for (var p = 0; p < 3; p++) (l = u[p]), (c = e + (e ? l.charAt(0).toUpperCase() + l.slice(1) : l)), !i[l] && c in t && (i[l] = c);
                        e && !i.raf && ((e = e.toLowerCase()), (i.raf = window[e + "RequestAnimationFrame"]), i.raf && (i.caf = window[e + "CancelAnimationFrame"] || window[e + "CancelRequestAnimationFrame"]));
                    }
                    if (!i.raf) {
                        var f = 0;
                        (i.raf = function (t) {
                            var e = new Date().getTime(),
                                i = Math.max(0, 16 - (e - f)),
                                n = window.setTimeout(function () {
                                    t(e + i);
                                }, i);
                            return (f = e + i), n;
                        }),
                            (i.caf = function (t) {
                                clearTimeout(t);
                            });
                    }
                    return (i.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect), (o.features = i), i;
                },
            };
            o.detectFeatures(),
                o.features.oldIE &&
                    (o.bind = function (t, e, i, n) {
                        e = e.split(" ");
                        for (
                            var o,
                                r = (n ? "detach" : "attach") + "Event",
                                s = function () {
                                    i.handleEvent.call(i);
                                },
                                a = 0;
                            a < e.length;
                            a++
                        )
                            if ((o = e[a]))
                                if ("object" == typeof i && i.handleEvent) {
                                    if (n) {
                                        if (!i["oldIE" + o]) return !1;
                                    } else i["oldIE" + o] = s;
                                    t[r]("on" + o, i["oldIE" + o]);
                                } else t[r]("on" + o, i);
                    });
            var r = this,
                s = {
                    allowPanToNext: !0,
                    spacing: 0.12,
                    bgOpacity: 1,
                    mouseUsed: !1,
                    loop: !0,
                    pinchToClose: !0,
                    closeOnScroll: !0,
                    closeOnVerticalDrag: !0,
                    verticalDragRange: 0.75,
                    hideAnimationDuration: 333,
                    showAnimationDuration: 333,
                    showHideOpacity: !1,
                    focus: !0,
                    escKey: !0,
                    arrowKeys: !0,
                    mainScrollEndFriction: 0.35,
                    panEndFriction: 0.35,
                    isClickableElement: function (t) {
                        return "A" === t.tagName;
                    },
                    getDoubleTapZoom: function (t, e) {
                        return t || e.initialZoomLevel < 0.7 ? 1 : 1.33;
                    },
                    maxSpreadZoom: 1.33,
                    modal: !0,
                    scaleMode: "fit",
                };
            o.extend(s, n);
            var a,
                l,
                c,
                u,
                d,
                h,
                p,
                f,
                m,
                g,
                v,
                y,
                x,
                b,
                w,
                S,
                C,
                E,
                D,
                P,
                z,
                A,
                _,
                I,
                k,
                T,
                M,
                L,
                F,
                N,
                O,
                U,
                R,
                W,
                V,
                H,
                B,
                j,
                q,
                Z,
                X,
                G,
                Y,
                K,
                $,
                J,
                Q,
                tt,
                et,
                it,
                nt,
                ot,
                rt,
                st,
                at,
                lt,
                ct = { x: 0, y: 0 },
                ut = { x: 0, y: 0 },
                dt = { x: 0, y: 0 },
                ht = {},
                pt = 0,
                ft = {},
                mt = { x: 0, y: 0 },
                gt = 0,
                vt = !0,
                yt = [],
                xt = {},
                bt = !1,
                wt = function (t, e) {
                    o.extend(r, e.publicMethods), yt.push(t);
                },
                St = function (t) {
                    var e = Ve();
                    return t > e - 1 ? t - e : t < 0 ? e + t : t;
                },
                Ct = {},
                Et = function (t, e) {
                    return Ct[t] || (Ct[t] = []), Ct[t].push(e);
                },
                Dt = function (t) {
                    var e = Ct[t];
                    if (e) {
                        var i = Array.prototype.slice.call(arguments);
                        i.shift();
                        for (var n = 0; n < e.length; n++) e[n].apply(r, i);
                    }
                },
                Pt = function () {
                    return new Date().getTime();
                },
                zt = function (t) {
                    (st = t), (r.bg.style.opacity = t * s.bgOpacity);
                },
                At = function (t, e, i, n, o) {
                    (!bt || (o && o !== r.currItem)) && (n /= o ? o.fitRatio : r.currItem.fitRatio), (t[A] = y + e + "px, " + i + "px" + x + " scale(" + n + ")");
                },
                _t = function (t) {
                    et && (t && (g > r.currItem.fitRatio ? bt || (Ke(r.currItem, !1, !0), (bt = !0)) : bt && (Ke(r.currItem), (bt = !1))), At(et, dt.x, dt.y, g));
                },
                It = function (t) {
                    t.container && At(t.container.style, t.initialPosition.x, t.initialPosition.y, t.initialZoomLevel, t);
                },
                kt = function (t, e) {
                    e[A] = y + t + "px, 0px" + x;
                },
                Tt = function (t, e) {
                    if (!s.loop && e) {
                        var i = u + (mt.x * pt - t) / mt.x,
                            n = Math.round(t - ue.x);
                        ((i < 0 && n > 0) || (i >= Ve() - 1 && n < 0)) && (t = ue.x + n * s.mainScrollEndFriction);
                    }
                    (ue.x = t), kt(t, d);
                },
                Mt = function (t, e) {
                    var i = de[t] - ft[t];
                    return ut[t] + ct[t] + i - i * (e / v);
                },
                Lt = function (t, e) {
                    (t.x = e.x), (t.y = e.y), e.id && (t.id = e.id);
                },
                Ft = function (t) {
                    (t.x = Math.round(t.x)), (t.y = Math.round(t.y));
                },
                Nt = null,
                Ot = function () {
                    Nt && (o.unbind(document, "mousemove", Ot), o.addClass(t, "pswp--has_mouse"), (s.mouseUsed = !0), Dt("mouseUsed")),
                        (Nt = setTimeout(function () {
                            Nt = null;
                        }, 100));
                },
                Ut = function (t, e) {
                    var i = Ze(r.currItem, ht, t);
                    return e && (tt = i), i;
                },
                Rt = function (t) {
                    return t || (t = r.currItem), t.initialZoomLevel;
                },
                Wt = function (t) {
                    return t || (t = r.currItem), t.w > 0 ? s.maxSpreadZoom : 1;
                },
                Vt = function (t, e, i, n) {
                    return n === r.currItem.initialZoomLevel ? ((i[t] = r.currItem.initialPosition[t]), !0) : ((i[t] = Mt(t, n)), i[t] > e.min[t] ? ((i[t] = e.min[t]), !0) : i[t] < e.max[t] && ((i[t] = e.max[t]), !0));
                },
                Ht = function (t) {
                    var e = "";
                    s.escKey && 27 === t.keyCode ? (e = "close") : s.arrowKeys && (37 === t.keyCode ? (e = "prev") : 39 === t.keyCode && (e = "next")),
                        e && (t.ctrlKey || t.altKey || t.shiftKey || t.metaKey || (t.preventDefault ? t.preventDefault() : (t.returnValue = !1), r[e]()));
                },
                Bt = function (t) {
                    t && (G || X || it || B) && (t.preventDefault(), t.stopPropagation());
                },
                jt = function () {
                    r.setScrollOffset(0, o.getScrollY());
                },
                qt = {},
                Zt = 0,
                Xt = function (t) {
                    qt[t] && (qt[t].raf && T(qt[t].raf), Zt--, delete qt[t]);
                },
                Gt = function (t) {
                    qt[t] && Xt(t), qt[t] || (Zt++, (qt[t] = {}));
                },
                Yt = function () {
                    for (var t in qt) qt.hasOwnProperty(t) && Xt(t);
                },
                Kt = function (t, e, i, n, o, r, s) {
                    var a,
                        l = Pt();
                    Gt(t);
                    var c = function () {
                        if (qt[t]) {
                            if ((a = Pt() - l) >= n) return Xt(t), r(i), void (s && s());
                            r((i - e) * o(a / n) + e), (qt[t].raf = k(c));
                        }
                    };
                    c();
                },
                $t = {
                    shout: Dt,
                    listen: Et,
                    viewportSize: ht,
                    options: s,
                    isMainScrollAnimating: function () {
                        return it;
                    },
                    getZoomLevel: function () {
                        return g;
                    },
                    getCurrentIndex: function () {
                        return u;
                    },
                    isDragging: function () {
                        return q;
                    },
                    isZooming: function () {
                        return J;
                    },
                    setScrollOffset: function (t, e) {
                        (ft.x = t), (N = ft.y = e), Dt("updateScrollOffset", ft);
                    },
                    applyZoomPan: function (t, e, i, n) {
                        (dt.x = e), (dt.y = i), (g = t), _t(n);
                    },
                    init: function () {
                        if (!a && !l) {
                            var i;
                            (r.framework = o),
                                (r.template = t),
                                (r.bg = o.getChildByClass(t, "pswp__bg")),
                                (M = t.className),
                                (a = !0),
                                (O = o.detectFeatures()),
                                (k = O.raf),
                                (T = O.caf),
                                (A = O.transform),
                                (F = O.oldIE),
                                (r.scrollWrap = o.getChildByClass(t, "pswp__scroll-wrap")),
                                (r.container = o.getChildByClass(r.scrollWrap, "pswp__container")),
                                (d = r.container.style),
                                (r.itemHolders = S = [
                                    { el: r.container.children[0], wrap: 0, index: -1 },
                                    { el: r.container.children[1], wrap: 0, index: -1 },
                                    { el: r.container.children[2], wrap: 0, index: -1 },
                                ]),
                                (S[0].el.style.display = S[2].el.style.display = "none"),
                                (function () {
                                    if (A) {
                                        var e = O.perspective && !I;
                                        return (y = "translate" + (e ? "3d(" : "(")), void (x = O.perspective ? ", 0px)" : ")");
                                    }
                                    (A = "left"),
                                        o.addClass(t, "pswp--ie"),
                                        (kt = function (t, e) {
                                            e.left = t + "px";
                                        }),
                                        (It = function (t) {
                                            var e = t.fitRatio > 1 ? 1 : t.fitRatio,
                                                i = t.container.style,
                                                n = e * t.w,
                                                o = e * t.h;
                                            (i.width = n + "px"), (i.height = o + "px"), (i.left = t.initialPosition.x + "px"), (i.top = t.initialPosition.y + "px");
                                        }),
                                        (_t = function () {
                                            if (et) {
                                                var t = et,
                                                    e = r.currItem,
                                                    i = e.fitRatio > 1 ? 1 : e.fitRatio,
                                                    n = i * e.w,
                                                    o = i * e.h;
                                                (t.width = n + "px"), (t.height = o + "px"), (t.left = dt.x + "px"), (t.top = dt.y + "px");
                                            }
                                        });
                                })(),
                                (m = {
                                    resize: r.updateSize,
                                    orientationchange: function () {
                                        clearTimeout(U),
                                            (U = setTimeout(function () {
                                                ht.x !== r.scrollWrap.clientWidth && r.updateSize();
                                            }, 500));
                                    },
                                    scroll: jt,
                                    keydown: Ht,
                                    click: Bt,
                                });
                            var n = O.isOldIOSPhone || O.isOldAndroid || O.isMobileOpera;
                            for ((O.animationName && O.transform && !n) || (s.showAnimationDuration = s.hideAnimationDuration = 0), i = 0; i < yt.length; i++) r["init" + yt[i]]();
                            e && (r.ui = new e(r, o)).init(),
                                Dt("firstUpdate"),
                                (u = u || s.index || 0),
                                (isNaN(u) || u < 0 || u >= Ve()) && (u = 0),
                                (r.currItem = We(u)),
                                (O.isOldIOSPhone || O.isOldAndroid) && (vt = !1),
                                t.setAttribute("aria-hidden", "false"),
                                s.modal && (vt ? (t.style.position = "fixed") : ((t.style.position = "absolute"), (t.style.top = o.getScrollY() + "px"))),
                                void 0 === N && (Dt("initialLayout"), (N = L = o.getScrollY()));
                            var c = "pswp--open ";
                            for (
                                s.mainClass && (c += s.mainClass + " "),
                                    s.showHideOpacity && (c += "pswp--animate_opacity "),
                                    c += I ? "pswp--touch" : "pswp--notouch",
                                    c += O.animationName ? " pswp--css_animation" : "",
                                    c += O.svg ? " pswp--svg" : "",
                                    o.addClass(t, c),
                                    r.updateSize(),
                                    h = -1,
                                    gt = null,
                                    i = 0;
                                i < 3;
                                i++
                            )
                                kt((i + h) * mt.x, S[i].el.style);
                            F || o.bind(r.scrollWrap, f, r),
                                Et("initialZoomInEnd", function () {
                                    r.setContent(S[0], u - 1),
                                        r.setContent(S[2], u + 1),
                                        (S[0].el.style.display = S[2].el.style.display = "block"),
                                        s.focus && t.focus(),
                                        o.bind(document, "keydown", r),
                                        O.transform && o.bind(r.scrollWrap, "click", r),
                                        s.mouseUsed || o.bind(document, "mousemove", Ot),
                                        o.bind(window, "resize scroll orientationchange", r),
                                        Dt("bindEvents");
                                }),
                                r.setContent(S[1], u),
                                r.updateCurrItem(),
                                Dt("afterInit"),
                                vt ||
                                    (b = setInterval(function () {
                                        Zt || q || J || g !== r.currItem.initialZoomLevel || r.updateSize();
                                    }, 1e3)),
                                o.addClass(t, "pswp--visible");
                        }
                    },
                    close: function () {
                        a &&
                            ((a = !1),
                            (l = !0),
                            Dt("close"),
                            o.unbind(window, "resize scroll orientationchange", r),
                            o.unbind(window, "scroll", m.scroll),
                            o.unbind(document, "keydown", r),
                            o.unbind(document, "mousemove", Ot),
                            O.transform && o.unbind(r.scrollWrap, "click", r),
                            q && o.unbind(window, p, r),
                            clearTimeout(U),
                            Dt("unbindEvents"),
                            He(r.currItem, null, !0, r.destroy));
                    },
                    destroy: function () {
                        Dt("destroy"), Ne && clearTimeout(Ne), t.setAttribute("aria-hidden", "true"), (t.className = M), b && clearInterval(b), o.unbind(r.scrollWrap, f, r), o.unbind(window, "scroll", r), fe(), Yt(), (Ct = null);
                    },
                    panTo: function (t, e, i) {
                        i || (t > tt.min.x ? (t = tt.min.x) : t < tt.max.x && (t = tt.max.x), e > tt.min.y ? (e = tt.min.y) : e < tt.max.y && (e = tt.max.y)), (dt.x = t), (dt.y = e), _t();
                    },
                    handleEvent: function (t) {
                        (t = t || window.event), m[t.type] && m[t.type](t);
                    },
                    goTo: function (t) {
                        var e = (t = St(t)) - u;
                        (gt = e), (u = t), (r.currItem = We(u)), (pt -= e), Tt(mt.x * pt), Yt(), (it = !1), r.updateCurrItem();
                    },
                    next: function () {
                        r.goTo(u + 1);
                    },
                    prev: function () {
                        r.goTo(u - 1);
                    },
                    updateCurrZoomItem: function (t) {
                        if ((t && Dt("beforeChange", 0), S[1].el.children.length)) {
                            var e = S[1].el.children[0];
                            et = o.hasClass(e, "pswp__zoom-wrap") ? e.style : null;
                        } else et = null;
                        (tt = r.currItem.bounds), (v = g = r.currItem.initialZoomLevel), (dt.x = tt.center.x), (dt.y = tt.center.y), t && Dt("afterChange");
                    },
                    invalidateCurrItems: function () {
                        w = !0;
                        for (var t = 0; t < 3; t++) S[t].item && (S[t].item.needsUpdate = !0);
                    },
                    updateCurrItem: function (t) {
                        if (0 !== gt) {
                            var e,
                                i = Math.abs(gt);
                            if (!(t && i < 2)) {
                                (r.currItem = We(u)), (bt = !1), Dt("beforeChange", gt), i >= 3 && ((h += gt + (gt > 0 ? -3 : 3)), (i = 3));
                                for (var n = 0; n < i; n++)
                                    gt > 0
                                        ? ((e = S.shift()), (S[2] = e), kt((++h + 2) * mt.x, e.el.style), r.setContent(e, u - i + n + 1 + 1))
                                        : ((e = S.pop()), S.unshift(e), kt(--h * mt.x, e.el.style), r.setContent(e, u + i - n - 1 - 1));
                                if (et && 1 === Math.abs(gt)) {
                                    var o = We(C);
                                    o.initialZoomLevel !== g && (Ze(o, ht), Ke(o), It(o));
                                }
                                (gt = 0), r.updateCurrZoomItem(), (C = u), Dt("afterChange");
                            }
                        }
                    },
                    updateSize: function (e) {
                        if (!vt && s.modal) {
                            var i = o.getScrollY();
                            if ((N !== i && ((t.style.top = i + "px"), (N = i)), !e && xt.x === window.innerWidth && xt.y === window.innerHeight)) return;
                            (xt.x = window.innerWidth), (xt.y = window.innerHeight), (t.style.height = xt.y + "px");
                        }
                        if (((ht.x = r.scrollWrap.clientWidth), (ht.y = r.scrollWrap.clientHeight), jt(), (mt.x = ht.x + Math.round(ht.x * s.spacing)), (mt.y = ht.y), Tt(mt.x * pt), Dt("beforeResize"), void 0 !== h)) {
                            for (var n, a, l, c = 0; c < 3; c++)
                                (n = S[c]),
                                    kt((c + h) * mt.x, n.el.style),
                                    (l = u + c - 1),
                                    s.loop && Ve() > 2 && (l = St(l)),
                                    (a = We(l)) && (w || a.needsUpdate || !a.bounds)
                                        ? (r.cleanSlide(a), r.setContent(n, l), 1 === c && ((r.currItem = a), r.updateCurrZoomItem(!0)), (a.needsUpdate = !1))
                                        : -1 === n.index && l >= 0 && r.setContent(n, l),
                                    a && a.container && (Ze(a, ht), Ke(a), It(a));
                            w = !1;
                        }
                        (v = g = r.currItem.initialZoomLevel), (tt = r.currItem.bounds) && ((dt.x = tt.center.x), (dt.y = tt.center.y), _t(!0)), Dt("resize");
                    },
                    zoomTo: function (t, e, i, n, r) {
                        e && ((v = g), (de.x = Math.abs(e.x) - dt.x), (de.y = Math.abs(e.y) - dt.y), Lt(ut, dt));
                        var s = Ut(t, !1),
                            a = {};
                        Vt("x", s, a, t), Vt("y", s, a, t);
                        var l = g,
                            c = dt.x,
                            u = dt.y;
                        Ft(a);
                        var d = function (e) {
                            1 === e ? ((g = t), (dt.x = a.x), (dt.y = a.y)) : ((g = (t - l) * e + l), (dt.x = (a.x - c) * e + c), (dt.y = (a.y - u) * e + u)), r && r(e), _t(1 === e);
                        };
                        i ? Kt("customZoomTo", 0, 1, i, n || o.easing.sine.inOut, d) : d(1);
                    },
                },
                Jt = {},
                Qt = {},
                te = {},
                ee = {},
                ie = {},
                ne = [],
                oe = {},
                re = [],
                se = {},
                ae = 0,
                le = { x: 0, y: 0 },
                ce = 0,
                ue = { x: 0, y: 0 },
                de = { x: 0, y: 0 },
                he = { x: 0, y: 0 },
                pe = function (t, e) {
                    return (se.x = Math.abs(t.x - e.x)), (se.y = Math.abs(t.y - e.y)), Math.sqrt(se.x * se.x + se.y * se.y);
                },
                fe = function () {
                    Y && (T(Y), (Y = null));
                },
                me = function () {
                    q && ((Y = k(me)), _e());
                },
                ge = function (t, e) {
                    return !(!t || t === document) && !(t.getAttribute("class") && t.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) && (e(t) ? t : ge(t.parentNode, e));
                },
                ve = {},
                ye = function (t, e) {
                    return (ve.prevent = !ge(t.target, s.isClickableElement)), Dt("preventDragEvent", t, e, ve), ve.prevent;
                },
                xe = function (t, e) {
                    return (e.x = t.pageX), (e.y = t.pageY), (e.id = t.identifier), e;
                },
                be = function (t, e, i) {
                    (i.x = 0.5 * (t.x + e.x)), (i.y = 0.5 * (t.y + e.y));
                },
                we = function () {
                    var t = dt.y - r.currItem.initialPosition.y;
                    return 1 - Math.abs(t / (ht.y / 2));
                },
                Se = {},
                Ce = {},
                Ee = [],
                De = function (t) {
                    for (; Ee.length > 0; ) Ee.pop();
                    return (
                        _
                            ? ((lt = 0),
                              ne.forEach(function (t) {
                                  0 === lt ? (Ee[0] = t) : 1 === lt && (Ee[1] = t), lt++;
                              }))
                            : t.type.indexOf("touch") > -1
                            ? t.touches && t.touches.length > 0 && ((Ee[0] = xe(t.touches[0], Se)), t.touches.length > 1 && (Ee[1] = xe(t.touches[1], Ce)))
                            : ((Se.x = t.pageX), (Se.y = t.pageY), (Se.id = ""), (Ee[0] = Se)),
                        Ee
                    );
                },
                Pe = function (t, e) {
                    var i,
                        n,
                        o,
                        a,
                        l = dt[t] + e[t],
                        c = e[t] > 0,
                        u = ue.x + e.x,
                        d = ue.x - oe.x;
                    if (
                        ((i = l > tt.min[t] || l < tt.max[t] ? s.panEndFriction : 1),
                        (l = dt[t] + e[t] * i),
                        (s.allowPanToNext || g === r.currItem.initialZoomLevel) &&
                            (et
                                ? "h" !== nt ||
                                  "x" !== t ||
                                  X ||
                                  (c
                                      ? (l > tt.min[t] && ((i = s.panEndFriction), tt.min[t], (n = tt.min[t] - ut[t])), (n <= 0 || d < 0) && Ve() > 1 ? ((a = u), d < 0 && u > oe.x && (a = oe.x)) : tt.min.x !== tt.max.x && (o = l))
                                      : (l < tt.max[t] && ((i = s.panEndFriction), tt.max[t], (n = ut[t] - tt.max[t])), (n <= 0 || d > 0) && Ve() > 1 ? ((a = u), d > 0 && u < oe.x && (a = oe.x)) : tt.min.x !== tt.max.x && (o = l)))
                                : (a = u),
                            "x" === t))
                    )
                        return void 0 !== a && (Tt(a, !0), (K = a !== oe.x)), tt.min.x !== tt.max.x && (void 0 !== o ? (dt.x = o) : K || (dt.x += e.x * i)), void 0 !== a;
                    it || K || (g > r.currItem.fitRatio && (dt[t] += e[t] * i));
                },
                ze = function (t) {
                    if (!("mousedown" === t.type && t.button > 0))
                        if (Re) t.preventDefault();
                        else if (!j || "mousedown" !== t.type) {
                            if ((ye(t, !0) && t.preventDefault(), Dt("pointerDown"), _)) {
                                var e = o.arraySearch(ne, t.pointerId, "id");
                                e < 0 && (e = ne.length), (ne[e] = { x: t.pageX, y: t.pageY, id: t.pointerId });
                            }
                            var i = De(t),
                                n = i.length;
                            ($ = null),
                                Yt(),
                                (q && 1 !== n) ||
                                    ((q = ot = !0),
                                    o.bind(window, p, r),
                                    (H = at = rt = B = K = G = Z = X = !1),
                                    (nt = null),
                                    Dt("firstTouchStart", i),
                                    Lt(ut, dt),
                                    (ct.x = ct.y = 0),
                                    Lt(ee, i[0]),
                                    Lt(ie, ee),
                                    (oe.x = mt.x * pt),
                                    (re = [{ x: ee.x, y: ee.y }]),
                                    (W = R = Pt()),
                                    Ut(g, !0),
                                    fe(),
                                    me()),
                                !J &&
                                    n > 1 &&
                                    !it &&
                                    !K &&
                                    ((v = g), (X = !1), (J = Z = !0), (ct.y = ct.x = 0), Lt(ut, dt), Lt(Jt, i[0]), Lt(Qt, i[1]), be(Jt, Qt, he), (de.x = Math.abs(he.x) - dt.x), (de.y = Math.abs(he.y) - dt.y), (Q = pe(Jt, Qt)));
                        }
                },
                Ae = function (t) {
                    if ((t.preventDefault(), _)) {
                        var e = o.arraySearch(ne, t.pointerId, "id");
                        if (e > -1) {
                            var i = ne[e];
                            (i.x = t.pageX), (i.y = t.pageY);
                        }
                    }
                    if (q) {
                        var n = De(t);
                        if (nt || G || J) $ = n;
                        else if (ue.x !== mt.x * pt) nt = "h";
                        else {
                            var r = Math.abs(n[0].x - ee.x) - Math.abs(n[0].y - ee.y);
                            Math.abs(r) >= 10 && ((nt = r > 0 ? "h" : "v"), ($ = n));
                        }
                    }
                },
                _e = function () {
                    if ($) {
                        var t = $.length;
                        if (0 !== t)
                            if ((Lt(Jt, $[0]), (te.x = Jt.x - ee.x), (te.y = Jt.y - ee.y), J && t > 1)) {
                                if (
                                    ((ee.x = Jt.x),
                                    (ee.y = Jt.y),
                                    !te.x &&
                                        !te.y &&
                                        (function (t, e) {
                                            return t.x === e.x && t.y === e.y;
                                        })($[1], Qt))
                                )
                                    return;
                                Lt(Qt, $[1]), X || ((X = !0), Dt("zoomGestureStarted"));
                                var e = pe(Jt, Qt),
                                    i = Le(e);
                                i > r.currItem.initialZoomLevel + r.currItem.initialZoomLevel / 15 && (at = !0);
                                var n = 1,
                                    o = Rt(),
                                    a = Wt();
                                if (i < o)
                                    if (s.pinchToClose && !at && v <= r.currItem.initialZoomLevel) {
                                        var l = 1 - (o - i) / (o / 1.2);
                                        zt(l), Dt("onPinchClose", l), (rt = !0);
                                    } else (n = (o - i) / o) > 1 && (n = 1), (i = o - n * (o / 3));
                                else i > a && ((n = (i - a) / (6 * o)) > 1 && (n = 1), (i = a + n * o));
                                n < 0 && (n = 0), be(Jt, Qt, le), (ct.x += le.x - he.x), (ct.y += le.y - he.y), Lt(he, le), (dt.x = Mt("x", i)), (dt.y = Mt("y", i)), (H = i > g), (g = i), _t();
                            } else {
                                if (!nt) return;
                                if ((ot && ((ot = !1), Math.abs(te.x) >= 10 && (te.x -= $[0].x - ie.x), Math.abs(te.y) >= 10 && (te.y -= $[0].y - ie.y)), (ee.x = Jt.x), (ee.y = Jt.y), 0 === te.x && 0 === te.y)) return;
                                if ("v" === nt && s.closeOnVerticalDrag && "fit" === s.scaleMode && g === r.currItem.initialZoomLevel) {
                                    (ct.y += te.y), (dt.y += te.y);
                                    var c = we();
                                    return (B = !0), Dt("onVerticalDrag", c), zt(c), void _t();
                                }
                                !(function (t, e, i) {
                                    if (t - W > 50) {
                                        var n = re.length > 2 ? re.shift() : {};
                                        (n.x = e), (n.y = i), re.push(n), (W = t);
                                    }
                                })(Pt(), Jt.x, Jt.y),
                                    (G = !0),
                                    (tt = r.currItem.bounds),
                                    Pe("x", te) || (Pe("y", te), Ft(dt), _t());
                            }
                    }
                },
                Ie = function (t) {
                    if (O.isOldAndroid) {
                        if (j && "mouseup" === t.type) return;
                        t.type.indexOf("touch") > -1 &&
                            (clearTimeout(j),
                            (j = setTimeout(function () {
                                j = 0;
                            }, 600)));
                    }
                    var e;
                    if ((Dt("pointerUp"), ye(t, !1) && t.preventDefault(), _)) {
                        var i = o.arraySearch(ne, t.pointerId, "id");
                        i > -1 &&
                            ((e = ne.splice(i, 1)[0]), navigator.msPointerEnabled ? ((e.type = { 4: "mouse", 2: "touch", 3: "pen" }[t.pointerType]), e.type || (e.type = t.pointerType || "mouse")) : (e.type = t.pointerType || "mouse"));
                    }
                    var n,
                        a = De(t),
                        l = a.length;
                    if (("mouseup" === t.type && (l = 0), 2 === l)) return ($ = null), !0;
                    1 === l && Lt(ie, a[0]),
                        0 !== l ||
                            nt ||
                            it ||
                            (e || ("mouseup" === t.type ? (e = { x: t.pageX, y: t.pageY, type: "mouse" }) : t.changedTouches && t.changedTouches[0] && (e = { x: t.changedTouches[0].pageX, y: t.changedTouches[0].pageY, type: "touch" })),
                            Dt("touchRelease", t, e));
                    var c = -1;
                    if (
                        (0 === l && ((q = !1), o.unbind(window, p, r), fe(), J ? (c = 0) : -1 !== ce && (c = Pt() - ce)),
                        (ce = 1 === l ? Pt() : -1),
                        (n = -1 !== c && c < 150 ? "zoom" : "swipe"),
                        J && l < 2 && ((J = !1), 1 === l && (n = "zoomPointerUp"), Dt("zoomGestureEnded")),
                        ($ = null),
                        G || X || it || B)
                    )
                        if ((Yt(), V || (V = ke()), V.calculateSwipeSpeed("x"), B))
                            if (we() < s.verticalDragRange) r.close();
                            else {
                                var u = dt.y,
                                    d = st;
                                Kt("verticalDrag", 0, 1, 300, o.easing.cubic.out, function (t) {
                                    (dt.y = (r.currItem.initialPosition.y - u) * t + u), zt((1 - d) * t + d), _t();
                                }),
                                    Dt("onVerticalDrag", 1);
                            }
                        else {
                            if ((K || it) && 0 === l) {
                                if (Me(n, V)) return;
                                n = "zoomPointerUp";
                            }
                            it || ("swipe" === n ? !K && g > r.currItem.fitRatio && Te(V) : Fe());
                        }
                },
                ke = function () {
                    var t,
                        e,
                        i = {
                            lastFlickOffset: {},
                            lastFlickDist: {},
                            lastFlickSpeed: {},
                            slowDownRatio: {},
                            slowDownRatioReverse: {},
                            speedDecelerationRatio: {},
                            speedDecelerationRatioAbs: {},
                            distanceOffset: {},
                            backAnimDestination: {},
                            backAnimStarted: {},
                            calculateSwipeSpeed: function (n) {
                                re.length > 1 ? ((t = Pt() - W + 50), (e = re[re.length - 2][n])) : ((t = Pt() - R), (e = ie[n])),
                                    (i.lastFlickOffset[n] = ee[n] - e),
                                    (i.lastFlickDist[n] = Math.abs(i.lastFlickOffset[n])),
                                    i.lastFlickDist[n] > 20 ? (i.lastFlickSpeed[n] = i.lastFlickOffset[n] / t) : (i.lastFlickSpeed[n] = 0),
                                    Math.abs(i.lastFlickSpeed[n]) < 0.1 && (i.lastFlickSpeed[n] = 0),
                                    (i.slowDownRatio[n] = 0.95),
                                    (i.slowDownRatioReverse[n] = 1 - i.slowDownRatio[n]),
                                    (i.speedDecelerationRatio[n] = 1);
                            },
                            calculateOverBoundsAnimOffset: function (t, e) {
                                i.backAnimStarted[t] ||
                                    (dt[t] > tt.min[t] ? (i.backAnimDestination[t] = tt.min[t]) : dt[t] < tt.max[t] && (i.backAnimDestination[t] = tt.max[t]),
                                    void 0 !== i.backAnimDestination[t] &&
                                        ((i.slowDownRatio[t] = 0.7),
                                        (i.slowDownRatioReverse[t] = 1 - i.slowDownRatio[t]),
                                        i.speedDecelerationRatioAbs[t] < 0.05 &&
                                            ((i.lastFlickSpeed[t] = 0),
                                            (i.backAnimStarted[t] = !0),
                                            Kt("bounceZoomPan" + t, dt[t], i.backAnimDestination[t], e || 300, o.easing.sine.out, function (e) {
                                                (dt[t] = e), _t();
                                            }))));
                            },
                            calculateAnimOffset: function (t) {
                                i.backAnimStarted[t] ||
                                    ((i.speedDecelerationRatio[t] = i.speedDecelerationRatio[t] * (i.slowDownRatio[t] + i.slowDownRatioReverse[t] - (i.slowDownRatioReverse[t] * i.timeDiff) / 10)),
                                    (i.speedDecelerationRatioAbs[t] = Math.abs(i.lastFlickSpeed[t] * i.speedDecelerationRatio[t])),
                                    (i.distanceOffset[t] = i.lastFlickSpeed[t] * i.speedDecelerationRatio[t] * i.timeDiff),
                                    (dt[t] += i.distanceOffset[t]));
                            },
                            panAnimLoop: function () {
                                if (
                                    qt.zoomPan &&
                                    ((qt.zoomPan.raf = k(i.panAnimLoop)),
                                    (i.now = Pt()),
                                    (i.timeDiff = i.now - i.lastNow),
                                    (i.lastNow = i.now),
                                    i.calculateAnimOffset("x"),
                                    i.calculateAnimOffset("y"),
                                    _t(),
                                    i.calculateOverBoundsAnimOffset("x"),
                                    i.calculateOverBoundsAnimOffset("y"),
                                    i.speedDecelerationRatioAbs.x < 0.05 && i.speedDecelerationRatioAbs.y < 0.05)
                                )
                                    return (dt.x = Math.round(dt.x)), (dt.y = Math.round(dt.y)), _t(), void Xt("zoomPan");
                            },
                        };
                    return i;
                },
                Te = function (t) {
                    if ((t.calculateSwipeSpeed("y"), (tt = r.currItem.bounds), (t.backAnimDestination = {}), (t.backAnimStarted = {}), Math.abs(t.lastFlickSpeed.x) <= 0.05 && Math.abs(t.lastFlickSpeed.y) <= 0.05))
                        return (t.speedDecelerationRatioAbs.x = t.speedDecelerationRatioAbs.y = 0), t.calculateOverBoundsAnimOffset("x"), t.calculateOverBoundsAnimOffset("y"), !0;
                    Gt("zoomPan"), (t.lastNow = Pt()), t.panAnimLoop();
                },
                Me = function (t, e) {
                    var i, n, a;
                    if ((it || (ae = u), "swipe" === t)) {
                        var l = ee.x - ie.x,
                            c = e.lastFlickDist.x < 10;
                        l > 30 && (c || e.lastFlickOffset.x > 20) ? (n = -1) : l < -30 && (c || e.lastFlickOffset.x < -20) && (n = 1);
                    }
                    n && ((u += n) < 0 ? ((u = s.loop ? Ve() - 1 : 0), (a = !0)) : u >= Ve() && ((u = s.loop ? 0 : Ve() - 1), (a = !0)), (a && !s.loop) || ((gt += n), (pt -= n), (i = !0)));
                    var d,
                        h = mt.x * pt,
                        p = Math.abs(h - ue.x);
                    return (
                        i || h > ue.x == e.lastFlickSpeed.x > 0 ? ((d = Math.abs(e.lastFlickSpeed.x) > 0 ? p / Math.abs(e.lastFlickSpeed.x) : 333), (d = Math.min(d, 400)), (d = Math.max(d, 250))) : (d = 333),
                        ae === u && (i = !1),
                        (it = !0),
                        Dt("mainScrollAnimStart"),
                        Kt("mainScroll", ue.x, h, d, o.easing.cubic.out, Tt, function () {
                            Yt(), (it = !1), (ae = -1), (i || ae !== u) && r.updateCurrItem(), Dt("mainScrollAnimComplete");
                        }),
                        i && r.updateCurrItem(!0),
                        i
                    );
                },
                Le = function (t) {
                    return (1 / Q) * t * v;
                },
                Fe = function () {
                    var t = g,
                        e = Rt(),
                        i = Wt();
                    g < e ? (t = e) : g > i && (t = i);
                    var n,
                        s = st;
                    return rt && !H && !at && g < e
                        ? (r.close(), !0)
                        : (rt &&
                              (n = function (t) {
                                  zt((1 - s) * t + s);
                              }),
                          r.zoomTo(t, 0, 200, o.easing.cubic.out, n),
                          !0);
                };
            wt("Gestures", {
                publicMethods: {
                    initGestures: function () {
                        var t = function (t, e, i, n, o) {
                            (E = t + e), (D = t + i), (P = t + n), (z = o ? t + o : "");
                        };
                        (_ = O.pointerEvent) && O.touch && (O.touch = !1),
                            _
                                ? navigator.msPointerEnabled
                                    ? t("MSPointer", "Down", "Move", "Up", "Cancel")
                                    : t("pointer", "down", "move", "up", "cancel")
                                : O.touch
                                ? (t("touch", "start", "move", "end", "cancel"), (I = !0))
                                : t("mouse", "down", "move", "up"),
                            (p = D + " " + P + " " + z),
                            (f = E),
                            _ && !I && (I = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1),
                            (r.likelyTouchDevice = I),
                            (m[E] = ze),
                            (m[D] = Ae),
                            (m[P] = Ie),
                            z && (m[z] = m[P]),
                            O.touch && ((f += " mousedown"), (p += " mousemove mouseup"), (m.mousedown = m[E]), (m.mousemove = m[D]), (m.mouseup = m[P])),
                            I || (s.allowPanToNext = !1);
                    },
                },
            });
            var Ne,
                Oe,
                Ue,
                Re,
                We,
                Ve,
                He = function (e, i, n, a) {
                    var l;
                    Ne && clearTimeout(Ne), (Re = !0), (Ue = !0), e.initialLayout ? ((l = e.initialLayout), (e.initialLayout = null)) : (l = s.getThumbBoundsFn && s.getThumbBoundsFn(u));
                    var d,
                        h,
                        p = n ? s.hideAnimationDuration : s.showAnimationDuration,
                        f = function () {
                            Xt("initialZoom"),
                                n ? (r.template.removeAttribute("style"), r.bg.removeAttribute("style")) : (zt(1), i && (i.style.display = "block"), o.addClass(t, "pswp--animated-in"), Dt("initialZoom" + (n ? "OutEnd" : "InEnd"))),
                                a && a(),
                                (Re = !1);
                        };
                    if (!p || !l || void 0 === l.x)
                        return (
                            Dt("initialZoom" + (n ? "Out" : "In")),
                            (g = e.initialZoomLevel),
                            Lt(dt, e.initialPosition),
                            _t(),
                            (t.style.opacity = n ? 0 : 1),
                            zt(1),
                            void (p
                                ? setTimeout(function () {
                                      f();
                                  }, p)
                                : f())
                        );
                    (d = c),
                        (h = !r.currItem.src || r.currItem.loadError || s.showHideOpacity),
                        e.miniImg && (e.miniImg.style.webkitBackfaceVisibility = "hidden"),
                        n || ((g = l.w / e.w), (dt.x = l.x), (dt.y = l.y - L), (r[h ? "template" : "bg"].style.opacity = 0.001), _t()),
                        Gt("initialZoom"),
                        n && !d && o.removeClass(t, "pswp--animated-in"),
                        h &&
                            (n
                                ? o[(d ? "remove" : "add") + "Class"](t, "pswp--animate_opacity")
                                : setTimeout(function () {
                                      o.addClass(t, "pswp--animate_opacity");
                                  }, 30)),
                        (Ne = setTimeout(
                            function () {
                                if ((Dt("initialZoom" + (n ? "Out" : "In")), n)) {
                                    var i = l.w / e.w,
                                        r = { x: dt.x, y: dt.y },
                                        s = g,
                                        a = st,
                                        c = function (e) {
                                            1 === e ? ((g = i), (dt.x = l.x), (dt.y = l.y - N)) : ((g = (i - s) * e + s), (dt.x = (l.x - r.x) * e + r.x), (dt.y = (l.y - N - r.y) * e + r.y)),
                                                _t(),
                                                h ? (t.style.opacity = 1 - e) : zt(a - e * a);
                                        };
                                    d ? Kt("initialZoom", 0, 1, p, o.easing.cubic.out, c, f) : (c(1), (Ne = setTimeout(f, p + 20)));
                                } else (g = e.initialZoomLevel), Lt(dt, e.initialPosition), _t(), zt(1), h ? (t.style.opacity = 1) : zt(1), (Ne = setTimeout(f, p + 20));
                            },
                            n ? 25 : 90
                        ));
                },
                Be = {},
                je = [],
                qe = {
                    index: 0,
                    errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
                    forceProgressiveLoading: !1,
                    preload: [1, 1],
                    getNumItemsFn: function () {
                        return Oe.length;
                    },
                },
                Ze = function (t, e, i) {
                    if (t.src && !t.loadError) {
                        var n = !i;
                        if ((n && (t.vGap || (t.vGap = { top: 0, bottom: 0 }), Dt("parseVerticalMargin", t)), (Be.x = e.x), (Be.y = e.y - t.vGap.top - t.vGap.bottom), n)) {
                            var o = Be.x / t.w,
                                r = Be.y / t.h;
                            t.fitRatio = o < r ? o : r;
                            var a = s.scaleMode;
                            "orig" === a ? (i = 1) : "fit" === a ? (i = t.fitRatio) : "zoom" === a && (i = Math.max(t.initialZoomLevel || 1, t.fitRatio)),
                                i > 1 && (i = 1),
                                (t.initialZoomLevel = i),
                                t.bounds || (t.bounds = { center: { x: 0, y: 0 }, max: { x: 0, y: 0 }, min: { x: 0, y: 0 } });
                        }
                        if (!i) return;
                        return (
                            (function (t, e, i) {
                                var n = t.bounds;
                                (n.center.x = Math.round((Be.x - e) / 2)),
                                    (n.center.y = Math.round((Be.y - i) / 2) + t.vGap.top),
                                    (n.max.x = e > Be.x ? Math.round(Be.x - e) : n.center.x),
                                    (n.max.y = i > Be.y ? Math.round(Be.y - i) + t.vGap.top : n.center.y),
                                    (n.min.x = e > Be.x ? 0 : n.center.x),
                                    (n.min.y = i > Be.y ? t.vGap.top : n.center.y);
                            })(t, t.w * i, t.h * i),
                            n && i === t.initialZoomLevel && (t.initialPosition = t.bounds.center),
                            t.bounds
                        );
                    }
                    return (t.w = t.h = 0), (t.initialZoomLevel = t.fitRatio = 1), (t.bounds = { center: { x: 0, y: 0 }, max: { x: 0, y: 0 }, min: { x: 0, y: 0 } }), (t.initialPosition = t.bounds.center), t.bounds;
                },
                Xe = function (t, e, i, n, o, s) {
                    e.loadError ||
                        (n &&
                            ((e.imageAppended = !0),
                            Ke(e, n, e === r.currItem && bt),
                            i.appendChild(n),
                            s &&
                                setTimeout(function () {
                                    e && e.loaded && e.placeholder && ((e.placeholder.style.display = "none"), (e.placeholder = null));
                                }, 500)));
                },
                Ge = function (t) {
                    (t.loading = !0), (t.loaded = !1);
                    var e = (t.img = o.createEl("pswp__img", "img")),
                        i = function () {
                            (t.loading = !1), (t.loaded = !0), t.loadComplete ? t.loadComplete(t) : (t.img = null), (e.onload = e.onerror = null), (e = null);
                        };
                    return (
                        (e.onload = i),
                        (e.onerror = function () {
                            (t.loadError = !0), i();
                        }),
                        (e.src = t.src),
                        e
                    );
                },
                Ye = function (t, e) {
                    if (t.src && t.loadError && t.container) return e && (t.container.innerHTML = ""), (t.container.innerHTML = s.errorMsg.replace("%url%", t.src)), !0;
                },
                Ke = function (t, e, i) {
                    if (t.src) {
                        e || (e = t.container.lastChild);
                        var n = i ? t.w : Math.round(t.w * t.fitRatio),
                            o = i ? t.h : Math.round(t.h * t.fitRatio);
                        t.placeholder && !t.loaded && ((t.placeholder.style.width = n + "px"), (t.placeholder.style.height = o + "px")), (e.style.width = n + "px"), (e.style.height = o + "px");
                    }
                },
                $e = function () {
                    if (je.length) {
                        for (var t, e = 0; e < je.length; e++) (t = je[e]).holder.index === t.index && Xe(t.index, t.item, t.baseDiv, t.img, 0, t.clearPlaceholder);
                        je = [];
                    }
                };
            wt("Controller", {
                publicMethods: {
                    lazyLoadItem: function (t) {
                        t = St(t);
                        var e = We(t);
                        e && ((!e.loaded && !e.loading) || w) && (Dt("gettingData", t, e), e.src && Ge(e));
                    },
                    initController: function () {
                        o.extend(s, qe, !0),
                            (r.items = Oe = i),
                            (We = r.getItemAt),
                            (Ve = s.getNumItemsFn),
                            s.loop,
                            Ve() < 3 && (s.loop = !1),
                            Et("beforeChange", function (t) {
                                var e,
                                    i = s.preload,
                                    n = null === t || t >= 0,
                                    o = Math.min(i[0], Ve()),
                                    a = Math.min(i[1], Ve());
                                for (e = 1; e <= (n ? a : o); e++) r.lazyLoadItem(u + e);
                                for (e = 1; e <= (n ? o : a); e++) r.lazyLoadItem(u - e);
                            }),
                            Et("initialLayout", function () {
                                r.currItem.initialLayout = s.getThumbBoundsFn && s.getThumbBoundsFn(u);
                            }),
                            Et("mainScrollAnimComplete", $e),
                            Et("initialZoomInEnd", $e),
                            Et("destroy", function () {
                                for (var t, e = 0; e < Oe.length; e++)
                                    (t = Oe[e]).container && (t.container = null), t.placeholder && (t.placeholder = null), t.img && (t.img = null), t.preloader && (t.preloader = null), t.loadError && (t.loaded = t.loadError = !1);
                                je = null;
                            });
                    },
                    getItemAt: function (t) {
                        return t >= 0 && void 0 !== Oe[t] && Oe[t];
                    },
                    allowProgressiveImg: function () {
                        return s.forceProgressiveLoading || !I || s.mouseUsed || screen.width > 1200;
                    },
                    setContent: function (t, e) {
                        s.loop && (e = St(e));
                        var i = r.getItemAt(t.index);
                        i && (i.container = null);
                        var n,
                            l = r.getItemAt(e);
                        if (l) {
                            Dt("gettingData", e, l), (t.index = e), (t.item = l);
                            var c = (l.container = o.createEl("pswp__zoom-wrap"));
                            if ((!l.src && l.html && (l.html.tagName ? c.appendChild(l.html) : (c.innerHTML = l.html)), Ye(l), Ze(l, ht), !l.src || l.loadError || l.loaded))
                                l.src && !l.loadError && (((n = o.createEl("pswp__img", "img")).style.opacity = 1), (n.src = l.src), Ke(l, n), Xe(0, l, c, n));
                            else {
                                if (
                                    ((l.loadComplete = function (i) {
                                        if (a) {
                                            if (t && t.index === e) {
                                                if (Ye(i, !0)) return (i.loadComplete = i.img = null), Ze(i, ht), It(i), void (t.index === u && r.updateCurrZoomItem());
                                                i.imageAppended
                                                    ? !Re && i.placeholder && ((i.placeholder.style.display = "none"), (i.placeholder = null))
                                                    : O.transform && (it || Re)
                                                    ? je.push({ item: i, baseDiv: c, img: i.img, index: e, holder: t, clearPlaceholder: !0 })
                                                    : Xe(0, i, c, i.img, 0, !0);
                                            }
                                            (i.loadComplete = null), (i.img = null), Dt("imageLoadComplete", e, i);
                                        }
                                    }),
                                    o.features.transform)
                                ) {
                                    var d = "pswp__img pswp__img--placeholder";
                                    d += l.msrc ? "" : " pswp__img--placeholder--blank";
                                    var h = o.createEl(d, l.msrc ? "img" : "");
                                    l.msrc && (h.src = l.msrc), Ke(l, h), c.appendChild(h), (l.placeholder = h);
                                }
                                l.loading || Ge(l), r.allowProgressiveImg() && (!Ue && O.transform ? je.push({ item: l, baseDiv: c, img: l.img, index: e, holder: t }) : Xe(0, l, c, l.img, 0, !0));
                            }
                            Ue || e !== u ? It(l) : ((et = c.style), He(l, n || l.img)), (t.el.innerHTML = ""), t.el.appendChild(c);
                        } else t.el.innerHTML = "";
                    },
                    cleanSlide: function (t) {
                        t.img && (t.img.onload = t.img.onerror = null), (t.loaded = t.loading = t.img = t.imageAppended = !1);
                    },
                },
            });
            var Je,
                Qe,
                ti = {},
                ei = function (t, e, i) {
                    var n = document.createEvent("CustomEvent"),
                        o = { origEvent: t, target: t.target, releasePoint: e, pointerType: i || "touch" };
                    n.initCustomEvent("pswpTap", !0, !0, o), t.target.dispatchEvent(n);
                };
            wt("Tap", {
                publicMethods: {
                    initTap: function () {
                        Et("firstTouchStart", r.onTapStart),
                            Et("touchRelease", r.onTapRelease),
                            Et("destroy", function () {
                                (ti = {}), (Je = null);
                            });
                    },
                    onTapStart: function (t) {
                        t.length > 1 && (clearTimeout(Je), (Je = null));
                    },
                    onTapRelease: function (t, e) {
                        var i, n;
                        if (e && !G && !Z && !Zt) {
                            var r = e;
                            if (Je && (clearTimeout(Je), (Je = null), (i = r), (n = ti), Math.abs(i.x - n.x) < 25 && Math.abs(i.y - n.y) < 25)) return void Dt("doubleTap", r);
                            if ("mouse" === e.type) return void ei(t, e, "mouse");
                            if ("BUTTON" === t.target.tagName.toUpperCase() || o.hasClass(t.target, "pswp__single-tap")) return void ei(t, e);
                            Lt(ti, r),
                                (Je = setTimeout(function () {
                                    ei(t, e), (Je = null);
                                }, 300));
                        }
                    },
                },
            }),
                wt("DesktopZoom", {
                    publicMethods: {
                        initDesktopZoom: function () {
                            F ||
                                (I
                                    ? Et("mouseUsed", function () {
                                          r.setupDesktopZoom();
                                      })
                                    : r.setupDesktopZoom(!0));
                        },
                        setupDesktopZoom: function (e) {
                            Qe = {};
                            var i = "wheel mousewheel DOMMouseScroll";
                            Et("bindEvents", function () {
                                o.bind(t, i, r.handleMouseWheel);
                            }),
                                Et("unbindEvents", function () {
                                    Qe && o.unbind(t, i, r.handleMouseWheel);
                                }),
                                (r.mouseZoomedIn = !1);
                            var n,
                                s = function () {
                                    r.mouseZoomedIn && (o.removeClass(t, "pswp--zoomed-in"), (r.mouseZoomedIn = !1)), g < 1 ? o.addClass(t, "pswp--zoom-allowed") : o.removeClass(t, "pswp--zoom-allowed"), a();
                                },
                                a = function () {
                                    n && (o.removeClass(t, "pswp--dragging"), (n = !1));
                                };
                            Et("resize", s),
                                Et("afterChange", s),
                                Et("pointerDown", function () {
                                    r.mouseZoomedIn && ((n = !0), o.addClass(t, "pswp--dragging"));
                                }),
                                Et("pointerUp", a),
                                e || s();
                        },
                        handleMouseWheel: function (t) {
                            if (g <= r.currItem.fitRatio) return s.modal && (!s.closeOnScroll || Zt || q ? t.preventDefault() : A && Math.abs(t.deltaY) > 2 && ((c = !0), r.close())), !0;
                            if ((t.stopPropagation(), (Qe.x = 0), "deltaX" in t)) 1 === t.deltaMode ? ((Qe.x = 18 * t.deltaX), (Qe.y = 18 * t.deltaY)) : ((Qe.x = t.deltaX), (Qe.y = t.deltaY));
                            else if ("wheelDelta" in t) t.wheelDeltaX && (Qe.x = -0.16 * t.wheelDeltaX), t.wheelDeltaY ? (Qe.y = -0.16 * t.wheelDeltaY) : (Qe.y = -0.16 * t.wheelDelta);
                            else {
                                if (!("detail" in t)) return;
                                Qe.y = t.detail;
                            }
                            Ut(g, !0);
                            var e = dt.x - Qe.x,
                                i = dt.y - Qe.y;
                            (s.modal || (e <= tt.min.x && e >= tt.max.x && i <= tt.min.y && i >= tt.max.y)) && t.preventDefault(), r.panTo(e, i);
                        },
                        toggleDesktopZoom: function (e) {
                            e = e || { x: ht.x / 2 + ft.x, y: ht.y / 2 + ft.y };
                            var i = s.getDoubleTapZoom(!0, r.currItem),
                                n = g === i;
                            (r.mouseZoomedIn = !n), r.zoomTo(n ? r.currItem.initialZoomLevel : i, e, 333), o[(n ? "remove" : "add") + "Class"](t, "pswp--zoomed-in");
                        },
                    },
                }),
                o.extend(r, $t);
        };
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? (module.exports = e()) : (t.PhotoSwipeUI_Default = e());
    })(this, function () {
        "use strict";
        return function (t, e) {
            var i,
                n,
                o,
                r,
                s,
                a,
                l,
                c,
                u,
                d,
                h,
                p,
                f,
                m,
                g,
                v,
                y,
                x,
                b = this,
                w = !1,
                S = !0,
                C = !0,
                E = {
                    barsSize: { top: 44, bottom: "auto" },
                    closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
                    timeToIdle: 4e3,
                    timeToIdleOutside: 1e3,
                    loadingIndicatorDelay: 1e3,
                    addCaptionHTMLFn: function (t, e) {
                        return t.title ? ((e.children[0].innerHTML = t.title), !0) : ((e.children[0].innerHTML = ""), !1);
                    },
                    closeEl: !0,
                    captionEl: !0,
                    fullscreenEl: !0,
                    zoomEl: !0,
                    shareEl: !0,
                    counterEl: !0,
                    arrowEl: !0,
                    preloaderEl: !0,
                    tapToClose: !1,
                    tapToToggleControls: !0,
                    clickToCloseNonZoomable: !0,
                    shareButtons: [
                        { id: "facebook", label: "Share on Facebook", url: "https://www.facebook.com/sharer/sharer.php?u={{url}}" },
                        { id: "twitter", label: "Tweet", url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}" },
                        { id: "pinterest", label: "Pin it", url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}" },
                        { id: "download", label: "Download image", url: "{{raw_image_url}}", download: !0 },
                    ],
                    getImageURLForShare: function () {
                        return t.currItem.src || "";
                    },
                    getPageURLForShare: function () {
                        return window.location.href;
                    },
                    getTextForShare: function () {
                        return t.currItem.title || "";
                    },
                    indexIndicatorSep: " / ",
                    fitControlsWidth: 1200,
                },
                D = function (t) {
                    if (v) return !0;
                    (t = t || window.event), g.timeToIdle && g.mouseUsed && !u && F();
                    for (var i, n, o = (t.target || t.srcElement).getAttribute("class") || "", r = 0; r < R.length; r++) (i = R[r]).onTap && o.indexOf("pswp__" + i.name) > -1 && (i.onTap(), (n = !0));
                    if (n) {
                        t.stopPropagation && t.stopPropagation(), (v = !0);
                        var s = e.features.isOldAndroid ? 600 : 30;
                        setTimeout(function () {
                            v = !1;
                        }, s);
                    }
                },
                P = function () {
                    return !t.likelyTouchDevice || g.mouseUsed || screen.width > g.fitControlsWidth;
                },
                z = function (t, i, n) {
                    e[(n ? "add" : "remove") + "Class"](t, "pswp__" + i);
                },
                A = function () {
                    var t = 1 === g.getNumItemsFn();
                    t !== m && (z(n, "ui--one-slide", t), (m = t));
                },
                _ = function () {
                    z(l, "share-modal--hidden", C);
                },
                I = function () {
                    return (
                        (C = !C)
                            ? (e.removeClass(l, "pswp__share-modal--fade-in"),
                              setTimeout(function () {
                                  C && _();
                              }, 300))
                            : (_(),
                              setTimeout(function () {
                                  C || e.addClass(l, "pswp__share-modal--fade-in");
                              }, 30)),
                        C || T(),
                        !1
                    );
                },
                k = function (e) {
                    var i = (e = e || window.event).target || e.srcElement;
                    return (
                        t.shout("shareLinkClick", e, i),
                        !(
                            !i.href ||
                            (!i.hasAttribute("download") &&
                                (window.open(i.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), C || I(), 1))
                        )
                    );
                },
                T = function () {
                    for (var t, e, i, n, o = "", r = 0; r < g.shareButtons.length; r++)
                        (t = g.shareButtons[r]),
                            (e = g.getImageURLForShare(t)),
                            (i = g.getPageURLForShare(t)),
                            (n = g.getTextForShare(t)),
                            (o +=
                                '<a href="' +
                                t.url.replace("{{url}}", encodeURIComponent(i)).replace("{{image_url}}", encodeURIComponent(e)).replace("{{raw_image_url}}", e).replace("{{text}}", encodeURIComponent(n)) +
                                '" target="_blank" class="pswp__share--' +
                                t.id +
                                '"' +
                                (t.download ? "download" : "") +
                                ">" +
                                t.label +
                                "</a>"),
                            g.parseShareButtonOut && (o = g.parseShareButtonOut(t, o));
                    (l.children[0].innerHTML = o), (l.children[0].onclick = k);
                },
                M = function (t) {
                    for (var i = 0; i < g.closeElClasses.length; i++) if (e.hasClass(t, "pswp__" + g.closeElClasses[i])) return !0;
                },
                L = 0,
                F = function () {
                    clearTimeout(x), (L = 0), u && b.setIdle(!1);
                },
                N = function (t) {
                    var e = (t = t || window.event).relatedTarget || t.toElement;
                    (e && "HTML" !== e.nodeName) ||
                        (clearTimeout(x),
                        (x = setTimeout(function () {
                            b.setIdle(!0);
                        }, g.timeToIdleOutside)));
                },
                O = function (t) {
                    p !== t && (z(h, "preloader--active", !t), (p = t));
                },
                U = function (t) {
                    var i = t.vGap;
                    if (P()) {
                        var s = g.barsSize;
                        if (g.captionEl && "auto" === s.bottom)
                            if ((r || ((r = e.createEl("pswp__caption pswp__caption--fake")).appendChild(e.createEl("pswp__caption__center")), n.insertBefore(r, o), e.addClass(n, "pswp__ui--fit")), g.addCaptionHTMLFn(t, r, !0))) {
                                var a = r.clientHeight;
                                i.bottom = parseInt(a, 10) || 44;
                            } else i.bottom = s.top;
                        else i.bottom = "auto" === s.bottom ? 0 : s.bottom;
                        i.top = s.top;
                    } else i.top = i.bottom = 0;
                },
                R = [
                    {
                        name: "caption",
                        option: "captionEl",
                        onInit: function (t) {
                            o = t;
                        },
                    },
                    {
                        name: "share-modal",
                        option: "shareEl",
                        onInit: function (t) {
                            l = t;
                        },
                        onTap: function () {
                            I();
                        },
                    },
                    {
                        name: "button--share",
                        option: "shareEl",
                        onInit: function (t) {
                            a = t;
                        },
                        onTap: function () {
                            I();
                        },
                    },
                    { name: "button--zoom", option: "zoomEl", onTap: t.toggleDesktopZoom },
                    {
                        name: "counter",
                        option: "counterEl",
                        onInit: function (t) {
                            s = t;
                        },
                    },
                    { name: "button--close", option: "closeEl", onTap: t.close },
                    { name: "button--arrow--left", option: "arrowEl", onTap: t.prev },
                    { name: "button--arrow--right", option: "arrowEl", onTap: t.next },
                    {
                        name: "button--fs",
                        option: "fullscreenEl",
                        onTap: function () {
                            i.isFullscreen() ? i.exit() : i.enter();
                        },
                    },
                    {
                        name: "preloader",
                        option: "preloaderEl",
                        onInit: function (t) {
                            h = t;
                        },
                    },
                ];
            (b.init = function () {
                e.extend(t.options, E, !0),
                    (g = t.options),
                    (n = e.getChildByClass(t.scrollWrap, "pswp__ui")),
                    (d = t.listen),
                    (function () {
                        var t;
                        d("onVerticalDrag", function (t) {
                            S && t < 0.95 ? b.hideControls() : !S && t >= 0.95 && b.showControls();
                        }),
                            d("onPinchClose", function (e) {
                                S && e < 0.9 ? (b.hideControls(), (t = !0)) : t && !S && e > 0.9 && b.showControls();
                            }),
                            d("zoomGestureEnded", function () {
                                (t = !1) && !S && b.showControls();
                            });
                    })(),
                    d("beforeChange", b.update),
                    d("doubleTap", function (e) {
                        var i = t.currItem.initialZoomLevel;
                        t.getZoomLevel() !== i ? t.zoomTo(i, e, 333) : t.zoomTo(g.getDoubleTapZoom(!1, t.currItem), e, 333);
                    }),
                    d("preventDragEvent", function (t, e, i) {
                        var n = t.target || t.srcElement;
                        n && n.getAttribute("class") && t.type.indexOf("mouse") > -1 && (n.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(n.tagName)) && (i.prevent = !1);
                    }),
                    d("bindEvents", function () {
                        e.bind(n, "pswpTap click", D), e.bind(t.scrollWrap, "pswpTap", b.onGlobalTap), t.likelyTouchDevice || e.bind(t.scrollWrap, "mouseover", b.onMouseOver);
                    }),
                    d("unbindEvents", function () {
                        C || I(),
                            y && clearInterval(y),
                            e.unbind(document, "mouseout", N),
                            e.unbind(document, "mousemove", F),
                            e.unbind(n, "pswpTap click", D),
                            e.unbind(t.scrollWrap, "pswpTap", b.onGlobalTap),
                            e.unbind(t.scrollWrap, "mouseover", b.onMouseOver),
                            i && (e.unbind(document, i.eventK, b.updateFullscreen), i.isFullscreen() && ((g.hideAnimationDuration = 0), i.exit()), (i = null));
                    }),
                    d("destroy", function () {
                        g.captionEl && (r && n.removeChild(r), e.removeClass(o, "pswp__caption--empty")), l && (l.children[0].onclick = null), e.removeClass(n, "pswp__ui--over-close"), e.addClass(n, "pswp__ui--hidden"), b.setIdle(!1);
                    }),
                    g.showAnimationDuration || e.removeClass(n, "pswp__ui--hidden"),
                    d("initialZoomIn", function () {
                        g.showAnimationDuration && e.removeClass(n, "pswp__ui--hidden");
                    }),
                    d("initialZoomOut", function () {
                        e.addClass(n, "pswp__ui--hidden");
                    }),
                    d("parseVerticalMargin", U),
                    (function () {
                        var t,
                            i,
                            o,
                            r = function (n) {
                                if (n)
                                    for (var r = n.length, s = 0; s < r; s++) {
                                        (t = n[s]), (i = t.className);
                                        for (var a = 0; a < R.length; a++)
                                            (o = R[a]), i.indexOf("pswp__" + o.name) > -1 && (g[o.option] ? (e.removeClass(t, "pswp__element--disabled"), o.onInit && o.onInit(t)) : e.addClass(t, "pswp__element--disabled"));
                                    }
                            };
                        r(n.children);
                        var s = e.getChildByClass(n, "pswp__top-bar");
                        s && r(s.children);
                    })(),
                    g.shareEl && a && l && (C = !0),
                    A(),
                    g.timeToIdle &&
                        d("mouseUsed", function () {
                            e.bind(document, "mousemove", F),
                                e.bind(document, "mouseout", N),
                                (y = setInterval(function () {
                                    2 == ++L && b.setIdle(!0);
                                }, g.timeToIdle / 2));
                        }),
                    g.fullscreenEl &&
                        !e.features.isOldAndroid &&
                        (i || (i = b.getFullscreenAPI()), i ? (e.bind(document, i.eventK, b.updateFullscreen), b.updateFullscreen(), e.addClass(t.template, "pswp--supports-fs")) : e.removeClass(t.template, "pswp--supports-fs")),
                    g.preloaderEl &&
                        (O(!0),
                        d("beforeChange", function () {
                            clearTimeout(f),
                                (f = setTimeout(function () {
                                    t.currItem && t.currItem.loading ? (!t.allowProgressiveImg() || (t.currItem.img && !t.currItem.img.naturalWidth)) && O(!1) : O(!0);
                                }, g.loadingIndicatorDelay));
                        }),
                        d("imageLoadComplete", function (e, i) {
                            t.currItem === i && O(!0);
                        }));
            }),
                (b.setIdle = function (t) {
                    (u = t), z(n, "ui--idle", t);
                }),
                (b.update = function () {
                    S && t.currItem ? (b.updateIndexIndicator(), g.captionEl && (g.addCaptionHTMLFn(t.currItem, o), z(o, "caption--empty", !t.currItem.title)), (w = !0)) : (w = !1), C || I(), A();
                }),
                (b.updateFullscreen = function (n) {
                    n &&
                        setTimeout(function () {
                            t.setScrollOffset(0, e.getScrollY());
                        }, 50),
                        e[(i.isFullscreen() ? "add" : "remove") + "Class"](t.template, "pswp--fs");
                }),
                (b.updateIndexIndicator = function () {
                    g.counterEl && (s.innerHTML = t.getCurrentIndex() + 1 + g.indexIndicatorSep + g.getNumItemsFn());
                }),
                (b.onGlobalTap = function (i) {
                    var n = (i = i || window.event).target || i.srcElement;
                    if (!v)
                        if (i.detail && "mouse" === i.detail.pointerType) {
                            if (M(n)) return void t.close();
                            e.hasClass(n, "pswp__img") && (1 === t.getZoomLevel() && t.getZoomLevel() <= t.currItem.fitRatio ? g.clickToCloseNonZoomable && t.close() : t.toggleDesktopZoom(i.detail.releasePoint));
                        } else if ((g.tapToToggleControls && (S ? b.hideControls() : b.showControls()), g.tapToClose && (e.hasClass(n, "pswp__img") || M(n)))) return void t.close();
                }),
                (b.onMouseOver = function (t) {
                    var e = (t = t || window.event).target || t.srcElement;
                    z(n, "ui--over-close", M(e));
                }),
                (b.hideControls = function () {
                    e.addClass(n, "pswp__ui--hidden"), (S = !1);
                }),
                (b.showControls = function () {
                    (S = !0), w || b.update(), e.removeClass(n, "pswp__ui--hidden");
                }),
                (b.supportsFullscreen = function () {
                    var t = document;
                    return !!(t.exitFullscreen || t.mozCancelFullScreen || t.webkitExitFullscreen || t.msExitFullscreen);
                }),
                (b.getFullscreenAPI = function () {
                    var e,
                        i = document.documentElement,
                        n = "fullscreenchange";
                    return (
                        i.requestFullscreen
                            ? (e = { enterK: "requestFullscreen", exitK: "exitFullscreen", elementK: "fullscreenElement", eventK: n })
                            : i.mozRequestFullScreen
                            ? (e = { enterK: "mozRequestFullScreen", exitK: "mozCancelFullScreen", elementK: "mozFullScreenElement", eventK: "moz" + n })
                            : i.webkitRequestFullscreen
                            ? (e = { enterK: "webkitRequestFullscreen", exitK: "webkitExitFullscreen", elementK: "webkitFullscreenElement", eventK: "webkit" + n })
                            : i.msRequestFullscreen && (e = { enterK: "msRequestFullscreen", exitK: "msExitFullscreen", elementK: "msFullscreenElement", eventK: "MSFullscreenChange" }),
                        e &&
                            ((e.enter = function () {
                                return (c = g.closeOnScroll), (g.closeOnScroll = !1), "webkitRequestFullscreen" !== this.enterK ? t.template[this.enterK]() : void t.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT);
                            }),
                            (e.exit = function () {
                                return (g.closeOnScroll = c), document[this.exitK]();
                            }),
                            (e.isFullscreen = function () {
                                return document[this.elementK];
                            })),
                        e
                    );
                });
        };
    }),
    (function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(((t = "undefined" != typeof globalThis ? globalThis : t || self).noUiSlider = {}));
    })(this, function (t) {
        "use strict";
        var e, i;
        function n(t) {
            return "object" == typeof t && "function" == typeof t.to;
        }
        function o(t) {
            t.parentElement.removeChild(t);
        }
        function r(t) {
            return null != t;
        }
        function s(t) {
            t.preventDefault();
        }
        function a(t) {
            return "number" == typeof t && !isNaN(t) && isFinite(t);
        }
        function l(t, e, i) {
            i > 0 &&
                (h(t, e),
                setTimeout(function () {
                    p(t, e);
                }, i));
        }
        function c(t) {
            return Math.max(Math.min(t, 100), 0);
        }
        function u(t) {
            return Array.isArray(t) ? t : [t];
        }
        function d(t) {
            var e = (t = String(t)).split(".");
            return e.length > 1 ? e[1].length : 0;
        }
        function h(t, e) {
            t.classList && !/\s/.test(e) ? t.classList.add(e) : (t.className += " " + e);
        }
        function p(t, e) {
            t.classList && !/\s/.test(e) ? t.classList.remove(e) : (t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " "));
        }
        function f(t) {
            var e = void 0 !== window.pageXOffset,
                i = "CSS1Compat" === (t.compatMode || "");
            return { x: e ? window.pageXOffset : i ? t.documentElement.scrollLeft : t.body.scrollLeft, y: e ? window.pageYOffset : i ? t.documentElement.scrollTop : t.body.scrollTop };
        }
        function m(t, e) {
            return 100 / (e - t);
        }
        function g(t, e, i) {
            return (100 * e) / (t[i + 1] - t[i]);
        }
        function v(t, e) {
            for (var i = 1; t >= e[i]; ) i += 1;
            return i;
        }
        (t.PipsMode = void 0),
            ((e = t.PipsMode || (t.PipsMode = {})).Range = "range"),
            (e.Steps = "steps"),
            (e.Positions = "positions"),
            (e.Count = "count"),
            (e.Values = "values"),
            (t.PipsType = void 0),
            ((i = t.PipsType || (t.PipsType = {}))[(i.None = -1)] = "None"),
            (i[(i.NoValue = 0)] = "NoValue"),
            (i[(i.LargeValue = 1)] = "LargeValue"),
            (i[(i.SmallValue = 2)] = "SmallValue");
        var y = (function () {
                function t(t, e, i) {
                    var n;
                    (this.xPct = []), (this.xVal = []), (this.xSteps = []), (this.xNumSteps = []), (this.xHighestCompleteStep = []), (this.xSteps = [i || !1]), (this.xNumSteps = [!1]), (this.snap = e);
                    var o = [];
                    for (
                        Object.keys(t).forEach(function (e) {
                            o.push([u(t[e]), e]);
                        }),
                            o.sort(function (t, e) {
                                return t[0][0] - e[0][0];
                            }),
                            n = 0;
                        n < o.length;
                        n++
                    )
                        this.handleEntryPoint(o[n][1], o[n][0]);
                    for (this.xNumSteps = this.xSteps.slice(0), n = 0; n < this.xNumSteps.length; n++) this.handleStepPoint(n, this.xNumSteps[n]);
                }
                return (
                    (t.prototype.getDistance = function (t) {
                        var e,
                            i = [];
                        for (e = 0; e < this.xNumSteps.length - 1; e++) {
                            var n = this.xNumSteps[e];
                            if (n && (t / n) % 1 != 0) throw new Error("noUiSlider: 'limit', 'margin' and 'padding' of " + this.xPct[e] + "% range must be divisible by step.");
                            i[e] = g(this.xVal, t, e);
                        }
                        return i;
                    }),
                    (t.prototype.getAbsoluteDistance = function (t, e, i) {
                        var n,
                            o = 0;
                        if (t < this.xPct[this.xPct.length - 1]) for (; t > this.xPct[o + 1]; ) o++;
                        else t === this.xPct[this.xPct.length - 1] && (o = this.xPct.length - 2);
                        i || t !== this.xPct[o + 1] || o++, null === e && (e = []);
                        var r = 1,
                            s = e[o],
                            a = 0,
                            l = 0,
                            c = 0,
                            u = 0;
                        for (n = i ? (t - this.xPct[o]) / (this.xPct[o + 1] - this.xPct[o]) : (this.xPct[o + 1] - t) / (this.xPct[o + 1] - this.xPct[o]); s > 0; )
                            (a = this.xPct[o + 1 + u] - this.xPct[o + u]),
                                e[o + u] * r + 100 - 100 * n > 100 ? ((l = a * n), (r = (s - 100 * n) / e[o + u]), (n = 1)) : ((l = ((e[o + u] * a) / 100) * r), (r = 0)),
                                i ? ((c -= l), this.xPct.length + u >= 1 && u--) : ((c += l), this.xPct.length - u >= 1 && u++),
                                (s = e[o + u] * r);
                        return t + c;
                    }),
                    (t.prototype.toStepping = function (t) {
                        return (function (t, e, i) {
                            if (i >= t.slice(-1)[0]) return 100;
                            var n = v(i, t),
                                o = t[n - 1],
                                r = t[n],
                                s = e[n - 1],
                                a = e[n];
                            return (
                                s +
                                (function (t, e) {
                                    return g(t, t[0] < 0 ? e + Math.abs(t[0]) : e - t[0], 0);
                                })([o, r], i) /
                                    m(s, a)
                            );
                        })(this.xVal, this.xPct, t);
                    }),
                    (t.prototype.fromStepping = function (t) {
                        return (function (t, e, i) {
                            if (i >= 100) return t.slice(-1)[0];
                            var n = v(i, e),
                                o = t[n - 1],
                                r = t[n],
                                s = e[n - 1];
                            return (function (t, e) {
                                return (e * (t[1] - t[0])) / 100 + t[0];
                            })([o, r], (i - s) * m(s, e[n]));
                        })(this.xVal, this.xPct, t);
                    }),
                    (t.prototype.getStep = function (t) {
                        return (function (t, e, i, n) {
                            if (100 === n) return n;
                            var o = v(n, t),
                                r = t[o - 1],
                                s = t[o];
                            return i
                                ? n - r > (s - r) / 2
                                    ? s
                                    : r
                                : e[o - 1]
                                ? t[o - 1] +
                                  (function (t, e) {
                                      return Math.round(t / e) * e;
                                  })(n - t[o - 1], e[o - 1])
                                : n;
                        })(this.xPct, this.xSteps, this.snap, t);
                    }),
                    (t.prototype.getDefaultStep = function (t, e, i) {
                        var n = v(t, this.xPct);
                        return (100 === t || (e && t === this.xPct[n - 1])) && (n = Math.max(n - 1, 1)), (this.xVal[n] - this.xVal[n - 1]) / i;
                    }),
                    (t.prototype.getNearbySteps = function (t) {
                        var e = v(t, this.xPct);
                        return {
                            stepBefore: { startValue: this.xVal[e - 2], step: this.xNumSteps[e - 2], highestStep: this.xHighestCompleteStep[e - 2] },
                            thisStep: { startValue: this.xVal[e - 1], step: this.xNumSteps[e - 1], highestStep: this.xHighestCompleteStep[e - 1] },
                            stepAfter: { startValue: this.xVal[e], step: this.xNumSteps[e], highestStep: this.xHighestCompleteStep[e] },
                        };
                    }),
                    (t.prototype.countStepDecimals = function () {
                        var t = this.xNumSteps.map(d);
                        return Math.max.apply(null, t);
                    }),
                    (t.prototype.convert = function (t) {
                        return this.getStep(this.toStepping(t));
                    }),
                    (t.prototype.handleEntryPoint = function (t, e) {
                        var i;
                        if (!a((i = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t))) || !a(e[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
                        this.xPct.push(i), this.xVal.push(e[0]);
                        var n = Number(e[1]);
                        i ? this.xSteps.push(!isNaN(n) && n) : isNaN(n) || (this.xSteps[0] = n), this.xHighestCompleteStep.push(0);
                    }),
                    (t.prototype.handleStepPoint = function (t, e) {
                        if (e)
                            if (this.xVal[t] !== this.xVal[t + 1]) {
                                this.xSteps[t] = g([this.xVal[t], this.xVal[t + 1]], e, 0) / m(this.xPct[t], this.xPct[t + 1]);
                                var i = (this.xVal[t + 1] - this.xVal[t]) / this.xNumSteps[t],
                                    n = Math.ceil(Number(i.toFixed(3)) - 1),
                                    o = this.xVal[t] + this.xNumSteps[t] * n;
                                this.xHighestCompleteStep[t] = o;
                            } else this.xSteps[t] = this.xHighestCompleteStep[t] = this.xVal[t];
                    }),
                    t
                );
            })(),
            x = {
                to: function (t) {
                    return void 0 === t ? "" : t.toFixed(2);
                },
                from: Number,
            },
            b = {
                target: "target",
                base: "base",
                origin: "origin",
                handle: "handle",
                handleLower: "handle-lower",
                handleUpper: "handle-upper",
                touchArea: "touch-area",
                horizontal: "horizontal",
                vertical: "vertical",
                background: "background",
                connect: "connect",
                connects: "connects",
                ltr: "ltr",
                rtl: "rtl",
                textDirectionLtr: "txt-dir-ltr",
                textDirectionRtl: "txt-dir-rtl",
                draggable: "draggable",
                drag: "state-drag",
                tap: "state-tap",
                active: "active",
                tooltip: "tooltip",
                pips: "pips",
                pipsHorizontal: "pips-horizontal",
                pipsVertical: "pips-vertical",
                marker: "marker",
                markerHorizontal: "marker-horizontal",
                markerVertical: "marker-vertical",
                markerNormal: "marker-normal",
                markerLarge: "marker-large",
                markerSub: "marker-sub",
                value: "value",
                valueHorizontal: "value-horizontal",
                valueVertical: "value-vertical",
                valueNormal: "value-normal",
                valueLarge: "value-large",
                valueSub: "value-sub",
            },
            w = ".__tooltips",
            S = ".__aria";
        function C(t, e) {
            if (!a(e)) throw new Error("noUiSlider: 'step' is not numeric.");
            t.singleStep = e;
        }
        function E(t, e) {
            if (!a(e)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
            t.keyboardPageMultiplier = e;
        }
        function D(t, e) {
            if (!a(e)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
            t.keyboardDefaultStep = e;
        }
        function P(t, e) {
            if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider: 'range' is not an object.");
            if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
            if (e.min === e.max) throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
            t.spectrum = new y(e, t.snap || !1, t.singleStep);
        }
        function z(t, e) {
            if (((e = u(e)), !Array.isArray(e) || !e.length)) throw new Error("noUiSlider: 'start' option is incorrect.");
            (t.handles = e.length), (t.start = e);
        }
        function A(t, e) {
            if ("boolean" != typeof e) throw new Error("noUiSlider: 'snap' option must be a boolean.");
            t.snap = e;
        }
        function _(t, e) {
            if ("boolean" != typeof e) throw new Error("noUiSlider: 'animate' option must be a boolean.");
            t.animate = e;
        }
        function I(t, e) {
            if ("number" != typeof e) throw new Error("noUiSlider: 'animationDuration' option must be a number.");
            t.animationDuration = e;
        }
        function k(t, e) {
            var i,
                n = [!1];
            if (("lower" === e ? (e = [!0, !1]) : "upper" === e && (e = [!1, !0]), !0 === e || !1 === e)) {
                for (i = 1; i < t.handles; i++) n.push(e);
                n.push(!1);
            } else {
                if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
                n = e;
            }
            t.connect = n;
        }
        function T(t, e) {
            switch (e) {
                case "horizontal":
                    t.ort = 0;
                    break;
                case "vertical":
                    t.ort = 1;
                    break;
                default:
                    throw new Error("noUiSlider: 'orientation' option is invalid.");
            }
        }
        function M(t, e) {
            if (!a(e)) throw new Error("noUiSlider: 'margin' option must be numeric.");
            0 !== e && (t.margin = t.spectrum.getDistance(e));
        }
        function L(t, e) {
            if (!a(e)) throw new Error("noUiSlider: 'limit' option must be numeric.");
            if (((t.limit = t.spectrum.getDistance(e)), !t.limit || t.handles < 2)) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
        }
        function F(t, e) {
            var i;
            if (!a(e) && !Array.isArray(e)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
            if (Array.isArray(e) && 2 !== e.length && !a(e[0]) && !a(e[1])) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
            if (0 !== e) {
                for (Array.isArray(e) || (e = [e, e]), t.padding = [t.spectrum.getDistance(e[0]), t.spectrum.getDistance(e[1])], i = 0; i < t.spectrum.xNumSteps.length - 1; i++)
                    if (t.padding[0][i] < 0 || t.padding[1][i] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
                var n = e[0] + e[1],
                    o = t.spectrum.xVal[0];
                if (n / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - o) > 1) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
            }
        }
        function N(t, e) {
            switch (e) {
                case "ltr":
                    t.dir = 0;
                    break;
                case "rtl":
                    t.dir = 1;
                    break;
                default:
                    throw new Error("noUiSlider: 'direction' option was not recognized.");
            }
        }
        function O(t, e) {
            if ("string" != typeof e) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
            var i = e.indexOf("tap") >= 0,
                n = e.indexOf("drag") >= 0,
                o = e.indexOf("fixed") >= 0,
                r = e.indexOf("snap") >= 0,
                s = e.indexOf("hover") >= 0,
                a = e.indexOf("unconstrained") >= 0;
            if (o) {
                if (2 !== t.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
                M(t, t.start[1] - t.start[0]);
            }
            if (a && (t.margin || t.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
            t.events = { tap: i || r, drag: n, fixed: o, snap: r, hover: s, unconstrained: a };
        }
        function U(t, e) {
            if (!1 !== e)
                if (!0 === e || n(e)) {
                    t.tooltips = [];
                    for (var i = 0; i < t.handles; i++) t.tooltips.push(e);
                } else {
                    if ((e = u(e)).length !== t.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
                    e.forEach(function (t) {
                        if ("boolean" != typeof t && !n(t)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
                    }),
                        (t.tooltips = e);
                }
        }
        function R(t, e) {
            if (!n(e)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
            t.ariaFormat = e;
        }
        function W(t, e) {
            if (
                !(function (t) {
                    return n(t) && "function" == typeof t.from;
                })(e)
            )
                throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
            t.format = e;
        }
        function V(t, e) {
            if ("boolean" != typeof e) throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
            t.keyboardSupport = e;
        }
        function H(t, e) {
            t.documentElement = e;
        }
        function B(t, e) {
            if ("string" != typeof e && !1 !== e) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
            t.cssPrefix = e;
        }
        function j(t, e) {
            if ("object" != typeof e) throw new Error("noUiSlider: 'cssClasses' must be an object.");
            "string" == typeof t.cssPrefix
                ? ((t.cssClasses = {}),
                  Object.keys(e).forEach(function (i) {
                      t.cssClasses[i] = t.cssPrefix + e[i];
                  }))
                : (t.cssClasses = e);
        }
        function q(t) {
            var e = { margin: null, limit: null, padding: null, animate: !0, animationDuration: 300, ariaFormat: x, format: x },
                i = {
                    step: { r: !1, t: C },
                    keyboardPageMultiplier: { r: !1, t: E },
                    keyboardDefaultStep: { r: !1, t: D },
                    start: { r: !0, t: z },
                    connect: { r: !0, t: k },
                    direction: { r: !0, t: N },
                    snap: { r: !1, t: A },
                    animate: { r: !1, t: _ },
                    animationDuration: { r: !1, t: I },
                    range: { r: !0, t: P },
                    orientation: { r: !1, t: T },
                    margin: { r: !1, t: M },
                    limit: { r: !1, t: L },
                    padding: { r: !1, t: F },
                    behaviour: { r: !0, t: O },
                    ariaFormat: { r: !1, t: R },
                    format: { r: !1, t: W },
                    tooltips: { r: !1, t: U },
                    keyboardSupport: { r: !0, t: V },
                    documentElement: { r: !1, t: H },
                    cssPrefix: { r: !0, t: B },
                    cssClasses: { r: !0, t: j },
                },
                n = { connect: !1, direction: "ltr", behaviour: "tap", orientation: "horizontal", keyboardSupport: !0, cssPrefix: "noUi-", cssClasses: b, keyboardPageMultiplier: 5, keyboardDefaultStep: 10 };
            t.format && !t.ariaFormat && (t.ariaFormat = t.format),
                Object.keys(i).forEach(function (o) {
                    if (r(t[o]) || void 0 !== n[o]) i[o].t(e, r(t[o]) ? t[o] : n[o]);
                    else if (i[o].r) throw new Error("noUiSlider: '" + o + "' is required.");
                }),
                (e.pips = t.pips);
            var o = document.createElement("div"),
                s = void 0 !== o.style.msTransform,
                a = void 0 !== o.style.transform;
            return (
                (e.transformRule = a ? "transform" : s ? "msTransform" : "webkitTransform"),
                (e.style = [
                    ["left", "top"],
                    ["right", "bottom"],
                ][e.dir][e.ort]),
                e
            );
        }
        function Z(e, i, n) {
            var a,
                d,
                m,
                g,
                v,
                y,
                x,
                b = window.navigator.pointerEnabled
                    ? { start: "pointerdown", move: "pointermove", end: "pointerup" }
                    : window.navigator.msPointerEnabled
                    ? { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" }
                    : { start: "mousedown touchstart", move: "mousemove touchmove", end: "mouseup touchend" },
                C =
                    window.CSS &&
                    CSS.supports &&
                    CSS.supports("touch-action", "none") &&
                    (function () {
                        var t = !1;
                        try {
                            var e = Object.defineProperty({}, "passive", {
                                get: function () {
                                    t = !0;
                                },
                            });
                            window.addEventListener("test", null, e);
                        } catch (t) {}
                        return t;
                    })(),
                E = e,
                D = i.spectrum,
                P = [],
                z = [],
                A = [],
                _ = 0,
                I = {},
                k = e.ownerDocument,
                T = i.documentElement || k.documentElement,
                M = k.body,
                L = "rtl" === k.dir || 1 === i.ort ? 0 : 100;
            function F(t, e) {
                var i = k.createElement("div");
                return e && h(i, e), t.appendChild(i), i;
            }
            function N(t, e) {
                var n = F(t, i.cssClasses.origin),
                    o = F(n, i.cssClasses.handle);
                return (
                    F(o, i.cssClasses.touchArea),
                    o.setAttribute("data-handle", String(e)),
                    i.keyboardSupport &&
                        (o.setAttribute("tabindex", "0"),
                        o.addEventListener("keydown", function (t) {
                            return (function (t, e) {
                                if (R() || W(e)) return !1;
                                var n = ["Left", "Right"],
                                    o = ["Down", "Up"],
                                    r = ["PageDown", "PageUp"],
                                    s = ["Home", "End"];
                                i.dir && !i.ort ? n.reverse() : i.ort && !i.dir && (o.reverse(), r.reverse());
                                var a,
                                    l = t.key.replace("Arrow", ""),
                                    c = l === r[0],
                                    u = l === r[1],
                                    d = l === o[0] || l === n[0] || c,
                                    h = l === o[1] || l === n[1] || u,
                                    p = l === s[1];
                                if (!(d || h || l === s[0] || p)) return !0;
                                if ((t.preventDefault(), h || d)) {
                                    var f = i.keyboardPageMultiplier,
                                        m = d ? 0 : 1,
                                        g = mt(e)[m];
                                    if (null === g) return !1;
                                    !1 === g && (g = D.getDefaultStep(z[e], d, i.keyboardDefaultStep)), (u || c) && (g *= f), (g = Math.max(g, 1e-7)), (g *= d ? -1 : 1), (a = P[e] + g);
                                } else a = p ? i.spectrum.xVal[i.spectrum.xVal.length - 1] : i.spectrum.xVal[0];
                                return ut(e, D.toStepping(a), !0, !0), ot("slide", e), ot("update", e), ot("change", e), ot("set", e), !1;
                            })(t, e);
                        })),
                    o.setAttribute("role", "slider"),
                    o.setAttribute("aria-orientation", i.ort ? "vertical" : "horizontal"),
                    0 === e ? h(o, i.cssClasses.handleLower) : e === i.handles - 1 && h(o, i.cssClasses.handleUpper),
                    n
                );
            }
            function O(t, e) {
                return !!e && F(t, i.cssClasses.connect);
            }
            function U(t, e) {
                return !(!i.tooltips || !i.tooltips[e]) && F(t.firstChild, i.cssClasses.tooltip);
            }
            function R() {
                return E.hasAttribute("disabled");
            }
            function W(t) {
                return d[t].hasAttribute("disabled");
            }
            function V() {
                v &&
                    (nt("update" + w),
                    v.forEach(function (t) {
                        t && o(t);
                    }),
                    (v = null));
            }
            function H() {
                V(),
                    (v = d.map(U)),
                    it("update" + w, function (t, e, n) {
                        if (v && i.tooltips && !1 !== v[e]) {
                            var o = t[e];
                            !0 !== i.tooltips[e] && (o = i.tooltips[e].to(n[e])), (v[e].innerHTML = o);
                        }
                    });
            }
            function B(t, e) {
                return t.map(function (t) {
                    return D.fromStepping(e ? D.getStep(t) : t);
                });
            }
            function j(e) {
                var i,
                    n = (function (e) {
                        if (e.mode === t.PipsMode.Range || e.mode === t.PipsMode.Steps) return D.xVal;
                        if (e.mode === t.PipsMode.Count) {
                            if (e.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                            for (var i = e.values - 1, n = 100 / i, o = []; i--; ) o[i] = i * n;
                            return o.push(100), B(o, e.stepped);
                        }
                        return e.mode === t.PipsMode.Positions
                            ? B(e.values, e.stepped)
                            : e.mode === t.PipsMode.Values
                            ? e.stepped
                                ? e.values.map(function (t) {
                                      return D.fromStepping(D.getStep(D.toStepping(t)));
                                  })
                                : e.values
                            : [];
                    })(e),
                    o = {},
                    r = D.xVal[0],
                    s = D.xVal[D.xVal.length - 1],
                    a = !1,
                    l = !1,
                    c = 0;
                return (
                    (i = n.slice().sort(function (t, e) {
                        return t - e;
                    })),
                    (n = i.filter(function (t) {
                        return !this[t] && (this[t] = !0);
                    }, {}))[0] !== r && (n.unshift(r), (a = !0)),
                    n[n.length - 1] !== s && (n.push(s), (l = !0)),
                    n.forEach(function (i, r) {
                        var s,
                            u,
                            d,
                            h,
                            p,
                            f,
                            m,
                            g,
                            v,
                            y,
                            x = i,
                            b = n[r + 1],
                            w = e.mode === t.PipsMode.Steps;
                        for (w && (s = D.xNumSteps[r]), s || (s = b - x), void 0 === b && (b = x), s = Math.max(s, 1e-7), u = x; u <= b; u = Number((u + s).toFixed(7))) {
                            for (g = (p = (h = D.toStepping(u)) - c) / (e.density || 1), y = p / (v = Math.round(g)), d = 1; d <= v; d += 1) o[(f = c + d * y).toFixed(5)] = [D.fromStepping(f), 0];
                            (m = n.indexOf(u) > -1 ? t.PipsType.LargeValue : w ? t.PipsType.SmallValue : t.PipsType.NoValue), !r && a && u !== b && (m = 0), (u === b && l) || (o[h.toFixed(5)] = [u, m]), (c = h);
                        }
                    }),
                    o
                );
            }
            function Z(e, n, o) {
                var r,
                    s,
                    a = k.createElement("div"),
                    l = (((r = {})[t.PipsType.None] = ""), (r[t.PipsType.NoValue] = i.cssClasses.valueNormal), (r[t.PipsType.LargeValue] = i.cssClasses.valueLarge), (r[t.PipsType.SmallValue] = i.cssClasses.valueSub), r),
                    c = (((s = {})[t.PipsType.None] = ""), (s[t.PipsType.NoValue] = i.cssClasses.markerNormal), (s[t.PipsType.LargeValue] = i.cssClasses.markerLarge), (s[t.PipsType.SmallValue] = i.cssClasses.markerSub), s),
                    u = [i.cssClasses.valueHorizontal, i.cssClasses.valueVertical],
                    d = [i.cssClasses.markerHorizontal, i.cssClasses.markerVertical];
                function p(t, e) {
                    var n = e === i.cssClasses.value,
                        o = n ? l : c;
                    return e + " " + (n ? u : d)[i.ort] + " " + o[t];
                }
                return (
                    h(a, i.cssClasses.pips),
                    h(a, 0 === i.ort ? i.cssClasses.pipsHorizontal : i.cssClasses.pipsVertical),
                    Object.keys(e).forEach(function (r) {
                        !(function (e, r, s) {
                            if ((s = n ? n(r, s) : s) !== t.PipsType.None) {
                                var l = F(a, !1);
                                (l.className = p(s, i.cssClasses.marker)),
                                    (l.style[i.style] = e + "%"),
                                    s > t.PipsType.NoValue && (((l = F(a, !1)).className = p(s, i.cssClasses.value)), l.setAttribute("data-value", String(r)), (l.style[i.style] = e + "%"), (l.innerHTML = String(o.to(r))));
                            }
                        })(r, e[r][0], e[r][1]);
                    }),
                    a
                );
            }
            function X() {
                g && (o(g), (g = null));
            }
            function G(t) {
                X();
                var e = j(t),
                    i = t.filter,
                    n = t.format || {
                        to: function (t) {
                            return String(Math.round(t));
                        },
                    };
                return (g = E.appendChild(Z(e, i, n)));
            }
            function Y() {
                var t = a.getBoundingClientRect(),
                    e = "offset" + ["Width", "Height"][i.ort];
                return 0 === i.ort ? t.width || a[e] : t.height || a[e];
            }
            function K(t, e, n, o) {
                var r = function (r) {
                        var s,
                            a,
                            l = (function (t, e, i) {
                                var n = 0 === t.type.indexOf("touch"),
                                    o = 0 === t.type.indexOf("mouse"),
                                    r = 0 === t.type.indexOf("pointer"),
                                    s = 0,
                                    a = 0;
                                if ((0 === t.type.indexOf("MSPointer") && (r = !0), "mousedown" === t.type && !t.buttons && !t.touches)) return !1;
                                if (n) {
                                    var l = function (e) {
                                        var n = e.target;
                                        return n === i || i.contains(n) || (t.composed && t.composedPath().shift() === i);
                                    };
                                    if ("touchstart" === t.type) {
                                        var c = Array.prototype.filter.call(t.touches, l);
                                        if (c.length > 1) return !1;
                                        (s = c[0].pageX), (a = c[0].pageY);
                                    } else {
                                        var u = Array.prototype.find.call(t.changedTouches, l);
                                        if (!u) return !1;
                                        (s = u.pageX), (a = u.pageY);
                                    }
                                }
                                return (e = e || f(k)), (o || r) && ((s = t.clientX + e.x), (a = t.clientY + e.y)), (t.pageOffset = e), (t.points = [s, a]), (t.cursor = o || r), t;
                            })(r, o.pageOffset, o.target || e);
                        return (
                            !!l &&
                            !(R() && !o.doNotReject) &&
                            ((s = E),
                            (a = i.cssClasses.tap),
                            !((s.classList ? s.classList.contains(a) : new RegExp("\\b" + a + "\\b").test(s.className)) && !o.doNotReject) &&
                                !(t === b.start && void 0 !== l.buttons && l.buttons > 1) &&
                                (!o.hover || !l.buttons) &&
                                (C || l.preventDefault(), (l.calcPoint = l.points[i.ort]), void n(l, o)))
                        );
                    },
                    s = [];
                return (
                    t.split(" ").forEach(function (t) {
                        e.addEventListener(t, r, !!C && { passive: !0 }), s.push([t, r]);
                    }),
                    s
                );
            }
            function $(t) {
                var e,
                    n,
                    o,
                    r,
                    s,
                    l,
                    u =
                        (100 *
                            (t -
                                ((e = a),
                                (n = i.ort),
                                (o = e.getBoundingClientRect()),
                                (s = (r = e.ownerDocument).documentElement),
                                (l = f(r)),
                                /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (l.x = 0),
                                n ? o.top + l.y - s.clientTop : o.left + l.x - s.clientLeft))) /
                        Y();
                return (u = c(u)), i.dir ? 100 - u : u;
            }
            function J(t, e) {
                "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && tt(t, e);
            }
            function Q(t, e) {
                if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return tt(t, e);
                var n = (i.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
                at(n > 0, (100 * n) / e.baseSize, e.locations, e.handleNumbers, e.connect);
            }
            function tt(t, e) {
                e.handle && (p(e.handle, i.cssClasses.active), (_ -= 1)),
                    e.listeners.forEach(function (t) {
                        T.removeEventListener(t[0], t[1]);
                    }),
                    0 === _ && (p(E, i.cssClasses.drag), ct(), t.cursor && ((M.style.cursor = ""), M.removeEventListener("selectstart", s))),
                    e.handleNumbers.forEach(function (t) {
                        ot("change", t), ot("set", t), ot("end", t);
                    });
            }
            function et(t, e) {
                if (!e.handleNumbers.some(W)) {
                    var n;
                    1 === e.handleNumbers.length && ((n = d[e.handleNumbers[0]].children[0]), (_ += 1), h(n, i.cssClasses.active)), t.stopPropagation();
                    var o = [],
                        r = K(b.move, T, Q, {
                            target: t.target,
                            handle: n,
                            connect: e.connect,
                            listeners: o,
                            startCalcPoint: t.calcPoint,
                            baseSize: Y(),
                            pageOffset: t.pageOffset,
                            handleNumbers: e.handleNumbers,
                            buttonsProperty: t.buttons,
                            locations: z.slice(),
                        }),
                        a = K(b.end, T, tt, { target: t.target, handle: n, listeners: o, doNotReject: !0, handleNumbers: e.handleNumbers }),
                        l = K("mouseout", T, J, { target: t.target, handle: n, listeners: o, doNotReject: !0, handleNumbers: e.handleNumbers });
                    o.push.apply(o, r.concat(a, l)),
                        t.cursor && ((M.style.cursor = getComputedStyle(t.target).cursor), d.length > 1 && h(E, i.cssClasses.drag), M.addEventListener("selectstart", s, !1)),
                        e.handleNumbers.forEach(function (t) {
                            ot("start", t);
                        });
                }
            }
            function it(t, e) {
                (I[t] = I[t] || []),
                    I[t].push(e),
                    "update" === t.split(".")[0] &&
                        d.forEach(function (t, e) {
                            ot("update", e);
                        });
            }
            function nt(t) {
                var e = t && t.split(".")[0],
                    i = e ? t.substring(e.length) : t;
                Object.keys(I).forEach(function (t) {
                    var n = t.split(".")[0],
                        o = t.substring(n.length);
                    (e && e !== n) || (i && i !== o) || ((o === S || o === w) && i !== o) || delete I[t];
                });
            }
            function ot(t, e, n) {
                Object.keys(I).forEach(function (o) {
                    var r = o.split(".")[0];
                    t === r &&
                        I[o].forEach(function (t) {
                            t.call(gt, P.map(i.format.to), e, P.slice(), n || !1, z.slice(), gt);
                        });
                });
            }
            function rt(t, e, n, o, r, s) {
                var a;
                return (
                    d.length > 1 &&
                        !i.events.unconstrained &&
                        (o && e > 0 && ((a = D.getAbsoluteDistance(t[e - 1], i.margin, !1)), (n = Math.max(n, a))), r && e < d.length - 1 && ((a = D.getAbsoluteDistance(t[e + 1], i.margin, !0)), (n = Math.min(n, a)))),
                    d.length > 1 && i.limit && (o && e > 0 && ((a = D.getAbsoluteDistance(t[e - 1], i.limit, !1)), (n = Math.min(n, a))), r && e < d.length - 1 && ((a = D.getAbsoluteDistance(t[e + 1], i.limit, !0)), (n = Math.max(n, a)))),
                    i.padding && (0 === e && ((a = D.getAbsoluteDistance(0, i.padding[0], !1)), (n = Math.max(n, a))), e === d.length - 1 && ((a = D.getAbsoluteDistance(100, i.padding[1], !0)), (n = Math.min(n, a)))),
                    !((n = c((n = D.getStep(n)))) === t[e] && !s) && n
                );
            }
            function st(t, e) {
                var n = i.ort;
                return (n ? e : t) + ", " + (n ? t : e);
            }
            function at(t, e, i, n, o) {
                var r = i.slice(),
                    s = n[0],
                    a = [!t, t],
                    l = [t, !t];
                (n = n.slice()),
                    t && n.reverse(),
                    n.length > 1
                        ? n.forEach(function (t, i) {
                              var n = rt(r, t, r[t] + e, a[i], l[i], !1);
                              !1 === n ? (e = 0) : ((e = n - r[t]), (r[t] = n));
                          })
                        : (a = l = [!0]);
                var c = !1;
                n.forEach(function (t, n) {
                    c = ut(t, i[t] + e, a[n], l[n]) || c;
                }),
                    c &&
                        (n.forEach(function (t) {
                            ot("update", t), ot("slide", t);
                        }),
                        null != o && ot("drag", s));
            }
            function lt(t, e) {
                return i.dir ? 100 - t - e : t;
            }
            function ct() {
                A.forEach(function (t) {
                    var e = z[t] > 50 ? -1 : 1,
                        i = 3 + (d.length + e * t);
                    d[t].style.zIndex = String(i);
                });
            }
            function ut(t, e, n, o, r) {
                return (
                    r || (e = rt(z, t, e, n, o, !1)),
                    !1 !== e &&
                        ((function (t, e) {
                            (z[t] = e), (P[t] = D.fromStepping(e));
                            var n = "translate(" + st(10 * (lt(e, 0) - L) + "%", "0") + ")";
                            (d[t].style[i.transformRule] = n), dt(t), dt(t + 1);
                        })(t, e),
                        !0)
                );
            }
            function dt(t) {
                if (m[t]) {
                    var e = 0,
                        n = 100;
                    0 !== t && (e = z[t - 1]), t !== m.length - 1 && (n = z[t]);
                    var o = n - e,
                        r = "translate(" + st(lt(e, o) + "%", "0") + ")",
                        s = "scale(" + st(o / 100, "1") + ")";
                    m[t].style[i.transformRule] = r + " " + s;
                }
            }
            function ht(t, e) {
                return null === t || !1 === t || void 0 === t ? z[e] : ("number" == typeof t && (t = String(t)), !1 !== (t = i.format.from(t)) && (t = D.toStepping(t)), !1 === t || isNaN(t) ? z[e] : t);
            }
            function pt(t, e, n) {
                var o = u(t),
                    r = void 0 === z[0];
                (e = void 0 === e || e),
                    i.animate && !r && l(E, i.cssClasses.tap, i.animationDuration),
                    A.forEach(function (t) {
                        ut(t, ht(o[t], t), !0, !1, n);
                    });
                for (var s = 1 === A.length ? 0 : 1; s < A.length; ++s)
                    A.forEach(function (t) {
                        ut(t, z[t], !0, !0, n);
                    });
                ct(),
                    A.forEach(function (t) {
                        ot("update", t), null !== o[t] && e && ot("set", t);
                    });
            }
            function ft(t) {
                if ((void 0 === t && (t = !1), t)) return 1 === P.length ? P[0] : P.slice(0);
                var e = P.map(i.format.to);
                return 1 === e.length ? e[0] : e;
            }
            function mt(t) {
                var e = z[t],
                    n = D.getNearbySteps(e),
                    o = P[t],
                    r = n.thisStep.step,
                    s = null;
                if (i.snap) return [o - n.stepBefore.startValue || null, n.stepAfter.startValue - o || null];
                !1 !== r && o + r > n.stepAfter.startValue && (r = n.stepAfter.startValue - o),
                    (s = o > n.thisStep.startValue ? n.thisStep.step : !1 !== n.stepBefore.step && o - n.stepBefore.highestStep),
                    100 === e ? (r = null) : 0 === e && (s = null);
                var a = D.countStepDecimals();
                return null !== r && !1 !== r && (r = Number(r.toFixed(a))), null !== s && !1 !== s && (s = Number(s.toFixed(a))), [s, r];
            }
            h((y = E), i.cssClasses.target),
                0 === i.dir ? h(y, i.cssClasses.ltr) : h(y, i.cssClasses.rtl),
                0 === i.ort ? h(y, i.cssClasses.horizontal) : h(y, i.cssClasses.vertical),
                h(y, "rtl" === getComputedStyle(y).direction ? i.cssClasses.textDirectionRtl : i.cssClasses.textDirectionLtr),
                (a = F(y, i.cssClasses.base)),
                (function (t, e) {
                    var n = F(e, i.cssClasses.connects);
                    (d = []), (m = []).push(O(n, t[0]));
                    for (var o = 0; o < i.handles; o++) d.push(N(e, o)), (A[o] = o), m.push(O(n, t[o + 1]));
                })(i.connect, a),
                (x = i.events).fixed ||
                    d.forEach(function (t, e) {
                        K(b.start, t.children[0], et, { handleNumbers: [e] });
                    }),
                x.tap &&
                    K(
                        b.start,
                        a,
                        function (t) {
                            t.stopPropagation();
                            var e = $(t.calcPoint),
                                n = (function (t) {
                                    var e = 100,
                                        i = !1;
                                    return (
                                        d.forEach(function (n, o) {
                                            if (!W(o)) {
                                                var r = z[o],
                                                    s = Math.abs(r - t);
                                                (s < e || (s <= e && t > r) || (100 === s && 100 === e)) && ((i = o), (e = s));
                                            }
                                        }),
                                        i
                                    );
                                })(e);
                            !1 !== n &&
                                (i.events.snap || l(E, i.cssClasses.tap, i.animationDuration),
                                ut(n, e, !0, !0),
                                ct(),
                                ot("slide", n, !0),
                                ot("update", n, !0),
                                ot("change", n, !0),
                                ot("set", n, !0),
                                i.events.snap && et(t, { handleNumbers: [n] }));
                        },
                        {}
                    ),
                x.hover &&
                    K(
                        b.move,
                        a,
                        function (t) {
                            var e = $(t.calcPoint),
                                i = D.getStep(e),
                                n = D.fromStepping(i);
                            Object.keys(I).forEach(function (t) {
                                "hover" === t.split(".")[0] &&
                                    I[t].forEach(function (t) {
                                        t.call(gt, n);
                                    });
                            });
                        },
                        { hover: !0 }
                    ),
                x.drag &&
                    m.forEach(function (t, e) {
                        if (!1 !== t && 0 !== e && e !== m.length - 1) {
                            var n = d[e - 1],
                                o = d[e],
                                r = [t];
                            h(t, i.cssClasses.draggable),
                                x.fixed && (r.push(n.children[0]), r.push(o.children[0])),
                                r.forEach(function (i) {
                                    K(b.start, i, et, { handles: [n, o], handleNumbers: [e - 1, e], connect: t });
                                });
                        }
                    }),
                pt(i.start),
                i.pips && G(i.pips),
                i.tooltips && H(),
                nt("update" + S),
                it("update" + S, function (t, e, n, o, r) {
                    A.forEach(function (t) {
                        var e = d[t],
                            o = rt(z, t, 0, !0, !0, !0),
                            s = rt(z, t, 100, !0, !0, !0),
                            a = r[t],
                            l = String(i.ariaFormat.to(n[t]));
                        (o = D.fromStepping(o).toFixed(1)),
                            (s = D.fromStepping(s).toFixed(1)),
                            (a = D.fromStepping(a).toFixed(1)),
                            e.children[0].setAttribute("aria-valuemin", o),
                            e.children[0].setAttribute("aria-valuemax", s),
                            e.children[0].setAttribute("aria-valuenow", a),
                            e.children[0].setAttribute("aria-valuetext", l);
                    });
                });
            var gt = {
                destroy: function () {
                    for (
                        nt(S),
                            nt(w),
                            Object.keys(i.cssClasses).forEach(function (t) {
                                p(E, i.cssClasses[t]);
                            });
                        E.firstChild;

                    )
                        E.removeChild(E.firstChild);
                    delete E.noUiSlider;
                },
                steps: function () {
                    return A.map(mt);
                },
                on: it,
                off: nt,
                get: ft,
                set: pt,
                setHandle: function (t, e, i, n) {
                    if (!((t = Number(t)) >= 0 && t < A.length)) throw new Error("noUiSlider: invalid handle number, got: " + t);
                    ut(t, ht(e, t), !0, !0, n), ot("update", t), i && ot("set", t);
                },
                reset: function (t) {
                    pt(i.start, t);
                },
                __moveHandles: function (t, e, i) {
                    at(t, e, z, i);
                },
                options: n,
                updateOptions: function (t, e) {
                    var o = ft(),
                        s = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"];
                    s.forEach(function (e) {
                        void 0 !== t[e] && (n[e] = t[e]);
                    });
                    var a = q(n);
                    s.forEach(function (e) {
                        void 0 !== t[e] && (i[e] = a[e]);
                    }),
                        (D = a.spectrum),
                        (i.margin = a.margin),
                        (i.limit = a.limit),
                        (i.padding = a.padding),
                        i.pips ? G(i.pips) : X(),
                        i.tooltips ? H() : V(),
                        (z = []),
                        pt(r(t.start) ? t.start : o, e);
                },
                target: E,
                removePips: X,
                removeTooltips: V,
                getTooltips: function () {
                    return v;
                },
                getOrigins: function () {
                    return d;
                },
                pips: G,
            };
            return gt;
        }
        function X(t, e) {
            if (!t || !t.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + t);
            if (t.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
            var i = Z(t, q(e), e);
            return (t.noUiSlider = i), i;
        }
        var G = { __spectrum: y, cssClasses: b, create: X };
        (t.create = X), (t.cssClasses = b), (t.default = G), Object.defineProperty(t, "__esModule", { value: !0 });
    });