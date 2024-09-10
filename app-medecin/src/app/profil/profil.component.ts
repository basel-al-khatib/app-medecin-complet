import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../Services/authentification.service';
import { ProfilService } from '../Services/profil.service';
import { Medecin } from '../models/Medecin';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  medecin: Medecin | undefined;
  phone: string | undefined;
  email: string | undefined;
  address: string | undefined;
  qualification: string | undefined;

  constructor(
    private medecinService: ProfilService,
    private authService: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.medecinService.getMedecinById(userId).subscribe(
          medecin => {
            this.medecin = medecin;
            this.phone = this.medecin?.telecom?.find(t => t.system === 'phone')?.value;
            this.email = this.medecin?.telecom?.find(t => t.system === 'email')?.value;
            this.address = this.medecin?.address?.map(a => `${a.line.join(', ')}, ${a.city}, ${a.postalCode}, ${a.country}`).join(' ');
            this.qualification = this.medecin?.qualification?.[0]?.code.coding[0]?.display;
          },
          error => {
            console.error('Error fetching medecin details:', error);
          }
        );
      } else {
        console.error('User ID is null');
      }
    });
  }
}