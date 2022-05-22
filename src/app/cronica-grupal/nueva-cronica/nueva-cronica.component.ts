import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cronica } from 'src/app/models/cronica.model';
import { CronicaService } from 'src/app/service/cronica.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarParticipanteDialogComponent } from './agregar-participante-dialog/agregar-participante-dialog.component';

@Component({
  selector: 'app-nueva-cronica',
  templateUrl: './nueva-cronica.component.html',
  styleUrls: ['./nueva-cronica.component.css']
})
export class NuevaCronicaComponent implements OnInit {

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
    private cronicaService: CronicaService,
  ) { }

  ngOnInit(): void { }

  addParticipanteDialog() {
    const dialogRef = this.dialog.open(AgregarParticipanteDialogComponent, {
      width: '1170px',
      height: '588px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('este es el id a canmcelar ');
      }
    });
  }

  guardarCronica() {
    this.cronica = {
      ...this.cronica,
      ...this.editForm.value
    };

    this.cronicaService.addCronica(this.cronica).subscribe(
      (resp) => {
        if (resp) {
          this.router.navigate(["cronicaGuardada"]);
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
      }
    );
  }
}
