"use strict";

/* eslint-disable linebreak-style */

/* eslint-disable eqeqeq */

/* eslint-disable no-unused-vars */

/* eslint-disable object-shorthand */

/* eslint-disable no-undef */
var sendAjaxWithCallback = function sendAjaxWithCallback(action, data, callback) {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data: data,
    dataType: 'json',
    success: callback,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
/* On page ready */


$(document).ready(function () {
  /* When signup form is submitted */
  $('#signupForm').on('submit', function (e) {
    /* Stops page from redirecting */
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


    sendAjax($('#signupForm').attr('action'), $('#signupForm').serialize());
    return false;
  });
  /* Login page */

  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    /* If either of the fields are blank show error */

    if ($('#user').val() == '' || $('#pass').val() == '') {
      handleError('Username or password is empty');
      return false;
    }
    /* Otherwise continue loading new page */


    sendAjax($('#loginForm').attr('action'), $('#loginForm').serialize());
    return false;
  });
  /* Adding new data to database (meals) */

  $('#mealForm').on('submit', function (e) {
    e.preventDefault();
    /* if any of the fields are blank show error */

    if ($('#mealName').val() == '' || $('#mealIngredients').val() == '' || $('#reactionLevel').val() == '') {
      handleError('All fields are required');
      return false;
    }
    /* Otherwise continue loading new page */


    sendAjax($('#mealForm').attr('action'), $('#mealForm').serialize());
    return false;
  });
  /* Adding new data to database (meals) */

  $('#changePassword').on('submit', function (e) {
    e.preventDefault();
    /* if any of the fields are blank show error */

    if ($('#oldPass').val() == '' || $('#newPass1').val() == '' || $('#newPass2').val() == '') {
      handleError('All fields are required');
      return false;
    }

    $('#error').fadeIn(200);
    /* Otherwise continue loading new page */

    sendAjaxWithCallback($('#changePassword').attr('action'), $('#changePassword').serialize(), function (data) {
      console.log(data);
    });
    return false;
  });
});
$('#changeSubscription').on('submit', function (e) {
  e.preventDefault();
  /* if any of the fields are blank show error */

  $('#error').fadeIn(200);
  /* Otherwise continue loading new page */

  sendAjaxWithCallback($('#changeSubscription').attr('action'), $('#changeSubscription').serialize(), function (data) {
    console.log('success');
  });
  return false;
});
/* eslint-disable linebreak-style */

var handleMeal = function handleMeal(e) {
  e.preventDefault();
  $('#error').fadeIn(300);

  if ($('#mealName').val() == '' || $('#mealIngredients').val() == '' || $('#reactionLevel').val() == '') {
    handleError('All fields are required');
    return false;
  }

  sendGenericAjax('POST', $('#mealForm').attr('action'), $('#mealForm').serialize(), function () {
    loadMealsFromServer();
  });
  console.log($('#mealName').val);
  $('#mealName').value = '';
  $('#mealIngredients').value = '';
  $('#reactionLevel').value = 'start'; // window.render();

  return false;
};

var MealForm = function MealForm(props) {
  // submit = (e) => {
  //     let formMealName = 
  // }
  return React.createElement("form", {
    id: "mealForm",
    onSubmit: handleMeal,
    name: "mealForm",
    action: "/maker",
    method: "POST",
    className: "mainForm"
  }, React.createElement("input", {
    className: "textBox add",
    id: "mealName",
    type: "text",
    name: "name",
    placeholder: "Meal / Food Name"
  }), React.createElement("input", {
    className: "textBox add",
    id: "mealIngredients",
    type: "text",
    name: "ingredients",
    placeholder: "List Ingredients w/ commas"
  }), React.createElement("select", {
    className: "selectBox",
    id: "reactionLevel",
    name: "level"
  }, React.createElement("option", {
    selected: "selected",
    disabled: "disabled",
    value: "start"
  }, "Rate the reaction:"), React.createElement("option", {
    value: "Urgent Care"
  }, "Urgent Care"), React.createElement("option", {
    value: "Painful"
  }, "Painful"), React.createElement("option", {
    value: "Mild Discomfort"
  }, "Mild Discomfort"), React.createElement("option", {
    value: "No Pain"
  }, "No Pain")), React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), React.createElement("button", {
    className: "formSubmit",
    type: "submit",
    id: "addButton"
  }, "Submit"));
};

var MealList = function MealList(props) {
  if (props.meals.length === 0) {
    return React.createElement("div", {
      className: "mealList"
    }, React.createElement("h3", {
      className: "empty"
    }, "No Meals Yet"));
  }

  var mealNodes = props.meals.map(function (meal) {
    return React.createElement("div", {
      className: "meal"
    }, React.createElement("div", {
      className: "card mb-4",
      id: "mealCard",
      onclick: "showData()"
    }, React.createElement("div", {
      className: "card-body",
      key: meal._id
    }, React.createElement("h2", {
      className: "card-title"
    }, meal.name), React.createElement("p", {
      className: "card-text",
      id: "ingred"
    }, meal.ingredients), React.createElement("p", {
      className: "card-text"
    }, "Reaction: ", meal.level)), React.createElement("div", {
      className: "card-footer text-muted",
      id: "foodFooter"
    }, meal.date)));
  });
  return React.createElement("div", {
    className: "mealList"
  }, mealNodes);
};

var loadMealsFromServer = function loadMealsFromServer() {
  sendGenericAjax('GET', '/getMeals', null, function (data) {
    ReactDOM.render(React.createElement(MealList, {
      meals: data.meals
    }), document.querySelector("#meals"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(MealForm, {
    csrf: csrf
  }), document.querySelector("#addFood"));
  ReactDOM.render(React.createElement(MealList, {
    meals: []
  }), document.querySelector("#meals"));
  loadMealsFromServer();
};

var getToken = function getToken() {
  sendGenericAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
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
    error: function error(xhr, status, _error2) {
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
    error: function error(xhr, status, _error3) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};