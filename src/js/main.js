var jQuery = jQuery || window.jQuery;
(function($) {
    "use strict";
    // if no jQuery library, then quit
    if (typeof $ === 'undefined') { return; }

    function dialog() {
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
    }

    $.fn.tab = function() {
        return this.each(function() {
            var $th = $(this);
            var $li = $th.find('.m-tab-opt>li');
            var $it = $th.find('.m-tab-cnt>.item');
            $li.each(function(i) {
                $(this).on('click', function() {
                    $($it[i]).addClass('sel').siblings().removeClass('sel');
                    return false;
                });
            });
        });
    };

    function tabs() {
        var $tab = $('.m-tab');

        if ($tab.length) {
            $tab.tab();
        }
    }

    $(function() {
        dialog();
        tabs();
    });
})(jQuery);
