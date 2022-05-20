import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusquedaNssComponent } from './busqueda-nss/busqueda-nss.component';
import { HttpClientModule } from '@angular/common/http';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { AppInfoBottomComponent } from './app-info-bottom/app-info-bottom.component';
import { AppAlertsComponent } from './app-alerts/app-alerts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from "ngx-pagination";
import { AppTarjetaPresentacionComponent } from './app-tarjeta-presentacion/app-tarjeta-presentacion.component';
import { CCGrupalEspecificaComponent } from './cronica-grupal/c-cgrupal-especifica/c-cgrupal-especifica.component';
import { NuevaCronicaComponent } from './cronica-grupal/nueva-cronica/nueva-cronica.component';
import { CronicaGuardadaComponent } from './cronica-grupal/cronica-guardada/cronica-guardada.component';
import { ConsultaComponent } from './cronicaGrupal/consulta/consulta.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { CardTemplateComponent } from './commons/card-template/card-template.component';



@NgModule({
  declarations: [
    AppComponent,
    BusquedaNssComponent,
    AppMenuComponent,
    AppInfoBottomComponent,
    AppAlertsComponent,
    AppTarjetaPresentacionComponent,
    CCGrupalEspecificaComponent,
    NuevaCronicaComponent,
    CronicaGuardadaComponent,
    ConsultaComponent,
    HeaderMenuComponent,
    CardTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
