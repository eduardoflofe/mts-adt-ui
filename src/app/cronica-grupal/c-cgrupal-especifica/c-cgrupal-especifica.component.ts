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
      this.cronica = params.getAll('cronica');
      console.log("OBJETO ENVIADO PARA DETALLE: ", JSON.parse(this.cronica[0]));
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
    let data: any;
    this.cronicaGrupalService.downloadPdf(data).subscribe(
      (response: Blob) => {
        var file = new Blob([response], { type: 'application/pdf' });
        // const filename = "Reporte.pdf";
        const url = window.URL.createObjectURL(file);
        window.open(url);
      }, (error: any) => {
        console.error("Error al descargar reporte: ", error);
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
