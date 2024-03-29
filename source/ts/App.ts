import {PixiMediator} from './pixi/PixiMediator';
import {UpdateLoop} from './loop/UpdateLoop';
import {GameDetails} from './constants/GameDetails';
import {MainScreen} from './view/MainScreen';
import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin.js';

export class App {

	public pixiMediator:PixiMediator;
	public updateLoop:UpdateLoop;

	public get width():number {return document.body.clientWidth; }
	public get height():number {return document.body.clientHeight; }

	/**
	 * @constructor
	 */
	constructor() {

		// @ts-ignore
		window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
		// @ts-ignore
		window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

		// init pixi
		this.pixiMediator = new PixiMediator(GameDetails.WIDTH, GameDetails.HEIGHT, 'demo');
		this.pixiMediator.scene.addChild(new MainScreen());

		// init render loop
		this.updateLoop = new UpdateLoop();
		this.updateLoop.add(this.pixiMediator);
		this.updateLoop.start();

		// add dom elements
		let container: HTMLDivElement = <HTMLDivElement> (document.getElementById('demo'));
		container.appendChild( this.pixiMediator.domElement );

        console.log('*** APPENDED TO DIV ***');

		gsap.registerPlugin(PixiPlugin);
		PixiPlugin.registerPIXI(PIXI);

		// add event handlers
		window.addEventListener('resize', this._resizeHandler.bind(this));

	}

	private _resizeHandler(event:Object):void {
		//this.pixiMediator.resize(this.width,this.height);
	}

}

window.onload = ()=> {
	let app = new App();
};
