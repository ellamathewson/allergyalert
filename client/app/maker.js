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
  return false;
};

const MealForm = (props) => {
    return (
    <form id="mealForm" onSubmit={handleMeal}
        name="mealForm" action="/maker"
        method="POST" className="mainForm">
        <input class="textBox add" id="mealName" type="text" name="name" placeholder="Meal / Food Name" />
        <input class="textBox add" id="mealIngredients" type="text" name="ingredients" placeholder="List Ingredients w/ commas" />
        <select class="selectBox" id="reactionLevel" name="level">
            <option selected="selected" disabled="disabled">Rate the reaction:</option>
            <option value="Urgent Care">Urgent Care</option>
            <option value="Painful">Painful</option>
            <option value="Mild Discomfort">Mild Discomfort</option>
            <option value="No Pain">No Pain</option>
        </select>
        <input type="hidden" name="_csrf" value={props.csrfToken} />
        <button class="formSubmit" type="submit">Submit</button>
    </form>
    );
};

const MealList = function(props) {
    console.log(props.data.length === 0);
    if(props.data.length === 0) {
        return (
          <div className="mealList">
              <h3 className="empty">No Meals Yet</h3>
          </div>
        );
    }

    const mealNodes = props.data.map(function(meal) {
        console.log(props.data);
        return (
        <div class="meal">
          <div class="card mb-4" id="mealCard" onclick="showData()">
            <div class="card-body" key={meal._id}>
              <h2 class="card-title">{meal.name}</h2>
              <p class="card-text">{meal.ingredients}</p>
              <p class="card-text">Reaction: {meal.level}</p>
            </div>
            <div class="card-footer text-muted" id="foodFooter">
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
        console.log(data.data);
        ReactDOM.render(
            <MealList meals={data.data} />, document.querySelector("#meals")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <MealForm csrf={csrf} />, document.querySelector("#addFood")
    );

    ReactDOM.render(
        <MealList data={[]} />, document.querySelector("#meals")
    );

    loadMealsFromServer();
};

const getToken = () => {
    sendGenericAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});