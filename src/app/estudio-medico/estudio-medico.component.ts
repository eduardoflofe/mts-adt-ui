import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudio-medico',
  templateUrl: './estudio-medico.component.html',
  styleUrls: ['./estudio-medico.component.css']
})
export class EstudioMedicoComponent implements OnInit {

  fechaSelected!: string;
  page: number = 1;
  pageSize: number = 15;
  resultadoTotal: number = 0;
  dtOptions: DataTables.Settings = {};
  numitems: number = 15;
  order: string = 'desc';

  tabla = [
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
    {"Fecha":"20/06/2022", "Descripcion":"lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput",},
];

  constructor() { }

  ngOnInit(): void {
  }

  irDetalle(cronicaGrupal: any) {

  }


}
