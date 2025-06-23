import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/list`);
  }

  addEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/add`, emp);
  }

  viewEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/view/${id}`);
  }

  updateEmployee(emp: Employee): Observable<Employee> {
    const empId = emp?.id;
    return this.http.put<Employee>(`${this.apiUrl}/update/${empId}`, emp);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // getManagers(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(`${this.apiUrl}/managers`);
  // }
}
