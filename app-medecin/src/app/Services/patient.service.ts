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
  hostNutritionOrdre = 'https://fhir.alliance4u.io/api/nutrition-order';
  constructor(private client: HttpClient) { }

  public getPatients(): Observable<Patient[]> {
    return this.client.get<Patient[]>(this.host);
  }
  public getObservations(): Observable<any[]> {
    return this.client.get<any[]>(this.hostObservation);
  }
 /* public addObservationImc(observationFront: Observation): Observable<any> {
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
  }*/


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
        reference: "Patient/" + observationFront.idPatient  // Assurez-vous de mettre ici la référence correcte du patient
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

  public addNutritionOrder(nutritionOrderData: any): Observable<any> {
    const nutritionOrder = {
      "resourceType": "NutritionOrder",
      //text: "Nutrition",
      subject: {
        reference: "NutritionOrder/" + nutritionOrderData.patientReference  // Assurez-vous de mettre ici la référence correcte du patient
      },
      "dateTime": ""+ nutritionOrderData.dateTime,
      orderer: {
        reference: "Practitioner/" + nutritionOrderData.ordererReference,
      },dietPreference: {
        text: nutritionOrderData.dietPreference,
      },
      oralDiet: {
        type: [
          {
            text: nutritionOrderData.dietType,
          },
        ],
        schedule: [
          {
            repeat: {
              frequency: isNaN(Number(nutritionOrderData.frequency)) ? 1 : Number(nutritionOrderData.frequency), // Ensure frequency is a valid number
              duration: isNaN(Number(nutritionOrderData.duration)) ? 1 : Number(nutritionOrderData.duration), // Ensure duration is a valid number
              durationUnit: "day", // Example unit; adjust as needed
            },
          },
        ],
        instruction: nutritionOrderData.instructions || "",
      },
      nutrient: Array.isArray(nutritionOrderData.nutrients) // Check if nutrients is an array
      ? nutritionOrderData.nutrients.map((nutrient: any) => ({
          modifier: {
            code: nutrient.code,
            amount: nutrient.amount,
          },
        }))
      : [],
      supplement: Array.isArray(nutritionOrderData.supplements) // Check if supplements is an array
      ? nutritionOrderData.supplements.map((supplement: any) => ({
          productName: supplement.productName,
          quantity: supplement.quantity,
        }))
        : [],
        excludedFoodModifier: Array.isArray(nutritionOrderData.forbiddenFoods) // Check if forbiddenFoods is an array
        ? nutritionOrderData.forbiddenFoods.map((food: string) => ({
            text: food,
          }))
        : [],
    }

    /*resourceType: 'NutritionOrder',
    patient: {
      reference: "Patient/" + nutritionOrderData.patientReference,
    },
    dateTime: nutritionOrderData.dateTime,
    orderer: {
      reference: "Practitioner/" + nutritionOrderData.ordererReference,
    },
    dietPreference: {
      text: nutritionOrderData.dietPreference,
    },
    oralDiet: {
      type: [
        {
          text: nutritionOrderData.dietType,
        },
      ],
      schedule: [
        {
          repeat: {
            frequency: isNaN(Number(nutritionOrderData.frequency)) ? 1 : Number(nutritionOrderData.frequency), // Ensure frequency is a valid number
            duration: isNaN(Number(nutritionOrderData.duration)) ? 1 : Number(nutritionOrderData.duration), // Ensure duration is a valid number
            durationUnit: "day", // Example unit; adjust as needed
          },
        },
      ],
      instruction: nutritionOrderData.instructions || [],
    },
    nutrient: Array.isArray(nutritionOrderData.nutrients) // Check if nutrients is an array
    ? nutritionOrderData.nutrients.map((nutrient: any) => ({
        modifier: {
          code: nutrient.code,
          amount: nutrient.amount,
        },
      }))
    : [],
    supplement: Array.isArray(nutritionOrderData.supplements) // Check if supplements is an array
    ? nutritionOrderData.supplements.map((supplement: any) => ({
        productName: supplement.productName,
        quantity: supplement.quantity,
      }))
      : [],
      excludedFoodModifier: Array.isArray(nutritionOrderData.forbiddenFoods) // Check if forbiddenFoods is an array
      ? nutritionOrderData.forbiddenFoods.map((food: string) => ({
          text: food,
        }))
      : [],
  };*/



    return this.client.post(this.hostNutritionOrdre, nutritionOrder);
  }
}
