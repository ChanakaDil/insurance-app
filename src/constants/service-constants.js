var Enum = require('enum');

module.exports.languageEnum = new Enum({
    1: 'English',
    2: 'සිංහල',
    3: 'தமிழ'
});

module.exports.serviceIndexEnum = new Enum({
    1: 'Motor Claim Inquiry',
    2: 'Motor Policy Inquiry',
    3: 'Motor Policy Renewal'
});

module.exports.claimServiceEnum = new Enum({
    1: 'Document Submission',
    2: 'Deduction - Excess / Owners Account / Penalties',
    3: 'PIN Re-Send',
    4: 'Cheque Dispatch',
    5: 'Payment Delay Status',
    6: 'No Objection Letters',
    7: 'Next Contactable Person',
    8: 'Repair Approvals',
    9: 'Claim Rejection Appeal'
});

module.exports.policyServiceEnum = new Enum({
    1: 'Quotation for a Policy',
    2: 'Information Verification',
    3: 'Information Change'
})

module.exports.policyRenewalServiceEnum = new Enum({
    1: 'Information Verification'
})

module.exports.identificationEnum = new Enum({
    REGISTRATION_NUMBER: 'Send your Registration number.',
    POLICY_NUMBER: 'Send your Policy number.',
    CLAIM_NUMBER: 'Send your Claim number.',
    MAR_NUMBER: 'Send your MAR number.',
    MOBILE_NUMBER: 'Send your Mobile number.'
})

module.exports.warningEnum = new Enum({
    NO_RECORDS_FOUND: 'No Records Found!',
    MULTIPLE_RECORDS_FOUND: 'Multiple records found!',
    SEND_DATE: 'Send the date of accident in dd/mm/yyyy format.',
    ALL_DOCS_SUBMITTED: 'All documents are submitted!',
    SERVICE_NOT_AVAILABLE: 'Service is not available yet!',
    UNSUPPORTED_RESPONSE: 'Unsupported response!',
    END_MESSAGE: 'Session is ending. Thanks for being with us!',
    DOCUMENTS_TO_BE_SUBMITTED: 'Documents to be submitted:',
    WRONG_INPUT: 'Wrong Input!',

})

module.exports.option = new Enum({
    GO_BACK: 'Go back',
    EXIT: 'Exit'
})

module.exports.documents = new Enum({
    NIC: 'NIC',
    NO_OBJECTION: 'No Objection Letter',
    CLAIM_FORM: 'Claim Form',
    BANK_DATAILS: 'Bank Details',
    POLICE_REPORT: 'Police Report',
    VEHICLE_BOOK: 'Vehicle Book'
})