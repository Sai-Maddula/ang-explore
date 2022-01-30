import { Injectable } from '@angular/core';
import { Doctor } from '../curewell-interfaces/doctor';
import { DoctorSpecialization } from '../curewell-interfaces/doctorspecialization';
import { Specialization } from '../curewell-interfaces/specialization';
import { Surgery } from '../curewell-interfaces/surgery';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurewellService {

  doctorList!: Doctor[];
  surgeryList!: Surgery[];
  specializationList!: Specialization[];
  doctorSpecializationList!: DoctorSpecialization[];
  apiEndPointBase = "http://localhost:50476/api/CureWell"

  constructor(private http: HttpClient) { }
  
  //GetDoctor
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiEndPointBase}/GetDoctors`)
  }

  //GetSpecialization
  getAllSpecializations(): Observable<Specialization[]> {
   //To do implement necessary logic
    return null as any;
  }

  //GetSurgeries
  getAllSurgeriesForToday(): Observable<Surgery[]> {
    //To do implement necessary logic
   return this.http.get<Surgery[]>(`${this.apiEndPointBase}/GetAllSurgeryTypeForToday`)
    
  }

  //AddDoctor
  addDoctor(doctorName: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiEndPointBase}/AddDoctor`,{doctorName})
  }

  //EditDoctor
  editDoctorDetails(doctorId: number, doctorName: string): Observable<boolean> {
    //To do implement necessary logic
    return this.http.put<boolean>(`${this.apiEndPointBase}/UpdateDoctorDetails`,{doctorId,doctorName})
  }

  //editSurgery
  editSurgery(doctorId: number, endTime: number, startTime: number, surgeryCategory: string, surgeryDate: Date, surgeryId: number): Observable<boolean> {
    //To do implement necessary logic
    return null as any;
  }

  //RemoveDoctor
  deleteDoctor(doctor: Doctor) {
    //To do implement necessary logic
    return this.http.delete(`${this.apiEndPointBase}/DeleteDoctor`, {body:doctor})
    
  }

  //ErrorHandler
  errorHandler(error: HttpErrorResponse) {
    //To do implement necessary logic
    return throwError(error.message || 'ERROR')

  }

}
