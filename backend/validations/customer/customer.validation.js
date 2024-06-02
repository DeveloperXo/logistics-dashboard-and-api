import Joi from 'joi';
import enumModel from 'models/enum.model';

Joi.objectId = require('joi-objectid')(Joi);


// const CustomerInformationSchema = Joi.object({
//     name: Joi.string().required(),
//     companyName: Joi.string().required(),
//     phone: Joi.number().required(),
//     gstNumber: Joi.string().required(),
//     address: Joi.string().required(),
//     city: Joi.string().required(),
//     postalCode: Joi.string().required()
// });

// const AccountInformationSchema = Joi.object({
//     customerLoadType: Joi.string().valid(...Object.values(enumModel.EnumLoadTypeOfCustomer)).required(),
//     pickupRequestOnLTLPanel: Joi.string().valid(...Object.values(enumModel.EnumPickupRequestOnLTLPanel)).required(),
//     addReverseShipmentOnPTL: Joi.boolean().default(false),
//     username: Joi.string().required(),
//     email: Joi.string().email().required(),
//     salesPerson: Joi.string().required(),
//     customerType: Joi.string().valid(...Object.values(enumModel.EnumTypeOfCustomer)).required(),
//     password: Joi.string().required()
// });

// const AddressSchema = Joi.object({
//     pickupPoint: Joi.string().required(),
//     pickupLocation: Joi.string().required()
// });

// const ChargesChildShipperRisk = Joi.object({
//     percentOnConsignmentValue: Joi.number().required(),
//     minimumAmount: Joi.number().required()
// });

// const ChargesChildCareerRisk = Joi.object({
//     percentOnConsignmentValue: Joi.number().required(),
//     minimumAmount: Joi.number().required()
// });

// const ChargesChildOtherCharges = Joi.object({
//     reverseShipmentsCharges: Joi.number().required(),
//     minimumChargeWeightOnDocket: Joi.number().required(),
//     reattemptCharges: Joi.object({
//         pricePerKg: Joi.number().required(),
//         minimumAmount: Joi.number().required()
//     }).required(),
//     firstFloorAndAboveDeliveryCharges: Joi.number().required(),
//     minimumChargableFreight: Joi.number().required(),
//     appointmentDeliveryCharges: Joi.object({
//         pricePerKg: Joi.number().required(),
//         minimumAmount: Joi.number().required()
//     }).required(),
//     sundayAndNationalHolidayPickupCharges: Joi.number().required(),
//     applyFirstMileCharge: Joi.object({
//         pricePerKg: Joi.number().required(),
//         minimumAmount: Joi.number().required()
//     }).required(),
//     appluFuelLinkageCharge: Joi.boolean().required(),
//     enablePtlPickupRequest: Joi.boolean().required()
// });

// const ChargesSchema = Joi.object({
//     isGstApplied: Joi.boolean().default(false),
//     isPtlApisAllowed: Joi.boolean().default(false),
//     shipperRisk: Joi.array().items(ChargesChildShipperRisk),
//     careerRisk: Joi.array().items(ChargesChildCareerRisk),
//     fscCharge: Joi.number().required(),
//     docketCharge: Joi.number().required(),
//     handlingCharges: Joi.array().items(Joi.object({
//         fromKg: Joi.number().required(),
//         toKg: Joi.number().required(),
//         pricePerKg: Joi.number().required(),
//         minimumAmount: Joi.number().required()
//     })),
//     modeOfTransport: Joi.string().valid(...Object.values(enumModel.EnumModesOfTransport)).required(),
//     otherCharges: Joi.array().items(ChargesChildOtherCharges),
//     odaLocationCharges: Joi.array().items(Joi.object({
//         fromKg: Joi.number().required(),
//         toKg: Joi.number().required(),
//         pricePerKg: Joi.number().required(),
//         minimumAmount: Joi.number().required()
//     })),
//     codFee: Joi.object({
//         codPercent: Joi.number().required(),
//         codMinimumAmount: Joi.number().required()
//     }),
//     toPayCharges: Joi.object({
//         toPayPercent: Joi.number().required(),
//         toPayMinimumAmount: Joi.number().required()
//     }),
//     greenTax: Joi.number().required()
// });

// export const createCustomerSchema = {
//     body: Joi.object({
//         customerInformation: CustomerInformationSchema.required(),
//         accountInformation: AccountInformationSchema.required(),
//         addresses: AddressSchema.required(),
//         charges: ChargesSchema.required()
//     }).options({ allowUnknown: false })
// };




const ChargesChildShipperRisk = Joi.object({
    percentOnConsignmentValue: Joi.number().allow('').empty(''),
    minimumAmount: Joi.number().allow('').empty('')
});

const ChargesChildCareerRisk = Joi.object({
    percentOnConsignmentValue: Joi.number().allow('').empty(''),
    minimumAmount: Joi.number().allow('').empty('')
});

const ChargesChildOtherCharges = Joi.object({
    reverseShipmentsCharges: Joi.number().allow('').empty(''),
    minimumChargeWeightOnDocket: Joi.number().allow('').empty(''),
    reattemptCharges: Joi.object({
        pricePerKg: Joi.number().allow('').empty(''),
        minimumAmount: Joi.number().allow('').empty('')
    }),
    firstFloorAndAboveDeliveryCharges: Joi.number().allow('').empty(''),
    minimumChargableFreight: Joi.number().allow('').empty(''),
    appointmentDeliveryCharges: Joi.object({
        pricePerKg: Joi.number().allow('').empty(''),
        minimumAmount: Joi.number().allow('').empty('')
    }),
    sundayAndNationalHolidayPickupCharges: Joi.number().allow('').empty(''),
    applyFirstMileCharge: Joi.object({
        pricePerKg: Joi.number().allow('').empty(''),
        minimumAmount: Joi.number().allow('').empty('')
    }),
    appluFuelLinkageCharge: Joi.boolean(),
    enablePtlPickupRequest: Joi.boolean()
});

const ChargesSchema = Joi.object({
    isGstApplied: Joi.boolean().default(false),
    isPtlApisAllowed: Joi.boolean().default(false),
    shipperRisk: ChargesChildShipperRisk.required(),
    careerRisk: ChargesChildCareerRisk.required(),
    fscCharge: Joi.number().allow('').empty(''),
    docketCharge: Joi.number().allow('').empty(''),
    handlingCharges: Joi.array().items(Joi.object({
        fromKg: Joi.number().allow('').empty(''),
        toKg: Joi.number().allow('').empty(''),
        pricePerKg: Joi.number().allow('').empty(''),
        minimumAmount: Joi.number().allow('').empty('')
    })),
    modeOfTransport: Joi.string().valid(...Object.values(enumModel.EnumModesOfTransport)).required(),
    otherCharges: ChargesChildOtherCharges.required(),
    odaLocationCharges: Joi.array().items(Joi.object({
        fromKg: Joi.number().allow('').empty(''),
        toKg: Joi.number().allow('').empty(''),
        pricePerKg: Joi.number().allow('').empty(''),
        minimumAmount: Joi.number().allow('').empty('')
    })),
    codFee: Joi.object({
        codPercent: Joi.number().allow('').empty(''),
        codMinimumAmount: Joi.number().allow('').empty('')
    }),
    toPayCharges: Joi.object({
        toPayPercent: Joi.number().allow('').empty(''),
        toPayMinimumAmount: Joi.number().allow('').empty('')
    }),
    greenTax: Joi.number().allow('').empty(''),
    cftType: Joi.string().valid(...Object.values(enumModel.EnumCftType)).required(),
    cftSurface: Joi.number().allow('').empty(''),
    cftAir: Joi.number().allow('').empty(''),
});

const CustomerInformationSchema = Joi.object({
    name: Joi.string().required(),
    companyName: Joi.string().required(),
    phone: Joi.number().required(),
    gstNumber: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().required()
});

const AddressSchema = Joi.object({
    pickupPoint: Joi.string().required(),
    pickupLocation: Joi.string().required()
});

const BillingInformationSchema = Joi.array().items(Joi.object({
    title: Joi.string().required(),
    companyName: Joi.string().required(),
    address: Joi.string().required(),
    gstNumber: Joi.string().required(),
    branch: Joi.string().required(),
    paymentTerms: Joi.string().required()
}));

const AccountInformationSchema = Joi.object({
    customerLoadType: Joi.string().valid(...Object.values(enumModel.EnumLoadTypeOfCustomer)).required(),
    pickupRequestOnLTLPanel: Joi.boolean().default(false),
    manageEcomKyc: Joi.boolean().default(false),
    addReverseShipmentOnPTL: Joi.boolean().default(false),
    username: Joi.string().required(),
    email: Joi.string().required(),
    salesPerson: Joi.string(),
    customerType: Joi.string().valid(...Object.values(enumModel.EnumTypeOfCustomer)).required()
});

export const createCustomerSchema = {
    body: Joi.object({
        customerInformation: CustomerInformationSchema.required(),
        accountInformation: AccountInformationSchema.required(),
        addresses: AddressSchema.required(),
        billingInformations: BillingInformationSchema.required(),
        charges: ChargesSchema.required(),
    }).options({ allowUnknown: false })
}

export const validateObjectId = {
    params: Joi.object().keys({
        customerId: Joi.objectId().required()
    })
}

export const updateStatus = {
    body: Joi.object().keys({
        status: Joi.string().valid(...Object.values(enumModel.EnumStatusOfUser)).required(),
    }),
    params: Joi.object().keys({
        customerId: Joi.objectId().required()
    }) 
}

export const searchByEmail = {
    params: Joi.object().keys({
        email: Joi.string().required()
    })
}