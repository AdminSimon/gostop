service.common = (function () {
    var script = (function () {
        /**
         * Date 객체의 yyyy-mm-dd 형식으로 변환 후 반환하는 함수
         * @return {String} yyyy-mm-dd 형식의 날짜 스트링
         */
        Date.prototype.yyyymmdd = function () {
            var yyyy = this.getFullYear().toString();
            var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
            var dd = this.getDate().toString();
            return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
        };
        Date.prototype.yyyymm = function () {
            var yyyy = this.getFullYear().toString();
            var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
            return yyyy + '' + (mm[1] ? mm : "0" + mm[0]);
        };
        /**
         * 배열을 콤바 스트림으로
         */
        Array.prototype.toCommaStream = function () {
            var stream = '';
            var length = this.length;
            $.each(this, function (i, v) {
                stream += v;
                if (i < length - 1) stream += ",";
            });
            return stream;
        };
        /**
         * @returns {object} obj, idx
         */
        Array.prototype.objFind = function (target, value) {
            if (!target || !value) {
                console.error('objFind: 비교하려는 파라미터나 비교값이 없습니다.');
                return;
            }
            var exist = null;
            for (var i = 0, l = this.length; i < l; i++) {
                if (this[i][target] == undefined) {
                    console.error('objFind: 비교하려는 파라미터가 없습니다.');
                    break;
                }
                if (this[i][target] == value) {
                    exist = $.extend({}, this[i]);
                    break;
                }
            }
            if (exist) {
                return {
                    obj: exist,
                    idx: i
                };
            } else {
                return false;
            }
        }

    })();

    return {
        getUniqueId: function () {
            return Math.random().toString(36).substr(2, 9);
        },
        getCurrentDateString: function () {
            return new Date().toJSON().slice(0, 19).replace('T', ' ')
        },
        getUrlParams: function () {
            var params = {};
            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
                params[key] = value;
            });
            return params;
        }
    }
})();