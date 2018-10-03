/**
 * Update Loop
 * also referred to as the Game Loop when used within games
 */
import {IUpdate} from './IUpdate';

export class UpdateLoop {

	// Variables --------------------------------------------------------------
	/**
	 * An array of IUpdate
	 * @type {Array.<IUpdate>}
	 * @private
	 */
	private _IUpdate:IUpdate[] = [];

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
	 * @type {Array.<IUpdate>}
	 * @private
	 */
	private _iUpdatesToRemove:IUpdate[] = [];

	/**
	 * Now - shim
	 * @type Function
	 * @private
	 */
	private _now:Function = window.performance && window.performance.now ?
		window.performance.now.bind(window.performance) : Date.now ?
			Date.now.bind(Date) : function() { return new Date().getTime(); };

	// Getters and Setters ----------------------------------------------------
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
	 * @param {IUpdate} IUpdate - object that contains a update function
	 */
	public add (iUpdate:IUpdate) {
		this._IUpdate.push(iUpdate);
	};

	/**
	 * Remove
	 * IUpdates will be removed at the start of the next loop
	 * @param {IUpdate} IUpdate - object that contains a update function
	 */
	public remove (iUpdate:IUpdate) {

		// Error Checking - is the IUpdate in the loop?
		var isInUpdateLoop = false;
		var i:number;
		for (i = 0; i < this._IUpdate.length; i++) {
			if (this._IUpdate[i] === iUpdate) {
				isInUpdateLoop = true;
				break;
			} else {
				console.error("ERROR - IUpdate [" + iUpdate + "] not found in the update array " + this);
			}
		}

		// Error Checking - is the IUpdate already in the array to remove?
		var isNotInRemoveArray = true;
		for (i = 0; i < this._iUpdatesToRemove.length; i++) {
			if (this._iUpdatesToRemove[i] === iUpdate) {
				console.error("ERROR - IUpdate [" + iUpdate + "] is already in the array to be removed " + this);
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

		// Check if there are any IUpdates to remove
		if (this._iUpdatesToRemove.length > 0) {
			for (i=0; i<this._iUpdatesToRemove.length; i++) {
				console.log('REMOVE', this._iUpdatesToRemove[i]);
				console.log('IUpdate BEFORE',this._IUpdate);
				this.remove(this._iUpdatesToRemove[i]);
				console.log('IUpdate AFTER',this._IUpdate);
			}
			this._iUpdatesToRemove = [];
		}

		/**
		 * Now
		 * @type {number}
		 */
		var now = this._now();

		/**
		 * IUpdate
		 * @type {Array.<IUpdate>}
		 */
		var u = this._IUpdate;

		/**
		 * Time in milliseconds since last update
		 * @type {number}
		 */
		var time = now - this._lastUpdateAt;

		//
		var i = u.length;
		while( i-- > 0) {
			u[i].update(time);
		}

		this._lastUpdateAt = now;

		// Continue Looping
		if (this._isUpdating) window.requestAnimationFrame(this._loop.bind(this));
	};



}