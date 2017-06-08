(function ($) {

    var Popup = window.Popup || {};

    Popup = (function () {

        $('[data-popup-link]').on('click', function (e) {
            e.stopPropagation();

            if ($($(this).attr('href')).length != 0) {
                $($(this).attr('href')).trigger('open');
            }
        });

        function Popup(element, settings) {
        	// console.log(settings);
            this.element = $(element);
            console.log()
            // if (settings typeof == 'undefined') {
            	if (settings.appenCloseBtn) {
	            	this.createCloseButton();
	            }
            // }
            
            this.init();
        }

        return Popup;

    }());

    Popup.prototype.init = function () {

        this.element.css({
            'visibility': 'hidden',
            'opacity': 0,
        });

        $('body').append($(this.element));

        this.closePopup();
        this.events();
    };

    Popup.prototype.events = function () {
        var _that = this;

        this.element.on({
            'open': function (e) {
                _that.open(e.target);
            },
            'close': function (e) {
                _that.close(e.target);
            }
        });
    };

    Popup.prototype.open = function () {
        this.element.css({
            'opacity': 1,
            'visibility': 'visible'
        });
    };

    Popup.prototype.close = function () {
        this.element.css({
            'opacity': 0,
            'visibility': 'hidden'
        });
    };

    Popup.prototype.createCloseButton = function () {
        return $('<button>x</button>')
            .addClass('popup-close')
            .prependTo($(this.element).children());
    };

    Popup.prototype.closePopup = function () {

    	var _that = this.element;

        this.element.find('.popup-close').on('click', function () {
            $(this).closest('[data-popup]').trigger('close');
        });

        $(document).on('click', this.element, function () {
            _that.trigger('close');
        });

        $(document).on('click', function () {
            _that.trigger('close');
        });

        this.element.children().on('click', function (e) {
            e.stopPropagation();
        });

    };

    $.fn.popup = function () {
        var that = this,
            l = that.length,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined') {
              that[i].popup = new Popup(that[i], opt);
            } else {
            	that[i].popup = new Popup(that[i]);
            }
        }
    };

    $(document).ready(function () {
        $('[data-popup]').popup();
        $('[data-popup]')
            .on('open', function () {
                $(this).children().addClass('fadeIn');
            })
            .on('close', function () {
                $(this).children().removeClass('fadeIn');
            });
    });

})(jQuery);