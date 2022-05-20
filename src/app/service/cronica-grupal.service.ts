import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import { WebImssService } from './web-imss-service.service';
import { Aplicacion } from '../models/aplicacion.model';
import { MailResponse } from '../models/mail-response.model';
import { AdmonPasswordRequest } from '../models/admon-password-request.model';
import { AdmonPasswordResponse } from '../models/admon-password-response.model';
import { RecaptchaResponse } from '../models/recaptcha-response-model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CronicaGrupalService { 

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  actualizarPassword(admonPasswordRequest:AdmonPasswordRequest){
     return this.http.post<AdmonPasswordResponse>(`${environment.urlServOauth}/api/aplicacion/actualizarPassword/`, admonPasswordRequest);
  }

  getCatServicios() {
    return this.http.get<any>(`${environment.urlServCronicas}/api/listservicios`);
  }

  getCatTurnos() {
    return this.http.get<any>(`${environment.urlServCronicas}/api/listTurnos`);
  }

  getCatCalendarios() {
    return this.http.get<any>(`${environment.urlServCronicas}/api/listCalendario`);
  }

}
