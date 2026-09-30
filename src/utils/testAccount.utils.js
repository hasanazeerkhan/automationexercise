import purchaseFlow from '../../testData/purchaseFlow.json';
import {
	generateEmail,
	generateLastName,
	generatePassword,
	generateUniqueSuffix,
	generateUsername,
} from './nameGenerators.utils.js';

export function createTestAccountDetails(testInfo) {
	const uniqueId = generateUniqueSuffix();
	const signup = purchaseFlow.signup;
	const password = generatePassword(signup.passwordPrefix, uniqueId);

	return {
		username: generateUsername(signup.usernamePrefix, uniqueId),
		email: generateEmail(signup.emailPrefix, signup.emailDomain, uniqueId),
		password,
		account: {
			...signup.accountInfo,
			lastName: generateLastName(signup.lastNamePrefix, testInfo.workerIndex, uniqueId),
			password,
		},
	};
}