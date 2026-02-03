function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = function __commonJS(cb, mod) {
    return function __require() {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
        exports: {}
      }).exports, mod), mod.exports;
    };
  };

  // assets/wpbingo.js
  var require_wpbingo = __commonJS({
    "assets/wpbingo.js": function assets_wpbingoJs(exports, module) {
      window.wpbingo = window.wpbingo || {};
      wpbingo.Sections = function Sections() {
        this.constructors = {};
        this.instances = [];
        $(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this));
      };
      wpbingo.Sections.prototype = _.assignIn({}, wpbingo.Sections.prototype, {
        _createInstance: function _createInstance(container2, constructor) {
          var $container = $(container2);
          var id = $container.attr("data-section-id");
          var type = $container.attr("data-section-type");
          constructor = constructor || this.constructors[type];
          if (_.isUndefined(constructor)) {
            return;
          }
          var instance = _.assignIn(new constructor(container2), {
            id: id,
            type: type,
            container: container2
          });
          this.instances.push(instance);
        },
        _onSectionLoad: function _onSectionLoad(evt) {
          var container2 = $("[data-section-id]", evt.target)[0];
          if (container2) {
            this._createInstance(container2);
          }
        },
        _onSectionUnload: function _onSectionUnload(evt) {
          this.instances = _.filter(this.instances, function (instance) {
            var isEventInstance = instance.id === evt.originalEvent.detail.sectionId;
            if (isEventInstance) {
              if (_.isFunction(instance.onUnload)) {
                instance.onUnload(evt);
              }
            }
            return !isEventInstance;
          });
        },
        _onSelect: function _onSelect(evt) {
          var instance = _.find(this.instances, function (instance2) {
            return instance2.id === evt.originalEvent.detail.sectionId;
          });
          if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
            instance.onSelect(evt);
          }
        },
        _onDeselect: function _onDeselect(evt) {
          var instance = _.find(this.instances, function (instance2) {
            return instance2.id === evt.originalEvent.detail.sectionId;
          });
          if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
            instance.onDeselect(evt);
          }
        },
        _onBlockSelect: function _onBlockSelect(evt) {
          var instance = _.find(this.instances, function (instance2) {
            return instance2.id === evt.originalEvent.detail.sectionId;
          });
          if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
            instance.onBlockSelect(evt);
          }
        },
        _onBlockDeselect: function _onBlockDeselect(evt) {
          var instance = _.find(this.instances, function (instance2) {
            return instance2.id === evt.originalEvent.detail.sectionId;
          });
          if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
            instance.onBlockDeselect(evt);
          }
        },
        register: function register(type, constructor) {
          this.constructors[type] = constructor;
          $("[data-section-type=" + type + "]").each(function (index, container2) {
            this._createInstance(container2, constructor);
          }.bind(this));
        }
      });
      wpbingo.LibraryLoader = function () {
        var types = {
          link: "link",
          script: "script"
        };
        var status = {
          requested: "requested",
          loaded: "loaded"
        };
        var cloudCdn = "https://cdn.shopify.com/shopifycloud/";
        var libraries = {
          youtubeSdk: {
            tagId: "youtube-sdk",
            src: "https://www.youtube.com/iframe_api",
            type: types.script
          },
          plyrShopifyStyles: {
            tagId: "plyr-shopify-styles",
            src: cloudCdn + "shopify-plyr/v1.0/shopify-plyr.css",
            type: types.link
          },
          modelViewerUiStyles: {
            tagId: "shopify-model-viewer-ui-styles",
            src: cloudCdn + "model-viewer-ui/assets/v1.0/model-viewer-ui.css",
            type: types.link
          }
        };
        function load(libraryName, callback) {
          var library = libraries[libraryName];
          if (!library) return;
          if (library.status === status.requested) return;
          callback = callback || function () {};
          if (library.status === status.loaded) {
            callback();
            return;
          }
          library.status = status.requested;
          var tag;
          switch (library.type) {
            case types.script:
              tag = createScriptTag(library, callback);
              break;
            case types.link:
              tag = createLinkTag(library, callback);
              break;
          }
          tag.id = library.tagId;
          library.element = tag;
          var firstScriptTag = document.getElementsByTagName(library.type)[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        function createScriptTag(library, callback) {
          var tag = document.createElement("script");
          tag.src = library.src;
          tag.addEventListener("load", function () {
            library.status = status.loaded;
            callback();
          });
          return tag;
        }
        function createLinkTag(library, callback) {
          var tag = document.createElement("link");
          tag.href = library.src;
          tag.rel = "stylesheet";
          tag.type = "text/css";
          tag.addEventListener("load", function () {
            library.status = status.loaded;
            callback();
          });
          return tag;
        }
        return {
          load: load
        };
      }();
      wpbingo.Disclosure = function () {
        var selectors2 = {
          disclosureInput: "[data-disclosure-input]",
          disclosureOptions: "[data-disclosure-option]"
        };
        function Disclosure($disclosure) {
          this.$container = $disclosure;
          this.cache = {};
          this._cacheSelectors();
          this._connectOptions();
        }
        Disclosure.prototype = _.assignIn({}, Disclosure.prototype, {
          _cacheSelectors: function _cacheSelectors() {
            this.cache = {
              $disclosureInput: this.$container.find(selectors2.disclosureInput),
              $disclosureOptions: this.$container.find(selectors2.disclosureOptions)
            };
          },
          _connectOptions: function _connectOptions() {
            this.cache.$disclosureOptions.on("click", function (evt) {
              evt.preventDefault();
              this._submitForm($(evt.currentTarget).data("value"));
            }.bind(this));
          },
          _submitForm: function _submitForm(value) {
            this.cache.$disclosureInput.val(value);
            this.$container.parents("form").submit();
          },
          unload: function unload() {
            this.cache.$disclosureOptions.off();
            this.$container.off();
          }
        });
        return Disclosure;
      }();
      wpbingo.Currency = /* @__PURE__ */function () {
        var moneyFormat2 = "${{amount}}";
        function formatMoney(cents, format) {
          if (typeof cents === "string") {
            cents = cents.replace(".", "");
          }
          var value = "";
          var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
          var formatString = format || moneyFormat2;
          function formatWithDelimiters(number, precision, thousands, decimal) {
            thousands = thousands || ",";
            decimal = decimal || ".";
            if (isNaN(number) || number === null) {
              return 0;
            }
            number = (number / 100).toFixed(precision);
            var parts = number.split(".");
            var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + thousands);
            var centsAmount = parts[1] ? decimal + parts[1] : "";
            return dollarsAmount + centsAmount;
          }
          switch (formatString.match(placeholderRegex)[1]) {
            case "amount":
              value = formatWithDelimiters(cents, 2);
              break;
            case "amount_no_decimals":
              value = formatWithDelimiters(cents, 0);
              break;
            case "amount_with_comma_separator":
              value = formatWithDelimiters(cents, 2, ".", ",");
              break;
            case "amount_no_decimals_with_comma_separator":
              value = formatWithDelimiters(cents, 0, ".", ",");
              break;
            case "amount_no_decimals_with_space_separator":
              value = formatWithDelimiters(cents, 0, " ");
              break;
            case "amount_with_apostrophe_separator":
              value = formatWithDelimiters(cents, 2, "'");
              break;
          }
          return formatString.replace(placeholderRegex, value);
        }
        return {
          formatMoney: formatMoney
        };
      }();
      wpbingo.collectionPages = function () {
        var bwpFilter = ".js-page-collection",
          wpbingoCollectionProduct = "#JsCollectionProduct",
          wpbingoFilterContentProduct = ".js-collection-content-product",
          wpbingoFilterSidebar = ".collection-sidebar",
          wpbingoFilterTitle = ".wpbingo-breadcrumbs__inner",
          wpbingoFacetsContainer = ".active-facets-desktop",
          bwpChangeView = ".js-change-view",
          canbeloaded = true,
          bwpSortBy = ".js-sortby";
        var ajaxFilterParams, ajaxFilterGetCollectionUrl, ajaxFilterCreateUrl, ajaxFilterChangeView, _ajaxFilterCategory, _ajaxBreadcrumbsCategory, ajaxFilterLoadMore, ajaxFilterInfinity, ajaxFilterPaging;
        var init2 = function init2() {
          if ($(bwpFilter)) {
            var History2 = window.History;
            History2.Adapter.bind(window, "statechange", function () {
              History2.getState();
            });
          }
          ajaxFilterParams();
          ajaxFilterChangeView();
          _ajaxFilterCategory();
          _ajaxBreadcrumbsCategory();
          ajaxFilterLoadMore();
          ajaxFilterInfinity();
          ajaxFilterPaging();
        };
        ajaxFilterParams = function ajaxFilterParams() {
          Shopify.queryParams = {};
          if (location.search.length) {
            for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split("&"); i < aCouples.length; i++) {
              aKeyValue = aCouples[i].split("=");
              if (aKeyValue.length > 1) {
                Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
              }
            }
          }
        };
        ajaxFilterGetCollectionUrl = function ajaxFilterGetCollectionUrl(collection, url) {
          var str = url;
          var indexCollection = str.indexOf(collection);
          if (indexCollection < 0) return "";
          str = str.slice(indexCollection + collection.length, str.length);
          var indexSlash = str.indexOf("/") > -1 ? str.indexOf("/") : str.length;
          str = str.slice(0, indexSlash).toLowerCase();
          return str.replace("=", "");
        };
        ajaxFilterCreateUrl = function ajaxFilterCreateUrl(baseLink) {
          var newQuery = $.param(Shopify.queryParams).replace(/%2B/g, "+");
          var collectionHandle = ajaxFilterGetCollectionUrl("/collections/", location.pathname);
          var pathName = "/collections/" + collectionHandle;
          var arrayUrl = location.pathname.split("/");
          if (arrayUrl.length >= 4) {
            var currentTagName = arrayUrl[3].split("?").shift();
            if (currentTagName != "") {
              newQuery = newQuery + "+" + currentTagName;
            }
          }
          if (baseLink) {
            if (newQuery != "") return baseLink + "?" + newQuery;else return baseLink;
          }
          return pathName + "?" + newQuery;
        };
        ajaxFilterChangeView = function ajaxFilterChangeView() {
          cViewCollection = wpbingo.getCookie("wpbingo_view_collection");
          if (cViewCollection) {
            $(wpbingoCollectionProduct).removeAttr("class");
            $(wpbingoCollectionProduct).addClass(cViewCollection);
            $(bwpChangeView).removeClass("active");
            $("[data-view=" + cViewCollection + "]").addClass("active");
          }
          $(bwpFilter).on("click", bwpChangeView, function (e) {
            e.preventDefault();
            if (!$(this).hasClass("active")) {
              $(".product-card__image-wrapper.slider", wpbingoFilterContentProduct).each(function () {
                $(".js-carousel", $(this)).slick("refresh");
              });
              wpbingo.setCookie("wpbingo_view_collection", $(this).data("view"), 1);
              $(bwpChangeView).removeClass("active");
              $(this).addClass("active");
              $(wpbingoCollectionProduct).removeAttr("class");
              $(wpbingoCollectionProduct).addClass($(this).data("view"));
            }
          });
        };
        ajaxFilterPaging = function ajaxFilterPaging() {
          $(bwpFilter).on("click", ".js-collection-pagination a", function (e) {
            e.preventDefault();
            var pageURL = $(this).attr("href").match(/page=\d+/g);
            if (pageURL) {
              Shopify.queryParams.page = parseInt(pageURL[0].match(/\d+/g));
              var searchParams = window.history.state && window.history.state.searchParams ? window.history.state.searchParams : "";
              var newurl = ajaxFilterCreateUrl();
              history.pushState({
                searchParams: searchParams
              }, "", "".concat(newurl).concat(searchParams && "&".concat(searchParams)));
              $.ajax({
                type: "get",
                url: "".concat(newurl).concat(searchParams && "&".concat(searchParams)),
                success: function success(data2) {
                  $(wpbingoFilterContentProduct).replaceWith($(data2).find(wpbingoFilterContentProduct));
                  $(".product-card__image-wrapper.slider", wpbingoFilterContentProduct).each(function () {
                    wpbingo.elementslickCarousel($(".js-carousel", $(this)));
                  });
                  if ($(".bwp_currency").length > 0) {
                    Currency.Currency_customer(true);
                  }
                  wpbingo.click_atribute_image();
                  wpbingo.zoom_thumb();
                  if (window.SPR) {
                    SPR.initRatingHandler();
                    SPR.initDomEls();
                    SPR.loadProducts();
                    SPR.loadBadges();
                  }
                  wpbingo.countdown();
                  initButtons();
                  initButtonsCompare();
                  wpbingo.sidebarCollection();
                  wpbingo.toggleSidebar();
                  wpbingo.product_result_count();
                },
                error: function error(xhr, text) {
                  console.log(text);
                }
              });
              $("body,html").animate({
                scrollTop: $(".header").height()
              }, 600);
            }
          });
        };
        ajaxFilterLoadMore = function ajaxFilterLoadMore() {
          $(bwpFilter).on("click", ".js-collection-loadmore a", function (e) {
            e.preventDefault();
            var pageURL = $(this).attr("href");
            $(this).addClass("active");
            if (pageURL) {
              Shopify.queryParams.page = parseInt(pageURL.match(/\d+/g));
              var searchParams = window.history.state && window.history.state.searchParams ? window.history.state.searchParams : "";
              var newurl = ajaxFilterCreateUrl();
              $.ajax({
                type: "get",
                url: pageURL,
                success: function success(data2) {
                  $(".products__row", wpbingoFilterContentProduct).append($(data2).find(".products__row").html());
                  $(".js-collection-loadmore").empty();
                  $(".js-collection-loadmore", wpbingoFilterContentProduct).append($(data2).find(".js-collection-loadmore").html());
                  $("#product_result_count").empty();
                  $("#product_result_count", wpbingoFilterContentProduct).append($(data2).find("#product_result_count").html());
                  $(".product-card__image-wrapper.slider", wpbingoFilterContentProduct).each(function () {
                    if (!$(".js-carousel", $(this)).hasClass("slick-initialized")) {
                      wpbingo.elementslickCarousel($(".js-carousel", $(this)));
                    }
                  });
                  if ($(".bwp_currency").length > 0) {
                    Currency.Currency_customer(true);
                  }
                  if (window.SPR) {
                    SPR.registerCallbacks();
                    SPR.initRatingHandler();
                    SPR.initDomEls();
                    SPR.loadProducts();
                    SPR.loadBadges();
                  }
                  wpbingo.countdown();
                  wpbingo.click_atribute_image();
                  wpbingo.zoom_thumb();
                  initButtons();
                  initButtonsCompare();
                  wpbingo.sidebarCollection();
                  wpbingo.christmas_snow();
                  wpbingo.product_result_count();
                  $(this).removeClass("active");
                },
                error: function error(xhr, text) {
                  console.log(text);
                }
              });
            }
          });
        };
        ajaxFilterInfinity = function ajaxFilterInfinity() {
          if ($(".js-collection-infinity").length > 0) {
            $(window).scroll(function () {
              if ($(document).scrollTop() > $(document).height() - 2e3 && canbeloaded == true && $(".js-collection-infinity >a").length > 0) {
                $(".js-collection-infinity a").addClass("active");
                var pageURL = $("a", ".js-collection-infinity").attr("href");
                if (pageURL) {
                  Shopify.queryParams.page = parseInt(pageURL[0].match(/\d+/g));
                  var searchParams = window.history.state && window.history.state.searchParams ? window.history.state.searchParams : "";
                  var newurl = ajaxFilterCreateUrl();
                  $.ajax({
                    type: "get",
                    url: pageURL,
                    beforeSend: function beforeSend(xhr) {
                      canbeloaded = false;
                    },
                    success: function success(data2) {
                      canbeloaded = true;
                      $(".products__row", wpbingoFilterContentProduct).append($(data2).find(".products__row").html());
                      $(".js-collection-infinity").empty();
                      $(".js-collection-infinity", wpbingoFilterContentProduct).append($(data2).find(".js-collection-infinity").html());
                      $("#product_result_count").empty();
                      $("#product_result_count", wpbingoFilterContentProduct).append($(data2).find("#product_result_count").html());
                      $(".product-card__image-wrapper.slider", wpbingoFilterContentProduct).each(function () {
                        if (!$(".js-carousel", $(this)).hasClass("slick-initialized")) {
                          wpbingo.elementslickCarousel($(".js-carousel", $(this)));
                        }
                      });
                      if ($(".bwp_currency").length > 0) {
                        Currency.Currency_customer(true);
                      }
                      if (window.SPR) {
                        SPR.initRatingHandler();
                        SPR.initDomEls();
                        SPR.loadProducts();
                        SPR.loadBadges();
                      }
                      wpbingo.click_atribute_image();
                      wpbingo.zoom_thumb();
                      wpbingo.countdown();
                      initButtons();
                      initButtonsCompare();
                      wpbingo.christmas_snow();
                      wpbingo.sidebarCollection();
                      wpbingo.product_result_count();
                    },
                    error: function error(xhr, text) {
                      console.log(text);
                    }
                  });
                }
              }
            });
          }
        };
        _ajaxFilterCategory = function ajaxFilterCategory($element2) {
          var wpbingoFacetsWrapper = ".FacetsWrapperDesktop ";
          if ($element2) {
            var $categories = $element2;
          } else {
            var $categories = $(".sidebar-categories");
          }
          if ($(".wpbingo-breadcrumbs").hasClass("have-collection")) {
            var $collection = true;
          }
          $($categories).on("click", "a", function (e) {
            e.preventDefault();
            var pageURL = $(this).attr("href");
            var newTitle = $(this).attr("title");
            History.pushState({
              param: Shopify.queryParams
            }, pageURL, pageURL);
            delete Shopify.queryParams.page;
            $("#pre-loading").addClass("load-product");
            $("#pre-loading .pre-loading__bar").css({
              "width": "40%"
            });
            $.ajax({
              type: "get",
              url: pageURL,
              success: function success(data2) {
                document.title = newTitle;
                $(wpbingoFilterContentProduct).replaceWith($(data2).find(wpbingoFilterContentProduct));
                $(wpbingoFilterSidebar).replaceWith($(data2).find(wpbingoFilterSidebar));
                $(wpbingoFilterTitle).replaceWith($(data2).find(wpbingoFilterTitle));
                $(wpbingoFacetsContainer).replaceWith($(data2).find(wpbingoFacetsContainer));
                if ($(".js-page-collection").hasClass("dropdown")) {
                  $(wpbingoFacetsWrapper).replaceWith($(data2).find(wpbingoFacetsWrapper));
                  wpbingo.countActiveSidebar();
                }
                $(".wpbingo-section--collection-breadcrumb").replaceWith($(data2).find(".wpbingo-section--collection-breadcrumb"));
                if ($collection) {
                  wpbingo.elementslickCarousel($(".wpbingo-breadcrumbs__image .js-carousel"));
                }
                _ajaxFilterCategory();
                _ajaxBreadcrumbsCategory($(".wpbingo-breadcrumbs .bwp_slider-carousel"));
                wpbingo.click_atribute_image();
                wpbingo.zoom_thumb();
                $(".product-card__image-wrapper.slider", wpbingoFilterContentProduct).each(function () {
                  wpbingo.elementslickCarousel($(".js-carousel", $(this)));
                });
                if ($(".bwp_currency").length > 0) {
                  Currency.Currency_customer(true);
                }
                wpbingo.hideLoading();
                if (window.SPR) {
                  SPR.initRatingHandler();
                  SPR.initDomEls();
                  SPR.loadProducts();
                  SPR.loadBadges();
                }
                wpbingo.countdown();
                ajaxFilterChangeView();
                wpbingo.sidebarCollection();
                initButtons();
                initButtonsCompare();
                wpbingo.toggleSidebar();
                wpbingo.product_result_count();
                $("#pre-loading .pre-loading__bar").css({
                  "width": "100%"
                });
                setTimeout(function () {
                  $("#pre-loading .pre-loading__bar").css({
                    "width": "0"
                  });
                  $("#pre-loading").removeClass("load-product");
                }, 500);
              },
              error: function error(xhr, text) {
                console.log(text);
              }
            });
            $("body,html").animate({
              scrollTop: $(".header").height() + $(".wpbingo-breadcrumbs").height()
            }, 600);
          });
        };
        _ajaxBreadcrumbsCategory = function ajaxBreadcrumbsCategory($element2) {
          if ($element2) {
            var $categories = $element2;
          } else {
            var $categories = $(".wpbingo-breadcrumbs .bwp_slider-carousel");
          }
          if ($(".wpbingo-breadcrumbs").hasClass("have-collection")) {
            var $collection = true;
          }
          $($categories).on("click", "a", function (e) {
            e.preventDefault();
            var pageURL = $(this).attr("href");
            var newTitle = $("h2", $(this)).text();
            History.pushState({
              param: Shopify.queryParams
            }, pageURL, pageURL);
            delete Shopify.queryParams.page;
            $("#pre-loading").addClass("load-product");
            $("#pre-loading .pre-loading__bar").css({
              "width": "40%"
            });
            $.ajax({
              type: "get",
              url: pageURL,
              success: function success(data2) {
                document.title = newTitle;
                $(wpbingoFilterContentProduct).replaceWith($(data2).find(wpbingoFilterContentProduct));
                $(wpbingoFilterSidebar).replaceWith($(data2).find(wpbingoFilterSidebar));
                $(wpbingoFilterTitle).replaceWith($(data2).find(wpbingoFilterTitle));
                $(wpbingoFacetsContainer).replaceWith($(data2).find(wpbingoFacetsContainer));
                $(".wpbingo-section--collection-breadcrumb").replaceWith($(data2).find(".wpbingo-section--collection-breadcrumb"));
                _ajaxFilterCategory($(".sidebar-categories"));
                $(".product-card__image-wrapper.slider", wpbingoFilterContentProduct).each(function () {
                  wpbingo.elementslickCarousel($(".js-carousel", $(this)));
                });
                if ($(".bwp_currency").length > 0) {
                  Currency.Currency_customer(true);
                }
                _ajaxBreadcrumbsCategory();
                wpbingo.click_atribute_image();
                wpbingo.zoom_thumb();
                wpbingo.hideLoading();
                if (window.SPR) {
                  SPR.initRatingHandler();
                  SPR.initDomEls();
                  SPR.loadProducts();
                  SPR.loadBadges();
                }
                wpbingo.countdown();
                wpbingo.sidebarCollection();
                initButtonsCompare();
                initButtons();
                wpbingo.countActiveSidebar();
                wpbingo.product_result_count();
                if (!$(".js-page-collection").hasClass("dropdown")) {
                  wpbingo.toggleSidebar();
                }
                if ($collection) {
                  wpbingo.elementslickCarousel($(".wpbingo-breadcrumbs__image .js-carousel"));
                }
                ajaxFilterChangeView();
                $("#pre-loading .pre-loading__bar").css({
                  "width": "100%"
                });
                setTimeout(function () {
                  $("#pre-loading .pre-loading__bar").css({
                    "width": "0"
                  });
                  $("#pre-loading").removeClass("load-product");
                }, 500);
              },
              error: function error(xhr, text) {
                console.log(text);
              }
            });
            $("body,html").animate({
              scrollTop: $(".header").height()
            }, 600);
          });
        };
        return init2;
      }();
      function normalizeColorToken(value) {
        if (!value) return "";
        return value.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-");
      }
      function buildImageUrl(src, width, height) {
        if (!src) return "";
        var url = new URL(src, window.location.origin);
        url.searchParams.set("width", String(width));
        if (height) url.searchParams.set("height", String(height));
        return url.toString();
      }
      function getVariantMediaFromProduct(variant, product, options) {
        if (!variant) return [];
        var colorToken = normalizeColorToken(variant.option1);
        var colorMatch = "_".concat(colorToken, "_");
        var result = [];
        var productMedia = product.media;
        if (Array.isArray(productMedia)) {
          for (var i = 0; i < productMedia.length; i++) {
            var media = productMedia[i];
            if (media.media_type !== "image") continue;
            var src = media.src || "";
            var lowerSrc = src.toLowerCase().trim();
            if (!lowerSrc || !lowerSrc.includes(colorMatch)) continue;
            var variantMedia = {
              id: media.id,
              thumbnailUrl: buildImageUrl(src, 150),
              mediaUrl: buildImageUrl(src, 1080, 1080),
              mediaType: media.media_type,
              alt: media.alt || "",
              width: media.width,
              height: media.height,
              sectionId: options.sectionId
            };
            result.push(variantMedia);
            if (options.first || options.limit && result.length >= options.limit) return result;
          }
        }
        return result;
      }
      wpbingo.Variants = function () {
        function Variants(options) {
          this.$container = options.$container;
          this.product = options.product;
          this.productSelectOption = options.productSelectOption;
          this.singleOptionSelector = options.singleOptionSelector;
          this.originalSelectorId = options.originalSelectorId;
          this.enableHistoryState = options.enableHistoryState;
          this.variantMedia = options.variantMedia;
          this.currentVariant = this._getVariantFromOptions();
          $(this.singleOptionSelector, this.$container).on("change", this._onSelectChange.bind(this));
          this._setVariantState(this.currentVariant);
        }
        Variants.prototype = _.assignIn({}, Variants.prototype, {
          _getCurrentOptions: function _getCurrentOptions() {
            var currentOptions = _.map($(this.singleOptionSelector, this.$container), function (element) {
              var $element2 = $(element);
              var type = $element2.attr("type");
              var currentOption = {};
              if (type === "radio" || type === "checkbox") {
                if ($element2[0].checked) {
                  currentOption.value = $element2.val();
                  currentOption.index = $element2.data("index");
                  return currentOption;
                } else {
                  return false;
                }
              } else {
                currentOption.value = $element2.val();
                currentOption.index = $element2.data("index");
                return currentOption;
              }
            });
            currentOptions = _.compact(currentOptions);
            return currentOptions;
          },
          _getVariantFromOptions: function _getVariantFromOptions() {
            var selectedValues = this._getCurrentOptions();
            var variants = this.product.variants;
            var found = _.find(variants, function (variant) {
              return selectedValues.every(function (values) {
                return _.isEqual(variant[values.index], values.value);
              });
            });
            return found;
          },
          /**
           * Gets the high-resolution gallery images for a specific variant.
           * @param {Object} variant - The variant object for which to retrieve gallery images. 
           * @returns {Array} - An array of high-resolution gallery images.
           */
          _getVariantMedia: function _getVariantMedia(variant) {
            if (!this.variantMedia || this.variantMedia.length === 0) return [];
            var found = this.variantMedia.find(function (item) {
              return item.id === variant.id;
            });
            return found ? found.variantMediaHiRes : [];
          },
          /**
           * Updates the product thumbnails Slick carousel with new gallery images.
           * @param {Array<VariantMedia>} variantMediaArr - An array of gallery images to display.
           * @returns {void}
           */
          _updateProductThumbnailsSlick: function _updateProductThumbnailsSlick(variantMediaArr) {
            if (!variantMediaArr || variantMediaArr.length === 0) return;
            var html = variantMediaArr.map(function (item) {
              var isVideo = item.mediaType === "video" || item.mediaType === "external_video" || item.mediaType === "model";
              var player = isVideo ? "\n\t\t\t<div class=\"product-single__thumbnail-badge ".concat(item.mediaType, "\">\n\t\t\t\t").concat(item.mediaType === "model" ? '<i class="icon-model"></i>' : '<i class="feather-play"></i>', "\n\t\t\t</div>\n\t\t\t") : "";
              return "\n\t\t\t<div class=\"product-single__thumbnail-wrapper\">\n\t\t\t\t<div class=\"product-media__wrapper\">\n\t\t\t\t\t<a\n\t\t\t\t\thref=\"javascript:void(0)\"\n\t\t\t\t\tclass=\"".concat(isVideo ? "product-single__video" : "product-single__thumbnail", "\"\n\t\t\t\t\tdata-media=\"").concat(item.mediaUrl, "\"\n\t\t\t\t\tdata-media-id=\"").concat(item.sectionId, "-").concat(item.id, "\"\n\t\t\t\t\tdata-product-thumbnail\n\t\t\t\t\t>\n\t\t\t\t\t<img\n\t\t\t\t\t\tclass=\"product-image__thumb lazyload fade-in\"\n\t\t\t\t\t\tsrc=\"").concat(item.thumbnailUrl, "\"\n\t\t\t\t\t\talt=\"").concat(item.alt || "", "\"\n\t\t\t\t\t\twidth=\"").concat(item.width || "", "\"\n\t\t\t\t\t\theight=\"").concat(item.height || "", "\"\n\t\t\t\t\t/>\n\t\t\t\t\t").concat(player, "\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t");
            }).join("");
            $("body").trigger("wpbingo:thumb:unslick");
            $("body").trigger("wpbingo:thumb:html", html);
            $("body").trigger("wpbingo:thumb:slick");
          },
          /**
           * Updates the main product media Slick carousel with new gallery images.
           * @param {Array<VariantMedia>} variantMediaArr - An array of gallery images to display.
           * @returns {void}
           */
          _updateProductMediaSlick: function _updateProductMediaSlick(variantMediaArr) {
            if (!variantMediaArr || variantMediaArr.length === 0) return;
            var html = variantMediaArr.map(function (item, index) {
              return "\n\t\t\t\t<div class=\"js-product-media-item product-single__media-item\" data-slick-media-label=\"".concat(item.alt || "", "\">\n\t\t\t\t\t<div\n\t\t\t\t\t\tclass=\"js-product-media product-media\"\n\t\t\t\t\t\tdata-media-id=\"").concat(item.id, "\"\n\t\t\t\t\t\ttabindex=\"-1\"\n\t\t\t\t\t>\n\t\t\t\t\t\t<div class=\"product-media__wrapper product-media__wrapper--image\">\n\t\t\t\t\t\t\t<img\n\t\t\t\t\t\t\t\tclass=\"mfp-image lazyload fade-in\"\n\t\t\t\t\t\t\t\tsrc=\"").concat(item.mediaUrl, "\"\n\t\t\t\t\t\t\t\tdata-sizes=\"auto\"\n\t\t\t\t\t\t\t\tdata-image=\"true\"\n\t\t\t\t\t\t\t\tdata-number=\"").concat(index, "\"\n\t\t\t\t\t\t\t\tdata-media-id=\"").concat(item.id, "\"\n\t\t\t\t\t\t\t\twidth=\"").concat(item.width, "\"\n\t\t\t\t\t\t\t\theight=\"").concat(item.height, "\"\n\t\t\t\t\t\t\t\talt=\"").concat(item.alt, "\"\n\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t<div class=\"gallery-cursor\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t");
            }).join("");
            $("body").trigger("wpbingo:media:unslick");
            $("body").trigger("wpbingo:media:html", html);
            $("body").trigger("wpbingo:noslick:media:html", html);
            $("body").trigger("wpbingo:media:slick");
          },
          /**
           * Determines whether the variant media should be updated.
           * @param {Object} variant - The variant object to check.
           * @returns {boolean} - Returns true if the variant media should be updated, otherwise false.
           */
          _shouldUpdateVariantMedia: function _shouldUpdateVariantMedia(variant) {
            var currSta = this._getVariantState();
            var newSta = this._parseVariantState(variant);
            if (currSta && newSta) return currSta.option1 !== newSta.option1;
            return true;
          },
          /**
           * Parses the variant state to extract relevant option values.
           * @param {Object} variant - The variant object to parse.
           * @returns {Object|null} - Returns an object with option values or null if no variant is provided.
           */
          _parseVariantState: function _parseVariantState(variant) {
            if (!variant) return null;
            return {
              option1: variant.option1,
              option2: variant.option2
            };
          },
          /**
           * Sets the variant state in the container's data attributes.
           * @param {Object} variant - The variant object to set the state for.
           */
          _setVariantState: function _setVariantState(variant) {
            var state = JSON.stringify(this._parseVariantState(variant));
            this.$container.data("state", state).attr("state", state);
          },
          /**
           * Retrieves the variant state from the container's data attributes.
           * @returns {Object|null} - Returns the parsed variant state object or null if not found or parsing fails.
           */
          _getVariantState: function _getVariantState() {
            try {
              return JSON.parse(this.$container.data("state"));
            } catch (error) {
              console.log("_getVariantState failed:", error.message);
            }
            return null;
          },
          _onSelectChange: function _onSelectChange() {
            var variant = this._getVariantFromOptions();
            if ($("[data-single-option-button]", this.$container).length && $(".color-select", this.$container).length < 1) {
              this._updateVariantsButton();
              if (!variant || !variant.available) {
                this._updateVariantsButtonDisabed();
                return;
              }
            }
            this.$container.trigger({
              type: "variantChange",
              variant: variant
            });
            if (!variant) return;
            this._updateMasterSelect(variant);
            this._updateMedia(variant);
            if ($(".render-variant-media").length > 0 && this._shouldUpdateVariantMedia(variant)) {
              var variantMediaArr = this._getVariantMedia(variant);
              if (!variantMediaArr || variantMediaArr.length === 0) {
                console.log("No variant media found.");
              } else {
                this._updateProductThumbnailsSlick(variantMediaArr);
                this._updateProductMediaSlick(variantMediaArr);
              }
            }
            this._updatePrice(variant);
            this._updateQuantity(variant);
            this._updateOption(variant);
            this._updatePricesticky(variant);
            this._updateSKU(variant);
            this._updateLabelvariant(variant);
            this.currentVariant = variant;
            this._updatePickUp(variant);
            this._updateBtnText(variant);
            this._updateDelivery(variant);
            if (this.enableHistoryState) {
              this._updateHistoryState(variant);
            }
            this._setVariantState(variant);
          },
          _updateVariantsButtonDisabed: function _updateVariantsButtonDisabed() {
            for (var i = 2; i <= 3; i++) {
              if ($(this.productSelectOption + i, this.$container).length) {
                var isUpdate = false;
                $(this.productSelectOption + i + " " + this.singleOptionSelector, this.$container).each(function () {
                  var $element2 = $(this);
                  var type = $element2.attr("type");
                  if (type === "radio" || type === "checkbox") {
                    if (this.checked && $element2.hasClass("disabled")) {
                      $element2.prop("checked", false);
                      isUpdate = true;
                      return false;
                    }
                  }
                });
                $(this.productSelectOption + i + " " + this.singleOptionSelector, this.$container).each(function () {
                  var $element2 = $(this);
                  var type = $element2.attr("type");
                  if (isUpdate && (type === "radio" || type === "checkbox") && !$element2.hasClass("disabled")) {
                    $element2.prop("checked", true);
                    isUpdate = false;
                    $element2.trigger("change");
                    return false;
                  }
                });
              }
            }
          },
          _updateVariantsButton: function _updateVariantsButton() {
            var selectedValues = this._getCurrentOptions();
            var variants = this.product.variants;
            for (var i = 2; i <= 3; i++) {
              if ($(this.productSelectOption + i, this.$container).length) {
                var $parent = this.productSelectOption + i;
                $($parent + " " + this.singleOptionSelector, this.$container).each(function () {
                  var $self = $(this);
                  var optionValue = $self.val();
                  var foundIndex;
                  if (i === 2) {
                    foundIndex = _.findIndex(variants, function (variant) {
                      variant.option1 = variant.option1.toString();
                      selectedValues[0].value = selectedValues[0].value.toString();
                      variant.option2 = variant.option2.toString();
                      optionValue = optionValue.toString();
                      return variant.option1 === selectedValues[0].value && variant.option2 === optionValue && variant.available === true;
                    });
                  } else if (i === 3) {
                    foundIndex = _.findIndex(variants, function (variant) {
                      variant.option1 = variant.option1.toString();
                      variant.option2 = variant.option2.toString();
                      variant.option3 = variant.option3.toString();
                      selectedValues[0].value = selectedValues[0].value.toString();
                      selectedValues[1].value = selectedValues[1].value.toString();
                      optionValue = optionValue.toString();
                      return variant.option1 === selectedValues[0].value && variant.option2 === selectedValues[1].value && variant.option3 === optionValue && variant.available === true;
                    });
                  }
                  if (foundIndex !== -1) {
                    if ($($parent + ".color-select", this.$container).length > 0) {
                      $self.removeClass("disabled");
                      $self.next("label").removeClass("disabled");
                    } else {
                      $self.removeAttr("disabled", "disabled").removeClass("disabled");
                      $self.next("label").removeClass("disabled");
                    }
                  } else {
                    if ($($parent + ".color-select", this.$container).length > 0) {
                      $self.addClass("disabled");
                      $self.next("label").addClass("disabled");
                    } else {
                      $self.attr("disabled", "disabled").addClass("disabled");
                      $self.next("label").addClass("disabled");
                    }
                  }
                });
              }
            }
          },
          _updateMedia: function _updateMedia(variant) {
            var variantMedia = variant.featured_media || {};
            var currentVariantMedia = this.currentVariant.featured_media || {};
            var isMatchingPreviewImage = false;
            if (variantMedia.preview_image && currentVariantMedia.preview_image) {
              isMatchingPreviewImage = variantMedia.preview_image.src === currentVariantMedia.preview_image.src;
            }
            if (!variant.featured_media || isMatchingPreviewImage) return;
            this.$container.trigger({
              type: "variantMediaChange",
              variant: variant
            });
          },
          _updatePrice: function _updatePrice(variant) {
            if ($(".bwp_currency").length > 0) {
              Currency.Currency_customer(true);
            }
            if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price) {
              return;
            }
            this.$container.trigger({
              type: "variantPriceChange",
              variant: variant
            });
          },
          _updateQuantity: function _updateQuantity(variant) {
            if ($(".product-single .content-variant_inventory").length > 0) {
              setTimeout(function () {
                $(".product-single .content-variant_inventory").load(window.location.href + ".content-variant_inventory .js-product-avaiable");
              }, 10);
            }
          },
          _updateOption: function _updateOption() {
            setTimeout(function () {
              $("#option-selector").load(window.location.href + " #option-selector");
            }, 10);
          },
          _updatePricesticky: function _updatePricesticky() {
            setTimeout(function () {
              $("#price-sticky").load(window.location.href + " #price-sticky");
            }, 10);
          },
          _updateSKU: function _updateSKU(variant) {
            if (variant.sku === this.currentVariant.sku) {
              return;
            }
            this.$container.trigger({
              type: "variantSKUChange",
              variant: variant
            });
          },
          _updateLabelvariant: function _updateLabelvariant(variant) {
            try {
              var $element2 = $(".product-single .product-single__form .variants-wrapper");
              $(".mutil_slider-single").removeClass("active");
              $($element2).each(function () {
                var $this = $(this);
                if ($("select", $this).length > 0) {
                  var value = $("select", $this).find(":selected").val();
                } else {
                  var value = $("input:checked", $this).attr("value");
                }
                $(".variants__label span", $this).html(value);
                $(".mutil_slider-single." + value).addClass("active");
              });
            } catch (error) {
              console.log(error);
            }
          },
          _updateHistoryState: function _updateHistoryState(variant) {
            if (!history.replaceState || !variant) {
              return;
            }
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + variant.id;
            window.history.replaceState({
              path: newurl
            }, "", newurl);
            if ($(".product-single #buy_more_form").length > 0) {
              $('#buy_more_form input[name="items[][id]"]').attr("value", variant.id);
              wpbingo.discount_single();
            }
          },
          _updatePickUp: function _updatePickUp(variant) {
            if ($(".product-single .product-single__pick_up").length > 0) {
              $(".product-single .product-single__pick_up").addClass("load-pick_up").css("height", $(".product-single .product-single__pick_up").height() + "px");
              $(".product-single .product-single__pick_up").empty();
              wpbingo.pick_up(variant.id);
              setTimeout(function () {
                $(".product-single .product-single__pick_up").removeClass("load-pick_up").removeAttr("style");
              }, 1e3);
            }
          },
          _updateBtnText: function _updateBtnText(variant) {
            if ($(".product-single .product-single__buttons .btn--add-to-cart .btn__text").length > 0) {
              setTimeout(function () {
                $(".product-single .product-single__buttons .btn--add-to-cart").load(window.location.href + " .btn__text");
              }, 10);
            }
            if ($(".sticky-cart-single").length > 0) {
              setTimeout(function () {
                $(".sticky-cart-single .btn--add-to-cart").load(window.location.href + " .btn__text");
              }, 10);
            }
          },
          _updateDelivery: function _updateDelivery(variant) {
            if ($(".product-single .estimated_delivery").length > 0 && $(".product-single .section-estimated_delivery[data-incoming]").length > 0) {
              $(".product-single .section-estimated_delivery").addClass("load-delivery").css("height", $(".product-single .section-estimated_delivery").height() + "px");
              setTimeout(function () {
                $(".product-single .section-estimated_delivery").load(window.location.href + ".product-single .estimated_delivery");
              }, 10);
              setTimeout(function () {
                if ($(".product-single .time_hour").length > 0) {
                  wpbingo.time_estimated_delivery();
                }
              }, 1200);
              setTimeout(function () {
                if ($(".product-single .time_hour").length > 0) {
                  $(".product-single .section-estimated_delivery").removeClass("load-delivery").removeAttr("style");
                }
              }, 1400);
            }
          },
          _updateMasterSelect: function _updateMasterSelect(variant) {
            $(this.originalSelectorId, this.$container).val(variant.id);
          }
        });
        return Variants;
      }();
      wpbingo.ProductModel = /* @__PURE__ */function () {
        var modelJsonSections = {};
        var models = {};
        var xrButtons = {};
        var selectors2 = {
          productMediaGroup: ".c",
          productMediaGroupWrapper: ".js-product-single-media",
          xrButton: "[data-shopify-xr]",
          xrButtonSingle: "[data-shopify-xr-single]"
        };
        var classes = {
          viewInSpaceDisabled: "product-single__view-in-space--disabled"
        };
        function init2(modelViewerContainers, sectionId) {
          modelJsonSections[sectionId] = {
            loaded: false
          };
          modelViewerContainers.each(function (index) {
            var $modelViewerContainer = $(this);
            var mediaId = $modelViewerContainer.data("media-id");
            var $modelViewerElement = $($modelViewerContainer.find("model-viewer")[0]);
            var modelId = $modelViewerElement.data("model-id");
            if (index === 0) {
              var $xrButton = $modelViewerContainer.closest(selectors2.productMediaGroupWrapper).find(selectors2.xrButtonSingle);
              xrButtons[sectionId] = {
                $element: $xrButton,
                defaultId: modelId
              };
            }
            models[mediaId] = {
              modelId: modelId,
              sectionId: sectionId,
              $container: $modelViewerContainer,
              $element: $modelViewerElement
            };
          });
          window.Shopify.loadFeatures([{
            name: "shopify-xr",
            version: "1.0",
            onLoad: setupShopifyXr
          }]);
          if (models.length < 1) return;
          window.Shopify.loadFeatures([{
            name: "model-viewer-ui",
            version: "1.0",
            onLoad: setupModelViewerUi
          }]);
          wpbingo.LibraryLoader.load("modelViewerUiStyles");
        }
        function setupShopifyXr(errors) {
          if (errors) return;
          if (!window.ShopifyXR) {
            document.addEventListener("shopify_xr_initialized", function (event) {
              if (event.detail.shopifyXREnabled) {
                setupShopifyXr();
              } else {
                $(selectors2.xrButton).addClass(classes.viewInSpaceDisabled);
              }
            });
            return;
          }
          for (var sectionId in modelJsonSections) {
            if (modelJsonSections.hasOwnProperty(sectionId)) {
              var modelSection = modelJsonSections[sectionId];
              if (modelSection.loaded) continue;
              var $modelJson = $("#ModelJson-" + sectionId);
              window.ShopifyXR.addModels(JSON.parse($modelJson.html()));
              modelSection.loaded = true;
            }
          }
          window.ShopifyXR.setupXRElements();
        }
        function setupModelViewerUi(errors) {
          if (errors) return;
          for (var key in models) {
            if (models.hasOwnProperty(key)) {
              var model = models[key];
              if (!model.modelViewerUi) {
                model.modelViewerUi = new Shopify.ModelViewerUI(model.$element);
              }
              setupModelViewerListeners(model);
            }
          }
        }
        function setupModelViewerListeners(model) {
          var xrButton = xrButtons[model.sectionId];
          var $productMediaGroup = model.$container.closest(selectors2.productMediaGroup);
          model.$element.on("shopify_model_viewer_ui_toggle_play", function () {
            wpbingo.updateSlickSwipe($productMediaGroup, false);
          }).on("shopify_model_viewer_ui_toggle_pause", function () {
            wpbingo.updateSlickSwipe($productMediaGroup, true);
          });
          model.$container.on("mediaVisible", function () {
            xrButton.$element.attr("data-shopify-model3d-id", model.modelId);
            model.modelViewerUi.play();
          });
          model.$container.on("mediaHidden", function () {
            xrButton.$element.attr("data-shopify-model3d-id", xrButton.defaultId);
            model.modelViewerUi.pause();
          }).on("xrLaunch", function () {
            model.modelViewerUi.pause();
          });
        }
        function removeSectionModels(sectionId) {
          for (var key in models) {
            if (models.hasOwnProperty(key)) {
              var model = models[key];
              if (model.sectionId === sectionId) {
                models[key].modelViewerUi.destroy();
                delete models[key];
              }
            }
          }
          delete modelJsonSections[sectionId];
        }
        return {
          init: init2,
          removeSectionModels: removeSectionModels
        };
      }();
      function onYouTubeIframeAPIReady() {
        wpbingo.ProductVideo.loadVideos(wpbingo.ProductVideo.hosts.youtube);
      }
      wpbingo.ProductVideo = /* @__PURE__ */function () {
        var videos = {};
        var hosts = {
          html5: "html5",
          youtube: "youtube"
        };
        var selectors2 = {
          productMediaWrapper: ".js-product-media",
          productMediaGroup: ".js-product-media-group"
        };
        var attributes = {
          enableVideoLooping: "enable-video-looping",
          videoId: "video-id"
        };
        function init2(videoContainer, sectionId) {
          if (!videoContainer.length) {
            return;
          }
          var videoElement = videoContainer.find("iframe, video")[0];
          var mediaId = videoContainer.data("mediaId");
          if (!videoElement) {
            return;
          }
          videos[mediaId] = {
            mediaId: mediaId,
            sectionId: sectionId,
            host: hostFromVideoElement(videoElement),
            container: videoContainer,
            element: videoElement,
            ready: function ready() {
              createPlayer(this);
            }
          };
          var video = videos[mediaId];
          switch (video.host) {
            case hosts.html5:
              window.Shopify.loadFeatures([{
                name: "video-ui",
                version: "1.1",
                onLoad: setupPlyrVideos
              }]);
              wpbingo.LibraryLoader.load("plyrShopifyStyles");
              break;
            case hosts.youtube:
              wpbingo.LibraryLoader.load("youtubeSdk");
              break;
          }
        }
        function setupPlyrVideos(errors) {
          if (errors) {
            fallbackToNativeVideo();
            return;
          }
          loadVideos(hosts.html5);
        }
        function createPlayer(video) {
          if (video.player) {
            return;
          }
          var productMediaWrapper = video.container.closest(selectors2.productMediaWrapper);
          var enableLooping = productMediaWrapper.data(attributes.enableVideoLooping);
          switch (video.host) {
            case hosts.html5:
              video.player = new Shopify.Plyr(video.element, {
                loop: {
                  active: enableLooping
                }
              });
              var $productMediaGroup = $(video.container).closest(selectors2.productMediaGroup);
              video.player.on("seeking", function () {
                wpbingo.updateSlickSwipe($productMediaGroup, false);
              });
              video.player.on("seeked", function () {
                wpbingo.updateSlickSwipe($productMediaGroup, true);
              });
              break;
            case hosts.youtube:
              var videoId = productMediaWrapper.data(attributes.videoId);
              video.player = new YT.Player(video.element, {
                videoId: videoId,
                events: {
                  onStateChange: function onStateChange(event) {
                    if (event.data === 0 && enableLooping) event.target.seekTo(0);
                  }
                }
              });
              break;
          }
          productMediaWrapper.on("mediaHidden xrLaunch", function () {
            if (!video.player) return;
            if (video.host === hosts.html5) {
              video.player.pause();
            }
            if (video.host === hosts.youtube && video.player.pauseVideo) {
              video.player.pauseVideo();
            }
          });
          productMediaWrapper.on("mediaVisible", function () {
            if (!video.player) return;
            if (video.host === hosts.html5) {
              video.player.play();
            }
            if (video.host === hosts.youtube && video.player.playVideo) {
              video.player.playVideo();
            }
          });
        }
        function hostFromVideoElement(video) {
          if (video.tagName === "VIDEO") {
            return hosts.html5;
          }
          if (video.tagName === "IFRAME") {
            if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(video.src)) {
              return hosts.youtube;
            }
          }
          return null;
        }
        function loadVideos(host) {
          for (var key in videos) {
            if (videos.hasOwnProperty(key)) {
              var video = videos[key];
              if (video.host === host) {
                video.ready();
              }
            }
          }
        }
        function fallbackToNativeVideo() {
          for (var key in videos) {
            if (videos.hasOwnProperty(key)) {
              var video = videos[key];
              if (video.nativeVideo) continue;
              if (video.host === hosts.html5) {
                video.element.setAttribute("controls", "controls");
                video.nativeVideo = true;
              }
            }
          }
        }
        function removeSectionVideos(sectionId) {
          for (var key in videos) {
            if (videos.hasOwnProperty(key)) {
              var video = videos[key];
              if (video.sectionId === sectionId) {
                if (video.player) video.player.destroy();
                delete videos[key];
              }
            }
          }
        }
        return {
          init: init2,
          hosts: hosts,
          loadVideos: loadVideos,
          removeSectionVideos: removeSectionVideos
        };
      }();
      wpbingo.Product = function () {
        function Product(container2) {
          var $window = $(window);
          var $container = this.$container = $(container2);
          var sectionId = $container.attr("data-section-id");
          this.settings = {
            productPageLoad: false,
            preloadImage: false,
            enableHistoryState: $container.data("enable-history-state"),
            namespace: ".productSection",
            sectionId: sectionId
          };
          this.selectors = {
            productMediaGroup: ".js-product-media-group",
            productMediaGroupItem: ".js-product-media-item",
            productMediaWrapper: ".js-product-media",
            productMediaTypeModel: "[data-product-media-type-model]",
            productMediaTypeVideo: "[data-product-media-type-video]",
            productThumbnails: ".js-product-thumbnails",
            buyTogether: ".buy-together-products",
            productThumbnail: "[data-product-thumbnail]",
            productImageZoom: "[data-mfp-src]",
            meta: ".product-single__meta",
            productWrapper: ".product-single",
            productSelectOption: ".js-product-select-option--",
            originalSelectorId: ".js-product-select",
            singleOptionSelector: ".js-single-option-selector",
            slickDots: "[data-slick-dots]",
            slickNext: "[data-slick-next]",
            slickPrevious: "[data-slick-previous]",
            variantColor: "[data-color]"
          };
          this.classes = {
            hide: "d-none",
            priceContainerUnitAvailable: "price-container--unit-available",
            productInventoryInStock: "product-avaiable__text--instock",
            productInventoryOutStock: "product-avaiable__text--outstock"
          };
          this.slickMediaSettings = {
            slide: this.selectors.productMediaGroupItem,
            rows: 0,
            accessibility: true,
            arrows: true,
            appendDots: this.selectors.slickDots,
            prevArrow: this.selectors.slickPrevious,
            nextArrow: this.selectors.slickNext,
            dots: false,
            rtl: wpbingo.rtl_slick(),
            infinite: $(this.selectors.productMediaGroup).data("infinite") ? true : false,
            draggable: $(this.selectors.productMediaGroup).data("draggable") ? true : false,
            adaptiveHeight: true,
            fade: $(this.selectors.productMediaGroup).data("fade") ? true : false,
            customPaging: function (slick, index) {
              var slideA11yString = wpbingo.strings.productSlideLabel.replace("[slide_number]", index + 1).replace("[slide_max]", slick.slideCount);
              var mediaA11yString = $('[data-slick-index="' + index + '"]', this.$container).data("slick-media-label");
              var ariaCurrent = index === 0 ? ' aria-current="true"' : "";
              return '<a href="javascript:void(0)" aria-label="' + slideA11yString + " " + mediaA11yString + '" aria-controls="slick-slide0' + index + '"' + ariaCurrent + "></a>";
            }.bind(this)
          };
          if (!$("#ProductJson-" + sectionId).html()) {
            return;
          }
          this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + sectionId).innerHTML);
          this.variantMediaObject = JSON.parse(document.getElementById("VariantMediaJson-" + sectionId).innerHTML);
          this.zoomType = $container.data("image-zoom-type");
          this.isStackedLayout = $container.data("stacked-layout");
          this.isNothumLayout = $container.data("nothum");
          this.focusableElements = ["iframe", "input", "button", "video", '[tabindex="0"]'].join(",");
          this.slickThumbsSettings = {
            slidesToShow: $(this.selectors.productThumbnails).data("columns"),
            slidesToScroll: 1,
            rows: 0,
            accessibility: true,
            arrows: true,
            dots: false,
            infinite: false,
            focusOnSelect: true,
            adaptiveHeight: true,
            rtl: $("body").hasClass("rtl") && !$(this.selectors.productThumbnails).data("vertical") ? true : false,
            vertical: $(this.selectors.productThumbnails).data("vertical") ? true : false,
            responsive: [{
              breakpoint: 767,
              settings: {
                slidesToShow: 4,
                vertical: false
              }
            }]
          };
          if (!this.isStackedLayout && !this.isNothumLayout && $(this.selectors.productMediaGroup, this.$container) && $(this.selectors.productThumbnails, this.$container)) {
            this.slickMediaSettings.asNavFor = this.selectors.productThumbnails + "-" + sectionId;
            this.slickThumbsSettings.asNavFor = this.selectors.productMediaGroup + "-" + sectionId;
          } else {
            if ($(window).width() < 991 && $(this.selectors.productWrapper).data("layout_thumb") == "gird-sticky") {
              this.slickMediaSettings.asNavFor = this.selectors.productThumbnails + "-" + sectionId;
              this.slickThumbsSettings.asNavFor = this.selectors.productMediaGroup + "-" + sectionId;
            }
          }
          this.view_gallery_product();
          this.event_buy_together();
          this.event_group_product();
          this.initBreakpoints();
          this.initProductVariant();
          this.initModelViewerLibraries();
          this.initShopifyXrLaunch();
          this.initProductVideo();
          this.initStickyProductMeta();
          this.count_view_product();
          this.count_sale_product();
          this.percent_sale_product();
          this.delivery_return();
          this.ask_a_question();
          this.back_in_stock();
          this.single_product_share();
          this.gallery_cursor();
          this.discount_single();
          this.sticky_gird();
          this.sticky_sidebar();
          this.image_360();
          this.tab_information();
          var $element2 = $(".product-single");
          var _data = $element2.data();
          $(".product-single__video img").css("width", $(".product-single__thumbnail img").width());
          $(".product-single__video img").css("height", $(".product-single__thumbnail img").height() - 2.5);
          $window.on("load" + this.settings.namespace, wpbingo.initStickyProductMeta).on("resize" + this.settings.namespace, wpbingo.debounce(this.initStickyProductMeta, 150).bind(this));
        }
        Product.prototype = _.assignIn({}, Product.prototype, {
          initBreakpoints: function initBreakpoints() {
            var self = this;
            if (!self.isStackedLayout) {
              console.log("not stacked");
              self.createMediaCarousel();
              self.createThumbnailCarousel();
            } else {
              if ($(window).width() < 991) {
                console.log("stacked with width < 991");
                self.createMediaCarousel();
                self.createThumbnailCarousel();
              } else {
                console.log("enquire register stacked with width >= 991");
                $("body").on("wpbingo:noslick:media:html", function (event, html) {
                  $(this.selectors.productMediaGroup, this.$container).empty().html(html);
                  self.view_gallery_product();
                  self.gallery_cursor();
                }.bind(this));
                enquire.register(wpbingo.variables.mediaMobile, {
                  match: function match() {
                    console.log("stacked when match mediaMobile");
                    self.createMediaCarousel();
                  },
                  unmatch: function unmatch() {
                    console.log("stacked when unmatch mediaMobile");
                    self.destroyMediaCarousel();
                  }
                });
              }
            }
          },
          initProductVariant: function initProductVariant() {
            var options = {
              $container: this.$container,
              enableHistoryState: this.settings.enableHistoryState || false,
              productSelectOption: this.selectors.productSelectOption,
              singleOptionSelector: this.selectors.singleOptionSelector,
              originalSelectorId: this.selectors.originalSelectorId + "--" + this.settings.sectionId,
              product: this.productSingleObject,
              variantMedia: this.variantMediaObject
            };
            var count = $(this.selectors.productThumbnails, this.$container).data("columns");
            this.variants = new wpbingo.Variants(options);
            var featured_media = this.variants.currentVariant.featured_media;
            if (!$(".js-product-single-media").hasClass("no-variants") && !$(".js-product-single-media >.row").hasClass("mutil_slider-single") && featured_media) {
              this.showVariantMedia(this.variants.currentVariant, true);
            }
            this.$container.on("variantChange" + this.settings.namespace, this.productPage.bind(this));
            this.$container.on("variantMediaChange" + this.settings.namespace, this.showVariantMedia.bind(this));
            if (this.variants.product.media.length <= count) {
              $(this.selectors.productThumbnails, this.$container).addClass("no-transform");
            }
          },
          initModelViewerLibraries: function initModelViewerLibraries() {
            if (!this.$container.data("has-model")) return;
            var $modelViewerElements = $(this.selectors.productMediaTypeModel, this.$container);
            wpbingo.ProductModel.init($modelViewerElements, this.settings.sectionId);
          },
          initShopifyXrLaunch: function initShopifyXrLaunch() {
            $(document).on("shopify_xr_launch", function () {
              var $currentMedia = $(this.selectors.productMediaWrapper + ":not(." + this.classes.hide + ")", this.$container);
              $currentMedia.trigger("xrLaunch");
            }.bind(this));
          },
          initProductVideo: function initProductVideo() {
            var sectionId = this.settings.sectionId;
            $(this.selectors.productMediaTypeVideo, this.$container).each(function () {
              var $videoContainer = $(this);
              wpbingo.ProductVideo.init($videoContainer, sectionId);
            });
          },
          trapCarouselFocus: function trapCarouselFocus($slider, removeFocusTrap) {
            if (!$slider) return;
            $slider.find(".slick-slide:not(.slick-active)").find(this.focusableElements).attr("tabindex", removeFocusTrap ? "0" : "-1");
            $slider.find(".slick-active").find(this.focusableElements).attr("tabindex", "0");
          },
          updateCarouselDotsA11y: function updateCarouselDotsA11y(nextSlide) {
            var $dotLinks = $(this.selectors.slickDots).find("a");
            $dotLinks.removeAttr("aria-current").eq(nextSlide).attr("aria-current", "true");
          },
          view_gallery_product: function view_gallery_product() {
            $element = $(".product-single");
            $(".product-media__wrapper.product-media__wrapper--image", $element).bind("click", function (e) {
              e.preventDefault();
              var groups = $(this).closest(".js-product-media-group");
              var items = [];
              var gallery = [];
              var $j = 0;
              var $i = 0;
              $(".js-product-media-item", groups).each(function () {
                $("img", $(this)).data("number", $j);
                if ($("img", $(this)).data("image") == true) {
                  var $href = $("img", $(this)).attr("src");
                  if ($href) {
                    gallery[$j] = {
                      "href": $href
                    };
                    $j++;
                  }
                }
              });
              if (gallery) {
                $.each(gallery, function (key, value) {
                  if (value) {
                    items[$i] = {
                      "src": value.href,
                      w: $(".mfp-image", $element).width() * 3,
                      h: $(".mfp-image", $element).height() * 3
                    };
                    $i++;
                  }
                });
                var pswpElement = document.querySelectorAll(".pswp")[0];
                var options = {
                  index: $("img", $(this)).data("number"),
                  closeOnScroll: false,
                  history: false,
                  shareEl: false
                };
                var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();
              }
            });
          },
          event_buy_together: function event_buy_together() {
            $(document).on("change", '#buy_together_form .item-product input[type="checkbox"]', function (e) {
              var $this = $(this);
              if ($this.closest(".item-product").hasClass("active")) {
                $this.closest(".item-product").removeClass("active");
              } else {
                $this.closest(".item-product").addClass("active");
              }
              moneyFormat = wpbingo.strings.moneyFormat;
              var $thisWrap = $this.closest(".item-products-wrap");
              var $thisWpbingoWrap = $thisWrap.closest(".buy-together-products");
              var $thisProductsBtWrap = $thisWpbingoWrap.find(".item-products-wrap");
              var total_items = 0;
              var total_price = 0;
              $thisWrap.find(".item-product").each(function () {
                var this_product_id = $(this).attr("data-product_id");
                if ($(this).hasClass("active")) {
                  $('input[type="hidden"]', $(this)).prop("disabled", false);
                  $('input[type="number"]', $(this)).prop("disabled", false);
                  if ($("select", $(this)).length > 0) {
                    var this_price = $("select", $(this)).find(":selected").data("price");
                    $("select", $(this)).prop("disabled", false);
                  } else {
                    var this_price = $('input[type="checkbox"]', $(this)).attr("data-price");
                  }
                  if (!isNaN(this_price)) {
                    total_price = Number(total_price) + Number(this_price);
                  }
                  Number(total_items++);
                  $thisProductsBtWrap.find('.item-product-inner[data-product_id="' + this_product_id + '"]').removeClass("buy-together-hidden");
                } else {
                  $thisProductsBtWrap.find('.item-product-inner[data-product_id="' + this_product_id + '"]:not(.buy-together-content)').addClass("buy-together-hidden");
                  $('input[type="hidden"]', $(this)).prop("disabled", true);
                  $('input[type="number"]', $(this)).prop("disabled", true);
                  if ($("select", $(this)).length > 0) {
                    $("select", $(this)).prop("disabled", true);
                  }
                }
              });
              $thisWpbingoWrap.find(".for-items-text span").html(total_items);
              $thisWpbingoWrap.find(".total-price-html span").html('<span class="money">' + wpbingo.Currency.formatMoney(total_price, moneyFormat) + "</span>");
              if ($(".bwp_currency").length > 0) {
                Currency.Currency_customer(true);
              }
            });
            $(document).on("change", "#buy_together_form .item-product select", function (e) {
              moneyFormat = wpbingo.strings.moneyFormat;
              var $this = $(this);
              var $thisWrap = $this.closest(".item-products-wrap");
              var $thisWpbingoWrap = $thisWrap.closest(".buy-together-products");
              var total_items = 0;
              var total_price = 0;
              var $parent = $(this).closest(".item-product");
              var this_product_id = $parent.attr("data-product_id");
              var $parent_image = $(this).closest(".buy-together-products").find('.item-product-inner[data-product_id="' + this_product_id + '"]');
              var this_price_selected = $(this).find(":selected").data("price");
              var this_image_selected = $(this).find(":selected").data("image");
              $(".buy-together-price", $parent).html('<span class="money">' + wpbingo.Currency.formatMoney(this_price_selected, moneyFormat) + "</span>");
              if (this_image_selected) {
                $(".image img", $parent_image).attr("src", this_image_selected);
                $(".image img", $parent_image).attr("srcset", this_image_selected);
              }
              $thisWrap.find(".item-product").each(function () {
                if ($(this).hasClass("active")) {
                  if ($("select", $(this)).length > 0) {
                    var this_price = $("select", $(this)).find(":selected").data("price");
                  } else {
                    var this_price = $('input[type="checkbox"]', $(this)).attr("data-price");
                  }
                  if (!isNaN(this_price)) {
                    total_price = Number(total_price) + Number(this_price);
                  }
                  Number(total_items++);
                }
              });
              $thisWpbingoWrap.find(".total-price-html span").html('<span class="money">' + wpbingo.Currency.formatMoney(total_price, moneyFormat) + "</span>");
              if ($(".bwp_currency").length > 0) {
                Currency.Currency_customer(true);
              }
            });
            $("#buy_together_form .buy-together-add-all-to-cart").on("click", function (e) {
              e.preventDefault();
              $(this).addClass("active");
              var addToCartForm = document.querySelector("#buy_together_form");
              var formData = new FormData(addToCartForm);
              var params = {
                type: "POST",
                url: "/cart/add.js",
                data: formData,
                processData: false,
                contentType: false,
                dataType: "json",
                success: function success(line_item) {
                  $(".buy-together-add-all-to-cart").removeClass("active");
                  ajaxCart.load();
                  if ($(".js-drawer").length) {
                    $("body").addClass("drawer--open");
                  }
                  $(".js-drawer-close").on("click", function () {
                    $("body").removeClass("drawer--open");
                  });
                },
                error: function error(XMLHttpRequest2, textStatus) {
                  if (typeof errorCallback === "function") {
                    errorCallback(XMLHttpRequest2, textStatus);
                  } else {
                    ShopifyAPI.onError(XMLHttpRequest2, textStatus);
                  }
                }
              };
              jQuery.ajax(params);
            });
          },
          event_group_product: function event_group_product() {
            $("#group_table_product .add-group-to-cart").on("click", function (e) {
              e.preventDefault();
              $(this).removeClass("added");
              $(this).addClass("active");
              var addToCartForm = document.querySelector("#group_table_product");
              var formData = new FormData(addToCartForm);
              var params = {
                type: "POST",
                url: "/cart/add.js",
                data: formData,
                processData: false,
                contentType: false,
                dataType: "json",
                success: function success(line_item) {
                  $("#group_table_product .add-group-to-cart").removeClass("active");
                  $("#group_table_product .add-group-to-cart").addClass("added");
                  setTimeout(function () {
                    $("#group_table_product .add-group-to-cart").removeClass("added");
                  }, 3e3);
                  ajaxCart.load();
                  if ($(".js-drawer").length > 0) {
                    $("body").addClass("drawer--open");
                  }
                  $(".js-drawer-close").on("click", function () {
                    $("body").removeClass("drawer--open");
                  });
                },
                error: function error(XMLHttpRequest2, textStatus) {
                  if (typeof errorCallback === "function") {
                    errorCallback(XMLHttpRequest2, textStatus);
                  } else {
                    ShopifyAPI.onError(XMLHttpRequest2, textStatus);
                  }
                }
              };
              jQuery.ajax(params);
            });
          },
          translateCarouselDots: function translateCarouselDots(totalSlides, nextSlide, dotStyle) {
            if (totalSlides <= dotStyle.max) {
              return;
            }
            var calculatedTranslateDistance = 0;
            var maxTranslateDistance = (totalSlides - dotStyle.max) * dotStyle.width;
            if (nextSlide >= dotStyle.max - 1) {
              calculatedTranslateDistance = (nextSlide + 2 - dotStyle.max) * dotStyle.width;
              calculatedTranslateDistance = maxTranslateDistance < calculatedTranslateDistance ? maxTranslateDistance : calculatedTranslateDistance;
            }
            $(this.selectors.slickDots).find("ul").css("transform", "translateX(-" + calculatedTranslateDistance + "px)");
          },
          triggerMediaChangeEvent: function triggerMediaChangeEvent(mediaId) {
            var $otherMedia = $(this.selectors.productMediaWrapper, this.$container);
            $otherMedia.trigger("mediaHidden");
            var $newMedia = $(this.selectors.productMediaWrapper, this.$container).filter('[data-media-id="' + mediaId + '"]');
            $newMedia.trigger("mediaVisible");
          },
          showVariantMedia: function showVariantMedia(evt, check) {
            if (check) {
              var variant = evt;
            } else {
              var variant = evt.variant;
            }
            var variantMediaId = this.settings.sectionId + "-" + variant.featured_media.id;
            var $newMedia = $(this.selectors.productMediaWrapper + '[data-media-id="' + variantMediaId + '"]');
            this.triggerMediaChangeEvent(variantMediaId);
            var mediaIndex;
            if (!wpbingo.variables.isMobile && this.isStackedLayout) {
              mediaIndex = $newMedia.closest(".slick-slide").index();
              if ($newMedia.length && (mediaIndex !== 0 || wpbingo.variables.productPageLoad)) {
                if (wpbingo.variables.productPageSticky) {
                  $("html, body").animate({
                    scrollTop: $newMedia.offset().top
                  }, 250);
                } else {
                  var currentScroll = $(document).scrollTop();
                  $newMedia.closest($(this.selectors.productMediaGroupItem, this.$container)).prependTo($(this.selectors.productMediaGroup, this.$container));
                  $(document).scrollTop(currentScroll);
                }
              }
            } else {
              mediaIndex = $newMedia.closest(".slick-slide").data("slick-index");
              if (_.isUndefined(mediaIndex)) {
                return;
              }
            }
            if (!wpbingo.variables.productPageLoad) {
              wpbingo.variables.productPageLoad = true;
            }
          },
          setFeaturedMedia: function setFeaturedMedia() {
            var mediaId = $(this.selectors.productMediaGroup, this.$container).find(".slick-slide.slick-current.slick-active " + this.selectors.productMediaWrapper).attr("data-media-id");
            this.triggerMediaChangeEvent(mediaId);
          },
          createMediaCarousel: function createMediaCarousel() {
            var isSlickAble = !($(this.selectors.productMediaGroupItem).length < 2 || !$(this.selectors.productMediaGroup, this.$container) || this.isCarouselActive);
            this.isCarouselActive = true;
            var dotStyle = {
              max: 9,
              width: 20
            };
            var focusTrapped = false;
            $(this.selectors.productMediaGroupItem, this.$container).on("focusin", function () {
              if (focusTrapped) {
                return;
              }
              this.trapCarouselFocus($(this.selectors.productMediaGroup));
              focusTrapped = true;
            }.bind(this));
            if ($(".mutil_slider-single").length > 0) {
              var sectionId = this.settings.sectionId;
              var $config = this.slickMediaSettings;
              if (!this.isStackedLayout && !this.isNothumLayout && $(this.selectors.productMediaGroup, this.$container) && $(this.selectors.productThumbnails, this.$container)) {
                var asNavFor = true;
              }
              $(".mutil_slider-single").each(function (index) {
                $config["nextArrow"] = $("[data-slick-next]", $(this));
                $config["prevArrow"] = $("[data-slick-previous]", $(this));
                if (asNavFor) {
                  $config["asNavFor"] = ".js-product-thumbnails-" + sectionId + "-" + (index + 1);
                }
                if (!isSlickAble) return;
                $(".js-product-media-group", $(this)).slick($config);
              });
            } else {
              $("body").on("wpbingo:media:slick", function () {
                $(this.selectors.productMediaGroup, this.$container).slick(this.slickMediaSettings).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
                  this.updateCarouselDotsA11y(nextSlide);
                  this.translateCarouselDots(slick.slideCount, nextSlide, dotStyle);
                }.bind(this));
              }.bind(this));
              $("body").off("wpbingo:noslick:media:html").on("wpbingo:media:html", function (event, html) {
                $(this.selectors.productMediaGroup, this.$container).empty().html(html);
                this.view_gallery_product();
                this.gallery_cursor();
              }.bind(this));
              $("body").on("wpbingo:media:unslick", function () {
                var productMediaGroup = $(this.selectors.productMediaGroup, this.$container);
                if (!productMediaGroup.hasClass("slick-initialized")) return;
                productMediaGroup.slick("unslick");
              }.bind(this));
              if (!isSlickAble) return;
              $("body").trigger("wpbingo:media:slick");
            }
          },
          destroyMediaCarousel: function destroyMediaCarousel() {
            if (!$(this.selectors.productMediaGroup, this.$container).length || !this.isCarouselActive) {
              return;
            }
            this.trapCarouselFocus($(this.selectors.productMediaGroup, this.$container), true);
            $(this.selectors.productMediaGroup, this.$container).slick("unslick");
            this.isCarouselActive = false;
          },
          createThumbnailCarousel: function createThumbnailCarousel() {
            if ($(".mutil_slider-single").length > 0) {
              var sectionId = this.settings.sectionId;
              var $configThumb = this.slickThumbsSettings;
              if (!this.isStackedLayout && !this.isNothumLayout && $(this.selectors.productMediaGroup, this.$container) && $(this.selectors.productThumbnails, this.$container)) {
                var asNavFor = true;
              }
              $(".mutil_slider-single").each(function (index) {
                if (asNavFor) {
                  $configThumb.asNavFor = ".js-product-media-group-" + sectionId + "-" + (index + 1);
                }
                $(".js-product-thumbnails", $(this)).slick($configThumb);
              });
            } else {
              $("body").on("wpbingo:thumb:slick", function () {
                $(this.selectors.productThumbnails, this.$container).slick(this.slickThumbsSettings);
              }.bind(this));
              $("body").on("wpbingo:thumb:html", function (event, html) {
                $(this.selectors.productThumbnails, this.$container).empty().html(html);
              }.bind(this));
              $("body").on("wpbingo:thumb:unslick", function () {
                $(this.selectors.productThumbnails, this.$container).slick("unslick");
              }.bind(this));
              $("body").trigger("wpbingo:thumb:slick");
            }
          },
          initStickyProductMeta: function initStickyProductMeta() {
            var $meta = $(this.selectors.meta, this.$container);
            var $wrapper = $(this.selectors.productWrapper, this.$container);
            if (!$meta.length || $(this.selectors.productMediaWrapper, this.$container).length < 2) {
              return;
            }
            $meta.trigger("detach.ScrollToFixed");
            if (wpbingo.variables.isMobile) {
              return;
            }
            var productCopyHeight = $meta.outerHeight();
            var productMediaGroupHeight = $(this.selectors.productMediaGroup, this.$container).height();
            var calcLimit = $wrapper.offset().top + $wrapper.height();
            calcLimit -= productCopyHeight;
            if (productCopyHeight < productMediaGroupHeight && productCopyHeight < $(window).height()) {
              wpbingo.variables.productPageSticky = true;
              $meta.scrollToFixed({
                limit: calcLimit
              });
            } else {
              wpbingo.variables.productPageSticky = false;
            }
          },
          getBaseUnit: function getBaseUnit(variant) {
            return variant.unit_price_measurement.reference_value === 1 ? variant.unit_price_measurement.reference_unit : variant.unit_price_measurement.reference_value + variant.unit_price_measurement.reference_unit;
          },
          productPage: function productPage(evt) {
            var moneyFormat2 = wpbingo.strings.moneyFormat;
            var variant = evt.variant;
            var translations = wpbingo.strings;
            var selectors2 = {
              addToCart: ".btn--add-to-cart",
              addToCartText: ".btn--add-to-cart .btn__text",
              quantityElements: ".js-quantity-selector",
              shopifyPaymentButton: ".shopify-payment-button",
              priceContainer: "[data-price-container]",
              productPrice: ".js-product-price",
              priceA11y: ".js-product-price-a11y",
              comparePrice: ".js-product-compare-price",
              comparePriceA11y: ".js-product-compare-price-a11y",
              comparePriceWrapper: ".product-single__price--wrapper",
              productAvailable: ".js-product-avaiable",
              productAvailableText: ".js-product-avaiable-text",
              unitPrice: "[data-unit-price]",
              unitPriceBaseUnit: "[data-unit-price-base-unit]",
              SKU: ".js-variant-sku"
            };
            if (variant) {
              $(selectors2.priceContainer, this.$container).removeClass(this.classes.hide);
              $(selectors2.productAvailable, this.$container).removeClass(this.classes.hide);
              $(selectors2.productPrice, this.$container).attr("aria-hidden", "false");
              $(selectors2.priceA11y, this.$container).attr("aria-hidden", "false");
              if (variant.available) {
                $(selectors2.addToCart, this.$container).removeClass("disabled").prop("disabled", false);
                $(selectors2.addToCartText, this.$container).html(translations.addToCart);
                $(selectors2.productAvailableText).removeClass(this.classes.productInventoryOutStock).addClass(this.classes.productInventoryInStock).html(wpbingo.strings.inStock);
                $(selectors2.quantityElements, this.$container).removeClass(this.classes.hide);
                $(selectors2.shopifyPaymentButton, this.$container).removeClass(this.classes.hide);
              } else {
                $(selectors2.addToCart, this.$container).addClass("disabled").prop("disabled", true);
                $(selectors2.addToCartText, this.$container).html(translations.soldOut);
                $(selectors2.productAvailableText).removeClass(this.classes.productInventoryInStock).addClass(this.classes.productInventoryOutStock).html(wpbingo.strings.outStock);
                $(selectors2.quantityElements, this.$container).addClass(this.classes.hide);
                $(selectors2.shopifyPaymentButton, this.$container).addClass(this.classes.hide);
              }
              $(selectors2.productPrice, this.$container).html(wpbingo.Currency.formatMoney(variant.price, moneyFormat2)).removeClass(this.classes.hide);
              if (variant.compare_at_price > variant.price) {
                $(selectors2.comparePrice, this.$container).html(wpbingo.Currency.formatMoney(variant.compare_at_price, moneyFormat2));
                $(selectors2.comparePriceWrapper, this.$container).removeClass(this.classes.hide);
                $(selectors2.productPrice, this.$container).addClass("on-sale");
                $(selectors2.comparePriceWrapper, this.$container).attr("aria-hidden", "false");
                $(selectors2.comparePriceA11y, this.$container).attr("aria-hidden", "false");
              } else {
                $(selectors2.comparePriceWrapper, this.$container).addClass(this.classes.hide).attr("aria-hidden", "true");
                $(selectors2.productPrice, this.$container).removeClass("on-sale");
                $(selectors2.comparePrice, this.$container).html("");
                $(selectors2.comparePriceA11y, this.$container).attr("aria-hidden", "true");
              }
              if (variant.unit_price) {
                var $unitPrice = $(selectors2.unitPrice, this.$container);
                var $unitPriceBaseUnit = $(selectors2.unitPriceBaseUnit, this.$container);
                $unitPrice.html(wpbingo.Currency.formatMoney(variant.unit_price, moneyFormat2));
                $unitPriceBaseUnit.html(this.getBaseUnit(variant));
                $(selectors2.priceContainer, this.$container).addClass(this.classes.priceContainerUnitAvailable);
              }
              $(selectors2.SKU).html(variant.sku != "" ? variant.sku : "N/A");
            } else {
              $(selectors2.addToCart, this.$container).addClass("disabled").prop("disabled", true);
              $(selectors2.addToCartText, this.$container).html(translations.unavailable);
              $(selectors2.quantityElements, this.$container).addClass(this.classes.hide);
              $(selectors2.shopifyPaymentButton, this.$container).addClass(this.classes.hide);
              $(selectors2.priceContainer, this.$container).addClass(this.classes.hide);
              $(selectors2.productAvailable, this.$container).addClass(this.classes.hide);
              $(selectors2.productPrice, this.$container).attr("aria-hidden", "true");
              $(selectors2.priceA11y, this.$container).attr("aria-hidden", "true");
              $(selectors2.comparePriceWrapper, this.$container).attr("aria-hidden", "true");
              $(selectors2.comparePriceA11y, this.$container).attr("aria-hidden", "true");
            }
          },
          onUnload: function onUnload() {
            this.$container.off(this.settings.namespace);
            wpbingo.ProductModel.removeSectionModels(this.settings.sectionId);
            wpbingo.ProductVideo.removeSectionVideos(this.settings.sectionId);
            if (this.isStackedLayout) {
              if ($(window).width() > 991) {
                this.destroyMediaCarousel();
              }
            }
          },
          count_view_product: function count_view_product() {
            if ($(".product-count-view").length > 0) {
              var id_product = $(".product-count-view").data("id_product");
              var min = $(".product-count-view").data("min") ? $(".product-count-view").data("min") : 30;
              var max = $(".product-count-view").data("max") ? $(".product-count-view").data("max") : 40;
              var timeout = $(".product-count-view").data("timeout") ? $(".product-count-view").data("timeout") : 1e4;
              var auto = Math.round(Math.random() * (max - min)) + min;
              $("span", ".product-count-view").html(auto);
              setTimeout(function random() {
                var auto2 = Math.round(Math.random() * (max - min)) + min;
                $("span", ".product-count-view").html(auto2);
                setTimeout(random, timeout);
              }, timeout);
            }
          },
          count_sale_product: function count_sale_product() {
            if ($(".product-count-sale").length > 0) {
              var id_product = $(".product-count-sale").data("id_product");
              var min = $(".product-count-sale").data("min") ? $(".product-count-sale").data("min") : 30;
              var max = $(".product-count-sale").data("max") ? $(".product-count-sale").data("max") : 40;
              var time_min = $(".product-count-sale").data("time_min") ? $(".product-count-sale").data("time_min") : 30;
              var time_max = $(".product-count-sale").data("time_max") ? $(".product-count-sale").data("time_max") : 40;
              var cookieValue = wpbingo.getCookie("product_" + id_product);
              var cookieTime = wpbingo.getCookie("time_" + id_product);
              if (cookieValue && cookieTime) {
                $("span.count", ".product-count-sale").html(cookieValue);
                $("span.time", ".product-count-sale").html(cookieTime);
              } else {
                var _rand = Math.round(Math.random() * (max - min)) + min;
                var time = Math.round(Math.random() * (time_max - time_min)) + time_min;
                wpbingo.setCookie("product_" + id_product, _rand, {
                  expires: 24 * 60 * 60 * 1e3
                });
                wpbingo.setCookie("time_" + id_product, time, {
                  expires: 24 * 60 * 60 * 1e3
                });
                $("span.count", ".product-count-sale").html(_rand);
                $("span.time", ".product-count-sale").html(time);
              }
            }
          },
          percent_sale_product: function percent_sale_product() {
            setTimeout(function () {
              var percent = $(".js-product-avaiable #variant-inventory_percent.show").data("percent");
              $(".js-product-avaiable #variant-inventory_percent .percent").css("--progress-bar-width", percent);
            }, 500);
          },
          delivery_return: function delivery_return() {
            if ($(".product-single .delivery_return").length > 0) {
              var $element2 = $(".product-single .delivery_return");
              $(".delivery_return-title", $element2).on("click", function () {
                if (!$(".delivery_return-content", $element2).hasClass("active")) {
                  $(".delivery_return-content", $element2).addClass("active");
                  setTimeout(function () {
                    $(".content-shipping", $element2).addClass("active");
                  }, 300);
                }
              });
              $(".delivery_return-close", $element2).on("click", function () {
                if ($(".delivery_return-content", $element2).hasClass("active")) {
                  $(".content-shipping", $element2).removeClass("active");
                  setTimeout(function () {
                    $(".delivery_return-content", $element2).removeClass("active");
                  }, 300);
                }
              });
            }
          },
          ask_a_question: function ask_a_question() {
            if ($(".product-single .product-ask_a_question").length > 0) {
              $(".product-ask_a_question .open-ask_a_question").on("click", function () {
                if ($(".product-ask_a_question .ask_a_question-form").hasClass("active")) {
                  $(".product-ask_a_question .ask_a_question-form").removeClass("active");
                  $(".product-ask_a_question .ask_a_question-form .content-form").removeClass("active");
                } else {
                  $(".product-ask_a_question .ask_a_question-form").addClass("active");
                  setTimeout(function () {
                    $(".product-ask_a_question .ask_a_question-form .content-form").addClass("active");
                  }, 300);
                }
              });
              $(".product-ask_a_question .close-ask_a_question-form").on("click", function () {
                if ($(".product-ask_a_question .ask_a_question-form").hasClass("active")) {
                  $(".product-ask_a_question .ask_a_question-form .content-form").removeClass("active");
                  setTimeout(function () {
                    $(".product-ask_a_question .ask_a_question-form").removeClass("active");
                  }, 300);
                }
              });
              setTimeout(function () {
                $(".product-ask_a_question .alert").remove();
              }, 2e3);
            }
          },
          back_in_stock: function back_in_stock() {
            if ($(".product-single .product-back_in_stock").length > 0) {
              $(".product-back_in_stock .open-back_in_stock").on("click", function () {
                if ($(".product-back_in_stock .back_in_stock-form").hasClass("active")) {
                  $(".product-back_in_stock .back_in_stock-form").removeClass("active");
                  $(".product-back_in_stock .back_in_stock-form .content-form").removeClass("active");
                } else {
                  $(".product-back_in_stock .back_in_stock-form").addClass("active");
                  setTimeout(function () {
                    $(".product-back_in_stock .back_in_stock-form .content-form").addClass("active");
                  }, 300);
                }
              });
              $(".product-back_in_stock .close-back_in_stock-form").on("click", function () {
                if ($(".product-back_in_stock .back_in_stock-form").hasClass("active")) {
                  $(".product-back_in_stock .back_in_stock-form .content-form").removeClass("active");
                  setTimeout(function () {
                    $(".product-back_in_stock .back_in_stock-form").removeClass("active");
                  }, 300);
                }
              });
              setTimeout(function () {
                $(".product-back_in_stock .alert").remove();
              }, 2e3);
            }
          },
          single_product_share: function single_product_share() {
            if ($(".product-single .product_share").length > 0) {
              var $element2 = $(".product-single .product_share");
              $(".product_share_label", $element2).on("click", function () {
                if (!$(".product_share-content", $element2).hasClass("active")) {
                  $(".product_share-content", $element2).addClass("active");
                  setTimeout(function () {
                    $(".content-product_share", $element2).addClass("active");
                  }, 300);
                }
              });
              $(".product_share-close", $element2).on("click", function () {
                if ($(".product_share-content", $element2).hasClass("active")) {
                  $(".content-product_share", $element2).removeClass("active");
                  setTimeout(function () {
                    $(".product_share-content", $element2).removeClass("active");
                  }, 300);
                }
              });
              $(".product_share-copy button", $element2).click(function () {
                var copyText = $(".product_share-copy .url_share", $element2).attr("value");
                var $text = $(".product_share-copy", $element2).data("text");
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val(copyText).select();
                document.execCommand("copy");
                $temp.remove();
                var notificationTag = $("div.copy-notification");
                if (notificationTag.length == 0) {
                  notificationTag = $("<div/>", {
                    "class": "copy-notification",
                    text: $text
                  });
                  $("body").append(notificationTag);
                  notificationTag.fadeIn("slow", function () {
                    setTimeout(function () {
                      notificationTag.fadeOut("slow", function () {
                        notificationTag.remove();
                      });
                    }, 1e3);
                  });
                }
              });
            }
          },
          gallery_cursor: function gallery_cursor() {
            $(".bwp-single-image .product-media__wrapper.product-media__wrapper--image").mouseenter(function () {
              $(".gallery-cursor", $(this)).addClass("show");
            });
            $(".bwp-single-image .product-media__wrapper.product-media__wrapper--image").mousemove(function (event) {
              var offset = $(this).offset();
              var relX = event.pageX - offset.left - 25;
              var relY = event.pageY - offset.top - 25;
              $(".gallery-cursor", $(this)).css({
                "top": relY + "px",
                "left": relX + "px"
              });
            });
            $(".bwp-single-image .product-media__wrapper.product-media__wrapper--image").mouseleave(function (event) {
              $(".gallery-cursor", $(this)).removeClass("show");
            });
          },
          discount_single: function discount_single() {
            if ($(".product-single #buy_more_form").length > 0) {
              $("#buy_more_form .buy-more-cart").on("click", function (e) {
                e.preventDefault();
                $(this).addClass("active");
                var addToCartForm = document.querySelector("#buy_more_form");
                var formData = new FormData(addToCartForm);
                var params = {
                  type: "POST",
                  url: "/cart/add.js",
                  data: formData,
                  processData: false,
                  contentType: false,
                  dataType: "json",
                  success: function success(line_item) {
                    $(".buy-more-cart").removeClass("active");
                    $(".buy-more-cart").addClass("added");
                    if ($(".js-drawer").length) {
                      $("body").addClass("drawer--open");
                    }
                    $(".js-drawer-close").on("click", function () {
                      $("body").removeClass("drawer--open");
                    });
                    ajaxCart.load();
                    wpbingo.discount_single();
                  },
                  error: function error(XMLHttpRequest2, textStatus) {
                    if (typeof errorCallback === "function") {
                      errorCallback(XMLHttpRequest2, textStatus);
                    } else {
                      ShopifyAPI.onError(XMLHttpRequest2, textStatus);
                    }
                  }
                };
                jQuery.ajax(params);
              });
            }
          },
          sticky_gird: function sticky_gird() {
            if ($(window).width() > 992 && $(".product-single.gird-sticky").length > 0) {
              var $element2 = $(".product-single.gird-sticky");
              var eventElemArray = [];
              var _count = 0;
              var _countFix = 0;
              var $image_array = $(".js-product-media-group .js-product-media-item", $element2);
              $(".js-product-thumbnails a", $element2).on("click", function () {
                var $thumb = $(this).data("media-id"),
                  $image = $(".js-product-media-group .js-product-media[data-media-id=" + $thumb + "]", $element2);
                $("html, body").animate({
                  scrollTop: $image.offset().top
                }, "300");
                $image.css({
                  "padding-top": "15px"
                });
                $(this).addClass("slick-current");
              });
              $(window).on("load scroll resize", function () {
                eventElemArray = [];
                _count = 0;
                $image_array.each(function (i, pager) {
                  eventElemArray.push($(pager).offset().top);
                });
                for (var _i = 0; _i < eventElemArray.length; _i++) {
                  if ($(window).scrollTop() + $(window).height() * 0.5 > eventElemArray[_i]) {
                    _count++;
                  }
                }
                if (_count !== _countFix) {
                  _countFix = _count;
                  $(".js-product-thumbnails .product-single__thumbnail-wrapper", $element2).removeClass("slick-current");
                  $(".js-product-thumbnails .product-single__thumbnail-wrapper", $element2).eq(_count - 1).addClass("slick-current");
                }
              });
              var $content = $(".js-product-single-media", $element2);
              var thumb_left = $(".js-product-thumbnails", $element2).offset.left;
              var thumb_width = $(".js-product-thumbnails", $element2).width() + "px";
              var thumb_ToTop = $(".js-product-thumbnails", $element2).offset().top;
              if ($content.height() > $(".js-product-thumbnails", $element2).height()) {
                $(window).scroll(function () {
                  var windowToTop = $(window).scrollTop();
                  var thumb_height = $(".js-product-thumbnails", $element2).height() + "px";
                  var stopsticky = $content.height() + $content.offset().top - windowToTop;
                  if (windowToTop + 10 > thumb_ToTop) {
                    $(".js-product-thumbnails", $element2).css({
                      "position": "fixed",
                      "top": "15px",
                      "left": thumb_left,
                      "width": thumb_width,
                      "height": thumb_height
                    });
                  } else {
                    $(".js-product-thumbnails", $element2).removeAttr("style");
                    $(".js-product-media-group .js-product-media", $element2).removeAttr("style");
                  }
                  if (stopsticky < $(".js-product-thumbnails", $element2).height()) {
                    $(".js-product-thumbnails", $element2).css({
                      "position": "absolute",
                      "top": $content.height() - $(".js-product-thumbnails", $element2).height() + "px",
                      "left": thumb_left,
                      "width": thumb_width,
                      "height": thumb_height
                    });
                  }
                });
              }
              var info_image = $(".js-product-media-item", $content).height() * 2;
              var info_left = $(".product-single__metas", $element2).offset.left;
              var info_width = $(".product-single__metas", $element2).width() + "px";
              var info_ToTop = $(".product-single__metas", $element2).offset().top;
              if ($content.height() > $(".product-single__metas", $element2).height() + info_image) {
                $(window).scroll(function () {
                  var windowToTop = $(window).scrollTop();
                  var info_height = $(".product-single__metas", $element2).height() + "px";
                  var stopsticky = $content.height() + $content.offset().top - windowToTop;
                  if (windowToTop + 10 > info_ToTop) {
                    $(".product-single__metas", $element2).css({
                      "position": "fixed",
                      "top": "15px",
                      "left": info_left,
                      "width": info_width,
                      "height": info_height
                    });
                  } else {
                    $(".product-single__metas", $element2).removeAttr("style");
                  }
                  if (stopsticky < $(".product-single__metas", $element2).height() + info_image) {
                    $(".product-single__metas", $element2).css({
                      "position": "absolute",
                      "top": $content.height() - $(".product-single__metas", $element2).height() - info_image + "px",
                      "left": info_left,
                      "width": info_width,
                      "height": info_height
                    });
                  }
                });
              }
            }
          },
          sticky_sidebar: function sticky_sidebar() {
            if ($(window).width() < 1199 && $(".product-single .bwp-single-sidebar").length > 0) {
              var $element2 = $(".product-single .bwp-single-sidebar");
              $(".product-single .toggle-sidebar").on("click", function () {
                if ($element2.hasClass("show")) {
                  $element2.removeClass("show");
                } else {
                  $element2.addClass("show");
                }
              });
            }
          },
          image_360: function image_360() {
            if ($(".product-single .bwp-image-360").length > 0) {
              $(".product-single .bwp-image-360").TreeSixtyImageRotate({
                totalFrames: $(".product-single .bwp-image-360").data("count"),
                endFrame: $(".product-single .bwp-image-360").data("count")
              }).initTreeSixty();
            }
          },
          tab_information: function tab_information() {
            if ($(".template-product .product-more-info").length > 0) {
              var $parent = $(".template-product .product-more-info");
              if ($(window).width() > 991) {
                $(".more-info-tabs__nav-link", $parent).on("click", function () {
                  var id = $(this).data("id");
                  $(".more-info-tabs__nav-link", $parent).removeClass("active");
                  $(".more-info-tabs__content .tab-pane", $parent).removeClass("show");
                  $(this).addClass("active");
                  $("#" + id, $parent).addClass("show");
                });
              } else {
                $(".more-info-tabs__content .tab-pane", $parent).removeClass("show");
                $(".more-info-tabs__nav-link", $parent).on("click", function () {
                  var id = $(this).data("id");
                  $(".more-info-tabs__content .tab-pane", $parent).slideUp();
                  $("body,html").animate({
                    scrollTop: $(".more-info-tabs__content").offset().top - 50
                  }, 600);
                  if ($(this).hasClass("active")) {
                    $("#" + id, $parent).slideUp();
                    $(".more-info-tabs__nav-link", $parent).removeClass("active");
                  } else {
                    $("#" + id, $parent).slideDown();
                    $(".more-info-tabs__nav-link", $parent).removeClass("active");
                    $(this).addClass("active");
                  }
                });
              }
            }
          }
        });
        return Product;
      }();
      wpbingo.ProductRecommendations = /* @__PURE__ */function () {
        function ProductRecommendations(container2) {
          this.$container = $(container2);
          var self = this;
          var baseUrl = this.$container.data("baseUrl");
          var productId = this.$container.data("productId");
          var recommendationsSectionUrl = baseUrl + "?section_id=product-recommendations&product_id=" + productId + "&limit=6";
          $.get(recommendationsSectionUrl).then(function (section) {
            var recommendationsMarkup = $(section).html();
            if (recommendationsMarkup.trim() !== "") {
              self.$container.html(recommendationsMarkup);
              var $config = $('[data-section-type="product-recommendations"]');
              var $title = $('[data-section-type="product-recommendations"]').data("title");
              var $element2 = $(".js-product-recommendations", self.$container);
              $(".wpbingo-title__heading", $config).html($title);
              $element2.slick({
                slidesToShow: $config.data("columns"),
                autoplay: $config.data("autoplay"),
                autoplaySpeed: $config.data("autoplayspeed"),
                arrows: $config.data("nav"),
                infinite: $config.data("infinite"),
                slidesToScroll: $config.data("slidestoscroll") ? $config.data("columns") : 1,
                rtl: wpbingo.rtl_slick(),
                responsive: [{
                  breakpoint: 1441,
                  settings: {
                    slidesToShow: $config.data("column1440") ? $config.data("column1440") : $config.data("column"),
                    slidesToScroll: $config.data("column1440") ? $config.data("column1440") : $config.data("column")
                  }
                }, {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: $config.data("column1"),
                    slidesToScroll: $config.data("column1")
                  }
                }, {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: $config.data("column2"),
                    slidesToScroll: $config.data("column2")
                  }
                }, {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: $config.data("column3"),
                    slidesToScroll: $config.data("column3")
                  }
                }, {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: $config.data("column4"),
                    slidesToScroll: $config.data("column4")
                  }
                }]
              });
              initButtons(".js-product-recommendations");
              initButtonsCompare(".js-product-recommendations");
              wpbingo.countdown();
              wpbingo.click_atribute_image();
              wpbingo.zoom_thumb();
              if ($(".bwp_currency").length > 0) {
                Currency.Currency_customer(true);
              }
              $(".product-card__image-wrapper.slider").each(function () {
                wpbingo.elementslickCarousel($(".js-carousel", $(this)));
              });
            }
          });
        }
        return ProductRecommendations;
      }();
      wpbingo.HeaderSection = function () {
        var selectors2 = {
          disclosureLocale: "[data-disclosure-locale]",
          disclosureCurrency: "[data-disclosure-currency]",
          searchOptions: ".js-header-search-options",
          searchMobileToggle: ".js-header-search-toggle",
          menuMobileToggle: ".js-menu-mobile",
          menuMobileChildToggle: ".js-mm-nav-item"
        };
        function Header(container2) {
          this.$container = $(container2);
          this.cache = {};
          this.cacheSelectors();
          var $body2 = $("body");
          if (this.cache.$localeDisclosure.length) {
            this.localeDisclosure = new wpbingo.Disclosure(this.cache.$localeDisclosure);
          }
          if (this.cache.$currencyDisclosure.length) {
            this.currencyDisclosure = new wpbingo.Disclosure(this.cache.$currencyDisclosure);
          }
          this.cache.$searchOptions.on("click", function (evt) {
            evt.preventDefault();
            var $this = $(this),
              $form = $this.closest("form");
            $form.find(".js-header-search-options").removeClass("active");
            $this.addClass("active");
            $form.find(".dropdown-toggle").text($this.text());
            $form.find(".js-search-type").val($this.data("type"));
          });
          this.cache.$searchMobileToggle.on("click", function (evt) {
            evt.preventDefault();
            $body2.toggleClass("modal-search--open");
          });
          this.cache.$menuMobileToggle.on("click", function (evt) {
            evt.preventDefault();
            $body2.toggleClass("menu-mobile--open");
          });
          $(".menu-mobile__overlay").on("click", function (evt) {
            evt.preventDefault();
            $body2.removeClass("menu-mobile--open");
          });
          this.cache.$menuMobileChildToggle.on("click", function (evt) {
            evt.preventDefault();
            var $this = $(this);
            if ($this.hasClass("mm-nav__prev")) {
              $this.closest(".active--hidden").removeClass("active--hidden");
            } else {
              $this.parents(".mm-nav__links").addClass("active--hidden");
            }
            $this.closest(".menu-mobile__nav-item").toggleClass("active");
          });
        }
        Header.prototype = _.assignIn({}, Header.prototype, {
          cacheSelectors: function cacheSelectors() {
            this.cache = {
              $localeDisclosure: this.$container.find(selectors2.disclosureLocale),
              $currencyDisclosure: this.$container.find(selectors2.disclosureCurrency),
              $searchOptions: this.$container.find(selectors2.searchOptions),
              $searchMobileToggle: this.$container.find(selectors2.searchMobileToggle),
              $menuMobileToggle: this.$container.find(selectors2.menuMobileToggle),
              $menuMobileChildToggle: this.$container.find(selectors2.menuMobileChildToggle)
            };
          },
          onUnload: function onUnload() {
            if (this.cache.$localeDisclosure.length) {
              this.localeDisclosure.unload();
            }
            if (this.cache.$currencyDisclosure.length) {
              this.currencyDisclosure.unload();
            }
          }
        });
        return Header;
      }();
      wpbingo.FooterSection = function () {
        var selectors2 = {
          disclosureLocale: "[data-disclosure-locale]",
          disclosureCurrency: "[data-disclosure-currency]"
        };
        function Footer(container2) {
          this.$container = $(container2);
          this.cache = {};
          this.cacheSelectors();
          if (this.cache.$localeDisclosure.length) {
            this.localeDisclosure = new wpbingo.Disclosure(this.cache.$localeDisclosure);
          }
          if (this.cache.$currencyDisclosure.length) {
            this.currencyDisclosure = new wpbingo.Disclosure(this.cache.$currencyDisclosure);
          }
        }
        Footer.prototype = _.assignIn({}, Footer.prototype, {
          cacheSelectors: function cacheSelectors() {
            this.cache = {
              $localeDisclosure: this.$container.find(selectors2.disclosureLocale),
              $currencyDisclosure: this.$container.find(selectors2.disclosureCurrency)
            };
          },
          onUnload: function onUnload() {
            if (this.cache.$localeDisclosure.length) {
              this.localeDisclosure.unload();
            }
            if (this.cache.$currencyDisclosure.length) {
              this.currencyDisclosure.unload();
            }
          }
        });
        return Footer;
      }();
      wpbingo.LoginRegister = function () {
        var selectors2 = {
          loginForm: ".js-login-form",
          recoverPasswordForm: ".js-recover-password",
          recoverPasswordToggle: ".js-forget-password",
          recoverPasswordSuccess: ".js-recover-password-success"
        };
        function LoginRegister(container2) {
          this.$container = $(container2);
          this.cache = {};
          this.classes = {
            hidden: "d-none"
          };
          this.cacheSelectors();
          this.initializeEvents();
          this.resetPasswordSuccess();
        }
        LoginRegister.prototype = _.assignIn({}, LoginRegister.prototype, {
          cacheSelectors: function cacheSelectors() {
            this.cache = {
              $loginForm: this.$container.find(selectors2.loginForm),
              $recoverPasswordForm: this.$container.find(selectors2.recoverPasswordForm),
              $recoverPasswordToggle: this.$container.find(selectors2.recoverPasswordToggle),
              $recoverPasswordSuccess: this.$container.find(selectors2.recoverPasswordSuccess)
            };
          },
          initializeEvents: function initializeEvents() {
            if (this.cache.$recoverPasswordToggle.length) {
              this.cache.$recoverPasswordToggle.on("click", function (e) {
                e.preventDefault();
                var isShow = this.cache.$loginForm.hasClass(this.classes.hidden) ? false : true;
                this.displayRecoverPasswordForm(isShow);
              }.bind(this));
            }
            if (window.location.hash === "#recover") {
              this.displayRecoverPasswordForm(true);
            }
          },
          displayRecoverPasswordForm: function displayRecoverPasswordForm(isShow) {
            if (isShow) {
              this.cache.$loginForm.addClass(this.classes.hidden);
              this.cache.$recoverPasswordForm.removeClass(this.classes.hidden);
            } else {
              this.cache.$loginForm.removeClass(this.classes.hidden);
              this.cache.$recoverPasswordForm.addClass(this.classes.hidden);
            }
          },
          resetPasswordSuccess: function resetPasswordSuccess() {
            if (typeof window.resetPassword != "undefined" && window.resetPassword) {
              this.cache.$recoverPasswordSuccess.removeClass(this.classes.hidden);
            }
          }
        });
        return LoginRegister;
      }();
      wpbingo.Search = function () {
        var selectors2 = {
          search: "[data-search]",
          searchPagination: ".search-pagination a"
        };
        function Search(container2) {
          var ajaxCartSearch = function ajaxCartSearch() {
            if (typeof ajaxCart != "undefined") {
              ajaxCart.init({
                formSelector: ".search-results [data-product-form]"
              });
            }
          };
          var searchResultData = function searchResultData(container3, url) {
            $.get(url, function (data2) {
              container3.html(data2);
              ajaxCartSearch();
            });
          };
          var getSearchResult = function getSearchResult(searchs) {
            searchs.each(function () {
              var $this = $(this);
              $.get($this.data("url"), function (data2) {
                $this.html(data2);
                ajaxCartSearch();
              });
            });
          };
          this.$container = $(container2);
          this.cache = {};
          this.cacheSelectors();
          if (this.cache.$search.length) {
            getSearchResult(this.cache.$search);
          }
          this.$container.on("click", selectors2.searchPagination, function (e) {
            e.preventDefault();
            var $searchContainer = $(this).parents(selectors2.search);
            var searchURL = $(this).attr("href");
            searchResultData($searchContainer, searchURL);
          });
        }
        Search.prototype = _.assignIn({}, Search.prototype, {
          cacheSelectors: function cacheSelectors() {
            this.cache = {
              $search: this.$container.find(selectors2.search)
            };
          }
        });
        return Search;
      }();
      wpbingo.QuickView = function () {
        var selectors2 = {
          body: "body",
          quickView: "[data-quickview]",
          quickViewTemplate: "#quickview-template",
          quickViewBtn: ".js-btn-quickview",
          quickViewContainer: "[data-quickview-container]",
          quickViewClose: "[data-quickview-close]",
          quickViewImages: "[data-quickview-images]",
          quickViewReview: "[data-quickview-review]",
          // quickViewReview: '[data-quickview-review]',
          quickviewVariant: ".js-quickview-option-selector",
          originalSelectorId: "[data-quickview-variant]",
          quickViewProductPrice: ".js-qv-product-price",
          quickViewProductPriceCompare: ".js-qv-product-price-compare",
          quickViewQty: "[data-quickview-quantity]",
          quickViewSKU: "[data-quickview-sku]",
          quickViewAvaiable: ".product-avaiable",
          quickViewAvaiableInStock: ".product-avaiable--instock",
          quickViewAvaiableOutStock: ".product-avaiable--outstock",
          quickViewProductDetailsURL: ".js-qv-product-details"
        };
        function QuickView(container2) {
          this.$container = $(container2);
          this.cache = {};
          this.productVariants = [];
          this.currentVariant = {};
          this.cacheSelectors();
          this.initializeEvents();
        }
        QuickView.prototype = _.assignIn({}, QuickView.prototype, {
          cacheSelectors: function cacheSelectors() {
            this.cache = {
              $body: $("body"),
              $quickViewContainer: this.$container.find(selectors2.quickViewContainer)
            };
          },
          initializeEvents: function initializeEvents() {
            var $this = this;
            $(selectors2.body).on("click", selectors2.quickViewBtn, function (e) {
              e.preventDefault();
              var productHandle = $(this).data("handle");
              $(this).addClass("load-quickview");
              $.getJSON("/products/" + productHandle + ".js", function (product) {
                if (product.available) {
                  $this.firstAvailableVariant(product.variants, $this);
                } else {
                  $this.currentVariant = product.variants[0];
                }
                $(selectors2.quickViewBtn).removeClass("load-quickview");
                $this.buildQuickView(product);
                $this.buildMetafields(product);
                $this.renderReview();
                $this.createImageCarousel();
                $("[data-quickview]").addClass("show");
                setTimeout(function () {
                  $("[data-quickview]").addClass("show-content");
                }, 300);
                var $element2 = $(".quickview .product-quickview__variants .variants-wrapper");
                $($element2).each(function () {
                  var $this2 = $(this);
                  if ($("select", $this2).length > 0) {
                    var value = $("select", $this2).find(":selected").val();
                  } else {
                    var value = $("input:checked", $this2).attr("value");
                  }
                  $(".variants__label span", $this2).html(value);
                });
              });
            });
            $(selectors2.body).on("click", selectors2.quickViewClose, function (e) {
              e.preventDefault();
              $("[data-quickview]").removeClass("show-content");
              setTimeout(function () {
                $("[data-quickview]").removeClass("show");
              }, 300);
              setTimeout(function () {
                $("[data-quickview-container]").empty();
              }, 500);
            });
            $(selectors2.quickViewContainer).on("change", selectors2.quickviewVariant, function (e) {
              $this.onVariantChange();
            });
          },
          firstAvailableVariant: function firstAvailableVariant(variants, global) {
            global.productVariants = variants;
            for (var i = 0; i < variants.length; i++) {
              var variant = variants[i];
              if (variant.available) {
                global.currentVariant = variant;
                break;
              }
            }
          },
          buildQuickView: function buildQuickView(product) {
            var moneyFormat2 = wpbingo.strings.moneyFormat;
            var currentVariant = this.currentVariant;
            var source = $(selectors2.quickViewTemplate).html();
            var template = Handlebars.compile(source);
            var images = "";
            var price = "";
            var external = "";
            var qvObject = {
              id: product.id
            };
            if (typeof product.media !== "undefined") {
              images += '<div class="quickview-images__list slick-carousel" data-quickview-images>';
              for (var i = 0; i < product.media.length; i++) {
                var media = product.media[i];
                if (media.media_type !== "video") {
                  images += '<div class="slick-carousel__item"><div class="quickview-images__item" data-media-id=' + media.id + '><img class="img-fluid" alt="' + product.title + '" src="' + media.preview_image.src + '" /></div></div>';
                } else {
                  var media_video;
                  for (var j in media.sources) {
                    if (media.sources[j].width == media.preview_image.width && media.sources[j].format == "mp4") {
                      media_video = media.sources[j].url;
                    }
                  }
                  images += '<div class="slick-carousel__item"><div class="quickview-images__item" data-media-id=' + media.id + '><video class="img-fluid" playsinline="" loop="loop" autoplay="autoplay" muted="muted" src="' + media_video + '" /></video></div></div>';
                }
              }
              images += "</div>";
            }
            qvObject.variantID = currentVariant.id;
            qvObject.sku = currentVariant.sku !== null && currentVariant.sku !== "" ? currentVariant.sku : "N/A";
            qvObject.images = images;
            qvObject.title = product.title;
            qvObject.url = product.url;
            qvObject.vendor = product.vendor;
            price += '<div class="price-container">';
            var productCompareClass = currentVariant.compare_at_price !== null ? "" : "d-none";
            price += '<div class="js-qv-product-price-compare product-single__price--compare-at ' + productCompareClass + '">' + wpbingo.Currency.formatMoney(currentVariant.compare_at_price, moneyFormat2) + "</div>";
            price += '<div class="js-qv-product-price product-single__price">' + wpbingo.Currency.formatMoney(currentVariant.price, moneyFormat2) + "</div>";
            price += '</div">';
            qvObject.price = price;
            qvObject.vendor = product.vendor;
            qvObject.type = product.type;
            qvObject.variants = this.buildVariant(product);
            $(selectors2.quickViewContainer).html(template(qvObject));
            this.updateMedia(currentVariant);
            this.updateSKU(currentVariant);
            this.updateProductAvaiable(currentVariant);
            this.updateDetailsLink(currentVariant);
            $("#form-simple-addtocart .btn--add-to-cart").on("click", function (e) {
              e.preventDefault();
              $(this).removeClass("added");
              $(this).addClass("active");
              var addToCartForm = document.querySelector("#form-simple-addtocart");
              var formData = new FormData(addToCartForm);
              var params = {
                type: "POST",
                url: "/cart/add.js",
                data: formData,
                processData: false,
                contentType: false,
                dataType: "json",
                success: function success(line_item) {
                  $("#form-simple-addtocart .btn--add-to-cart").removeClass("active");
                  $("#form-simple-addtocart .btn--add-to-cart").addClass("added");
                  setTimeout(function () {
                    $("#form-simple-addtocart .btn--add-to-cart").removeClass("added");
                  }, 2e3);
                  ajaxCart.load();
                  if ($(".js-drawer").length) {
                    $("body").addClass("drawer--open");
                  }
                  $(".js-drawer-close").on("click", function () {
                    $("body").removeClass("drawer--open");
                  });
                },
                error: function error(XMLHttpRequest2, textStatus) {
                  if (typeof errorCallback === "function") {
                    errorCallback(XMLHttpRequest2, textStatus);
                  } else {
                    ShopifyAPI.onError(XMLHttpRequest2, textStatus);
                  }
                }
              };
              jQuery.ajax(params);
            });
            if ($(".bwp_currency").length > 0) {
              Currency.Currency_customer(true);
            }
          },
          convertToSlug: function convertToSlug(str) {
            return str.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
          },
          buildMetafields: function buildMetafields(product) {
            var this_button = $(".js-btn-quickview[data-handle=" + product.handle + "]");
            var parent_button = this_button.closest(".product-card");
            var html = "";
            if (parent_button.data("external")) {
              var value = parent_button.data("external");
              $(".product-quickview__buttons").remove();
              html += '<a href="' + value + '">' + wpbingo.strings.external + "</a>";
              $(".product-quickview__buttons_external").html(html);
            }
            if (parent_button.data("short_description")) {
              var value = parent_button.data("short_description");
              $(".product-quickview .product-quickview__description").html(value);
            }
            if (parent_button.data("countdowns")) {
              var countdowns = parent_button.data("countdowns");
              $(".quickview .countdown-quickview").removeClass("hidden");
              html += '<div class="countdown" data-countdown="' + countdowns + '"></div>';
              $(".countdown-quickview .content").html(html);
              var $this = $(".product-quickview .countdown-quickview .countdown"),
                finalDate = $this.data("countdown"),
                date_final = new Date(finalDate),
                seconds_final = date_final.getTime(),
                date = Date.now(),
                text_day = "d",
                text_hour = "h",
                time_min = "m",
                text_sec = "s";
              if (seconds_final > date) {
                $this.countdown(finalDate, function (event) {
                  var strTime = '<div class="countdown__item"><span>%D</span><span>' + text_day + '</span></div><div class="countdown__item"><span>%H</span><span>' + text_hour + '</span></div><div class="countdown__item"><span>%M</span><span>' + time_min + '</span></div><div class="countdown__item"><span>%S</span><span>' + text_sec + "</span></div>";
                  $this.html(event.strftime(strTime));
                }).on("finish.countdown", function () {
                  $this.html(wpbingo.strings.countdownFinish);
                });
              } else {
                $(".product-quickview .countdown-quickview").remove();
              }
            }
            if (parent_button.data("is_group_product")) {
              if (parent_button.data("group_product")) {
                var value = parent_button.data("group_product");
                var group_handle = value.split(",");
                $(".product-quickview .product-quickview__variants").remove();
                $(".product-quickview .price-container").remove();
                $("#form-simple-addtocart").remove();
                html += '<form method="post" id="group_table_product" action="/cart/add"  enctype="multipart/form-data" novalidate="novalidate"><input type="hidden" name="form_type" value="product"><div class="group_table"></div><div class="product-group__add-to-cart product-single__buttons"><button type="submit" class="add-group-to-cart"><span>' + wpbingo.strings.add_to_cart + "</span></button></div></form>";
                $(".group-quickview").html(html);
                var group = "";
                var _iterator = _createForOfIteratorHelper(group_handle),
                  _step;
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var handle = _step.value;
                    $.getJSON("/products/" + handle + ".js", function (product2) {
                      group += '<div data-product_id="' + product2.id + '" class="item-product-group">';
                      group += '<div class="product-content">';
                      group += '<div class="product-thumb">';
                      group += '<a href="/product/' + product2.handle + '"><img class="featured-banner__img" src="' + product2.featured_image + '" alt="' + product2.featured_image.alt + '" /></a>';
                      group += "</div>";
                      group += '<div class="product-info">';
                      group += '<h3 class="product-title"><a href="/product/' + product2.handle + '">' + product2.title + "</a></h3>";
                      if (product2.variants.length > 1) {
                        group += '<select name="items[][id]" class="js-product-btp--' + product2.id + ' product-single__variants">';
                        for (var i = 0; i < product2.variants.length; i++) {
                          group += '<option data-price="' + product2.variants[i].price + '" value="' + product2.variants[i].id + '"> ' + product2.variants[i].title + " - " + wpbingo.Currency.formatMoney(product2.variants[i].price) + " </option>";
                        }
                        group += "</select>";
                      } else {
                        group += '<div class="product-price">' + wpbingo.Currency.formatMoney(product2.variants[0].price) + '</div><input name="items[][id]" type="hidden" value="' + product2.variants[0].id + '">';
                      }
                      group += "</div>";
                      group += "</div>";
                      group += '<div class="quantity-content">';
                      group += '<button type="button" class="js-qty-adjust wpbingo-qty__adjust wpbingo-qty__adjust--minus"><i class="feather-minus"></i></button>';
                      group += '<input type="text" name="items[][quantity]" class="js-qty-number wpbingo-qty__number" value="1" min="0" aria-label="quantity" pattern="[0-9]*">';
                      group += '<button type="button" class="js-qty-adjust wpbingo-qty__adjust wpbingo-qty__adjust--plus"><i class="feather-plus"></i></button>';
                      group += "</div>";
                      group += "</div>";
                      $(".group-quickview .group_table").html(group);
                    });
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                $("#group_table_product .add-group-to-cart").on("click", function (e) {
                  e.preventDefault();
                  $(this).removeClass("added");
                  $(this).addClass("active");
                  var addToCartForm = document.querySelector("#group_table_product");
                  var formData = new FormData(addToCartForm);
                  var params = {
                    type: "POST",
                    url: "/cart/add.js",
                    data: formData,
                    processData: false,
                    contentType: false,
                    dataType: "json",
                    success: function success(line_item) {
                      $("#group_table_product .add-group-to-cart").removeClass("active");
                      $("#group_table_product .add-group-to-cart").addClass("added");
                      setTimeout(function () {
                        $("#group_table_product .add-group-to-cart").removeClass("added");
                      }, 3e3);
                      ajaxCart.load();
                    },
                    error: function error(XMLHttpRequest2, textStatus) {
                      if (typeof errorCallback === "function") {
                        errorCallback(XMLHttpRequest2, textStatus);
                      } else {
                        ShopifyAPI.onError(XMLHttpRequest2, textStatus);
                      }
                    }
                  };
                  jQuery.ajax(params);
                });
              } else {
                $(".product-quickview .product-quickview__variants").remove();
                $(".product-quickview .price-container").remove();
                $("#form-simple-addtocart").remove();
                html += '<div class="view-gruop-product"><a class="view-gruop-product-btn" href="' + product.url + '"><span>' + wpbingo.strings.view_group + "</span></a></div>";
                $(".group-quickview").html(html);
              }
            }
          },
          buildVariant: function buildVariant(product) {
            var result = "";
            var currentVariant = this.currentVariant;
            if (product.options[0].name !== "Title") {
              var options = product.options;
              for (var i = 0; i < options.length; i++) {
                var option = options[i];
                var optionIndex = i + 1;
                var type = "label";
                var size = wpbingo.settings.size_option;
                if (wpbingo.settings.filter_name_1 === option.name) {
                  type = wpbingo.settings.select_filter_1;
                } else if (wpbingo.settings.filter_name_2 === option.name) {
                  type = wpbingo.settings.select_filter_2;
                } else if (wpbingo.settings.filter_name_3 === option.name) {
                  type = wpbingo.settings.select_filter_3;
                }
                result += '<div class="variants-wrapper product-form__item ' + type + '" data-quickview-variant-option="' + optionIndex + '">';
                result += '<label class="variants__label">' + option.name + ": <span></span></label>";
                result += '<div class="variants__options">';
                if (wpbingo.settings.quickViewVariantType === "select") {
                  result += '<select class="js-quickview-option-selector product-form__input" data-id="quickViewOptionSelector-' + optionIndex + '" data-index="option' + optionIndex + '">';
                  for (var j = 0; j < option.values.length; j++) {
                    var value = option.values[j];
                    result += '<option value="' + _.escape(value) + '" ';
                    result += currentVariant.options[i] === value ? 'selected="selected"' : "";
                    result += ">" + value + "</option>";
                  }
                  result += "</select>";
                } else if (wpbingo.settings.quickViewVariantType === "radio") {
                  for (var j = 0; j < option.values.length; j++) {
                    var value = option.values[j];
                    var isDisable = true;
                    var isVariantsImage = false;
                    var colorAttribute = "";
                    for (var k = 0; k < this.productVariants.length; k++) {
                      var variantCondition = this.productVariants[k];
                      if (variantCondition.available) {
                        if (i == 0 && variantCondition.option1 === value) {
                          isDisable = false;
                          break;
                        } else if (i == 1 && variantCondition.option2 === value && variantCondition.option1 == currentVariant.option1) {
                          isDisable = false;
                          break;
                        } else if (i == 2 && variantCondition.option3 === value && variantCondition.option2 == currentVariant.option2 && variantCondition.option1 == currentVariant.option1) {
                          isDisable = false;
                          break;
                        }
                      }
                    }
                    for (var e = 0; e < product.media.length; e++) {
                      var media_arr = product.media[e];
                      var media_alt = media_arr.alt;
                      if (media_alt) {
                        var alt = media_alt.split("-");
                      }
                      if (alt && alt[1] == value) {
                        isVariantsImage = true;
                        break;
                      }
                    }
                    if (isVariantsImage) {
                      for (var e = 0; e < product.media.length; e++) {
                        var media_arr = product.media[e];
                        var media_alt = media_arr.alt;
                        if (media_alt) {
                          var alt = media_alt.split("-");
                        }
                        if (alt[1] == value) {
                          var background = media_arr.src;
                          result += '<div class="single-option-selector">';
                          result += '<input type="radio" data-single-option-button';
                          result += currentVariant.options[i] === value ? " checked " : " ";
                          if (isDisable) {
                            result += 'disabled="disabled"';
                          }
                          result += 'value="' + _.escape(value) + '" data-index="option' + optionIndex + '" name="option' + option.position + '" ';
                          result += 'class="js-quickview-option-selector';
                          if (isDisable) {
                            result += " disabled";
                          }
                          result += '" id="quickview-product-option-' + i + "-" + value.toLowerCase() + '">';
                          result += '<label class="' + value + '" data-toggle="tooltip" title="' + value + '" for="quickview-product-option-' + i + "-" + value.toLowerCase() + '" ' + colorAttribute;
                          if (isDisable) {
                            result += ' class="disabled"';
                          }
                          result += 'style="background:url(' + background + ');background-size: cover;background-position: center;">' + value + '<span class="d-none"></span></label>';
                          result += "</div>";
                          break;
                        }
                      }
                    } else {
                      result += '<div class="single-option-selector">';
                      result += '<input type="radio" data-single-option-button';
                      result += currentVariant.options[i] === value ? " checked " : " ";
                      if (isDisable) {
                        result += 'disabled="disabled"';
                      }
                      result += 'value="' + _.escape(value) + '" data-index="option' + optionIndex + '" name="option' + option.position + '" ';
                      result += 'class="js-quickview-option-selector';
                      if (isDisable) {
                        result += " disabled";
                      }
                      result += '" id="quickview-product-option-' + i + "-" + value.toLowerCase() + '">';
                      result += '<label class="' + value + '" data-toggle="tooltip" title="' + value + '" for="quickview-product-option-' + i + "-" + value.toLowerCase() + '" ' + colorAttribute;
                      if (isDisable) {
                        result += ' class="disabled"';
                      }
                      result += ">" + value + '<span class="d-none"></span></label>';
                      result += "</div>";
                    }
                  }
                }
                result += "</div>";
                result += "</div>";
              }
            }
            return result;
          },
          createImageCarousel: function createImageCarousel() {
            $(selectors2.quickView).find(selectors2.quickViewImages).slick({
              infinite: false,
              rows: 0,
              fade: true,
              rtl: wpbingo.rtl_slick()
            });
          },
          renderReview: function renderReview() {
            if (window.SPR && wpbingo.settings.enableReview) {
              if ($(selectors2.quickView).find(selectors2.quickViewReview).length) {
                return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
              }
              ;
            }
          },
          getCurrentOptions: function getCurrentOptions() {
            var currentOptions = _.map($(selectors2.quickviewVariant, selectors2.quickViewContainer), function (element) {
              var $element2 = $(element);
              var type = $element2.attr("type");
              var currentOption = {};
              if (type === "radio" || type === "checkbox") {
                if ($element2[0].checked) {
                  currentOption.value = $element2.val();
                  currentOption.index = $element2.data("index");
                  return currentOption;
                } else {
                  return false;
                }
              } else {
                currentOption.value = $element2.val();
                currentOption.index = $element2.data("index");
                return currentOption;
              }
            });
            currentOptions = _.compact(currentOptions);
            return currentOptions;
          },
          getVariantFromOptions: function getVariantFromOptions() {
            var selectedValues = this.getCurrentOptions();
            var variants = this.productVariants;
            var found = _.find(variants, function (variant) {
              return selectedValues.every(function (values) {
                return _.isEqual(variant[values.index], values.value);
              });
            });
            return found;
          },
          updateVariantsButton: function updateVariantsButton() {
            var selectedValues = this.getCurrentOptions();
            var variants = this.productVariants;
            for (var i = 2; i <= 3; i++) {
              if ($('[data-quickview-variant-option="' + i + '"]', selectors2.quickViewContainer).length) {
                $('[data-quickview-variant-option="' + i + '"] ' + selectors2.quickviewVariant, selectors2.quickViewContainer).each(function () {
                  var $self = $(this);
                  var optionValue = $self.val();
                  var foundIndex;
                  if (i === 2) {
                    foundIndex = _.findIndex(variants, function (variant) {
                      variant.option1 = variant.option1.toString();
                      selectedValues[0].value = selectedValues[0].value.toString();
                      variant.option2 = variant.option2.toString();
                      optionValue = optionValue.toString();
                      return variant.option1 === selectedValues[0].value && variant.option2 === optionValue && variant.available === true;
                    });
                  } else if (i === 3) {
                    foundIndex = _.findIndex(variants, function (variant) {
                      variant.option1 = variant.option1.toString();
                      variant.option2 = variant.option2.toString();
                      variant.option3 = variant.option3.toString();
                      selectedValues[0].value = selectedValues[0].value.toString();
                      selectedValues[1].value = selectedValues[1].value.toString();
                      optionValue = optionValue.toString();
                      return variant.option1 === selectedValues[0].value && variant.option2 === selectedValues[1].value && variant.option3 === optionValue && variant.available === true;
                    });
                  }
                  if (foundIndex !== -1) {
                    $self.removeAttr("disabled", "disabled").removeClass("disabled");
                    $self.next("label").removeClass("disabled");
                  } else {
                    $self.attr("disabled", "disabled").addClass("disabled");
                    $self.next("label").addClass("disabled");
                  }
                });
              }
            }
          },
          updateVariantsButtonDisabed: function updateVariantsButtonDisabed() {
            for (var i = 2; i <= 3; i++) {
              if ($('[data-quickview-variant-option="' + i + '"]', selectors2.quickViewContainer).length) {
                var isUpdate = false;
                $('[data-quickview-variant-option="' + i + '"] ' + selectors2.quickviewVariant, selectors2.quickViewContainer).each(function () {
                  var $element2 = $(this);
                  var type = $element2.attr("type");
                  if (type === "radio" || type === "checkbox") {
                    if (this.checked && $element2.hasClass("disabled")) {
                      $element2.prop("checked", false);
                      isUpdate = true;
                      return false;
                    }
                  }
                });
                $('[data-quickview-variant-option="' + i + '"] ' + selectors2.quickviewVariant, selectors2.quickViewContainer).each(function () {
                  var $element2 = $(this);
                  var type = $element2.attr("type");
                  if (isUpdate && (type === "radio" || type === "checkbox") && !$element2.hasClass("disabled")) {
                    $element2.prop("checked", true);
                    isUpdate = false;
                    $element2.trigger("change");
                    return false;
                  }
                });
              }
            }
          },
          updateMasterSelect: function updateMasterSelect(variant) {
            if (variant) {
              $(selectors2.originalSelectorId, selectors2.quickViewContainer).val(variant.id);
            }
          },
          updateMedia: function updateMedia(variant) {
            $(selectors2.quickViewImages, selectors2.quickView).on("init", function (event, slick) {
              if (variant && variant.featured_media && variant.featured_media.id) {
                $(selectors2.quickViewImages, selectors2.quickViewContainer).find(".quickview-images__item").each(function () {
                  var imageID = $(this).data("media-id");
                  if (variant.featured_media.id == imageID) {
                    var slickIndex = $(this).closest(".slick-carousel__item").data("slick-index");
                    setTimeout(function () {
                      if (slickIndex !== void 0 && slickIndex !== null) {
                        $(selectors2.quickViewImages, selectors2.quickViewContainer).slick("slickGoTo", slickIndex);
                      }
                    }, 100);
                  }
                });
              }
            });
            if (variant && variant.featured_media && variant.featured_media.id) {
              $(selectors2.quickViewImages, selectors2.quickViewContainer).find(".quickview-images__item").each(function () {
                var imageID = $(this).data("media-id");
                if (variant.featured_media.id == imageID) {
                  var slickIndex = $(this).closest(".slick-carousel__item").data("slick-index");
                  if (slickIndex !== void 0 && slickIndex !== null) {
                    $(selectors2.quickViewImages, selectors2.quickViewContainer).slick("slickGoTo", slickIndex);
                  }
                }
              });
            }
          },
          updatePrice: function updatePrice(variant) {
            var moneyFormat2 = wpbingo.strings.moneyFormat;
            if (!variant) {
              $(selectors2.quickViewProductPrice, selectors2.quickViewContainer).addClass("d-none");
              $(selectors2.quickViewProductPriceCompare, selectors2.quickViewContainer).addClass("d-none");
            } else {
              $(selectors2.quickViewProductPrice, selectors2.quickViewContainer).removeClass("d-none");
              $(selectors2.quickViewProductPriceCompare, selectors2.quickViewContainer).removeClass("d-none");
              $(selectors2.quickViewProductPrice, selectors2.quickViewContainer).html(wpbingo.Currency.formatMoney(variant.price, moneyFormat2));
              if (variant.compare_at_price > variant.price) {
                $(selectors2.quickViewProductPriceCompare, selectors2.quickViewContainer).html(wpbingo.Currency.formatMoney(variant.compare_at_price, moneyFormat2)).removeClass("d-none");
                $(selectors2.quickViewProductPrice, selectors2.quickViewContainer).addClass("on-sale");
              } else {
                $(selectors2.quickViewProductPriceCompare, selectors2.quickViewContainer).addClass("d-none");
                $(selectors2.quickViewProductPrice, selectors2.quickViewContainer).removeClass("on-sale");
              }
            }
            if ($(".bwp_currency").length > 0) {
              Currency.Currency_customer(true);
            }
          },
          updateSKU: function updateSKU(variant) {
            var sku = variant && variant.sku !== null && variant.sku !== "" ? variant.sku : "N/A";
            $(selectors2.quickViewSKU, selectors2.quickViewContainer).html(sku);
          },
          updateProductAvaiable: function updateProductAvaiable(variant) {
            var classActive = "product-avaiable--active";
            var translations = wpbingo.strings;
            $(selectors2.quickViewAvaiable, selectors2.quickViewContainer).removeClass(classActive);
            if (variant) {
              if (variant.available) {
                $(selectors2.quickViewQty, selectors2.quickViewContainer).removeClass("d-none");
                $(selectors2.quickViewAvaiableInStock, selectors2.quickViewContainer).addClass(classActive);
              } else {
                $(selectors2.quickViewQty, selectors2.quickViewContainer).addClass("d-none");
                $(selectors2.quickViewAvaiableOutStock, selectors2.quickViewContainer).addClass(classActive);
              }
              if (variant.available) {
                $(selectors2.quickViewContainer).find(".btn--add-to-cart").removeClass("disabled").prop("disabled", false);
                $(selectors2.quickViewContainer).find(".btn--add-to-cart .btn__text").html(translations.addToCart);
              } else {
                $(selectors2.quickViewContainer).find(".btn--add-to-cart").addClass("disabled").prop("disabled", true);
                $(selectors2.quickViewContainer).find(".btn--add-to-cart .btn__text").html(translations.soldOut);
              }
            } else {
              $(selectors2.quickViewQty, selectors2.quickViewContainer).addClass("d-none");
              $(selectors2.quickViewContainer).find(".btn--add-to-cart").addClass("disabled").prop("disabled", true);
              $(selectors2.quickViewContainer).find(".btn--add-to-cart .btn__text").html(translations.unavailable);
            }
          },
          updateDetailsLink: function updateDetailsLink(variant) {
            if (variant) {
              var productURL = $(selectors2.quickViewProductDetailsURL, selectors2.quickViewContainer).data("url") + "?variant=" + variant.id;
              $(selectors2.quickViewProductDetailsURL, selectors2.quickViewContainer).removeClass("d-none").attr("href", productURL);
            } else {
              $(selectors2.quickViewProductDetailsURL, selectors2.quickViewContainer).addClass("d-none");
            }
          },
          onVariantChange: function onVariantChange() {
            var variant = this.getVariantFromOptions();
            if ($("[data-single-option-button]", selectors2.quickViewContainer).length) {
              this.updateVariantsButton();
              if (!variant || !variant.available) {
                this.updateVariantsButtonDisabed();
                return;
              }
            }
            var $element2 = $(".quickview .product-quickview__variants .variants-wrapper");
            $($element2).each(function () {
              var $this = $(this);
              if ($("select", $this).length > 0) {
                var value = $("select", $this).find(":selected").val();
              } else {
                var value = $("input:checked", $this).attr("value");
              }
              $(".variants__label span", $this).html(value);
            });
            this.updateMasterSelect(variant);
            this.updateMedia(variant);
            this.updatePrice(variant);
            this.updateSKU(variant);
            this.updateProductAvaiable(variant);
            this.updateDetailsLink(variant);
            this.currentVariant = variant;
          }
        });
        return QuickView;
      }();
      if (typeof ShopifyAPI === "undefined") {
        ShopifyAPI = {};
      }
      ShopifyAPI.attributeToString = function (attribute) {
        if (typeof attribute !== "string") {
          attribute += "";
          if (attribute === "undefined") {
            attribute = "";
          }
        }
        return jQuery.trim(attribute);
      };
      ShopifyAPI.updateCartNote = function (note, callback) {
        var params = {
          type: "POST",
          url: "/cart/update.js",
          data: "note=" + ShopifyAPI.attributeToString(note),
          dataType: "json",
          success: function success(cart) {
            if (typeof callback === "function") {
              callback(cart);
            }
          },
          error: function error(XMLHttpRequest2, textStatus) {
            ShopifyAPI.onError(XMLHttpRequest2, textStatus);
          }
        };
        jQuery.ajax(params);
      };
      ShopifyAPI.onError = function (XMLHttpRequest) {
        var data = eval("(" + XMLHttpRequest.responseText + ")");
        if (data.message) {
          alert(data.message + "(" + data.status + "): " + data.description);
        }
      };
      ShopifyAPI.addItemFromForm = function (form, callback, errorCallback2) {
        var formData = new FormData(form);
        var params = {
          type: "POST",
          url: "/cart/add.js",
          data: formData,
          processData: false,
          contentType: false,
          dataType: "json",
          success: function success(line_item) {
            if (typeof callback === "function") {
              callback(line_item, form);
              if ($(".product-single .content-variant_inventory").length > 0) {
                setTimeout(function () {
                  $(".product-single .content-variant_inventory").load(window.location.href + ".content-variant_inventory .js-product-avaiable");
                }, 100);
              }
            } else {
              ShopifyAPI.onItemAdded(line_item, form);
              if ($(".product-single .content-variant_inventory").length > 0) {
                setTimeout(function () {
                  $(".product-single .content-variant_inventory").load(window.location.href + ".content-variant_inventory .js-product-avaiable");
                }, 100);
              }
            }
          },
          error: function error(XMLHttpRequest2, textStatus) {
            if (typeof errorCallback2 === "function") {
              errorCallback2(XMLHttpRequest2, textStatus);
            } else {
              ShopifyAPI.onError(XMLHttpRequest2, textStatus);
            }
          }
        };
        jQuery.ajax(params);
      };
      ShopifyAPI.getCart = function (callback, added) {
        jQuery.getJSON("/cart.js", function (cart) {
          if (typeof callback === "function") {
            callback(cart, added);
          }
        });
      };
      ShopifyAPI.changeItem = function (line, quantity, callback, modal) {
        var params = {
          type: "POST",
          url: "/cart/change.js",
          data: "quantity=" + quantity + "&line=" + line,
          dataType: "json",
          success: function success(cart) {
            if (typeof callback === "function") {
              callback(cart);
            }
            if (modal) {
              var moneyFormat2 = "${{amount}}";
              if (wpbingo.strings.moneyFormat !== void 0) {
                moneyFormat2 = wpbingo.strings.moneyFormat;
              }
              var id = $("#form-modal-addtocart input[data-modal-variant]").val();
              for (var j in cart.items) {
                if (id == cart.items[j].variant_id) {
                  var price = cart.items[j].final_line_price;
                  var price_discount = cart.items[j].original_line_price;
                }
              }
              $("#form-modal-addtocart .modalcart__line_price .price").html(wpbingo.Currency.formatMoney(price, moneyFormat2));
              if (cart.items[j].discounts.length > 0) {
                $("#form-modal-addtocart .modalcart__line_price .price_discount").html(wpbingo.Currency.formatMoney(price_discount, moneyFormat2));
                for (var i in cart.items[j].discounts) {
                  $(".js-cart-modal .discount").text(cart.items[j].discounts[i].title);
                }
              } else {
                $("#form-modal-addtocart .modalcart__line_price .price_discount").empty();
                $(".js-cart-modal .discount").empty();
              }
              $("#form-modal-addtocart .cart-modal__middle").removeClass("load_modal");
            }
          },
          error: function error(XMLHttpRequest2, textStatus) {
            ShopifyAPI.onError(XMLHttpRequest2, textStatus);
          }
        };
        jQuery.ajax(params);
      };
      var ajaxCart = function (module, $) {
        "use strict";

        var init, loadCart;
        var settings, isUpdating, $body;
        var $formContainer, $addToCart, $cartCountSelector, $cartCostSelector, $cartContainer;
        var initializeEvents, updateCountPrice, formOverride, itemAddedCallback, itemErrorCallback, cartModalAdded, cartModalupdate, updateModalRecommendations, cartUpdateCallback, buildCart, cartCallback, adjustCart, adjustCartCallback, validateQty;
        init = function init(options) {
          settings = {
            formSelector: "[data-product-form]",
            cartContainer: "[data-cart-container]",
            addToCartSelector: 'button[type="submit"]',
            cartCountSelector: "[data-cart-count]",
            cartCostSelector: "[data-cart-cost]",
            cartRemoveSelector: "[data-cart-remove]",
            headerCartSelector: ".js-header-cart",
            cartModalSelector: ".js-cart-modal",
            cartModalCloseSelector: ".js-cart-modal-close",
            moneyFormat: "${{amount}}",
            disableAjaxCart: false,
            cartTemplate: "#ajaxcart-template",
            cartModalHeaderTemplate: "#ajaxcart-header-template"
          };
          if (wpbingo.strings.moneyFormat !== void 0) {
            settings.moneyFormat = wpbingo.strings.moneyFormat;
          }
          $.extend(settings, options);
          $formContainer = $(settings.formSelector);
          $cartContainer = $(settings.cartContainer);
          $addToCart = $formContainer.find(settings.addToCartSelector);
          $cartCountSelector = $(settings.cartCountSelector);
          $cartCostSelector = $(settings.cartCostSelector);
          $body = $("body");
          isUpdating = false;
          initializeEvents();
          if (!settings.disableAjaxCart && $addToCart.length) {
            formOverride();
          }
          adjustCart();
        };
        initializeEvents = function initializeEvents() {
          $body.on("click", settings.cartModalCloseSelector, function () {
            $(".js-cart-modal .cart-modal__inner").removeClass("show");
            setTimeout(function () {
              $(settings.cartModalSelector).fadeOut(400, function () {
                $(this).remove();
              });
            }, 400);
          });
          $body.on("click", settings.headerCartSelector, function (e) {
            if (wpbingo.settings.cartType == "modal" && $(window).width() > 767 && !$("body").hasClass("template-cart")) {
              e.preventDefault();
              return;
            }
          });
          $body.on("click", settings.cartRemoveSelector, function (e) {
            if (isUpdating) {
              return;
            }
            var $el = $(this),
              line = $el.data("line");
            if (line) {
              $('.ajaxcart__product[data-line="' + line + '"]').addClass("is-loading");
              isUpdating = true;
              setTimeout(function () {
                ShopifyAPI.changeItem(line, 0, adjustCartCallback);
              }, 250);
            }
            wpbingo.discount_single();
          });
          $body.on("change", ".ajaxcart__note-input", function () {
            var newNote = $(this).val();
            $(".ajaxcart__info .save-ajaxcart__note").on("click", function () {
              ShopifyAPI.updateCartNote(newNote, function () {});
            });
          });
          $body.on("change", ".discount_code_input", function () {
            var newDiscount = $(this).val();
            $(".ajaxcart__info .save-discount_code_input").on("click", function () {
              wpbingo.setCookie("wpbingo_discount", newDiscount, 1);
            });
          });
        };
        loadCart = function loadCart() {
          if ($(".js-drawer").length > 0 || $("[data-cart-container]").length > 0) {
            $body.addClass("ajaxcart--is-loading");
          }
          ShopifyAPI.getCart(cartUpdateCallback);
        };
        updateCountPrice = function updateCountPrice(cart) {
          if ($("[data-cart-count]")) {
            $("[data-cart-count]").html(cart.item_count);
          }
          if ($(".js-drawer").length > 0 || $("[data-cart-container]").length > 0) {
            if ($cartCostSelector) {
              $cartCostSelector.html(wpbingo.Currency.formatMoney(cart.total_price, settings.moneyFormat));
            }
            $(".cart-modal-totalprice span").html(wpbingo.Currency.formatMoney(cart.total_price, settings.moneyFormat));
            $(".cart-modal-totalcount span.count").html(cart.item_count);
          }
        };
        formOverride = function formOverride() {
          $body.on("submit", settings.formSelector, function (evt) {
            evt.preventDefault();
            $(".btn--add-to-cart", $(this)).attr("disabled", "disabled").prepend('<span class="spinner-border spinner-border-sm"></span>');
            $(".btn--add-to-cart", $(this)).removeClass("is-added").addClass("is-adding");
            $(".ajaxcart-toast").toast("hide");
            ShopifyAPI.addItemFromForm(evt.target, itemAddedCallback, itemErrorCallback);
          });
        };
        itemAddedCallback = function itemAddedCallback(lineItem) {
          $("form .btn--add-to-cart").removeAttr("disabled").find(".spinner-border").remove();
          $("form .btn--add-to-cart").removeClass("is-adding").addClass("is-added");
          if (wpbingo.settings.cartType == "modal") {
            cartModalAdded(lineItem);
          }
          ShopifyAPI.getCart(cartUpdateCallback, true);
          wpbingo.discount_single();
        };
        itemErrorCallback = function itemErrorCallback(XMLHttpRequest) {
          var data = eval("(" + XMLHttpRequest.responseText + ")");
          $addToCart.removeAttr("disabled").find(".spinner-border").remove();
          $addToCart.removeClass("is-adding is-added");
          if (data.message) {
            if (data.status === 422) {
              var $toast = $(".ajaxcart-toast");
              $toast.find(".toast-body").html(data.description);
              $toast.toast("show");
            }
          }
        };
        cartModalAdded = function cartModalAdded(lineItem) {
          var data2 = {},
            image = "//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif",
            source = $(settings.cartModalHeaderTemplate).html(),
            template = Handlebars.compile(source);
          if (lineItem.image != null) {
            image = lineItem.image;
          }
          updateModalRecommendations(lineItem);
          var count = $('#count_quantity [data-variant_id="' + lineItem.variant_id + '"]').data("count_quantity");
          var disabled = "";
          if (lineItem.quantity == count) {
            disabled = "disabled";
          }
          data2 = {
            name: lineItem.product_title,
            image: image,
            discount: lineItem.discounts,
            variant_id: lineItem.variant_id,
            variant: lineItem.variant_title,
            options: lineItem.options_with_values,
            price_discount: wpbingo.Currency.formatMoney(lineItem.original_line_price, settings.moneyFormat),
            final_line_price: wpbingo.Currency.formatMoney(lineItem.final_line_price, settings.moneyFormat),
            final_price: wpbingo.Currency.formatMoney(lineItem.final_price, settings.moneyFormat),
            quantity: lineItem.quantity,
            disabled: disabled
          };
          $body.append(template(data2));
          if (data2.variant != null) {
            for (var j in data2.options) {
              $(".js-cart-modal .variant").append("<span>" + data2.options[j].name + " : " + data2.options[j].value + "</span>");
            }
          }
          if (data2.discount.length > 0) {
            for (var j in data2.discount) {
              $(".js-cart-modal .discount").text(data2.discount[j].title);
            }
            $("#form-modal-addtocart .modalcart__line_price .price_discount").html(wpbingo.Currency.formatMoney(lineItem.original_line_price, settings.moneyFormat));
          } else {
            $(".js-cart-modal .discount").empty();
            $("#form-modal-addtocart .modalcart__line_price .price_discount").empty();
          }
          $(".js-cart-modal").fadeIn(400);
          setTimeout(function () {
            $(".js-cart-modal .cart-modal__inner").addClass("show");
          }, 400);
        };
        cartModalupdate = function cartModalupdate(cart) {
          $("#form-modal-addtocart .modalcart__quantity input").change(function () {
            $("#form-modal-addtocart .cart-modal__middle").addClass("load_modal");
            var id = $("#form-modal-addtocart input[data-modal-variant]").val();
            var qty = $("#form-modal-addtocart .modalcart__quantity input").val();
            var modal = true;
            var count = $('#count_quantity [data-variant_id="' + id + '"]').data("count_quantity");
            if (qty >= count) {
              var qty = count;
              $("#form-modal-addtocart .modalcart__quantity .ajaxcart__qty-adjust.wpbingo-qty__adjust--plus").prop("disabled", true);
            } else {
              $("#form-modal-addtocart .modalcart__quantity .ajaxcart__qty-adjust.wpbingo-qty__adjust--plus").prop("disabled", false);
            }
            $("#form-modal-addtocart .modalcart__quantity input").val(qty);
            for (var j in cart.items) {
              if (id == cart.items[j].variant_id) {
                var line = parseInt(j) + 1;
              }
            }
            ShopifyAPI.changeItem(line, qty, adjustCartCallback, modal);
          });
          $("#form-modal-addtocart .modalcart__quantity .ajaxcart__qty-adjust").on("click", function () {
            $("#form-modal-addtocart .cart-modal__middle").addClass("load_modal");
            var id = $("#form-modal-addtocart input[data-modal-variant]").val();
            var modal = true;
            for (var j in cart.items) {
              if (id == cart.items[j].variant_id) {
                var line = parseInt(j) + 1;
                var lineItem = cart.items[j];
              }
            }
            setTimeout(function () {
              var qty = $("#form-modal-addtocart .modalcart__quantity input").val();
              var count = $('#count_quantity [data-variant_id="' + id + '"]').data("count_quantity");
              if (qty >= count) {
                var qty = count;
                $("#form-modal-addtocart .modalcart__quantity .ajaxcart__qty-adjust.wpbingo-qty__adjust--plus").prop("disabled", true);
              } else {
                $("#form-modal-addtocart .modalcart__quantity .ajaxcart__qty-adjust.wpbingo-qty__adjust--plus").prop("disabled", false);
              }
              $("#form-modal-addtocart .modalcart__quantity input").val(qty);
              if (qty == 1) {
                $("#form-modal-addtocart .modalcart__quantity .ajaxcart__qty-adjust.wpbingo-qty__adjust--minus").prop("disabled", true);
              } else {
                $("#form-modal-addtocart .modalcart__quantity .ajaxcart__qty-adjust.wpbingo-qty__adjust--minus").prop("disabled", false);
              }
              ShopifyAPI.changeItem(line, qty, adjustCartCallback, modal);
            }, 500);
          });
        }, updateModalRecommendations = function updateModalRecommendations(lineItem) {
          var baseUrl = routes.product_recommendations_url;
          var productId = lineItem.product_id;
          var recommendationsSectionUrl = baseUrl + "?section_id=product-recommendations&product_id=" + productId + "&limit=6";
          $.get(recommendationsSectionUrl).then(function (section) {
            var recommendationsMarkup = $(section).html();
            $(".cart-modal-recommendations").html(recommendationsMarkup);
            var $element2 = $(".js-product-recommendations", $(".cart-modal-recommendations"));
            wpbingo.elementslickCarousel($element2);
            if ($(".bwp_currency").length > 0) {
              Currency.Currency_customer(true);
            }
          });
        };
        cartUpdateCallback = function cartUpdateCallback(cart, added) {
          updateCountPrice(cart);
          if ($(".js-drawer").length > 0 || $("[data-cart-container]").length > 0) {
            buildCart(cart, fire_work);
            cartModalupdate(cart);
            if (added) {
              $body.trigger("drawer.open");
            }
          }
        };
        buildCart = function buildCart(cart) {
          $cartContainer.empty();
          if (cart.item_count === 0) {
            $cartContainer.append('<p class="cart-empty-message">' + wpbingo.strings.cartEmpty + '</p>\n<p class="cookie-message">' + wpbingo.strings.cartCookies + "</p>");
            cartCallback(cart);
            $(".js-drawer .drawer__title .count").text("0");
            $(".shipping-bar-cart").addClass("hidden");
            return;
          }
          var items = [],
            item = {},
            data2 = {},
            source = $(settings.cartTemplate).html();
          var template = Handlebars.compile(source);
          $.each(cart.items, function (index, cartItem) {
            var prodImg2;
            var unitPrice = null;
            var disabled = "";
            var variant_id = cartItem.variant_id;
            var count = $('#count_quantity [data-variant_id="' + variant_id + '"]').data("count_quantity");
            if (cartItem.quantity == count) {
              disabled = "disabled";
            }
            if (cartItem.image !== null) {
              prodImg2 = cartItem.image.replace(/(\.[^.]*)$/, "_compact$1").replace("http:", "");
            } else {
              prodImg2 = "//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif";
            }
            if (cartItem.properties !== null) {
              $.each(cartItem.properties, function (key, value) {
                if (key.charAt(0) === "_" || !value) {
                  delete cartItem.properties[key];
                }
              });
            }
            if (cartItem.properties !== null) {
              $.each(cartItem.properties, function (key, value) {
                if (key.charAt(0) === "_" || !value) {
                  delete cartItem.properties[key];
                }
              });
            }
            if (cartItem.line_level_discount_allocations.length !== 0) {
              for (var discount in cartItem.line_level_discount_allocations) {
                var amount = cartItem.line_level_discount_allocations[discount].amount;
                cartItem.line_level_discount_allocations[discount].formattedAmount = wpbingo.Currency.formatMoney(amount, settings.moneyFormat);
              }
            }
            if (cart.cart_level_discount_applications.length !== 0) {
              for (var cartDiscount in cart.cart_level_discount_applications) {
                var cartAmount = cart.cart_level_discount_applications[cartDiscount].total_allocated_amount;
                cart.cart_level_discount_applications[cartDiscount].formattedAmount = wpbingo.Currency.formatMoney(cartAmount, settings.moneyFormat);
              }
            }
            if (cartItem.unit_price_measurement) {
              unitPrice = {
                addRefererenceValue: cartItem.unit_price_measurement.reference_value !== 1,
                price: wpbingo.Currency.formatMoney(cartItem.unit_price, settings.moneyFormat),
                reference_value: cartItem.unit_price_measurement.reference_value,
                reference_unit: cartItem.unit_price_measurement.reference_unit
              };
            }
            item = {
              key: cartItem.key,
              line: index + 1,
              // Shopify uses a 1+ index in the API
              url: cartItem.url,
              img: prodImg2,
              name: cartItem.product_title,
              variation: cartItem.variant_title === null ? false : true,
              variant: cartItem.variant,
              options: cartItem.options_with_values,
              variant_id: cartItem.variant_id,
              properties: cartItem.properties,
              itemAdd: cartItem.quantity + 1,
              itemMinus: cartItem.quantity - 1,
              itemQty: cartItem.quantity,
              handle: cartItem.handle,
              price: wpbingo.Currency.formatMoney(cartItem.original_line_price, settings.moneyFormat),
              discountedPrice: wpbingo.Currency.formatMoney(cartItem.final_line_price, settings.moneyFormat),
              discounts: cartItem.line_level_discount_allocations,
              discountsApplied: cartItem.line_level_discount_allocations.length === 0 ? false : true,
              vendor: cartItem.vendor,
              unitPrice: unitPrice,
              disabled: disabled
            };
            items.push(item);
            wpbingo.discount_single();
          });
          data2 = {
            items: items,
            note: cart.note,
            totalPrice: wpbingo.Currency.formatMoney(cart.total_price, settings.moneyFormat),
            cartDiscounts: cart.cart_level_discount_applications,
            cartDiscountsApplied: cart.cart_level_discount_applications.length === 0 ? false : true
          };
          $cartContainer.append(template(data2));
          cartCallback(cart);
          if (data2.note) {
            $(".cart-table .cart-note__input textarea").val(data2.note);
          }
          var discount_code = wpbingo.getCookie("wpbingo_discount");
          if (discount_code) {
            $(".cart-table .discount_code_input").val(discount_code);
            $(".js-drawer .discount_code_input").val(discount_code);
          }
          $(".js-drawer .drawer__title .count").text(cart.item_count);
          $(".shipping-bar-cart").removeClass("hidden");
          if ($(".shipping-bar-cart").length) {
            var price_shipping_bar = $(".shipping-bar-cart").data("price_shipping_bar");
            if (price_shipping_bar > cart.total_price && price_shipping_bar != 0) {
              var minus_spend = price_shipping_bar - cart.total_price;
              var spend = wpbingo.Currency.formatMoney(minus_spend, settings.moneyFormat);
              var percent = cart.total_price / price_shipping_bar * 100;
              $(".shipping-bar-cart .title-spend .spend").html(spend);
              $(".shipping-bar-cart .shipping-progress").css("width", percent + "%");
              $(".shipping-bar-cart .title-shipping").addClass("hide");
              $(".shipping-bar-cart .title-spend").removeClass("hide");
              $(".shipping-bar-cart").removeClass("full");
              $("[data-cart-container]").removeClass("fire-done");
              $("#fire_work").addClass("hide");
            } else {
              $(".shipping-bar-cart .title-shipping").removeClass("hide");
              $(".shipping-bar-cart .title-spend").addClass("hide");
              $(".shipping-bar-cart .shipping-progress").css("width", "100%");
              $(".shipping-bar-cart").addClass("full");
              if (!$("[data-cart-container]").hasClass("fire-done")) {
                $("[data-cart-container]").addClass("fire");
              }
              if ($("[data-cart-container]").hasClass("fire")) {
                $("#fire_work").removeClass("hide");
                confettiLoop();
              }
              setTimeout(function () {
                $("[data-cart-container]").addClass("fire-done");
                $("[data-cart-container]").removeClass("fire");
              }, 1e3);
              setTimeout(function () {
                $("#fire_work").addClass("hide");
              }, 5e3);
            }
          }
          $(".pre_order-cart >span").each(function () {
            var id = $(this).data("handle");
            for (var i in data2.items) {
              if (data2.items[i].variant_id == id) {
                $('.ajaxcart__product[data-line="' + data2.items[i].line + '"] .pre_order').removeClass("hide");
              }
            }
          });
          wpbingo.checkbox_terms_conditions();
          if ($(".bwp_currency").length > 0) {
            Currency.Currency_customer(true);
          }
        };
        cartCallback = function cartCallback(cart) {
          $body.removeClass("ajaxcart--is-loading");
          if (window.Shopify && Shopify.StorefrontExpressButtons) {
            Shopify.StorefrontExpressButtons.initialize();
          }
          $body.trigger("drawer.footer");
        };
        adjustCart = function adjustCart() {
          $body.on("click", ".ajaxcart__qty-adjust", function () {
            if (isUpdating) {
              return;
            }
            var $el = $(this),
              line = $el.data("line"),
              $qtySelector = $el.siblings(".ajaxcart__qty-num"),
              qty = parseInt($qtySelector.val().replace(/\D/g, ""));
            qty = validateQty(qty);
            if ($el.hasClass("ajaxcart__qty--plus")) {
              qty += 1;
            } else {
              qty -= 1;
              if (qty <= 0) qty = 0;
            }
            if (line) {
              updateQuantity(line, qty);
            } else {
              $qtySelector.val(qty);
            }
          });
          $body.on("change", ".ajaxcart__qty-num", function () {
            var id = $(this).data("variant_id");
            var count = $('#count_quantity [data-variant_id="' + id + '"]').data("count_quantity");
            if (isUpdating) {
              return;
            }
            var $el = $(this),
              line = $el.data("line"),
              qty = parseInt($el.val().replace(/\D/g, ""));
            qty = validateQty(qty);
            if (qty >= count) {
              qty = count;
              $el.val(qty);
            }
            if (line) {
              updateQuantity(line, qty);
            }
          });
          $body.on("submit", "form.ajaxcart", function (evt) {
            if (isUpdating) {
              evt.preventDefault();
            }
          });
          $body.on("focus", ".ajaxcart__qty-adjust", function () {
            var $el = $(this);
            setTimeout(function () {
              $el.select();
            }, 50);
          });
          function updateQuantity(line, qty) {
            isUpdating = true;
            var $row = $('.ajaxcart__product[data-line="' + line + '"]').addClass("is-loading");
            if (qty === 0) {
              $row.parent().addClass("is-removed");
            }
            setTimeout(function () {
              ShopifyAPI.changeItem(line, qty, adjustCartCallback);
            }, 250);
          }
        };
        adjustCartCallback = function adjustCartCallback(cart) {
          updateCountPrice(cart);
          setTimeout(function () {
            ShopifyAPI.getCart(buildCart);
            isUpdating = false;
          }, 150);
        };
        validateQty = function validateQty(qty) {
          if (parseFloat(qty) === parseInt(qty) && !isNaN(qty)) {} else {
            qty = 1;
          }
          return qty;
        };
        module = {
          init: init,
          load: loadCart
        };
        return module;
      }(ajaxCart || {}, jQuery);
      wpbingo.drawerCart = function (module2) {
        var $body2, $drawer, drawerCloseSelector, headerCartSelector, drawerIsOpen;
        var init2, drawerOpen, drawerClose, drawerFooter;
        var classes = {
          open: "drawer--open"
        };
        init2 = function init2() {
          $body2 = $("body");
          $drawer = $(".js-drawer");
          drawerCloseSelector = ".js-drawer-close";
          headerCartSelector = ".js-header-cart";
          drawerIsOpen = false;
          $body2.on("drawer.open", function (evt) {
            drawerOpen(evt);
          });
          $body2.on("drawer.close", function (evt) {
            drawerClose(evt);
          });
          $body2.on("drawer.footer", function () {
            drawerFooter();
          });
          $body2.on("click", headerCartSelector, function (evt) {
            if (!$("body").hasClass("template-cart")) {
              evt.preventDefault();
              $body2.trigger("drawer.open", evt);
            }
          });
          $body2.on("click", drawerCloseSelector, function (evt) {
            evt.preventDefault();
            $body2.trigger("drawer.close", evt);
          });
        };
        drawerOpen = function drawerOpen(evt) {
          if (drawerIsOpen) {
            if (evt) {
              evt.preventDefault();
            }
            return;
          }
          if (evt) {
            evt.preventDefault();
          }
          $body2.addClass(classes.open);
          drawerIsOpen = true;
        };
        drawerClose = function drawerClose(evt) {
          if (!drawerIsOpen) {
            return;
          }
          if (evt.keyCode !== 27) {
            evt.preventDefault();
          }
          $body2.removeClass(classes.open);
          drawerIsOpen = false;
        };
        drawerFooter = function drawerFooter() {
          if (!$drawer.hasClass("drawer--has-fixed-footer")) {
            return;
          }
          var $cartFooter = $(".ajaxcart__footer").removeAttr("style");
          var $cartInner = $(".ajaxcart__inner").removeAttr("style");
          var cartFooterHeight = $cartFooter.outerHeight();
          $cartInner.css("bottom", cartFooterHeight);
          $cartFooter.css("height", cartFooterHeight);
          $(".ajaxcart__info .button_note").on("click", function () {
            if ($(".ajaxcart__info .ajaxcart__note").hasClass("active")) {
              $(".ajaxcart__info .ajaxcart__note").removeClass("active");
            } else {
              $(".ajaxcart__info .ajaxcart__note").addClass("active");
            }
          });
          $(".ajaxcart__info .button_discount").on("click", function () {
            if ($(".ajaxcart__info .discount_code").hasClass("active")) {
              $(".ajaxcart__info .discount_code").removeClass("active");
            } else {
              $(".ajaxcart__info .discount_code").addClass("active");
            }
          });
          $(".ajaxcart__info .button_shiping").on("click", function () {
            if ($(".drawer__inner #shipping-calculator").hasClass("active")) {
              $(".drawer__inner #shipping-calculator").removeClass("active");
            } else {
              $(".drawer__inner #shipping-calculator").addClass("active");
            }
          });
          $(".ajaxcart__info .close-ajaxcart__info").on("click", function () {
            if ($(".ajaxcart__info .ajaxcart__info_content >div").hasClass("active")) {
              $(".ajaxcart__info .ajaxcart__info_content >div").removeClass("active");
            }
          });
          $(".ajaxcart__info .save").on("click", function () {
            if ($(".ajaxcart__info .ajaxcart__info_content >div").hasClass("active")) {
              $(".ajaxcart__info .ajaxcart__info_content >div").removeClass("active");
            }
          });
          $(".drawer__inner #shipping-calculator .close-ajaxcart__info").on("click", function () {
            if ($(".drawer__inner #shipping-calculator").hasClass("active")) {
              $(".drawer__inner #shipping-calculator").removeClass("active");
            }
          });
          Shopify.Cart.ShippingCalculator.show({
            submitButton: window.strings.shippingCalcSubmitButton,
            submitButtonDisabled: window.strings.shippingCalcSubmitButtonDisabled,
            customerIsLoggedIn: window.strings.shippingCalcCustomerIsLoggedIn,
            moneyFormat: window.strings.shippingCalcMoneyFormat,
            CalculateMessSuccess: window.strings.CalculateMessSuccess,
            CalculateMessPrice: window.strings.CalculateMessPrice,
            CalculateMessError: window.strings.CalculateMessError
          });
        };
        module2 = {
          init: init2
        };
        return module2;
      }();
      wpbingo.variables = {
        productPageLoad: false,
        productPageSticky: true,
        mediaTablet: "screen and (max-width: 1024px)",
        mediaMobile: "screen and (max-width: 767px)",
        isTablet: false,
        isMobile: false
      };
      wpbingo.initializeEvents = function () {
        var $body2 = $("body"),
          passwordToggle = ".js-password-toggle",
          tooltip = '[data-toggle="tooltip"]',
          scrollToTop = ".js-scroll-to-top",
          collectionSidebarToggle = ".js-sidebar-toggle";
        var classes = {
          passwordShow: "password-toggle--show"
        };
        $(tooltip).tooltip();
        $body2.on("click", passwordToggle, function (e) {
          e.preventDefault();
          var $this = $(this);
          var $passwordField = $this.siblings(".form-control");
          var isShow = $this.hasClass(classes.passwordShow) ? true : false;
          if (isShow) {
            $this.removeClass(classes.passwordShow);
            $passwordField.attr("type", "password");
          } else {
            $this.addClass(classes.passwordShow);
            $passwordField.attr("type", "text");
          }
        });
        $body2.on("click", scrollToTop, function (e) {
          e.preventDefault();
          $("body, html").stop().animate({
            scrollTop: 0
          }, "500");
        });
        $body2.on("click", collectionSidebarToggle, function (evt) {
          evt.preventDefault();
          $body2.toggleClass("collection-sidebar--open");
        });
        $(window).scroll(function () {
          if ($(window).scrollTop() >= 200) {
            $(scrollToTop).fadeIn();
          } else {
            $(scrollToTop).fadeOut();
          }
        });
      };
      wpbingo.setBreakpoints = function () {
        enquire.register(wpbingo.variables.mediaTablet, {
          match: function match() {
            wpbingo.variables.isTablet = true;
          },
          unmatch: function unmatch() {
            wpbingo.variables.isTablet = false;
          }
        });
        enquire.register(wpbingo.variables.mediaMobile, {
          match: function match() {
            wpbingo.variables.isMobile = true;
          },
          unmatch: function unmatch() {
            wpbingo.variables.isMobile = false;
          }
        });
      };
      wpbingo.updateSlickSwipe = function (element, allowSwipe) {
        if (!element.hasClass("slick-initialized")) {
          return;
        }
        var slickOptions = {
          accessibility: allowSwipe,
          draggable: allowSwipe,
          swipe: allowSwipe,
          touchMove: allowSwipe
        };
        element.slick("slickSetOption", slickOptions, false);
      };
      wpbingo.showLoading = function () {
        $("body").append(wpbingo.loading != void 0 && wpbingo.loading != "" ? wpbingo.loading : "");
      };
      wpbingo.hideLoading = function () {
        $(".wpbingo-loading").remove();
      };
      wpbingo.cartInit = function () {
        var $body2 = $("body");
        if (!wpbingo.cookiesEnabled()) {
          $body2.addClass("cart--no-cookies");
        }
        if (wpbingo.settings.cartType == "modal" || wpbingo.settings.cartType == "drawer") {
          ajaxCart.init();
          ajaxCart.load();
          if (wpbingo.settings.cartType == "drawer") {
            wpbingo.drawerCart.init();
          }
        }
      };
      wpbingo.cookiesEnabled = function () {
        var cookieEnabled = navigator.cookieEnabled;
        if (!cookieEnabled) {
          document.cookie = "webcookie";
          cookieEnabled = document.cookie.indexOf("webcookie") !== -1;
        }
        return cookieEnabled;
      };
      wpbingo.setCookie = function (cname, cvalue, exdays) {
        var d = /* @__PURE__ */new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      };
      wpbingo.getCookie = function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(";");
        for (var i = 0; i < cookieArray.length; i++) {
          var cookieItem = cookieArray[i];
          while (cookieItem.charAt(0) === " ") {
            cookieItem = cookieItem.substring(1);
          }
          if (cookieItem.indexOf(name) === 0) {
            return cookieItem.substring(name.length, cookieItem.length);
          }
        }
        return "";
      };
      wpbingo.cookieConsent = function () {
        var cConsent = wpbingo.getCookie("cookie_consent"),
          cConsentSelector = $(".cookie-consent"),
          cConsentDismiss = ".cookie-consent-dismiss";
        cConsentAgree = ".cookie-consent-agree";
        if (cConsent == "true" || cConsent == "false") {
          cConsentSelector.remove();
        } else {
          setTimeout(function () {
            cConsentSelector.addClass("active");
          }, 1500);
          if (cConsent == "") wpbingo.setCookie("cookie_consent", "", 10);
        }
        $("body").on("click", cConsentDismiss, function (e) {
          e.preventDefault();
          cConsentSelector.remove();
          wpbingo.setCookie("cookie_consent", false, 10);
        });
        $("body").on("click", cConsentAgree, function (e) {
          e.preventDefault();
          cConsentSelector.remove();
          wpbingo.setCookie("cookie_consent", true, 10);
        });
      };
      function isIOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
      }
      wpbingo.slideshow = function () {
        var slideshow = ".js-wpbingo-slideshow";
        var slideshowEl = $(slideshow);
        var fade = slideshowEl.data("fade"),
          autoplay = slideshowEl.data("autoplay"),
          autoplayInterval = slideshowEl.data("autoplayinterval"),
          autoplayNavigation = slideshowEl.data("navigation"),
          autoplayPagination = slideshowEl.data("pagination");
        var config = {
          fade: true,
          rows: 0,
          arrows: autoplayNavigation,
          autoplay: autoplay,
          rtl: wpbingo.rtl_slick(),
          autoplaySpeed: autoplayInterval
        };
        fade === void 0 || fade == null ? true : config.fade = fade;
        autoplayInterval === void 0 || autoplayInterval == null ? true : config.autoplaySpeed = autoplayInterval;
        autoplayPagination === void 0 || autoplayPagination == null || autoplayPagination != true ? config.dots = false : config.dots = true;
        var playVideo = function playVideo(videojEl) {
          if (!videojEl || !videojEl.length) return;
          var videoHtml = videojEl.get(0);
          var previewImg = videojEl.parent().find(".preview-image");
          videojEl.find("source").each(function () {
            var srcEl = $(this);
            srcEl.attr("src", srcEl.attr("data-src"));
          });
          if (isIOS()) {
            videojEl.removeClass("d-none").css({
              height: "0px"
            });
            if (!previewImg.hasClass("on-ios")) {
              previewImg.addClass("on-ios");
              previewImg.on("click.playVideo", function () {
                videoHtml.play().then(function () {
                  videojEl.css({
                    height: ""
                  });
                  previewImg.addClass("d-none");
                });
              });
            }
          }
          var ensureLoaded = function ensureLoaded() {
            if (videojEl.hasClass("loaded")) return Promise.resolve();
            return new Promise(function (resolve, reject) {
              videojEl.one("canplay", function () {
                videojEl.addClass("loaded");
                resolve();
              });
              videojEl.one("error", function () {
                return reject("Video source failed to load");
              });
              videoHtml.load();
            });
          };
          ensureLoaded().then(function () {
            return videoHtml.play();
          }).then(function () {
            videojEl.removeClass("d-none");
            previewImg.addClass("d-none");
          })["catch"](function (err) {
            console.warn("Video failed to play or load:", err.message);
          })["finally"](function () {});
        };
        slideshowEl.on("init", function (e, slick) {
          var videoEl = $(slick.$slides[slick.currentSlide]).find("video");
          playVideo(videoEl);
        }).on("afterChange", function (e, slick, currentSlide) {
          var $slide = $(slick.$slides[currentSlide]);
          if ($slide.data("played")) return;
          var videoEl = $slide.find("video");
          if (videoEl && videoEl.length) {
            $slide.data("played", true);
            playVideo(videoEl);
          }
        }).slick(config);
      };
      wpbingo.rtl_slick = function () {
        if ($("body").hasClass("rtl")) {
          return true;
        } else {
          return false;
        }
      };
      wpbingo.slickCarousel = function () {
        var bwpCarousel = ".js-carousel";
        $(bwpCarousel).each(function () {
          var $element2 = $(this),
            nav = $element2.data("nav"),
            dots = $element2.data("dots"),
            draggable = $element2.data("draggable") ? false : true,
            fade = $element2.data("fade") ? true : false,
            center = $element2.data("center"),
            infinite = $element2.data("infinite"),
            autoplay = $element2.data("autoplay"),
            autoplaySpeed = $element2.data("autoplayspeed"),
            slidesToScroll = $element2.data("slidestoscroll") ? $element2.data("columns") : 1,
            columns = $element2.data("columns"),
            column1440 = $element2.data("column1440"),
            column1 = $element2.data("column1"),
            column2 = $element2.data("column2"),
            column3 = $element2.data("column3"),
            column4 = $element2.data("column4"),
            asNavFor = $element2.data("asnavfor") ? $element2.data("asnavfor") : false,
            rows = $element2.data("rows");
          var config = {
            rtl: wpbingo.rtl_slick(),
            draggable: draggable,
            fade: fade,
            asNavFor: asNavFor,
            arrows: nav,
            slidesToShow: columns,
            slidesToScroll: slidesToScroll,
            responsive: [{
              breakpoint: 1441,
              settings: {
                slidesToShow: column1440,
                slidesToScroll: column1440
              }
            }, {
              breakpoint: 1200,
              settings: {
                slidesToShow: column1,
                slidesToScroll: column1
              }
            }, {
              breakpoint: 1024,
              settings: {
                slidesToShow: column2,
                slidesToScroll: column2
              }
            }, {
              breakpoint: 768,
              settings: {
                slidesToShow: column3,
                slidesToScroll: column3,
                vertical: false,
                verticalSwiping: false
              }
            }, {
              breakpoint: 480,
              settings: {
                slidesToShow: column4,
                slidesToScroll: column4,
                vertical: false,
                verticalSwiping: false
              }
            }]
          };
          center === void 0 || center == null || center != true ? config.centerMode = false : config.centerMode = true;
          dots === void 0 || dots == null || dots != true ? config.dots = false : config.dots = true;
          infinite === void 0 || infinite == null || infinite != true ? config.infinite = false : config.infinite = true;
          if (autoplay) {
            config.autoplay = autoplay;
            config.autoplaySpeed = autoplaySpeed;
          }
          if (rows !== void 0 && rows != null && rows != 1) {
            config.rows = rows;
            config.slidesPerRow = columnone;
            config.slidesToShow = 1, config.responsive = [{
              breakpoint: 1025,
              settings: {
                slidesPerRow: columntwo,
                slidesToShow: 1
              }
            }, {
              breakpoint: 768,
              settings: {
                slidesPerRow: columnthree,
                slidesToShow: 1
              }
            }];
          } else {
            config.rows = 0;
          }
          $element2.slick(config);
          if ($(".slick-arrow", $element2).length > 0) {
            var $prev = $(".slick-prev", $element2).clone();
            $(".slick-prev", $element2).remove();
            if ($element2.parent().find(".slick-prev").length == 0) {
              $prev.prependTo($element2.parent());
            }
            $prev.on("click", function () {
              $element2.slick("slickPrev");
            });
            var $next = $(".slick-next", $element2).clone();
            $(".slick-next", $element2).remove();
            if ($element2.parent().find(".slick-next").length == 0) {
              $next.appendTo($element2.parent());
            }
            $next.on("click", function () {
              $element2.slick("slickNext");
            });
          }
        });
        $(".product-tabs__nav-link").on("shown.bs.tab", function () {
          var productTabs = $(this).closest(".product-tabs");
          if (productTabs.find(bwpCarousel).length > 0) {
            productTabs.find(bwpCarousel).slick("setPosition");
          }
        });
      };
      wpbingo.elementslickCarousel = function ($element2) {
        var nav = $element2.data("nav"),
          infinite = $element2.data("infinite"),
          columns = $element2.data("columns") ? $element2.data("columns") : 1,
          column1440 = $element2.data("column1440"),
          column1 = $element2.data("column1"),
          column2 = $element2.data("column2"),
          column3 = $element2.data("column3"),
          column4 = $element2.data("column4"),
          rows = $element2.data("rows");
        var config = {
          arrows: nav,
          slidesToShow: columns,
          slidesToScroll: columns,
          rtl: wpbingo.rtl_slick(),
          responsive: [{
            breakpoint: 1441,
            settings: {
              slidesToShow: column1440,
              slidesToScroll: column1440
            }
          }, {
            breakpoint: 1200,
            settings: {
              slidesToShow: column1,
              slidesToScroll: column1
            }
          }, {
            breakpoint: 1024,
            settings: {
              slidesToShow: column2,
              slidesToScroll: column2
            }
          }, {
            breakpoint: 768,
            settings: {
              slidesToShow: column3,
              slidesToScroll: column3,
              vertical: false,
              verticalSwiping: false
            }
          }, {
            breakpoint: 480,
            settings: {
              slidesToShow: column4,
              slidesToScroll: column4,
              vertical: false,
              verticalSwiping: false
            }
          }]
        };
        if (rows !== void 0 && rows != null && rows != 1) {
          config.rows = rows;
          config.slidesPerRow = columnone;
          config.slidesToShow = 1, config.responsive = [{
            breakpoint: 1025,
            settings: {
              slidesPerRow: columntwo,
              slidesToShow: 1
            }
          }, {
            breakpoint: 768,
            settings: {
              slidesPerRow: columnthree,
              slidesToShow: 1
            }
          }];
        } else {
          config.rows = 0;
        }
        $element2.slick(config);
        if ($(".slick-arrow", $element2).length > 0) {
          var $prev = $(".slick-prev", $element2).clone();
          $(".slick-prev", $element2).remove();
          if ($element2.parent().find(".slick-prev").length == 0) {
            $prev.prependTo($element2.parent());
          }
          $prev.on("click", function () {
            $element2.slick("slickPrev");
          });
          var $next = $(".slick-next", $element2).clone();
          $(".slick-next", $element2).remove();
          if ($element2.parent().find(".slick-next").length == 0) {
            $next.appendTo($element2.parent());
          }
          $next.on("click", function () {
            $element2.slick("slickNext");
          });
        }
      };
      wpbingo.countdown = function ($class) {
        var countdown = "[data-countdown]";
        $(countdown).each(function () {
          var $this = $(this);
          var finalDate = $(this).data("countdown"),
            date_final = new Date(finalDate),
            seconds_final = date_final.getTime(),
            date = Date.now(),
            parent = $this.closest(".product-card"),
            text_day = $(this).data("day") ? $(this).data("day") : wpbingo.strings.countdownDays,
            text_hour = $(this).data("hour") ? $(this).data("hour") : wpbingo.strings.countdownHours,
            time_min = $(this).data("min") ? $(this).data("min") : wpbingo.strings.countdownMinutes,
            text_sec = $(this).data("sec") ? $(this).data("sec") : wpbingo.strings.countdownSeconds;
          if (seconds_final > date) {
            $this.countdown(finalDate, function (event) {
              var strTime = '<div class="countdown__item"><span>%D</span><span>' + text_day + '</span></div><div class="countdown__item"><span>%H</span><span>' + text_hour + '</span></div><div class="countdown__item"><span>%M</span><span>' + time_min + '</span></div><div class="countdown__item"><span>%S</span><span>' + text_sec + "</span></div>";
              $this.html(event.strftime(strTime));
            }).on("finish.countdown", function () {
              $this.html(wpbingo.strings.countdownFinish);
            });
          } else {
            $(".countdown-product", parent).remove();
            $(".product-quickview .countdown-quickview").remove();
          }
        });
      };
      wpbingo.countdown_single = function () {
        var $this = $(".countdown-single .countdown"),
          finalDate = $this.data("countdown_single"),
          date_final = new Date(finalDate),
          seconds_final = date_final.getTime(),
          date = Date.now(),
          text_day = $this.data("day") ? $this.data("day") : wpbingo.strings.countdownDays,
          text_hour = $this.data("hour") ? $this.data("hour") : wpbingo.strings.countdownHours,
          time_min = $this.data("min") ? $this.data("min") : wpbingo.strings.countdownMinutes,
          text_sec = $this.data("sec") ? $this.data("sec") : wpbingo.strings.countdownSeconds;
        if (seconds_final > date) {
          $this.countdown(finalDate, function (event) {
            var strTime = '<div class="countdown__item"><span>%D</span><span>' + text_day + '</span></div><div class="countdown__item"><span>%H</span><span>' + text_hour + '</span></div><div class="countdown__item"><span>%M</span><span>' + time_min + '</span></div><div class="countdown__item"><span>%S</span><span>' + text_sec + "</span></div>";
            $this.html(event.strftime(strTime));
          }).on("finish.countdown", function () {
            $this.html(wpbingo.strings.countdownFinish);
          });
        } else {
          $(".product-single .countdown-single").remove();
        }
      };
      wpbingo.active_form_login = function () {
        $(".header-account [data-login-account]").on("click", function (e) {
          e.preventDefault();
          var $element2 = $("[data-login_popup]");
          if ($element2.hasClass("active")) {
            $element2.removeClass("active");
            $("body").removeClass("not-scroll");
          } else {
            $element2.addClass("active");
            $("body").addClass("not-scroll");
          }
        });
        $("[data-close_login_popup]").on("click", function (e) {
          e.preventDefault();
          var $element2 = $("[data-login_popup]");
          if ($element2.hasClass("active")) {
            $element2.removeClass("active");
            $("body").removeClass("not-scroll");
          }
        });
      };
      wpbingo.click_atribute_image = function () {
        var moneyFormat2 = wpbingo.strings.moneyFormat;
        $(".wpb-variants-swatch").each(function () {
          var $element2 = $(this);
          $(".swatch-items", $element2).on("click", function () {
            var $swatchEl = $(this);
            if (!$swatchEl.hasClass("active")) {
              var $parent = $swatchEl.closest(".swatch-content");
              $(".swatch-items", $parent).removeClass("active");
              $swatchEl.addClass("active");
              var variants_value = wpbingo.get_variant_value($element2);
              var productHandle = $element2.data("handle");
              $.getJSON("/products/" + productHandle + ".js", function (product) {
                if (product.variants) {
                  wpbingo.updateVariantsButton($element2, product);
                  $.each(product.variants, function (index, variant) {
                    var avaiable = true;
                    if (avaiable) {
                      if (variant.title == variants_value) {
                        var $current = $swatchEl.closest(".product-card");
                        $(".product-group-price[data-handle=" + productHandle + "] .variant-price", $current).html(wpbingo.Currency.formatMoney(variant.price, moneyFormat2));
                        $(".product-card__form[data-handle=" + productHandle + "] input[name='id']", $current).val(variant.id);
                        if ($(".bwp_currency").length > 0) {
                          Currency.Currency_customer(true);
                        }
                        if (variant.featured_media) {
                          prodImg = variant.featured_media.preview_image.src.replace(/(\.[^.]*)$/, "_600x$1").replace("http:", "");
                          if ($(".product-card__image-wrapper", $current).hasClass("slider")) {
                            var variant_slick = $('.product-card__image-wrapper .product-card__image-link[data-variant_id="' + variant.featured_media.id + '"]', $current).data("slick-index");
                            $(".product-card__image", $current).slick("slickGoTo", variant_slick);
                          } else {
                            $(".product-card__image img.variant", $current).attr("src", prodImg);
                            $(".product-card__image img.variant", $current).attr("srcset", prodImg);
                          }
                          if ($(".product-card__image-wrapper", $current).hasClass("zoom")) {
                            $(".product-card__image img", $current).last().attr("src", prodImg);
                          }
                          $(".product-card__image_compare[data-handle=" + productHandle + "] img", ".content-compare.active").attr("src", prodImg);
                          $(".product-card__image_compare[data-handle=" + productHandle + "] img", ".content-compare.active").attr("srcset", prodImg);
                        }
                      }
                    }
                  });
                }
              });
            }
          });
        });
      };
      wpbingo.get_variant_value = function ($element2) {
        var variant1, variant2, variant3;
        $(".swatch-content-1", $element2).each(function (index) {
          var value = $(".swatch-items.active label", $(this)).data("variant");
          if (value === null) {
            value = "null";
          }
          variant1 = value;
        });
        $(".swatch-content-2", $element2).each(function (index) {
          var value = $(".swatch-items.active label", $(this)).data("variant");
          if (value === null) {
            value = "null";
          }
          variant2 = value;
        });
        $(".swatch-content-3", $element2).each(function (index) {
          var value = $(".swatch-items.active label", $(this)).data("variant");
          if (value === null) {
            value = "null";
          }
          variant3 = value;
        });
        if (variant1 && variant2 && variant3) {
          var variants_value = variant1 + " / " + variant2 + " / " + variant3;
        } else if (variant1 && variant2) {
          var variants_value = variant1 + " / " + variant2;
        } else if (variant1) {
          var variants_value = variant1;
        }
        return variants_value;
      };
      wpbingo.updateVariantsButton = function ($element2, $product) {
        var selectedValues = wpbingo.getCurrentOptions($element2);
        var variants = $product.variants;
        for (var i = 2; i <= 3; i++) {
          if ($(".swatch-content-" + i, $element2).length) {
            var $container = $(".swatch-content-" + i, $element2);
            $("label", $container).each(function () {
              var $self = $(this);
              var optionValue = $self.data("variant");
              var foundIndex;
              if (i === 2) {
                foundIndex = _.findIndex(variants, function (variant) {
                  variant.option1 = variant.option1.toString();
                  selectedValues[0].value = selectedValues[0].value.toString();
                  variant.option2 = variant.option2.toString();
                  optionValue = optionValue.toString();
                  return variant.option1 === selectedValues[0].value && variant.option2 === optionValue && variant.available === true;
                });
              } else if (i === 3) {
                foundIndex = _.findIndex(variants, function (variant) {
                  variant.option1 = variant.option1.toString();
                  variant.option2 = variant.option2.toString();
                  variant.option3 = variant.option3.toString();
                  selectedValues[0].value = selectedValues[0].value.toString();
                  selectedValues[1].value = selectedValues[1].value.toString();
                  optionValue = optionValue.toString();
                  return variant.option1 === selectedValues[0].value && variant.option2 === selectedValues[1].value && variant.option3 === optionValue && variant.available === true;
                });
              }
              if (foundIndex !== -1) {
                $self.closest(".swatch-items").removeClass("disabled");
              } else {
                $self.closest(".swatch-items").addClass("disabled");
              }
            });
          }
        }
      };
      wpbingo.getCurrentOptions = function ($element2) {
        var currentOptions = [];
        for (var i = 1; i <= 3; i++) {
          if ($(".swatch-content-" + i, $element2).length) {
            var currentOption = {};
            currentOption.index = $(".swatch-content-" + i + " .swatch-items.active label", $element2).data("index");
            var $variant = $(".swatch-content-" + i + " .swatch-items.active label", $element2).data("variant");
            if ($variant === null) {
              $variant = "null";
            }
            currentOption.value = $variant;
            currentOptions[i] = currentOption;
          }
        }
        return _.compact(currentOptions);
      };
      wpbingo.sticky_product = function () {
        var $parent = $(".template-product");
        if ($(".sticky-cart-single", $parent).length > 0) {
          var bwp_width = $(window).width();
          $(window).scroll(function () {
            var scroll_top = $(window).scrollTop();
            var offset_top = $(".product-single__buttons", $parent).offset().top;
            var offset_top2 = $(".bwp-footer").offset().top;
            var distance = offset_top - scroll_top;
            var distance2 = offset_top2 - scroll_top - $(window).height();
            if (distance <= 0) {
              $(".sticky-cart-single", $parent).addClass("sticky");
            } else {
              $(".sticky-cart-single", $parent).removeClass("sticky");
            }
            if ($(".sticky-cart-single", $parent).hasClass("sticky")) {
              if (distance2 <= 0) {
                $(".sticky-cart-single", $parent).removeClass("sticky");
              } else {
                $(".sticky-cart-single", $parent).addClass("sticky");
              }
            }
          });
        }
      };
      wpbingo.sticky_header = function () {
        if ($(".bwp-header").data("sticky_header")) {
          var current_scroll = 0;
          var height = $(".bwp-header").height();
          var height_mb = $(".bwp-header .header-mobile .header-top-mobile").height();
          if ($(".bwp-header-topbar").length > 0) {
            var height_topbar = $(".bwp-header-topbar").height();
          } else {
            var height_topbar = 0;
          }
          if ($(".bwp-header-campar").length > 0) {
            var height_campar = $(".bwp-header-campar").height();
          } else {
            var height_campar = 0;
          }
          $(window).scroll(function () {
            var next_scroll = $(this).scrollTop();
            if ($(window).width() > 1199) {
              if (next_scroll > height + height_topbar + height_campar) {
                $(".bwp-header").addClass("sticky");
                if ($("body").hasClass("template-index")) {
                  if (!$(".bwp-header").hasClass("header-absolute")) {
                    $(".bwp-header").css("padding-top", height + "px");
                  }
                } else {
                  $(".bwp-header").css("padding-top", height + "px");
                }
              } else {
                $(".bwp-header").removeClass("sticky");
                $(".bwp-header").removeAttr("style");
              }
            } else {
              if (next_scroll > height_mb + height_topbar + height_campar) {
                $(".bwp-header").addClass("sticky");
                $(".bwp-header").css("padding-top", height_mb + "px");
              } else {
                $(".bwp-header").removeClass("sticky");
                $(".bwp-header").removeAttr("style");
              }
            }
            current_scroll = next_scroll;
          });
        }
      };
      wpbingo.click_button = function () {
        $(".search-toggle").on("click", function () {
          if ($(".content-search-toggle").hasClass("active")) {
            $(".bwp-header-topbar ").removeClass("active-index");
            $("body").removeClass("active_search");
            $(".content-search-toggle").removeClass("show");
            setTimeout(function () {
              $(".content-search-toggle").removeClass("active");
            }, 300);
          } else {
            $(".content-search-toggle").addClass("active");
            $(".bwp-header-topbar ").addClass("active-index");
            $("body").addClass("active_search");
            setTimeout(function () {
              $(".content-search-toggle").addClass("show");
            }, 100);
          }
        });
        $("[data-close-search-toggle]").on("click", function () {
          if ($(".content-search-toggle").hasClass("active")) {
            $(".content-search-toggle").removeClass("show");
            $(".bwp-header-topbar ").removeClass("active-index");
            $("body").removeClass("active_search");
            setTimeout(function () {
              $(".content-search-toggle").removeClass("active");
            }, 300);
          } else {
            $(".content-search-toggle").addClass("active");
            $(".bwp-header-topbar ").addClass("active-index");
            $("body").addClass("active_search");
            setTimeout(function () {
              $(".content-search-toggle").addClass("show");
            }, 100);
          }
        });
        $(".title-size-guide").on("click", function () {
          if ($(".size-guide").hasClass("active")) {
            $(".size-guide").removeClass("active");
          } else {
            $(".size-guide").addClass("active");
          }
        });
        $(".header-left").on("click", function () {
          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".header-category", $(this)).hide(300);
          } else {
            $(this).addClass("active");
            $(".header-category", $(this)).show(500);
          }
        });
      };
      wpbingo.lookbook = function () {
        $(window).on("click.Bst", function (event) {
          var $box = $(".wpbingo-section--lookbook:not(.lookbook-simple) .content-product-card .product-card");
          var $box2 = $(".wpbingo-section--lookbook:not(.lookbook-simple) .lookbook-card__point");
          if ($box.has(event.target).length == 0 && !$box.is(event.target) && $box2.has(event.target).length == 0 && !$box2.is(event.target)) {
            if ($(".wpbingo-section--lookbook:not(.lookbook-simple) .content-product-card").hasClass("active")) {
              $(".wpbingo-section--lookbook:not(.lookbook-simple) .content-product-card").removeClass("active").removeAttr("style");
              $(".wpbingo-section--lookbook:not(.lookbook-simple) .lookbook-card__btn").removeClass("active");
            }
          }
        });
        $(".wpbingo-section--lookbook:not(.lookbook-simple) .close-lookbook").on("click", function () {
          if ($(".wpbingo-section--lookbook:not(.lookbook-simple) .content-product-card").hasClass("active")) {
            $(".wpbingo-section--lookbook:not(.lookbook-simple) .content-product-card").removeClass("active").removeAttr("style");
            $(".wpbingo-section--lookbook:not(.lookbook-simple) .lookbook-card__btn").removeClass("active");
          }
        });
        $(".wpbingo-section--lookbook:not(.lookbook-simple) .lookbook-card__btn").on("click", function () {
          var $parent = $(this).closest(".wpbingo-section--lookbook:not(.lookbook-simple)");
          var $id = $(this).data("target");
          var x = $(this).offset();
          $(".content-product-card", $parent).removeClass("active").removeAttr("style");
          $(".lookbook-card__btn", $parent).removeClass("active");
          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $("#" + $id, $parent).removeClass("active").removeAttr("style");
          } else {
            $(this).addClass("active");
            $("#" + $id, $parent).addClass("active").css({
              "top": x.top,
              "left": x.left
            });
          }
        });
        $(".wpbingo-section--lookbook.lookbook-split .wpbingo-lookbook__item").mouseover(function () {
          if (!$(this).hasClass("active")) {
            $(".wpbingo-section--lookbook.lookbook-split .wpbingo-lookbook__item").removeClass("active");
            $(this).addClass("active");
            if ($(".wpbingo-section--lookbook.lookbook-split .content-product-card").hasClass("active")) {
              $(".wpbingo-section--lookbook.lookbook-split .content-product-card").removeClass("active").removeAttr("style");
              $(".wpbingo-section--lookbook.lookbook-split .lookbook-card__btn").removeClass("active");
            }
          }
        });
        $(".wpbingo-section--lookbook.lookbook-simple .lookbook-card__btn").on("click", function () {
          var $parent = $(this).closest(".wpbingo-section--lookbook.lookbook-simple");
          var $element2 = $(this).closest(".lookbook__item");
          var $id = $(this).data("target");
          if (!$(this).hasClass("active")) {
            $(".content-product-card", $element2).removeClass("active");
            $(".lookbook-card__btn", $element2).removeClass("active");
            $(this).addClass("active");
            $("#" + $id, $parent).addClass("active");
            var slick_current = $("#" + $id, $parent).data("slick-index");
            $(".lookbook-product", $element2).slick("slickGoTo", slick_current);
          }
        });
      };
      wpbingo.newsletter = function () {
        var alertNewsletter;
        $(".js-wpbingo-newsletter").each(function () {
          var $form = $(this);
          $form.on("submit", function (event) {
            event.preventDefault();
            $(".js-alert-newsletter").remove();
            $.ajax({
              type: $form.attr("method"),
              url: $form.attr("action"),
              data: $form.serialize(),
              cache: false,
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              success: function success(data2) {
                if (data2.result === "success") {
                  $form.prepend(alertNewsletter(wpbingo.strings.newsletterSuccess, "success"));
                  $(".js-input-newsletter").val("");
                } else {
                  $form.prepend(alertNewsletter(data2.msg.replace("0 - ", ""), "danger"));
                }
              },
              error: function error(err) {
                $form.prepend(alertNewsletter(err, "danger"));
              }
            });
          });
        });
        alertNewsletter = function alertNewsletter(message, type) {
          var alert2 = '<div class="js-alert-newsletter alert alert--mailchimp alert-' + type + '">' + message + "</div>";
          return alert2;
        };
        var newsletterPopup = ".js-newsletter-popup",
          newsletterPopupClose = ".js-newsletter-popup-close",
          newsletterPopupSubmit = ".js-newsletter-popup-submit",
          cNewsletter = "",
          classNameNewsletterActive = "newsletter-popup--active";
        if ($(newsletterPopup).find(".js-newsletter-popup-success").length > 0) {
          wpbingo.setCookie("wpbingo_newsletter_popup", 1, 30);
        }
        cNewsletter = wpbingo.getCookie("wpbingo_newsletter_popup");
        if (cNewsletter == 1) $(newsletterPopup).remove();
        if (cNewsletter != 1 && !($(".shopify-challenge__container").length > 0)) {
          $(newsletterPopup).addClass("show");
        }
        $(newsletterPopupClose).on("click", function () {
          if ($(newsletterPopup).find(".alert--mailchimp").length > 0) {
            wpbingo.setCookie("wpbingo_newsletter_popup", 1, 30);
          } else {
            wpbingo.setCookie("wpbingo_newsletter_popup", 1, 1);
          }
          $(newsletterPopup).removeClass("show");
        });
        $(newsletterPopupSubmit).on("click", function () {
          wpbingo.setCookie("wpbingo_newsletter_popup", 1, 30);
        });
      };
      wpbingo.verify_popup = function () {
        if ($(".js-verify-popup").length) {
          var verify_popup = "";
          if (!verify_popup) {
            $(".js-verify-popup").addClass("active");
          }
          $(".js-verify-popup .button-not-allow").on("click", function () {
            wpbingo.setCookie("wpbingo_verify_popup", "exit", 1);
            $(".js-verify-popup").addClass("disabled");
            $(".js-verify-popup .verify-info").addClass("hidden");
            $(".js-verify-popup .alert-verify").removeClass("hidden");
            $("body").addClass("not-scroll");
          });
          $(".js-verify-popup .button-allow").on("click", function () {
            wpbingo.setCookie("wpbingo_verify_popup", "allow", 1);
            $(".js-verify-popup").removeClass("active");
          });
          verify_popup = wpbingo.getCookie("wpbingo_verify_popup");
          if (verify_popup == "allow") {
            $(".js-verify-popup").removeClass("active");
          }
          if (verify_popup == "exit") {
            $(".js-verify-popup").addClass("disabled");
            $(".js-verify-popup .verify-info").addClass("hidden");
            $(".js-verify-popup .alert-verify").removeClass("hidden");
            $("body").addClass("not-scroll");
          }
        }
      };
      wpbingo.header_campar = function () {
        var header_campar = "";
        $(".bwp-header-campar .close-campbar").on("click", function () {
          wpbingo.setCookie("wpbingo_header_campar", 1, 1);
          $(".bwp-header-campar").slideUp();
        });
        header_campar = wpbingo.getCookie("wpbingo_header_campar");
        if (header_campar != 1) {
          $(".bwp-header-campar").removeClass("active");
          $(".bwp-header-campar").slideDown();
        }
      };
      wpbingo.customNumberInput = function () {
        var $body2 = $("body"),
          qtyAdjust = ".js-qty-adjust",
          qtyNumber = ".js-qty-number";
        var validateQty2;
        $body2.on("click", qtyAdjust, function () {
          var $el = $(this),
            $qtySelector = $el.siblings(qtyNumber),
            qty = parseInt($qtySelector.val().replace(/\D/g, ""));
          qty = validateQty2(qty);
          if ($el.hasClass("wpbingo-qty__adjust--plus")) {
            qty += 1;
          } else {
            qty -= 1;
            if (qty <= 0) qty = 0;
            if (qty <= 0 && $qtySelector.attr("min") == "1") qty = 1;
          }
          $qtySelector.val(qty);
        });
        $body2.on("focus", qtyAdjust, function () {
          var $el = $(this);
          setTimeout(function () {
            $el.select();
          }, 50);
        });
        validateQty2 = function validateQty2(qty) {
          if (parseFloat(qty) === parseInt(qty) && !isNaN(qty)) {} else {
            qty = 1;
          }
          return qty;
        };
      };
      wpbingo.ajaxFilterCategory = function ($element2) {
        if ($element2) {
          var $categories = $element2;
        } else {
          var $categories = $(".js-page-collection .FacetsWrapperDesktop .sidebar-categories");
        }
        if ($(".wpbingo-breadcrumbs").hasClass("have-collection")) {
          var $collection = true;
        }
        var wpbingoFilterContentProduct = ".js-collection-content-product",
          wpbingoFilterSidebar = ".collection-sidebar",
          wpbingoFilterTitle = ".wpbingo-breadcrumbs__inner",
          wpbingoFacetsContainer = ".active-facets-desktop",
          bwpChangeView = ".js-change-view",
          wpbingoFacetsWrapper = ".FacetsWrapperDesktop ";
        $($categories).on("click", "a", function (e) {
          e.preventDefault();
          var pageURL = $(this).attr("href");
          var newTitle = $(this).attr("title");
          History.pushState({
            param: Shopify.queryParams
          }, pageURL, pageURL);
          delete Shopify.queryParams.page;
          $("#pre-loading").addClass("load-product");
          $("#pre-loading .pre-loading__bar").css({
            "width": "40%"
          });
          $.ajax({
            type: "get",
            url: pageURL,
            success: function success(data2) {
              document.title = newTitle;
              $(wpbingoFilterContentProduct).replaceWith($(data2).find(wpbingoFilterContentProduct));
              $(wpbingoFilterSidebar).replaceWith($(data2).find(wpbingoFilterSidebar));
              $(wpbingoFilterTitle).replaceWith($(data2).find(wpbingoFilterTitle));
              $(wpbingoFacetsContainer).replaceWith($(data2).find(wpbingoFacetsContainer));
              $(wpbingoFacetsWrapper).replaceWith($(data2).find(wpbingoFacetsWrapper));
              $(".wpbingo-breadcrumbs__image").replaceWith($(data2).find(".wpbingo-breadcrumbs__image"));
              if ($collection) {
                wpbingo.elementslickCarousel($(".wpbingo-breadcrumbs__image .js-carousel"));
              }
              wpbingo.ajaxFilterCategory();
              wpbingo.click_atribute_image();
              wpbingo.zoom_thumb();
              $(".product-card__image-wrapper.slider", wpbingoFilterContentProduct).each(function () {
                wpbingo.elementslickCarousel($(".js-carousel", $(this)));
              });
              wpbingo.hideLoading();
              if (window.SPR) {
                SPR.initRatingHandler();
                SPR.initDomEls();
                SPR.loadProducts();
                SPR.loadBadges();
              }
              wpbingo.countdown();
              cViewCollection = wpbingo.getCookie("wpbingo_view_collection");
              if (cViewCollection) {
                $("#JsCollectionProduct").removeAttr("class");
                $("#JsCollectionProduct").addClass(cViewCollection);
                $(bwpChangeView).removeClass("active");
                $("[data-view=" + cViewCollection + "]").addClass("active");
              }
              $(".js-page-collection").on("click", bwpChangeView, function (e2) {
                e2.preventDefault();
                if (!$(this).hasClass("active")) {
                  $(".product-card__image-wrapper.slider", wpbingoFilterContentProduct).each(function () {
                    $(".js-carousel", $(this)).slick("refresh");
                  });
                  wpbingo.setCookie("wpbingo_view_collection", $(this).data("view"), 1);
                  $(bwpChangeView).removeClass("active");
                  $(this).addClass("active");
                  $("#JsCollectionProduct").removeAttr("class");
                  $("#JsCollectionProduct").addClass($(this).data("view"));
                }
              });
              wpbingo.sidebarCollection();
              initButtons();
              initButtonsCompare();
              wpbingo.countActiveSidebar();
              wpbingo.toggleSidebar();
              if (!$(".js-page-collection").hasClass("dropdown") && !$(".js-page-collection").hasClass("on_top")) {
                wpbingo.toggleSidebar();
              }
              $("#pre-loading .pre-loading__bar").css({
                "width": "100%"
              });
              setTimeout(function () {
                $("#pre-loading .pre-loading__bar").css({
                  "width": "0"
                });
                $("#pre-loading").removeClass("load-product");
              }, 500);
            },
            error: function error(xhr, text) {
              console.log(text);
            }
          });
          $("body,html").animate({
            scrollTop: $(".header").height() + $(".wpbingo-breadcrumbs").height()
          }, 600);
        });
      };
      wpbingo.zoom_thumb = function () {
        if ($(".product-card .product-card__image-wrapper").hasClass("zoom")) {
          $(".product-card .product-card__image").zoom();
        }
      };
      wpbingo.sale_nofication = function () {
        if ($(".sale-nofication").length) {
          var $element2 = $(".sale-nofication");
          var time_start = 0;
          var start = $element2.data("start");
          var start_unit = $element2.data("start_unit");
          if (start_unit == "second") {
            time_start = start * 1e3;
          } else if (start_unit == "minute") {
            time_start = start * 1e3 * 60;
          }
          $(".close-notification", $element2).on("click", function () {
            if ($element2.hasClass("active")) {
              $element2.removeClass("active");
            }
          });
          setTimeout(function () {
            wpbingo.sale_nofication_start();
          }, time_start);
        }
      };
      wpbingo.sale_nofication_start = function () {
        if ($(".sale-nofication").length) {
          var $element2 = $(".sale-nofication");
          var collectionId = $element2.data("id");
          var array_product = $element2.data("array_product");
          var limit = $element2.data("limit") - 1;
          var stay = $element2.data("stay");
          var stay_unit = $element2.data("stay_unit");
          var user_purchased = window.routes.user_purchased;
          var list_time = window.routes.list_time;
          var purchased = user_purchased.split("|");
          var time = list_time.split("|");
          var time_stay = 0;
          if (stay_unit == "second") {
            time_stay = stay * 1e3;
          } else if (stay_unit == "minute") {
            time_stay = stay * 1e3 * 60;
          }
          var array1 = array_product.split('""');
          var item = Math.floor(limit * Math.random());
          var array2 = array1[item].split('"');
          if (item == 0) {
            var array = array2[1];
          } else {
            var array = array2[0];
          }
          $.getJSON("/products/" + array + ".js", function (product) {
            $("#image", $element2).attr("src", product.featured_image);
            $("a", $element2).attr("href", "/products/" + product.handle);
            $(".product-title a", $element2).text(product.title);
            $(".notification-purchased .name", $element2).text(purchased[item]);
            $(".time-suggest", $element2).text(time[item]);
            $element2.addClass("active");
          });
          $(".scroll-notification", $element2).css("animation-duration", stay + "s");
          setTimeout(function () {
            $element2.removeClass("active");
            wpbingo.sale_nofication();
          }, time_stay);
        }
      };
      wpbingo.discount_single = function () {
        if ($(".product-single #buy_more_form").length > 0) {
          var $parent = $(".product-single #buy_more_form"),
            count = $(".buy_more", $parent).data("quatily"),
            id_product = $("input[name='items[][id]']", $parent).attr("value");
          var params = {
            type: "POST",
            url: "/cart.js",
            processData: false,
            contentType: false,
            dataType: "json",
            success: function success(cart) {
              if (cart.items.length == 0) {
                $(".buy-more-cart", $parent).removeClass("disabled");
              } else {
                for (var item in cart.items) {
                  var variant = cart.items[item],
                    variant_id = variant.variant_id;
                  if (variant_id == id_product) {
                    if (variant.quantity >= count) {
                      $(".buy-more-cart", $parent).addClass("disabled");
                      $(".buy-more-cart", $parent).prop("disabled", true);
                    } else {
                      $(".buy-more-cart", $parent).removeClass("disabled");
                      $(".buy-more-cart", $parent).prop("disabled", false);
                    }
                    break;
                  } else {
                    $(".buy-more-cart", $parent).removeClass("disabled");
                    $(".buy-more-cart", $parent).prop("disabled", false);
                  }
                }
              }
            },
            error: function error(XMLHttpRequest2, textStatus) {
              if (typeof errorCallback === "function") {
                errorCallback(XMLHttpRequest2, textStatus);
              } else {
                ShopifyAPI.onError(XMLHttpRequest2, textStatus);
              }
            }
          };
          jQuery.ajax(params);
        }
      };
      wpbingo.pick_up = function (id) {
        if ($(".product-single .product-single__pick_up").length > 0) {
          var $element2 = $(".product-single .product-single__pick_up"),
            title = $element2.data("product_title"),
            image_url = $element2.data("src");
          if (id == null) {
            var id = $element2.data("id");
          }
          fetch(window.Shopify.routes.root + "variants/" + id + "/?section_id=pickup-availability").then(function (response) {
            return response.text();
          }).then(function (text) {
            var container2 = document.querySelector("[data-store-availability-container]");
            var pickupAvailabilityHTML = new DOMParser().parseFromString(text, "text/html").querySelector(".shopify-section");
            container2.appendChild(pickupAvailabilityHTML);
            $(".content-info .title", $element2).html(title);
            if ($element2.data("only_variant") == true) {
              $(".product-info .content-image img", $element2).attr("src", image_url);
            }
            $(".pickup-availability-information", $element2).on("click", function () {
              if (!$(".pickup-availabilities-modal", $element2).hasClass("active")) {
                $(".pickup-availabilities-modal", $element2).addClass("active");
              }
            });
            $(".pickup_modal-close", $element2).on("click", function () {
              if ($(".pickup-availabilities-modal", $element2).hasClass("active")) {
                $(".pickup-availabilities-modal", $element2).removeClass("active");
              }
            });
          })["catch"](function (e) {
            console.error(e);
          });
        }
      };
      wpbingo.time_estimated_delivery = function () {
        if ($(".product-single .estimated_delivery").length > 0) {
          var code_time = window.routes.iso_code;
          var $element2 = $(".product-single .estimated_delivery");
          var datenow_preorder = $(".product-single .estimated_delivery").data("date_now");
          if (datenow_preorder) {
            var datenow = new Date(datenow_preorder).getTime();
          } else {
            var datenow = Date.now();
          }
          var date = /* @__PURE__ */new Date(),
            day = 24 * 60 * 60 * 1e3,
            day_ship = $($element2).data("number_day");
          var day_start = new Date(day_ship * day + datenow);
          var day_stop = new Date((day_ship + 4) * day + datenow);
          var day_start = day_start.toLocaleDateString(code_time, {
            weekday: "long",
            month: "short",
            day: "numeric"
          });
          var day_stop = day_stop.toLocaleDateString(code_time, {
            weekday: "long",
            month: "short",
            day: "numeric"
          });
          var date_time = ((date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds()) * 1e3,
            time_sec = (day - date_time) / 1e3,
            time_left_m = (time_sec - time_sec % 60) / 60 % 60,
            time_left_h = ((time_sec - time_sec % 60) / 60 - time_left_m % 60) / 60;
          $("span.time_hour", $element2).html(time_left_h);
          $("span.time_min", $element2).html(time_left_m);
          $("span.day_start", $element2).html(day_start);
          $("span.day_stop", $element2).html(day_stop);
        }
      };
      wpbingo.countActiveSidebar = function () {
        var count = 0;
        if ($(".js-page-collection").hasClass("dropdown") || $(".js-page-collection").hasClass("on_top")) {
          var $parent_collection = $(".js-page-collection .FacetsWrapperDesktop");
        } else {
          var $parent_collection = $(".js-page-collection .collection-sidebar");
        }
        $(".js-filter", $parent_collection).each(function () {
          count = $("input:checked", $(this)).length;
          if (count > 0) {
            $(".block-sidebar__title .count", $(this)).removeClass("hide");
            $(".facets__display .reset-filter", $(this)).removeClass("hide");
            $(".block-sidebar__title .count", $(this)).text(count);
          } else {
            $(".block-sidebar__title .count", $(this)).addClass("hide");
          }
          if ($(this).hasClass("show")) {
            if ($("h4.block-sidebar__title", $(this)).hasClass("active")) {
              $("h4.block-sidebar__title", $(this)).removeClass("active");
            } else {
              $("h4.block-sidebar__title", $(this)).addClass("active");
            }
          }
        });
        var count_sidebar = $(".js-page-collection.dropdown .sidebar-categories ul li.active").length;
        if (count_sidebar > 0) {
          $(".js-page-collection.dropdown .sidebar-categories .block-sidebar__title .count").removeClass("hide");
        } else {
          $(".js-page-collection.dropdown .sidebar-categories .block-sidebar__title .count").addClass("hide");
        }
        $(".collection-sidebar .js-filter .facets__display .select-filter label").on("click", function () {
          $(".collection-sidebar .js-filter").removeClass("show");
          var $parent = $(this).closest(".js-filter");
          $parent.addClass("show");
        });
        $(".collection-sidebar .js-filter .facets__display .facets__price input").change(function () {
          $(".collection-sidebar .js-filter").removeClass("show");
          var $parent = $(this).closest(".js-filter");
          $parent.addClass("show");
        });
        $(".js-page-collection.on_top .js-filter .facets__display li label").on("click", function () {
          var $parent = $(this).closest(".js-page-collection.on_top ");
          if (!$parent.hasClass("show")) {
            $parent.addClass("show");
          }
        });
        $(".js-page-collection.on_top .js-filter .facets__display .facets__price input").change(function () {
          var $parent = $(this).closest(".js-page-collection.on_top ");
          if (!$parent.hasClass("show")) {
            $parent.addClass("show");
          }
        });
      };
      wpbingo.toggleSidebar = function ($element2) {
        $(".js-page-collection:not(.sidebar_4,.on_top) h4.block-sidebar__title").on("click", function () {
          if ($(".js-page-collection").hasClass("dropdown")) {
            if (!$(this).hasClass("active")) {
              $(".js-page-collection.dropdown .facets__display").slideUp();
              $(".js-page-collection.dropdown h4.block-sidebar__title").removeClass("active");
            }
          }
          if ($element2) {
            if ($(".js-page-collection").hasClass("dropdown")) {
              var $parent = $(this).closest(".js-filter");
            } else {
              var $parent = $(this).closest(".js-filter:not(.sidebar-categories)");
            }
          } else {
            var $parent = $(this).closest(".js-filter");
          }
          if ($("h4.block-sidebar__title", $parent).hasClass("active")) {
            $("h4.block-sidebar__title", $parent).removeClass("active");
          } else {
            $("h4.block-sidebar__title", $parent).addClass("active");
          }
          $(".facets__display", $parent).slideToggle();
        });
        if ($(window).width() > 991) {
          $(".js-page-collection.on_top .js-sidebar-toggle").on("click", function () {
            $(this).toggleClass("active");
            $(".js-page-collection.on_top .dropdown_ontop").slideToggle();
            if ($(".js-page-collection.on_top").hasClass("show")) {
              $(".js-page-collection.on_top").removeClass("show");
            }
          });
          $(".js-page-collection .collection-sidebar__overlay").on("click", function () {
            if ($("body").hasClass("collection-sidebar--open")) {
              $(".js-page-collection.on_top .dropdown_ontop").slideUp();
              if ($(".js-page-collection").hasClass("on_top")) {
                setTimeout(function () {
                  $("body").removeClass("collection-sidebar--open");
                  if ($(".js-page-collection.on_top").hasClass("show")) {
                    $(".js-page-collection.on_top").removeClass("show");
                  }
                }, 600);
              } else {
                $("body").removeClass("collection-sidebar--open");
              }
            }
          });
        } else {
          if (!$element2) {
            $(".js-page-collection.on_top .collection-sidebar__overlay").on("click", function () {
              if ($("body").hasClass("collection-sidebar--open")) {
                $("body").removeClass("collection-sidebar--open");
              } else {
                $("body").addClass("collection-sidebar--open");
              }
            });
          }
        }
        if ($(".js-page-collection").hasClass("viewmore")) {
          var number_list = $(".js-page-collection").data("list_number");
          if ($(".js-page-collection").hasClass("filter_drawer")) {
            if ($element2) {
              if ($(".js-page-collection").hasClass("on_top")) {
                var list = $(".filter-list");
              } else {
                var list = $(".filter-list:not(.sidebar-categories)");
              }
            } else {
              var list = $(".filter-list");
            }
          } else if ($(".js-page-collection").hasClass("side_out")) {
            if ($element2) {
              var list = $(".js-filter:not(.sidebar-categories,.filter-color,.js-filter-price,.filter-image)");
            } else {
              var list = $(".js-filter:not(.filter-color,.js-filter-price,.filter-image)");
            }
          } else if ($(".js-page-collection").hasClass("sidebar_1")) {
            if ($element2) {
              var list = $(".js-filter:not(.sidebar-categories,.filter-color,.js-filter-price,.filter-image)");
            } else {
              var list = $(".js-filter:not(.filter-color,.js-filter-price,.filter-image)");
            }
          } else if ($(".js-page-collection").hasClass("sidebar_2")) {
            if ($element2) {
              var list = $(".js-filter:not(.sidebar-categories,.filter-color,.js-filter-price,.filter-image)");
            } else {
              var list = $(".js-filter:not(.filter-color,.js-filter-price,.filter-image)");
            }
          } else if ($(".js-page-collection").hasClass("sidebar_3")) {
            if ($element2) {
              var list = $(".js-filter:not(.sidebar-categories,.js-filter-price,.filter-image,.filter-label)");
            } else {
              var list = $(".js-filter:not(.js-filter-price,.filter-image,.filter-label)");
            }
          } else if ($(".js-page-collection").hasClass("sidebar_4")) {
            if ($element2) {
              var list = $(".filter-list:not(.sidebar-categories,.filter-out_stock)");
            } else {
              var list = $(".filter-list:not(.filter-out_stock)");
            }
          } else if ($(".js-page-collection").hasClass("dropdown") || $(".js-page-collection").hasClass("on_top")) {
            var list = $(".js-filter:not(.filter-image)");
          }
          $(list).each(function () {
            var count_sidebar_1 = $(".facets__display>ul>li", $(this)).length;
            if (!$(".facets__display>ul>li.view", $(this)).length) {
              if (count_sidebar_1 > number_list) {
                $(".facets__display>ul", $(this)).append('<li class="view"><span>' + window.strings.view_more + "</span></li>");
              }
            }
            $(".facets__display>ul>li:not(.view)", $(this)).each(function (index) {
              if (index + 1 > number_list) {
                $(this).css("display", "none");
              }
            });
          });
          $(".facets__display>ul>li.view", list).on("click", function () {
            var $parent = $(this).closest("ul");
            $(">li:not(.view)", $parent).each(function (index) {
              if (index + 1 > number_list) {
                $(this).slideToggle();
              }
            });
            if ($(this).hasClass("show")) {
              $(this).removeClass("show");
              $("span", $(this)).text(window.strings.view_more);
              return;
            } else {
              $(this).addClass("show");
              $("span", $(this)).text(window.strings.view_less);
              return;
            }
          });
        }
      };
      wpbingo.sidebarCollection = function ($element2) {
        if ($element2) {
          var $parent = $(".js-page-collection .FacetsWrapperDesktop");
        } else {
          var $parent = $(".js-page-collection");
        }
        $(".sidebar-categories ul li a", $parent).on("click", function () {
          var $parent2 = $(this).closest("li");
          $(".sidebar-categories ul li").removeClass("active");
          if (!$parent2.hasClass("active")) {
            $parent2.addClass("active");
          }
        });
        $(".sidebar-categories .toggle_collection-children", $parent).on("click", function () {
          var $parent2 = $(this).closest("li");
          $(this).toggleClass("show");
          $(">.collection-children", $parent2).slideToggle();
        });
        $(".sidebar-categories .collection-children li", $parent).each(function () {
          if ($(this).hasClass("active")) {
            var $parent2 = $(this).parents(".collection-children");
            var $parent22 = $(this).parents("li");
            $parent2.css({
              "display": "block"
            });
            if (!$(">.link-collection >.toggle_collection-children", $parent22).hasClass("show")) {
              $(">.link-collection >.toggle_collection-children", $parent22).addClass("show");
            }
          }
        });
      };
      wpbingo.gift_wrap = function () {
        var selectors2 = {
          body: "body",
          GiftCard: "[data-gift-card]",
          giftWrapTemplate: "#gift-card-template",
          giftWrapBtn: ".gift-wrap [data-gift_card]",
          giftCardContainer: "[data-gift-card-container]",
          giftCardClose: "[data-gift-card-close]",
          giftCardImages: "[data-gift-card-images]",
          giftCardVariant: ".js-giftcard-option-selector",
          originalSelectorId: "[data-edit_variant-variant]",
          giftCardProductPrice: ".js-gift-product-price",
          giftCardProductPriceCompare: ".js-gift-product-price-compare",
          giftCardQty: "[data-gift-card-quantity]",
          giftCardAvaiable: ".product-avaiable",
          giftCardAvaiableInStock: ".product-avaiable--instock",
          giftCardAvaiableOutStock: ".product-avaiable--outstock",
          giftCardProductDetailsURL: ".js-qv-product-details"
        };
        function GiftCard(container2) {
          this.$container = $(container2);
          this.cache = {};
          this.productVariants = [];
          this.currentVariant = {};
          this.cacheSelectors();
          this.initializeEvents();
        }
        GiftCard.prototype = _.assignIn({}, GiftCard.prototype, {
          cacheSelectors: function cacheSelectors() {
            this.cache = {
              $body: $("body"),
              $giftCardContainer: this.$container.find(selectors2.giftCardContainer)
            };
          },
          initializeEvents: function initializeEvents() {
            var $this = this;
            $(selectors2.body).on("click", selectors2.giftWrapBtn, function (e) {
              e.preventDefault();
              var productHandle = $(this).data("gift_card");
              $(this).addClass("load-giftcard");
              $.getJSON("/products/" + productHandle + ".js", function (product) {
                if (product.available) {
                  $this.firstAvailableVariant(product.variants, $this);
                } else {
                  $this.currentVariant = product.variants[0];
                }
                $(selectors2.giftWrapBtn).removeClass("load-giftcard");
                $this.buildGiftCard(product);
                $this.show();
                $this.createImageCarousel(product);
              });
            });
            $(selectors2.body).on("click", selectors2.giftCardClose, function (e) {
              e.preventDefault();
              $this.hide();
            });
            $(selectors2.giftCardContainer).on("change", selectors2.giftCardVariant, function (e) {
              $this.onVariantChange();
            });
          },
          firstAvailableVariant: function firstAvailableVariant(variants, global) {
            global.productVariants = variants;
            for (var i = 0; i < variants.length; i++) {
              var variant = variants[i];
              if (variant.available) {
                global.currentVariant = variant;
                break;
              }
            }
          },
          buildGiftCard: function buildGiftCard(product) {
            var moneyFormat2 = wpbingo.strings.moneyFormat;
            var currentVariant = this.currentVariant;
            var source = $(selectors2.giftWrapTemplate).html();
            var template = Handlebars.compile(source);
            var images = "";
            var price = "";
            var external = "";
            var qvObject = {
              id: product.id
            };
            if (typeof product.media !== "undefined") {
              images += '<div class="gift_card-images__list slick-carousel" data-gift-card-images>';
              for (var i = 0; i < product.media.length; i++) {
                var media = product.media[i];
                if (media.media_type === "image") {
                  images += '<div class="slick-carousel__item"><div class="giftcard-images__item" data-media-id=' + media.id + '><img class="img-fluid" alt="' + product.title + '" src="' + media.src + '" /></div></div>';
                }
              }
              images += "</div>";
            }
            qvObject.variantID = currentVariant.id;
            qvObject.sku = currentVariant.sku !== null && currentVariant.sku !== "" ? currentVariant.sku : "N/A";
            qvObject.images = images;
            qvObject.title = product.title;
            qvObject.url = product.url;
            price += '<div class="price-container">';
            var productCompareClass = product.compare_at_price !== null ? "" : "d-none";
            price += '<div class="js-gift-product-price-compare product-single__price--compare-at ' + productCompareClass + '">' + wpbingo.Currency.formatMoney(product.compare_at_price, moneyFormat2) + "</div>";
            price += '<div class="js-gift-product-price product-single__price">' + wpbingo.Currency.formatMoney(product.price, moneyFormat2) + "</div>";
            price += '</div">';
            qvObject.price = price;
            qvObject.variants = this.buildVariant(product);
            $(selectors2.giftCardContainer).html(template(qvObject));
            this.updateMedia(currentVariant);
            this.updateDetailsLink(currentVariant);
            $("#form-gift-card-addtocart .btn--add-to-cart").on("click", function (e) {
              e.preventDefault();
              $(this).removeClass("added");
              $(this).addClass("active");
              var addToCartForm = document.querySelector("#form-gift-card-addtocart");
              var formData = new FormData(addToCartForm);
              var params = {
                type: "POST",
                url: "/cart/add.js",
                data: formData,
                processData: false,
                contentType: false,
                dataType: "json",
                success: function success(line_item) {
                  $("#form-gift-card-addtocart .btn--add-to-cart").removeClass("active");
                  $("#form-gift-card-addtocart .btn--add-to-cart").addClass("added");
                  setTimeout(function () {
                    $("#form-gift-card-addtocart .btn--add-to-cart").removeClass("added");
                  }, 3e3);
                  ajaxCart.load();
                  ajaxCartPage.load();
                },
                error: function error(XMLHttpRequest2, textStatus) {
                  if (typeof errorCallback === "function") {
                    errorCallback(XMLHttpRequest2, textStatus);
                  } else {
                    ShopifyAPI.onError(XMLHttpRequest2, textStatus);
                  }
                }
              };
              jQuery.ajax(params);
            });
            if ($(".bwp_currency").length > 0) {
              Currency.Currency_customer(true);
            }
          },
          convertToSlug: function convertToSlug(str) {
            return str.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
          },
          buildVariant: function buildVariant(product) {
            var result = "";
            var currentVariant = this.currentVariant;
            if (product.options[0].name !== "Title") {
              var options = product.options;
              for (var i = 0; i < options.length; i++) {
                var option = options[i];
                var optionIndex = i + 1;
                result += '<div class="variants-wrapper product-form__item" data-giftcard-variant-option="' + optionIndex + '">';
                result += '<label class="variants__label">' + option.name + "</label>";
                result += '<div class="variants__options">';
                for (var j = 0; j < option.values.length; j++) {
                  var value = option.values[j];
                  var isDisable = true;
                  var colorAttribute = "";
                  for (var k = 0; k < this.productVariants.length; k++) {
                    var variantCondition = this.productVariants[k];
                    if (variantCondition.available) {
                      if (i == 0 && variantCondition.option1 === value) {
                        isDisable = false;
                        break;
                      } else if (i == 1 && variantCondition.option2 === value && variantCondition.option1 == currentVariant.option1) {
                        isDisable = false;
                        break;
                      } else if (i == 2 && variantCondition.option3 === value && variantCondition.option2 == currentVariant.option2 && variantCondition.option1 == currentVariant.option1) {
                        isDisable = false;
                        break;
                      }
                    }
                  }
                  result += '<div class="single-option-selector">';
                  result += '<input type="radio" data-single-option-button';
                  result += currentVariant.options[i] === value ? " checked " : " ";
                  if (isDisable) {
                    result += 'disabled="disabled"';
                  }
                  result += 'value="' + _.escape(value) + '" data-index="option' + optionIndex + '" name="option' + option.position + '" ';
                  result += 'class="js-giftcard-option-selector';
                  if (isDisable) {
                    result += " disabled";
                  }
                  result += '" id="giftcard-product-option-' + i + "-" + value.toLowerCase() + '">';
                  result += '<label data-toggle="tooltip" title="' + value + '" for="giftcard-product-option-' + i + "-" + value.toLowerCase() + '" ' + colorAttribute;
                  if (isDisable) {
                    result += ' class="disabled"';
                  }
                  result += ">" + value + '<span class="d-none"></span></label>';
                  result += "</div>";
                }
                result += "</div>";
                result += "</div>";
              }
            }
            return result;
          },
          createImageCarousel: function createImageCarousel(product) {
            if (product.media.length > 1) {
              $(selectors2.GiftCard).find(selectors2.giftCardImages).slick({
                infinite: false,
                rows: 0,
                arrows: false,
                rtl: wpbingo.rtl_slick()
              });
            }
          },
          getCurrentOptions: function getCurrentOptions() {
            var currentOptions = _.map($(selectors2.giftCardVariant, selectors2.giftCardContainer), function (element) {
              var $element2 = $(element);
              var type = $element2.attr("type");
              var currentOption = {};
              if (type === "radio" || type === "checkbox") {
                if ($element2[0].checked) {
                  currentOption.value = $element2.val();
                  currentOption.index = $element2.data("index");
                  return currentOption;
                } else {
                  return false;
                }
              } else {
                currentOption.value = $element2.val();
                currentOption.index = $element2.data("index");
                return currentOption;
              }
            });
            currentOptions = _.compact(currentOptions);
            return currentOptions;
          },
          getVariantFromOptions: function getVariantFromOptions() {
            var selectedValues = this.getCurrentOptions();
            var variants = this.productVariants;
            var found = _.find(variants, function (variant) {
              return selectedValues.every(function (values) {
                return _.isEqual(variant[values.index], values.value);
              });
            });
            return found;
          },
          updateVariantsButton: function updateVariantsButton() {
            var selectedValues = this.getCurrentOptions();
            var variants = this.productVariants;
            for (var i = 2; i <= 3; i++) {
              if ($('[data-giftcard-variant-option="' + i + '"]', selectors2.giftCardContainer).length) {
                $('[data-giftcard-variant-option="' + i + '"] ' + selectors2.giftCardVariant, selectors2.giftCardContainer).each(function () {
                  var $self = $(this);
                  var optionValue = $self.val();
                  var foundIndex;
                  if (i === 2) {
                    foundIndex = _.findIndex(variants, function (variant) {
                      variant.option1 = variant.option1.toString();
                      selectedValues[0].value = selectedValues[0].value.toString();
                      variant.option2 = variant.option2.toString();
                      optionValue = optionValue.toString();
                      return variant.option1 === selectedValues[0].value && variant.option2 === optionValue && variant.available === true;
                    });
                  } else if (i === 3) {
                    foundIndex = _.findIndex(variants, function (variant) {
                      variant.option1 = variant.option1.toString();
                      variant.option2 = variant.option2.toString();
                      variant.option3 = variant.option3.toString();
                      selectedValues[0].value = selectedValues[0].value.toString();
                      selectedValues[1].value = selectedValues[1].value.toString();
                      optionValue = optionValue.toString();
                      return variant.option1 === selectedValues[0].value && variant.option2 === selectedValues[1].value && variant.option3 === optionValue && variant.available === true;
                    });
                  }
                  if (foundIndex !== -1) {
                    $self.removeAttr("disabled", "disabled").removeClass("disabled");
                    $self.next("label").removeClass("disabled");
                  } else {
                    $self.attr("disabled", "disabled").addClass("disabled");
                    $self.next("label").addClass("disabled");
                  }
                });
              }
            }
          },
          updateVariantsButtonDisabed: function updateVariantsButtonDisabed() {
            for (var i = 2; i <= 3; i++) {
              if ($('[data-giftcard-variant-option="' + i + '"]', selectors2.giftCardContainer).length) {
                var isUpdate = false;
                $('[data-giftcard-variant-option="' + i + '"] ' + selectors2.giftCardVariant, selectors2.giftCardContainer).each(function () {
                  var $element2 = $(this);
                  var type = $element2.attr("type");
                  if (type === "radio" || type === "checkbox") {
                    if (this.checked && $element2.hasClass("disabled")) {
                      $element2.prop("checked", false);
                      isUpdate = true;
                      return false;
                    }
                  }
                });
                $('[data-giftcard-variant-option="' + i + '"] ' + selectors2.giftCardVariant, selectors2.giftCardContainer).each(function () {
                  var $element2 = $(this);
                  var type = $element2.attr("type");
                  if (isUpdate && (type === "radio" || type === "checkbox") && !$element2.hasClass("disabled")) {
                    $element2.prop("checked", true);
                    isUpdate = false;
                    $element2.trigger("change");
                    return false;
                  }
                });
              }
            }
          },
          updateMasterSelect: function updateMasterSelect(variant) {
            if (variant) {
              $(selectors2.originalSelectorId, selectors2.giftCardContainer).val(variant.id);
            }
          },
          updateMedia: function updateMedia(variant) {
            if (variant && variant.featured_media && variant.featured_media.id) {
              $(selectors2.giftCardImages, selectors2.giftCardContainer).find(".giftcard-images__item").each(function () {
                var imageID = $(this).data("media-id");
                if (variant.featured_media.id == imageID) {
                  var slickIndex = $(this).closest(".slick-carousel__item").data("slick-index");
                  if (slickIndex !== void 0 && slickIndex !== null) {
                    $(selectors2.giftCardImages, selectors2.giftCardContainer).slick("slickGoTo", slickIndex);
                  }
                }
              });
            }
          },
          updatePrice: function updatePrice(variant) {
            var moneyFormat2 = wpbingo.strings.moneyFormat;
            if (!variant) {
              $(selectors2.giftCardProductPrice, selectors2.giftCardContainer).addClass("d-none");
              $(selectors2.giftCardProductPriceCompare, selectors2.giftCardContainer).addClass("d-none");
            } else {
              $(selectors2.giftCardProductPrice, selectors2.giftCardContainer).removeClass("d-none");
              $(selectors2.giftCardProductPriceCompare, selectors2.giftCardContainer).removeClass("d-none");
              $(selectors2.giftCardProductPrice, selectors2.giftCardContainer).html(wpbingo.Currency.formatMoney(variant.price, moneyFormat2));
              if (variant.compare_at_price > variant.price) {
                $(selectors2.giftCardProductPriceCompare, selectors2.giftCardContainer).html(wpbingo.Currency.formatMoney(variant.compare_at_price, moneyFormat2)).removeClass("d-none");
                $(selectors2.giftCardProductPrice, selectors2.giftCardContainer).addClass("on-sale");
              } else {
                $(selectors2.giftCardProductPriceCompare, selectors2.giftCardContainer).addClass("d-none");
                $(selectors2.giftCardProductPrice, selectors2.giftCardContainer).removeClass("on-sale");
              }
            }
            if ($(".bwp_currency").length > 0) {
              Currency.Currency_customer(true);
            }
          },
          updateProductAvaiable: function updateProductAvaiable(variant) {
            var classActive = "product-avaiable--active";
            var translations = wpbingo.strings;
            $(selectors2.giftCardAvaiable, selectors2.giftCardContainer).removeClass(classActive);
            if (variant) {
              if (variant.available) {
                $(selectors2.giftCardQty, selectors2.giftCardContainer).removeClass("d-none");
                $(selectors2.giftCardAvaiableInStock, selectors2.giftCardContainer).addClass(classActive);
              } else {
                $(selectors2.giftCardQty, selectors2.giftCardContainer).addClass("d-none");
                $(selectors2.giftCardAvaiableOutStock, selectors2.giftCardContainer).addClass(classActive);
              }
              if (variant.available) {
                $(selectors2.giftCardContainer).find(".btn--add-to-cart").removeClass("disabled").prop("disabled", false);
                $(selectors2.giftCardContainer).find(".btn--add-to-cart .btn__text").html(translations.addToCart);
              } else {
                $(selectors2.giftCardContainer).find(".btn--add-to-cart").addClass("disabled").prop("disabled", true);
                $(selectors2.giftCardContainer).find(".btn--add-to-cart .btn__text").html(translations.soldOut);
              }
            } else {
              $(selectors2.giftCardQty, selectors2.giftCardContainer).addClass("d-none");
              $(selectors2.giftCardContainer).find(".btn--add-to-cart").addClass("disabled").prop("disabled", true);
              $(selectors2.giftCardContainer).find(".btn--add-to-cart .btn__text").html(translations.unavailable);
            }
          },
          updateDetailsLink: function updateDetailsLink(variant) {
            if (variant) {
              var productURL = $(selectors2.giftCardProductDetailsURL, selectors2.giftCardContainer).data("url") + "?variant=" + variant.id;
              $(selectors2.giftCardProductDetailsURL, selectors2.giftCardContainer).removeClass("d-none").attr("href", productURL);
            } else {
              $(selectors2.giftCardProductDetailsURL, selectors2.giftCardContainer).addClass("d-none");
            }
          },
          onVariantChange: function onVariantChange() {
            var variant = this.getVariantFromOptions();
            if ($("[data-single-option-button]", selectors2.giftCardContainer).length) {
              this.updateVariantsButton();
              if (!variant || !variant.available) {
                this.updateVariantsButtonDisabed();
                return;
              }
            }
            this.updateMasterSelect(variant);
            this.updateMedia(variant);
            this.updatePrice(variant);
            this.updateProductAvaiable(variant);
            this.updateDetailsLink(variant);
            this.currentVariant = variant;
          },
          show: function show() {
            $(selectors2.body).addClass("giftcard-active");
            $(selectors2.GiftCard).addClass("show");
            setTimeout(function () {
              $(".gift_card-container .gift_card__content").addClass("show");
            }, 400);
          },
          hide: function hide() {
            $(selectors2.giftCardContainer).html();
            $(selectors2.body).removeClass("giftcard-active");
            $(".gift_card-container .gift_card__content").removeClass("show");
            setTimeout(function () {
              $(selectors2.GiftCard).removeClass("show");
            }, 400);
          }
        });
        return GiftCard;
      }();
      wpbingo.update_variant_cartpage = function () {
        var selectors2 = {
          body: "body",
          EditVariant: "[data-edit_variant-cart]",
          EditVariantTemplate: "#edit_variants-template",
          EditVariantBtn: ".cart-product-edit_variant",
          EditVariantContainer: "[data-edit_variant-cart-container]",
          EditVariantClose: "[data-edit_variant-cart-close]",
          EditVariantImages: "[data-edit_variant-images]",
          EditVariantVariant: ".js-edit_variant-option-selector",
          originalSelectorId: "[data-edit_variant-variant]",
          EditVariantProductPrice: ".js-edit_variant-product-price",
          EditVariantProductPriceCompare: ".js-edit_variant-product-price-compare",
          EditVariantQty: "[data-edit_variant-quantity]",
          EditVariantAvaiable: ".product-avaiable",
          EditVariantAvaiableInStock: ".product-avaiable--instock",
          EditVariantAvaiableOutStock: ".product-avaiable--outstock",
          EditVariantDetailsURL: ".js-qv-product-details"
        };
        function EditVariant(container2) {
          this.$container = $(container2);
          this.cache = {};
          this.productVariants = [];
          this.currentVariant = {};
          this.cacheSelectors();
          this.initializeEvents();
        }
        EditVariant.prototype = _.assignIn({}, EditVariant.prototype, {
          cacheSelectors: function cacheSelectors() {
            this.cache = {
              $body: $("body"),
              $EditVariantContainer: this.$container.find(selectors2.EditVariantContainer)
            };
          },
          initializeEvents: function initializeEvents() {
            var $this = this;
            $(selectors2.body).on("click", selectors2.EditVariantBtn, function (e) {
              e.preventDefault();
              var productHandle = $(this).data("handle");
              var qty = $(this).data("value");
              var line = $(this).data("line");
              var id_variant = $(this).data("id_variant");
              var $parent = $(this).closest(".content-edit_variant-popup");
              $(this).addClass("load-edit_variant");
              $(".image-popup", $parent).addClass("imagepopup_active");
              $("body").addClass("editv_overlay-layer");
              $.getJSON("/products/" + productHandle + ".js", function (product) {
                if (product.available) {
                  $this.firstAvailableVariant(product.variants, $this);
                } else {
                  $this.currentVariant = product.variants[0];
                }
                $(selectors2.EditVariantBtn).removeClass("load-edit_variant");
                $this.buildEditVariant(product, qty, line, id_variant);
                var $element2 = $(".edit_variant-cart-container .content_product_detail .variants-wrapper");
                $($element2).each(function () {
                  var $this2 = $(this);
                  var value = $("input:checked", $this2).attr("value");
                  $(".variants__label span", $this2).html(value);
                });
                $(selectors2.EditVariantContainer).on("change", selectors2.EditVariantVariant, function (e2) {
                  $this.onVariantChange(id_variant);
                });
                if ($(window).width() < 767) {
                  $(selectors2.EditVariant).addClass("transform");
                } else {
                  $(selectors2.EditVariant).addClass("transform");
                }
              });
            });
            $(selectors2.body).on("click", selectors2.EditVariantClose, function (e) {
              if ($(window).width() < 767) {
                $(selectors2.EditVariant).removeClass("transform");
                $("body").removeClass("editv_overlay-layer");
                setTimeout(function () {
                  $("[data-edit_variant-cart-container]").empty();
                }, 300);
              } else {
                $(selectors2.EditVariant).removeClass("transform");
                setTimeout(function () {
                  $("body").removeClass("editv_overlay-layer");
                  $("[data-edit_variant-cart-container]").empty();
                }, 300);
              }
            });
            $(selectors2.body).on("click", function (e) {
              if ($(e.target).is("body.editv_overlay-layer")) {
                if ($(window).width() < 767) {
                  $(selectors2.EditVariant).removeClass("transform");
                  $("body").removeClass("editv_overlay-layer");
                  setTimeout(function () {
                    $("[data-edit_variant-cart-container]").empty();
                  }, 300);
                } else {
                  $(selectors2.EditVariant).removeClass("transform");
                  setTimeout(function () {
                    $("body").removeClass("editv_overlay-layer");
                    $("[data-edit_variant-cart-container]").empty();
                  }, 300);
                }
              }
            });
          },
          firstAvailableVariant: function firstAvailableVariant(variants, global) {
            global.productVariants = variants;
            for (var i = 0; i < variants.length; i++) {
              var variant = variants[i];
              if (variant.available) {
                global.currentVariant = variant;
                break;
              }
            }
          },
          buildEditVariant: function buildEditVariant(product, qty, line, id_variant) {
            var moneyFormat2 = wpbingo.strings.moneyFormat;
            var currentVariant = this.currentVariant;
            for (var key in product.variants) {
              if (id_variant == product.variants[key].id) {
                var currentVariant = product.variants[key];
              }
            }
            var source = $(selectors2.EditVariantTemplate).html();
            var template = Handlebars.compile(source);
            var images = "";
            var price = "";
            var external = "";
            var qvObject = {
              id: product.id
            };
            if (typeof product.media !== "undefined") {
              images += '<div class="edit_variant-images__list slick-carousel" data-edit_variant-images>';
              for (var i = 0; i < product.media.length; i++) {
                var media = product.media[i];
                if (media.media_type === "image") {
                  if (i == 0) {
                    images += '<div class="slick-carousel__item show"><div class="edit_variant-images__item" data-media-id=' + media.id + '><img class="img-fluid" alt="' + product.title + '" src="' + media.src + '" /></div></div>';
                  } else {
                    images += '<div class="slick-carousel__item"><div class="edit_variant-images__item" data-media-id=' + media.id + '><img class="img-fluid" alt="' + product.title + '" src="' + media.src + '" /></div></div>';
                  }
                }
              }
              images += "</div>";
            }
            qvObject.variantID = currentVariant.id;
            qvObject.sku = currentVariant.sku !== null && currentVariant.sku !== "" ? currentVariant.sku : "N/A";
            qvObject.images = images;
            qvObject.title = product.title;
            qvObject.qty = qty;
            qvObject.line = line;
            qvObject.url = product.url;
            price += '<div class="price-container">';
            var productCompareClass = product.compare_at_price !== null ? "" : "d-none";
            price += '<div class="js-edit_variant-product-price-compare product-single__price--compare-at ' + productCompareClass + '">' + wpbingo.Currency.formatMoney(product.compare_at_price, moneyFormat2) + "</div>";
            price += '<div class="js-edit_variant-product-price product-single__price">' + wpbingo.Currency.formatMoney(product.price, moneyFormat2) + "</div>";
            price += '</div">';
            qvObject.price = price;
            qvObject.variants = this.buildVariant(product, id_variant);
            $(selectors2.EditVariantContainer).html(template(qvObject));
            this.updateMedia(currentVariant);
            this.updateDetailsLink(currentVariant);
            $("#form-edit_variants-addtocart .btn--add-to-cart").on("click", function (e) {
              e.preventDefault();
              var $parent = $(this).closest(".product-edit_variants");
              $(this).removeClass("added");
              $(this).addClass("active");
              var addToCartForm = document.querySelector("#form-edit_variants-addtocart");
              var formData = new FormData(addToCartForm);
              var params = {
                type: "POST",
                url: "/cart/add.js",
                data: formData,
                processData: false,
                contentType: false,
                dataType: "json",
                success: function success(cart) {
                  var line2 = $parent.data("line") + 1;
                  $("#form-edit_variants-addtocart .btn--add-to-cart").removeClass("active");
                  $("#form-edit_variants-addtocart .btn--add-to-cart").addClass("added");
                  setTimeout(function () {
                    $("#form-edit_variants-addtocart .btn--add-to-cart").removeClass("added");
                  }, 2e3);
                  ShopifyAPI.changeItem(line2, 0);
                  setTimeout(function () {
                    ajaxCart.load();
                  }, 300);
                  if ($("body").hasClass("template-cart")) {
                    setTimeout(function () {
                      ajaxCartPage.load();
                    }, 300);
                  }
                  setTimeout(function () {
                    if ($(window).width() < 767) {
                      $(selectors2.EditVariant).removeClass("is-visible");
                      $("body").removeClass("editv_overlay-layer");
                      setTimeout(function () {
                        $("[data-edit_variant-cart-container]").empty();
                      }, 300);
                    } else {
                      $(selectors2.EditVariant).removeClass("is-visible");
                      setTimeout(function () {
                        $(selectors2.EditVariant).removeClass("transform");
                      }, 500);
                      setTimeout(function () {
                        $("body").removeClass("editv_overlay-layer");
                        $("[data-edit_variant-cart-container]").empty();
                      }, 700);
                    }
                  }, 500);
                },
                error: function error(XMLHttpRequest2, textStatus) {
                  if (typeof errorCallback === "function") {
                    errorCallback(XMLHttpRequest2, textStatus);
                  } else {
                    ShopifyAPI.onError(XMLHttpRequest2, textStatus);
                  }
                }
              };
              jQuery.ajax(params);
            });
            if ($(".bwp_currency").length > 0) {
              Currency.Currency_customer(true);
            }
          },
          convertToSlug: function convertToSlug(str) {
            return str.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
          },
          buildVariant: function buildVariant(product, id_variant) {
            var result = "";
            var currentVariant = this.currentVariant;
            for (var key in product.variants) {
              if (id_variant == product.variants[key].id) {
                var currentVariant = product.variants[key];
              }
            }
            if (product.options[0].name !== "Title") {
              var options = product.options;
              for (var i = 0; i < options.length; i++) {
                var option = options[i];
                var optionIndex = i + 1;
                var type = "label";
                if (wpbingo.settings.filter_name_1 === option.name) {
                  type = wpbingo.settings.select_filter_1;
                } else if (wpbingo.settings.filter_name_2 === option.name) {
                  type = wpbingo.settings.select_filter_2;
                } else if (wpbingo.settings.filter_name_3 === option.name) {
                  type = wpbingo.settings.select_filter_3;
                }
                result += '<div class="variants-wrapper product-form__item ' + type + '" data-edit_variants-variant-option="' + optionIndex + '">';
                result += '<label class="variants__label">' + option.name + ": <span></span></label>";
                result += '<div class="variants__options">';
                for (var j = 0; j < option.values.length; j++) {
                  var value = option.values[j];
                  var isDisable = true;
                  var colorAttribute = "";
                  for (var k = 0; k < this.productVariants.length; k++) {
                    var variantCondition = this.productVariants[k];
                    if (variantCondition.available) {
                      if (i == 0 && variantCondition.option1 === value) {
                        isDisable = false;
                        break;
                      } else if (i == 1 && variantCondition.option2 === value && variantCondition.option1 == currentVariant.option1) {
                        isDisable = false;
                        break;
                      } else if (i == 2 && variantCondition.option3 === value && variantCondition.option2 == currentVariant.option2 && variantCondition.option1 == currentVariant.option1) {
                        isDisable = false;
                        break;
                      }
                    }
                  }
                  result += '<div class="single-option-selector">';
                  result += '<input type="radio" data-single-option-button';
                  result += currentVariant.options[i] === value ? " checked " : " ";
                  if (isDisable) {
                    result += 'disabled="disabled"';
                  }
                  result += 'value="' + _.escape(value) + '" data-index="option' + optionIndex + '" name="option' + option.position + '" ';
                  result += 'class="js-edit_variant-option-selector';
                  if (isDisable) {
                    result += " disabled";
                  }
                  result += '" id="edit_variants-product-option-' + i + "-" + value.toLowerCase() + '">';
                  result += '<label class="' + value + '" data-toggle="tooltip" title="' + value + '" for="edit_variants-product-option-' + i + "-" + value.toLowerCase() + '" ' + colorAttribute;
                  if (isDisable) {
                    result += ' class="disabled"';
                  }
                  result += ">" + value + '<span class="tool-tip">' + value + "</span></label>";
                  result += "</div>";
                }
                result += "</div>";
                result += "</div>";
              }
            }
            return result;
          },
          createImageCarousel: function createImageCarousel(product) {
            if (product.media.length > 1) {
              $(selectors2.EditVariant).find(selectors2.EditVariantImages).slick({
                infinite: false,
                rows: 0,
                fade: true,
                rtl: wpbingo.rtl_slick()
              });
            }
          },
          getCurrentOptions: function getCurrentOptions() {
            var currentOptions = _.map($(selectors2.EditVariantVariant, selectors2.EditVariantContainer), function (element) {
              var $element2 = $(element);
              var type = $element2.attr("type");
              var currentOption = {};
              if (type === "radio" || type === "checkbox") {
                if ($element2[0].checked) {
                  currentOption.value = $element2.val();
                  currentOption.index = $element2.data("index");
                  return currentOption;
                } else {
                  return false;
                }
              } else {
                currentOption.value = $element2.val();
                currentOption.index = $element2.data("index");
                return currentOption;
              }
            });
            currentOptions = _.compact(currentOptions);
            return currentOptions;
          },
          getVariantFromOptions: function getVariantFromOptions() {
            var selectedValues = this.getCurrentOptions();
            var variants = this.productVariants;
            var found = _.find(variants, function (variant) {
              return selectedValues.every(function (values) {
                return _.isEqual(variant[values.index], values.value);
              });
            });
            return found;
          },
          updateVariantsButton: function updateVariantsButton() {
            var selectedValues = this.getCurrentOptions();
            var variants = this.productVariants;
            for (var i = 2; i <= 3; i++) {
              if ($('[data-edit_variants-variant-option="' + i + '"]', selectors2.EditVariantContainer).length) {
                $('[data-edit_variants-variant-option="' + i + '"] ' + selectors2.EditVariantVariant, selectors2.EditVariantContainer).each(function () {
                  var $self = $(this);
                  var optionValue = $self.val();
                  var foundIndex;
                  if (i === 2) {
                    foundIndex = _.findIndex(variants, function (variant) {
                      variant.option1 = variant.option1.toString();
                      selectedValues[0].value = selectedValues[0].value.toString();
                      variant.option2 = variant.option2.toString();
                      optionValue = optionValue.toString();
                      return variant.option1 === selectedValues[0].value && variant.option2 === optionValue && variant.available === true;
                    });
                  } else if (i === 3) {
                    foundIndex = _.findIndex(variants, function (variant) {
                      variant.option1 = variant.option1.toString();
                      variant.option2 = variant.option2.toString();
                      variant.option3 = variant.option3.toString();
                      selectedValues[0].value = selectedValues[0].value.toString();
                      selectedValues[1].value = selectedValues[1].value.toString();
                      optionValue = optionValue.toString();
                      return variant.option1 === selectedValues[0].value && variant.option2 === selectedValues[1].value && variant.option3 === optionValue && variant.available === true;
                    });
                  }
                  if (foundIndex !== -1) {
                    $self.removeAttr("disabled", "disabled").removeClass("disabled");
                    $self.next("label").removeClass("disabled");
                  } else {
                    $self.attr("disabled", "disabled").addClass("disabled");
                    $self.next("label").addClass("disabled");
                  }
                });
              }
            }
          },
          updateVariantsButtonDisabed: function updateVariantsButtonDisabed() {
            for (var i = 2; i <= 3; i++) {
              if ($('[data-edit_variants-variant-option="' + i + '"]', selectors2.EditVariantContainer).length) {
                var isUpdate = false;
                $('[data-edit_variants-variant-option="' + i + '"] ' + selectors2.EditVariantVariant, selectors2.EditVariantContainer).each(function () {
                  var $element2 = $(this);
                  var type = $element2.attr("type");
                  if (type === "radio" || type === "checkbox") {
                    if (this.checked && $element2.hasClass("disabled")) {
                      $element2.prop("checked", false);
                      isUpdate = true;
                      return false;
                    }
                  }
                });
                $('[data-edit_variants-variant-option="' + i + '"] ' + selectors2.EditVariantVariant, selectors2.EditVariantContainer).each(function () {
                  var $element2 = $(this);
                  var type = $element2.attr("type");
                  if (isUpdate && (type === "radio" || type === "checkbox") && !$element2.hasClass("disabled")) {
                    $element2.prop("checked", true);
                    isUpdate = false;
                    $element2.trigger("change");
                    return false;
                  }
                });
              }
            }
          },
          updateMasterSelect: function updateMasterSelect(variant) {
            if (variant) {
              $(selectors2.originalSelectorId, selectors2.EditVariantContainer).val(variant.id);
            }
          },
          updateLabelvariant: function updateLabelvariant(variant) {
            var $element2 = $(".edit_variant-cart-container .content_product_detail .variants-wrapper");
            $($element2).each(function () {
              var $this = $(this);
              var value = $("input:checked", $this).attr("value");
              $(".variants__label span", $this).html(value);
            });
          },
          updateMedia: function updateMedia(variant) {
            if (variant && variant.featured_media && variant.featured_media.id) {
              $(".slick-carousel__item", selectors2.EditVariantContainer).removeClass("show");
              $(selectors2.EditVariantImages, selectors2.EditVariantContainer).find(".edit_variant-images__item").each(function () {
                var imageID = $(this).data("media-id");
                if (variant.featured_media.id == imageID) {
                  $(this).closest(".slick-carousel__item").addClass("show");
                  var slickIndex = $(this).closest(".slick-carousel__item").data("slick-index");
                  if (slickIndex !== void 0 && slickIndex !== null) {
                    $(selectors2.EditVariantImages, selectors2.EditVariantContainer).slick("slickGoTo", slickIndex);
                  }
                }
              });
            }
          },
          updatePrice: function updatePrice(variant) {
            var moneyFormat2 = wpbingo.strings.moneyFormat;
            if (!variant) {
              $(selectors2.EditVariantProductPrice, selectors2.EditVariantContainer).addClass("d-none");
              $(selectors2.EditVariantProductPriceCompare, selectors2.EditVariantContainer).addClass("d-none");
            } else {
              $(selectors2.EditVariantProductPrice, selectors2.EditVariantContainer).removeClass("d-none");
              $(selectors2.EditVariantProductPriceCompare, selectors2.EditVariantContainer).removeClass("d-none");
              $(selectors2.EditVariantProductPrice, selectors2.EditVariantContainer).html(wpbingo.Currency.formatMoney(variant.price, moneyFormat2));
              if (variant.compare_at_price > variant.price) {
                $(selectors2.EditVariantProductPriceCompare, selectors2.EditVariantContainer).html(wpbingo.Currency.formatMoney(variant.compare_at_price, moneyFormat2)).removeClass("d-none");
                $(selectors2.EditVariantProductPrice, selectors2.EditVariantContainer).addClass("on-sale");
              } else {
                $(selectors2.EditVariantProductPriceCompare, selectors2.EditVariantContainer).addClass("d-none");
                $(selectors2.EditVariantProductPrice, selectors2.EditVariantContainer).removeClass("on-sale");
              }
            }
            if ($(".bwp_currency").length > 0) {
              Currency.Currency_customer(true);
            }
          },
          updateProductAvaiable: function updateProductAvaiable(variant) {
            var classActive = "product-avaiable--active";
            var translations = wpbingo.strings;
            $(selectors2.EditVariantAvaiable, selectors2.EditVariantContainer).removeClass(classActive);
            if (variant) {
              if (variant.available) {
                $(selectors2.EditVariantQty, selectors2.EditVariantContainer).removeClass("d-none");
                $(selectors2.EditVariantAvaiableInStock, selectors2.EditVariantContainer).addClass(classActive);
              } else {
                $(selectors2.EditVariantQty, selectors2.EditVariantContainer).addClass("d-none");
                $(selectors2.EditVariantAvaiableOutStock, selectors2.EditVariantContainer).addClass(classActive);
              }
              if (variant.available) {
                $(selectors2.EditVariantContainer).find(".btn--add-to-cart").removeClass("disabled").prop("disabled", false);
                $(selectors2.EditVariantContainer).find(".btn--add-to-cart .btn__text").html(translations.addToCart);
              } else {
                $(selectors2.EditVariantContainer).find(".btn--add-to-cart").addClass("disabled").prop("disabled", true);
                $(selectors2.EditVariantContainer).find(".btn--add-to-cart .btn__text").html(translations.soldOut);
              }
            } else {
              $(selectors2.EditVariantQty, selectors2.EditVariantContainer).addClass("d-none");
              $(selectors2.EditVariantContainer).find(".btn--add-to-cart").addClass("disabled").prop("disabled", true);
              $(selectors2.EditVariantContainer).find(".btn--add-to-cart .btn__text").html(translations.unavailable);
            }
          },
          updateDetailsLink: function updateDetailsLink(variant) {
            if (variant) {
              var productURL = $(selectors2.EditVariantDetailsURL, selectors2.EditVariantContainer).data("url") + "?variant=" + variant.id;
              $(selectors2.EditVariantDetailsURL, selectors2.EditVariantContainer).removeClass("d-none").attr("href", productURL);
            } else {
              $(selectors2.EditVariantDetailsURL, selectors2.EditVariantContainer).addClass("d-none");
            }
          },
          onVariantChange: function onVariantChange(id_variant) {
            var variant = this.getVariantFromOptions();
            if ($("[data-single-option-button]", selectors2.EditVariantContainer).length) {
              this.updateVariantsButton();
              if (!variant || !variant.available) {
                this.updateVariantsButtonDisabed();
                return;
              }
            }
            setTimeout(function () {
              if (variant.id != id_variant) {
                $(".btn--add-to-cart", selectors2.EditVariantContainer).prop("disabled", false);
              } else {
                $(".btn--add-to-cart", selectors2.EditVariantContainer).prop("disabled", true);
              }
            }, 100);
            this.updateMasterSelect(variant);
            this.updateLabelvariant(variant);
            this.updateMedia(variant);
            this.updatePrice(variant);
            this.updateProductAvaiable(variant);
            this.updateDetailsLink(variant);
            this.currentVariant = variant;
          }
        });
        return EditVariant;
      }();
      var ajaxCartPage = function (module2, $2) {
        "use strict";

        var init2, loadCart2;
        var settings2, isUpdating2, $body2;
        var $formContainer2, $cartCountSelector2, $cartCostSelector2, $cartContainer2;
        var initializeEvents2, updateCountPrice2, itemAddedCallback2, itemErrorCallback2, cartUpdateCallback2, buildCart2, cartCallback2, adjustCart2, adjustCartCallback2, validateQty2;
        init2 = function init2(options) {
          settings2 = {
            cartContainer: "[data-cartpage-container]",
            cartCostSelector: ".cart-total__subtotal-price",
            cartRemoveSelector: ".cart-product-info__btn--remove",
            moneyFormat: "${{amount}}",
            disableAjaxCart: false,
            cartTemplate: "#cart-form-template"
          };
          if (wpbingo.strings.moneyFormat !== void 0) {
            settings2.moneyFormat = wpbingo.strings.moneyFormat;
          }
          $2.extend(settings2, options);
          $cartContainer2 = $2(settings2.cartContainer);
          $cartCostSelector2 = $2(settings2.cartCostSelector);
          $body2 = $2("body");
          isUpdating2 = false;
          initializeEvents2();
          adjustCart2();
        };
        initializeEvents2 = function initializeEvents2() {
          $body2.on("click", settings2.cartRemoveSelector, function (e) {
            e.preventDefault();
            if (isUpdating2) {
              return;
            }
            var $el = $2(this),
              line = $el.data("line");
            if (line) {
              $2('.item-cart[data-line="' + line + '"]').addClass("is-loading");
              isUpdating2 = true;
              setTimeout(function () {
                ShopifyAPI.changeItem(line, 0, adjustCartCallback2);
              }, 250);
            }
          });
        };
        loadCart2 = function loadCart2() {
          ShopifyAPI.getCart(cartUpdateCallback2);
        };
        updateCountPrice2 = function updateCountPrice2(cart) {
          if ($cartCostSelector2) {
            $cartCostSelector2.html(wpbingo.Currency.formatMoney(cart.total_price, settings2.moneyFormat));
          }
        };
        cartUpdateCallback2 = function cartUpdateCallback2(cart, added) {
          updateCountPrice2(cart);
          buildCart2(cart);
          if (cart.item_count > 0) {
            $2(".page-cart .content-cart_page").removeClass("hidden");
            $2(".page-cart .page-cart__header").removeClass("hidden");
            $2(".page-cart .page-cart-empty").addClass("hidden");
          } else {
            $2(".page-cart .content-cart_page").addClass("hidden");
            $2(".page-cart .page-cart__header").addClass("hidden");
            $2(".page-cart .page-cart-empty").removeClass("hidden");
          }
        };
        buildCart2 = function buildCart2(cart, edit_variant) {
          $cartContainer2.empty();
          if (cart.item_count === 0) {
            $cartContainer2.append('<p class="cart-empty-message">' + wpbingo.strings.cartEmpty + '</p>\n<p class="cookie-message">' + wpbingo.strings.cartCookies + "</p>");
            cartCallback2(cart);
            $2(".js-drawer .drawer__title .count").text("0");
            $2(".shipping-bar-cart").addClass("hidden");
            return;
          }
          var items = [],
            item = {},
            data2 = {},
            source = $2(settings2.cartTemplate).html();
          var template = Handlebars.compile(source);
          $2.each(cart.items, function (index, cartItem) {
            var prodImg2;
            var unitPrice = null;
            var disabled = "";
            var variant_id = cartItem.variant_id;
            var count = $2('#count_quantity [data-variant_id="' + variant_id + '"]').data("count_quantity");
            if (cartItem.quantity == count) {
              disabled = "disabled";
            }
            if (cartItem.image !== null) {
              prodImg2 = cartItem.image.replace(/(\.[^.]*)$/, "_120x$1").replace("http:", "");
            } else {
              prodImg2 = "//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif";
            }
            if (cartItem.properties !== null) {
              $2.each(cartItem.properties, function (key, value) {
                if (key.charAt(0) === "_" || !value) {
                  delete cartItem.properties[key];
                }
              });
            }
            if (cartItem.properties !== null) {
              $2.each(cartItem.properties, function (key, value) {
                if (key.charAt(0) === "_" || !value) {
                  delete cartItem.properties[key];
                }
              });
            }
            if (cartItem.line_level_discount_allocations.length !== 0) {
              for (var discount in cartItem.line_level_discount_allocations) {
                var amount = cartItem.line_level_discount_allocations[discount].amount;
                cartItem.line_level_discount_allocations[discount].formattedAmount = wpbingo.Currency.formatMoney(amount, settings2.moneyFormat);
              }
            }
            if (cart.cart_level_discount_applications.length !== 0) {
              for (var cartDiscount in cart.cart_level_discount_applications) {
                var cartAmount = cart.cart_level_discount_applications[cartDiscount].total_allocated_amount;
                cart.cart_level_discount_applications[cartDiscount].formattedAmount = wpbingo.Currency.formatMoney(cartAmount, settings2.moneyFormat);
              }
            }
            if (cartItem.unit_price_measurement) {
              unitPrice = {
                addRefererenceValue: cartItem.unit_price_measurement.reference_value !== 1,
                price: wpbingo.Currency.formatMoney(cartItem.unit_price, settings2.moneyFormat),
                reference_value: cartItem.unit_price_measurement.reference_value,
                reference_unit: cartItem.unit_price_measurement.reference_unit
              };
            }
            item = {
              key: cartItem.key,
              line: index + 1,
              // Shopify uses a 1+ index in the API
              url: cartItem.url,
              img: prodImg2,
              name: cartItem.product_title,
              variation: cartItem.variant_title,
              variant: cartItem.variant_title === null ? false : true,
              options: cartItem.options_with_values,
              variant_id: cartItem.variant_id,
              price: wpbingo.Currency.formatMoney(cartItem.price, settings2.moneyFormat),
              discountprice: wpbingo.Currency.formatMoney(cartItem.original_line_price, settings2.moneyFormat),
              finalPrice: wpbingo.Currency.formatMoney(cartItem.final_line_price, settings2.moneyFormat),
              handle: cartItem.handle,
              properties: cartItem.properties,
              itemAdd: cartItem.quantity + 1,
              itemMinus: cartItem.quantity - 1,
              itemQty: cartItem.quantity,
              discounts: cartItem.line_level_discount_allocations,
              discountsApplied: cartItem.line_level_discount_allocations.length === 0 ? false : true,
              vendor: cartItem.vendor,
              unitPrice: unitPrice,
              disabled: disabled
            };
            items.push(item);
            wpbingo.discount_single();
          });
          data2 = {
            items: items,
            note: cart.note,
            totalPrice: wpbingo.Currency.formatMoney(cart.total_price, settings2.moneyFormat),
            cartDiscounts: cart.cart_level_discount_applications,
            cartDiscountsApplied: cart.cart_level_discount_applications.length === 0 ? false : true
          };
          $cartContainer2.append(template(data2));
          cartCallback2(cart);
          $2(".shipping-bar-cart").removeClass("hidden");
          if ($2(".shipping-bar-cart").length) {
            var price_shipping_bar = $2(".shipping-bar-cart").data("price_shipping_bar");
            if (price_shipping_bar > cart.total_price && price_shipping_bar != 0) {
              var minus_spend = price_shipping_bar - cart.total_price;
              var spend = wpbingo.Currency.formatMoney(minus_spend, settings2.moneyFormat);
              var percent = cart.total_price / price_shipping_bar * 100;
              $2(".shipping-bar-cart .title-spend .spend").html(spend);
              $2(".shipping-bar-cart .shipping-progress").css("width", percent + "%");
              $2(".shipping-bar-cart .title-shipping").addClass("hide");
              $2(".shipping-bar-cart .title-spend").removeClass("hide");
              $2(".shipping-bar-cart").removeClass("full");
              $2(".shipping-bar-cart .shipping-progress").removeClass("fire-done");
              $2("#fire_work").addClass("hide");
            } else {
              $2(".shipping-bar-cart .title-shipping").removeClass("hide");
              $2(".shipping-bar-cart .title-spend").addClass("hide");
              $2(".shipping-bar-cart .shipping-progress").css("width", "100%");
              $2(".shipping-bar-cart").addClass("full");
              if (!$2(".shipping-bar-cart .shipping-progress").hasClass("fire-done")) {
                $2(".shipping-bar-cart .shipping-progress").addClass("fire");
              }
              if ($2(".shipping-bar-cart .shipping-progress").hasClass("fire")) {
                $2("#fire_work").removeClass("hide");
                confettiLoop();
              }
              setTimeout(function () {
                $2(".shipping-bar-cart .shipping-progress").addClass("fire-done");
                $2(".shipping-bar-cart .shipping-progress").removeClass("fire");
              }, 100);
              setTimeout(function () {
                $2("#fire_work").addClass("hide");
              }, 5e3);
            }
          }
          $2(".page-cart .pre_order-cart >span").each(function () {
            var id = $2(this).data("handle");
            for (var i in data2.items) {
              if (data2.items[i].variant_id == id) {
                $2('.page-cart .item-cart[data-line="' + data2.items[i].line + '"] .pre_order').removeClass("hidden");
              }
            }
          });
          if ($2(".bwp_currency").length > 0) {
            Currency.Currency_customer(true);
          }
        };
        cartCallback2 = function cartCallback2(cart) {
          if (window.Shopify && Shopify.StorefrontExpressButtons) {
            Shopify.StorefrontExpressButtons.initialize();
          }
        };
        adjustCart2 = function adjustCart2() {
          $body2.on("click", "#cart-form .ajaxcart__qty-adjust", function () {
            if (isUpdating2) {
              return;
            }
            var $el = $2(this),
              line = $el.data("line"),
              $qtySelector = $el.siblings(".ajaxcart__qty-num"),
              qty = parseInt($qtySelector.val().replace(/\D/g, ""));
            qty = validateQty2(qty);
            if ($el.hasClass("ajaxcart__qty--plus")) {
              qty += 1;
            } else {
              qty -= 1;
              if (qty <= 0) qty = 0;
            }
            if (line) {
              updateQuantity(line, qty);
            } else {
              $qtySelector.val(qty);
            }
          });
          $body2.on("change", "#cart-form .ajaxcart__qty-num", function () {
            if (isUpdating2) {
              return;
            }
            var id = $2(this).data("variant_id");
            var count = $2('#count_quantity [data-variant_id="' + id + '"]').data("count_quantity");
            var $el = $2(this),
              line = $el.data("line"),
              qty = parseInt($el.val().replace(/\D/g, ""));
            qty = validateQty2(qty);
            if (qty >= count) {
              qty = count;
              $el.val(qty);
            }
            if (line) {
              updateQuantity(line, qty);
            }
          });
          $body2.on("submit", "#cart-form ", function (evt) {
            if (isUpdating2) {
              evt.preventDefault();
            }
          });
          $body2.on("focus", "#cart-form .ajaxcart__qty-adjust", function () {
            var $el = $2(this);
            setTimeout(function () {
              $el.select();
            }, 50);
          });
          function updateQuantity(line, qty) {
            isUpdating2 = true;
            var $row = $2('#cart-form .item-cart[data-line="' + line + '"]').addClass("is-loading");
            if (qty === 0) {
              $row.parent().addClass("is-removed");
            }
            setTimeout(function () {
              ShopifyAPI.changeItem(line, qty, adjustCartCallback2);
            }, 250);
          }
        };
        adjustCartCallback2 = function adjustCartCallback2(cart) {
          updateCountPrice2(cart);
          ajaxCart.load();
          setTimeout(function () {
            ShopifyAPI.getCart(buildCart2);
            isUpdating2 = false;
            if (cart.item_count > 0) {
              $2(".page-cart .content-cart_page").removeClass("hidden");
              $2(".page-cart .page-cart__header").removeClass("hidden");
              $2(".page-cart .page-cart-empty").addClass("hidden");
            } else {
              $2(".page-cart .content-cart_page").addClass("hidden");
              $2(".page-cart .page-cart__header").addClass("hidden");
              $2(".page-cart .page-cart-empty").removeClass("hidden");
            }
          }, 150);
        };
        validateQty2 = function validateQty2(qty) {
          if (parseFloat(qty) === parseInt(qty) && !isNaN(qty)) {} else {
            qty = 1;
          }
          return qty;
        };
        module2 = {
          init: init2,
          load: loadCart2
        };
        return module2;
      }(ajaxCartPage || {}, jQuery);
      wpbingo.ajax_cartpage = function () {
        if ($("body").hasClass("template-cart")) {
          ajaxCartPage.init();
          ajaxCartPage.load();
        }
      };
      wpbingo.ajax_blogpage = function () {
        var _ajaxBreadcrumbs, _ajaxPaging, _ajaxPagingportfolio, _ajaxLoadMore, _ajaxLoadMoreportfolio, _ajaxSidebar;
        var init2 = function init2() {
          _ajaxPaging();
          _ajaxPagingportfolio();
          _ajaxLoadMore();
          _ajaxLoadMoreportfolio();
          _ajaxBreadcrumbs();
          _ajaxSidebar();
        };
        _ajaxLoadMore = function ajaxLoadMore() {
          if ($(".page-blog .pagination-ajax-blog-loadmore").length) {
            $(".page-blog .pagination-ajax-blog-loadmore").on("click", "a", function (e) {
              e.preventDefault();
              var pageURL = $(this).attr("href");
              var newTitle = $(this).attr("title");
              var URL_array = $(this).attr("href").match(/page=\d+/g);
              var curret = parseInt(URL_array[0].match(/\d+/g));
              $(this).addClass("active");
              $("#pre-loading").addClass("load-product");
              $("#pre-loading .pre-loading__bar").css({
                "width": "40%"
              });
              var offset = $(this).offset().top;
              if (pageURL) {
                $.ajax({
                  type: "get",
                  url: pageURL,
                  success: function success(data2) {
                    document.title = newTitle;
                    $(".page-blog .article__list").append($(data2).find(".page-blog .article__list").html());
                    $(".page-blog .pagination-ajax-blog-loadmore").replaceWith($(data2).find(".page-blog .pagination-ajax-blog-loadmore"));
                    $("#pre-loading .pre-loading__bar").css({
                      "width": "100%"
                    });
                    $("body,html").animate({
                      scrollTop: offset
                    }, 600);
                    setTimeout(function () {
                      $("#pre-loading .pre-loading__bar").css({
                        "width": "0"
                      });
                      $("#pre-loading").removeClass("load-product");
                    }, 500);
                    _ajaxBreadcrumbs();
                    _ajaxSidebar();
                    _ajaxLoadMore();
                    wpbingo.christmas_snow();
                    $(this).removeClass("active");
                  },
                  error: function error(xhr, text) {
                    console.log(text);
                  }
                });
              }
            });
          }
        };
        _ajaxPaging = function ajaxPaging() {
          if ($(".page-blog .pagination-ajax-blog").length) {
            $(".page-blog .pagination-ajax-blog").on("click", "a", function (e) {
              e.preventDefault();
              var pageURL = $(this).attr("href");
              var newTitle = $(this).closest(".pagination-ajax-blog").attr("title");
              History.pushState({
                param: Shopify.queryParams
              }, pageURL, pageURL);
              $("#pre-loading").addClass("load-product");
              $("#pre-loading .pre-loading__bar").css({
                "width": "40%"
              });
              if (pageURL) {
                $.ajax({
                  type: "get",
                  url: pageURL,
                  success: function success(data2) {
                    document.title = newTitle;
                    $(".page-blog").replaceWith($(data2).find(".page-blog"));
                    $("body,html").animate({
                      scrollTop: $(".header").height() + $(".wpbingo-breadcrumbs").height()
                    }, 600);
                    $("#pre-loading .pre-loading__bar").css({
                      "width": "100%"
                    });
                    setTimeout(function () {
                      $("#pre-loading .pre-loading__bar").css({
                        "width": "0"
                      });
                      $("#pre-loading").removeClass("load-product");
                    }, 500);
                    _ajaxBreadcrumbs();
                    _ajaxSidebar();
                    _ajaxPaging();
                  },
                  error: function error(xhr, text) {
                    console.log(text);
                  }
                });
              }
            });
          }
          ;
        };
        _ajaxLoadMoreportfolio = function ajaxLoadMoreportfolio() {
          if ($(".page-portfolio .pagination-ajax-blog-loadmore").length) {
            $(".page-portfolio .pagination-ajax-blog-loadmore").on("click", "a", function (e) {
              e.preventDefault();
              var pageURL = $(this).attr("href");
              var newTitle = $(this).attr("title");
              var URL_array = $(this).attr("href").match(/page=\d+/g);
              var curret = parseInt(URL_array[0].match(/\d+/g));
              $(this).addClass("active");
              $("#pre-loading").addClass("load-product");
              $("#pre-loading .pre-loading__bar").css({
                "width": "40%"
              });
              if (pageURL) {
                $.ajax({
                  type: "get",
                  url: pageURL,
                  success: function success(data2) {
                    document.title = newTitle;
                    $(".page-portfolio .article__list").append($(data2).find(".page-portfolio .article__list").html());
                    $(".page-portfolio .pagination-ajax-blog-loadmore").replaceWith($(data2).find(".page-portfolio .pagination-ajax-blog-loadmore"));
                    $("#pre-loading .pre-loading__bar").css({
                      "width": "100%"
                    });
                    setTimeout(function () {
                      $("#pre-loading .pre-loading__bar").css({
                        "width": "0"
                      });
                      $("#pre-loading").removeClass("load-product");
                    }, 500);
                    _ajaxBreadcrumbs();
                    _ajaxLoadMoreportfolio();
                    wpbingo.christmas_snow();
                    $(this).removeClass("active");
                  },
                  error: function error(xhr, text) {
                    console.log(text);
                  }
                });
              }
            });
          }
        };
        _ajaxPagingportfolio = function ajaxPagingportfolio() {
          if ($(".page-portfolio .pagination-ajax-blog").length) {
            $(".page-portfolio .pagination-ajax-blog").on("click", "a", function (e) {
              e.preventDefault();
              var pageURL = $(this).attr("href");
              var newTitle = $(this).closest(".pagination-ajax-blog").attr("title");
              History.pushState({
                param: Shopify.queryParams
              }, pageURL, pageURL);
              $("#pre-loading").addClass("load-product");
              $("#pre-loading .pre-loading__bar").css({
                "width": "40%"
              });
              if (pageURL) {
                $.ajax({
                  type: "get",
                  url: pageURL,
                  success: function success(data2) {
                    document.title = newTitle;
                    $(".page-portfolio").replaceWith($(data2).find(".page-portfolio"));
                    $("body,html").animate({
                      scrollTop: $(".header").height() + $(".wpbingo-breadcrumbs").height()
                    }, 600);
                    $("#pre-loading .pre-loading__bar").css({
                      "width": "100%"
                    });
                    setTimeout(function () {
                      $("#pre-loading .pre-loading__bar").css({
                        "width": "0"
                      });
                      $("#pre-loading").removeClass("load-product");
                    }, 500);
                    _ajaxBreadcrumbs();
                    _ajaxPagingportfolio();
                  },
                  error: function error(xhr, text) {
                    console.log(text);
                  }
                });
              }
            });
          }
          ;
        };
        _ajaxBreadcrumbs = function ajaxBreadcrumbs() {
          if ($(".wpbingo-breadcrumbs .wpbingo-blog-list").length) {
            var $categories_blog = $(".wpbingo-blog-list");
            $($categories_blog).on("click", "a", function (e) {
              e.preventDefault();
              var pageURL = $(this).attr("href");
              var newTitle = $(this).attr("title");
              $(this).closest(".item-blog").addClass("active");
              History.pushState({
                param: Shopify.queryParams
              }, pageURL, pageURL);
              delete Shopify.queryParams.page;
              $("#pre-loading").addClass("load-product");
              $("#pre-loading .pre-loading__bar").css({
                "width": "40%"
              });
              $.ajax({
                type: "get",
                url: pageURL,
                success: function success(data2) {
                  document.title = newTitle;
                  $(".page-blog").replaceWith($(data2).find(".page-blog"));
                  $(".page-portfolio").replaceWith($(data2).find(".page-portfolio"));
                  $(".wpbingo-breadcrumbs .wpbingo-blog-list").replaceWith($(data2).find(".wpbingo-breadcrumbs .wpbingo-blog-list"));
                  $("#pre-loading .pre-loading__bar").css({
                    "width": "100%"
                  });
                  setTimeout(function () {
                    $("#pre-loading .pre-loading__bar").css({
                      "width": "0"
                    });
                    $("#pre-loading").removeClass("load-product");
                  }, 500);
                  _ajaxBreadcrumbs();
                  _ajaxSidebar();
                  _ajaxPaging();
                  _ajaxPagingportfolio();
                  _ajaxLoadMore();
                  _ajaxLoadMoreportfolio();
                },
                error: function error(xhr, text) {
                  console.log(text);
                }
              });
              $("body,html").animate({
                scrollTop: $(".header").height() + $(".wpbingo-breadcrumbs").height()
              }, 600);
            });
          }
        };
        _ajaxSidebar = function ajaxSidebar() {
          if ($(".page-blog .blog-sidebar .list-category").length) {
            var $categories_blog = $(".blog-sidebar .list-category");
            $($categories_blog).on("click", "a", function (e) {
              e.preventDefault();
              var pageURL = $(this).attr("href");
              var newTitle = $(this).attr("title");
              $(this).closest("li").addClass("active");
              History.pushState({
                param: Shopify.queryParams
              }, pageURL, pageURL);
              delete Shopify.queryParams.page;
              $("#pre-loading").addClass("load-product");
              $("#pre-loading .pre-loading__bar").css({
                "width": "40%"
              });
              $.ajax({
                type: "get",
                url: pageURL,
                success: function success(data2) {
                  document.title = newTitle;
                  $(".page-blog").replaceWith($(data2).find(".page-blog"));
                  $(".wpbingo-breadcrumbs .wpbingo-blog-list").replaceWith($(data2).find(".wpbingo-breadcrumbs .wpbingo-blog-list"));
                  $("#pre-loading .pre-loading__bar").css({
                    "width": "100%"
                  });
                  setTimeout(function () {
                    $("#pre-loading .pre-loading__bar").css({
                      "width": "0"
                    });
                    $("#pre-loading").removeClass("load-product");
                  }, 500);
                  _ajaxBreadcrumbs();
                  _ajaxSidebar();
                  _ajaxPaging();
                  _ajaxLoadMore();
                },
                error: function error(xhr, text) {
                  console.log(text);
                }
              });
              $("body,html").animate({
                scrollTop: $(".header").height() + $(".wpbingo-breadcrumbs").height()
              }, 600);
            });
          }
        };
        return init2;
      }();
      wpbingo.checkbox_terms_conditions = function () {
        if ($(".ajaxcart_terms_conditions").length > 0) {
          if ($(".agree_terms_conditions").is(":checked")) {
            $('[name="checkout"], [name="goto_pp"], [name="goto_gc"]').prop("disabled", false);
          } else {
            $('[name="checkout"], [name="goto_pp"], [name="goto_gc"]').prop("disabled", true);
          }
          setTimeout(function () {
            if ($(".agree_terms_conditions").is(":checked")) {
              $('[data-shopify="payment-button"] button').prop("disabled", false);
            } else {
              $('[data-shopify="payment-button"] button').prop("disabled", true);
            }
          }, 1e3);
          $("body").on("click", ".agree_terms_conditions", function () {
            if ($(this).is(":checked")) {
              $("body").find(".agree_terms_conditions").each(function () {
                $(this).attr("checked", "checked");
              });
              $('[data-shopify="payment-button"] button, [name="checkout"], [name="goto_pp"], [name="goto_gc"]').prop("disabled", false);
            } else {
              $("body").find(".agree_terms_conditions").each(function () {
                $(this).removeAttr("checked");
              });
              $('[data-shopify="payment-button"] button, [name="checkout"], [name="goto_pp"], [name="goto_gc"]').prop("disabled", true);
            }
          });
          $(".content_terms_conditions [data-close-terms_conditions]").on("click", function (e) {
            $(".content_terms_conditions").removeClass("show");
            setTimeout(function () {
              $(".content_terms_conditions").removeClass("active");
            }, 300);
          });
          $(".ajaxcart_terms_conditions a").on("click", function (e) {
            e.preventDefault();
            $(".content_terms_conditions").addClass("active");
            setTimeout(function () {
              $(".content_terms_conditions").addClass("show");
            }, 300);
          });
        }
      };
      wpbingo.check_width_megamenu = function () {
        if ($(".menu-dropdown--mega.width_custom_pos").length > 0) {
          $(".menu-dropdown--mega.width_custom_pos .menu-dropdown__content--megamenu").each(function () {
            var left = $(this).offset().left;
            var width_left = $(this).width() + left;
            var $parent = $(this).closest(".width_custom_pos");
            if (width_left >= $(window).width()) {
              $parent.addClass("width_custom_pos_right");
            }
          });
        }
      };
      wpbingo.slick_mobile = function () {
        if ($(window).width() < 767) {
          $(".bwp-load-slick-mobile").each(function () {
            $(this).slick({
              infinite: true,
              slidesToShow: $(this).data("col1"),
              slidesToScroll: $(this).data("col1"),
              arrows: $(this).data("nav"),
              dots: $(this).data("dot"),
              autoplay: $(this).data("autoplay"),
              autoplaySpeed: 5e3,
              rtl: wpbingo.rtl_slick(),
              responsive: [{
                breakpoint: 480,
                settings: {
                  slidesToShow: $(this).data("col2"),
                  slidesToScroll: $(this).data("col2")
                }
              }]
            });
          });
        }
      };
      wpbingo.accordion_footer = function () {
        if ($(".footer-center").hasClass("accordion") && $(window).width() < 767) {
          $(".accordion .content-toggle").each(function () {
            var toggle = $(".footer-block", $(this));
            $(".title-footer", $(this)).on("click", function () {
              var $parent = $(this).closest(".content-toggle");
              $parent.toggleClass("active");
              toggle.slideToggle();
            });
          });
        }
      };
      wpbingo.product_tab = function () {
        if ($(".wpbingo-section--product-tabs-grid").length > 0) {
          $(".wpbingo-section--product-tabs-grid .product-tabs__nav-link").each(function () {
            $(this).on("click", function () {
              var $parent = $(this).closest(".menu-dropdown");
              var $text = $(this).text();
              $("span", $parent).text($text);
            });
          });
        }
      };
      wpbingo.banner_video = function () {
        if ($(".wpbingo-section--video").length > 0) {
          $(".wpbingo-section--video .button-video").each(function () {
            $(this).on("click", function () {
              var $parent = $(this).closest(".wpbingo-section--video");
              $(".video-wrapper", $parent).addClass("active");
              setTimeout(function () {
                $(".video-wrapper", $parent).addClass("show");
              }, 100);
            });
          });
          $(".wpbingo-section--video .close-video").each(function () {
            $(this).on("click", function () {
              var $parent = $(this).closest(".wpbingo-section--video");
              setTimeout(function () {
                $(".video-wrapper", $parent).removeClass("active");
              }, 300);
              $(".video-wrapper", $parent).removeClass("show");
            });
          });
        }
      };
      wpbingo.christmas_snow = function () {
        if ($(".frame-snow").length > 0) {
          var create_flake2 = function create_flake2() {
              var snow_flake = '<div class="snow" style="left:' + random_num1 + "%;transform:scale(" + random_num2 / 50 + "); animation-duration:" + random_num3 + 's">' + flake + "</div>";
              $(snow_flake).appendTo(".frame-snow");
            },
            destroy_flake2 = function destroy_flake2() {
              snow = $(".frame-snow .snow");
              snow.each(function () {
                snow_y = $(this).offset().top;
                snow_x = $(this).offset().left;
                if (snow_y > doc_height + 200) {
                  $(this).remove();
                }
                if (snow_x > doc_width + 200) {
                  $(this).remove();
                }
              });
            };
          var create_flake = create_flake2,
            destroy_flake = destroy_flake2;
          var flake = window.routes.svg_christmas;
          var random_num1, random_num2, random_num3, snow, snow_x, snow_y, doc_height, doc_width, interval, wind;
          doc_height = $(document).height();
          doc_width = $(document).width();
          wind = 0;
          $(window).resize(function () {
            doc_height = $(document).height();
            doc_width = $(document).width();
          });
          $(".frame-snow").css({
            "height": doc_height + "px"
          });
          interval = setInterval(function () {
            random_num1 = Math.round(Math.random() * 100);
            random_num2 = Math.round(Math.random() * 100);
            random_num3 = Math.floor(Math.random() * 30) + Math.round(doc_height / 1e3);
            create_flake2();
          }, 100);
          interval = setInterval(function () {
            doc_height = $(document).height();
            destroy_flake2();
          }, 10);
        }
      };
      wpbingo.address_delete = function () {
        $(".address-delete").on("click", function () {
          var $el = $(this);
          var target = $el.data("target");
          var confirmMessage = $el.data("confirm-message");
          if (confirm(confirmMessage || "Are you sure you wish to delete this address?")) {
            Shopify.postLink(target, {
              parameters: {
                _method: "delete"
              }
            });
          }
        });
      };
      wpbingo.change_head = function () {
        if (wpbingo.settings.show_come_back) {
          var change_in2 = function change_in2() {
            change_out1 = function change_out1() {};
            change_out2 = function change_out2() {};
            if ($("#before-you-leave").length > 0 && !$("#before-you-leave").hasClass("active") && !$("#before-you-leave").hasClass("hiden")) {
              $("#before-you-leave").addClass("hiden");
            }
            $(document).attr("title", title);
          };
          var change_in = change_in2;
          var title = $(document).attr("title");
          if ($("#before-you-leave").length > 0) {
            var data_time = $("#before-you-leave").data("time");
            var time = data_time * 60 * 1e3;
          }
          document.addEventListener("visibilitychange", function (event) {
            if (document.hidden) {
              change_out2 = function change_out2() {
                $(document).attr("title", wpbingo.strings.come_back);
                setTimeout(function () {
                  change_out1();
                }, 500);
              };
              change_out1 = function change_out1() {
                $(document).attr("title", wpbingo.strings.forget);
                setTimeout(function () {
                  change_out2();
                }, 500);
              };
              if ($("#before-you-leave").length > 0 && $("#before-you-leave").hasClass("hiden")) {
                $("#before-you-leave").removeClass("hiden");
              }
              setTimeout(function () {
                if ($("#before-you-leave").length > 0 && !$("#before-you-leave").hasClass("active") && !$("#before-you-leave").hasClass("hiden")) {
                  $("#before-you-leave").addClass("active");
                }
              }, time);
              change_out1();
            } else {
              change_in2();
            }
          });
        }
      };
      wpbingo.before_you_leave = function () {
        if ($("#before-you-leave").length > 0) {
          var data_time = $("#before-you-leave").data("time");
          var time = data_time * 60 * 1e3;
          $("#before-you-leave [data-close-you-leave]").on("click", function () {
            $("#before-you-leave").removeClass("active");
            $("#before-you-leave").addClass("hiden");
          });
          window.addEventListener("mouseover", function (event) {
            if ($("#before-you-leave").length > 0 && !$("#before-you-leave").hasClass("active") && !$("#before-you-leave").hasClass("hiden")) {
              $("#before-you-leave").addClass("hiden");
            }
          });
          window.addEventListener("blur", function (event) {
            if ($("#before-you-leave").length > 0 && $("#before-you-leave").hasClass("hiden")) {
              $("#before-you-leave").removeClass("hiden");
            }
            setTimeout(function () {
              if ($("#before-you-leave").length > 0 && !$("#before-you-leave").hasClass("active") && !$("#before-you-leave").hasClass("hiden")) {
                $("#before-you-leave").addClass("active");
              }
            }, time);
          });
        }
      };
      wpbingo.product_result_count = function () {
        if ($("#product_result_count").length > 0) {
          var $text = $("#product_result_count").text();
          $("#main-collection-filters .page-collection-header .product_result_count").html($text);
        }
      };
      wpbingo.search_form = function () {
        $(".close-search-form", $(".header__search-form")).on("click", function (event) {
          var $parent = $(this).closest(".header__search-form");
          $(this).css("display", "none");
          $(".predictive-search-content", $parent).css("display", "none");
        });
      };
      wpbingo.init = function () {
        wpbingo.initializeEvents();
        wpbingo.setBreakpoints();
        wpbingo.cartInit();
        wpbingo.collectionPages();
        wpbingo.slideshow();
        wpbingo.slickCarousel();
        wpbingo.countdown();
        wpbingo.countdown_single();
        wpbingo.sticky_product();
        wpbingo.sticky_header();
        wpbingo.lookbook();
        wpbingo.click_button();
        wpbingo.click_atribute_image();
        wpbingo.active_form_login();
        wpbingo.cookieConsent();
        wpbingo.newsletter();
        wpbingo.verify_popup();
        wpbingo.header_campar();
        wpbingo.customNumberInput();
        wpbingo.zoom_thumb();
        wpbingo.sale_nofication();
        wpbingo.discount_single();
        wpbingo.pick_up();
        wpbingo.time_estimated_delivery();
        wpbingo.countActiveSidebar();
        wpbingo.toggleSidebar();
        wpbingo.sidebarCollection();
        wpbingo.ajax_cartpage();
        wpbingo.ajax_blogpage();
        wpbingo.checkbox_terms_conditions();
        wpbingo.check_width_megamenu();
        wpbingo.slick_mobile();
        wpbingo.accordion_footer();
        wpbingo.product_tab();
        wpbingo.banner_video();
        wpbingo.christmas_snow();
        wpbingo.address_delete();
        wpbingo.change_head();
        wpbingo.before_you_leave();
        wpbingo.product_result_count();
        wpbingo.search_form();
        new wpbingo.update_variant_cartpage(".js-edit_variants");
        if (wpbingo.settings.enableGiftCard) {
          new wpbingo.gift_wrap(".js-giftcard");
        }
        if (wpbingo.settings.enableQuickView) {
          new wpbingo.QuickView(".js-quickview");
        }
        if ($("body").hasClass("template-product")) {
          var $element2 = $(".product-single");
          var _data = $element2.data();
          if (_data.layout_thumb != "slider") {
            $(".product-media__wrapper--video iframe").css("width", $(".product-single__main-media .mfp-image").width());
            $(".product-media__wrapper--video iframe").css("height", $(".product-single__main-media .mfp-image").height());
            $(".js-product-media-item model-viewer").css("width", $(".js-product-media").width());
            $(".js-product-media-item model-viewer").css("height", $(".mfp-image").height());
          }
        }
      };
      var confetti = document.getElementById("fire_work");
      var confettiCtx = confetti.getContext("2d");
      var container;
      var confettiElements = [];
      var clickPosition;
      var rand = function rand(min, max) {
        return Math.random() * (max - min) + min;
      };
      var confettiParams = {
        number: 200,
        size: {
          x: [5, 10],
          y: [10, 10]
        },
        initSpeed: 100,
        gravity: 0.9,
        drag: 0.5,
        terminalVelocity: 6,
        flipSpeed: 0.07
      };
      var colors = [{
        front: "#3B870A",
        back: "#235106"
      }, {
        front: "#B96300",
        back: "#6f3b00"
      }, {
        front: "#E23D34",
        back: "#88251f"
      }, {
        front: "#CD3168",
        back: "#7b1d3e"
      }, {
        front: "#664E8B",
        back: "#3d2f53"
      }, {
        front: "#394F78",
        back: "#222f48"
      }, {
        front: "#008A8A",
        back: "#005353"
      }];
      setupCanvas();
      updateConfetti();
      window.addEventListener("resize", function () {
        setupCanvas();
        hideConfetti();
      });
      function Conf() {
        this.randomModifier = rand(-1, 1);
        this.colorPair = colors[Math.floor(rand(0, colors.length))];
        this.dimensions = {
          x: rand(confettiParams.size.x[0], confettiParams.size.x[1]),
          y: rand(confettiParams.size.y[0], confettiParams.size.y[1])
        };
        this.position = {
          x: clickPosition[0],
          y: clickPosition[1]
        };
        this.rotation = rand(0, 2 * Math.PI);
        this.scale = {
          x: 1,
          y: 1
        };
        this.velocity = {
          x: rand(-confettiParams.initSpeed, confettiParams.initSpeed) * 0.4,
          y: rand(-confettiParams.initSpeed, confettiParams.initSpeed)
        };
        this.flipSpeed = rand(0.2, 1.5) * confettiParams.flipSpeed;
        if (this.position.y <= container.h) {
          this.velocity.y = -Math.abs(this.velocity.y);
        }
        this.terminalVelocity = rand(1, 1.5) * confettiParams.terminalVelocity;
        this.update = function () {
          this.velocity.x *= 0.98;
          this.position.x += this.velocity.x;
          this.velocity.y += this.randomModifier * confettiParams.drag;
          this.velocity.y += confettiParams.gravity;
          this.velocity.y = Math.min(this.velocity.y, this.terminalVelocity);
          this.position.y += this.velocity.y;
          this.scale.y = Math.cos((this.position.y + this.randomModifier) * this.flipSpeed);
          this.color = this.scale.y > 0 ? this.colorPair.front : this.colorPair.back;
        };
      }
      function updateConfetti() {
        confettiCtx.clearRect(0, 0, container.w, container.h);
        confettiElements.forEach(function (c) {
          c.update();
          confettiCtx.translate(c.position.x, c.position.y);
          confettiCtx.rotate(c.rotation);
          var width = c.dimensions.x * c.scale.x;
          var height = c.dimensions.y * c.scale.y;
          confettiCtx.fillStyle = c.color;
          confettiCtx.fillRect(-0.5 * width, -0.5 * height, width, height);
          confettiCtx.setTransform(1, 0, 0, 1, 0, 0);
        });
        confettiElements.forEach(function (c, idx) {
          if (c.position.y > container.h || c.position.x < -0.5 * container.x || c.position.x > 1.5 * container.x) {
            confettiElements.splice(idx, 1);
          }
        });
        window.requestAnimationFrame(updateConfetti);
      }
      function setupCanvas() {
        container = {
          w: confetti.clientWidth,
          h: confetti.clientHeight
        };
        confetti.width = container.w;
        confetti.height = container.h;
      }
      function addConfetti(e) {
        var canvasBox = confetti.getBoundingClientRect();
        if (e) {
          clickPosition = [e.clientX - canvasBox.left, e.clientY - canvasBox.top];
        } else {
          clickPosition = [canvasBox.width * Math.random(), canvasBox.height * Math.random()];
        }
        for (var i = 0; i < confettiParams.number; i++) {
          confettiElements.push(new Conf());
        }
      }
      function hideConfetti() {
        confettiElements = [];
        window.cancelAnimationFrame(updateConfetti);
      }
      function confettiLoop() {
        for (var i = 0; i < 8; i++) {
          addConfetti();
        }
      }
      var LOCAL_STORAGE_WISHLIST_KEY = "shopify-wishlist";
      var LOCAL_STORAGE_DELIMITER = ",";
      var BUTTON_ACTIVE_CLASS = "active";
      var GRID_LOADED_CLASS = "loaded";
      var selectors = {
        button: ".button-wishlist >button",
        grid: "[grid-wishlist]",
        productCard: ".product-content-card"
      };
      document.addEventListener("DOMContentLoaded", function () {
        initButtons();
        initGrid();
        var wishlist = getWishlist();
        $("[data-count-wishlist] .count").html(wishlist.length);
      });
      document.addEventListener("shopify-wishlist:updated", function (event) {
        initGrid();
      });
      var fetchProductCardHTML = function fetchProductCardHTML(handle) {
        var productTileTemplateUrl = "/products/".concat(handle, "?view=wishlist");
        return fetch(productTileTemplateUrl).then(function (res) {
          return res.text();
        }).then(function (res) {
          var text = res;
          var parser = new DOMParser();
          var htmlDocument = parser.parseFromString(text, "text/html");
          var productCard = htmlDocument.documentElement.querySelector(selectors.productCard);
          return productCard.outerHTML;
        })["catch"](function (err) {
          return console.error("[Shopify Content] Failed to load content for handle: ".concat(handle), err);
        });
      };
      var setupGrid = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(grid) {
          var wishlist, requests, responses, wishlistProductCards, event;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                wishlist = getWishlist();
                requests = wishlist.map(fetchProductCardHTML);
                _context.n = 1;
                return Promise.all(requests);
              case 1:
                responses = _context.v;
                wishlistProductCards = responses.join("");
                grid.innerHTML = wishlistProductCards;
                grid.classList.add(GRID_LOADED_CLASS);
                initButtons();
                initButtonsCompare();
                wpbingo.countdown();
                wpbingo.click_atribute_image();
                if ($(".bwp_currency").length > 0 && wishlist.length > 0) {
                  Currency.Currency_customer(true);
                }
                ajaxCart.init();
                event = new CustomEvent("shopify-wishlist:init-product-grid", {
                  detail: {
                    wishlist: wishlist
                  }
                });
                document.dispatchEvent(event);
                $(".wishlist__grid").removeClass("loading_wishlist");
                if (wishlist.length > 0) {
                  $(".wishlist_empty").addClass("hidden");
                } else {
                  $(".wishlist_empty").removeClass("hidden");
                }
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }));
        return function setupGrid(_x) {
          return _ref.apply(this, arguments);
        };
      }();
      var setupButtons = function setupButtons(buttons) {
        buttons.forEach(function (button) {
          var productHandle = button.dataset.productHandle || false;
          if (!productHandle) return;
          if (wishlistContains(productHandle)) button.classList.add(BUTTON_ACTIVE_CLASS);
          button.addEventListener("click", function () {
            var timeWishlist = setTimeout(loadWishlist, 1e3);
            updateWishlist(productHandle);
            button.classList.add("load-wishlist");
            function loadWishlist() {
              button.classList.remove("load-wishlist");
              button.classList.toggle(BUTTON_ACTIVE_CLASS);
              if ($(button).hasClass("active")) {
                var $parent = button.closest(".button-wishlist");
                $parent.setAttribute("data-title", window.strings.remove_wishlist);
              } else {
                var $parent = button.closest(".button-wishlist");
                $parent.setAttribute("data-title", window.strings.wishlist);
              }
            }
          });
        });
      };
      var initGrid = function initGrid() {
        var grid = document.querySelector(selectors.grid) || false;
        if (grid) setupGrid(grid);
      };
      var initButtons = function initButtons($element2) {
        if ($element2) {
          var parentElement = document.querySelector($element2);
          var buttons = parentElement.querySelectorAll(selectors.button) || [];
          if (buttons.length) setupButtons(buttons);else return;
        } else {
          var _buttons = document.querySelectorAll(selectors.button) || [];
          if (_buttons.length) setupButtons(_buttons);else return;
        }
        var event = new CustomEvent("shopify-wishlist:init-buttons", {
          detail: {
            wishlist: getWishlist()
          }
        });
        document.dispatchEvent(event);
        $(selectors.button).each(function (event2) {
          if ($(this).hasClass("active")) {
            var $parent = $(this).closest(".button-wishlist");
            $parent.attr("data-title", window.strings.remove_wishlist);
          } else {
            var $parent = $(this).closest(".button-wishlist");
            $parent.attr("data-title", window.strings.wishlist);
          }
        });
      };
      var getWishlist = function getWishlist() {
        var wishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY) || false;
        if (wishlist) return wishlist.split(LOCAL_STORAGE_DELIMITER);
        return [];
      };
      var setWishlist = function setWishlist(array) {
        var wishlist = array.join(LOCAL_STORAGE_DELIMITER);
        if (array.length) localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, wishlist);else localStorage.removeItem(LOCAL_STORAGE_WISHLIST_KEY);
        var event = new CustomEvent("shopify-wishlist:updated", {
          detail: {
            wishlist: array
          }
        });
        document.dispatchEvent(event);
        return wishlist;
      };
      var updateWishlist = function updateWishlist(handle) {
        var wishlist = getWishlist();
        var indexInWishlist = wishlist.indexOf(handle);
        if (indexInWishlist === -1) wishlist.push(handle);else wishlist.splice(indexInWishlist, 1);
        $("[data-count-wishlist] .count").html(wishlist.length);
        return setWishlist(wishlist);
      };
      var wishlistContains = function wishlistContains(handle) {
        var wishlist = getWishlist();
        return wishlist.includes(handle);
      };
      var resetWishlist = function resetWishlist() {
        return setWishlist([]);
      };
      var LOCAL_STORAGE_COMPARE_KEY = "shopify-compare";
      var LOCAL_STORAGE_DELIMITER_COMPARE = ",";
      var BUTTON_ACTIVE_CLASS_COMPARE = "active";
      var GRID_LOADED_CLASS_COMPARE = "loaded";
      var selectorscompare = {
        button: ".button-compare >button",
        remove: ".remove-compare >button",
        grid: "[grid-compare]",
        table: ".compare__table",
        productCard: ".product-content-compare"
      };
      document.addEventListener("DOMContentLoaded", function () {
        initButtonsCompare();
        initGridCompare();
        var compare = getCompare();
        if (compare.length === 0) {
          $(selectorscompare.table).removeClass(GRID_LOADED_CLASS_COMPARE);
        } else {
          $(selectorscompare.table).addClass(GRID_LOADED_CLASS_COMPARE);
          $(".show-compare .count", selectorscompare.table).html(compare.length);
        }
      });
      document.addEventListener("shopify-compare:updated", function (event) {
        initGridCompare();
      });
      var fetchProductCardHTMLCOMPARE = function fetchProductCardHTMLCOMPARE(handle) {
        var productTileTemplateUrl = "/products/".concat(handle, "?view=compare");
        return fetch(productTileTemplateUrl).then(function (res) {
          return res.text();
        }).then(function (res) {
          var text = res;
          var parser = new DOMParser();
          var htmlDocument = parser.parseFromString(text, "text/html");
          var productCard = htmlDocument.documentElement.querySelector(selectorscompare.productCard);
          return productCard.outerHTML;
        })["catch"](function (err) {
          return console.error("[Shopify Content] Failed to load content for handle: ".concat(handle), err);
        });
      };
      var setupGridCompare = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(grid) {
          var compare, requests, responses, compareProductCards, event;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                compare = getCompare();
                requests = compare.map(fetchProductCardHTMLCOMPARE);
                if (requests) {
                  $.each(requests, function (key, result) {
                    result.then(function (value) {
                      var productRemove = new DOMParser().parseFromString(value, "text/html").querySelector(".clone-remove-compare").innerHTML;
                      $(".remove-button", selectorscompare.table).append("<li>" + productRemove + "</li>");
                    }, function (error) {
                      console.log(error);
                    });
                  });
                  $.each(requests, function (key, result) {
                    result.then(function (value) {
                      var productName = new DOMParser().parseFromString(value, "text/html").querySelector(".clone-compare-title").innerHTML;
                      $(".compare-name", selectorscompare.table).append("<li>" + productName + "</li>");
                    }, function (error) {
                      console.log(error);
                    });
                  });
                  $.each(requests, function (key, result) {
                    result.then(function (value) {
                      var productImage = new DOMParser().parseFromString(value, "text/html").querySelector(".clone-compare-image").innerHTML;
                      $(".compare-image", selectorscompare.table).append("<li>" + productImage + "</li>");
                    }, function (error) {
                      console.log(error);
                    });
                  });
                  $.each(requests, function (key, result) {
                    result.then(function (value) {
                      var productVariants = new DOMParser().parseFromString(value, "text/html").querySelector(".clone-compare-card__content").innerHTML;
                      $(".compare-variants", selectorscompare.table).append("<li>" + productVariants + "</li>");
                    }, function (error) {
                      console.log(error);
                    });
                  });
                  $.each(requests, function (key, result) {
                    result.then(function (value) {
                      var productAvailability = new DOMParser().parseFromString(value, "text/html").querySelector(".clone-compare-inventory").innerHTML;
                      $(".compare-availability", selectorscompare.table).append("<li>" + productAvailability + "</li>");
                    }, function (error) {
                      console.log(error);
                    });
                  });
                  $.each(requests, function (key, result) {
                    result.then(function (value) {
                      var productPrice = new DOMParser().parseFromString(value, "text/html").querySelector(".clone-compare-price").innerHTML;
                      $(".compare-price", selectorscompare.table).append("<li>" + productPrice + "</li>");
                    }, function (error) {
                      console.log(error);
                    });
                  });
                  $.each(requests, function (key, result) {
                    result.then(function (value) {
                      var productAtc = new DOMParser().parseFromString(value, "text/html").querySelector(".clone-compare-atc").innerHTML;
                      $(".compare-atc", selectorscompare.table).append("<li>" + productAtc + "</li>");
                    }, function (error) {
                      console.log(error);
                    });
                  });
                }
                _context2.n = 1;
                return Promise.all(requests);
              case 1:
                responses = _context2.v;
                compareProductCards = responses.join("");
                wpbingo.click_atribute_image();
                if (compare.length > 0 && $(".bwp_currency").length > 0) {
                  if ($(".bwp_currency").length > 0) {
                    Currency.Currency_customer(true);
                  }
                }
                removeCompare();
                event = new CustomEvent("shopify-compare:init-product-grid", {
                  detail: {
                    compare: compare
                  }
                });
                document.dispatchEvent(event);
              case 2:
                return _context2.a(2);
            }
          }, _callee2);
        }));
        return function setupGridCompare(_x2) {
          return _ref2.apply(this, arguments);
        };
      }();
      var setupButtonsCompare = function setupButtonsCompare(buttons) {
        buttons.forEach(function (button) {
          var productHandle = button.dataset.productHandle || false;
          if (!productHandle) return;
          if (compareContains(productHandle)) button.classList.add(BUTTON_ACTIVE_CLASS_COMPARE);
          button.addEventListener("click", function () {
            if (!$(button).hasClass("active")) {
              $(".content-compare", selectorscompare.table).addClass("active");
              $(".content", selectorscompare.table).addClass("load-compare");
            }
            var timeCompare = setTimeout(loadCompare, 1e3);
            updateCompare(productHandle);
            button.classList.add("load-compare");
            function loadCompare() {
              button.classList.remove("load-compare");
              $(".content", selectorscompare.table).removeClass("load-compare");
              button.classList.toggle(BUTTON_ACTIVE_CLASS_COMPARE);
              if ($(button).hasClass("active")) {
                var $parent = button.closest(".button-compare");
                $parent.setAttribute("data-title", window.strings.remove_compare);
              } else {
                var $parent = button.closest(".button-compare");
                $parent.setAttribute("data-title", window.strings.compare);
              }
            }
            return;
          });
        });
      };
      var removeButtonsCompare = function removeButtonsCompare(buttons) {
        buttons.forEach(function (remove) {
          var productHandle = remove.dataset.productHandle || false;
          if (!productHandle) return;
          if (compareContains(productHandle)) remove.classList.add(BUTTON_ACTIVE_CLASS_COMPARE);
          remove.addEventListener("click", function () {
            var timeCompare = setTimeout(loadCompare, 1e3);
            updateCompare(productHandle);
            $(".content", selectorscompare.table).addClass("load-compare");
            function loadCompare() {
              $(".content", selectorscompare.table).removeClass("load-compare");
              var handle = remove.getAttribute("data-product-handle");
              $(".button-compare >button[data-product-handle=" + handle + "]").removeClass(BUTTON_ACTIVE_CLASS_COMPARE);
              $(selectorscompare.button).each(function (event) {
                if ($(this).hasClass("active")) {
                  var $parent = $(this).closest(".button-compare");
                  $parent.attr("data-title", window.strings.remove_compare);
                } else {
                  var $parent = $(this).closest(".button-compare");
                  $parent.attr("data-title", window.strings.compare);
                }
              });
            }
          });
        });
      };
      var initGridCompare = function initGridCompare() {
        var grid = document.querySelector(selectorscompare.grid) || false;
        if (grid) {
          $(".remove-button", selectorscompare.table).empty();
          $(".compare-name", selectorscompare.table).empty();
          $(".compare-image", selectorscompare.table).empty();
          $(".compare-variants", selectorscompare.table).empty();
          $(".compare-availability", selectorscompare.table).empty();
          $(".compare-price", selectorscompare.table).empty();
          $(".compare-atc", selectorscompare.table).empty();
          $(".remove-button", selectorscompare.table).append('<li class="label"></li>');
          $(".compare-name", selectorscompare.table).append('<li class="label">' + $(".compare-name").data("label") + "</li>");
          $(".compare-image", selectorscompare.table).append('<li class="label"></li>');
          $(".compare-variants", selectorscompare.table).append('<li class="label">' + $(".compare-variants").data("label") + "</li>");
          $(".compare-availability", selectorscompare.table).append('<li class="label">' + $(".compare-availability").data("label") + "</li>");
          $(".compare-price", selectorscompare.table).append('<li class="label">' + $(".compare-price").data("label") + "</li>");
          $(".compare-atc", selectorscompare.table).append('<li class="label"></li>');
          setupGridCompare(grid);
        }
        $(".compare__table .hide-compare").on("click", function () {
          if ($(".compare__table .content-compare").hasClass("active")) {
            $(".compare__table .content-compare").removeClass("active");
          }
        });
        $(".compare__table .show-compare").on("click", function () {
          if (!$(".compare__table .content-compare").hasClass("active")) {
            $(".compare__table .content-compare").addClass("active");
          }
        });
      };
      var initButtonsCompare = function initButtonsCompare($element2) {
        if ($element2) {
          var parentElement = document.querySelector($element2);
          var buttons = parentElement.querySelectorAll(selectorscompare.button) || [];
          if (buttons.length) {
            setupButtonsCompare(buttons);
          } else return;
        } else {
          var _buttons2 = document.querySelectorAll(selectorscompare.button) || [];
          if (_buttons2.length) {
            setupButtonsCompare(_buttons2);
          } else return;
        }
        var event = new CustomEvent("shopify-compare:init-buttons", {
          detail: {
            compare: getCompare()
          }
        });
        document.dispatchEvent(event);
        $(selectorscompare.button).each(function (event2) {
          if ($(this).hasClass("active")) {
            var $parent = $(this).closest(".button-compare");
            $parent.attr("data-title", window.strings.remove_compare);
          } else {
            var $parent = $(this).closest(".button-compare");
            $parent.attr("data-title", window.strings.compare);
          }
        });
      };
      var removeCompare = function removeCompare() {
        var buttons = document.querySelectorAll(selectorscompare.remove) || [];
        if (buttons.length) {
          removeButtonsCompare(buttons);
        } else return;
        var event = new CustomEvent("shopify-compare:init-buttons", {
          detail: {
            compare: getCompare()
          }
        });
        document.dispatchEvent(event);
      };
      var getCompare = function getCompare() {
        var compare = localStorage.getItem(LOCAL_STORAGE_COMPARE_KEY) || false;
        if (compare) return compare.split(LOCAL_STORAGE_DELIMITER_COMPARE);
        return [];
      };
      var setCompare = function setCompare(array) {
        var compare = array.join(LOCAL_STORAGE_DELIMITER_COMPARE);
        if (array.length) localStorage.setItem(LOCAL_STORAGE_COMPARE_KEY, compare);else localStorage.removeItem(LOCAL_STORAGE_COMPARE_KEY);
        var event = new CustomEvent("shopify-compare:updated", {
          detail: {
            compare: array
          }
        });
        document.dispatchEvent(event);
        return compare;
      };
      var updateCompare = function updateCompare(handle) {
        var compare = getCompare();
        var indexInCompare = compare.indexOf(handle);
        var table = document.querySelector(selectorscompare.table);
        if (indexInCompare === -1) {
          compare.push(handle);
        } else {
          compare.splice(indexInCompare, 1);
        }
        if (compare.length === 0) {
          table.classList.remove(GRID_LOADED_CLASS_COMPARE);
        } else {
          table.classList.add(GRID_LOADED_CLASS_COMPARE);
          $(".show-compare .count", selectorscompare.table).html(compare.length);
        }
        return setCompare(compare);
      };
      var compareContains = function compareContains(handle) {
        var compare = getCompare();
        return compare.includes(handle);
      };
      var resetCompare = function resetCompare() {
        return setCompare([]);
      };
      wpbingo.initButtons = initButtons;
      wpbingo.initButtonsCompare = initButtonsCompare;
      $(document).ready(function () {
        wpbingo.init();
        var sections = new wpbingo.Sections();
        sections.register("product-template", wpbingo.Product);
        sections.register("header-section", wpbingo.HeaderSection);
        sections.register("header-topbar-section", wpbingo.HeaderSection);
        sections.register("product-recommendations", wpbingo.ProductRecommendations);
        sections.register("login-register", wpbingo.LoginRegister);
        sections.register("search", wpbingo.Search);
        sections.register("footer-bottom", wpbingo.FooterSection);
        if ($("body").hasClass("template-product")) {
          sections.register("product-template", Shopify.Products.showRecentlyViewed());
          sections.register("product-template", Shopify.Products.recordRecentlyViewed());
          var $element2 = $(".product-single");
          var _data = $element2.data();
          if (_data.layout_thumb == "slider") {
            $(".product-media__wrapper--video iframe").css("width", $(".product-single__main-media #slick-slide11 .mfp-image").width());
            $(".product-media__wrapper--video iframe").css("height", $(".product-single__main-media #slick-slide11 .mfp-image").height());
            $(".js-product-media-item model-viewer").css("width", $(".product-single__main-media #slick-slide11 .mfp-image").width());
            $(".js-product-media-item model-viewer").css("height", $(".product-single__main-media #slick-slide11 .mfp-image").height());
          }
        }
        $("#pre-loading").addClass("loading-done");
        setTimeout(function () {
          $("#pre-loading").removeClass("loading-done");
          $("#pre-loading").removeClass("loading-page");
        }, 1300);
        if (window.Shopify.designMode) {
          $("body").addClass("designMode_active");
          document.addEventListener("shopify:section:load", function (event) {
            var sectionId = ".wpbingo-section--" + event.detail.sectionId;
            if ($(".js-carousel", sectionId).length > 0) {
              wpbingo.elementslickCarousel($(".js-carousel", sectionId));
            }
            if ($("[data-countdown]", sectionId).length > 0) {
              wpbingo.countdown();
            }
            if ($(".custom-product-card", sectionId).length > 0) {
              $(".custom-product-card", sectionId).addClass("active");
            } else {
              $(".custom-product-card").removeClass("active");
            }
          });
          document.addEventListener("shopify:section:select", function (event) {
            var sectionId = ".wpbingo-section--" + event.detail.sectionId;
            if ($(".custom-product-card", sectionId).length > 0) {
              $(".custom-product-card", sectionId).addClass("active");
            } else {
              $(".custom-product-card").removeClass("active");
            }
          });
          document.addEventListener("shopify:block:select", function (event) {
            var id = $("#" + event.detail.blockId);
            if (id.length > 0) {
              $(".block-card-mobi").removeClass("active");
              $(".product-card__buttons").addClass("hidden");
              id.addClass("active");
            } else {
              $(".block-card-mobi").removeClass("active");
              $(".product-card__buttons").removeClass("hidden");
            }
          });
        }
      });
    }
  });

  // assets/debounce.js
  var require_debounce = __commonJS({
    "assets/debounce.js": function assets_debounceJs() {
      wpbingo.debounce = function (n, t, u) {
        var e;
        return function () {
          var a = this,
            r = arguments,
            i = function i() {
              e = null, u || n.apply(a, r);
            },
            o = u && !e;
          clearTimeout(e), e = setTimeout(i, t), o && n.apply(a, r);
        };
      };
    }
  });

  // assets/facets.js
  var require_facets = __commonJS({
    "assets/facets.js": function assets_facetsJs() {
      function onKeyUpEscape(event) {
        if (event.code.toUpperCase() !== "ESCAPE") return;
        var openDetailsElement = event.target.closest("details[open]");
        if (!openDetailsElement) return;
        var summaryElement = openDetailsElement.querySelector("summary");
        openDetailsElement.removeAttribute("open");
        summaryElement.setAttribute("aria-expanded", false);
        summaryElement.focus();
      }
      function debounce(fn, wait) {
        var _this = this;
        var t;
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          clearTimeout(t);
          t = setTimeout(function () {
            return fn.apply(_this, args);
          }, wait);
        };
      }
      var FacetFiltersForm = /*#__PURE__*/function (_HTMLElement) {
        "use strict";

        function _FacetFiltersForm() {
          var _this2;
          _classCallCheck(this, _FacetFiltersForm);
          _this2 = _callSuper(this, _FacetFiltersForm);
          _this2.onActiveFilterClick = _this2.onActiveFilterClick.bind(_this2);
          _this2.debouncedOnSubmit = debounce(function (event) {
            _this2.onSubmitHandler(event);
          }, 500);
          _this2.querySelector("form").addEventListener("input", _this2.debouncedOnSubmit.bind(_this2));
          var facetWrapper = _this2.querySelector(".FacetsWrapperDesktop");
          if (facetWrapper) facetWrapper.addEventListener("keyup", onKeyUpEscape);
          return _this2;
        }
        _inherits(_FacetFiltersForm, _HTMLElement);
        return _createClass(_FacetFiltersForm, [{
          key: "onSubmitHandler",
          value: function onSubmitHandler(event) {
            event.preventDefault();
            var formData = new FormData(event.target.closest("form"));
            var searchParams = new URLSearchParams(formData).toString();
            _FacetFiltersForm.renderPage(searchParams, event);
          }
        }, {
          key: "onActiveFilterClick",
          value: function onActiveFilterClick(event) {
            event.preventDefault();
            _FacetFiltersForm.toggleActiveFacets();
            var url = event.currentTarget.href.indexOf("?") == -1 ? "" : event.currentTarget.href.slice(event.currentTarget.href.indexOf("?") + 1);
            _FacetFiltersForm.renderPage(url);
          }
        }], [{
          key: "setListeners",
          value: function setListeners() {
            var onHistoryChange = function onHistoryChange(event) {
              var searchParams = event.state ? event.state.searchParams : _FacetFiltersForm.searchParamsInitial;
              if (searchParams === _FacetFiltersForm.searchParamsPrev) return;
              _FacetFiltersForm.renderPage(searchParams, null, false);
            };
            window.addEventListener("popstate", onHistoryChange);
          }
        }, {
          key: "toggleActiveFacets",
          value: function toggleActiveFacets() {
            var disable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            document.querySelectorAll(".js-facet-remove").forEach(function (element) {
              element.classList.toggle("disabled", disable);
            });
          }
        }, {
          key: "renderPage",
          value: function renderPage(searchParams, event) {
            var updateURLHash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            _FacetFiltersForm.searchParamsPrev = searchParams;
            var sections = _FacetFiltersForm.getSections();
            sections.forEach(function (section) {
              var url = "".concat(window.location.pathname, "?section_id=").concat(section.section, "&").concat(searchParams);
              var filterDataUrl = function filterDataUrl(element) {
                return element.url === url;
              };
              _FacetFiltersForm.filterData.some(filterDataUrl) ? _FacetFiltersForm.renderSectionFromCache(filterDataUrl, event) : _FacetFiltersForm.renderSectionFromFetch(url, event);
            });
            if (updateURLHash) _FacetFiltersForm.updateURLHash(searchParams);
          }
        }, {
          key: "renderSectionFromFetch",
          value: function renderSectionFromFetch(url, event) {
            fetch(url).then(function (response) {
              return response.text();
            }).then(function (responseText) {
              var html = responseText;
              _FacetFiltersForm.filterData = [].concat(_toConsumableArray(_FacetFiltersForm.filterData), [{
                html: html,
                url: url
              }]);
              _FacetFiltersForm.renderFilters(html, event);
              _FacetFiltersForm.renderProductGridContainer(html);
            });
          }
        }, {
          key: "renderSectionFromCache",
          value: function renderSectionFromCache(filterDataUrl, event) {
            var html = _FacetFiltersForm.filterData.find(filterDataUrl).html;
            _FacetFiltersForm.renderFilters(html, event);
            _FacetFiltersForm.renderProductGridContainer(html);
          }
        }, {
          key: "renderProductGridContainer",
          value: function renderProductGridContainer(html) {
            var myTimeout = setTimeout(removeLoad, 1e3);
            var element = document.getElementById("pre-loading");
            element.classList.add("load-product");
            document.querySelector(".pre-loading__bar").style.width = "40%";
            document.getElementById("JsCollectionProduct").innerHTML = new DOMParser().parseFromString(html, "text/html").getElementById("JsCollectionProduct").innerHTML;
            document.querySelector(".facet-filters.sorting").innerHTML = new DOMParser().parseFromString(html, "text/html").querySelector(".facet-filters.sorting").innerHTML;
            setTimeout(function () {
              document.querySelector(".pre-loading__bar").style.width = "100%";
            }, 500);
            function removeLoad() {
              document.querySelector(".pre-loading__bar").style.width = "0";
              element.classList.remove("load-product");
            }
            $(".product-card__image-wrapper.slider").each(function () {
              wpbingo.elementslickCarousel($(".js-carousel", $(this)));
            });
            if ($(".bwp_currency").length > 0) {
              Currency.Currency_customer(true);
            }
            wpbingo.click_atribute_image();
            wpbingo.zoom_thumb();
            if (window.SPR) {
              SPR.initRatingHandler();
              SPR.initDomEls();
              SPR.loadProducts();
              SPR.loadBadges();
            }
            wpbingo.countdown();
            initButtons();
            initButtonsCompare();
            wpbingo.countActiveSidebar();
            wpbingo.toggleSidebar(true);
            wpbingo.sidebarCollection(true);
            wpbingo.ajaxFilterCategory();
            wpbingo.product_result_count();
            cViewCollection = wpbingo.getCookie("wpbingo_view_collection");
            if (cViewCollection) {
              $("#JsCollectionProduct").removeAttr("class");
              $("#JsCollectionProduct").addClass(cViewCollection);
              $(".js-change-view").removeClass("active");
              $("[data-view=" + cViewCollection + "]").addClass("active");
            }
            $(".js-page-collection").on("click", ".js-change-view", function (e) {
              e.preventDefault();
              if (!$(this).hasClass("active")) {
                $(".product-card__image-wrapper.slider", ".js-collection-content-product").each(function () {
                  $(".js-carousel", $(this)).slick("refresh");
                });
                wpbingo.setCookie("wpbingo_view_collection", $(this).data("view"), 30);
                $(".js-change-view").removeClass("active");
                $(this).addClass("active");
                $("#JsCollectionProduct").removeAttr("class");
                $("#JsCollectionProduct").addClass($(this).data("view"));
              }
            });
          }
        }, {
          key: "renderFilters",
          value: function renderFilters(html, event) {
            var parsedHTML = new DOMParser().parseFromString(html, "text/html");
            var facetDetailsElements = parsedHTML.querySelectorAll(".FacetFiltersForm .js-filter");
            var matchesIndex = function matchesIndex(element) {
              var jsFilter = event ? event.target.closest(".js-filter") : void 0;
            };
            var facetsToRender = Array.from(facetDetailsElements).filter(function (element) {
              return !matchesIndex(element);
            });
            var countsToRender = Array.from(facetDetailsElements).find(matchesIndex);
            facetsToRender.forEach(function (element) {
              document.querySelector(".js-filter[data-index=\"".concat(element.dataset.index, "\"]")).innerHTML = element.innerHTML;
            });
            _FacetFiltersForm.renderActiveFacets(parsedHTML);
            if (countsToRender) _FacetFiltersForm.renderCounts(countsToRender, event.target.closest(".js-filter"));
          }
        }, {
          key: "renderActiveFacets",
          value: function renderActiveFacets(html) {
            var activeFacetElementSelectors = [".active-facets-desktop"];
            activeFacetElementSelectors.forEach(function (selector) {
              var activeFacetsElement = html.querySelector(selector);
              if (!activeFacetsElement) return;
              document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
            });
            _FacetFiltersForm.toggleActiveFacets(false);
          }
        }, {
          key: "renderCounts",
          value: function renderCounts(source, target) {
            var targetElement = target.querySelector(".facets__selected");
            var sourceElement = source.querySelector(".facets__selected");
            if (sourceElement && targetElement) {
              target.querySelector(".facets__selected").outerHTML = source.querySelector(".facets__selected").outerHTML;
            }
          }
        }, {
          key: "updateURLHash",
          value: function updateURLHash(searchParams) {
            history.pushState({
              searchParams: searchParams
            }, "", "".concat(window.location.pathname).concat(searchParams && "?".concat(searchParams)));
          }
        }, {
          key: "getSections",
          value: function getSections() {
            return [{
              section: document.getElementById("product-grid").dataset.id
            }];
          }
        }]);
      }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
      FacetFiltersForm.filterData = [];
      FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
      FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
      customElements.define("facet-filters-form", FacetFiltersForm);
      FacetFiltersForm.setListeners();
      var PriceRange = /*#__PURE__*/function (_HTMLElement2) {
        "use strict";

        function PriceRange() {
          var _this3;
          _classCallCheck(this, PriceRange);
          _this3 = _callSuper(this, PriceRange);
          _this3.querySelectorAll("input").forEach(function (element) {
            return element.addEventListener("change", _this3.onRangeChange.bind(_this3));
          });
          _this3.setMinAndMaxValues();
          _this3.loadRangePrice();
          return _this3;
        }
        _inherits(PriceRange, _HTMLElement2);
        return _createClass(PriceRange, [{
          key: "onRangeChange",
          value: function onRangeChange(event) {
            this.adjustToValidValues(event.currentTarget);
            this.setMinAndMaxValues();
            this.loadRangePrice();
          }
        }, {
          key: "setMinAndMaxValues",
          value: function setMinAndMaxValues() {
            var inputs = this.querySelectorAll("input");
            var minInput = inputs[0];
            var maxInput = inputs[1];
            if (maxInput.value) minInput.setAttribute("max", maxInput.value);
            if (minInput.value) maxInput.setAttribute("min", minInput.value);
            if (minInput.value === "") maxInput.setAttribute("min", 0);
            if (maxInput.value === "") minInput.setAttribute("max", maxInput.getAttribute("max"));
          }
        }, {
          key: "adjustToValidValues",
          value: function adjustToValidValues(input) {
            var value = Number(input.value);
            var min = Number(input.getAttribute("min"));
            var max = Number(input.getAttribute("max"));
            if (value < min) input.value = min;
            if (value > max) input.value = max;
          }
        }, {
          key: "loadRangePrice",
          value: function loadRangePrice(format) {
            var parent = document.querySelector(".facets__price");
            if (!parent) return;
            var moneyFormats = {
              "USD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "${{amount}} USD"
              },
              "EUR": {
                "money_format": "&euro;{{amount}}",
                "money_with_currency_format": "&euro;{{amount}} EUR"
              },
              "GBP": {
                "money_format": "&pound;{{amount}}",
                "money_with_currency_format": "&pound;{{amount}} GBP"
              },
              "CAD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "${{amount}} CAD"
              },
              "ALL": {
                "money_format": "Lek {{amount}}",
                "money_with_currency_format": "Lek {{amount}} ALL"
              },
              "DZD": {
                "money_format": "DA {{amount}}",
                "money_with_currency_format": "DA {{amount}} DZD"
              },
              "AOA": {
                "money_format": "Kz{{amount}}",
                "money_with_currency_format": "Kz{{amount}} AOA"
              },
              "ARS": {
                "money_format": "${{amount_with_comma_separator}}",
                "money_with_currency_format": "${{amount_with_comma_separator}} ARS"
              },
              "AMD": {
                "money_format": "{{amount}} AMD",
                "money_with_currency_format": "{{amount}} AMD"
              },
              "AWG": {
                "money_format": "Afl{{amount}}",
                "money_with_currency_format": "Afl{{amount}} AWG"
              },
              "AUD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "${{amount}} AUD"
              },
              "BBD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "${{amount}} Bds"
              },
              "AZN": {
                "money_format": "m.{{amount}}",
                "money_with_currency_format": "m.{{amount}} AZN"
              },
              "BDT": {
                "money_format": "Tk {{amount}}",
                "money_with_currency_format": "Tk {{amount}} BDT"
              },
              "BSD": {
                "money_format": "BS${{amount}}",
                "money_with_currency_format": "BS${{amount}} BSD"
              },
              "BHD": {
                "money_format": "{{amount}} BD",
                "money_with_currency_format": "{{amount}} BHD"
              },
              "BYR": {
                "money_format": "Br {{amount}}",
                "money_with_currency_format": "Br {{amount}} BYR"
              },
              "BZD": {
                "money_format": "BZ${{amount}}",
                "money_with_currency_format": "BZ${{amount}} BZD"
              },
              "BTN": {
                "money_format": "Nu {{amount}}",
                "money_with_currency_format": "Nu {{amount}} BTN"
              },
              "BAM": {
                "money_format": "KM {{amount_with_comma_separator}}",
                "money_with_currency_format": "KM {{amount_with_comma_separator}} BAM"
              },
              "BRL": {
                "money_format": "R$ {{amount_with_comma_separator}}",
                "money_with_currency_format": "R$ {{amount_with_comma_separator}} BRL"
              },
              "BOB": {
                "money_format": "Bs{{amount_with_comma_separator}}",
                "money_with_currency_format": "Bs{{amount_with_comma_separator}} BOB"
              },
              "BWP": {
                "money_format": "P{{amount}}",
                "money_with_currency_format": "P{{amount}} BWP"
              },
              "BND": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "${{amount}} BND"
              },
              "BGN": {
                "money_format": "{{amount}} \xD0\xBB\xD0\xB2",
                "money_with_currency_format": "{{amount}} \xD0\xBB\xD0\xB2 BGN"
              },
              "MMK": {
                "money_format": "K{{amount}}",
                "money_with_currency_format": "K{{amount}} MMK"
              },
              "KHR": {
                "money_format": "KHR{{amount}}",
                "money_with_currency_format": "KHR{{amount}}"
              },
              "KYD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "${{amount}} KYD"
              },
              "XAF": {
                "money_format": "FCFA{{amount}}",
                "money_with_currency_format": "FCFA{{amount}} XAF"
              },
              "CLP": {
                "money_format": "${{amount_no_decimals}}",
                "money_with_currency_format": "${{amount_no_decimals}} CLP"
              },
              "CNY": {
                "money_format": "&#165;{{amount}}",
                "money_with_currency_format": "&#165;{{amount}} CNY"
              },
              "COP": {
                "money_format": "${{amount_with_comma_separator}}",
                "money_with_currency_format": "${{amount_with_comma_separator}} COP"
              },
              "CRC": {
                "money_format": "&#8353; {{amount_with_comma_separator}}",
                "money_with_currency_format": "&#8353; {{amount_with_comma_separator}} CRC"
              },
              "HRK": {
                "money_format": "{{amount_with_comma_separator}} kn",
                "money_with_currency_format": "{{amount_with_comma_separator}} kn HRK"
              },
              "CZK": {
                "money_format": "{{amount_with_comma_separator}} K&#269;",
                "money_with_currency_format": "{{amount_with_comma_separator}} K&#269;"
              },
              "DKK": {
                "money_format": "{{amount_with_comma_separator}}",
                "money_with_currency_format": "kr.{{amount_with_comma_separator}}"
              },
              "DOP": {
                "money_format": "RD$ {{amount}}",
                "money_with_currency_format": "RD$ {{amount}}"
              },
              "XCD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "EC${{amount}}"
              },
              "EGP": {
                "money_format": "LE {{amount}}",
                "money_with_currency_format": "LE {{amount}} EGP"
              },
              "ETB": {
                "money_format": "Br{{amount}}",
                "money_with_currency_format": "Br{{amount}} ETB"
              },
              "XPF": {
                "money_format": "{{amount_no_decimals_with_comma_separator}} XPF",
                "money_with_currency_format": "{{amount_no_decimals_with_comma_separator}} XPF"
              },
              "FJD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "FJ${{amount}}"
              },
              "GMD": {
                "money_format": "D {{amount}}",
                "money_with_currency_format": "D {{amount}} GMD"
              },
              "GHS": {
                "money_format": "GH&#8373;{{amount}}",
                "money_with_currency_format": "GH&#8373;{{amount}}"
              },
              "GTQ": {
                "money_format": "Q{{amount}}",
                "money_with_currency_format": "{{amount}} GTQ"
              },
              "GYD": {
                "money_format": "G${{amount}}",
                "money_with_currency_format": "${{amount}} GYD"
              },
              "GEL": {
                "money_format": "{{amount}} GEL",
                "money_with_currency_format": "{{amount}} GEL"
              },
              "HNL": {
                "money_format": "L {{amount}}",
                "money_with_currency_format": "L {{amount}} HNL"
              },
              "HKD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "HK${{amount}}"
              },
              "HUF": {
                "money_format": "{{amount_no_decimals_with_comma_separator}}",
                "money_with_currency_format": "{{amount_no_decimals_with_comma_separator}} Ft"
              },
              "ISK": {
                "money_format": "{{amount_no_decimals}} kr",
                "money_with_currency_format": "{{amount_no_decimals}} kr ISK"
              },
              "INR": {
                "money_format": "Rs. {{amount}}",
                "money_with_currency_format": "Rs. {{amount}}"
              },
              "IDR": {
                "money_format": "{{amount_with_comma_separator}}",
                "money_with_currency_format": "Rp {{amount_with_comma_separator}}"
              },
              "ILS": {
                "money_format": "{{amount}} NIS",
                "money_with_currency_format": "{{amount}} NIS"
              },
              "JMD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "${{amount}} JMD"
              },
              "JPY": {
                "money_format": "&#165;{{amount_no_decimals}}",
                "money_with_currency_format": "&#165;{{amount_no_decimals}} JPY"
              },
              "JEP": {
                "money_format": "&pound;{{amount}}",
                "money_with_currency_format": "&pound;{{amount}} JEP"
              },
              "JOD": {
                "money_format": "{{amount}} JD",
                "money_with_currency_format": "{{amount}} JOD"
              },
              "KZT": {
                "money_format": "{{amount}} KZT",
                "money_with_currency_format": "{{amount}} KZT"
              },
              "KES": {
                "money_format": "KSh{{amount}}",
                "money_with_currency_format": "KSh{{amount}}"
              },
              "KWD": {
                "money_format": "{{amount}} KD",
                "money_with_currency_format": "{{amount}} KWD"
              },
              "KGS": {
                "money_format": "\xD0\xBB\xD0\xB2{{amount}}",
                "money_with_currency_format": "\xD0\xBB\xD0\xB2{{amount}}"
              },
              "LVL": {
                "money_format": "Ls {{amount}}",
                "money_with_currency_format": "Ls {{amount}} LVL"
              },
              "LBP": {
                "money_format": "L&pound;{{amount}}",
                "money_with_currency_format": "L&pound;{{amount}} LBP"
              },
              "LTL": {
                "money_format": "{{amount}} Lt",
                "money_with_currency_format": "{{amount}} Lt"
              },
              "MGA": {
                "money_format": "Ar {{amount}}",
                "money_with_currency_format": "Ar {{amount}} MGA"
              },
              "MKD": {
                "money_format": "\u0434\u0435\u043D {{amount}}",
                "money_with_currency_format": "\u0434\u0435\u043D {{amount}} MKD"
              },
              "MOP": {
                "money_format": "MOP${{amount}}",
                "money_with_currency_format": "MOP${{amount}}"
              },
              "MVR": {
                "money_format": "Rf{{amount}}",
                "money_with_currency_format": "Rf{{amount}} MRf"
              },
              "MXN": {
                "money_format": "$ {{amount}}",
                "money_with_currency_format": "$ {{amount}} MXN"
              },
              "MYR": {
                "money_format": "RM{{amount}} MYR",
                "money_with_currency_format": "RM{{amount}} MYR"
              },
              "MUR": {
                "money_format": "Rs {{amount}}",
                "money_with_currency_format": "Rs {{amount}} MUR"
              },
              "MDL": {
                "money_format": "{{amount}} MDL",
                "money_with_currency_format": "{{amount}} MDL"
              },
              "MAD": {
                "money_format": "{{amount}} dh",
                "money_with_currency_format": "Dh {{amount}} MAD"
              },
              "MNT": {
                "money_format": "{{amount_no_decimals}} &#8366",
                "money_with_currency_format": "{{amount_no_decimals}} MNT"
              },
              "MZN": {
                "money_format": "{{amount}} Mt",
                "money_with_currency_format": "Mt {{amount}} MZN"
              },
              "NAD": {
                "money_format": "N${{amount}}",
                "money_with_currency_format": "N${{amount}} NAD"
              },
              "NPR": {
                "money_format": "Rs{{amount}}",
                "money_with_currency_format": "Rs{{amount}} NPR"
              },
              "ANG": {
                "money_format": "&fnof;{{amount}}",
                "money_with_currency_format": "{{amount}} NA&fnof;"
              },
              "NZD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "${{amount}} NZD"
              },
              "NIO": {
                "money_format": "C${{amount}}",
                "money_with_currency_format": "C${{amount}} NIO"
              },
              "NGN": {
                "money_format": "&#8358;{{amount}}",
                "money_with_currency_format": "&#8358;{{amount}} NGN"
              },
              "NOK": {
                "money_format": "kr {{amount_with_comma_separator}}",
                "money_with_currency_format": "kr {{amount_with_comma_separator}} NOK"
              },
              "OMR": {
                "money_format": "{{amount_with_comma_separator}} OMR",
                "money_with_currency_format": "{{amount_with_comma_separator}} OMR"
              },
              "PKR": {
                "money_format": "Rs.{{amount}}",
                "money_with_currency_format": "Rs.{{amount}} PKR"
              },
              "PGK": {
                "money_format": "K {{amount}}",
                "money_with_currency_format": "K {{amount}} PGK"
              },
              "PYG": {
                "money_format": "Gs. {{amount_no_decimals_with_comma_separator}}",
                "money_with_currency_format": "Gs. {{amount_no_decimals_with_comma_separator}} PYG"
              },
              "PEN": {
                "money_format": "S/. {{amount}}",
                "money_with_currency_format": "S/. {{amount}} PEN"
              },
              "PHP": {
                "money_format": "&#8369;{{amount}}",
                "money_with_currency_format": "&#8369;{{amount}} PHP"
              },
              "PLN": {
                "money_format": "{{amount_with_comma_separator}} zl",
                "money_with_currency_format": "{{amount_with_comma_separator}} zl PLN"
              },
              "QAR": {
                "money_format": "QAR {{amount_with_comma_separator}}",
                "money_with_currency_format": "QAR {{amount_with_comma_separator}}"
              },
              "RON": {
                "money_format": "{{amount_with_comma_separator}} lei",
                "money_with_currency_format": "{{amount_with_comma_separator}} lei RON"
              },
              "RUB": {
                "money_format": "&#1088;&#1091;&#1073;{{amount_with_comma_separator}}",
                "money_with_currency_format": "&#1088;&#1091;&#1073;{{amount_with_comma_separator}} RUB"
              },
              "RWF": {
                "money_format": "{{amount_no_decimals}} RF",
                "money_with_currency_format": "{{amount_no_decimals}} RWF"
              },
              "WST": {
                "money_format": "WS$ {{amount}}",
                "money_with_currency_format": "WS$ {{amount}} WST"
              },
              "SAR": {
                "money_format": "{{amount}} SR",
                "money_with_currency_format": "{{amount}} SAR"
              },
              "STD": {
                "money_format": "Db {{amount}}",
                "money_with_currency_format": "Db {{amount}} STD"
              },
              "RSD": {
                "money_format": "{{amount}} RSD",
                "money_with_currency_format": "{{amount}} RSD"
              },
              "SCR": {
                "money_format": "Rs {{amount}}",
                "money_with_currency_format": "Rs {{amount}} SCR"
              },
              "SGD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "${{amount}} SGD"
              },
              "SYP": {
                "money_format": "S&pound;{{amount}}",
                "money_with_currency_format": "S&pound;{{amount}} SYP"
              },
              "ZAR": {
                "money_format": "R {{amount}}",
                "money_with_currency_format": "R {{amount}} ZAR"
              },
              "KRW": {
                "money_format": "&#8361;{{amount_no_decimals}}",
                "money_with_currency_format": "&#8361;{{amount_no_decimals}} KRW"
              },
              "LKR": {
                "money_format": "Rs {{amount}}",
                "money_with_currency_format": "Rs {{amount}} LKR"
              },
              "SEK": {
                "money_format": "{{amount_no_decimals}} kr",
                "money_with_currency_format": "{{amount_no_decimals}} kr SEK"
              },
              "CHF": {
                "money_format": "{{amount}} CHF",
                "money_with_currency_format": "{{amount}} CHF"
              },
              "TWD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "${{amount}} TWD"
              },
              "THB": {
                "money_format": "{{amount}} &#xe3f;",
                "money_with_currency_format": "{{amount}} &#xe3f; THB"
              },
              "TZS": {
                "money_format": "{{amount}} TZS",
                "money_with_currency_format": "{{amount}} TZS"
              },
              "TTD": {
                "money_format": "${{amount}}",
                "money_with_currency_format": "${{amount}} TTD"
              },
              "TND": {
                "money_format": "{{amount}}",
                "money_with_currency_format": "{{amount}} DT"
              },
              "TRY": {
                "money_format": "{{amount}}TL",
                "money_with_currency_format": "{{amount}}TL"
              },
              "UGX": {
                "money_format": "Ush {{amount_no_decimals}}",
                "money_with_currency_format": "Ush {{amount_no_decimals}} UGX"
              },
              "UAH": {
                "money_format": "\u20B4{{amount}}",
                "money_with_currency_format": "{{amount}} UAH"
              },
              "AED": {
                "money_format": "Dhs. {{amount}}",
                "money_with_currency_format": "Dhs. {{amount}} AED"
              },
              "UYU": {
                "money_format": "${{amount_with_comma_separator}}",
                "money_with_currency_format": "${{amount_with_comma_separator}} UYU"
              },
              "VUV": {
                "money_format": "{{amount}} VT",
                "money_with_currency_format": "{{amount}} VT"
              },
              "VEF": {
                "money_format": "Bs. {{amount_with_comma_separator}}",
                "money_with_currency_format": "Bs. {{amount_with_comma_separator}} VEF"
              },
              "VND": {
                "money_format": "{{amount_no_decimals_with_comma_separator}}&#8363;",
                "money_with_currency_format": "{{amount_no_decimals_with_comma_separator}} VND"
              },
              "XBT": {
                "money_format": "{{amount_no_decimals}} BTC",
                "money_with_currency_format": "{{amount_no_decimals}} BTC"
              },
              "XOF": {
                "money_format": "CFA{{amount}}",
                "money_with_currency_format": "CFA{{amount}} XOF"
              },
              "ZMW": {
                "money_format": "K{{amount_no_decimals_with_comma_separator}}",
                "money_with_currency_format": "ZMW{{amount_no_decimals_with_comma_separator}}"
              }
            };
            var rangeS = parent.querySelectorAll("input[type=range]"),
              numberS = parent.querySelectorAll("input[type=number]");
            rangeS.forEach(function (el) {
              el.oninput = function () {
                var slide1 = parseFloat(rangeS[0].value),
                  slide2 = parseFloat(rangeS[1].value);
                if (slide1 > slide2) {
                  var _ref3 = [slide2, slide1];
                  slide1 = _ref3[0];
                  slide2 = _ref3[1];
                }
                numberS[0].value = slide1;
                numberS[1].value = slide2;
                if ($(".bwp_currency").length > 0) {
                  var newCurrency = $(".field-price span.money", parent).attr("data-currency"),
                    oldCurrency = window.routes.shop_currency,
                    hover_currency = window.routes.hover_currency;
                  var newFormat = moneyFormats[newCurrency][format || Currency.format] || "{{amount}}";
                  var oldFormat = moneyFormats[oldCurrency][format || Currency.format] || "{{amount}}";
                  var cents1 = Currency.convert(parseFloat(slide1, 10) * 100, oldCurrency, newCurrency);
                  var cents2 = Currency.convert(parseFloat(slide2, 10) * 100, oldCurrency, newCurrency);
                  $(".field-price span.from span.money", parent).html(Currency.formatMoney(cents1, newFormat));
                  $(".field-price span.to span.money", parent).html(Currency.formatMoney(cents2, newFormat));
                  if (hover_currency) {
                    $(".field-price span.from span.tt_currency_txt", parent).html(slide1);
                    $(".field-price span.to span.tt_currency_txt", parent).html(slide2);
                  }
                } else {
                  var moneyFormat2 = wpbingo.strings.moneyFormat;
                  $(".field-price span.from", parent).html(wpbingo.Currency.formatMoney(parseFloat(slide1, 10) * 100, moneyFormat2));
                  $(".field-price span.to", parent).html(wpbingo.Currency.formatMoney(parseFloat(slide2, 10) * 100, moneyFormat2));
                }
                var width2 = 100 * slide2 / rangeS[1].max - 100 * slide1 / rangeS[0].max;
                var left2 = 100 * slide1 / rangeS[0].max;
                $(".slider-price", parent).css({
                  "--width": width2 + "%",
                  "--left": left2 + "%"
                });
              };
            });
            numberS.forEach(function (el) {
              el.oninput = function () {
                var number1 = parseFloat(numberS[0].value),
                  number2 = parseFloat(numberS[1].value);
                if (number1 > number2) {
                  var tmp = number1;
                  numberS[0].value = number2;
                  numberS[1].value = tmp;
                }
                rangeS[0].value = number1;
                rangeS[1].value = number2;
              };
            });
            var width = 100 * rangeS[1].value / rangeS[1].max - 100 * rangeS[0].value / rangeS[0].max;
            var left = 100 * rangeS[0].value / rangeS[0].max;
            $(".slider-price", parent).css({
              "--width": width + "%",
              "--left": left + "%"
            });
          }
        }]);
      }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
      customElements.define("price-range", PriceRange);
      var FacetRemove = /*#__PURE__*/function (_HTMLElement3) {
        "use strict";

        function FacetRemove() {
          var _this4;
          _classCallCheck(this, FacetRemove);
          _this4 = _callSuper(this, FacetRemove);
          _this4.querySelector("a").addEventListener("click", function (event) {
            event.preventDefault();
            var form = _this4.closest("facet-filters-form") || document.querySelector("facet-filters-form");
            form.onActiveFilterClick(event);
          });
          return _this4;
        }
        _inherits(FacetRemove, _HTMLElement3);
        return _createClass(FacetRemove);
      }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
      customElements.define("facet-remove", FacetRemove);
    }
  });

  // assets/main.js
  $(document).ready(function () {
    require_wpbingo();
    require_debounce();
    require_facets();
  });
})();