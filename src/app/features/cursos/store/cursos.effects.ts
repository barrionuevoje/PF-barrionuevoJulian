import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';  // Importa createEffect desde @ngrx/effects
import { CursosService } from '../../../services/cursos.service';
import * as CursosActions from './cursos.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CursosEffects {
  constructor(
    private actions$: Actions,
    private cursosService: CursosService
  ) {}

  cargarCursos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.cargarCursos),
      mergeMap(() =>
        this.cursosService.getCursos().pipe(
          map(cursos => CursosActions.cargarCursosExito({ cursos })),
          catchError(error => of(CursosActions.cargarCursosError({ error })))
        )
      )
    )
  );

  agregarCurso$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.agregarCurso),
      mergeMap(action =>
        this.cursosService.agregarCurso(action.curso).pipe(
          map(() => CursosActions.cargarCursos()),
          catchError(error => of(CursosActions.cargarCursosError({ error })))
        )
      )
    )
  );
}
