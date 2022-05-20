import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cronica } from 'src/app/models/cronica.model';
import { CronicaService } from 'src/app/service/cronica.service';
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
    desObjetivosSesion: [null, Validators.required],
    desDesarrolloSesion: [null, Validators.required],
    desPerfilGrupo: [null, Validators.required],
    desObservaciones: [null, Validators.required],
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cronicaService: CronicaService,
  ) { }

  ngOnInit(): void { }

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
