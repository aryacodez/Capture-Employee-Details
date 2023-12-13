import { Component, Inject, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule,MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { DialogRef } from '@angular/cdk/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],   
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup;

  constructor(private _fb: FormBuilder, private _empService:EmployeesService, private _dialogRef: MatDialogRef<EmpAddEditComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private _coreService: CoreService){
    this.empForm = this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      cname:''
    })
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any)=>{
            this._coreService.openSnackBar('Employee updated Successfully','done');
            this._dialogRef.close(true);
          },
          error:(e: any)=>{
            console.error(e);
          }
        })
      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any)=>{
            this._coreService.openSnackBar('Employee added Successfully','done');
            this._dialogRef.close(true);
          },
          error:(e: any)=>{
            console.error(e);
          }
        })
      }      
    }
  }
}
