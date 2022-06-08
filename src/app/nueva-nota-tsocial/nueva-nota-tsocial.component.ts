import { Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotasService } from '../service/notas.service';
import { CronicaGrupalService } from '../service/cronica-grupal.service';
import { Nota } from '../models/notas.model';
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
  nota!: Nota;

  formNuevaNota: any = this.formBuilder.group({
    tipoDeNota: [-1, Validators.required],
    redDeApoyo: [-1, Validators.required],
    actividadTecnica: [-1, Validators.required],
    diagnosticoMedico: [null, Validators.required],
    redaccionCronologica: ['', Validators.required],
    diagnosticoSocial: ['', Validators.required],
  })

  catTiposNotas: any[] = [];
  catRedesApoyo: any[] = [];
  catActividadesTecnicas: any[] = [];
  catDiagnosticosMedicos: any[] = [];
  filteredOptions!: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private notasService: NotasService,
    private catServices: CronicaGrupalService,
  ) { }

  ngOnInit(): void {
    this.getCatalogos();    
  }

  getCatalogos() {
    this.notasService.getTiposNota().subscribe(
      (res) => {
        this.catTiposNotas = res.ArrayList;
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );

    this.notasService.getRedesApoyo().subscribe(
      (res) => {
        if (res) {
          this.catRedesApoyo = res.ArrayList;
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );

    this.notasService.getActividadesTecnicas().subscribe(
      (res) => {
        if (res) {
          this.catActividadesTecnicas = res.ArrayList;
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );

    this.catServices.getCatDiagnosticosMedicos('Fiebre').subscribe(
      (res) => {
        if (res) {
          this.catDiagnosticosMedicos = res.ArrayList;

          this.filteredOptions = this.formNuevaNota.get('diagnosticoMedico').valueChanges.pipe(
            startWith(''),
            map((value: any) => this._filter(typeof value === 'object' ? value?.descripcion : value))
          );
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
    console.log(this.formNuevaNota.value);
    this.nota = {
      ...this.formNuevaNota.value,
      actividadTecnica: parseInt(this.formNuevaNota.get('actividadTecnica').value),
      redDeApoyo: parseInt(this.formNuevaNota.get('redDeApoyo').value),
      tipoDeNota: parseInt(this.formNuevaNota.get('tipoDeNota').value),
      diagnosticoMedico: parseInt(this.formNuevaNota.get('diagnosticoMedico').value?.id)
    }
    this.notasService.addNota(this.nota).subscribe(
      (response: any) => {
        debugger;
        console.log(response);

        this.muestraAlerta(
          '¡La información se guardó con exito!',
          'alert-danger',
          null,
        );
        
        setTimeout(() => {
          this.router.navigate(["consulta-nota"], { skipLocationChange: true });
        }, 2000);
      }, (response: HttpErrorResponse) => {
        console.log("RESPUESTA: ", response.statusText);
        // if (response.statusText === 'OK') {
        //   this.router.navigate(["cronicaGuardada"], { queryParams: params, skipLocationChange: true });
        // }
      }
    );
    
    // Validators.required
    // this.camposCompletos = true
    // this.muestraAlerta(
    //   '¡La información se guardó con exito!',
    //   'alert-danger',
    //   null,
    // )
  }

  irConsultaNota() {
    let params = {
      'objetoAEnviar': null,
    }
    this.router.navigate(["consulta-nota"], { queryParams: params, skipLocationChange: true });
  }

  private _filter(value: string): string[] {
    console.log(value);
    const filterValue = value ? value.toLowerCase() : '';
    return this.catActividadesTecnicas.filter(option => option?.descripcion.toLowerCase().includes(filterValue));
  }

  public getOptionText(option: any) {
    return option ? option.descripcion : null;
  }

}
