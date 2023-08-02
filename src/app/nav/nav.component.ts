import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from '../services/loginService/login.service';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navBarService/navbar.service';
import {SearchService} from "../services/searchService/search.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router:Router,
              private navbarService:NavbarService,
              private searchService:SearchService) { }


  ngOnInit() {
  }

  username:string;
  searchText: string = ''

  logout(){
    this.loginService.logOut();
  }

  onProfileClick(){
    this.username = localStorage.getItem("username");
    this.router.navigate(['profile/'+ this.username])
  }

  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();


  onSearch(){
    this.searchTextChanged.emit(this.searchText);
    console.log("search text -> ",this.searchText);
    this.router.navigate(['experience'], { queryParams: { search: this.searchText } });
  }
}
