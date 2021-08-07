"use strict";

const incomeSalary = document.getElementById('income-salary'),
      incomeFreelance = document.getElementById('income-freelance'),
      incomeExtra1 = document.getElementById('income-extra-1'),
      incomeExtra2 = document.getElementById('income-extra-2');

const costsFlat = document.getElementById('costs-flat'),
      costsHouseServices = document.getElementById('costs-house-services'),
      costsTransport = document.getElementById('costs-transport'),
      costsCredit = document.getElementById('costs-credit');

const fillableInputs = document.querySelectorAll('.input');

const totalMonthInput = document.getElementById('total-month'),
      totalDayInput = document.getElementById('total-day'),
      totalYearInput = document.getElementById('total-year');
      
let totalMonth, totalDay, totalYear;

const moneyBoxRange = document.getElementById('money-box-range'),
      rangePrecents = document.getElementById('total-precents');

const accumulationInput = document.getElementById('accumulation'),
      spendInput = document.getElementById('spend');

let accumulation = 0,
    spend = 0,
    moneyBoxPrecents = 0;

const strToNum = str => {
    if(str.value) {
        return parseInt(str.value);
    } else {
        return 0;
    }
};

const calcAvailableMonthMoney = () => {
    const totalMonthIncome = strToNum(incomeSalary) + strToNum(incomeFreelance) + strToNum(incomeExtra1) + strToNum(incomeExtra2),
          totalMonthCosts = strToNum(costsFlat) + strToNum(costsHouseServices) + strToNum(costsTransport) + strToNum(costsCredit);

    totalMonth = totalMonthIncome - totalMonthCosts;
    totalMonthInput.value = totalMonth;
};


for(let input of fillableInputs) {
    input.addEventListener('input', () => {
        calcAvailableMonthMoney();
        calc();
    });
}

moneyBoxRange.addEventListener('input', e => {
    const target = e.target;

    moneyBoxPrecents = target.value;
    rangePrecents.innerHTML = moneyBoxPrecents;

    calc();
});

const calc = () => {
    accumulation = ((totalMonth * moneyBoxPrecents) / 100).toFixed();
    accumulationInput.value = accumulation;

    spend = totalMonth - accumulation;
    spendInput.value = spend;

    totalDay = (spend / 30).toFixed();
    totalDayInput.value = totalDay;

    totalYear = accumulation * 12;
    totalYearInput.value = totalYear;
};