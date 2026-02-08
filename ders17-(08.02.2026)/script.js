'use strict';
//Degiskenler

var a = 5;// var ile tanimlanan degiskenler global scope'a sahiptir ve yeniden tanimlanabilir.
let b = 10; // let ile tanimlanan degiskenler block scope'a sahiptir ve yeniden tanimlanabilir.
const c = 15; // const ile tanimlanan degiskenler block scope'a sahiptir ve yeniden tanimlanamaz.

// Degisken tipleri
// Primitive tipler: number, string, boolean, null, undefined, symbol
// Reference tipler: object, array, function

// string tipinde degiskenler
var name = "John Doe";
let city = 'New York';
const country = `${name} lives in USA, ${city}`; // template literals

console.log(country); // John Doe lives in USA, New York

// number tipinde degiskenler
let height = 1.75;
const weight = 70;

console.log(`Height: ${height} m, Weight: ${weight} kg`); // Height: 1.75 m, Weight: 70 kg

// boolean tipinde degiskenler
let isStudent = true;
const isEmployed = false;

console.log(`Is student: ${isStudent}, Is employed: ${isEmployed}`); // Is student: true, Is employed: false

// null ve undefined
let emptyValue = null;
let undefinedValue;

console.log(`Empty value: ${emptyValue}, Undefined value: ${undefinedValue}`); // Empty value: null, Undefined value: undefined

// object tipinde degiskenler
let user = {
  name: "Alice",
  age: 30,
  city: "Los Angeles"
};
console.log(user); // { name: 'Alice', age: 30, city: 'Los Angeles' }

// array tipinde degiskenler
let numbers = [1, 2, 3, 4, 5];
console.log(numbers); // [1, 2, 3, 4, 5]

let fruits = ["apple", "banana", "orange"];
console.log(fruits); // ['apple', 'banana', 'orange']

let mixedArray = [1, "hello", true, null, { name: "Bob" }, [1, 2, 3]];
console.log(mixedArray); // [1, 'hello', true, null, { name: 'Bob' }, [1, 2, 3]]



const outputElement = document.getElementById('output');

let x= 10;
let y = 20;

const sum = x + y;
const difference = x - y;
const product = x * y;
const quotient = x / y;


const divelement = document.createElement('div');
divelement.innerHTML = `
  <p>Sum: ${sum}</p>
  <p>Difference: ${difference}</p>
  <p>Product: ${product}</p>
  <p>Quotient: ${quotient}</p>
`;

divelement.classList.add('card');
outputElement.appendChild(divelement);



const car={
  make: "Toyota",
  model: "Camry",
  year: 2020,
  color: "red"
};

const carElement = document.createElement('div');
carElement.innerHTML = `
  <p>Car Make: ${car.make}</p>
  <p>Car Model: ${car.model}</p>
  <p>Car Year: ${car.year}</p>
`;
carElement.classList.add('card');
outputElement.appendChild(carElement);

const fruitsList = document.createElement('ul');
fruits.forEach(fruit => {
  const listItem = document.createElement('li');
  listItem.textContent = fruit;
  fruitsList.appendChild(listItem);
});
fruitsList.classList.add('card');
outputElement.appendChild(fruitsList);

const elementinput= document.getElementById('input');
const inputDisplay = document.createElement('div');

inputDisplay.classList.add('card');

elementinput.addEventListener('input', function() {
  const inputValue = elementinput.value;

  if (inputValue>=20) {
    inputDisplay.style.backgroundColor = 'lightgreen';
    inputDisplay.textContent = `Input is greater than or equal to 20: ${inputValue}`;
  }
  else {
    inputDisplay.style.backgroundColor = 'lightcoral';
    inputDisplay.textContent = `Input is less than 20: ${inputValue}`;
  }

  elementinput.after(inputDisplay);
})




//if ve else if yapilari

if(x > y) {
  console.log("x is greater than y");
}
else if(x < y) {
  console.log("x is less than y");
}
else {
  console.log("x is equal to y");
}



if(x % 2 === 0) {
  console.log("x is even");
}
else if (x % 2 !== 0) {
  console.log("x is odd");
}
else if (x % 2 === 0 && x > 10) {
  console.log("x is even and greater than 10");
}
else if (x % 2 === 0 || x > 10) {
  console.log("x is even or greater than 10");
} 
else {
  console.log("x is odd and less than or equal to 10");
}


function checkNumber(num) {
  if(num > 0) {
    return "Positive";
  }
  else if(num < 0) {
    return "Negative";
  }
  else {
    return "Zero";
  }
}

console.log(checkNumber(0));