import { Schema, model } from "mongoose";

export interface ITask {
  title: string;
  completed: boolean;
  owner: string; // user id (ObjectId as string)
  createdAt?: Date;
  updatedAt?: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    owner: { type: String, required: true }, // store as string to keep typing simple; can be Types.ObjectId if preferred
  },
  { timestamps: true }
);

export default model<ITask>("Task", taskSchema);
