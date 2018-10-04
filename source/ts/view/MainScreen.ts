import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import {GameDetails} from '../constants/GameDetails';


export class MainScreen extends Container {

    private _logo:Sprite;

    constructor() {
        super();
        this.init();
    }

    protected init():void {
        this.createBackground();
    }

    protected createBackground():void {
        this._logo = Sprite.fromImage('images/esg_logo_512.jpg');
        this._logo.anchor.set(0.5);
        this.addChild(this._logo);
        this._logo.x = GameDetails.WIDTH / 2;
        this._logo.y = GameDetails.HEIGHT / 2;
    }
}
