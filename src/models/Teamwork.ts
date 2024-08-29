import mongoose, { Document, Schema } from 'mongoose';
import Counter from './counter';

export interface ITeamwork extends Document {
    _id?: number;
    name: string;
    points: number;
}

const teamworkSchema = new Schema<ITeamwork>({
    _id: { type: Number, required: true }, // El campo _id autoincremental
    name: { type: String, required: true, maxlength: 200 },
    points: { type: Number, required: true },
});

teamworkSchema.pre<ITeamwork>('validate', async function (next) {
    if (this.isNew && !this._id) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'teamwork_id' },
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

const Teamwork = mongoose.model<ITeamwork>('Teamwork', teamworkSchema);
export default Teamwork;
