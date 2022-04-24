import {BaseDto} from '../commons/baseDto';

export class AuthDto extends BaseDto{

   userName : string ;
   token :string;
   success : boolean = false;

}
