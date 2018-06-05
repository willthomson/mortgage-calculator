import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private buyerStatus: string = 'first';
  public housePrice: number = 500000;

  public salary: number = 60000;
  public netMonthlyEarnings: number = 5000;
  public monthlyOutgoings: number = 3000;

  public get disposableIncome() {
    return this.netMonthlyEarnings - this.monthlyOutgoings;
  }

  public totalSavings: number = 50000;

  public get stampDuty() {
    if(this.buyerStatus === 'first' && this.housePrice <= 500000) {
      // First time buyers below £500k pay no stamp duty on the first £300k and
      // 5% thereafter
      if(this.housePrice <= 300000) {
        return 0;
      } else {
        return (this.housePrice - 300000) * 0.05;
      }
    } else if(this.buyerStatus === 'moving') {
      let stampDuty = 0;
      const rates = [
        { min: 0, max: 125000, percentage: 0 },
        { min: 125001, max: 250000, percentage: 2 },
        { min: 250001, max: 925000, percentage: 5 },
        { min: 925001, max: 1500000, percentage: 10 },
        { min: 1500001, max: -1, percentage: 12 },
      ]

      rates.forEach((rate) => {
        if (this.housePrice <= rate.min) {
          // The house price is lower than this rate's minimum, so do nothing
        } else {
          // A portion of this house's price falls within this rate
          let taxableAmount = this.housePrice - rate.min;
          if(rate.max !== -1 && this.housePrice > rate.max) {
            taxableAmount = rate.max - rate.min;
          }
          stampDuty += Math.ceil(taxableAmount * (rate.percentage / 100));
        }
      });
      return stampDuty;
    } else if (this.buyerStatus === 'additional') {
      let stampDuty = 0;
      const rates = [
        { min: 0, max: 125000, percentage: 3 },
        { min: 125001, max: 250000, percentage: 5 },
        { min: 250001, max: 925000, percentage: 8 },
        { min: 925001, max: 1500000, percentage: 13 },
        { min: 1500001, max: -1, percentage: 15 },
      ]

      rates.forEach((rate) => {
        if (this.housePrice <= rate.min) {
          // The house price is lower than this rate's minimum, so do nothing
        } else {
          // A portion of this house's price falls within this rate
          let taxableAmount = this.housePrice - rate.min;
          if (rate.max !== -1 && this.housePrice > rate.max) {
            taxableAmount = rate.max - rate.min;
          }
          stampDuty += Math.ceil(taxableAmount * (rate.percentage / 100));
        }
      });
      return stampDuty;
    }
    return 0;
  }
  public get effectiveTaxRate() {
    return this.stampDuty / this.housePrice * 100;
  }

  public otherFees: number = 2000;

  public get deposit() {
    return this.totalSavings - this.stampDuty - this.otherFees;
  }

  public get excessCash() {
    return (this.totalSavings - this.deposit - this.stampDuty - this.otherFees);
  }

  public loanToValue: number = 90;

  public get loanAmount() {
    return this.housePrice - (this.housePrice / 100) * (100 - this.loanToValue);
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
