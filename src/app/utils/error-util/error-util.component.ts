import {Component, Input, OnInit} from '@angular/core';
import {ErrorUtilService} from '../../services/error-util.service';

@Component({
  selector: 'app-error-util',
  templateUrl: './error-util.component.html',
  styleUrls: ['./error-util.component.scss']
})
export class ErrorUtilComponent implements OnInit {

  constructor(private errorUtilService:ErrorUtilService) { }

  ngOnInit() {
  }

  @Input()
  errorMessage: string;

}
