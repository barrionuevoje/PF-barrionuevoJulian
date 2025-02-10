import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';
import { ListaAlumnosComponent } from './components/alumnos/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './components/alumnos/abm-alumnos/abm-alumnos.component';
import { MatTableModule } from '@angular/material/table'; // Importa MatTableModule
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NombreCompletoPipe } from '../shared/pipe/nombre-completo.pipe';
import { CursosModule } from './features/cursos/cursos.module';
import { MatIconModule } from '@angular/material/icon';  // Agrega esta línea


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToolbarComponent,
    
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    NombreCompletoPipe,
    AppRoutingModule,
    AbmAlumnosComponent,
    ListaAlumnosComponent,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    CommonModule,
    RouterModule,
    CursosModule
    
  ],
  exports: [NavbarComponent, ToolbarComponent],
  providers: [
    provideAnimationsAsync('noop'),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
