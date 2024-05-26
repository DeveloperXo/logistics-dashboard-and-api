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
    percentOnConsignmentValue: Joi.number().required(),
    minimumAmount: Joi.number().required()
});

const ChargesChildCareerRisk = Joi.object({
    percentOnConsignmentValue: Joi.number().required(),
    minimumAmount: Joi.number().required()
});

const ChargesChildOtherCharges = Joi.object({
    reverseShipmentsCharges: Joi.number().required(),
    minimumChargeWeightOnDocket: Joi.number().required(),
    reattemptCharges: Joi.object({
        pricePerKg: Joi.number().required(),
        minimumAmount: Joi.number().required()
    }).required(),
    firstFloorAndAboveDeliveryCharges: Joi.number().required(),
    minimumChargableFreight: Joi.number().required(),
    appointmentDeliveryCharges: Joi.object({
        pricePerKg: Joi.number().required(),
        minimumAmount: Joi.number().required()
    }).required(),
    sundayAndNationalHolidayPickupCharges: Joi.number().required(),
    applyFirstMileCharge: Joi.object({
        pricePerKg: Joi.number().required(),
        minimumAmount: Joi.number().required()
    }).required(),
    appluFuelLinkageCharge: Joi.boolean().required(),
    enablePtlPickupRequest: Joi.boolean().required()
});

const ChargesSchema = Joi.object({
    isGstApplied: Joi.boolean().default(false),
    isPtlApisAllowed: Joi.boolean().default(false),
    shipperRisk: ChargesChildShipperRisk.required(),
    careerRisk: ChargesChildCareerRisk.required(),
    fscCharge: Joi.number(),
    docketCharge: Joi.number(),
    handlingCharges: Joi.array().items(Joi.object({
        fromKg: Joi.number().required(),
        toKg: Joi.number().required(),
        pricePerKg: Joi.number().required(),
        minimumAmount: Joi.number().required()
    })),
    modeOfTransport: Joi.string().valid(...Object.values(enumModel.EnumModesOfTransport)).required(),
    otherCharges: ChargesChildOtherCharges.required(),
    odaLocationCharges: Joi.array().items(Joi.object({
        fromKg: Joi.number().required(),
        toKg: Joi.number().required(),
        pricePerKg: Joi.number().required(),
        minimumAmount: Joi.number().required()
    })),
    codFee: Joi.object({
        codPercent: Joi.number().required(),
        codMinimumAmount: Joi.number().required()
    }),
    toPayCharges: Joi.object({
        toPayPercent: Joi.number().required(),
        toPayMinimumAmount: Joi.number().required()
    }),
    greenTax: Joi.number()
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

const AccountInformationSchema = Joi.object({
    customerLoadType: Joi.string().valid(...Object.values(enumModel.EnumLoadTypeOfCustomer)).required(),
    pickupRequestOnLTLPanel: Joi.string().valid(...Object.values(enumModel.EnumPickupRequestOnLTLPanel)).required(),
    addReverseShipmentOnPTL: Joi.boolean().default(false),
    username: Joi.string().required(),
    email: Joi.string().required(),
    salesPerson: Joi.string().required(),
    customerType: Joi.string().valid(...Object.values(enumModel.EnumTypeOfCustomer)).required()
});

export const createCustomerSchema = {
    body: Joi.object({
        customerInformation: CustomerInformationSchema.required(),
        accountInformation: AccountInformationSchema.required(),
        addresses: AddressSchema.required(),
        charges: ChargesSchema.required(),
    }).options({ allowUnknown: false })
}

export const validateObjectId = {
    params: Joi.object().keys({
        customerId: Joi.objectId().required()
    })
}

export const searchByEmail = {
    params: Joi.object().keys({
        email: Joi.string().required()
    })
}