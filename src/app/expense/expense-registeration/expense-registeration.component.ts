import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { expense } from '../../models/expense';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CategoryService } from '../../services/category.service';
import { categoryViewModel } from '../../viewModels/categoryViewModel';
import { User } from '../../models/user';


@Component({
  selector: 'app-expense-registeration',
  templateUrl: './expense-registeration.component.html',
  styleUrls: ['./expense-registeration.component.css']
})

export class ExpenseRegisterationComponent implements OnInit {
  expenseList: expense[];
  angForm: FormGroup;

  StartTime: Date;
  EndTime: Date;
  diff: any;
  seconds: any;
  loading = false;
  submitted = false;
  Categories: categoryViewModel[];
  loggedInUser: any;

  constructor(
    public toastr: ToastrManager,
    private toastaService: ToastaService, private toastaConfig: ToastaConfig,
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExpenseRegisterationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.createForm();
    this.toastaConfig.theme = 'material';
  }

  showSuccess() {
    this.toastr.successToastr('Express entry has been added.', 'Success!');
  }

  showError() {
    this.toastr.errorToastr('This is error toast.', 'Oops!');
  }

  showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  showInfo() {
    this.toastr.infoToastr('This is info toast.', 'Info');
  }

  showCustom() {
    this.toastr.customToastr('Custom Toast', null, { enableHTML: true });
  }

  showToast(position: any = 'top-left') {
    this.toastr.infoToastr('This is a toast.', 'Toast', { position: position });
  }


  createForm() {
    this.angForm = this.fb.group({
      amount: ['', Validators.required],
      dateSpent: ['', Validators.required],
      purpose: ['', Validators.required],
      category: '',
      createdby: '',
      lastupdateddate: '',
      status:''


    });
  }

  cancelAddExpense() {

    this.dialogRef.close();

  }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.angForm.invalid) {
      return;
    }
    else {
      this.angForm.value.createdby = JSON.parse(this.loggedInUser).username;
      this.angForm.value.lastupdateddate = new Date();
      this.angForm.value.status = "Created";

    }

    debugger

    this.loading = true;
    this.expenseService.register(this.angForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.showSuccess();
          //this.alertService.success('Registration successful', true);
          this.dialogRef.close();

        },
        error => {
          this.loading = false;
        });
  }

  ngOnInit() {
    debugger

    this.categoryService
      .getCategories()
      .subscribe((data: categoryViewModel[]) => {
        this.Categories = data;
        this.getCurrentLoggedInUser();
      });
  }

  getCurrentLoggedInUser() {

    if (localStorage.getItem('currentUser')) {
      this.loggedInUser = localStorage.getItem('currentUser');
    }
  }
}

export interface DialogData {
  user: User;
}