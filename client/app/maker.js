/* eslint-disable linebreak-style */
const handleMeal = (e) => {
  e.preventDefault();

  $('#error').fadeIn(300);

  if ($('#mealName').val() == '' || $('#mealIngredients').val() == '' || $('#reactionLevel').val() == '') {
    handleError('All fields are required');
    return false;
  }

  sendGenericAjax('POST', $('#mealForm').attr('action'), $('#mealForm').serialize(), () => {
      loadMealsFromServer();
  });
  console.log($('#mealName').val);
    $('#mealName').value = '';
    $('#mealIngredients').value = '';
    $('#reactionLevel').value = 'start';
    // window.render();
  return false;
};

const MealForm = (props) => {
    // submit = (e) => {
    //     let formMealName = 
    // }
    return (
    <form id="mealForm" onSubmit={handleMeal}
        name="mealForm" action="/maker"
        method="POST" className="mainForm">
        <input className="textBox add" id="mealName" type="text" name="name" placeholder="Meal / Food Name" />
        <input className="textBox add" id="mealIngredients" type="text" name="ingredients" placeholder="List Ingredients w/ commas" />
        <select className="selectBox" id="reactionLevel" name="level">
            <option selected="selected" disabled="disabled" value="start">Rate the reaction:</option>
            <option value="Urgent Care">Urgent Care</option>
            <option value="Painful">Painful</option>
            <option value="Mild Discomfort">Mild Discomfort</option>
            <option value="No Pain">No Pain</option>
        </select>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <button className="formSubmit" type="submit" id="addButton">Submit</button>
    </form>
    );
};

const MealList = function(props) {
    if(props.meals.length === 0) {
        return (
          <div className="mealList">
              <h3 className="empty">No Meals Yet</h3>
          </div>
        );
    }

    const mealNodes = props.meals.map(function(meal) {
        return (
        <div className="meal">
          <div className="card mb-4" id="mealCard" onclick="showData()">
            <div className="card-body" key={meal._id}>
              <h2 className="card-title">{meal.name}</h2>
              <p className="card-text" id="ingred">{meal.ingredients}</p>
              <p className="card-text">Reaction: {meal.level}</p>
            </div>
            <div className="card-footer text-muted" id="foodFooter">
              {meal.date}
            </div>
          </div>
         </div>
        );
    });

    return (
        <div className="mealList">
            {mealNodes}
        </div>
    );
};

const loadMealsFromServer = () => {
    sendGenericAjax('GET', '/getMeals', null, (data) => {
        ReactDOM.render(
            <MealList meals={data.meals} />, document.querySelector("#meals")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <MealForm csrf={csrf} />, document.querySelector("#addFood")
    );

    ReactDOM.render(
        <MealList meals={[]} />, document.querySelector("#meals")
    );

    loadMealsFromServer();
};

const getToken = () => {
    sendGenericAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    if(window.location.href.indexOf("maker") > -1) {
        getToken();
    }
});