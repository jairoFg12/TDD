import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroNominaComponent } from './filtro-nomina.component';
import { ElementRef } from '@angular/core';
import { NominaService } from '../services/nomina.service';
import { Nomina } from '../app.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClientTestingModule } from '@angular/common/http/testing';

declare var Sinco: any;

describe('FiltroNominaComponent', () => {
  let component: FiltroNominaComponent;
  let fixture: ComponentFixture<FiltroNominaComponent>;
  let servicio: NominaService;
  let espiaServicio: jasmine.Spy;
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


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroNominaComponent],
      providers: [
        NominaService
      ],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroNominaComponent);
    component = fixture.componentInstance;
    servicio = fixture.debugElement.injector.get(NominaService);
    espiaServicio = spyOn(servicio, 'obtenerNominas');
    espiaServicio.and.callFake(() => Observable.of(nominasEsperadas));
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Muestra una lista desplegable de las nominas con la libreria de s5', () => {
    let compile: any;
    let input: any;

    beforeEach(() => {
      compile = fixture.debugElement.nativeElement;
      input = compile.querySelector('input[type="text"]');
    });

    it('Debería mostrar un Input de tipo text', () => {
      expect(input).toBeTruthy();
    });

    it('Debería tener la propiedad "autocomplete" en off', () => {
      expect(input.autocomplete).toBe('off');
    });

    it('Debería el input estar representado en typescript como una variable "input"', () => {
      expect(component.input instanceof ElementRef).toBeTruthy();

    });

    it('Debería el componente en el evento init llamar al servicio de angular de "cargarNominas"', () => {
      component.ngOnInit();
      expect(servicio.obtenerNominas).toHaveBeenCalled();
    });

    // tslint:disable-next-line:max-line-length
    it('Debería asignar a la variable "dataSource" los objetos retornados por el servicio nominas en el método "obtenerNomina"', () => {
      expect(component.configuracion.dataSource).toEqual(nominasEsperadas);
    });
  });
  describe('Muestra un autocomplete para mostrar las nominas', () => {
    it('deberia retornar una instancia de s5 autocomplete', () => {
      expect(component.autocompletar instanceof Sinco.utilities.autocomplete).toBeTruthy();
    });
    it('Deberia validar los parametros de configuracion del autocomplete S5', () => {
      expect(component.configuracion.text).toBe('nombre');
      expect(component.configuracion.value).toBe('nombre');
      expect(component.configuracion.dataSource).toBe(nominasEsperadas);
      expect(component.configuracion.selectFirst).toBe(false);
      expect(component.configuracion.viewalldata).toBe(true);
      expect(component.configuracion.placeholder).toBe('-- Seleccione --');
      expect(typeof (component.configuracion.onselected)).toBe('function');
    });
  });


});

