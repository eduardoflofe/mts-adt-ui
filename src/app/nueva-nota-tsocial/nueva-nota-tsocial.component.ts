import { Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotasService } from '../service/notas.service';
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
    tipoDeNota: ['-1', Validators.required],
    redDeApoyo: ['-1', Validators.required],
    actividadTecnica: ['-1', Validators.required],
    diagnosticoMedico: ['-1', Validators.required],
    redaccionCronologica: ['', Validators.required],
    diagnosticoSocial: ['', Validators.required],
  })

  catTiposNotas: any[] = [];
  catRedesApoyo: any[] = [];
  catActividadesTecnicas: any[] = [];
  catDiagnosticosMedicos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private notasService: NotasService,
  ) { }

  ngOnInit(): void {
    this.getCatalogos();
  }

  getCatalogos() {
    this.notasService.getTiposNota().subscribe(
      (res) => {
        this.catTiposNotas = res;
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );

    this.notasService.getRedesApoyo().subscribe(
      (res) => {
        if (res) {
          this.catRedesApoyo = res;
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );

    this.notasService.getActividadesTecnicas().subscribe(
      (res) => {
        if (res) {
          this.catActividadesTecnicas = res;
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );

    this.notasService.getDiagnosticosMedicos('').subscribe(
      (res) => {
        if (res) {
          this.catDiagnosticosMedicos = res;
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );
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
    $('#content').modal('show');
  }

  cancelar() {
    $('#content').modal('hide');
  }

  salirModal() {
    this.router.navigateByUrl("/consulta-notas", { skipLocationChange: true });
    $('#content').modal('hide');
  }

  guardar() {
    Validators.required
    this.camposCompletos = true
    this.muestraAlerta(
      '¡La información se guardó con exito!',
      'alert-danger',
      null,
    )
  }

  irConsultaNota() {
    let params = {
      'objetoAEnviar': null,
    }
    this.router.navigate(["consulta-nota"], { queryParams: params, skipLocationChange: true });
  }
}
