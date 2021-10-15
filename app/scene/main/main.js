scene.main = (function () {
    var _this = $('#main');
    var _title = 'main';
    var _elem = {};
    var _data = {}
    var _isFirst = true;
    var handleEvent = (function () {

    })();

    var _cardView = function(key,item){
        var optionElem = '';
        if(item.point != 0) {
            optionElem = '<div class="lb point">'+item.point+'</div>';
        }else {
            if(item.light){
                optionElem = '<div class="lb light">L</div>';
            }else if(item.lineName != ''){
                switch(item.lineName) {
                    case 'firstLine': optionElem = '<div class="lb first-line"></div>'; break;
                    case 'redLine': optionElem = '<div class="lb red-line"></div>'; break;
                    case 'blueLine': optionElem = '<div class="lb blue-line"></div>'; break;
                    case 'noneLine': optionElem = '<div class="lb none-line"></div>'; break;
                }                
            }else if(item.animal){
                if(item.bird){
                    optionElem = '<div class="lb bird">B</div>';
                }else{
                    optionElem = '<div class="lb animal">A</div>';
                }
            }
        }

        var v = 
            '<li class="i-card debug on-image">' +
            '    <div class="item">' +
            '        <div class="card-image" style="background-image: url(img/card/img-card'+item.index+'.png)"></div>' +
            '        <div class="debug-info">' +
            '            <div class="number">'+key.split('-')[0]+'</div>' + optionElem +
            '        </div>' +
            '    </div>' +
            '</li>';
        return v;
    }

    var render = function () {
        $.ajax({
            url: 'data/cards.json',
            dataType: 'json',
            success: function(data){
                console.log('cards', data);

                var elem = '';
                $.each(data, function(key, item){
                    elem += _cardView(key, item);
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