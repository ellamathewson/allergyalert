
/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */

const handleChangePass = (e) => {
  e.preventDefault();
  $('#error').fadeOut(200);

  if ($('#oldPass').val() == '' || $('#newPass1').val() == '' || $('#newPass2').val() == '') {
    handleError('All fields are required');
    return false;
  }

  if ($('#newPass1').val() !== $('#newPass2').val()) {
    handleError('Passwords do not match');
    return false;
  }


  $('#error').fadeIn(200);
  /* Otherwise continue loading new page */
  sendAjaxWithCallback($('#changePassword').attr('action'), $('#changePassword').serialize(), (data) => {
    handleSuccess('Password changed');
  });

  return false;
};

const handleSubChange = (e) => {
  e.preventDefault();
  /* if any of the fields are blank show error */

  $('#error').fadeIn(200);
  /* Otherwise continue loading new page */
  sendAjaxWithCallback($('#changeSubscription').attr('action'), $('#changeSubscription').serialize(), (data) => {
    handleSuccess('Subscription changed');
    console.log('success');
  });

  return false;
};
