
import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../services/commentService/comment.service';
import {CommentDto} from '../domain/commentDto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserDto} from '../domain/UserDto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(private commentService:CommentService,
              private formBuilder: FormBuilder,
              private router:Router) { }

  ngOnInit() {
    this.createCommentForm();
    this.getAllCommentsByExperienceId(this.experienceId);
    this.currentUserName=localStorage.getItem("username");
  }

  currentUserName:string;

  @Input()
  experienceId: number;

  private commentList : CommentDto[];
  commentForm: FormGroup;
  private newCommentDto: CommentDto = new CommentDto();


  getAllCommentsByExperienceId(experienceId:number){
    this.commentService.getAllCommentsByExperienceId(experienceId).subscribe(data =>{
      console.log(data);
      this.commentList=data;
    });
  }

  createCommentForm(){
    this.commentForm = this.formBuilder.group({
      description: ['', Validators.required]
    });
  }

  addComment(){
    if(this.commentForm.valid){
      this.newCommentDto = Object.assign({}, this.commentForm.value);
      this.newCommentDto.experienceId = this.experienceId;
      this.commentService.addComment(this.newCommentDto).subscribe(value => console.log(value));
      window.location.reload();
    }
  }
}
