import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  managers: Employee[] = [];
  departments = ['Admin', 'IT', 'HR', 'Sales'];
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) {
      this.form = this.fb.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      departments: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      managerId: ['']
    });
  }

  ngOnInit(): void {
    this.employeeService.getEmployees()
      .subscribe(response => this.managers = response);

    const routeParams = this.route.snapshot.paramMap;
    const employeeId = routeParams.get('employeeId')!;

    if (employeeId) {
      this.isEdit = true;
      this.employeeService.viewEmployee(+employeeId)
        .subscribe({
          next: (emp) => {
            this.form.patchValue({
              id: emp.id,
              firstName: emp.firstName,
              lastName: emp.lastName,
              dob: emp.dob,
              departments: emp.departments,
              salary: emp.salary,
              managerId: emp.manager?.id || ''
            });
          },
          error: (err) => {
            console.error('Error fetching employee:', err);
          }
        });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const employee: Employee = {
        ...this.form.value,
        manager: this.form.value.managerId ? { id: +this.form.value.managerId } : undefined
      };
      const request = this.isEdit
        ? this.employeeService.updateEmployee(employee)
        : this.employeeService.addEmployee(employee);

      request.subscribe(() => this.router.navigate(['/employees']));
    }
  }

}
