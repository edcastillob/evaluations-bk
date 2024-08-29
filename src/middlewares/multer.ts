import multer from 'multer'

const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, file.originalname.replace(/\s/g, ''))
	}
})

export const multerUpload = multer({
	storage: storage,
	limits: {
		fileSize: 20 * 1024 * 1024 // Limit file size to 20MB (adjust as needed)
	},
	fileFilter: function (req, file, cb) {
		if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
			cb(null, true)
		} else {
			cb(new Error('File type not supported!'))
		}
	}
})
