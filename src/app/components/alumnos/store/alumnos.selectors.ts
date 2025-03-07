import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AlumnosState, alumnosAdapter } from "./alumnos.state";

export const selectAlumnosState = createFeatureSelector<AlumnosState>("alumnos");

export const { selectAll: selectAllAlumnos } = alumnosAdapter.getSelectors(selectAlumnosState);
export const selectAlumnosLoading = createSelector(selectAlumnosState, (state) => state.loading);
export const selectAlumnosError = createSelector(selectAlumnosState, (state) => state.error);
