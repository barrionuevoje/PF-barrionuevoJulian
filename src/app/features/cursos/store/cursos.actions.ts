import { createAction, props } from '@ngrx/store';

export const cargarCursos = createAction('[Cursos] Cargar Cursos');

export const cargarCursosExito = createAction(
  '[Cursos] Cargar Cursos Exito',
  props<{ cursos: any[] }>()
);

export const cargarCursosError = createAction(
  '[Cursos] Cargar Cursos Error',
  props<{ error: string }>()
);

export const agregarCurso = createAction(
  '[Cursos] Agregar Curso',
  props<{ curso: any }>()
);

export const editarCurso = createAction(
  '[Cursos] Editar Curso',
  props<{ curso: any }>()
);

export const eliminarCurso = createAction(
  '[Cursos] Eliminar Curso',
  props<{ id: number }>()
);
