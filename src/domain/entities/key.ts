// key validation function
export function isValidKey(key: string): boolean {
	const alphanumericRegex = /^[a-zA-Z0-9]+$/;
	return key.length <= 10 && alphanumericRegex.test(key);
}
