export class CheckNickRequestModel {
  nick: string;
  pinOpen: string;

  constructor(nick: string, pinOpen: string) {
    this.nick = nick;
    this.pinOpen = pinOpen;
  }
}
