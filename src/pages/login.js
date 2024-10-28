import './login.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { UilEnvelope } from '@iconscout/react-unicons'
import { UilLock } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons'

function Login () {
  const [PageState, SetPageState] = useState("login");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [forgotError, setForgotError] = useState("");
  let navigate = useNavigate();

  function LoginHandler(event) {
    event.preventDefault();
    const authentication = getAuth();

      signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        const uid = authentication.currentUser.uid;
        console.log(uid)
        sessionStorage.setItem('userUID', uid)
        console.log("UID saved")
        navigate('/bookcatalog')
        window.location.reload(1);
        sessionStorage.setItem('AuthToken', response._tokenResponse.refreshToken)
      })
      .catch((error) => {
         setLoginError(error.message)
         console.log(loginError)
      });
  }

  function RegisterHandler(event) {
    event.preventDefault();
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, email, password)
    .then((response) => {
      const uid = authentication.currentUser.uid;
      console.log(uid)
      sessionStorage.setItem('userUID', uid)
      //CheckoutServices.addUserLog(uid); 
      navigate('/bookcatalog')
      window.location.reload(1);
      sessionStorage.setItem('AuthToken', response._tokenResponse.refreshToken)
      console.log(sessionStorage.getItem('AuthToken'))
    })
  }

  function ForgotPasswordHandler(event){
    event.preventDefault();
    const authentication = getAuth();

    sendPasswordResetEmail(authentication, email)
    .then(() => {
      // Password reset email sent!
      setForgotError("Email sent successfully.")
      //is empty string. fix later if actually needed.
      // console.log(forgotError)  
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setForgotError(errorMessage)
      // ..
    });
  }

  function EmailFormHandler(event) {
    SetEmail(event.target.value);
  }

  function PasswordFormHandler(event) {
    SetPassword(event.target.value);
  }

  function addActive(event) {
    const loginContainer = document.querySelector(".logincontainer");
    // changes styling to registration form
    loginContainer.classList.add("active");
  }

  function addPass(event) {
    const loginContainer = document.querySelector(".logincontainer");
    loginContainer.classList.add("pass");
  }

  function removePass(event) {
    const loginContainer = document.querySelector(".logincontainer");
    loginContainer.classList.remove("pass");
  }
  

  function removeActive(event) {
    const loginContainer = document.querySelector(".logincontainer");
    loginContainer.classList.remove("active");
  }
  
  return (
      <div className="loginbody">
        <div id="google_translate_element"></div>
        <div className="logincontainer">
          <div className="forms">
            {
              (PageState === "login") &&
              <div className="form login">
                <span className="title">Login</span>
                
                <form onSubmit={LoginHandler}>
                  {(loginError === "") ? 
                  <div className="input-field">
                    <input
                      id="txtLoginEmail"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={EmailFormHandler}
                    />
                    <label htmlFor="txtLoginEmail">Email</label>
                    <div className="icon"><UilEnvelope /></div>
                  </div>  
                  : 
                  <div className='loginError'>
                    <p className='loginErrorText'>Wrong username or password. Please try again.</p> 
                    {/* {loginError} */}
                    <div className="input-field">
                      <input
                        id="txtLoginEmail"
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={EmailFormHandler}
                      />
                      <label htmlFor="txtLoginEmail">Email</label>
                      <div className="icon"><UilEnvelope /></div>
                    </div>
                  </div>
                  
                  }
                  

              <div className="input-field">
                <input
                  id="txtLoginPassword"
                  type="password"
                  className="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={PasswordFormHandler}
                />
                <label htmlFor="txtLoginPassword">Password</label>
                <div className="icon"><UilLock /></div>
              </div>

              <div className="input-field button">
                <input id="btnLogin" type="submit" value="Login" />
              </div>
            </form>

            <div className="login-register">
              <span className="text"
                >Don't have an account?
                <p onClick={() => { SetPageState("registration"); addActive();}} className="text-link register-link">Register now</p>
                <p onClick={() => { SetPageState("forgot"); addPass()}} className="text-link forgot-link">Forgot Password</p>
              </span>
            </div>

          </div>
          } 
          { (PageState === "registration") &&
          <div className="form registration">
            <span className="title">Registration</span>

            <form onSubmit={RegisterHandler}>
              <div className="input-field">
                <input 
                  id="txtName" 
                  type="text" 
                  placeholder="Enter your name" 
                  required 
                />
                <label htmlFor="txtName">Name</label>
                <div className="icon"><UilUser /></div>
              </div>

              <div className="input-field">
                <input
                  id="txtRegisterEmail"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={EmailFormHandler}
                />
                <label htmlFor="RegisterEmail">Email</label>
                <div className="icon"><UilEnvelope /></div>
              </div>

              <div className="input-field">
                <input
                  id="txtRegisterPassword"
                  type="password"
                  className="password"
                  placeholder="Create your password"
                  required
                  value={password}
                  onChange={PasswordFormHandler}
                />
                <label htmlFor="txtRegisterPassword">Password</label>
                <div className="icon"><UilLock /></div>
              </div>
              <div className="input-field button">
                <input id="btnRegister" type="submit" value="Register" />
              </div>
            </form>

            <div className="login-register">
              <span className="text"
                >Already have an account?
                <p onClick={() => { SetPageState("login"); removeActive(); }} className="text-link login-link">Login now</p>
              </span>
            </div>
          </div>
        } {(PageState === "forgot") &&
          <div className="form registration">
            <span className="title">Forgot Password</span>

            <form onSubmit={ForgotPasswordHandler}>
              {(forgotError === "" ) ? 
                <div className="input-field">
                  <input
                    id="txtRegisterEmail"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={EmailFormHandler}
                  />
                  {/* Change here */}
                  <label htmlFor="RegisterEmail">Email</label> 
                  <div className="icon"><UilEnvelope /></div>
                </div>
                :
                <div className='forgotError'>
                  <p className='forgotErrorText'>Email sent.</p>
                  {/* {forgotError} */}
                  <div className="input-field">
                    <input
                      id="txtRegisterEmail"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={EmailFormHandler}
                    />
                    <label htmlFor="RegisterEmail">Email</label> 
                    <div className="icon"><UilEnvelope /></div>
                  </div>
                </div>
              }
              <div className="input-field button">
                <input id="btnRegister" type="submit" value="Submit" />
              </div>
            </form>

            <div className="login-register">
              <span className="text"
                >Already have an account?
                <p onClick={() => { SetPageState("login"); removePass()}} className="text-link login-link">Login now</p>
              </span>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
  );
}

export default Login;