import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {
  employee?: Employee;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const empId = this.route.snapshot.paramMap.get('employeeId');
    console.log("empId from request param: " + empId);
    if (empId) {
      this.employeeService.viewEmployee(+empId)
      .subscribe({
        next: (emp) => {
          this.employee = emp as Employee;
          console.log("empId: " + this.employee.id);
        },
        error: (err) => {
          console.error('Error fetching employee:', err);
          this.router.navigate(['/employees']);
        }
      });
    }
  }
}
