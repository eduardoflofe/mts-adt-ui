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

  getCatGrupo(cveServicio: string) {
    return this.http.get<any>(`${environment.urlServCronicas}/api/listPrograma/${cveServicio}`);
  }

  getCatLugar(cveServicio: string) {
    return this.http.get<any>(`${environment.urlServCronicas}/api/listUbicacion/${cveServicio}`);
  }

  getAllCronicasGrupales() {
    return this.http.get<any>(`${environment.urlServCronicas}/api/cronicasgrupales`);
  }

  getCronicasGrupalesByServicioEspecialidad(cveServicio: string) {
    return this.http.get<any>(`${environment.urlServCronicas}/api/cronicasbyesp/${cveServicio}`);
  }

  getCronicasGrupalesByTurno(cveTurno: number) {
    return this.http.get<any>(`${environment.urlServCronicas}/api/cronicasbyturno/${cveTurno}`);
  }

  getCronicasGrupalesByGrupo(cveGrupo: number) {
    return this.http.get<any>(`${environment.urlServCronicas}/api/cronicasbygrupo/${cveGrupo}`);
  }

  getCronicasGrupalesByUbicacion(cveUbicacion: string) {
    return this.http.get<any>(`${environment.urlServCronicas}/api/cronicasbyubicacion/${cveUbicacion}`);
  }

  getCronicasGrupalesByFecha(fecha: string | null) {
    return this.http.get<any>(`${environment.urlServCronicas}/api/cronicasbyfecha/${fecha}`);
  }

  getCronicasGrupalesByEspecialidadEspecifica(especialidadEspecifica: string) {
    return this.http.get<any>(`${environment.urlServCronicas}/api/cronicasbyespecif/${especialidadEspecifica}`);
  }

  getCronicasGrupalesByFiltros(cveServicio: string, cveTurno: number, cveGrupo: number, cveUbicacion: string, fecha: string | null, especialidadEspecifica: string) {
    return this.http.get<any>(`${environment.urlServCronicas}/api/filtrocronicas/${cveServicio}/${cveTurno}/${cveGrupo}/${cveUbicacion}/${fecha}/${especialidadEspecifica}`);
  }

}
