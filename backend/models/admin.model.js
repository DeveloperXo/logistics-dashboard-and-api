import mongoose from "mongoose";
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import enumModel from 'models/enum.model';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    status: {
        type: String,
        enum: Object.values(enumModel.EnumStatusOfUser),
        default: enumModel.EnumStatusOfUser.INACTIVE
    },
    role: {
        type: String,
        enum: Object.values(enumModel.EnumRoleOfUser),
        default: enumModel.EnumRoleOfUser.ADMIN
    },
    password: {
        type: String,
        private: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true
    }
});

AdminSchema.plugin(mongoosePaginateV2);

// check for duiplicate emails
/*
    Check this in each user-related schema
*/
AdminSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const Admin = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!Admin;
};

AdminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// when user resets or changes password, save it in bcrypt format
AdminSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update && update.password) {
        const passwordHash = await bcrypt.hash(update.password, 10);
        this.getUpdate().password = passwordHash;
    }
    next();
});

const AdminModel = mongoose.models.Admin || mongoose.model('Admin', AdminSchema, 'Admin');
module.exports = AdminModel;