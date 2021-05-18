// Finding elements in the DOM
const form  = document.getElementsByTagName('form')[0];
const email = document.getElementById('mail');
let error = email;
while ((error = error.nextSibling).nodeType != 1);

// Email regular expression
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/* Function that does what addEventListener method would've done, callback returns false
and interrupts the event callback */
function addEvent(element, event, callback) {
  let previousEventCallBack = element["on"+event];
  element["on"+event] = function (e) {
    const output = callback(e);

    if (output === false) 
    return false;

    if (typeof previousEventCallBack === 'function') {
      output = previousEventCallBack(e);
      if(output === false) 
      return false;
    }
  }
};

// Test if it's empty field or valid email entered
addEvent(window, "load", function () {
  const test = email.value.length === 0 || emailRegExp.test(email.value);
  email.className = test ? "valid" : "invalid";
});

// Defines what happens when the user types into the field
addEvent(email, "input", function () {
  const test = email.value.length === 0 || emailRegExp.test(email.value);
  if (test) {
    email.className = "valid";
    error.textContent = "";
    error.className = "error";
  } else {
    email.className = "invalid";
  }
});

// Defines what happens when the user tries to Submit
addEvent(form, "submit", function () {
  const test = email.value.length === 0 || emailRegExp.test(email.value);

  if (!test) {
    email.className = "invalid";
    error.textContent = "Please type in a valid email";
    error.className = "error active";
    return false;
  } else {
    email.className = "valid";
    error.textContent = "";
    error.className = "error";
  }
});

// Displays alert with user Submits
function submitAlert() {
  alert("Thanks! Submission Received!");
}