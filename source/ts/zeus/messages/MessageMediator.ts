


/**
 * Message Mediator
 */
class MessageMediator {


	public container:Container;

	private _activeMessages:Array<AbstractMessage>;


	/**
	 * Message Mediator
	 * @constructor
	 */
	constructor() {
		// TODO: add event / notification handlers for incoming messages, link to the message handler

		this.container = new Container();
		this._activeMessages = [];
	}



	/**
	 * Display Message
	 * @param {MessageVO} vo
	 * @private
	 */
	public displayMessage(vo:MessageVO):void {

		console.log(vo);
		switch (vo.location) {

			case MessageLocaion.INTERNAL:
				this.createMessage(vo);
				break;

			case MessageLocaion.HIDDEN:
				console.info('Hidden Message:',vo);
				break;

			case MessageLocaion.EXTERNAL:
				// TODO: Send message to the Wrapper
				break;
		}
	}

	/**
	 * Create Message
	 * @param {MessageVO} vo
	 */
	private createMessage(vo):void {

		var message:AbstractMessage;
		switch (vo.type) {

			case MessageType.ERROR:
				message = new ErrorMessage(vo);
				break;

			case MessageType.GENERIC:
				message = new GenericMessage(vo);
				break;

			case MessageType.CONFIRMATION:
				message = new ConfirmationMessage(vo);
				break;
		}

		// Add to message to state
		this.container.addChild(message);

		// Add signal handlers
		message.closed.addOnce(this.messageClosedHandler);

		// Add to active messages
		// TODO: add to active message array when the messageClosedHandler is working
		// this._activeMessages.push(message);
	}

	/**
	 * Message Closed Handler
	 * @param {AbstractMessage} message
	 */
	private messageClosedHandler (message:AbstractMessage) {
		// TODO: removing from active message array
	}


}