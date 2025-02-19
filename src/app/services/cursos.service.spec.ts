import { TestBed } from '@angular/core/testing';
import { CursosService } from './cursos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CursosService', () => {
  let service: CursosService;
  let httpMock: HttpTestingController;

  const dummyCursos = [
    { id: 1, nombre: 'Matemáticas', descripcion: 'Curso de matemáticas' },
    { id: 2, nombre: 'Historia', descripcion: 'Curso de historia' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CursosService]
    });

    service = TestBed.inject(CursosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cursos', () => {
    service.getCursos().subscribe(cursos => {
      expect(cursos.length).toBe(2);
      expect(cursos).toEqual(dummyCursos);
    });

    const req = httpMock.expectOne('http://localhost:3000/cursos');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCursos);
  });

  it('should add a new curso', () => {
    const nuevoCurso = { nombre: 'Física', descripcion: 'Curso de física' };

    service.agregarCurso(nuevoCurso).subscribe(curso => {
      expect(curso).toEqual({ id: 3, ...nuevoCurso });
    });

    const req = httpMock.expectOne('http://localhost:3000/cursos');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 3, ...nuevoCurso });
  });

  it('should delete a curso', () => {
    const idCursoAEliminar = 1;
    
    // Llamamos al método de eliminar
    service.eliminarCurso(idCursoAEliminar).subscribe(response => {
      expect(response).toEqual({});  // Esperamos una respuesta vacía en forma de objeto
    });
  
    // Verificamos la llamada HTTP
    const req = httpMock.expectOne(`http://localhost:3000/cursos/${idCursoAEliminar}`);
    expect(req.request.method).toBe('DELETE');
  
    // Simulamos la respuesta vacía en la API (puede ser `{}` o `null`, depende de tu backend)
    req.flush({});
  });
  

  afterEach(() => {
    httpMock.verify();
  });
});
