import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DeclarationListEmitMode } from '@angular/compiler';
import { BusquedaNssComponent } from './busqueda-nss/busqueda-nss.component';
import { AppTarjetaPresentacionComponent } from './app-tarjeta-presentacion/app-tarjeta-presentacion.component';
import { NuevaCronicaComponent } from './cronica-grupal/nueva-cronica/nueva-cronica.component';
import { CCGrupalEspecificaComponent } from './cronica-grupal/c-cgrupal-especifica/c-cgrupal-especifica.component';
import { CronicaGuardadaComponent } from './cronica-grupal/cronica-guardada/cronica-guardada.component';
import { ConsultaComponent } from './cronicaGrupal/consulta/consulta.component';
import { LoginComponent } from './seguridad/login/login.component';
import { SeguridadRouter } from './seguridad/seguridad.router';
import { RegistroComponent } from './seguridad/registro/registro.component';
import { NuevaNotaTSocialComponent } from './nueva-nota-tsocial/nueva-nota-tsocial.component';
import { ConsultaListaNotasTSocialComponent } from './consulta-lista-notas-tsocial/consulta-lista-notas-tsocial.component';
import { NuevoEstudioSocialMedicoComponent } from './nuevo-estudio-social-medico/nuevo-estudio-social-medico.component';
import { ConsultaNotaTSocialComponent } from './consulta-nota-tsocial/consulta-nota-tsocial.component';
import { ConsultaEstudiosMedicosComponent } from './consulta-estudios-medicos/consulta-estudios-medicos.component';
import { EstudioMedicoGuardadoComponent } from './estudio-medico-guardado/estudio-medico-guardado.component';




const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recuperarpassword', component: RegistroComponent },
  { path: 'busqueda', component: BusquedaNssComponent },
  { path: 'tarjeta', component: AppTarjetaPresentacionComponent },
  { path: 'busquedaEspecifica', component: CCGrupalEspecificaComponent },
  { path: 'nuevaCronica', component: NuevaCronicaComponent },
  { path: 'cronicaGuardada', component: CronicaGuardadaComponent },
  { path: 'consulta-cronica-grupal', component: ConsultaComponent },
  { path: 'nueva-nota', component: NuevaNotaTSocialComponent },
  { path: 'detalle-nota', component: ConsultaNotaTSocialComponent },
  { path: 'consulta-estudios-medicos', component: ConsultaEstudiosMedicosComponent },
  { path: 'consulta-notas', component: ConsultaListaNotasTSocialComponent },
  { path: 'nuevo-estudio-social-medico', component: NuevoEstudioSocialMedicoComponent },
  { path: 'detalle-estudio-medico', component: EstudioMedicoGuardadoComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [
    RouterModule,
    HttpClientModule
  ],
  providers: [SeguridadRouter]
})
export class AppRoutingModule { }
