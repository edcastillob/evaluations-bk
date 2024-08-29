import mongoose, { Document, Schema } from 'mongoose';
import Counter from './counter';

export interface IIdTechnicalSkills extends Document {
    _id?: number;
    name: string;
    points: number;
}

const idTechnicalSkillsSchema = new Schema<IIdTechnicalSkills>({
    _id: { type: Number, required: true },
    name: { type: String, required: true, maxlength: 200 },
    points: { type: Number, required: true },
});

idTechnicalSkillsSchema.pre<IIdTechnicalSkills>('validate', async function (next) {
    if (this.isNew && !this._id) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'id_technical_skills_id' },
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

const IdTechnicalSkills = mongoose.model<IIdTechnicalSkills>('IdTechnicalSkills', idTechnicalSkillsSchema);
export default IdTechnicalSkills;
