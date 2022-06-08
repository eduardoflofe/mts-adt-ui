import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth-service.service';
import { NotasService } from 'src/app/service/notas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-consulta-lista-notas-tsocial',
  templateUrl: './consulta-lista-notas-tsocial.component.html',
  styleUrls: ['./consulta-lista-notas-tsocial.component.css']
})
export class ConsultaListaNotasTSocialComponent implements OnInit, AfterViewInit {
  public fechaSelected!: string;
  public page: number = 1;
  public pageSize: number = 15;
  public resultadoTotal: number = 0;
  public dtOptions: DataTables.Settings = {};
  public numitems: number = 15;
  public order: string = 'desc';
  public tabla: any[] = [];
  public extras: any;
  public datesForm!: FormGroup;
  // tabla = [{ "Fecha": "20/06/2022", "Descripcion": "lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput", }];

  constructor(
    private router: Router,
    private authService: AuthService,
    private notasService: NotasService,
    private fb: FormBuilder,
  ) {
    this.extras = this.router.getCurrentNavigation()?.extras;
    if (this.extras && this.extras.state) {
      console.log(this.extras.state.id);
      this.getNotasById(this.extras.state.id);
    }
  }

  ngOnInit(): void {
    this.datesForm = this.fb.group({
      fechaInicial: [moment().format('YYYY-MM-DD'), Validators.required],
      fechaFinal: [moment().format('YYYY-MM-DD'), Validators.required],
    });
  }

  getNotasById(id: number) {
    this.notasService.getNotasById(id).subscribe(
      (res) => {
        console.log(res);
        this.tabla = res;
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );
  }

  getNotasByFecha() {
    this.notasService.getNotasByFechas(this.datesForm.get('fechaInicial')?.value, this.datesForm.get('fechaFinal')?.value).subscribe(
      (res) => {
        console.log(res);
        this.tabla = res;
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );
  }
  // yy/mm/dd
  ngAfterViewInit(): void {
    $('#notasInit').val(moment().format('DD/MM/YYYY')).datepicker({
      dateFormat: "dd/mm/yy",
      onSelect: (date: any, datepicker: any) => {
        if (date != '') {
          date = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
          this.datesForm.get('fechaInicial')?.patchValue(date);
          this.handleDatesChange();
        }
      },
      onClose: (date: any) => {
        if (!date) {
          this.datesForm.get('fechaInicial')?.patchValue(null);
        }
      }
    });

    $('#notasFinal').val(moment().format('DD/MM/YYYY')).datepicker({
      dateFormat: "dd/mm/yy",
      onSelect: (date: any, datepicker: any) => {
        if (date != '') {
          date = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
          this.datesForm.get('fechaFinal')?.patchValue(date);
          this.handleDatesChange();
        }
      },
      onClose: (date: any) => {
        if (!date) {
          this.datesForm.get('fechaFinal')?.patchValue(null);
        }
      }
    });
    this.handleDatesChange();
  }

  irDetalle(cronicaGrupal: any) {

  }

  irNuevaNota() {
    let params = {
      'objetoAEnviar': null,
    }
    this.router.navigate(["nueva-nota"], { queryParams: params, skipLocationChange: true });
  }

  handleDatesChange() {
    if (
      this.datesForm.get('fechaInicial')?.value &&
      this.datesForm.get('fechaInicial')?.value !== '' &&
      this.datesForm.get('fechaFinal')?.value &&
      this.datesForm.get('fechaFinal')?.value !== '')
    {
      this.getNotasByFecha();
    }
  }
}
