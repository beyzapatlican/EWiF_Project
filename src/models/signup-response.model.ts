export class SignupResponse {
  status: string;
  role: string;

  constructor(status: string, role: string) {
    this.status = status;
    this.role = role;
  }
}
