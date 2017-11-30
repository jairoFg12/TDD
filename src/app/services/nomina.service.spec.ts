import { TestBed, inject } from '@angular/core/testing';

import { NominaService } from './nomina.service';
import { Observable } from 'rxjs/Observable';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Nomina } from '../app.model';

describe('NominaService', () => {
  const nominasEsperadas: Nomina[] = [
    {
      codigo: 'SNC',
      nombre: 'Sinco mensual'
    },
    {
      codigo: 'SNC_Q',
      nombre: 'Sinco quincenal'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ NominaService ],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([NominaService], (service: NominaService) => {
    expect(service).toBeTruthy();
  }));

  it('Debería el método "obtenerNominas" retonar un Observable',
    inject([NominaService], (service: NominaService) => {
      expect(service.obtenerNominas() instanceof Observable).toBeTruthy();
    }));

  it('Debería hacer una peticion get a la URL almacenada en environment llamada urlNominas',
    inject([NominaService, HttpTestingController], (service: NominaService, httpMock: HttpTestingController) => {
      let nominasActuales: Nomina[];
      service.obtenerNominas().subscribe((nominas: Nomina[]) => {
        nominasActuales = nominas;
      });

      httpMock.expectOne(environment.urlNominas).flush(nominasEsperadas);

      expect(nominasActuales).toEqual(nominasEsperadas);
    }));

});
