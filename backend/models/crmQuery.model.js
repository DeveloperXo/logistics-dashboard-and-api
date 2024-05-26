import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';

const QuerySchema = new mongoose.Schema({
    email: {
        type: String
    },
    phone: {
        type: Number,
    },
    message: {
        type: String
    }
}, { timestamps: true });

QuerySchema.plugin(mongoosePaginateV2);

const CrmQueryModel = mongoose.models.CrmQuery || mongoose.model('CrmQuery', QuerySchema, 'CrmQuery');
module.exports = CrmQueryModel;