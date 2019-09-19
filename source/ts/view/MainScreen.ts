import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
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
        this._logo = Sprite.from('images/esg_logo_512.jpg');
        this._logo.anchor.set(0.5);
        this.addChild(this._logo);
        this._logo.x = -GameDetails.WIDTH;
        this._logo.y = GameDetails.HEIGHT*0.5;

        TweenMax.to(this._logo.position, 1, {x:GameDetails.WIDTH*0.5});
    }
}
