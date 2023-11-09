import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logincss from "../public/login.css"

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const navigate = useNavigate();

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  }

  function authenticateUser(e) {
    e.preventDefault();

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      if (data) {
        navigate('/mainmenu');
      } else {
        setUsername('');
        setPassword('');
      }
    });
  }

  return (
    <div className="mainLoginPage">
      <img src={logincss} />
      <form onSubmit={authenticateUser}>
        <input 
          className="formInput"
          name="username"
          type="text"
          value={username}
          onChange={usernameChangeHandler}
          placeholder="Username"></input>
        <input 
          className="formInput"
          name="password"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
          placeholder="Password"
          cols="300"></input>
        <div>
          <button className="orangeBtn" type='submit'>Login</button>
          {/* <button className="orangeBtn" onClick={() => navigate('/signup')}>Sign Up</button> */}
        </div>
        <p>Forgot your password?</p>
      </form>
    </div>
  )
  // const navigate = useNavigate();

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // function authenticateUser() {
  //   fetch('/login', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       username,
  //       password
  //     })
  //   }).then(res => {
  //     navigate('/mainmenu');
  //   });
  // }

  // return (
  //   <div className="mainLoginPage">
  //     <img src="./logo.png" />
  //     <form>
  //       <input 
  //         className="formInput"
  //         name="username"
  //         type="text"
  //         value={username}
  //         onChange={(e) => setUsername(e.target.value)}
  //         required
  //         placeholder="Username"></input>
  //       <input 
  //         className="formInput"
  //         name="password"
  //         type="password"
  //         required
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         placeholder="Password"
  //         cols="300"></input>
  //       <div>
  //         <button className="orangeBtn" onClick={authenticateUser}>Login</button>
  //         <button className="orangeBtn"onClick={() => navigate('/signup')}>Sign Up</button>
  //       </div>
  //       <p>Forgot your password?</p>
  //     </form>
  //   </div>
  // )
}

export default LoginPage;

// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import './public/login.css';

// const Login = () => {
//   const history = useHistory();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });
//       if (response.ok) {
//         sessionStorage.setItem('userAuthenticated', 'true');
//         history.push('/pets');
//       } else {
//         setError('Invalid username or password');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   }

//   const handleLogin = async () => {
//     history.push('/pets');
//   };

//   return (
//     <div className="login-container">
//       <form
//         className="login-form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleLogin();
//         }}
//       >
//         <h2>
//           <i class="fa fa-paw"></i> Meowmatch <i class="fa fa-paw"></i>
//         </h2>
//         {error && <p>{error}</p>}
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
