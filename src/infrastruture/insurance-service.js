var serviceConstants = require('./../constants/service-constants')

module.exports = {
    findReleventAccidentId: function (input, type) {
        if (input == '1111') {
            return null;
        } else if (input == '2222') {
            return ["AAA0001", "AAA0002"];
        } else {
            // Dummy data
            return 'AAA0001';
        }

    },
    findReleventAccidentIdByDate: function (type, input, date) {
        return this.findDocumentsToBeSubmittedByAccidentId(input);
    },
    findDocumentsToBeSubmittedByAccidentId: function (id) {
        //Dummy Data
        var docArray = serviceConstants.documents.enums;
        docArray.sort(function () {
            return 0.5 - Math.random()
        });
        var finalArray = new Array();
        docArray.map(function (item) {
            finalArray.push(item.value);
        });

        return finalArray.slice(0, getRandomArbitrary(1, finalArray.length));
        //       return new Array(docArray[Math.floor(Math.random() * docArray.length)].value);
    }
}

callInsuranceAPIToGetDocumentsSubmitted = function () {

}

getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
}