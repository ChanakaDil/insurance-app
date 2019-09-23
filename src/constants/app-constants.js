var Enum = require('enum');

module.exports.mainState = new Enum([
    'INIT',
    'PROCESS',
    'END',
    'NOT_AVAILABLE'
]);

module.exports.languageCode = new Enum({
    1: 'en',
    2: 'si',
    3: 'ta'
});

module.exports.step = new Enum([
    'LANGUAGE_SELECTION',
    'CATAGORY_SELECTION',
    'SCENARIO_SELECTION',
]);

module.exports.stage = new Enum([
    'IDENTIFICATION',
    'DATE_REQUEST',
    'MULTIPLE_RECORD_FOUND',
    'DOCUMENT_REQUEST',
    'WRONG_RESPONSE',
    'IDENTIFIED',
]);