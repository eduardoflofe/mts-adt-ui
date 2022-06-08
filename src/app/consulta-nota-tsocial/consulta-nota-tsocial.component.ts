import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Nota } from '../models/notas.model';
import { CronicaGrupalService } from '../service/cronica-grupal.service';
import { NotasService } from '../service/notas.service';

@Component({
  selector: 'app-consulta-nota-tsocial',
  templateUrl: './consulta-nota-tsocial.component.html',
  styleUrls: ['./consulta-nota-tsocial.component.css']
})
export class ConsultaNotaTSocialComponent implements OnInit {

  nota!: Nota;
  months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  today: any;
  day: any;
  month: any;
  year: any;
  cronica: any;

  constructor(
    private notasService: NotasService,
    private cronicaGrupalService: CronicaGrupalService
  ) { }

  ngOnInit(): void {
    this.notasService.getNotasById(1).subscribe(
      (res) => {
        this.nota = res;
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );
  }

  imprimir() {
    let data: any = {
      ooad: "CDMX NORTE",
      unidad: "HGZ 48 SAN PEDRO XALAPA",
      clavePtal: "35E1011D2153",
      turno: "MATUTINO",
      servicio: "GRUPO",
      grupo: "TOUR QUIRURJICO",
    };
    console.log("DATA REPORT: ", data);
    this.cronicaGrupalService.downloadPdf(data).subscribe(
      (response: Blob) => {
        var file = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(file);
        window.open(url);
      }, (error: HttpErrorResponse) => {
        console.error("Error al descargar reporte: ", error.message);
      }
    )
  }

}
