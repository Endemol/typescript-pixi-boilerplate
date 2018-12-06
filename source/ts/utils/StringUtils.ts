
/**
 * Replaces all the occurrences of a certain place holder with the corresponding replacement in a given string.
 * The placeholders are contained within matched single curly braces such as {placeholder}.
 * The replacements are listed inside an object where the key is the placeholder content and the value
 * its corresponding replacement.
 *
 * @param {string} text - The string containing the placeholders to be replaced
 * @param {Object.<string>} replacements - Dictionary of replacements
 * @param {RegExp} pattern - A RegExp object or literal
 *
 * @returns {string} - the string containing the replacements in place of the placeholders
 *
 * @example <caption>Example usage replacePlaceHolders.</caption>
 * // returns 'this is the example sea-dweller: octopus'
 * replacePlaceHolders('this is the example sea-dweller: {creature}', {creature: octopus});
 */
export function replacePlaceHolders(
		text: string,
		replacements: {[key:string]:string},
		pattern: RegExp = /\{([^\}]*)\}/g): string {

	const keys: string[] = Object.keys(replacements);

	return text.replace(pattern, (match, placeHolder) => {
		if (replacements[placeHolder]) {
			return replacements[placeHolder].toString();
		} else {
			let i: number;
			let regExp: RegExp;
			let execArray: RegExpExecArray;
			for (i = 0; i < keys.length; i++) {
				regExp = new RegExp(keys[i].toString());
				execArray = regExp.exec(placeHolder);
				if (execArray) {
					return replacements[keys[i]].toString();
				}
			}
			return match;
		}
	});
}
