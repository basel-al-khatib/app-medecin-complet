import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './Services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-medecin';
  isLoggedIn$: Observable<boolean>;
  currentUserId$: Observable<string | null>;
  userId:any;
  constructor(private authService: AuthentificationService, private router: Router) {}

  
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.currentUserId$ = this.authService.getCurrentUserId();
    console.log(this.currentUserId$);

    this.currentUserId$.subscribe(userId => {
      this.userId= userId;
      console.log('ID de l\'utilisateur actuel:', userId); // Debug log
    });
    
  }
  
  logout() {
    this.authService.logout(); // Déconnecte l'utilisateur
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
}
