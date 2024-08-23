/* UItoTop jQuery Plugin 1.2 | Matt Varone | http://www.mattvarone.com/web-design/uitotop-jquery-plugin */

(function ($) {
    $.fn.UItoTop = function (options) {
        var defaults = { 
            text: 'To Top', 
            min: 200, 
            inDelay: 600, 
            outDelay: 400, 
            containerID: 'toTop', 
            containerHoverID: 'toTopHover', 
            scrollSpeed: 1000, 
            easingType: 'linear' 
        }, 
        settings = $.extend(defaults, options), 
        containerIDhash = '#' + settings.containerID, 
        containerHoverIDHash = '#' + settings.containerHoverID;

        $('body').append('<a href="#" id="' + settings.containerID + '">' + settings.text + '</a>');

        $(containerIDhash).hide().on('click.UItoTop', function () { 
            $('html, body').animate({ scrollTop: 0 }, settings.scrollSpeed, settings.easingType); 
            $('#' + settings.containerHoverID, this).stop().animate({ 'opacity': 0 }, settings.inDelay, settings.easingType); 
            return false; 
        }).prepend('<span id="' + settings.containerHoverID + '"></span>').hover(function () { 
            $(containerHoverIDHash, this).stop().animate({ 'opacity': 1 }, 600, 'linear'); 
        }, function () { 
            $(containerHoverIDHash, this).stop().animate({ 'opacity': 0 }, 700, 'linear'); 
        });

        $(window).scroll(function () {
            var sd = $(window).scrollTop(); 

            // Verifica a largura da tela
            if ($(window).width() <= 667) {
                $(containerIDhash).hide(); // Esconde o botão se a tela for >= 667px
                return; // Sai da função para evitar a execução das linhas abaixo
            } 

            if (typeof document.body.style.maxHeight === "undefined") { 
                $(containerIDhash).css({ 'position': 'absolute', 'top': sd + $(window).height() - 50 }); 
            }

            if (sd > settings.min)
                $(containerIDhash).fadeIn(settings.inDelay); 
            else
                $(containerIDhash).fadeOut(settings.outDelay);
        });

        // Verifica a largura da tela quando a página é carregada
        if ($(window).width() <= 667) {
            $(containerIDhash).hide(); // Esconde o botão se a tela for >= 667px
        }

    };
})(jQuery);

// $(window).scroll(function () {
//     var sd = $(window).scrollTop();
//     var windowWidth = $(window).width();

//     if (windowWidth < 667) { // Apenas aplica display:block se a largura da tela for maior que 667px
//         if (sd > settings.min) {
//             $(containerIDhash).fadeIn(settings.inDelay);
//         } else {
//             $(containerIDhash).fadeOut(settings.outDelay);
//         }
//     } else {
//         $(containerIDhash).fadeOut(0); // Garante que o botão esteja oculto em telas menores
//     }
// });