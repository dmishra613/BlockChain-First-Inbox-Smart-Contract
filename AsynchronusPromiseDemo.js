//https://javascript.info/promise-basics
//A Promise object serves as a link between the executor (the “producing code” or “singer”) 
//and the consuming functions (the “fans”), which will receive the result or error. 
//Consuming functions can be registered (subscribed) using the methods .then and .catch.


let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve("done!"), 1000);
  });
  
  // resolve runs the first function in .then
  promise.then(
    result => console.log(result), // shows "done!" after 1 second
    //error => alert(error) // doesn't run
  );