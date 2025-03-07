import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { AlumnosService } from "../../../services/alumnos.service";
import * as AlumnosActions from "./alumnos.actions";

@Injectable()
export class AlumnosEffects {
    constructor(private actions$: Actions, private alumnosService: AlumnosService) {}

    cargarAlumnos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlumnosActions.cargarAlumnos),
            mergeMap(() =>
                this.alumnosService.getAlumnos().pipe(
                    map(alumnos => AlumnosActions.cargarAlumnosSuccess({ alumnos })),
                    catchError(error => of(AlumnosActions.cargarAlumnosError({ error: error.message })))
                )
            )
        )
    );
}
