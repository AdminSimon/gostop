service.ui = (function () {
    return {        
        loadingShow: function(targetElem, transparent){
            if(targetElem){
                var v = 
                    '<div class="content-loader '+(transparent ? 'opa' : '')+'">' +
                    '    <div class="cont">' +
                    '        <img src="img/i-loading.png" alt="">' +
                    '    </div>' +
                    '</div>';
                targetElem.append(v);
            }
        },
        loadingHide: function(){
            // setTimeout(function(){
            // }, 2000);
            $('.content-loader').fadeOut(400, function(){
                $('.content-loader').remove();
            })
        },
        ellipsis: function (str, len) {
            if (len < str.length) {
                return str.substring(0, len) + '..';
            } else {
                return str;
            };
        },
        confirm: function (txt, callback, title) {
            if (confirm(txt)) {
                callback && callback();
            }
        },
        toast: function (txt, delay) {
            $('<div id="toast" class="ui">' + (txt || 'abc') + '</div>')
                .appendTo('#app')
                .fadeIn(200)
                .delay(delay || 1500)
                .fadeOut(200, function () {
                    $(this).remove();
                });
        },
        active: function (elem) {
            return new Promise(function (res, rej) {
                elem.addClass('anim-active');
                setTimeout(function () {
                    elem.removeClass('anim-active');
                    res();
                }, 150);
            })
        },
    }
})();