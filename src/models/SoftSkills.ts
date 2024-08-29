import mongoose, { Document, Schema } from 'mongoose';
import Counter from './counter';

export interface ISoftSkills extends Document {
    _id?: number;
    name: string;
    points: number;
}

const softSkillsSchema = new Schema<ISoftSkills>({
    _id: { type: Number, required: true },
    name: { type: String, required: true, maxlength: 200 },
    points: { type: Number, required: true },
});

softSkillsSchema.pre<ISoftSkills>('validate', async function (next) {
    if (this.isNew && !this._id) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'soft_skills_id' },
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

const SoftSkills = mongoose.model<ISoftSkills>('SoftSkills', softSkillsSchema);
export default SoftSkills;
