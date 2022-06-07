import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms'
import { Validators } from '@angular/forms'

@Component({
  selector: 'app-nuevo-estudio-social-medico',
  templateUrl: './nuevo-estudio-social-medico.component.html',
  styleUrls: ['./nuevo-estudio-social-medico.component.css']
})
export class NuevoEstudioSocialMedicoComponent implements OnInit {
  datosGenerales = false;
  datosFamiliar = false;
  datosExploracionCaso = false;
  camposNota: any = this.formBuilder.group({
    nuevoEstudioSocial: ['', Validators.required]
  })
  constructor(private formBuilder: FormBuilder) { }

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

}
