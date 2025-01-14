/*
UUsing JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:

Get the value of the input text element (this will be the Fibonacci index) 
Calculate the Fibonacci value for the given index
Determine whether or not the number is a prime number
Add a list item to the #fibonacciResults list of numbers you have checked. This list item should have a class of is-prime if it is a prime number, or not-prime it is not.
If the user does not have a value for the input when they submit, you should not continue checking and instead should inform them of an error somehow.


*/
let findPrime = (num) => {
    if (num === 1 || num <= 0){
      return false;
    }
    else{
      for(let i = 2; i <= num/2; i++){
        if (num % i === 0){
          return false;
        }
      }
      return true;
    }
  }

let fibonacci = (n) => {
if (n <= 0){
    return 0;
}
if (n === 1){
    return 1;
}

return fibonacci(n - 1) + fibonacci(n - 2);
}



let form = document.getElementById("formId");
let error = document.getElementById("error");
let resultsList = document.getElementById("fibonacciResults");

if(form){
    form.addEventListener('submit', (event) =>{
        event.preventDefault();
        error.innerHTML = '';


        let input = parseInt(document.getElementById("fibonacci_index_input").value);


        
        if(!Number.isInteger(input) || input === NaN){
            let err = document.createElement('p');
            err.innerHTML = `The input ${input} is not an integer.`
            error.appendChild(err);
            return;
        }

        
        // console.log(input);
        
        let fib = fibonacci(input);

        console.log(fib);


        let listItem = document.createElement('li');

        if(findPrime(fib)){
        listItem.innerHTML = `The Fibonacci of ${input} is ${fib}.`;
        listItem.className = 'is-prime';
        }else{
        listItem.innerHTML= `The Fibonacci of ${input} is ${fib}.`;
        listItem.className = 'not-prime';
        }

        resultsList.append(listItem);
    });
}

