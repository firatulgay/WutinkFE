import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../services/commentService/comment.service';
import {CommentDto} from '../domain/commentDto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(private commentService:CommentService,
              private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.getAllCommentsByExperienceId(this.experienceId);
  }

  @Input()
  experienceId: number;

  private commentList : CommentDto[];
  private newCommentDto: CommentDto = new CommentDto();
  private commentForm: FormGroup;

  getAllCommentsByExperienceId(experienceId:number){
    this.commentService.getAllCommentsByExperienceId(experienceId).subscribe(data =>{
      this.commentList=data;
    });
  }
  addComment(){
    this.commentForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.commentService.addComment(this.newCommentDto)
  }

}
