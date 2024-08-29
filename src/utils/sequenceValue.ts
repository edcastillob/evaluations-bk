// import Counter from '../models/counter';

// export async function getNextSequenceValue(sequenceName: string): Promise<number> {
// 	const sequenceDocument = await Counter.findByIdAndUpdate(
// 		sequenceName,
// 		{ $inc: { sequence_value: 1 } },
// 		{ new: true, upsert: true }
// 	);

// 	return sequenceDocument.sequence_value;
// }
