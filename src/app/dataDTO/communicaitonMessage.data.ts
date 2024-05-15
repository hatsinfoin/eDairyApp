export class CommunicaitonMessage {

	private _sendMessage: string = ''; // Default value is an empty string

	// Getter method to retrieve the value of sendMessage
	get sendMessage(): string {
		return this._sendMessage;
	}

	// Setter method to set the value of sendMessage
	set sendMessage(value: string) {
		this._sendMessage = value;
	}

}
