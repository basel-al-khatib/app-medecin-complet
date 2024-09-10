import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '../models/Patient';
import { PatientService } from '../Services/patient.service';

@Component({
  selector: 'app-liste-patients',
  templateUrl: './liste-patients.component.html',
  styleUrls: ['./liste-patients.component.css']
})
export class ListePatientsComponent implements OnInit {
  displayedColumns: string[] = ['number', 'image','nom', 'age', 'genre', 'contact', 'action'];
  dataSource: MatTableDataSource<Patient>;
  patients?: Patient[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchText?: string = '';

  constructor(private PatientService: PatientService) {}

  ngOnInit(): void {
    this.PatientService.getPatients().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  
        // Define custom filter logic for patient name
        this.dataSource.filterPredicate = (data: Patient, filter: string) => {
          const name = (data.name[0]?.family || '') + ' ' + (data.name[0]?.given?.join(' ') || '');
          return name.trim().toLowerCase().includes(filter.trim().toLowerCase());
        };
      },
      error => {
        console.error('Error fetching patients', error);
      }
    );
  }

  getAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const ageDifMs = Date.now() - birth.getTime();
    const ageDate = new Date(ageDifMs); // milisecondes depuis 1970
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  removePatient(patient: Patient): void {
    // Implémente la logique pour supprimer un patient
    console.log('Remove patient', patient.id);
  }

  
  getImageUrl(gender: string): string {
    if (gender == 'male') {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/User_icon-cp.png/724px-User_icon-cp.png';
    } else {
      return 'https://www.prolival.fr/wp-content/uploads/2018/06/user.png';
    }
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}