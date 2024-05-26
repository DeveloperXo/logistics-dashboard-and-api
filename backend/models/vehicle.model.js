import mongoose from "mongoose";
import mongoosePaginateV2 from 'mongoose-paginate-v2';


const VehicleSchema = mongoose.Schema({
    vehicleName: {
        type: String
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    description: {
        type: String
    },
    baseCharge: {
        type: Number
    },
    additionalServiceCharge: {
        type: Number
    },
    baseFareByKm: [
        {
            from: Number,
            to: Number,
            price: Number
        }
    ],
    image: {
        fileName: String
    }
}, { timestamps: true });

VehicleSchema.plugin(mongoosePaginateV2);

const VehicleModel = mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema, 'Vehicle');

module.exports = VehicleModel;