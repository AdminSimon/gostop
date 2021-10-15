$item.card = (function () {
    var view = function (key, item) {
        var optionElem = '';
        if (item.point != 0) {
            optionElem = '<div class="lb point">' + item.point + '</div>';
        } else {
            if (item.light) {
                optionElem = '<div class="lb light">L</div>';
            } else if (item.lineName != '') {
                switch (item.lineName) {
                    case 'firstLine':
                        optionElem = '<div class="lb first-line"></div>';
                        break;
                    case 'redLine':
                        optionElem = '<div class="lb red-line"></div>';
                        break;
                    case 'blueLine':
                        optionElem = '<div class="lb blue-line"></div>';
                        break;
                    case 'noneLine':
                        optionElem = '<div class="lb none-line"></div>';
                        break;
                }
            } else if (item.animal) {
                if (item.bird) {
                    optionElem = '<div class="lb bird">B</div>';
                } else {
                    optionElem = '<div class="lb animal">A</div>';
                }
            }
        }

        var v =
            '<li class="i-card debug on-image">' +
            '    <div class="item">' +
            '        <div class="card-image" style="background-image: url(img/card/img-card' + item.index + '.png)"></div>' +
            '        <div class="debug-info">' +
            '            <div class="number">' + key.split('-')[0] + '</div>' + optionElem +
            '        </div>' +
            '    </div>' +
            '</li>';
        return v;
    }
    return {
        view: view,
    }
})();