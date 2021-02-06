import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstantsMicro} from "../common/app.constantsMicro";
import {Evento} from "../entities/evento";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(AppConstantsMicro.CALENDAR_SERVICE+'events');
  }

  public save(event: Evento) {
    return this.http.post<Evento>(AppConstantsMicro.CALENDAR_SERVICE+'event', event);
  }

  public getEventsForUser(id: string) {
    return this.http.post<Evento[]>(AppConstantsMicro.CALENDAR_SERVICE_USER+'event'+ encodeURIComponent(id),httpOptions);
  }

  public delete(event: Evento) {
    return this.http.post<Evento>(AppConstantsMicro.CALENDAR_SERVICE+'events/delete', event);
  }
}
