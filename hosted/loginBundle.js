"use strict";

/* eslint-disable linebreak-style */
var handleLogin = function handleLogin(e) {
  e.preventDefault();
  $('#error').fadeOut(200);
  /* If either of the fields are blank show error */

  if ($('#user').val() == '' || $('#pass').val() == '') {
    handleError('Username or password is empty');
    return false;
  }
  /* Otherwise continue loading new page */


  sendAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), redirect);
  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();
  $('#error').fadeOut(200);
  /* If any input is empty, show error */

  if ($('#user').val() == '' || $('#pass').val() == '' || $('#pass2').val() == '') {
    handleError('All fields are required');
    return false;
  }
  /* If the passwords do not match, show error */


  if ($('#pass').val() !== $('#pass2').val()) {
    handleError('Passwords do not match');
    return false;
  }
  /* Otherwise continue loading new page */


  sendAjax('POST', $('#signupForm').attr('action'), $('#signupForm').serialize(), redirect);
  return false;
};

var LoginWindow = function LoginWindow(props) {
  return React.createElement("form", {
    id: "loginForm",
    name: "loginForm",
    onSubmit: handleLogin,
    action: "/login",
    method: "POST",
    "class": "mainForm"
  }, React.createElement("input", {
    "class": "textBox",
    id: "user",
    type: "text",
    name: "username",
    placeholder: "Username"
  }), React.createElement("input", {
    "class": "textBox",
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "Password"
  }), React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), React.createElement("button", {
    "class": "formSubmit",
    type: "submit",
    id: "signinButton"
  }, "Sign In "));
};

var SignupWindow = function SignupWindow(props) {
  return React.createElement("form", {
    id: "signupForm",
    name: "signupForm",
    onSubmit: handleSignup,
    action: "/signup",
    method: "POST",
    "class": "mainForm"
  }, React.createElement("input", {
    "class": "textBox",
    id: "user",
    type: "text",
    name: "username",
    placeholder: "Username"
  }), React.createElement("input", {
    "class": "textBox",
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "Password"
  }), React.createElement("input", {
    "class": "textBox",
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "Retype password"
  }), React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), React.createElement("input", {
    "class": "formSubmit",
    type: "submit",
    value: "Sign Up"
  }));
};

var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render(React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render(React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
  console.log('setup');
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");
  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  createLoginWindow(csrf);
};

var getToken = function getToken() {
  sendGenericAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
  console.log("document");
});
/* eslint-disable linebreak-style */

var handleError = function handleError(message) {
  $('#error').text = message;
  $('#error').fadeIn(200);
};

var redirect = function redirect(response) {
  $('#error').fadeOut(200);
  window.location = response.redirect;
};
/* Sends Ajax request */


var sendAjax = function sendAjax(action, data) {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data: data,
    dataType: 'json',
    success: function success(result, status, xhr) {
      $('#error').fadeOut(200);
      window.location = result.redirect;
    },
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

var sendGenericAjax = function sendGenericAjax(method, action, data, callback) {
  $.ajax({
    cache: false,
    type: method,
    url: action,
    data: data,
    dataType: 'json',
    success: callback,
    error: function error(xhr, status, _error2) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};