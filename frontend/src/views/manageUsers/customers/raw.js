import { useState } from "react";

const [formData, setFormData] = useState({
    "customerInformation": {
        "name": "",
        "companyName": "",
        "phone": "",
        "gstNumber": "",
        "address": "",
        "city": "",
        "postalCode": ""
    },
    "accountInformation": {
        "customerLoadType": "",
        "pickupRequestOnLTLPanel": "",
        "addReverseShipmentOnPTL": false,
        "username": "",
        "email": "",
        "salesPerson": "",
        "customerType": ""
    },
    "addresses": {
        "pickupPoint": "",
        "pickupLocation": ""
    },
    "charges": {
        "isGstApplied": false,
        "isPtlApisAllowed": false,
        "shipperRisk": {
            "percentOnConsignmentValue": '',
            "minimumAmount": ''
        }
        ,
        "careerRisk": [
            {
                "percentOnConsignmentValue": '',
                "minimumAmount": ''
            }
        ],
        "fscCharge": '',
        "docketCharge": "",
        "handlingCharges": [
            {
                "fromKg": "",
                "toKg": "",
                "pricePerKg": "",
                "minimumAmount": ""
            }
        ],
        "modeOfTransport": "",
        "otherCharges": {
            "reverseShipmentsCharges": "",
            "minimumChargeWeightOnDocket": "",
            "reattemptCharges": {
                "pricePerKg": "",
                "minimumAmount": ""
            },
            "firstFloorAndAboveDeliveryCharges": "",
            "minimumChargableFreight": "",
            "appointmentDeliveryCharges": {
                "pricePerKg": "",
                "minimumAmount": ""
            },
            "sundayAndNationalHolidayPickupCharges": "",
            "applyFirstMileCharge": {
                "pricePerKg": "",
                "minimumAmount": ""
            },
            "appluFuelLinkageCharge": false,
            "enablePtlPickupRequest": false
        }
        ,
        "odaLocationCharges": [
            {
                "fromKg": "",
                "toKg": "",
                "pricePerKg": "",
                "minimumAmount": ""
            }
        ],
        "codFee": {
            "codPercent": "",
            "codMinimumAmount": ""
        },
        "toPayCharges": {
            "toPayPercent": "",
            "toPayMinimumAmount": ""
        },
        "greenTax": ""
    }
});

const [infoData, setInfoData] = useState({
    name: "",
    companyName: "",
    phone: "",
    gstNumber: "",
    address: "",
    city: "",
    postalCode: "",
    customerLoadType: "",
    pickupRequestOnLTLPanel: "",
    addReverseShipmentOnPTL: false,
    username: "",
    email: "",
    salesPerson: "",
    customerType: "",
    pickupPoint: "",
    pickupLocation: "",
    isGstApplied: false,
    isPtlApisAllowed: false,
    fscCharge: "",
    docketCharge: "",
    modeOfTransport: "",
    shipperRisk_percentOnConsignmentValue: "",
    shipperRisk_minimumAmount: "",
    careerRisk_percentOnConsignmentValue: "",
    careerRisk_minimumAmount: "",
    otherCharges_reverseShipmentsCharges: "",
    otherCharges_minimumChargeWeightOnDocket: "",
    otherCharges_reattemptCharges_pricePerKg: "",
    otherCharges_reattemptCharges_minimumAmount: "",
    otherCharges_firstFloorAndAboveDeliveryCharges: "",
    otherCharges_minimumChargableFreight: "",
    otherCharges_appointmentDeliveryCharges_pricePerKg: "",
    otherCharges_sundayAndNationalHolidayPickupCharges: "",
    otherCharges_applyFirstMileCharge_pricePerKg: "",
    otherCharges_applyFirstMileCharge_minimumAmount: "",
    otherCharges_appluFuelLinkageCharge: "",
    otherCharges_enablePtlPickupRequest: "",
    codFee_codPercent: "",
    codFee_codMinimumAmount: "",
    toPayCharges_toPayPercent: "",
    toPayCharges_toPayMinimumAmount: "",
    greenTax: "",
});

const [caharges, setCharges] = useState({
    shipperRisk: {},
    careerRisk: {},
    fscCharge: "",
    docketCharge: "",
    handlingCharges: [{}],
    otherCharges: {},
    odaLocationCharges: {},
    codFee: {},
    toPayCharges: {}
});

const [otherCharges, setOtherCharges] = useState({

});

const [formData2, setFormData1] = useState({
    "name": "",
    "companyName": "",
    "phone": "",
    "gstNumber": "",
    "address": "",
    "city": "",
    "postalCode": "",
    "customerLoadType": "",
    "pickupRequestOnLTLPanel": "",
    "addReverseShipmentOnPTL": false,
    "username": "",
    "email": "",
    "salesPerson": "",
    "customerType": "",
    "pickupPoint": "",
    "pickupLocation": "",
    "isGstApplied": false,
    "isPtlApisAllowed": false,
    "shipperRisk": {
        "percentOnConsignmentValue": '',
        "minimumAmount": ''
    },
    "careerRisk": {
        "percentOnConsignmentValue": '',
        "minimumAmount": ''
    },
    "fscCharge": '',
    "docketCharge": "",
    "handlingCharges": [
        {
            "fromKg": "",
            "toKg": "",
            "pricePerKg": "",
            "minimumAmount": ""
        }
    ],
    "modeOfTransport": "",
    "otherCharges": {
        "reverseShipmentsCharges": "",
        "minimumChargeWeightOnDocket": "",
        "reattemptCharges": {
            "pricePerKg": "",
            "minimumAmount": ""
        },
        "firstFloorAndAboveDeliveryCharges": "",
        "minimumChargableFreight": "",
        "appointmentDeliveryCharges": {
            "pricePerKg": "",
            "minimumAmount": ""
        },
        "sundayAndNationalHolidayPickupCharges": "",
        "applyFirstMileCharge": {
            "pricePerKg": "",
            "minimumAmount": ""
        },
        "appluFuelLinkageCharge": false,
        "enablePtlPickupRequest": false
    },
    "odaLocationCharges": [
        {
            "fromKg": "",
            "toKg": "",
            "pricePerKg": "",
            "minimumAmount": ""
        }
    ],
    "codFee": {
        "codPercent": "",
        "codMinimumAmount": ""
    },
    "toPayCharges": {
        "toPayPercent": "",
        "toPayMinimumAmount": ""
    },
    "greenTax": ""
});


// new payload
const payload = {
    "customerInformation": {
        "name": "John Doe",
        "companyName": "ABC Company",
        "phone": 1234567890,
        "gstNumber": "GST123456789",
        "address": "123 Main St",
        "city": "New York",
        "postalCode": "10001"
    },
    "accountInformation": {
        "customerLoadType": "ptl",
        "pickupRequestOnLTLPanel": "ltlPanel",
        "addReverseShipmentOnPTL": false,
        "username": "johndoe3",
        "email": "johndoe3@example.com",
        "salesPerson": "60cfd9f35f097e31f48035b3",
        "customerType": "customer"
    },
    "addresses": {
        "pickupPoint": "Warehouse A",
        "pickupLocation": "456 Oak St"
    },
    "charges": {
        "isGstApplied": true,
        "isPtlApisAllowed": true,
        "shipperRisk": {
            "percentOnConsignmentValue": 5,
            "minimumAmount": 50
        },
        "careerRisk": {
            "percentOnConsignmentValue": 3,
            "minimumAmount": 30
        }
        ,
        "fscCharge": 2,
        "docketCharge": 10,
        "handlingCharges": [
            {
                "fromKg": 0,
                "toKg": 5,
                "pricePerKg": 3,
                "minimumAmount": 20
            }
        ],
        "modeOfTransport": "surface",
        "otherCharges": {
            "reverseShipmentsCharges": 15,
            "minimumChargeWeightOnDocket": 10,
            "reattemptCharges": {
                "pricePerKg": 1.5,
                "minimumAmount": 10
            },
            "firstFloorAndAboveDeliveryCharges": 20,
            "minimumChargableFreight": 30,
            "appointmentDeliveryCharges": {
                "pricePerKg": 2,
                "minimumAmount": 15
            },
            "sundayAndNationalHolidayPickupCharges": 25,
            "applyFirstMileCharge": {
                "pricePerKg": 2.5,
                "minimumAmount": 20
            },
            "appluFuelLinkageCharge": true,
            "enablePtlPickupRequest": true
        },
        "odaLocationCharges": [
            {
                "fromKg": 0,
                "toKg": 10,
                "pricePerKg": 1,
                "minimumAmount": 5
            }
        ],
        "codFee": {
            "codPercent": 2,
            "codMinimumAmount": 10
        },
        "toPayCharges": {
            "toPayPercent": 3,
            "toPayMinimumAmount": 20
        },
        "greenTax": 5
    }
}