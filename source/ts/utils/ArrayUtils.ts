export function unique<T>(input:Array<T>):Array<T>{
    let seen:{[key:string]:boolean} = {};
    return input.filter((x:T):boolean=>{
        let key:string = x.toString();
        if (seen[key])
        {
            return false;
        } else {
            seen[key] = true;
            return true;
        }
    });
}

export function containsDuplicates(input:any[]):boolean {
	let counts:any[] = [];

	for(let i = 0; i <= input.length; i++) {

		if(counts[input[i]] === undefined) {
			counts[input[i]] = 1;
		} else {
			return true;
		}
	}
	return false;
}

export function deleteValue(array:any[], value:any):void{
    while (true)
    {
        let index = array.indexOf(value);
        if (index != -1)
        {
            array.splice(index, 1);
        } else {
            break;
        }
    }
}

export function shuffle(arr:any[]):any[]{
    let l:number = arr.length-1;
    let t:any;
    for (let i:number = l; i>0; i--) {
        let j:number = Math.floor(Math.random()*(i+1));
        if (i != j) {
            t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
    }
    return arr;
}

export function generateCompareFunction(elementNameToCompare:string):(a: any, b: any) => number{
    return (a:any, b:any):number=>{
        if (a[elementNameToCompare] < b[elementNameToCompare])
            return -1;
        if (a[elementNameToCompare] > b[elementNameToCompare])
            return 1;
        return 0;
    };
}

/**
 * Fills a range within an array:
 * @param {number} start - first value in the range
 * @param {number} end - last value in the range
 * @returns {number[]}
 * @example
 *
 * fillRange(10,20);
 * // returns [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
 */
export function fillRange(start:number, end:number):number[] {
		// return Array(end - start + 1).fill().map((item, index) => start + index); // TODO: should be only this line but it requires exporting to es6
	let array:number[] = new Array(end - start + 1);
	let i:number;
	for (i = 0; i < array.length; i++) {
		array[i] = null;
	}
	return array.map((item, index) => start + index);
}

/**
 * Fills a range within an array:
 * @param {any:[]}
 * @param {any}
 * @returns {any:[]}
 * @example
 *
 * fillRange(new Array(5), 0);
 * // returns [0, 0, 0, 0, 0]
 */
export function fill(array: any[], value:any = null): any[] {
	let i:number;
	const length: number = array.length;
	for (i = 0; i < length; i++) {
		array[i] = value;
	}
	return array;
}

/**
 * Returns the symmetric difference between given arrays
 * @param arrays
 * @returns {any[]}
 */
export function diff(...arrays: any[]): any[] {
	return [].concat(...arrays.map( (arr, i) => {
		const others = arrays.slice(0);
		others.splice(i, 1);
		const otherValues = Array.prototype.concat.apply([], others);
		const unique = otherValues.filter((x, j) => {
			return otherValues.indexOf(x) === j;
		});
		return arr.filter(x => unique.indexOf(x) === -1);
	}));
}

/**
 * Returns the value of the first element in the array that satisfies the provided testing function.
 * Otherwise undefined is returned.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find|MDN}
 *
 * @param {Array} arr
 * @param {Function} callback
 * @param {Object} thisArg
 * @returns {any}
 */
export function find(arr: any[], callback: (value: any, index: number, arr: any[]) => boolean, thisArg?: any): any {
	if (typeof Array.prototype['find'] === 'function') {
		return Array.prototype['find'].call(arr, callback, thisArg);
	}

	// polyfill
	for (let i = 0; i < arr.length; i++) {
		if (callback.call(thisArg, arr[i], i, arr)) {
			return arr[i];
		}
	}
}
