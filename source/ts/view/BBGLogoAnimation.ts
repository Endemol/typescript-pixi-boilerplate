import {Container, Sprite} from 'pixi.js';
import {GameDetails} from '../constants/GameDetails';
import gsap from 'gsap';

export class BBGLogoAnimation extends Container {
    private _ref:Sprite;
    private _bomb:Sprite;
    private _spark:Sprite;
    private _bang_1:Sprite;
    private _bang_2:Sprite;
    private _games:Sprite;

    constructor() {
        super();
        this.createRef();
    }

    /**
     * Creates the static logo, I used this to line up all the individual elements.
     * @private
     */
    private createRef():void {
        this._ref = Sprite.from('images/bbg-logo-centred.png');
        this._ref.anchor.set(0.5);
        this._ref.alpha = 0;

        this.addChild(this._ref);

        // this causes an error: MainScreen.ts:30 Uncaught ReferenceError: gsap is not defined
        // uncomment the import at the top and its fine
        // yet surely I should get some sort of indication here that I am going to get an error...
        gsap.to(this._ref, {
            duration: 2,
            alpha: 1,
            delay: 0.5
        });
    }

    public play(): void {

    }
}