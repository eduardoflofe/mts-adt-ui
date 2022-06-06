import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-consulta-estudios-medicos',
  templateUrl: './consulta-estudios-medicos.component.html',
  styleUrls: ['./consulta-estudios-medicos.component.css']
})
export class ConsultaEstudiosMedicosComponent implements OnInit {

  fechaSelected!: string;
  page: number = 1;
  pageSize: number = 15;
  resultadoTotal: number = 0;
  dtOptions: DataTables.Settings = {};
  numitems: number = 15;
  order: string = 'desc';



  tabla = [
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
    {"Fecha":"20/06/2022", "NombreDeEstudio":"lorem imput dolor sit amen lorem imput", "PersonalSolicitante":"Lorent insump sint name"},
];
constructor(private router: Router,
  private authService: AuthService) {}

  ngOnInit(): void {
  }

  irDetalle(cronicaGrupal: any) {

  }


  irNuevoEstudio(){

  }
}
