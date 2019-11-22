/* eslint-disable linebreak-style */
const handleMeal = (e) => {
  e.preventDefault();

  $('#error').fadeIn(300);

  if ($('#mealName').val() == '' || $('#mealIngredients').val() == '' || $('#reactionLevel').val() == '') {
    handleError('All fields are required');
    return false;
  }

  sendAjax('POST', $('#mealForm').attr('action'), $('#mealForm').serialize(), () => {
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
        <input type="hidden" name="_csrf" value={{csrfToken}} />
        <button class="formSubmit" type="submit">Submit</button>
        </form>
    );
};

const MealList = function(props) {
    if(props.meals.length === 0) {
        return (
            <section id="meals">
                <h3 class="noData">No food added</h3>
            </section>
        );
    }

    // const mealNodes = props.meals.map(function(meal) {
    //     return (

    //     )
    // })
}
