import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export default async function checkKgStatus({ jobId = '', token = '' }) {
	const baseUrl = process.env.BASE_URL;
	const url = `${baseUrl}/pi-ingestion-service-dbaas/v1.0/status/${jobId}`;

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};

	try {
		const res = await axios.get(url, {
			headers,
		});

		return {
			kgIntegrationStatus: res.data,
		};
	} catch (error) {
		return {
			kgIntegrationStatus: error,
		};
	}
}
