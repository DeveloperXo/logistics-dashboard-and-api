import mongoose from "mongoose";
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { EnumTypeOfTransaction } from "./enum.model";

const WalletTransactionSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    balance: {
        type: Number
    },
    amount: {
        type: Number,
    },
    docketNumber: {
        type: String
    },
    amountType: {
        type: String,
        enum: Object.values(EnumTypeOfTransaction)
    },
    comment: {
        type: String
    },
    receipt: {
        type: String // filename only
    },
    lastRechargeDate: {
        type: String
    }
}, { timestamps: true });

WalletTransactionSchema.plugin(mongoosePaginateV2);

const WalletTransactionModel = mongoose.models.WalletTransaction || mongoose.model("WalletTransaction", WalletTransactionSchema, "WalletTransaction");

module.exports = WalletTransactionModel;