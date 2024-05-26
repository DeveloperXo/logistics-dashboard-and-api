import mongoose from "mongoose";
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import enumModel from 'models/enum.model';
import bcrypt from 'bcryptjs';

// ______REMAINING ___ CFT PRICE SECTION

const AccountInformationSchema = new mongoose.Schema({
    customerLoadType: {
        type: String,
        enum: Object.values(enumModel.EnumLoadTypeOfCustomer)
    },
    pickupRequestOnLTLPanel: {
        type: String,
        enum: Object.values(enumModel.EnumPickupRequestOnLTLPanel)
    },
    addReverseShipmentOnPTL: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    salesPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAccount"
    },
    customerType: {
        type: String,
        enum: Object.values(enumModel.EnumTypeOfCustomer)
    }
});

const CustomerInformationSchema = new mongoose.Schema({
    name: {
        type: String
    },
    companyName: {
        type: String
    },
    phone: {
        type: Number
    },
    gstNumber: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    postalCode: {
        type: String
    }
});

const AddressSchema = new mongoose.Schema({
    // create different model file for billing address schema and give ref user id
    pickupPoint: {
        type: String
    },
    pickupLocation: {
        type: String
    }
});

const ChargesChildShipperRisk = new mongoose.Schema({
    percentOnConsignmentValue: {
        type: Number
    },
    minimumAmount: {
        type: Number
    }
});
const ChargesChildCareerRisk = new mongoose.Schema({
    percentOnConsignmentValue: {
        type: Number
    },
    minimumAmount: {
        type: Number
    }
});
const ChargesChildOtherCharges = new mongoose.Schema({
    reverseShipmentsCharges: {
        type: Number
    },
    minimumChargeWeightOnDocket: {
        type: Number
    },
    reattemptCharges: {
        pricePerKg: Number,
        minimumAmount: Number
    },
    firstFloorAndAboveDeliveryCharges: {
        type: Number
    },
    minimumChargableFreight: {
        type: Number
    },
    appointmentDeliveryCharges: {
        pricePerKg: Number,
        minimumAmount: Number
    },
    sundayAndNationalHolidayPickupCharges: {
        minimumAmount: Number
    },
    applyFirstMileCharge: {
        pricePerKg: Number,
        minimumAmount: Number
    },
    appluFuelLinkageCharge: {
        type: Boolean
    },
    enablePtlPickupRequest: {
        type: Boolean
    }
});

const ChargesSchema = new mongoose.Schema({ // aka ptl informations
    isGstApplied: {
        type: Boolean,
        default: false
    },
    isPtlApisAllowed: {
        type: Boolean,
        default: false
    },
    shipperRisk: {
        type: ChargesChildShipperRisk
    },
    careerRisk: {
        type: ChargesChildCareerRisk
    },
    fscCharge: {
        type: Number
    },
    docketCharge: {
        type: Number
    },
    handlingCharges: [
        {
            fromKg: Number,
            toKg: Number,
            pricePerKg: Number,
            minimumAmount: Number
        }
    ],
    modeOfTransport: {
        type: String,
        enum: Object.values(enumModel.EnumModesOfTransport)
    },
    otherCharges: {
        type: ChargesChildOtherCharges
    },
    odaLocationCharges: [
        {
            fromKg: Number,
            toKg: Number,
            pricePerKg: Number,
            minimumAmount: Number
        }
    ],
    codFee: {
        codPercent: Number,
        codMinimumAmount: Number
    },
    toPayCharges: {
        toPayPercent: Number,
        toPayMinimumAmount: Number
    },
    greenTax: {
        type: Number
    }
});

const CustomerSchema = new mongoose.Schema({
    customerInformation: {
        type: CustomerInformationSchema
    },
    accountInformation: {
        type: AccountInformationSchema
    },
    addresses: {
        type: AddressSchema
    },
    charges: {
        type: ChargesSchema
    },
    status: {
        type: String,
        enum: Object.values(enumModel.EnumStatusOfUser),
        default: enumModel.EnumStatusOfUser.INACTIVE
    },
    role: {
        type: String,
        enum: Object.values(enumModel.EnumRoleOfUser),
        default: enumModel.EnumRoleOfUser.CUSTOMER
    }
}, { timestamps: true });

CustomerSchema.plugin(mongoosePaginateV2);

CustomerSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const User = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!User;
};
CustomerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});
/**
 * When user reset password or change password then it save in bcrypt format
 */
CustomerSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate(); // {password: "..."}
    if (update && update.password) {
        const passwordHash = await bcrypt.hash(update.password, 10);
        this.getUpdate().password = passwordHash;
    }
    next();
});
const CustomerModel = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema, 'Customer');
module.exports = CustomerModel;