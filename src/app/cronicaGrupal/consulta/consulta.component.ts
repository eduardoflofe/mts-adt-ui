import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addCronica() {
    this.router.navigate(["nuevaCronica"]);
  }

  irDetalle() {
    this.router.navigate(["busquedaEspecifica"]);
  }

}
