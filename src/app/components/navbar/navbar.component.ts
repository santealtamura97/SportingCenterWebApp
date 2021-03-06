import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { ROUTESUSER } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  isLoggedIn = false;
  username: string;
  public name: any;
  constructor(location: Location,  private element: ElementRef, private router: Router, public tokenStorageService: TokenStorageService) {
    this.location = location;
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    const user = this.tokenStorageService.getUser();

    if (this.isLoggedIn) {

      this.username = user.displayName;
    }
    if(user.roles.includes("ROLE_ADMIN")){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
    }
    else{
      this.listTitles = ROUTESUSER.filter(listTitle => listTitle);
    }
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Home';
  }

  logout(): void {
    this.tokenStorageService.signOut();
  }
}
