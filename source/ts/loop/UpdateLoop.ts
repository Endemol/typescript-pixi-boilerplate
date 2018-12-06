/**
 * Update Loop
 * also referred to as the Game Loop when used within games
 */
import {IUpdateable} from './IUpdateable';
import {DateUtils} from '../utils/DateUtils';

export class UpdateLoop {

	/**
	 * An array of IUpdateable
	 * @type {Array.<IUpdateable>}
	 * @private
	 */
	private _updateables:IUpdateable[] = [];

    /**
     * Updates to Remove
     * @type {Array.<IUpdateable>}
     * @private
     */
    private _iUpdatesToRemove:IUpdateable[] = [];

    /**
	 * Current time stamp
     */
	private _time:number;

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
	private _isUpdating:boolean = false;

	public get isUpdating():boolean {
		return this._isUpdating;
	}


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
	public add(iUpdate:IUpdateable):void {
		this._updateables.push(iUpdate);
	};

	/**
	 * Remove
	 * IUpdates will be removed at the start of the next loop
	 * @param {IUpdateable} IUpdate - object that contains a update function
	 */
	public remove(updateable:IUpdateable):void {

		// Error Checking - is the IUpdateable in the loop?
		let isInUpdateLoop = false;
		let i:number;
		for (i = 0; i < this._updateables.length; i++) {
			if (this._updateables[i] === updateable) {
				isInUpdateLoop = true;
				break;
			} else {
				console.error('ERROR - IUpdateable [' + updateable + '] not found in the update array ' + this);
			}
		}

		// Error Checking - is the IUpdateable already in the array to remove?
		let isNotInRemoveArray = true;
		for (i = 0; i < this._iUpdatesToRemove.length; i++) {
			if (this._iUpdatesToRemove[i] === updateable) {
				console.error('ERROR - IUpdateable [' + updateable + '] is already in the array to be removed ' + this);
				isNotInRemoveArray = false;
			}
		}

		// Add to the list of IUpdates to be removed in the next loop
		if (isInUpdateLoop && isNotInRemoveArray) {
			this._iUpdatesToRemove.push(updateable);
		}
	};
	

	/**
	 * Start Update Loop
	 */
	public start():void {
		if (!this._isUpdating) {
			this._isUpdating = true;
			window.requestAnimationFrame(this.loop.bind(this));
		} else {
			console.error('ERROR - is already updating! '+this);
		}
	};

	/**
	 * Stop Update Loop
	 */
	public stop():void {
		this._isUpdating = false;
	};

	/**
	 * Update Loop
	 * @private
	 */
	private loop():void {

		let i:number;

		// Check if there are any IUpdates to remove

		if (this._iUpdatesToRemove.length > 0) {
			for (i=0; i<this._iUpdatesToRemove.length; i++) {
				//console.log('REMOVE', this._iUpdatesToRemove[i]);
				//console.log('IUpdateable BEFORE',this._updateables);
				this.remove(this._iUpdatesToRemove[i]);
				//console.log('IUpdateable AFTER',this._updateables);
			}
			this._iUpdatesToRemove = [];
		}

		const now = DateUtils.now();

        this._time = now() - this._lastUpdateAt;

		i = this._updateables.length;

		while( i-- > 0) {
            this._updateables[i].update(this._time);
		}

		this._lastUpdateAt = now();

		// Continue Looping
		if (this._isUpdating) {
			window.requestAnimationFrame(this.loop.bind(this));
        }
	};

}