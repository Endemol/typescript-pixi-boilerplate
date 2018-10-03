import * as PIXI from "pixi.js";
import SystemRenderer = PIXI.SystemRenderer;
import Container = PIXI.Container;
import {IUpdate} from '../loop/IUpdate';
import Application = PIXI.Application;
import RendererOptions = PIXI.RendererOptions;


/**
 * PixiMediator
 * @interface {IUpdate}
 */
export class PixiMediator implements IUpdate {

    public app:Application;
	public renderer:SystemRenderer;
	public scene:Container;

	get domElement ():HTMLCanvasElement {
		return this.app.view;
	}

	/**
	 * @constructor
	 * @param width
	 * @param height
	 * @param cssClass
	 */
	constructor (width, height,cssClass) {
		this.init(width, height,cssClass);
	}

	protected init(width: number, height: number, cssClass:any, options?:RendererOptions):void {

        if (!options) {
            options = {
                width: width,
                height: height,
                resolution: 1
            };
        }

        PIXI.utils.skipHello();

        this.app = new Application(options);
        this.app.view.className = cssClass;
        this.renderer = this.app.renderer;
		this.renderer.backgroundColor = 0xFFFFFF;
		this.scene = new Container();

		console.log('*** APP CREATED ***');
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