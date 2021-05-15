import {BaseDto} from '../commons/baseDto';

export class AuthDto extends BaseDto{

  private _userId : string ;
  private _token :string;

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
}
