var constants = require('./../constants/app-constants')
serviceConstants = require('./../constants/service-constants')
i18n = require("i18n");

i18n.configure({
    locales: ['en', 'si', 'ta'],
    directory: __dirname + '/locales',
    register: global
});

module.exports = {
    handleResponse: function (client) {
        var sessionData = client.handshake.session.userdata;
        var response = "";
        if (sessionData.state == constants.mainState.INIT.key) {
            if (sessionData.nextStep == constants.step.LANGUAGE_SELECTION.key) {
                response = "Welcome to Fairfirst Chatbot Service! \nSelect preferred language.\n\n";
                response += generateResponse(serviceConstants.languageEnum.enums, false);
            } else if (sessionData.nextStep == constants.step.CATAGORY_SELECTION.key) {
                i18n.setLocale(sessionData.language != undefined ? sessionData.language : 'en');
                response = __("Select preferred service category.") + "\n\n";
                response += generateResponse(serviceConstants.serviceIndexEnum.enums, true);
            } else if (sessionData.nextStep == constants.step.SCENARIO_SELECTION.key) {
                response = __("Select preferred service sub category.") + "\n\n";
                var selectedServiceCatagory = serviceConstants.serviceIndexEnum.getValue(sessionData.message);
                if (selectedServiceCatagory == 'Motor Claim Inquiry') {
                    response += generateResponse(serviceConstants.claimServiceEnum.enums, true);
                } else if (selectedServiceCatagory == 'Motor Policy Inquiry') {
                    response += generateResponse(serviceConstants.policyServiceEnum.enums, true);
                } else if (selectedServiceCatagory == 'Motor Policy Renewal') {
                    response += generateResponse(serviceConstants.policyRenewalServiceEnum.enums, true);
                } else {
                    sessionData.nextStep = sessionData.beforeStep;
                    response = __(serviceConstants.warningEnum.UNSUPPORTED_RESPONSE.value);
                }
            }
        }

        if (sessionData.state == constants.mainState.PROCESS.key) {
            if (sessionData.stage == constants.stage.IDENTIFICATION.key) {
                response += __(sessionData.responseMessage);
                response = generateUnknownMessage(response);
            } else if (sessionData.stage == constants.stage.WRONG_RESPONSE.key) {
                response = __(serviceConstants.warningEnum.UNSUPPORTED_RESPONSE.value);

            } else if (sessionData.stage == constants.stage.MULTIPLE_RECORD_FOUND.key) {
                if (sessionData.responseMessage != serviceConstants.warningEnum.WRONG_INPUT.value) {
                    response += __(serviceConstants.warningEnum.MULTIPLE_RECORDS_FOUND.value) + "\n\n";
                }
                response += __(sessionData.responseMessage);

            } else {
                response += __(sessionData.responseMessage);
            }
        } else if (sessionData.state == constants.mainState.NOT_AVAILABLE.key) {
            response += __(serviceConstants.warningEnum.SERVICE_NOT_AVAILABLE.value) + "\n\n";
            response += __(serviceConstants.warningEnum.END_MESSAGE.value);
            delete client.handshake.session.userdata;
            client.handshake.session.save();
        } else if (sessionData.state == constants.mainState.END.key) {
            if (sessionData.subCatagory == 'Document Submission' &&
                sessionData.responseMessage != serviceConstants.warningEnum.getValue('NO_RECORDS_FOUND')) {
                response += __(serviceConstants.warningEnum.DOCUMENTS_TO_BE_SUBMITTED.value) + "\n\n";
            }
            if (sessionData.isArray == true) {
                response += generateArrayResponse(sessionData.responseMessage);
            } else {
                response += __(sessionData.responseMessage);
            }
            if (sessionData.responseMessage != serviceConstants.warningEnum.END_MESSAGE.value) {
                response += "\n\n" + __(serviceConstants.warningEnum.END_MESSAGE.value);
            }
            delete client.handshake.session.userdata;
            client.handshake.session.save();
        }

        console.log(response);
        return response;
    }
}

generateResponse = function (options, withNavigation) {
    var response = "";
    for (index in options) {
        response += options[index].key + ". " + __(options[index].value) + "\n";
    }
    if (withNavigation) {
        response += '\n0. ' + __(serviceConstants.option.GO_BACK.value);
        response += '\n*. ' + __(serviceConstants.option.EXIT.value);
    }
    return response;
}

generateUnknownMessage = function (response) {
    response += "\n\n" + __("Reply '#' if you forget.");
    return response;
}

generateArrayResponse = function (array) {
    var response = "";
    for (index in array) {
        response += __(array[index]) + "\n";
    }
    return response;
}