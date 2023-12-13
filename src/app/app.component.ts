import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeesService } from './services/employees.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CoreService } from './core/core.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
})
export class AppComponent implements OnInit{
  title = 'crud-app-2';
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','cname','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog:MatDialog, 
    private _empService: EmployeesService,
    private _coreService: CoreService
    ){}

  ngOnInit(): void {
      this.getEmployeeList();
  }
  AddandEditForm(){
    const dialogRef = this.dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList(){
    this._empService.getEmployee().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);      
      },
      error:(e)=>{
        console.error(e)
      }
    })
  }

  deleteEmployee(id: number){
    this._empService.deleteEmployee(id).subscribe({
      next:(res)=>{
        // alert('Employee Deleted Successfully');
        this._coreService.openSnackBar('Employee Deleted Successfully','done')
        this.getEmployeeList();
      },
      error: console.log,
    })
  }

  editForm(data:any){
    const dialogRef = this.dialog.open(EmpAddEditComponent,{
      data
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
