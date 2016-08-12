var jQuery = jQuery || window.jQuery;
(function($) {
    "use strict";
    // if no jQuery library, then quit
    if (typeof $ === 'undefined') { return; }

    /*
    * Dialog module
    * 2016.8.3
    * */
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

    /*
     * Tab module
     * 2016.8.4
     * */
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

    /*
     * SMS Code module
     * 2016.8.5
     * */
    function getSmsCode($btn, i) {
        var fuc = $btn.is('input') ? 'val' : 'text';
        var smsTimer;

        i = typeof i === 'number' ? i : 59;
        $btn[fuc](i + 1)[0].disabled = true;

        smsTimer = setInterval(function() {
            if (i < 0) {
                clearInterval(smsTimer);
                $btn.data('isGetting', false)[fuc]('重新获取')[0].disabled = false;
            } else {
                $btn[fuc](i);
            }
            i--;
        }, 1000);
    }
    function smsCode() {
        var $btn = $('.getSmsCode');

        if ($btn.length) {
            $btn.on('click', function() {
                var $this = $(this);
                if (!$this.data('isGetting')) {
                    $this.data('isGetting', true);
                    getSmsCode($this);
                }
                return false;
            });
        }
    }

    /*
     * Flow Steps module
     * 2016.8.10
     * */
    function flowSteps() {
        var $steps = $('.u-fs');
        var $opts = $steps.find('.u-fs-opt');
        var $cnts = $steps.find('.u-fs-cnt');
        var $btns = $steps.find('.step-btn');

        if ($btns.length) {
            $btns.on('click', function() {
                var step = $(this).parents('.item').index();
                var next = ':eq(' + [step + 1] + ')';

                $opts.children(next).addClass('sel').siblings().removeClass('sel');
                $cnts.children(next).addClass('sel').siblings().removeClass('sel');
                return false;
            });
        }
    }

    /*
     * File Upload module
     * 2016.8.11
     * */
    $.fn.fileUpload = function() {
        return this.each(function() {
            var $file = $(this).children(':file');

            if (!$file.length) {
                return;
            }

            function change() {
                var $files = $file[0].files;
                var $image = $file.next('.image');
                var blobUrl;

                if (Object.prototype.toString.call($files) !== '[object FileList]' ||
                    $file[0].multiple) {
                    return;  // not support files or multiple
                }

                blobUrl = URL.createObjectURL($files[0], {oneTimeOnly: true});
                $image.css('background-image', 'url(\'' + blobUrl + '\')').addClass('show');
                //URL.revokeObjectURL(blobUrl);
            }

            $file.on('change', change);
        });
    };

    function upload() {
        var $upload = $('.u-fm-file');

        if ($upload.length) {
            $upload.fileUpload();
        }
    }

    $(function() {
        dialog();
        tabs();
        smsCode();
        flowSteps();
        upload();
    });
})(jQuery);
