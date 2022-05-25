import { BusquedaNssComponent } from './../busqueda-nss/busqueda-nss.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {
  selectedCronica: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  pacientesRuta() {
    this.selectedCronica = false;
    this.router.navigate(['busqueda'], { skipLocationChange: true });
  }

  irCronicaGrupal(select: boolean) {
    this.selectedCronica = select;
    this.router.navigate(["consulta-cronica-grupal"], { skipLocationChange: true });
  }

  irBusquedaDePacientesPorNss() {
    this.selectedCronica = false;
    this.router.navigate(["busqueda"], { skipLocationChange: true });
  }

}