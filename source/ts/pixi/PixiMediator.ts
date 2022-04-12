import * as PIXI from 'pixi.js';
import Renderer = PIXI.Renderer;
import Container = PIXI.Container;
import {IUpdateable} from '../loop/IUpdateable';
import Application = PIXI.Application;
import {GameDetails} from '../constants/GameDetails';

/**
 * PixiMediator
 * @interface {IUpdateable}
 */
export class PixiMediator implements IUpdateable {

    public app:Application;
	public renderer: Renderer;
	public scene:Container;

	get domElement ():HTMLCanvasElement {
		return this.app.view;
	}

	/**
	 * @constructor
	 * @param width
	 * @param height
	 * @param elementID
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
				backgroundColor: GameDetails.BG_COLOR
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