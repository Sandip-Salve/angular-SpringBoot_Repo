import { Component, inject } from '@angular/core';
import { DashboardService } from '../../serviecs/dashboard.service';
import { Employee } from '../../types/Employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  emps:Employee[] = [];
  emp!:Employee;
  constructor(private router:Router){};
  dashboardService:DashboardService = inject(DashboardService);
  ngOnInit(){
    this.dashboardService.getEmps().subscribe((result)=>{
      this.emps = result as Employee[];
    });
  }

  getView(empId:number){
    console.log(empId);
    this.router.navigate(['/view',empId]);
  }

  getUpdate(empId:number,emp:Employee){
    this.router.navigate(['/update',empId]);
  }

  getDelete(empId:number){

  }

  goToAddEmployee(){
    this.router.navigate(['/add']);
  }
}
