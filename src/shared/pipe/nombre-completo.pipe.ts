import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {
  transform(value: any): string {
    return `${value.nombre} ${value.apellido}`;
  }
}
