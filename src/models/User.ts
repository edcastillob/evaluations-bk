import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
	_id?: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	active: boolean;
	role: string;
	image_url: string;
	ocupation: string;
	department: string;
	evaluations: Object;
	feedbacks: Object;
	matchPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
	first_name: { type: String, required: true, maxlength: 60 },
	last_name: { type: String, required: true, maxlength: 60 },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true,  select: false },
	active: { type: Boolean, required: true, default: false },
	role: { type: String, required: true, default: 'Employee' },
	image_url: { type: String },
	ocupation: { type: String },
	department: { type: String },
	evaluations: [{ type: Schema.Types.ObjectId, ref: 'Evaluation' }],
	feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(parseInt(process.env.HASH_SALT as string));
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
