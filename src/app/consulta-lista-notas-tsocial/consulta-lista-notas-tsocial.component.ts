import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth-service.service';
import { NotasService } from 'src/app/service/notas.service';

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
  // tabla = [{ "Fecha": "20/06/2022", "Descripcion": "lorem imput dolor sit amen lorem imput dolor sit amen lorem imput dolor sit amen lorem imput", }];

  constructor(
    private router: Router,
    private authService: AuthService,
    private notasService: NotasService,
  ) {
    this.extras = this.router.getCurrentNavigation()?.extras;
    if (this.extras && this.extras.state) {
      console.log(this.extras.state.id);
      this.getNotasById(this.extras.state.id);
    }
  }

  ngOnInit(): void { }

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

  getNotasByFecha(fechaInicial: string, fechaFinal: string) {
    this.notasService.getNotasByFechas(fechaInicial, fechaFinal).subscribe(
      (res) => {
        console.log(res);
        this.tabla = res;
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );
  }

  ngAfterViewInit(): void {
    $('#calendar').datepicker({
      dateFormat: "yy/mm/dd",
      onSelect: (date: any, datepicker: any) => {
        if (date != '') {
          this.fechaSelected = date.replaceAll('/', '-');
          // console.log("date onSelect: ", date);
          setTimeout(() => {
            // this.getCronicasGrupales()
          }, 0)
        }
      }
    });
  }

  irDetalle(cronicaGrupal: any) {

  }

  irNuevaNota() {
    let params = {
      'objetoAEnviar': null,
    }
    this.router.navigate(["nueva-nota"], { queryParams: params, skipLocationChange: true });
  }

}
