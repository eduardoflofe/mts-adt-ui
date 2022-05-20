import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../service/auth-service.service';
// import { AuthService } from './service/auth-service.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  title = 'Ecosistema Digital';
  email: string | undefined;
  nombre: string | undefined;
  matricula: string | undefined;
  proyecto: string = "";

  constructor(
    private authenticationService: AuthService
  ) {}

  ngOnInit(): void {
    let usuarioLogueadoSub = this.authenticationService.userLogged$.asObservable();
    this.authenticationService.project$.asObservable().subscribe(
      (proyectoActual) => this.proyecto = proyectoActual
    );
    let sessionUsuario: any = sessionStorage.getItem('usuario');
    if (usuarioLogueadoSub) {
      let usuario = JSON.parse(sessionUsuario);
      this.email = usuario.strEmail;
      this.nombre = usuario.strNombres + " " + usuario.strApellidoP;
      this.matricula = usuario.strUserName;
    }
  }

  logOut() {
    this.authenticationService.logout();
  }

}
