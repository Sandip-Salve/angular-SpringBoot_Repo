import { Component, inject } from '@angular/core';
import { DashboardService } from '../../serviecs/dashboard.service';
import { Employee } from '../../types/Employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-emp-edit',
  standalone: true,
  imports: [],
  templateUrl: './emp-edit.component.html',
  styleUrl: './emp-edit.component.css',
})
export class EmpEditComponent {
  empId: number = 1;
  emp!: Employee;
  constructor(private route: ActivatedRoute) {}
  router = inject(Router);
  dashBoardService = inject(DashboardService);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.empId = params['empId'];
      console.log('ID=' + this.empId);
      this.dashBoardService.getEmpById(this.empId).subscribe((result) => {
        this.emp = result as Employee;
        console.log(this.emp);
      });
    });
  }

  backToView(){
    this.router.navigate(['']);
  }
}
