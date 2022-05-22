import { BusquedaNssComponent } from './../busqueda-nss/busqueda-nss.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  pacientesRuta() { this.router.navigate(['busqueda']); }

  irCronicaGrupal() {
    this.router.navigate(["consulta-cronica-grupal"]);
  }

  irBusquedaDePacientesPorNss(){
    this.router.navigate(["busqueda"]);
  }

}
