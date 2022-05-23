import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-cronica-guardada',
  templateUrl: './cronica-guardada.component.html',
  styleUrls: ['./cronica-guardada.component.css']
})

export class CronicaGuardadaComponent implements OnInit, OnDestroy {

  time = new Date();
  rxTime = new Date();
  intervalId: any;
  subscription: Subscription | undefined;
  months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  today:any;
  day:any;
  month:any;
  year:any;

  constructor() { }

  ngOnInit(): void {
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

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
