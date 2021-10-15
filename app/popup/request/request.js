popup.request = (function () {
    var _this = $('#request');
    var _elem = {
        back: _this.find('.popup-backdrop'),
        exit: _this.find('.exit'),

        plannerName: _this.find('.planner-name .only-txt'),        
        name: _this.find('.name input'),
        phone: _this.find('.phone input'),
        date: _this.find('.date .split-1'),
        dateSelector: _this.find('.date .split-2'),
        memo: _this.find('.memo textarea'),
        privacy: _this.find('.privacy input'),

        submit: _this.find('.submit')
    };
    var _options = null;
    var handler = (function () {
        _elem.back.click(function () {
            close();
        })
        _elem.exit.click(function () {
            close();
        })

        _elem.date.click(function () {
            changeDate();
        })
        _elem.dateSelector.click(function () {
            changeDate();
        })


        _elem.phone.on("keyup", function () {
            var val = $.trim($(this).val());
            var new_val = service.filter.autoHypenPhone(val);
            $(this).val(new_val);
        });
        _elem.submit.click(function () {
            if($(this).hasClass('ready')){
                return;
            }
            var checked = _elem.privacy.is(":checked");
            var inputData = {
                name: _elem.name.val(),
                phone: _elem.phone.val(),
                plannerName: _options.plannerName,
                memo: _elem.memo.val(),
                options: _options,
            }
            $DEV && console.log('data', inputData, checked);

            var pattern = /([^가-힣|^a-zA-Z])/i;
            if (!inputData.name) {
                alert('이름을 입력해주세요!');
                _elem.name.focus();
                return;
            } else if (pattern.test(inputData.name)) {
                alert('한글, 영문 외에 공백, 숫자, 특수문자는 입력할 수 없습니다.');
                _elem.name.focus();
                return;

            }else if (!inputData.phone) {
                alert('전화번호를 입력해주세요!');
                _elem.phone.focus();
                return;
            } else if (!service.filter.isValidPhoneNumber(inputData.phone)) {
                alert('올바른 전화번호를 입력해주세요!');
                _elem.phone.focus();
                return;
            } else if (!checked) {
                alert('개인정보 수집 및 이용에 동의하지 않으시면 상담안내 및 이벤트 참여가 불가능합니다.');
                return;
            }

            _elem.submit.addClass('ready').find('span').html('잠시만 기다려주세요.');
            
            var text = 
                '신청구분: 상담신청\n' +
                '상담을 원하는 플래너: ' + inputData.options.plannerName;

            service.api.submit({
                CA_ConsulGubn: $DB_CONFIG_GUBN,
                EVT_Code: $DB_CONFIG_EVTCODE,
                con_product: $DB_CONFIG_CONPRODUCT,
                con_name: inputData.name,
                con_phone: inputData.hp,
                CA_ConsulText: text,
                MSG_TYPE: 'swd',
                FromHttpReferer: document.referrer,
                tid2: null,
                tid3: null,
                tid4: null,
                ss_cpa_mid: null,
                ss_cpa_aid: null,
            }, function(data){
                _elem.submit.removeClass('ready').find('span').html('');
                service.ui.toast('신청이 완료됬습니다.', 3000);
                if (data.params && data.params.ad_script) {
                    $("body").append(data.params.ad_script);
                }
                close();
            }, function(errorMessage){
                _elem.submit.removeClass('ready').find('span').html('');
                service.ui.toast(errorMessage);
                close();
            })
        })
    })();


    var changeDate = function () {
        console.warn('open ', _options.visitDate);
        // return;
        $app.covers.calendar.open(_options.visitDate, function (date) {
            console.log('date!', date);
            // _elem.accept.find('select option').attr('selected', false);
            // if (date) {
            //     _elem.accept.find('select option[value=t]').attr('selected', 'selected');
            // } else {
            //     _elem.accept.find('select option[value=f]').attr('selected', 'selected');
            // }
            _options.visitDate = date;            
            _this.find('.date .val .split-1').html(date);
        }, false);
    }


    var renderCounselPlanner = function(){        
        _this.find('.tit .txt').html('상담 예약 및 문의하기');
        _this.find('.planner-name .lb').html(_options.plannerName);
        _this.find('.submit span').html('상담신청');

        _this.find('.memo').hide();
        _this.find('.date').hide();
    }
    var renderCounsel = function(){        
        _this.find('.tit .txt').html('빠른 상담신청');
        _this.find('.planner-name .lb').html(_options.plannerName);
        _this.find('.submit span').html('상담신청');

        _this.find('.memo').hide();
        _this.find('.date').hide();
    }
    var renderSMS = function(){
        _this.find('.tit .txt').html('할인견적을 문자로 받아보세요');
        _this.find('.planner-name .lb').html(_options.plannerName);
        _this.find('.submit span').html('할인견적 문자 받기');

        _this.find('.memo').hide();
        _this.find('.date').hide();
    }
    var renderBenifit = function(){
        _this.find('.tit .txt').html( categoryName + ' 혜택 신청');
        _this.find('.planner-name .lb').html(_options.plannerName);
        _this.find('.submit span').html('혜택 신청하기');

        _this.find('.memo').hide();
        _this.find('.date').hide();
    }
    var renderVisit = function(){
        _this.find('.tit .txt').html('방문예약');
        _this.find('.planner-name .lb').html(_options.plannerName);
        _this.find('.submit span').html('예약하기');

        _this.find('.memo').show();
        _this.find('.date').show();
        _this.find('.date .val .split-1').html(_options.visitDate);
        // _this.find('.date');
    }

    var open = function (options) {
        _options = $.extend({
            target: '',
            couponText: null,
            visitDate: null,
            plannerName: null,
        }, options);

        switch(options.target) {
            case 'sms': renderSMS(); break;
            case 'counsel': renderCounsel(); break;
            case 'benifit': renderBenifit(); break;
            case 'visit': renderVisit(); break;
            case 'counselPlanner': renderCounselPlanner(); break;
            default: renderSMS(); break;
        }

        $('html').css('overflow', 'hidden');
        if ($DEV) {
            _elem.name.val('테스트');
            _elem.phone.val('010-4964-8271');
            _elem.memo.val('test');
            _elem.plannerName.html(_options.plannerName);
            _elem.privacy.attr('checked', true);
        } else {
            _elem.name.val('');
            _elem.phone.val('');
            _elem.memo.val('');
            _elem.plannerName.html(_options.plannerName);
            _elem.privacy.attr('checked', false);
        }
        _this.fadeIn(200);
    }
    var close = function () {
        $('html').css('overflow-y', 'auto');
        _this.fadeOut(200);
    }
    return {
        open: open,
        close: close,
    }
})();