var constants = require('./../../constants/app-constants')
var serviceConstants = require('./../../constants/service-constants')
var userIdentifier = require('./../common/user-identifier')
var service = require('./../../infrastruture/insurance-service')
var moment = require('moment');

module.exports = {
    handle: function (data) {
        if (data.stage == undefined) {
            data.stage = constants.stage.IDENTIFICATION.key;
            data.subStage = serviceConstants.identificationEnum.REGISTRATION_NUMBER.key;
            data.responseMessage = serviceConstants.identificationEnum.getValue('REGISTRATION_NUMBER');
        } else if (data.stage == constants.stage.IDENTIFICATION.key) {
            userIdentifier.identify(data);
            if (data.stage == constants.stage.IDENTIFIED.key) {
                if (data.responseMessage != serviceConstants.warningEnum.getValue('NO_RECORDS_FOUND')) {
                    var docList = service.findDocumentsToBeSubmittedByAccidentId(data.responseMessage);
                    prepareResponse(data, docList);
                }
                data.state = constants.mainState.END.key;
            }
        } else if (data.stage == constants.stage.MULTIPLE_RECORD_FOUND.key) {
            var date = moment(data.message.message, 'DD/MM/YYYY');
            if (date.isValid()) {
                var docList = service.findReleventAccidentIdByDate('REGISTRATION_NUMBER', data.responseMessage, date);
                prepareResponse(data, docList);
                data.state = constants.mainState.END.key;
            } else {
                data.responseMessage = serviceConstants.warningEnum.WRONG_INPUT.value;
            }

        }
    }
}

prepareResponse = function (data, docList) {
    if (docList == null) {
        data.responseMessage = serviceConstants.warningEnum.getValue('ALL_DOCS_SUBMITTED');
    } else {
        data.responseMessage = docList;
        data.isArray = true;
    }
}