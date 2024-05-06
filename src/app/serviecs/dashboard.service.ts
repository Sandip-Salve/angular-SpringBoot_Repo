import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './../types/Employee';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(private httpClient:HttpClient) { }

    domain:string = 'http://localhost:8090/employee';
   getEmps():Observable<Employee[]>{
      return this.httpClient.get<Employee[]>(`${this.domain}/getEmpList`);
   }

   getEmpById(empId:number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.domain}/${empId}`);
   }

   saveEmp(emp:Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.domain}/add`,emp);
   }

   updateEmp(empId:number,emp:Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.domain}/update/${empId}`,emp);
   }
   
}
