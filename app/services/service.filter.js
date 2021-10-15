service.filter = (function () {
    return {
        isValidPhoneNumber: function (str) {
            str = str.replace(/[^0-9]/g, '');
            if (str.length < 10) return false;
            if (str.length > 11) return false;
            if ($.inArray(str.substr(0, 3), ["010", "011", "016", "017", "018", "019"]) == -1) return false;
            if (str.substr(0, 3) == '010' && str.length == 10) return false;
            return true;
        },
        autoHypenPhone: function (str) {
            str = str.replace(/[^0-9]/g, '');
            var tmp = '';
            if (str.length < 4) {
                return str;
            } else if (str.length < 7) {
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3);
                return tmp;
            } else if (str.length < 11) {
                if (str.substr(0, 3) === '010') {
                    tmp += str.substr(0, 3);
                    tmp += '-';
                    tmp += str.substr(3, 4);
                    if (str.length > 7) {
                        tmp += '-';
                        tmp += str.substr(7);
                    }
                } else {
                    tmp += str.substr(0, 3);
                    tmp += '-';
                    tmp += str.substr(3, 3);
                    tmp += '-';
                    tmp += str.substr(6);
                }
    
                return tmp;
            } else {
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 4);
                tmp += '-';
                tmp += str.substr(7);
                return tmp;
            }
            return str;
        },
        roleName: function (roleId) {
            var role = '알 수 없음';
            switch (roleId) {
                case 'master':
                    role = '마스터 권한';
                    break;
                case 'div':
                    role = '국장 권한';
                    break;
                case 'planner':
                    role = '플래너 권한';
                    break;
            }
            return role;
        },
    }
})();