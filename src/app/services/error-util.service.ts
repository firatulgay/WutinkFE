import { Injectable } from '@angular/core';


export class Message{
content : string;
style : string;
dismissed: boolean = false;

constructor(content, style) {

  this.content = content;
  this.style = style || 'info'; //default style is info
}
}

@Injectable({
  providedIn: 'root'
})
export class ErrorUtilService {



  visible: boolean;

  constructor() { this.visible = false; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  sendMessage(content,style){
    const message = new Message(content,style)
  }

}
