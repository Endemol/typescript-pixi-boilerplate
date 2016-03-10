import SystemRenderer = PIXI.SystemRenderer;
import CanvasRenderer = PIXI.CanvasRenderer;
import Container = PIXI.Container;


/**
 * PixiMediator
 * @interface {IUpdate}
 */
class PixiMediator implements IUpdate {

	// Variables --------------------------------------------------------------
	public renderer:SystemRenderer = null;
	public scene:Container = null;

	// Getters and Setters ----------------------------------------------------
	get domElement ():HTMLCanvasElement { return this.renderer.view; }


	/**
	 * @constructor
	 * @param width
	 * @param height
	 * @param cssClass
	 */
	constructor (width, height,cssClass) {
		this.init(width, height,cssClass);
	}

	/**
	 * Init
	 * @param viewWidth
	 * @param viewHeight
	 * @param cssClass
	 */
	protected init(viewWidth, viewHeight,cssClass):void {
		this.renderer = new CanvasRenderer(viewWidth, viewHeight);
		this.renderer.view.className = cssClass;
		this.renderer.backgroundColor = 0xFFFFFF;
		this.scene = new Container();
	}

	/**
	 * @param delta
	 */
	public update(delta:number):void {
		this.renderer.render(this.scene);
	}

	/**
	 * Resize
	 * @param width
	 * @param height
	 */
	public resize(width, height):void {
		this.renderer.resize(width,height);
	}

}