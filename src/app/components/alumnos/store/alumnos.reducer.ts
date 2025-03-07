import { createReducer, on } from "@ngrx/store";
import * as AlumnosActions from "./alumnos.actions";
import { alumnosAdapter, initialState } from "./alumnos.state";

export const alumnosReducer = createReducer(
    initialState,
    on(AlumnosActions.cargarAlumnos, (state) => ({ ...state, loading: true })),
    on(AlumnosActions.cargarAlumnosSuccess, (state, { alumnos }) => 
        alumnosAdapter.setAll(alumnos, { ...state, loading: false, error: null })
    ),
    on(AlumnosActions.cargarAlumnosError, (state, { error }) => ({ ...state, loading: false, error }))
);
