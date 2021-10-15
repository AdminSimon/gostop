scene.main = (function () {
    var _this = $('#main');
    var _title = 'main';
    var _elem = {};
    var _data = {}
    var _isFirst = true;
    var handleEvent = (function () {

    })();

    var render = function () {
        // return;
        $.ajax({
            url: 'data/cards.json',
            dataType: 'json',
            success: function(data){
                console.log('cards', data);

                var elem = '';                
                $.each(data, function(key, item){
                    console.log('dd', item.card);
                    elem += $item.card.view(key, item);
                })
                _this.find('.list').html(elem);
            },
            statusCode: {
                404: function(){
                    console.error('not found!!');
                }
            },
        })
    }

    var open = function () {
        _this.show();
    }
    var close = function () {
        _this.hide();
    }

    return {
        init: function (callback) {
            $(window).scrollTop(0);
            if (_isFirst) {
                _isFirst = false;
                render();
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