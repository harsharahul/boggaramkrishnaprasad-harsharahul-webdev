/*!
 * Bootstrap Confirmation 2.4.0
 * Copyright 2013 Nimit Suwannagate <ethaizone@hotmail.com>
 * Copyright 2014-2016 Damien "Mistic" Sorel <contact@git.strangeplanet.fr>
 * Licensed under the Apache License, Version 2.0
 */
!function ($) {
    "use strict";
    function a(a) {
        for (var b = window, c = a.split("."), d = c.pop(), e = 0, f = c.length; e < f; e++)b = b[c[e]];
        return function () {
            b[d].call(this)
        }
    }

    var b;
    if (!$.fn.popover)throw new Error("Confirmation requires popover.js");
    var c = function (a, b) {
        b.trigger = "click", this.init(a, b)
    };
    c.VERSION = "2.4.0", c.KEYMAP = {
        13: "Enter",
        27: "Escape",
        39: "ArrowRight",
        40: "ArrowDown"
    }, c.DEFAULTS = $.extend({}, $.fn.popover.Constructor.DEFAULTS, {
        placement: "top",
        title: "Are you sure?",
        popout: !1,
        singleton: !1,
        copyAttributes: "href target",
        buttons: null,
        onConfirm: $.noop,
        onCancel: $.noop,
        btnOkClass: "btn-xs btn-primary",
        btnOkIcon: "glyphicon glyphicon-ok",
        btnOkLabel: "Yes",
        btnCancelClass: "btn-xs btn-default",
        btnCancelIcon: "glyphicon glyphicon-remove",
        btnCancelLabel: "No",
        template: '<div class="popover confirmation"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"><p class="confirmation-content"></p><div class="confirmation-buttons text-center"><div class="btn-group"><a href="#" class="btn" data-apply="confirmation"></a><a href="#" class="btn" data-dismiss="confirmation"></a></div></div></div></div>'
    }), c.prototype = $.extend({}, $.fn.popover.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.init = function (a, b) {
        if ($.fn.popover.Constructor.prototype.init.call(this, "confirmation", a, b), (this.options.popout || this.options.singleton) && !b.rootSelector)throw new Error("The rootSelector option is required to use popout and singleton features since jQuery 3.");
        this.options._isDelegate = !1, b.selector ? this.options._selector = this._options._selector = b.rootSelector + " " + b.selector : b._selector ? (this.options._selector = b._selector, this.options._isDelegate = !0) : this.options._selector = b.rootSelector;
        var c = this;
        this.options.selector ? this.$element.on(this.options.trigger, this.options.selector, function (a, b) {
            b || (a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation())
        }) : (this.options._attributes = {}, this.options.copyAttributes ? "string" == typeof this.options.copyAttributes && (this.options.copyAttributes = this.options.copyAttributes.split(" ")) : this.options.copyAttributes = [], this.options.copyAttributes.forEach(function (a) {
            this.options._attributes[a] = this.$element.attr(a)
        }, this), this.$element.on(this.options.trigger, function (a, b) {
            b || (a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation())
        }), this.$element.on("show.bs.confirmation", function (a) {
            c.options.singleton && $(c.options._selector).not($(this)).filter(function () {
                return void 0 !== $(this).data("bs.confirmation")
            }).confirmation("hide")
        })), this.options._isDelegate || (this.eventBody = !1, this.uid = this.$element[0].id || this.getUID("group_"), this.$element.on("shown.bs.confirmation", function (a) {
            c.options.popout && !c.eventBody && (c.eventBody = $("body").on("click.bs.confirmation." + c.uid, function (a) {
                $(c.options._selector).is(a.target) || ($(c.options._selector).filter(function () {
                    return void 0 !== $(this).data("bs.confirmation")
                }).confirmation("hide"), $("body").off("click.bs." + c.uid), c.eventBody = !1)
            }))
        }))
    }, c.prototype.hasContent = function () {
        return !0
    }, c.prototype.setContent = function () {
        var a = this, c = this.tip(), d = this.getTitle(), e = this.getContent();
        if (c.find(".popover-title")[this.options.html ? "html" : "text"](d), c.find(".confirmation-content").toggle(!!e).children().detach().end()[this.options.html ? "string" == typeof e ? "html" : "append" : "text"](e), c.on("click", function (a) {
                a.stopPropagation()
            }), this.options.buttons) {
            var f = c.find(".confirmation-buttons .btn-group").empty();
            this.options.buttons.forEach(function (b) {
                f.append($('<a href="#"></a>').addClass(b["class"] || "btn btn-xs btn-default").html(b.label || "").attr(b.attr || {}).prepend($("<i></i>").addClass(b.icon), " ").one("click", function (c) {
                    "#" === $(this).attr("href") && c.preventDefault(), b.onClick && b.onClick.call(a.$element), b.cancel ? (a.getOnCancel.call(a).call(a.$element), a.$element.trigger("canceled.bs.confirmation")) : (a.getOnConfirm.call(a).call(a.$element), a.$element.trigger("confirmed.bs.confirmation")), a.inState && (a.inState.click = !1), a.hide()
                }))
            }, this)
        } else c.find('[data-apply="confirmation"]').addClass(this.options.btnOkClass).html(this.options.btnOkLabel).attr(this.options._attributes).prepend($("<i></i>").addClass(this.options.btnOkIcon), " ").off("click").one("click", function (b) {
            "#" === $(this).attr("href") && b.preventDefault(), a.getOnConfirm.call(a).call(a.$element), a.$element.trigger("confirmed.bs.confirmation"), a.$element.trigger(a.options.trigger, [!0]), a.hide()
        }), c.find('[data-dismiss="confirmation"]').addClass(this.options.btnCancelClass).html(this.options.btnCancelLabel).prepend($("<i></i>").addClass(this.options.btnCancelIcon), " ").off("click").one("click", function (b) {
            b.preventDefault(), a.getOnCancel.call(a).call(a.$element), a.$element.trigger("canceled.bs.confirmation"), a.inState && (a.inState.click = !1), a.hide()
        });
        c.removeClass("fade top bottom left right in"), c.find(".popover-title").html() || c.find(".popover-title").hide(), b = this, $(window).off("keyup.bs.confirmation").on("keyup.bs.confirmation", this._onKeyup.bind(this))
    }, c.prototype.destroy = function () {
        b === this && (b = void 0, $(window).off("keyup.bs.confirmation")), $.fn.popover.Constructor.prototype.destroy.call(this)
    }, c.prototype.hide = function () {
        b === this && (b = void 0, $(window).off("keyup.bs.confirmation")), $.fn.popover.Constructor.prototype.hide.call(this)
    }, c.prototype._onKeyup = function (a) {
        if (!this.$tip)return b = void 0, void $(window).off("keyup.bs.confirmation");
        var d, e = a.key || c.KEYMAP[a.keyCode || a.which], f = this.$tip.find(".confirmation-buttons .btn-group"),
            g = f.find(".active");
        switch (e) {
            case"Escape":
                this.hide();
                break;
            case"ArrowRight":
                d = g.length && g.next().length ? g.next() : f.children().first(), g.removeClass("active"), d.addClass("active").focus();
                break;
            case"ArrowLeft":
                d = g.length && g.prev().length ? g.prev() : f.children().last(), g.removeClass("active"), d.addClass("active").focus()
        }
    }, c.prototype.getOnConfirm = function () {
        return this.$element.attr("data-on-confirm") ? a(this.$element.attr("data-on-confirm")) : this.options.onConfirm
    }, c.prototype.getOnCancel = function () {
        return this.$element.attr("data-on-cancel") ? a(this.$element.attr("data-on-cancel")) : this.options.onCancel
    };
    var d = $.fn.confirmation;
    $.fn.confirmation = function (a) {
        var b = "object" == typeof a && a || {};
        return b.rootSelector = this.selector || b.rootSelector, this.each(function () {
            var d = $(this), e = d.data("bs.confirmation");
            (e || "destroy" != a) && (e || d.data("bs.confirmation", e = new c(this, b)), "string" == typeof a && (e[a](), "hide" == a && e.inState && (e.inState.click = !1)))
        })
    }, $.fn.confirmation.Constructor = c, $.fn.confirmation.noConflict = function () {
        return $.fn.confirmation = d, this
    }
}(jQuery);