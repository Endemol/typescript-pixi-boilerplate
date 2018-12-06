/**
 * Update Loop
 * also referred to as the Game Loop when used within games
 */
import {IUpdateable} from './IUpdateable';

export class UpdateLoop {

	/**
	 * An array of IUpdateable
	 * @type {Array.<IUpdateable>}
	 * @private
	 */
	private _IUpdate:IUpdateable[] = [];

	/**
	 * Last Update at milliseconds since the epoch
	 * @type {number}
	 * @private
	 */
	private _lastUpdateAt:number = 0;

	/**
	 * Is Updating
	 * @type {boolean}
	 */
	private _isUpdating:Boolean = false;

	/**
	 * Updates to Remove
	 * @type {Array.<IUpdateable>}
	 * @private
	 */
	private _iUpdatesToRemove:IUpdateable[] = [];

	/**
	 * Now - shim
	 * @type Function
	 * @private
	 */
	private _now:Function = window.performance && window.performance.now ?
		window.performance.now.bind(window.performance) : Date.now ?
			Date.now.bind(Date) : function() { return new Date().getTime(); };

	public get isUpdating():Boolean {return this._isUpdating; }


	/**
	 * Update Loop
	 * @constructor
	 */
	constructor () {
		// Nothing to see here! :)
	}

	/**
	 * Add
	 * @param {IUpdateable} IUpdate - object that contains a update function
	 */
	public add (iUpdate:IUpdateable) {
		this._IUpdate.push(iUpdate);
	};

	/**
	 * Remove
	 * IUpdates will be removed at the start of the next loop
	 * @param {IUpdateable} IUpdate - object that contains a update function
	 */
	public remove (iUpdate:IUpdateable) {

		// Error Checking - is the IUpdateable in the loop?
		let isInUpdateLoop = false;
		let i:number;
		for (i = 0; i < this._IUpdate.length; i++) {
			if (this._IUpdate[i] === iUpdate) {
				isInUpdateLoop = true;
				break;
			} else {
				console.error('ERROR - IUpdateable [' + iUpdate + '] not found in the update array ' + this);
			}
		}

		// Error Checking - is the IUpdateable already in the array to remove?
		let isNotInRemoveArray = true;
		for (i = 0; i < this._iUpdatesToRemove.length; i++) {
			if (this._iUpdatesToRemove[i] === iUpdate) {
				console.error('ERROR - IUpdateable [' + iUpdate + '] is already in the array to be removed ' + this);
				isNotInRemoveArray = false;
			}
		}

		// Add to the list of IUpdates to be removed in the next loop
		if (isInUpdateLoop && isNotInRemoveArray) {
			this._iUpdatesToRemove.push(iUpdate);
		}
	};



	/**
	 * Start Update Loop
	 */
	public start () {
		if (!this._isUpdating) {
			this._isUpdating = true;
			window.requestAnimationFrame(this._loop.bind(this));
		} else {
			console.error('ERROR - is already updating! '+this);
		}
	};


	/**
	 * Stop Update Loop
	 */
	public stop () {
		this._isUpdating = false;
	};


	/**
	 * Update Loop
	 * @private
	 */
	private _loop () {

		let i:number;

		// Check if there are any IUpdates to remove
		if (this._iUpdatesToRemove.length > 0) {
			for (i=0; i<this._iUpdatesToRemove.length; i++) {
				console.log('REMOVE', this._iUpdatesToRemove[i]);
				console.log('IUpdateable BEFORE',this._IUpdate);
				this.remove(this._iUpdatesToRemove[i]);
				console.log('IUpdateable AFTER',this._IUpdate);
			}
			this._iUpdatesToRemove = [];
		}

		/**
		 * Now
		 * @type {number}
		 */
		let now = this._now();

		/**
		 * IUpdateable
		 * @type {Array.<IUpdateable>}
		 */
		let u = this._IUpdate;

		/**
		 * Time in milliseconds since last update
		 * @type {number}
		 */
		let time = now - this._lastUpdateAt;

		//
		i = u.length;
		while( i-- > 0) {
			u[i].update(time);
		}

		this._lastUpdateAt = now;

		// Continue Looping
		if (this._isUpdating) window.requestAnimationFrame(this._loop.bind(this));
	};



}