var transparent = true;
var big_image;
var transparentDemo = true;
var fixedTop = false;
var navbar_initialized,
backgroundOrange = false,
toggle_initialized = false;
var nowuiKit,
$navbar,
scroll_distance,
oVal;
$(document).ready(function() {
    $('#overlay li a').click(function() {
        $('#overlay').removeClass('open');
    });

    $('.form-control').on("focus", function() {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function() {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    if ($(window).width() >= 992) {
        big_image = $('.page-header-image[data-parallax="true"]');
        $(window).on('scroll', nowuiKitDemo.checkScrollForParallax);
    }

    $(window).scroll(function() {
        var sticky = $('.header'),
        scroll = $(window).scrollTop();
    });

    $('select').niceSelect();

    $('#toggle').click(function() {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
        $('.header').toggleClass('menu-open');
    });
    
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000, 'linear');
    });
    // --------------------------------------
    // Back to top
    // --------------------------------------
    $("#toTop").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
    });
    // --------------------------------------
    // game play slider
    // --------------------------------------
    $('.gameplay-slider').owlCarousel({
        loop: true,
        nav: true,
        items: 1,
        dots: false,
        onInitialized: counter, //When the plugin has initialized.
        onTranslated: counter //When the translation of the stage has finished.
    });

    function counter(event) {
        var element = event.target; // DOM element, in this example .owl-carousel
        var items = event.item.count; // Number of items
        var item = event.item.index + 1; // Position of the current item
        // it loop is true then reset counter from 1
        if (item > items) {
            item = item - items
        }
        $('#counter').html(item + " / " + items)
    }
});
// Javascript just for Demo purpose, remove it from your project
nowuiKitDemo = {
    checkScrollForParallax: debounce(function() {
        var current_scroll = $(this).scrollTop();
        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform': 'translate3d(0,' + oVal + 'px,0)',
            '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
        });
    }, 6)
}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
        args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};
$(window).on('resize', function() {
    nowuiKit.initNavbarImage();
});
$(document).on('click', '.navbar-toggler', function() {
    $toggle = $(this);
    if (nowuiKit.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        nowuiKit.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function() {
            $toggle.removeClass('toggled');
        }, 550);
    } else {
        setTimeout(function() {
            $toggle.addClass('toggled');
        }, 580);
        div = '<div id="bodyClick"></div>';
        $(div).appendTo('body').click(function() {
            $('html').removeClass('nav-open');
            nowuiKit.misc.navbar_menu_visible = 0;
            setTimeout(function() {
                $toggle.removeClass('toggled');
                $('#bodyClick').remove();
            }, 550);
        });
        $('html').addClass('nav-open');
        nowuiKit.misc.navbar_menu_visible = 1;
    }
});
nowuiKit = {
    misc: {
        navbar_menu_visible: 0
    },
    checkScrollForTransparentNavbar: debounce(function() {
        if ($(document).scrollTop() > scroll_distance) {
            if (transparent) {
                transparent = false;
                $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar[color-on-scroll]').addClass('navbar-transparent');
            }
        }
    }, 17),
    initNavbarImage: function() {
        var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
        var background_image = $navbar.data('nav-image');
        if (background_image != undefined) {
            if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
                $navbar.css('background', "url('" + background_image + "')").removeAttr('data-nav-image').css('background-size', "cover").addClass('has-image');
            } else {
                $navbar.css('background', "").attr('data-nav-image', '' + background_image + '').css('background-size', "").removeClass('has-image');
            }
        }
    },
}
// Javascript just for Demo purpose, remove it from your project
nowuiKitDemo = {
    checkScrollForParallax: debounce(function() {
        var current_scroll = $(this).scrollTop();
        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform': 'translate3d(0,' + oVal + 'px,0)',
            '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
        });
    }, 6)
}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
        args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};