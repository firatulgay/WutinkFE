import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-warning-util',
  templateUrl: './warning-util.component.html',
  styleUrls: ['./warning-util.component.scss']
})
export class WarningUtilComponent implements OnInit {

  @ViewChild('alert',{ static: false}) alert:ElementRef;

  constructor() { }


  ngOnInit() {
  }

  @Input()
  warnMessage: string;

  close(){
    window.location.reload();
  }

}
