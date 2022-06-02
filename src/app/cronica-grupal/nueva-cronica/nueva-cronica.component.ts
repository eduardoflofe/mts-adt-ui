import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Cronica } from 'src/app/models/cronica.model';
import { MatDialog } from '@angular/material/dialog';
import { AgregarParticipanteDialogComponent } from './agregar-participante-dialog/agregar-participante-dialog.component';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { Participante } from 'src/app/models/participante.model';
import { CronicaGrupalService } from 'src/app/service/cronica-grupal.service';

declare var $: any;

@Component({
  selector: 'app-nueva-cronica',
  templateUrl: './nueva-cronica.component.html',
  styleUrls: ['./nueva-cronica.component.css']
})
export class NuevaCronicaComponent implements OnInit {

  public listParticipantes: Participante[] = [];

  time = new Date();
  rxTime = new Date();
  intervalId: any;
  subscription: Subscription | undefined;
  months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  today: any;
  day: any;
  month: any;
  year: any;

  cronica!: Cronica;

  editForm = this.fb.group({
    descPonentes: [null, Validators.required],
    numParticipantesAsistieron: [null, Validators.required],
    desTecnicaDidactica: [null, Validators.required],
    desMaterialApoyo: [null, Validators.required],
    desObjetivosSesion: [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
    desDesarrolloSesion: [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
    desPerfilGrupo: [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
    desObservaciones: [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private cronicaGrupalService: CronicaGrupalService,
    private modalService: NgbModal,
  ) { }

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
      }
      );
  }

  addParticipanteDialog() {
    const dialogRef = this.dialog.open(AgregarParticipanteDialogComponent, {
      width: '1170px',
      height: 'auto',
      maxWidth: '1170px',
      position: { top: `100px` },
      panelClass: 'dialog-styles',
      data: '',
    });

    dialogRef.afterClosed().subscribe((participantes: Participante[]) => {
      if (participantes && participantes.length > 0) {
        console.log(participantes);
        this.listParticipantes = participantes;
      }
    });
  }

  guardarCronica() {
    this.editForm.markAllAsTouched();

    if (this.editForm.valid) {
      this.cronica = {
        ...this.cronica,
        ...this.editForm.value,
        participanteList: this.listParticipantes
      };

      console.log("OBJETO: ", this.cronica);
      let params = {
        'cronica': JSON.stringify(this.cronica),
      }
      this.cronicaGrupalService.addCronica(this.cronica).subscribe(
        (response: any) => {
          console.log(response);
          // if(JSON.parse(response) === 'OK'){
          //   this.router.navigate(["cronicaGuardada"], { queryParams: params, skipLocationChange: true });
          // }
        }, (response: HttpErrorResponse) => {
          console.log("RESPUESTA: ", response.statusText);
          if(response.statusText === 'OK'){
            this.router.navigate(["cronicaGuardada"], { queryParams: params, skipLocationChange: true });
          }
        }
      );
    }
  }

  regresar(){
    this.router.navigateByUrl("/consulta-cronica-grupal", { skipLocationChange: true });
  }
  modalcarga(content: any) {
    //this.modalService.open(content, {centered: true,size: 'lg', backdrop: 'static', keyboard: false})
    $('#content').modal({
      keyboard: false,
      backdrop: 'static'
    })
    $('#content').modal('show')
  }

  cancelar() {
    $('#content').modal('hide')
  }

  salirModal(){
    this.router.navigateByUrl("/consulta-cronica-grupal", { skipLocationChange: true });
    $('#content').modal('hide')
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
