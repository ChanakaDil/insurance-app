var constants = require('./../../constants/app-constants')
var serviceConstants = require('./../../constants/service-constants')
var service = require('./../../infrastruture/insurance-service')

module.exports = {
    identify: function (data) {
        var id = "";
        var message = data.message.message;
        switch (data.subStage) {
            case serviceConstants.identificationEnum.REGISTRATION_NUMBER.key:
                if (message == '#') {
                    data.subStage = serviceConstants.identificationEnum.POLICY_NUMBER.key;
                    data.responseMessage = serviceConstants.identificationEnum.getValue('POLICY_NUMBER');
                } else if (message != "") {
                    id = service.findReleventAccidentId(message, 'REGISTRATION_NUMBER');
                }
                break;

            case serviceConstants.identificationEnum.POLICY_NUMBER.key:
                if (message == '#') {
                    data.subStage = serviceConstants.identificationEnum.CLAIM_NUMBER.key;
                    data.responseMessage = serviceConstants.identificationEnum.getValue('CLAIM_NUMBER');
                } else if (message != "") {
                    id = service.findReleventAccidentId(message, 'POLICY_NUMBER');
                }
                break;
            case serviceConstants.identificationEnum.CLAIM_NUMBER.key:
                if (message == '#') {
                    data.subStage = serviceConstants.identificationEnum.MAR_NUMBER.key;
                    data.responseMessage = serviceConstants.identificationEnum.getValue('MAR_NUMBER');
                } else if (message != "") {
                    id = service.findReleventAccidentId(message, 'CLAIM_NUMBER');
                }
                break;

            case serviceConstants.identificationEnum.MAR_NUMBER.key:
                if (message == '#') {
                    data.subStage = serviceConstants.identificationEnum.MOBILE_NUMBER.key;
                    data.responseMessage = serviceConstants.identificationEnum.getValue('MOBILE_NUMBER');
                } else if (message != "") {
                    id = service.findReleventAccidentId(message, 'MAR_NUMBER');
                }
                break;

            case serviceConstants.identificationEnum.MOBILE_NUMBER.key:
                if (message == '#') {
                    data.state = constants.mainState.NOT_AVAILABLE.key;
                } else if (message != "") {
                    id = service.findReleventAccidentId(message, 'MOBILE_NUMBER');
                }
                break;
        }

        if (id == null) {
            //no records found in the system
            data.responseMessage = serviceConstants.warningEnum.getValue('NO_RECORDS_FOUND');
            data.stage = constants.stage.IDENTIFIED.key;
        } else if (Array.isArray(id)) {
            data.responseMessage = serviceConstants.warningEnum.getValue('SEND_DATE');
            data.stage = constants.stage.MULTIPLE_RECORD_FOUND.key;
            data.regNumber = message;
        } else if (id != "") {
            //if id is retrived from API
            data.responseMessage = id;
            data.stage = constants.stage.IDENTIFIED.key;
        }

    }
}