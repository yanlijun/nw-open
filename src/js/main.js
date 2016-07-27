var jQuery = jQuery || window.jQuery;
(function($) {
    "use strict";
    // if no jQuery library, then quit
    if (typeof $ === 'undefined') { return; }

    var $dialog = $('#dialog');
    var $login = $('#login');
    var $register = $('#register');

    function stopPropagation(e) {
        e.stopPropagation();
    }
    function showLogin() {
        $dialog.addClass('show');
        $login.addClass('crt').siblings().removeClass('crt');
        return false;
    }
    function showRegister() {
        $dialog.addClass('show');
        $register.addClass('crt').siblings().removeClass('crt');
        return false;
    }
    function hideDialog() {
        $dialog.removeClass('show');
    }

    if ($dialog.length) {
        $('.login').on('click', showLogin);
        $('.register').on('click', showRegister);
        $dialog.find('.m-pnl').on('click', stopPropagation);
        $('.u-ico-close').on('click', hideDialog);
        $(window).on('click', hideDialog);
    }
})(jQuery);
