
/**
 * App
 */
class App {

	// Variables --------------------------------------------------------------
	public messageMediator:MessageMediator;

	// Getters and Setters ----------------------------------------------------

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


	}



	private _generateErrorMessageHandler() {
		var vo:MessageVO = new MessageVO(MessageType.ERROR,'Test Error','This is a test error, for testing!');
		this.messageMediator.displayMessage(vo);
	}

	private _generateGenericMessageHandler() {
		var vo:MessageVO = new MessageVO(MessageType.GENERIC,'Generic Message','This is a generic message!');
		this.messageMediator.displayMessage(vo);
	}

	private _generateConfirmationMessageHandler() {
		var vo:MessageVO = new MessageVO(MessageType.CONFIRMATION,'Confirm','Please confirm this message');
		this.messageMediator.displayMessage(vo);
	}






}