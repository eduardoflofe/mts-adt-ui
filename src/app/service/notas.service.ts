import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Notas } from '../models/notas.model';


@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getNotasByFechas(fechaInicial: string, fechaFinal: string) {
    return this.http.get<any>(`${environment.urlServNotas}/consultaNotasTs/findNotasTSByFechas/${fechaInicial}/${fechaFinal}`, { responseType: 'json'});
  }

  getNotasById(id: number) {
    return this.http.get<any>(`${environment.urlServNotas}/consultaNotasTs/getNotaTSById/${id}`, { responseType: 'json'});
  }

  getTiposNota() {
    return this.http.get<any>(`${environment.urlServNotas}/registroNotasTs/getTiposDeNota`, { responseType: 'json'});
  }

  getRedesApoyo() {
    return this.http.get<any>(`${environment.urlServNotas}/registroNotasTs/getRedesSociales`, { responseType: 'json'});
  }

  getActividadesTecnicas() {
    return this.http.get<any>(`${environment.urlServNotas}/registroNotasTs/getActividadesTecnicas`, { responseType: 'json'});
  }

  getDiagnosticosMedicos(texto: string) {
    return this.http.get<any>(`${environment.urlServNotas}/registroNotasTs/getDiagnosticosMedicos/${texto}`, { responseType: 'json'});
  }

  downloadPdf(data: any): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', responseType: 'blob' });
    return this.http.post<Blob>(environment.urlServCronicas + '/reporte/reporteNotas', JSON.stringify(data),
    { headers: headers, responseType: 'blob' as 'json'});
  }

}
