import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {AuthService} from "../../service/auth.service";
import {AbbonamentoServiceService} from "../../service/abbonamento-service.service";
import {Abbonamento} from "../../entities/abbonamento";
import {User} from "../../entities/user";
import {UserService} from "../../service/user-service.service";
import {Evento} from "../../entities/evento";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: any;
  matchinPassword: any;
  pasword: any;
  abbonamenti: Abbonamento[];
  abbonamento: any;
  user: User;
  dat: Date;
  scadenza: any;
  constructor(private token: TokenStorageService, private modalService: NgbModal,private authService: AuthService, private abbonamService: AbbonamentoServiceService, private userService: UserService) {
    this.user = new User();
    this.abbonamento = '';
    this.pasword = '';
    this.matchinPassword = '';
  }

  ngOnInit(): void {
    this.abbonamento = null;
    this.currentUser = this.token.getUser();
    this.userService.getUserByUserId(this.currentUser.id).subscribe(data => {
      this.user = data;
      console.log(this.user)
      console.log(this.user.dataNascita)
      document.getElementById('dnascita').setAttribute('value', this.user.dataNascita);
    });
    this.abbonamService.findAllUser().subscribe(data => {
      this.abbonamenti = data;
      this.abbonamento = this.getNameAbbFromId(this.user.abbonamento);
    });


  }

  onSubmitModify() {
    console.log(this.user);
    if(this.pasword == '')
      this.user.password= 'nochange'
    else {
      this.user.password = this.pasword
    }
    this.user.matchingPassword=this.user.password;
    console.log("THIS IS THE: "+ this.user.dataNascita);
    this.authService.userModify(this.user).subscribe(
      data => {
        console.log(data);
        this.ngOnInit(); //reload the page
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  parseDate(dateString: string): string {
    if (dateString) {
      var date;
      date = dateString.split('-');
      console.log(date);
      console.log(date[2]+"-"+date[1]+"-"+date[0]);
      return date[2]+"-"+date[1]+"-"+date[0];
    }
    return null;
  }



  private getNameAbbFromId(id: string){
    console.log("THIS IS THE NUMBER: "+ id);
    for(let i=0; i<this.abbonamenti.length; i++){
      if(this.abbonamenti[i].id==id){
        console.log("abbsss: "+ this.abbonamenti[i].name);
        return this.abbonamenti[i].name;
      }
    }
    return ""
  }
  openDelete(targetModal) {
    if(this.pasword==this.matchinPassword)
      this.modalService.open(targetModal, {
          centered: true,
        backdrop: 'static',
        size: 'lg'
      });
    else
      return
  }
}
