import { HttpClientModule } from '@angular/common/http'; // <-- Importez HttpClientModule ici
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'; // Input Material Module
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import nécessaire pour Angular Material
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'; // <-- Importez AppRoutingModule ici
import { AppComponent } from './app.component';
import { ListePatientsComponent } from './liste-patients/liste-patients.component';
import { LoginComponent } from './login/login.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { ProfilComponent } from './profil/profil.component';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import { PopUpProgrammeNutriComponent } from './patient-details/pop-up-programme-nutri/pop-up-programme-nutri.component';
@NgModule({
  declarations: [
    AppComponent,
    ListePatientsComponent,
    PatientDetailsComponent,
    LoginComponent,
    ProfilComponent,
    PopUpProgrammeNutriComponent,
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule, 
    MatButtonModule, 
    HttpClientModule,
    RouterModule,
    AppRoutingModule ,
    MatSortModule,
    MatPaginatorModule,  // <-- Ajoutez ceci ici
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule, // Ajoutez ReactiveFormsModule ici
    BrowserAnimationsModule, // Nécessaire pour Angular Material
    MatInputModule, // Ajoutez les modules Angular Material ici
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ButtonModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
