import { Document, Schema, model } from "mongoose";

export interface IUser {
  email: string;
  hashedPassword: string;
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    hashedPassword: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IUserDocument>("User", userSchema);
