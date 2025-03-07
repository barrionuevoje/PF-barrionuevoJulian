import { createReducer, on } from '@ngrx/store';
import * as CursosActions from './cursos.actions';

export interface CursosState {
  cursos: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: CursosState = {
  cursos: [],
  loading: false,
  error: null,
};

export const cursosReducer = createReducer(
  initialState,
  on(CursosActions.cargarCursos, state => ({
    ...state,
    loading: true
  })),
  on(CursosActions.cargarCursosExito, (state, { cursos }) => ({
    ...state,
    loading: false,
    cursos
  })),
  on(CursosActions.cargarCursosError, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CursosActions.agregarCurso, (state, { curso }) => ({
    ...state,
    cursos: [...state.cursos, curso]
  })),
  on(CursosActions.editarCurso, (state, { curso }) => ({
    ...state,
    cursos: state.cursos.map(c => (c.id === curso.id ? curso : c))
  })),
  on(CursosActions.eliminarCurso, (state, { id }) => ({
    ...state,
    cursos: state.cursos.filter(curso => curso.id !== id)
  }))
);
