
/**
 * App
 */
class App {

	// Variables --------------------------------------------------------------
	public messageMediator:MessageMediator;
	public pixiMediator:PixiMediator;
	public updateLoop:UpdateLoop;

	// Getters and Setters ----------------------------------------------------
	public get width():number {return document.body.clientWidth; }
	public get height():number {return document.body.clientHeight; }


	/**
	 * @constructor
	 */
	constructor() {

		this.messageMediator = new MessageMediator();

		// get buttons
		var generateErrorButton:HTMLButtonElement = <HTMLButtonElement>(document.getElementById('generate-error'));
		var generateGenericButton:HTMLButtonElement = <HTMLButtonElement>(document.getElementById('generate-generic'));
		var generateConfirmButton:HTMLButtonElement = <HTMLButtonElement>(document.getElementById('generate-confirm'));

		// add event handlers
		generateErrorButton.onclick = this._generateErrorMessageHandler.bind(this);
		generateGenericButton.onclick = this._generateGenericMessageHandler.bind(this);
		generateConfirmButton.onclick = this._generateConfirmationMessageHandler.bind(this);

		// init pixi
		this.pixiMediator = new PixiMediator(620,340,'demo');
		this.pixiMediator.scene.addChild(this.messageMediator.container);

		// init render loop
		this.updateLoop = new UpdateLoop();
		this.updateLoop.add(this.pixiMediator);
		this.updateLoop.start();

		// add dom elements
		var container = document.getElementsByClassName('demo')[0];
		container.appendChild( this.pixiMediator.domElement );

		// add event handlers
		window.addEventListener("resize", this._resizeHandler.bind(this));

	}


	// Resize Handlers --------------------------------------------------------

	private _generateErrorMessageHandler() {
		var vo:MessageVO = new MessageVO(MessageType.ERROR,MessageLocaion.INTERNAL,'Test Error','This is a test error, for testing!');
		this.messageMediator.displayMessage(vo);
	}

	private _generateGenericMessageHandler() {
		var vo:MessageVO = new MessageVO(MessageType.GENERIC,MessageLocaion.INTERNAL,'Generic Message','This is a generic message!');
		this.messageMediator.displayMessage(vo);
	}

	private _generateConfirmationMessageHandler() {
		var vo:MessageVO = new MessageVO(MessageType.CONFIRMATION,MessageLocaion.INTERNAL,'Confirm','Please confirm this message');
		this.messageMediator.displayMessage(vo);
	}

	private _resizeHandler(event:Object):void {
		//this.pixiMediator.resize(this.width,this.height);
	}

}