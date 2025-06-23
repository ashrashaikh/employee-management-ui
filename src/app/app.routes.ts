import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeViewComponent } from './components/employee-view/employee-view.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/employees',
        pathMatch: 'full'
    },
    {
        path: 'employees',
        component: EmployeeListComponent
    },
    {
        path: 'employees/add',
        component: EmployeeFormComponent
    },
    {
        path: 'employees/edit/:employeeId',
        component: EmployeeFormComponent
    },
    {
        path: 'employees/view/:employeeId',
        component: EmployeeViewComponent
    },
];
