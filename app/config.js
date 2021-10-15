var scene = {}
var comp = {}
var modal = {}
var popup = {}
var service = {}
var loader = {}
var sections = {}
var $item = {}

var $DEV = true;
var $APP_VERSION = '1.0.1';
var $HOST = $DEV ? 
	'm-admin-test.iniwedding.com/api2/fair_experience':
	'm-admin.iniwedding.com/api2/fair_experience';
var $API_KEY = {
	'api_key': 'b38a9bfb4ef1327db8af74412ce0d797',
    'auth_key': 'ec8b8c7afe557baa6d7143d1ca86d43b'
}

var $DB_CONFIG_GUBN = 'SWD';
var $DB_CONFIG_EVTCODE = 'EVT21929A001';
var $DB_CONFIG_CONPRODUCT = '홈페이지 문의';

var $category = {
	dress: {
		code: 'DRESS',
		name: '드레스',
	},
	studio: {
		code: 'STUDI',
		name: '스튜디오',
	},
	makeup: {
		code: 'MAKEU',
		name: '메이크업',
	},
	hanbok: {
		code: 'KORDR',
		name: '한복',
	},
	jewelry: {
		code: 'GIFTS',
		name: '에물',
	},
	suit: {
		code: 'FORMA',
		name: '예복',
	},
	snap: {
		code: 'BOSTU',
		name: '본식스냅',
	},
	dvd: {
		code: 'DVD01',
		name: 'DVD영상',
	},
	etc: {
		code: 'ETC01',
		name: '기타',
	},
}