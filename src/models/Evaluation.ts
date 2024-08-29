import mongoose, { Document, Schema } from 'mongoose';

export interface IEvaluation extends Document {
  _id?: mongoose.Types.ObjectId;
  id_user: mongoose.Types.ObjectId;
  id_technical_skills: number;
  id_comunication: number;
  id_teamwork: number;
  id_time_management: number;
  id_adaptability: number;
  id_soft_skills: number;
  id_evaluator: mongoose.Types.ObjectId;
}

const evaluationSchema = new Schema<IEvaluation>({
  id_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  id_technical_skills: { type: Number, ref: 'IdTechnicalSkills', required: true },
  id_comunication: { type: Number, ref: 'Comunication', required: true },
  id_teamwork: { type: Number, ref: 'Teamwork', required: true },
  id_time_management: { type: Number, ref: 'IdTechnicalSkills', required: true },
  id_adaptability: { type: Number, ref: 'Adaptability', required: true },
  id_soft_skills: { type: Number, ref: 'SoftSkills', required: true },
  id_evaluator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Evaluation = mongoose.model<IEvaluation>('Evaluation', evaluationSchema);
export default Evaluation;
