comp.header = (function () {
    var _this = $('#header');
    var _elem = {
        logo: _this.find('.logo-wrapper'),
        routes: _this.find('.routes'),
    };
    var handleEvent = (function () {
        _elem.logo.on('click', function(){
            sceneManager.change('main');
        })
        _elem.routes.on('click', '.i-route', function(){
            var sceneName = $(this).data('scene-name');
            sceneManager.change(sceneName);
            // service.ui.toast('준비중입니다.');
        })

        $(window).scroll(function () {
            if ($(this).scrollTop() > 80) {
                _this.addClass('opa');
            } else {
                _this.removeClass('opa');
            }
        })
    })();

    return {
        setFairName: function(fairName){
            var nameArray = fairName.split(' ');
            nameArray.splice(nameArray.length-1, 1);
            _elem.selectFair.find('span').html(nameArray.join(' '));
        },
        highlight: function(sceneName){
            _elem.routes.find('.i-route').removeClass('active');
            _elem.routes.find('.i-route[data-scene-name="'+sceneName+'"]').addClass('active');
        },
        setOpa: function(){
            _this.addClass('opa');
        },
        unsetOpa: function(){
            _this.removeClass('opa');
        },
    }
})();