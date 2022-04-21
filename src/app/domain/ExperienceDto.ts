import {BaseDto} from '../commons/baseDto';

export class ExperienceDto extends BaseDto {

  id: number;
  header: string;
  description: string;
  categoryIdList: number [];
  userName: string;
  creationTime: string;

}
