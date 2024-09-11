import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient';
import { Observation } from '../models/Observation';

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
  public addObservationImc(observationFront: Observation): Observable<any> {
    const observation = {
      resourceType: "Observation",
      status: "final",
      category: [{
        coding: [{
          system: "http://terminology.hl7.org/CodeSystem/observation-category",
          code: "vital-signs",
          display: "Vital Signs"
        }],
        text: "Vital Signs"
      }],
      code: {
        coding: [{
          system: "http://loinc.org",
          code: "39156-5",
          display: "Body mass index (BMI) [Ratio]"
        }],
        text: "BMI"
      },
      subject: {
        reference: "Patient/"+observationFront.idPatient  // Assurez-vous de mettre ici la référence correcte du patient
      },
      effectiveDateTime: observationFront.dateObservation,  // Date actuelle, ou celle que vous voulez
      valueQuantity: {
        value: observationFront.imc,
        unit: "kg/m2",
        system: "http://unitsofmeasure.org",
        code: "kg/m2"
      },
      derivedFrom: [{
        reference: "Observation/bodyheight",
        display: "Body Height"
      },
      {
        reference: "Observation/123test",
        display: "Body Weight"
      }]
    };
    return this.client.post<number>(this.hostObservation, observation);
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
