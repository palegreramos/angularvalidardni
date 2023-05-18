import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './model/usuarios';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url: string = 'http://localhost/apps/leerescribirphp/server/';
  constructor(private http: HttpClient) {}
  getDatos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}leer.php`);
  }

  postDato(nuevo: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}insertar.php`, nuevo);
  }
}
