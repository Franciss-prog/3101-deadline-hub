const Register = () => {
  return (
    <div className="RegisterPage">
      <div className="RegisterBox">
      <h3>Register</h3>
      <p className = "registerSubtitle">Create your Deadline Hub account</p>
        <div className="RegisterInput">
          <label>Sr-code:</label>
          <input type="text" placeholder="sr-code"/>
        </div>

        <div className="RegisterInput">
          <label>Email:</label>
          <input
            type="text"
            placeholder="(sr-code)@g.batstate-u.edu.ph"/>
        </div>

        <div className="RegisterInput">
          <label>Password:</label>
          <input type="password" />
        </div>

        <div className="RegisterInput">
          <label>Confirm Password:</label>
          <input type="password" />
        </div>

        <button className = "RegisterButton">Register</button>

      </div>
    </div>
  )
}

export default Register