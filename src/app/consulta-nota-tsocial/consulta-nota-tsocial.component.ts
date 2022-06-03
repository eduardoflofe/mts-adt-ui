import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-nota-tsocial',
  templateUrl: './consulta-nota-tsocial.component.html',
  styleUrls: ['./consulta-nota-tsocial.component.css']
})
export class ConsultaNotaTSocialComponent implements OnInit {

  months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  today: any;
  day: any;
  month: any;
  year: any;
  cronica: any;

  constructor() { }

  ngOnInit(): void {
  }

}
