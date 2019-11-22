"use strict";

var _url = require("url");

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
  return false;
};

var MealForm = function MealForm(props) {
  return React.createElement("form", {
    id: "mealForm",
    onSubmit: handleMeal,
    name: "mealForm",
    action: "/maker",
    method: "POST",
    className: "mainForm"
  }, React.createElement("input", {
    "class": "textBox add",
    id: "mealName",
    type: "text",
    name: "name",
    placeholder: "Meal / Food Name"
  }), React.createElement("input", {
    "class": "textBox add",
    id: "mealIngredients",
    type: "text",
    name: "ingredients",
    placeholder: "List Ingredients w/ commas"
  }), React.createElement("select", {
    "class": "selectBox",
    id: "reactionLevel",
    name: "level"
  }, React.createElement("option", {
    selected: "selected",
    disabled: "disabled"
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
    value: {
      csrfToken: csrfToken
    }
  }), React.createElement("button", {
    "class": "formSubmit",
    type: "submit"
  }, "Submit"));
};

var MealList = function MealList(props) {
  if (props.meals.length === 0) {
    return React.createElement("section", {
      id: "meals"
    }, React.createElement("h3", {
      "class": "noData"
    }, "No food added"));
  } // const mealNodes = props.meals.map(function(meal) {
  //     return (
  //         <div key={meal._id}
  //     )
  // })

};
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