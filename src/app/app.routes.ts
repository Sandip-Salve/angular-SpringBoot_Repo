import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmpEditComponent } from './components/emp-edit/emp-edit.component';
import { AddEmpComponent } from './components/add-emp/add-emp.component';
import { EmpUpdateComponent } from './components/emp-update/emp-update.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path: 'view/:empId',
        component: EmpEditComponent
    },
    {
        path: 'add',
        component: AddEmpComponent
    },
    {
        path:'update/:empId',
        component: AddEmpComponent
    }
];
