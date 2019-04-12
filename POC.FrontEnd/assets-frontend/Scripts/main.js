$(function () {
    $('.news-slider-imgs-wrap').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        //asNavFor: '.news-slider-list-body'
    });

    // Count
    var count = $('.news-slider-list .item').length;

    $('.news-slider-list').slick({
        slidesToShow: count,
        arrows: false,
        asNavFor: '.news-slider-imgs-wrap'
    });

    $('.news-slider-imgs-wrap').on('afterChange', function (event, slick, currentSlideIndex) {
        $('.news-slider-list .item').each(function () {
            if ($(this).data('slick-index') == currentSlideIndex) {
                $('.news-slider-list .item').removeClass('active');
                $(this).addClass('active');
            }
        });
    });

    //$('.news-slider-list .item').on('click', function () {
    //    //$('.news-slider-list .item').removeClass('active');
    //    //$(this).addClass('active');
    //    var index = $(this).data('slick-index');
    //    //$('.news-slider-imgs-wrap').slick('slickGoTo', index);
    //});

    $('.news-slider-list .item').on('mouseover', function (e) {
        e.preventDefault();
        var slideIndex = $(this).index();
        $('.news-slider-list .item').removeClass('active');
        $(this).addClass('active');
        var index = $(this).data('slick-index');
        $('.news-slider-imgs-wrap').slick('slickGoTo', slideIndex, true);
    }).on('mouseout', function () {
        return false;
    });;

    //$(".news-slider-list .item").hover(function () {
    //    $('.news-slider-list .item').removeClass('active');
    //    $(this).addClass('active');
    //    var index = $(this).data('slick-index');
    //    $('.news-slider-imgs-wrap').slick('slickGoTo', index);
    //});

    $('#top-nav .parent-level').hover(
       function () { //over
           $('.child-level').addClass('hidden');
           var id = $(this).data('id');
           $('.child-level[data-id="' + id + '"]').removeClass('hidden');
       },
       function () { //out
           var isOut = true;
           var id = $(this).data('id');

           $('.child-level[data-id="' + id + '"]').hover(
               function () {
                   isOut = false;
               },
               function () { //out
                   $(this).addClass('hidden');
               }
           );

           setTimeout(function () {
               if (isOut) {
                   $('.child-level[data-id="' + id + '"]').addClass('hidden');
               }
           }, 100);
       }
   );

    $('.information-wrap-content').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.information-wrap-navigation .slick-prev'),
        nextArrow: $('.information-wrap-navigation .slick-next'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.img-gallery-content').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000
    });


    /*************************************VIDEO PAGE****************************************/
    $('.video-slider-list-body').slick({
        slidesToShow: 4,
        arrows: true,
        prevArrow: $('.video-slider-list-action .slick-prev'),
        nextArrow: $('.video-slider-list-action .slick-next'),
    });

    $('.video-slider-list-item a').on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        $('.video-slider-big-wrap .item').addClass('hidden');
        $('.video-slider-big-wrap .item').each(function () {
            if ($(this).data('id') == id)
                $(this).removeClass("hidden");
        });
    });


    $('.album-wrap').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.album-navigation .slick-prev'),
        nextArrow: $('.album-navigation .slick-next'),
    });

    /************* CHANGE FONT LEVEL *********************/
    var fontLevel = 2;
    var getFontLevel = function (level) {
        if (level == 1) {
            return {
                add: 'font-12',
                remove: 'font-14 font-16 font-20'
            }
        }
        if (level == 2) {
            return {
                add: 'font-14',
                remove: 'font-12 font-16 font-20'
            }
        }
        if (level == 3) {
            return {
                add: 'font-16',
                remove: 'font-12 font-14 font-20'
            }
        }
        if (level == 4) {
            return {
                add: 'font-20',
                remove: 'font-12 font-14 font-26'
            }
        }
    }
    $('#btnIncreaseFontSize').on('click', function () {
        var divNewsDetails = $('#divNewsDetails');
        if (fontLevel < 4) fontLevel = fontLevel + 1;
        else fontLevel = 4;
        var c = getFontLevel(fontLevel);
        divNewsDetails.removeClass(c.remove);
        divNewsDetails.addClass(c.add);
    });
    $('#btnDecreaseFontSize').on('click', function () {
        var divNewsDetails = $('#divNewsDetails');
        if (fontLevel > 1) fontLevel = fontLevel - 1;
        else fontLevel = 1;
        var c = getFontLevel(fontLevel);
        divNewsDetails.removeClass(c.remove);
        divNewsDetails.addClass(c.add);
    });
    
    $('#btnIncreaseFontSize').on('click', function () {
        var divDescription = $('#divDescription');
        if (fontLevel < 4) fontLevel = fontLevel + 1;
        else fontLevel = 4;
        var c = getFontLevel(fontLevel);
        divDescription.removeClass(c.remove);
        divDescription.addClass(c.add);
    });
    $('#btnDecreaseFontSize').on('click', function () {
        var divDescription = $('#divDescription');
        if (fontLevel > 1) fontLevel = fontLevel - 1;
        else fontLevel = 1;
        var c = getFontLevel(fontLevel);
        divDescription.removeClass(c.remove);
        divDescription.addClass(c.add);
    });

  
    // Remove the visibility of sliders
    $(".news-slider-imgs").css("display", "");
    $(".img-gallery-content").css("display", "");


});

/************************************* VAN BAN DEN ****************************************/
$('#btnSearch').on('click', function () {

    var searchVanBan = $('#txtSearchVanBan').val();

    var url = "http://csdl.ubdt.gov.vn/noidung/pages/vanbanden.aspx?type=nom&vbdTrichYeu=" + searchVanBan;

    window.open(url, '_blank');
});


/* */
$('#ddlStaticLink').on('change', function (item) {
    // Select link
    var link = $('#ddlStaticLink').find(":selected").val();

    if (link != "-1") {
        // Open new tab
        window.open(link);
    }
});

(function ($) {

    $.fn.menumaker = function (options) {

        var cssmenu = $(this), settings = $.extend({
            title: "Menu",
            format: "dropdown",
            sticky: false
        }, options);

        return this.each(function () {
            cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
            $(this).find("#menu-button").on('click', function () {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.hide().removeClass('open');
                }
                else {
                    mainmenu.show().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });

            cssmenu.find('li ul').parent().addClass('has-sub');

            multiTg = function () {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function () {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').hide();
                    }
                    else {
                        $(this).siblings('ul').addClass('open').show();
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');

            if (settings.sticky === true) cssmenu.css('position', 'fixed');

            resizeFix = function () {
                if ($(window).width() > 1150) {
                    cssmenu.find('ul').show();
                }

                if ($(window).width() <= 1150) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);

        });
    };
})(jQuery);

(function ($) {
    $(document).ready(function () {

        $(document).ready(function () {
            $("#cssmenu").menumaker({
                title: "&nbsp;",
                format: "multitoggle"
            });

            //$("#cssmenu").prepend("<div id='menu-line'></div>");

            var foundActive = false, activeElement, linePosition = 0, menuLine = $("#cssmenu #menu-line"), lineWidth, defaultPosition, defaultWidth;

            $("#cssmenu > ul > li").each(function () {
                if ($(this).hasClass('active')) {
                    activeElement = $(this);
                    foundActive = true;
                }
            });

            if (foundActive === false) {
                activeElement = $("#cssmenu > ul > li").first();
            }

            defaultWidth = lineWidth = activeElement.width();

            //defaultPosition = linePosition = activeElement.position().left;

            //menuLine.css("width", lineWidth);
            //menuLine.css("left", linePosition);

            $("#cssmenu > ul > li").hover(function () {
                activeElement = $(this);
                lineWidth = activeElement.width();
                linePosition = activeElement.position().left;
                menuLine.css("width", lineWidth);
                menuLine.css("left", linePosition);
            },
            function () {
                menuLine.css("left", defaultPosition);
                menuLine.css("width", defaultWidth);
            });

        });


    });
})(jQuery);