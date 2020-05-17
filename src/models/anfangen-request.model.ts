export class AnfangenRequest {
  pin: string;
  name: string

  constructor(name: string, pin: string) {
    this.name = name;
    this.pin = pin;
  }
}
