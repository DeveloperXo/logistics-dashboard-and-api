import mongoose from "mongoose";
import mongoosePaginateV2 from 'mongoose-paginate-v2';

const WalletSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    balance: {
        type: Number,
    },
    lastRechargeDate: {
        type: String
    }
}, { timestamps: true });

WalletSchema.plugin(mongoosePaginateV2);

const WalletModel = mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema, "Wallet");

module.exports = WalletModel;