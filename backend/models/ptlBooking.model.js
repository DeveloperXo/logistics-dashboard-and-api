import mongoose from "mongoose";
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import enumModel from './enum.model';

const PtlBookingSchema = new mongoose.Schema({
    shipperName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    senderName: String,
    pickupLocation: String,
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
    productDescription: String,
    actualWeight: Number,
    shipmentHasFragileContent: Boolean,
    isReverseShipment: Boolean,
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
        enum: Object.values(enumModel.EnumPtlCftType)
    },
    cftTotalWeight: Number,
    ferightMode: {
        type: String,
        enum: Object.values(enumModel.EnumFerightModes)
    },
    ferightAmount: Number,
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
    isReattemptOrRedeliveryCharges: Boolean,
    isFirstFloorAndAboveDeliveryCharges: Boolean,
    isOdaLocationCharges: Boolean,
    isHandlingCharges: Boolean,
    isAppointmentDeliveryCharges: Boolean,
    isSundayAndNationalDeliveryCharges: Boolean,
    isOtherAmountCharges: Boolean,
    otherChargeName: String,
    otherChargeAmount: Number,
    status: {
        type: String,
        enum: Object.values(enumModel.EnumStatusOfPtlBooking),
        default: enumModel.EnumStatusOfPtlBooking.CREATE_BOOKING
    }
}, { timestamps: true });

PtlBookingSchema.plugin(mongoosePaginateV2);

const PtlBookingModel = mongoose.models.PtlBooking || mongoose.model('PtlBooking', PtlBookingSchema, 'PtlBooking');

module.exports = PtlBookingModel;