service.request = (function () {
	var host = 'https://' + $HOST + '/';
	var getUnixTimestamp = function () {
		return (Date.now() / 1000 | 0);
	}
	var getApiKey = function () {
		return $API_KEY;
	};

	var getSigKey = function (timestamp) {
		var concat = getApiKey()['api_key'] + '|' + timestamp + '|' + getApiKey()['auth_key'];
		return md5(concat);
	}

	var getApiCommonParam = function () {
		var param = {};
		var timestamp = getUnixTimestamp();
		param['api_key'] = $API_KEY['api_key'];
		param['ts'] = timestamp;
		param['sig'] = getSigKey(timestamp);
		param['api_token'] = service.access.getToken();
		return param;
	};
	return {
		adminGet: function (resourcePath, param, callback, errorCallback, isSync) {
			var iniKey =  {
				'api_key' : '53f7a9850dc58d83ac52566a65aa8a33',
				'auth_key' : 'd84b5185a20fda7bae0066501c4dc3f7'
			};
			var timestamp = getUnixTimestamp();
			var subParams = {
				api_key: iniKey.api_key,
				ts: timestamp,
				sig: md5(iniKey.api_key + '|' + timestamp + '|' + iniKey.auth_key),
			}
			if (!resourcePath) {
				return false;
			}
			var url = 'https://m-admin.iniwedding.com/api/' + resourcePath + '?' + $.param(subParams);
			if (param) {
				url = url + '&' + $.param(param);
			}

			$.ajax(url, {
				type: 'get',
				dataType: "json",
				jsonp: 'callback',
				contentType: 'application/json; charset=utf-8',
				cache: false,
				async: isSync ? false : true,
				beforeSend: function (request) {
					request.setRequestHeader('Accept', 'application/json');
					request.setRequestHeader('Content-Type', 'application/json');
				},
				success: function (oRes, sStatus, oXHR) {
					if (!oRes.isSuccess) {
						service.ui.toast(oRes.errorMsg[0]);
						console.error('[-- API ERROR --]', resourcePath, param, oRes);
						service.ui.loadingHide();
						errorCallback && errorCallback(oRes);
						return false;
					}
					$DEV && console.warn('[-- API --]', resourcePath, param, oRes);
					callback && callback(oRes.data);
				},
				error: function (xhr, status, error) {
					service.ui.loadingHide();
					service.ui.toast('서버 요청이 실패하였습니다. 네트워크 상태를 확인해주세요.');
					errorCallback && errorCallback();
				},
			});
		},
		get: function (resourcePath, param, callback, errorCallback, isSync) {
			if (!resourcePath) {
				return false;
			}
			var url = host + resourcePath + '?' + $.param(getApiCommonParam());
			if (param) {
				url = url + '&' + $.param(param);
			}
			// var url = host + resourcePath + '?' + $.param(param);

			$.ajax(url, {
				type: 'get',
				dataType: "json",
				jsonp: 'callback',
				contentType: 'application/json; charset=utf-8',
				cache: false,
				async: isSync ? false : true,
				beforeSend: function (request) {
					request.setRequestHeader('Accept', 'application/json');
					request.setRequestHeader('Content-Type', 'application/json');
				},
				success: function (oRes, sStatus, oXHR) {
					if (!oRes.isSuccess) {
						service.ui.toast(oRes.errorMsg[0]);
						console.error('[-- API ERROR --]', resourcePath, param, oRes);
						service.ui.loadingHide();
						errorCallback && errorCallback(oRes);

						if(oRes.errorIds[0] == 'NEED_LOGIN') {
							service.access.checkOut();
							setTimeout(function(){
								location.reload();
							}, 1000)
						}

						return false;
					}
					$DEV && console.warn('[-- API --]', resourcePath, param, oRes);
					callback && callback(oRes.data);
				},
				error: function (xhr, status, error) {
					service.ui.loadingHide();
					service.ui.toast('서버 요청이 실패하였습니다. 네트워크 상태를 확인해주세요.');
					errorCallback && errorCallback();
				},
			});
		},
		submit: function (resourcePath, param, callback, errorCallback, isSync) {
			if (!resourcePath) {
				return false;
			}
			var url = host + resourcePath + '?' + $.param(getApiCommonParam());

			$.ajax(url, {
				type: 'post',
				dataType: "json",
				contentType: 'application/json; charset=utf-8',
				cache: false,
				data: JSON.stringify(param),
				async: isSync ? false : true,
				beforeSend: function (request) {
					request.setRequestHeader('Accept', 'application/json');
					request.setRequestHeader('Content-Type', 'application/json');
				},
				success: function (oRes, sStatus, oXHR) {
					if (!oRes.isSuccess) {
						service.ui.toast(oRes.errorMsg[0])
						
						$DEV && console.error('[-- API ERROR --]', resourcePath, param, oRes);
						service.ui.loadingHide();
						errorCallback && errorCallback(oRes);

						if(oRes.errorIds[0] == 'NEED_LOGIN') {
							service.access.checkOut();
							setTimeout(function(){
								location.reload();
							}, 1000)
						}

						return false;
					}
					$DEV && console.warn('[-- API --]', resourcePath, oRes.data);
					callback && callback(oRes.data);
				},
				error: function (xhr, status, error) {
					service.ui.toast('서버 요청이 실패하였습니다. 네트워크 상태를 확인해주세요.');
					service.ui.loadingHide();
					errorCallback && errorCallback();
				}
			});
		},
	}
})();