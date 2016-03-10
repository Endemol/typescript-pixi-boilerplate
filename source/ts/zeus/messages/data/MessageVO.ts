



/**
 * Message Value Object
 */
class MessageVO {

	public type:string;
	public title:string;
	public body:string;
	public location:number;

	/**
	 * @constructor
	 * @param {String} type - Message types are defined in the MessageTypes enumeration class
	 * @param {Number} location - Locations are defined in MessageLocation
	 * @param {String} title
	 * @param {String} body
	 */
	constructor (type:string, location:number, title:string, body:string) {
		this.type = type;
		this.title = title;
		this.body = body;
		this.location = location;
	}

}