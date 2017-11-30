import { Injectable } from '@angular/core';
import { Nomina } from '../app.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class NominaService {

  constructor(private http: HttpClient) { }

  obtenerNominas(): Observable<Nomina[]> {
    return this.http.get<Nomina[]>(environment.urlNominas);
  }
}
