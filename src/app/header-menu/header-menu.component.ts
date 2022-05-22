import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

  isAuthenticated$!: Observable<boolean>;

  constructor(
    private authenticationService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.authenticationService.isAuthenticatedObs$;
    this.authenticationService.isAuthenticatedObs$.subscribe(
      (isAuthiticated: boolean) => {
        this.nombre = isAuthiticated ? this.authenticationService.usuario.strNombres + " " + this.authenticationService.usuario.strApellidoP : "";
        this.email = isAuthiticated ? this.authenticationService.usuario.strEmail : "";
        this.matricula = isAuthiticated ? this.authenticationService.usuario.strUserName : "";
      }
    )

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
