import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  host = 'https://fhir.alliance4u.io/api/patient';
  hostObservation = 'https://fhir.alliance4u.io/api/observation';
  constructor(private client: HttpClient) {}

  public getPatients(): Observable<Patient[]> {
    return this.client.get<Patient[]>(this.host);
  }
  public getObservations(): Observable<any[]> {
    return this.client.get<any[]>(this.hostObservation);
  }


  public deletePatient(id: any): Observable<void> {
    return this.client.delete<void>(`${this.host}/${id}`);
  }


  getPatientById(id: string): Observable<Patient> {
    return this.client.get<Patient>(`${this.host}/${id}`);
  }

  getImageUrl(gender: string): string {
    if (gender == 'male') {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/User_icon-cp.png/724px-User_icon-cp.png';
    } else {
      return 'https://www.prolival.fr/wp-content/uploads/2018/06/user.png';
    }
  }
}
