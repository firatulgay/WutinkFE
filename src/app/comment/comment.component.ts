import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../services/commentService/comment.service';
import {CommentDto} from '../domain/commentDto';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(private commentService:CommentService) { }


  ngOnInit() {
    this.getAllCommentsByExperienceId(this.experienceId);
  }

  @Input()
  experienceId: number;

  private commentList : CommentDto[];

  getAllCommentsByExperienceId(experienceId:number){
    this.commentService.getAllCommentsByExperienceId(experienceId).subscribe(data =>{
      this.commentList=data;
    });
  }

}
