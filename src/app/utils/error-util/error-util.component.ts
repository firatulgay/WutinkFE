import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ErrorUtilService} from '../../services/error-util.service';

@Component({
  selector: 'app-error-util',
  templateUrl: './error-util.component.html',
  styleUrls: ['./error-util.component.scss']
})
export class ErrorUtilComponent implements OnInit {

  @ViewChild('alert',{ static: false}) alert:ElementRef;

  constructor() { }


  ngOnInit() {
  }

  @Input()
  errorMessage: string;

  close(){
    window.location.reload();
  }

}
