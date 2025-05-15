import dotenv from 'dotenv';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

dotenv.config();

export default async function uploadToCms({ filePath = '', token = '' }) {
	const baseUrl = process.env.BASE_URL;

	if (!token) {
		throw new Error('Token is required.');
	}

	if (!filePath) {
		throw new Error('FilePath is required.');
	}

	const url = `${baseUrl}/mobius-content-service/v1.0/content/upload?filePath=kyaAgentsStandards&contentTags=test`;

	// Create form data and append the dynamic file path
	const form = new FormData();
	form.append('file', fs.createReadStream(filePath));

	// Merge Authorization header with form headers (which includes content-type with boundary)
	const headers = {
		Authorization: `Bearer ${token}`,
		...form.getHeaders(),
	};

	try {
		const res = await axios.post(url, form, { headers });
		return {
			cmsId: res.data.id,
			cmsUrl: `${res.data.cdnUrl}`,
		};
	} catch (error) {
		console.error('Upload failed:', error.response?.data || error.message);
		throw error;
	}
}
