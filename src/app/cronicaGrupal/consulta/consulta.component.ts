import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { CronicaGrupalService } from 'src/app/service/cronica-grupal.service';
import * as momment from 'moment';

declare var $: any;

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  page: number = 1;
  pageSize: number = 15;
  resultadoTotal: number = 0;
  dtOptions: DataTables.Settings = {};
  numitems: number = 15;
  order: string = 'desc';
  columnaId: string = 'fecFechaCorta';

  catalogoEstatus: any[] = ['No impartida', 'Por impartir', 'Impartida'];

  servicioSelected: any = '-1';
  serviciosEspecialidad: any[] = [];
  turnoSelected: any = '-1';
  turnos: any[] = [];
  grupoSelected: any = '-1';
  grupos: any[] = [];
  lugarSelected: any = '-1';
  lugares: any[] = [];
  fechaSelected!: Date;
  radioBtnSelected: any;

  cronicasGrupales: any[] = [];

  // cronicasGrupales: any[] = [
  //   {
  //     fecFechaCorta: '25/01/2022',
  //     desGrupo: 'Lorem ipsum dolor sit amet',
  //     timHora: '01:00',
  //     desModalidad: '',
  //     numTotalParticipantes: '',
  //     numParticipantesAsistieron: '',
  //     idEstatusCronica: 'No impartida',
  //   },
  //   {
  //     fecFechaCorta: '24/01/2022',
  //     desGrupo: 'Lorem ipsum dolor sit amet',
  //     timHora: '15:00',
  //     desModalidad: '',
  //     numTotalParticipantes: '',
  //     numParticipantesAsistieron: '',
  //     idEstatusCronica: 'Impartida',
  //   }
  // ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private cronicaGrupalService: CronicaGrupalService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      order: [[2, 'desc']],
      ordering: false,
      paging: false,
      processing: false,
      info: false,
      searching: false,
    };
    this.sortBy(this.columnaId, this.order, 'fecha');
    this.authService.project$.next("Trabajo Social");
    this.loadCatalogos();
    $('#calendar').datepicker();
  }

  //Metodo que carga los catalogos iniciales y la información incial de la tabla CronicasGrupales
  loadCatalogos() {
    this.cronicaGrupalService.getCatServicios().toPromise().then(
      (servicios) => {
        this.serviciosEspecialidad = servicios;
        console.log("SERVICIOS: ", this.serviciosEspecialidad);
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );
    this.cronicaGrupalService.getCatTurnos().toPromise().then(
      (turnos) => {
        this.turnos = turnos;
        console.log("TURNOS: ", this.turnos);
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );
    this.cronicaGrupalService.getCatGrupo('1').toPromise().then(
      (grupos) => {
        this.grupos = grupos;
        console.log("GRUPOS: ", this.turnos);
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );
    this.cronicaGrupalService.getCatLugar('1').toPromise().then(
      (lugares) => {
        this.lugares = lugares;
        console.log("LUGARES: ", this.turnos);
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );
    this.cronicaGrupalService.getAllCronicasGrupales().toPromise().then(
      (cronicasGrupales: any) => {
        let cronicasArray = Object.keys(cronicasGrupales).map(index => {
          let cronica = cronicasGrupales[index];
          return cronica;
        });
        this.cronicasGrupales = cronicasArray[0];
        console.log("CRONICAS GRUPALES: ", this.cronicasGrupales);
      }
    );
  }

  //Metodo que se ejecuta al seleccionar un nuevo valor del catalogo de Servicio
  onChangeServicio(valueSelect: Event) {
    //Consumimo catalogo de grupo by ServicioEspecialidad seleccionado
    this.cronicaGrupalService.getCatGrupo(this.servicioSelected).subscribe(
      (grupos) => {
        this.grupos = grupos;
        console.log("GRUPOS BY SERVICIO: ", this.turnos);
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );
    //Consumimo catalogo de grupo by ServicioEspecialidad seleccionado
    this.cronicaGrupalService.getCatLugar(this.servicioSelected).subscribe(
      (lugares) => {
        this.lugares = lugares;
        console.log("LUGARES BY SERVICIO: ", this.turnos);
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );
    if (this.validateAllDataFull()) {
      this.getCronicasGrupales();
    } else {
      //Poblamos la tabla de acuerdo al filtro de servicio seleccionado
      this.cronicaGrupalService.getCronicasGrupalesByServicioEspecialidad(this.servicioSelected).subscribe(
        (cronicasGrupales) => {
          this.cronicasGrupales = [];
          let cronicasArray = Object.keys(cronicasGrupales).map(index => {
            let cronica = cronicasGrupales[index];
            return cronica;
          });
          this.cronicasGrupales = cronicasArray[0];
          console.log("CRONICAS GRUPALES BY SERVICIO: ", this.cronicasGrupales);
        }
      );
    }
  }

  //Metodo que se ejecuta al seleccionar un nuevo valor del catalogo de Turno
  onChangeTurno(valueSelect: Event) {
    if (this.validateAllDataFull()) {
      this.getCronicasGrupales();
    } else {
      //Poblamos la tabla de acuerdo al filtro de turno seleccionado
      this.cronicaGrupalService.getCronicasGrupalesByTurno(Number(this.turnoSelected)).subscribe(
        (cronicasGrupales) => {
          this.cronicasGrupales = [];
          let cronicasArray = Object.keys(cronicasGrupales).map(index => {
            let cronica = cronicasGrupales[index];
            return cronica;
          });
          this.cronicasGrupales = cronicasArray[0];
          console.log("CRONICAS GRUPALES BY TURNO: ", this.cronicasGrupales);
        }
      );
    }
  }

  //Metodo que se ejecuta al seleccionar un nuevo valor del catalogo de Grupo
  onChangeGrupo(valueSelect: Event) {
    if (this.validateAllDataFull()) {
      this.getCronicasGrupales();
    } else {
      //Poblamos la tabla de acuerdo al filtro de grupo seleccionado
      this.cronicaGrupalService.getCronicasGrupalesByGrupo(Number(this.grupoSelected)).subscribe(
        (cronicasGrupales) => {
          this.cronicasGrupales = [];
          let cronicasArray = Object.keys(cronicasGrupales).map(index => {
            let cronica = cronicasGrupales[index];
            return cronica;
          });
          this.cronicasGrupales = cronicasArray[0];
          console.log("CRONICAS GRUPALES BY GRUPO: ", this.cronicasGrupales);
        }
      );
    }
  }

  //Metodo que se ejecuta al seleccionar un nuevo valor del catalogo de Lugar
  onChangeLugar(valueSelect: Event) {
    if (this.validateAllDataFull()) {
      this.getCronicasGrupales();
    } else {
      //Poblamos la tabla de acuerdo al filtro de lugar seleccionado
      this.cronicaGrupalService.getCronicasGrupalesByUbicacion(this.lugarSelected).subscribe(
        (cronicasGrupales) => {
          this.cronicasGrupales = [];
          let cronicasArray = Object.keys(cronicasGrupales).map(index => {
            let cronica = cronicasGrupales[index];
            return cronica;
          });
          this.cronicasGrupales = cronicasArray[0];
          console.log("CRONICAS GRUPALES BY LUGAR: ", this.cronicasGrupales);
        }
      );
    }
  }

  //Metodo que se ejecuta al seleccionar un nuevo valor de Fecha
  onChangeFecha() {
    console.log("FECHA SELECTED: ", this.fechaSelected);
    const fecha = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    if (this.validateAllDataFull()) {
      this.getCronicasGrupales();
    } else {
      //Poblamos la tabla de acuerdo al filtro de fecha seleccionado
      this.cronicaGrupalService.getCronicasGrupalesByFecha(fecha).subscribe(
        (cronicasGrupales) => {
          this.cronicasGrupales = [];
          let cronicasArray = Object.keys(cronicasGrupales).map(index => {
            let cronica = cronicasGrupales[index];
            return cronica;
          });
          this.cronicasGrupales = cronicasArray[0];
          console.log("CRONICAS GRUPALES BY FECHA: ", this.cronicasGrupales);
        }
      );
    }
  }

  onChangeRadioBoton(value: Event) {
    console.log("RADIO: ", this.radioBtnSelected);
    if (this.validateAllDataFull()) {
      this.getCronicasGrupales();
    } else {
      //Poblamos la tabla de acuerdo al filtro de radio seleccionado
      this.cronicaGrupalService.getCronicasGrupalesByEspecialidadEspecifica(this.radioBtnSelected).subscribe(
        (cronicasGrupales) => {
          this.cronicasGrupales = [];
          let cronicasArray = Object.keys(cronicasGrupales).map(index => {
            let cronica = cronicasGrupales[index];
            return cronica;
          });
          this.cronicasGrupales = cronicasArray[0];
          console.log("CRONICAS GRUPALES BY LUGAR: ", this.cronicasGrupales);
        }
      );
    }
  }

  validateAllDataFull(): boolean {
    if (this.servicioSelected !== '-1' && this.turnoSelected !== '-1'
      && this.grupoSelected !== '-1' && this.lugarSelected !== '-1'
      && this.fechaSelected !== null && this.radioBtnSelected) {
      return true;
    }
    return false;
  }

  getCronicasGrupales() {
    const fecha = this.datePipe.transform(this.fechaSelected, 'dd-MM-yyyy');
    this.cronicaGrupalService.getCronicasGrupalesByFiltros(this.servicioSelected !== '-1' ? this.servicioSelected : '-', this.turnoSelected !== '-1' ? Number(this.turnoSelected) : 0, this.grupoSelected !== '-1' ? Number(this.grupoSelected) : 0, this.lugarSelected !== '-1' ? this.lugarSelected : '-', fecha !== null ? fecha : '00-00-0000', this.radioBtnSelected !== '' ? this.radioBtnSelected : '-').subscribe(
      (cronicasGrupales) => {
        this.cronicasGrupales = [];
        let cronicasArray = Object.keys(cronicasGrupales).map(index => {
          let cronica = cronicasGrupales[index];
          return cronica;
        });
        this.cronicasGrupales = cronicasArray[0];
        console.log("CRONICAS GRUPALES BY FILTROS: ", this.cronicasGrupales);
      }
    );
  }

  addCronica() {
    this.router.navigate(["nuevaCronica"], { skipLocationChange: true });
  }

  irDetalle(cronicaGrupal: any) {
    let params = {
      'cronica': JSON.stringify(cronicaGrupal),
    }
    console.log("OBJETO DETALLE: ", cronicaGrupal);
    this.router.navigate(["busquedaEspecifica"], { queryParams: params, skipLocationChange: true });
  }

  sortBy(columnaId: string, order: string, type: string) {
    this.columnaId = columnaId;
    this.order = order;

    this.cronicasGrupales.sort((a: any, b: any) => {
      let c: any = this.converType(a[columnaId], type);
      let d: any = this.converType(b[columnaId], type);
      if (order === 'desc') {
        return d - c; // Descendiente
      } else {
        return c - d; // Ascendiente
      }
    });
  }

  converType(val: any, type: string) {
    let data;
    switch (type) {
      case 'fecha':
        data = momment(val, 'DD/MM/YYYY');
        break;
      case 'hora':
        data = momment(val, 'HH:mm:ss');
        break;

      default:
        break;
    }
    return data;
  }

}
