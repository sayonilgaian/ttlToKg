import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export default async function createOntology({
	ontologyUrl = '',
	ontologyName = '',
	openAiKey = '',
	accessToken = '',
}) {
	const url = `${process.env.BASE_URL}/pi-ontology-service/ontology/v1.0/create`;

	const reqBody = {
		ontologyUrl:`${process.env.CDN_URL}${ontologyUrl}`,
		ontologyName,
		ontologyAiPayload: {
			aiModelName: 'GPT40MINI2024',
			// aiModelName: 'gpt-4o-mini-2024-07-18',
			embeddingModelName: 'TextEmbeddingAda002',
			llmKey: openAiKey,
			embeddingKey: openAiKey,
		},
		// following values don't change generally
		description: 'test',
		fileType: 'TURTLE',
		draft: false,
		dataBaseType: 'NEO4J',
		universes: ['66e2f144902a0633d63e2a9d'],
		isActive: true,
		visibility: 'PUBLIC',
		dataReadAccess: 'PUBLIC',
		dataWriteAccess: 'PUBLIC',
		metadataReadAccess: 'PUBLIC',
		metadataWriteAccess: 'PUBLIC',
		execute: 'PUBLIC',
		semanticStructures: 'ONTOLOGY',
		ontologyAiServiceProviders: 'OPENAI',
		ontologyEmbeddingServiceProviders: 'OPENAI',
	};

	const headers = {
		'Content-Type': 'application/json',
		'openApi-key': openAiKey,
		Authorization: `Bearer ${accessToken}`,
	};

	try {
		const res = await axios.post(url, reqBody, {
			headers,
		});

		return {
			data: res.data,
			ontologyId: res.data?.ontologyId,
		};
	} catch (error) {
		return {
			data: error,
			ontologyId: '',
		};
	}
}
