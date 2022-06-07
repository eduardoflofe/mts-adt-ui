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
    nuevoEstudioSocial: ['', Validators.required],
    solicitadoPor:['',Validators.required],
    fechas:['',Validators.required],
    cp:['',Validators.required],
    colonia:['',Validators.required],
    calle:['',Validators.required],
    numeroExt:['',Validators.required],
    numeroInt:['',Validators.required],
    telefonoFijo:['',Validators.required],
    telefonoCelular:['',Validators.required],
    email:['',Validators.required],
    edad:['',Validators.required],
    parentesco:['',Validators.required],
    codigoP:['',Validators.required],
    estadoF:['',Validators.required],
    delegacionM:['',Validators.required],
    ciudadF:['',Validators.required],
    coloniaF:['',Validators.required],
    calleF:['',Validators.required],
    numExtF:['',Validators.required],
    numIntF:['',Validators.required],
    telFijo:['',Validators.required],
    telCel:['',Validators.required],
    correoF:['',Validators.required],
    objetivoEstudio:['',Validators.required],
    datosPaciente:['',Validators.required],
    datosFamiliares:['',Validators.required],
    datosEconomicos:['',Validators.required],
    datosHogar:['',Validators.required],
    datosComplementarios:['',Validators.required],
    datosSocialF:['',Validators.required],
    datosTratamiento:['',Validators.required],
    datosAcciones:['',Validators.required],
    nombreFamiliar:['',Validators.required]
    
  })
  // camposExploracion: any = this.formBuilder.group({
  //   objetivoEstudio:['',Validators.required]
  // })
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

  irDatosGenerales(){
    this.datosGenerales = true
    this.datosFamiliar = false
    this.datosExploracionCaso = false
  }

}
