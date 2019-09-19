import * as PIXI from 'pixi.js-legacy';
import Renderer = PIXI.Renderer;
import CanvasRenderer = PIXI.CanvasRenderer;
import Container = PIXI.Container;
import {IUpdateable} from '../loop/IUpdateable';
import Application = PIXI.Application;

/**
 * PixiMediator
 * @interface {IUpdateable}
 */
export class PixiMediator implements IUpdateable {

    public app:Application;
	public renderer: Renderer | CanvasRenderer;
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
	constructor (width, height, elementID) {
		this.init(width, height, elementID);
	}

	protected init(width: number, height: number, elementID:any, options?:any):void {

        if (!options) {
            options = {
                width: width,
                height: height,
                resolution: 1,
				backgroundColor: 0xFFFFFF
            };
        }

        PIXI.utils.skipHello();

        this.app = new Application(options);
        this.scene = new Container();
        this.app.stage.addChild(this.scene);
        this.renderer = this.app.renderer;

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