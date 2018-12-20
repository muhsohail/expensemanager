import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { expense } from '../fetch-data/expense';
import { ExpenseService } from '../expense-registeration/expense.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-expense-registeration',
  templateUrl: './edit-expense-registeration.component.html',
  styleUrls: ['./edit-expense-registeration.component.css']
})
export class EditExpenseRegisterationComponent implements OnInit {
  expenseList: expense;
  angForm: FormGroup;

  StartTime: Date;
  EndTime: Date;
  diff: any;
  seconds: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<EditExpenseRegisterationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      amount: ['', Validators.required],
      datespent: ['', Validators.required],
      purpose: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  updateExpense(amount, dataspent, purpose, category, id) {
    this.StartTime = new Date();

    this.route.params.subscribe(params => {
      this.expenseService.updateExpense(amount, dataspent, purpose, category, id);
      this.dialogRef.close();


    });

    this.EndTime = new Date();
    this.diff = this.EndTime.getTime() - this.StartTime.getTime();
    this.seconds = ((this.diff % 60000) / 1000).toFixed(0);

    console.log("Update expense call time in milisecond: " + this.diff);
    console.log("Update expense call time in seconds: " + this.seconds);

  }

  cancelEditExpense() {

    this.dialogRef.close();
  }
  ngOnInit() {
    this.StartTime = new Date();

    this.expenseService.editExpense(this.data.id).subscribe((res: expense) => {
      this.expenseList = res;

      this.expenseList.dateSpentString = new Date(this.expenseList.dateSpent).toLocaleDateString();

      this.EndTime = new Date();
      this.diff = this.EndTime.getTime() - this.StartTime.getTime();
      this.seconds = ((this.diff % 60000) / 1000).toFixed(0);

      console.log("Edit expense call time in milisecond: " + this.diff);
      console.log("Edit expense call time in seconds: " + this.seconds);


    });
  }
}

export interface DialogData {
  amount: string;
  purpose: string;
  datespent: Date;
  category: string;

}
