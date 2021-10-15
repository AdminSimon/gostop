service.api = (function () {
    return {                
        // 상담신청요청
        submit: function (data, callback, error) {
            $.ajax({
                type: "POST",
                // url: "/submit.php",
                url: "//s-wed.co.kr/fair/submit.php",
                xhrFields: {
                    withCredentials: true
                },
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                success: function (rs, status, xhr) {
                    console.log(rs);
                    if (rs.status == 'success') {
                        callback && callback(rs.data);
                    } else {
                        error && error(rs.data.message);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText);
                }
            });
        },


        // 설정
        config: function (params, callback, error) {
            service.request.get('init', params, callback, error);
        },
        // 박람회 목록
        fairList: function (params, callback, error) {
            service.request.get('getFairs', params, callback, error);
        },
        // 플래너 목록 현황
        plannerList: function (params, callback, error) {
            service.request.get('getPlanners', params, callback, error);
        },
        
        user: {
            // 로그인
            login: function (params, callback, error) {
                service.request.adminGet('fair/loginPlanner', params, callback, error);
            },
            // 유저정보
            info: function (params, callback, error) {
                service.request.adminGet('login', params, callback, error);
            },
            getPermission: function (params, callback, error) {
                service.request.get('getMemberPermission', params, callback, error);
            },
        },
        customer: {
            // 과거 피팅 체크 fair_code , cc_code
            checkFitting: function (params, callback, error) {
                service.request.get('checkFitting', params, callback, function(err){
                    console.log('testset', err)
                    error(err)
                });
            },
            // 유저상세
            detail: function (params, callback, error) {
                service.request.get('getCustomer', params, callback, error);
            },
            // 유저검색
            search: function (params, callback, error) {
                if(
                    params.div != '' || 
                    params.planner != '' || 
                    typeof params.is_booking != 'undefined' || 
                    (typeof params.hp != 'undefined' && params.hp != '') || 
                    (typeof params.name != 'undefined' && params.name != '') || 
                    (typeof params.customer_no != 'undefined' && params.customer_no != '')
                ){
                    service.request.get('getCustomers', params, callback, error);
                    
                } else {
                    callback && callback({
                        customers: []
                    })
                }
                
            },
            // 유저가 예약 가능한 클래스 목록
            booking: function (params, callback, error) {
                service.request.get('getCustomerBooking', params, callback, error);
            },
        },        
        waiting: {            
            detail: function (params, callback, error) {
                service.request.get('getWaiting', params, callback, error);
            },
            list: function (params, callback, error) {
                service.request.get('getWaitings', params, callback, error);
            },
            addToBooking: function (params, callback, error) {
                service.request.get('addWaitingToBooking', params, callback, error);
            },
            cancel: function (params, callback, error) {
                service.request.get('deleteWaiting', params, callback, error);
            },
            updateWaitingMemo: function (params, callback, error) {
                service.request.get('updateWaitingMemo', params, callback, error);
            },
            updateWaitingCallState: function (params, callback, error) {
                service.request.get('updateWaitingCallState', params, callback, error);
            },
            complete: function (params, callback, error) {
                service.request.get('completeWaiting', params, callback, error);
            },
        },
        reservation: {
            // 클래스 예약
            bookingAdd: function (params, callback, error) {
                service.request.submit('addBooking', params, callback, error);
            },
            // (신규) 웨이팅
            waitingAdd: function (params, callback, error) {
                service.request.submit('addWaiting', params, callback, error);
            },
            // (구) 웨이팅
            waitAdd: function (params, callback, error) {
                service.request.submit('addWaitBooking', params, callback, error);
            },
            // 예약 수정하기 위한 뷰 정보
            bookingUpdateView: function (params, callback, error) {
                service.request.get('getBookingView', params, callback, error);
            },
            // 예약 수정
            bookingUpdate: function (params, callback, error) {
                service.request.get('updateBooking', params, callback, error);
            },
            // 예약 정보
            detail: function (params, callback, error) {
                service.request.get('getBooking', params, callback, error);
            },
            // 예약 현황
            list: function (params, callback, error) {
                service.request.get('getBookings', params, callback, error);
            },
            // 예약 메모 수정
            updateBookingMemo: function (params, callback, error) {
                service.request.get('updateBookingMemo', params, callback, error);
            },
            // 예약 취소
            cancel: function (params, callback, error) {
                service.request.get('cancelBooking', params, callback, error);
            },
            // 예약 완료
            visit: function (params, callback, error) {
                service.request.get('visitBooking', params, callback, error);
            },
            // 예약 완료
            setAssistant: function (params, callback, error) {
                service.request.get('updateBookingAssistant', params, callback, error);
            },
            // 해피콜 상태 변경
            updateBookingCallState: function (params, callback, error) {
                service.request.get('updateBookingCallState', params, callback, error);
            },
        },
        fclass: {
            // 클래스 상세
            detail: function (params, callback, error) {
                service.request.get('getExperience', params, callback, error);
            },
            // 클래스 목록
            list: function (params, callback, error) {
                service.request.get('getExperiences', params, callback, error);
            },
            // 클래스 생성
            create: function (params, callback, error) {
                service.request.submit('addExperience', params, callback, error);
            },
            // 클래스 수정
            update: function (params, callback, error) {
                service.request.submit('updateExperience', params, callback, error);
            },
            // 클래스 삭제
            remove: function (params, callback, error) {
                service.request.get('deleteExperience', params, callback, error);
            },
            removeTime: function (params, callback, error) {
                service.request.get('deleteExperienceTime', params, callback, error);
            },
            sendSMS: function (params, callback, error) {
                service.request.get('sendPrivacySms', params, callback, error);
            },
            openWaiting: function (params, callback, error) {
                service.request.get('openWaiting', params, callback, error);
            },
            closeWaiting: function (params, callback, error) {
                service.request.get('closeWaiting', params, callback, error);
            },
        },
    }
})();