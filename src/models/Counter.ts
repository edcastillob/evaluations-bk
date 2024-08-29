import mongoose, { Document, Schema } from 'mongoose';

export interface ICounter extends Document {
    _id: string;
    sequence_value: number;
}

const counterSchema = new Schema<ICounter>({
    _id: { type: String },
    sequence_value: { type: Number, default: 0 }
});

const Counter = mongoose.model<ICounter>('Counter', counterSchema);
export default Counter;
