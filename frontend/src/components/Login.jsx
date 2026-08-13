import { Link } from "react-router-dom"

function Login() {
  return (
    <div className="loginPage">
      <div className="loginBox">
        <h1>Deadline Hub 3101</h1>
        <h3>Login</h3>

        <div className="loginInput">
          <label>Sr-code:</label>
          <input type="text" placeholder="sr-code"/>
        </div>

        <div className="loginInput">
          <label>Password:</label>
          <input type="password" placeholder="Password"/>
        </div>

        <button className="loginButton">Login</button>

        <p>
          Don't have sr-code?
          <Link to="/register" className="registerLink">Register</Link>
        </p>

      </div>
    </div>
  )
}

export default Login