import mongoose, { Document, Schema } from 'mongoose';
import Counter from './counter';

export interface IAdaptability extends Document {
    _id?: number;
    name: string;
    points: number;
}

const adaptabilitySchema = new Schema<IAdaptability>({
    _id: { type: Number, required: true },
    name: { type: String, required: true, maxlength: 200 },
    points: { type: Number, required: true },
});

adaptabilitySchema.pre<IAdaptability>('validate', async function (next) {
    if (this.isNew && !this._id) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'adaptability_id' },
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

const Adaptability = mongoose.model<IAdaptability>('Adaptability', adaptabilitySchema);
export default Adaptability;
