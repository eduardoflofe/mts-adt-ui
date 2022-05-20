import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.project$.next("Trabajo Social");
  }

  addCronica() {
    this.router.navigate(["nuevaCronica"]);
  }

  irDetalle() {
    this.router.navigate(["busquedaEspecifica"]);
  }

}
