import {Container, Sprite} from 'pixi.js';
import {GameDetails} from '../constants/GameDetails';
import gsap, {Back, Elastic, Power2, Power4} from 'gsap';
import {MathUtils} from '../utils/MathUtils';

export class BBGLogoAnimation extends Container {
    private _ref:Sprite;
    private _bomb:Container;
    private _spark:Sprite;
    private _bang_1:Sprite;
    private _bang_2:Sprite;
    private _games:Sprite;

    constructor() {
        super();
        this.createParts();
        //this.createRef();
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
    }

    private createParts(): void {
        this._spark = Sprite.from('images/spark.png');
        this._spark.anchor.set(0.5);
        this._spark.position.set(240, -190);
        this._spark.name = 'spark';
        const bomb = Sprite.from('images/bomb.png');
        bomb.anchor.set(0.5);
        this._bomb = new Container();
        this._bomb.position.set(30,30);
        this._bomb.name = 'bomb';
        this._bang_1 = Sprite.from('images/bang_1.png');
        this._bang_1.anchor.set(0.5, 1);
        this._bang_1.position.set(-5,50);
        this._bang_1.name = 'bang 1';
        this._bang_2 = Sprite.from('images/bang_2.png');
        this._bang_2.anchor.set(0.5, 0);
        this._bang_2.position.set(-5,20);
        this._bang_2.name = 'bang 2';
        this._games = Sprite.from('images/games.png');
        this._games.anchor.set(0.5);
        this._games.y = 195;
        this._games.name = 'games';

        this._bomb.addChild(this._spark);
        this._bomb.addChild(bomb);
        this.addChild(this._bomb);
        this.addChild(this._bang_1);
        this.addChild(this._bang_2);
        this.addChild(this._games);

        this.reset();
    }

    private reset():void {
        this._bomb.scale.set(0);
        this._bomb.rotation = MathUtils.degreesToRadians(90);
        this._spark.scale.set(0);
        this._bang_1.scale.set(0);
        this._bang_2.scale.set(0);
        this._games.scale.set(0);
    }

    public play(): void {
        if (this._ref) {
            gsap.to(this._ref, {
                duration: 1,
                alpha: 1,
                delay: 0.5
            });
        }

        const tl = gsap.timeline({
            delay: 2
        });
        tl.to(this._bomb, {
            duration: 0.5,
            pixi: {scale:1},
            rotation: 0,
            ease: Back.easeOut
        });
        tl.to(this._bomb, {
            duration: 0.6,
            rotation: 0,
            ease: Back.easeOut.config(4)
        }, '-=0.3');
        tl.to(this._bang_1, {
            duration: 0.8,
            pixi: {scale:1},
            ease: Elastic.easeOut
        }, '-=0.6');
        tl.to(this._bang_2, {
            duration: 0.9,
            pixi: {scale:1},
            ease: Elastic.easeOut
        }, '-=0.5');
        tl.to(this._games, {
            duration: 0.4,
            pixi: {scale:1},
            ease: Back.easeOut
        }, '-=0.4');

        tl.to(this._spark, {
            duration:0.5,
            pixi: {scale:1},
            ease: Elastic.easeOut
        }, '-=1');

    }
}