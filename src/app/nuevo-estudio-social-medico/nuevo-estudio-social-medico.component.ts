import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms'
import { Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

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
  constructor(private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal) {}

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

  modalcarga(content: any) {
    //this.modalService.open(content, {centered: true,size: 'lg', backdrop: 'static', keyboard: false})
    $('#content').modal({
      keyboard: false,
      backdrop: 'static'
    })
    $('#content').modal('show');
  }

  cancelarModal() {
    $('#content').modal('hide');
  }

  salirModal(){
    this.router.navigateByUrl("/consulta-estudios-medicos", { skipLocationChange: true });
    $('#content').modal('hide');
  }
}
