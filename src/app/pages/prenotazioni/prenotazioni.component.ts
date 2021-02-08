import { Component, OnInit } from '@angular/core';
import {Evento} from "../../entities/evento";
import {Attivita} from "../../entities/attivita";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventService} from "../../service/event.service";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {

  prenotazioni: Evento[];
  prenotazione: Evento;
  currentUser: any;

  constructor(private modalService: NgbModal, private token: TokenStorageService, private eventService: EventService) {

  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.eventService.getBookingsForUser(this.currentUser.id).subscribe(data => {
      console.log(data);
      this.prenotazioni = data;
    });
  }

  extractDay(date: string){
    var dt = new Date(date)
    return dt.getDate().toString()
  }
  extractTime(date: string){
    var dt = new Date(date)
    return dt.getTime().toString()
  }

  openDelete(targetModal, prn: Evento) {
    this.prenotazione = prn;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }



}
