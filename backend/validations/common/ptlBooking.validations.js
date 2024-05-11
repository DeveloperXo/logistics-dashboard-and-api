import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);
import enumModel from 'models/enum.model'


export const paginate = {
    params: Joi.object().keys({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}

export const createPtlBooking = {
    body: Joi.object().keys({
        shipperName: Joi.string().required(),
        senderName: Joi.string().required(),
        pickupLocation: Joi.string().required(),
        isShipperRisk: Joi.boolean().required(),
        isCareerRisk: Joi.boolean().required(),
        docketNumber: Joi.string().required(),
        threePlDocketNumber: Joi.string().required(),
        threePlPartner: Joi.string().required(),
        modeOfTransport: Joi.string().valid(...Object.values(enumModel.EnumModesOfTransport)).required(),
        bookingDate: Joi.string().required(),
        productDescription: Joi.string().required(),
        actualWeight: Joi.number().required(),
        shipmentHasFragileContent: Joi.boolean().required(),
        isReverseShipment: Joi.boolean().required(),
        clientReferenceId: Joi.string().required(),
        qty: Joi.number().required(),
        dimensionUnit: Joi.string().valid(...Object.values(enumModel.EnumDimensionUnits)).required(),
        dimensions: Joi.array().items(Joi.object(
            {
                qty: Joi.number().required(),
                length: Joi.number().required(),
                height: Joi.number().required(),
                width: Joi.number().required(),
                cftWeight: Joi.number().required()
            }
        )),
        cftType: Joi.string().valid(...Object.values(enumModel.EnumCftType)).required(),
        cftTotalWeight: Joi.number().required(),
        ferightMode: Joi.string().valid(...Object.values(enumModel.EnumFerightModes)).required(),
        ferightAmount: Joi.number().required(),
        shipperGstIn: Joi.string().required(),
        consigneeGstIn: Joi.string().required(),
        shipperInvoices: Joi.array().items(Joi.object(
            {
                eWayBillNo: Joi.number().required(),
                invoiceNo: Joi.number().required(),
                invoiceAmount: Joi.number().required(),
                invoiceDate: Joi.string().required(),
                attachment: Joi.string().required() // file-name only
            }
        )),
        receiverName: Joi.string().required(),
        receiverPhoneNumber: Joi.number().required(),
        receiverAddress: Joi.string().required(),
        receiverLocationType: Joi.string().valid(...Object.values(enumModel.EnumDeliveryLocationType)).required(),
        receiverPostalCode: Joi.string().required(),
        receiverArea: Joi.string().required(),
        receiverDistrict: Joi.string().required(),
        receiverState: Joi.string().required(),
        isReattemptOrRedeliveryCharges: Joi.boolean().required(),
        isFirstFloorAndAboveDeliveryCharges: Joi.boolean().required(),
        isOdaLocationCharges: Joi.boolean().required(),
        isHandlingCharges: Joi.boolean().required(),
        isAppointmentDeliveryCharges: Joi.boolean().required(),
        isSundayAndNationalDeliveryCharges: Joi.boolean().required(),
        isOtherAmountCharges: Joi.boolean().required(),
        otherChargeName: Joi.string().required(),
        otherChargeAmount: Joi.number().required(),
        status: Joi.string().valid(...Object.values(enumModel.EnumStatusOfPtlBooking))
    }).options({ allowUnknown: false })
}

export const updatePtlBooking = {
    body: Joi.object().keys({
        shipperName: Joi.string(),
        senderName: Joi.string(),
        pickupLocation: Joi.string(),
        isShipperRisk: Joi.boolean(),
        isCareerRisk: Joi.boolean(),
        docketNumber: Joi.string(),
        threePlDocketNumber: Joi.string(),
        threePlPartner: Joi.string(),
        modeOfTransport: Joi.string().valid(...Object.values(enumModel.EnumModesOfTransport)),
        bookingDate: Joi.string(),
        productDescription: Joi.string(),
        actualWeight: Joi.number(),
        shipmentHasFragileContent: Joi.boolean(),
        isReverseShipment: Joi.boolean(),
        clientReferenceId: Joi.string(),
        qty: Joi.number(),
        dimensionUnit: Joi.string().valid(...Object.values(enumModel.EnumDimensionUnits)),
        dimensions: Joi.array().items(Joi.object(
            {
                qty: Joi.number(),
                length: Joi.number(),
                height: Joi.number(),
                width: Joi.number(),
                cftWeight: Joi.number()
            }
        )),
        cftType: Joi.string().valid(...Object.values(enumModel.EnumCftType)),
        cftTotalWeight: Joi.number(),
        ferightMode: Joi.string().valid(...Object.values(enumModel.EnumFerightModes)),
        ferightAmount: Joi.number(),
        shipperGstIn: Joi.string(),
        consigneeGstIn: Joi.string(),
        shipperInvoices: Joi.array().items(Joi.object(
            {
                eWayBillNo: Joi.number(),
                invoiceNo: Joi.number(),
                invoiceAmount: Joi.number(),
                invoiceDate: Joi.string(),
                attachment: Joi.string() // file-name only
            }
        )),
        receiverName: Joi.string(),
        receiverPhoneNumber: Joi.number(),
        receiverAddress: Joi.string(),
        receiverLocationType: Joi.string().valid(...Object.values(enumModel.EnumDeliveryLocationType)),
        receiverPostalCode: Joi.string(),
        receiverArea: Joi.string(),
        receiverDistrict: Joi.string(),
        receiverState: Joi.string(),
        isReattemptOrRedeliveryCharges: Joi.boolean(),
        isFirstFloorAndAboveDeliveryCharges: Joi.boolean(),
        isOdaLocationCharges: Joi.boolean(),
        isHandlingCharges: Joi.boolean(),
        isAppointmentDeliveryCharges: Joi.boolean(),
        isSundayAndNationalDeliveryCharges: Joi.boolean(),
        isOtherAmountCharges: Joi.boolean(),
        otherChargeName: Joi.string(),
        otherChargeAmount: Joi.number(),
        status: Joi.string().valid(...Object.values(enumModel.EnumStatusOfPtlBooking))
    }).options({ allowUnknown: false }),
    params: Joi.object().keys({
        ptlBookingId: Joi.objectId().required(),
    })
}

export const validateObjectId = {
    params: Joi.object().keys({
        ptlBookingId: Joi.objectId().required()
    })
}