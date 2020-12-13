import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {GameDetails} from '../constants/GameDetails';
//import gsap from 'gsap';

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
        this._logo.x = GameDetails.WIDTH*0.5;
        this._logo.y = GameDetails.HEIGHT*0.5;
        this._logo.alpha = 0;

        // this causes an error: MainScreen.ts:30 Uncaught ReferenceError: gsap is not defined
        // uncomment the import at the top and its fine
        // yet surely I should get some sort of indication here that I am going to get an error...
        gsap.to(this._logo, {
            duration: 2,
            alpha: 1,
            delay: 0.5
        });
    }
}
