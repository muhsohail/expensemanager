import { Component, OnInit, Inject } from '@angular/core';
import { expense } from '../fetch-data/expense';
import { ExpenseService } from '../expense-registeration/expense.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-delete-expense-registeration',
  templateUrl: './delete-expense-registeration.component.html',
  styleUrls: ['./delete-expense-registeration.component.css']
})
export class DeleteExpenseRegisterationComponent implements OnInit {
  objExpense: any = {};
  constructor(private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<DeleteExpenseRegisterationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.expenseService.editExpense(this.data.id).subscribe(res => {
      this.objExpense = res;
    });
  }

  deleteExpense(id) {
      this.expenseService.deleteExpense(id);
      this.dialogRef.close();
  }
}
