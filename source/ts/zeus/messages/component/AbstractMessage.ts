


import Sprite = PIXI.Sprite;


class AbstractMessage extends Sprite {

	public closed:Signal = new signals.Signal();


	/**
	 * Abstract Message
	 * @constructor
	 */
	constructor() {
		super();
	}


	/**
	 * Close
	 * Remove and Destroy message.
	 */
	public close () {
		this.parent.removeChild(this);
		this.closed.dispatch(this);
		this.closed.removeAll();
		this.destroy();
	}



	/// Temp functions and parameters


	protected _drawUI(color:number,titleCopy:string):void {
		var box = new PIXI.Graphics();
		box.beginFill(color,1);
		box.drawRect(0, 0, 300, 110);
		box.endFill();
		this.addChild(box);

		var title = new PIXI.Text(titleCopy,{font : '24px Arial', fill : 0x000000, align : 'center'});
		this.addChild(title);

	}


}