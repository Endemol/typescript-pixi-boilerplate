/**
 * IUpdate
 * @interface
 */
export interface IUpdate  {
	/**
	 * update
	 * @param {Number} delta - time since last render
	 */
	update (delta):void
};