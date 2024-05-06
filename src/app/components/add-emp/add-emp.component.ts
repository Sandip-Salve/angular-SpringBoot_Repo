import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Employee } from '../../types/Employee';
import { DashboardService } from './../../serviecs/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-emp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  
templateUrl: './add-emp.component.html',
  styleUrl: './add-emp.component.css',
})
export class AddEmpComponent {
  myForm!: FormGroup;
  empId:number = 0;
  exiEmployee!:Employee;
  constructor(private formBuilder: FormBuilder,
              private router:Router) {}
  dashBoardService = inject(DashboardService);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.empId = params['empId'];
      console.log(this.empId);
      if(typeof this.empId!=="undefined"){
        this.dashBoardService.getEmpById(this.empId).subscribe((result)=>{
          this.exiEmployee = result as Employee;
          console.log(this.exiEmployee);
          this.myForm = this.formBuilder.group({
            empId: [this.empId],
            empName: [
              this.exiEmployee?.empName,
              [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(25),
              ],
            ],
            empMailId: [this.exiEmployee?.empMailId, [Validators.required, Validators.email]],
            empJoiningDate: [this.exiEmployee?.empJoiningDate, Validators.required],
          });
        });
      }else{
        this.myForm = this.formBuilder.group({
          empId: [0],
          empName: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(25),
            ],
          ],
          empMailId: ['', [Validators.required, Validators.email]],
          empJoiningDate: [new Date(), Validators.required],
        });
      }
      
    });
    
  }

  save() {
    if (this.myForm.valid) {
      let emp: Employee = this.myForm.value as Employee;
      if(emp.empId===0){
        this.dashBoardService.saveEmp(emp).subscribe((result) => {
          console.log(`Newly saved, ${result as Employee}`);
        });
      }else{
        this.dashBoardService.updateEmp(emp.empId,emp).subscribe((result)=>{
          console.log(`Updated, ${result as Employee}`);
        });
      }
      this.router.navigate(['']);
    }
    throw new Error('Method not implemented.');
  }

  backToView(){
    this.router.navigate(['']);
  }

}
