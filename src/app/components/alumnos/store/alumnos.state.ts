import { Alumno } from '../../../../shared/interfaces/alumno';
import { EntityState, createEntityAdapter } from "@ngrx/entity";

export interface AlumnosState extends EntityState<Alumno> {
    loading: boolean;
    error: string | null;
}

export const alumnosAdapter = createEntityAdapter<Alumno>();

export const initialState: AlumnosState = alumnosAdapter.getInitialState({
    loading: false,
    error: null
});
