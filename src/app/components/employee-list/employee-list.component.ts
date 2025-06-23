import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  loadAllEmployees() {
    this.employeeService.getEmployees()
      .subscribe(response => this.employees = response);
  }

  viewEmployee(id: number): void {
    this.router.navigate(['/employees/view', id]);
  }

  editEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }
}
