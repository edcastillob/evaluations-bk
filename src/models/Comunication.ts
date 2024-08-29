import Counter from './counter';
import mongoose, { Document, Schema } from 'mongoose';

export interface IComunication extends Document {
    _id?: number; // Cambiado a number
    name: string;
    points: number;
}

const comunicationSchema = new Schema<IComunication>({
    _id: { type: Number, required: true }, // Asegúrate de que esto sea Number
    name: { type: String, required: true, maxlength: 200 },
    points: { type: Number, required: true },
});

comunicationSchema.pre<IComunication>('validate', async function (next) { // Cambiado de 'save' a 'validate'
    if (this.isNew && !this._id) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'comunication_id' },
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

const Comunication = mongoose.model<IComunication>('Comunication', comunicationSchema);
export default Comunication;
