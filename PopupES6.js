;(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], function (jQuery) {
            return factory(jQuery, document, window, navigator);
        });
    } else if (typeof exports === "object") {
        factory(require("jquery"), document, window, navigator);
    } else {
        factory(jQuery, document, window, navigator);
    }
}(function ($, document) {
    class Popup {
        constructor(element, settings) {
            this.element = $(element);

            if (typeof settings !== 'undefined') {

                if (settings.appendCloseBtn) {

                    this.closeButton;
                }
            }

            this.init();
        }

        init() {
            this.element.hide(0);

            $(this.element).closest('.popup-wrapper').attr('data-id', $(this.element).attr('id'));


            this.closePopup();
            this.openPopup();
            this.events();
        }

        events() {
            let _that = this;

            this.element.on({
                'open': function (e) {
                    _that.open(e.target);
                },
                'close': function (e) {
                    _that.close(e.target);
                }
            });
        }

        open() {
            $('body').append($(this.element)).addClass('popup-opened');
            this.element.stop().fadeIn(300).css({'visibility': 'visible'}).addClass('active');
        }

        close() {
            if ($('body').hasClass('popup-opened')) {
                $('body').removeClass('popup-opened');
                this.element.stop().fadeOut(300).removeClass('active');
                setTimeout( ()=> {
                    this.element.css({'visibility': 'hidden'});
                    const wrapper = $(`[data-id=${this.element.attr('id')}]`);
                    wrapper.append(this.element);
                }, 300);
                // window.location.hash = '';
            }
        }

        openPopup() {
            $('[data-popup-link]').on('click', function (e) {
                e.stopPropagation();
                e.preventDefault();

                if ($($(this).attr('href')).length != 0) {
                    $($(this).attr('href')).trigger('open');
                }
            });
        }

        closePopup() {

            this.element.on('click', function () {
                $(this).closest('[data-popup]').trigger('close');
            });

            this.element.find('.popup-close').on('click', function () {
                $(this).closest('[data-popup]').trigger('close');
            });

            this.element.children().on('click', function (e) {
                e.stopPropagation();
            });

        }

        get closeButton() {
            return $('<button>x</button>')
                .addClass('popup-close')
                .prependTo($(this.element).children());
        }
    }

    $.fn.popup = function () {
        var that = this,
            l = that.length,
            opt = arguments[0];

        for (var i = 0; i < l; i++) {
            if (typeof opt == 'object') {
                new Popup(that[i], opt);
            } else {
                new Popup(that[i]);
            }
        }
    };

    $(document).ready(function () {
        $('[data-popup]').popup({
            appendCloseBtn: true
        });

        $('[data-popup]')
            .on('open', function () {
                $(this).children().removeClass('fadeOut').addClass('fadeIn');
            })
            .on('close', function () {
                $(this).children().addClass('fadeOut').removeClass('fadeIn');
            });
    });
}));