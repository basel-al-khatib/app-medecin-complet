import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../Services/patient.service';
import { Patient } from '../models/Patient';
import { MatTableDataSource } from '@angular/material/table';
import{Observation} from '../models/Observation';


import { MatDialog } from '@angular/material/dialog';
import { PopUpProgrammeNutriComponent } from './pop-up-programme-nutri/pop-up-programme-nutri.component';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  productID: string | null = null;
  patientData: Patient | undefined;
  displayedColumns: string[] = ['number', 'dateObservation','taille','pois', 'imc', 'programmeNutritionnel'];
  patientDataTable: Patient [] = []
  patientObservations: Observation [] = [];
  dernierImc: number;
  age : number;
  copiePatientObservation: Observation;
  minImc: number;
  maxImc: number;

  

  dataSource: MatTableDataSource<Observation>;
  dates: Date [] = [];
  valeursImc: number [] = [];
  constructor(
    public ar: ActivatedRoute,
    public patientService: PatientService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.productID = this.ar.snapshot.paramMap.get('id');

    this.patientService.getObservations().subscribe(obs => {
      // Filtrer les observations pour trouver celles qui correspondent au patient en fonction de l'ID
      const patientObservations = obs.filter(observation => observation.subject != null && observation.subject.reference == "Patient/" + this.productID);
      
      // Créez un tableau pour stocker les observations du patient
      const updatedObservations: Observation[] = [];
      
      patientObservations.forEach(observation => {
        const unit = observation.valueQuantity?.unit; // Unité (kg par exemple)
        const dateObservation = new Date(observation.effectiveDateTime);
    
        // Trouvez ou créez l'objet patientObservation pour cette date
        let patientObservation = updatedObservations.find(obs => obs.dateObservation.getTime() == dateObservation.getTime());
        if (!patientObservation) {
          patientObservation = new Observation();
          patientObservation.dateObservation = dateObservation;
          patientObservation.idPatient = this.productID;
          updatedObservations.push(patientObservation);
        }
        // Mettez à jour le poids et la taille
        if (unit == "kg") {
          patientObservation.poids = observation.valueQuantity?.value;
        }
    
        if (unit == "cm") {
          patientObservation.taille = observation.valueQuantity?.value ; // Conversion en mètres
        }
    
        // Recalculer l'IMC si le poids et la taille sont définis
        if (patientObservation.poids && patientObservation.taille) {
          patientObservation.imc = (patientObservation.poids / (patientObservation.taille * patientObservation.taille))*10000;
          patientObservation.imc = parseFloat(patientObservation.imc.toFixed(3));
        }


        patientObservation.idPatient = this.productID;
        this.copiePatientObservation = { ...patientObservation };
        console.log(this.copiePatientObservation);
        console.log(patientObservation);
        
        
        this.patientObservations = updatedObservations.filter(obs => obs.poids && obs.taille)
      });
    
      
      let dernierImc: number | undefined = patientObservations.length > 0 
  ? patientObservations[patientObservations.length - 1].imc 
  : undefined;
  dernierImc= this.dernierImc;
  updatedObservations.filter(obs => obs.poids && obs.taille).forEach(obs => {
    this.dates.push(obs.dateObservation);
    this.valeursImc.push(obs.imc);
  })
  this.minImc = Math.min(...this.valeursImc);
  this.maxImc = Math.max(...this.valeursImc);
      // Mettre à jour le dataSource avec les nouvelles observations
      this.dataSource = new MatTableDataSource(updatedObservations.filter(obs => obs.poids && obs.taille));
    });
    
   
    
    if (this.productID) {
    
      this.patientService.getPatientById(this.productID).subscribe(
        (data: Patient) => {
          
          this.patientData = data;
        this.patientDataTable.push(data)

        },
        (error) => {
          console.error('Erreur lors de la récupération des données:', error);
        }
      );
    }
  }
  getImageUrl(gender: string): string {
    if (gender == 'male') {
      return 'https://img.freepik.com/vecteurs-premium/profil-avatar-homme-icone-ronde_24640-14044.jpg';
    } else {
      return 'https://www.prolival.fr/wp-content/uploads/2018/06/user.png';
    }
  }
  getAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const ageDifMs = Date.now() - birth.getTime();
    const ageDate = new Date(ageDifMs); // milisecondes depuis 1970
    this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return this.age;
  }

  openFormulaire() {
    
    this.dialog.open(PopUpProgrammeNutriComponent, {
      width: '90%',
      height: '70%',
      data: { message: 'Compte rendu',
              patient: this.patientData,
              patientObservation: this.copiePatientObservation,
              dernierImc: this.dernierImc,
              age: this.age,
       }
    });
  }
  envoyerImc(observation: Observation){
    
    this.patientService.addObservationImc(observation).subscribe(test => {
      console.log(test);
    });
  }
  

}