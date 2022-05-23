import { ServiceService } from './busqueda-nss.service';
import { Component } from '@angular/core';
import { pacienteSeleccionado } from './paciente.interface';
import { Router } from '@angular/router';
import { AppTarjetaPresentacionService } from '../app-tarjeta-presentacion/app-tarjeta-presentacion.service';

@Component({
  selector: 'app-busqueda-nss',
  templateUrl: './busqueda-nss.component.html',
  styleUrls: ['./busqueda-nss.component.css']
})

export class BusquedaNssComponent {
  pacienteSeleccionado!: pacienteSeleccionado;

  isCollapsed: boolean[] = [];

  page: number = 1;

  pageSize: number = 2;

  alertMensaje: string = "";
  alertVisible: boolean = false;
  alertTipo: string = "";



  txtNSS = "4382641109";

  listaPacientes: any;

  errorBusqueda: boolean = false;

  resultadoTotal: number = 0;

  constructor(private ServiceService: ServiceService,
    private router: Router,
    private tarjetaService: AppTarjetaPresentacionService) {


  }

  elementoSeleccionado(obj: any) {

    this.pacienteSeleccionado = obj;

    this.tarjetaService.add(this.pacienteSeleccionado);

    this.router.navigate(['tarjeta'], { skipLocationChange: true });
    console.log(this.pacienteSeleccionado)

  }

  muestra(i: number) {
    this.isCollapsed[i] = !this.isCollapsed[i];

  }


  get() {

    if (this.validaInput()) {

      this.muestraAlerta('<strong>Error.</strong>¡La longitud del NSS no es correcta, favor de verificar!',
        'alert-danger', null
      );

    } else {

      this.ServiceService.getAll(this.txtNSS).subscribe({
        next: (resp: any) => {
          this.listaPacientes = resp.busquedanss.beneficiarios;

          this.resultadoTotal = resp.busquedanss.registrosTotal;

          if (this.resultadoTotal == 0) {

            this.errorBusqueda = true;
            this.muestraAlerta('<strong>Sin resultados.</strong> Valide los filtros',
              'alert-warning', null
            );

          } else {
            for (var i = 0; i < this.resultadoTotal; i++) {
              this.isCollapsed[i] = true;
            }

          }

        }, error: (err) => {

          this.muestraAlerta('<strong>Error de red.</strong> No fue posible conectar con la API de busqueda',
            'alert-danger', null
          );

          console.log(err)
          this.errorBusqueda = true;


        }
      });

    }


  }

  validaInput(): boolean {

    return this.txtNSS.length != 10;

  }

  limpiar() {
    this.listaPacientes = [];
    this.resultadoTotal = 0;
    this.errorBusqueda = false;
    this.txtNSS = '';
    this.alertVisible = false;
  }

  muestraAlerta(mensaje: string, estilo: string, funxion: any) {

    this.alertMensaje = mensaje;
    this.alertTipo = estilo;
    this.alertVisible = true;

    setTimeout(() => {
      this.alertMensaje = mensaje;
      this.alertTipo = estilo;
      this.alertVisible = false;

      if (funxion != null) {
        funxion();
      }
    }, 5000);
  }





}
