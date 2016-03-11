
/**
 * App
 */
class App {

	// Variables --------------------------------------------------------------
	public messageMediator:MessageMediator;
	public pixiMediator:PixiMediator;
	public updateLoop:UpdateLoop;
	private _type:HTMLSelectElement;
	private _location:HTMLSelectElement;
	private _title:HTMLInputElement;
	private _body:HTMLInputElement;

	// Getters and Setters ----------------------------------------------------
	public get width():number {return document.body.clientWidth; }
	public get height():number {return document.body.clientHeight; }


	public get type():string { return this._type.options[this._type.selectedIndex].value; }
	public get location():number { return Number(this._location.options[this._location.selectedIndex].value); }

	public get title():string {return this._title.value;}
	public get body():string {return this._body.value;}


	/**
	 * @constructor
	 */
	constructor() {

		this.messageMediator = new MessageMediator();

		// get buttons
		var generateMessageButton:HTMLButtonElement = <HTMLButtonElement>(document.getElementById('generate'));

		var form:HTMLFormElement = document.forms["generateMessage"];
		this._type = form['type'];
		this._location = form['location'];
		this._title = form['title'];
		this._body = form['body'];

		debugger;

		// add event handlers
		generateMessageButton.onclick = this._generateMessageHandler.bind(this);

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

	private _generateMessageHandler() {
		var vo:MessageVO = new MessageVO(this.type,this.location,this.title,this.body);
		this.messageMediator.displayMessage(vo);
	}



	private _resizeHandler(event:Object):void {
		//this.pixiMediator.resize(this.width,this.height);
	}

}