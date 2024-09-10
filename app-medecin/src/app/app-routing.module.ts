import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Assure-toi que le chemin est correct
import { ListePatientsComponent } from './liste-patients/liste-patients.component';
import { LoginComponent } from './login/login.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ProfilComponent } from './profil/profil.component';
// Importez vos composants ici

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'patients', component: ListePatientsComponent, canActivate: [AuthGuard] },
  { path: 'profil/:id', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'patients/:id', component: PatientDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
