var documentSubmissionLogic = require('./claim/document-submission')
var constants = require('./../constants/app-constants')

module.exports = {
    processRequest: function (data, sessionData) {
        if (sessionData.subCatagory == 'Document Submission') {
            sessionData.message = data;
            documentSubmissionLogic.handle(sessionData);
        } else {
            sessionData.state = constants.mainState.NOT_AVAILABLE.key;
        }
    }
}