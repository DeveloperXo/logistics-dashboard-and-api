import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);
import enumModel from 'models/enum.model'


export const paginate = {
    params: Joi.object().keys({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}

export const createCashBooking = {
    body: Joi.object().keys({
        shipperName: Joi.string().required(),
        shipperAddress: Joi.string().required(),
        shipperCity: Joi.string().required(),
        shipperState: Joi.string().required(),
        shipperZip: Joi.string().required(),
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
        ferightAmount: Joi.number().required(),
        baseCharges: Joi.number().required(),
        processingCharges: Joi.number().required(),
        fuelCharges: Joi.number().required(),
        fovcharges: Joi.number().required(),
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
        status: Joi.string().valid(...Object.values(enumModel.EnumStatusOfPtlBooking))
    }).options({ allowUnknown: false })
}

export const updateCashBooking = {
    body: Joi.object().keys({
        shipperName: Joi.string(),
        shipperAddress: Joi.string(),
        shipperCity: Joi.string(),
        shipperState: Joi.string(),
        shipperZip: Joi.string(),
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
        ferightAmount: Joi.number(),
        baseCharges: Joi.number(),
        processingCharges: Joi.number(),
        fuelCharges: Joi.number(),
        fovcharges: Joi.number(),
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
        status: Joi.string().valid(...Object.values(enumModel.EnumStatusOfPtlBooking))
    }).options({ allowUnknown: false }),
    params: Joi.object().keys({
        cashBookingId: Joi.objectId().required(),
    })
}

export const validateObjectId = {
    params: Joi.object().keys({
        cashBookingId: Joi.objectId().required()
    })
}

export const updateStatus = {
    body: Joi.object().keys({
        status: Joi.string().valid(...Object.values(enumModel.EnumStatusOfPtlBooking)).required(),
    }),
    params: Joi.object().keys({
        cashBookingId: Joi.objectId().required()
    }) 
}