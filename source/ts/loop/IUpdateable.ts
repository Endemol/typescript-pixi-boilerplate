/**
 * IUpdateable
 * @interface
 */
export interface IUpdateable  {
	/**
	 * update
	 * @param {Number} delta - time since last render
	 */
	update (delta):void
};