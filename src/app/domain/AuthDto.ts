import {BaseDto} from '../commons/baseDto';

export class AuthDto extends BaseDto{

   userId : string ;
   token :string;
   success : boolean = false;

}
