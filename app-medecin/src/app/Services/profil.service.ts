import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from '../models/Medecin';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  host = 'https://fhir.alliance4u.io/api/practitioner';

  constructor(private client: HttpClient) {}


  getMedecinById(id: string): Observable<Medecin> {
    return this.client.get<Medecin>(`${this.host}/${id}`);
  }
}