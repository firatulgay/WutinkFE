import {BaseDto} from '../commons/baseDto';

export class CommentDto extends BaseDto{

  id:number
  description:string
  experienceId:number;
  username:string;
  creationTime:string
}
