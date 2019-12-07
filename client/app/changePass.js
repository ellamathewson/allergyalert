
/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */

// const handleChangePass = (e) => {
//   e.preventDefault();
//   $('#error').fadeOut(200);

//   if ($('#oldPass').val() == '' || $('#newPass1').val() == '' || $('#newPass2').val() == '') {
//     handleError('All fields are required');
//     return false;
//   }

//   if ($('#newPass1').val() !== $('#newPass2').val()) {
//     handleError('Passwords do not match');
//     return false;
//   }


//   $('#error').fadeIn(200);
//   /* Otherwise continue loading new page */
//   sendAjaxWithCallback($('#changePassword').attr('action'), $('#changePassword').serialize(), (data) => {
//     handleSuccess('Password changed');
//   });

//   return false;
// };

// const ChangePassForm = (props) => {
//   // webkit text security from https://stackoverflow.com/questions/1648665/changing-the-symbols-shown-in-a-html-password-field -->
//   return (
//     <form id="changePassword" name="changePassword"
//     action="/changePassword" method="POST"
//     class="mealForm" onSubmit={handleChangePass}>
//       <input class="textBox add" id="oldPass" type="text" name="oldPassword" placeholder="Old Password" />
//       <input class="textBox add" id="newPass1" type="text" name="newPass1" style="-webkit-text-security: square" placeholder="New Password" />
//       <input class="textBox add" id="newPass2" type="text" name="newPass2" style="-webkit-text-security: square" placeholder="Repeat New Password" />
//       <input type="hidden" name="_csrf" value={props.csrf} />
//       <input class="formSubmit" type="submit" value="Change Password" />
//       <div class="alert alert-danger" role="alert" id="error">Error</div>
//       <div class="alert alert-success" role="alert" id="success">Success</div>
//   </form>
//   )
// }

// const createPassChangeForm = function(csrf) {
//   ReactDOM.render(
//     <ChangePassForm csrf={csrf} />, document.querySelector('#changePassForm')
//   );
// };

// const handleSubChange = (e) => {
//   e.preventDefault();
//   /* if any of the fields are blank show error */

//   $('#error').fadeIn(200);
//   /* Otherwise continue loading new page */
//   sendAjaxWithCallback($('#changeSubscription').attr('action'), $('#changeSubscription').serialize(), (data) => {
//     handleSuccess('Subscription changed');
//     console.log('success');
//   });

//   return false;
// };

// const getToken = () => {
//   sendGenericAjax('GET', '/getToken', null, (result) => {
//     setup(result.csrfToken);
//   });
// };

// $(document).ready(() => {
//   /* https://stackoverflow.com/questions/21718282/check-if-url-contains-string-with-jquery */
//   if(window.location.href.indexOf("account") > -1) {
//       getToken();
//   }
// });
