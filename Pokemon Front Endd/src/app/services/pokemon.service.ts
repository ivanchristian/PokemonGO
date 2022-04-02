import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../model/pokemon.model';

const apiUrl = 'http://localhost:8080/api/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPokemons(index: any) {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }

  getAll(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(apiUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${apiUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(apiUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${apiUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${apiUrl}/${id}`);
  }

}
