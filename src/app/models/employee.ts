export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  dob: string;
  departments: string;
  salary: number;
  manager?: Employee;
}