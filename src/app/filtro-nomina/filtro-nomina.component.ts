import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NominaService } from '../services/nomina.service';
import { Nomina, SincoAutocompleteOptions } from '../app.model';
declare var Sinco: any;

@Component({
  selector: 'app-filtro-nomina',
  templateUrl: './filtro-nomina.component.html'
})
export class FiltroNominaComponent implements OnInit {

  autocompletar: any;
  configuracion: SincoAutocompleteOptions = {
    value: 'nombre',
    text: 'nombre',
    dataSource: [],
    selectFirst: false,
    viewalldata: true,
    placeholder: '-- Seleccione --',
    onselected: (selectedItem: any) => { }
  };

  @ViewChild('inputAutocompletar') input: ElementRef;

  constructor(private nominaService: NominaService) { }

  ngOnInit() {
    this.nominaService.obtenerNominas().subscribe((nominas: Nomina[]) => {
      this.configuracion.dataSource = nominas;
      this.autocompletar = new Sinco.utilities.autocomplete(this.input.nativeElement, this.configuracion);
    });
  }
}
