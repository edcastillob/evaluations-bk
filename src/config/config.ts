import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const MONGO_URI = process.env.MONGO_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string;
