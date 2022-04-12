import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {GameDetails} from '../constants/GameDetails';
import gsap from 'gsap';
import {BBGLogoAnimation} from './BBGLogoAnimation';

export class MainScreen extends Container {

    private _vignette:Sprite;

    constructor() {
        super();
        this.init();
    }

    protected init():void {
        this.createVignette();
        this.createLogo();
    }

    private createVignette(): void {
        this._vignette = Sprite.from('images/vignette.png');
        this._vignette.anchor.set(0.5);
        this._vignette.width = GameDetails.WIDTH;
        this._vignette.height = GameDetails.HEIGHT;
        this._vignette.x = GameDetails.WIDTH*0.5;
        this._vignette.y = GameDetails.HEIGHT*0.5;
        this._vignette.alpha = 0;

        this.addChild(this._vignette);

        // this causes an error: MainScreen.ts:30 Uncaught ReferenceError: gsap is not defined
        // uncomment the import at the top and its fine
        // yet surely I should get some sort of indication here that I am going to get an error...
        gsap.to(this._vignette, {
            duration: 1,
            alpha: 1,
        });
    }

    protected createLogo():void {
        const bbgLogo:BBGLogoAnimation = new BBGLogoAnimation();
        bbgLogo.x = GameDetails.WIDTH*0.5;
        bbgLogo.y = GameDetails.HEIGHT*0.5;
        this.addChild(bbgLogo);
        bbgLogo.play();
    }

}
