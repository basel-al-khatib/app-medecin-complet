import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observation } from 'src/app/models/Observation';
import { Patient } from 'src/app/models/Patient';
import { PatientService } from 'src/app/Services/patient.service';
import { NutritionOrder } from 'src/app/models/NutritionOrder';
import { AuthentificationService } from 'src/app/Services/authentification.service';
import { ProfilService } from 'src/app/Services/profil.service';
import { Medecin } from 'src/app/models/Medecin';


@Component({
  selector: 'app-pop-up-programme-nutri',
  templateUrl: './pop-up-programme-nutri.component.html',
  styleUrls: ['./pop-up-programme-nutri.component.css']
})
export class PopUpProgrammeNutriComponent implements OnInit {

  recommendations: string="";

  patient: Patient;
  patientObservation: Observation;
  medecin: Medecin;

  imc: number = 0;
  imcStatus: string = '';
  poids: number = 0;
  taille: number = 0;
  age: number;
  id: string;

  patientReference: string = '';
  dateTime: string = '';
  ordererReference: string = '';
  dietPreference: string = '';
  dietType: string = '';
  dietTypeDescription: string = '';
  frequency: string = '';
  duration: string = '';
  instructions: string[] = [];
  nutrients: any[] = [];
  supplements: any[] = [];
  forbiddenFoods: string[] = [];
  obs: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string; patient: Patient; 
    dernierImc: number; patientObservation: Observation; age: number},
    public patientService: PatientService,
    private authService: AuthentificationService,
    private medecinService: ProfilService)
    {}
    
  ngOnInit(): void {
    this.patientObservation= this.data.patientObservation;
    
    this.patient = this.data.patient;
    this.imc = this.data.dernierImc;
    this.age = this.data.age;
    this.id = this.data.patientObservation.idPatient;
    this.patientReference = this.patient.id;
    this.dateTime = this.formatDateToInputValue(new Date());

    

    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.medecinService.getMedecinById(userId).subscribe(
          medecin => {
            this.medecin = medecin;
            console.log(medecin);
            this.ordererReference = this.medecin.id;
            
          },
          error => {
            console.error('Error fetching medecin details:', error);
          }
        )}
      })
      console.log(this.medecin);
  }

  envoyerImc(){
    this.patientService.addObservationImc(this.patientObservation).subscribe(obs =>{
      console.log(obs)
    });
  }

  formatDateToInputValue(date: Date): string {
    const isoString = date.toISOString(); // '2024-09-11T14:52:09.000Z'
    // return isoString.slice(0, 16); // '2024-09-11T14:52' (formatted correctly)

    return "2014-09-17";
  }

  public envoyerProgramme() {
    const nutritionOrderData: NutritionOrder = {
      patientReference: this.patientReference,
      dateTime: this.dateTime,
      ordererReference: this.ordererReference,
      dietPreference: this.dietPreference,
      dietType: this.dietType,
      dietTypeDescription: this.dietTypeDescription,
      frequency: this.frequency,
      duration: this.duration,
      instructions: this.instructions,
      nutrients: this.nutrients,
      supplements: this.supplements,
      forbiddenFoods: this.forbiddenFoods
    };
    console.log(nutritionOrderData);

    this.patientService.addNutritionOrder(nutritionOrderData).subscribe(
      response => {
        console.log('Programme nutritionnel envoyé avec succès', response);
        alert('Programme nutritionnel envoyé avec succès');
        console.log(nutritionOrderData);
      },
      error => {
        console.error('Erreur lors de l\'envoi du programme nutritionnel', error);
        alert('Erreur lors de l\'envoi du programme nutritionnel');
      }
    );
  }
}
