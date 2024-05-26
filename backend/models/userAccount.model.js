import mongoose from "mongoose";
import { EnumUserAccountFunctionAdditional, EnumStatusOfUser, EnumRoleOfUser } from 'models/enum.model';
import bcrypt from 'bcryptjs';
import mongoosePaginateV2 from 'mongoose-paginate-v2';

const UserAccountSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    functionAdditional: {
        type: String,
        enum: Object.values(EnumUserAccountFunctionAdditional)
    },
    documents: [
        {
            fileType: String,
            documentName: String,
            fileName: String
        }
    ],
    password: {
        type: String
    },
    status: {
        type: String,
        enum: Object.values(EnumStatusOfUser),
        default: EnumStatusOfUser.INACTIVE
    },
    role: {
        type: String,
        enum: Object.values(EnumRoleOfUser),
        default: EnumRoleOfUser.USER_ACCOUNT
    }
}, { timestamps: true });

UserAccountSchema.plugin(mongoosePaginateV2);

UserAccountSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const User = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!User;
};

UserAccountSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const UserAccountModel = mongoose.models.UserAccount || mongoose.model('UserAccount', UserAccountSchema, 'UserAccount');
module.exports = UserAccountModel;