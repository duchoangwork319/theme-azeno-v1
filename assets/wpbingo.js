window.wpbingo = window.wpbingo || {};

wpbingo.Sections = function Sections() {
	this.constructors = {};
	this.instances = [];

	$(document)
		.on('shopify:section:load', this._onSectionLoad.bind(this))
		.on('shopify:section:unload', this._onSectionUnload.bind(this))
		.on('shopify:section:select', this._onSelect.bind(this))
		.on('shopify:section:deselect', this._onDeselect.bind(this))
		.on('shopify:block:select', this._onBlockSelect.bind(this))
		.on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

wpbingo.Sections.prototype = _.assignIn({}, wpbingo.Sections.prototype, {
	_createInstance: function (container, constructor) {
		var $container = $(container);
		var id = $container.attr('data-section-id');
		var type = $container.attr('data-section-type');
		constructor = constructor || this.constructors[type];
		if (_.isUndefined(constructor)) {
			return;
		}
		var instance = _.assignIn(new constructor(container), {
			id: id,
			type: type,
			container: container
		});
		this.instances.push(instance);
	},

	_onSectionLoad: function (evt) {
		var container = $('[data-section-id]', evt.target)[0];
		if (container) {
			this._createInstance(container);
		}
	},

	_onSectionUnload: function (evt) {
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

	_onSelect: function (evt) {
		var instance = _.find(this.instances, function (instance) {
			return instance.id === evt.originalEvent.detail.sectionId;
		});
		if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
			instance.onSelect(evt);
		}
	},

	_onDeselect: function (evt) {
		var instance = _.find(this.instances, function (instance) {
			return instance.id === evt.originalEvent.detail.sectionId;
		});
		if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
			instance.onDeselect(evt);
		}
	},

	_onBlockSelect: function (evt) {
		var instance = _.find(this.instances, function (instance) {
			return instance.id === evt.originalEvent.detail.sectionId;
		});
		if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
			instance.onBlockSelect(evt);
		}
	},

	_onBlockDeselect: function (evt) {
		var instance = _.find(this.instances, function (instance) {
			return instance.id === evt.originalEvent.detail.sectionId;
		});
		if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
			instance.onBlockDeselect(evt);
		}
	},

	register: function (type, constructor) {
		this.constructors[type] = constructor;
		$('[data-section-type=' + type + ']').each(
			function (index, container) {
				this._createInstance(container, constructor);
			}.bind(this)
		);
	}
});

wpbingo.LibraryLoader = (function () {
	var types = {
		link: 'link',
		script: 'script'
	};
	var status = {
		requested: 'requested',
		loaded: 'loaded'
	};
	var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';
	var libraries = {
		youtubeSdk: {
			tagId: 'youtube-sdk',
			src: 'https://www.youtube.com/iframe_api',
			type: types.script
		},
		plyrShopifyStyles: {
			tagId: 'plyr-shopify-styles',
			src: cloudCdn + 'shopify-plyr/v1.0/shopify-plyr.css',
			type: types.link
		},
		modelViewerUiStyles: {
			tagId: 'shopify-model-viewer-ui-styles',
			src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
			type: types.link
		}
	};

	function load(libraryName, callback) {
		var library = libraries[libraryName];
		if (!library) return;
		if (library.status === status.requested) return;
		callback = callback || function () { };
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
		var tag = document.createElement('script');
		tag.src = library.src;
		tag.addEventListener('load', function () {
			library.status = status.loaded;
			callback();
		});
		return tag;
	}

	function createLinkTag(library, callback) {
		var tag = document.createElement('link');
		tag.href = library.src;
		tag.rel = 'stylesheet';
		tag.type = 'text/css';
		tag.addEventListener('load', function () {
			library.status = status.loaded;
			callback();
		});
		return tag;
	}

	return {
		load: load
	};
})();

wpbingo.Disclosure = (function () {
	var selectors = {
		disclosureInput: '[data-disclosure-input]',
		disclosureOptions: '[data-disclosure-option]'
	};
	function Disclosure($disclosure) {
		this.$container = $disclosure;
		this.cache = {};
		this._cacheSelectors();
		this._connectOptions();
	}
	Disclosure.prototype = _.assignIn({}, Disclosure.prototype, {
		_cacheSelectors: function () {
			this.cache = {
				$disclosureInput: this.$container.find(selectors.disclosureInput),
				$disclosureOptions: this.$container.find(selectors.disclosureOptions)
			};
		},
		_connectOptions: function () {
			this.cache.$disclosureOptions.on('click', function (evt) {
				evt.preventDefault();
				this._submitForm($(evt.currentTarget).data('value'));
			}.bind(this));
		},
		_submitForm: function (value) {
			this.cache.$disclosureInput.val(value);
			this.$container.parents('form').submit();
		},
		unload: function () {
			this.cache.$disclosureOptions.off();
			this.$container.off();
		}
	});
	return Disclosure;
})();

wpbingo.Currency = (function () {
	var moneyFormat = '${{amount}}';
	function formatMoney(cents, format) {
		if (typeof cents === 'string') {
			cents = cents.replace('.', '');
		}
		var value = '';
		var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
		var formatString = format || moneyFormat;

		function formatWithDelimiters(number, precision, thousands, decimal) {
			thousands = thousands || ',';
			decimal = decimal || '.';
			if (isNaN(number) || number === null) {
				return 0;
			}
			number = (number / 100.0).toFixed(precision);
			var parts = number.split('.');
			var dollarsAmount = parts[0].replace(
				/(\d)(?=(\d\d\d)+(?!\d))/g,
				'$1' + thousands
			);
			var centsAmount = parts[1] ? decimal + parts[1] : '';
			return dollarsAmount + centsAmount;
		}

		switch (formatString.match(placeholderRegex)[1]) {
			case 'amount':
				value = formatWithDelimiters(cents, 2);
				break;
			case 'amount_no_decimals':
				value = formatWithDelimiters(cents, 0);
				break;
			case 'amount_with_comma_separator':
				value = formatWithDelimiters(cents, 2, '.', ',');
				break;
			case 'amount_no_decimals_with_comma_separator':
				value = formatWithDelimiters(cents, 0, '.', ',');
				break;
			case 'amount_no_decimals_with_space_separator':
				value = formatWithDelimiters(cents, 0, ' ');
				break;
			case 'amount_with_apostrophe_separator':
				value = formatWithDelimiters(cents, 2, "'");
				break;
		}
		return formatString.replace(placeholderRegex, value);
	}
	return {
		formatMoney: formatMoney
	};
})();

wpbingo.collectionPages = (function () {
	var bwpFilter = '.js-page-collection',
		wpbingoCollectionProduct = '#JsCollectionProduct',
		wpbingoFilterContentProduct = '.js-collection-content-product',
		wpbingoFilterSidebar = '.collection-sidebar',
		wpbingoFilterTitle = '.wpbingo-breadcrumbs__inner',
		wpbingoFacetsContainer = '.active-facets-desktop',
		bwpChangeView = '.js-change-view',
		canbeloaded = true,
		bwpSortBy = '.js-sortby';

	var ajaxFilterParams,
		ajaxFilterGetCollectionUrl,
		ajaxFilterCreateUrl,
		ajaxFilterChangeView,
		ajaxFilterCategory,
		ajaxBreadcrumbsCategory,
		ajaxFilterLoadMore,
		ajaxFilterInfinity,
		ajaxFilterPaging;

	var init = function () {
		if ($(bwpFilter)) {
			var History = window.History;
			History.Adapter.bind(window, 'statechange', function () {
				History.getState();
			});
		}
		ajaxFilterParams();
		ajaxFilterChangeView();
		ajaxFilterCategory();
		ajaxBreadcrumbsCategory();
		ajaxFilterLoadMore();
		ajaxFilterInfinity();
		ajaxFilterPaging();
	};
	ajaxFilterParams = function () {
		Shopify.queryParams = {};
		if (location.search.length) {
			for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
				aKeyValue = aCouples[i].split('=');
				if (aKeyValue.length > 1) {
					Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
				}
			}
		}
	};
	ajaxFilterGetCollectionUrl = function (collection, url) {
		var str = url;
		var indexCollection = str.indexOf(collection);
		if (indexCollection < 0)
			return '';
		str = str.slice(indexCollection + collection.length, str.length);
		var indexSlash = str.indexOf('/') > -1 ? str.indexOf('/') : str.length;
		str = str.slice(0, indexSlash).toLowerCase();
		return str.replace('=', '');
	};
	ajaxFilterCreateUrl = function (baseLink) {
		var newQuery = $.param(Shopify.queryParams).replace(/%2B/g, '+');
		var collectionHandle = ajaxFilterGetCollectionUrl('/collections/', location.pathname);
		var pathName = '/collections/' + collectionHandle;
		var arrayUrl = location.pathname.split('/');
		if (arrayUrl.length >= 4) {
			var currentTagName = arrayUrl[3].split('?').shift();
			if (currentTagName != '') {
				newQuery = newQuery + '+' + currentTagName;
			}
		}
		if (baseLink) {
			if (newQuery != '')
				return baseLink + '?' + newQuery;
			else
				return baseLink;
		}
		return pathName + '?' + newQuery;
	};
	ajaxFilterChangeView = function () {
		cViewCollection = wpbingo.getCookie('wpbingo_view_collection');
		if (cViewCollection) {
			$(wpbingoCollectionProduct).removeAttr('class');
			$(wpbingoCollectionProduct).addClass(cViewCollection);
			$(bwpChangeView).removeClass('active');
			$('[data-view=' + cViewCollection + ']').addClass('active');
		}
		$(bwpFilter).on('click', bwpChangeView, function (e) {
			e.preventDefault();
			if (!$(this).hasClass('active')) {
				$('.product-card__image-wrapper.slider', wpbingoFilterContentProduct).each(function () {
					$('.js-carousel', $(this)).slick('refresh');
				});
				wpbingo.setCookie("wpbingo_view_collection", $(this).data('view'), 1);
				$(bwpChangeView).removeClass('active');
				$(this).addClass('active');
				$(wpbingoCollectionProduct).removeAttr('class');
				$(wpbingoCollectionProduct).addClass($(this).data('view'));
			}
		});
	};
	ajaxFilterPaging = function () {
		$(bwpFilter).on('click', '.js-collection-pagination a', function (e) {
			e.preventDefault();
			var pageURL = $(this).attr('href').match(/page=\d+/g);
			if (pageURL) {
				Shopify.queryParams.page = parseInt(pageURL[0].match(/\d+/g));
				var searchParams = (window.history.state && window.history.state.searchParams) ? window.history.state.searchParams : '';
				var newurl = ajaxFilterCreateUrl();
				history.pushState({ searchParams }, '', `${newurl}${searchParams && '&'.concat(searchParams)}`);
				$.ajax({
					type: 'get',
					url: `${newurl}${searchParams && '&'.concat(searchParams)}`,
					success: function (data) {
						$(wpbingoFilterContentProduct).replaceWith($(data).find(wpbingoFilterContentProduct));
						$('.product-card__image-wrapper.slider', wpbingoFilterContentProduct).each(function () {
							wpbingo.elementslickCarousel($('.js-carousel', $(this)));
						});
						if ($('.bwp_currency').length > 0) { Currency.Currency_customer(true); }
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
					error: function (xhr, text) {
						console.log(text);
					}
				});
				$('body,html').animate({
					scrollTop: $('.header').height()
				}, 600);
			}
		});
	};
	ajaxFilterLoadMore = function () {
		$(bwpFilter).on('click', '.js-collection-loadmore a', function (e) {
			e.preventDefault();
			var pageURL = $(this).attr('href');
			$(this).addClass('active');
			if (pageURL) {
				Shopify.queryParams.page = parseInt(pageURL.match(/\d+/g));
				var searchParams = (window.history.state && window.history.state.searchParams) ? window.history.state.searchParams : '';
				var newurl = ajaxFilterCreateUrl();
				$.ajax({
					type: 'get',
					url: pageURL,
					success: function (data) {
						$(".products__row", wpbingoFilterContentProduct).append($(data).find(".products__row").html());
						$('.js-collection-loadmore').empty();
						$(".js-collection-loadmore", wpbingoFilterContentProduct).append($(data).find(".js-collection-loadmore").html());
						$('#product_result_count').empty();
						$("#product_result_count", wpbingoFilterContentProduct).append($(data).find("#product_result_count").html());
						$('.product-card__image-wrapper.slider', wpbingoFilterContentProduct).each(function () {
							if (!$('.js-carousel', $(this)).hasClass("slick-initialized")) {
								wpbingo.elementslickCarousel($('.js-carousel', $(this)));
							}
						});
						if ($('.bwp_currency').length > 0) { Currency.Currency_customer(true); }
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
						$(this).removeClass('active');
					},
					error: function (xhr, text) {
						console.log(text);
					}
				});
			}
		});
	};
	ajaxFilterInfinity = function () {
		if ($(".js-collection-infinity").length > 0) {
			$(window).scroll(function () {
				if ($(document).scrollTop() > ($(document).height() - 2000) && canbeloaded == true && $(".js-collection-infinity >a").length > 0) {
					$(".js-collection-infinity a").addClass("active");
					var pageURL = $("a", ".js-collection-infinity").attr('href');
					if (pageURL) {
						Shopify.queryParams.page = parseInt(pageURL[0].match(/\d+/g));
						var searchParams = (window.history.state && window.history.state.searchParams) ? window.history.state.searchParams : '';
						var newurl = ajaxFilterCreateUrl();
						$.ajax({
							type: 'get',
							url: pageURL,
							beforeSend: function (xhr) {

								canbeloaded = false;
							},
							success: function (data) {
								canbeloaded = true;
								$(".products__row", wpbingoFilterContentProduct).append($(data).find(".products__row").html());
								$('.js-collection-infinity').empty();
								$(".js-collection-infinity", wpbingoFilterContentProduct).append($(data).find(".js-collection-infinity").html());
								$('#product_result_count').empty();
								$("#product_result_count", wpbingoFilterContentProduct).append($(data).find("#product_result_count").html());
								$('.product-card__image-wrapper.slider', wpbingoFilterContentProduct).each(function () {
									if (!$('.js-carousel', $(this)).hasClass("slick-initialized")) {
										wpbingo.elementslickCarousel($('.js-carousel', $(this)));
									}
								});
								if ($('.bwp_currency').length > 0) { Currency.Currency_customer(true); }
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
							error: function (xhr, text) {
								console.log(text);
							}
						});
					}
				}
			});
		}
	};
	ajaxFilterCategory = function ($element) {
		var wpbingoFacetsWrapper = '.FacetsWrapperDesktop ';
		if ($element) {
			var $categories = $element;
		} else {
			var $categories = $('.sidebar-categories');
		}
		if ($('.wpbingo-breadcrumbs').hasClass('have-collection')) {
			var $collection = true;
		}
		$($categories).on('click', 'a', function (e) {
			e.preventDefault();
			var pageURL = $(this).attr('href');
			var newTitle = $(this).attr('title');
			History.pushState({
				param: Shopify.queryParams
			}, pageURL, pageURL);
			delete Shopify.queryParams.page;
			$("#pre-loading").addClass('load-product');
			$('#pre-loading .pre-loading__bar').css({ "width": "40%" });
			$.ajax({
				type: 'get',
				url: pageURL,
				success: function (data) {
					document.title = newTitle;
					$(wpbingoFilterContentProduct).replaceWith($(data).find(wpbingoFilterContentProduct));
					$(wpbingoFilterSidebar).replaceWith($(data).find(wpbingoFilterSidebar));
					$(wpbingoFilterTitle).replaceWith($(data).find(wpbingoFilterTitle));
					$(wpbingoFacetsContainer).replaceWith($(data).find(wpbingoFacetsContainer));
					if ($('.js-page-collection').hasClass('dropdown')) {
						$(wpbingoFacetsWrapper).replaceWith($(data).find(wpbingoFacetsWrapper));
						wpbingo.countActiveSidebar();
					}
					$('.wpbingo-section--collection-breadcrumb').replaceWith($(data).find('.wpbingo-section--collection-breadcrumb'));
					if ($collection) {
						wpbingo.elementslickCarousel($('.wpbingo-breadcrumbs__image .js-carousel'));
					}
					ajaxFilterCategory();
					ajaxBreadcrumbsCategory($('.wpbingo-breadcrumbs .bwp_slider-carousel'));
					wpbingo.click_atribute_image();
					wpbingo.zoom_thumb();
					$('.product-card__image-wrapper.slider', wpbingoFilterContentProduct).each(function () {
						wpbingo.elementslickCarousel($('.js-carousel', $(this)));
					});
					if ($('.bwp_currency').length > 0) { Currency.Currency_customer(true); }
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
					$('#pre-loading .pre-loading__bar').css({ "width": "100%" });
					setTimeout(function () {
						$('#pre-loading .pre-loading__bar').css({ "width": "0" });
						$("#pre-loading").removeClass('load-product');
					}, 500);
				},
				error: function (xhr, text) {
					console.log(text);
				}
			});
			$('body,html').animate({
				scrollTop: $('.header').height() + $('.wpbingo-breadcrumbs').height()
			}, 600);
		});
	};
	ajaxBreadcrumbsCategory = function ($element) {
		if ($element) {
			var $categories = $element;
		} else {
			var $categories = $('.wpbingo-breadcrumbs .bwp_slider-carousel');
		}
		if ($('.wpbingo-breadcrumbs').hasClass('have-collection')) {
			var $collection = true;
		}
		$($categories).on('click', 'a', function (e) {
			e.preventDefault();
			var pageURL = $(this).attr('href');
			var newTitle = $("h2", $(this)).text();
			History.pushState({
				param: Shopify.queryParams
			}, pageURL, pageURL);
			delete Shopify.queryParams.page;
			$("#pre-loading").addClass('load-product');
			$('#pre-loading .pre-loading__bar').css({ "width": "40%" });
			$.ajax({
				type: 'get',
				url: pageURL,
				success: function (data) {
					document.title = newTitle;
					$(wpbingoFilterContentProduct).replaceWith($(data).find(wpbingoFilterContentProduct));
					$(wpbingoFilterSidebar).replaceWith($(data).find(wpbingoFilterSidebar));
					$(wpbingoFilterTitle).replaceWith($(data).find(wpbingoFilterTitle));
					$(wpbingoFacetsContainer).replaceWith($(data).find(wpbingoFacetsContainer));
					$('.wpbingo-section--collection-breadcrumb').replaceWith($(data).find('.wpbingo-section--collection-breadcrumb'));
					ajaxFilterCategory($('.sidebar-categories'));
					$('.product-card__image-wrapper.slider', wpbingoFilterContentProduct).each(function () {
						wpbingo.elementslickCarousel($('.js-carousel', $(this)));
					});
					if ($('.bwp_currency').length > 0) { Currency.Currency_customer(true); }
					ajaxBreadcrumbsCategory();
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
					if (!$('.js-page-collection').hasClass('dropdown')) {
						wpbingo.toggleSidebar();
					}
					if ($collection) {
						wpbingo.elementslickCarousel($('.wpbingo-breadcrumbs__image .js-carousel'));
					}
					ajaxFilterChangeView();
					$('#pre-loading .pre-loading__bar').css({ "width": "100%" });
					setTimeout(function () {
						$('#pre-loading .pre-loading__bar').css({ "width": "0" });
						$("#pre-loading").removeClass('load-product');
					}, 500);
				},
				error: function (xhr, text) {
					console.log(text);
				}
			});
			$('body,html').animate({
				scrollTop: $('.header').height()
			}, 600);
		});
	};
	return init;
})();

wpbingo.Variants = (function () {
	function Variants(options) {
		this.$container = options.$container;
		this.product = options.product;
		this.productSelectOption = options.productSelectOption;
		this.singleOptionSelector = options.singleOptionSelector;
		this.originalSelectorId = options.originalSelectorId;
		this.enableHistoryState = options.enableHistoryState;
		this.variantGallery = options.variantGallery;
		this.settings = options.settings;
		this.currentVariant = this._getVariantFromOptions();
		$(this.singleOptionSelector, this.$container).on(
			'change', this._onSelectChange.bind(this)
		);
	}

	Variants.prototype = _.assignIn({}, Variants.prototype, {
		_getCurrentOptions: function () {
			var currentOptions = _.map(
				$(this.singleOptionSelector, this.$container),
				function (element) {
					var $element = $(element);
					var type = $element.attr('type');
					var currentOption = {};
					if (type === 'radio' || type === 'checkbox') {
						if ($element[0].checked) {
							currentOption.value = $element.val();
							currentOption.index = $element.data('index');
							return currentOption;
						} else {
							return false;
						}
					} else {
						currentOption.value = $element.val();
						currentOption.index = $element.data('index');
						return currentOption;
					}
				}
			);
			currentOptions = _.compact(currentOptions);
			return currentOptions;
		},

		_getVariantFromOptions: function () {
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
		 * @param {*} variant 
		 * @returns {Array} - An array of high-resolution gallery images.
		 */
		_getVariantGallery: function (variant) {
			if (!this.variantGallery || this.variantGallery.length === 0) return [];
			let found = this.variantGallery.find(item => item.id === variant.id);
			return found ? found.variantGalleryHiRes : [];
		},
		/**
		 * @typedef {Object} GalleryImage
		 * @property {string} id - The unique identifier for the gallery item.
		 * @property {string} thumbnailUrl - The URL of the thumbnail image for the gallery item.
		 * @property {string} mediaUrl - The URL of the high-resolution image for the gallery item.
		 * @property {string} mediaType - The type of media (e.g., "image").
		 * @property {string} alt - The alternative text for the image.
		 * @property {string} width - The width of the image in pixels.
		 * @property {string} height - The height of the image in pixels.
		 * @property {string} sectionId - The section ID associated with the gallery item.
		 */
		/**
		 * Updates the product thumbnails Slick carousel with new gallery images.
		 * @param {Array<GalleryImage>} galleryImages - An array of gallery images to display.
		 * @returns {void}
		 */
		_updateProductThumbnailsSlick: function (galleryImages) {
			if (!galleryImages || galleryImages.length === 0) return;
			let html = galleryImages.map(item => {
				let isVideo = item.mediaType === 'video' || item.mediaType === 'external_video' || item.mediaType === 'model';
				let player = isVideo ? `
			<div class="product-single__thumbnail-badge ${item.mediaType}">
				${item.mediaType === 'model' ? '<i class="icon-model"></i>' : '<i class="feather-play"></i>'}
			</div>
			` : '';

				return `
			<div class="product-single__thumbnail-wrapper">
				<div class="product-media__wrapper">
					<a
					href="javascript:void(0)"
					class="${isVideo ? 'product-single__video' : 'product-single__thumbnail'}"
					data-media="${item.mediaUrl}"
					data-media-id="${item.sectionId}-${item.id}"
					data-product-thumbnail
					>
					<img
						class="product-image__thumb lazyload fade-in"
						src="${item.thumbnailUrl}"
						alt="${item.alt || ''}"
						width="${item.width || ''}"
						height="${item.height || ''}"
					/>
					${player}
					</a>
				</div>
			</div>
			`;
			}).join('');

			$('body').trigger('wpbingo:thumb:unslick');
			$('body').trigger('wpbingo:thumb:html', html);
			$('body').trigger('wpbingo:thumb:slick');
		},
		/**
		 * Updates the main product media Slick carousel with new gallery images.
		 * @param {Array<GalleryImage>} galleryImages - An array of gallery images to display.
		 * @returns {void}
		 */
		_updateProductMediaSlick: function (galleryImages) {
			if (!galleryImages || galleryImages.length === 0) return;

			let html = galleryImages.map((item, index) => {
				return `
				<div class="js-product-media-item product-single__media-item" data-slick-media-label="${item.alt || ''}">
					<div
						class="js-product-media product-media"
						data-media-id="${item.id}"
						tabindex="-1"
					>
						<div class="product-media__wrapper product-media__wrapper--image">
							<img
								class="mfp-image lazyload fade-in"
								src="${item.mediaUrl}"
								data-sizes="auto"
								data-image="true"
								data-number="${index}"
								data-media-id="${item.id}"
								width="${item.width}"
								height="${item.height}"
								alt="${item.alt}"
							/>
							<div class="gallery-cursor"></div>
						</div>
					</div>
				</div>
				`;
			}).join('');

			$('body').trigger('wpbingo:media:unslick');
			$('body').trigger('wpbingo:media:html', html);
			$('body').trigger('wpbingo:media:slick');
		},

		_onSelectChange: function () {
			var variant = this._getVariantFromOptions();
			if ($('[data-single-option-button]', this.$container).length && $('.color-select', this.$container).length < 1) {
				this._updateVariantsButton();
				if (!variant || !variant.available) {
					this._updateVariantsButtonDisabed();
					return;
				}
			}
			this.$container.trigger({
				type: 'variantChange',
				variant: variant
			});
			if (!variant) return;
			this._updateMasterSelect(variant);
			this._updateMedia(variant);
			var galleryImages = this._getVariantGallery(variant);
			this._updateProductThumbnailsSlick(galleryImages);
			this._updateProductMediaSlick(galleryImages);
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
		},

		_updateVariantsButtonDisabed: function () {
			for (var i = 2; i <= 3; i++) {
				if ($(this.productSelectOption + i, this.$container).length) {
					var isUpdate = false;
					$(this.productSelectOption + i + ' ' + this.singleOptionSelector, this.$container).each(function () {
						var $element = $(this);
						var type = $element.attr('type');
						if (type === 'radio' || type === 'checkbox') {
							if (this.checked && $element.hasClass('disabled')) {
								$element.prop('checked', false);
								isUpdate = true;
								return false;
							}
						}
					});
					$(this.productSelectOption + i + ' ' + this.singleOptionSelector, this.$container).each(function () {
						var $element = $(this);
						var type = $element.attr('type');
						if (isUpdate && (type === 'radio' || type === 'checkbox') && !$element.hasClass('disabled')) {
							$element.prop('checked', true);
							isUpdate = false;
							$element.trigger('change');
							return false;
						}
					});
				}
			}
		},

		_updateVariantsButton: function () {
			var selectedValues = this._getCurrentOptions();
			var variants = this.product.variants;
			for (var i = 2; i <= 3; i++) {
				if ($(this.productSelectOption + i, this.$container).length) {
					var $parent = this.productSelectOption + i;
					$($parent + ' ' + this.singleOptionSelector, this.$container).each(function () {
						var $self = $(this);
						var optionValue = $self.val();
						var foundIndex;
						if (i === 2) {
							foundIndex = _.findIndex(variants, function (variant) {
								variant.option1 = variant.option1.toString();
								selectedValues[0].value = selectedValues[0].value.toString();
								variant.option2 = variant.option2.toString();
								optionValue = optionValue.toString();
								return variant.option1 === selectedValues[0].value &&
									variant.option2 === optionValue &&
									variant.available === true;
							});

						} else if (i === 3) {
							foundIndex = _.findIndex(variants, function (variant) {
								variant.option1 = variant.option1.toString();
								variant.option2 = variant.option2.toString();
								variant.option3 = variant.option3.toString();
								selectedValues[0].value = selectedValues[0].value.toString();
								selectedValues[1].value = selectedValues[1].value.toString();
								optionValue = optionValue.toString();
								return variant.option1 === selectedValues[0].value && variant.option2 === selectedValues[1].value &&
									variant.option3 === optionValue &&
									variant.available === true;
							});
						}
						if (foundIndex !== -1) {
							if ($($parent + '.color-select', this.$container).length > 0) {
								$self.removeClass('disabled');
								$self.next('label').removeClass('disabled');
							} else {
								$self.removeAttr('disabled', 'disabled').removeClass('disabled');
								$self.next('label').removeClass('disabled');
							}

						} else {
							if ($($parent + '.color-select', this.$container).length > 0) {
								$self.addClass('disabled');
								$self.next('label').addClass('disabled');
							} else {
								$self.attr('disabled', 'disabled').addClass('disabled');
								$self.next('label').addClass('disabled');
							}
						}
					});
				}
			}
		},

		_updateMedia: function (variant) {
			var variantMedia = variant.featured_media || {};
			var currentVariantMedia = this.currentVariant.featured_media || {};
			var isMatchingPreviewImage = false;
			if (variantMedia.preview_image && currentVariantMedia.preview_image) {
				isMatchingPreviewImage = variantMedia.preview_image.src === currentVariantMedia.preview_image.src;
			}
			if (!variant.featured_media || isMatchingPreviewImage) return;
			this.$container.trigger({
				type: 'variantMediaChange',
				variant: variant
			});

		},

		_updatePrice: function (variant) {
			if ($('.bwp_currency').length > 0) { Currency.Currency_customer(true); }
			if (
				variant.price === this.currentVariant.price &&
				variant.compare_at_price === this.currentVariant.compare_at_price
			) {
				return;
			}
			this.$container.trigger({
				type: 'variantPriceChange',
				variant: variant
			});
		},

		_updateQuantity: function (variant) {
			if ($(".product-single .content-variant_inventory").length > 0) {
				setTimeout(function () { $(".product-single .content-variant_inventory").load(window.location.href + ".content-variant_inventory .js-product-avaiable"); }, 10);
			}
		},

		_updateOption: function () {
			setTimeout(function () { $("#option-selector").load(window.location.href + " #option-selector"); }, 10);
		},

		_updatePricesticky: function () {
			setTimeout(function () { $("#price-sticky").load(window.location.href + " #price-sticky"); }, 10);
		},

		_updateSKU: function (variant) {
			if (variant.sku === this.currentVariant.sku) {
				return;
			}
			this.$container.trigger({
				type: 'variantSKUChange',
				variant: variant
			});
		},
		_updateLabelvariant: function (variant) {
			try {
				var $element = $('.product-single .product-single__form .variants-wrapper')
				$('.mutil_slider-single').removeClass('active');
				$($element).each(function () {
					var $this = $(this);
					if ($("select", $this).length > 0) {
						var value = $("select", $this).find(':selected').val();
					} else {
						var value = $('input:checked', $this).attr('value');
					}
					$('.variants__label span', $this).html(value);
					$('.mutil_slider-single.' + value + '').addClass('active');
				});
			} catch (error) {
				console.log(error);
			}
		},
		_updateHistoryState: function (variant) {
			if (!history.replaceState || !variant) {
				return;
			}
			var newurl =
				window.location.protocol +
				'//' +
				window.location.host +
				window.location.pathname +
				'?variant=' +
				variant.id;
			window.history.replaceState({ path: newurl }, '', newurl
			);
			if ($(".product-single #buy_more_form").length > 0) {
				$('#buy_more_form input[name="items[][id]"]').attr('value', variant.id);
				wpbingo.discount_single();
			}
		},

		_updatePickUp: function (variant) {
			if ($(".product-single .product-single__pick_up").length > 0) {
				$('.product-single .product-single__pick_up').addClass('load-pick_up').css("height", $('.product-single .product-single__pick_up').height() + 'px');
				$(".product-single .product-single__pick_up").empty();
				wpbingo.pick_up(variant.id);
				setTimeout(function () {
					$('.product-single .product-single__pick_up').removeClass('load-pick_up').removeAttr('style');
				}, 1000);
			}
		},
		_updateBtnText: function (variant) {
			if ($(".product-single .product-single__buttons .btn--add-to-cart .btn__text").length > 0) {
				setTimeout(function () { $(".product-single .product-single__buttons .btn--add-to-cart").load(window.location.href + " .btn__text"); }, 10);
			}
			if ($(".sticky-cart-single").length > 0) {
				setTimeout(function () { $(".sticky-cart-single .btn--add-to-cart").load(window.location.href + " .btn__text"); }, 10);
			}
		},
		_updateDelivery: function (variant) {
			if ($(".product-single .estimated_delivery").length > 0 && $(".product-single .section-estimated_delivery[data-incoming]").length > 0) {
				$('.product-single .section-estimated_delivery').addClass('load-delivery').css("height", $('.product-single .section-estimated_delivery').height() + 'px');
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
						$('.product-single .section-estimated_delivery').removeClass('load-delivery').removeAttr('style');
					}
				}, 1400);
			}
		},
		_updateMasterSelect: function (variant) {
			$(this.originalSelectorId, this.$container).val(variant.id);
		}
	});

	return Variants;
})();

wpbingo.ProductModel = (function () {
	var modelJsonSections = {};
	var models = {};
	var xrButtons = {};
	var selectors = {
		productMediaGroup: '.c',
		productMediaGroupWrapper: '.js-product-single-media',
		xrButton: '[data-shopify-xr]',
		xrButtonSingle: '[data-shopify-xr-single]'
	};

	var classes = {
		viewInSpaceDisabled: 'product-single__view-in-space--disabled'
	};

	function init(modelViewerContainers, sectionId) {
		modelJsonSections[sectionId] = {
			loaded: false
		};

		modelViewerContainers.each(function (index) {
			var $modelViewerContainer = $(this);
			var mediaId = $modelViewerContainer.data('media-id');
			var $modelViewerElement = $(
				$modelViewerContainer.find('model-viewer')[0]
			);
			var modelId = $modelViewerElement.data('model-id');

			if (index === 0) {
				var $xrButton = $modelViewerContainer
					.closest(selectors.productMediaGroupWrapper)
					.find(selectors.xrButtonSingle);

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

		window.Shopify.loadFeatures([
			{
				name: 'shopify-xr',
				version: '1.0',
				onLoad: setupShopifyXr
			}
		]);

		if (models.length < 1) return;
		window.Shopify.loadFeatures([
			{
				name: 'model-viewer-ui',
				version: '1.0',
				onLoad: setupModelViewerUi
			}
		]);
		wpbingo.LibraryLoader.load('modelViewerUiStyles');
	}

	function setupShopifyXr(errors) {
		if (errors) return;
		if (!window.ShopifyXR) {
			document.addEventListener('shopify_xr_initialized', function (event) {
				if (event.detail.shopifyXREnabled) {
					setupShopifyXr();
				} else {
					$(selectors.xrButton).addClass(classes.viewInSpaceDisabled);
				}
			});
			return;
		}

		for (var sectionId in modelJsonSections) {
			if (modelJsonSections.hasOwnProperty(sectionId)) {
				var modelSection = modelJsonSections[sectionId];
				if (modelSection.loaded) continue;
				var $modelJson = $('#ModelJson-' + sectionId);
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
		var $productMediaGroup = model.$container.closest(
			selectors.productMediaGroup
		);

		model.$element
			.on('shopify_model_viewer_ui_toggle_play', function () {
				wpbingo.updateSlickSwipe($productMediaGroup, false);
			})
			.on('shopify_model_viewer_ui_toggle_pause', function () {
				wpbingo.updateSlickSwipe($productMediaGroup, true);
			});

		model.$container.on('mediaVisible', function () {
			xrButton.$element.attr('data-shopify-model3d-id', model.modelId);
			model.modelViewerUi.play();
		});

		model.$container
			.on('mediaHidden', function () {
				xrButton.$element.attr('data-shopify-model3d-id', xrButton.defaultId);
				model.modelViewerUi.pause();
			})
			.on('xrLaunch', function () {
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
		init: init,
		removeSectionModels: removeSectionModels
	};
})();

function onYouTubeIframeAPIReady() {
	wpbingo.ProductVideo.loadVideos(wpbingo.ProductVideo.hosts.youtube);
}

wpbingo.ProductVideo = (function () {
	var videos = {};
	var hosts = {
		html5: 'html5',
		youtube: 'youtube'
	};
	var selectors = {
		productMediaWrapper: '.js-product-media',
		productMediaGroup: '.js-product-media-group',
	};
	var attributes = {
		enableVideoLooping: 'enable-video-looping',
		videoId: 'video-id'
	};

	function init(videoContainer, sectionId) {
		if (!videoContainer.length) {
			return;
		}
		var videoElement = videoContainer.find('iframe, video')[0];
		var mediaId = videoContainer.data('mediaId');
		if (!videoElement) {
			return;
		}
		videos[mediaId] = {
			mediaId: mediaId,
			sectionId: sectionId,
			host: hostFromVideoElement(videoElement),
			container: videoContainer,
			element: videoElement,
			ready: function () {
				createPlayer(this);
			}
		};
		var video = videos[mediaId];
		switch (video.host) {
			case hosts.html5:
				window.Shopify.loadFeatures([
					{
						name: 'video-ui',
						version: '1.1',
						onLoad: setupPlyrVideos
					}
				]);
				wpbingo.LibraryLoader.load('plyrShopifyStyles');
				break;
			case hosts.youtube:
				wpbingo.LibraryLoader.load('youtubeSdk');
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
		var productMediaWrapper = video.container.closest(
			selectors.productMediaWrapper
		);
		var enableLooping = productMediaWrapper.data(attributes.enableVideoLooping);
		switch (video.host) {
			case hosts.html5:
				video.player = new Shopify.Plyr(video.element, {
					loop: { active: enableLooping }
				});
				var $productMediaGroup = $(video.container).closest(
					selectors.productMediaGroup
				);
				video.player.on('seeking', function () {
					wpbingo.updateSlickSwipe($productMediaGroup, false);
				});
				video.player.on('seeked', function () {
					wpbingo.updateSlickSwipe($productMediaGroup, true);
				});
				break;
			case hosts.youtube:
				var videoId = productMediaWrapper.data(attributes.videoId);
				video.player = new YT.Player(video.element, {
					videoId: videoId,
					events: {
						onStateChange: function (event) {
							if (event.data === 0 && enableLooping) event.target.seekTo(0);
						}
					}
				});
				break;
		}

		productMediaWrapper.on('mediaHidden xrLaunch', function () {
			if (!video.player) return;
			if (video.host === hosts.html5) {
				video.player.pause();
			}
			if (video.host === hosts.youtube && video.player.pauseVideo) {
				video.player.pauseVideo();
			}
		});

		productMediaWrapper.on('mediaVisible', function () {
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
		if (video.tagName === 'VIDEO') {
			return hosts.html5;
		}
		if (video.tagName === 'IFRAME') {
			if (
				/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
					video.src
				)
			) {
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
					video.element.setAttribute('controls', 'controls');
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
		init: init,
		hosts: hosts,
		loadVideos: loadVideos,
		removeSectionVideos: removeSectionVideos
	};
})();

// PRODUCT SECTION
wpbingo.Product = (function () {
	function Product(container) {
		var $window = $(window);
		var $container = (this.$container = $(container));
		var sectionId = $container.attr('data-section-id');
		this.settings = {
			productPageLoad: false,
			preloadImage: false,
			enableHistoryState: $container.data('enable-history-state'),
			namespace: '.productSection',
			sectionId: sectionId
		};
		this.selectors = {
			productMediaGroup: '.js-product-media-group',
			productMediaGroupItem: '.js-product-media-item',
			productMediaWrapper: '.js-product-media',
			productMediaTypeModel: '[data-product-media-type-model]',
			productMediaTypeVideo: '[data-product-media-type-video]',
			productThumbnails: '.js-product-thumbnails',
			buyTogether: '.buy-together-products',
			productThumbnail: '[data-product-thumbnail]',
			productImageZoom: '[data-mfp-src]',
			meta: '.product-single__meta',
			productWrapper: '.product-single',
			productSelectOption: '.js-product-select-option--',
			originalSelectorId: '.js-product-select',
			singleOptionSelector: '.js-single-option-selector',
			slickDots: '[data-slick-dots]',
			slickNext: '[data-slick-next]',
			slickPrevious: '[data-slick-previous]',
			variantColor: '[data-color]',
		};
		this.classes = {
			hide: 'd-none',
			priceContainerUnitAvailable: 'price-container--unit-available',
			productInventoryInStock: 'product-avaiable__text--instock',
			productInventoryOutStock: 'product-avaiable__text--outstock',
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
			infinite: $(this.selectors.productMediaGroup).data('infinite') ? true : false,
			draggable: $(this.selectors.productMediaGroup).data('draggable') ? true : false,
			adaptiveHeight: true,
			fade: $(this.selectors.productMediaGroup).data('fade') ? true : false,
			customPaging: function (slick, index) {
				var slideA11yString = wpbingo.strings.productSlideLabel
					.replace('[slide_number]', index + 1)
					.replace('[slide_max]', slick.slideCount);

				var mediaA11yString = $(
					'[data-slick-index="' + index + '"]',
					this.$container
				).data('slick-media-label');

				var ariaCurrent = index === 0 ? ' aria-current="true"' : '';
				return (
					'<a href="javascript:void(0)' +
					'" aria-label="' +
					slideA11yString +
					' ' +
					mediaA11yString +
					'" aria-controls="slick-slide0' +
					index +
					'"' +
					ariaCurrent +
					'></a>'
				);
			}.bind(this)
		};
		if (!$('#ProductJson-' + sectionId).html()) {
			return;
		}
		this.productSingleObject = JSON.parse(
			document.getElementById('ProductJson-' + sectionId).innerHTML
		);
		this.variantGalleryObject = JSON.parse(
			document.getElementById('VariantGalleryJson-' + sectionId).innerHTML
		);

		this.zoomType = $container.data('image-zoom-type');
		this.isStackedLayout = $container.data('stacked-layout');
		this.isNothumLayout = $container.data('nothum');
		this.focusableElements = [
			'iframe',
			'input',
			'button',
			'video',
			'[tabindex="0"]'
		].join(',');

		this.slickThumbsSettings = {
			slidesToShow: $(this.selectors.productThumbnails).data('columns'),
			slidesToScroll: 1,
			rows: 0,
			accessibility: true,
			arrows: true,
			dots: false,
			infinite: false,
			focusOnSelect: true,
			adaptiveHeight: true,
			rtl: ($('body').hasClass("rtl") && !$(this.selectors.productThumbnails).data('vertical')) ? true : false,
			vertical: $(this.selectors.productThumbnails).data('vertical') ? true : false,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 4,
						vertical: false,
					}
				},
			]
		};

		if (!this.isStackedLayout && !this.isNothumLayout && $(this.selectors.productMediaGroup, this.$container) && $(this.selectors.productThumbnails, this.$container)) {
			this.slickMediaSettings.asNavFor = this.selectors.productThumbnails + '-' + sectionId;
			this.slickThumbsSettings.asNavFor = this.selectors.productMediaGroup + '-' + sectionId;
		} else {
			if ($(window).width() < 991 && $(this.selectors.productWrapper).data('layout_thumb') == 'gird-sticky') {
				this.slickMediaSettings.asNavFor = this.selectors.productThumbnails + '-' + sectionId;
				this.slickThumbsSettings.asNavFor = this.selectors.productMediaGroup + '-' + sectionId;
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

		var $element = $(".product-single");
		var _data = $element.data();
		$('.product-single__video img').css("width", $(".product-single__thumbnail img").width());
		$('.product-single__video img').css("height", ($(".product-single__thumbnail img").height() - 2.5));
		$window
			.on('load' + this.settings.namespace, wpbingo.initStickyProductMeta)
			.on(
				'resize' + this.settings.namespace,
				wpbingo.debounce(this.initStickyProductMeta, 150).bind(this)
			);
	}

	Product.prototype = _.assignIn({}, Product.prototype, {
		initBreakpoints: function () {
			var self = this;
			if (!self.isStackedLayout) {
				self.createMediaCarousel();
				self.createThumbnailCarousel();
			} else {
				if ($(window).width() < 991) {
					self.createMediaCarousel();
					self.createThumbnailCarousel();
				} else {
					enquire.register(wpbingo.variables.mediaMobile, {
						match: function () {
							self.createMediaCarousel();
						},
						unmatch: function () {
							self.destroyMediaCarousel();
						}
					});
				}
			}
		},
		initProductVariant: function () {
			var options = {
				$container: this.$container,
				enableHistoryState: this.settings.enableHistoryState || false,
				productSelectOption: this.selectors.productSelectOption,
				singleOptionSelector: this.selectors.singleOptionSelector,
				originalSelectorId: this.selectors.originalSelectorId + '--' + this.settings.sectionId,
				product: this.productSingleObject,
				variantGallery: this.variantGalleryObject,
				settings: {
					slickThumbsSettings: this.slickThumbsSettings
				}
			};
			var count = $(this.selectors.productThumbnails, this.$container).data('columns');
			this.variants = new wpbingo.Variants(options);
			var featured_media = this.variants.currentVariant.featured_media;
			if (!$('.js-product-single-media').hasClass('no-variants') && !$('.js-product-single-media >.row').hasClass('mutil_slider-single') && featured_media) {
				this.showVariantMedia(this.variants.currentVariant, true);
			}
			this.$container.on('variantChange' + this.settings.namespace, this.productPage.bind(this));
			this.$container.on('variantMediaChange' + this.settings.namespace, this.showVariantMedia.bind(this));
			if (this.variants.product.media.length <= count) {
				$(this.selectors.productThumbnails, this.$container).addClass('no-transform');
			}
		},
		initModelViewerLibraries: function () {
			if (!this.$container.data('has-model')) return;
			var $modelViewerElements = $(
				this.selectors.productMediaTypeModel,
				this.$container
			);
			wpbingo.ProductModel.init($modelViewerElements, this.settings.sectionId);
		},

		initShopifyXrLaunch: function () {
			$(document).on(
				'shopify_xr_launch',
				function () {
					var $currentMedia = $(
						this.selectors.productMediaWrapper +
						':not(.' +
						this.classes.hide +
						')',
						this.$container
					);
					$currentMedia.trigger('xrLaunch');
				}.bind(this)
			);
		},

		initProductVideo: function () {
			var sectionId = this.settings.sectionId;

			$(this.selectors.productMediaTypeVideo, this.$container).each(function () {
				var $videoContainer = $(this);
				wpbingo.ProductVideo.init($videoContainer, sectionId);
			});
		},

		trapCarouselFocus: function ($slider, removeFocusTrap) {
			if (!$slider) return;

			$slider
				.find('.slick-slide:not(.slick-active)')
				.find(this.focusableElements)
				.attr('tabindex', removeFocusTrap ? '0' : '-1');

			$slider
				.find('.slick-active')
				.find(this.focusableElements)
				.attr('tabindex', '0');
		},

		updateCarouselDotsA11y: function (nextSlide) {
			var $dotLinks = $(this.selectors.slickDots).find('a');
			$dotLinks
				.removeAttr('aria-current')
				.eq(nextSlide)
				.attr('aria-current', 'true');
		},
		view_gallery_product: function () {
			$element = $(".product-single");
			$(".product-media__wrapper.product-media__wrapper--image", $element).bind("click", function (e) {
				e.preventDefault();
				var groups = $(this).closest('.js-product-media-group');
				var items = [];
				var gallery = [];
				var $j = 0;
				var $i = 0;
				$('.js-product-media-item', groups).each(function () {
					$("img", $(this)).data("number", $j);
					if ($("img", $(this)).data("image") == true) {
						var $href = $("img", $(this)).attr("src");
						if ($href) {
							gallery[$j] = { "href": $href };
							$j++;
						}
					}
				});
				if (gallery) {
					$.each(gallery, function (key, value) {
						if (value) {
							items[$i] = { "src": value.href, w: $(".mfp-image", $element).width() * 3, h: $(".mfp-image", $element).height() * 3 };
							$i++;
						}
					});
					var pswpElement = document.querySelectorAll('.pswp')[0];
					var options = {
						index: $("img", $(this)).data("number"),
						closeOnScroll: false,
						history: false,
						shareEl: false,
					};
					var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
					gallery.init();
				}
			});
		},
		event_buy_together: function () {
			$(document).on('change', '#buy_together_form .item-product input[type="checkbox"]', function (e) {
				var $this = $(this);
				if ($this.closest('.item-product').hasClass('active')) {
					$this.closest('.item-product').removeClass('active');
				} else {
					$this.closest('.item-product').addClass('active');
				}
				moneyFormat = wpbingo.strings.moneyFormat;
				var $thisWrap = $this.closest('.item-products-wrap');
				var $thisWpbingoWrap = $thisWrap.closest('.buy-together-products');
				var $thisProductsBtWrap = $thisWpbingoWrap.find('.item-products-wrap');
				var total_items = 0;
				var total_price = 0;
				$thisWrap.find('.item-product').each(function () {
					var this_product_id = $(this).attr('data-product_id');
					if ($(this).hasClass('active')) {
						$('input[type="hidden"]', $(this)).prop('disabled', false);
						$('input[type="number"]', $(this)).prop('disabled', false);
						if ($('select', $(this)).length > 0) {
							var this_price = $('select', $(this)).find(':selected').data('price');
							$('select', $(this)).prop('disabled', false);
						} else {
							var this_price = $('input[type="checkbox"]', $(this)).attr('data-price');
						}
						if (!isNaN(this_price)) {
							total_price = Number(total_price) + Number(this_price);
						}
						Number(total_items++);
						$thisProductsBtWrap.find('.item-product-inner[data-product_id="' + this_product_id + '"]').removeClass('buy-together-hidden');
					}
					else {
						$thisProductsBtWrap.find('.item-product-inner[data-product_id="' + this_product_id + '"]:not(.buy-together-content)').addClass('buy-together-hidden');
						$('input[type="hidden"]', $(this)).prop('disabled', true);
						$('input[type="number"]', $(this)).prop('disabled', true);
						if ($('select', $(this)).length > 0) {
							$('select', $(this)).prop('disabled', true);
						}
					}
				});
				$thisWpbingoWrap.find('.for-items-text span').html(total_items);
				$thisWpbingoWrap.find('.total-price-html span').html('<span class="money">' + wpbingo.Currency.formatMoney(total_price, moneyFormat) + '</span>');
				if ($('.bwp_currency').length > 0) { Currency.Currency_customer(true); }
			});
			$(document).on('change', '#buy_together_form .item-product select', function (e) {
				moneyFormat = wpbingo.strings.moneyFormat;
				var $this = $(this);
				var $thisWrap = $this.closest('.item-products-wrap');
				var $thisWpbingoWrap = $thisWrap.closest('.buy-together-products');
				var total_items = 0;
				var total_price = 0;
				var $parent = $(this).closest('.item-product');
				var this_product_id = $parent.attr('data-product_id');
				var $parent_image = $(this).closest('.buy-together-products').find('.item-product-inner[data-product_id="' + this_product_id + '"]');
				var this_price_selected = $(this).find(':selected').data('price');
				var this_image_selected = $(this).find(':selected').data('image');
				$('.buy-together-price', $parent).html('<span class="money">' + wpbingo.Currency.formatMoney(this_price_selected, moneyFormat) + '</span>');
				if (this_image_selected) {
					$(".image img", $parent_image).attr("src", this_image_selected);
					$(".image img", $parent_image).attr("srcset", this_image_selected);
				}
				$thisWrap.find('.item-product').each(function () {
					if ($(this).hasClass('active')) {
						if ($('select', $(this)).length > 0) {
							var this_price = $('select', $(this)).find(':selected').data('price');
						} else {
							var this_price = $('input[type="checkbox"]', $(this)).attr('data-price');
						}
						if (!isNaN(this_price)) {
							total_price = Number(total_price) + Number(this_price);
						}
						Number(total_items++);
					}
				});
				$thisWpbingoWrap.find('.total-price-html span').html('<span class="money">' + wpbingo.Currency.formatMoney(total_price, moneyFormat) + '</span>');
				if ($('.bwp_currency').length > 0) { Currency.Currency_customer(true); }
			});
			$('#buy_together_form .buy-together-add-all-to-cart').on('click', function (e) {
				e.preventDefault();
				$(this).addClass('active');
				let addToCartForm = document.querySelector('#buy_together_form');
				let formData = new FormData(addToCartForm);
				var params = {
					type: 'POST',
					url: '/cart/add.js',
					data: formData,
					processData: false,
					contentType: false,
					dataType: 'json',
					success: function (line_item) {
						$('.buy-together-add-all-to-cart').removeClass('active');
						ajaxCart.load();
						if ($('.js-drawer').length) {
							$('body').addClass('drawer--open');
						}
						$('.js-drawer-close').on('click', function () {
							$('body').removeClass('drawer--open');
						});
					},
					error: function (XMLHttpRequest, textStatus) {
						if (typeof errorCallback === 'function') {
							errorCallback(XMLHttpRequest, textStatus);
						} else {
							ShopifyAPI.onError(XMLHttpRequest, textStatus);
						}
					}
				};
				jQuery.ajax(params);
			});
		},

		event_group_product: function () {
			$('#group_table_product .add-group-to-cart').on('click', function (e) {
				e.preventDefault();
				$(this).removeClass('added');
				$(this).addClass('active');
				let addToCartForm = document.querySelector('#group_table_product');
				let formData = new FormData(addToCartForm);
				var params = {
					type: 'POST',
					url: '/cart/add.js',
					data: formData,
					processData: false,
					contentType: false,
					dataType: 'json',
					success: function (line_item) {
						$('#group_table_product .add-group-to-cart').removeClass('active');
						$('#group_table_product .add-group-to-cart').addClass('added');
						setTimeout(function () {
							$('#group_table_product .add-group-to-cart').removeClass('added');
						}, 3000);
						ajaxCart.load();
						if ($('.js-drawer').length > 0) {
							$('body').addClass('drawer--open');
						}
						$('.js-drawer-close').on('click', function () {
							$('body').removeClass('drawer--open');
						});
					},
					error: function (XMLHttpRequest, textStatus) {
						if (typeof errorCallback === 'function') {
							errorCallback(XMLHttpRequest, textStatus);
						} else {
							ShopifyAPI.onError(XMLHttpRequest, textStatus);
						}
					}
				};
				jQuery.ajax(params);
			});
		},

		translateCarouselDots: function (totalSlides, nextSlide, dotStyle) {
			if (totalSlides <= dotStyle.max) {
				return;
			}
			var calculatedTranslateDistance = 0;
			var maxTranslateDistance = (totalSlides - dotStyle.max) * dotStyle.width;
			if (nextSlide >= dotStyle.max - 1) {
				calculatedTranslateDistance =
					(nextSlide + 2 - dotStyle.max) * dotStyle.width;
				calculatedTranslateDistance =
					maxTranslateDistance < calculatedTranslateDistance
						? maxTranslateDistance
						: calculatedTranslateDistance;
			}
			$(this.selectors.slickDots).find('ul').css('transform', 'translateX(-' + calculatedTranslateDistance + 'px)');
		},

		triggerMediaChangeEvent: function (mediaId) {
			var $otherMedia = $(this.selectors.productMediaWrapper, this.$container);
			$otherMedia.trigger('mediaHidden');
			var $newMedia = $(
				this.selectors.productMediaWrapper,
				this.$container
			).filter('[data-media-id="' + mediaId + '"]');
			$newMedia.trigger('mediaVisible');
		},

		showVariantMedia: function (evt, check) {
			if (check) {
				var variant = evt;
			} else {
				var variant = evt.variant;
			}
			var variantMediaId =
				this.settings.sectionId + '-' + variant.featured_media.id;
			var $newMedia = $(
				this.selectors.productMediaWrapper +
				'[data-media-id="' +
				variantMediaId +
				'"]'
			);
			this.triggerMediaChangeEvent(variantMediaId);

			var mediaIndex;

			if (!wpbingo.variables.isMobile && this.isStackedLayout) {
				mediaIndex = $newMedia.closest('.slick-slide').index();
				if (mediaIndex !== 0 || wpbingo.variables.productPageLoad) {
					if (wpbingo.variables.productPageSticky) {
						$('html, body').animate(
							{
								scrollTop: $newMedia.offset().top
							}, 250
						);
					} else {
						var currentScroll = $(document).scrollTop();
						$newMedia
							.closest(
								$(this.selectors.productMediaGroupItem, this.$container)
							)
							.prependTo(
								$(this.selectors.productMediaGroup, this.$container)
							);
						$(document).scrollTop(currentScroll);
					}
				}
			} else {
				mediaIndex = $newMedia.closest('.slick-slide').data('slick-index');
				if (_.isUndefined(mediaIndex)) {
					return;
				}
				if (mediaIndex !== 0 || wpbingo.variables.productPageLoad) {
					$(this.selectors.productMediaGroup, this.$container).slick(
						'slickGoTo',
						mediaIndex
					);
				}
			}
			if (!wpbingo.variables.productPageLoad) {
				wpbingo.variables.productPageLoad = true;
			}
		},

		setFeaturedMedia: function () {
			var mediaId = $(this.selectors.productMediaGroup, this.$container)
				.find('.slick-slide.slick-current.slick-active ' + this.selectors.productMediaWrapper)
				.attr('data-media-id');
			this.triggerMediaChangeEvent(mediaId);
		},

		createMediaCarousel: function () {
			if ($(this.selectors.productMediaGroupItem).length < 2 || !$(this.selectors.productMediaGroup, this.$container) || this.isCarouselActive) {
				return;
			}
			this.isCarouselActive = true;
			var dotStyle = {
				max: 9,
				width: 20
			};
			var focusTrapped = false;
			$(this.selectors.productMediaGroupItem, this.$container).on(
				'focusin',
				function () {
					if (focusTrapped) {
						return;
					}
					this.trapCarouselFocus($(this.selectors.productMediaGroup));
					focusTrapped = true;
				}.bind(this)
			);
			if ($('.mutil_slider-single').length > 0) {
				var sectionId = this.settings.sectionId;
				var $config = this.slickMediaSettings;
				if (!this.isStackedLayout && !this.isNothumLayout && $(this.selectors.productMediaGroup, this.$container) && $(this.selectors.productThumbnails, this.$container)) {
					var asNavFor = true;
				}
				$('.mutil_slider-single').each(function (index) {
					$config['nextArrow'] = $(("[data-slick-next]"), $(this));
					$config['prevArrow'] = $(("[data-slick-previous]"), $(this));
					if (asNavFor) {
						$config['asNavFor'] = '.js-product-thumbnails' + '-' + sectionId + '-' + (index + 1);
					}
					$('.js-product-media-group', $(this)).slick($config);
				});
			} else {
				$('body').on('wpbingo:media:slick', function () {
					$(this.selectors.productMediaGroup, this.$container).slick(this.slickMediaSettings).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
						this.updateCarouselDotsA11y(nextSlide);
						this.translateCarouselDots(slick.slideCount, nextSlide, dotStyle);
					}.bind(this));
				}.bind(this));
				$('body').on('wpbingo:media:html', function (event, html) {
					$(this.selectors.productMediaGroup, this.$container).empty().html(html);
				}.bind(this));
				$('body').on('wpbingo:media:unslick', function () {
					$(this.selectors.productMediaGroup, this.$container).slick('unslick');
				}.bind(this));
				$('body').trigger('wpbingo:media:slick');
			}
		},

		destroyMediaCarousel: function () {
			if (!$(this.selectors.productMediaGroup, this.$container).length ||
				!this.isCarouselActive) {
				return;
			}
			this.trapCarouselFocus(
				$(this.selectors.productMediaGroup, this.$container),
				true
			);
			$(this.selectors.productMediaGroup, this.$container).slick('unslick');
			this.isCarouselActive = false;
		},

		createThumbnailCarousel: function () {
			if ($('.mutil_slider-single').length > 0) {
				var sectionId = this.settings.sectionId;
				var $configThumb = this.slickThumbsSettings;
				if (!this.isStackedLayout && !this.isNothumLayout && $(this.selectors.productMediaGroup, this.$container) && $(this.selectors.productThumbnails, this.$container)) {
					var asNavFor = true;
				}
				$('.mutil_slider-single').each(function (index) {
					if (asNavFor) {
						$configThumb.asNavFor = '.js-product-media-group' + '-' + sectionId + '-' + (index + 1);
					}
					$('.js-product-thumbnails', $(this)).slick($configThumb);
				});
			} else {
				