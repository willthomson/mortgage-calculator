import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public housePrice: number = 600000;

  public salary: number = 60000;
  public netMonthlyEarnings: number = 5000;
  public monthlyOutgoings: number = 3000;

  public get disposableIncome() {
    return this.netMonthlyEarnings - this.monthlyOutgoings;
  }

  public totalSavings: number = 50000;
  public stampDuty: number = 6000;
  public otherFees: number = 2000;

  public get deposit() {
    return this.totalSavings - this.stampDuty - this.otherFees;
  }

  public get excessCash() {
    return (this.totalSavings - this.deposit - this.stampDuty - this.otherFees);
  }

  public loanToValue: number = 90;

  public get loanAmount() {
    return this.housePrice - this.deposit;
  }

  public term: number = 30;
  public interestRate: number = 4.2;

  public get monthlyPayment() {
    const totalInterest: number = ((this.loanAmount * this.interestRate) / 100) * this.term;
    const monthlyInterest = (this.housePrice + totalInterest) / this.term / 12;
    return monthlyInterest;
  }

  public get annualSalaryMultiple() {
    return this.loanAmount / this.salary;
  }

  public get percentIncomeUsedForMortgagePayment() {
    return (this.monthlyPayment * 12) / (this.netMonthlyEarnings * 12) * 100;
  }

  public get percentDisposableIncomeUsedForMortgagePayment() {
    return (this.monthlyPayment * 12) / (this.disposableIncome * 12) * 100;
  }
}
