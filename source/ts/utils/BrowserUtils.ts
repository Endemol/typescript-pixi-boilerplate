/**
 * Retrieves the value of a specified key present in the window request query string
 * @see {@link https://stackoverflow.com/a/901144/1032370|Stack Overflow}
 * @param {string} name		the key to be searched for in the request query part. The search is key insensitive.
 * @returns {string}		the value of the specified key in the request query part.
 * 							It's an empty string if no key has been found
 */
export function getParameterByName(name: string): string {
	name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
	let regexS: string = '[\\?&]' + name + '=([^&#]*)';
	let regex: RegExp = new RegExp(regexS, 'i');
	let results: RegExpExecArray = regex.exec(window.location.search);
	if (results === null) {
		return '';
	} else {
		return decodeURIComponent(results[1].replace(/\+/g, ' '));
	}
}
