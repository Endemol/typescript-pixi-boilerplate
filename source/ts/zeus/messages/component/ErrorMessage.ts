


class ErrorMessage extends AbstractMessage {

	constructor(vo:MessageVO) {
		super();
		this._drawUI(0xff0000,vo.title);

		this.x = 320;
	}

}