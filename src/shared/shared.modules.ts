
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreCompletoPipe } from '../shared/pipe/nombre-completo.pipe';
import { TituloDirective } from '../shared/directive/titulo-directive';

@NgModule({
  declarations: [],
  imports: [CommonModule, NombreCompletoPipe, TituloDirective],
  exports: [],
})
export class SharedModule {}
