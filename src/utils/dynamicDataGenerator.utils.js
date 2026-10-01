import purchaseFlow from '../../testData/purchaseFlow.json';

export function generateUniqueSuffix() {
	return new Date().toISOString().replace(/[-:T.Z]/g, '');
}

export function generateUsername(prefix, suffix = generateUniqueSuffix()) {
	return `${prefix} ${suffix}`;
}

export function generateEmail(prefix, domain, suffix = generateUniqueSuffix()) {
	return `${prefix}.${suffix}@${domain}`;
}

export function generatePassword(prefix, suffix = generateUniqueSuffix()) {
	return `${prefix}${suffix}!`;
}

export function generateLastName(prefix, workerIndex, suffix = generateUniqueSuffix()) {
	return `${prefix}${workerIndex}${suffix}`;
}

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