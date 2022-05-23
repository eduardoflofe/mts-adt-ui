import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { objAlert } from 'src/app/common/alerta/alerta.interface';

@Component({
  selector: 'app-cronica-guardada',
  templateUrl: './cronica-guardada.component.html',
  styleUrls: ['./cronica-guardada.component.css']
})

export class CronicaGuardadaComponent implements OnInit, OnDestroy {

  alert!: objAlert;

  time = new Date();
  rxTime = new Date();
  intervalId: any;
  subscription: Subscription | undefined;
  months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  today:any;
  day:any;
  month:any;
  year:any;

  cronica: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showSucces("¡La información se guardó con éxito!")
    this.route.queryParamMap.subscribe((params: any) => {
      this.cronica = params.getAll('cronica');
      console.log("OBJETO ENVIADO: ", JSON.parse(this.cronica[0]));
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
      });
  }

  private showError(error:string) {
    this.alert = {
      message:error,
      type: 'error',
      visible: true
    }
    setTimeout(() => {
      this.alert = {
        message:'',
        type: 'custom',
        visible: false
      }
    }, 5000);
  }

  //Success
  private showSucces(msg:string) {

    this.alert = {
      message:'<strong>Estatus.</strong>'+msg,
      type: 'success',
      visible: true
    }
    setTimeout(() => {
      this.alert = {
        message:'',
        type: 'custom',
        visible: false
      }
    }, 2000);
  }

  regresar() {
    this.router.navigateByUrl("/consulta-cronica-grupal", { skipLocationChange: true });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
