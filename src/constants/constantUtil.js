var serviceConstants = require('./../constants/service-constants')

module.exports = {
    getSubService: function (mainCatagory, subCatagoryId) {
        var subService = "";
        switch (mainCatagory) {
            case 'Motor Claim Inquiry':
                subService = serviceConstants.claimServiceEnum.getValue(subCatagoryId);
                break;
            case 'Motor Policy Inquiry':
                subService = serviceConstants.policyServiceEnum.getValue(subCatagoryId);
                break;
            case 'Motor Policy Renewal':
                subService = serviceConstants.policyServiceEnum.getValue(subCatagoryId);
                break;
            default:
                console.log("ERROR");
                break;
        }
        return subService;
    }
}