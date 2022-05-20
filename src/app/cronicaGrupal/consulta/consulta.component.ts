import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth-service.service';
import { CronicaGrupalService } from 'src/app/service/cronica-grupal.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  serviciosEspecialidad: any[] = [];
  turnos: any[] = [];
  horarios: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private cronicaGrupalService: CronicaGrupalService
  ) { }

  ngOnInit(): void {
    this.authService.project$.next("Trabajo Social");
    this.loadCatalogos();
  }

  loadCatalogos() {
    this.cronicaGrupalService.getCatServicios().subscribe(
      (servicios) => {
        this.serviciosEspecialidad = servicios;
        console.log("SERVICIOS: ", this.serviciosEspecialidad);
      },
      (httpErrorResponse: HttpErrorResponse) => {
       console.error(httpErrorResponse); 
      }
    );
    this.cronicaGrupalService.getCatTurnos().subscribe(
      (turnos) => {
        this.turnos = turnos;
        console.log("TURNOS: ", this.turnos);
      },
      (httpErrorResponse: HttpErrorResponse) => {
       console.error(httpErrorResponse); 
      }
    );
    this.cronicaGrupalService.getCatCalendarios().subscribe(
      (calendario) => {
        this.horarios = calendario;
        console.log("HORARIOS: ", this.horarios);
      },
      (httpErrorResponse: HttpErrorResponse) => {
       console.error(httpErrorResponse); 
      }
    );
  }

  addCronica() {
    this.router.navigate(["nuevaCronica"]);
  }

  irDetalle() {
    this.router.navigate(["busquedaEspecifica"]);
  }

}
