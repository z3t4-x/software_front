import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

 // isLoggedIn: boolean = false;

  constructor( private loginService: LoginService) { }
 
  ngOnInit(): void {
    //this.isLoggedIn = this.loginService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
 //   this.isLoggedIn = false;
  }


}
