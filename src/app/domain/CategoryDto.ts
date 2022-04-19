import {BaseDto} from '../commons/baseDto';
import {SafeResourceUrl} from '@angular/platform-browser';

export class CategoryDto extends BaseDto{

  id: number;
  name: string;
  icon:string;
  iconSafe:SafeResourceUrl;
}
