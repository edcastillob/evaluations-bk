import mongoose, { Document, Schema } from 'mongoose';
import Counter from './counter';

export interface ITimeManagement extends Document {
    _id?: number;
    name: string;
    points: number;
}

const timeManagementSchema = new Schema<ITimeManagement>({
    _id: { type: Number, required: true },
    name: { type: String, required: true, maxlength: 200 },
    points: { type: Number, required: true },
});

timeManagementSchema.pre<ITimeManagement>('validate', async function (next) {
    if (this.isNew && !this._id) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'time_management_id' },
                { $inc: { sequence_value: 1 } },
                { new: true, upsert: true }
            );

            this._id = counter?.sequence_value;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const TimeManagement = mongoose.model<ITimeManagement>('TimeManagement', timeManagementSchema);
export default TimeManagement;
