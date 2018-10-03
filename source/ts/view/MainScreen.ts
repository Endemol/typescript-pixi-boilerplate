import Container = PIXI.Container;
import Graphics = PIXI.Graphics;


export class MainScreen extends Container {

    private _bg:Graphics;

    constructor() {
        super();
        this.init();
    }

    protected init():void {
        this.createBackground();
    }

    protected createBackground():void {
        this._bg = new Graphics();
        this._bg.beginFill(0xff0000, 1);
        this._bg.drawRect(100, 100, 100, 100);
        this.addChild(this._bg);
    }
}
