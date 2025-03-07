import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CursosState } from './cursos.reducer';

export const selectCursosState = createFeatureSelector<CursosState>('cursos');

export const selectCursos = createSelector(
  selectCursosState,
  (state: CursosState) => state.cursos
);

export const selectLoading = createSelector(
  selectCursosState,
  (state: CursosState) => state.loading
);

export const selectError = createSelector(
  selectCursosState,
  (state: CursosState) => state.error
);
