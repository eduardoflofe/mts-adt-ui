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



const routes: Routes = [
  { path: 'busqueda', component: BusquedaNssComponent },
  { path: 'tarjeta', component: AppTarjetaPresentacionComponent },
  { path: 'busquedaEspecifica', component: CCGrupalEspecificaComponent },
  { path: 'nuevaCronica', component: NuevaCronicaComponent },
  { path: 'cronicaGuardada', component: CronicaGuardadaComponent },
  { path: 'admon-cronica-grupal', component: CCGrupalEspecificaComponent },
  { path: 'consulta-cronica-grupal', component: ConsultaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [
    RouterModule,
    HttpClientModule]

})
export class AppRoutingModule { }
