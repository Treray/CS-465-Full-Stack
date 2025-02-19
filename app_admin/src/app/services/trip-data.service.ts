import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`);
  }

  getTrip(tripId: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trips/${tripId}`, this.getAuthHeaders());
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.baseUrl}/trips`, trip, this.getAuthHeaders());
  }

  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/trips/${trip._id}`, trip, this.getAuthHeaders());
  }

  deleteTrip(tripId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/trips/${tripId}`, this.getAuthHeaders());
  }

  login(user: User, password: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, password);
  }

  register(user: User, password: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, password);
  }

  private handleAuthAPICall(endpoint: string, user: User, password: string): Observable<AuthResponse> {
    const formData = { name: user.name, email: user.email, password };
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }

  private getAuthHeaders() {
    const token = this.storage.getItem('travlr-token');
    return {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    };
  }
}
