import checkKgStatus from './utils/checkKgStatus.js';
import createKg from './utils/createKg.js';
import createOntology from './utils/createOntology.js';
import refreshToken from './utils/refreshToken.js';
import uploadToCms from './utils/uploadToCms.js';
import dotenv from 'dotenv';
import updateHistoryAndSave from './utils/writeRecords.js';
import { v4 as uuid } from 'uuid';

dotenv.config();

async function main({
	ontologyName = '',
	kgJobName = '',
	ttlFilePath = './files/ttl/test.ttl',
	kgFilePath = './files/kgFile/test.ttl',
	fileType = 'TXT',
}) {
	let newRecord = {};
	newRecord.timeStamp = Date.now();
	newRecord.ontologyName = ontologyName;

	try {
		// Step 1: generate token
		const accessToken = await refreshToken();

		// Step 2: Upload TTL to CMS
		const { cmsUrl } = await uploadToCms({
			filePath: ttlFilePath,
			token: accessToken,
		});

		// Step 3: Create ontlogy from TTL
		const { ontologyId, data } = await createOntology({
			ontologyUrl: cmsUrl,
			ontologyName,
			openAiKey: process.env.OPEN_AI_KEY,
			accessToken,
		});
		newRecord.ontologyId = ontologyId;
		newRecord.ontologyCreateStatus = data;

		// step 4: upload file for KG to cms (pdf, txt etc)
		const { cmsId, cmsUrl: kgFileUrl } = await uploadToCms({
			filePath: kgFilePath,
			token: accessToken,
		});
		newRecord.kgFileUrl = `${process.env.CDN_URL}${kgFileUrl}`;

		// step 5: send kg to ontology
		const { jobId, createKgResponseData } = await createKg({
			kgJobName,
			ontologyId,
			contentId: cmsId,
			ontologyName,
			fileType,
			token: accessToken,
		});
		newRecord.jobId = jobId;
		newRecord.createKgResponseData = createKgResponseData;

		// Step 6: check kg status
		const { kgIntegrationStatus } = await checkKgStatus({
			jobId,
			token: accessToken,
		});
		newRecord.kgIntegrationStatus = kgIntegrationStatus;
	} catch (error) {
		// Step 7: record everything with timestamp
		newRecord.error = JSON.stringify(error, null, 4);
	} finally {
		updateHistoryAndSave(newRecord);
	}
}

const uniqueId = uuid();

main({
	ontologyName: `Kya-standards-v1-${uniqueId}`,
	kgJobName: `Kya-standards-v1-${uniqueId}}`,
	ttlFilePath: './files/ttl/test.ttl',
	kgFilePath: './files/kgFile/test.txt',
	fileType: 'TXT',
});
