'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Saurabh Srivastava',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
};

const account2 = {
    owner: 'Keshav Krishna',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Himanshu Kumar',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sandeep Kumar',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements) {
    containerMovements.innerHTML = '';
    const time = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;
    labelDate.innerText = time;
    movements.forEach(function(movement, i) {
        const type = movement > 0 ? 'deposit' : 'withdrawal';
        const html = `
       <div class="movements__row">
                <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
                <div class="movements__date">${time}</div>
                <div class="movements__value">${movement}</div>
      </div>  
    `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplaySummary = function(acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes} Rs.`;

    const outcomes = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(outcomes)} Rs.`;

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposite => (deposite * acc.interestRate) / 100)
        .filter(int => int >= 1)
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest} Rs.`;
};

const createUsernames = function(accs) {
    accs.forEach(function(acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(letter => letter[0])
            .join('');
    });
};
createUsernames(accounts);

const updateUI = function(acc) {
    displayMovements(acc.movements);
    calcDisplayBalance(acc);
    calcDisplaySummary(acc);
};
const calcDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce(function(acc, curr) {
        return acc + curr;
    }, 0);
    labelBalance.textContent = `${acc.balance} Rs.`;
};

let currentAccount;
btnLogin.addEventListener('click', e => {
    //prevent form from submitting
    e.preventDefault();
    document.querySelector('.sign').style.display = 'none';
    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );
    console.log(currentAccount);
    if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
        labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
        containerApp.style.opacity = 100;
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener('click', e => {
    e.preventDefault();
    const findAcc = accounts.find(acc => acc.username === inputTransferTo.value);
    if (
        findAcc &&
        inputTransferAmount.value > 0 &&
        currentAccount.balance >= inputTransferAmount.value &&
        findAcc.username !== currentAccount.username
    ) {
        findAcc.movements.push(Number(inputTransferAmount.value));

        currentAccount.movements.push(-Number(inputTransferAmount.value));
        inputTransferTo.value = '';
        inputTransferAmount.value = '';
        updateUI(currentAccount);
    }
});

btnLoan.addEventListener('click', e => {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        currentAccount.movements.push(amount);
        updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
    e.preventDefault();
    if (
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            acc => acc.username === currentAccount.username
        );
        console.log(index);
        accounts.splice(index, 1);

        containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//SLICE
// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

//SPLICE - effects the original array
// console.log(arr.splice(2, 3));
// arr.splice(-1);
// arr.splice(2, 1);
// console.log(arr);

//REVERSE - also mutates the original array
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['s', 'a', 'd', 'r'];
// console.log(arr2.reverse());
// console.log(arr2);

//CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);

//JOIN
// console.log(letters.join('-'));

//Looping arrays : FOR EACH
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements) {
//     if (movement > 0) {
//         console.log(`You deposited ${movement}`);
//     } else {
//         console.log(`You withdrew ${Math.abs(movement)}`);
//     }
// }
//CONTINUE AND BREAK DOESNT WORK ON FOREACH LOOP
// movements.forEach(function(movement) {
//     if (movement > 0) {
//         console.log(`You deposited ${movement}`);
//     } else {
//         console.log(`You withdrew ${Math.abs(movement)}`);
//     }
// });

//FOREACH WITH MAPS AND SETS
//MAP
// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(value, key, map) {
//     console.log(`${key}: ${value}`);
// });

//SET
// const currenciesUnique = new Set(['USD', 'USD', 'EUR', 'GBP']);
// currenciesUnique.forEach(function(value, _, ap) {
//     console.log(`${value}:${value}`);
// });

// const checkDogs = function(dogsJulia, dogsKate) {
//     const dogsJuliaCorrected = dogsJulia.slice();
//     dogsJuliaCorrected.splice(0, 1);
//     dogsJuliaCorrected.splice(-2);
//     const dogs = dogsJuliaCorrected.concat(dogsKate);
//     dogs.forEach(function(dog, i) {
//         const data = dog >= 3 ? 'adult' : 'puppy';
//         console.log(`Dog number ${i + 1} is a ${data}`);
//     });
// };
// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];
// checkDogs(julia, kate);

//MAP METHOD - BUILDS A NEW ARRAY BY APPLYING THE EXPRESSION ON ORIGINAL ARRAY

//FILTER METHOD - FILTER ARRAY - LIKE ELEMENT>2 WILL GET FILTERED OUT AND STORES IN A NEW ARRAY

//REDUCE - REDUCE ALL ARRAY ELEMENTS DOWN TO ONE SINGLE VALUE. LIKE - ACC+CURR-ELEMENT

//MAP METHOD -
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;
// const movementsUSD = movements.map(mov => mov * eurToUsd);
// console.log(movementsUSD);

// const movDescriptions = movements.map((mov, i, arr) => {
//     if (mov > 0) {
//         return `Movement ${i + 1} : You deposited ${mov}`;
//     } else {
//         return `Movement ${i + 1}: You withdrawal ${Math.abs(mov)}`;
//     }
// });

//FILTER METHOD

// const deposits = movements.filter(mov => mov > 0);
// console.log(deposits);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

//REDUCE METHOD
//accumulator is like a snow ball
// const balance = movements.reduce(function(acc, curr, i, arr) {
//     return acc + curr;
// }, 0);
// console.log(balance);

//maximum value of array
// const max = movements.reduce(function(acc, mov) {
//     if (acc < mov) {
//         return mov;
//     } else {
//         return acc;
//     }
// }, movements[0]);
// console.log(max);

//FIND METHOD
// const a = movements.find(mov => mov < 0);
// console.log(a);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

//SOME & EVERY METHODS
//array.includes() only checks for equality
// console.log(movements.some(mov => mov > 5000));

// console.log(movements.every(mov => mov > 0));

// // separate callback
// const deposite = mov => mov > 0;
// console.log(movements.some(deposite));

//FLAT & FLATMAP METHODS
// const arr = [
//     [1, 2, 3],
//     [4, 5, 6], 7, 8
// ];
// console.log(arr.flat()); //goes only one level deep

// const arrDeep = [
//     [
//         [2, 2], 1
//     ],
//     [4, 5, 6, [7, 8]], 9, 10
// ];
// console.log(arrDeep.flat(2)); //set deep

//flat
const accountMovements = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);
console.log(accountMovements);

//flatmap
const accountMovements2 = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);
console.log(accountMovements2);

//SORT METHOD