import { Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-nueva-nota-tsocial',
  templateUrl: './nueva-nota-tsocial.component.html',
  styleUrls: ['./nueva-nota-tsocial.component.css'],
})
export class NuevaNotaTSocialComponent implements OnInit {
  camposCompletos: boolean = true

  alertMensaje: string = ''
  alertVisible: boolean = false
  alertTipo: string = ''

  signin: FormGroup = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  camposNota: any = this.formBuilder.group({
    tipoDeNota: ['', Validators.required],
    redaccionCronologica: ['', Validators.required],
    redDeApoyo: ['', Validators.required],
    actividadTecnica: ['', Validators.required],
    diagnosticoMedico: ['', Validators.required],
    diagnosticoSocial: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal) {}

  ngOnInit(): void {
  }


  muestraAlerta(mensaje: string, estilo: string, funxion: any) {
    this.alertMensaje = mensaje
    this.alertTipo = estilo
    this.alertVisible = true

    setTimeout(() => {
      this.alertMensaje = mensaje
      this.alertTipo = estilo
      this.alertVisible = false

      if (funxion != null) {
        funxion()
      }
    }, 5000)
  }

  modalcarga(content: any) {
    //this.modalService.open(content, {centered: true,size: 'lg', backdrop: 'static', keyboard: false})
    $('#content').modal({
      keyboard: false,
      backdrop: 'static'
    })
    $('#content').modal('show')
  }
  
  cancelar() {
    $('#content').modal('hide')
  }
  
  salirModal(){
    this.router.navigateByUrl("/nuevaNotaTrabajoSocial", { skipLocationChange: true });
    $('#content').modal('hide')  
  }
  guardar() {
    Validators.required
    this.camposCompletos = true
    this.muestraAlerta(
      '<strong></strong>¡La información se guardó con exito!',
      'alert-danger',
      null,
    )
  }
}
