import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private readonly apiUrl = 'https://fhir.alliance4u.io/api/practitioner'; // URL de l'API externe
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserIdSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    // Utilisation des paramètres de requête pour la recherche
    const params = new HttpParams()
      .set('identifier.use', username)
      .set('identifier.value', password);

      
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {  
        console.log(response.entry);
              
        // Assumons que la réponse est un tableau d'objets médecin
        if (response) {
          const practitioner = response[0]
          if (practitioner && practitioner.id) {
            // Connexion réussie
            this.isAuthenticatedSubject.next(true);
            this.currentUserIdSubject.next(practitioner.id);
            this.router.navigate(['/patients']);
            return true;
          }

          console.log("test");
          
        }
        // Échec de la connexion
        this.isAuthenticatedSubject.next(false);
        return false;
      }),
      catchError(error => {
        console.error('Login error:', error);
        this.isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }


  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.currentUserIdSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUserId(): Observable<string | null> {
    return this.currentUserIdSubject.asObservable();
  }
}
