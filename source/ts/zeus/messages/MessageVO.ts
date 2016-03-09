



/**
 * Message Value Object
 */
class MessageVO {

	public type:string;
	public title:string;
	public body:string;

	/**
	 * @constructor
	 * @param {String} type         - Message types are defined in the MessageTypes enumeration class
	 * @param {String} title
	 * @param {String} body
	 */
	constructor (type:string, title:string, body:string) {
		this.type = type;
		this.title = title;
		this.body = body;
	}

}