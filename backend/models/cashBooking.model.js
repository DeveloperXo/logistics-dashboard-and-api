import mongoose from "mongoose";
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import enumModel from './enum.model';

const CashBookingSchema = new mongoose.Schema({
    shipperName: String,
    shipperAddress: String,
    shipperCity: String,
    shipperState: String,
    shipperZip: String,
    isShipperRisk: Boolean,
    isCareerRisk: Boolean,
    docketNumber: String,
    threePlDocketNumber: String,
    threePlPartner: String,
    modeOfTransport: {
        type: String,
        enum: Object.values(enumModel.EnumModesOfTransport)
    },
    bookingDate: String,
    salesPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAccount'
    },
    productDescription: String,
    actualWeight: Number,
    shipmentHasFragileContent: Boolean,
    clientReferenceId: String,
    qty: Number,
    dimensionUnit: {
        type: String,
        enum: Object.values(enumModel.EnumDimensionUnits)
    },
    dimensions: [
        {
            qty: Number,
            length: Number,
            height: Number,
            width: Number,
            cftWeight: Number
        }
    ],
    cftType: {
        type: String,
        enum: Object.values(enumModel.EnumCftType)
    },
    cftTotalWeight: Number,
    ferightAmount: Number,
    baseCharges: Number,
    processingCharges: Number,
    fuelCharges: Number,
    fovcharges: Number,
    shipperGstIn: String,
    consigneeGstIn: String,
    shipperInvoices: [
        {
            eWayBillNo: Number,
            invoiceNo: Number,
            invoiceAmount: Number,
            invoiceDate: String,
            file: String // file-name only
        }
    ],
    receiverName: String,
    receiverPhoneNumber: Number,
    receiverAddress: String,
    receiverLocationType: {
        type: String,
        enum: Object.values(enumModel.EnumDeliveryLocationType)
    },
    receiverPostalCode: String,
    receiverArea: String,
    receiverDistrict: String,
    receiverState: String,
    otherCharges: [
        {
            fee: String,
            amount: Number
        }
    ],
    status: {
        type: String,
        enum: Object.values(enumModel.EnumStatusOfPtlBooking),
        default: enumModel.EnumStatusOfPtlBooking.CREATE_BOOKING
    }
}, { timestamps: true });

CashBookingSchema.plugin(mongoosePaginateV2);

const CashBookingModel = mongoose.models.CashBooking || mongoose.model('CashBooking', CashBookingSchema, 'CashBooking');

module.exports = CashBookingModel;