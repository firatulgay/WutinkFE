import { BaseDto } from "../commons/baseDto";
import { GlobalMessages } from "../commons/globalMessages";

export class UserDto extends BaseDto  {
  private _password: string;
  private _userName: string;


  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }


  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
