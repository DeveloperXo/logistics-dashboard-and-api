import mongoose from 'mongoose';
import { EnumPricePrefixes, EnumStatusOfPrice, EnumTypeOfPrice } from './enum.model'; 
import mongoosePaginateV2 from 'mongoose-paginate-v2';

const WebPriceSchema = new mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String,
        enum: Object.values(EnumTypeOfPrice)
    },
    priceChart: [
        {
            index: Number,
            from: {
                type: String,
                enum: Object.values(EnumPricePrefixes)
            },
            to: {
                type: String,
                enum: Object.values(EnumPricePrefixes)
            },
            price: Number
        }
    ],
    status: {
        type: String,
        enum: Object.values(EnumStatusOfPrice),
        default: EnumStatusOfPrice.INACTIVE
    },
}, { timestamps: true });

WebPriceSchema.plugin(mongoosePaginateV2);

const WebPriceModel = mongoose.models.WebPrice || mongoose.model('WebPrice', WebPriceSchema, 'WebPrice');

module.exports = WebPriceModel;