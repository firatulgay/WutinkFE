import { BaseDto } from "../commons/baseDto";
import { GlobalMessages } from "../commons/globalMessages";

export class UserDto extends BaseDto  {
  private _password: string;
  private _userName: string;
  private _id: number;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

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
