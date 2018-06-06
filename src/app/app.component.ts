import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public buyerStatus: string = 'first';
  public housePrice: number = 500000;

  public salary: number = 60000;
  public netMonthlyEarnings: number = 5000;
  public monthlyOutgoings: number = 3000;

  public get disposableIncome() {
    return this.netMonthlyEarnings - this.monthlyOutgoings;
  }

  public totalSavings: number = 50000;

  public get stampDuty() {

    function getStampDutyByRateRange(housePrice, rates) {
      let stampDutyAcc = 0;
      rates.forEach((rate) => {
        if (housePrice <= rate.min) {
          // The house price is lower than this rate's minimum, so do nothing
        } else {
          // A portion of this house's price falls within this rate
          let taxableAmount = housePrice - rate.min;
          if (rate.max !== -1 && housePrice > rate.max) {
            taxableAmount = rate.max - rate.min;
          }
          stampDutyAcc += Math.ceil(taxableAmount * (rate.percentage / 100));
        }
      });
      return stampDutyAcc;
    }

    if(this.buyerStatus === 'first' && this.housePrice <= 500000) {
      // First time buyers below £500k pay no stamp duty on the first £300k and
      // 5% thereafter
      const stampDutyThreshold: number = 300000;
      if (this.housePrice <= stampDutyThreshold) {
        return 0;
      } else {
        return (this.housePrice - stampDutyThreshold) * 0.05;
      }
    } else if(this.buyerStatus === 'moving') {
      const rates = [
        { min: 0, max: 125000, percentage: 0 },
        { min: 125001, max: 250000, percentage: 2 },
        { min: 250001, max: 925000, percentage: 5 },
        { min: 925001, max: 1500000, percentage: 10 },
        { min: 1500001, max: -1, percentage: 12 },
      ]
      const stampDuty: number = getStampDutyByRateRange(this.housePrice, rates);
      return stampDuty;
    } else if (this.buyerStatus === 'additional') {
      const rates = [
        { min: 0, max: 125000, percentage: 3 },
        { min: 125001, max: 250000, percentage: 5 },
        { min: 250001, max: 925000, percentage: 8 },
        { min: 925001, max: 1500000, percentage: 13 },
        { min: 1500001, max: -1, percentage: 15 },
      ]
      const stampDuty: number = getStampDutyByRateRange(this.housePrice,  rates);
      return stampDuty;
    }
    return 0;
  }

  public get effectiveTaxRate() {
    return this.stampDuty / this.housePrice * 100;
  }

  public otherFees: number = 3000;

  public deposit: number = this.totalSavings - this.stampDuty - this.otherFees;

  public get excessCash() {
    return (this.totalSavings - this.deposit - this.stampDuty - this.otherFees);
  }

  public get loanToValue() {
    const maxAvailableForDeposit: number = this.totalSavings - this.stampDuty - this.otherFees;
    let depositAtLtv: number;
    let affordableLtv: number = 100;
    for (let ltv: number = 100; ltv >= 0; ltv -= 5) {
      depositAtLtv = (this.housePrice / 100) * (100 - ltv);
      if (depositAtLtv <= maxAvailableForDeposit) {
        affordableLtv = ltv;
      }
    }
    return affordableLtv;
  }

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
