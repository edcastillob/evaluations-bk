import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
	_id?: string;
	id_user: mongoose.Types.ObjectId;
	comment: string;
	id_evaluator: mongoose.Types.ObjectId;
}

const feedbackSchema = new Schema<IFeedback>({
	id_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	comment: { type: String, required: true, maxlength: 200 },
	id_evaluator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Feedback = mongoose.model<IFeedback>('Feedback', feedbackSchema);
export default Feedback;
