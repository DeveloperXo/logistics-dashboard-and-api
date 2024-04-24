import mongoose from 'mongoose';
import enumModel from './enum.model';

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(enumModel.EnumTypeOfToken),
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Token = mongoose.models.Token || mongoose.model('Token', tokenSchema);
module.exports = Token;
