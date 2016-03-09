


/**
 * Message Mediator
 */
class MessageMediator {


	/**
	 * Message Mediator
	 * @constructor
	 */
	constructor() {
		// TODO: add event / notification handlers for incoming messages, link to the message handler

	}


	/**
	 * Display Message
	 * @param {MessageVO} vo
	 * @private
	 */
	public displayMessage(vo:MessageVO) {

		switch (vo.type) {
			case MessageType.ERROR:
				break;
			case MessageType.GENERIC:
				break;
			case MessageType.CONFIRMATION:
				break;
		}

		alert(vo.type + ' - '+ vo.title + ' ... ' + vo.body);
	}


}