/**
 * Now - shim
 * @type Function
 * @private
 */

export class DateUtils {

	public static now(): Function {
		let _nowFunction: Function = (window.performance && window.performance.now ?
			window.performance.now.bind(window.performance) : Date.now ?
				Date.now.bind(Date) : () => { return new Date().getTime(); });
		return _nowFunction;
	}
}

