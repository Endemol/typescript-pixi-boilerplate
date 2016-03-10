


/**
 * Message Mediator
 */
class MessageMediator {


	public container:Container;


	/**
	 * Message Mediator
	 * @constructor
	 */
	constructor() {
		// TODO: add event / notification handlers for incoming messages, link to the message handler

		this.container = new Container()
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
				message = new ErrorMessage();
				break;

			case MessageType.GENERIC:
				message = new GenericMessage();
				break;

			case MessageType.CONFIRMATION:
				message = new ConfirmationMessage();
				break;
		}

		// Add to message to state
		this.container.addChild(message);

		// Add signal handlers


	}


}