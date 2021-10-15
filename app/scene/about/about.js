scene.about = (function () {
    var _this = $('#about');
    var _title = 'about';
    var _elem = {};
    var _data = {
        offsetTop: 0,
    }
    var _isFirst = true;
    var handleEvent = (function () {

    })();

    var onScroll = function(){
        var a = $(this).scrollTop();
        if(a - _data.offsetTop > 170) {
            _this.find('.card01').addClass('showing');
        }
        if(a - _data.offsetTop > 300) {
            _this.find('.card02').addClass('showing');
        }
        if(a - _data.offsetTop > 430) {
            _this.find('.card03').addClass('showing');
        }
    }

    var open = function () {
        $(window).scroll(onScroll);
        _this.show();
        _data.offsetTop = $('.service-wrapper')[0].offsetTop - ($(window).height() * 3/4);
    }
    var close = function () {
        $(window).off('scroll', onScroll);
        _this.hide();
    }

    return {
        init: function (callback) {
            $(window).scrollTop(0);
            if (_isFirst) {
                _isFirst = false;
            }
            callback && callback();
        },
        open: function () {
            open();
        },
        close: function () {
            close();
        },
        getTitle: function () {
            return _title;
        },
        getSceneName: function () {
            return _this.attr('id');
        },
    }
})();