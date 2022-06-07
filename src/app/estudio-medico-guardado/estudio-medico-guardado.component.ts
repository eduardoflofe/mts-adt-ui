import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudio-medico-guardado',
  templateUrl: './estudio-medico-guardado.component.html',
  styleUrls: ['./estudio-medico-guardado.component.css']
})
export class EstudioMedicoGuardadoComponent implements OnInit {
  datosGenerales = false;
  datosFamiliar = false;
  datosExploracionCaso = false;
  constructor() { }

  ngOnInit(): void {
    this.datosGenerales = true
    this.datosFamiliar = false
    this.datosExploracionCaso = false
  }

  irDatosDeFamiliar(){
    this.datosGenerales = false
    this.datosFamiliar = true
    this.datosExploracionCaso = false
  }

  irExploracionCaso(){
    this.datosGenerales = false
    this.datosFamiliar = false
    this.datosExploracionCaso = true
  }

  irDatosGenerales(){
    this.datosGenerales = true
    this.datosFamiliar = false
    this.datosExploracionCaso = false
  }
}
