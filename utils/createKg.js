import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export default async function createKg({
	kgJobName = 'test',
	ontologyId,
	contentId,
	ontologyName,
	fileType = 'TXT',
	token = '',
}) {
	const baseUrl = process.env.BASE_URL;
	const url = `${baseUrl}/pi-ingestion-service-dbaas/v2.0/jobs`;

	const reqBody = {
		name: kgJobName,
		description: 'Testing',
		source: {
			sourceType: 'FILE',
			file: 'file',
			kafkaProps: {},
			graphRagProps: {
				ontologyId,
				contentId,
				ontologyName,
			},
		},
		fileType,
		// generally not changed
		universes: ['6731eaf172bc6d1171381e76'],
		jobType: 'ONE_TIME',
		sinks: ['GRAPHRAG'],
		parallelism: 4,
		jarVersion: '12.3.0',
		mappingConfig: {
			mappings: {},
			destinationSchema: '675c97489c260269d2c30e15',
			urlProperties: {},
		},
		cep: false,
		publish: false,
		thumbnail: ['thumbnail1', 'thumbnail'],
		tags: {
			BLUE: ['qwertyui'],
		},
		persist: false,
		timeZone: 'Asia/Kolkata',
		vaultPath: 'clientTidbCredentials-222',
	};

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};

	try {
		const res = await axios.post(url, reqBody, {
			headers,
		});
		return {
			jobId: res.data.id || '',
			createKgResponseData: res.data,
		};
	} catch (error) {
		return {
			jobId: 'Error',
			createKgResponseData: error,
		};
	}
}
