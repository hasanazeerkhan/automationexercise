export function generateUniqueSuffix() {
	return `${Date.now()}${Math.floor(Math.random() * 10000)}`;
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