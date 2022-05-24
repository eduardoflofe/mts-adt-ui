import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { CronicaGrupalService } from "src/app/service/cronica-grupal.service";

@Component({
  selector: 'app-c-cgrupal-especifica',
  templateUrl: './c-cgrupal-especifica.component.html',
  styleUrls: ['./c-cgrupal-especifica.component.css']
})
export class CCGrupalEspecificaComponent implements OnInit, OnDestroy {

  time = new Date();
  rxTime = new Date();
  intervalId: any;
  subscription: Subscription | undefined;
  months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  today: any;
  day: any;
  month: any;
  year: any;

  cronica: any;
  catalogoEstatus: any[] = ['No impartida','Por impartir','Impartida'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cronicaGrupalService: CronicaGrupalService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      this.cronica = JSON.parse(params.getAll('cronica'));
      console.log("OBJETO ENVIADO PARA DETALLE: ", this.cronica);
    });

    const currentDate = new Date();
    this.day = currentDate.getDate();
    this.month = currentDate.getMonth();
    this.year = currentDate.getFullYear();
    this.today = currentDate;

    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      }
    );
  }

  cancelar() {
    this.router.navigateByUrl("/consulta-cronica-grupal", { skipLocationChange: true });
  }

  imprimir() {
    let data: any = {
        grupo : this.cronica.desGrupo !== null ? this.cronica.desGrupo : "",
        fecha: this.cronica.fecFechaCorta !== null ? this.cronica.fecFechaCorta : "",
        hora: this.cronica.timHora !== null ? this.cronica.timHora : "",
        ponentes: this.cronica.descPonentes !== null ? this.cronica.descPonentes : "",
        numAsistentes: this.cronica.numParticipantesAsistieron !== null ? this.cronica.numParticipantesAsistieron : "",
        tecnicaDidactica: this.cronica.desTecnicaDidactica !== null ? this.cronica.desTecnicaDidactica : "",
        materialApoyo: this.cronica.desMaterialApoyo !== null ? this.cronica.desMaterialApoyo : "",
        objetivoSesion: this.cronica.desObjetivosSesion !== null ? this.cronica.desObjetivosSesion : "",
        contenido: this.cronica.desDesarrolloSesion !== null ? this.cronica.desDesarrolloSesion : "",
        perfilGrupo: this.cronica.desPerfilGrupo !== null ? this.cronica.desPerfilGrupo : "",
        observaciones: this.cronica.desObservaciones !== null ? this.cronica.desObservaciones : "",
        trabajadorSocial: "Antonio Esteban Alcántar"
    };
    console.log("DATA REPORT: ", data);
    this.cronicaGrupalService.downloadPdf(data).subscribe(
      (response: Blob) => {
        var file = new Blob([response], { type: 'application/pdf' });
        // const filename = "Reporte.pdf";
        const url = window.URL.createObjectURL(file);
        window.open(url);
      }, (error: HttpErrorResponse) => {
        console.error("Error al descargar reporte: ", error.message);
      }
    )
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
