import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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
  private onSession = new BehaviorSubject<boolean>(false);

  onSession$ = this.onSession.asObservable();

  constructor(
    // private authenticationService: AuthService
  ) { }

  ngOnInit(): void {
    let sessionUsuario: any = sessionStorage.getItem('usuario');
    if (sessionUsuario) {
      let usuario = JSON.parse(sessionUsuario);
      this.email = usuario.strEmail;
      this.nombre = usuario.strNombres + " " + usuario.strApellidoP;
      this.matricula = usuario.strUserName;
      this.onSession.next(true);
      console.log("OBSERVABLE: ", this.onSession);
    }
  }

  logOut() {
    // this.authenticationService.logout();
  }

}
