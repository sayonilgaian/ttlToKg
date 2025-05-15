import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default async function refreshToken() {
	const url = `${process.env.BASE_URL}/mobius-iam-service/v1.0/login`;

	const reqBody = {
		userName: 'aidtaas@gaiansolutions.com',
		password: 'Gaian@123',
		productId: 'c2255be4-ddf6-449e-a1e0-b4f7f9a2b636',
		requestType: 'TENANT',
	};
	try {
		const response = await axios.post(url, reqBody, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const token = response.data?.accessToken || '';

		return `${token}`;
	} catch (error) {
		console.log('Token generation error: ', JSON.stringify(error, null, 4));
	}
}
