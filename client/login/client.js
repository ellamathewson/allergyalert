/* eslint-disable linebreak-style */
const handleLogin = (e) => {
    e.preventDefault();
    $('#error').fadeOut(200);
  
    /* If either of the fields are blank show error */
    if ($('#user').val() == '' || $('#pass').val() == '') {
      handleError('Username or password is empty');
      return false;
    }

    console.log($('input[name=_csrf]').val());
  
    /* Otherwise continue loading new page */
    sendGenericAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), redirect);
  
    return false;
  };
  
  const handleSignup = (e) => {
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
    sendGenericAjax('POST', $('#signupForm').attr('action'), $('#signupForm').serialize(), redirect);
  
    return false;
  };
  
  const LoginWindow = (props) => {
      return (
      <form id="loginForm" name="loginForm" 
          onSubmit={handleLogin} action="/login" 
          method="POST" className="mainForm">
          <input className="textBox" id="user" type="text" name="username" placeholder="Username" />
          <input className="textBox" id="pass" type="password" name="pass" placeholder="Password" />
          <input type="hidden" name="_csrf" value={props.csrf} />
          <button className="formSubmit" type="submit" id="signinButton">Sign In </button>
      </form>
      );
  };
  
  const SignupWindow = (props) => {
    return (
      <form id="signupForm" name="signupForm" 
      onSubmit={handleSignup} action="/signup" 
      method="POST" className="mainForm">
        <input className="textBox" id="user" type="text" name="username" placeholder="Username"/>
        <input className="textBox" id="pass" type="password" name="pass" placeholder="Password"/>
        <input className="textBox" id="pass2" type="password" name="pass2" placeholder="Retype password"/>
        <div class="ui checkbox">
          <input type="checkbox" class="hidden" tabindex="0" />
          <label>Subscribe</label>
        </div>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Sign Up" />
    </form>
    );
  };
  
  // const NavBar = (props) => {
  //   return (
  //   <div class="topnav" id="myTopnav">
  //     <a id="title">Allergy Attention</a>
  //     <a href="/login" class="active" id="loginButton">Login</a>
  //     <a href="/signup" id="signupButton">Signup</a>
  //     <a href="javascript:void(0);" class="icon" onclick="openHamburgerMenu()">
  //       <img class="hamburger" src="/assets/img/menu.png"/></a>
  //   </div>
  //   )
  // }

  const createLoginWindow = (csrf) => {
    ReactDOM.render(
      <LoginWindow csrf={csrf} />,
      document.querySelector("#content")
    );
  };

  // const createNavBar = () => {
  //   ReactDOM.render(
  //     <NavBar />,
  //     document.querySelector("nav")
  //   );
  // };
  
  const createSignupWindow = (csrf) => {
    ReactDOM.render(
      <SignupWindow csrf={csrf} />,
      document.querySelector("#content")
    );
  };
  
  const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
  
    signupButton.addEventListener("click", (e) => {
      e.preventDefault();
      createSignupWindow(csrf);
      return false;
    });
  
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      createLoginWindow(csrf);
      return false;
    });
  
    // createNavBar();
    createLoginWindow(csrf);
  };
  
  const getToken = () => {
    sendGenericAjax('GET', '/getToken', null, (result) => {
      setup(result.csrfToken);
    });
  };
  
  $(document).ready(function() {
    getToken();
  });
