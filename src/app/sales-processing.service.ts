import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Sales, Receipt } from './sales.model';

@Injectable({
  providedIn: 'root'
})
export class SalesProcessingService {
  private apiUrl = 'http://localhost:5000/api/data';
  private testUrl = 'https://career.netizenexperience.com/api/resume';

  constructor(
    private http: HttpClient
    ) { }
  
    processData(data: Sales[], data2: Receipt[]): Observable<any[]> {
      const dataArray = {
        array1: data,
        array2: data2
      };
      return this.http.post<any[]>(this.apiUrl, dataArray ).pipe(
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      );;
    }

    getData(): Observable<any> {
      return this.http.get<any>(this.apiUrl);
    }
}
