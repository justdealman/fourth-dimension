$(function() {
    svg4everybody();

    var $prevIcon = '<button class="slick-arrow slick-prev">' +
        '<svg>' +
            '<use xlink:href="./img/sprite.svg#arrow-left"></use>' +
        '</svg>' +
    '</button>',
        $nextIcon = '<button class="slick-arrow slick-next">' +
        '<svg>' +
            '<use xlink:href="./img/sprite.svg#arrow-right"></use>' +
        '</svg>' +
    '</button>';

    $('.js-hero').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        prevArrow: $prevIcon,
        nextArrow: $nextIcon,
        cssEase: 'ease',
        speed: 1000,
        responsive: [{
            breakpoint: 871,
            settings: {
                arrows: false
            }
        }]
    });

    $('.js-brands').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: $prevIcon,
        nextArrow: $nextIcon,
        cssEase: 'ease',
        speed: 500,
        infinite: false,
        responsive: [{
            breakpoint: 871,
            settings: {
                arrows: false,
                variableWidth: true
            }
        }]
    });

    $('.js-popular').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: $prevIcon,
        nextArrow: $nextIcon,
        cssEase: 'ease',
        speed: 500,
        infinite: false,
        responsive: [{
            breakpoint: 871,
            settings: 'unslick'
        }]
    });

    $('.js-benefits').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: $prevIcon,
        nextArrow: $nextIcon,
        cssEase: 'ease',
        speed: 500,
        responsive: [{
            breakpoint: 1183,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 871,
            settings: {
                arrows: false,
                variableWidth: true
            }
        }]
    });

    $('.js-catalog-tags').slick({
        slidesToShow: 12,
        dots: false,
        arrows: true,
        prevArrow: $prevIcon,
        nextArrow: $nextIcon,
        cssEase: 'ease',
        speed: 500,
        variableWidth: true,
        responsive: [{
            breakpoint: 871,
            settings: {
                arrows: false
            }
        }]
    });

    $('.js-viewed').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: $prevIcon,
        nextArrow: $nextIcon,
        cssEase: 'ease',
        speed: 500,
        responsive: [{
            breakpoint: 871,
            settings: {
                arrows: false,
                variableWidth: true,
                infinite: false
            }
        }]
    });

    $('.js-brand-models').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        prevArrow: $prevIcon,
        nextArrow: $nextIcon,
        cssEase: 'ease',
        speed: 500,
        infinite: false,
        responsive: [{
            breakpoint: 1680,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 871,
            settings: {
                variableWidth: true
            }
        }]
    });

    $('.js-toggle-favorite').on('click', function() {
        $(this).toggleClass('is-active');
    });

    $('.footer__title.is-nav').on('click', function() {
        $(this).toggleClass('is-opened');
    });

    $('.js-toggle-selection').on('click', function() {
        $(this).toggleClass('is-opened');
    });

    $('.filter-head_can-drop').on('click', function() {
        $(this).toggleClass('is-opened');
    });

    function filterActiveHighlight(el) {
        var container = el.parents('.js-filter-group');
        var items = container.find('.js-filter-group-item');
        var count = 0;
        items.each(function() {
            var t = $(this);
            if (t.hasClass('is-selected')) {
                count++;
            }
            t.removeClass('not-selected');
        });
        if (count > 0) {
            items.each(function() {
                var t = $(this);
                if (!t.hasClass('is-selected')) {
                    t.addClass('not-selected');
                }
            });
        }
    }

    $('.js-filter-group-item').on('click', function(event) {
        var t = $(this);
        if (!t.hasClass('is-selected') && !$(event.target).closest('.js-filter-group-remove').length) {
            t.addClass('is-selected');
            filterActiveHighlight(t);
        }
    });

    $('.js-filter-group-remove').on('click', function() {
        var el = $(this).parents('.js-filter-group-item');
        el.removeClass('is-selected');
        filterActiveHighlight(el);
    });

    $('.range').each(function() {
        var t = $(this);
        var min = parseInt(t.attr('data-min'));
        var max = parseInt(t.attr('data-max'));
        var $startInput = t.find('.range-input-start');
        var $endInput = t.find('.range-input-end');
        $('.range-slider').slider({
            range: true,
            min: min,
            max: max,
            values: [min, max],
            slide: function(event, ui) {
                $startInput.val(ui.values[0]);
                $endInput.val(ui.values[1]);
            }
        });
    });

    $('.footer-go-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
    });

	var isMobile = false,
		justSwitched = false;

	function detectDevice() {
		var temp = isMobile;
		isMobile = !!Modernizr.mq('(max-width: 870px)');
		justSwitched = temp !== isMobile;
	}

    function startApp() {
		detectDevice();
		if ( justSwitched ) {

		}
    }

    startApp();

    var lastWidth = $(window).width();
    $(window).on('resize', _.debounce(function() {
        if ( $(window).width() !== lastWidth ) {
            startApp();
            lastWidth = $(window).width();
        }
    }, 100));

    var $desktopNavBtn = $('.js-drop-open');
    var $drop = $('.js-drop');
    var dropDesktopTimeout;
    $('.js-drop-open, .js-drop').on('mouseenter', function() {
        clearTimeout(dropDesktopTimeout);
        $drop.addClass('is-desktop-opened');
        var id = $(this).attr('data-id');
        if (id) {
            $drop
                .find('.js-drop-elem')
                .removeClass('is-desktop-opened')
                .filter('[data-id="'+id+'"]')
                .addClass('is-desktop-opened');
            $desktopNavBtn.removeClass('is-active');
            $(this).addClass('is-active');
        }
    });
    $('.js-drop-open, .js-drop').on('mouseleave', function() {
        dropDesktopTimeout = setTimeout(function() {
            $drop.removeClass('is-desktop-opened');
            $desktopNavBtn.removeClass('is-active');
        }, 300);
    });
    $('.drop-group__title').on('click', function() {
        $(this).toggleClass('is-opened');
    });

    var $body = $('body');
    function openDropMobile() {
        $drop.addClass('is-mobile-opened');
        $body.addClass('is-mobile-drop');
    }
    function closeDropMobile() {
        $drop.removeClass('is-mobile-opened');
        $body.removeClass('is-mobile-drop');
    }
    $('.js-mobile-drop').on('click', function() {
        openDropMobile();
    });
    $('.js-drop-close').on('click', function() {
        closeDropMobile();
    });


    var $prevIconB = '<button class="slick-arrow slick-prev">' +
            '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M20.9648 28L12.9648 20L20.9648 12" stroke-width="2"/>' +
            '</svg>' +
        '</button>';
    var $nextIconB = '<button class="slick-arrow slick-next">' +
            '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M19.0352 12L27.0352 20L19.0352 28" stroke-width="2"/>' +
            '</svg>' +
        '</button>';

    $('.js-card-preview').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: $prevIconB,
        nextArrow: $nextIconB,
        cssEase: 'ease',
        speed: 500,
        vertical: true,
        responsive: [{
            breakpoint: 1183,
            settings: {
                vertical: false,
            }
        }]
    });
    $('.js-card-gallery').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: $prevIconB,
        nextArrow: $nextIconB,
        cssEase: 'ease',
        speed: 500,
        fade: true,
        responsive: [{
            breakpoint: 871,
            settings: {
                arrows: false,
                dots: true
            }
        }]
    });
    $('[data-preview-id]').on('click', function() {
        var id = $(this).attr('data-preview-id')-1;
        $('.js-card-gallery').slick('slickGoTo', id);
    });

    $('.plans-options__item').on('click', function() {
        $(this).addClass('is-active').siblings().removeClass('is-active');
    });

    $('[data-drop-btn]').on('click', function() {
        var $btn = $(this);
        var $content = $btn.parents('[data-drop]').find('[data-drop-content]');

        if ( !$btn.hasClass('is-active') ) {
            $content.addClass('is-visible');
            $btn.text('Свернуть');
        } else {
            $content.removeClass('is-visible');
            $btn.text('Подробнее');
        }

        !$btn.toggleClass('is-active');
    });

    $('[data-scroll-to]').on('click', function() {
        const el = $(this).attr('data-scroll-to');

        var gap = 30;
        if (isMobile) {
            gap = 20;
        }

        $('html, body').stop().animate({
            scrollTop: +$('[data-scroll-target="'+el+'"]').offset().top - gap
        }, 1000)
    });

    $('[data-amount-change]').on('click', function() {
        var t = $(this);

        if (!t.hasClass('is-disabled')) {
            var container = t.parents('[data-amount]'),
                value = container.find('[data-amount-value]'),
                input = container.find('[data-amount-input]'),
                minus = container.find('[data-amount-change="minus"]'),
                plus = container.find('[data-amount-change="plus"]');

            var val = +input.val();
            if (t.attr('data-amount-change') === 'minus') {
                val--;
            } else {
                val++;
            }

            if (val <=1) {
                minus.addClass('is-disabled');
            } else {
                minus.removeClass('is-disabled');
            }
            if ( val >= 100 ) {
                plus.addClass('is-disabled');
            } else {
                plus.removeClass('is-disabled');
            }

            value.text(val);
            input.val(val);
        }
    });

    $('[data-tab-open]').on('click', function() {
        var $t = $(this),
            id = $t.attr('data-tab-open'),
            $container = $t.parents('[data-tabs]'),
            $links = $container.find('[data-tab-open]'),
            $tabs = $container.find('[data-tab-target]');

        $links.removeClass('is-active');
        $t.addClass('is-active');

        $tabs
            .removeClass('is-opened')
            .filter('[data-tab-target="'+id+'"]')
            .addClass('is-opened');
    });
});
