var constants = require('./../constants/app-constants')
var serviceConstants = require('./../constants/service-constants')
var constantUtil = require('./../constants/constantUtil')
var serviceFactory = require('./../logic/service-factory')

module.exports = {
    handleSession: function (client, dataInput) {
        var sessionOb = client.handshake.session.userdata;
        if (sessionOb != undefined && dataInput.message == '*') {
            sessionOb.state = constants.mainState.END.key;
            sessionOb.responseMessage = serviceConstants.warningEnum.END_MESSAGE.value;
        } else {
            processSessionData(client, dataInput);
        }
    }
}

processSessionData = function (client, dataInput) {
    var sessionOb = client.handshake.session.userdata;
    if (sessionOb == undefined) {
        // init session
        sessionOb = new Object;
        sessionOb.id = dataInput.number;
        sessionOb.state = constants.mainState.INIT.key;
        sessionOb.nextStep = constants.step.LANGUAGE_SELECTION.key;
    } else if (sessionOb.state == constants.mainState.INIT.key) {
        sessionOb.beforeStep = sessionOb.nextStep;
        if (sessionOb.beforeStep == constants.step.LANGUAGE_SELECTION.key) {
            if (dataInput.message == '0') {
                sessionOb.nextStep = constants.step.LANGUAGE_SELECTION.key;
            } else {
                sessionOb.nextStep = constants.step.CATAGORY_SELECTION.key;
                sessionOb.language = constants.languageCode.getValue(dataInput.message);
            }
        } else if (sessionOb.beforeStep == constants.step.CATAGORY_SELECTION.key) {
            if (dataInput.message == '0') {
                sessionOb.nextStep = constants.step.LANGUAGE_SELECTION.key;
                sessionOb.language = undefined;
            } else {
                sessionOb.nextStep = constants.step.SCENARIO_SELECTION.key;
                sessionOb.catagory = serviceConstants.serviceIndexEnum.getValue(dataInput.message);
            }

        } else if (sessionOb.beforeStep == constants.step.SCENARIO_SELECTION.key) {
            if (dataInput.message == '0') {
                sessionOb.nextStep = constants.step.CATAGORY_SELECTION.key;
                sessionOb.catagory = undefined;
            } else {
                sessionOb.subCatagory = constantUtil.getSubService(sessionOb.catagory, dataInput.message);
                if (sessionOb.subCatagory != undefined) {
                    sessionOb.state = constants.mainState.PROCESS.key;
                }
            }
        }
    }

    if (sessionOb.state == constants.mainState.PROCESS.key) {
        serviceFactory.processRequest(dataInput, sessionOb);
    }

    sessionOb.message = dataInput.message;
    client.handshake.session.userdata = sessionOb;
    client.handshake.session.save();
    console.log("Session Data : ", client.handshake.session.userdata);
}